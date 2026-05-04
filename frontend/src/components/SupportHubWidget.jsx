import React, { useState, useMemo, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Sparkles, Users, Send, Bot } from 'lucide-react'
import { getSupportAiReply, AI_SUGGESTED_PROMPTS } from '../utils/supportAiReply'
import SupportLiveChat from './SupportLiveChat'
import { OPEN_SUPPORT_EVENT } from '../config/supportEvents'

function getOrCreateSupportConversationId() {
  try {
    let id = localStorage.getItem('stm_support_conv_id')
    if (!id) {
      id = `sc-${crypto.randomUUID()}`
      localStorage.setItem('stm_support_conv_id', id)
    }
    return id
  } catch {
    return `sc-${Date.now()}`
  }
}

/**
 * Floating hub: **AI Assistant** (local FAQ bot) + **Live team** (Firestore chat with admin).
 */
export default function SupportHubWidget() {
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState('ai')
  const convId = useMemo(() => getOrCreateSupportConversationId(), [])

  useEffect(() => {
    const onOpen = (e) => {
      setOpen(true)
      const t = e.detail?.tab
      if (t === 'ai' || t === 'team') setTab(t)
      else setTab('team')
    }
    window.addEventListener(OPEN_SUPPORT_EVENT, onOpen)
    return () => window.removeEventListener(OPEN_SUPPORT_EVENT, onOpen)
  }, [])

  const [aiMessages, setAiMessages] = useState(() => [
    {
      id: 'w',
      role: 'assistant',
      text: getSupportAiReply(''),
    },
  ])
  const [aiInput, setAiInput] = useState('')
  const aiScrollRef = useRef(null)

  useEffect(() => {
    if (aiScrollRef.current) {
      aiScrollRef.current.scrollTop = aiScrollRef.current.scrollHeight
    }
  }, [aiMessages, open, tab])

  const sendAi = (text) => {
    const trimmed = (text || '').trim()
    if (!trimmed) return
    const userMsg = { id: `u-${Date.now()}`, role: 'user', text: trimmed }
    const reply = { id: `a-${Date.now()}`, role: 'assistant', text: getSupportAiReply(trimmed) }
    setAiMessages((prev) => [...prev, userMsg, reply])
    setAiInput('')
  }

  return (
    <>
      <motion.button
        type="button"
        aria-label="Open help & chat"
        onClick={() => setOpen(true)}
        style={{
          position: 'fixed',
          bottom: 30,
          left: 30,
          width: 56,
          height: 56,
          borderRadius: '50%',
          border: 'none',
          background: 'linear-gradient(135deg, #013220 0%, #056a48 100%)',
          color: 'white',
          boxShadow: '0 10px 30px rgba(1,50,32,0.35)',
          zIndex: 9992,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
      >
        <MessageCircle size={26} strokeWidth={2.2} />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            style={{
              position: 'fixed',
              bottom: 100,
              left: 20,
              width: 'min(400px, calc(100vw - 32px))',
              height: 'min(560px, calc(100vh - 140px))',
              background: 'white',
              borderRadius: 24,
              boxShadow: '0 25px 60px rgba(0,0,0,0.18)',
              zIndex: 9993,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              border: '1px solid #e2e8f0',
            }}
          >
            <div
              style={{
                padding: '16px 18px',
                background: 'var(--green-dark)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 12,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    background: 'rgba(255,255,255,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Bot size={22} />
                </div>
                <div>
                  <div style={{ fontWeight: 900, fontSize: 15 }}>STM Help</div>
                  <div style={{ fontSize: 11, opacity: 0.85, fontWeight: 600 }}>AI answers · Live team</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: 8 }}
              >
                <X size={22} />
              </button>
            </div>

            <div style={{ display: 'flex', padding: '10px 12px', gap: 8, background: '#f1f5f9' }}>
              <button
                type="button"
                onClick={() => setTab('ai')}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                  padding: '10px 12px',
                  borderRadius: 14,
                  border: 'none',
                  fontWeight: 800,
                  fontSize: 13,
                  cursor: 'pointer',
                  background: tab === 'ai' ? 'white' : 'transparent',
                  color: tab === 'ai' ? 'var(--green-dark)' : '#64748b',
                  boxShadow: tab === 'ai' ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
                }}
              >
                <Sparkles size={16} /> AI assistant
              </button>
              <button
                type="button"
                onClick={() => setTab('team')}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                  padding: '10px 12px',
                  borderRadius: 14,
                  border: 'none',
                  fontWeight: 800,
                  fontSize: 13,
                  cursor: 'pointer',
                  background: tab === 'team' ? 'white' : 'transparent',
                  color: tab === 'team' ? 'var(--green-dark)' : '#64748b',
                  boxShadow: tab === 'team' ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
                }}
              >
                <Users size={16} /> Live team
              </button>
            </div>

            {tab === 'ai' && (
              <>
                <div
                  ref={aiScrollRef}
                  style={{
                    flex: 1,
                    overflowY: 'auto',
                    padding: '14px 16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 12,
                    background: '#fafafa',
                  }}
                >
                  {aiMessages.map((m) => (
                    <div
                      key={m.id}
                      style={{
                        alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                        maxWidth: '92%',
                      }}
                    >
                      <div
                        style={{
                          padding: '12px 14px',
                          borderRadius: m.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                          background: m.role === 'user' ? 'var(--green-dark)' : 'white',
                          color: m.role === 'user' ? 'white' : '#0f172a',
                          fontSize: 13,
                          lineHeight: 1.5,
                          fontWeight: 600,
                          whiteSpace: 'pre-wrap',
                          border: m.role === 'user' ? 'none' : '1px solid #e2e8f0',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                        }}
                      >
                        {m.text.split('**').map((part, i) =>
                          i % 2 === 1 ? (
                            <strong key={i}>{part}</strong>
                          ) : (
                            <span key={i}>{part}</span>
                          )
                        )}
                      </div>
                      <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 4, fontWeight: 700 }}>
                        {m.role === 'user' ? 'You' : 'AI assistant'}
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ padding: '8px 12px 4px', display: 'flex', flexWrap: 'wrap', gap: 6, background: '#fafafa' }}>
                  {AI_SUGGESTED_PROMPTS.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => sendAi(p)}
                      style={{
                        fontSize: 11,
                        fontWeight: 800,
                        padding: '6px 10px',
                        borderRadius: 999,
                        border: '1px solid #cbd5e1',
                        background: 'white',
                        color: '#475569',
                        cursor: 'pointer',
                      }}
                    >
                      {p}
                    </button>
                  ))}
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    sendAi(aiInput)
                  }}
                  style={{
                    padding: 12,
                    display: 'flex',
                    gap: 8,
                    borderTop: '1px solid #e2e8f0',
                    background: 'white',
                  }}
                >
                  <input
                    value={aiInput}
                    onChange={(e) => setAiInput(e.target.value)}
                    placeholder="Ask the assistant…"
                    style={{
                      flex: 1,
                      padding: '12px 14px',
                      borderRadius: 14,
                      border: '1.5px solid #e2e8f0',
                      fontSize: 14,
                      fontWeight: 600,
                    }}
                  />
                  <button
                    type="submit"
                    disabled={!aiInput.trim()}
                    style={{
                      width: 46,
                      height: 46,
                      borderRadius: 14,
                      border: 'none',
                      background: 'var(--green-dark)',
                      color: 'white',
                      cursor: aiInput.trim() ? 'pointer' : 'not-allowed',
                      opacity: aiInput.trim() ? 1 : 0.5,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Send size={18} />
                  </button>
                </form>
              </>
            )}

            {tab === 'team' && (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
                <div style={{ fontSize: 11, color: '#64748b', padding: '8px 14px', fontWeight: 700, background: '#fffbeb', borderBottom: '1px solid #fde68a' }}>
                  Thread ID: <code style={{ fontSize: 10 }}>{convId.slice(0, 18)}…</code> — staff reply from Admin → Support.
                </div>
                <SupportLiveChat conversationId={convId} role="customer" />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
