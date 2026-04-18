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
    // Basic Security: Protect /admin route. Redirect to login if user is not authenticated.
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  // Prevent rendering admin interface if loading or not logged in
  if (loading) return (
    <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', color: 'var(--green-dark)', fontWeight: 'bold' }}>
       Verifying Admin Session...
    </div>
  );
  if (!user) return null;

  return (
    <AdminLayout>
      {!isAuthenticated && (
        <div style={{ background: '#fef2f2', border: '1px solid #fee2e2', padding: '12px 24px', borderRadius: '12px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px', color: '#991b1b' }}>
          <div style={{ background: '#ef4444', color: 'white', padding: '4px 8px', borderRadius: '6px', fontSize: '10px', fontWeight: '900' }}>AUTH SYNC FAILED</div>
          <p style={{ fontSize: '13px', fontWeight: '600', margin: 0 }}>
            Firestore permissions are currently locked. Please ensure <strong>admin@stm.com</strong> exists and Email/Pass is enabled in Firebase Console.
          </p>
        </div>
      )}
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
