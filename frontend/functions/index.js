const crypto = require('crypto');
const admin = require('firebase-admin');
const { onCall, HttpsError } = require('firebase-functions/v2/https');
const { onDocumentCreated } = require('firebase-functions/v2/firestore');
const { buildPublicTrackingFromOrder } = require('./mirrorPayload');

admin.initializeApp();

const REGION = 'us-central1';
const DEFAULT_ADMIN_UID = '9xMUEfOE4EhsDWTAo8d3NnE12Oh2';

const IDEMPOTENCY_COLLECTION = 'order_idempotency';
const CHECKOUT_LEASE_COLLECTION = 'checkout_lease';
const CHECKOUT_LEASE_TTL_MS = 45 * 60 * 1000;
const MAX_CHECKOUT_FENCE_LEN = 128;
const MAX_DEVICE_ID_LEN = 200;
const MAX_IDEMPOTENCY_RAW_LEN = 4096;
const CATEGORY_FOLDER_MAP = {
  snacks: 'snacks',
  'burgers-kebabs': 'BURGER_KABABAB',
  dinosaur: 'DINOSAUR',
  desserts: 'desert',
  'cold-drinks': 'cold_drinks',
  'can-drinks': 'CAN_DRINKS',
  indian: 'indian_food',
  sugarcane: 'SUGARCANE',
  'hot-drinks': 'HOT',
  sides: 'sides',
};

/* -------------------- HELPERS -------------------- */

function deepClean(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function sha256HexUtf8(value) {
  return crypto.createHash('sha256').update(value, 'utf8').digest('hex');
}

function normalizeIdempotencyKeyInput(raw) {
  return String(raw).trim().replace(/\s+/g, '');
}

function isOfflineQueueScopedIdempotencyCandidate(idem) {
  if (!idem || typeof idem !== 'string') return false;
  return normalizeIdempotencyKeyInput(idem).startsWith('offline-queue:');
}

function validateCheckoutFenceInput(raw) {
  const s = typeof raw === 'string' ? raw.trim() : '';
  if (!s || s.length > MAX_CHECKOUT_FENCE_LEN) {
    throw new HttpsError('invalid-argument', 'Missing or invalid checkoutFence');
  }
  return s;
}

function unwrapHttpsError(err) {
  if (!err) return null;
  if (err instanceof HttpsError) return err;
  if (err?.cause) return unwrapHttpsError(err.cause);
  return null;
}

function normalizeCategoryFolder(value) {
  return String(value || '').trim().replace(/\s+/g, '_');
}

function getInvalidImageReason(value) {
  const raw = typeof value === 'string' ? value.trim() : '';
  if (!raw) return 'empty_or_null';
  const lower = raw.toLowerCase();

  if (raw.includes('C:\\') || raw.includes('C:/')) return 'contains_windows_path';
  if (lower.includes('desktop')) return 'contains_desktop_segment';
  if (lower.includes('frontend')) return 'contains_frontend_segment';
  if (!(raw.startsWith('/') || /^https?:\/\//i.test(raw))) return 'not_root_or_http';
  return null;
}

function buildReplacementImagePath(product) {
  const current = String(product?.image || '').trim();
  const fileName = current
    .split(/[\\/]/)
    .filter(Boolean)
    .pop();

  const categoryId = String(product?.categoryId || '').trim();
  const mappedFolder = CATEGORY_FOLDER_MAP[categoryId];
  const fallbackCategory = normalizeCategoryFolder(product?.category || categoryId || 'misc');
  const categoryFolder = mappedFolder || fallbackCategory;

  if (fileName && /\.(png|jpe?g|webp|gif)$/i.test(fileName)) {
    return `/assets/SMT_FOOD/${categoryFolder}/${fileName}`;
  }
  return '/assets/placeholder.png';
}

/* -------------------- VALIDATION -------------------- */

function coerceItemsOrThrow(items) {
  if (!Array.isArray(items) || items.length === 0) {
    throw new HttpsError('invalid-argument', 'Missing items');
  }

  if (items.length > 200) {
    throw new HttpsError('invalid-argument', 'Too many line items');
  }

  return items.map((raw, idx) => {
    const it = raw && typeof raw === 'object' ? raw : {};

    const name =
      typeof it.name === 'string' && it.name.trim()
        ? it.name.trim().slice(0, 500)
        : `Item ${idx + 1}`;

    if (!('qty' in it) || !('price' in it)) {
      throw new HttpsError('invalid-argument', `Missing qty/price for item "${name}"`);
    }

    const qtyNum = Number(it.qty);
    const priceNum = Number(it.price);

    if (!Number.isFinite(priceNum) || priceNum < 0) {
      throw new HttpsError('invalid-argument', `Invalid price for item "${name}"`);
    }

    const qty = Number.isFinite(qtyNum)
      ? Math.max(1, Math.min(999, Math.floor(qtyNum)))
      : 1;

    return { name, qty, price: priceNum };
  });
}

function buildOrderDocumentForSet({
  uid,
  items,
  totalAmount,
  normalizedMode,
  idempotencyKeyHash,
}) {
  const doc = {
    userId: uid,
    items,
    totalAmount,
    paymentMode: normalizedMode,
    paymentMethod: normalizedMode,
    flow: 'grab',
    orderStatus: 'PLACED',
    metaData: {},
    paymentStatus: 'PENDING',
    status: 'PENDING',
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  };

  if (idempotencyKeyHash) {
    doc.idempotencyKey = idempotencyKeyHash;
  }

  return doc;
}

/* -------------------- FUNCTIONS -------------------- */

exports.createGrabOrder = onCall(
  { region: REGION, invoker: 'public' },
  async (request) => {
    console.log('[CF] START createGrabOrder');

    const data = request.data || {};
    let traceId = '';

    try {
      const uid = request.auth?.uid;
      if (!uid) {
        throw new HttpsError('unauthenticated', 'User not authenticated');
      }

      traceId = `${uid}-${Date.now()}`;

      console.log('[CREATE ORDER RAW INPUT]', JSON.stringify(data));

      const paymentModeKey = String(data.paymentMode ?? '').trim().toUpperCase();
      const PAYMENT_ALIASES = {
        CASH: 'COD',
        COD: 'COD',
        PAYNOW: 'ONLINE',
        CARD: 'ONLINE',
        STRIPE: 'ONLINE',
        PAYPAL: 'ONLINE',
        SCANPAY: 'ONLINE',
        QR: 'ONLINE',
        PHONE: 'ONLINE',
        ONLINE: 'ONLINE',
      };
      const normalizedMode = PAYMENT_ALIASES[paymentModeKey];
      if (!normalizedMode) {
        throw new HttpsError(
          'invalid-argument',
          `Invalid payment mode: ${paymentModeKey || '(empty)'}`
        );
      }

      const items = coerceItemsOrThrow(data.items);

      console.log('[CREATE ORDER NORMALIZED]', {
        normalizedMode,
        itemsLength: items.length,
      });

      const totalAmount = items.reduce((sum, item) => {
        const line = item.qty * item.price;
        if (!Number.isFinite(line)) {
          throw new HttpsError('invalid-argument', 'Invalid item calculation');
        }
        return sum + line;
      }, 0);

      if (totalAmount <= 0) {
        throw new HttpsError('invalid-argument', 'Invalid total');
      }

      console.log('[CF][VALIDATION OK]', { totalAmount, count: items.length });

      /* -------- IDEMPOTENCY -------- */

      let hash = null;

      if (data.idempotencyKey) {
        const normalized = normalizeIdempotencyKeyInput(data.idempotencyKey);
        if (!normalized || normalized.length > MAX_IDEMPOTENCY_RAW_LEN) {
          throw new HttpsError('invalid-argument', 'Invalid idempotencyKey');
        }
        hash = sha256HexUtf8(normalized);
      }

      const db = admin.firestore();
      let orderId;

      /* -------- TRANSACTION PATH -------- */

      if (hash) {
        const idemRef = db.doc(`${IDEMPOTENCY_COLLECTION}/${uid}_${hash}`);

        const orderDoc = deepClean(
          buildOrderDocumentForSet({
            uid,
            items,
            totalAmount,
            normalizedMode,
            idempotencyKeyHash: hash,
          })
        );

        const result = await db.runTransaction(async (tx) => {
          const snap = await tx.get(idemRef);

          if (snap.exists) {
            return { kind: 'hit', orderId: snap.data().orderId };
          }

          const newId = db.collection('orders').doc().id;

          tx.set(db.doc(`orders/${newId}`), orderDoc);
          tx.set(idemRef, {
            orderId: newId,
            uid,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
          });

          return { kind: 'created', orderId: newId };
        });

        orderId = result.orderId;
      } else {
        /* -------- SIMPLE WRITE -------- */

        const orderDoc = deepClean(
          buildOrderDocumentForSet({
            uid,
            items,
            totalAmount,
            normalizedMode,
            idempotencyKeyHash: null,
          })
        );

        const ref = db.collection('orders').doc();
        await ref.set(orderDoc);

        orderId = ref.id;
      }

      if (!orderId) {
        throw new HttpsError('internal', 'Order creation failed');
      }

      console.log('[CREATE ORDER SUCCESS]', { orderId, traceId });
      console.log('[CF][SUCCESS]', orderId);

      return { success: true, orderId };
    } catch (error) {
      const unwrapped = unwrapHttpsError(error);
      if (unwrapped) throw unwrapped;

      console.error('[CF][CREATE ORDER ERROR]', error);

      throw new HttpsError('internal', error.message || 'Unknown error', {
        traceId,
      });
    }
  }
);

/* -------------------- MIRROR -------------------- */

exports.syncOrderToPublicTracking = onDocumentCreated(
  { region: REGION, document: 'orders/{orderId}' },
  async (event) => {
    const orderId = event.params.orderId;
    const snap = event.data;

    if (!snap?.exists) return;

    const payload = buildPublicTrackingFromOrder(orderId, snap.data());
    if (!payload) return;

    await admin
      .firestore()
      .collection('public_tracking')
      .doc(orderId)
      .set(payload, { merge: true });
  }
);

/* -------------------- ADMIN MAINTENANCE -------------------- */

exports.repairProductImages = onCall(
  { region: REGION, invoker: 'public' },
  async (request) => {
    const uid = request.auth?.uid;
    if (!uid) {
      throw new HttpsError('unauthenticated', 'Authentication required.');
    }

    // Optional admin-claim gate requested by app owner.
    // Keep this enabled for safety in production.
    if (!request.auth?.token?.admin) {
      throw new HttpsError('permission-denied', 'Admin role required.');
    }

    const db = admin.firestore();
    const productsSnap = await db.collection('products').get();
    const totalScanned = productsSnap.size;

    const isBrokenImage = (value) => {
      if (typeof value !== 'string') return true;
      const normalized = value.trim().toLowerCase();
      if (!normalized) return true;
      if (normalized.includes('undefined')) return true;
      if (normalized.includes('null')) return true;
      return false;
    };

    const replacementImage = 'https://teh-tarik-app-my-own.web.app/bg1.jpeg';
    const toUpdate = [];
    let skipped = 0;

    productsSnap.docs.forEach((docSnap) => {
      const data = docSnap.data() || {};
      if (isBrokenImage(data.image)) {
        toUpdate.push(docSnap.ref);
      } else {
        skipped += 1;
      }
    });

    if (toUpdate.length > 0) {
      // Firestore batch supports max 500 operations per commit.
      for (let i = 0; i < toUpdate.length; i += 500) {
        const chunk = toUpdate.slice(i, i + 500);
        const batch = db.batch();
        chunk.forEach((ref) => {
          // Only patch the image field; no schema or other fields changed.
          batch.update(ref, { image: replacementImage });
        });
        await batch.commit();
      }
    }

    return {
      totalProductsScanned: totalScanned,
      brokenImagesFound: toUpdate.length,
      updatedCount: toUpdate.length,
      skippedCount: skipped,
    };
  }
);

exports.makeUserAdmin = onCall(
  { region: REGION, invoker: 'public' },
  async (request) => {
    const callerUid = request.auth?.uid;
    if (!callerUid) {
      throw new HttpsError('unauthenticated', 'Authentication required.');
    }
    const isBootstrapAdmin = callerUid === DEFAULT_ADMIN_UID;
    if (!request.auth?.token?.admin && !isBootstrapAdmin) {
      throw new HttpsError('permission-denied', 'Only admins can promote users.');
    }

    const rawUid = request.data?.uid;
    const targetUid = typeof rawUid === 'string' && rawUid.trim()
      ? rawUid.trim()
      : DEFAULT_ADMIN_UID;

    if (!targetUid) {
      throw new HttpsError('invalid-argument', 'Missing uid.');
    }

    await admin.auth().setCustomUserClaims(targetUid, { admin: true });
    console.log('[makeUserAdmin] Admin claim granted', {
      callerUid,
      targetUid,
      isBootstrapAdmin,
    });

    return {
      success: true,
      message: `Admin claim set for uid: ${targetUid}`,
      uid: targetUid,
    };
  }
);

exports.deleteCustomerAccount = onCall(
  { region: REGION, invoker: 'public' },
  async (request) => {
    const callerUid = request.auth?.uid;
    if (!callerUid) {
      throw new HttpsError('unauthenticated', 'Authentication required.');
    }
    if (!request.auth?.token?.admin) {
      throw new HttpsError('permission-denied', 'Only admins can delete customers.');
    }

    const rawUid = request.data?.uid;
    const targetUid = typeof rawUid === 'string' ? rawUid.trim() : '';
    if (!targetUid) {
      throw new HttpsError('invalid-argument', 'Missing uid.');
    }
    if (targetUid === callerUid) {
      throw new HttpsError('failed-precondition', 'Admins cannot delete their own account.');
    }

    const db = admin.firestore();
    await db.collection('users').doc(targetUid).delete().catch(() => null);
    await admin.auth().deleteUser(targetUid);

    return {
      success: true,
      message: `Customer deleted: ${targetUid}`,
      uid: targetUid,
    };
  }
);

exports.deleteOrderByAdmin = onCall(
  { region: REGION, invoker: 'public' },
  async (request) => {
    const callerUid = request.auth?.uid;
    if (!callerUid) {
      throw new HttpsError('unauthenticated', 'Authentication required.');
    }
    if (!request.auth?.token?.admin) {
      throw new HttpsError('permission-denied', 'Only admins can delete orders.');
    }

    const rawOrderId = request.data?.orderId;
    const orderId = typeof rawOrderId === 'string' ? rawOrderId.trim() : '';
    if (!orderId) {
      throw new HttpsError('invalid-argument', 'Missing orderId.');
    }

    const db = admin.firestore();
    await db.collection('orders').doc(orderId).delete();
    await db.collection('public_tracking').doc(orderId).delete().catch(() => null);

    return {
      success: true,
      message: `Order deleted: ${orderId}`,
      orderId,
    };
  }
);

exports.migrateProductImagePaths = onCall(
  { region: REGION, invoker: 'public' },
  async (request) => {
    const callerUid = request.auth?.uid;
    if (!callerUid) {
      throw new HttpsError('unauthenticated', 'Authentication required.');
    }
    if (!request.auth?.token?.admin) {
      throw new HttpsError('permission-denied', 'Only admins can run image migration.');
    }

    const dryRun = request.data?.dryRun !== false; // strict default: true
    const previewLimit = Number.isFinite(Number(request.data?.previewLimit))
      ? Math.max(1, Math.min(200, Number(request.data.previewLimit)))
      : 100;

    const db = admin.firestore();
    const snap = await db.collection('products').get();

    const brokenEntries = [];
    const toUpdate = [];

    for (const docSnap of snap.docs) {
      const data = docSnap.data() || {};
      const image = typeof data.image === 'string' ? data.image : '';
      const reason = getInvalidImageReason(image);

      if (!reason) continue;

      const replacement = buildReplacementImagePath(data);
      brokenEntries.push({
        productId: docSnap.id,
        productName: data.name || '',
        category: data.category || data.categoryId || '',
        currentImage: image || null,
        proposedReplacementImage: replacement,
        reason,
      });
      toUpdate.push({ ref: docSnap.ref, replacementImage: replacement });
    }

    if (!dryRun && toUpdate.length > 0) {
      for (let i = 0; i < toUpdate.length; i += 500) {
        const chunk = toUpdate.slice(i, i + 500);
        console.log(`[migrateProductImagePaths] committing batch ${Math.floor(i / 500) + 1} with ${chunk.length} docs`);
        const batch = db.batch();
        chunk.forEach((entry) => {
          // Only patch image field as requested.
          batch.update(entry.ref, { image: entry.replacementImage });
        });
        await batch.commit();
      }
    }

    const summary = {
      dryRun,
      totalProductsScanned: snap.size,
      brokenCount: brokenEntries.length,
      validCount: snap.size - brokenEntries.length,
      previewLimitUsed: previewLimit,
      updatedCount: dryRun ? 0 : toUpdate.length,
      brokenEntries: brokenEntries.slice(0, previewLimit),
    };

    console.log('[migrateProductImagePaths] summary:', summary);
    return summary;
  }
);