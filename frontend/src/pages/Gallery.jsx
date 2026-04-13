import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, X, ZoomIn, Maximize2, Image as ImageIcon, Film } from 'lucide-react'
import { galleryMedia } from '../data/galleryData'

export default function Gallery() {
  const [selectedMedia, setSelectedMedia] = useState(null)
  const [filter, setFilter] = useState('all')

  const mediaItems = galleryMedia.map(file => {
    const isVideo = file.toLowerCase().endsWith('.mp4') || file.toLowerCase().endsWith('.mov')
    return {
      url: `/aboutusimage/${file}`,
      type: isVideo ? 'video' : 'image',
      name: file
    }
  })

  const filteredMedia = filter === 'all' 
    ? mediaItems 
    : mediaItems.filter(m => m.type === filter)

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', padding: '100px 0', paddingBottom: '160px' }}>
      
      {/* ── SECTION HEADER ── */}
      <div className="container" style={{ textAlign: 'center', marginBottom: '60px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--green-tint)', color: 'var(--green-dark)', padding: '8px 20px', borderRadius: '100px', fontSize: '14px', fontWeight: 800, marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            <ImageIcon size={16} /> Visual Journey
          </div>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 950, color: 'var(--green-dark)', marginBottom: '16px', letterSpacing: '-1.5px' }}>
            Our Gallery
          </h1>
          <p style={{ fontSize: '19px', color: 'var(--text-light)', maxWidth: '600px', margin: '0 auto', fontWeight: 500, lineHeight: 1.6 }}>
            Explore moments, memories, and highlights from STM Salam.
          </p>
        </motion.div>

        {/* ── FILTER TABS ── */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '40px' }}
        >
          {['all', 'image', 'video'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '12px 24px',
                borderRadius: '16px',
                border: 'none',
                background: filter === f ? 'var(--green-dark)' : 'white',
                color: filter === f ? 'white' : 'var(--text-light)',
                fontWeight: 700,
                fontSize: '15px',
                cursor: 'pointer',
                boxShadow: filter === f ? '0 10px 20px rgba(1,50,32,0.15)' : '0 4px 10px rgba(0,0,0,0.03)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                textTransform: 'capitalize'
              }}
            >
              {f === 'all' ? 'All Media' : f === 'video' ? 'Videos' : 'Photos'}
            </button>
          ))}
        </motion.div>
      </div>

      {/* ── GALLERY GRID ── */}
      <div className="container">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
          gap: '24px',
        }}>
          <AnimatePresence mode="popLayout">
            {filteredMedia.map((item, i) => (
              <motion.div
                layout
                key={item.url}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{ y: -8 }}
                onClick={() => setSelectedMedia(item)}
                style={{ 
                  position: 'relative', 
                  borderRadius: '24px', 
                  overflow: 'hidden', 
                  aspectRatio: '1/1',
                  background: 'white',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                  cursor: 'pointer',
                  border: '1px solid #eef2f6'
                }}
              >
                {item.type === 'video' ? (
                  <div style={{ width: '100%', height: '100%', background: '#000' }}>
                    <video 
                      src={item.url} 
                      muted
                      loop
                      style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
                      onMouseOver={e => e.target.play()}
                      onMouseOut={e => { e.target.pause(); e.target.currentTime = 0; }}
                    />
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.2)', pointerEvents: 'none' }}>
                      <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', border: '1px solid rgba(255,255,255,0.3)' }}>
                        <Play size={28} fill="currentColor" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <img 
                    src={item.url} 
                    alt={item.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                    onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                  />
                )}

                {/* ── HOVER OVERLAY ── */}
                <div style={{ 
                  position: 'absolute', 
                  inset: 0, 
                  background: 'linear-gradient(to top, rgba(1,50,32,0.8), transparent 70%)', 
                  opacity: 0, 
                  transition: 'opacity 0.3s ease',
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: '24px'
                }}
                className="hover-overlay"
                onMouseOver={e => e.currentTarget.style.opacity = '1'}
                onMouseOut={e => e.currentTarget.style.opacity = '0'}
                >
                  <div style={{ color: 'white' }}>
                    <div style={{ opacity: 0.8, fontSize: '13px', fontWeight: 700, marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {item.type === 'video' ? <Film size={14} /> : <ImageIcon size={14} />} {item.type}
                    </div>
                    <div style={{ fontSize: '16px', fontWeight: 800 }}>STM Memories</div>
                  </div>
                  <div style={{ marginLeft: 'auto', color: 'white', opacity: 0.8 }}>
                    <Maximize2 size={20} />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* ── LIGHTBOX MODAL ── */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ 
              position: 'fixed', 
              inset: 0, 
              background: 'rgba(0,0,0,0.95)', 
              backdropFilter: 'blur(20px)',
              zIndex: 10000, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              padding: '40px' 
            }}
            onClick={() => setSelectedMedia(null)}
          >
            <motion.button
              whileHover={{ rotate: 90 }}
              style={{ position: 'absolute', top: '30px', right: '30px', background: 'white', border: 'none', borderRadius: '50%', width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 101 }}
            >
              <X size={24} color="black" />
            </motion.button>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              style={{ maxWidth: '100%', maxHeight: '100%', position: 'relative', borderRadius: '32px', overflow: 'hidden', boxShadow: '0 40px 100px rgba(0,0,0,0.5)' }}
            >
              {selectedMedia.type === 'video' ? (
                <video 
                  src={selectedMedia.url} 
                  controls 
                  autoPlay 
                  style={{ maxWidth: '100%', maxHeight: '85vh', display: 'block' }} 
                />
              ) : (
                <img 
                  src={selectedMedia.url} 
                  alt={selectedMedia.name} 
                  style={{ maxWidth: '100%', maxHeight: '85vh', display: 'block', objectFit: 'contain' }} 
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        .hover-overlay:hover {
          opacity: 1 !important;
        }
        @media (max-width: 640px) {
          .container { padding-left: 20px; padding-right: 20px; }
        }
      `}} />
    </div>
  )
}
