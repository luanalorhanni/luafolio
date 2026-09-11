import { useEffect } from 'react'
import { dieSvg } from './die'

const FRAMES = Array.from({ length: 12 }, (_, i) => {
  const top = Math.floor(i / 2) + 1
  const rotate = i % 2 === 0 ? -8 : 8
  return `data:image/svg+xml;utf8,${encodeURIComponent(dieSvg(top, rotate))}`
})

/** Cycles the tab icon through die faces so it keeps rolling in the tab bar. */
export function useAnimatedFavicon(intervalMs = 420) {
  useEffect(() => {
    let link = document.querySelector<HTMLLinkElement>('link[rel="icon"]')
    if (!link) {
      link = document.createElement('link')
      link.rel = 'icon'
      document.head.appendChild(link)
    }
    link.type = 'image/svg+xml'

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      link.href = FRAMES[0]
      return
    }

    let i = 0
    link.href = FRAMES[0]
    const id = window.setInterval(() => {
      i = (i + 1) % FRAMES.length
      link!.href = FRAMES[i]
    }, intervalMs)
    return () => window.clearInterval(id)
  }, [intervalMs])
}
