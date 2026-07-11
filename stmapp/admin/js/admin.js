// stmapp/admin/js/admin.js
'use strict';

const PROD_API_BASE = 'https://teh-tarik-app-k4w4.onrender.com';
const isLocalHostRuntime = ['localhost', '127.0.0.1'].includes(window.location.hostname);
const API_BASE = isLocalHostRuntime ? PROD_API_BASE : window.location.origin;
let API_TOKEN = localStorage.getItem('stmapp_admin_token') || '';
let currentOpenOrders = [];
let onlineDrivers = [];
let pollInterval = null;

document.addEventListener('DOMContentLoaded', () => {
  initDate();
  checkAuth();

  // Navigation Panel Toggle Listener
  document.querySelectorAll('.sidebar-menu .menu-item').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('.sidebar-menu .menu-item').forEach(el => el.classList.remove('active'));
      item.classList.add('active');

      const targetPanel = item.dataset.target;
      document.querySelectorAll('.panel-content').forEach(panel => panel.style.display = 'none');
      document.getElementById(targetPanel).style.display = 'block';

      // Update Header Title
      const btnText = item.querySelector('button').textContent.split(' ').slice(1).join(' ');
      document.getElementById('current-panel-title').textContent = btnText;

      // Trigger panel-specific loading
      triggerPanelLoad(targetPanel);
    });
  });

  // Auth Form Submit
  document.getElementById('admin-login-form').addEventListener('submit', handleLogin);

  // Add Product Catalog Form Submit
  document.getElementById('add-product-form').addEventListener('submit', handleAddProduct);

  // Add Promo Code Form Submit
  document.getElementById('create-promo-form').addEventListener('submit', handleCreatePromo);
});

function initDate() {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  document.getElementById('current-date').textContent = new Date().toLocaleDateString('en-SG', options);
}

function checkAuth() {
  if (API_TOKEN) {
    document.getElementById('login-view').style.display = 'none';
    document.getElementById('dashboard-view').style.display = 'flex';
    document.getElementById('admin-profile-name').textContent = localStorage.getItem('stmapp_admin_name') || 'Administrator';
    
    // Core Initializer Load
    loadOverviewStats();
    loadDriversList(); // Load drivers first so order assignments have dropdown items populated
    startPollingLoop();
  } else {
    document.getElementById('login-view').style.display = 'flex';
    document.getElementById('dashboard-view').style.display = 'none';
    stopPollingLoop();
  }
}

// Authenticate Sign In
async function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value.trim();

  try {
    const res = await fetch(`${API_BASE}/api/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Authentication failed');

    localStorage.setItem('stmapp_admin_token', data.token);
    localStorage.setItem('stmapp_admin_name', data.user.name);
    API_TOKEN = data.token;
    
    checkAuth();
  } catch (err) {
    alert(`❌ Login Error: ${err.message}`);
  }
}

function handleLogout() {
  localStorage.removeItem('stmapp_admin_token');
  localStorage.removeItem('stmapp_admin_name');
  API_TOKEN = '';
  checkAuth();
}

// Background Poller
function startPollingLoop() {
  if (pollInterval) clearInterval(pollInterval);
  pollInterval = setInterval(() => {
    loadOverviewStats();
  }, 6000);
}

function stopPollingLoop() {
  if (pollInterval) clearInterval(pollInterval);
}

// Switch panels load router
function triggerPanelLoad(panelId) {
  if (panelId === 'panel-overview') loadOverviewStats();
  else if (panelId === 'panel-orders') loadOrdersFeed();
  else if (panelId === 'panel-menu') loadMenuCatalog();
  else if (panelId === 'panel-promos') loadPromosList();
  else if (panelId === 'panel-drivers') loadDriversList();
  else if (panelId === 'panel-customers') loadCustomersList();
}

// 1. OVERVIEW DATA
async function loadOverviewStats() {
  try {
    const res = await fetch(`${API_BASE}/api/admin/dashboard-stats`, {
      headers: { 'Authorization': `Bearer ${API_TOKEN}` }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);

    // Update numbers
    document.getElementById('stat-revenue').textContent = `SGD ${data.stats.totalRevenue.toFixed(2)}`;
    document.getElementById('stat-active-orders').textContent = data.stats.pendingOrdersCount;
    document.getElementById('stat-total-orders').textContent = data.stats.totalOrdersCount;
    document.getElementById('stat-drivers-online').textContent = data.stats.onlineDriversCount;

    // Populated Table
    const tbody = document.getElementById('overview-recent-orders');
    if (data.recentOrders.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:var(--text-muted)">No active transactions in feed.</td></tr>`;
      return;
    }

    tbody.innerHTML = data.recentOrders.map(order => `
      <tr>
        <td style="color:var(--secondary-color); font-weight:800">#${order.id}</td>
        <td>${order.customer.name}</td>
        <td style="text-transform:uppercase">${order.payment.method}</td>
        <td>SGD ${order.total.toFixed(2)}</td>
        <td style="text-transform:capitalize">${order.mode}</td>
        <td><span class="badge badge-${order.status}">${order.status === 'out_for_delivery' ? 'Out' : order.status}</span></td>
      </tr>
    `).join('');

    // Check for new incoming "placed" orders to trigger alarm audio!
    const incomingUnseen = data.recentOrders.some(o => o.status === 'placed');
    if (incomingUnseen) {
      const audio = document.getElementById('order-sound');
      if (audio) audio.play().catch(() => {});
    }
  } catch (err) {
    console.error('Overview stats load fail', err);
  }
}

// 2. LIVE ORDERS MANAGER FEED
async function loadOrdersFeed() {
  try {
    const res = await fetch(`${API_BASE}/api/orders`, {
      headers: { 'Authorization': `Bearer ${API_TOKEN}` }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);

    const tbody = document.getElementById('orders-feed-table');
    if (data.orders.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; color:var(--text-muted)">Order queue empty.</td></tr>`;
      return;
    }

    tbody.innerHTML = data.orders.map(order => {
      const itemsString = order.items.map(i => `${i.name} (${i.qty})`).join(', ');
      
      // Driver selection options markup
      let driverSelector = `<span style="font-size:12px; color:var(--text-muted)">N/A (Pickup)</span>`;
      if (order.mode === 'delivery') {
        const currentDriverName = order.assignedRiderName || 'Unassigned';
        driverSelector = `
          <select class="form-select" style="margin:0; padding:6px 12px; font-size:12px; width:140px" onchange="assignDriver('${order.id}', this.value)">
            <option value="">${currentDriverName}</option>
            ${onlineDrivers.map(d => `<option value="${d._id}">${d.name} (${d.vehicleType || d.vehicleDetails || 'rider'})</option>`).join('')}
          </select>
        `;
      }

      // Actions buttons
      let actionButtons = '';
      if (order.status === 'placed') {
        actionButtons = `<button class="btn-action" style="background:var(--success-color)" onclick="updateOrderStatus('${order.id}', 'confirmed')">Accept</button>`;
      } else if (order.status === 'confirmed') {
        actionButtons = `<button class="btn-action" style="background:#3b82f6" onclick="updateOrderStatus('${order.id}', 'preparing')">Prepare</button>`;
      } else if (order.status === 'preparing') {
        actionButtons = `<button class="btn-action" style="background:#8b5cf6" onclick="updateOrderStatus('${order.id}', 'ready')">Ready</button>`;
      } else if (order.status === 'ready' && order.mode === 'pickup') {
        actionButtons = `<button class="btn-action" style="background:var(--success-color)" onclick="updateOrderStatus('${order.id}', 'delivered')">Deliver/Pickup</button>`;
      } else if (order.status === 'out_for_delivery') {
        actionButtons = `<span style="font-size:11px; color:var(--text-muted)">Out with Driver</span>`;
      } else if (order.status === 'delivered') {
        actionButtons = `🏁 Completed`;
      }

      if (order.status !== 'delivered' && order.status !== 'cancelled') {
        actionButtons += ` <button class="btn-action" style="background:var(--danger-color)" onclick="updateOrderStatus('${order.id}', 'cancelled')">Cancel</button>`;
      }

      return `
        <tr>
          <td style="color:var(--secondary-color); font-weight:800">#${order.id}</td>
          <td>
            <strong>${order.customer.name}</strong><br>
            <span style="font-size:11px; color:var(--text-muted)">${order.customer.phone} | ${order.customer.address}</span>
          </td>
          <td>${itemsString}</td>
          <td>SGD ${order.total.toFixed(2)}</td>
          <td><span class="badge badge-${order.status}">${order.status}</span></td>
          <td>${driverSelector}</td>
          <td><div class="actions-row">${actionButtons}</div></td>
        </tr>
      `;
    }).join('');
  } catch (err) {
    console.error('Load orders fail', err);
  }
}

async function updateOrderStatus(orderId, nextStatus) {
  try {
    const res = await fetch(`${API_BASE}/api/orders/${orderId}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_TOKEN}`
      },
      body: JSON.stringify({ status: nextStatus })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);

    alert(`Order status updated to: ${nextStatus} successfully!`);
    loadOrdersFeed();
    loadOverviewStats();
  } catch (err) {
    alert(`❌ Order update error: ${err.message}`);
  }
}

async function assignDriver(orderId, driverId) {
  if (!driverId) return;
  try {
    const res = await fetch(`${API_BASE}/api/orders/${orderId}/assign-driver`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_TOKEN}`
      },
      body: JSON.stringify({ driverId })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);

    alert('Driver successfully assigned to order!');
    loadOrdersFeed();
  } catch (err) {
    alert(`❌ Driver assign error: ${err.message}`);
  }
}

// 3. MENU DYNAMIC CRUD
async function loadMenuCatalog() {
  try {
    const res = await fetch(`${API_BASE}/api/menu`);
    const products = await res.json();

    const tbody = document.getElementById('menu-catalog-table');
    tbody.innerHTML = products.map(prod => `
      <tr>
        <td>
          <div style="display:flex; align-items:center; gap:10px">
            <img src="${prod.image}" alt="" style="width:40px; height:40px; border-radius:8px; object-fit:cover">
            <strong>${prod.name}</strong>
          </div>
        </td>
        <td style="text-transform:capitalize">${prod.category}</td>
        <td>SGD ${prod.price.toFixed(2)}</td>
        <td>${prod.prepTime} Mins</td>
        <td><span class="badge badge-preparing">${prod.active ? 'Active' : 'Draft'}</span></td>
        <td>
          <button class="btn-action" style="background:var(--danger-color)" onclick="deleteProduct('${prod._id}')">Remove</button>
        </td>
      </tr>
    `).join('');
  } catch (err) {
    console.error('Menu load error', err);
  }
}

async function handleAddProduct(e) {
  e.preventDefault();
  const name = document.getElementById('prod-name').value.trim();
  const category = document.getElementById('prod-category').value;
  const price = document.getElementById('prod-price').value;
  const prepTime = document.getElementById('prod-preptime').value;
  const description = document.getElementById('prod-desc').value.trim();
  const image = document.getElementById('prod-image').value.trim() || 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=400';

  try {
    const res = await fetch(`${API_BASE}/api/menu/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_TOKEN}`
      },
      body: JSON.stringify({ name, category, price, description, image, prepTime })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);

    alert('Product successfully published to active menu catalog! 🍽️');
    document.getElementById('add-product-form').reset();
    loadMenuCatalog();
  } catch (err) {
    alert(`❌ Product addition failed: ${err.message}`);
  }
}

async function deleteProduct(productId) {
  if (!confirm('Are you sure you want to remove this product from catalog?')) return;
  try {
    const res = await fetch(`${API_BASE}/api/menu/products/${productId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${API_TOKEN}` }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);

    alert('Product removed successfully.');
    loadMenuCatalog();
  } catch (err) {
    alert(`❌ Delete error: ${err.message}`);
  }
}

// 4. PROMOTIONS
async function loadPromosList() {
  try {
    const res = await fetch(`${API_BASE}/api/admin/promos`, {
      headers: { 'Authorization': `Bearer ${API_TOKEN}` }
    });
    const data = await res.json();

    const tbody = document.getElementById('promos-table');
    tbody.innerHTML = data.promos.map(promo => `
      <tr>
        <td><strong>${promo.code}</strong></td>
        <td>${promo.discountValue} SGD</td>
        <td>SGD ${promo.minOrder.toFixed(2)}</td>
        <td>${new Date(promo.expiresAt).toLocaleDateString('en-SG')}</td>
        <td><span class="badge badge-preparing">${promo.active ? 'Active' : 'Expired'}</span></td>
        <td>
          <button class="btn-action" style="background:var(--danger-color)" onclick="deletePromo('${promo._id}')">Delete</button>
        </td>
      </tr>
    `).join('');
  } catch (err) {
    console.error('Promo load error', err);
  }
}

async function handleCreatePromo(e) {
  e.preventDefault();
  const code = document.getElementById('promo-code').value.trim();
  const discountValue = document.getElementById('promo-val').value;
  const minOrder = document.getElementById('promo-min').value;
  const expiresAt = document.getElementById('promo-expires').value;

  try {
    const res = await fetch(`${API_BASE}/api/admin/promos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_TOKEN}`
      },
      body: JSON.stringify({ code, discountType: 'flat', discountValue, minOrder, expiresAt })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);

    alert('Promotion code created successfully!');
    document.getElementById('create-promo-form').reset();
    loadPromosList();
  } catch (err) {
    alert(`❌ Promo creation error: ${err.message}`);
  }
}

async function deletePromo(promoId) {
  if (!confirm('Delete this promotional code?')) return;
  try {
    const res = await fetch(`${API_BASE}/api/admin/promos/${promoId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${API_TOKEN}` }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);

    alert('Promo deleted.');
    loadPromosList();
  } catch (err) {
    alert(`❌ Promo delete error: ${err.message}`);
  }
}

// 5. DRIVERS
async function loadDriversList() {
  try {
    const res = await fetch(`${API_BASE}/api/admin/drivers`, {
      headers: { 'Authorization': `Bearer ${API_TOKEN}` }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);

    onlineDrivers = data.drivers;

    const tbody = document.getElementById('drivers-table');
    tbody.innerHTML = data.drivers.map(driver => `
      <tr>
        <td><strong>${driver.name}</strong></td>
        <td>${driver.phone}<br><span style="font-size:11px; color:var(--text-muted)">${driver.email}</span></td>
        <td style="text-transform:capitalize">${driver.vehicleType || driver.vehicleDetails || '-'} (${driver.vehiclePlate || 'Walk'})</td>
        <td>⭐ ${(driver.rating || 0).toFixed(1)} (${driver.tripCount || 0} trips)</td>
        <td>SGD ${(driver.earnings || 0).toFixed(2)}</td>
        <td><span class="badge ${driver.status === 'delivering' ? 'badge-out' : driver.status === 'online' ? 'badge-preparing' : 'badge-cancelled'}">${driver.status || 'unknown'}</span></td>
      </tr>
    `).join('');
  } catch (err) {
    console.error('Drivers list load fail', err);
  }
}

// 6. CUSTOMERS
async function loadCustomersList() {
  try {
    const res = await fetch(`${API_BASE}/api/admin/users`, {
      headers: { 'Authorization': `Bearer ${API_TOKEN}` }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);

    const tbody = document.getElementById('customers-table');
    tbody.innerHTML = data.users.map(user => `
      <tr>
        <td><strong>${user.name}</strong></td>
        <td>${user.email}</td>
        <td>${user.phone}</td>
        <td>
          <span style="font-size:11px">Halal: ${user.dietaryPreferences?.halalOnly ? '✅' : '❌'} | Nut-Free: ${user.dietaryPreferences?.nutFree ? '🔔' : '❌'}</span>
        </td>
        <td>${new Date(user.createdAt).toLocaleDateString('en-SG')}</td>
      </tr>
    `).join('');
  } catch (err) {
    console.error('Customer database query failed', err);
  }
}
