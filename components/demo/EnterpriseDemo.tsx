'use client'
import { useState, useRef, useEffect, useCallback } from 'react'
import { BotMessage, fmtTime, uid } from './types'
import { MsgLine } from './MsgLine'
import {
  DASHBOARDS, DashboardId, Dashboard,
  makeTeamsWelcome, makeSingleSourceMsg, makeCompileMsg, makeHelpMsg,
} from './enterpriseMsgs'

// ─── Data Table renderer ──────────────────────────────────────────────────────
function DataTable({ tables }: { tables: NonNullable<BotMessage['table']> }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 6 }}>
      {tables.map((t, ti) => (
        <div key={ti}>
          {t.source && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
              <div style={{ width: 3, height: 14, borderRadius: 2, background: t.sourceColor || '#6264A7', flexShrink: 0 }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: t.sourceColor || '#6264A7', letterSpacing: 0.5, textTransform: 'uppercase' }}>{t.source}</span>
            </div>
          )}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
              <thead>
                <tr>
                  {t.headers.map((h, i) => (
                    <th key={i} style={{ padding: '5px 10px', textAlign: 'left', background: 'rgba(98,100,167,0.12)', color: '#a0a3c4', fontWeight: 600, fontSize: 11, letterSpacing: 0.3, whiteSpace: 'nowrap', borderBottom: '1px solid rgba(98,100,167,0.2)' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {t.rows.map((row, ri) => (
                  <tr key={ri} style={{ background: ri % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}>
                    {row.map((cell, ci) => (
                      <td key={ci} style={{
                        padding: '5px 10px',
                        color: ci === 0 ? '#c8cad8' : cell.startsWith('▲') ? '#4ade80' : cell.startsWith('▼') ? '#f87171' : cell.startsWith('🔴') ? '#f87171' : cell.startsWith('⚠️') ? '#fbbf24' : cell.startsWith('🟢') ? '#4ade80' : '#e2e8f0',
                        fontWeight: ci === 0 ? 500 : 400,
                        fontSize: 12,
                        borderBottom: '1px solid rgba(255,255,255,0.04)',
                        whiteSpace: 'nowrap',
                      }}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── Single Teams message bubble ─────────────────────────────────────────────
function TeamsBubble({ msg, accentColor }: { msg: BotMessage; accentColor: string }) {
  const isUser = msg.from === 'user'
  return (
    <div style={{ display: 'flex', gap: 8, marginBottom: 12, animation: 'msgSlide 0.25s ease', flexDirection: isUser ? 'row-reverse' : 'row' }}>
      {!isUser && (
        <div style={{ width: 32, height: 32, borderRadius: 4, background: 'linear-gradient(135deg,#6264A7,#464775)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, color: 'white', flexShrink: 0, alignSelf: 'flex-start', marginTop: 2 }}>
          R
        </div>
      )}
      <div style={{ maxWidth: isUser ? '60%' : '85%' }}>
        {!isUser && (
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 3 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#e2e8f0' }}>Relay</span>
            <span style={{ fontSize: 10, color: '#6b7280' }}>{msg.time}</span>
          </div>
        )}
        <div style={{
          background: isUser ? '#464775' : 'rgba(255,255,255,0.04)',
          border: isUser ? 'none' : '1px solid rgba(255,255,255,0.06)',
          borderRadius: isUser ? '12px 2px 12px 12px' : '2px 12px 12px 12px',
          padding: '9px 12px',
        }}>
          {msg.lines && (
            <div style={{ fontSize: 13, color: '#e2e8f0' }}>
              {msg.lines.map((line, j) => <MsgLine key={j} line={line} />)}
            </div>
          )}
          {msg.text && <div style={{ fontSize: 13, color: '#e2e8f0' }}>{msg.text}</div>}
          {msg.table && msg.table.length > 0 && <DataTable tables={msg.table} />}
          {isUser && (
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', textAlign: 'right', marginTop: 3 }}>{msg.time}</div>
          )}
        </div>
        {msg.buttons && msg.buttons.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 6 }}>
            {msg.buttons.map((btn, j) => (
              <button
                key={j}
                data-action={btn.action}
                style={{ padding: '5px 12px', borderRadius: 4, border: '1px solid rgba(98,100,167,0.4)', background: 'rgba(98,100,167,0.1)', color: '#a0a3c4', fontSize: 12, cursor: 'pointer', fontWeight: 500, transition: 'all 0.15s' }}
              >
                {btn.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Onboarding Panel ─────────────────────────────────────────────────────────
function OnboardingPanel({ connected, onToggle, onConfirm }: {
  connected: DashboardId[]
  onToggle: (id: DashboardId) => void
  onConfirm: () => void
}) {
  const categories = Array.from(new Set(DASHBOARDS.map(d => d.category)))
  return (
    <div style={{ background: '#1e1f2e', border: '1px solid rgba(98,100,167,0.2)', borderRadius: 16, padding: 24 }}>
      <div style={{ marginBottom: 20 }}>
        <h3 style={{ color: 'white', fontSize: 18, fontWeight: 700, margin: '0 0 6px', fontFamily: 'var(--font-display,system-ui)' }}>Connect your dashboards</h3>
        <p style={{ color: '#6b7280', fontSize: 13, margin: 0, lineHeight: 1.6 }}>
          Relay will pull live data from every source you connect. You can change this at any time.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 10, marginBottom: 24 }}>
        {DASHBOARDS.map(d => {
          const isOn = connected.includes(d.id)
          return (
            <div
              key={d.id}
              onClick={() => onToggle(d.id)}
              style={{
                background: isOn ? 'rgba(98,100,167,0.12)' : 'rgba(255,255,255,0.02)',
                border: `1px solid ${isOn ? 'rgba(98,100,167,0.5)' : 'rgba(255,255,255,0.07)'}`,
                borderRadius: 12,
                padding: '14px 16px',
                cursor: 'pointer',
                display: 'flex',
                gap: 12,
                alignItems: 'center',
                transition: 'all 0.18s',
              }}
            >
              <div style={{ width: 40, height: 40, borderRadius: 10, background: `${d.color}18`, border: `1px solid ${d.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
                {d.icon}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ color: isOn ? 'white' : '#9ca3af', fontWeight: 600, fontSize: 13, marginBottom: 2 }}>{d.name}</div>
                <div style={{ color: '#4b5563', fontSize: 11 }}>{d.description}</div>
              </div>
              <div style={{ width: 20, height: 20, borderRadius: '50%', border: `2px solid ${isOn ? '#6264A7' : '#374151'}`, background: isOn ? '#6264A7' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.18s' }}>
                {isOn && <span style={{ color: 'white', fontSize: 11, fontWeight: 700 }}>✓</span>}
              </div>
            </div>
          )
        })}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ color: '#6b7280', fontSize: 13 }}>
          {connected.length} source{connected.length !== 1 ? 's' : ''} selected
        </span>
        <button
          onClick={onConfirm}
          disabled={connected.length === 0}
          style={{
            padding: '10px 28px',
            borderRadius: 8,
            border: 'none',
            background: connected.length > 0 ? 'linear-gradient(135deg,#6264A7,#464775)' : 'rgba(255,255,255,0.05)',
            color: connected.length > 0 ? 'white' : '#4b5563',
            fontSize: 14,
            fontWeight: 600,
            cursor: connected.length > 0 ? 'pointer' : 'not-allowed',
            transition: 'all 0.2s',
          }}
        >
          Launch Bot →
        </button>
      </div>
    </div>
  )
}

// ─── Teams Window Frame ───────────────────────────────────────────────────────
export function TeamsWindow({
  messages,
  typing,
  connected,
  onboarded,
  onAction,
  onSend,
  cmdInput,
  setCmdInput,
}: {
  messages: BotMessage[]
  typing: boolean
  connected: DashboardId[]
  onboarded: boolean
  onAction: (a: string) => void
  onSend: (e: React.FormEvent) => void
  cmdInput: string
  setCmdInput: (v: string) => void
}) {
  const chatRef = useRef<HTMLDivElement>(null)
  const [activeNav, setActiveNav] = useState<'chat' | 'files' | 'apps'>('chat')

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight
  }, [messages, typing])

  // Intercept button clicks via event delegation
  function handleBubbleClick(e: React.MouseEvent) {
    const btn = (e.target as HTMLElement).closest('[data-action]')
    if (btn) {
      const action = (btn as HTMLElement).dataset.action
      if (action) onAction(action)
    }
  }

  const quickCmds = connected.length > 0
    ? [
        ...connected.slice(0, 3).map(id => `/${id}`),
        '/compile',
      ]
    : ['/help']

  return (
    <div style={{ width: '100%', maxWidth: 560, borderRadius: 12, overflow: 'hidden', boxShadow: '0 24px 80px rgba(0,0,0,0.7)', border: '1px solid rgba(255,255,255,0.08)', background: '#1b1c2e', display: 'flex', flexDirection: 'column' }}>

      {/* Window chrome */}
      <div style={{ background: '#16172a', padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ display: 'flex', gap: 5 }}>
          {['#ef4444', '#f59e0b', '#22c55e'].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c, opacity: 0.7 }} />)}
        </div>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.04)', borderRadius: 6, padding: '3px 12px', fontSize: 12, color: '#6b7280' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M20 7H4a2 2 0 00-2 2v9a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" stroke="#6264A7" strokeWidth="2" strokeLinecap="round"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" stroke="#6264A7" strokeWidth="2" strokeLinecap="round"/></svg>
            Microsoft Teams · Relay Bot
          </div>
        </div>
      </div>

      {/* Teams sidebar + content */}
      <div style={{ display: 'flex', flex: 1 }}>

        {/* Left icon rail */}
        <div style={{ width: 52, background: '#16172a', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '12px 0', gap: 4, borderRight: '1px solid rgba(255,255,255,0.05)' }}>
          {[
            { id: 'chat', icon: '💬', label: 'Chat' },
            { id: 'files', icon: '📁', label: 'Files' },
            { id: 'apps', icon: '⚡', label: 'Apps' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id as typeof activeNav)}
              title={item.label}
              style={{ width: 36, height: 36, borderRadius: 8, border: 'none', background: activeNav === item.id ? 'rgba(98,100,167,0.2)' : 'transparent', fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s' }}
            >
              {item.icon}
            </button>
          ))}
          <div style={{ flex: 1 }} />
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg,#6264A7,#464775)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: 'white' }}>
            Y
          </div>
        </div>

        {/* Channel sidebar */}
        <div style={{ width: 160, background: '#1b1c2e', borderRight: '1px solid rgba(255,255,255,0.05)', padding: '12px 0', overflow: 'hidden' }}>
          <div style={{ padding: '0 12px', marginBottom: 8 }}>
            <div style={{ fontSize: 11, color: '#4b5563', fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 8 }}>Direct</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 8px', borderRadius: 6, background: 'rgba(98,100,167,0.15)' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', flexShrink: 0 }} />
              <span style={{ fontSize: 12, color: 'white', fontWeight: 500, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>Relay Bot</span>
            </div>
          </div>
          <div style={{ padding: '0 12px', marginTop: 12 }}>
            <div style={{ fontSize: 11, color: '#4b5563', fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 8 }}>Channels</div>
            {['#general', '#alerts', '#dev'].map((ch, i) => (
              <div key={ch} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 8px', borderRadius: 6, marginBottom: 2, opacity: i === 0 ? 0.6 : 0.3 }}>
                <span style={{ fontSize: 12, color: '#6b7280', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{ch}</span>
              </div>
            ))}
          </div>
          {connected.length > 0 && (
            <div style={{ padding: '12px 12px 0' }}>
              <div style={{ fontSize: 11, color: '#4b5563', fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 8 }}>Sources</div>
              {connected.map(id => {
                const d = DASHBOARDS.find(d => d.id === id)!
                return (
                  <div key={id} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '3px 8px', borderRadius: 4, marginBottom: 2 }}>
                    <span style={{ fontSize: 11 }}>{d.icon}</span>
                    <span style={{ fontSize: 11, color: '#6b7280', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{d.name}</span>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Main chat area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          {/* Channel header */}
          <div style={{ background: '#1b1c2e', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '8px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 24, height: 24, borderRadius: 4, background: 'linear-gradient(135deg,#6264A7,#464775)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: 'white' }}>R</div>
              <div>
                <span style={{ color: 'white', fontWeight: 600, fontSize: 13 }}>Relay Bot</span>
                <span style={{ color: '#4ade80', fontSize: 10, marginLeft: 6 }}>● online</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, color: '#4b5563', fontSize: 14 }}>
              <span>🔍</span><span>⋮</span>
            </div>
          </div>

          {/* Messages */}
          <div ref={chatRef} onClick={handleBubbleClick} style={{ flex: 1, overflowY: 'auto', padding: '14px 14px 4px', display: 'flex', flexDirection: 'column', minHeight: 320, maxHeight: 400 }}>
            {messages.length === 0 && (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#4b5563', fontSize: 13, gap: 6 }}>
                <div style={{ fontSize: 32, opacity: 0.3 }}>💬</div>
                <span>Connect sources and launch the bot to start</span>
              </div>
            )}
            {messages.map(msg => <TeamsBubble key={msg.id} msg={msg} accentColor="#6264A7" />)}
            {typing && (
              <div style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'flex-start' }}>
                <div style={{ width: 32, height: 32, borderRadius: 4, background: 'linear-gradient(135deg,#6264A7,#464775)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, color: 'white', flexShrink: 0 }}>R</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#e2e8f0', marginBottom: 3 }}>Relay <span style={{ fontSize: 10, color: '#6b7280', fontWeight: 400 }}>{fmtTime()}</span></div>
                  <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '2px 12px 12px 12px', padding: '10px 14px', display: 'flex', gap: 4 }}>
                    {[0, 1, 2].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: '#6264A7', animation: `typingDot 1.2s ease-in-out ${i * 0.2}s infinite` }} />)}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick cmds */}
          {onboarded && (
            <div style={{ padding: '4px 14px', display: 'flex', gap: 4, overflowX: 'auto', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
              {quickCmds.map(cmd => (
                <button key={cmd} onClick={() => setCmdInput(cmd)} style={{ padding: '3px 10px', borderRadius: 12, border: '1px solid rgba(98,100,167,0.3)', background: 'transparent', color: '#6264A7', fontSize: 11, cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'monospace', flexShrink: 0 }}>
                  {cmd}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form onSubmit={onSend} style={{ padding: '8px 14px 12px', display: 'flex', gap: 8, alignItems: 'center' }}>
            <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ color: '#4b5563', fontSize: 14 }}>+</span>
              <input
                value={cmdInput}
                onChange={e => setCmdInput(e.target.value)}
                placeholder={onboarded ? 'Type a command… e.g. /compile' : 'Connect sources above to begin'}
                disabled={!onboarded}
                style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#e2e8f0', fontSize: 13, fontFamily: 'system-ui' }}
              />
            </div>
            <button type="submit" disabled={!cmdInput.trim() || !onboarded} style={{ width: 34, height: 34, borderRadius: 6, border: 'none', background: cmdInput.trim() && onboarded ? '#6264A7' : 'rgba(255,255,255,0.05)', color: 'white', cursor: cmdInput.trim() && onboarded ? 'pointer' : 'default', fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.2s' }}>
              ➤
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

// ─── Full Enterprise Demo ─────────────────────────────────────────────────────
export function EnterpriseDemo() {
  const [onboarded, setOnboarded] = useState(false)
  const [connected, setConnected] = useState<DashboardId[]>(['salesforce', 'analytics', 'stripe'])
  const [messages, setMessages] = useState<BotMessage[]>([])
  const [typing, setTyping] = useState(false)
  const [cmdInput, setCmdInput] = useState('')
  const [activeTab, setActiveTab] = useState<'onboard' | 'bot' | 'preview'>('onboard')

  const addBotMessage = useCallback((msg: BotMessage) => {
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMessages(prev => [...prev, msg])
    }, 600 + Math.random() * 400)
  }, [])

  function handleToggle(id: DashboardId) {
    setConnected(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  function handleLaunch() {
    setOnboarded(true)
    setActiveTab('bot')
    setMessages([])
    setTimeout(() => addBotMessage(makeTeamsWelcome(connected)), 300)
  }

  function handleAction(action: string) {
    if (!onboarded) return
    const userMsg: BotMessage = { id: uid(), from: 'user', text: action, time: fmtTime() }
    setMessages(prev => [...prev, userMsg])

    if (action === '/compile') {
      addBotMessage(makeCompileMsg(connected))
    } else if (action === '/help') {
      addBotMessage(makeHelpMsg(connected))
    } else {
      const id = action.slice(1) as DashboardId
      if (connected.includes(id)) {
        addBotMessage(makeSingleSourceMsg(id))
      } else {
        addBotMessage({
          id: uid(), from: 'bot', time: fmtTime(),
          lines: [
            { text: '⛔ Source not connected', bold: true },
            { text: '' },
            { text: `"${action.slice(1)}" is not in your connected sources.`, italic: true },
            { text: 'Go to Onboarding to add it.' },
          ],
        })
      }
    }
  }

  function handleSend(e: React.FormEvent) {
    e.preventDefault()
    const cmd = cmdInput.trim().toLowerCase()
    if (!cmd) return
    setCmdInput('')
    handleAction(cmd)
  }

  const tabs = [
    { id: 'onboard' as const, label: '⚙️ Onboarding' },
    { id: 'bot' as const, label: '💬 Teams Bot', disabled: false },
    { id: 'preview' as const, label: '📊 What You Get' },
  ]

  return (
    <div>
      {/* Sub tabs */}
      <div style={{ display: 'flex', gap: 2, marginBottom: 20 }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)}
            style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid', borderColor: activeTab === t.id ? '#6264A7' : 'rgba(30,45,71,0.8)', background: activeTab === t.id ? 'rgba(98,100,167,0.15)' : 'rgba(10,22,40,0.6)', color: activeTab === t.id ? '#8b8fd4' : '#475569', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Onboarding tab */}
      {activeTab === 'onboard' && (
        <div className="panel">
          <OnboardingPanel connected={connected} onToggle={handleToggle} onConfirm={handleLaunch} />
        </div>
      )}

      {/* Bot tab */}
      {activeTab === 'bot' && (
        <div className="panel" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,560px) 1fr', gap: 24, alignItems: 'start' }}>
          <TeamsWindow
            messages={messages}
            typing={typing}
            connected={connected}
            onboarded={onboarded}
            onAction={handleAction}
            onSend={handleSend}
            cmdInput={cmdInput}
            setCmdInput={setCmdInput}
          />
          <div style={{ paddingTop: 8 }}>
            {!onboarded ? (
              <div style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(30,45,71,0.8)', borderRadius: 12, padding: 16 }}>
                <div style={{ fontSize: 12, color: '#6264A7', fontWeight: 700, marginBottom: 6 }}>⚙️ Not started yet</div>
                <p style={{ color: '#64748b', fontSize: 13, lineHeight: 1.6, margin: 0 }}>Go to the Onboarding tab, pick your dashboards, and hit <strong style={{ color: '#8b8fd4' }}>Launch Bot</strong> to begin.</p>
              </div>
            ) : (
              <>
                <div style={{ fontSize: 11, color: '#334155', fontFamily: 'monospace', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>Commands</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {[
                    ...connected.map(id => {
                      const d = DASHBOARDS.find(d => d.id === id)!
                      return { cmd: `/${id}`, desc: `${d.icon} Pull from ${d.name}` }
                    }),
                    { cmd: '/compile', desc: '🔀 All sources in one table' },
                    { cmd: '/help', desc: '❓ Show all commands' },
                  ].map(item => (
                    <button key={item.cmd} onClick={() => setCmdInput(item.cmd)}
                      style={{ textAlign: 'left', padding: '10px 14px', borderRadius: 10, border: '1px solid rgba(30,45,71,0.8)', background: 'rgba(10,22,40,0.6)', cursor: 'pointer', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                      <code style={{ color: '#6264A7', fontSize: 12, fontFamily: 'monospace', flexShrink: 0 }}>{item.cmd}</code>
                      <span style={{ color: '#475569', fontSize: 12 }}>{item.desc}</span>
                    </button>
                  ))}
                </div>
                <div style={{ marginTop: 14, padding: '10px 14px', background: 'rgba(98,100,167,0.06)', border: '1px solid rgba(98,100,167,0.15)', borderRadius: 10, fontSize: 12, color: '#6b7280', lineHeight: 1.6 }}>
                  💡 Type <code style={{ color: '#6264A7' }}>/compile</code> to pull all {connected.length} dashboards into one unified table.
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Preview tab */}
      {activeTab === 'preview' && (
        <div className="panel">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12, marginBottom: 24 }}>
            {[
              { icon: '🔀', title: 'One command, all dashboards', desc: '/compile pulls data from every connected source (Salesforce, Stripe, Jira) into a single tabulated response.' },
              { icon: '📊', title: 'Clean tabulated output', desc: 'No noise. Every response is a proper table with headers, delta indicators, and colour-coded status.' },
              { icon: '💬', title: 'Native in Teams', desc: 'Your team stays in Teams. No switching tabs, no logging into 6 different tools. Everything where they already work.' },
              { icon: '⚙️', title: 'Any dashboard, any source', desc: 'Salesforce, GA, Stripe, Jira, HubSpot, CloudWatch, or any custom API you give Relay access to.' },
              { icon: '⚡', title: 'Instant queries', desc: 'Type /salesforce and get live pipeline data in under a second. No exports, no waiting.' },
              { icon: '🔒', title: 'Credential-based auth', desc: 'You connect your API keys during onboarding. Relay never stores raw data, it fetches on demand.' },
            ].map((item, i) => (
              <div key={i} style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(30,45,71,0.8)', borderRadius: 14, padding: '18px 16px' }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>{item.icon}</div>
                <div style={{ color: 'white', fontWeight: 600, fontSize: 14, marginBottom: 6 }}>{item.title}</div>
                <div style={{ color: '#475569', fontSize: 13, lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            ))}
          </div>
          <div style={{ background: 'rgba(98,100,167,0.06)', border: '1px solid rgba(98,100,167,0.2)', borderRadius: 14, padding: '20px 24px', textAlign: 'center' }}>
            <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7, margin: '0 0 16px' }}>
              This is the enterprise version of Relay. For ecommerce and store owners,<br />
              Relay works over <strong style={{ color: '#2AABEE' }}>Telegram</strong> and <strong style={{ color: '#25D366' }}>WhatsApp</strong> instead.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap' }}>
              <button onClick={() => setActiveTab('onboard')} style={{ padding: '10px 24px', borderRadius: 8, border: '1px solid rgba(98,100,167,0.4)', background: 'rgba(98,100,167,0.12)', color: '#8b8fd4', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                Try the demo →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
