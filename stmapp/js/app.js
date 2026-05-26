// ══════════════════════════════════════════════════════════════
// STM SALAM APP — Core JavaScript (app.js)
// Shared utilities, cart, splash, navigation, PWA
// ══════════════════════════════════════════════════════════════

'use strict';

/* ── Shop Info (mirrors menuData.js) ── */
const SHOP_INFO = {
  name: 'STM Salam',
  tagline: 'Authentic Kopitiam Flavors, Delivered.',
  outletName: 'STM Salam — Blk 50A',
  outletAddress: 'Blk 50A Marine Terrace, #01-303, Singapore 441050',
  phone: '+65 9191 5766',
  whatsapp: '+6591915766',
  email: 'highlitesg786@gmail.com',
  hours: 'Daily 9:00 AM – 11:00 PM',
  avgDeliveryTime: '25–35 min',
  deliveryFee: 2.00,
  minOrderDelivery: 10.00,
  minOrderFreeDelivery: 10.00,
  freeDeliveryRadiusKm: 5,
};

/* ── Menu Items (static catalog matching existing site) ── */
const MENU_ITEMS = [
  // HOT DRINKS
  { id: 1, category: 'hot-drinks', name: 'Ginger Tea', price: 2.00, description: 'Traditional warming ginger tea brewed fresh.', img: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=400', badge: 'bestseller' },
  { id: 2, category: 'hot-drinks', name: 'Horlicks Hot', price: 2.50, description: 'Classic hot Horlicks – the comfort drink.', img: 'https://images.unsplash.com/photo-1553906982-d46921b021d7?auto=format&fit=crop&w=400', badge: null },
  { id: 3, category: 'hot-drinks', name: 'Teh O', price: 1.80, description: 'Black tea with sugar, no milk.', img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=400', badge: null },
  { id: 4, category: 'hot-drinks', name: 'Teh Tarik', price: 2.00, description: "Singapore's iconic pulled milk tea, frothy & sweet.", img: 'https://images.unsplash.com/photo-1544145945-f904253d0c71?auto=format&fit=crop&w=400', badge: 'bestseller' },
  { id: 5, category: 'hot-drinks', name: 'Kopi', price: 1.80, description: 'Traditional Singapore coffee, rich and bold.', img: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400', badge: null },
  // COLD DRINKS
  { id: 10, category: 'cold-drinks', name: 'Kopi C Kosong Ice', price: 2.50, description: 'Iced coffee with evaporated milk, no sugar.', img: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400', badge: 'bestseller' },
  { id: 11, category: 'cold-drinks', name: 'Honey Lemon Ice', price: 3.00, description: 'Honey and fresh lemon over ice.', img: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=400', badge: null },
  { id: 12, category: 'cold-drinks', name: 'Teh Ginger Ice', price: 2.80, description: 'Iced ginger tea – refreshing and spicy.', img: 'https://images.unsplash.com/photo-1544145945-f904253d0c71?auto=format&fit=crop&w=400', badge: null },
  { id: 13, category: 'cold-drinks', name: 'Fresh Lemon Juice Ice', price: 3.00, description: 'Pure freshly squeezed lemon juice served over ice. Refreshing and zesty.', img: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=400', badge: 'bestseller' },
  // CAN DRINKS
  { id: 20, category: 'can-drinks', name: 'Dasani Water', price: 1.50, description: 'Pure drinking water.', img: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=400', badge: null },
  { id: 21, category: 'can-drinks', name: 'KICKAPOO', price: 2.00, description: 'Classic citrus carbonated drink.', img: 'https://images.unsplash.com/photo-1581006852262-e4307cf6283a?auto=format&fit=crop&w=400', badge: null },
  { id: 22, category: 'can-drinks', name: 'Chrysanthemum Tea', price: 2.00, description: 'Sweet chrysanthemum flower tea.', img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=400', badge: null },
  // SUGARCANE
  { id: 30, category: 'sugarcane', name: 'Fresh Sugarcane, Lemon No Ice', price: 3.50, description: 'Freshly pressed sugarcane with a squeeze of lemon.', img: 'https://images.unsplash.com/photo-1596461404969-9ae70fc2975c?auto=format&fit=crop&w=400', badge: 'bestseller' },
  { id: 31, category: 'sugarcane', name: 'Fresh Sugarcane Less Ice with Lemon', price: 3.50, description: 'Less ice, more sugarcane goodness with lemon.', img: 'https://images.unsplash.com/photo-1596461404969-9ae70fc2975c?auto=format&fit=crop&w=400', badge: null },
  { id: 32, category: 'sugarcane', name: 'Fresh Sugarcane Asam Ice', price: 3.80, description: 'Sugarcane with asam (tamarind) – tangy & sweet.', img: 'https://images.unsplash.com/photo-1596461404969-9ae70fc2975c?auto=format&fit=crop&w=400', badge: null },
  // DINOSAUR
  { id: 40, category: 'dinosaur', name: 'Milo Dino ICE', price: 3.50, description: 'Iced Milo topped with Milo powder — the legendary dino.', img: 'https://images.unsplash.com/photo-1544145945-f904253d0c71?auto=format&fit=crop&w=400', badge: 'bestseller' },
  { id: 41, category: 'dinosaur', name: 'Bandung Dinosaur', price: 3.80, description: 'Rose syrup milk topped with extra powder.', img: 'https://images.unsplash.com/photo-1544145945-f904253d0c71?auto=format&fit=crop&w=400', badge: null },
  { id: 42, category: 'dinosaur', name: 'Horlicks Dinosaur Ice', price: 3.80, description: 'Iced Horlicks with extra Horlicks powder on top.', img: 'https://images.unsplash.com/photo-1553906982-d46921b021d7?auto=format&fit=crop&w=400', badge: null },
  // BURGERS & KEBABS
  { id: 50, category: 'burgers-kebabs', name: 'LAMB BURGER CLASSIC', price: 10.00, description: 'Juicy lamb patty with fresh veggies in a brioche bun.', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400', badge: 'bestseller' },
  { id: 51, category: 'burgers-kebabs', name: 'Hummus Falafel Tortilla', price: 8.50, description: 'Crispy falafel with creamy hummus in a tortilla wrap.', img: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=400', badge: null },
  { id: 52, category: 'burgers-kebabs', name: 'Chicken Burger Classic', price: 8.00, description: 'Grilled chicken breast on a toasted brioche bun.', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400', badge: null },
  // SNACKS
  { id: 60, category: 'snacks', name: 'Roti Curry 1 Piece', price: 2.00, description: 'Flaky roti with savory curry dip.', img: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=400', badge: null },
  { id: 61, category: 'snacks', name: '7 DAYS 1 Piece', price: 1.50, description: 'Classic 7 Days croissant snack.', img: 'https://images.unsplash.com/photo-1555507036-ab1f4038024a?auto=format&fit=crop&w=400', badge: null },
  { id: 62, category: 'snacks', name: 'Bhai Suji', price: 3.00, description: 'Traditional Indian semolina snack.', img: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=400', badge: 'bestseller' },
  // SIDES
  { id: 70, category: 'sides', name: 'ONION RINGS', price: 5.00, description: 'Golden crispy onion rings.', img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400', badge: null },
  { id: 71, category: 'sides', name: 'French Fries', price: 4.00, description: 'Classic golden french fries.', img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400', badge: 'bestseller' },
  { id: 72, category: 'sides', name: 'Cheese Fries', price: 5.50, description: 'Fries topped with melted cheese sauce.', img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400', badge: null },
  // DESSERTS
  { id: 80, category: 'desserts', name: 'KUNAFA ORIGINAL', price: 6.00, description: 'Crunchy kunafa with cream cheese filling.', img: 'https://images.unsplash.com/photo-1518176258439-d3dd5480ba01?auto=format&fit=crop&w=400', badge: 'bestseller' },
  { id: 81, category: 'desserts', name: 'KUNAFA NUTELLA', price: 7.00, description: 'Kunafa drizzled with rich Nutella.', img: 'https://images.unsplash.com/photo-1518176258439-d3dd5480ba01?auto=format&fit=crop&w=400', badge: 'new' },
  // INDIAN FOOD
  { id: 90, category: 'indian', name: 'Mutton Biryani', price: 9.00, description: 'Fragrant basmati rice with tender mutton.', img: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=400', badge: 'bestseller' },
  { id: 91, category: 'indian', name: 'PRATA TELUR', price: 2.50, description: 'Crispy prata with egg – a local classic.', img: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=400', badge: null },
  { id: 92, category: 'indian', name: 'MURTABAK MUTTON', price: 7.00, description: 'Stuffed pancake with spiced mutton.', img: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=400', badge: 'bestseller' },
];

const CATEGORIES = [
  { id: 'all',          name: 'Full Menu',           emoji: '🍽️' },
  { id: 'hot-drinks',   name: 'Hot Drinks',          emoji: '☕' },
  { id: 'cold-drinks',  name: 'Cold Drinks',         emoji: '🧊' },
  { id: 'can-drinks',   name: 'Can Drinks',          emoji: '🥫' },
  { id: 'sugarcane',    name: 'Sugarcane',           emoji: '🎋' },
  { id: 'dinosaur',     name: 'Dinosaur',            emoji: '🦕' },
  { id: 'burgers-kebabs', name: 'Burgers & Kebabs',  emoji: '🍔' },
  { id: 'snacks',       name: 'Snacks',              emoji: '🥟' },
  { id: 'sides',        name: 'Sides',               emoji: '🍟' },
  { id: 'desserts',     name: 'Desserts',            emoji: '🍰' },
  { id: 'indian',       name: 'Indian Food',         emoji: '🍛' },
];

/* ══════════════════════════════════════════════════════════════
   CART MANAGER
   ══════════════════════════════════════════════════════════════ */
const Cart = (() => {
  const STORAGE_KEY = 'stmapp_cart';

  let _items = [];
  let _listeners = [];

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      _items = raw ? JSON.parse(raw) : [];
    } catch { _items = []; }
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(_items));
    _listeners.forEach(fn => fn(_items));
  }

  function subscribe(fn) {
    _listeners.push(fn);
    fn(_items);
    return () => { _listeners = _listeners.filter(l => l !== fn); };
  }

  function add(item) {
    const existing = _items.find(i => i.id === item.id);
    if (existing) {
      existing.qty += 1;
    } else {
      _items.push({ ...item, qty: 1 });
    }
    save();
  }

  function updateQty(id, delta) {
    const idx = _items.findIndex(i => i.id === id);
    if (idx === -1) return;
    _items[idx].qty += delta;
    if (_items[idx].qty <= 0) _items.splice(idx, 1);
    save();
  }

  function remove(id) {
    _items = _items.filter(i => i.id !== id);
    save();
  }

  function clear() {
    _items = [];
    save();
  }

  function getItems() { return [..._items]; }

  function getSubtotal() {
    return _items.reduce((s, i) => s + i.price * i.qty, 0);
  }

  function getTotalItems() {
    return _items.reduce((s, i) => s + i.qty, 0);
  }

  load();
  return { subscribe, add, updateQty, remove, clear, getItems, getSubtotal, getTotalItems };
})();

/* ══════════════════════════════════════════════════════════════
   TOAST NOTIFICATIONS
   ══════════════════════════════════════════════════════════════ */
function showToast(message, type = 'default', duration = 2800) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : type === 'gold' ? '⭐' : '🍽️';
  toast.innerHTML = `<span class="toast-icon">${icon}</span> ${message}`;
  container.appendChild(toast);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add('show'));
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, duration);
}

/* ══════════════════════════════════════════════════════════════
   SPLASH SCREEN — bulletproof dismissal
   ══════════════════════════════════════════════════════════════ */
function _hideSplash() {
  try {
    var splash = document.getElementById('splash-screen');
    if (!splash) return;
    // Primary: class-based transition
    splash.classList.add('hidden');
    // Secondary: force inline styles in case CSS transition is blocked
    splash.style.opacity = '0';
    splash.style.visibility = 'hidden';
    splash.style.pointerEvents = 'none';
    // Tertiary: fully remove from DOM after transition
    setTimeout(function() {
      try {
        splash.style.display = 'none';
        if (splash.parentNode) splash.parentNode.removeChild(splash);
      } catch(e) {}
    }, 600);
  } catch(e) {}
}

function initSplash() {
  // Show for minimum 1.8 seconds then dismiss
  setTimeout(_hideSplash, 1800);
  // Hard deadline: no matter what, dismiss after 3 seconds
  setTimeout(_hideSplash, 3000);
}

// GLOBAL ERROR HANDLER — even if JS crashes elsewhere, splash still hides
window.addEventListener('error', function() {
  setTimeout(_hideSplash, 500);
});
window.addEventListener('unhandledrejection', function() {
  setTimeout(_hideSplash, 500);
});

/* ══════════════════════════════════════════════════════════════
   BOTTOM NAVIGATION — Active State
   ══════════════════════════════════════════════════════════════ */
function initBottomNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const pageMap = {
    'index.html':    'home',
    '':              'home',
    'menu.html':     'menu',
    'checkout.html': 'checkout',
    'orders.html':   'orders',
    'profile.html':  'profile',
    'support.html':  'support',
  };
  const active = pageMap[currentPage] || 'home';

  document.querySelectorAll('.nav-item').forEach(item => {
    if (item.dataset.page === active) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}

/* ══════════════════════════════════════════════════════════════
   FLOATING CART BUTTON
   ══════════════════════════════════════════════════════════════ */
function initFloatingCart() {
  const fc = document.getElementById('floating-cart');
  if (!fc) return;

  Cart.subscribe(items => {
    const total = Cart.getSubtotal();
    const count = Cart.getTotalItems();
    const countEl = fc.querySelector('.cart-count-badge');
    const totalEl = fc.querySelector('.cart-btn-total');

    if (countEl) countEl.textContent = count;
    if (totalEl) totalEl.textContent = `SGD ${total.toFixed(2)}`;

    if (count > 0) {
      fc.classList.add('visible');
    } else {
      fc.classList.remove('visible');
    }
  });
}

/* ══════════════════════════════════════════════════════════════
   CART HEADER BADGE
   ══════════════════════════════════════════════════════════════ */
function initCartBadge() {
  const badge = document.getElementById('header-cart-badge');
  if (!badge) return;
  Cart.subscribe(() => {
    const count = Cart.getTotalItems();
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  });
}

/* ══════════════════════════════════════════════════════════════
   PULL TO REFRESH — NO reload; indicator-only, one-shot guarded
   ══════════════════════════════════════════════════════════════ */
function initPullToRefresh() {
  var indicator = document.getElementById('ptr-indicator');
  // Hide it immediately so it never flashes on page load
  if (indicator) {
    indicator.style.display = 'none';
  }

  // Pull-to-refresh is DISABLED — removing it prevents the reload loop.
  // Users can refresh using the browser's native refresh button.
  // If you want to re-enable it later, use a non-reload approach (re-render).
}

/* ══════════════════════════════════════════════════════════════
   PWA — Register Service Worker (once only, no forced reloads)
   ══════════════════════════════════════════════════════════════ */
var _swRegistered = false; // prevent duplicate registration calls

function initPWA() {
  if (_swRegistered || !('serviceWorker' in navigator)) return;
  _swRegistered = true;

  // Only attempt SW registration on actual http/https (not file://)
  if (window.location.protocol === 'file:') {
    console.log('[SW] Skipped: file:// protocol not supported.');
    return;
  }

  try {
    var swPath = new URL('sw.js', window.location.href).href;
    navigator.serviceWorker.register(swPath, { scope: './' })
      .then(function(reg) {
        console.log('[SW] Registered OK:', reg.scope);
        // Do NOT call reg.update() here — that would trigger a reload cycle
      })
      .catch(function(err) {
        console.warn('[SW] Registration failed (non-fatal):', err);
      });
  } catch(e) {
    console.warn('[SW] Registration error:', e);
  }
}

/* ══════════════════════════════════════════════════════════════
   SKELETON LOADERS
   ══════════════════════════════════════════════════════════════ */
function showSkeletons(containerId, count = 4) {
  const container = document.getElementById(containerId);
  if (!container) return;
  let html = '';
  for (let i = 0; i < count; i++) {
    html += `
      <div class="skeleton-card">
        <div class="skeleton skeleton-img"></div>
        <div style="flex:1">
          <div class="skeleton skeleton-text-lg"></div>
          <div class="skeleton skeleton-text-sm"></div>
          <div class="skeleton skeleton-text-md" style="width:40%"></div>
        </div>
      </div>`;
  }
  container.innerHTML = html;
}

/* ══════════════════════════════════════════════════════════════
   DRAWER
   ══════════════════════════════════════════════════════════════ */
function openDrawer(drawerId) {
  const overlay = document.getElementById('drawer-overlay');
  const drawer  = document.getElementById(drawerId);
  if (overlay) overlay.classList.add('open');
  if (drawer)  drawer.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeAllDrawers() {
  document.querySelectorAll('.drawer-overlay').forEach(el => el.classList.remove('open'));
  document.querySelectorAll('.drawer').forEach(el => el.classList.remove('open'));
  document.body.style.overflow = '';
}

/* ══════════════════════════════════════════════════════════════
   HEADER SCROLL SHADOW
   ══════════════════════════════════════════════════════════════ */
function initHeaderShadow() {
  const header = document.querySelector('.app-header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      header.style.boxShadow = '0 4px 24px rgba(0,0,0,0.08)';
    } else {
      header.style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)';
    }
  }, { passive: true });
}

/* ══════════════════════════════════════════════════════════════
   API SERVICES & INTEGRATION (FULL STACK CAPABILITIES)
   ══════════════════════════════════════════════════════════════ */
const API_BASE =
  window.location.protocol === 'capacitor:' ? 'http://10.0.2.2:5000/api' :
  window.location.hostname !== 'localhost' ? 'https://teh-tarik-app-k4w4.onrender.com/api' :
  'http://localhost:5000/api';
const API = (() => {
  const getHeaders = () => {
    const token = localStorage.getItem('stmapp_customer_token');
    return {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    };
  };

  async function fetchMenu() {
    try {
      const res = await fetch(`${API_BASE}/api/menu`);
      if (!res.ok) throw new Error();
      const products = await res.json();
      // Translate database model schema to matching frontend naming
      return products.map(p => ({
        id: p._id || p.id,
        category: p.category,
        name: p.name,
        price: p.price,
        description: p.description,
        img: p.image,
        badge: p.badge
      }));
    } catch {
      return MENU_ITEMS; // Seamless offline static fallback
    }
  }

  async function placeOrder(orderData) {
    try {
      const res = await fetch(`${API_BASE}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      return data;
    } catch (err) {
      console.warn('Backend server offline, placing order in offline mock mode.');
      return { success: true, orderId: orderData.id, offline: true };
    }
  }

  async function validatePromo(code, amount) {
    try {
      const res = await fetch(`${API_BASE}/api/orders/validate-promo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, amount })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      return data;
    } catch (err) {
      throw new Error(err.message || 'Promo validation offline.');
    }
  }

  async function getOrderDetails(orderId) {
    try {
      const res = await fetch(`${API_BASE}/api/orders/${orderId}`);
      if (!res.ok) throw new Error();
      return await res.json();
    } catch {
      // Offline fallback lookup
      const orders = JSON.parse(localStorage.getItem('stmapp_orders') || '[]');
      return orders.find(o => o.id === orderId) || null;
    }
  }

  return { fetchMenu, placeOrder, validatePromo, getOrderDetails, getHeaders };
})();

/* ══════════════════════════════════════════════════════════════
   EXPORT — must be defined BEFORE DOMContentLoaded so inline
   page scripts can safely destructure window.STMApp immediately
   after this script loads.
   ══════════════════════════════════════════════════════════════ */
window.STMApp = {
  SHOP_INFO: SHOP_INFO,
  MENU_ITEMS: MENU_ITEMS,
  CATEGORIES: CATEGORIES,
  Cart: Cart,
  API: API,
  showToast: showToast,
  showSkeletons: showSkeletons,
  openDrawer: openDrawer,
  closeAllDrawers: closeAllDrawers,
};

/* ══════════════════════════════════════════════════════════════
   GLOBAL INIT
   ══════════════════════════════════════════════════════════════ */
var _appInitialized = false;

function _runInit() {
  if (_appInitialized) {
    _hideSplash();
    return;
  }
  _appInitialized = true;

  try { initSplash(); }       catch(e) { setTimeout(_hideSplash, 100); }
  try { initBottomNav(); }    catch(e) {}
  try { initFloatingCart(); } catch(e) {}
  try { initCartBadge(); }    catch(e) {}
  try { initPullToRefresh(); }catch(e) {}
  try { initPWA(); }          catch(e) {}
  try { initHeaderShadow(); } catch(e) {}

  // Close drawers on overlay click
  document.querySelectorAll('.drawer-overlay').forEach(function(overlay) {
    overlay.addEventListener('click', closeAllDrawers);
  });

  // Scroll-reveal animations
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-up');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('[data-animate]').forEach(function(el) {
      observer.observe(el);
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', _runInit);
} else {
  // DOM already ready (script loaded async or deferred)
  _runInit();
}
