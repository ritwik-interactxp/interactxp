import { BotMessage, fmtTime, uid } from './types'

export type DashboardId =
  | 'salesforce'
  | 'analytics'
  | 'stripe'
  | 'jira'
  | 'hubspot'
  | 'cloudwatch'

export interface Dashboard {
  id: DashboardId
  name: string
  icon: string
  color: string
  category: string
  description: string
}

export const DASHBOARDS: Dashboard[] = [
  { id: 'salesforce', name: 'Salesforce', icon: '☁️', color: '#00A1E0', category: 'CRM', description: 'Pipeline, deals & leads' },
  { id: 'analytics', name: 'Google Analytics', icon: '📊', color: '#E37400', category: 'Traffic', description: 'Sessions, users & conversion' },
  { id: 'stripe', name: 'Stripe', icon: '💳', color: '#635BFF', category: 'Revenue', description: 'MRR, payments & churn' },
  { id: 'jira', name: 'Jira', icon: '🎯', color: '#0052CC', category: 'Engineering', description: 'Sprints, tickets & velocity' },
  { id: 'hubspot', name: 'HubSpot', icon: '🧲', color: '#FF7A59', category: 'Marketing', description: 'Campaigns, contacts & ROI' },
  { id: 'cloudwatch', name: 'AWS CloudWatch', icon: '🖥️', color: '#FF9900', category: 'Infra', description: 'Uptime, latency & errors' },
]

// ─── Per-source table data generators ────────────────────────────────────────

function salesforceTable(): BotMessage['table'] {
  return [{
    source: 'Salesforce CRM',
    sourceColor: '#00A1E0',
    headers: ['Metric', 'This Month', 'Last Month', 'Δ'],
    rows: [
      ['Pipeline Value', '$1,240,000', '$980,000', '▲ +26.5%'],
      ['Open Deals', '47', '39', '▲ +8'],
      ['Closed Won', '12', '9', '▲ +3'],
      ['Closed Lost', '4', '7', '▼ -3'],
      ['New Leads', '134', '98', '▲ +36.7%'],
      ['Avg Deal Size', '$26,383', '$21,111', '▲ +25.0%'],
      ['Win Rate', '75.0%', '56.3%', '▲ +18.7pp'],
    ],
  }]
}

function analyticsTable(): BotMessage['table'] {
  return [{
    source: 'Google Analytics',
    sourceColor: '#E37400',
    headers: ['Metric', 'Today', '7-Day Avg', 'Δ'],
    rows: [
      ['Sessions', '8,421', '6,834', '▲ +23.2%'],
      ['Unique Users', '6,109', '5,012', '▲ +21.9%'],
      ['Pageviews', '24,337', '19,881', '▲ +22.4%'],
      ['Bounce Rate', '38.2%', '42.1%', '▼ -3.9pp'],
      ['Avg Session', '3m 42s', '3m 18s', '▲ +24s'],
      ['Goal Conv. Rate', '4.8%', '3.9%', '▲ +0.9pp'],
      ['Top Channel', 'Organic Search', '—', '—'],
    ],
  }]
}

function stripeTable(): BotMessage['table'] {
  return [{
    source: 'Stripe',
    sourceColor: '#635BFF',
    headers: ['Metric', 'Value', 'Period', 'Status'],
    rows: [
      ['MRR', '$84,230', 'This month', '▲ +8.3%'],
      ['ARR (Run Rate)', '$1,010,760', 'Annualised', '🟢 On track'],
      ['New Subscriptions', '38', 'This month', '▲ +12'],
      ['Churned', '5', 'This month', '▼ -2 vs last'],
      ['Net Revenue Churn', '1.4%', 'This month', '🟢 Healthy'],
      ['Failed Payments', '3', 'This month', '⚠️ Retry pending'],
      ['Avg Revenue/User', '$312', 'This month', '▲ +4.1%'],
    ],
  }]
}

function jiraTable(): BotMessage['table'] {
  return [{
    source: 'Jira',
    sourceColor: '#0052CC',
    headers: ['Category', 'Count', 'Sprint', 'Status'],
    rows: [
      ['Open Tickets', '23', 'Sprint 41', '🔵 In progress'],
      ['In Review', '8', 'Sprint 41', '🟡 Awaiting'],
      ['Blocked', '2', 'Sprint 41', '🔴 Action needed'],
      ['Closed This Sprint', '31', 'Sprint 41', '✅ Done'],
      ['Story Points Done', '84 / 110', 'Sprint 41', '76.4% complete'],
      ['Bugs Opened', '6', 'This week', '▲ +2 vs last'],
      ['Bugs Closed', '9', 'This week', '▲ +3 vs last'],
    ],
  }]
}

function hubspotTable(): BotMessage['table'] {
  return [{
    source: 'HubSpot',
    sourceColor: '#FF7A59',
    headers: ['Metric', 'This Month', 'Last Month', 'Δ'],
    rows: [
      ['Email Campaigns', '4', '3', '▲ +1'],
      ['Emails Sent', '12,440', '9,800', '▲ +27.0%'],
      ['Open Rate', '29.4%', '26.1%', '▲ +3.3pp'],
      ['Click Rate', '5.8%', '4.2%', '▲ +1.6pp'],
      ['New Contacts', '891', '672', '▲ +32.6%'],
      ['MQL → SQL', '18.3%', '14.7%', '▲ +3.6pp'],
      ['Campaign ROI', '340%', '280%', '▲ +60pp'],
    ],
  }]
}

function cloudwatchTable(): BotMessage['table'] {
  return [{
    source: 'AWS CloudWatch',
    sourceColor: '#FF9900',
    headers: ['Service', 'Uptime', 'Avg Latency', 'Errors'],
    rows: [
      ['API Gateway', '99.98%', '142ms', '0 critical'],
      ['Lambda (prod)', '100%', '38ms', '2 warnings'],
      ['RDS (primary)', '99.99%', '18ms', '0 critical'],
      ['ElastiCache', '100%', '4ms', '0 critical'],
      ['S3 Buckets', '100%', '—', '0 critical'],
      ['CloudFront CDN', '100%', '22ms', '0 critical'],
      ['Overall SLA', '99.97%', '—', '🟢 Within SLA'],
    ],
  }]
}

export const SOURCE_DATA: Record<DashboardId, () => BotMessage['table']> = {
  salesforce: salesforceTable,
  analytics: analyticsTable,
  stripe: stripeTable,
  jira: jiraTable,
  hubspot: hubspotTable,
  cloudwatch: cloudwatchTable,
}

// ─── Message builders ─────────────────────────────────────────────────────────

export function makeTeamsWelcome(connected: DashboardId[]): BotMessage {
  const names = connected.map(id => DASHBOARDS.find(d => d.id === id)!.name)
  return {
    id: uid(), from: 'bot', time: fmtTime(),
    lines: [
      { text: '👋 Relay is ready.', bold: true },
      { text: '' },
      { text: `Connected to ${connected.length} source${connected.length !== 1 ? 's' : ''}:` },
      ...names.map(n => ({ text: `  ✓ ${n}` })),
      { text: '' },
      { text: 'Query any source by name, or compile all:', italic: true },
    ],
    buttons: [
      ...connected.slice(0, 4).map(id => {
        const d = DASHBOARDS.find(d => d.id === id)!
        return { label: `${d.icon} ${d.name}`, action: `/${id}` }
      }),
      { label: '🔀 Compile All', action: '/compile' },
      { label: '❓ Help', action: '/help' },
    ],
  }
}

export function makeSingleSourceMsg(id: DashboardId): BotMessage {
  const dash = DASHBOARDS.find(d => d.id === id)!
  return {
    id: uid(), from: 'bot', time: fmtTime(),
    lines: [
      { text: `${dash.icon} ${dash.name}`, bold: true },
      { text: `Live data · ${fmtTime()}`, italic: true },
      { text: '' },
    ],
    table: SOURCE_DATA[id](),
  }
}

export function makeCompileMsg(connected: DashboardId[]): BotMessage {
  return {
    id: uid(), from: 'bot', time: fmtTime(),
    lines: [
      { text: '🔀 Compiled Report: All Sources', bold: true },
      { text: `${connected.length} dashboards · ${fmtTime()}`, italic: true },
      { text: '' },
    ],
    table: connected.flatMap(id => SOURCE_DATA[id]() ?? []),
  }
}

export function makeHelpMsg(connected: DashboardId[]): BotMessage {
  return {
    id: uid(), from: 'bot', time: fmtTime(),
    lines: [
      { text: 'Relay: Enterprise Commands', bold: true },
      { text: '' },
      ...connected.map(id => {
        const d = DASHBOARDS.find(d => d.id === id)!
        return { text: `/${id.padEnd(12)} ${d.icon} ${d.name}`, mono: true }
      }),
      { text: '/compile      🔀 All sources at once', mono: true },
      { text: '/help         ❓ This message', mono: true },
      { text: '' },
      { text: 'Connect more sources in the Onboarding tab.', italic: true },
    ],
  }
}
