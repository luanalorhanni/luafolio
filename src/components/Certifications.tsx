import { ArrowUpRight, Award } from 'lucide-react'
import { useLang } from '../lang'
import { Section } from './Section'

export function Certifications() {
  const { t } = useLang()
  return (
    <Section id="certificacoes" title={t.ui.certifications.title} lead={t.ui.certifications.lead}>
      <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {t.certifications.map((c) => {
          const inner = (
            <>
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-full border ${
                  c.url ? 'border-ink bg-ink text-white' : 'border-ink/20 text-ink'
                }`}
              >
                <Award size={18} strokeWidth={1.75} aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-lg font-semibold tracking-tight">{c.title}</h3>
              <p className="mt-1 text-sm text-muted">
                {c.issuer}
                {c.date && <span className="block">{c.date}</span>}
              </p>
              {c.url && (
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium">
                  {t.ui.certifications.view}
                  <ArrowUpRight size={14} strokeWidth={2} aria-hidden="true" />
                </span>
              )}
            </>
          )
          const cls = 'surface flex h-full flex-col rounded-2xl border border-paper p-6 transition-colors'
          return (
            <li key={c.title}>
              {c.url ? (
                <a href={c.url} target="_blank" rel="noreferrer" className={`${cls} hover:border-ink`}>
                  {inner}
                </a>
              ) : (
                <div className={cls}>{inner}</div>
              )}
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
