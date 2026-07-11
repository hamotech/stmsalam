// stmapp/driverapp/js/driver.js
'use strict';

const PROD_API_BASE = 'https://teh-tarik-app-k4w4.onrender.com';
const isLocalHostRuntime = ['localhost', '127.0.0.1'].includes(window.location.hostname);
const API_BASE = isLocalHostRuntime ? PROD_API_BASE : window.location.origin;
let API_TOKEN = localStorage.getItem('stmapp_driver_token') || '';
let DRIVER_UID = localStorage.getItem('stmapp_driver_uid') || '';
let driverStatus = 'offline';
let activeOrder = null;
let jobsPollInterval = null;
let activeDeliveryPollInterval = null;
let gpsWatchId = null;

document.addEventListener('DOMContentLoaded', () => {
  checkAuth();

  document.getElementById('driver-login-form').addEventListener('submit', handleLogin);
  document.getElementById('driver-register-form').addEventListener('submit', handleRegister);
});

function checkAuth() {
  if (API_TOKEN) {
    document.getElementById('auth-view').style.display = 'none';
    document.getElementById('driver-hub').style.display = 'block';

    loadDriverStats();
    startActiveDeliveryPolling();
  } else {
    document.getElementById('auth-view').style.display = 'block';
    document.getElementById('driver-hub').style.display = 'none';
    stopJobsPolling();
    stopActiveDeliveryPolling();
  }
}

// Independent of driver stats (which relies on an unimplemented endpoint) so that
// tracking an assigned delivery keeps working even when the stats card fails to load.
function startActiveDeliveryPolling() {
  if (activeDeliveryPollInterval) clearInterval(activeDeliveryPollInterval);
  checkActiveDeliveries();
  activeDeliveryPollInterval = setInterval(checkActiveDeliveries, 5000);
}

function stopActiveDeliveryPolling() {
  if (activeDeliveryPollInterval) clearInterval(activeDeliveryPollInterval);
}

function showRegisterPanel() {
  const card = document.getElementById('driver-register-card');
  card.style.display = card.style.display === 'none' ? 'block' : 'none';
}

async function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value.trim();

  try {
    const res = await fetch(`${API_BASE}/api/driver/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Courier login failed');

    localStorage.setItem('stmapp_driver_token', data.token);
    localStorage.setItem('stmapp_driver_name', data.user.name);
    localStorage.setItem('stmapp_driver_uid', data.user.uid);
    API_TOKEN = data.token;
    DRIVER_UID = data.user.uid;

    checkAuth();
  } catch (err) {
    alert(`❌ Sign In Error: ${err.message}`);
  }
}

async function handleRegister(e) {
  e.preventDefault();
  const name = document.getElementById('reg-name').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const password = document.getElementById('reg-password').value.trim();
  const phone = document.getElementById('reg-phone').value.trim();
  const vehicleType = document.getElementById('reg-vehicle').value;
  const vehiclePlate = document.getElementById('reg-plate').value.trim();

  try {
    const res = await fetch(`${API_BASE}/api/auth/driver/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, phone, vehicleType, vehiclePlate })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Rider application failed');

    alert('✅ Courier Registration submitted successfully! You can now log in.');
    document.getElementById('driver-register-form').reset();
    document.getElementById('driver-register-card').style.display = 'none';
  } catch (err) {
    alert(`❌ Registration failed: ${err.message}`);
  }
}

function handleLogout() {
  localStorage.removeItem('stmapp_driver_token');
  localStorage.removeItem('stmapp_driver_name');
  localStorage.removeItem('stmapp_driver_uid');
  API_TOKEN = '';
  DRIVER_UID = '';
  stopLiveLocationSharing();
  checkAuth();
}

// Fetch courier stats
async function loadDriverStats() {
  try {
    const res = await fetch(`${API_BASE}/api/drivers/stats`, {
      headers: { 'Authorization': `Bearer ${API_TOKEN}` }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);

    document.getElementById('driver-profile-name').textContent = `${data.stats.name} (${data.stats.vehicleType})`;
    document.getElementById('driver-earnings').textContent = `SGD ${data.stats.earnings.toFixed(2)}`;
    document.getElementById('driver-trips').textContent = data.stats.tripCount;

    driverStatus = data.stats.status;
    const toggle = document.getElementById('status-toggle');
    const label = document.getElementById('status-label');

    if (driverStatus === 'online' || driverStatus === 'delivering') {
      toggle.checked = true;
      label.textContent = 'Rider Status: ONLINE';
      document.getElementById('available-jobs-section').style.display = 'block';
      startJobsPolling();
    } else {
      toggle.checked = false;
      label.textContent = 'Rider Status: OFFLINE';
      document.getElementById('available-jobs-section').style.display = 'none';
      stopJobsPolling();
    }

    // Check if driver has an active uncompleted job cached from DB
    checkActiveDeliveries();
  } catch (err) {
    console.error('Stats query failed', err);
  }
}

// Toggle Online Status Router
async function toggleOnlineStatus() {
  const toggle = document.getElementById('status-toggle');
  const nextStatus = toggle.checked ? 'online' : 'offline';

  try {
    const res = await fetch(`${API_BASE}/api/drivers/toggle-status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_TOKEN}`
      },
      body: JSON.stringify({ status: nextStatus })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);

    loadDriverStats();
  } catch (err) {
    alert(`❌ Status toggle failed: ${err.message}`);
    toggle.checked = !toggle.checked;
  }
}

// Polling for jobs queue
function startJobsPolling() {
  if (jobsPollInterval) clearInterval(jobsPollInterval);
  loadAvailableJobs();
  jobsPollInterval = setInterval(loadAvailableJobs, 5000);
}

function stopJobsPolling() {
  if (jobsPollInterval) clearInterval(jobsPollInterval);
}

async function loadAvailableJobs() {
  // If delivering, rider can't accept jobs
  if (driverStatus === 'delivering') {
    document.getElementById('available-jobs-section').style.display = 'none';
    return;
  }
  document.getElementById('available-jobs-section').style.display = 'block';

  try {
    const res = await fetch(`${API_BASE}/api/drivers/available-jobs`, {
      headers: { 'Authorization': `Bearer ${API_TOKEN}` }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);

    const list = document.getElementById('jobs-queue-list');
    if (data.jobs.length === 0) {
      list.innerHTML = `<div style="text-align:center; padding:20px; font-size:12px; color:var(--text-muted)">Waiting for fresh orders from kitchen... 🍳</div>`;
      return;
    }

    list.innerHTML = data.jobs.map(job => `
      <div class="job-card">
        <div class="job-header">
          <span style="font-weight:900; font-size:14px; color:#fff">Order #${job.id}</span>
          <span class="job-payout">+$5.00 Payout</span>
        </div>
        <div class="job-address">${job.customer.address}</div>
        <div style="display:flex; justify-content:space-between; align-items:center">
          <span style="font-size:11px; color:var(--text-muted)">Items count: ${job.items.length}</span>
          <button class="btn-primary" style="width:auto; padding:8px 16px; font-size:12px; border-radius:10px" onclick="acceptDeliveryJob('${job.id}')">Accept Job</button>
        </div>
      </div>
    `).join('');
  } catch (err) {
    console.error('Available jobs load fail', err);
  }
}

// Accept Job Router
async function acceptDeliveryJob(orderId) {
  try {
    const res = await fetch(`${API_BASE}/api/drivers/accept-job`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_TOKEN}`
      },
      body: JSON.stringify({ orderId })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);

    alert('🎉 Delivery Job Accepted successfully! Navigate to customer.');
    loadDriverStats();
  } catch (err) {
    alert(`❌ Job accept error: ${err.message}`);
  }
}

// Checks if Courier has uncompleted delivery assignments active
async function checkActiveDeliveries() {
  if (!DRIVER_UID) return;
  try {
    const res = await fetch(`${API_BASE}/api/orders`, {
      headers: { 'Authorization': `Bearer ${API_TOKEN}` }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);

    const myActiveJob = data.orders.find(o =>
      o.assignedRiderId === DRIVER_UID &&
      ['placed', 'paid', 'preparing', 'ready_for_pickup', 'out_for_delivery'].includes(o.status)
    );

    const activeSec = document.getElementById('active-job-section');
    if (myActiveJob) {
      activeOrder = myActiveJob;
      activeSec.style.display = 'block';
      document.getElementById('available-jobs-section').style.display = 'none';

      // Set values
      document.getElementById('active-order-id').textContent = `Order #${myActiveJob.id}`;
      document.getElementById('active-order-status').textContent = myActiveJob.status.toUpperCase();
      document.getElementById('active-customer-name').textContent = myActiveJob.customer.name;
      document.getElementById('active-customer-address').textContent = myActiveJob.customer.address;
      document.getElementById('active-items-preview').textContent = myActiveJob.items.map(i => `${i.name} (x${i.qty})`).join(', ');

      // Action triggers display router
      const btnOut = document.getElementById('btn-out-delivery');
      const btnArrive = document.getElementById('btn-arrive-location');
      const otpPanel = document.getElementById('otp-entry-panel');

      if (['placed', 'paid', 'preparing', 'ready_for_pickup'].includes(myActiveJob.status)) {
        btnOut.style.display = 'block';
        btnArrive.style.display = 'none';
        otpPanel.style.display = 'none';
        document.getElementById('map-simulation-status').textContent = 'Rider waiting for kitchen preparation 🍳';
        stopLiveLocationSharing();
      } else if (myActiveJob.status === 'out_for_delivery') {
        btnOut.style.display = 'none';
        btnArrive.style.display = 'block';
        otpPanel.style.display = 'none';
        document.getElementById('map-simulation-status').textContent = 'Rider en route to delivery destination... 🗺️';

        // Start sharing real device GPS if not already active
        startLiveLocationSharing();
      }
    } else {
      activeOrder = null;
      activeSec.style.display = 'none';
      if (driverStatus === 'online') {
        document.getElementById('available-jobs-section').style.display = 'block';
      }
      stopLiveLocationSharing();
    }
  } catch (err) {
    console.error('Active delivery sync failed', err);
  }
}

// 🚴 Transition Status -> Out for Delivery
async function startDeliveryTransition() {
  if (!activeOrder) return;
  try {
    const res = await fetch(`${API_BASE}/api/driver/status`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_TOKEN}`
      },
      body: JSON.stringify({ orderId: activeOrder.id, status: 'out_for_delivery', driverId: DRIVER_UID })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);

    alert('Rider Out for Delivery status updated! Live tracking active.');
    checkActiveDeliveries();
  } catch (err) {
    alert(`❌ Status update failed: ${err.message}`);
  }
}

// 📍 Arrive Destination Transition Router
function arriveAtDestination() {
  stopLiveLocationSharing();
  document.getElementById('btn-arrive-location').style.display = 'none';
  document.getElementById('otp-entry-panel').style.display = 'block';
  document.getElementById('map-simulation-status').textContent = 'Rider arrived at customer doorstep! 📍';
}

// Real device GPS sharing (replaces the earlier straight-line simulation)
function startLiveLocationSharing() {
  if (gpsWatchId !== null) return; // already sharing
  if (!navigator.geolocation) {
    document.getElementById('map-simulation-status').textContent = 'This device/browser does not support GPS location.';
    return;
  }

  gpsWatchId = navigator.geolocation.watchPosition(
    async (pos) => {
      const { latitude, longitude } = pos.coords;
      document.getElementById('map-simulation-status').textContent = 'Sharing live location 🚴📍';
      try {
        const res = await fetch(`${API_BASE}/api/driver/location`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_TOKEN}`
          },
          body: JSON.stringify({ driverId: DRIVER_UID, latitude, longitude })
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          console.error('Location push failed', data.error);
        }
      } catch (err) {
        console.error('Location push failed', err);
      }
    },
    (err) => {
      document.getElementById('map-simulation-status').textContent = `⚠️ Location error: ${err.message}. Enable GPS permission to let the customer track you.`;
    },
    { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 }
  );
}

function stopLiveLocationSharing() {
  if (gpsWatchId !== null) {
    navigator.geolocation.clearWatch(gpsWatchId);
    gpsWatchId = null;
  }
}

// SECURE KEYPAD CONTROLS
let otpCode = '';
function pressOtpDigit(val) {
  const input = document.getElementById('otp-input');
  if (val === 'clear') {
    otpCode = '';
  } else {
    if (otpCode.length < 4) otpCode += val;
  }
  input.value = otpCode;
}

// Complete trip submit
async function submitDeliveryOtp() {
  if (otpCode.length < 4) {
    alert('Please enter complete 4-digit Delivery OTP code.');
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/api/drivers/complete-job`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_TOKEN}`
      },
      body: JSON.stringify({ orderId: activeOrder.id, otp: otpCode })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);

    alert('🏆 Order successfully delivered and confirmed! $5.00 credited to wallet.');
    otpCode = '';
    document.getElementById('otp-input').value = '';
    
    loadDriverStats();
  } catch (err) {
    alert(`❌ OTP Verification failed: ${err.message}`);
    otpCode = '';
    document.getElementById('otp-input').value = '';
  }
}
