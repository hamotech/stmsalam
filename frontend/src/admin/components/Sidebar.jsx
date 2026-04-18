import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, PackageSearch, Tags, ShoppingBag, Users, Image as ImageIcon, Settings } from 'lucide-react';
import { subscribeOrders } from '../services/dataService';

const Sidebar = () => {
  const [newOrdersCount, setNewOrdersCount] = useState(0);

  useEffect(() => {
    const unsub = subscribeOrders((orders) => {
      const count = orders.filter(o => o.isNewForAdmin || o.unreadAdmin > 0).length;
      setNewOrdersCount(count);
    });
    return () => unsub();
  }, []);

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} />, exact: true },
    { name: 'Products', path: '/admin/products', icon: <PackageSearch size={20} /> },
    { name: 'Categories', path: '/admin/categories', icon: <Tags size={20} /> },
    { name: 'Orders', path: '/admin/orders', icon: <ShoppingBag size={20} />, badge: newOrdersCount },
    { name: 'Gallery', path: '/admin/gallery', icon: <ImageIcon size={20} /> },
    { name: 'Customers', path: '/admin/customers', icon: <Users size={20} /> },
    { name: 'Settings', path: '/admin/settings', icon: <Settings size={20} /> }
  ];

  return (
    <div style={{ width: '250px', backgroundColor: 'var(--green-dark, #023c28)', color: 'white', minHeight: '100vh', padding: '20px' }}>
      <div style={{ marginBottom: '40px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>STM Admin</h2>
      </div>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.exact}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 16px',
              textDecoration: 'none',
              color: isActive ? 'white' : 'rgba(255,255,255,0.7)',
              backgroundColor: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
              borderRadius: '8px',
              fontWeight: isActive ? 'bold' : 'normal',
              transition: 'background-color 0.2s'
            })}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {item.icon}
              {item.name}
            </div>
            {item.badge > 0 && (
              <span style={{ 
                background: '#ef4444', color: 'white', fontSize: '10px', 
                minWidth: '18px', height: '18px', borderRadius: '50%', 
                display: 'flex', alignItems: 'center', justifyContent: 'center', 
                fontWeight: 'bold', padding: '0 4px'
              }}>
                {item.badge}
              </span>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
