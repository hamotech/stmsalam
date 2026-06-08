import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { 
  QrCode, ArrowLeft, Upload, MessageSquare, CircleCheck, 
  RefreshCw, Paperclip, Download, ShieldCheck 
} from 'lucide-react'
import { db, storage } from '../lib/firebase'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'
import { shopInfo } from '../data/menuData'
import { assertNoDirectOrderLifecycleWrite } from '../lib/orderLifecycleGuards'

export default function ShopScan() {
  const { orderId } = useParams()
  const navigate = useNavigate()

  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [screenshotUrl, setScreenshotUrl] = useState('')
  const [isEnlarged, setIsEnlarged] = useState(false)
  const [showScannerModal, setShowScannerModal] = useState(false)

  useEffect(() => {
    async function loadOrder() {
      if (!orderId) return
      try {
        const orderSnap = await getDoc(doc(db, 'orders', orderId))
        if (orderSnap.exists()) {
          const data = orderSnap.data()
          setOrder(data)
          if (data.payment_screenshot) {
            setScreenshotUrl(data.payment_screenshot)
          }
        } else {
          console.error('Order not found in Firestore:', orderId)
        }
      } catch (err) {
        console.error('Failed to load order:', err)
      } finally {
        setLoading(false)
      }
    }
    loadOrder()
  }, [orderId])

  const handleScreenshotUpload = async (e) => {
    const file = e.target.files[0]
    if (!file || !orderId) return
    setUploading(true)
    try {
      // Compress the image using HTML Canvas
      const compressedDataURL = await new Promise((resolve) => {
        const reader = new FileReader()
        reader.onload = (re) => {
          const img = new Image()
          img.onload = () => {
            const canvas = document.createElement('canvas')
            const MAX_WIDTH = 1000
            let width = img.width
            let height = img.height
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width
              width = MAX_WIDTH
            }
            canvas.width = width
            canvas.height = height
            canvas.getContext('2d').drawImage(img, 0, 0, width, height)
            resolve(canvas.toDataURL('image/webp', 0.8))
          }
          img.src = re.target.result
        }
        reader.readAsDataURL(file)
      })

      const blob = await (await fetch(compressedDataURL)).blob()
      const fileRef = storageRef(storage, `proofs/${orderId}_${Date.now()}.webp`)
      await uploadBytes(fileRef, blob, { contentType: 'image/webp' })
      const url = await getDownloadURL(fileRef)

      // Assert safety guards and update the Firestore order
      const patch = { payment_screenshot: url }
      assertNoDirectOrderLifecycleWrite(patch, 'ShopScan.paymentScreenshot')
      await updateDoc(doc(db, 'orders', orderId), patch)

      setScreenshotUrl(url)
      alert('Payment screenshot uploaded successfully!')
    } catch (err) {
      console.error('Upload Error:', err)
      alert('Failed to upload screenshot. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  const handleWhatsAppConfirm = () => {
    if (!orderId || !order) return
    const itemsList = (order.items || []).map(item => `* ${item.name} x${item.qty}`).join('\n')
    const addressLine = order.address ? `\nAddress: ${order.address}` : '\nOption: Store Pickup'
    const screenshotLine = screenshotUrl ? `\n\nPayment screenshot uploaded. Please check order record.` : ''

    const message = `*New STM Order*\n` +
      `Order ID: ${orderId}\n` +
      `Customer: ${order.customerName || 'Customer'}\n` +
      `Phone: ${order.customerPhone || ''}\n\n` +
      `*Items:*\n${itemsList}\n\n` +
      `*Total: SGD ${(order.totalAmount || 0).toFixed(2)}*` +
      `${addressLine}` +
      screenshotLine

    const waUrl = `https://wa.me/${(shopInfo?.whatsapp || '6591915766').replace(/\D/g, '')}?text=${encodeURIComponent(message)}`
    window.open(waUrl, '_blank')
  }

  const handleComplete = () => {
    navigate(`/success?orderId=${encodeURIComponent(orderId)}`, { replace: true })
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#f8fafc', flexDirection: 'column', gap: '20px' }}>
        <div style={{ width: '40px', height: '40px', border: '4px solid #e2e8f0', borderTopColor: 'var(--green-dark)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <p style={{ fontWeight: 800, color: '#64748b' }}>Loading checkout scanner...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', padding: '40px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ maxWidth: '480px', width: '100%', background: 'white', borderRadius: '32px', border: '1px solid #e2e8f0', padding: '36px', boxShadow: '0 20px 50px rgba(0,0,0,0.03)', boxSizing: 'border-box' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <button onClick={() => navigate('/checkout')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', display: 'flex', alignItems: 'center' }}>
            <ArrowLeft size={20} />
          </button>
          <h1 style={{ fontSize: '24px', fontWeight: 950, color: 'var(--green-dark)', margin: 0 }}>Shop Scan & Pay</h1>
        </div>

        {/* Order Reference */}
        <div style={{ background: '#f8fafc', borderRadius: '16px', padding: '16px', marginBottom: '24px', border: '1px solid #eef2f6' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 700 }}>ORDER REFERENCE</span>
            <span style={{ fontSize: '13px', color: 'var(--green-dark)', fontWeight: 900 }}>{orderId?.slice(-8).toUpperCase()}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 950 }}>
            <span>Total Payable</span>
            <span style={{ color: 'var(--green-dark)' }}>SGD ${(order?.totalAmount || 0).toFixed(2)}</span>
          </div>
        </div>

        {/* Scan & Pay Instructions */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 900, color: 'var(--green-dark)', margin: '0 0 4px' }}>Instant Payment</h2>
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#475569', margin: '0 0 16px' }}>Scan & Pay Instantly</h3>
          <p style={{ color: '#64748b', fontSize: '14px', lineHeight: 1.5, margin: '0 0 16px' }}>
            Scan the official SGQR image below using your banking app.
          </p>

          <div 
            onClick={() => setIsEnlarged(true)}
            style={{ 
              width: '100%', height: '360px', borderRadius: '16px', overflow: 'hidden', 
              border: '1px solid #cbd5e1', background: '#f8fafc', marginBottom: '16px',
              cursor: 'zoom-in', position: 'relative'
            }}
          >
            <img src="/paymentscanner.jpeg" alt="PayNow SGQR" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            <div style={{ position: 'absolute', bottom: '12px', right: '12px', background: 'rgba(0,0,0,0.6)', color: 'white', padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 700 }}>
              Tap to Enlarge
            </div>
          </div>

          <a href="/paymentscanner.jpeg" download style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--green-mid)', fontWeight: 800, fontSize: '13px', textDecoration: 'none' }}>
            <Download size={14} /> Download official SGQR Image
          </a>
        </div>

        {/* Receipt Screenshot Upload */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ 
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', 
            padding: '16px', background: screenshotUrl ? '#f0fdf4' : '#f8fafc', 
            border: screenshotUrl ? '2px solid #16a34a' : '2px dashed #cbd5e1',
            borderRadius: '16px', cursor: 'pointer', transition: '0.2s', boxSizing: 'border-box'
          }}>
            {uploading ? <RefreshCw className="animate-spin" size={18} style={{ animation: 'spin 1s linear infinite' }} /> : 
             screenshotUrl ? <CircleCheck size={20} color="#16a34a" /> : <Upload size={20} color="#64748b" />}
            <span style={{ fontWeight: 800, fontSize: '14px', color: screenshotUrl ? '#166534' : '#64748b' }}>
              {uploading ? 'Processing Receipt...' : screenshotUrl ? 'Payment Screenshot Attached' : 'Attach Receipt Screenshot'}
            </span>
            <input type="file" accept="image/*" onChange={handleScreenshotUpload} style={{ display: 'none' }} disabled={uploading} />
          </label>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button 
            onClick={() => setShowScannerModal(true)}
            style={{ width: '100%', padding: '14px', background: 'white', color: 'var(--green-dark)', border: '2px solid var(--green-dark)', borderRadius: '16px', fontWeight: 900, fontSize: '15px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
          >
            <QrCode size={18} /> Open Scanner
          </button>

          <button 
            onClick={handleWhatsAppConfirm} 
            style={{ width: '100%', padding: '16px', background: 'var(--green-mid)', color: 'white', border: 'none', borderRadius: '16px', fontWeight: 900, fontSize: '15px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
          >
            <MessageSquare size={18} /> Share Receipt on WhatsApp
          </button>

          <button 
            onClick={() => navigate('/menu')} 
            style={{ width: '100%', padding: '14px', background: 'white', color: '#475569', border: '1px solid #cbd5e1', borderRadius: '16px', fontWeight: 800, fontSize: '15px', cursor: 'pointer' }}
          >
            Browse Menu
          </button>
          
          <button 
            onClick={handleComplete} 
            style={{ width: '100%', padding: '18px', background: 'var(--green-dark)', color: 'white', border: 'none', borderRadius: '16px', fontWeight: 900, fontSize: '16px', cursor: 'pointer', boxShadow: '0 8px 16px rgba(1,50,32,0.1)' }}
          >
            I Have Completed Payment
          </button>
        </div>

        <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', color: '#94a3b8' }}>
          <ShieldCheck size={14} />
          <span style={{ fontSize: '12px', fontWeight: 700 }}>Verified merchant checkout</span>
        </div>

        {/* WhatsApp Support Section */}
        <div style={{ marginTop: '20px', padding: '16px', background: 'var(--cream)', borderRadius: '16px', border: '1px solid var(--gold-tint)', textAlign: 'center' }}>
          <p style={{ margin: '0 0 10px', fontSize: '13px', fontWeight: 700, color: 'var(--green-dark)' }}>Need manual confirmation or help?</p>
          <a 
            href={`https://wa.me/${(shopInfo?.whatsapp || '6591915766').replace(/\D/g, '')}?text=Hi%20STM%20Salam,%20I%20need%20help%20confirming%20my%20payment%20for%20order%20${encodeURIComponent(orderId)}`}
            target="_blank"
            rel="noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--green-mid)', fontWeight: 800, fontSize: '13px', textDecoration: 'none' }}
          >
            <MessageSquare size={14} /> Contact Admin via WhatsApp
          </a>
        </div>

        {/* Modal overlays */}
        {isEnlarged && (
          <div 
            onClick={() => setIsEnlarged(false)}
            style={{
              position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 20000,
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'zoom-out'
            }}
          >
            <img 
              src="/paymentscanner.jpeg" 
              alt="SGQR Enlarged" 
              style={{ maxWidth: '90%', maxHeight: '90%', objectFit: 'contain', borderRadius: '16px', border: '4px solid white' }} 
            />
            <div style={{ position: 'absolute', top: '20px', right: '20px', color: 'white', fontWeight: 'bold', fontSize: '18px' }}>✕ Close</div>
          </div>
        )}

        {showScannerModal && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 19000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
            <div style={{ background: 'white', borderRadius: '24px', padding: '32px', maxWidth: '400px', width: '100%', textAlign: 'center', boxShadow: '0 20px 50px rgba(0,0,0,0.15)' }}>
              <div style={{ width: '60px', height: '60px', background: 'var(--green-tint)', color: 'var(--green-dark)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <QrCode size={30} />
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 900, marginBottom: '12px' }}>Grab-style Mock Scanner</h3>
              <p style={{ color: '#64748b', fontSize: '14px', lineHeight: '1.6', marginBottom: '24px' }}>
                In a production mobile app environment, this launches the native camera scanner. For this web flow, please scan the SGQR code using your bank app, upload your receipt below, or contact support.
              </p>
              <button 
                onClick={() => setShowScannerModal(false)}
                style={{ width: '100%', padding: '14px', background: 'var(--green-dark)', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 800, cursor: 'pointer' }}
              >
                Understood
              </button>
            </div>
          </div>
        )}

      </div>
      <style>{`
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}
