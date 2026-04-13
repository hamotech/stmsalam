/**
 * DataSeedPage.jsx
 * 
 * One-time migration tool: reads existing localStorage data
 * and seeds it into Firestore.
 * 
 * Access via: /seed (temporarily add route, remove after migration)
 * 
 * Safe to run multiple times — it skips documents that already exist.
 */

import React, { useState } from 'react';
import { seedFromLocalStorage, getLocalStorageSnapshot } from '../admin/services/dataService';
import { Database, CheckCircle, AlertCircle, Loader, CloudUpload } from 'lucide-react';

export default function DataSeedPage() {
  const [status, setStatus] = useState('idle'); // idle | running | done | error
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  const local = getLocalStorageSnapshot();

  const handleSeed = async () => {
    setStatus('running');
    setError('');
    try {
      const res = await seedFromLocalStorage();
      setResults(res);
      setStatus('done');
    } catch (err) {
      setError(err.message || 'Unknown error during seed.');
      setStatus('error');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #013220 0%, #056a48 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      fontFamily: 'sans-serif',
    }}>
      <div style={{
        background: 'white',
        borderRadius: '32px',
        padding: '48px',
        maxWidth: '600px',
        width: '100%',
        boxShadow: '0 30px 80px rgba(0,0,0,0.3)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ width: '72px', height: '72px', background: 'linear-gradient(135deg, #013220, #056a48)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <Database size={36} color="white" />
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: '900', color: '#0f172a', marginBottom: '8px' }}>
            🔥 Firebase Data Migration
          </h1>
          <p style={{ color: '#64748b', fontSize: '15px', lineHeight: '1.6' }}>
            One-time tool to migrate your existing localStorage data into Firebase Firestore.
            Safe to run multiple times — existing records are skipped.
          </p>
        </div>

        {/* Preview of local data */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '32px' }}>
          {[
            { label: 'Categories', count: local.categories.length, color: '#0ea5e9' },
            { label: 'Products', count: local.products.length, color: '#10b981' },
            { label: 'Orders', count: local.orders.length, color: '#d97706' },
          ].map(({ label, count, color }) => (
            <div key={label} style={{ background: '#f8fafc', borderRadius: '16px', padding: '20px', textAlign: 'center', border: `2px solid ${color}22` }}>
              <div style={{ fontSize: '32px', fontWeight: '900', color }}>{count}</div>
              <div style={{ fontSize: '13px', fontWeight: '700', color: '#64748b', marginTop: '4px' }}>{label}</div>
              <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>in localStorage</div>
            </div>
          ))}
        </div>

        {/* Warning if no data */}
        {local.categories.length === 0 && local.products.length === 0 && local.orders.length === 0 && (
          <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '16px', padding: '20px', marginBottom: '24px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <AlertCircle size={20} color="#d97706" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <div style={{ fontWeight: '800', color: '#92400e', marginBottom: '4px' }}>No localStorage data found</div>
              <div style={{ fontSize: '13px', color: '#a16207', lineHeight: '1.5' }}>
                Your localStorage appears empty. Open the app in the same browser where you previously used it, then run this migration.
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {status === 'done' && results && (
          <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '16px', padding: '24px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <CheckCircle size={24} color="#16a34a" />
              <div style={{ fontWeight: '900', color: '#15803d', fontSize: '16px' }}>Migration Complete!</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                <span style={{ color: '#374151', fontWeight: '700' }}>Categories migrated</span>
                <span style={{ fontWeight: '900', color: '#15803d' }}>{results.categories}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                <span style={{ color: '#374151', fontWeight: '700' }}>Products migrated</span>
                <span style={{ fontWeight: '900', color: '#15803d' }}>{results.products}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                <span style={{ color: '#374151', fontWeight: '700' }}>Orders migrated</span>
                <span style={{ fontWeight: '900', color: '#15803d' }}>{results.orders}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', borderTop: '1px solid #bbf7d0', paddingTop: '8px', marginTop: '4px' }}>
                <span style={{ color: '#374151', fontWeight: '700' }}>Already in Firestore (skipped)</span>
                <span style={{ fontWeight: '900', color: '#94a3b8' }}>{results.skipped}</span>
              </div>
            </div>
            <div style={{ marginTop: '16px', padding: '12px', background: '#dcfce7', borderRadius: '10px', fontSize: '13px', color: '#15803d', fontWeight: '700', lineHeight: '1.5' }}>
              ✅ You can now close this page. Go to <strong>/admin</strong> to verify your data in Firebase.
            </div>
          </div>
        )}

        {status === 'error' && (
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '16px', padding: '20px', marginBottom: '24px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <AlertCircle size={20} color="#ef4444" style={{ flexShrink: 0 }} />
            <div>
              <div style={{ fontWeight: '800', color: '#991b1b', marginBottom: '4px' }}>Migration failed</div>
              <div style={{ fontSize: '13px', color: '#b91c1c' }}>{error}</div>
              <div style={{ fontSize: '12px', color: '#ef4444', marginTop: '8px' }}>
                Make sure your Firebase config is set correctly in .env
              </div>
            </div>
          </div>
        )}

        <button
          onClick={handleSeed}
          disabled={status === 'running'}
          style={{
            width: '100%',
            padding: '18px',
            borderRadius: '16px',
            border: 'none',
            background: status === 'done'
              ? 'linear-gradient(135deg, #10b981, #059669)'
              : 'linear-gradient(135deg, #013220, #056a48)',
            color: 'white',
            fontWeight: '900',
            fontSize: '16px',
            cursor: status === 'running' ? 'wait' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            opacity: status === 'running' ? 0.8 : 1,
            boxShadow: '0 8px 24px rgba(1,50,32,0.3)',
            transition: 'all 0.2s',
          }}
        >
          {status === 'running' && <Loader size={20} style={{ animation: 'spin 1s linear infinite' }} />}
          {status === 'done' && <CheckCircle size={20} />}
          {(status === 'idle' || status === 'error') && <CloudUpload size={20} />}
          {status === 'idle' ? 'Migrate localStorage → Firebase Firestore'
            : status === 'running' ? 'Migrating...'
            : status === 'done' ? 'Migration Complete ✓'
            : 'Retry Migration'}
        </button>

        <p style={{ textAlign: 'center', fontSize: '12px', color: '#94a3b8', marginTop: '20px', lineHeight: '1.5' }}>
          This page is safe to run multiple times. Existing Firestore records are never overwritten.
          Remove the <code>/seed</code> route from App.jsx after migration.
        </p>

        <style>{`
          @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        `}</style>
      </div>
    </div>
  );
}
