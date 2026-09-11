import { ArrowUpRight, Mail } from 'lucide-react'
import { links } from '../data/content'
import { useLang } from '../lang'
import { Lily } from './Lily'
import { Container } from './Section'

const btn =
  'inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors'

export function Contact() {
  const { t } = useLang()
  return (
    <section id="contato" className="scroll-mt-20 border-t border-paper">
      <Container className="relative py-24 md:py-32">
        <div className="bloom-host grid items-end gap-10 lg:grid-cols-[1fr_auto]">
          <div className="readable max-w-2xl">
            <h2 className="text-4xl font-semibold tracking-tight md:text-6xl">{t.ui.contact.title}</h2>
            <p className="mt-6 text-lg leading-relaxed text-muted md:text-xl">{t.ui.contact.text}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href={`mailto:${links.email}`} className={`${btn} bg-ink text-white hover:bg-muted`}>
                <Mail size={16} strokeWidth={2} aria-hidden="true" />
                {links.email}
              </a>
              <a href={links.linkedin} target="_blank" rel="noreferrer" className={`${btn} border border-ink hover:bg-paper`}>
                linkedin
                <ArrowUpRight size={15} strokeWidth={2} aria-hidden="true" />
              </a>
              <a href={links.github} target="_blank" rel="noreferrer" className={`${btn} border border-ink hover:bg-paper`}>
                github
                <ArrowUpRight size={15} strokeWidth={2} aria-hidden="true" />
              </a>
            </div>
          </div>
          <Lily state="partial" className="hidden h-64 w-auto lg:block" />
        </div>
      </Container>
    </section>
  )
}
