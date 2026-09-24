import { ArrowDown } from 'lucide-react'
import { links } from '../data/content'
import { useLang } from '../lang'
import { Die } from './Die'
import { Lily } from './Lily'
import { Pipeline } from './Pipeline'
import { Container } from './Section'

const btn =
  'inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors'

export function Hero() {
  const { t } = useLang()
  return (
    <header id="topo">
      <Container className="grid items-center gap-12 pt-14 pb-16 md:pt-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:pt-24">
        <div className="readable">
          <p className="inline-flex items-center gap-2.5 rounded-full border border-ink/20 py-1.5 pr-4 pl-2.5 text-sm text-muted">
            <Die face={1} rollEvery={1400} className="h-6 w-6" />
            {t.profile.status}
          </p>

          <h1 className="mt-8 text-5xl font-bold tracking-tight md:text-7xl">
            <span className="block font-medium text-muted">{t.ui.hello}</span>
            <span className="block">{t.profile.name}</span>
          </h1>

          <p className="mt-6 text-xl text-ink md:text-2xl">{t.profile.role}</p>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted md:text-lg">{t.profile.summary}</p>
          <p className="font-hand mt-5 text-3xl text-muted">{t.profile.tagline}</p>

          <div className="mt-10 flex flex-wrap gap-3">
            <a href="#projetos" className={`${btn} bg-ink text-white hover:bg-muted`}>
              {t.ui.seeProjects}
              <ArrowDown size={16} strokeWidth={2} aria-hidden="true" />
            </a>
            <a href={links.github} target="_blank" rel="noreferrer" className={`${btn} border border-ink/20 hover:border-ink`}>
              github
            </a>
            <a href={links.linkedin} target="_blank" rel="noreferrer" className={`${btn} border border-ink/20 hover:border-ink`}>
              linkedin
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm lg:mr-0 lg:max-w-md">
          <img
            src={links.photo}
            alt={t.ui.photoAlt}
            width={1140}
            height={1140}
            className="photo aspect-square w-full rounded-3xl object-cover"
            loading="eager"
            fetchPriority="high"
          />
          <Lily className="pointer-events-none absolute -bottom-10 -left-10 hidden h-56 w-auto md:block" />
        </div>
      </Container>

      <Container className="pb-20 md:pb-28">
        <Pipeline />
      </Container>
    </header>
  )
}
