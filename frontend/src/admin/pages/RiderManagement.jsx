import React, { useState, useEffect } from 'react';
import { Search, UserPlus, Shield, Loader2, CheckCircle, XCircle, Edit, Trash2 } from 'lucide-react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../lib/firebase';

const BACKEND_URL = 'http://localhost:5000'; // Fallback for local development, assuming CORS handles it

export default function RiderManagement() {
  const [riders, setRiders] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [isEditing, setIsEditing] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'driver',
    vehicleDetails: '',
    activeStatus: true,
  });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3500);
  };

  useEffect(() => {
    // Listen to the canonical `drivers` collection (uid as doc ID)
    const unsub = onSnapshot(
      collection(db, 'drivers'),
      (snap) => {
        setRiders(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching drivers:', error);
        setLoading(false);
      }
    );
    return () => unsub();
  }, []);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', password: '', phone: '', role: 'driver', vehicleDetails: '', activeStatus: true });
    setIsEditing(false);
  };

  const handleEditClick = (rider) => {
    setFormData({
      name: rider.name || '',
      email: rider.email || '',
      password: '', // Blank unless changing
      phone: rider.phone || '',
      role: rider.role || 'driver',
      vehicleDetails: rider.vehicleDetails || '',
      activeStatus: rider.activeStatus !== false,
    });
    setIsEditing(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || (!isEditing && !formData.password) || !formData.role) {
      return showToast('Please fill in all required fields.', 'error');
    }
    
    if (!isEditing && formData.password.length < 6) {
      return showToast('Password must be at least 6 characters long.', 'error');
    }

    setSubmitting(true);
    try {
      const endpoint = isEditing 
        ? `/api/admin/drivers/${encodeURIComponent(formData.email)}`
        : `/api/admin/drivers`;
      
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(`${BACKEND_URL}${endpoint}`, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Request failed');

      showToast(isEditing ? 'Driver updated successfully!' : 'Driver created successfully!');
      resetForm();
    } catch (err) {
      console.error(err);
      showToast(err.message || 'Failed to process request.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (email) => {
    if (!window.confirm(`Are you sure you want to permanently delete ${email}? This will remove them from Firebase Auth AND Firestore.`)) return;
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/drivers/${encodeURIComponent(email)}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete');
      showToast('Driver deleted from Firebase Auth & Firestore.');
    } catch (err) {
      showToast(err.message || 'Error deleting driver', 'error');
    }
  };

  const filteredRiders = riders.filter(u => 
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
         <h1 style={{ fontSize: '32px', fontWeight: 950, color: 'var(--green-dark)', letterSpacing: '-1px' }}>Rider & Driver Management</h1>
      </div>

      {/* Form */}
      <div style={{ background: 'white', borderRadius: '24px', padding: '28px', boxShadow: '0 10px 30px rgba(0,0,0,0.02)', marginBottom: '32px', border: '1px solid #e2e8f0' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 900, color: '#0f172a', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <UserPlus size={22} color="var(--gold)" /> {isEditing ? 'Edit Rider/Driver' : 'Add New Rider/Driver'}
        </h2>
        
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', alignItems: 'end' }}>
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
              type="email" name="email" value={formData.email} onChange={handleChange} required disabled={isEditing}
              style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none', background: isEditing ? '#e2e8f0' : '#f8fafc', fontWeight: 600 }} 
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, color: '#64748b', marginBottom: '6px' }}>
              Password {isEditing ? '(Leave blank to keep current)' : '*'}
            </label>
            <input 
              type="password" name="password" value={formData.password} onChange={handleChange} required={!isEditing} minLength={isEditing ? 0 : 6}
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
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, color: '#64748b', marginBottom: '6px' }}>Vehicle Details</label>
            <input 
              type="text" name="vehicleDetails" value={formData.vehicleDetails} onChange={handleChange} placeholder="e.g. Honda Civic, License Plate"
              style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none', background: '#f8fafc', fontWeight: 600 }} 
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, color: '#64748b', marginBottom: '6px' }}>Role *</label>
            <select 
              name="role" value={formData.role} onChange={handleChange} required
              style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none', background: '#f8fafc', fontWeight: 700 }}
            >
              <option value="driver">Driver</option>
              <option value="rider">Rider</option>
            </select>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', height: '44px', gap: '8px' }}>
            <input type="checkbox" id="activeStatus" name="activeStatus" checked={formData.activeStatus} onChange={handleChange} style={{ width: '20px', height: '20px' }} />
            <label htmlFor="activeStatus" style={{ fontSize: '14px', fontWeight: 800, color: '#334155', cursor: 'pointer' }}>Active Status</label>
          </div>
          
          <div style={{ display: 'flex', gap: '8px' }}>
            {isEditing && (
              <button 
                type="button" 
                onClick={resetForm}
                style={{ 
                  flex: 1, padding: '12px', borderRadius: '12px', border: '1px solid #cbd5e1', 
                  background: 'white', color: '#64748b', fontWeight: 800, cursor: 'pointer'
                }}
              >
                Cancel
              </button>
            )}
            <button 
              type="submit" 
              disabled={submitting}
              style={{ 
                flex: 2, padding: '12px 16px', borderRadius: '12px', border: 'none', 
                background: submitting ? '#94a3b8' : 'var(--green-dark)', color: 'white', 
                fontWeight: 900, cursor: submitting ? 'wait' : 'pointer', height: '44px',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
              }}
            >
              {submitting ? <Loader2 size={18} className="animate-spin" /> : (isEditing ? 'Update Profile' : 'Create Profile')}
            </button>
          </div>
        </form>
      </div>

      {/* List */}
      <div style={{ background: 'white', borderRadius: '24px', padding: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', padding: '0 8px' }}>
           <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#0f172a' }}>Current Drivers & Riders</h3>
           <div style={{ position: 'relative', width: '260px' }}>
             <Search size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
             <input 
               value={search} onChange={e => setSearch(e.target.value)}
               placeholder="Search..." 
               style={{ width: '100%', padding: '10px 16px 10px 40px', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none', background: '#f8fafc', fontSize: '13px', fontWeight: 600 }} 
             />
           </div>
         </div>

         <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
               <tr style={{ background: '#f8fafc', color: '#64748b', fontSize: '13px', textTransform: 'uppercase', fontWeight: 800 }}>
                  <th style={{ padding: '16px 20px', borderRadius: '12px 0 0 12px' }}>Name</th>
                  <th style={{ padding: '16px 20px' }}>Email</th>
                  <th style={{ padding: '16px 20px' }}>Firebase UID</th>
                  <th style={{ padding: '16px 20px' }}>Status</th>
                  <th style={{ padding: '16px 20px' }}>Vehicle</th>
                  <th style={{ padding: '16px 20px', borderRadius: '0 12px 12px 0' }}>Actions</th>
               </tr>
            </thead>
            <tbody>
               {filteredRiders.length === 0 ? (
                 <tr>
                  <td colSpan="6" style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>
                    {loading ? 'Loading...' : 'No riders/drivers found.'}
                  </td>
                 </tr>
               ) : (
                 filteredRiders.map(u => (
                    <tr key={u.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                       <td style={{ padding: '20px' }}>
                         <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                           <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'var(--gold-tint)', color: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900 }}>
                             {(u.name?.charAt(0).toUpperCase() || 'D')}
                           </div>
                           <span style={{ fontWeight: 800, color: 'var(--green-dark)' }}>{u.name}</span>
                         </div>
                       </td>
                       <td style={{ padding: '20px', color: '#64748b', fontWeight: 600 }}>{u.email}</td>
                       <td style={{ padding: '20px' }}>
                         <code style={{ fontSize: '11px', background: '#f1f5f9', padding: '4px 8px', borderRadius: '6px', color: '#475569', letterSpacing: '-0.3px' }}>
                           {u.uid ? u.uid.slice(0, 14) + '…' : '—'}
                         </code>
                       </td>
                       <td style={{ padding: '20px' }}>
                         <span style={{ 
                           background: u.activeStatus !== false ? '#dcfce7' : '#fee2e2',
                           color: u.activeStatus !== false ? '#166534' : '#991b1b',
                           padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 800, textTransform: 'capitalize'
                         }}>
                           {u.activeStatus !== false ? 'Active' : 'Inactive'}
                         </span>
                       </td>
                       <td style={{ padding: '20px', color: '#64748b', fontWeight: 600 }}>{u.vehicleDetails || '—'}</td>
                       <td style={{ padding: '20px', display: 'flex', gap: '10px' }}>
                         <button onClick={() => handleEditClick(u)} style={{ background: '#f1f5f9', border: 'none', borderRadius: '8px', padding: '8px', cursor: 'pointer', color: '#475569' }}>
                           <Edit size={16} />
                         </button>
                         <button onClick={() => handleDelete(u.email)} style={{ background: '#fee2e2', border: 'none', borderRadius: '8px', padding: '8px', cursor: 'pointer', color: '#ef4444' }}>
                           <Trash2 size={16} />
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
