import { useLang } from '../lang'
import { Lily } from './Lily'
import { Section } from './Section'

export function About() {
  const { t } = useLang()
  return (
    <Section
      id="sobre"
      title={t.ui.about.title}
      aside={
        <div className="bloom-host mt-8 hidden md:block">
          <Lily state="partial" className="h-40 w-auto" />
        </div>
      }
    >
      <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
        <div className="readable space-y-5 text-lg leading-relaxed md:text-xl">
          {t.about.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
        <dl className="surface divide-y divide-paper self-start rounded-2xl border border-paper px-6">
          {t.facts.map((f) => (
            <div key={f.label} className="py-4">
              <dt className="text-sm text-muted">{f.label}</dt>
              <dd className="mt-1 text-base font-medium">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  )
}
