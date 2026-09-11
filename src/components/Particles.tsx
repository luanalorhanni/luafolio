import { useEffect, useRef } from 'react'

type P = { x: number; y: number; vx: number; vy: number; r: number }

/**
 * Faint constellation behind the page. Points drift, link when close, lean
 * away from the cursor and get stirred by scrolling. Fixed to the viewport,
 * never intercepts input. Renders one static frame under reduced motion.
 */
export function Particles() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = 0
    let h = 0
    let dpr = 1
    let pts: P[] = []
    let ink = '#111111'
    const mouse = { x: -9999, y: -9999, active: false }
    let lastScroll = window.scrollY
    let stir = 0
    let raf = 0
    let running = true

    const readInk = () => {
      ink = getComputedStyle(document.documentElement).getPropertyValue('--c-ink').trim() || '#111111'
    }

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const target = Math.min(130, Math.max(36, Math.floor((w * h) / 16000)))
      while (pts.length < target) {
        pts.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          r: 0.9 + Math.random() * 1.4,
        })
      }
      pts.length = target
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      const link = 120
      const link2 = link * link

      for (let i = 0; i < pts.length; i++) {
        const a = pts[i]
        for (let j = i + 1; j < pts.length; j++) {
          const b = pts[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d2 = dx * dx + dy * dy
          if (d2 < link2) {
            const alpha = (1 - Math.sqrt(d2) / link) * 0.12
            ctx.strokeStyle = ink
            ctx.globalAlpha = alpha
            ctx.lineWidth = 0.8
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
        if (mouse.active) {
          const dx = a.x - mouse.x
          const dy = a.y - mouse.y
          const d = Math.hypot(dx, dy)
          if (d < 200) {
            ctx.strokeStyle = ink
            ctx.globalAlpha = (1 - d / 200) * 0.22
            ctx.lineWidth = 0.8
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(mouse.x, mouse.y)
            ctx.stroke()
          }
        }
      }

      ctx.fillStyle = ink
      for (const p of pts) {
        ctx.globalAlpha = 0.42
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
    }

    const step = () => {
      for (const p of pts) {
        if (mouse.active) {
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const d2 = dx * dx + dy * dy
          if (d2 < 160 * 160 && d2 > 0.01) {
            const d = Math.sqrt(d2)
            const f = ((160 - d) / 160) * 0.06
            p.vx += (dx / d) * f
            p.vy += (dy / d) * f
          }
        }
        p.vx += (Math.random() - 0.5) * 0.02 * (1 + stir)
        p.vy += (Math.random() - 0.5) * 0.02 * (1 + stir)
        p.vx *= 0.985
        p.vy *= 0.985
        p.x += p.vx
        p.y += p.vy
        if (p.x < -10) p.x = w + 10
        if (p.x > w + 10) p.x = -10
        if (p.y < -10) p.y = h + 10
        if (p.y > h + 10) p.y = -10
      }
      stir *= 0.9
    }

    const loop = () => {
      if (!running) return
      step()
      draw()
      raf = requestAnimationFrame(loop)
    }

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      mouse.active = true
    }
    const onLeave = () => {
      mouse.active = false
    }
    const onScroll = () => {
      const y = window.scrollY
      const delta = y - lastScroll
      lastScroll = y
      const shift = -delta * 0.18
      for (const p of pts) {
        p.y += shift
        p.vy += (Math.random() - 0.5) * Math.min(Math.abs(delta), 60) * 0.01
      }
      stir = Math.min(stir + Math.abs(delta) / 40, 6)
    }
    const onVisibility = () => {
      if (document.hidden) {
        running = false
        cancelAnimationFrame(raf)
      } else if (!reduce) {
        running = true
        raf = requestAnimationFrame(loop)
      }
    }

    const themeObserver = new MutationObserver(() => {
      readInk()
      if (reduce) draw()
    })
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    readInk()
    resize()
    window.addEventListener('resize', resize)

    if (reduce) {
      draw()
    } else {
      window.addEventListener('pointermove', onMove, { passive: true })
      window.addEventListener('pointerleave', onLeave)
      window.addEventListener('scroll', onScroll, { passive: true })
      document.addEventListener('visibilitychange', onVisibility)
      raf = requestAnimationFrame(loop)
    }

    return () => {
      running = false
      cancelAnimationFrame(raf)
      themeObserver.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  )
}
