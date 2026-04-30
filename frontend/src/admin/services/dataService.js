import { db, storage, auth, functions } from '../../lib/firebase';
import { signInAnonymously } from 'firebase/auth';
import { collection, doc, getDocs, getDoc, setDoc, updateDoc, deleteDoc, onSnapshot, query, orderBy, where, serverTimestamp, addDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { httpsCallable } from 'firebase/functions';
import dynamicMenu from '../../data/dynamicMenu';
import { categories as defaultCategories } from '../../data/menuData';
import {
  normalizeGrabOrderStatus,
  canTransitionTo,
  paymentAllowsConfirm,
  toLegacyTrackingStatus,
} from '../orderPipeline.js';
import { getSupportBotReply } from '../../utils/supportBotReply';

const IMAGE_PATH_RE = /^(\/|https?:\/\/)/i;
const toSafeCategoryFolder = (folderName) => String(folderName || '').replace(/\s+/g, '_');

const toTitleCase = (value = '') =>
  value
    .toLowerCase()
    .split(' ')
    .filter(Boolean)
    .map((token) => token.charAt(0).toUpperCase() + token.slice(1))
    .join(' ');

const sanitizeImagePath = (rawPath) => {
  const path = typeof rawPath === 'string' ? rawPath.trim() : '';
  return IMAGE_PATH_RE.test(path) ? path : '';
};

// Expected filename format: productName_price.ext  (split by "_")
const parseProductFromFileName = (fileName) => {
  const extRemoved = String(fileName || '').replace(/\.[^.]+$/, '');
  const segments = extRemoved.split('_').filter(Boolean);
  const rawName = (segments[0] || 'Menu Item').replace(/[-]+/g, ' ').trim();
  const rawPrice = segments.length > 1 ? segments[1] : '';
  const name = toTitleCase(rawName || 'Menu Item');
  const price = Number.parseFloat(String(rawPrice).replace(/[^0-9.]/g, ''));

  return {
    name,
    price: Number.isFinite(price) ? price : 0,
  };
};

// ─── CONNECTION TEST ────────────────────────────────────────────────────────
export const testConnection = async () => {
  try {
    const testDocRef = doc(collection(db, '_connection_test'));
    await setDoc(testDocRef, { timestamp: new Date().toISOString(), message: 'Connection successful' });
    console.log('✅ Firebase connection test successful! Wrote sample data to Firestore.');
    await deleteDoc(testDocRef);
  } catch (err) {
    console.error('❌ Firebase connection test failed. Please verify your Firestore rules and .env configuration:', err);
  }
};
// Run the connection test when the app initializes this service (Disabled for production speed)
// testConnection();

// ─── CATEGORIES ─────────────────────────────────────────────────────────────

export const fetchCategories = async () => {
  try {
    const snap = await getDocs(collection(db, 'categories'));
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (err) {
    console.error('Failed to fetch categories:', err);
    throw err;
  }
};

export const subscribeCategories = (callback) => {
  const q = query(collection(db, 'categories'));
  const unsub = onSnapshot(q, (snap) => {
    callback(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  }, (err) => {
    console.error('Categories Subscription Error:', err);
  });
  return unsub;
};

export const addCategory = async (categoryObj) => {
  if (!auth.currentUser) throw new Error("Authentication required to add categories.");
  const id = categoryObj.id || `cat-${Date.now()}`;
  await setDoc(doc(db, 'categories', id), { ...categoryObj, id });
  return categoryObj;
};
export const updateCategory = (id, updatedCat) => {
  if (!auth.currentUser) throw new Error("Authentication required to update categories.");
  return updateDoc(doc(db, 'categories', id), updatedCat);
};
export const deleteCategory = async (id) => {
  if (!auth.currentUser) throw new Error("Authentication required to delete categories.");
  try {
    await deleteDoc(doc(db, 'categories', id));
  } catch (err) {
    if (err.code === 'permission-denied') {
      throw new Error(`Permission Denied: Your account (${auth.currentUser?.email}) is NOT authorized in Firestore rules to delete categories.`);
    }
    throw err;
  }
};

// ─── PRODUCTS ────────────────────────────────────────────────────────────────

export const fetchProducts = async () => {
  try {
    const snap = await getDocs(collection(db, 'products'));
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (err) {
    console.error('Failed to fetch products:', err);
    throw err;
  }
};

export const subscribeProducts = (callback, activeCategoryId = null) => {
  const q = query(collection(db, 'products'));
  const unsub = onSnapshot(q, (snap) => {
    let prods = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    // If we get an empty snapshot from a live listener, it means data was deleted
    if (activeCategoryId && activeCategoryId !== 'all') {
      prods = prods.filter(p => p.categoryId === activeCategoryId);
    }
    callback(prods);
  }, (err) => {
    console.error('Products Subscription Error:', err);
  });
  return unsub;
};

export const addProduct = async (product) => {
  if (!auth.currentUser) throw new Error("Authentication required to add products.");
  const id = product.id || `prod-${Date.now()}`;
  const syncedImage = sanitizeImagePath(product.image || product.img || '');
  const newProduct = { ...product, image: syncedImage, img: syncedImage, id, createdAt: new Date().toISOString() };
  await setDoc(doc(db, 'products', id), newProduct);
  return newProduct;
};

export const updateProduct = (id, updatedProduct) => {
  if (!auth.currentUser) throw new Error("Authentication required to update products.");
  const syncedImage = sanitizeImagePath(updatedProduct.image || updatedProduct.img || '');
  return updateDoc(doc(db, 'products', id), { ...updatedProduct, image: syncedImage, img: syncedImage, updatedAt: new Date().toISOString() });
};

export const deleteProduct = async (id) => {
  if (!auth.currentUser) throw new Error("Authentication required to delete products.");
  try {
    const docRef = doc(db, 'products', id);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      const data = snap.data();
      const imageUrl = data.image || data.img;
      // If it's a Firebase Storage URL, delete the file too
      if (imageUrl && (imageUrl.includes('firebasestorage.googleapis.com') || imageUrl.startsWith('gs://'))) {
        try {
          const imageRef = ref(storage, imageUrl);
          await deleteObject(imageRef);
          console.log('✅ Deleted associated image from Storage (Product)');
        } catch (err) {
          console.warn('⚠️ Storage image delete failed (Product):', err.message);
        }
      }
    }
    console.log(`[Delete Product] Requesting delete for ${id} by user: ${auth.currentUser?.email}`);
    await deleteDoc(docRef);
    console.log('✅ Deleted Firestore document (Product)');
    return true;
  } catch (err) {
    console.error('Delete Product Error:', err.code, err.message);
    if (err.code === 'permission-denied') {
      throw new Error(`Permission Denied: You (${auth.currentUser?.email || 'unauthenticated'}) do not have rights to delete products.`);
    }
    throw err;
  }
};

/**
 * Calls secure Cloud Function to repair broken product images in Firestore.
 * Example usage:
 *   const result = await repairProductImages();
 *   // Console logs response payload from callable.
 */
export const repairProductImages = async () => {
  if (!auth.currentUser) throw new Error('Authentication required to repair product images.');
  const callable = httpsCallable(functions, 'repairProductImages');
  const response = await callable({});
  console.log('[repairProductImages callable result]', response.data);
  return response.data;
};

export const deleteCustomerAccount = async (uid) => {
  if (!auth.currentUser) throw new Error('Authentication required.');
  const callable = httpsCallable(functions, 'deleteCustomerAccount');
  const response = await callable({ uid });
  return response.data;
};

export const migrateProductImagePaths = async ({ dryRun = true, previewLimit = 100 } = {}) => {
  if (!auth.currentUser) throw new Error('Authentication required.');
  const callable = httpsCallable(functions, 'migrateProductImagePaths');
  const response = await callable({ dryRun, previewLimit });
  return response.data;
};

export const bootstrapAdminClaim = async (uid) => {
  if (!auth.currentUser) throw new Error('Authentication required.');
  const targetUid = String(uid || auth.currentUser.uid || '').trim();
  if (!targetUid) throw new Error('Missing uid.');
  const callable = httpsCallable(functions, 'makeUserAdmin');
  const response = await callable({ uid: targetUid });
  await auth.currentUser.getIdToken(true);
  return response.data;
};

// ─── ORDERS ──────────────────────────────────────────────────────────────────

export const placeOrder = async (orderPayload) => {
  // Step 6 Debug: Log Firebase Config
  console.log('[DEBUG] Active Firebase Config:', {
    projectId: auth.app.options.projectId,
    authDomain: auth.app.options.authDomain
  });

  try {
    let uid = auth.currentUser?.uid;
    if (!uid) {
      const cred = await signInAnonymously(auth);
      uid = cred.user.uid;
    }

    const items = Array.isArray(orderPayload.items) ? orderPayload.items : [];
    if (items.length === 0) {
      throw new Error('Order requires items');
    }

    const rawTotal = orderPayload.total;
    const totalAmount =
      typeof rawTotal === 'number'
        ? rawTotal
        : parseFloat(String(rawTotal ?? '0').replace(/[^0-9.]/g, '')) || 0;

    const statusRaw =
      orderPayload.status || orderPayload.order_status || orderPayload.orderStatus || 'PENDING';
    const status = String(statusRaw).toUpperCase();

    const payRaw = orderPayload.paymentStatus ?? orderPayload.payment_status;
    const paymentStatus = typeof payRaw === 'string' ? payRaw : String(payRaw ?? '');

    const {
      userId: _ignoreUserId,
      total: _total,
      totalAmount: _dropTam,
      order_status: _os,
      orderStatus: _oS,
      status: _st,
      payment_status: _ps,
      paymentStatus: _pS,
      items: _it,
      ...restExtras
    } = orderPayload;

    const orderId = `STM-${Date.now()}`;
    const trackingToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    const cleanExtras = { ...restExtras };
    delete cleanExtras.order_status;
    delete cleanExtras.orderStatus;

    const newOrder = {
      ...cleanExtras,
      userId: uid,
      items,
      totalAmount,
      status,
      paymentStatus,
      payment_status: paymentStatus,
      id: orderId,
      trackingToken,
      createdAt: new Date().toISOString(),
      isNewForAdmin: true,
      chatEnabled: true,
      unreadAdmin: 0,
      unreadCustomer: 0,
    };

    // DEBUG: Write #1 - Primary Order
    console.log('[DEBUG] Attempting Write #1: /orders/' + orderId);
    console.log('[DEBUG] Payload #1:', JSON.stringify(newOrder, null, 2));
    
    try {
      await setDoc(doc(db, 'orders', orderId), newOrder);
      console.log('[DEBUG] Write #1 SUCCESS');
    } catch (err1) {
      console.error('[DEBUG] Write #1 FAILED:', {
        code: err1.code,
        message: err1.message,
        path: '/orders/' + orderId
      });
      throw err1; // Propagate to outer catch
    }

    // public_tracking is mirrored from orders via Cloud Functions (deploy: firebase deploy --only functions).

    localStorage.setItem('stm_last_order_id', orderId);
    return newOrder;
  } catch (err) {
    console.error('[DEBUG] placeOrder General Error:', err);
    throw new Error('Failed to place order: ' + err.message);
  }
};

export const fetchOrders = async () => {
  try {
    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (err) {
    console.error('Failed to fetch orders:', err);
    throw err;
  }
};

export const subscribeOrders = (callback) => {
  const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
  const unsub = onSnapshot(q, (snap) => {
    callback(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  }, (err) => {
    console.error('Orders Subscription Error:', err);
  });
  return unsub;
};

export const fetchOrderById = async (id) => {
  try {
    const docRef = doc(db, 'orders', id);
    const snap = await getDoc(docRef);
    if (snap.exists()) return snap.data();
    throw new Error('Order not found');
  } catch (err) {
    console.error('Failed to fetch order:', err);
    throw err;
  }
};

export const updateOrderStatus = async (orderId, newStatus, extraOrderFields = {}) => {
  const normalizedStatus = (newStatus || 'PENDING').toUpperCase();
  try {
    await updateDoc(doc(db, "orders", orderId), {
      ...extraOrderFields,
      status: normalizedStatus
    });
  } catch (error) {
    console.error("Status update failed:", error);
    throw error;
  }
};

/** Strict pipeline + payment gate (Stripe/QR must be PAID before CONFIRMED). */
export const advanceOrderPipeline = async (orderId, order, nextStatus) => {
  if (!auth.currentUser) throw new Error('Authentication required');
  const next = String(nextStatus || '')
    .toUpperCase()
    .replace(/\s+/g, '_');
  const current = normalizeGrabOrderStatus(order);
  if (next === 'CONFIRMED' && current === 'PLACED') {
    const gate = paymentAllowsConfirm(order);
    if (!gate.ok) throw new Error(gate.reason);
  }
  if (!canTransitionTo(current, next)) {
    throw new Error(`Invalid transition: ${current} → ${next}. Advance one stage only.`);
  }
  const legacy = toLegacyTrackingStatus(next);
  await updateDoc(doc(db, 'orders', orderId), {
    orderStatus: next,
    status: legacy,
    order_status: next.toLowerCase(),
    updatedAt: new Date().toISOString(),
    chatEnabled: next !== 'PLACED' && next !== 'CANCELLED',
  });
};

export const assignRiderToOrder = async (orderId, riderPayload) => {
  if (!auth.currentUser) throw new Error('Authentication required');
  const orderRef = doc(db, 'orders', orderId);
  const snap = await getDoc(orderRef);
  if (!snap.exists()) throw new Error('Order not found');
  const data = snap.data();
  const st = normalizeGrabOrderStatus(data);
  if (st !== 'READY') throw new Error('Assign rider only when order is READY');
  const name = (riderPayload?.name || '').trim();
  if (!name) throw new Error('Rider name required');
  const ts = new Date().toISOString();
  await updateDoc(orderRef, {
    rider: {
      id: riderPayload?.id || null,
      name,
      phone: (riderPayload?.phone || '').trim(),
      legStatus: 'OFFERED',
      assignedAt: ts,
      acceptedAt: null,
      pickedUpAt: null,
      deliveredAt: null,
    },
    updatedAt: ts,
  });
};

/** Proxy for future rider app: accept → OUT_FOR_DELIVERY, pickup, deliver → DELIVERED. */
export const advanceRiderLeg = async (orderId, leg) => {
  if (!auth.currentUser) throw new Error('Authentication required');
  const orderRef = doc(db, 'orders', orderId);
  const snap = await getDoc(orderRef);
  if (!snap.exists()) throw new Error('Order not found');
  const data = snap.data();
  const st = normalizeGrabOrderStatus(data);
  const rider = data.rider || {};
  const ts = new Date().toISOString();

  if (leg === 'accept') {
    if (st !== 'READY') throw new Error('Rider accept only when order is READY');
    if (rider.legStatus !== 'OFFERED') throw new Error('Assign a rider first');
    await updateDoc(orderRef, {
      orderStatus: 'OUT_FOR_DELIVERY',
      status: toLegacyTrackingStatus('OUT_FOR_DELIVERY'),
      order_status: 'out_for_delivery',
      rider: { ...rider, legStatus: 'ACCEPTED', acceptedAt: ts },
      updatedAt: ts,
    });
    return;
  }
  if (leg === 'pickup') {
    if (st !== 'OUT_FOR_DELIVERY') throw new Error('Pick up only when OUT_FOR_DELIVERY');
    await updateDoc(orderRef, {
      rider: { ...rider, legStatus: 'PICKED_UP', pickedUpAt: ts },
      updatedAt: ts,
    });
    return;
  }
  if (leg === 'deliver') {
    if (st !== 'OUT_FOR_DELIVERY') throw new Error('Deliver only when OUT_FOR_DELIVERY');
    await updateDoc(orderRef, {
      orderStatus: 'DELIVERED',
      status: toLegacyTrackingStatus('DELIVERED'),
      order_status: 'delivered',
      rider: { ...rider, legStatus: 'COMPLETED', deliveredAt: ts },
      updatedAt: ts,
    });
    return;
  }
  throw new Error('Unknown rider action');
};

export const deleteOrder = async (id) => {
  if (!auth.currentUser) throw new Error("Authentication required to delete orders.");
  const callable = httpsCallable(functions, 'deleteOrderByAdmin');
  const response = await callable({ orderId: id });
  return response.data;
};

// ─── ORDER CHAT & NOTIFICATIONS ──────────────────────────────────────────────

export const sendMessage = async (orderId, message, token = null) => {
  const msgId = `msg-${Date.now()}`;
  const msgDoc = doc(collection(db, 'orders', orderId, 'messages'), msgId);
  const msgData = {
    ...message,
    id: msgId,
    token: token,
    createdAt: new Date().toISOString(),
    read: false
  };
  
  await setDoc(msgDoc, msgData);
  
  // Update unread count on the order
  const orderRef = doc(db, 'orders', orderId);
  const snap = await getDoc(orderRef);
  if (snap.exists()) {
    const data = snap.data();
    if (message.senderRole === 'admin') {
      await updateDoc(orderRef, { unreadCustomer: (data.unreadCustomer || 0) + 1 });
    } else {
      await updateDoc(orderRef, { 
        unreadAdmin: (data.unreadAdmin || 0) + 1,
        lastGuestVerifyToken: token 
      });
    }
  }
  return msgData;
};

export const subscribeMessages = (orderId, callback, token = null) => {
  const collectionRef = collection(db, 'orders', orderId, 'messages');
  
  if (token) {
    console.warn('Customer live chat reading is disabled for security.');
    callback([]); // Return empty list to guest
    return () => {}; // No-op unsubscribe
  }
  
  // Admin uses standard unrestricted query
  const q = query(collectionRef, orderBy('createdAt', 'asc'));
  return onSnapshot(q, (snap) => {
    callback(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  });
};

export const markMessagesAsRead = async (orderId, role, token = null) => {
  const orderRef = doc(db, 'orders', orderId);
  if (role === 'admin') {
    await updateDoc(orderRef, { unreadAdmin: 0 });
  } else {
    console.log('Guest mark-as-read Suppressed.');
  }
};

export const markOrderAsSeen = async (orderId) => {
  if (!auth.currentUser) return;
  const orderRef = doc(db, 'orders', orderId);
  await updateDoc(orderRef, { isNewForAdmin: false, unreadAdmin: 0 });
};

// ─── SITE SUPPORT CHAT (customer ↔ admin, separate from order threads) ──────

const preview140 = (s) => String(s || '').trim().slice(0, 140);

async function writeSupportChatDoc(chatRef, senderRole, trimmed) {
  const p = preview140(trimmed);
  if (senderRole === 'customer') {
    await setDoc(
      chatRef,
      {
        updatedAt: serverTimestamp(),
        lastPreview: p,
        lastMessage: p,
        lastSenderRole: senderRole,
        unreadByAdmin: true,
        unreadByUser: false,
      },
      { merge: true }
    );
  } else if (senderRole === 'admin') {
    await setDoc(
      chatRef,
      {
        updatedAt: serverTimestamp(),
        lastPreview: p,
        lastMessage: p,
        lastSenderRole: senderRole,
        unreadByUser: true,
        unreadByAdmin: false,
        resolved: false,
      },
      { merge: true }
    );
  } else if (senderRole === 'bot') {
    await setDoc(
      chatRef,
      {
        updatedAt: serverTimestamp(),
        lastPreview: p,
        lastMessage: p,
        lastSenderRole: 'bot',
      },
      { merge: true }
    );
  }
}

export const sendSupportChatMessage = async (conversationId, { text, senderRole }, options = {}) => {
  const trimmed = (text || '').trim();
  if (!trimmed || !conversationId) throw new Error('Invalid support message');
  const chatRef = doc(db, 'support_chats', conversationId);
  await writeSupportChatDoc(chatRef, senderRole, trimmed);
  await addDoc(collection(db, 'support_chats', conversationId, 'messages'), {
    text: trimmed,
    senderRole,
    createdAt: serverTimestamp(),
  });
  if (senderRole === 'customer' && !options.skipBot) {
    const botText = getSupportBotReply(trimmed);
    if (botText) {
      await sendSupportChatMessage(conversationId, { text: botText, senderRole: 'bot' }, { skipBot: true });
    }
  }
};

export const subscribeSupportChatMessages = (conversationId, callback) => {
  if (!conversationId) return () => {};
  const q = query(
    collection(db, 'support_chats', conversationId, 'messages'),
    orderBy('createdAt', 'asc')
  );
  return onSnapshot(
    q,
    (snap) => callback(snap.docs.map((d) => ({ id: d.id, ...d.data() }))),
    (err) => console.error('Support chat messages subscription:', err)
  );
};

/** Admin inbox: all support conversation heads, newest first */
export const subscribeSupportInbox = (callback) => {
  const q = query(collection(db, 'support_chats'), orderBy('updatedAt', 'desc'));
  return onSnapshot(
    q,
    (snap) => callback(snap.docs.map((d) => ({ id: d.id, ...d.data() }))),
    (err) => {
      console.error('Support inbox subscription:', err);
      callback([]);
    }
  );
};

export const markSupportChatReadByAdmin = async (conversationId) => {
  if (!conversationId) return;
  await setDoc(doc(db, 'support_chats', conversationId), { unreadByAdmin: false }, { merge: true });
};

// ─── GALLERY ────────────────────────────────────────────────────────────────
export const fetchGallery = async () => {
  try {
    const q = query(collection(db, 'gallery'), orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (err) {
    console.error('Failed to fetch gallery:', err);
    throw err;
  }
};

export const subscribeGallery = (callback) => {
  const q = query(collection(db, 'gallery'), orderBy('createdAt', 'desc'));
  const unsub = onSnapshot(q, (snap) => {
    callback(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  }, (err) => {
    console.error('Gallery Subscription Error:', err);
  });
  return unsub;
};

export const addGalleryItem = async (item) => {
  if (!auth.currentUser) throw new Error("Authentication required to manage gallery.");
  const id = item.id || `gallery-${Date.now()}`;
  const newItem = { ...item, id, createdAt: new Date().toISOString() };
  await setDoc(doc(db, 'gallery', id), newItem);
  return newItem;
};

export const updateGalleryItem = (id, updatedItem) => {
  if (!auth.currentUser) throw new Error("Authentication required to manage gallery.");
  return updateDoc(doc(db, 'gallery', id), { ...updatedItem, updatedAt: new Date().toISOString() });
};

export const deleteGalleryItem = async (id) => {
  if (!auth.currentUser) throw new Error("Authentication required to manage gallery.");
  try {
    const docRef = doc(db, 'gallery', id);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      const data = snap.data();
      if (data.url && (data.url.includes('firebasestorage.googleapis.com') || data.url.startsWith('gs://'))) {
        try {
          const imageRef = ref(storage, data.url);
          await deleteObject(imageRef);
          console.log('✅ Deleted associated image from Storage (Gallery)');
        } catch (err) {
          console.warn('⚠️ Storage file delete failed (Gallery):', err.message);
        }
      }
    }
    console.log(`[Delete Gallery] Requesting delete for ${id} by user: ${auth.currentUser?.email}`);
    await deleteDoc(docRef);
    console.log('✅ Deleted Firestore document (Gallery)');
    return true;
  } catch (err) {
    console.error('Delete Gallery Item Error:', err.code, err.message);
    if (err.code === 'permission-denied') {
      throw new Error(`Permission Denied: You (${auth.currentUser?.email || 'unauthenticated'}) do not have rights to delete gallery items.`);
    }
    throw err;
  }
};

// ─── LOCAL STORAGE MIGRATION ────────────────────────────────────────────────

export const getLocalStorageSnapshot = () => {
  try {
    return {
      categories: JSON.parse(localStorage.getItem('stm_categories') || '[]'),
      products: JSON.parse(localStorage.getItem('stm_products') || '[]'),
      orders: JSON.parse(localStorage.getItem('stm_orders') || '[]'),
      gallery: JSON.parse(localStorage.getItem('stm_gallery') || '[]'),
    };
  } catch (e) {
    return { categories: [], products: [], orders: [], gallery: [] };
  }
};

export const seedFromLocalStorage = async (forceRewrite = false) => {
  if (!auth.currentUser) throw new Error("Authentication required to seed data.");
  console.log('Smart Seeding: Syncing items to Cloud...');
  
  const existingProdsSnap = await getDocs(collection(db, 'products'));
  const existingProdIds = new Set(existingProdsSnap.docs.map(d => d.id));

  const existingCatsSnap = await getDocs(collection(db, 'categories'));
  const existingCatIds = new Set(existingCatsSnap.docs.map(d => d.id));

  const existingGallerySnap = await getDocs(collection(db, 'gallery'));
  const existingGalleryIds = new Set(existingGallerySnap.docs.map(d => d.id));

  // Flatten dynamicMenu object into a products array
  const prods = [];
  const folderCasingMap = {
    'SNACKS': 'snacks', 'BURGER KABABAB': 'BURGER KABABAB', 'DINOSAUR': 'DINOSAUR',
    'DESERT': 'desert', 'COLD DRINKS': 'cold drinks', 'CAN DRINKS': 'CAN DRINKS',
    'INDIAN FOOD': 'indian food', 'SUGARCANE': 'SUGARCANE', 'HOT': 'HOT', 'SIDES': 'sides'
  };

  Object.keys(dynamicMenu).forEach(categoryKey => {
    dynamicMenu[categoryKey].forEach((filename, i) => {
      const parsed = parseProductFromFileName(filename);
      const name = parsed.name;
      const price = parsed.price;
      
      const categoryIdMap = {
        'SNACKS': 'snacks', 'BURGER KABABAB': 'burgers-kebabs', 'DINOSAUR': 'dinosaur',
        'DESERT': 'desserts', 'COLD DRINKS': 'cold-drinks', 'CAN DRINKS': 'can-drinks',
        'INDIAN FOOD': 'indian', 'SUGARCANE': 'sugarcane', 'HOT': 'hot-drinks', 'SIDES': 'sides'
      };
      const catId = categoryIdMap[categoryKey] || 'snacks';
      const matchedCat = defaultCategories.find(c => c.id === catId);
      const realFolderPath = folderCasingMap[categoryKey] || categoryKey;

      const pId = `stm-prod-${categoryKey.substring(0,3).toLowerCase()}-${i}`;
      // CRITICAL: We only seed if the item was NEVER there. 
      // This prevents deleted items from coming back.
      if (!existingProdIds.has(pId)) {
        const imagePath = sanitizeImagePath(encodeURI(`/assets/SMT_FOOD/${toSafeCategoryFolder(realFolderPath)}/${filename}`));
        prods.push({
          id: pId, name, price, categoryId: catId,
          category: matchedCat ? matchedCat.name : categoryKey,
          badge: i % 5 === 0 ? 'bestseller' : '',
          active: true,
          image: imagePath,
          img: imagePath,
        });
      }
    });
  });

  // 1. Seed Categories (Only if missing)
  let catCount = 0;
  for (const cat of defaultCategories) {
    const catId = cat.id;
    if (!existingCatIds.has(catId)) {
      await setDoc(doc(db, 'categories', catId), { 
        ...cat, id: catId, active: true,
        icon: cat.icon || cat.emoji || '🍽️',
        order: cat.order || (catCount + 1)
      });
      catCount++;
    }
  }

  // 2. Seed Products
  for (const prod of prods) {
    await setDoc(doc(db, 'products', prod.id), { ...prod, createdAt: new Date().toISOString() });
  }

  // 3. Seed Gallery
  let gCount = 0;
  try {
    const { galleryMedia } = await import('../../data/galleryData');
    for (const [i, file] of galleryMedia.entries()) {
      const gId = `gallery-seed-${i}`;
      // Only add if it's not already in cloud. 
      // If admin deleted it, we respect that and don't re-add.
      if (!existingGalleryIds.has(gId)) {
        const isVideo = file.toLowerCase().endsWith('.mp4') || file.toLowerCase().endsWith('.mov');
        await setDoc(doc(db, 'gallery', gId), {
          id: gId, url: `/aboutusimage/${file}`, type: isVideo ? 'video' : 'image',
          title: file.replace(/_/g, ' ').split('.')[0].substring(0, 20),
          active: true, createdAt: new Date().toISOString()
        });
        gCount++;
      }
    }
  } catch (err) { console.warn('Gallery seeding skip:', err); }

  return { categories: catCount, products: prods.length, orders: 0, gallery: gCount };
};

// ─── DASHBOARD STATS ─────────────────────────────────────────────────────────

export const fetchDashboardStats = async () => {
  const orders = await fetchOrders();
  return {
    totalOrders: orders.length,
    totalRevenue: orders.reduce((sum, o) => sum + parseFloat(o.total || 0), 0).toFixed(2),
    popularItems: ['Teh Tarik Special', 'Nasi Lemak'],
    recentOrders: orders.slice(0, 5),
  };
};

// ─── Legacy sync dataService object ──────────────────────────────────────────

let _cachedCategories = [];
let _cachedProducts   = [];
let _cachedOrders     = [];
let _cachedGallery    = [];

const notifyDataUpdated = () => window.dispatchEvent(new Event('stm_data_updated'));

// Start global listeners
subscribeCategories(cats => { _cachedCategories = cats; notifyDataUpdated(); });
subscribeProducts(prods   => { _cachedProducts   = prods; notifyDataUpdated(); });
subscribeOrders(ords      => { _cachedOrders     = ords; });
subscribeGallery(items    => { _cachedGallery    = items; notifyDataUpdated(); });

export const dataService = {
  getCategories: () => [..._cachedCategories],
  getProducts: ()   => [..._cachedProducts],
  getProductsByCategory: (catId) => _cachedProducts.filter(p => p.categoryId === catId),
  getOrders: ()     => [..._cachedOrders],
  getGallery: ()    => [..._cachedGallery],

  addCategory,
  updateCategory,
  deleteCategory,
  addProduct,
  updateProduct,
  deleteProduct,
  repairProductImages,
  bootstrapAdminClaim,
  placeOrder,
  updateOrderStatus,
  deleteOrder,
  addGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,

  subscribeCategories,
  subscribeProducts,
  subscribeOrders,
  subscribeGallery,
  fetchOrderById,
  getDashboardStats: fetchDashboardStats,
  seedFromLocalStorage,
  sendMessage,
  subscribeMessages,
  markMessagesAsRead,
  markOrderAsSeen,
  sendSupportChatMessage,
  subscribeSupportChatMessages,
  subscribeSupportInbox,
  markSupportChatReadByAdmin,
};
