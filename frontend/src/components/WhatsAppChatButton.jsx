import React from 'react';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { shopInfo } from '../data/menuData';

const WhatsAppChatButton = ({ 
  message = "Hi STM Salam, I need help with my order", 
  type = 'floating', 
  label = 'Chat with Admin',
  className = '',
  style = {}
}) => {
  const whatsappNumber = shopInfo.whatsapp.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  if (type === 'button') {
    return (
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`btn ${className}`}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          background: '#25d366',
          color: 'white',
          padding: '14px 28px',
          borderRadius: '16px',
          fontWeight: 800,
          textDecoration: 'none',
          boxShadow: '0 10px 20px rgba(37,211,102,0.2)',
          border: 'none',
          cursor: 'pointer',
          ...style
        }}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
      >
        <MessageCircle size={20} />
        {label}
      </motion.a>
    );
  }

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        width: '60px',
        height: '60px',
        background: '#25d366',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        boxShadow: '0 10px 30px rgba(0,0,0,0.15), 0 0 20px rgba(37,211,102,0.4)',
        zIndex: 9991,
        cursor: 'pointer',
        ...style
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.9 }}
    >
      <MessageCircle size={32} />
      <div className="whatsapp-tooltip" style={{
        position: 'absolute',
        right: '75px',
        background: 'white',
        color: '#1f2937',
        padding: '8px 16px',
        borderRadius: '12px',
        fontSize: '13px',
        fontWeight: 800,
        boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
        opacity: 0,
        transform: 'translateX(10px)',
        transition: 'all 0.3s ease',
        border: '1px solid #f1f5f9'
      }}>
        {label}
        <div style={{
          position: 'absolute',
          right: '-6px',
          top: '50%',
          transform: 'translateY(-50%) rotate(45deg)',
          width: '12px',
          height: '12px',
          background: 'white',
          borderRight: '1px solid #f1f5f9',
          borderTop: '1px solid #f1f5f9'
        }} />
      </div>
      <style>{`
        a:hover .whatsapp-tooltip {
          opacity: 1 !important;
          transform: translateX(0) !important;
        }
        @media (max-width: 768px) {
          .whatsapp-tooltip { display: none !important; }
        }
      `}</style>
    </motion.a>
  );
};

export default WhatsAppChatButton;
