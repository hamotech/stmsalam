import React, { useState, useEffect } from 'react'
import { MapPin, Phone, MessageSquare, DollarSign, List, ShieldCheck, ChevronRight, LogOut, Package, Navigation, CheckCircle, Bell, User, Clock, ArrowRight, X, TrendingUp, Wallet, Map as MapIcon } from 'lucide-react'

// Mock Data for Driver
const INITIAL_JOBS = [
  { id: 'SALAM-9231', customer: 'Farhan Ahmed', address: 'Block 123, Marine Terrace, #12-345', items: '3x Kebab Roll, 1x Cola', total: 24.50, distance: '1.2 km', reward: 6.50, type: 'Delivery' },
  { id: 'SALAM-9230', customer: 'Alicia Ng', address: 'Blk 55 Bedok South Ave 1, #08-22', items: '2x Classic Burger', total: 13.80, distance: '3.4 km', reward: 8.20, type: 'Delivery' }
]

export default function DriverPanel() {
  const [activeTab, setActiveTab] = useState('tasks') // tasks, earnings, profile
  const [isOnline, setIsOnline] = useState(true)
  const [activeJob, setActiveJob] = useState(null)
  const [showIncoming, setShowIncoming] = useState(false)
  const [jobStage, setJobStage] = useState('accepted') // accepted, picked_up, arrived, delivered

  // Simulate an incoming job after 3 seconds if online and no active job
  useEffect(() => {
    if (isOnline && !activeJob && !showIncoming) {
      const timer = setTimeout(() => setShowIncoming(true), 4000)
      return () => clearTimeout(timer)
    }
  }, [isOnline, activeJob, showIncoming])

  const acceptJob = () => {
    setActiveJob(INITIAL_JOBS[0])
    setShowIncoming(false)
    setJobStage('accepted')
  }

  const completeStep = () => {
    if (jobStage === 'accepted') setJobStage('picked_up')
    else if (jobStage === 'picked_up') setJobStage('arrived')
    else {
      setActiveJob(null)
      // Reset for next job
    }
  }

  return (
    <div style={{ 
      background: 'var(--bg-body)', minHeight: '100vh', 
      maxWidth: '480px', margin: '0 auto', 
      display: 'flex', flexDirection: 'column',
      boxShadow: '0 0 40px rgba(0,0,0,0.1)',
      position: 'relative',
      fontFamily: 'inherit'
    }}>
      
      {/* HEADER - Premium Glassmorphism */}
      <header style={{ 
        background: 'var(--green-dark)', padding: '24px', color: 'white',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        position: 'sticky', top: 0, zIndex: 100
      }}>
         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
               <div style={{ 
                 width: '48px', height: '48px', borderRadius: '16px', 
                 background: 'var(--gold)', color: 'var(--green-dark)', 
                 display: 'flex', alignItems: 'center', justifyContent: 'center', 
                 fontWeight: 900, fontSize: '18px' 
               }}>S</div>
               <div>
                  <h1 style={{ fontSize: '18px', fontWeight: 900, marginBottom: '2px' }}>Suresh Kumar</h1>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                     <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: isOnline ? 'var(--success)' : '#666' }} />
                     <span style={{ fontSize: '12px', fontWeight: 800, color: isOnline ? 'var(--success)' : '#aaa' }}>
                        {isOnline ? 'Active & Online' : 'Offline'}
                     </span>
                  </div>
               </div>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
               <button style={{ 
                 width: '44px', height: '44px', borderRadius: '14px', 
                 background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', 
                 display: 'flex', alignItems: 'center', justifyContent: 'center' 
               }}><Bell size={20} /></button>
               <button 
                 onClick={() => setIsOnline(!isOnline)}
                 style={{ 
                   padding: '0 20px', height: '44px', borderRadius: '14px', 
                   background: isOnline ? 'var(--danger)20' : 'var(--success)20',
                   color: isOnline ? '#ff6b6b' : 'var(--success)',
                   border: 'none', fontWeight: 800, fontSize: '13px', cursor: 'pointer'
                 }}>
                 {isOnline ? 'Go Offline' : 'Go Online'}
               </button>
            </div>
         </div>
      </header>

      {/* TABS CONTENT */}
      <main style={{ flex: 1, paddingBottom: '100px', width: '100%' }}>
         {activeTab === 'tasks' && (
           <div className="fade-up" style={{ padding: '24px' }}>
              {/* Earnings Quick Summary */}
              <div style={{ 
                background: 'var(--green-dark)', borderRadius: '28px', padding: '24px', 
                color: 'white', marginBottom: '32px', border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 15px 30px rgba(10,61,46,0.3)',
                position: 'relative', overflow: 'hidden'
              }}>
                 <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '120px', height: '120px', background: 'var(--gold)', opacity: 0.05, borderRadius: '50%' }} />
                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                    <div>
                       <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>Today's Payout</div>
                       <div style={{ fontSize: '38px', fontWeight: 900, color: 'var(--gold)' }}>$84.50</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                       <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', fontWeight: 700, textTransform: 'uppercase' }}>Trips Completed</div>
                       <div style={{ fontSize: '24px', fontWeight: 900 }}>12</div>
                    </div>
                 </div>
                 <div style={{ height: '3px', width: '100%', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', marginBottom: '16px' }}>
                    <div style={{ width: '75%', height: '100%', background: 'var(--gold)', borderRadius: '2px' }} />
                 </div>
                 <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 800 }}>
                    <span style={{ color: 'rgba(255,255,255,0.6)' }}>Daily Goal: $120.00</span>
                    <span style={{ color: 'var(--gold)' }}>$35.50 to go</span>
                 </div>
              </div>

              {!activeJob ? (
                <div style={{ textAlign: 'center', padding: '60px 0' }}>
                   <div style={{ 
                     width: '120px', height: '120px', background: 'var(--cream)', 
                     borderRadius: '40px', margin: '0 auto 24px', 
                     display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--green-mid)'
                   }}>
                      <Navigation size={48} className="spin-slow" />
                   </div>
                   <h3 style={{ fontSize: '20px', fontWeight: 900, color: 'var(--green-dark)', marginBottom: '8px' }}>
                     {isOnline ? 'Searching for jobs...' : 'You are currently offline'}
                   </h3>
                   <p style={{ color: 'var(--text-light)', fontSize: '15px', fontWeight: 600 }}>
                     {isOnline ? 'Position yourself near Marine Terrace for faster orders.' : 'Go online to start receiving delivery requests.'}
                   </p>
                </div>
              ) : (
                <div className="active-job-card fade-up">
                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                      <h2 style={{ fontSize: '18px', fontWeight: 900, color: 'var(--green-dark)' }}>Active Delivery</h2>
                      <span style={{ 
                        background: 'var(--gold-tint)', color: 'var(--gold)', 
                        padding: '6px 14px', borderRadius: '12px', fontSize: '12px', fontWeight: 900 
                      }}>{activeJob.distance} away</span>
                   </div>

                   {/* Map Preview Placeholder */}
                   <div style={{ 
                     width: '100%', height: '180px', background: '#e0e0e0', borderRadius: '24px', 
                     marginBottom: '24px', overflow: 'hidden', position: 'relative', border: '1px solid var(--border)'
                   }}>
                      <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} />
                      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                         <div style={{ width: '40px', height: '40px', background: 'var(--danger)', borderRadius: '50%', border: '4px solid white', boxShadow: '0 5px 15px rgba(0,0,0,0.2)' }} />
                      </div>
                      <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px', display: 'flex', gap: '8px' }}>
                         <button style={{ flex: 1, padding: '10px', background: 'white', border: 'none', borderRadius: '12px', fontWeight: 800, fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                            <MapIcon size={16} color="var(--green-mid)" /> Open Maps
                         </button>
                      </div>
                   </div>

                   <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
                      <div style={{ width: '56px', height: '56px', borderRadius: '18px', background: 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--green-dark)', fontWeight: 900, fontSize: '18px' }}>
                         {activeJob.customer[0]}
                      </div>
                      <div style={{ flex: 1 }}>
                         <div style={{ fontSize: '18px', fontWeight: 900, marginBottom: '2px' }}>{activeJob.customer}</div>
                         <div style={{ fontSize: '13px', color: 'var(--text-light)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <MapPin size={14} color="var(--danger)" fill="var(--danger)" /> {activeJob.address}
                         </div>
                      </div>
                   </div>

                   <div style={{ background: 'var(--cream)', borderRadius: '24px', padding: '20px', marginBottom: '32px' }}>
                      <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-light)', textTransform: 'uppercase', marginBottom: '12px' }}>Order: {activeJob.id}</div>
                      <div style={{ fontWeight: 800, fontSize: '16px', color: 'var(--green-dark)', lineHeight: 1.6 }}>{activeJob.items}</div>
                   </div>

                   <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
                      <button className="btn btn-outline" style={{ borderRadius: '16px', padding: '16px' }}><Phone size={20} /> Customer</button>
                      <button className="btn btn-outline" style={{ borderRadius: '16px', padding: '16px' }}><MessageSquare size={20} /> Message</button>
                   </div>

                   <button 
                     onClick={completeStep}
                     style={{ 
                       width: '100%', padding: '20px', borderRadius: '20px', border: 'none',
                       background: 'var(--green-dark)', color: 'white', fontWeight: 900, fontSize: '16px',
                       cursor: 'pointer', transition: '0.2s', boxShadow: '0 10px 20px rgba(10,61,46,0.2)'
                     }}
                   >
                     {jobStage === 'accepted' ? 'Picked Up from Shop' : jobStage === 'picked_up' ? 'Arrived at Customer' : 'Confirm Delivered ✓'}
                   </button>
                </div>
              )}
           </div>
         )}

         {activeTab === 'earnings' && (
           <div className="fade-up" style={{ padding: '24px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 900, color: 'var(--green-dark)', marginBottom: '24px' }}>Earnings Dashboard</h2>
              
              <div style={{ background: 'white', borderRadius: '28px', border: '1px solid var(--border)', padding: '24px', marginBottom: '24px' }}>
                 <div style={{ color: 'var(--text-light)', fontSize: '14px', fontWeight: 700, marginBottom: '8px' }}>Wallet Balance</div>
                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div style={{ fontSize: '32px', fontWeight: 900, color: 'var(--text-dark)' }}>$428.10</div>
                    <button style={{ padding: '10px 20px', borderRadius: '12px', background: 'var(--gold)', color: 'var(--green-dark)', border: 'none', fontWeight: 900, fontSize: '14px' }}>Withdraw</button>
                 </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '32px' }}>
                 <div style={{ background: 'white', borderRadius: '24px', border: '1px solid var(--border)', padding: '20px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--success)15', color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                       <TrendingUp size={20} />
                    </div>
                    <div style={{ fontSize: '20px', fontWeight: 900 }}>$1,240</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-light)', fontWeight: 700 }}>This Month</div>
                 </div>
                 <div style={{ background: 'white', borderRadius: '24px', border: '1px solid var(--border)', padding: '20px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--gold)15', color: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                       <Wallet size={20} />
                    </div>
                    <div style={{ fontSize: '20px', fontWeight: 900 }}>$34.50</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-light)', fontWeight: 700 }}>Tips Received</div>
                 </div>
              </div>

              <h3 style={{ fontSize: '18px', fontWeight: 900, marginBottom: '16px' }}>Trip History</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                 {[
                   { id: 'SALAM-9221', date: 'Today, 2:40 PM', earn: 8.50 },
                   { id: 'SALAM-9218', date: 'Today, 1:15 PM', earn: 6.20 },
                   { id: 'SALAM-9215', date: 'Today, 12:45 PM', earn: 7.80 },
                   { id: 'SALAM-9211', date: 'Yesterday, 8:20 PM', earn: 12.40 },
                 ].map(t => (
                   <div key={t.id} style={{ background: 'white', borderRadius: '20px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid var(--border)' }}>
                      <div>
                         <div style={{ fontWeight: 800, fontSize: '15px' }}>{t.id}</div>
                         <div style={{ fontSize: '12px', color: 'var(--text-light)', fontWeight: 600 }}>{t.date}</div>
                      </div>
                      <div style={{ fontWeight: 900, color: 'var(--green-mid)', fontSize: '18px' }}>+${t.earn.toFixed(2)}</div>
                   </div>
                 ))}
              </div>
           </div>
         )}

         {activeTab === 'profile' && (
            <div className="fade-up" style={{ padding: '24px' }}>
               <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                  <div style={{ 
                    width: '100px', height: '100px', borderRadius: '50%', margin: '0 auto 20px',
                    border: '4px solid var(--gold)', padding: '4px'
                  }}>
                     <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: 'var(--green-mid)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '32px', fontWeight: 900 }}>SK</div>
                  </div>
                  <h2 style={{ fontSize: '24px', fontWeight: 900, color: 'var(--green-dark)' }}>Suresh Kumar</h2>
                  <p style={{ color: 'var(--text-light)', fontWeight: 600 }}>Rider ID: STM-DRV-7721</p>
               </div>

               <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    { icon: <User size={20} />, label: 'Personal Information' },
                    { icon: <ShieldCheck size={20} />, label: 'Vehicle Details (Yamaha Y15)' },
                    { icon: <CheckCircle size={20} />, label: 'Verified Accounts' },
                    { icon: <Clock size={20} />, label: 'Schedule & Availability' },
                    { icon: <X size={20} />, label: 'Log Out', color: 'var(--danger)' }
                  ].map(item => (
                    <button key={item.label} style={{ 
                      padding: '20px', background: 'white', borderRadius: '20px', border: '1px solid var(--border)',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer'
                    }}>
                       <div style={{ display: 'flex', gap: '16px', alignItems: 'center', color: item.color || 'var(--text-dark)' }}>
                          {item.icon}
                          <span style={{ fontWeight: 800 }}>{item.label}</span>
                       </div>
                       <ChevronRight size={18} color="var(--text-light)" />
                    </button>
                  ))}
               </div>
            </div>
         )}
      </main>

      {/* INCOMING JOB OVERLAY */}
      {showIncoming && (
        <div style={{ 
          position: 'absolute', inset: 0, background: 'rgba(10,61,46,0.9)', 
          zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' 
        }}>
           <div className="fade-up" style={{ 
             background: 'white', width: '100%', borderRadius: '40px', padding: '40px', textAlign: 'center',
             boxShadow: '0 40px 100px rgba(0,0,0,0.5)', border: '2px solid var(--gold)'
           }}>
              <div style={{ 
                width: '80px', height: '80px', background: 'var(--gold-tint)', color: 'var(--gold)',
                borderRadius: '24px', margin: '0 auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                 <Bell size={40} className="pulse-dot" />
              </div>
              <h2 style={{ fontSize: '28px', fontWeight: 900, color: 'var(--green-dark)', marginBottom: '8px' }}>New Job Nearby!</h2>
              <p style={{ color: 'var(--text-light)', fontWeight: 800, marginBottom: '32px' }}>Pick up in 1.2km • Reward $8.20</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                 <button onClick={acceptJob} style={{ 
                   width: '100%', padding: '20px', borderRadius: '20px', border: 'none',
                   background: 'var(--green-dark)', color: 'white', fontWeight: 900, fontSize: '18px',
                   cursor: 'pointer'
                 }}>Accept Job Request</button>
                 <button onClick={() => setShowIncoming(false)} style={{ 
                   width: '100%', padding: '16px', borderRadius: '20px', border: 'none',
                   background: 'var(--cream)', color: 'var(--danger)', fontWeight: 800, fontSize: '15px',
                   cursor: 'pointer'
                 }}>Decline</button>
              </div>
           </div>
        </div>
      )}

      {/* NAVIGATION BAR - Tab Style */}
      <nav style={{ 
        position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', 
        width: '100%', maxWidth: '480px', background: 'rgba(255,255,255,0.95)', 
        backdropFilter: 'blur(10px)', borderTop: '1px solid var(--border)', 
        padding: '12px 24px 30px', display: 'flex', justifyContent: 'space-around', zIndex: 500
      }}>
         {[
           { id: 'tasks', icon: <Navigation />, label: 'TASKS' },
           { id: 'earnings', icon: <Wallet />, label: 'EARNINGS' },
           { id: 'profile', icon: <User />, label: 'PROFILE' }
         ].map(tab => (
           <button 
             key={tab.id}
             onClick={() => setActiveTab(tab.id)}
             style={{ 
               background: 'none', border: 'none', cursor: 'pointer',
               display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
               color: activeTab === tab.id ? 'var(--green-dark)' : 'var(--text-light)',
               transition: '0.2s'
             }}
           >
             <div style={{ 
               padding: '8px', borderRadius: '14px', 
               background: activeTab === tab.id ? 'var(--gold-tint)' : 'transparent',
               transition: '0.2s'
             }}>
                {React.cloneElement(tab.icon, { size: 24, strokeWidth: activeTab === tab.id ? 2.5 : 2 })}
             </div>
             <span style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.5px' }}>{tab.label}</span>
           </button>
         ))}
      </nav>

      <style>{`
        .spin-slow { animation: spin 4s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .fade-up { animation: fadeUp 0.4s ease-out; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .pulse-dot { animation: pulse 2s infinite; }
        @keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.1); } 100% { transform: scale(1); } }
      `}</style>
    </div>
  )
}
