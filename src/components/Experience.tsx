import { useLang } from '../lang'
import { Section } from './Section'

export function Experience() {
  const { t } = useLang()
  return (
    <Section id="experiencia" title={t.ui.experience.title} lead={t.ui.experience.lead}>
      <ol className="readable relative pl-8 md:pl-12">
        <span aria-hidden="true" className="flow-line absolute top-2 bottom-2 left-[3px] w-0.5" />
        {t.experience.map((job, i) => (
          <li key={job.company} className={i === t.experience.length - 1 ? '' : 'pb-14'}>
            <span
              aria-hidden="true"
              className={`absolute left-0 mt-2 h-2 w-2 rounded-full ring-4 ring-white ${
                i === 0 ? 'bg-ink' : 'bg-muted'
              }`}
            />
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <h3 className="text-2xl font-semibold tracking-tight">{job.role}</h3>
              <span className="text-sm text-muted">{job.period}</span>
            </div>
            <p className="mt-1 text-base text-muted">{job.company}</p>
            <ul className="mt-5 max-w-2xl space-y-2.5 text-base leading-relaxed">
              {job.bullets.map((b) => (
                <li key={b} className="flex gap-3">
                  <span aria-hidden="true" className="mt-3 h-px w-4 shrink-0 bg-ink" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </Section>
  )
}
