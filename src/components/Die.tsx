import { useEffect, useState } from 'react'
import { FACES, facePath, pipPoints, visibleFaces } from '../die'

type DieProps = {
  /** Value shown on the top face, 1–6. */
  face?: number
  /** Cycle faces on an interval (ms). 0 disables. */
  rollEvery?: number
  className?: string
  title?: string
}

/** Isometric die drawn with the theme colors. Rolls by changing faces and wobbling. */
export function Die({ face = 1, rollEvery = 0, className = '', title }: DieProps) {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    if (!rollEvery) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setInterval(() => setOffset((o) => (o + 1) % 6), rollEvery)
    return () => window.clearInterval(id)
  }, [rollEvery])

  const top = ((face - 1 + offset) % 6) + 1
  const f = visibleFaces(top)

  return (
    <svg
      viewBox="0 0 100 100"
      className={`${rollEvery ? 'die-roll' : ''} ${className}`}
      aria-hidden={title ? undefined : 'true'}
      role={title ? 'img' : undefined}
      focusable="false"
    >
      {title && <title>{title}</title>}
      <path d={facePath(FACES.top)} fill="#ffffff" stroke="#111111" strokeWidth={5} strokeLinejoin="round" />
      <path d={facePath(FACES.left)} fill="#ffffff" stroke="#111111" strokeWidth={5} strokeLinejoin="round" />
      <path d={facePath(FACES.right)} fill="#eeeeee" stroke="#111111" strokeWidth={5} strokeLinejoin="round" />
      {(['top', 'left', 'right'] as const).map((key) =>
        pipPoints(FACES[key], f[key]).map(([x, y], i) => (
          <circle key={`${key}-${top}-${i}`} cx={x} cy={y} r={key === 'top' ? 4.2 : 4} fill="#111111" />
        )),
      )}
    </svg>
  )
}
