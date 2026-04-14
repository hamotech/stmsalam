import { db } from '../../lib/firebase';
import { collection, doc, getDocs, getDoc, setDoc, updateDoc, deleteDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import dynamicMenu from '../../data/dynamicMenu';
import { categories as defaultCategories } from '../../data/menuData';

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
// Run the connection test when the app initializes this service
testConnection();

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
  const id = categoryObj.id || `cat-${Date.now()}`;
  await setDoc(doc(db, 'categories', id), { ...categoryObj, id });
  return categoryObj;
};
export const updateCategory = (id, updatedCat) => updateDoc(doc(db, 'categories', id), updatedCat);
export const deleteCategory = (id) => deleteDoc(doc(db, 'categories', id));

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
  const id = product.id || `prod-${Date.now()}`;
  await setDoc(doc(db, 'products', id), { ...product, id });
  return product;
};
export const updateProduct = (id, updatedProduct) => updateDoc(doc(db, 'products', id), updatedProduct);
export const deleteProduct = (id) => deleteDoc(doc(db, 'products', id));

// ─── ORDERS ──────────────────────────────────────────────────────────────────

export const placeOrder = async (orderPayload) => {
  try {
    const orderId = `STM-${Date.now()}`;
    const newOrder = { ...orderPayload, id: orderId, createdAt: new Date().toISOString() };
    await setDoc(doc(db, 'orders', orderId), newOrder);
    localStorage.setItem('stm_last_order_id', orderId);
    return newOrder;
  } catch (err) {
    console.error('Failed to place order:', err);
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

export const updateOrderStatus = (id, status) => updateDoc(doc(db, 'orders', id), { status, order_status: status.toLowerCase(), updatedAt: new Date().toISOString() });
export const deleteOrder = (id) => deleteDoc(doc(db, 'orders', id));

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
  const id = item.id || `gallery-${Date.now()}`;
  const newItem = { ...item, id, createdAt: new Date().toISOString() };
  await setDoc(doc(db, 'gallery', id), newItem);
  return newItem;
};

export const updateGalleryItem = (id, updatedItem) => updateDoc(doc(db, 'gallery', id), { ...updatedItem, updatedAt: new Date().toISOString() });
export const deleteGalleryItem = (id) => deleteDoc(doc(db, 'gallery', id));

// ─── LOCAL STORAGE MIGRATION ────────────────────────────────────────────────
export const getLocalStorageSnapshot = () => {
  return { categories: defaultCategories, products: [], orders: [] };
};

export const seedFromLocalStorage = async () => {
  console.log('Smart Seeding: Syncing missing items to Cloud...');
  
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
      const cleanName = filename.replace('.png', '').replace('.jpg', '').replace(/_/g, ' ');
      const priceMatch = cleanName.match(/SGD\s*(\d+(\.\d+)?)/i);
      const price = priceMatch ? parseFloat(priceMatch[1]) : 5.0;
      let name = cleanName.replace(/SGD\s*\d+(\.\d+)?/i, '').trim() || 'Menu Item';
      
      const categoryIdMap = {
        'SNACKS': 'snacks', 'BURGER KABABAB': 'burgers-kebabs', 'DINOSAUR': 'dinosaur',
        'DESERT': 'desserts', 'COLD DRINKS': 'cold-drinks', 'CAN DRINKS': 'can-drinks',
        'INDIAN FOOD': 'indian', 'SUGARCANE': 'sugarcane', 'HOT': 'hot-drinks', 'SIDES': 'sides'
      };
      const catId = categoryIdMap[categoryKey] || 'snacks';
      const matchedCat = defaultCategories.find(c => c.id === catId);
      const realFolderPath = folderCasingMap[categoryKey] || categoryKey;

      const pId = `stm-prod-${categoryKey.substring(0,3).toLowerCase()}-${i}`;
      if (!existingProdIds.has(pId)) {
        prods.push({
          id: pId, name, price, categoryId: catId,
          category: matchedCat ? matchedCat.name : categoryKey,
          badge: i % 5 === 0 ? 'bestseller' : '',
          active: true, img: `/SMT FOOD/SMT FOOD/${realFolderPath}/${filename}`,
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

  // 2. Seed Products (Only if missing)
  for (const prod of prods) {
    await setDoc(doc(db, 'products', prod.id), { ...prod, createdAt: new Date().toISOString() });
  }

  // 3. Seed Gallery (Sync logic)
  let gCount = 0;
  try {
    const { galleryMedia } = await import('../../data/galleryData');
    const incomingSeedIds = new Set(galleryMedia.map((_, i) => `gallery-seed-${i}`));

    // A. Clean up orphaned seeds (if they were deleted from local but exist in cloud)
    for (const d of existingGallerySnap.docs) {
      if (d.id.startsWith('gallery-seed-') && !incomingSeedIds.has(d.id)) {
        await deleteDoc(doc(db, 'gallery', d.id));
      }
    }

    // B. Add missing seeds
    for (const [i, file] of galleryMedia.entries()) {
      const gId = `gallery-seed-${i}`;
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

// Trigger a custom event when data updates to easily notify React components
const notifyDataUpdated = () => window.dispatchEvent(new Event('stm_data_updated'));

subscribeCategories(cats => { _cachedCategories = cats; notifyDataUpdated(); });
subscribeProducts(prods => { _cachedProducts = prods; notifyDataUpdated(); });
subscribeOrders(ords => { _cachedOrders = ords; });
subscribeGallery(items => { _cachedGallery = items; notifyDataUpdated(); });

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
};

// ─── AUTOLOAD / AUTO-SEED FAILSAFE ───────────────────────────────────────────
(async () => {
  try {
    const pSnap = await getDocs(collection(db, 'products'));
    const cSnap = await getDocs(collection(db, 'categories'));
    if (pSnap.empty || cSnap.empty) {
      console.log('Failsafe: Empty Database Detected. Auto-running original data migration...');
      await seedFromLocalStorage();
      console.log('Failsafe: Original data successfully restored to cloud.');
    }
  } catch(e) {
    console.error('Failsafe Check Error:', e);
  }
})();
