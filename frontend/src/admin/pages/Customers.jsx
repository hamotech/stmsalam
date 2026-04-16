import React, { useState, useEffect } from 'react';
import { Mail, Lock, CheckCircle, X, Search, ShieldCheck, User } from 'lucide-react';
import { validateEmail, validatePasswordStrength, validateConfirmPassword } from '../../utils/validators';

export default function Customers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  
  // Edit Form State
  const [newEmail, setNewEmail] = useState('');
  const [passwordForm, setPasswordForm] = useState({ newPass: '', confirmPass: '' });
  const [showPasswordEditor, setShowPasswordEditor] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');

  const loadUsers = () => {
    try {
      const db = JSON.parse(localStorage.getItem('stm_mock_db') || '[]');
      setUsers(db);
    } catch(e) {}
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const openEditor = (u) => {
    setSelectedUser(u);
    setNewEmail(u.email || '');
    setPasswordForm({ newPass: '', confirmPass: '' });
    setShowPasswordEditor(false);
    setErrors({});
    setSuccess('');
  };

  const handleUpdate = () => {
    setErrors({});
    setSuccess('');
    
    const currErrors = {};
    const safeEmail = newEmail.trim().toLowerCase();
    
    // Validate Email
    const emailErr = validateEmail(safeEmail);
    if (emailErr) currErrors.email = emailErr;
    
    // Check duplication
    if (!emailErr && safeEmail !== selectedUser.email?.toLowerCase()) {
      const exists = users.find(u => u.email?.toLowerCase() === safeEmail);
      if (exists) currErrors.email = 'This email is already in use by another user.';
    }

    // Validate Password if toggled
    if (showPasswordEditor) {
      if (!passwordForm.newPass) {
        currErrors.newPass = 'New password is required.';
      } else {
        const passErr = validatePasswordStrength(passwordForm.newPass);
        if (passErr) currErrors.newPass = passErr;
        
        const confirmErr = validateConfirmPassword(passwordForm.newPass, passwordForm.confirmPass);
        if (confirmErr) currErrors.confirmPass = confirmErr;
      }
    }

    if (Object.keys(currErrors).length > 0) {
      setErrors(currErrors);
      return;
    }

    // Confirm before saving
    if (!window.confirm('Are you sure you want to apply these changes?')) return;

    // Update Local DB
    const mockDb = JSON.parse(localStorage.getItem('stm_mock_db') || '[]');
    const idx = mockDb.findIndex(u => u.id === selectedUser.id);
    if (idx !== -1) {
      mockDb[idx].email = safeEmail;
      if (showPasswordEditor && passwordForm.newPass) {
        mockDb[idx].password = passwordForm.newPass;
      }
      localStorage.setItem('stm_mock_db', JSON.stringify(mockDb));
      
      setSuccess('User updated successfully.');
      setTimeout(() => { openEditor(null); loadUsers(); }, 2000);
    } else {
      setErrors({ form: 'User not found in database.' });
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
                   <td colSpan="4" style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>No customers found.</td>
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
                          <button onClick={() => openEditor(u)} style={{ background: 'var(--green-tint)', color: 'var(--green-dark)', padding: '8px 16px', borderRadius: '10px', fontWeight: 800, border: 'none', cursor: 'pointer' }}>Manage</button>
                       </td>
                    </tr>
                 ))
               )}
            </tbody>
         </table>
      </div>

      {/* Editor Modal */}
      {selectedUser && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
           <div style={{ background: 'white', width: '500px', maxWidth: '90%', borderRadius: '32px', overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.2)' }}>
              <div style={{ padding: '24px 32px', background: '#f8fafc', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                 <h2 style={{ fontSize: '20px', fontWeight: 900, color: 'var(--green-dark)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                   <User size={20} /> Manage User
                 </h2>
                 <button onClick={() => setSelectedUser(null)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}><X size={24} /></button>
              </div>
              
              <div style={{ padding: '32px' }}>
                 {success && <div style={{ background: '#f0fdf4', color: '#16a34a', padding: '14px', borderRadius: '14px', marginBottom: '20px', fontSize: '14px', fontWeight: 700, display: 'flex', gap: '8px', alignItems: 'center' }}><CheckCircle size={18} /> {success}</div>}
                 {errors.form && <div style={{ background: '#fef2f2', color: '#dc2626', padding: '14px', borderRadius: '14px', marginBottom: '20px', fontSize: '14px', fontWeight: 700 }}>{errors.form}</div>}

                 <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {/* Email Update */}
                    <div>
                       <label style={{ fontSize: '12px', fontWeight: 900, color: '#64748b', marginBottom: '8px', display: 'block' }}>ACCOUNT EMAIL</label>
                       <div style={{ position: 'relative' }}>
                         <Mail size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#cbd5e1' }} />
                         <input 
                           type="email" value={newEmail} onChange={e => { setNewEmail(e.target.value); setErrors({...errors, email: ''}); }}
                           style={{ width: '100%', padding: '14px 16px 14px 44px', borderRadius: '14px', border: `1.5px solid ${errors.email ? '#ef4444' : '#e2e8f0'}`, outline: 'none', fontWeight: 600, color: '#0f172a' }}
                         />
                       </div>
                       {errors.email && <div style={{ color: '#ef4444', fontSize: '12px', fontWeight: 700, marginTop: '6px' }}>{errors.email}</div>}
                    </div>

                    <div style={{ height: '1px', background: '#f1f5f9', margin: '4px 0' }} />

                    {/* Password Update Toggle */}
                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontWeight: 800, color: 'var(--green-dark)' }}>
                       <input type="checkbox" checked={showPasswordEditor} onChange={e => setShowPasswordEditor(e.target.checked)} style={{ width: '18px', height: '18px', accentColor: 'var(--gold)' }} />
                       Reset User Password
                    </label>

                    {showPasswordEditor && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', background: '#f8fafc', padding: '20px', borderRadius: '20px', border: '1px dashed #cbd5e1' }}>
                         <div>
                            <input 
                              type="password" placeholder="New Password" 
                              value={passwordForm.newPass} onChange={e => { setPasswordForm({...passwordForm, newPass: e.target.value}); setErrors({...errors, newPass: ''}); }}
                              style={{ width: '100%', padding: '14px 16px', borderRadius: '14px', border: `1.5px solid ${errors.newPass ? '#ef4444' : '#e2e8f0'}`, outline: 'none', fontWeight: 600 }}
                            />
                            {errors.newPass && <div style={{ color: '#ef4444', fontSize: '12px', fontWeight: 700, marginTop: '6px' }}>{errors.newPass}</div>}
                         </div>
                         <div>
                            <input 
                              type="password" placeholder="Confirm New Password" 
                              value={passwordForm.confirmPass} onChange={e => { setPasswordForm({...passwordForm, confirmPass: e.target.value}); setErrors({...errors, confirmPass: ''}); }}
                              style={{ width: '100%', padding: '14px 16px', borderRadius: '14px', border: `1.5px solid ${errors.confirmPass ? '#ef4444' : '#e2e8f0'}`, outline: 'none', fontWeight: 600 }}
                            />
                            {errors.confirmPass && <div style={{ color: '#ef4444', fontSize: '12px', fontWeight: 700, marginTop: '6px' }}>{errors.confirmPass}</div>}
                         </div>
                         <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 600, display: 'flex', gap: '6px', alignItems: 'flex-start' }}>
                           <ShieldCheck size={14} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                           Password must have 1 uppercase, 1 lowercase, 1 number and min 6 characters.
                         </div>
                      </div>
                    )}
                 </div>

                 <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
                    <button onClick={() => setSelectedUser(null)} style={{ flex: 1, padding: '16px', background: '#f1f5f9', color: '#64748b', border: 'none', borderRadius: '16px', fontWeight: 800, cursor: 'pointer' }}>Cancel</button>
                    <button onClick={handleUpdate} style={{ flex: 1, padding: '16px', background: 'var(--green-dark)', color: 'white', border: 'none', borderRadius: '16px', fontWeight: 800, cursor: 'pointer' }}>Apply Changes</button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  )
}
