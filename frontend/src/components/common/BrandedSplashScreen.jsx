import React, { useEffect, useState } from 'react';

export default function BrandedSplashScreen() {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    // Smooth fade-in on mount
    const timer = setTimeout(() => setOpacity(1), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        background: '#013220',
        opacity: opacity,
        transition: 'opacity 0.5s ease-in-out',
        padding: '24px',
        textAlign: 'center'
      }}
    >
      <div style={{ marginBottom: '32px' }}>
        <img 
          src="/stmsalamlogo.png" 
          alt="STM Salam Logo" 
          style={{ width: '150px', height: '150px', objectFit: 'contain' }} 
        />
      </div>
      
      <h1 
        style={{ 
          color: '#D4AF37', 
          fontSize: '28px', 
          fontWeight: '900',
          margin: '0 0 8px 0',
          letterSpacing: '1px'
        }}
      >
        GoldenGravityExpressX
      </h1>
      
      <p 
        style={{ 
          color: '#E6C200', 
          fontSize: '16px', 
          fontWeight: '500',
          margin: 0,
          opacity: 0.9,
          letterSpacing: '0.5px'
        }}
      >
        Premium Delivery Platform
      </p>

      {/* Loading indicator */}
      <div style={{ marginTop: '48px' }}>
        <div 
          style={{ 
            width: '32px', 
            height: '32px', 
            border: '3px solid rgba(212, 175, 55, 0.2)', 
            borderTopColor: '#D4AF37', 
            borderRadius: '50%', 
            animation: 'spin 1s linear infinite' 
          }} 
        />
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
