import React from 'react';
import { User, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header style={{ 
      height: '70px', 
      backgroundColor: 'white', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '0 30px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
      position: 'sticky',
      top: 0,
      zIndex: 10
    }}>
      <h1 style={{ fontSize: '18px', fontWeight: 'bold', color: '#333' }}>STM Admin Dashboard</h1>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#555' }}>
          <User size={20} />
          <span>Admin Profile</span>
        </div>
        <button 
          onClick={handleLogout}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '6px', 
            backgroundColor: '#f1f5f9', 
            border: 'none', 
            padding: '8px 16px', 
            borderRadius: '6px',
            cursor: 'pointer',
            color: '#ef4444',
            fontWeight: 'bold'
          }}>
          <LogOut size={16} /> Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
