import React from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Phone, Clock, Facebook, Instagram } from 'lucide-react'
import { shopInfo } from '../../data/menuData'

export default function Footer() {
  return (
    <footer style={{ background: 'var(--green-dark)', color: 'white', paddingTop: '72px', width: '100%', overflow: 'hidden' }}>
      <div className="container">
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '56px', marginBottom: '56px' }}>

          {/* Brand */}
          <div className="footer-brand">
            <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '14px' }}>
              <img src="/stmsalamlogo.png" alt="Logo" style={{ width: '64px', height: '64px', objectFit: 'contain' }} />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: '26px', fontWeight: 950, color: 'var(--gold)', letterSpacing: '-0.5px', lineHeight: 1 }}>Salam</div>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginTop: '4px' }}>Genuine Taste Since 1988</div>
              </div>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px', lineHeight: 1.8, maxWidth: '300px', marginBottom: '32px' }}>
              Experience the peak of Marine Terrace hospitality. Premium ingredients, crafted with excellence and delivered with grace.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { icon: <MapPin size={16} />, text: shopInfo.address },
                { icon: <Phone size={16} />,  text: shopInfo.phone },
                { icon: <Clock size={16} />,  text: shopInfo.hours },
              ].map(({ icon, text }) => (
                <div key={text} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>
                  <span style={{ color: 'var(--gold)', marginTop: '2px', flexShrink: 0 }}>{icon}</span>
                  {text}
                </div>
              ))}
            </div>
          </div>

          {/* Order */}
          <div>
            <h4 style={{ fontSize: '13px', fontWeight: 900, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '24px' }}>Explore</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px', padding: 0 }}>
              {[['Main Menu', '/menu'], ['Your Cart', '/cart'], ['Track Delivery', '/tracking'], ['My Profile', '/profile']].map(([label, to]) => (
                <li key={to}><Link to={to} style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px', fontWeight: 500, textDecoration: 'none' }}>{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 style={{ fontSize: '13px', fontWeight: 900, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '24px' }}>Support</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px', padding: 0 }}>
              <li><Link to="/about" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px', fontWeight: 500, textDecoration: 'none' }}>About STM</Link></li>
              {['Latest Promos', 'Delivery Info', 'Halal Status', 'Contact Us'].map(label => (
                <li key={label}><a href="#" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px', fontWeight: 500, textDecoration: 'none' }}>{label}</a></li>
              ))}
            </ul>
          </div>

          {/* Staff */}
          <div>
            <h4 style={{ fontSize: '13px', fontWeight: 900, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '24px' }}>Portals</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px', padding: 0 }}>
              <li><Link to="/admin"  style={{ color: '#86EFAC', fontSize: '15px', fontWeight: 800, textDecoration: 'none' }}>Admin Login ↗</Link></li>
              <li><Link to="/driver" style={{ color: '#FCA5A5', fontSize: '15px', fontWeight: 800, textDecoration: 'none' }}>Driver Portal ↗</Link></li>
              {['Terms of Service', 'Privacy Policy'].map(label => (
                <li key={label}><a href="#" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px', fontWeight: 500, textDecoration: 'none' }}>{label}</a></li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', padding: '32px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '24px' }}>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>
            © {new Date().getFullYear()} Salam Teh Tarik. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <a href="https://facebook.com/stmsalam" target="_blank" rel="noreferrer" style={{ color: 'rgba(255,255,255,0.4)', transition: '0.3s color' }} onMouseEnter={e => e.currentTarget.style.color='var(--gold)'} onMouseLeave={e => e.currentTarget.style.color='rgba(255,255,255,0.4)'}><Facebook size={20} /></a>
              <a href="https://instagram.com/stmsalam" target="_blank" rel="noreferrer" style={{ color: 'rgba(255,255,255,0.4)', transition: '0.3s color' }} onMouseEnter={e => e.currentTarget.style.color='var(--gold)'} onMouseLeave={e => e.currentTarget.style.color='rgba(255,255,255,0.4)'}><Instagram size={20} /></a>
            </div>
            <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.1)' }} />
            <span style={{ background: 'var(--gold)', color: 'var(--green-dark)', fontSize: '11px', fontWeight: 950, padding: '6px 14px', borderRadius: '30px', letterSpacing: '1px' }}>HALAL Certified</span>
            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>Singapore · Marine Terrace</span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 968px) {
          .footer-grid { grid-template-columns: 1fr !important; gap: 48px !important; text-align: center; }
          .footer-brand { display: flex; flex-direction: column; align-items: center; }
          .footer-brand p { margin: 0 auto 32px !important; }
          .footer-brand > div { justify-content: center; }
        }
      `}</style>
    </footer>
  )
}
