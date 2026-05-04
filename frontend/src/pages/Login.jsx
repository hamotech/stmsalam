import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Phone, Lock, User, ArrowRight, ShieldCheck, Mail, Eye, EyeOff, UserPlus, LogIn } from 'lucide-react'
import { shopInfo } from '../data/menuData'
import { useAuth } from '../context/AuthContext'
import { API_URL } from '../config/api'
import { validateRequired, validateEmail, validatePhone, validatePasswordStrength, validateConfirmPassword, validateFullName } from '../utils/validators'
import { auth, db } from '../lib/firebase'
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile, 
  sendEmailVerification,
  sendPasswordResetEmail,
  setPersistence, 
  browserLocalPersistence,
  getIdTokenResult,
} from 'firebase/auth'
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import { resolveUserRole } from '../config/adminAccess'
import { normalizePhone } from '../utils/runtimeSafety'

/** Firebase Auth / Firestore error code for logging and branching (never logs PII). */
function getAuthCode(err) {
  if (err && typeof err === 'object' && 'code' in err && typeof err.code === 'string') {
    return err.code.trim().toLowerCase()
  }
  return undefined
}

function newRequestId() {
  return typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
    ? crypto.randomUUID()
    : `req_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`
}

/** Fire-and-forget analytics hook — no email/uid; optional `code` on failures only. */
function trackAuthAnalytics(eventName, detail = {}) {
  if (typeof window === 'undefined') return
  try {
    window.dispatchEvent(new CustomEvent('stm-auth-analytics', { detail: { event: eventName, ...detail } }))
  } catch {
    /* ignore */
  }
}

/** Use with `getAuthCode(err)` — unknown / malformed codes → generic copy. */
function friendlyLoginFailureMessage(rawCode) {
  const code = typeof rawCode === 'string' ? rawCode.trim().toLowerCase() : ''
  if (code === 'auth/user-not-found' || code === 'auth/invalid-email' || code === 'auth/invalid-credential') {
    return 'Invalid account or credentials. Please try again.'
  }
  if (code === 'auth/wrong-password') {
    return 'Incorrect password. Please try again.'
  }
  if (code === 'auth/too-many-requests') {
    return 'Too many failed attempts. Account temporarily locked.'
  }
  if (code === 'auth/network-request-failed') {
    return 'Network error. Please check your internet connection.'
  }
  return 'Sign-in failed. Please try again.'
}

export default function Login() {
  const [mode, setMode] = useState('login') // 'login' | 'register'
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  /** Consecutive failed Firebase sign-in attempts (login mode only); resets on success or tab switch away from login. */
  const [loginFailCount, setLoginFailCount] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })
  const navigate = useNavigate()
  const { login } = useAuth()
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
      // 1. Create the user in Firebase Auth using Client SDK
      const authResult = await createUserWithEmailAndPassword(auth, safeEmail, formData.password);
      const user = authResult.user;

      // 2. Send verification email (non-blocking)
      try {
        await sendEmailVerification(user);
      } catch (vErr) {
        const vCode = getAuthCode(vErr)
        console.warn('[Verification Email]', { code: vCode }, vErr);
      }

      // 3. Update the user profile with their name
      await updateProfile(user, {
        displayName: formData.name
      });

      // 4. Save metadata to Firestore (with existence check)
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);
      
      if (!userSnap.exists()) {
        const initialRole = resolveUserRole(safeEmail, 'user');
        const normalizedPhone = normalizePhone(formData.phone);
        await setDoc(userRef, {
          uid: user.uid,
          name: formData.name,
          email: safeEmail,
          phone: normalizedPhone,
          role: initialRole,
          ...(initialRole === 'rider'
            ? { status: 'offline', assignedOrders: [] }
            : {}),
          createdAt: serverTimestamp() // Use server-side time
        });
      }

      setSuccess('Account created! A verification link has also been sent to your email.');
      
      // Auto-login after registration (Maintains existing flow)
      const registeredRole = resolveUserRole(safeEmail, 'user');
      login({ id: user.uid, name: formData.name, email: safeEmail, role: registeredRole });
      
      setTimeout(() => navigate(registeredRole === 'rider' ? '/rider' : redirectPath), 2000);

    } catch (err) {
      const code = getAuthCode(err)
      console.error('[Registration Error]', { code }, err);
      
      switch (code) {
        case 'auth/email-already-in-use':
          setError('This email is already registered. Try logging in instead.');
          break;
        case 'auth/invalid-email':
          setError('Please enter a valid email address.');
          break;
        case 'auth/weak-password':
          setError('Password is too weak. It must be at least 6 characters.');
          break;
        case 'auth/operation-not-allowed':
          setError('Email/password accounts are not enabled. Contact support.');
          break;
        case 'auth/network-request-failed':
          setError('Connection error. Please check your internet and try again.');
          break;
        default:
          setError((err && err.message) || 'Signup failed. Please try again later.');
      }
    } finally {
      setIsSubmitting(false);
    }
  }


  const handleLogin = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setError('');

    const errors = {};
    errors.email = validateEmail(formData.email);
    errors.password = validateRequired(formData.password, 'Password');
    
    Object.keys(errors).forEach(key => { if (!errors[key]) delete errors[key] });
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      setError('No internet connection. Please check and try again.');
      return;
    }

    const reqId = newRequestId()
    try {
      sessionStorage.setItem('stm_last_login_req', reqId);
    } catch {
      /* quota / privacy mode */
    }
    setIsSubmitting(true);
    const safeEmail = formData.email.trim().toLowerCase();
    trackAuthAnalytics('login_attempt', { reqId })
    console.log('[AUTH_START]', { reqId, email: safeEmail });

    try {
      await setPersistence(auth, browserLocalPersistence);
      const firebaseResult = await signInWithEmailAndPassword(auth, safeEmail, formData.password);
      const fbUser = firebaseResult.user;
      setLoginFailCount(0)
      trackAuthAnalytics('login_success', { reqId })
      console.log('[AUTH_SUCCESS]', { reqId, email: fbUser.email ?? safeEmail, uid: fbUser.uid });

      let role = 'user';
      let profileName = fbUser.displayName || 'Customer';
      try {
        const userRef = doc(db, 'users', fbUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const profile = userSnap.data();
          role = resolveUserRole(safeEmail, profile.role);
          profileName = profile.name || profileName;
        } else {
          role = resolveUserRole(safeEmail, null);
        }
      } catch (profileErr) {
        const pCode = getAuthCode(profileErr)
        console.error('[AUTH_PROFILE_READ_FAIL]', { reqId, email: safeEmail, uid: fbUser.uid, code: pCode }, profileErr);
        role = resolveUserRole(safeEmail, null);
      }

      await fbUser.getIdToken(true);
      try {
        const tr = await getIdTokenResult(fbUser);
        if (tr.claims?.admin === true) {
          role = 'admin';
        }
      } catch (claimErr) {
        const cCode = getAuthCode(claimErr)
        console.error('[AUTH_TOKEN_CLAIMS_FAIL]', { reqId, email: safeEmail, uid: fbUser.uid, code: cCode }, claimErr);
      }

      if (role === 'admin') {
        login({ id: fbUser.uid, name: profileName || 'Admin Master', email: safeEmail, role: 'admin' });
        setSuccess('Admin authenticated! Accessing Command Center...');
        setTimeout(() => navigate('/admin'), 1200);
      } else if (role === 'rider') {
        login({ id: fbUser.uid, name: profileName, email: safeEmail, role: 'rider' });
        setSuccess('Rider authenticated! Opening Delivery Dashboard...');
        setTimeout(() => navigate('/rider'), 1200);
      } else {
        login({ id: fbUser.uid, name: profileName, email: safeEmail, role: 'user' });
        setSuccess('Welcome back! Redirecting...');
        setTimeout(() => navigate(redirectPath), 1200);
      }
    } catch (err) {
      const code = getAuthCode(err)
      trackAuthAnalytics('login_fail', { reqId, code })
      console.error('[AUTH_FAIL]', { reqId, email: safeEmail, code }, err);
      setLoginFailCount((c) => c + 1)
      setError(friendlyLoginFailureMessage(code));
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleForgotPassword = async () => {
    if (isSubmitting) return
    setError('')
    setSuccess('')
    const safeEmail = formData.email.trim().toLowerCase()
    const emailError = validateEmail(safeEmail)
    if (emailError) {
      setFieldErrors((prev) => ({ ...prev, email: emailError }))
      setError('Enter your email first to receive a reset link.')
      return
    }
    try {
      await sendPasswordResetEmail(auth, safeEmail)
      setSuccess('Password reset link sent. Please check your email inbox.')
    } catch (err) {
      const code = getAuthCode(err)
      console.error('[AUTH_PASSWORD_RESET_FAIL]', { email: safeEmail, code }, err)
      if (code === 'auth/user-not-found' || code === 'auth/invalid-email') {
        setError('Unable to send reset link. Please verify your email.')
      } else if (code === 'auth/too-many-requests') {
        setError('Too many requests. Please wait and try again.')
      } else {
        setError('Could not send reset email right now. Please try again later.')
      }
    }
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

  const renderInput = ({ icon: Icon, name, type, placeholder, maxLength, isPassword, dataTestId, disabled, maskAlways, label, inputId, ariaErrorContainerId }) => {
    const masked = isPassword && !maskAlways && showPass ? 'text' : type
    const autoComplete =
      name === 'password' && maskAlways ? 'current-password'
      : name === 'confirmPassword' ? 'new-password'
      : name === 'password' ? 'new-password'
      : name === 'email' ? 'email'
      : name === 'phone' ? 'tel'
      : name === 'name' ? 'name'
      : undefined
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', textAlign: 'left' }}>
        {label && inputId ? (
          <label
            htmlFor={inputId}
            style={{ fontSize: '13px', fontWeight: 800, color: 'var(--green-dark)', marginBottom: '2px', letterSpacing: '0.02em' }}
          >
            {label}
          </label>
        ) : null}
        <div style={{ position: 'relative' }}>
          <Icon size={18} style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} aria-hidden />
          <input 
            id={inputId}
            name={name} 
            type={masked}
            placeholder={placeholder} 
            value={formData[name]} 
            onChange={handleChange} 
            maxLength={maxLength}
            disabled={disabled}
            data-testid={dataTestId}
            autoComplete={autoComplete}
            aria-invalid={ariaErrorContainerId ? !!fieldErrors[name] : fieldErrors[name] ? true : undefined}
            aria-describedby={ariaErrorContainerId ? ariaErrorContainerId : fieldErrors[name] && inputId ? `${inputId}-error` : undefined}
            style={{ ...inputStyle, borderColor: fieldErrors[name] ? '#dc2626' : 'var(--border)', opacity: disabled ? 0.65 : 1 }} 
          />
          {isPassword && !maskAlways && (
            <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-light)' }} tabIndex="-1">
              {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
        </div>
        {ariaErrorContainerId ? (
          <div id={ariaErrorContainerId} role="alert" aria-live="polite" style={{ color: fieldErrors[name] ? '#dc2626' : 'transparent', fontSize: '13px', textAlign: 'left', marginLeft: '16px', fontWeight: 600, minHeight: fieldErrors[name] ? undefined : '1em' }}>
            {fieldErrors[name] || ''}
          </div>
        ) : fieldErrors[name] ? (
          <div id={inputId ? `${inputId}-error` : undefined} role="alert" aria-live="polite" style={{ color: '#dc2626', fontSize: '13px', textAlign: 'left', marginLeft: '16px', fontWeight: 600 }}>
            {fieldErrors[name]}
          </div>
        ) : null}
      </div>
    )
  }

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
             'Sign in to your STM Salam account'}
          </p>
        </div>

        {/* Mode Tabs */}
        <div style={{
          display: 'flex', gap: '6px', background: 'var(--cream)', borderRadius: '18px',
          padding: '6px', marginBottom: '32px'
        }}>
          <button type="button" disabled={isSubmitting} onClick={() => { if (isSubmitting) return; setMode('login'); setError(''); setSuccess(''); setFieldErrors({}); setLoginFailCount(0); }} style={{ ...tabStyle(mode === 'login'), opacity: isSubmitting ? 0.6 : 1 }}>
            <LogIn size={16} /> Login
          </button>
          <button type="button" data-testid="login-register-button" disabled={isSubmitting} onClick={() => { if (isSubmitting) return; setMode('register'); setError(''); setSuccess(''); setFieldErrors({}); setLoginFailCount(0); }} style={{ ...tabStyle(mode === 'register'), opacity: isSubmitting ? 0.6 : 1 }}>
            <UserPlus size={16} /> Register
          </button>
        </div>

        {/* Error / Success */}
        {error && (
          <div
            role="alert"
            aria-live="assertive"
            style={{ background: '#fef2f2', color: '#dc2626', padding: '14px 20px', borderRadius: '14px', marginBottom: '20px', fontSize: '14px', fontWeight: 700, border: '1px solid #fecaca' }}
          >
            {error}
            {mode === 'login' && loginFailCount >= 5 ? (
              <p style={{ margin: '10px 0 0', fontSize: '13px', fontWeight: 600, lineHeight: 1.45 }}>
                Several sign-in attempts failed in a row. Wait a few minutes before trying again, or use &quot;Forgot password?&quot; if you are unsure of your password.
              </p>
            ) : null}
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
            {renderInput({
              icon: Mail,
              name: 'email',
              type: 'email',
              placeholder: 'you@example.com',
              label: 'Email',
              inputId: 'login-email',
              ariaErrorContainerId: 'login-email-error',
              dataTestId: 'login-email-input',
              disabled: isSubmitting,
            })}
            {renderInput({
              icon: Lock,
              name: 'password',
              type: 'password',
              placeholder: 'Password',
              label: 'Password',
              inputId: 'login-password',
              ariaErrorContainerId: 'login-password-error',
              isPassword: true,
              maskAlways: true,
              dataTestId: 'login-password-input',
              disabled: isSubmitting,
            })}
            <div style={{ textAlign: 'right', marginTop: '-4px' }}>
              <button
                type="button"
                data-testid="login-forgot-password"
                disabled={isSubmitting}
                onClick={handleForgotPassword}
                style={{
                  border: 'none',
                  background: 'transparent',
                  color: 'var(--green-mid)',
                  fontWeight: 700,
                  fontSize: '13px',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  textDecoration: 'underline',
                  opacity: isSubmitting ? 0.6 : 1,
                }}
              >
                Forgot password?
              </button>
            </div>
            <button type="submit" data-testid="login-submit-button" disabled={isSubmitting} className="btn btn-gold" aria-busy={isSubmitting} style={{ width: '100%', padding: '18px', fontSize: '17px', borderRadius: '18px', boxShadow: 'var(--shadow-gold)', marginTop: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}>
              {isSubmitting ? 'Processing...' : 'Sign In'} <ArrowRight size={20} aria-hidden />
            </button>
          </form>
        )}

        {/* === REGISTER FORM === */}
        {mode === 'register' && (
          <form onSubmit={handleRegister} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {renderInput({ icon: User, name: 'name', type: 'text', placeholder: 'Full Name', label: 'Full name', inputId: 'register-name' })}
            {renderInput({ icon: Mail, name: 'email', type: 'email', placeholder: 'Email address', label: 'Email', inputId: 'register-email' })}
            {renderInput({ icon: Phone, name: 'phone', type: 'tel', placeholder: 'Phone (e.g. 91234567)', maxLength: 15, label: 'Phone', inputId: 'register-phone' })}
            {renderInput({ icon: Lock, name: 'password', type: 'password', placeholder: 'Create Password (min 6 chars)', label: 'Password', inputId: 'register-password', isPassword: true })}
            {renderInput({ icon: ShieldCheck, name: 'confirmPassword', type: 'password', placeholder: 'Confirm Password', label: 'Confirm password', inputId: 'register-confirm', isPassword: true })}
            <button type="submit" disabled={isSubmitting} className="btn btn-gold" style={{ width: '100%', padding: '18px', fontSize: '17px', borderRadius: '18px', boxShadow: 'var(--shadow-gold)', marginTop: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}>
              {isSubmitting ? 'Processing...' : 'Create Account'} <UserPlus size={20} />
            </button>
          </form>
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
