import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Sidebar from '../admin/components/Sidebar';
import Navbar from '../admin/components/Navbar';
import Dashboard from '../admin/pages/Dashboard';
import Products from '../admin/pages/Products';
import Orders from '../admin/pages/Orders';
import Categories from '../admin/pages/Categories';
import GalleryAdmin from '../admin/pages/GalleryAdmin';
import Customers from '../admin/pages/Customers';
import Staff from '../admin/pages/Staff';
import AdminSettings from '../admin/pages/AdminSettings';
import SupportInbox from '../admin/pages/SupportInbox';
import KitchenView from '../admin/pages/KitchenView';
import RidersDispatch from '../admin/pages/RidersDispatch';
import RiderManagement from '../admin/pages/RiderManagement'
import LiveFleet from '../admin/pages/LiveFleet';
import PaymentsOps from '../admin/pages/PaymentsOps';
import AnalyticsPlaceholder from '../admin/pages/AnalyticsPlaceholder';
import AdminOrderNotifications from '../admin/components/AdminOrderNotifications';
import { useAuth } from '../context/AuthContext';

const AdminLayout = ({ children }) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="admin-root-wrapper" style={{ display: 'flex', backgroundColor: '#f8fafc' }}>
      <AdminOrderNotifications />
      <Sidebar isOpen={isMobileSidebarOpen} onClose={() => setIsMobileSidebarOpen(false)} />
      <div className="admin-content-wrapper" style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%' }}>
        <Navbar onMenuClick={() => setIsMobileSidebarOpen(true)} />
        <main className="admin-main-content" style={{ flex: 1 }}>
          {children}
        </main>
      </div>

      <style>{`
        .admin-root-wrapper {
          min-height: 100vh;
        }
        .admin-content-wrapper {
          height: 100vh;
          overflow: hidden;
        }
        .admin-main-content {
          padding: 30px;
          overflow-y: auto;
          overflow-x: auto;
        }
        @media (max-width: 768px) {
          .admin-root-wrapper {
            min-height: auto !important;
            height: auto !important;
          }
          .admin-content-wrapper {
            height: auto !important;
            min-height: auto !important;
            overflow: visible !important;
          }
          .admin-main-content {
            padding: 12px !important;
            padding-top: 0 !important;
            margin-top: 0 !important;
            margin-left: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
          }
          /* Ensure all immediate children flex containers stack vertically to fix grid overflow */
          .admin-main-content > div > div[style*="display: flex"] {
            flex-direction: column !important;
            gap: 12px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default function Admin() {
  const { user, loading, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // SECURITY: Only allow access if user is present AND Firebase session is active AND role is admin
    if (!loading) {
      if (!user || !isAuthenticated || user.role !== 'admin') {
        console.warn('Unauthorized Admin Access Attempted. Session Sync:', isAuthenticated);
        navigate('/login?redirect=/admin');
      }
    }
  }, [user, loading, isAuthenticated, navigate]);

  // Prevent rendering admin interface if loading or not logged in
  if (loading) return (
    <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', color: 'var(--green-dark)', fontWeight: 'bold' }}>
       Verifying Admin Session...
    </div>
  );

  const allowed = user && isAuthenticated && user.role === 'admin';
  if (!allowed) {
    return (
      <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', color: '#64748b', fontWeight: 700, padding: 24, textAlign: 'center' }}>
        {user && !isAuthenticated
          ? 'Syncing your session with Firebase…'
          : 'Redirecting to sign in…'}
      </div>
    );
  }

  return (
    <AdminLayout>
      <div style={{ background: '#f0f9ff', border: '1px solid #e0f2fe', padding: '10px 20px', borderRadius: '10px', marginBottom: '20px', fontSize: '12px', color: '#0369a1', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span><strong>Auth Connected:</strong> Verified as <code>{user?.email || 'unknown'}</code></span>
        <span style={{ opacity: 0.7 }}>Permissions active for current session</span>
      </div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/kitchen" element={<KitchenView />} />
        <Route path="/riders" element={<RidersDispatch />} />
        <Route path="/riders-management" element={<RiderManagement />} />
        <Route path="/payments" element={<PaymentsOps />} />
        <Route path="/analytics" element={<AnalyticsPlaceholder />} />
        <Route path="/support" element={<SupportInbox />} />
        <Route path="/gallery" element={<GalleryAdmin />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/live-fleet" element={<LiveFleet />} />
        <Route path="/settings" element={<AdminSettings />} />
      </Routes>
    </AdminLayout>
  );
}
