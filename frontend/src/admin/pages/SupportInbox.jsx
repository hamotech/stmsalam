import React, { useEffect, useState } from 'react';
import { MessageSquare, Inbox, Clock } from 'lucide-react';
import { subscribeSupportInbox, markSupportChatReadByAdmin } from '../services/dataService';
import SupportLiveChat from '../../components/SupportLiveChat';

export default function SupportInbox() {
  const [threads, setThreads] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const unsub = subscribeSupportInbox(setThreads);
    return () => unsub();
  }, []);

  useEffect(() => {
    if (threads.length && !selectedId) {
      setSelectedId(threads[0].id);
    }
  }, [threads, selectedId]);

  useEffect(() => {
    if (selectedId) {
      void markSupportChatReadByAdmin(selectedId);
    }
  }, [selectedId]);

  const formatTime = (row) => {
    const u = row.updatedAt;
    if (u?.toDate) return u.toDate().toLocaleString();
    if (u?.seconds) return new Date(u.seconds * 1000).toLocaleString();
    return '—';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div>
        <h1 style={{ fontSize: 28, fontWeight: 900, color: '#0f172a', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 10 }}>
          <Inbox size={28} color="var(--green-dark)" /> Chat with Customer
        </h1>
        <p style={{ color: '#64748b', fontWeight: 600, fontSize: 14, maxWidth: 640 }}>
          Customer <strong>Help Chat</strong> (app + site). Auto-replies appear as <strong>bot</strong>; orange dot = needs staff attention.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(260px, 320px) 1fr',
          gap: 0,
          background: 'white',
          borderRadius: 20,
          border: '1px solid #e2e8f0',
          overflow: 'hidden',
          minHeight: 520,
          boxShadow: '0 10px 40px rgba(0,0,0,0.04)',
        }}
      >
        <div style={{ borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', background: '#f8fafc' }}>
          <div style={{ padding: '14px 16px', fontWeight: 900, fontSize: 12, color: '#64748b', textTransform: 'uppercase', letterSpacing: 1 }}>
            Threads ({threads.length})
          </div>
          <div style={{ overflowY: 'auto', flex: 1 }}>
            {threads.length === 0 ? (
              <div style={{ padding: 24, textAlign: 'center', color: '#94a3b8', fontWeight: 700, fontSize: 14 }}>
                No messages yet. Customers appear here when they use <strong>Live team</strong> on the site.
              </div>
            ) : (
              threads.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setSelectedId(t.id)}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '14px 16px',
                    border: 'none',
                    borderBottom: '1px solid #e2e8f0',
                    background: selectedId === t.id ? 'white' : 'transparent',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ fontSize: 11, fontWeight: 800, color: '#94a3b8', marginBottom: 4, fontFamily: 'monospace' }}>
                    {t.id.length > 22 ? `${t.id.slice(0, 22)}…` : t.id}
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', marginBottom: 6, lineHeight: 1.3, display: 'flex', alignItems: 'center', gap: 8 }}>
                    {t.unreadByAdmin ? (
                      <span style={{ width: 8, height: 8, borderRadius: 999, background: '#ea580c', flexShrink: 0 }} title="Unread" />
                    ) : null}
                    <span>{t.lastPreview || t.lastMessage || '…'}</span>
                  </div>
                  <div style={{ fontSize: 11, color: '#64748b', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Clock size={12} />
                    {formatTime(t)}
                    {t.lastSenderRole && (
                      <span style={{ marginLeft: 8, textTransform: 'capitalize' }}>· {t.lastSenderRole}</span>
                    )}
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', minHeight: 480 }}>
          {selectedId ? (
            <>
              <div
                style={{
                  padding: '14px 20px',
                  borderBottom: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  background: 'var(--green-dark)',
                  color: 'white',
                }}
              >
                <MessageSquare size={20} />
                <div>
                  <div style={{ fontWeight: 900, fontSize: 15 }}>Conversation</div>
                  <div style={{ fontSize: 11, opacity: 0.85, fontFamily: 'monospace' }}>{selectedId}</div>
                </div>
              </div>
              <div style={{ flex: 1, minHeight: 0 }}>
                <SupportLiveChat conversationId={selectedId} role="admin" />
              </div>
            </>
          ) : (
            <div style={{ margin: 'auto', color: '#94a3b8', fontWeight: 700 }}>Select a thread</div>
          )}
        </div>
      </div>
    </div>
  );
}
