'use client'

import { useState, useEffect, useRef } from 'react'

const RELAY_URL    = 'https://api.interactxp.in'
const RELAY_SLUG   = 'interactxp'
const RELAY_SECRET = "b306fc199c7c741b36748d68a9c91390333ecc2a6df54c08d07e44e91bad92fb"

interface Message {
  from_role: 'visitor' | 'owner'
  message: string
  created_at: number
}

type Stage = 'idle' | 'form' | 'chat' | 'closed'

const LogoSVG = () => (
  <svg width="22" height="22" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(100,100) scale(0.88) translate(-311,-88)">
      <path d="M227.897 77.1942C227.897 167.812 347.873 178.887 394.25 107.4C377.78 161.434 327.037 175.53 304.52 175.53C174.124 175.53 179.84 0 282.34 0C381.143 4.6987 362.324 142.975 276.291 116.125L272.594 66.453L299.143 54.3706L296.118 97.3301C321.66 97.3301 327.037 74.5079 327.037 62.7625C327.037 43.4747 307.052 23.4437 285.028 22.3396C257.999 20.9844 227.897 43.7202 227.897 77.1942Z" fill="url(#wg1)"/>
      <path d="M270.911 41.9526L272.594 61.4187L299.143 48.3294V41.9526H270.911Z" fill="url(#wg2)"/>
    </g>
    <defs>
      <linearGradient id="wg1" x1="228" y1="17" x2="368" y2="153" gradientUnits="userSpaceOnUse">
        <stop stopColor="#01FFFF"/><stop offset="1" stopColor="#001FFE"/>
      </linearGradient>
      <linearGradient id="wg2" x1="228" y1="17" x2="368" y2="153" gradientUnits="userSpaceOnUse">
        <stop stopColor="#01FFFF"/><stop offset="1" stopColor="#001FFE"/>
      </linearGradient>
    </defs>
  </svg>
)

export default function ChatWidget() {
  const [open, setOpen]                 = useState(false)
  const [stage, setStage]               = useState<Stage>('idle')
  const [visitorName, setVisitorName]   = useState('')
  const [visitorEmail, setVisitorEmail] = useState('')
  const [inputText, setInputText]       = useState('')
  const [messages, setMessages]         = useState<Message[]>([])
  const [sessionId, setSessionId]       = useState<string | null>(null)
  const [sending, setSending]           = useState(false)
  const [lastPoll, setLastPoll]         = useState(0)
  const [errors, setErrors]             = useState<{name?:string;email?:string;msg?:string}>({})

  const chatRef  = useRef<HTMLDivElement>(null)
  const pollRef  = useRef<NodeJS.Timeout | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight
  }, [messages])

  useEffect(() => {
    if (open && stage === 'chat') inputRef.current?.focus()
  }, [open, stage])

  useEffect(() => {
    if (!sessionId || stage !== 'chat') return
    pollRef.current = setInterval(async () => {
      try {
        const res  = await fetch(`${RELAY_URL}/chat/${sessionId}/poll?since=${lastPoll}`)
        const data = await res.json()
        if (data.status === 'closed') { setStage('closed'); clearInterval(pollRef.current!); return }
        if (data.messages?.length > 0) {
          setMessages(prev => [...prev, ...data.messages])
          setLastPoll(data.messages[data.messages.length - 1].created_at)
        }
      } catch { /* silent */ }
    }, 3000)
    return () => clearInterval(pollRef.current!)
  }, [sessionId, stage, lastPoll])

  function validate() {
    const errs: {name?:string;email?:string;msg?:string} = {}
    if (!visitorName.trim())  errs.name  = 'Name is required'
    if (!visitorEmail.trim()) errs.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(visitorEmail.trim())) errs.email = 'Enter a valid email'
    if (!inputText.trim())    errs.msg   = 'Message is required'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  async function handleStartChat() {
    if (!validate()) return
    setSending(true)
    try {
      const res = await fetch(`${RELAY_URL}/chat/${RELAY_SLUG}/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${RELAY_SECRET}` },
        body: JSON.stringify({
          visitor_name:  `${visitorName.trim()} (${visitorEmail.trim()})`,
          page:          window.location.pathname,
          first_message: inputText.trim(),
        }),
      })
      const data = await res.json()
      setSessionId(data.session_id)
      setMessages([{ from_role: 'visitor', message: inputText.trim(), created_at: Date.now() / 1000 }])
      setLastPoll(Math.floor(Date.now() / 1000))
      setInputText('')
      setStage('chat')
    } catch { /* silent */ }
    finally { setSending(false) }
  }

  async function handleSendMessage() {
    const msg = inputText.trim()
    if (!msg || !sessionId) return
    setSending(true)
    setMessages(prev => [...prev, { from_role: 'visitor', message: msg, created_at: Date.now() / 1000 }])
    setInputText('')
    try {
      await fetch(`${RELAY_URL}/chat/${RELAY_SLUG}/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${RELAY_SECRET}` },
        body: JSON.stringify({ session_id: sessionId, message: msg }),
      })
    } catch { /* silent */ }
    finally { setSending(false) }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (stage === 'form') handleStartChat()
      else if (stage === 'chat') handleSendMessage()
    }
  }

  function handleOpen() { setOpen(true); if (stage === 'idle') setStage('form') }

  async function handleClose() {
    setOpen(false)
    if (sessionId && stage === 'chat') {
      try { await fetch(`${RELAY_URL}/chat/${sessionId}/close`, { method: 'POST' }) } catch { /* silent */ }
      setStage('closed')
    }
  }

  const fmtTime = (ts: number) =>
    new Date(ts * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })

  return (
    <>
      <style>{`
        @keyframes widgetPop {
          0% { transform: scale(0.6) translateY(12px); opacity: 0; }
          70% { transform: scale(1.05) translateY(-2px); opacity: 1; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        @keyframes widgetPulseRing {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes widgetSlideUp {
          from { opacity: 0; transform: translateY(16px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes msgIn { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
        .widget-btn {
          width:56px; height:56px; border-radius:50%;
          border:2px solid rgba(34,211,238,0.3); cursor:pointer;
          display:flex; align-items:center; justify-content:center;
          box-shadow:0 4px 24px rgba(34,211,238,0.35);
          transition:transform 0.2s, box-shadow 0.2s;
          animation:widgetPop 0.4s cubic-bezier(0.34,1.56,0.64,1);
          position:relative; z-index:1;
          background:rgba(10,22,40,0.9);
        }
        .widget-btn:hover { transform:scale(1.08); box-shadow:0 6px 32px rgba(34,211,238,0.55); }
        .widget-ring {
          position:absolute; width:56px; height:56px;
          border-radius:50%; border:2px solid rgba(34,211,238,0.5);
          animation:widgetPulseRing 2s ease-out infinite; pointer-events:none;
        }
        .widget-card { animation:widgetSlideUp 0.25s cubic-bezier(0.34,1.1,0.64,1); }
        .chat-input {
          flex:1; background:transparent; border:none; outline:none;
          color:#e2e8f0; font-size:13px; font-family:var(--font-dm-sans),system-ui;
        }
        .chat-input::placeholder { color:#334155; }
        .widget-field {
          width:100%; box-sizing:border-box;
          background:#0d1b2a; border:1px solid #1e2d47; border-radius:10px;
          padding:9px 12px; color:#e2e8f0; font-size:13px; outline:none;
          font-family:var(--font-dm-sans),system-ui; transition:border-color 0.2s;
        }
        .widget-field:focus { border-color:rgba(34,211,238,0.4); }
        .widget-field.has-error { border-color:rgba(239,68,68,0.5); }
        .field-err { font-size:11px; color:#ef4444; margin-top:3px; padding-left:2px; }
        .msg-bubble { animation:msgIn 0.2s ease; }
        ::-webkit-scrollbar { width:3px; }
        ::-webkit-scrollbar-thumb { background:rgba(34,211,238,0.15); border-radius:2px; }
      `}</style>

      <div style={{ position:'fixed', bottom:28, right:28, zIndex:999, display:'flex', flexDirection:'column', alignItems:'flex-end', gap:12 }}>

        {open && (
          <div className="widget-card" style={{
            background:'rgba(10,22,40,0.98)', border:'1px solid rgba(34,211,238,0.2)',
            borderRadius:18, width:300, boxShadow:'0 16px 64px rgba(0,0,0,0.5)',
            backdropFilter:'blur(16px)', display:'flex', flexDirection:'column', overflow:'hidden',
          }}>

            {/* Header */}
            <div style={{ padding:'14px 16px', borderBottom:'1px solid rgba(255,255,255,0.05)', display:'flex', alignItems:'center', gap:10 }}>
              <div style={{ width:36, height:36, borderRadius:'50%', flexShrink:0, background:'rgba(10,22,40,0.8)', border:'1px solid rgba(34,211,238,0.15)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <LogoSVG />
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontWeight:700, color:'white', fontSize:13, fontFamily:'var(--font-display)' }}>InteractXP</div>
                <div style={{ fontSize:11, color:'#22d3ee', display:'flex', alignItems:'center', gap:4 }}>
                  <span style={{ width:5, height:5, borderRadius:'50%', background:'#22d3ee', animation:'pulse 2s infinite', display:'inline-block' }} />
                  {stage === 'closed' ? 'Chat ended' : 'Online · replies fast'}
                </div>
              </div>
              <button onClick={handleClose} style={{ background:'transparent', border:'none', color:'#475569', cursor:'pointer', padding:4, display:'flex' }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4l8 8M12 4l-8 8" strokeLinecap="round"/></svg>
              </button>
            </div>

            {/* Form stage */}
            {stage === 'form' && (
              <div style={{ padding:16, display:'flex', flexDirection:'column', gap:8 }}>
                <div style={{ background:'#0d1b2a', border:'1px solid #1e2d47', borderRadius:12, padding:'10px 12px', marginBottom:4 }}>
                  <p style={{ color:'#cbd5e1', fontSize:13, lineHeight:1.6, margin:0, fontFamily:'var(--font-dm-sans)' }}>
                    👋 Hey! Got a question about Relay, the AI Photobooth, or a custom build?
                  </p>
                  <p style={{ color:'#cbd5e1', fontSize:13, lineHeight:1.6, margin:'6px 0 0', fontFamily:'var(--font-dm-sans)' }}>
                    Send a message and I'll reply right here.
                  </p>
                </div>

                <div>
                  <input
                    className={`widget-field${errors.name ? ' has-error' : ''}`}
                    value={visitorName}
                    onChange={e => { setVisitorName(e.target.value); setErrors(p => ({...p, name:undefined})) }}
                    placeholder="Your name *"
                  />
                  {errors.name && <div className="field-err">{errors.name}</div>}
                </div>

                <div>
                  <input
                    className={`widget-field${errors.email ? ' has-error' : ''}`}
                    type="email"
                    value={visitorEmail}
                    onChange={e => { setVisitorEmail(e.target.value); setErrors(p => ({...p, email:undefined})) }}
                    placeholder="Your email *"
                  />
                  {errors.email && <div className="field-err">{errors.email}</div>}
                </div>

                <div>
                  <div style={{ display:'flex', gap:8, background:'#0d1b2a', border:`1px solid ${errors.msg ? 'rgba(239,68,68,0.5)' : '#1e2d47'}`, borderRadius:10, padding:'6px 10px', alignItems:'center' }}>
                    <input
                      ref={inputRef}
                      className="chat-input"
                      value={inputText}
                      onChange={e => { setInputText(e.target.value); setErrors(p => ({...p, msg:undefined})) }}
                      onKeyDown={handleKeyDown}
                      placeholder="Type your message... *"
                    />
                    <button
                      onClick={handleStartChat}
                      disabled={sending}
                      style={{
                        width:32, height:32, borderRadius:'50%', border:'none', cursor:'pointer',
                        background:'linear-gradient(135deg,#22d3ee,#0ea5e9)',
                        display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0,
                      }}
                    >
                      {sending
                        ? <span style={{ width:10, height:10, border:'2px solid #050d1a', borderTopColor:'transparent', borderRadius:'50%', animation:'spin 0.6s linear infinite', display:'inline-block' }} />
                        : <svg width="14" height="14" viewBox="0 0 24 24" fill="#050d1a" style={{ transform:'rotate(45deg)', marginLeft:-1 }}><path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/></svg>
                      }
                    </button>
                  </div>
                  {errors.msg && <div className="field-err">{errors.msg}</div>}
                </div>
              </div>
            )}

            {/* Chat stage */}
            {(stage === 'chat' || stage === 'closed') && (
              <>
                <div ref={chatRef} style={{ flex:1, overflowY:'auto', padding:'12px 12px 8px', background:'#080f1a', minHeight:240, maxHeight:320, display:'flex', flexDirection:'column', gap:6 }}>
                  {messages.map((msg, i) => {
                    const isOwner = msg.from_role === 'owner'
                    return (
                      <div key={i} className="msg-bubble" style={{ display:'flex', justifyContent:isOwner ? 'flex-start' : 'flex-end' }}>
                        <div style={{
                          maxWidth:'75%',
                          background: isOwner ? '#1a2e3d' : '#1e4a6e',
                          borderRadius: isOwner ? '3px 12px 12px 12px' : '12px 12px 3px 12px',
                          padding:'7px 10px',
                        }}>
                          <div style={{ fontSize:13, color:'#e2e8f0', fontFamily:'var(--font-dm-sans)', lineHeight:1.5 }}>{msg.message}</div>
                          <div style={{ fontSize:10, color:'#4a7a96', textAlign:'right', marginTop:2 }}>{fmtTime(msg.created_at)}</div>
                        </div>
                      </div>
                    )
                  })}
                  {stage === 'closed' && (
                    <div style={{ textAlign:'center', fontSize:11, color:'#334155', padding:'8px 0' }}>Chat session ended</div>
                  )}
                </div>

                {stage === 'chat' && (
                  <div style={{ borderTop:'1px solid rgba(255,255,255,0.05)', padding:'8px 10px', background:'#0a1628', display:'flex', gap:8, alignItems:'center' }}>
                    <div style={{ flex:1, background:'#0d1b2a', border:'1px solid #1e2d47', borderRadius:20, padding:'7px 12px', display:'flex', alignItems:'center' }}>
                      <input
                        ref={inputRef}
                        className="chat-input"
                        value={inputText}
                        onChange={e => setInputText(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Reply..."
                      />
                    </div>
                    <button
                      onClick={handleSendMessage}
                      disabled={!inputText.trim() || sending}
                      style={{
                        width:34, height:34, borderRadius:'50%', border:'none', cursor:'pointer',
                        background: inputText.trim() ? 'linear-gradient(135deg,#22d3ee,#0ea5e9)' : '#1e2d47',
                        display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0,
                        transition:'background 0.2s',
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill={inputText.trim() ? '#050d1a' : '#334155'} style={{ transform:'rotate(45deg)', marginLeft:-1 }}>
                        <path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/>
                      </svg>
                    </button>
                  </div>
                )}

                <div style={{ padding:'6px 12px 10px', textAlign:'center' }}>
                  <span style={{ fontSize:10, color:'#1e2d47', fontFamily:'var(--font-dm-sans)' }}>
                    Powered by <a href="/relay" style={{ color:'#22d3ee', textDecoration:'none' }}>Relay</a>
                  </span>
                </div>
              </>
            )}
          </div>
        )}

        {!open && <div className="widget-ring" style={{ position:'absolute', bottom:0, right:0 }} />}

        <button
          className="widget-btn"
          onClick={open ? handleClose : handleOpen}
          aria-label="Chat with us"
        >
          {open ? (
            <div style={{ width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', background:'linear-gradient(135deg,#22d3ee,#0ea5e9)', borderRadius:'50%' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#050d1a" strokeWidth="2.5" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </div>
          ) : (
            <LogoSVG />
          )}
        </button>
      </div>
    </>
  )
}
