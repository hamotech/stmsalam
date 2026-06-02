import React, { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { Map, MapPin, Truck, RefreshCw } from 'lucide-react';

export default function LiveFleet() {
  const [fleet, setFleet] = useState([]);
  const [error, setError] = useState('');
  const [selectedDriver, setSelectedDriver] = useState(null);
  
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''
  });

  const fetchFleet = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/admin/fleet', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        }
      });
      const data = await res.json();
      if (res.ok) {
        setFleet(data.fleet || []);
      } else {
        setError(data.error || 'Failed to fetch fleet data');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchFleet();
    const interval = setInterval(fetchFleet, 5000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    if (status === 'online') return '#22c55e'; // Green
    if (status === 'busy') return '#ef4444'; // Red
    return '#94a3b8'; // Offline/Gray
  };

  const getMarkerIcon = (status) => {
    if (status === 'online') return 'https://maps.google.com/mapfiles/ms/icons/green-dot.png';
    if (status === 'busy') return 'https://maps.google.com/mapfiles/ms/icons/red-dot.png';
    return 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png';
  };

  const defaultCenter = { lat: 1.3521, lng: 103.8198 }; // Singapore center

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 900, color: 'var(--green-dark)', margin: 0, display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Map size={32} />
            Live Fleet Tracking
          </h1>
          <p style={{ color: '#64748b', margin: '4px 0 0 0', fontWeight: 600 }}>Monitor all drivers in real-time</p>
        </div>
        <button onClick={fetchFleet} style={{ padding: '10px 16px', borderRadius: '12px', border: '1px solid #cbd5e1', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700 }}>
          <RefreshCw size={16} /> Refresh
        </button>
      </div>

      {error && (
        <div style={{ padding: '16px', background: '#fef2f2', color: '#b91c1c', borderRadius: '12px', border: '1px solid #fecaca', marginBottom: '24px', fontWeight: 700 }}>
          {error}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '24px', alignItems: 'start' }}>
        <div style={{ height: '600px', background: 'white', borderRadius: '24px', overflow: 'hidden', border: '1px solid var(--border)', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={{ width: '100%', height: '100%' }}
              center={fleet.length > 0 ? { lat: fleet[0].location.latitude, lng: fleet[0].location.longitude } : defaultCenter}
              zoom={12}
              options={{ disableDefaultUI: true, zoomControl: true }}
            >
              {fleet.map((driver) => {
                const lat = driver.location?.latitude;
                const lng = driver.location?.longitude;
                if (!lat || !lng) return null;
                
                return (
                  <Marker
                    key={driver.driverId}
                    position={{ lat, lng }}
                    icon={{ url: getMarkerIcon(driver.profile?.status) }}
                    onClick={() => setSelectedDriver(driver)}
                  />
                )
              })}

              {selectedDriver && (
                <InfoWindow
                  position={{ lat: selectedDriver.location.latitude, lng: selectedDriver.location.longitude }}
                  onCloseClick={() => setSelectedDriver(null)}
                >
                  <div style={{ padding: '4px', minWidth: '150px' }}>
                    <div style={{ fontWeight: 900, fontSize: '15px', color: '#0f172a' }}>{selectedDriver.user?.name || selectedDriver.driverId}</div>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: getStatusColor(selectedDriver.profile?.status), textTransform: 'uppercase', marginTop: '4px' }}>
                      {selectedDriver.profile?.status || 'Unknown'}
                    </div>
                    <div style={{ fontSize: '12px', color: '#64748b', marginTop: '6px' }}>
                      Last Updated: {new Date(selectedDriver.location.updatedAt).toLocaleTimeString()}
                    </div>
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontWeight: 700 }}>
              Loading Google Maps...
            </div>
          )}
        </div>

        <div style={{ background: 'white', borderRadius: '24px', padding: '24px', border: '1px solid var(--border)', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 900, margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Truck size={20} color="var(--gold)" />
            Active Fleet
          </h2>
          <div style={{ display: 'grid', gap: '12px' }}>
            {fleet.length === 0 ? (
              <div style={{ color: '#94a3b8', fontSize: '14px', fontWeight: 600 }}>No drivers currently active.</div>
            ) : fleet.map((driver) => (
              <div key={driver.driverId} style={{ padding: '12px', borderRadius: '12px', border: '1px solid #f1f5f9', background: '#f8fafc', cursor: 'pointer' }} onClick={() => setSelectedDriver(driver)}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontWeight: 800, fontSize: '14px', color: '#0f172a' }}>{driver.user?.name || driver.driverId}</div>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: getStatusColor(driver.profile?.status) }} />
                </div>
                <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 600, marginTop: '4px' }}>
                  {driver.profile?.status === 'busy' ? 'On Delivery' : driver.profile?.status === 'online' ? 'Available' : 'Offline'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
