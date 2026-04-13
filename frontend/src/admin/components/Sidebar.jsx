import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, PackageSearch, Tags, ShoppingBag, Users } from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} />, exact: true },
    { name: 'Products', path: '/admin/products', icon: <PackageSearch size={20} /> },
    { name: 'Categories', path: '/admin/categories', icon: <Tags size={20} /> },
    { name: 'Orders', path: '/admin/orders', icon: <ShoppingBag size={20} /> },
    { name: 'Customers', path: '/admin/customers', icon: <Users size={20} /> }
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
              gap: '12px',
              padding: '12px 16px',
              textDecoration: 'none',
              color: isActive ? 'white' : 'rgba(255,255,255,0.7)',
              backgroundColor: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
              borderRadius: '8px',
              fontWeight: isActive ? 'bold' : 'normal',
              transition: 'background-color 0.2s'
            })}
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
