'use client'

import { useState, useEffect, useRef } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const RELAY_URL    = 'https://api.interactxp.in'
const RELAY_SLUG   = 'interactxp'
const RELAY_SECRET = "b306fc199c7c741b36748d68a9c91390333ecc2a6df54c08d07e44e91bad92fb"

const WHATSAPP_NUMBER = '919462332146'
const EMAIL           = 'ritwik@interactxp.in'

const topics = [
  'Relay: request access or demo',
  'AI Photobooth: event enquiry',
  'Event technology',
  'HTML5 games',
  'Custom software',
  'General enquiry',
]

const LogoSVG = () => (
  <svg width="22" height="22" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(100,100) scale(0.88) translate(-311,-88)">
      <path d="M227.897 77.1942C227.897 167.812 347.873 178.887 394.25 107.4C377.78 161.434 327.037 175.53 304.52 175.53C174.124 175.53 179.84 0 282.34 0C381.143 4.6987 362.324 142.975 276.291 116.125L272.594 66.453L299.143 54.3706L296.118 97.3301C321.66 97.3301 327.037 74.5079 327.037 62.7625C327.037 43.4747 307.052 23.4437 285.028 22.3396C257.999 20.9844 227.897 43.7202 227.897 77.1942Z" fill="url(#cg1)"/>
      <path d="M270.911 41.9526L272.594 61.4187L299.143 48.3294V41.9526H270.911Z" fill="url(#cg2)"/>
    </g>
    <defs>
      <linearGradient id="cg1" x1="228" y1="17" x2="368" y2="153" gradientUnits="userSpaceOnUse">
        <stop stopColor="#01FFFF"/><stop offset="1" stopColor="#001FFE"/>
      </linearGradient>
      <linearGradient id="cg2" x1="228" y1="17" x2="368" y2="153" gradientUnits="userSpaceOnUse">
        <stop stopColor="#01FFFF"/><stop offset="1" stopColor="#001FFE"/>
      </linearGradient>
    </defs>
  </svg>
)

export default function ContactPage() {
  const [stage, setStage]               = useState('idle')
  const [visitorName, setVisitorName]   = useState('')
  const [visitorEmail, setVisitorEmail] = useState('')
  const [inputText, setInputText]       = useState('')
  const [messages, setMessages]         = useState([])
  const [sessionId, setSessionId]       = useState(null)
  const [sending, setSending]           = useState(false)
  const [lastPoll, setLastPoll]         = useState(0)
  const [focused, setFocused]           = useState(false)
  const [errors, setErrors]             = useState({})

  const chatRef = useRef(null)
  const pollRef = useRef(null)

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight
  }, [messages])

  useEffect(() => {
    if (!sessionId || stage !== 'chat') return
    pollRef.current = setInterval(async () => {
      try {
        const res  = await fetch(`${RELAY_URL}/chat/${sessionId}/poll?since=${lastPoll}`)
        const data = await res.json()
        if (data.status === 'closed') { setStage('closed'); clearInterval(pollRef.current); return }
        if (data.messages?.length > 0) {
          setMessages(prev => [...prev, ...data.messages])
          setLastPoll(data.messages[data.messages.length - 1].created_at)
        }
      } catch {}
    }, 3000)
    return () => clearInterval(pollRef.current)
  }, [sessionId, stage, lastPoll])

  function validate() {
    const errs = {}
    if (!visitorName.trim())  errs.name  = 'Name is required'
    if (!visitorEmail.trim()) errs.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(visitorEmail.trim())) errs.email = 'Enter a valid email'
    if (!inputText.trim())    errs.msg   = 'Message is required'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  async function handleSend() {
    if (stage === 'idle' || stage === 'form') {
      if (!validate()) return
      setSending(true)
      try {
        const res  = await fetch(`${RELAY_URL}/chat/${RELAY_SLUG}/start`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${RELAY_SECRET}` },
          body: JSON.stringify({
            visitor_name:  `${visitorName.trim()} (${visitorEmail.trim()})`,
            page:          '/contact',
            first_message: inputText.trim(),
          }),
        })
        const data = await res.json()
        setSessionId(data.session_id)
        setMessages([{ from_role: 'visitor', message: inputText.trim(), created_at: Date.now() / 1000 }])
        setLastPoll(Math.floor(Date.now() / 1000))
        setInputText('')
        setStage('chat')
      } catch {}
      finally { setSending(false) }
    } else if (stage === 'chat' && sessionId) {
      const msg = inputText.trim()
      if (!msg) return
      setSending(true)
      setMessages(prev => [...prev, { from_role: 'visitor', message: msg, created_at: Date.now() / 1000 }])
      setInputText('')
      try {
        await fetch(`${RELAY_URL}/chat/${RELAY_SLUG}/message`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${RELAY_SECRET}` },
          body: JSON.stringify({ session_id: sessionId, message: msg }),
        })
      } catch {}
      finally { setSending(false) }
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() }
  }

  const fmtTime = (ts) =>
    new Date(ts * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })

  const isFormStage = stage === 'idle' || stage === 'form'

  return (
    <>
      <style>{`
        @keyframes msgIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.3; } }
        @keyframes glowPulse {
          0%,100% { box-shadow:0 0 24px rgba(34,211,238,0.12),0 0 0 1px rgba(34,211,238,0.1); }
          50%      { box-shadow:0 0 40px rgba(34,211,238,0.22),0 0 0 1px rgba(34,211,238,0.18); }
        }
        .msg-in { animation:msgIn 0.22s ease; }
        .relay-panel { animation:glowPulse 4s ease-in-out infinite; }
        .relay-panel.is-focused { box-shadow:0 0 48px rgba(34,211,238,0.2),0 0 0 1px rgba(34,211,238,0.25) !important; animation:none; }
        .chat-input {
          background:transparent; border:none; outline:none;
          color:#e2e8f0; font-size:14px; font-family:var(--font-dm-sans),system-ui;
          flex:1; min-width:0;
        }
        .chat-input::placeholder { color:#334155; }
        .contact-field {
          width:100%; box-sizing:border-box;
          background:rgba(13,27,42,0.8); border:1px solid rgba(30,45,71,0.8);
          border-radius:10px; padding:10px 14px;
          color:#e2e8f0; font-size:13px; outline:none;
          font-family:var(--font-dm-sans),system-ui;
          transition:border-color 0.2s;
        }
        .contact-field:focus { border-color:rgba(34,211,238,0.35); }
        .contact-field.has-error { border-color:rgba(239,68,68,0.5); }
        .field-err { font-size:11px; color:#ef4444; margin-top:3px; padding-left:2px; }
        .topic-chip {
          font-size:13px; padding:7px 14px; border-radius:9999px;
          color:#94a3b8; border:1px solid rgba(30,45,71,0.8);
          background:rgba(10,22,40,0.5); cursor:default;
          transition:border-color 0.2s,color 0.2s;
        }
        .topic-chip:hover { border-color:rgba(34,211,238,0.3); color:#cbd5e1; }
        ::-webkit-scrollbar { width:3px; }
        ::-webkit-scrollbar-thumb { background:rgba(34,211,238,0.12); border-radius:2px; }
      `}</style>

      <Navbar />
      <main>

        {/* Hero */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-30" />
          <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-5" style={{ background:'#22d3ee' }} />
          <div className="max-w-6xl mx-auto px-6">
            <div className="max-w-2xl">
              <div className="section-label mb-6">Contact</div>
              <h1 className="font-display text-5xl md:text-6xl font-bold leading-tight mb-6">
                Let&apos;s talk.
              </h1>
              <p className="text-slate-400 text-xl leading-relaxed">
                Whether you&apos;re interested in Relay, the AI Photobooth, event technology, or a custom build, reach out directly.
              </p>
            </div>
          </div>
        </section>

        {/* Main */}
        <section className="pb-32 border-t border-brand-border">
          <div className="max-w-6xl mx-auto px-6 pt-20">
            <div className="grid lg:grid-cols-2 gap-16 items-start">

              {/* LEFT: Relay Chat */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-mono tracking-widest uppercase" style={{ color:'#22d3ee' }}>
                    Chat with us, live
                  </span>
                  <span className="flex items-center gap-1.5 text-xs" style={{ color:'#22d3ee' }}>
                    <span style={{ width:6, height:6, borderRadius:'50%', background:'#22d3ee', display:'inline-block', animation:'pulse 2s infinite' }} />
                    Online
                  </span>
                </div>

                <div
                  className={`relay-panel rounded-2xl overflow-hidden${focused ? ' is-focused' : ''}`}
                  style={{ background:'rgba(8,15,26,0.95)', border:'1px solid rgba(34,211,238,0.12)', backdropFilter:'blur(16px)' }}
                >
                  {/* Panel header */}
                  <div style={{ padding:'16px 20px', borderBottom:'1px solid rgba(255,255,255,0.05)', display:'flex', alignItems:'center', gap:12, background:'rgba(10,22,40,0.6)' }}>
                    <div style={{ width:44, height:44, borderRadius:'50%', flexShrink:0, border:'1px solid rgba(34,211,238,0.2)', background:'rgba(10,22,40,0.8)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                      <LogoSVG />
                    </div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontWeight:700, color:'white', fontSize:15, fontFamily:'var(--font-display)' }}>InteractXP</div>
                      <div style={{ fontSize:12, color:'#22d3ee', display:'flex', alignItems:'center', gap:5 }}>
                        <span style={{ width:6, height:6, borderRadius:'50%', background:'#22d3ee', display:'inline-block', animation:'pulse 2s infinite' }} />
                        {stage === 'closed' ? 'Chat ended' : 'Online · replies fast'}
                      </div>
                    </div>
                    <div style={{ fontSize:11, color:'#1e2d47', fontFamily:'var(--font-mono)' }}>
                      Powered by <a href="/relay" style={{ color:'#22d3ee', textDecoration:'none' }}>Relay</a>
                    </div>
                  </div>

                  {/* Greeting bubble */}
                  <div style={{ padding:'20px 20px 12px' }}>
                    <div style={{ background:'rgba(26,46,61,0.7)', borderRadius:'4px 16px 16px 16px', padding:'12px 16px', maxWidth:'85%', border:'1px solid rgba(34,211,238,0.08)' }}>
                      <p style={{ color:'#cbd5e1', fontSize:14, lineHeight:1.6, margin:0, fontFamily:'var(--font-dm-sans)' }}>
                        👋 Hey! Got a question about Relay, the AI Photobooth, or a custom build?
                      </p>
                      <p style={{ color:'#cbd5e1', fontSize:14, lineHeight:1.6, margin:'6px 0 0', fontFamily:'var(--font-dm-sans)' }}>
                        Send a message and I&apos;ll reply right here.
                      </p>
                      <p style={{ fontSize:10, color:'#2d4a5e', textAlign:'right', marginTop:4 }}>Ritwik</p>
                    </div>
                  </div>

                  {/* Messages */}
                  {messages.length > 0 && (
                    <div ref={chatRef} style={{ maxHeight:280, overflowY:'auto', padding:'4px 20px 12px', display:'flex', flexDirection:'column', gap:8 }}>
                      {messages.map((msg, i) => {
                        const isOwner = msg.from_role === 'owner'
                        return (
                          <div key={i} className="msg-in" style={{ display:'flex', justifyContent:isOwner ? 'flex-start' : 'flex-end' }}>
                            <div style={{
                              maxWidth:'78%',
                              background: isOwner ? 'rgba(26,46,61,0.7)' : 'rgba(20,60,100,0.6)',
                              borderRadius: isOwner ? '4px 14px 14px 14px' : '14px 14px 4px 14px',
                              padding:'8px 12px',
                              border:`1px solid ${isOwner ? 'rgba(34,211,238,0.08)' : 'rgba(34,211,238,0.15)'}`,
                            }}>
                              <div style={{ fontSize:14, color:'#e2e8f0', fontFamily:'var(--font-dm-sans)', lineHeight:1.5 }}>{msg.message}</div>
                              <div style={{ fontSize:10, color:'#2d4a5e', textAlign:'right', marginTop:3 }}>{fmtTime(msg.created_at)}</div>
                            </div>
                          </div>
                        )
                      })}
                      {stage === 'closed' && (
                        <div style={{ textAlign:'center', fontSize:12, color:'#334155', padding:'8px 0' }}>Chat ended</div>
                      )}
                    </div>
                  )}

                  {/* Input area */}
                  {stage !== 'closed' && (
                    <div style={{ padding:'12px 20px 20px', borderTop: messages.length > 0 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>

                      {/* Name + email fields, shown before chat starts */}
                      {isFormStage && (
                        <div style={{ display:'flex', flexDirection:'column', gap:8, marginBottom:10 }}>
                          <div>
                            <input
                              className={`contact-field${errors.name ? ' has-error' : ''}`}
                              value={visitorName}
                              onChange={e => { setVisitorName(e.target.value); setErrors(p => ({...p, name:undefined})) }}
                              placeholder="Your name *"
                            />
                            {errors.name && <div className="field-err">{errors.name}</div>}
                          </div>
                          <div>
                            <input
                              className={`contact-field${errors.email ? ' has-error' : ''}`}
                              type="email"
                              value={visitorEmail}
                              onChange={e => { setVisitorEmail(e.target.value); setErrors(p => ({...p, email:undefined})) }}
                              placeholder="Your email *"
                            />
                            {errors.email && <div className="field-err">{errors.email}</div>}
                          </div>
                        </div>
                      )}

                      {/* Message input */}
                      <div>
                        <div
                          style={{
                            display:'flex', alignItems:'center', gap:10,
                            background:'rgba(13,27,42,0.8)',
                            border:`1px solid ${errors.msg ? 'rgba(239,68,68,0.5)' : focused ? 'rgba(34,211,238,0.3)' : 'rgba(30,45,71,0.8)'}`,
                            borderRadius:14, padding:'10px 14px', transition:'border-color 0.2s',
                          }}
                        >
                          <input
                            className="chat-input"
                            value={inputText}
                            onChange={e => { setInputText(e.target.value); setErrors(p => ({...p, msg:undefined})) }}
                            onKeyDown={handleKeyDown}
                            onFocus={() => setFocused(true)}
                            onBlur={() => setFocused(false)}
                            placeholder={stage === 'chat' ? 'Reply...' : 'Type your message... *'}
                          />
                          <button
                            onClick={handleSend}
                            disabled={sending}
                            style={{
                              width:36, height:36, borderRadius:'50%', border:'none',
                              cursor:'pointer',
                              background:'linear-gradient(135deg,#22d3ee,#0ea5e9)',
                              display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0,
                              transition:'opacity 0.2s',
                              opacity: sending ? 0.6 : 1,
                            }}
                          >
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="#050d1a" style={{ transform:'rotate(45deg)', marginLeft:-1 }}>
                              <path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/>
                            </svg>
                          </button>
                        </div>
                        {errors.msg && <div className="field-err">{errors.msg}</div>}
                      </div>

                      <p style={{ fontSize:11, color:'#1e2d47', marginTop:8, textAlign:'center', fontFamily:'var(--font-dm-sans)' }}>
                        Messages reach us instantly on Telegram via Relay
                      </p>
                    </div>
                  )}
                </div>

                {/* Relay callout */}
                <div className="mt-5 rounded-xl px-5 py-4 flex items-start gap-3"
                  style={{ background:'rgba(34,211,238,0.03)', border:'1px solid rgba(34,211,238,0.09)' }}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="1.5" style={{ flexShrink:0, marginTop:2 }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"/>
                  </svg>
                  <p style={{ fontSize:13, color:'#475569', lineHeight:1.6, margin:0, fontFamily:'var(--font-dm-sans)' }}>
                    This chat is powered by{' '}
                    <a href="/relay" style={{ color:'#22d3ee', textDecoration:'none', fontWeight:600 }}>Relay</a>
                    {' '}, the same product we sell. Your message hits our Telegram the instant you send it.{' '}
                    <span style={{ color:'#334155' }}>No email, no form, no delay.</span>
                  </p>
                </div>
              </div>

              {/* RIGHT: Other options */}
              <div className="flex flex-col gap-6">
                <p className="text-xs font-mono tracking-widest uppercase text-slate-500">Other ways to reach us</p>

                <a href={`mailto:${EMAIL}`} className="card-dark rounded-2xl p-7 group transition-all duration-300 block hover:border-cyan-900/50">
                  <div className="flex items-center gap-5">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background:'rgba(34,211,238,0.06)', border:'1px solid rgba(34,211,238,0.12)' }}>
                      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#22d3ee" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-mono tracking-widest uppercase text-slate-500 mb-1">Email</p>
                      <p className="font-display text-base font-bold" style={{ color:'#22d3ee' }}>{EMAIL}</p>
                      <p className="text-slate-500 text-sm mt-0.5">We respond within 24 hours.</p>
                    </div>
                  </div>
                </a>

                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer"
                  className="card-dark rounded-2xl p-7 group transition-all duration-300 block hover:border-green-900/50">
                  <div className="flex items-center gap-5">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-content-center flex-shrink-0"
                      style={{ background:'rgba(34,197,94,0.06)', border:'1px solid rgba(34,197,94,0.12)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="#22c55e">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-mono tracking-widest uppercase text-slate-500 mb-1">WhatsApp</p>
                      <p className="font-display text-base font-bold" style={{ color:'#22c55e' }}>Message us</p>
                      <p className="text-slate-500 text-sm mt-0.5">Quick questions, demos, event enquiries.</p>
                    </div>
                  </div>
                </a>

                <div className="pt-2">
                  <p className="text-xs font-mono tracking-widest uppercase text-slate-500 mb-4">What can we help with?</p>
                  <div className="flex flex-wrap gap-2">
                    {topics.map((t) => (
                      <span key={t} className="topic-chip">{t}</span>
                    ))}
                  </div>
                </div>

                <div className="card-dark rounded-xl p-5 self-start">
                  <p className="text-xs font-mono tracking-widest uppercase text-slate-500 mb-1">Based in</p>
                  <p className="font-display font-bold text-white">India</p>
                  <p className="text-slate-500 text-sm mt-1">Inter Tech Interact Pvt. Ltd.</p>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
