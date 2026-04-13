import React, { useState } from 'react'
import { MapPin, Navigation, Edit3, Trash2, Plus, X, Check, Loader, Search, Home, Briefcase, MapPinned } from 'lucide-react'

// Reverse geocode using Nominatim (free, no API key)
async function reverseGeocode(lat, lng) {
  console.log(`[AddressManager] Reverse geocoding: ${lat}, ${lng}`);
  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`, {
      headers: { 'User-Agent': 'STM-Salam-Digital-Platform' }
    });
    if (!res.ok) throw new Error('Geocoding service error');
    const data = await res.json();
    console.log('[AddressManager] Geocoding result:', data);
    return data.display_name || `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
  } catch (err) {
    console.error('[AddressManager] Geocoding error:', err);
    return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
  }
}

const LABEL_OPTIONS = [
  { id: 'home', label: 'Home', icon: <Home size={16} /> },
  { id: 'office', label: 'Office', icon: <Briefcase size={16} /> },
  { id: 'other', label: 'Other', icon: <MapPinned size={16} /> },
]

export default function AddressManager() {
  const [addresses, setAddresses] = useState([
    { id: 1, label: 'Home', address: 'Blk 123 Marine Parade Road, #08-456, Singapore 440123', lat: 1.3028, lng: 103.9067, isDefault: true },
    { id: 2, label: 'Office', address: '1 Raffles Place, #32-01, One Raffles Place, Singapore 048616', lat: 1.2844, lng: 103.8510, isDefault: false },
  ])
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [mapCenter, setMapCenter] = useState({ lat: 1.3521, lng: 103.8198 })
  const [formData, setFormData] = useState({ label: 'home', address: '', unit: '', postalCode: '', notes: '' })
  const [locating, setLocating] = useState(false)
  const [geocoding, setGeocoding] = useState(false)

  const openAdd = () => {
    setEditingId(null)
    setFormData({ label: 'home', address: '', unit: '', postalCode: '', notes: '' })
    setMapCenter({ lat: 1.3521, lng: 103.8198 })
    setShowModal(true)
  }

  const openEdit = (addr) => {
    setEditingId(addr.id)
    setFormData({
      label: addr.label.toLowerCase(),
      address: addr.address,
      unit: addr.unit || '',
      postalCode: addr.postalCode || '',
      notes: addr.notes || ''
    })
    if (addr.lat && addr.lng) {
      setMapCenter({ lat: addr.lat, lng: addr.lng })
    }
    setShowModal(true)
  }

  // Use current location via browser Geolocation API
  const useCurrentLocation = () => {
    console.log('[AddressManager] useCurrentLocation triggered');
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    
    setLocating(true);
    console.log('[AddressManager] Requesting position...');
    
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        console.log(`[AddressManager] Position received: ${latitude}, ${longitude}`);
        setMapCenter({ lat: latitude, lng: longitude });
        setGeocoding(true);
        const address = await reverseGeocode(latitude, longitude);
        setFormData(prev => ({ ...prev, address }));
        setGeocoding(false);
        setLocating(false);
      },
      (err) => {
        console.error('[AddressManager] Geolocation error:', err);
        let msg = 'Unable to get your location. Please allow location access.';
        if (err.code === 1) msg = 'Location access denied. Please enable it in browser settings.';
        if (err.code === 3) msg = 'Location request timed out.';
        alert(msg);
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }

  // Choose location on the embedded map manually — reverse geocode from center
  const pickFromMap = async () => {
    setGeocoding(true)
    const address = await reverseGeocode(mapCenter.lat, mapCenter.lng)
    setFormData(prev => ({ ...prev, address }))
    setGeocoding(false)
  }

  const handleSave = () => {
    if (!formData.address.trim()) {
      alert('Please provide an address.')
      return
    }
    const labelName = LABEL_OPTIONS.find(l => l.id === formData.label)?.label || 'Other'

    if (editingId) {
      setAddresses(prev => prev.map(a => a.id === editingId ? {
        ...a, label: labelName, address: formData.address, unit: formData.unit,
        postalCode: formData.postalCode, notes: formData.notes,
        lat: mapCenter.lat, lng: mapCenter.lng
      } : a))
    } else {
      setAddresses(prev => [...prev, {
        id: Date.now(), label: labelName, address: formData.address,
        unit: formData.unit, postalCode: formData.postalCode, notes: formData.notes,
        lat: mapCenter.lat, lng: mapCenter.lng, isDefault: prev.length === 0
      }])
    }
    setShowModal(false)
  }

  const deleteAddress = (id) => setAddresses(prev => prev.filter(a => a.id !== id))
  const setDefault = (id) => setAddresses(prev => prev.map(a => ({ ...a, isDefault: a.id === id })))

  const inputStyle = {
    width: '100%', padding: '14px 16px', borderRadius: '14px',
    border: '2px solid var(--border)', background: 'var(--cream)',
    fontSize: '15px', fontWeight: 600, outline: 'none', fontFamily: 'inherit'
  }

  // Build the OSM iframe URL centered on mapCenter
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${mapCenter.lng - 0.005},${mapCenter.lat - 0.003},${mapCenter.lng + 0.005},${mapCenter.lat + 0.003}&layer=mapnik&marker=${mapCenter.lat},${mapCenter.lng}`

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-dark)' }}>Saved Addresses</h2>
        <button onClick={openAdd} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--green-dark)', color: 'white', border: 'none', padding: '12px 20px', borderRadius: '14px', fontWeight: 800, fontSize: '14px', cursor: 'pointer' }}>
          <Plus size={18} /> Add New
        </button>
      </div>

      {/* Address List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {addresses.map(addr => (
          <div key={addr.id} style={{
            background: 'white', borderRadius: '20px', padding: '24px',
            border: addr.isDefault ? '2px solid var(--gold)' : '1px solid var(--border)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '200px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', flexWrap: 'wrap' }}>
                  <MapPin size={18} color="var(--green-mid)" />
                  <span style={{ fontWeight: 800, fontSize: '16px', color: 'var(--text-dark)' }}>{addr.label}</span>
                  {addr.isDefault && <span style={{ background: 'var(--gold-tint)', color: 'var(--gold)', padding: '4px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: 800 }}>Default</span>}
                </div>
                <p style={{ color: 'var(--text-mid)', fontSize: '14px', lineHeight: 1.6, marginLeft: '28px' }}>{addr.address}</p>
                {addr.unit && <p style={{ color: 'var(--text-light)', fontSize: '13px', marginLeft: '28px', marginTop: '4px' }}>Unit: {addr.unit}</p>}
              </div>
              <div style={{ display: 'flex', gap: '8px', flexShrink: 0, alignItems: 'center' }}>
                {!addr.isDefault && (
                  <button onClick={() => setDefault(addr.id)} style={{ background: 'var(--gold-tint)', border: 'none', borderRadius: '10px', padding: '8px 12px', fontSize: '12px', fontWeight: 700, color: 'var(--gold)', cursor: 'pointer' }}>
                    Set Default
                  </button>
                )}
                <button onClick={() => openEdit(addr)} style={{ background: 'var(--cream)', border: 'none', borderRadius: '10px', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <Edit3 size={16} color="var(--text-mid)" />
                </button>
                <button onClick={() => deleteAddress(addr.id)} style={{ background: '#fef2f2', border: 'none', borderRadius: '10px', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <Trash2 size={16} color="#dc2626" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {addresses.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px', background: 'white', borderRadius: '24px', border: '1px solid var(--border)' }}>
            <MapPin size={40} color="var(--text-light)" style={{ marginBottom: '16px' }} />
            <h3 style={{ fontWeight: 800, color: 'var(--text-dark)', marginBottom: '8px' }}>No saved addresses</h3>
            <p style={{ color: 'var(--text-light)', fontSize: '14px' }}>Add your first delivery address to get started.</p>
          </div>
        )}
      </div>

      {/* MODAL */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', backdropFilter: 'blur(6px)' }}>
          <div style={{ background: 'white', borderRadius: '32px', width: '100%', maxWidth: '600px', maxHeight: '90vh', overflow: 'auto', boxShadow: '0 40px 80px rgba(0,0,0,0.3)' }}>
            
            {/* Modal Header */}
            <div style={{ padding: '24px 28px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, background: 'white', zIndex: 10, borderRadius: '32px 32px 0 0' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 900, color: 'var(--green-dark)' }}>
                {editingId ? 'Edit Address' : 'Add New Address'}
              </h3>
              <button onClick={() => setShowModal(false)} style={{ background: 'var(--cream)', border: 'none', borderRadius: '12px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ padding: '24px 28px' }}>
              
              {/* NEW SEARCH BAR */}
              <div style={{ position: 'relative', marginBottom: '16px' }}>
                <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                <input 
                  type="text"
                  placeholder="Search street name or postal code (e.g. 440055)"
                  style={{ ...inputStyle, paddingLeft: '48px', border: '2px solid var(--gold)' }}
                  onKeyDown={async (e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const query = e.target.value;
                      if (!query) return;
                      setGeocoding(true);
                      try {
                        const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=sg&limit=1`, {
                          headers: { 'User-Agent': 'STM-Salam-Digital-Platform' }
                        });
                        const data = await res.json();
                        if (data && data[0]) {
                          const { lat, lon, display_name } = data[0];
                          const nLat = parseFloat(lat);
                          const nLon = parseFloat(lon);
                          setMapCenter({ lat: nLat, lng: nLon });
                          setFormData(prev => ({ ...prev, address: display_name }));
                          console.log('[AddressManager] Search result found:', display_name);
                        } else {
                          alert('Address not found. Please try a different search term.');
                        }
                      } catch (err) {
                        console.error('[AddressManager] Search error:', err);
                      }
                      setGeocoding(false);
                    }
                  }}
                />
                <div style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '10px', fontWeight: 800, color: 'var(--gold)', background: 'var(--gold-tint)', padding: '4px 8px', borderRadius: '6px' }}>
                  PRESS ENTER
                </div>
              </div>

              {/* MAP EMBED (OpenStreetMap iframe — no library needed) */}
              <div style={{ borderRadius: '20px', overflow: 'hidden', marginBottom: '16px', border: '2px solid var(--border)', height: '180px', position: 'relative' }}>
                <iframe
                  title="Location Map"
                  src={mapUrl}
                  style={{ width: '100%', height: '100%', border: 'none' }}
                />
                {/* Center pin overlay */}
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -100%)', pointerEvents: 'none', fontSize: '32px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}>
                  📍
                </div>
              </div>

              {/* Location Buttons */}
              <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
                <button onClick={useCurrentLocation} disabled={locating} style={{
                  flex: 1, minWidth: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  background: 'var(--green-dark)', color: 'white', border: 'none', borderRadius: '14px',
                  padding: '14px', fontWeight: 800, fontSize: '14px', cursor: locating ? 'wait' : 'pointer', opacity: locating ? 0.7 : 1
                }}>
                  {locating ? <Loader size={18} style={{ animation: 'spin 1s linear infinite' }} /> : <Navigation size={18} />}
                  {locating ? 'Locating...' : '📍 Use My Location'}
                </button>
                <button onClick={pickFromMap} disabled={geocoding} style={{
                  flex: 1, minWidth: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  background: 'white', color: 'var(--green-dark)', border: '2px solid var(--green-dark)', borderRadius: '14px',
                  padding: '14px', fontWeight: 800, fontSize: '14px', cursor: 'pointer'
                }}>
                  <MapPinned size={18} /> Pick From Map
                </button>
              </div>

              {geocoding && (
                <div style={{ background: 'var(--gold-tint)', color: 'var(--gold)', padding: '10px 16px', borderRadius: '12px', marginBottom: '16px', fontSize: '13px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Loader size={14} style={{ animation: 'spin 1s linear infinite' }} /> Finding address...
                </div>
              )}

              {/* Label Selector */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontWeight: 700, fontSize: '13px', color: 'var(--text-light)', marginBottom: '8px', display: 'block', textTransform: 'uppercase', letterSpacing: '1px' }}>Label</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {LABEL_OPTIONS.map(opt => (
                    <button key={opt.id} onClick={() => setFormData(prev => ({ ...prev, label: opt.id }))} style={{
                      flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                      padding: '12px', borderRadius: '12px',
                      border: formData.label === opt.id ? '2px solid var(--green-dark)' : '2px solid var(--border)',
                      background: formData.label === opt.id ? '#e8f5e9' : 'white',
                      fontWeight: 700, fontSize: '13px', cursor: 'pointer',
                      color: formData.label === opt.id ? 'var(--green-dark)' : 'var(--text-mid)'
                    }}>
                      {opt.icon} {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Address Fields */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
                <div>
                  <label style={{ fontWeight: 700, fontSize: '13px', color: 'var(--text-light)', marginBottom: '6px', display: 'block', textTransform: 'uppercase', letterSpacing: '1px' }}>Street Address</label>
                  <textarea
                    value={formData.address}
                    onChange={e => setFormData(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="e.g. Blk 55 Marine Terrace, Singapore 440055"
                    rows={2}
                    style={{ ...inputStyle, resize: 'vertical', minHeight: '60px' }}
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontWeight: 700, fontSize: '13px', color: 'var(--text-light)', marginBottom: '6px', display: 'block', textTransform: 'uppercase', letterSpacing: '1px' }}>Unit / Floor</label>
                    <input
                      value={formData.unit}
                      onChange={e => setFormData(prev => ({ ...prev, unit: e.target.value }))}
                      placeholder="#01-303"
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={{ fontWeight: 700, fontSize: '13px', color: 'var(--text-light)', marginBottom: '6px', display: 'block', textTransform: 'uppercase', letterSpacing: '1px' }}>Postal Code</label>
                    <input
                      value={formData.postalCode}
                      onChange={e => setFormData(prev => ({ ...prev, postalCode: e.target.value }))}
                      placeholder="440055"
                      maxLength={6}
                      style={inputStyle}
                    />
                  </div>
                </div>
                <div>
                  <label style={{ fontWeight: 700, fontSize: '13px', color: 'var(--text-light)', marginBottom: '6px', display: 'block', textTransform: 'uppercase', letterSpacing: '1px' }}>Delivery Notes (Optional)</label>
                  <input
                    value={formData.notes}
                    onChange={e => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="Ring doorbell, leave at door..."
                    style={inputStyle}
                  />
                </div>
              </div>

              {/* Save Button */}
              <button onClick={handleSave} style={{
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                background: 'var(--gold)', color: 'var(--green-dark)', border: 'none', borderRadius: '16px',
                padding: '16px', fontWeight: 900, fontSize: '16px', cursor: 'pointer', boxShadow: 'var(--shadow-gold)',
                marginTop: '8px'
              }}>
                <Check size={20} /> {editingId ? 'Update Address' : 'Save Address'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Spinner animation */}
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}
