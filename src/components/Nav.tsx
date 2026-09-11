import { Moon, Sun } from 'lucide-react'
import { useLang } from '../lang'
import { useTheme } from '../theme'
import { Die } from './Die'

export function Nav() {
  const { t, lang, setLang } = useLang()
  const { theme, toggle } = useTheme()
  const links = [
    { href: '#sobre', label: t.ui.nav.about },
    { href: '#faco', label: t.ui.nav.work },
    { href: '#experiencia', label: t.ui.nav.experience },
    { href: '#projetos', label: t.ui.nav.projects },
    { href: '#stack', label: t.ui.nav.stack },
    { href: '#certificacoes', label: t.ui.nav.certifications },
    { href: '#contato', label: t.ui.nav.contact },
  ]
  const iconBtn =
    'inline-flex h-9 items-center justify-center rounded-full border border-ink/20 px-3 text-sm font-medium transition-colors hover:border-ink'

  return (
    <nav
      aria-label={lang === 'pt' ? 'Seções do portfólio' : 'Portfolio sections'}
      className="surface sticky top-0 z-20 border-b border-paper"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-3 md:px-10">
        <a href="#topo" className="inline-flex items-center gap-2.5 text-sm font-semibold tracking-tight">
          <Die face={5} className="die-hover h-7 w-7" />
          {t.profile.name}
        </a>
        <ul className="hidden gap-7 text-sm text-muted lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="transition-colors hover:text-ink">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')}
            className={iconBtn}
            aria-label={t.ui.switchLang}
            title={t.ui.switchLang}
          >
            {lang === 'pt' ? 'EN' : 'PT'}
          </button>
          <button
            type="button"
            onClick={toggle}
            className={`${iconBtn} w-9 px-0`}
            aria-label={theme === 'dark' ? t.ui.themeLight : t.ui.themeDark}
            title={theme === 'dark' ? t.ui.themeLight : t.ui.themeDark}
          >
            {theme === 'dark' ? (
              <Sun size={16} strokeWidth={2} aria-hidden="true" />
            ) : (
              <Moon size={16} strokeWidth={2} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
    </nav>
  )
}
