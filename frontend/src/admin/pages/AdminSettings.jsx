import React, { useState, useEffect } from 'react';
import { Mail, ShieldCheck, CheckCircle, Key } from 'lucide-react';
import { validateEmail, validatePasswordStrength, validateConfirmPassword } from '../../utils/validators';

export default function AdminSettings() {
  const defaultAdmin = { email: 'admin@stm.com', password: 'admin123' };
  
  const [email, setEmail] = useState('');
  const [passwordForm, setPasswordForm] = useState({ newPass: '', confirmPass: '' });
  const [showPasswordEditor, setShowPasswordEditor] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const creds = JSON.parse(localStorage.getItem('stm_admin_creds')) || defaultAdmin;
    setEmail(creds.email);
  }, []);

  const handleUpdate = () => {
    setErrors({});
    setSuccess('');
    
    const currErrors = {};
    const safeEmail = email.trim().toLowerCase();
    
    const emailErr = validateEmail(safeEmail);
    if (emailErr) currErrors.email = emailErr;
    
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

    if (!window.confirm('Are you sure you want to change Admin credentials? You will need to use these to log in next time!')) return;

    const creds = JSON.parse(localStorage.getItem('stm_admin_creds')) || defaultAdmin;
    creds.email = safeEmail;
    if (showPasswordEditor && passwordForm.newPass) {
      creds.password = passwordForm.newPass;
    }
    
    localStorage.setItem('stm_admin_creds', JSON.stringify(creds));
    setSuccess('Admin credentials successfully updated! Please remember these next time you sign in.');
    
    if (showPasswordEditor) {
      setPasswordForm({ newPass: '', confirmPass: '' });
      setShowPasswordEditor(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
         <h1 style={{ fontSize: '32px', fontWeight: 950, color: 'var(--green-dark)', letterSpacing: '-1px' }}>Admin Settings</h1>
         <p style={{ color: '#64748b', fontWeight: 700 }}>Manage your master administrator login credentials.</p>
      </div>

      <div style={{ background: 'white', borderRadius: '32px', padding: '40px', boxShadow: '0 20px 40px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9' }}>
         {success && <div style={{ background: '#f0fdf4', color: '#16a34a', padding: '16px 20px', borderRadius: '16px', marginBottom: '24px', fontSize: '14px', fontWeight: 700, display: 'flex', gap: '10px', alignItems: 'center', border: '1px solid #bbf7d0' }}><CheckCircle size={20} /> {success}</div>}
         {errors.form && <div style={{ background: '#fef2f2', color: '#dc2626', padding: '16px 20px', borderRadius: '16px', marginBottom: '24px', fontSize: '14px', fontWeight: 700, border: '1px solid #fecaca' }}>{errors.form}</div>}

         <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Admin Email Update */}
            <div>
               <label style={{ fontSize: '12px', fontWeight: 900, color: '#64748b', marginBottom: '8px', display: 'block' }}>ADMIN LOGIN EMAIL</label>
               <div style={{ position: 'relative' }}>
                 <Mail size={18} style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: '#cbd5e1' }} />
                 <input 
                   type="email" value={email} onChange={e => { setEmail(e.target.value); setErrors({...errors, email: ''}); }}
                   style={{ width: '100%', padding: '16px 20px 16px 50px', borderRadius: '16px', border: `2px solid ${errors.email ? '#ef4444' : '#e2e8f0'}`, outline: 'none', fontWeight: 700, color: '#0f172a', background: '#f8fafc' }}
                 />
               </div>
               {errors.email && <div style={{ color: '#ef4444', fontSize: '13px', fontWeight: 700, marginTop: '8px' }}>{errors.email}</div>}
            </div>

            <div style={{ height: '2px', background: '#f1f5f9', margin: '8px 0' }} />

            {/* Password Update Toggle */}
            <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', fontWeight: 900, color: 'var(--green-dark)', padding: '8px 0' }}>
               <input type="checkbox" checked={showPasswordEditor} onChange={e => setShowPasswordEditor(e.target.checked)} style={{ width: '20px', height: '20px', accentColor: 'var(--gold)', cursor: 'pointer' }} />
               Change Admin Password
            </label>

            {showPasswordEditor && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', background: '#f8fafc', padding: '24px', borderRadius: '24px', border: '2px dashed #e2e8f0' }}>
                 <div>
                    <label style={{ fontSize: '12px', fontWeight: 900, color: '#64748b', marginBottom: '8px', display: 'block' }}>NEW PASSWORD</label>
                    <div style={{ position: 'relative' }}>
                       <Key size={18} style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: '#cbd5e1' }} />
                       <input 
                         type="password" placeholder="Enter new master password" 
                         value={passwordForm.newPass} onChange={e => { setPasswordForm({...passwordForm, newPass: e.target.value}); setErrors({...errors, newPass: ''}); }}
                         style={{ width: '100%', padding: '16px 20px 16px 50px', borderRadius: '16px', border: `2px solid ${errors.newPass ? '#ef4444' : '#e2e8f0'}`, outline: 'none', fontWeight: 700 }}
                       />
                    </div>
                    {errors.newPass && <div style={{ color: '#ef4444', fontSize: '13px', fontWeight: 700, marginTop: '8px' }}>{errors.newPass}</div>}
                 </div>
                 <div>
                    <label style={{ fontSize: '12px', fontWeight: 900, color: '#64748b', marginBottom: '8px', display: 'block' }}>CONFIRM NEW PASSWORD</label>
                    <div style={{ position: 'relative' }}>
                       <ShieldCheck size={18} style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: '#cbd5e1' }} />
                       <input 
                         type="password" placeholder="Re-enter to confirm" 
                         value={passwordForm.confirmPass} onChange={e => { setPasswordForm({...passwordForm, confirmPass: e.target.value}); setErrors({...errors, confirmPass: ''}); }}
                         style={{ width: '100%', padding: '16px 20px 16px 50px', borderRadius: '16px', border: `2px solid ${errors.confirmPass ? '#ef4444' : '#e2e8f0'}`, outline: 'none', fontWeight: 700 }}
                       />
                    </div>
                    {errors.confirmPass && <div style={{ color: '#ef4444', fontSize: '13px', fontWeight: 700, marginTop: '8px' }}>{errors.confirmPass}</div>}
                 </div>
                 <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 700, display: 'flex', gap: '8px', alignItems: 'flex-start', background: 'white', padding: '12px 16px', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
                   <ShieldCheck size={16} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                   <span>Must be completely secure: at least 1 uppercase letter, 1 lowercase letter, 1 number, and min 6 characters total.</span>
                 </div>
              </div>
            )}
         </div>

         <div style={{ marginTop: '40px' }}>
            <button onClick={handleUpdate} style={{ width: '100%', padding: '20px', background: 'var(--green-dark)', color: 'white', border: 'none', borderRadius: '20px', fontWeight: 900, fontSize: '16px', cursor: 'pointer', display: 'flex', justifyContent: 'center', gap: '10px', alignItems: 'center' }}>
              <CheckCircle size={20} />
              Update Admin Credentials
            </button>
         </div>
      </div>
    </div>
  )
}
