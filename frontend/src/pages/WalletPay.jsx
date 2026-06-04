import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { db } from '../lib/firebase'
import { doc, getDoc, updateDoc, increment } from 'firebase/firestore'
import { Wallet, Plus, ArrowLeft, AlertCircle, ShieldCheck, CheckCircle2 } from 'lucide-react'

export default function WalletPay() {
  const { orderId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()

  const [order, setOrder] = useState(null)
  const [balance, setBalance] = useState(0.00)
  const [loading, setLoading] = useState(true)
  const [paying, setPaying] = useState(false)
  
  // Top up states
  const [topUpAmount, setTopUpAmount] = useState('20')
  const [toppingUp, setToppingUp] = useState(false)
  const [topUpSuccess, setTopUpSuccess] = useState(false)

  useEffect(() => {
    async function loadOrderAndBalance() {
      if (!orderId || !user?.id) return
      try {
        // Fetch order details
        const orderSnap = await getDoc(doc(db, 'orders', orderId))
        if (orderSnap.exists()) {
          setOrder(orderSnap.data())
        }

        // Fetch user wallet balance
        const userSnap = await getDoc(doc(db, 'users', user.id))
        if (userSnap.exists()) {
          const userData = userSnap.data()
          setBalance(Number(userData.walletBalance) || 0.00)
        } else {
          setBalance(0.00)
        }
      } catch (err) {
        console.error('Error loading wallet pay details:', err)
      } finally {
        setLoading(false)
      }
    }
    loadOrderAndBalance()
  }, [orderId, user])

  const handleTopUp = async () => {
    const amountNum = parseFloat(topUpAmount)
    if (Number.isNaN(amountNum) || amountNum <= 0) {
      alert('Please enter a valid amount to top up.')
      return
    }

    setToppingUp(true)
    setTopUpSuccess(false)
    try {
      const userRef = doc(db, 'users', user.id)
      await updateDoc(userRef, {
        walletBalance: increment(amountNum)
      })

      // Update local balance state
      setBalance(prev => prev + amountNum)
      setTopUpSuccess(true)
      setTimeout(() => setTopUpSuccess(false), 3000)
    } catch (err) {
      console.error('Failed to top up wallet balance:', err)
      alert('Failed to top up. Please try again.')
    } finally {
      setToppingUp(false)
    }
  }

  const handlePayment = async () => {
    if (!order || balance < order.totalAmount) {
      alert('Insufficient wallet balance. Please top up first.')
      return
    }

    setPaying(true)
    try {
      const userRef = doc(db, 'users', user.id)
      await updateDoc(userRef, {
        walletBalance: increment(-order.totalAmount)
      })

      // Nav to success page
      navigate(`/success?orderId=${encodeURIComponent(orderId)}`, { replace: true })
    } catch (err) {
      console.error('Wallet payment deduction failed:', err)
      alert('Wallet payment transaction failed. Please try again.')
    } finally {
      setPaying(false)
    }
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#f8fafc', flexDirection: 'column', gap: '20px' }}>
        <div style={{ width: '40px', height: '40px', border: '4px solid #e2e8f0', borderTopColor: 'var(--green-dark)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <p style={{ fontWeight: 800, color: '#64748b' }}>Loading wallet details...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  const orderTotal = order?.totalAmount || 0
  const isSufficient = balance >= orderTotal
  const shortfall = orderTotal - balance

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', padding: '40px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ maxWidth: '480px', width: '100%', background: 'white', borderRadius: '32px', border: '1px solid #e2e8f0', padding: '36px', boxShadow: '0 20px 50px rgba(0,0,0,0.03)', boxSizing: 'border-box' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <button onClick={() => navigate('/checkout')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', display: 'flex', alignItems: 'center' }}>
            <ArrowLeft size={20} />
          </button>
          <h1 style={{ fontSize: '24px', fontWeight: 950, color: 'var(--green-dark)', margin: 0 }}>Wallet Payment</h1>
        </div>

        {/* Current Balance Card */}
        <div style={{ background: 'linear-gradient(135deg, var(--green-dark) 0%, #034f34 100%)', borderRadius: '24px', padding: '24px', color: 'white', position: 'relative', marginBottom: '24px', boxShadow: '0 12px 24px rgba(1,50,32,0.15)' }}>
          <Wallet size={40} color="var(--gold)" style={{ position: 'absolute', right: '20px', top: '20px', opacity: 0.15 }} />
          <div style={{ fontSize: '12px', fontWeight: 800, opacity: 0.6, marginBottom: '8px', letterSpacing: '1px' }}>STM WALLET BALANCE</div>
          <div style={{ fontSize: '36px', fontWeight: 950 }}>SGD ${balance.toFixed(2)}</div>
        </div>

        {/* Order Amount details */}
        <div style={{ background: '#f8fafc', borderRadius: '16px', padding: '16px', marginBottom: '24px', border: '1px solid #eef2f6' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 700 }}>ORDER REFERENCE</span>
            <span style={{ fontSize: '13px', color: 'var(--green-dark)', fontWeight: 900 }}>{orderId?.slice(-8).toUpperCase()}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: 800 }}>
            <span>Order Total</span>
            <span style={{ color: 'var(--green-dark)' }}>SGD ${orderTotal.toFixed(2)}</span>
          </div>
        </div>

        {/* Payment / Insufficient Balance Warning */}
        {!isSufficient ? (
          <div style={{ background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '16px', padding: '16px', display: 'flex', gap: '12px', marginBottom: '24px' }}>
            <AlertCircle size={20} color="#B8860B" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <div style={{ color: '#B8860B', fontWeight: 900, fontSize: '14px', marginBottom: '4px' }}>Insufficient Balance</div>
              <div style={{ color: '#B8860B', fontSize: '13px', fontWeight: 600 }}>
                You need another **SGD ${shortfall.toFixed(2)}** to pay for this order. Please top up below.
              </div>
            </div>
          </div>
        ) : null}

        {/* Top Up Section */}
        <div style={{ border: '1.5px dashed #cbd5e1', borderRadius: '24px', padding: '20px', marginBottom: '28px', background: '#fafafb' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 900, margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Plus size={16} color="var(--green-mid)" /> Top Up Wallet
          </h3>

          {topUpSuccess && (
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#166534', padding: '10px 14px', borderRadius: '12px', fontSize: '13px', fontWeight: 700, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={16} color="#16a34a" /> Top up successful!
            </div>
          )}

          {/* Quick presets */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '14px' }}>
            {['10', '20', '50', '100'].map(val => (
              <button
                key={val}
                type="button"
                onClick={() => setTopUpAmount(val)}
                style={{
                  padding: '10px 0',
                  background: topUpAmount === val ? 'var(--green-tint)' : 'white',
                  border: `2px solid ${topUpAmount === val ? 'var(--green-mid)' : '#cbd5e1'}`,
                  borderRadius: '12px',
                  fontWeight: 900,
                  fontSize: '13px',
                  cursor: 'pointer',
                  color: topUpAmount === val ? 'var(--green-dark)' : '#64748b',
                  transition: '0.2s'
                }}
              >
                +${val}
              </button>
            ))}
          </div>

          {/* Custom Input & Top Up Button */}
          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontWeight: 800, color: '#64748b' }}>$</span>
              <input
                type="number"
                value={topUpAmount}
                onChange={e => setTopUpAmount(e.target.value)}
                placeholder="Custom amount"
                style={{
                  width: '100%',
                  padding: '14px 14px 14px 28px',
                  borderRadius: '12px',
                  border: '1.5px solid #cbd5e1',
                  fontWeight: 800,
                  fontSize: '15px',
                  boxSizing: 'border-box'
                }}
              />
            </div>
            <button
              onClick={handleTopUp}
              disabled={toppingUp}
              style={{
                padding: '0 20px',
                background: 'var(--green-mid)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontWeight: 900,
                cursor: toppingUp ? 'not-allowed' : 'pointer'
              }}
            >
              {toppingUp ? 'Adding...' : 'Top Up'}
            </button>
          </div>
        </div>

        {/* Complete Payment Button */}
        <button
          onClick={handlePayment}
          disabled={paying || !isSufficient}
          style={{
            width: '100%',
            padding: '18px',
            background: isSufficient ? 'var(--green-dark)' : '#cbd5e1',
            color: 'white',
            border: 'none',
            borderRadius: '16px',
            fontWeight: 900,
            fontSize: '16px',
            cursor: isSufficient && !paying ? 'pointer' : 'not-allowed',
            boxShadow: isSufficient ? '0 8px 16px rgba(1,50,32,0.1)' : 'none',
            transition: '0.2s'
          }}
        >
          {paying ? 'Processing Wallet Transfer...' : isSufficient ? 'Pay with Wallet' : 'Top Up to Pay'}
        </button>

        <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', color: '#94a3b8' }}>
          <ShieldCheck size={14} />
          <span style={{ fontSize: '12px', fontWeight: 700 }}>Secure STM Credits Wallet Payment</span>
        </div>

      </div>
    </div>
  )
}
