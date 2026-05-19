'use client'
import { useRef, useEffect } from 'react'
import { BotMessage } from './types'
import { MsgLine } from './MsgLine'

interface Props {
  messages: BotMessage[]
  typing: boolean
  onAction: (a: string) => void
  onSend: (e: React.FormEvent) => void
  cmdInput: string
  setCmdInput: (v: string) => void
  role?: string
}

export function TelegramPhone({ messages, typing, onAction, onSend, cmdInput, setCmdInput, role }: Props) {
  const chatRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight
  }, [messages, typing])

  const quickCmds = role === 'enterprise'
    ? ['/salesforce', '/stripe', '/jira', '/compile']
    : ['/today', '/orders', '/week', '/help']

  return (
    <div style={{ width: '100%', maxWidth: 380, margin: '0 auto', borderRadius: 24, overflow: 'hidden', boxShadow: '0 24px 80px rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.06)', background: '#0e1621' }}>
      {/* Header */}
      <div style={{ background: '#17212b', padding: '10px 16px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', overflow: 'hidden', flexShrink: 0, background: 'linear-gradient(135deg,#22d3ee,#0ea5e9)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14, color: '#050d1a' }}>
            R
          </div>
          <div>
            <div style={{ color: 'white', fontWeight: 600, fontSize: 14, lineHeight: 1.2 }}>Relay Bot</div>
            <div style={{ color: '#22d3ee', fontSize: 11, display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22d3ee', display: 'inline-block', animation: 'pulse 2s infinite' }} />
              online
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 14, color: '#4a7a96' }}>
          <span style={{ fontSize: 16 }}>🔍</span>
          <span style={{ fontSize: 16 }}>⋮</span>
        </div>
      </div>

      {/* Messages */}
      <div ref={chatRef} style={{ height: 360, overflowY: 'auto', padding: '12px 10px', background: '#0e1621', display: 'flex', flexDirection: 'column', gap: 2 }}>
        <div style={{ textAlign: 'center', marginBottom: 8 }}>
          <span style={{ fontSize: 11, color: '#4a7a96', background: 'rgba(255,255,255,0.05)', padding: '3px 10px', borderRadius: 10 }}>Today</span>
        </div>

        {messages.map((msg) => {
          const isUser = msg.from === 'user'
          const isCustomer = msg.from === 'customer'
          return (
            <div key={msg.id} style={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start', marginBottom: 4, animation: 'msgSlide 0.25s ease' }}>
              {!isUser && (
                <div style={{ width: 26, height: 26, borderRadius: '50%', background: isCustomer ? '#2d4a5e' : 'linear-gradient(135deg,#22d3ee,#0ea5e9)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: isCustomer ? 11 : 12, marginRight: 5, flexShrink: 0, alignSelf: 'flex-end', fontWeight: 700, color: '#050d1a' }}>
                  {isCustomer ? '👤' : 'R'}
                </div>
              )}
              <div style={{ maxWidth: '78%' }}>
                <div style={{ background: isUser ? '#2b5278' : '#182533', borderRadius: isUser ? '12px 12px 2px 12px' : '2px 12px 12px 12px', padding: '7px 10px', boxShadow: '0 1px 3px rgba(0,0,0,0.25)' }}>
                  {isCustomer && <div style={{ fontSize: 10, color: '#22d3ee', marginBottom: 3, fontWeight: 700, letterSpacing: 0.5 }}>VISITOR · WEBSITE</div>}
                  {msg.lines && (
                    <div style={{ fontSize: 13, color: '#e2e8f0' }}>
                      {msg.lines.map((line, j) => <MsgLine key={j} line={line} />)}
                    </div>
                  )}
                  {msg.text && <div style={{ fontSize: 13, color: '#e2e8f0' }}>{msg.text}</div>}
                  <div style={{ fontSize: 10, color: '#4a7a96', textAlign: 'right', marginTop: 3, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 3 }}>
                    {msg.time}{isUser && <span style={{ color: '#22d3ee', fontSize: 11 }}>✓✓</span>}
                  </div>
                </div>
                {msg.buttons && msg.buttons.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3, marginTop: 4 }}>
                    {msg.buttons.map((btn, j) => (
                      <button key={j} onClick={() => onAction(btn.action)} style={{ padding: '5px 10px', borderRadius: 6, border: '1px solid #2b5278', background: 'rgba(34,211,238,0.06)', color: '#22d3ee', fontSize: 11, cursor: 'pointer', fontWeight: 600 }}>
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
            <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'linear-gradient(135deg,#22d3ee,#0ea5e9)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#050d1a' }}>R</div>
            <div style={{ background: '#182533', borderRadius: '2px 12px 12px 12px', padding: '10px 14px', display: 'flex', gap: 4, alignItems: 'center' }}>
              {[0, 1, 2].map(i => <div key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: '#22d3ee', animation: `typingDot 1.2s ease-in-out ${i * 0.2}s infinite` }} />)}
            </div>
          </div>
        )}
      </div>

      {/* Quick commands */}
      <div style={{ background: '#17212b', padding: '6px 10px', display: 'flex', gap: 4, overflowX: 'auto' }}>
        {quickCmds.map(cmd => (
          <button key={cmd} onClick={() => setCmdInput(cmd)} style={{ padding: '3px 10px', borderRadius: 12, border: '1px solid #2b4055', background: 'transparent', color: '#4a7a96', fontSize: 11, cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'monospace', flexShrink: 0 }}>
            {cmd}
          </button>
        ))}
      </div>

      {/* Input */}
      <form onSubmit={onSend} style={{ background: '#17212b', padding: '8px 10px 12px', display: 'flex', gap: 8, alignItems: 'center' }}>
        <div style={{ flex: 1, background: '#242f3d', borderRadius: 20, padding: '8px 14px', display: 'flex', alignItems: 'center' }}>
          <input
            value={cmdInput}
            onChange={e => setCmdInput(e.target.value)}
            placeholder="Type a command…"
            style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#e2e8f0', fontSize: 13, fontFamily: 'system-ui' }}
          />
        </div>
        <button type="submit" disabled={!cmdInput.trim()} style={{ width: 36, height: 36, borderRadius: '50%', border: 'none', background: cmdInput.trim() ? '#2AABEE' : '#242f3d', color: 'white', cursor: cmdInput.trim() ? 'pointer' : 'default', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          ➤
        </button>
      </form>
    </div>
  )
}
