import { BotMessage, Order, Product, Platform, fmtTime, fmtCurrency, uid } from './types'

export function makeWelcomeMsg(platform: Platform): BotMessage {
  if (platform === 'telegram') {
    return {
      id: uid(), from: 'bot', time: fmtTime(),
      lines: [
        { text: '👋 Relay connected to ', append: { text: 'Demo Store', bold: true } },
        { text: '' },
        { text: "You'll receive live notifications for:" },
        { text: '• New orders as they arrive' },
        { text: '• Low stock alerts' },
        { text: '• Customer messages' },
        { text: '' },
        { text: 'Available commands:', bold: true },
        { text: '/today  /week  /month', mono: true },
        { text: '/orders  /help', mono: true },
        { text: '/maintenance on|off', mono: true },
      ],
    }
  }
  return {
    id: uid(), from: 'bot', time: fmtTime(),
    lines: [
      { text: '👋 Relay connected to ', append: { text: 'Demo Store', bold: true } },
      { text: '' },
      { text: "You'll receive live notifications for orders, alerts, and customer messages." },
      { text: '' },
      { text: 'Tap a button below to get started:', italic: true },
    ],
    buttons: [
      { label: '📊 Today Stats', action: '/today' },
      { label: '🛒 Recent Orders', action: '/orders' },
      { label: '🔧 Maintenance', action: '/maintenance_prompt' },
      { label: '❓ Help', action: '/help' },
    ],
  }
}

export function makeOrderMsg(order: Order): BotMessage {
  return {
    id: uid(), from: 'bot', time: fmtTime(order.timestamp),
    lines: [
      { text: '🛒 New Order', bold: true },
      { text: '' },
      { text: 'Order: ', append: { text: order.orderNumber, bold: true } },
      { text: 'Customer: ', append: { text: order.customerName } },
      { text: 'Item: ', append: { text: order.product.name } },
      { text: 'Qty: ', append: { text: String(order.qty) } },
      { text: 'Total: ', append: { text: fmtCurrency(order.total), bold: true } },
      { text: '' },
      { text: fmtTime(order.timestamp), italic: true },
    ],
  }
}

export function makeFulfilledMsg(order: Order): BotMessage {
  return {
    id: uid(), from: 'bot', time: fmtTime(),
    lines: [
      { text: '✅ Order Fulfilled', bold: true },
      { text: '' },
      { text: order.orderNumber + ' · ' + order.customerName },
      { text: fmtCurrency(order.total) + ', marked as fulfilled' },
    ],
  }
}

export function makeTodayMsg(stats: { orders: number; revenue: number; visitors: number }): BotMessage {
  return {
    id: uid(), from: 'bot', time: fmtTime(),
    lines: [
      { text: '📊 Today\'s Summary', bold: true },
      { text: '' },
      { text: 'Orders:   ', append: { text: String(stats.orders), bold: true } },
      { text: 'Revenue:  ', append: { text: fmtCurrency(stats.revenue), bold: true } },
      { text: 'Visitors: ', append: { text: String(stats.visitors), bold: true } },
      { text: 'Avg order:', append: { text: stats.orders > 0 ? fmtCurrency(stats.revenue / stats.orders) : '$0.00' } },
    ],
  }
}

export function makeWeekMsg(stats: { orders: number; revenue: number }): BotMessage {
  return {
    id: uid(), from: 'bot', time: fmtTime(),
    lines: [
      { text: '📅 Last 7 Days', bold: true },
      { text: '' },
      { text: 'Orders:    ', append: { text: String(stats.orders), bold: true } },
      { text: 'Revenue:   ', append: { text: fmtCurrency(stats.revenue), bold: true } },
      { text: 'Avg order: ', append: { text: fmtCurrency(stats.revenue / (stats.orders || 1)) } },
    ],
  }
}

export function makeOrdersMsg(orders: Order[]): BotMessage {
  const lines: BotMessage['lines'] = [{ text: '🛒 Recent Orders', bold: true }, { text: '' }]
  if (orders.length === 0) {
    lines!.push({ text: 'No orders yet. Place one from the Store tab!', italic: true })
  } else {
    orders.slice(0, 5).forEach(o => {
      const icon = o.status === 'fulfilled' ? '✅' : '⏳'
      lines!.push({
        text: `${icon} ${o.orderNumber} · ${o.customerName} · `,
        append: { text: fmtCurrency(o.total), bold: true },
      })
    })
  }
  return { id: uid(), from: 'bot', time: fmtTime(), lines }
}

export function makeLowStockMsg(product: Product): BotMessage {
  return {
    id: uid(), from: 'bot', time: fmtTime(),
    lines: [
      { text: '⚠️ Low Stock Alert', bold: true },
      { text: '' },
      { text: product.name },
      { text: 'Only ', append: { text: `${product.stock} units left`, bold: true } },
      { text: 'Consider restocking soon.', italic: true },
    ],
  }
}

export function makeMaintenanceMsg(on: boolean): BotMessage {
  return {
    id: uid(), from: 'bot', time: fmtTime(),
    lines: on
      ? [
          { text: '🔧 Maintenance Mode ON', bold: true },
          { text: '' },
          { text: 'Your store is now offline for visitors.' },
          { text: 'Use /maintenance off to restore.', italic: true },
        ]
      : [
          { text: '✅ Maintenance Mode OFF', bold: true },
          { text: '' },
          { text: 'Your store is back online for visitors.' },
        ],
  }
}

export function makeCustomerMsg(name: string, msg: string, page: string): BotMessage {
  return {
    id: uid(), from: 'customer', time: fmtTime(),
    lines: [
      { text: '💬 Customer Message', bold: true },
      { text: '' },
      { text: 'From: ', append: { text: name, bold: true } },
      { text: 'Page: ', append: { text: page } },
      { text: '' },
      { text: msg },
      { text: '' },
      { text: 'Reply from Telegram/WhatsApp to respond.', italic: true },
    ],
  }
}

export function makeHelpMsg(platform: Platform): BotMessage {
  if (platform === 'telegram') {
    return {
      id: uid(), from: 'bot', time: fmtTime(),
      lines: [
        { text: 'Relay: Demo Store', bold: true },
        { text: '' },
        { text: '/today     today\'s orders & revenue', mono: true },
        { text: '/week      last 7 days', mono: true },
        { text: '/month     last 30 days', mono: true },
        { text: '/orders    5 most recent orders', mono: true },
        { text: '/maintenance on|off', mono: true },
        { text: '/help      this message', mono: true },
        { text: '' },
        { text: 'Relay sends automatic notifications for every event.', italic: true },
      ],
    }
  }
  return {
    id: uid(), from: 'bot', time: fmtTime(),
    lines: [{ text: 'Relay: Demo Store', bold: true }, { text: '' }, { text: 'Tap a button to get live data:', italic: true }],
    buttons: [
      { label: '📊 Today', action: '/today' },
      { label: '📅 This Week', action: '/week' },
      { label: '🛒 Orders', action: '/orders' },
      { label: '🔧 Maintenance', action: '/maintenance_prompt' },
    ],
  }
}
