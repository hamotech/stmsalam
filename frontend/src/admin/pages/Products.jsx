import React, { useState, useEffect, useCallback } from 'react';
import {
  subscribeProducts,
  subscribeCategories,
  addProduct,
  updateProduct,
  deleteProduct,
  migrateProductImagePaths,
  bootstrapAdminClaim,
} from '../services/dataService';
import { auth, storage } from '../../lib/firebase';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Plus, Edit, Trash2, ArrowLeft, Image as ImageIcon, Star, CheckCircle, XCircle, Wand2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Products = () => {
  const { isAuthenticated } = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [view, setView] = useState('list'); // list | add | edit
  const [currentProduct, setCurrentProduct] = useState(null);
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [deleteModal, setDeleteModal] = useState({ show: false, id: null });
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [repairing, setRepairing] = useState(false);
  const [migrationLoading, setMigrationLoading] = useState(false);
  const [dryRunCompleted, setDryRunCompleted] = useState(false);
  const [migrationReport, setMigrationReport] = useState(null);

  const tryBootstrapAdminAndRetry = async (retryAction) => {
    const uid = auth.currentUser?.uid || '';
    if (!uid) throw new Error('Authentication required.');
    await bootstrapAdminClaim(uid);
    showToast('Admin claim granted. Retrying now...');
    return retryAction();
  };

  // ── Real-time Firestore subscriptions ──────────────────────────────────────
  useEffect(() => {
    const unsubProducts = subscribeProducts((prods) => setProducts(prods));
    const unsubCats     = subscribeCategories((cats)  => setCategories(cats));
    return () => { unsubProducts(); unsubCats(); };
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3500);
  };

  const getEmptyProduct = useCallback(() => ({
    name: '',
    categoryId: categories[0]?.id || 'cat-uncategorized',
    price: 0,
    description: '',
    image: '',
    featured: false,
    active: true,
    order: products.length + 1,
  }), [categories, products.length]);

  const confirmDelete = async () => {
    const id = deleteModal.id;
    setDeleteModal({ show: false, id: null });
    if (!id) return;
    try {
      await deleteProduct(id);
      showToast('Product deleted successfully.');
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleDelete = (id) => setDeleteModal({ show: true, id });

  const handleDryRunImageFix = async () => {
    if (migrationLoading) return;
    setMigrationLoading(true);
    setRepairing(true);
    try {
      const result = await migrateProductImagePaths({ dryRun: true, previewLimit: 100 });
      setMigrationReport(result);
      setDryRunCompleted(true);
      const brokenFound = Number(result?.brokenCount ?? 0);
      if (brokenFound === 0) {
        showToast('All products already have valid images. Nothing to repair.');
      } else {
        showToast(`Dry run complete: ${brokenFound} broken images found. Review table below.`);
      }
      console.log('[ImageFix DryRun]', result);
    } catch (err) {
      const code = err?.code || '';
      if (code === 'functions/permission-denied') {
        try {
          const result = await tryBootstrapAdminAndRetry(() =>
            migrateProductImagePaths({ dryRun: true, previewLimit: 100 })
          );
          setMigrationReport(result);
          setDryRunCompleted(true);
          showToast(`Dry run complete: ${Number(result?.brokenCount ?? 0)} broken images found.`);
          console.log('[ImageFix DryRun Retry]', result);
        } catch (retryErr) {
          showToast(retryErr.message || 'Repair denied: your account is missing admin custom claim.', 'error');
        }
      } else if (code === 'functions/unauthenticated') {
        showToast('Please sign in again before running repair.', 'error');
      } else {
        showToast(err.message || 'Failed to repair images.', 'error');
      }
    } finally {
      setMigrationLoading(false);
      setRepairing(false);
    }
  };

  const handleApplyImageFix = async () => {
    if (!dryRunCompleted || migrationLoading) return;
    const ok = window.confirm('Apply image fixes to all broken entries from dry run?');
    if (!ok) return;
    setMigrationLoading(true);
    setRepairing(true);
    try {
      const result = await migrateProductImagePaths({ dryRun: false, previewLimit: 100 });
      setMigrationReport(result);
      showToast(`Applied image fix: ${result.updatedCount} updated, ${result.validCount} already valid.`);
      console.log('[ImageFix Apply]', result);
    } catch (err) {
      const code = err?.code || '';
      if (code === 'functions/permission-denied') {
        try {
          const result = await tryBootstrapAdminAndRetry(() =>
            migrateProductImagePaths({ dryRun: false, previewLimit: 100 })
          );
          setMigrationReport(result);
          showToast(`Applied image fix: ${result.updatedCount} updated, ${result.validCount} already valid.`);
          console.log('[ImageFix Apply Retry]', result);
        } catch (retryErr) {
          showToast(retryErr.message || 'Failed to apply image fix.', 'error');
        }
      } else {
        showToast(err.message || 'Failed to apply image fix.', 'error');
      }
    } finally {
      setMigrationLoading(false);
      setRepairing(false);
    }
  };

  // Upload image to Firebase Storage, get download URL
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingImage(true);
    let compressedDataURL;
    const uploadToStorage = async (blob, originalName) => {
      const fileRef = storageRef(storage, `products/${Date.now()}_${originalName}`);
      const uploadPromise = uploadBytes(fileRef, blob, { contentType: 'image/webp' });
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Firebase Storage upload timed out')), 3000)
      );
      await Promise.race([uploadPromise, timeoutPromise]);
      return getDownloadURL(fileRef);
    };
    try {
      // Compress image via canvas first
      compressedDataURL = await compressImage(file);
      const blob = await (await fetch(compressedDataURL)).blob();
      const url = await uploadToStorage(blob, file.name);
      setCurrentProduct(prev => ({ ...prev, image: url, img: url }));
      showToast('Image uploaded to Firebase Storage ✓');
    } catch (err) {
      const code = String(err?.code || '');
      // If claim is stale, bootstrap admin and retry upload once.
      if (code === 'storage/unauthorized') {
        try {
          await tryBootstrapAdminAndRetry(async () => {
            const blob = await (await fetch(compressedDataURL)).blob();
            const url = await uploadToStorage(blob, file.name);
            setCurrentProduct((prev) => ({ ...prev, image: url, img: url }));
            return true;
          });
          showToast('Image uploaded to Firebase Storage ✓');
          return;
        } catch (retryErr) {
          console.warn('[Storage] Upload retry failed after admin bootstrap:', retryErr?.message || retryErr);
        }
      }

      console.warn('[Storage] Upload failed, falling back to local base64:', err.message);
      if (compressedDataURL) {
        setCurrentProduct(prev => ({ ...prev, image: compressedDataURL, img: compressedDataURL }));
        showToast('Image saved locally (Firebase Storage unavailable)', 'success');
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
        const MAX = 800;
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
    if (!currentProduct?.name?.trim()) {
      showToast('Product name is required.', 'error');
      return;
    }
    if (!currentProduct.categoryId) {
      showToast('Please select a valid category.', 'error');
      return;
    }
    setSaving(true);
    try {
      const payload = {
        ...currentProduct,
        image: currentProduct.image || currentProduct.img || '',
        img: currentProduct.image || currentProduct.img || '',
      };
      if (view === 'add') {
        await addProduct(payload);
        showToast('Product added successfully.');
      } else {
        await updateProduct(currentProduct.id, payload);
        showToast('Product updated successfully.');
      }
      setView('list');
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  if (view !== 'list') {
    return (
      <div style={{ maxWidth: '800px', margin: '0 auto', background: 'white', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.04)', position: 'relative' }}>
        {toast.show && (
          <div style={{ position: 'fixed', top: '20px', right: '20px', background: toast.type === 'error' ? '#ef4444' : '#10b981', color: 'white', padding: '16px 24px', borderRadius: '12px', fontWeight: 'bold', boxShadow: '0 10px 25px rgba(0,0,0,0.2)', zIndex: 9999, display: 'flex', alignItems: 'center', gap: '8px' }}>
            {toast.type === 'error' ? <XCircle size={20} /> : <CheckCircle size={20} />}
            {toast.message}
          </div>
        )}
        <button onClick={() => setView('list')} style={{ background: 'none', border: 'none', color: '#64748b', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginBottom: '32px', fontWeight: 'bold' }}>
          <ArrowLeft size={18} /> Back to Products
        </button>
        <h2 style={{ fontSize: '28px', fontWeight: '900', color: '#0f172a', marginBottom: '32px' }}>
          {view === 'add' ? 'Add New Product' : 'Edit Product'}
        </h2>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Image Upload Zone */}
          <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
            <div style={{ width: '150px', height: '150px', borderRadius: '20px', background: '#f8fafc', border: '2px dashed #cbd5e1', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', position: 'relative' }}>
              {currentProduct.image ? (
                <img loading="lazy" src={currentProduct.image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <ImageIcon size={40} color="#94a3b8" />
              )}
              <input type="file" accept="image/*" onChange={handleImageUpload} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }} />
            </div>
            <div>
              <h4 style={{ fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>Product Image</h4>
              <p style={{ color: '#64748b', fontSize: '13px', marginBottom: '16px' }}>
                {uploadingImage ? '⏳ Uploading to Firebase Storage...' : 'Upload any high-quality image. Automatically saved to Firebase Storage.'}
              </p>
              <button type="button" style={{ background: '#f1f5f9', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: '700', fontSize: '13px', color: '#475569', position: 'relative', overflow: 'hidden', cursor: 'pointer' }}>
                {uploadingImage ? 'Uploading...' : 'Choose File'}
                <input type="file" accept="image/*" onChange={handleImageUpload} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }} disabled={uploadingImage} />
              </button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div>
              <label style={{ display: 'block', fontWeight: '800', marginBottom: '8px', fontSize: '14px', color: '#475569' }}>Product Name</label>
              <input required type="text" value={currentProduct.name} onChange={e => setCurrentProduct({ ...currentProduct, name: e.target.value })} style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '15px', fontWeight: '600', boxSizing: 'border-box' }} placeholder="e.g. Nasi Lemak Special" />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: '800', marginBottom: '8px', fontSize: '14px', color: '#475569' }}>Price ($)</label>
              <input required type="number" step="0.01" value={currentProduct.price} onChange={e => setCurrentProduct({ ...currentProduct, price: parseFloat(e.target.value) })} style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '15px', fontWeight: '600', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: '800', marginBottom: '8px', fontSize: '14px', color: '#475569' }}>Category</label>
              <select value={currentProduct.categoryId} onChange={e => setCurrentProduct({ ...currentProduct, categoryId: e.target.value })} style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '15px', fontWeight: '600', background: 'white', boxSizing: 'border-box' }}>
                {categories.map(c => <option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: '800', marginBottom: '8px', fontSize: '14px', color: '#475569' }}>Display Order</label>
              <input required type="number" min="1" value={currentProduct.order || 99} onChange={e => setCurrentProduct({ ...currentProduct, order: parseInt(e.target.value, 10) })} style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '15px', fontWeight: '600', boxSizing: 'border-box' }} />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: '800', marginBottom: '8px', fontSize: '14px', color: '#475569' }}>Description</label>
            <textarea value={currentProduct.description} onChange={e => setCurrentProduct({ ...currentProduct, description: e.target.value })} style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '15px', minHeight: '100px', resize: 'vertical', boxSizing: 'border-box' }} placeholder="Brief description of the item..." />
          </div>

          <div style={{ display: 'flex', gap: '32px', background: '#f8fafc', padding: '24px', borderRadius: '16px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', fontWeight: '800', color: currentProduct.featured ? 'var(--gold)' : '#64748b' }}>
              <input type="checkbox" checked={currentProduct.featured} onChange={e => setCurrentProduct({ ...currentProduct, featured: e.target.checked })} style={{ width: '20px', height: '20px' }} />
              <Star size={20} fill={currentProduct.featured ? 'currentColor' : 'none'} /> Featured Item
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', fontWeight: '800', color: currentProduct.active ? '#10b981' : '#ef4444' }}>
              <input type="checkbox" checked={currentProduct.active} onChange={e => setCurrentProduct({ ...currentProduct, active: e.target.checked })} style={{ width: '20px', height: '20px' }} />
              {currentProduct.active ? <CheckCircle size={20} /> : <XCircle size={20} />} {currentProduct.active ? 'Active (Visible)' : 'Inactive (Hidden)'}
            </label>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px', marginTop: '16px' }}>
            <button type="button" onClick={() => setView('list')} style={{ padding: '14px 28px', borderRadius: '12px', border: '1px solid #cbd5e1', background: 'white', fontWeight: 'bold', cursor: 'pointer' }}>Cancel</button>
            <button type="submit" disabled={saving || uploadingImage} style={{ padding: '14px 32px', borderRadius: '12px', border: 'none', background: 'var(--green-dark)', color: 'white', fontWeight: 'bold', cursor: saving ? 'wait' : 'pointer', boxShadow: '0 8px 16px rgba(1, 50, 32, 0.2)', opacity: (saving || uploadingImage) ? 0.7 : 1 }}>
              {saving ? 'Saving...' : 'Save Product'}
            </button>
          </div>
        </form>
      </div>
    );
  }

  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ position: 'relative' }}>
      {toast.show && (
        <div style={{ position: 'fixed', top: '20px', right: '20px', background: toast.type === 'error' ? '#ef4444' : '#10b981', color: 'white', padding: '16px 24px', borderRadius: '12px', fontWeight: 'bold', boxShadow: '0 10px 25px rgba(0,0,0,0.2)', zIndex: 9999, display: 'flex', alignItems: 'center', gap: '8px' }}>
          {toast.type === 'error' ? <XCircle size={20} /> : <CheckCircle size={20} />}
          {toast.message}
        </div>
      )}

      {deleteModal.show && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)' }}>
          <div style={{ background: 'white', padding: '32px', borderRadius: '24px', maxWidth: '400px', width: '100%', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', textAlign: 'center' }}>
            <div style={{ width: '64px', height: '64px', background: '#fef2f2', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <Trash2 size={32} color="#ef4444" />
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: '900', color: '#0f172a', marginBottom: '12px' }}>Delete Product?</h3>
            <p style={{ color: '#64748b', fontSize: '14px', lineHeight: '1.5', marginBottom: '32px' }}>Are you sure? This action cannot be undone.</p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => setDeleteModal({ show: false, id: null })} style={{ flex: 1, padding: '14px', borderRadius: '12px', border: '1px solid #cbd5e1', background: 'white', fontWeight: 'bold', color: '#475569', cursor: 'pointer' }}>Cancel</button>
              <button onClick={confirmDelete} style={{ flex: 1, padding: '14px', borderRadius: '12px', border: 'none', background: '#ef4444', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>Delete</button>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: '900', color: '#0f172a' }}>Products Management</h2>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <input type="text" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} style={{ padding: '10px 16px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '14px', fontWeight: '600', outline: 'none' }} />
          <button
            onClick={handleDryRunImageFix}
            disabled={migrationLoading}
            title="Preview broken image paths without writing"
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              backgroundColor: migrationLoading ? '#94a3b8' : '#f59e0b',
              color: 'white', border: 'none', padding: '12px 20px', borderRadius: '12px',
              fontWeight: 'bold', cursor: migrationLoading ? 'wait' : 'pointer',
              boxShadow: '0 4px 12px rgba(245,158,11,0.25)'
            }}
          >
            <Wand2 size={18} /> {migrationLoading ? 'Running…' : 'Dry Run Image Fix'}
          </button>
          <button
            onClick={handleApplyImageFix}
            disabled={!dryRunCompleted || migrationLoading}
            title="Apply image path fixes to broken entries"
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              backgroundColor: (!dryRunCompleted || migrationLoading) ? '#94a3b8' : '#0f766e',
              color: 'white', border: 'none', padding: '12px 20px', borderRadius: '12px',
              fontWeight: 'bold', cursor: (!dryRunCompleted || migrationLoading) ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 12px rgba(15,118,110,0.25)'
            }}
          >
            <Wand2 size={18} /> Apply Image Fix
          </button>
          <button onClick={() => { setCurrentProduct(getEmptyProduct()); setView('add'); }} style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'var(--green-dark)', color: 'white', border: 'none', padding: '12px 20px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 12px rgba(1,50,32,0.2)' }}>
            <Plus size={18} /> Add Product
          </button>
        </div>
      </div>

      {migrationReport && (
        <div style={{ marginBottom: '20px', background: 'white', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '16px' }}>
          <div style={{ display: 'flex', gap: '18px', flexWrap: 'wrap', fontSize: '13px', fontWeight: 800, color: '#334155', marginBottom: '12px' }}>
            <span>Total: {migrationReport.totalProductsScanned}</span>
            <span>Broken: {migrationReport.brokenCount}</span>
            <span>Valid: {migrationReport.validCount}</span>
            <span>Preview Limit: {migrationReport.previewLimitUsed}</span>
            <span>Updated: {migrationReport.updatedCount}</span>
            <span>Mode: {migrationReport.dryRun ? 'Dry Run' : 'Apply'}</span>
          </div>
          {Array.isArray(migrationReport.brokenEntries) && migrationReport.brokenEntries.length > 0 && (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                <thead>
                  <tr style={{ textAlign: 'left', background: '#f8fafc' }}>
                    <th style={{ padding: '8px', borderBottom: '1px solid #e2e8f0' }}>Product</th>
                    <th style={{ padding: '8px', borderBottom: '1px solid #e2e8f0' }}>Category</th>
                    <th style={{ padding: '8px', borderBottom: '1px solid #e2e8f0' }}>Current</th>
                    <th style={{ padding: '8px', borderBottom: '1px solid #e2e8f0' }}>Proposed</th>
                    <th style={{ padding: '8px', borderBottom: '1px solid #e2e8f0' }}>Reason</th>
                  </tr>
                </thead>
                <tbody>
                  {migrationReport.brokenEntries.map((entry) => (
                    <tr key={entry.productId} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '8px' }}>{entry.productName || entry.productId}</td>
                      <td style={{ padding: '8px' }}>{entry.category || '-'}</td>
                      <td style={{ padding: '8px', color: '#64748b' }}>{entry.currentImage || '-'}</td>
                      <td style={{ padding: '8px', color: '#0f766e' }}>{entry.proposedReplacementImage}</td>
                      <td style={{ padding: '8px', color: '#b45309' }}>{entry.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      <div style={{ backgroundColor: 'white', borderRadius: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.03)', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.02)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #eef2f6' }}>
            <tr style={{ textAlign: 'left', color: '#64748b' }}>
              <th style={{ padding: '20px', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px' }}>Product</th>
              <th style={{ padding: '20px', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px' }}>Category</th>
              <th style={{ padding: '20px', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px' }}>Price</th>
              <th style={{ padding: '20px', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px' }}>Status</th>
              <th style={{ padding: '20px', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(product => {
              const matchedCat = categories.find(c => c.id === product.categoryId);
              const fallbackCategoryName = String(product.category || product.categoryId || '').trim();
              const matchedByName = !matchedCat && fallbackCategoryName
                ? categories.find((c) => String(c.name || '').toLowerCase() === fallbackCategoryName.toLowerCase())
                : null;
              const categoryLabel = matchedCat
                ? `${matchedCat.icon || '📦'} ${matchedCat.name || 'Uncategorized'}`
                : matchedByName
                  ? `${matchedByName.icon || '📦'} ${matchedByName.name || 'Uncategorized'}`
                  : fallbackCategoryName
                    ? `📦 ${fallbackCategoryName}`
                    : '📦 Uncategorized';
              return (
                <tr key={product.id} style={{ borderBottom: '1px solid #f1f5f9', transition: '0.2s' }} onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <td style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <img loading="lazy"
                      src={product.image || product.img || 'https://images.unsplash.com/photo-1544145945-f904253d0c71?auto=format&fit=crop&w=120'}
                      alt={product.name}
                      style={{ width: '56px', height: '56px', borderRadius: '12px', objectFit: 'cover', background: '#f1f5f9' }}
                    />
                    <div>
                      <div style={{ fontWeight: '800', color: '#0f172a', fontSize: '15px' }}>{product.name}</div>
                      {product.featured && <div style={{ fontSize: '11px', color: 'var(--gold)', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}><Star size={12} fill="currentColor" /> Featured</div>}
                    </div>
                  </td>
                  <td style={{ padding: '20px', color: '#64748b' }}>
                    <span style={{ backgroundColor: '#f1f5f9', padding: '6px 12px', borderRadius: '8px', fontSize: '13px', fontWeight: '700', color: '#475569' }}>
                      {categoryLabel}
                    </span>
                  </td>
                  <td style={{ padding: '20px', fontWeight: '900', color: 'var(--green-dark)', fontSize: '16px' }}>${product.price ? parseFloat(product.price).toFixed(2) : '0.00'}</td>
                  <td style={{ padding: '20px' }}>
                    <span style={{ padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '800', background: product.active ? '#ecfdf5' : '#fef2f2', color: product.active ? '#10b981' : '#ef4444' }}>
                      {product.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <button onClick={() => { setCurrentProduct(product); setView('edit'); }} style={{ backgroundColor: '#f1f5f9', color: '#0ea5e9', border: 'none', padding: '10px', borderRadius: '10px', cursor: 'pointer', transition: '0.2s' }}>
                        <Edit size={18} />
                      </button>
                      {isAuthenticated && (
                        <button onClick={() => handleDelete(product.id)} style={{ backgroundColor: '#fef2f2', color: '#ef4444', border: 'none', padding: '10px', borderRadius: '10px', cursor: 'pointer', transition: '0.2s' }}>
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
            {filteredProducts.length === 0 && (
              <tr>
                <td colSpan="5" style={{ padding: '60px', textAlign: 'center', color: '#94a3b8', fontWeight: 'bold' }}>
                  {products.length === 0 ? '⏳ Loading products from database...' : 'No products found matching your search.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
