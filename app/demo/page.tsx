'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

import { Role, Platform, Stage, DemoTab, Product, Order, fmtTime, fmtCurrency, genOrderNum, randomName, uid } from '@/components/demo/types'
import { TelegramPhone } from '@/components/demo/TelegramPhone'
import { WhatsAppPhone } from '@/components/demo/WhatsAppPhone'
import { EnterpriseDemo } from '@/components/demo/EnterpriseDemo'
import {
  makeWelcomeMsg, makeOrderMsg, makeFulfilledMsg, makeTodayMsg,
  makeWeekMsg, makeOrdersMsg, makeLowStockMsg, makeMaintenanceMsg,
  makeCustomerMsg, makeHelpMsg,
} from '@/components/demo/storeMsgs'

import type { BotMessage } from '@/components/demo/types'

const PRODUCTS: Product[] = [
  { id: 1, name: 'Wireless Earbuds Pro', price: 89.99, emoji: '🎧', stock: 12, category: 'Audio' },
  { id: 2, name: 'Mechanical Keyboard', price: 129.00, emoji: '⌨️', stock: 3, category: 'Peripherals' },
  { id: 3, name: 'USB-C Hub 7-in-1', price: 49.99, emoji: '🔌', stock: 8, category: 'Accessories' },
  { id: 4, name: 'Desk Lamp LED', price: 34.99, emoji: '💡', stock: 15, category: 'Workspace' },
  { id: 5, name: 'Laptop Stand', price: 59.99, emoji: '💻', stock: 2, category: 'Workspace' },
  { id: 6, name: 'Webcam 1080p', price: 79.00, emoji: '📷', stock: 6, category: 'Peripherals' },
]

export default function DemoPage() {
  const [stage, setStage] = useState<Stage>('intro')
  const [introStep, setIntroStep] = useState(0)
  const [role, setRole] = useState<Role>('store')
  const [platform, setPlatform] = useState<Platform>('telegram')
  const [activeTab, setActiveTab] = useState<DemoTab>('store')
  const [cart, setCart] = useState<{ product: Product; qty: number } | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [messages, setMessages] = useState<BotMessage[]>([])
  const [typing, setTyping] = useState(false)
  const [cmdInput, setCmdInput] = useState('')
  const [processingId, setProcessingId] = useState<string | null>(null)
  const [maintenanceMode, setMaintenanceMode] = useState(false)
  const [showMaintenanceConfirm, setShowMaintenanceConfirm] = useState(false)
  const [pendingMaintenanceCmd, setPendingMaintenanceCmd] = useState('')
  const [notification, setNotification] = useState<string | null>(null)
  const [showHelp, setShowHelp] = useState(false)
  const [stats, setStats] = useState({ orders: 0, revenue: 0, visitors: Math.floor(80 + Math.random() * 40) })
  const [customerMsg, setCustomerMsg] = useState('')
  const [customerName, setCustomerName] = useState(randomName())
  const [customerPage, setCustomerPage] = useState('/products')
  const [customerSent, setCustomerSent] = useState(false)

  useEffect(() => {
    if (stage !== 'intro') return
    const t = setTimeout(() => {
      if (introStep < 2) setIntroStep(s => s + 1)
      else setStage('role')
    }, introStep === 0 ? 600 : 900)
    return () => clearTimeout(t)
  }, [stage, introStep])

  useEffect(() => {
    if (stage !== 'demo' || role !== 'store') return
    setMessages([makeWelcomeMsg(platform)])
    const t = setTimeout(() => {
      const lowStockItems = PRODUCTS.filter(p => p.stock <= 3)
      addBotMessage(makeLowStockMsg(lowStockItems[Math.floor(Math.random() * lowStockItems.length)]))
    }, 16000)
    return () => clearTimeout(t)
  }, [stage, platform, role])

  function showNotif(text: string) {
    setNotification(text)
    setTimeout(() => setNotification(null), 3000)
  }

  const addBotMessage = useCallback((msg: BotMessage) => {
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMessages(prev => [...prev, msg])
    }, 800 + Math.random() * 500)
  }, [])

  function addUserMessage(text: string) {
    setMessages(prev => [...prev, { id: uid(), from: 'user', text, time: fmtTime() }])
  }

  function handlePlaceOrder() {
    if (!cart) return
    const order: Order = {
      id: uid(), orderNumber: genOrderNum(), customerName: randomName(),
      product: cart.product, qty: cart.qty,
      total: parseFloat((cart.product.price * cart.qty).toFixed(2)),
      status: 'pending', timestamp: new Date(),
    }
    setOrders(prev => [order, ...prev])
    setCart(null)
    setTimeout(() => { setActiveTab('admin'); showNotif('📦 New order! Check Admin Panel') }, 300)
  }

  function handleProcessOrder(orderId: string) {
    setProcessingId(orderId)
    setTimeout(() => {
      const order = orders.find(o => o.id === orderId)!
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: 'fulfilled' } : o))
      setStats(prev => ({ ...prev, orders: prev.orders + 1, revenue: prev.revenue + order.total }))
      addBotMessage(makeOrderMsg(order))
      setTimeout(() => addBotMessage(makeFulfilledMsg({ ...order, status: 'fulfilled' })), 2000)
      setProcessingId(null)
      showNotif('✅ Relay notified your bot!')
      setTimeout(() => setActiveTab('bot'), 800)
    }, 1400)
  }

  function handleBotAction(action: string) {
    if (platform === 'telegram') addUserMessage(action.replace('_prompt', ''))
    switch (action) {
      case '/today': return addBotMessage(makeTodayMsg(stats))
      case '/week': return addBotMessage(makeWeekMsg({ orders: stats.orders + Math.floor(20 + Math.random() * 30), revenue: stats.revenue + 800 + Math.random() * 1200 }))
      case '/orders': return addBotMessage(makeOrdersMsg(orders))
      case '/help': return addBotMessage(makeHelpMsg(platform))
      case '/maintenance on':
      case '/maintenance_prompt':
        setShowMaintenanceConfirm(true)
        setPendingMaintenanceCmd('/maintenance on')
        return
      case '/maintenance off':
        setMaintenanceMode(false)
        return addBotMessage(makeMaintenanceMsg(false))
    }
  }

  function handleCommand(e: React.FormEvent) {
    e.preventDefault()
    const cmd = cmdInput.trim().toLowerCase()
    if (!cmd) return
    addUserMessage(cmdInput.trim())
    setCmdInput('')
    if (cmd === '/today') return addBotMessage(makeTodayMsg(stats))
    if (cmd === '/week') return addBotMessage(makeWeekMsg({ orders: stats.orders + 25, revenue: stats.revenue + 1200 }))
    if (cmd === '/month') return addBotMessage({ id: uid(), from: 'bot', time: fmtTime(), lines: [{ text: '📊 Last 30 Days', bold: true }, { text: '' }, { text: 'Orders:  ', append: { text: String(stats.orders + 90), bold: true } }, { text: 'Revenue: ', append: { text: fmtCurrency(stats.revenue + 4200), bold: true } }, { text: 'Visitors:', append: { text: '3,241', bold: true } }] })
    if (cmd === '/orders') return addBotMessage(makeOrdersMsg(orders))
    if (cmd === '/help') return addBotMessage(makeHelpMsg(platform))
    if (cmd === '/maintenance on') { setShowMaintenanceConfirm(true); setPendingMaintenanceCmd(cmdInput.trim()); return }
    if (cmd === '/maintenance off') { setMaintenanceMode(false); return addBotMessage(makeMaintenanceMsg(false)) }
    addBotMessage({ id: uid(), from: 'bot', time: fmtTime(), lines: [{ text: '⛔ Unknown command', bold: true }, { text: '' }, { text: 'Try /today /week /orders /help or /maintenance on|off' }] })
  }

  function handleSendCustomerMsg() {
    if (!customerMsg.trim()) return
    addBotMessage(makeCustomerMsg(customerName, customerMsg, customerPage))
    setCustomerSent(true)
    showNotif('💬 Message delivered to bot!')
    setTimeout(() => setActiveTab('bot'), 1000)
    setCustomerMsg('')
  }

  function confirmMaintenance() {
    setShowMaintenanceConfirm(false)
    setMaintenanceMode(true)
    if (platform === 'telegram' && pendingMaintenanceCmd) addUserMessage(pendingMaintenanceCmd)
    addBotMessage(makeMaintenanceMsg(true))
    setPendingMaintenanceCmd('')
  }

  const pendingOrders = orders.filter(o => o.status === 'pending')
  const isTelegram = platform === 'telegram'
  const accentColor = isTelegram ? '#2AABEE' : '#25D366'

  if (stage === 'intro') return (
    <div style={{ minHeight: '100vh', background: '#050d1a', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}} @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}`}</style>
      {introStep >= 0 && <img src="/images/relay-logo.png" alt="Relay" style={{ width: 200, animation: 'fadeUp 0.6s ease forwards' }} />}
      {introStep >= 1 && <p style={{ color: '#64748b', fontSize: 16, animation: 'fadeUp 0.6s 0.1s ease both', fontFamily: 'system-ui', opacity: 0, animationFillMode: 'forwards' }}>Your business. In your chat.</p>}
      {introStep >= 2 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, animation: 'fadeUp 0.5s ease both', opacity: 0, animationFillMode: 'forwards' }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22d3ee', animation: 'pulse 1.5s infinite', display: 'inline-block' }} />
          <span style={{ fontSize: 11, color: '#22d3ee', fontFamily: 'monospace', letterSpacing: 2, textTransform: 'uppercase' }}>Loading Demo</span>
        </div>
      )}
    </div>
  )

  if (stage === 'role') return (
    <>
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
        .role-card{transition:all 0.22s cubic-bezier(0.34,1.56,0.64,1);cursor:pointer;}
        .role-card:hover{transform:translateY(-4px) scale(1.02);}
      `}</style>
      <Navbar />
      <main style={{ minHeight: '100vh', background: '#050d1a', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '100px 24px 60px' }}>
        <div style={{ textAlign: 'center', maxWidth: 640, animation: 'fadeUp 0.5s ease' }}>
          <img src="/images/relay-logo.png" alt="Relay" style={{ width: 160, marginBottom: 32 }} />
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 14px', borderRadius: 999, border: '1px solid rgba(34,211,238,0.2)', background: 'rgba(34,211,238,0.05)', marginBottom: 20 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22d3ee', animation: 'pulse 2s infinite', display: 'inline-block' }} />
            <span style={{ fontSize: 10, color: '#22d3ee', fontFamily: 'monospace', letterSpacing: 2, textTransform: 'uppercase' }}>Interactive Demo</span>
          </div>
          <h1 style={{ fontSize: 'clamp(28px,4vw,42px)', fontWeight: 700, color: 'white', marginBottom: 10, fontFamily: 'var(--font-display,system-ui)', letterSpacing: '-0.5px', lineHeight: 1.2 }}>Who are you?</h1>
          <p style={{ color: '#64748b', fontSize: 15, marginBottom: 36, lineHeight: 1.6 }}>Relay works for any business. Pick your profile to see a tailored demo.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 32 }}>
            {[
              { id: 'store' as Role, icon: '🛍️', title: 'Store Owner', sub: 'E-commerce · Retail · F&B', desc: 'Real-time order alerts, customer messages, low stock warnings, in Telegram or WhatsApp.' },
              { id: 'enterprise' as Role, icon: '🏢', title: 'Enterprise', sub: 'Teams · SaaS · Agencies', desc: 'Pull data from all your dashboards (Salesforce, Jira, Stripe) into one Teams message.' },
            ].map(r => (
              <div key={r.id} className="role-card"
                onClick={() => { setRole(r.id); setStage('demo'); setActiveTab(r.id === 'store' ? 'store' : 'analytics') }}
                style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(30,45,71,0.8)', borderRadius: 18, padding: '24px 20px', textAlign: 'left', backdropFilter: 'blur(8px)' }}>
                <div style={{ fontSize: 38, marginBottom: 10 }}>{r.icon}</div>
                <div style={{ color: '#22d3ee', fontWeight: 700, fontSize: 17, marginBottom: 2, fontFamily: 'var(--font-display,system-ui)' }}>{r.title}</div>
                <div style={{ color: '#475569', fontSize: 11, fontFamily: 'monospace', letterSpacing: 0.5, marginBottom: 8, textTransform: 'uppercase' }}>{r.sub}</div>
                <div style={{ color: '#64748b', fontSize: 13, lineHeight: 1.6 }}>{r.desc}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
            <span style={{ color: '#334155', fontSize: 13 }}>Store platform:</span>
            <div style={{ display: 'flex', background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(30,45,71,0.8)', borderRadius: 999, padding: 4, gap: 3 }}>
              {(['telegram', 'whatsapp'] as Platform[]).map(p => (
                <button key={p} onClick={() => setPlatform(p)}
                  style={{ padding: '7px 18px', borderRadius: 999, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 600, background: platform === p ? (p === 'telegram' ? '#2AABEE' : '#25D366') : 'transparent', color: platform === p ? 'white' : '#475569', transition: 'all 0.2s' }}>
                  {p === 'telegram' ? '✈️ Telegram' : '📱 WhatsApp'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  )

  if (role === 'enterprise') {
    return (
      <>
        <style>{`
          @keyframes msgSlide{from{opacity:0;transform:translateY(8px) scale(0.97)}to{opacity:1;transform:translateY(0) scale(1)}}
          @keyframes typingDot{0%,60%,100%{transform:translateY(0);opacity:0.3}30%{transform:translateY(-5px);opacity:1}}
          @keyframes panelIn{from{opacity:0;transform:translateX(6px)}to{opacity:1;transform:translateX(0)}}
          @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
          @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
          .panel{animation:panelIn 0.2s ease}
        `}</style>
        <Navbar />
        <main style={{ background: '#050d1a', minHeight: '100vh' }}>
          <section style={{ paddingTop: 96, paddingBottom: 28, textAlign: 'center' }}>
            <div style={{ maxWidth: 680, margin: '0 auto', padding: '0 24px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '5px 14px', borderRadius: 999, border: '1px solid rgba(98,100,167,0.25)', background: 'rgba(98,100,167,0.06)', marginBottom: 14 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#6264A7', animation: 'pulse 2s infinite', display: 'inline-block' }} />
                <span style={{ fontSize: 10, fontFamily: 'monospace', color: '#8b8fd4', letterSpacing: 2, textTransform: 'uppercase' }}>Enterprise Demo · Microsoft Teams</span>
              </div>
              <h1 className="font-display" style={{ fontSize: 'clamp(26px,4vw,44px)', fontWeight: 700, color: 'white', lineHeight: 1.15, marginBottom: 10, letterSpacing: '-0.5px' }}>
                All your dashboards. <span style={{ color: '#6264A7' }}>One command.</span>
              </h1>
              <p style={{ color: '#64748b', fontSize: 15, lineHeight: 1.7, marginBottom: 18 }}>
                Connect Salesforce, Stripe, Jira and more. Ask Relay anything, get a clean table right in Teams.
              </p>
              <button onClick={() => setStage('role')} style={{ padding: '7px 18px', borderRadius: 999, border: '1px solid rgba(255,255,255,0.08)', background: 'transparent', color: '#475569', fontSize: 12, cursor: 'pointer' }}>
                ← Switch role
              </button>
            </div>
          </section>
          <section style={{ maxWidth: 1080, margin: '0 auto', padding: '0 20px 80px' }}>
            <EnterpriseDemo />
          </section>
        </main>
        <Footer />
      </>
    )
  }

  const storeTabs: { id: DemoTab; label: string; badge?: number }[] = [
    { id: 'store', label: '🛍️ Store' },
    { id: 'admin', label: '⚙️ Admin', badge: pendingOrders.length || undefined },
    { id: 'bot', label: isTelegram ? '✈️ Bot' : '📱 Bot' },
    { id: 'analytics', label: '📊 Analytics' },
    { id: 'chat', label: '💬 Chat' },
  ]

  return (
    <>
      <style>{`
        @keyframes msgSlide{from{opacity:0;transform:translateY(8px) scale(0.97)}to{opacity:1;transform:translateY(0) scale(1)}}
        @keyframes typingDot{0%,60%,100%{transform:translateY(0);opacity:0.3}30%{transform:translateY(-5px);opacity:1}}
        @keyframes notifSlide{0%{opacity:0;transform:translateY(-10px) scale(0.95)}15%{opacity:1;transform:translateY(0) scale(1)}80%{opacity:1}100%{opacity:0;transform:translateY(-8px)}}
        @keyframes panelIn{from{opacity:0;transform:translateX(6px)}to{opacity:1;transform:translateX(0)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        @keyframes maintBlink{0%,100%{opacity:1}50%{opacity:0.6}}
        .panel{animation:panelIn 0.2s ease}
        .tab-btn{transition:all 0.2s;cursor:pointer;white-space:nowrap;}
        .tab-btn:hover{color:#fff!important;}
        .product-card{transition:all 0.2s;cursor:pointer;}
        .product-card:hover{transform:translateY(-2px);border-color:rgba(34,211,238,0.35)!important;}
        .process-btn:hover{background:rgba(34,211,238,0.2)!important;}
        ::-webkit-scrollbar{width:3px;}
        ::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.08);border-radius:2px;}
        .hint-pill{transition:all 0.15s;cursor:pointer;}
        .hint-pill:hover{border-color:rgba(34,211,238,0.35)!important;color:#22d3ee!important;}
      `}</style>
      <Navbar />

      {maintenanceMode && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200, background: 'rgba(245,158,11,0.97)', color: '#1a0a00', textAlign: 'center', padding: '10px 16px', fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
          <span style={{ animation: 'maintBlink 2s infinite' }}>🔧</span>
          MAINTENANCE MODE ACTIVE: Store is offline for visitors
          <button onClick={() => { setMaintenanceMode(false); addBotMessage(makeMaintenanceMsg(false)) }} style={{ padding: '3px 14px', borderRadius: 8, border: 'none', background: '#1a0a00', color: '#f59e0b', cursor: 'pointer', fontSize: 12, fontWeight: 700 }}>Turn Off</button>
        </div>
      )}

      {notification && (
        <div style={{ position: 'fixed', top: maintenanceMode ? 60 : 82, left: '50%', transform: 'translateX(-50%)', zIndex: 100, background: 'rgba(5,13,26,0.96)', border: '1px solid rgba(34,211,238,0.3)', borderRadius: 12, padding: '10px 20px', fontSize: 13, color: '#22d3ee', backdropFilter: 'blur(12px)', animation: 'notifSlide 3s ease forwards', whiteSpace: 'nowrap', boxShadow: '0 8px 40px rgba(0,0,0,0.5)' }}>
          {notification}
        </div>
      )}

      {showMaintenanceConfirm && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 300, background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(6px)' }}>
          <div style={{ background: '#0a1628', border: '1px solid rgba(245,158,11,0.35)', borderRadius: 20, padding: '32px 28px', maxWidth: 380, width: '90%', textAlign: 'center', animation: 'fadeUp 0.22s ease', boxShadow: '0 24px 80px rgba(0,0,0,0.7)' }}>
            <div style={{ fontSize: 44, marginBottom: 14 }}>🔧</div>
            <h3 style={{ color: 'white', fontSize: 20, fontWeight: 700, marginBottom: 10 }}>Enable Maintenance Mode?</h3>
            <p style={{ color: '#64748b', fontSize: 14, lineHeight: 1.7, marginBottom: 28 }}>This will take your store offline for all visitors.</p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
              <button onClick={() => setShowMaintenanceConfirm(false)} style={{ padding: '10px 26px', borderRadius: 10, border: '1px solid #1e2d47', background: 'transparent', color: '#64748b', fontSize: 14, cursor: 'pointer' }}>Cancel</button>
              <button onClick={confirmMaintenance} style={{ padding: '10px 26px', borderRadius: 10, border: 'none', background: '#f59e0b', color: '#1a0a00', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Yes, enable it</button>
            </div>
          </div>
        </div>
      )}

      <main style={{ background: '#050d1a', minHeight: '100vh', paddingTop: maintenanceMode ? 36 : 0 }}>
        <section style={{ paddingTop: 96, paddingBottom: 28, textAlign: 'center' }}>
          <div style={{ maxWidth: 680, margin: '0 auto', padding: '0 24px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '5px 14px', borderRadius: 999, border: '1px solid rgba(34,211,238,0.2)', background: 'rgba(34,211,238,0.05)', marginBottom: 14 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22d3ee', animation: 'pulse 2s infinite', display: 'inline-block' }} />
              <span style={{ fontSize: 10, fontFamily: 'monospace', color: '#22d3ee', letterSpacing: 2, textTransform: 'uppercase' }}>Live Interactive Demo</span>
            </div>
            <h1 className="font-display" style={{ fontSize: 'clamp(26px,4vw,44px)', fontWeight: 700, color: 'white', lineHeight: 1.15, marginBottom: 10, letterSpacing: '-0.5px' }}>
              Experience Relay <span style={{ color: '#22d3ee' }}>firsthand.</span>
            </h1>
            <p style={{ color: '#64748b', fontSize: 15, lineHeight: 1.7, marginBottom: 18 }}>
              Place an order, process it, watch Relay ping your bot. Exactly as it works in production.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(30,45,71,0.8)', borderRadius: 999, padding: 3, gap: 2 }}>
                {(['telegram', 'whatsapp'] as Platform[]).map(p => (
                  <button key={p} onClick={() => { setPlatform(p); setMessages([makeWelcomeMsg(p)]) }}
                    style={{ padding: '6px 14px', borderRadius: 999, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 600, background: platform === p ? (p === 'telegram' ? '#2AABEE' : '#25D366') : 'transparent', color: platform === p ? 'white' : '#475569', transition: 'all 0.2s' }}>
                    {p === 'telegram' ? '✈️ Telegram' : '📱 WhatsApp'}
                  </button>
                ))}
              </div>
              <button onClick={() => setStage('role')} style={{ padding: '6px 14px', borderRadius: 999, border: '1px solid rgba(255,255,255,0.08)', background: 'transparent', color: '#475569', fontSize: 12, cursor: 'pointer' }}>
                ← Switch role
              </button>
            </div>
          </div>
        </section>

        <section style={{ maxWidth: 1080, margin: '0 auto', padding: '0 20px 80px' }}>
          <div style={{ display: 'flex', gap: 2, marginBottom: 20, overflowX: 'auto', paddingBottom: 2 }}>
            {storeTabs.map(tab => (
              <button key={tab.id} className="tab-btn" onClick={() => setActiveTab(tab.id)}
                style={{ padding: '9px 16px', borderRadius: 10, border: '1px solid', borderColor: activeTab === tab.id ? accentColor : 'rgba(30,45,71,0.8)', background: activeTab === tab.id ? `${accentColor}18` : 'rgba(10,22,40,0.6)', color: activeTab === tab.id ? (isTelegram ? '#2AABEE' : '#25D366') : '#475569', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                {tab.label}
                {tab.badge && tab.badge > 0 ? <span style={{ background: '#ef4444', color: 'white', fontSize: 10, fontWeight: 800, borderRadius: 999, padding: '1px 6px', minWidth: 18, textAlign: 'center' }}>{tab.badge}</span> : null}
              </button>
            ))}
          </div>

          {activeTab === 'store' && (
            <div className="panel" style={{ display: 'grid', gridTemplateColumns: cart ? '1fr 320px' : '1fr', gap: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12 }}>
                {PRODUCTS.map(p => (
                  <div key={p.id} className="product-card" onClick={() => setCart({ product: p, qty: 1 })}
                    style={{ background: 'rgba(10,22,40,0.8)', border: `1px solid ${cart?.product.id === p.id ? '#22d3ee' : 'rgba(30,45,71,0.8)'}`, borderRadius: 14, padding: 16 }}>
                    <div style={{ fontSize: 30, marginBottom: 8 }}>{p.emoji}</div>
                    <div style={{ color: 'white', fontWeight: 600, fontSize: 13, marginBottom: 3, lineHeight: 1.3 }}>{p.name}</div>
                    <div style={{ color: '#22d3ee', fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{fmtCurrency(p.price)}</div>
                    <div style={{ color: '#334155', fontSize: 11 }}>{p.stock} in stock</div>
                  </div>
                ))}
              </div>
              {cart && (
                <div style={{ background: 'rgba(10,22,40,0.9)', border: '1px solid rgba(30,45,71,0.8)', borderRadius: 16, padding: 20, height: 'fit-content', position: 'sticky', top: 90 }}>
                  <div style={{ fontSize: 11, color: '#22d3ee', fontFamily: 'monospace', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 16 }}>Cart</div>
                  <div style={{ display: 'flex', gap: 12, marginBottom: 16, padding: 12, background: 'rgba(34,211,238,0.04)', borderRadius: 10, border: '1px solid rgba(34,211,238,0.08)' }}>
                    <span style={{ fontSize: 28 }}>{cart.product.emoji}</span>
                    <div>
                      <div style={{ color: 'white', fontWeight: 600, fontSize: 13 }}>{cart.product.name}</div>
                      <div style={{ color: '#22d3ee', fontWeight: 700 }}>{fmtCurrency(cart.product.price)}</div>
                    </div>
                  </div>
                  <div style={{ marginBottom: 14 }}>
                    <div style={{ fontSize: 11, color: '#475569', marginBottom: 6 }}>Quantity</div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      {[1, 2, 3].map(q => (
                        <button key={q} onClick={() => setCart(c => c ? { ...c, qty: q } : c)}
                          style={{ width: 36, height: 36, borderRadius: 8, border: '1px solid', borderColor: cart.qty === q ? '#22d3ee' : '#1e2d47', background: cart.qty === q ? 'rgba(34,211,238,0.15)' : 'transparent', color: cart.qty === q ? '#22d3ee' : '#64748b', fontWeight: 700, cursor: 'pointer' }}>
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, paddingTop: 12, borderTop: '1px solid rgba(30,45,71,0.8)' }}>
                    <span style={{ color: '#64748b', fontSize: 13 }}>Total</span>
                    <span style={{ color: 'white', fontWeight: 700, fontSize: 16 }}>{fmtCurrency(cart.product.price * cart.qty)}</span>
                  </div>
                  <button onClick={handlePlaceOrder} style={{ width: '100%', padding: '12px', borderRadius: 10, border: 'none', background: 'linear-gradient(135deg,#22d3ee,#0ea5e9)', color: '#050d1a', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>Place Order</button>
                  <button onClick={() => setCart(null)} style={{ width: '100%', padding: '8px', borderRadius: 10, border: 'none', background: 'transparent', color: '#475569', fontSize: 12, cursor: 'pointer', marginTop: 6 }}>Cancel</button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'admin' && (
            <div className="panel">
              {orders.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 24px', color: '#334155' }}>
                  <div style={{ fontSize: 48, marginBottom: 12, opacity: 0.4 }}>📦</div>
                  <p>No orders yet. Head to the Store tab and place one.</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {orders.map(order => (
                    <div key={order.id} style={{ background: 'rgba(10,22,40,0.8)', border: `1px solid ${order.status === 'pending' ? 'rgba(34,211,238,0.2)' : 'rgba(30,45,71,0.6)'}`, borderRadius: 14, padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
                      <div style={{ flex: 1, minWidth: 200 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                          <span style={{ color: order.status === 'fulfilled' ? '#22d3ee' : '#f59e0b', fontWeight: 700, fontSize: 13, fontFamily: 'monospace' }}>{order.orderNumber}</span>
                          <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 999, background: order.status === 'fulfilled' ? 'rgba(34,211,238,0.1)' : 'rgba(245,158,11,0.1)', color: order.status === 'fulfilled' ? '#22d3ee' : '#f59e0b', fontWeight: 600, textTransform: 'uppercase' }}>{order.status}</span>
                        </div>
                        <div style={{ color: '#94a3b8', fontSize: 13 }}>{order.customerName} · {order.product.emoji} {order.product.name} × {order.qty}</div>
                        <div style={{ color: '#475569', fontSize: 11, marginTop: 2 }}>{fmtTime(order.timestamp)}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ color: 'white', fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{fmtCurrency(order.total)}</div>
                        {order.status === 'pending' && (
                          <button className="process-btn" onClick={() => handleProcessOrder(order.id)} disabled={processingId === order.id}
                            style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid rgba(34,211,238,0.25)', background: 'rgba(34,211,238,0.08)', color: '#22d3ee', fontSize: 12, fontWeight: 700, cursor: processingId === order.id ? 'wait' : 'pointer' }}>
                            {processingId === order.id ? '⏳ Processing…' : '✅ Fulfill & Notify'}
                          </button>
                        )}
                        {order.status === 'fulfilled' && <span style={{ color: '#22d3ee', fontSize: 12 }}>✅ Fulfilled</span>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'bot' && (
            <div className="panel" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,380px) 1fr', gap: 24, alignItems: 'start', justifyItems: 'start' }}>
              {isTelegram
                ? <TelegramPhone messages={messages} typing={typing} onAction={handleBotAction} onSend={handleCommand} cmdInput={cmdInput} setCmdInput={setCmdInput} />
                : <WhatsAppPhone messages={messages} typing={typing} onAction={handleBotAction} />
              }
              <div style={{ paddingTop: 8 }}>
                <div style={{ fontSize: 11, color: '#334155', fontFamily: 'monospace', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 14 }}>Try these</div>
                {isTelegram ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {[
                      { cmd: '/today', desc: "Today's orders & revenue" },
                      { cmd: '/week', desc: 'Last 7 days summary' },
                      { cmd: '/orders', desc: '5 most recent orders' },
                      { cmd: '/maintenance on', desc: 'Put store in maintenance mode' },
                      { cmd: '/help', desc: 'Show all commands' },
                    ].map(item => (
                      <button key={item.cmd} className="hint-pill" onClick={() => setCmdInput(item.cmd)}
                        style={{ textAlign: 'left', padding: '10px 14px', borderRadius: 10, border: '1px solid rgba(30,45,71,0.8)', background: 'rgba(10,22,40,0.6)', cursor: 'pointer', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                        <code style={{ color: '#22d3ee', fontSize: 12, fontFamily: 'monospace', flexShrink: 0 }}>{item.cmd}</code>
                        <span style={{ color: '#475569', fontSize: 12 }}>{item.desc}</span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <div style={{ background: 'rgba(10,22,40,0.6)', border: '1px solid rgba(30,45,71,0.8)', borderRadius: 12, padding: 14 }}>
                      <div style={{ fontSize: 12, color: '#25D366', fontWeight: 700, marginBottom: 6 }}>📱 WhatsApp Mode</div>
                      <p style={{ color: '#64748b', fontSize: 13, lineHeight: 1.6, margin: 0 }}>WhatsApp uses <strong style={{ color: '#cbd5e1' }}>tap buttons</strong> instead of commands.</p>
                    </div>
                    <div style={{ background: 'rgba(10,22,40,0.6)', border: '1px solid rgba(30,45,71,0.8)', borderRadius: 12, padding: 14 }}>
                      <div style={{ fontSize: 12, color: '#475569', marginBottom: 6 }}>Auto-received:</div>
                      {['🛒 New order notifications', '⚠️ Low stock alerts', '💬 Customer messages'].map((s, i) => (
                        <div key={i} style={{ color: '#64748b', fontSize: 13, marginBottom: 3 }}>{s}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="panel">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12, marginBottom: 24 }}>
                {[
                  { label: 'Orders Today', value: String(stats.orders), sub: 'from this demo session', icon: '🛒', color: '#22d3ee' },
                  { label: 'Revenue Today', value: fmtCurrency(stats.revenue), sub: stats.orders > 0 ? `avg ${fmtCurrency(stats.revenue / stats.orders)}` : 'no orders yet', icon: '💰', color: '#22d3ee' },
                  { label: 'Visitors', value: String(stats.visitors), sub: 'simulated GA data', icon: '👥', color: '#818cf8' },
                  { label: 'Conversion', value: stats.visitors > 0 ? (stats.orders / stats.visitors * 100).toFixed(1) + '%' : '0%', sub: 'orders / visitors', icon: '📈', color: '#f59e0b' },
                ].map(m => (
                  <div key={m.label} style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(30,45,71,0.8)', borderRadius: 14, padding: 18 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ color: '#475569', fontSize: 12 }}>{m.label}</span>
                      <span style={{ fontSize: 18 }}>{m.icon}</span>
                    </div>
                    <div style={{ color: m.color, fontWeight: 700, fontSize: 24, marginBottom: 3 }}>{m.value}</div>
                    <div style={{ color: '#334155', fontSize: 11 }}>{m.sub}</div>
                  </div>
                ))}
              </div>
              <div style={{ background: 'rgba(10,22,40,0.5)', border: '1px solid rgba(30,45,71,0.6)', borderRadius: 14, padding: 18 }}>
                <div style={{ fontSize: 12, color: '#475569', fontFamily: 'monospace', letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 12 }}>Relay sends all this to your chat</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8 }}>
                  {['Order notifications', 'Daily summaries', 'Weekly reports', 'Low stock alerts', 'Revenue queries', 'Customer messages'].map(s => (
                    <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#22d3ee', flexShrink: 0 }} />
                      <span style={{ color: '#64748b', fontSize: 12 }}>{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'chat' && (
            <div className="panel" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <div>
                <div style={{ fontSize: 11, color: '#334155', fontFamily: 'monospace', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>Customer View: Your Website</div>
                <div style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(30,45,71,0.8)', borderRadius: 16, overflow: 'hidden' }}>
                  <div style={{ background: '#0a1628', borderBottom: '1px solid rgba(30,45,71,0.8)', padding: '12px 16px', display: 'flex', gap: 6 }}>
                    {['#ef4444', '#f59e0b', '#22c55e'].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />)}
                    <div style={{ flex: 1, background: 'rgba(255,255,255,0.04)', borderRadius: 6, padding: '2px 10px', fontSize: 11, color: '#475569', marginLeft: 4 }}>yourstore.com{customerPage}</div>
                  </div>
                  <div style={{ padding: 20 }}>
                    <div style={{ background: 'rgba(34,211,238,0.04)', border: '1px solid rgba(34,211,238,0.1)', borderRadius: 12, padding: '14px 16px', marginBottom: 16 }}>
                      <p style={{ color: '#cbd5e1', fontSize: 13, lineHeight: 1.6, margin: 0 }}>👋 Got a question? We're online: send us a message and we'll reply instantly.</p>
                    </div>
                    <div style={{ marginBottom: 12 }}>
                      <div style={{ fontSize: 11, color: '#475569', marginBottom: 5 }}>Your name</div>
                      <input value={customerName} onChange={e => setCustomerName(e.target.value)} style={{ width: '100%', background: '#0d1b2a', border: '1px solid rgba(30,45,71,0.8)', borderRadius: 8, padding: '9px 12px', color: '#e2e8f0', fontSize: 13, outline: 'none', boxSizing: 'border-box' }} />
                    </div>
                    <div style={{ marginBottom: 12 }}>
                      <div style={{ fontSize: 11, color: '#475569', marginBottom: 5 }}>Current page</div>
                      <select value={customerPage} onChange={e => setCustomerPage(e.target.value)} style={{ width: '100%', background: '#0d1b2a', border: '1px solid rgba(30,45,71,0.8)', borderRadius: 8, padding: '9px 12px', color: '#e2e8f0', fontSize: 13, outline: 'none', boxSizing: 'border-box' }}>
                        {['/products', '/checkout', '/pricing', '/contact'].map(p => <option key={p} value={p}>{p}</option>)}
                      </select>
                    </div>
                    <div style={{ marginBottom: 14 }}>
                      <div style={{ fontSize: 11, color: '#475569', marginBottom: 5 }}>Message</div>
                      <textarea value={customerMsg} onChange={e => setCustomerMsg(e.target.value)} placeholder="Hey, I had a question about…" style={{ width: '100%', background: '#0d1b2a', border: '1px solid rgba(30,45,71,0.8)', borderRadius: 8, padding: '9px 12px', color: '#e2e8f0', fontSize: 13, outline: 'none', resize: 'none', height: 80, boxSizing: 'border-box' }} />
                    </div>
                    <button onClick={handleSendCustomerMsg} disabled={!customerMsg.trim()}
                      style={{ width: '100%', padding: '11px', borderRadius: 10, border: 'none', background: customerMsg.trim() ? 'linear-gradient(135deg,#22d3ee,#0ea5e9)' : 'rgba(30,45,71,0.8)', color: customerMsg.trim() ? '#050d1a' : '#334155', fontSize: 13, fontWeight: 700, cursor: customerMsg.trim() ? 'pointer' : 'not-allowed', transition: 'all 0.2s' }}>
                      Send Message →
                    </button>
                    {customerSent && <div style={{ marginTop: 10, fontSize: 12, color: '#22d3ee', textAlign: 'center' }}>✅ Message sent! Check the Bot tab.</div>}
                  </div>
                </div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: '#334155', fontFamily: 'monospace', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>How it works</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    { n: '01', icon: '💬', title: 'Visitor sends message', desc: 'From your website chat widget. Includes their name, message, and current page.' },
                    { n: '02', icon: isTelegram ? '✈️' : '📱', title: `Relay forwards to ${isTelegram ? 'Telegram' : 'WhatsApp'}`, desc: 'Instantly delivered to your bot chat with full context.' },
                    { n: '03', icon: '↩️', title: 'You reply from chat', desc: 'Your reply goes back to the visitor on your website in real time.' },
                  ].map(item => (
                    <div key={item.n} style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(30,45,71,0.8)', borderRadius: 12, padding: '14px 16px', display: 'flex', gap: 12 }}>
                      <div style={{ flexShrink: 0, width: 32, height: 32, borderRadius: 8, background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontFamily: 'monospace', color: '#22d3ee', fontWeight: 700 }}>{item.n}</div>
                      <div>
                        <div style={{ color: 'white', fontWeight: 600, fontSize: 13, marginBottom: 3 }}>{item.icon} {item.title}</div>
                        <div style={{ color: '#475569', fontSize: 12, lineHeight: 1.5 }}>{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {(activeTab === 'store' || activeTab === 'admin') && (
            <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
              {[
                { step: '01', icon: '🛍️', title: 'Browse & order', desc: 'Pick any product and place an order.' },
                { step: '02', icon: '⚙️', title: 'Process in Admin', desc: 'Go to Admin Panel and click Fulfill & Notify.' },
                { step: '03', icon: isTelegram ? '✈️' : '📱', title: 'Relay pings the bot', desc: `Watch the ${isTelegram ? 'Telegram' : 'WhatsApp'} Bot receive the notification instantly.` },
              ].map(item => (
                <div key={item.step} style={{ background: 'rgba(10,22,40,0.6)', border: '1px solid rgba(30,45,71,0.6)', borderRadius: 12, padding: '14px 16px', display: 'flex', gap: 10 }}>
                  <span style={{ fontSize: 20, flexShrink: 0 }}>{item.icon}</span>
                  <div>
                    <div style={{ fontSize: 10, color: '#22d3ee', fontFamily: 'monospace', letterSpacing: 1, marginBottom: 2 }}>STEP {item.step}</div>
                    <div style={{ color: 'white', fontWeight: 600, fontSize: 13, marginBottom: 2 }}>{item.title}</div>
                    <div style={{ color: '#475569', fontSize: 11, lineHeight: 1.5 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div style={{ marginTop: 48, textAlign: 'center' }}>
            <p style={{ color: '#334155', fontSize: 13, marginBottom: 14 }}>This is exactly how Relay works on your real store.</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap' }}>
              <Link href="/relay" className="btn-primary" style={{ fontSize: 14, padding: '11px 28px' }}>Learn about Relay</Link>
              <Link href="/contact" className="btn-secondary" style={{ fontSize: 14, padding: '11px 28px' }}>Request Access</Link>
            </div>
          </div>
        </section>
      </main>

      <div style={{ position: 'fixed', bottom: 28, left: 28, zIndex: 998 }}>
        {showHelp && (
          <div style={{ position: 'absolute', bottom: 56, left: 0, background: 'rgba(5,13,26,0.98)', border: '1px solid rgba(34,211,238,0.2)', borderRadius: 16, padding: 20, width: 270, boxShadow: '0 16px 60px rgba(0,0,0,0.6)', backdropFilter: 'blur(12px)', animation: 'fadeUp 0.2s ease' }}>
            <div style={{ fontWeight: 700, color: 'white', fontSize: 14, marginBottom: 12 }}>How to use this demo</div>
            {[
              { icon: '🛍️', text: 'Go to Store tab → pick a product → place an order' },
              { icon: '⚙️', text: 'Go to Admin tab → click Fulfill & Notify' },
              { icon: isTelegram ? '✈️' : '📱', text: `Watch the Bot tab: Relay pings ${isTelegram ? 'Telegram' : 'WhatsApp'} instantly` },
              { icon: '📊', text: 'Check Analytics for orders, revenue & visitors' },
              { icon: '🔧', text: 'Test /maintenance on from the bot' },
              { icon: '💬', text: 'Send a customer message from the Chat tab' },
            ].map((tip, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 7, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 13, flexShrink: 0 }}>{tip.icon}</span>
                <span style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.5 }}>{tip.text}</span>
              </div>
            ))}
          </div>
        )}
        <button onClick={() => setShowHelp(!showHelp)} style={{ width: 44, height: 44, borderRadius: '50%', background: '#0a1628', border: '1px solid rgba(34,211,238,0.3)', color: '#22d3ee', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.5)', transition: 'all 0.2s' }}>
          {showHelp ? '×' : '?'}
        </button>
      </div>

      <Footer />
    </>
  )
}
