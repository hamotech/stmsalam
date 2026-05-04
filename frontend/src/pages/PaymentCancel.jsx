import React from 'react';
import { Link } from 'react-router-dom';
import { CircleX } from 'lucide-react';

export default function PaymentCancel() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f8fafc',
        padding: '24px',
      }}
    >
      <div
        style={{
          maxWidth: '440px',
          background: 'white',
          padding: '48px',
          borderRadius: '32px',
          textAlign: 'center',
          boxShadow: '0 20px 50px rgba(0,0,0,0.06)',
          border: '1px solid #e2e8f0',
        }}
      >
        <div
          style={{
            width: '88px',
            height: '88px',
            margin: '0 auto 24px',
            borderRadius: '50%',
            background: '#fef2f2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CircleX size={44} color="#b91c1c" strokeWidth={2.5} />
        </div>
        <h1
          style={{
            fontSize: '26px',
            fontWeight: 950,
            color: 'var(--green-dark)',
            marginBottom: '12px',
          }}
        >
          Payment Cancelled
        </h1>
        <p style={{ color: '#64748b', fontSize: '15px', lineHeight: 1.6, marginBottom: '28px' }}>
          No charge was made. You can return to checkout and try again when you are ready.
        </p>
        <Link
          to="/checkout"
          style={{
            display: 'inline-block',
            width: '100%',
            padding: '18px',
            background: 'var(--green-dark)',
            color: 'white',
            borderRadius: '16px',
            fontWeight: 900,
            textDecoration: 'none',
            boxSizing: 'border-box',
          }}
        >
          Back to checkout
        </Link>
      </div>
    </div>
  );
}
