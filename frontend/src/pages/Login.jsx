import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Phone, Lock, User, ArrowRight, ShieldCheck, Mail, Eye, EyeOff, UserPlus, LogIn, UserX } from 'lucide-react'
import { shopInfo } from '../data/menuData'
import { useAuth } from '../context/AuthContext'
import { API_URL } from '../config/api'
import { validateRequired, validateEmail, validatePhone, validatePasswordStrength, validateConfirmPassword, validateFullName } from '../utils/validators'

export default function Login() {
  const [mode, setMode] = useState('login') // 'login' | 'register' | 'guest'
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })
  const navigate = useNavigate()
  const { login, loginAsGuest } = useAuth()
  const query = new URLSearchParams(window.location.search)
  const redirectPath = query.get('redirect') || '/'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError('')
    setFieldErrors({ ...fieldErrors, [e.target.name]: '' })
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setError('')
    
    const errors = {};
    errors.name = validateFullName(formData.name);
    errors.email = validateEmail(formData.email);
    errors.phone = validatePhone(formData.phone);
    errors.password = validatePasswordStrength(formData.password);
    errors.confirmPassword = validateConfirmPassword(formData.password, formData.confirmPassword);
    
    Object.keys(errors).forEach(key => { if (!errors[key]) delete errors[key] });
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setIsSubmitting(true);
    const safeEmail = formData.email.trim().toLowerCase()

    try {
      // --- MOCK PERSISTENCE LAYER ---
      const mockDb = JSON.parse(localStorage.getItem('stm_mock_db') || '[]')
      if (mockDb.find(u => u.email?.toLowerCase() === safeEmail)) {
        throw new Error('Email already registered.')
      }

      const newUser = {
        id: 'USR-' + Math.random().toString(36).substr(2, 9),
        name: formData.name,
        email: safeEmail,
        phone: formData.phone,
        password: formData.password, // In a real app, this would be hashed
        createdAt: new Date().toISOString()
      }

      mockDb.push(newUser)
      localStorage.setItem('stm_mock_db', JSON.stringify(mockDb))

      // Auto-login after registration
      const { password, ...userWithoutPass } = newUser
      login(userWithoutPass)
      setSuccess('Account created! Welcome to STM Salam.')
      setTimeout(() => navigate(redirectPath), 1200)

      // Optionally still try to hit API if it exists
      fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      }).catch(e => console.log('API Fallback ignored'))

    } catch (err) {
      setError(err.message)
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')

    const errors = {};
    errors.email = validateEmail(formData.email);
    errors.password = validateRequired(formData.password, 'Password');
    
    Object.keys(errors).forEach(key => { if (!errors[key]) delete errors[key] });
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setIsSubmitting(true);
    const safeEmail = formData.email.trim().toLowerCase()

    try {
      // --- MOCK DATABASE CHECK ---
      const mockDb = JSON.parse(localStorage.getItem('stm_mock_db') || '[]')
      const userMatch = mockDb.find(u => u.email?.toLowerCase() === safeEmail && u.password === formData.password)

      const defaultAdmin = { email: 'admin@stm.com', password: 'admin123' };
      const adminCreds = JSON.parse(localStorage.getItem('stm_admin_creds')) || defaultAdmin;

      if (safeEmail === adminCreds.email.toLowerCase() && formData.password === adminCreds.password) {
         login({ id: 'ADMIN-001', name: 'Admin Master', email: adminCreds.email, role: 'admin' })
         setSuccess('Admin login successful! Redirecting...')
         setTimeout(() => navigate('/admin'), 1200)
         setIsSubmitting(false);
         return
      }

      if (userMatch) {
         const { password, ...userWithoutPass } = userMatch
         login(userWithoutPass)
         setSuccess('Welcome back! Redirecting...')
         setTimeout(() => navigate(redirectPath), 1200)
         setIsSubmitting(false);
         return
      }

      // Fallback to real API if not in mock or if API is primary
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: safeEmail,
          password: formData.password
        })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Invalid credentials')

      login(data.user)
      setSuccess('Welcome back! Redirecting...')
      setTimeout(() => navigate(redirectPath), 1200)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleGuest = () => {
    loginAsGuest()
    navigate(redirectPath)
  }

  const inputStyle = {
    width: '100%', padding: '18px 20px 18px 54px', borderRadius: '18px',
    border: '2px solid var(--border)', background: 'var(--cream)',
    fontSize: '16px', fontWeight: 700, outline: 'none', transition: 'border 0.3s',
    fontFamily: 'inherit'
  }

  const tabStyle = (active) => ({
    flex: 1, padding: '14px', borderRadius: '14px', border: 'none', cursor: 'pointer',
    fontSize: '14px', fontWeight: 800, transition: 'all 0.3s',
    background: active ? 'var(--gold)' : 'transparent',
    color: active ? 'var(--green-dark)' : 'var(--text-light)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
  })

  const renderInput = ({ icon: Icon, name, type, placeholder, maxLength, isPassword }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <div style={{ position: 'relative' }}>
        <Icon size={18} style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
        <input 
          name={name} 
          type={isPassword && showPass ? 'text' : type} 
          placeholder={placeholder} 
          value={formData[name]} 
          onChange={handleChange} 
          maxLength={maxLength}
          style={{ ...inputStyle, borderColor: fieldErrors[name] ? '#dc2626' : 'var(--border)' }} 
        />
        {isPassword && (
          <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-light)' }} tabIndex="-1">
            {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {fieldErrors[name] && <div style={{ color: '#dc2626', fontSize: '13px', textAlign: 'left', marginLeft: '16px', fontWeight: 600 }}>{fieldErrors[name]}</div>}
    </div>
  )

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--green-dark)', padding: '20px', position: 'relative', overflow: 'hidden'
    }}>
      {/* Background Decor */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1544124499-58912cbddaad?auto=format&fit=crop&q=80&w=1800)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.15 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(10,61,46,0.95) 0%, rgba(27,94,66,0.85) 100%)' }} />
      <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '40%', height: '40%', background: 'radial-gradient(circle, var(--gold) 0%, transparent 70%)', opacity: 0.1, filter: 'blur(80px)' }} />

      <div className="fade-up" style={{
        width: '100%', maxWidth: '480px', background: 'white', borderRadius: '40px',
        padding: '50px 40px', boxShadow: '0 30px 60px rgba(0,0,0,0.4)', position: 'relative', zIndex: 1,
        textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)'
      }}>
        
        {/* Branding */}
        <div style={{ marginBottom: '36px' }}>
          <div style={{
            width: '72px', height: '72px', background: 'var(--gold)', borderRadius: '22px',
            margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '24px', color: 'var(--green-dark)', fontWeight: 900, boxShadow: 'var(--shadow-gold)',
            border: '3px solid white'
          }}>
            STM
          </div>
          <h1 style={{ fontSize: '30px', fontWeight: 900, color: 'var(--green-dark)', marginBottom: '8px', letterSpacing: '-1.5px' }}>
            {mode === 'register' ? 'Create Account' : mode === 'login' ? 'Welcome Back' : 'Quick Access'}
          </h1>
          <p style={{ color: 'var(--text-light)', fontSize: '15px', fontWeight: 600 }}>
            {mode === 'register' ? 'Join STM Salam for exclusive deals' :
             mode === 'login' ? 'Sign in to your STM Salam account' :
             'Browse and order without an account'}
          </p>
        </div>

        {/* Mode Tabs */}
        <div style={{
          display: 'flex', gap: '6px', background: 'var(--cream)', borderRadius: '18px',
          padding: '6px', marginBottom: '32px'
        }}>
          <button onClick={() => { setMode('login'); setError(''); setSuccess(''); setFieldErrors({}); }} style={tabStyle(mode === 'login')}>
            <LogIn size={16} /> Login
          </button>
          <button onClick={() => { setMode('register'); setError(''); setSuccess(''); setFieldErrors({}); }} style={tabStyle(mode === 'register')}>
            <UserPlus size={16} /> Register
          </button>
          <button onClick={() => { setMode('guest'); setError(''); setSuccess(''); setFieldErrors({}); }} style={tabStyle(mode === 'guest')}>
            <UserX size={16} /> Guest
          </button>
        </div>

        {/* Error / Success */}
        {error && (
          <div style={{ background: '#fef2f2', color: '#dc2626', padding: '14px 20px', borderRadius: '14px', marginBottom: '20px', fontSize: '14px', fontWeight: 700, border: '1px solid #fecaca' }}>
            {error}
          </div>
        )}
        {success && (
          <div style={{ background: '#f0fdf4', color: '#16a34a', padding: '14px 20px', borderRadius: '14px', marginBottom: '20px', fontSize: '14px', fontWeight: 700, border: '1px solid #bbf7d0' }}>
            {success}
          </div>
        )}

        {/* === LOGIN FORM === */}
        {mode === 'login' && (
          <form onSubmit={handleLogin} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {renderInput({ icon: Mail, name: 'email', type: 'email', placeholder: 'Email Address' })}
            {renderInput({ icon: Lock, name: 'password', type: 'password', placeholder: 'Password', isPassword: true })}
            <button type="submit" disabled={isSubmitting} className="btn btn-gold" style={{ width: '100%', padding: '18px', fontSize: '17px', borderRadius: '18px', boxShadow: 'var(--shadow-gold)', marginTop: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}>
              {isSubmitting ? 'Processing...' : 'Sign In'} <ArrowRight size={20} />
            </button>
          </form>
        )}

        {/* === REGISTER FORM === */}
        {mode === 'register' && (
          <form onSubmit={handleRegister} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {renderInput({ icon: User, name: 'name', type: 'text', placeholder: 'Full Name' })}
            {renderInput({ icon: Mail, name: 'email', type: 'email', placeholder: 'Email Address' })}
            {renderInput({ icon: Phone, name: 'phone', type: 'tel', placeholder: 'Phone (e.g. 91234567)', maxLength: 15 })}
            {renderInput({ icon: Lock, name: 'password', type: 'password', placeholder: 'Create Password (min 6 chars)', isPassword: true })}
            {renderInput({ icon: ShieldCheck, name: 'confirmPassword', type: 'password', placeholder: 'Confirm Password', isPassword: true })}
            <button type="submit" disabled={isSubmitting} className="btn btn-gold" style={{ width: '100%', padding: '18px', fontSize: '17px', borderRadius: '18px', boxShadow: 'var(--shadow-gold)', marginTop: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}>
              {isSubmitting ? 'Processing...' : 'Create Account'} <UserPlus size={20} />
            </button>
          </form>
        )}

        {/* === GUEST MODE === */}
        {mode === 'guest' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', textAlign: 'center' }}>
            <div style={{ background: 'var(--cream)', borderRadius: '24px', padding: '32px', border: '1px solid var(--border)' }}>
              <div style={{ width: '64px', height: '64px', background: 'var(--gold-tint)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <UserX size={28} color="var(--gold)" />
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 900, color: 'var(--green-dark)', marginBottom: '12px' }}>Browse as Guest</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-light)', lineHeight: 1.7, fontWeight: 600, marginBottom: '8px' }}>
                You can browse our full menu and place orders via WhatsApp without creating an account.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'left', margin: '20px 0', fontSize: '13px', fontWeight: 700 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-mid)' }}>
                  <span style={{ color: '#16a34a' }}>✓</span> Browse full 99+ item menu
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-mid)' }}>
                  <span style={{ color: '#16a34a' }}>✓</span> Add items to cart
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-mid)' }}>
                  <span style={{ color: '#16a34a' }}>✓</span> Order via WhatsApp
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-light)' }}>
                  <span style={{ color: '#dc2626' }}>✗</span> No order history saved
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-light)' }}>
                  <span style={{ color: '#dc2626' }}>✗</span> No exclusive deals
                </div>
              </div>
            </div>
            <button onClick={handleGuest} className="btn btn-gold" style={{ width: '100%', padding: '18px', fontSize: '17px', borderRadius: '18px', boxShadow: 'var(--shadow-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
              Continue as Guest <ArrowRight size={20} />
            </button>
          </div>
        )}

        {/* FOOTER */}
        <div style={{ marginTop: '40px', paddingTop: '28px', borderTop: '2px dashed var(--border)' }}>
          <p style={{ color: 'var(--text-light)', fontSize: '13px', lineHeight: 1.6, fontWeight: 600 }}>
            Secure login for STM Salam.<br />
            By entering, you accept our <span style={{ color: 'var(--green-mid)', fontWeight: 800 }}>User Terms</span> & <span style={{ color: 'var(--green-mid)', fontWeight: 800 }}>Privacy</span>.
          </p>
        </div>
      </div>
    </div>
  )
}
