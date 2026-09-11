import { About } from './components/About'
import { Capabilities } from './components/Capabilities'
import { Certifications } from './components/Certifications'
import { Contact } from './components/Contact'
import { Experience } from './components/Experience'
import { Footer } from './components/Footer'
import { GitHubActivity } from './components/GitHubActivity'
import { Hero } from './components/Hero'
import { Nav } from './components/Nav'
import { Particles } from './components/Particles'
import { Projects } from './components/Projects'
import { ScrollProgress } from './components/ScrollProgress'
import { SketchDefs } from './components/Sketch'
import { Stack } from './components/Stack'
import { useAnimatedFavicon } from './favicon'
import { LangProvider } from './i18n'

export default function App() {
  useAnimatedFavicon()
  return (
    <LangProvider>
      <SketchDefs />
      <Particles />
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <About />
        <Capabilities />
        <Experience />
        <Projects />
        <Stack />
        <Certifications />
        <GitHubActivity />
        <Contact />
      </main>
      <Footer />
    </LangProvider>
  )
}
