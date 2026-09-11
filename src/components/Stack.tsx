import { useLang } from '../lang'
import { Chip, Section } from './Section'

export function Stack() {
  const { t } = useLang()
  return (
    <Section id="stack" title={t.ui.stack.title} lead={t.ui.stack.lead}>
      <dl className="readable divide-y divide-paper">
        {t.stack.map((g) => (
          <div key={g.group} className="grid gap-3 py-6 md:grid-cols-[220px_1fr] md:gap-8">
            <dt className="text-base font-semibold">{g.group}</dt>
            <dd className="flex flex-wrap gap-2">
              {g.items.map((item) => (
                <Chip key={item}>{item}</Chip>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}
