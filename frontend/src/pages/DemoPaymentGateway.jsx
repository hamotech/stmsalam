import React, { useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  CreditCard, Lock, ShieldCheck, Loader2, CircleCheck, XCircle, ArrowLeft,
} from 'lucide-react'

/**
 * DemoPaymentGateway
 *
 * A self-contained, fake payment portal used instead of a real Stripe /
 * PayPal checkout URL. It accepts the same query parameters you would
 * normally pass to a hosted checkout:
 *
 *   /pay?method=stripe&amount=12.50&currency=SGD&invoice=STM-123
 *        &success_url=https://.../sandbox/success?orderId=STM-123
 *        &cancel_url=https://.../sandbox/cancel?orderId=STM-123
 *        &return_url=https://.../tracking/STM-123
 *
 * Everything is client-side: no card data is sent anywhere. When the
 * "Pay" button is clicked we simulate a 2s processing delay and then
 * redirect to `success_url` (or `return_url` as a fallback).
 *
 * Replace this module with a real gateway integration when client
 * credentials are provided — the public contract stays the same.
 */
export default function DemoPaymentGateway() {
  const navigate = useNavigate()
  const [params] = useSearchParams()

  const method = (params.get('method') || 'card').toLowerCase()
  const amount = parseFloat(params.get('amount') || '0') || 0
  const currency = (params.get('currency') || 'SGD').toUpperCase()
  const invoice = params.get('invoice') || ''
  const successUrl = params.get('success_url') || params.get('return_url') || '/'
  const cancelUrl = params.get('cancel_url') || '/'

  const [cardName, setCardName] = useState('')
  const [cardNumber, setCardNumber] = useState('4242 4242 4242 4242')
  const [expiry, setExpiry] = useState('12/30')
  const [cvc, setCvc] = useState('123')
  const [stage, setStage] = useState('form') // form | processing | done | failed
  const [error, setError] = useState('')

  const brandColors = useMemo(() => {
    if (method === 'paypal') return { top: '#003087', accent: '#FFC439', name: 'PayPal' }
    if (method === 'stripe') return { top: '#635BFF', accent: '#0A2540', name: 'Stripe' }
    return { top: '#0f172a', accent: '#0ea5e9', name: 'Secure Checkout' }
  }, [method])

  const formatCardNumber = (value) => {
    return value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
  }

  const formatExpiry = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 4)
    if (digits.length <= 2) return digits
    return `${digits.slice(0, 2)}/${digits.slice(2)}`
  }

  const redirectTo = (url) => {
    if (!url) return
    if (url.startsWith('http://') || url.startsWith('https://')) {
      window.location.href = url
    } else {
      navigate(url, { replace: true })
    }
  }

  const validate = () => {
    if (method === 'paypal') return true
    const digitsOnly = cardNumber.replace(/\D/g, '')
    if (digitsOnly.length < 13) return 'Please enter a valid card number.'
    if (!/^\d{2}\/\d{2}$/.test(expiry)) return 'Expiry must be MM/YY.'
    const [mm, yy] = expiry.split('/').map(Number)
    if (mm < 1 || mm > 12) return 'Invalid expiry month.'
    const nowYear = new Date().getFullYear() % 100
    if (yy < nowYear) return 'Card has expired.'
    if (!/^\d{3,4}$/.test(cvc)) return 'CVC must be 3 or 4 digits.'
    if (!cardName.trim()) return 'Please enter the cardholder name.'
    return null
  }

  const handlePay = (e) => {
    e?.preventDefault?.()
    const problem = validate()
    if (problem) {
      setError(problem)
      return
    }
    setError('')
    setStage('processing')
    setTimeout(() => {
      setStage('done')
      setTimeout(() => redirectTo(successUrl), 900)
    }, 1800)
  }

  const handleCancel = () => {
    setStage('failed')
    setTimeout(() => redirectTo(cancelUrl), 400)
  }

  const formattedAmount = amount.toFixed(2)

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px', fontFamily: "'Inter', system-ui, sans-serif",
    }}>
      <div style={{
        width: '100%', maxWidth: '440px',
        background: 'white', borderRadius: '24px', overflow: 'hidden',
        boxShadow: '0 30px 90px rgba(0,0,0,0.4)',
      }}>
        {/* Gateway header */}
        <div style={{
          background: brandColors.top, color: 'white',
          padding: '28px 28px 22px', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '38px', height: '38px', borderRadius: '10px',
              background: brandColors.accent, color: 'white',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <CreditCard size={20} />
            </div>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1px', opacity: 0.7, textTransform: 'uppercase' }}>
                {brandColors.name}
              </div>
              <div style={{ fontSize: '16px', fontWeight: 900 }}>Demo Sandbox</div>
            </div>
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.12)', fontSize: '10px', fontWeight: 900,
            letterSpacing: '1px', textTransform: 'uppercase',
            padding: '4px 10px', borderRadius: '999px',
          }}>TEST MODE</div>
        </div>

        {/* Amount / invoice */}
        <div style={{
          padding: '24px 28px 4px', borderBottom: '1px solid #f1f5f9',
        }}>
          <div style={{ color: '#64748b', fontSize: '12px', fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
            Pay STM Salam
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', margin: '6px 0 4px' }}>
            <span style={{ color: '#0f172a', fontWeight: 900, fontSize: '32px' }}>
              {currency} {formattedAmount}
            </span>
          </div>
          {invoice && (
            <div style={{ color: '#94a3b8', fontSize: '12px', fontWeight: 700, marginBottom: '16px' }}>
              Invoice: <span style={{ color: '#475569' }}>{invoice}</span>
            </div>
          )}
        </div>

        {/* Body */}
        <div style={{ padding: '22px 28px 28px' }}>
          {stage === 'form' && method === 'paypal' && (
            <div>
              <p style={{ color: '#475569', fontSize: '14px', lineHeight: 1.5, marginBottom: '20px' }}>
                Log in to your PayPal sandbox account to complete this payment.
                No real money will move.
              </p>
              <button
                onClick={handlePay}
                style={{
                  width: '100%', padding: '16px', borderRadius: '999px',
                  border: 'none', fontWeight: 900, fontSize: '16px',
                  background: brandColors.accent, color: brandColors.top,
                  cursor: 'pointer', boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                }}
              >
                Pay with PayPal
              </button>
            </div>
          )}

          {stage === 'form' && method !== 'paypal' && (
            <form onSubmit={handlePay} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <span style={{ fontSize: '12px', fontWeight: 800, color: '#475569', letterSpacing: '0.3px' }}>Cardholder name</span>
                <input
                  type="text" value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  placeholder="John Appleseed"
                  style={fieldStyle}
                />
              </label>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <span style={{ fontSize: '12px', fontWeight: 800, color: '#475569', letterSpacing: '0.3px' }}>Card number</span>
                <input
                  type="text" inputMode="numeric" value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                  placeholder="1234 1234 1234 1234"
                  style={fieldStyle}
                />
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: '#475569', letterSpacing: '0.3px' }}>Expiry</span>
                  <input
                    type="text" inputMode="numeric" value={expiry}
                    onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                    placeholder="MM/YY"
                    style={fieldStyle}
                  />
                </label>
                <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: '#475569', letterSpacing: '0.3px' }}>CVC</span>
                  <input
                    type="text" inputMode="numeric" value={cvc}
                    onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').slice(0, 4))}
                    placeholder="123"
                    style={fieldStyle}
                  />
                </label>
              </div>

              {error && (
                <div style={{
                  background: '#fef2f2', color: '#991b1b',
                  border: '1px solid #fecaca', borderRadius: '10px',
                  padding: '10px 12px', fontSize: '13px', fontWeight: 700,
                }}>
                  {error}
                </div>
              )}

              <div style={{
                background: '#f8fafc', border: '1px dashed #cbd5e1',
                padding: '12px 14px', borderRadius: '10px',
                color: '#475569', fontSize: '12px', lineHeight: 1.5,
              }}>
                <b>Test card pre-filled:</b> 4242 4242 4242 4242 · any future
                expiry · any 3-digit CVC. No real charge will occur.
              </div>

              <button
                type="submit"
                style={{
                  marginTop: '6px',
                  width: '100%', padding: '16px', borderRadius: '14px',
                  border: 'none', fontWeight: 900, fontSize: '16px',
                  background: brandColors.top, color: 'white',
                  cursor: 'pointer', boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                }}
              >
                <Lock size={16} /> Pay {currency} {formattedAmount}
              </button>
              <button
                type="button" onClick={handleCancel}
                style={{
                  background: 'transparent', border: 'none',
                  color: '#64748b', fontWeight: 700, fontSize: '13px',
                  cursor: 'pointer', display: 'inline-flex', alignItems: 'center',
                  gap: '6px', alignSelf: 'center', padding: '6px 8px',
                }}
              >
                <ArrowLeft size={14} /> Cancel and return to merchant
              </button>
            </form>
          )}

          {stage === 'processing' && (
            <div style={{ textAlign: 'center', padding: '40px 0 24px' }}>
              <Loader2 size={44} color={brandColors.top} style={{ animation: 'dpg-spin 1s linear infinite' }} />
              <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#0f172a', marginTop: '18px' }}>
                Authorising payment…
              </h3>
              <p style={{ color: '#64748b', fontSize: '13px', marginTop: '6px' }}>
                Do not refresh or close this window.
              </p>
            </div>
          )}

          {stage === 'done' && (
            <div style={{ textAlign: 'center', padding: '34px 0 10px' }}>
              <CircleCheck size={52} color="#16a34a" />
              <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#0f172a', marginTop: '14px' }}>
                Payment approved
              </h3>
              <p style={{ color: '#64748b', fontSize: '13px', marginTop: '6px' }}>
                Redirecting you back to the merchant…
              </p>
            </div>
          )}

          {stage === 'failed' && (
            <div style={{ textAlign: 'center', padding: '34px 0 10px' }}>
              <XCircle size={52} color="#ef4444" />
              <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#0f172a', marginTop: '14px' }}>
                Payment cancelled
              </h3>
              <p style={{ color: '#64748b', fontSize: '13px', marginTop: '6px' }}>
                Returning you to the merchant…
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          borderTop: '1px solid #f1f5f9',
          padding: '14px 28px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          color: '#64748b', fontSize: '11px', fontWeight: 700,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ShieldCheck size={14} color="#16a34a" /> 256-bit encrypted demo
          </div>
          <div>Powered by STM Demo Gateway</div>
        </div>
      </div>

      <style>{`
        @keyframes dpg-spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}

const fieldStyle = {
  width: '100%',
  padding: '13px 14px',
  borderRadius: '10px',
  border: '1.5px solid #cbd5e1',
  fontSize: '15px',
  fontWeight: 700,
  color: '#0f172a',
  outline: 'none',
  background: 'white',
  boxSizing: 'border-box',
}
