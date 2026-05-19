'use client'
import { BotMessage } from './types'

type Line = NonNullable<BotMessage['lines']>[0]

export function MsgLine({ line }: { line: Line }) {
  if (!line.text && !line.append) return <div style={{ height: 4 }} />

  const textEl = line.bold
    ? <strong>{line.text}</strong>
    : line.italic
    ? <em style={{ opacity: 0.65, fontSize: 12 }}>{line.text}</em>
    : line.mono
    ? <code style={{ fontFamily: 'monospace', background: 'rgba(255,255,255,0.07)', padding: '1px 4px', borderRadius: 3, fontSize: 12 }}>{line.text}</code>
    : <span>{line.text}</span>

  return (
    <div style={{ lineHeight: 1.55, marginBottom: 1 }}>
      {textEl}
      {line.append && (
        line.append.bold
          ? <strong>{line.append.text}</strong>
          : <span>{line.append.text}</span>
      )}
    </div>
  )
}
