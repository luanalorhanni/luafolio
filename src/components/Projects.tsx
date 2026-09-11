import { ArrowUpRight } from 'lucide-react'
import { useState } from 'react'
import type { Project } from '../data/content'
import { useLang } from '../lang'
import { Cover } from './Covers'
import { Chip, Section } from './Section'

function Preview({ p, alt }: { p: Project; alt: string }) {
  const [failed, setFailed] = useState(false)
  const [altFailed, setAltFailed] = useState(false)
  if (!p.image || failed) return <Cover kind={p.cover} />
  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-paper bg-paper">
      <img
        src={p.image}
        alt={alt}
        loading="lazy"
        width={1280}
        height={720}
        onError={() => setFailed(true)}
        className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
      />
      {p.imageAlt && !altFailed && (
        <img
          src={p.imageAlt}
          alt=""
          loading="lazy"
          width={1280}
          height={720}
          onError={() => setAltFailed(true)}
          className="absolute inset-0 h-full w-full object-cover object-top opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
      )}
    </div>
  )
}

export function Projects() {
  const { t } = useLang()
  return (
    <Section id="projetos" title={t.ui.projects.title} lead={t.ui.projects.lead}>
      <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {t.projects.map((p) => (
          <li
            key={p.title}
            className="surface group flex flex-col overflow-hidden rounded-2xl border border-paper transition-colors hover:border-ink"
          >
            <Preview p={p} alt={`${t.ui.projects.previewOf} ${p.title}`} />
            <div className="flex flex-1 flex-col p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-sm text-muted">
                <span>{p.kind}</span>
                {p.period && <span>{p.period}</span>}
              </div>
              <h3 className="mt-2 text-xl font-semibold tracking-tight">{p.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted md:text-base">{p.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {p.tags.map((tag) => (
                  <Chip key={tag}>{tag}</Chip>
                ))}
              </div>
              {p.url && (
                <a
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex w-fit items-center gap-1.5 rounded-full border border-ink px-4 py-2 text-sm font-medium transition-colors hover:bg-ink hover:text-white"
                >
                  {p.urlLabel ?? t.ui.projects.view}
                  <ArrowUpRight size={15} strokeWidth={2} aria-hidden="true" />
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
    </Section>
  )
}
