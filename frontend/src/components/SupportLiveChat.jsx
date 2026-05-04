import React, { useState, useEffect, useRef } from 'react'
import { Send, Clock, User, ShieldCheck } from 'lucide-react'
import { subscribeSupportChatMessages, sendSupportChatMessage } from '../admin/services/dataService'

/**
 * Real-time support thread: `support_chats/{conversationId}/messages`
 * role: 'customer' | 'admin' — controls bubble alignment and label.
 */
export default function SupportLiveChat({ conversationId, role = 'customer' }) {
  const [messages, setMessages] = useState([])
  const [inputText, setInputText] = useState('')
  const [sending, setSending] = useState(false)
  const scrollRef = useRef(null)

  useEffect(() => {
    if (!conversationId) return
    const unsub = subscribeSupportChatMessages(conversationId, setMessages)
    return () => unsub()
  }, [conversationId])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = async (e) => {
    e.preventDefault()
    if (!inputText.trim() || sending || !conversationId) return
    setSending(true)
    try {
      await sendSupportChatMessage(conversationId, {
        text: inputText.trim(),
        senderRole: role,
      })
      setInputText('')
    } catch (err) {
      console.error('Support chat send failed:', err)
      alert('Could not send message. Check your connection or try again.')
    } finally {
      setSending(false)
    }
  }

  const partnerLabel = role === 'admin' ? 'Customer' : 'STM team'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 280, background: '#f8fafc' }}>
      <div
        ref={scrollRef}
        style={{
          flex: 1,
          padding: '16px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        {messages.length === 0 ? (
          <div style={{ margin: 'auto', textAlign: 'center', padding: '16px', maxWidth: 280 }}>
            <div style={{ fontWeight: 900, color: 'var(--green-dark)', marginBottom: 8, fontSize: 14 }}>
              {role === 'customer' ? 'Message the team' : 'Reply to customer'}
            </div>
            <p style={{ fontSize: 12, color: '#64748b', lineHeight: 1.5, fontWeight: 600 }}>
              {role === 'customer'
                ? 'Staff see this inbox in Admin → Support. Replies appear here in real time.'
                : 'Your messages appear on the customer’s screen instantly.'}
            </p>
          </div>
        ) : (
          messages.map((msg) => {
            const isBot = msg.senderRole === 'bot'
            const isMe = msg.senderRole === role
            return (
              <div
                key={msg.id}
                style={{
                  alignSelf: isMe ? 'flex-end' : 'flex-start',
                  maxWidth: '88%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: isMe ? 'flex-end' : 'flex-start',
                }}
              >
                <div
                  style={{
                    padding: '10px 14px',
                    borderRadius: isMe ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                    background: isMe ? 'var(--green-dark)' : isBot ? '#fffbeb' : 'white',
                    color: isMe ? 'white' : isBot ? '#78350f' : '#0f172a',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    border: isMe ? 'none' : `1px solid ${isBot ? '#fde68a' : '#e2e8f0'}`,
                    fontSize: 14,
                    lineHeight: 1.45,
                    fontWeight: 600,
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {msg.text}
                </div>
                <div
                  style={{
                    marginTop: 4,
                    fontSize: 10,
                    color: '#94a3b8',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  {isMe ? (role === 'admin' ? <ShieldCheck size={10} /> : <User size={10} />) : isBot ? null : <User size={10} />}
                  {isMe ? 'You' : isBot ? 'Auto-reply' : partnerLabel}
                  <Clock size={10} />
                  {msg.createdAt?.toDate
                    ? msg.createdAt.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    : msg.createdAt
                      ? new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                      : ''}
                </div>
              </div>
            )
          })
        )}
      </div>

      <form
        onSubmit={handleSend}
        style={{
          padding: '12px 14px',
          background: 'white',
          borderTop: '1px solid #e2e8f0',
          display: 'flex',
          gap: 8,
          alignItems: 'center',
        }}
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={role === 'customer' ? 'Message the team…' : 'Reply…'}
          style={{
            flex: 1,
            padding: '12px 14px',
            borderRadius: 12,
            border: '1.5px solid #e2e8f0',
            background: '#f8fafc',
            fontSize: 14,
            outline: 'none',
            fontWeight: 600,
          }}
        />
        <button
          type="submit"
          disabled={!inputText.trim() || sending}
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: 'var(--green-dark)',
            color: 'white',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: !inputText.trim() || sending ? 'not-allowed' : 'pointer',
            opacity: !inputText.trim() || sending ? 0.55 : 1,
          }}
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  )
}
