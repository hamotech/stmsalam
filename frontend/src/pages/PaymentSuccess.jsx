import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CircleCheck } from 'lucide-react';

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId') || '';

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
            background: '#ecfdf5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CircleCheck size={44} color="#15803d" strokeWidth={2.5} />
        </div>
        <h1
          style={{
            fontSize: '26px',
            fontWeight: 950,
            color: 'var(--green-dark)',
            marginBottom: '12px',
          }}
        >
          Payment Successful
        </h1>
        {orderId ? (
          <p style={{ color: '#64748b', fontSize: '15px', marginBottom: '8px' }}>
            Order reference:{' '}
            <strong style={{ color: '#0f172a' }}>{orderId}</strong>
          </p>
        ) : null}
        <p style={{ color: '#64748b', fontSize: '15px', lineHeight: 1.6, marginBottom: '28px' }}>
          Thank you. Your payment was received. You can track your order anytime.
        </p>
        <Link
          to={orderId ? `/tracking/${encodeURIComponent(orderId)}` : '/'}
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
          {orderId ? 'Track order' : 'Back to home'}
        </Link>
      </div>
    </div>
  );
}
