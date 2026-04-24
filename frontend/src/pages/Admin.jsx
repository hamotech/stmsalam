import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Sidebar from '../admin/components/Sidebar';
import Navbar from '../admin/components/Navbar';
import Dashboard from '../admin/pages/Dashboard';
import Products from '../admin/pages/Products';
import Orders from '../admin/pages/Orders';
import Categories from '../admin/pages/Categories';
import GalleryAdmin from '../admin/pages/GalleryAdmin';
import Customers from '../admin/pages/Customers';
import AdminSettings from '../admin/pages/AdminSettings';
import { useAuth } from '../context/AuthContext';

const AdminLayout = ({ children }) => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
        <Navbar />
        <main style={{ padding: '30px', flex: 1, overflowY: 'auto' }}>
          {children}
        </main>
      </div>
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
        <Route path="/gallery" element={<GalleryAdmin />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/settings" element={<AdminSettings />} />
      </Routes>
    </AdminLayout>
  );
}
