import React from 'react';
import { User, LogOut, MessageCircle, Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Navbar = ({ onMenuClick }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="admin-navbar" style={{ 
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
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button 
          className="mobile-menu-btn" 
          onClick={onMenuClick} 
          style={{ background: 'none', border: 'none', color: '#333', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center' }}
        >
          <Menu size={24} />
        </button>
        <h1 className="admin-nav-title" style={{ fontSize: '18px', fontWeight: 'bold', color: '#333', margin: 0 }}>STM Admin Dashboard</h1>
      </div>

      <div className="admin-nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <Link
          to="/admin/support"
          className="admin-nav-chat"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'linear-gradient(135deg, #013220 0%, #056a48 100%)',
            color: 'white',
            textDecoration: 'none',
            padding: '10px 18px',
            borderRadius: '12px',
            fontWeight: 800,
            fontSize: '14px',
            boxShadow: '0 4px 14px rgba(1,50,32,0.25)',
          }}
        >
          <MessageCircle size={18} /> <span>Chat with Customer</span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#555' }}>
          <User size={20} />
          <span className="admin-profile-text">Admin Profile</span>
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
          <LogOut size={16} /> <span>Logout</span>
        </button>
      </div>

      <style>{`
        @media (min-width: 769px) {
          .mobile-menu-btn {
            display: none !important;
          }
        }
        @media (max-width: 768px) {
          .admin-navbar {
            height: 56px !important;
            padding: 8px 12px !important;
            flex-wrap: nowrap !important;
          }
          .admin-nav-title {
            font-size: 15px !important;
            white-space: nowrap !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
            max-width: 140px !important;
          }
          .admin-nav-actions {
            gap: 8px !important;
            flex-wrap: nowrap !important;
          }
          /* Completely hide User icon and Chat button on mobile header to save space */
          .admin-nav-actions > div,
          .admin-nav-chat {
            display: none !important;
          }
          .admin-nav-actions button span {
            display: none !important;
          }
          .admin-nav-actions button {
            padding: 6px 10px !important;
            font-size: 12px !important;
          }
        }
      `}</style>
    </header>
  );
};

export default Navbar;
