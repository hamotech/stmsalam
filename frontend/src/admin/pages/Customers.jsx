import React, { useState, useEffect } from 'react';
import { Search, User, Trash2 } from 'lucide-react';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { deleteCustomerAccount } from '../services/dataService';

export default function Customers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [actionMsg, setActionMsg] = useState('');
  const [deletingUid, setDeletingUid] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'users'));
    const unsub = onSnapshot(
      q,
      (snap) => {
        setUsers(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        setLoading(false);
      },
      () => {
        setLoading(false);
      }
    );
    return () => unsub();
  }, []);

  const handleDeleteCustomer = async (user) => {
    if (!user?.id) return;
    const ok = window.confirm(`Delete customer "${user.name || user.email || user.id}" permanently?`);
    if (!ok) return;

    setActionMsg('');
    setDeletingUid(user.id);
    try {
      const res = await deleteCustomerAccount(user.id);
      setActionMsg(res?.message || 'Customer removed.');
    } catch (err) {
      setActionMsg(err?.message || 'Failed to delete customer.');
    } finally {
      setDeletingUid('');
    }
  };

  const filteredUsers = users.filter(u => 
    u.name?.toLowerCase().includes(search.toLowerCase()) || 
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
         <h1 style={{ fontSize: '32px', fontWeight: 950, color: 'var(--green-dark)', letterSpacing: '-1px' }}>Customers</h1>
         <div style={{ position: 'relative', width: '300px' }}>
           <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
           <input 
             value={search} onChange={e => setSearch(e.target.value)}
             placeholder="Search by name or email..." 
             style={{ width: '100%', padding: '14px 16px 14px 44px', borderRadius: '16px', border: '1px solid #e2e8f0', outline: 'none', background: 'white' }} 
           />
         </div>
      </div>

      <div style={{ background: 'white', borderRadius: '24px', padding: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
         {actionMsg && (
           <div style={{ marginBottom: '16px', background: '#f8fafc', color: '#0f172a', padding: '12px 14px', borderRadius: '10px', fontWeight: 700, fontSize: '13px' }}>
             {actionMsg}
           </div>
         )}
         <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
               <tr style={{ background: '#f8fafc', color: '#64748b', fontSize: '13px', textTransform: 'uppercase', fontWeight: 800 }}>
                  <th style={{ padding: '16px 20px', borderRadius: '12px 0 0 12px' }}>Customer Name</th>
                  <th style={{ padding: '16px 20px' }}>Email</th>
                  <th style={{ padding: '16px 20px' }}>Phone</th>
                  <th style={{ padding: '16px 20px', borderRadius: '0 12px 12px 0', textAlign: 'center' }}>Action</th>
               </tr>
            </thead>
            <tbody>
               {filteredUsers.length === 0 ? (
                 <tr>
                  <td colSpan="4" style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>
                    {loading ? 'Loading customers...' : 'No customers found.'}
                  </td>
                 </tr>
               ) : (
                 filteredUsers.map(u => (
                    <tr key={u.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                       <td style={{ padding: '20px' }}>
                         <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                           <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'var(--gold-tint)', color: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900 }}>
                             {u.name?.charAt(0).toUpperCase() || 'C'}
                           </div>
                           <span style={{ fontWeight: 800, color: 'var(--green-dark)' }}>{u.name}</span>
                         </div>
                       </td>
                       <td style={{ padding: '20px', color: '#64748b', fontWeight: 600 }}>{u.email}</td>
                       <td style={{ padding: '20px', color: '#64748b', fontWeight: 600 }}>{u.phone || 'N/A'}</td>
                       <td style={{ padding: '20px', textAlign: 'center' }}>
                          <button
                            onClick={() => handleDeleteCustomer(u)}
                            disabled={deletingUid === u.id}
                            style={{
                              background: deletingUid === u.id ? '#94a3b8' : '#ef4444',
                              color: 'white',
                              padding: '8px 12px',
                              borderRadius: '10px',
                              fontWeight: 800,
                              border: 'none',
                              cursor: deletingUid === u.id ? 'wait' : 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                            }}
                          >
                            <Trash2 size={14} /> {deletingUid === u.id ? 'Deleting…' : 'Delete'}
                          </button>
                       </td>
                    </tr>
                 ))
               )}
            </tbody>
         </table>
      </div>
    </div>
  )
}
