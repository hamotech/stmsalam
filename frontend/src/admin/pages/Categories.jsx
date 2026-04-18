import React, { useState, useEffect, useCallback } from 'react';
import {
  subscribeCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from '../services/dataService';
import { Plus, Edit, Trash2, ArrowLeft, CheckCircle, XCircle } from 'lucide-react';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [view, setView] = useState('list'); // list | add | edit
  const [currentCategory, setCurrentCategory] = useState(null);
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [deleteModal, setDeleteModal] = useState({ show: false, id: null });
  const [saving, setSaving] = useState(false);

  // ── Real-time Firestore subscription ──────────────────────────────────────
  useEffect(() => {
    const unsub = subscribeCategories((cats) => setCategories(cats));
    return () => unsub();
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3500);
  };

  const getEmptyCategory = useCallback(() => ({
    name: '',
    icon: '🍽️',
    active: true,
    order: categories.length + 1,
  }), [categories.length]);

  const confirmDelete = async () => {
    const id = deleteModal.id;
    setDeleteModal({ show: false, id: null });
    if (!id) return;
    try {
      await deleteCategory(id);
      showToast('Category deleted successfully.');
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleDelete = (id) => {
    if (id === 'cat-uncategorized') {
      showToast('You cannot delete the system Uncategorized fallback.', 'error');
      return;
    }
    setDeleteModal({ show: true, id });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentCategory?.name?.trim()) {
      showToast('Category name is required.', 'error');
      return;
    }
    setSaving(true);
    try {
      if (view === 'add') {
        await addCategory(currentCategory);
        showToast('Category added successfully.');
      } else {
        await updateCategory(currentCategory.id, currentCategory);
        showToast('Category updated successfully.');
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
      <div style={{ maxWidth: '600px', margin: '0 auto', background: 'white', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.04)', position: 'relative' }}>
        {toast.show && (
          <div style={{ position: 'fixed', top: '20px', right: '20px', background: toast.type === 'error' ? '#ef4444' : '#10b981', color: 'white', padding: '16px 24px', borderRadius: '12px', fontWeight: 'bold', boxShadow: '0 10px 25px rgba(0,0,0,0.2)', zIndex: 9999, display: 'flex', alignItems: 'center', gap: '8px' }}>
            {toast.type === 'error' ? <XCircle size={20} /> : <CheckCircle size={20} />}
            {toast.message}
          </div>
        )}
        <button onClick={() => setView('list')} style={{ background: 'none', border: 'none', color: '#64748b', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginBottom: '32px', fontWeight: 'bold' }}>
          <ArrowLeft size={18} /> Back to Categories
        </button>
        <h2 style={{ fontSize: '28px', fontWeight: '900', color: '#0f172a', marginBottom: '32px' }}>
          {view === 'add' ? 'Add New Category' : 'Edit Category'}
        </h2>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <label style={{ display: 'block', fontWeight: '800', marginBottom: '8px', fontSize: '14px', color: '#475569' }}>Category Name</label>
            <input required type="text" value={currentCategory.name} onChange={e => setCurrentCategory({ ...currentCategory, name: e.target.value })} style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '15px', fontWeight: '600', boxSizing: 'border-box' }} placeholder="e.g. Rice Dishes" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div>
              <label style={{ display: 'block', fontWeight: '800', marginBottom: '8px', fontSize: '14px', color: '#475569' }}>Emoji / Icon</label>
              <input required type="text" value={currentCategory.icon} onChange={e => setCurrentCategory({ ...currentCategory, icon: e.target.value })} style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '15px', fontWeight: '600', boxSizing: 'border-box' }} placeholder="e.g. 🍛" maxLength={5} />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: '800', marginBottom: '8px', fontSize: '14px', color: '#475569' }}>Display Order</label>
              <input required type="number" min="1" value={currentCategory.order} onChange={e => setCurrentCategory({ ...currentCategory, order: parseInt(e.target.value, 10) })} style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '15px', fontWeight: '600', boxSizing: 'border-box' }} />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '32px', background: '#f8fafc', padding: '24px', borderRadius: '16px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', fontWeight: '800', color: currentCategory.active ? '#10b981' : '#ef4444' }}>
              <input type="checkbox" checked={currentCategory.active} onChange={e => setCurrentCategory({ ...currentCategory, active: e.target.checked })} style={{ width: '20px', height: '20px' }} />
              {currentCategory.active ? <CheckCircle size={20} /> : <XCircle size={20} />} {currentCategory.active ? 'Active (Visible)' : 'Inactive (Hidden)'}
            </label>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px', marginTop: '16px' }}>
            <button type="button" onClick={() => setView('list')} style={{ padding: '14px 28px', borderRadius: '12px', border: '1px solid #cbd5e1', background: 'white', fontWeight: 'bold', cursor: 'pointer' }}>Cancel</button>
            <button type="submit" disabled={saving} style={{ padding: '14px 32px', borderRadius: '12px', border: 'none', background: 'var(--green-dark)', color: 'white', fontWeight: 'bold', cursor: saving ? 'wait' : 'pointer', boxShadow: '0 8px 16px rgba(1, 50, 32, 0.2)', opacity: saving ? 0.7 : 1 }}>
              {saving ? 'Saving...' : 'Save Category'}
            </button>
          </div>
        </form>
      </div>
    );
  }

  const filteredCategories = categories.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

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
            <h3 style={{ fontSize: '20px', fontWeight: '900', color: '#0f172a', marginBottom: '12px' }}>Delete Category?</h3>
            <p style={{ color: '#64748b', fontSize: '14px', lineHeight: '1.5', marginBottom: '32px' }}>Are you sure? Products in this category will be moved to Uncategorized.</p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => setDeleteModal({ show: false, id: null })} style={{ flex: 1, padding: '14px', borderRadius: '12px', border: '1px solid #cbd5e1', background: 'white', fontWeight: 'bold', color: '#475569', cursor: 'pointer' }}>Cancel</button>
              <button onClick={confirmDelete} style={{ flex: 1, padding: '14px', borderRadius: '12px', border: 'none', background: '#ef4444', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>Delete</button>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: '900', color: '#0f172a' }}>Categories Management</h2>
        <div style={{ display: 'flex', gap: '16px' }}>
          <input type="text" placeholder="Search categories..." value={search} onChange={e => setSearch(e.target.value)} style={{ padding: '10px 16px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '14px', fontWeight: '600', outline: 'none' }} />
          <button onClick={() => { setCurrentCategory(getEmptyCategory()); setView('add'); }} style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'var(--green-dark)', color: 'white', border: 'none', padding: '12px 20px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 12px rgba(1,50,32,0.2)' }}>
            <Plus size={18} /> Add Category
          </button>
        </div>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.03)', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.02)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #eef2f6' }}>
            <tr style={{ textAlign: 'left', color: '#64748b' }}>
              <th style={{ padding: '20px', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px' }}>Order</th>
              <th style={{ padding: '20px', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px' }}>Category Name</th>
              <th style={{ padding: '20px', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px' }}>Status</th>
              <th style={{ padding: '20px', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.map(cat => (
              <tr key={cat.id} style={{ borderBottom: '1px solid #f1f5f9', transition: '0.2s' }} onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                <td style={{ padding: '20px', fontWeight: '900', color: '#94a3b8', fontSize: '15px' }}>#{cat.order}</td>
                <td style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
                    {cat.icon || '🍽️'}
                  </div>
                  <div style={{ fontWeight: '800', color: '#0f172a', fontSize: '16px' }}>{cat.name}</div>
                </td>
                <td style={{ padding: '20px' }}>
                  <span style={{ padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '800', background: cat.active ? '#ecfdf5' : '#fef2f2', color: cat.active ? '#10b981' : '#ef4444' }}>
                    {cat.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button onClick={() => { setCurrentCategory(cat); setView('edit'); }} style={{ backgroundColor: '#f1f5f9', color: '#0ea5e9', border: 'none', padding: '10px', borderRadius: '10px', cursor: 'pointer', transition: '0.2s' }}>
                      <Edit size={18} />
                    </button>
                    {cat.id !== 'cat-uncategorized' && isAuthenticated && (
                      <button onClick={() => handleDelete(cat.id)} style={{ backgroundColor: '#fef2f2', color: '#ef4444', border: 'none', padding: '10px', borderRadius: '10px', cursor: 'pointer', transition: '0.2s' }}>
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {filteredCategories.length === 0 && (
              <tr>
                <td colSpan="4" style={{ padding: '60px', textAlign: 'center', color: '#94a3b8', fontWeight: 'bold' }}>
                  {categories.length === 0 ? '⏳ Loading categories from database...' : 'No categories found matching your search.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Categories;
