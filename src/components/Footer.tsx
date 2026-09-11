import { links } from '../data/content'
import { useLang } from '../lang'
import { Die } from './Die'
import { Container } from './Section'

export function Footer() {
  const { t } = useLang()
  return (
    <footer className="border-t border-paper">
      <Container className="flex flex-wrap items-center justify-between gap-4 py-8 text-sm text-muted">
        <p className="inline-flex items-center gap-2.5">
          <Die face={6} rollEvery={2600} className="h-6 w-6" />
          <span>
            © {new Date().getFullYear()} {t.profile.name} · {links.handle}
          </span>
        </p>
        <p>{t.ui.footer.madeWith}</p>
      </Container>
    </footer>
  )
}
