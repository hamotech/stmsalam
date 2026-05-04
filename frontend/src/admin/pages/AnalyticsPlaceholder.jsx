import React from 'react';
import { BarChart3 } from 'lucide-react';

const AnalyticsPlaceholder = () => (
  <div style={{ padding: '20px', minHeight: '80vh' }}>
    <div style={{ marginBottom: '24px' }}>
      <h2 style={{ fontSize: '28px', fontWeight: '950', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <BarChart3 size={32} color="#013220" /> Analytics
      </h2>
      <p style={{ color: '#64748b', fontWeight: 600 }}>Reserved for SLA, prep times, rider performance, and revenue — wire BigQuery or exports next.</p>
    </div>
    <div style={{ background: 'white', borderRadius: '20px', border: '1px dashed #cbd5e1', padding: '48px', textAlign: 'center', color: '#94a3b8', fontWeight: '800' }}>
      Coming soon
    </div>
  </div>
);

export default AnalyticsPlaceholder;
