import { apiClient } from './apiClient';
import dynamicMenu from '../../data/dynamicMenu';
import { parseFileName } from '../../utils/menuParser';

// ─── CATEGORIES ─────────────────────────────────────────────────────────────

export const fetchCategories = async () => {
  try {
    const data = await apiClient.get('/categories');
    return data;
  } catch (err) {
    console.error('Failed to fetch categories from BE, using local fallback', err);
    return [];
  }
};

/** Subscribe dummy - real BE would use WebSockets, for now we poll or just refetch */
export const subscribeCategories = (callback) => {
  fetchCategories().then(callback);
  const interval = setInterval(() => fetchCategories().then(callback), 10000);
  return () => clearInterval(interval);
};

export const addCategory = (categoryObj) => apiClient.post('/categories', categoryObj);
export const updateCategory = (id, updatedCat) => apiClient.patch(`/categories/${id}`, updatedCat);
export const deleteCategory = (id) => apiClient.delete(`/categories/${id}`);

// ─── PRODUCTS ────────────────────────────────────────────────────────────────

export const fetchProducts = async () => {
  try {
    return await apiClient.get('/menu');
  } catch (err) {
    console.error('Failed to fetch products from BE', err);
    return [];
  }
};

export const subscribeProducts = (callback, activeCategoryId = null) => {
  fetchProducts().then(prods => {
    if (activeCategoryId && activeCategoryId !== 'all') {
      callback(prods.filter(p => p.categoryId === activeCategoryId));
    } else {
      callback(prods);
    }
  });
  const interval = setInterval(() => {
    fetchProducts().then(prods => {
      if (activeCategoryId && activeCategoryId !== 'all') {
        callback(prods.filter(p => p.categoryId === activeCategoryId));
      } else {
        callback(prods);
      }
    });
  }, 10000);
  return () => clearInterval(interval);
};

export const addProduct = (product) => apiClient.post('/products', product);
export const updateProduct = (id, updatedProduct) => apiClient.patch(`/products/${id}`, updatedProduct);
export const deleteProduct = (id) => apiClient.delete(`/products/${id}`);

// ─── ORDERS ──────────────────────────────────────────────────────────────────

export const placeOrder = async (orderPayload) => {
  const res = await apiClient.post('/orders', orderPayload);
  if (res.success) {
    localStorage.setItem('stm_last_order_id', res.orderId);
    return { ...orderPayload, id: res.orderId };
  }
  throw new Error('Failed to place order');
};

export const fetchOrders = () => apiClient.get('/orders').then(data => data.orders);

export const subscribeOrders = (callback) => {
  fetchOrders().then(callback);
  const interval = setInterval(() => fetchOrders().then(callback), 5000);
  return () => clearInterval(interval);
};

export const fetchOrderById = (id) => apiClient.get(`/orders/${id}`);

export const updateOrderStatus = (id, status) => apiClient.patch(`/orders/${id}/status`, { status });

export const deleteOrder = (id) => apiClient.delete(`/orders/${id}`);

// ─── LOCAL STORAGE MIGRATION ────────────────────────────────────────────────
export const getLocalStorageSnapshot = () => {
  const tryParse = (key) => {
    try { return JSON.parse(localStorage.getItem(key)) || []; }
    catch { return []; }
  };
  return {
    categories: tryParse('stm_categories'),
    products:   tryParse('stm_products'),
    orders:     tryParse('stm_orders'),
  };
};

export const seedFromLocalStorage = async () => {
  console.log('Seeding from local storage to BE...');
  const { categories, products, orders } = getLocalStorageSnapshot();
  // We can push these to BE if needed, but for now we just return them to satisfy the UI
  return { categories: categories.length, products: products.length, orders: orders.length };
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

subscribeCategories(cats => { _cachedCategories = cats; });
subscribeProducts(prods => { _cachedProducts = prods; });
subscribeOrders(ords => { _cachedOrders = ords; });

export const dataService = {
  getCategories: () => [..._cachedCategories],
  getProducts: ()   => [..._cachedProducts],
  getProductsByCategory: (catId) => _cachedProducts.filter(p => p.categoryId === catId),
  getOrders: ()     => [..._cachedOrders],

  addCategory,
  updateCategory,
  deleteCategory,
  addProduct,
  updateProduct,
  deleteProduct,
  placeOrder,
  updateOrderStatus,
  deleteOrder,

  subscribeCategories,
  subscribeProducts,
  subscribeOrders,
  fetchOrderById,
  getDashboardStats: fetchDashboardStats,
};
