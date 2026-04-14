import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Sidebar from '../admin/components/Sidebar';
import Navbar from '../admin/components/Navbar';
import Dashboard from '../admin/pages/Dashboard';
import Products from '../admin/pages/Products';
import Orders from '../admin/pages/Orders';
import Categories from '../admin/pages/Categories';
import GalleryAdmin from '../admin/pages/GalleryAdmin';
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
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Basic Security: Protect /admin route. Redirect to login if user is not authenticated.
    // Assuming user needs to log in at /login. In a production app, verify admin role as well.
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  // Prevent rendering admin interface if not logged in
  if (!user) return null;

  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/gallery" element={<GalleryAdmin />} />
        <Route path="/customers" element={<div style={{ padding: "40px" }}><h2>Customers feature in progress...</h2></div>} />
      </Routes>
    </AdminLayout>
  );
}
