import { ArrowUpRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { links } from '../data/content'
import { useLang } from '../lang'
import { lowerFirst } from '../lowercase'
import { Section } from './Section'

type Repo = {
  id: number
  name: string
  html_url: string
  description: string | null
  language: string | null
  fork: boolean
  pushed_at: string
}

type State = { status: 'loading' } | { status: 'ok'; repos: Repo[] } | { status: 'error' }

function relativeDate(iso: string, locale: string) {
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' })
  const days = Math.round((new Date(iso).getTime() - Date.now()) / 86_400_000)
  if (days > -30) return rtf.format(days, 'day')
  const months = Math.round(days / 30)
  if (months > -12) return rtf.format(months, 'month')
  return rtf.format(Math.round(months / 12), 'year')
}

export function GitHubActivity() {
  const { t, lang } = useLang()
  const locale = lang === 'pt' ? 'pt-BR' : 'en'
  const [state, setState] = useState<State>({ status: 'loading' })

  useEffect(() => {
    const ctrl = new AbortController()
    fetch(`https://api.github.com/users/${links.githubUser}/repos?sort=pushed&per_page=30`, {
      signal: ctrl.signal,
      headers: { Accept: 'application/vnd.github+json' },
    })
      .then((r) => (r.ok ? (r.json() as Promise<Repo[]>) : Promise.reject(new Error(String(r.status)))))
      .then((repos) =>
        setState({
          status: 'ok',
          repos: repos.filter((r) => !r.fork && r.name !== links.githubUser).slice(0, 6),
        }),
      )
      .catch(() => {
        if (!ctrl.signal.aborted) setState({ status: 'error' })
      })
    return () => ctrl.abort()
  }, [])

  return (
    <Section id="github" title={t.ui.github.title} lead={t.ui.github.lead}>
      {state.status === 'loading' && (
        <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3" aria-busy="true">
          {Array.from({ length: 6 }).map((_, i) => (
            <li key={i} className="h-36 animate-pulse rounded-2xl border border-paper bg-paper/40" />
          ))}
        </ul>
      )}

      {state.status === 'error' && (
        <p className="text-base text-muted">
          {t.ui.github.error}{' '}
          <a href={links.github} target="_blank" rel="noreferrer" className="link-hand text-ink">
            {t.ui.github.seeOnGitHub}
          </a>
          .
        </p>
      )}

      {state.status === 'ok' && (
        <>
          <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {state.repos.map((r) => (
              <li key={r.id}>
                <a
                  href={r.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="surface flex h-full flex-col rounded-2xl border border-paper p-6 transition-colors hover:border-ink"
                >
                  <span className="flex items-start justify-between gap-3">
                    <span className="font-semibold tracking-tight break-all">{r.name}</span>
                    <ArrowUpRight size={16} strokeWidth={2} className="shrink-0 text-muted" aria-hidden="true" />
                  </span>
                  <span className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                    {r.description ? lowerFirst(r.description) : t.ui.github.noDescription}
                  </span>
                  <span className="mt-4 flex items-center gap-3 text-xs text-muted">
                    {r.language && (
                      <span className="inline-flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-ink" aria-hidden="true" />
                        {r.language}
                      </span>
                    )}
                    <span>
                      {t.ui.github.updated} {relativeDate(r.pushed_at, locale)}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <a
            href={links.github}
            target="_blank"
            rel="noreferrer"
            className="link-hand mt-8 inline-flex items-center gap-1.5 text-sm font-medium"
          >
            {t.ui.github.all}
            <ArrowUpRight size={14} strokeWidth={2} aria-hidden="true" />
          </a>
        </>
      )}
    </Section>
  )
}
