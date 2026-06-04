import React, { useState, useEffect } from 'react';
import { Search, UserPlus, Shield, Loader2, CheckCircle, XCircle } from 'lucide-react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db, functions } from '../../lib/firebase';
import { httpsCallable } from 'firebase/functions';

const createEmployeeAccount = httpsCallable(functions, 'createEmployeeAccount');

export default function Staff() {
  const [staff, setStaff] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'driver'
  });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3500);
  };

  useEffect(() => {
    const q = query(
      collection(db, 'users'), 
      where('role', 'in', ['admin', 'kitchen', 'driver', 'rider'])
    );
    const unsub = onSnapshot(
      q,
      (snap) => {
        setStaff(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching staff:", error);
        setLoading(false);
      }
    );
    return () => unsub();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password || !formData.role) {
      return showToast('Please fill in all required fields.', 'error');
    }
    
    if (formData.password.length < 6) {
      return showToast('Password must be at least 6 characters long.', 'error');
    }

    setSubmitting(true);
    try {
      const res = await createEmployeeAccount({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        role: formData.role
      });
      
      showToast(res.data?.message || 'Employee created successfully!');
      setFormData({ name: '', email: '', password: '', phone: '', role: 'driver' });
    } catch (err) {
      console.error(err);
      showToast(err.message || 'Failed to create employee.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const filteredStaff = staff.filter(u => 
    u.name?.toLowerCase().includes(search.toLowerCase()) || 
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '40px' }}>
      {toast.show && (
        <div style={{ position: 'fixed', bottom: '24px', left: '50%', transform: 'translateX(-50%)', background: toast.type === 'error' ? '#ef4444' : '#013220', color: 'white', padding: '14px 28px', borderRadius: '14px', fontWeight: '900', zIndex: 9999, display: 'flex', alignItems: 'center', gap: '8px' }}>
          {toast.type === 'error' ? <XCircle size={18} /> : <CheckCircle size={18} />}
          {toast.message}
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
         <h1 style={{ fontSize: '32px', fontWeight: 950, color: 'var(--green-dark)', letterSpacing: '-1px' }}>Staff & Employees</h1>
      </div>

      {/* Add Employee Form */}
      <div style={{ background: 'white', borderRadius: '24px', padding: '28px', boxShadow: '0 10px 30px rgba(0,0,0,0.02)', marginBottom: '32px', border: '1px solid #e2e8f0' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 900, color: '#0f172a', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <UserPlus size={22} color="var(--gold)" /> Add New Employee
        </h2>
        
        <form onSubmit={handleAddEmployee} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', alignItems: 'end' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, color: '#64748b', marginBottom: '6px' }}>Full Name *</label>
            <input 
              type="text" name="name" value={formData.name} onChange={handleChange} required
              style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none', background: '#f8fafc', fontWeight: 600 }} 
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, color: '#64748b', marginBottom: '6px' }}>Email *</label>
            <input 
              type="email" name="email" value={formData.email} onChange={handleChange} required
              style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none', background: '#f8fafc', fontWeight: 600 }} 
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, color: '#64748b', marginBottom: '6px' }}>Password *</label>
            <input 
              type="password" name="password" value={formData.password} onChange={handleChange} required minLength={6}
              style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none', background: '#f8fafc', fontWeight: 600 }} 
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, color: '#64748b', marginBottom: '6px' }}>Phone</label>
            <input 
              type="tel" name="phone" value={formData.phone} onChange={handleChange}
              style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none', background: '#f8fafc', fontWeight: 600 }} 
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, color: '#64748b', marginBottom: '6px' }}>Role *</label>
            <select 
              name="role" value={formData.role} onChange={handleChange} required
              style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none', background: '#f8fafc', fontWeight: 700 }}
            >
              <option value="driver">Rider / Driver</option>
              <option value="kitchen">Kitchen Staff</option>
              <option value="admin">Administrator</option>
            </select>
          </div>
          <div>
            <button 
              type="submit" 
              disabled={submitting}
              style={{ 
                width: '100%', padding: '12px 16px', borderRadius: '12px', border: 'none', 
                background: submitting ? '#94a3b8' : 'var(--green-dark)', color: 'white', 
                fontWeight: 900, cursor: submitting ? 'wait' : 'pointer', height: '44px',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
              }}
            >
              {submitting ? <Loader2 size={18} className="animate-spin" /> : 'Create Account'}
            </button>
          </div>
        </form>
      </div>

      {/* Staff List */}
      <div style={{ background: 'white', borderRadius: '24px', padding: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', padding: '0 8px' }}>
           <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#0f172a' }}>Current Staff</h3>
           <div style={{ position: 'relative', width: '260px' }}>
             <Search size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
             <input 
               value={search} onChange={e => setSearch(e.target.value)}
               placeholder="Search staff..." 
               style={{ width: '100%', padding: '10px 16px 10px 40px', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none', background: '#f8fafc', fontSize: '13px', fontWeight: 600 }} 
             />
           </div>
         </div>

         <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
               <tr style={{ background: '#f8fafc', color: '#64748b', fontSize: '13px', textTransform: 'uppercase', fontWeight: 800 }}>
                  <th style={{ padding: '16px 20px', borderRadius: '12px 0 0 12px' }}>Name</th>
                  <th style={{ padding: '16px 20px' }}>Email</th>
                  <th style={{ padding: '16px 20px' }}>Role</th>
                  <th style={{ padding: '16px 20px', borderRadius: '0 12px 12px 0' }}>Phone</th>
               </tr>
            </thead>
            <tbody>
               {filteredStaff.length === 0 ? (
                 <tr>
                  <td colSpan="4" style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>
                    {loading ? 'Loading staff directory...' : 'No staff members found.'}
                  </td>
                 </tr>
               ) : (
                 filteredStaff.map(u => (
                    <tr key={u.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                       <td style={{ padding: '20px' }}>
                         <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                           <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: u.role === 'admin' ? '#fef2f2' : 'var(--gold-tint)', color: u.role === 'admin' ? '#ef4444' : 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900 }}>
                             {u.role === 'admin' ? <Shield size={18} /> : (u.name?.charAt(0).toUpperCase() || 'S')}
                           </div>
                           <span style={{ fontWeight: 800, color: 'var(--green-dark)' }}>{u.name}</span>
                         </div>
                       </td>
                       <td style={{ padding: '20px', color: '#64748b', fontWeight: 600 }}>{u.email}</td>
                       <td style={{ padding: '20px' }}>
                         <span style={{ 
                           background: u.role === 'admin' ? '#fee2e2' : u.role === 'kitchen' ? '#ffedd5' : '#e0f2fe',
                           color: u.role === 'admin' ? '#991b1b' : u.role === 'kitchen' ? '#9a3412' : '#0369a1',
                           padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 800, textTransform: 'capitalize'
                         }}>
                           {u.role === 'driver' ? 'Rider / Driver' : u.role}
                         </span>
                       </td>
                       <td style={{ padding: '20px', color: '#64748b', fontWeight: 600 }}>{u.phone || '—'}</td>
                    </tr>
                 ))
               )}
            </tbody>
         </table>
      </div>
    </div>
  )
}
