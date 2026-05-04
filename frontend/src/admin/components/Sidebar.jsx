import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, PackageSearch, Tags, ShoppingBag, Users, Image as ImageIcon, Settings, MessageSquare, ChefHat, Bike, CreditCard, BarChart3 } from 'lucide-react';
import { subscribeOrders, subscribeSupportInbox } from '../services/dataService';

const Sidebar = () => {
  const [newOrdersCount, setNewOrdersCount] = useState(0);
  const [supportThreadCount, setSupportThreadCount] = useState(0);

  useEffect(() => {
    const unsub = subscribeOrders((orders) => {
      const count = orders.filter(o => o.isNewForAdmin || o.unreadAdmin > 0).length;
      setNewOrdersCount(count);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const unsub = subscribeSupportInbox((threads) => {
      const n = threads.filter((t) => t.lastSenderRole === 'customer').length;
      setSupportThreadCount(n);
    });
    return () => unsub();
  }, []);

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} />, exact: true },
    { name: 'Products', path: '/admin/products', icon: <PackageSearch size={20} /> },
    { name: 'Categories', path: '/admin/categories', icon: <Tags size={20} /> },
    { name: 'Orders', path: '/admin/orders', icon: <ShoppingBag size={20} />, badge: newOrdersCount },
    { name: 'Kitchen', path: '/admin/kitchen', icon: <ChefHat size={20} /> },
    { name: 'Riders', path: '/admin/riders', icon: <Bike size={20} /> },
    { name: 'Payments', path: '/admin/payments', icon: <CreditCard size={20} /> },
    { name: 'Analytics', path: '/admin/analytics', icon: <BarChart3 size={20} /> },
    { name: 'Customer chat', path: '/admin/support', icon: <MessageSquare size={20} />, badge: supportThreadCount },
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
