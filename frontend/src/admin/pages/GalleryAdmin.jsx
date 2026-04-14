import React, { useState, useEffect, useCallback } from 'react';
import {
  subscribeGallery,
  addGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
} from '../services/dataService';
import { storage } from '../../lib/firebase';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Plus, Edit, Trash2, ArrowLeft, Image as ImageIcon, CheckCircle, XCircle, RefreshCw } from 'lucide-react';

const GalleryAdmin = () => {
  const [items, setItems] = useState([]);
  const [view, setView] = useState('list'); // list | add | edit
  const [currentItem, setCurrentItem] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [deleteModal, setDeleteModal] = useState({ show: false, id: null });
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    const unsub = subscribeGallery((data) => setItems(data));
    return () => unsub();
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3500);
  };

  const getEmptyItem = useCallback(() => ({
    title: '',
    url: '',
    description: '',
    active: true,
  }), []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingImage(true);
    let compressedDataURL;
    try {
      compressedDataURL = await compressImage(file);
      const blob = await (await fetch(compressedDataURL)).blob();
      const fileRef = storageRef(storage, `gallery/${Date.now()}_${file.name}`);
      
      const uploadPromise = uploadBytes(fileRef, blob, { contentType: 'image/webp' });
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Firebase Storage upload timed out')), 5000)
      );
      
      await Promise.race([uploadPromise, timeoutPromise]);
      const url = await getDownloadURL(fileRef);
      setCurrentItem(prev => ({ ...prev, url: url }));
      showToast('Image uploaded successfully ✓');
    } catch (err) {
      console.warn('[Storage] Upload failed, falling back to local base64:', err.message);
      if (compressedDataURL) {
        setCurrentItem(prev => ({ ...prev, url: compressedDataURL }));
        showToast('Image saved locally (Firebase offline)', 'success');
      } else {
        showToast('Failed to process image.', 'error');
      }
    } finally {
      setUploadingImage(false);
    }
  };

  const compressImage = (file) => new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const img = new Image();
      img.onload = () => {
        const MAX = 1200;
        let w = img.width, h = img.height;
        if (w > h) { if (w > MAX) { h = h * MAX / w; w = MAX; } }
        else        { if (h > MAX) { w = w * MAX / h; h = MAX; } }
        const canvas = document.createElement('canvas');
        canvas.width = w; canvas.height = h;
        canvas.getContext('2d').drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL('image/webp', 0.8));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentItem?.url) {
      showToast('Photo is required.', 'error');
      return;
    }
    setSaving(true);
    try {
      if (view === 'add') {
        await addGalleryItem(currentItem);
        showToast('Photo added to gallery successfully.');
      } else {
        await updateGalleryItem(currentItem.id, currentItem);
        showToast('Gallery photo updated successfully.');
      }
      setView('list');
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    const id = deleteModal.id;
    setDeleteModal({ show: false, id: null });
    if (!id) return;
    try {
      await deleteGalleryItem(id);
      showToast('Photo removed from gallery.');
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  if (view !== 'list') {
    return (
      <div style={{ maxWidth: '800px', margin: '0 auto', background: 'white', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.04)', position: 'relative' }}>
        <button onClick={() => setView('list')} style={{ background: 'none', border: 'none', color: '#64748b', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginBottom: '32px', fontWeight: 'bold' }}>
          <ArrowLeft size={18} /> Back to Gallery
        </button>
        <h2 style={{ fontSize: '28px', fontWeight: '900', color: '#0f172a', marginBottom: '32px' }}>
          {view === 'add' ? 'Upload New Photo' : 'Edit Photo'}
        </h2>

        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '40px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ width: '100%', aspectRatio: '1/1', background: '#f8fafc', borderRadius: '24px', border: '2px dashed #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative' }}>
              {currentItem.url ? (
                <img src={currentItem.url} alt="Gallery Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div style={{ textAlign: 'center', color: '#94a3b8' }}>
                  <ImageIcon size={48} style={{ marginBottom: '12px' }} />
                  <p style={{ fontSize: '14px', fontWeight: '800' }}>No Image Chosen</p>
                </div>
              )}
              {uploadingImage && (
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '12px' }}>
                  <RefreshCw className="animate-spin" size={32} color="var(--gold)" />
                  <span style={{ fontWeight: '800', color: 'var(--green-dark)' }}>Uploading...</span>
                </div>
              )}
            </div>
            <label style={{ display: 'block' }}>
              <span className="btn btn-outline" style={{ display: 'flex', justifyContent: 'center', width: '100%', padding: '14px', borderRadius: '16px', cursor: 'pointer' }}>
                <ImageIcon size={20} style={{ marginRight: '8px' }} /> {currentItem.url ? 'Replace Photo' : 'Select Photo'}
              </span>
              <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
            </label>
            {currentItem.url && (
              <p style={{ fontSize: '12px', color: '#64748b', wordBreak: 'break-all', textAlign: 'center', display: 'none' }}>{currentItem.url}</p>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <label style={{ display: 'block', fontWeight: '800', marginBottom: '8px', fontSize: '14px', color: '#475569' }}>Title (Optional)</label>
              <input type="text" value={currentItem.title} onChange={e => setCurrentItem({ ...currentItem, title: e.target.value })} style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '15px', fontWeight: '600', boxSizing: 'border-box' }} placeholder="e.g. Fresh Teh Tarik" />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: '800', marginBottom: '8px', fontSize: '14px', color: '#475569' }}>Description</label>
              <textarea rows="4" value={currentItem.description} onChange={e => setCurrentItem({ ...currentItem, description: e.target.value })} style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '15px', fontWeight: '600', boxSizing: 'border-box', resize: 'none' }} placeholder="Short caption about this photo..." />
            </div>
            <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '16px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', fontWeight: '800', color: currentItem.active ? '#10b981' : '#ef4444' }}>
                <input type="checkbox" checked={currentItem.active} onChange={e => setCurrentItem({ ...currentItem, active: e.target.checked })} style={{ width: '20px', height: '20px' }} />
                {currentItem.active ? 'Visible in Gallery' : 'Hidden from Gallery'}
              </label>
            </div>
            <div style={{ marginTop: 'auto', display: 'flex', gap: '16px' }}>
              <button type="button" onClick={() => setView('list')} style={{ flex: 1, padding: '16px', borderRadius: '16px', border: '1px solid #cbd5e1', background: 'white', fontWeight: 'bold', cursor: 'pointer' }}>Cancel</button>
              <button type="submit" disabled={saving || uploadingImage} style={{ flex: 1, padding: '16px', borderRadius: '16px', border: 'none', background: 'var(--green-dark)', color: 'white', fontWeight: 'bold', cursor: (saving || uploadingImage) ? 'wait' : 'pointer', boxShadow: '0 8px 16px rgba(1, 50, 32, 0.2)', opacity: (saving || uploadingImage) ? 0.7 : 1 }}>
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 9999 }}>
        {toast.show && (
          <div style={{ background: toast.type === 'error' ? '#ef4444' : '#10b981', color: 'white', padding: '16px 24px', borderRadius: '12px', fontWeight: 'bold', boxShadow: '0 10px 25px rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            {toast.type === 'error' ? <XCircle size={20} /> : <CheckCircle size={20} />}
            {toast.message}
          </div>
        )}
      </div>

      {deleteModal.show && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)' }}>
          <div style={{ background: 'white', padding: '32px', borderRadius: '24px', maxWidth: '400px', width: '100%', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', textAlign: 'center' }}>
            <div style={{ width: '64px', height: '64px', background: '#fef2f2', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <Trash2 size={32} color="#ef4444" />
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: '900', color: '#0f172a', marginBottom: '12px' }}>Delete Photo?</h3>
            <p style={{ color: '#64748b', fontSize: '14px', lineHeight: '1.5', marginBottom: '32px' }}>This will permanently remove the photo from your shop gallery.</p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => setDeleteModal({ show: false, id: null })} style={{ flex: 1, padding: '14px', borderRadius: '12px', border: '1px solid #cbd5e1', background: 'white', fontWeight: 'bold', color: '#475569', cursor: 'pointer' }}>Cancel</button>
              <button onClick={confirmDelete} style={{ flex: 1, padding: '14px', borderRadius: '12px', border: 'none', background: '#ef4444', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>Delete</button>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h2 style={{ fontSize: '28px', fontWeight: '900', color: '#0f172a' }}>Gallery Management</h2>
          <p style={{ color: '#64748b', fontWeight: '600' }}>Manage photos shown in your shop's portfolio.</p>
        </div>
        <button onClick={() => { setCurrentItem(getEmptyItem()); setView('add'); }} style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'var(--green-dark)', color: 'white', border: 'none', padding: '14px 24px', borderRadius: '14px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 12px rgba(1,50,32,0.2)' }}>
          <Plus size={18} /> Upload New Photo
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
        {items.map(item => (
          <div key={item.id} style={{ background: 'white', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', border: '1px solid #eef2f6', position: 'relative' }}>
            <div style={{ width: '100%', height: '220px', background: '#f8fafc', overflow: 'hidden' }}>
              <img src={item.url} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            {!item.active && (
              <div style={{ position: 'absolute', top: '12px', left: '12px', background: 'rgba(239, 68, 68, 0.9)', color: 'white', padding: '4px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: '900', textTransform: 'uppercase' }}>Hidden</div>
            )}
            <div style={{ padding: '20px' }}>
              <h4 style={{ fontSize: '16px', fontWeight: '900', color: '#0f172a', marginBottom: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title || 'No Title'}</h4>
              <p style={{ fontSize: '13px', color: '#64748b', fontWeight: '600', height: '40px', overflow: 'hidden' }}>{item.description || 'No description provided.'}</p>
              <div style={{ display: 'flex', gap: '10px', marginTop: '16px', borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
                <button onClick={() => { setCurrentItem(item); setView('edit'); }} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', background: '#f1f5f9', color: '#475569', border: 'none', padding: '10px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}>
                  <Edit size={16} /> Edit
                </button>
                <button onClick={() => setDeleteModal({ show: true, id: item.id })} style={{ background: '#fef2f2', color: '#ef4444', border: 'none', padding: '10px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {items.length === 0 && (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '80px', background: 'white', borderRadius: '24px', border: '1px dashed #cbd5e1' }}>
            <ImageIcon size={64} color="#cbd5e1" style={{ marginBottom: '16px' }} />
            <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#64748b' }}>Your gallery is empty</h3>
            <p style={{ color: '#94a3b8', marginBottom: '24px' }}>Upload photos of your delicious food to showcase them to customers.</p>
            <button onClick={() => { setCurrentItem(getEmptyItem()); setView('add'); }} style={{ background: 'var(--green-dark)', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}>Start Uploading</button>
          </div>
        )}
      </div>

      <style>{`
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default GalleryAdmin;
