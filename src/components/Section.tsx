import type { ReactNode } from 'react'
import { Die } from './Die'

type SectionProps = {
  id: string
  title: string
  lead?: string
  aside?: ReactNode
  children: ReactNode
}

/**
 * Editorial two-column section: title column on the left, content on the right.
 * Full-width hairline on top; content constrained to the page container.
 */
export function Section({ id, title, lead, aside, children }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-20 border-t border-paper">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 md:grid-cols-[260px_1fr] md:gap-16 md:px-10 md:py-28">
        <div className="md:sticky md:top-24 md:self-start">
          <div className="readable">
            <Die face={((title.length - 1) % 6) + 1} className="mb-4 h-7 w-7 text-muted" />
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{title}</h2>
            {lead && <p className="mt-3 max-w-xs text-base text-muted">{lead}</p>}
            {aside}
          </div>
        </div>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  )
}

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-7xl px-6 md:px-10 ${className}`}>{children}</div>
}

export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-ink/20 px-3 py-1 text-sm">
      {children}
    </span>
  )
}
