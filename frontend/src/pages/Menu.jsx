import React, { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Search, SlidersHorizontal, Star, ShoppingBag, Plus, Minus, Timer, Clock, ChevronLeft, ChevronRight } from 'lucide-react'
import { shopInfo } from '../data/menuData'
import { dataService } from '../admin/services/dataService'
import { useCart } from '../context/CartContext'

function MenuItemRow({ item }) {
  const { addToCart, updateQty, cartItems } = useCart()
  const cartItem = cartItems.find(i => i.id === item.id)
  const qty = cartItem ? cartItem.qty : 0

  const badgeMap = { 
    bestseller: { label: '⭐ Bestseller', cls: 'badge-bestseller' }, 
    new: { label: '✨ New', cls: 'badge-new' }, 
    spicy: { label: '🌶 Spicy', cls: 'badge-spicy' } 
  }
  const b = item.badge ? badgeMap[item.badge] : null

  return (
    <div className="menu-item-row" style={{ 
      background: 'white', borderRadius: '24px', padding: '24px', display: 'flex', gap: '24px', 
      alignItems: 'center', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)', 
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', position: 'relative'
    }}>
      <div className="menu-item-img-col" style={{ position: 'relative', width: '120px', height: '120px', borderRadius: '20px', overflow: 'hidden', flexShrink: 0, background: 'var(--cream)' }}>
        <img src={item.image || item.img || 'https://images.unsplash.com/photo-1544145945-f904253d0c71?auto=format&fit=crop&w=300'} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        {b && <span className={`badge ${b.cls}`} style={{ position: 'absolute', top: '10px', left: '10px', padding: '4px 8px', fontSize: '10px' }}>{b.label}</span>}
      </div>
      
      <div className="menu-item-text-col" style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
          <h3 style={{ fontSize: '19px', fontWeight: 900, color: 'var(--text-dark)' }}>{item.name}</h3>
          <span style={{ fontSize: '19px', fontWeight: 900, color: 'var(--green-mid)' }}>${item.price.toFixed(2)}</span>
        </div>
        <p style={{ fontSize: '14px', color: 'var(--text-light)', lineHeight: 1.5, marginBottom: '16px', maxWidth: '580px' }}>{item.description}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px', fontWeight: 700, color: 'var(--text-mid)' }}>
           <span style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'var(--cream)', padding: '4px 8px', borderRadius: '6px' }}>
             <Timer size={14} color="var(--gold)" /> {item.prepTime} min
           </span>
           {item.category === 'indian' && (
             <span style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'var(--gold-tint)', color: 'var(--gold)', padding: '4px 8px', borderRadius: '6px' }}>
               <Clock size={14} /> 9AM-9PM
             </span>
           )}
        </div>
      </div>

      <div className="menu-item-action-col" style={{ flexShrink: 0, width: '130px', display: 'flex', justifyContent: 'flex-end' }}>
        {qty > 0 ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--green-dark)', color: 'white', padding: '8px 16px', borderRadius: '12px' }}>
            <button onClick={() => updateQty(item.id, -1)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: 0, display: 'flex' }}><Minus size={18} /></button>
            <span style={{ fontWeight: 900, fontSize: '16px', minWidth: '12px', textAlign: 'center' }}>{qty}</span>
            <button onClick={() => updateQty(item.id, 1)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: 0, display: 'flex' }}><Plus size={18} /></button>
          </div>
        ) : (
          <button onClick={() => addToCart(item)} style={{
            display: 'flex', alignItems: 'center', gap: '8px', background: 'white', color: 'var(--green-dark)', 
            border: '2px solid var(--green-dark)', borderRadius: '12px', padding: '10px 20px',
            fontWeight: 800, fontSize: '14px', cursor: 'pointer', transition: '0.2s'
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
  const { totalItems, subtotal } = useCart()
  const [activeCategory, setActiveCategory] = useState(params.get('cat') || 'all')
  const [search, setSearch] = useState('')
  const scrollRef = React.useRef(null)

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  const [items, setItems] = useState([])
  const [dynamicCategories, setDynamicCategories] = useState([])

  React.useEffect(() => {
    const fetchData = () => {
      setItems(dataService.getProducts().filter(p => p.active))
      setDynamicCategories(dataService.getCategories())
    };
    
    fetchData();
    window.addEventListener('storage', fetchData);
    window.addEventListener('stm_data_updated', fetchData);
    
    return () => {
      window.removeEventListener('storage', fetchData);
      window.removeEventListener('stm_data_updated', fetchData);
    }
  }, [])

  const filtered = items.filter(item => {
    const matchCat = activeCategory === 'all' || item.categoryId === activeCategory
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) || (item.description || '').toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  const allCats = [{ id: 'all', name: 'All Items', icon: '🍽️' }, ...dynamicCategories]

  return (
    <div style={{ background: 'var(--bg-body)', minHeight: '100vh' }}>
      {/* Page header */}
      <div style={{ background: 'var(--green-dark)', padding: '60px 0 100px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=1800)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.08 }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <h1 className="menu-title" style={{ fontSize: '56px', fontWeight: 900, color: 'white', letterSpacing: '-2px', marginBottom: '16px', lineHeight: 1 }}>STM Salam Menu</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '18px', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' }}>
            {shopInfo.tagline}. Handcrafted quality food and drinks delivered to your doorstep.
          </p>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', background: 'white', borderRadius: '20px', padding: '8px 8px 8px 24px', maxWidth: '600px', margin: '0 auto' }}>
            <Search size={22} color="var(--text-light)" />
            <input
              type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search for Kebab, Burgers, Biryani, Milo Dinosaur..."
              style={{ border: 'none', outline: 'none', background: 'transparent', color: 'var(--text-dark)', fontSize: '16px', fontFamily: 'inherit', flex: 1, fontWeight: 600 }}
            />
          </div>
        </div>
      </div>

      {/* Categories horizontal scroll with Buttons */}
      <div style={{ position: 'sticky', top: '72px', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border)', zIndex: 100, marginTop: '-40px' }}>
        <div className="container" style={{ position: 'relative' }}>
          
          <button 
             onClick={() => scroll('left')} 
             className="scroll-chevron"
             style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', zIndex: 10, background: 'white', border: '1px solid var(--border)', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
          >
             <ChevronLeft size={20} color="var(--green-dark)" />
          </button>

          <div 
             ref={scrollRef} 
             className="custom-scrollbar category-scroll-container" 
             style={{ display: 'flex', gap: '12px', overflowX: 'auto', padding: '16px 48px', scrollBehavior: 'smooth' }}
          >
            {allCats.map(cat => (
              <button key={cat.id} onClick={() => setActiveCategory(cat.id)} style={{
                padding: '12px 24px', borderRadius: '16px', fontSize: '14px', fontWeight: 800, border: 'none', cursor: 'pointer',
                whiteSpace: 'nowrap', transition: '0.2s',
                background: activeCategory === cat.id ? 'var(--green-dark)' : 'white',
                color: activeCategory === cat.id ? 'white' : 'var(--text-mid)',
                boxShadow: activeCategory === cat.id ? '0 4px 12px rgba(10,61,46,0.2)' : '0 1px 3px rgba(0,0,0,0.05)',
                display: 'flex', alignItems: 'center', gap: '8px'
              }}>
                 <span>{cat.icon || cat.emoji}</span> {cat.name}
              </button>
            ))}
          </div>

          <button 
             onClick={() => scroll('right')} 
             className="scroll-chevron"
             style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', zIndex: 10, background: 'white', border: '1px solid var(--border)', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
          >
             <ChevronRight size={20} color="var(--green-dark)" />
          </button>

        </div>
      </div>

      <div className="container" style={{ paddingTop: '40px', paddingBottom: '120px', maxWidth: '900px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filtered.map(item => <MenuItemRow key={item.id} item={item} />)}
          {filtered.length === 0 && (
             <div style={{ textAlign: 'center', padding: '60px 0', color: '#64748b', fontWeight: 700, background: 'white', borderRadius: '24px', border: '1px solid #eef2f6' }}>
               No items found matching your selection.
             </div>
          )}
        </div>
      </div>

      {/* Floating Cart Button */}
      {totalItems > 0 && (
        <div className="floating-cart" style={{ position: 'fixed', bottom: '30px', left: '50%', transform: 'translateX(-50%)', zIndex: 1000, width: '100%', maxWidth: '500px', padding: '0 20px' }}>
          <Link to="/cart" style={{ 
            background: 'var(--green-dark)', color: 'white', padding: '20px 32px', borderRadius: '20px', 
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', textDecoration: 'none', 
            fontWeight: 800, boxShadow: '0 20px 40px rgba(10,61,46,0.3)', border: '2px solid var(--gold)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ background: 'var(--gold)', color: 'var(--green-dark)', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>
                {totalItems}
              </div>
              <span>View Cart</span>
            </div>
            <span>${subtotal.toFixed(2)}</span>
          </Link>
        </div>
      )}

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        @media (max-width: 768px) {
          .menu-item-row { 
            flex-direction: column !important; 
            align-items: stretch !important; 
            gap: 16px !important; 
            padding: 16px !important; 
          }
          .menu-item-img-col { 
            width: 100% !important; 
            height: 200px !important; 
          }
          .menu-item-action-col { 
            width: 100% !important; 
            justify-content: space-between !important; 
            margin-top: 8px;
          }
          .scroll-chevron { display: none !important; }
          .category-scroll-container { padding: 16px !important; }
          .floating-cart { bottom: 90px !important; left: 16px !important; right: 16px !important; transform: none !important; width: auto !important; padding: 0 !important; }
          .menu-title { font-size: 40px !important; }
        }
      `}</style>
    </div>
  )
}
