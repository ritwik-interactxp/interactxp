'use client'
import { useRef, useEffect } from 'react'
import { BotMessage } from './types'
import { MsgLine } from './MsgLine'

interface Props {
  messages: BotMessage[]
  typing: boolean
  onAction: (a: string) => void
}

export function WhatsAppPhone({ messages, typing, onAction }: Props) {
  const chatRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight
  }, [messages, typing])

  return (
    <div style={{ width: '100%', maxWidth: 380, margin: '0 auto', borderRadius: 24, overflow: 'hidden', boxShadow: '0 24px 80px rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.06)', background: '#0b141a' }}>
      {/* Header */}
      <div style={{ background: '#202c33', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ color: '#8696a0', fontSize: 18 }}>←</span>
        <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg,#25D366,#128C7E)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14, color: 'white' }}>R</div>
        <div style={{ flex: 1 }}>
          <div style={{ color: '#e9edef', fontWeight: 600, fontSize: 14, lineHeight: 1.2 }}>Relay</div>
          <div style={{ color: '#8696a0', fontSize: 11 }}>Business Account · online</div>
        </div>
        <div style={{ display: 'flex', gap: 16, color: '#aebac1' }}>
          <span style={{ fontSize: 16 }}>📹</span>
          <span style={{ fontSize: 16 }}>📞</span>
          <span style={{ fontSize: 16 }}>⋮</span>
        </div>
      </div>

      {/* Messages */}
      <div ref={chatRef} style={{ height: 380, overflowY: 'auto', padding: '12px 10px', background: '#0b141a', display: 'flex', flexDirection: 'column', gap: 2 }}>
        <div style={{ textAlign: 'center', marginBottom: 8 }}>
          <span style={{ fontSize: 11, color: '#8696a0', background: 'rgba(11,20,26,0.8)', padding: '3px 10px', borderRadius: 10 }}>Today</span>
        </div>

        {messages.map((msg) => {
          const isUser = msg.from === 'user'
          const isCustomer = msg.from === 'customer'
          return (
            <div key={msg.id} style={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start', marginBottom: 4, animation: 'msgSlide 0.25s ease' }}>
              <div style={{ maxWidth: '78%' }}>
                <div style={{ background: isUser ? '#005c4b' : '#202c33', borderRadius: isUser ? '12px 12px 2px 12px' : '2px 12px 12px 12px', padding: '7px 10px' }}>
                  {!isUser && <div style={{ fontSize: 11, color: '#00a884', marginBottom: 3, fontWeight: 700 }}>Relay{isCustomer ? ' · Visitor' : ''}</div>}
                  {msg.lines && (
                    <div style={{ fontSize: 13, color: '#e9edef' }}>
                      {msg.lines.map((line, j) => <MsgLine key={j} line={line} />)}
                    </div>
                  )}
                  {msg.text && <div style={{ fontSize: 13, color: '#e9edef' }}>{msg.text}</div>}
                  <div style={{ fontSize: 10, color: '#8696a0', textAlign: 'right', marginTop: 3, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 3 }}>
                    {msg.time}{isUser && <span style={{ color: '#53bdeb', fontSize: 11 }}>✓✓</span>}
                  </div>
                </div>
                {msg.buttons && (
                  <div style={{ marginTop: 2, borderRadius: '0 0 10px 10px', overflow: 'hidden', border: '1px solid rgba(42,58,72,0.8)', borderTop: 'none' }}>
                    {msg.buttons.map((btn, j) => (
                      <button key={j} onClick={() => onAction(btn.action)} style={{ display: 'block', width: '100%', padding: '10px', background: '#202c33', border: 'none', borderTop: j > 0 ? '1px solid rgba(42,58,72,0.8)' : 'none', color: '#00a884', fontSize: 13, cursor: 'pointer', fontWeight: 600, textAlign: 'center' }}>
                        {btn.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )
        })}

        {typing && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
            <div style={{ background: '#202c33', borderRadius: '2px 12px 12px 12px', padding: '10px 14px', display: 'flex', gap: 4, alignItems: 'center' }}>
              {[0, 1, 2].map(i => <div key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: '#00a884', animation: `typingDot 1.2s ease-in-out ${i * 0.2}s infinite` }} />)}
            </div>
          </div>
        )}
      </div>

      {/* Input bar */}
      <div style={{ background: '#202c33', padding: '8px 10px 12px', display: 'flex', gap: 8, alignItems: 'center' }}>
        <div style={{ flex: 1, background: '#2a3942', borderRadius: 20, padding: '9px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 18, color: '#8696a0' }}>🙂</span>
          <span style={{ color: '#8696a0', fontSize: 13 }}>Buttons-only mode: tap above</span>
        </div>
        <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#00a884', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🎤</div>
      </div>
    </div>
  )
}
