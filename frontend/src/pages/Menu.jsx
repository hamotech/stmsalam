import React, { useState, useEffect, useRef } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Search, SlidersHorizontal, Star, ShoppingBag, Plus, Minus, Timer, Clock, ChevronLeft, ChevronRight, Loader } from 'lucide-react'
import { shopInfo } from '../data/menuData'
import { subscribeProducts, subscribeCategories } from '../admin/services/dataService'
import { useCart } from '../context/CartContext'

function MenuItemRow({ item }) {
  const { addToCart, updateQty, cartItems = [] } = useCart() || {}
  const cartItem = (cartItems || []).find(i => i.id === item.id)
  const qty = cartItem ? cartItem.qty : 0

  const badgeMap = { 
    bestseller: { label: '⭐ Bestseller', cls: 'badge-bestseller' }, 
    new: { label: '✨ New', cls: 'badge-new' }, 
    spicy: { label: '🌶 Spicy', cls: 'badge-spicy' } 
  }
  const b = item.badge ? badgeMap[item.badge] : null
  const price = Number(item.price) || 0

  return (
    <div className="menu-item-row" style={{ 
      background: 'white', borderRadius: '24px', padding: '24px', display: 'flex', gap: '24px', 
      alignItems: 'center', border: '1px solid #eef2f6', boxShadow: '0 4px 15px rgba(0,0,0,0.02)', 
      transition: 'all 0.3s', position: 'relative'
    }}>
      <div className="menu-item-img-col" style={{ position: 'relative', width: '120px', height: '120px', borderRadius: '20px', overflow: 'hidden', flexShrink: 0, background: '#f8fafc' }}>
        <img loading="lazy" src={item.image || item.img || 'https://images.unsplash.com/photo-1544145945-f904253d0c71?auto=format&fit=crop&w=300'} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        {b && <span className={`badge ${b.cls}`} style={{ position: 'absolute', top: '10px', left: '10px', padding: '4px 8px', fontSize: '10px' }}>{b.label}</span>}
      </div>
      
      <div className="menu-item-text-col" style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
          <h3 style={{ fontSize: '19px', fontWeight: 950, color: '#0f172a' }}>{item.name}</h3>
          <span style={{ fontSize: '19px', fontWeight: 950, color: 'var(--green-mid)' }}>${price.toFixed(2)}</span>
        </div>
        <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.5, marginBottom: '16px', maxWidth: '580px' }}>{item.description || 'Deliciously prepared with authentic SMT Salam spices.'}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px', fontWeight: 700, color: '#94a3b8' }}>
           <span style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'var(--cream)', color: 'var(--green-dark)', padding: '4px 8px', borderRadius: '6px' }}>
             <Timer size={14} color="var(--gold)" /> {item.prepTime || 15} min
           </span>
           {item.categoryId === 'indian' && (
             <span style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'var(--gold-tint)', color: 'var(--gold)', padding: '4px 8px', borderRadius: '6px' }}>
               <Clock size={14} /> 9AM-9PM
             </span>
           )}
        </div>
      </div>

      <div className="menu-item-action-col" style={{ flexShrink: 0, width: '130px', display: 'flex', justifyContent: 'flex-end' }}>
        {qty > 0 ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--green-dark)', color: 'white', padding: '8px 16px', borderRadius: '14px' }}>
            <button onClick={() => updateQty(item.id, -1)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: 4, display: 'flex' }}><Minus size={18} /></button>
            <span style={{ fontWeight: 950, fontSize: '16px', minWidth: '12px', textAlign: 'center' }}>{qty}</span>
            <button onClick={() => updateQty(item.id, 1)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: 4, display: 'flex' }}><Plus size={18} /></button>
          </div>
        ) : (
          <button onClick={() => addToCart(item)} style={{
            display: 'flex', alignItems: 'center', gap: '8px', background: 'white', color: 'var(--green-dark)', 
            border: '2px solid var(--green-dark)', borderRadius: '14px', padding: '10px 20px',
            fontWeight: 900, fontSize: '14px', cursor: 'pointer', transition: '0.2s transform active',
          }}>
            <Plus size={18} /> ADD
          </button>
        )}
      </div>
    </div>
  )
}

export default function Menu() {
  const [params] = useSearchParams()
  const { totalItems = 0, subtotal = 0 } = useCart() || {}
  const [activeCategory, setActiveCategory] = useState(params.get('cat') || 'all')
  const [search, setSearch] = useState('')
  const [items, setItems] = useState([])
  const [dynamicCategories, setDynamicCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const scrollRef = useRef(null)

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  useEffect(() => {
    const unsubProducts = subscribeProducts((prods) => {
      setItems(prods.filter(p => p.active !== false));
      setLoading(false);
    });
    const unsubCategories = subscribeCategories((cats) => {
      setDynamicCategories(cats);
    });
    
    return () => {
      if (typeof unsubProducts === 'function') unsubProducts();
      if (typeof unsubCategories === 'function') unsubCategories();
    }
  }, [])

  const filtered = items.filter(item => {
    const matchCat = activeCategory === 'all' || item.categoryId === activeCategory
    const matchSearch = item.name?.toLowerCase().includes(search.toLowerCase()) || 
                      (item.description || '').toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  const allCats = [{ id: 'all', name: 'Full Menu', icon: '🍽️' }, ...dynamicCategories]

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#f8fafc', gap: '20px' }}>
        <Loader size={40} className="spin" color="var(--green-dark)" />
        <p style={{ fontWeight: 800, color: '#64748b' }}>Curating Menu...</p>
        <style>{`.spin { animation: spin 1s linear infinite; } @keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
      {/* Page header */}
      <div style={{ background: 'var(--green-dark)', padding: '60px 0 100px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=1800)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.1 }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(40px, 8vw, 64px)', fontWeight: 950, color: 'white', letterSpacing: '-3px', marginBottom: '16px', lineHeight: 1 }}>STM Salam Menu</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '18px', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px', fontWeight: 500 }}>
            {shopInfo.tagline}
          </p>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', background: 'white', borderRadius: '24px', padding: '12px 12px 12px 28px', maxWidth: '600px', margin: '0 auto', boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }}>
            <Search size={22} color="#94a3b8" />
            <input
              type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search for kebabs, burgers, or drinks..."
              style={{ border: 'none', outline: 'none', background: 'transparent', color: '#0f172a', fontSize: '17px', fontFamily: 'inherit', flex: 1, fontWeight: 700 }}
            />
          </div>
        </div>
      </div>

      {/* Categories horizontal scroll */}
      <div style={{ position: 'sticky', top: '72px', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(20px)', borderBottom: '1px solid #f1f5f9', zIndex: 100, marginTop: '-48px' }}>
        <div className="container" style={{ position: 'relative' }}>
          <button onClick={() => scroll('left')} className="scroll-chevron" style={{ position: 'absolute', left: '-10px', top: '50%', transform: 'translateY(-50%)', zIndex: 10, background: 'white', border: '1px solid #e2e8f0', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
             <ChevronLeft size={20} color="var(--green-dark)" />
          </button>

          <div ref={scrollRef} className="no-scrollbar" style={{ display: 'flex', gap: '12px', overflowX: 'auto', padding: '16px 20px', scrollBehavior: 'smooth' }}>
            {allCats.map(cat => (
              <button key={cat.id} onClick={() => setActiveCategory(cat.id)} style={{
                padding: '12px 28px', borderRadius: '18px', fontSize: '14px', fontWeight: 900, cursor: 'pointer',
                whiteSpace: 'nowrap', transition: '0.2s',
                background: activeCategory === cat.id ? 'var(--green-dark)' : 'white',
                color: activeCategory === cat.id ? 'white' : '#64748b',
                boxShadow: activeCategory === cat.id ? '0 10px 20px rgba(1,50,32,0.15)' : '0 2px 5px rgba(0,0,0,0.02)',
                display: 'flex', alignItems: 'center', gap: '8px', 
                border: activeCategory === cat.id ? 'none' : '1px solid #f1f5f9'
              }}>
                 <span style={{ fontSize: '18px' }}>{cat.icon || cat.emoji}</span> {cat.name}
              </button>
            ))}
          </div>

          <button onClick={() => scroll('right')} className="scroll-chevron" style={{ position: 'absolute', right: '-10px', top: '50%', transform: 'translateY(-50%)', zIndex: 10, background: 'white', border: '1px solid #e2e8f0', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
             <ChevronRight size={20} color="var(--green-dark)" />
          </button>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '48px', paddingBottom: '140px', maxWidth: '960px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filtered.map(item => <MenuItemRow key={item.id} item={item} />)}
          {filtered.length === 0 && (
             <div style={{ textAlign: 'center', padding: '80px 0', color: '#94a3b8', background: 'white', borderRadius: '32px', border: '2px dashed #f1f5f9' }}>
               <ShoppingBag size={48} style={{ marginBottom: '16px', opacity: 0.2 }} />
               <p style={{ fontWeight: 800, fontSize: '18px' }}>No items found in this category.</p>
               <button onClick={() => { setActiveCategory('all'); setSearch(''); }} style={{ background: 'none', border: 'none', color: 'var(--green-mid)', fontWeight: 900, marginTop: '12px', cursor: 'pointer', textDecoration: 'underline' }}>View Full Menu</button>
             </div>
          )}
        </div>
      </div>

      {/* Floating Cart Footer */}
      {totalItems > 0 && (
        <div className="floating-cart" style={{ position: 'fixed', bottom: '30px', left: '50%', transform: 'translateX(-50%)', zIndex: 1000, width: 'calc(100% - 40px)', maxWidth: '560px' }}>
          <Link to="/cart" style={{ 
            background: 'var(--green-dark)', color: 'white', padding: '20px 32px', borderRadius: '24px', 
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', textDecoration: 'none', 
            fontWeight: 900, boxShadow: '0 25px 50px rgba(1,50,32,0.3)', border: '2px solid var(--gold)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ background: 'var(--gold)', color: 'var(--green-dark)', width: '30px', height: '30px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px' }}>
                {totalItems}
              </div>
              <span style={{ fontSize: '18px' }}>Review Order</span>
            </div>
            <span style={{ fontSize: '18px', fontWeight: 950 }}>Total: ${Number(subtotal).toFixed(2)}</span>
          </Link>
        </div>
      )}

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @media (max-width: 768px) {
          .menu-item-row { flex-direction: column !important; padding: 20px !important; }
          .menu-item-img-col { width: 100% !important; height: 180px !important; }
          .menu-item-action-col { width: 100% !important; margin-top: 12px; }
          .scroll-chevron { display: none !important; }
        }
      `}</style>
    </div>
  )
}
