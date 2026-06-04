import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, PackageSearch, Tags, ShoppingBag, Users, Image as ImageIcon, Settings, MessageSquare, ChefHat, Bike, CreditCard, BarChart3, UserCog, Map, X } from 'lucide-react';
import { subscribeOrders, subscribeSupportInbox } from '../services/dataService';

const Sidebar = ({ isOpen, onClose }) => {
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
    { name: 'Riders (Assign)', path: '/admin/riders', icon: <Bike size={20} /> },
    { name: 'Drivers & Riders', path: '/admin/riders-management', icon: <UserCog size={20} /> },
    { name: 'Live Fleet', path: '/admin/live-fleet', icon: <Map size={20} /> },
    { name: 'Payments', path: '/admin/payments', icon: <CreditCard size={20} /> },
    { name: 'Analytics', path: '/admin/analytics', icon: <BarChart3 size={20} /> },
    { name: 'Customer chat', path: '/admin/support', icon: <MessageSquare size={20} />, badge: supportThreadCount },
    { name: 'Gallery', path: '/admin/gallery', icon: <ImageIcon size={20} /> },
    { name: 'Customers', path: '/admin/customers', icon: <Users size={20} /> },
    { name: 'Staff', path: '/admin/staff', icon: <UserCog size={20} /> },
    { name: 'Settings', path: '/admin/settings', icon: <Settings size={20} /> }
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="admin-sidebar-overlay"
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 40
          }}
        />
      )}

      <div className={`admin-sidebar ${isOpen ? 'open' : ''}`} style={{ 
        width: '250px', 
        backgroundColor: 'var(--green-dark, #023c28)', 
        color: 'white', 
        minHeight: '100vh', 
        padding: '20px',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0 }}>STM Admin</h2>
          <button 
            className="mobile-close-btn"
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: 'white', padding: '4px', cursor: 'pointer' }}
          >
            <X size={24} />
          </button>
        </div>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto', flex: 1, paddingBottom: '20px' }}>
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.exact}
              onClick={onClose}
              className="admin-nav-item"
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
                transition: 'background-color 0.2s',
                minHeight: '48px'
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

      <style>{`
        .admin-sidebar {
          transition: transform 0.3s ease;
          z-index: 50;
        }
        .mobile-close-btn {
          display: none !important;
        }
        @media (max-width: 768px) {
          .admin-sidebar {
            position: fixed !important;
            top: 0;
            left: 0;
            height: 100vh;
            transform: translateX(-100%);
            box-shadow: 4px 0 24px rgba(0,0,0,0.2);
            z-index: 9999 !important;
          }
          .admin-sidebar.open {
            transform: translateX(0);
          }
          .mobile-close-btn {
            display: block !important;
          }
        }
        @media (min-width: 769px) {
          .admin-sidebar {
            position: relative;
            transform: translateX(0) !important;
          }
          .admin-sidebar-overlay {
            display: none !important;
          }
        }
        /* Improve touch targets for nav items */
        .admin-nav-item {
          min-height: 48px;
        }
      `}</style>
    </>
  );
};

export default Sidebar;
