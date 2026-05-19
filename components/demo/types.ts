// ─── Types ───────────────────────────────────────────────────────────────────
export type Role = 'store' | 'enterprise'
export type Platform = 'telegram' | 'whatsapp'
export type Stage = 'intro' | 'role' | 'demo'
export type DemoTab = 'store' | 'admin' | 'bot' | 'analytics' | 'chat'

export interface Product {
  id: number
  name: string
  price: number
  emoji: string
  stock: number
  category: string
}

export interface Order {
  id: string
  orderNumber: string
  customerName: string
  product: Product
  qty: number
  total: number
  status: 'pending' | 'processing' | 'fulfilled'
  timestamp: Date
}

export interface BotMessage {
  id: string
  from: 'bot' | 'user' | 'customer'
  text?: string
  lines?: Array<{
    text: string
    bold?: boolean
    italic?: boolean
    mono?: boolean
    append?: { text: string; bold?: boolean }
  }>
  time: string
  isNew?: boolean
  buttons?: Array<{ label: string; action: string }>
  table?: {
    headers: string[]
    rows: string[][]
    source?: string
    sourceColor?: string
  }[]
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
export const fmtTime = (d = new Date()) =>
  d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })

export const fmtCurrency = (n: number) =>
  `$${n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`

export const genOrderNum = () => '#' + Math.floor(10000 + Math.random() * 90000)

export const CUSTOMER_NAMES = [
  'Alex Chen', 'Priya Nair', 'James Wilson',
  'Sofia Rodriguez', 'Mohammed Al-Rashid', 'Emma Thompson',
]

export const randomName = () =>
  CUSTOMER_NAMES[Math.floor(Math.random() * CUSTOMER_NAMES.length)]

export const uid = () => Math.random().toString(36).slice(2)
