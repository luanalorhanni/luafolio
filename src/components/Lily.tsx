/**
 * Brush-ink lilies drawn procedurally: thick black petal outlines with
 * uneven white interiors, tapered center streaks and speckles near the
 * throat, heavy stems and blade leaves. Everything is #111 on white.
 *
 * Elements with `.ink-detail` (streaks, speckles) are faded until the nearest
 * `.bloom-host` is hovered, so the flower "takes ink" on interaction. Pass
 * `state="full"` to render fully inked.
 */

const rad = (deg: number) => (deg * Math.PI) / 180

/** Deterministic pseudo-random so speckles never jump between renders. */
function rng(seed: number) {
  let s = seed >>> 0 || 1
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 4294967296
  }
}

/** Leaf/petal silhouette from (cx,cy) pointing along `angle`, tip at `len`. */
function blade(
  cx: number,
  cy: number,
  angle: number,
  len: number,
  width: number,
  skew = 0,
  bulge = 0.45,
): string {
  const a = rad(angle)
  const dx = Math.cos(a)
  const dy = Math.sin(a)
  const nx = -dy
  const ny = dx
  const tipX = cx + dx * len
  const tipY = cy + dy * len
  const mx = cx + dx * len * bulge
  const my = cy + dy * len * bulge
  const w1 = width * (1 + skew)
  const w2 = width * (1 - skew)
  const f = (n: number) => n.toFixed(1)
  return `M${f(cx)} ${f(cy)} Q${f(mx + nx * w1)} ${f(my + ny * w1)} ${f(tipX)} ${f(tipY)} Q${f(
    mx - nx * w2,
  )} ${f(my - ny * w2)} ${f(cx)} ${f(cy)}Z`
}

type PetalSpec = { angle: number; len: number; w: number; skew: number }

const PETALS: PetalSpec[] = [
  { angle: -92, len: 64, w: 15, skew: 0.2 },
  { angle: -148, len: 60, w: 14, skew: -0.15 },
  { angle: -34, len: 60, w: 14, skew: 0.15 },
  { angle: 152, len: 52, w: 17, skew: -0.2 },
  { angle: 28, len: 52, w: 17, skew: 0.2 },
  { angle: 92, len: 46, w: 18, skew: 0.1 },
]

type BloomProps = {
  x: number
  y: number
  scale?: number
  rotate?: number
  seed?: number
}

function Bloom({ x, y, scale = 1, rotate = 0, seed = 1 }: BloomProps) {
  const rand = rng(seed)
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}>
      {PETALS.map((p, i) => {
        const a = rad(p.angle)
        const ox = Math.cos(a) * 7
        const oy = Math.sin(a) * 7
        const speckles = Array.from({ length: 8 }, () => {
          const t = 0.16 + rand() * 0.36
          const side = (rand() - 0.5) * p.w * 0.9
          const px = ox + Math.cos(a) * p.len * t + -Math.sin(a) * side
          const py = oy + Math.sin(a) * p.len * t + Math.cos(a) * side
          return { px, py, r: 0.7 + rand() * 1.1 }
        })
        return (
          <g key={i}>
            <path d={blade(0, 0, p.angle, p.len, p.w, p.skew)} fill="#111111" />
            <path
              d={blade(ox, oy, p.angle + 2.5, p.len * 0.88, p.w * 0.6, -p.skew * 0.6)}
              fill="#ffffff"
            />
            <path
              className="ink-detail"
              d={blade(ox * 1.4, oy * 1.4, p.angle - 1, p.len * 0.6, p.w * 0.11, 0, 0.35)}
              fill="#111111"
            />
            <path
              className="ink-detail"
              d={blade(ox * 1.2, oy * 1.2, p.angle + 9, p.len * 0.42, p.w * 0.05, 0, 0.4)}
              fill="#111111"
            />
            {speckles.map((s, k) => (
              <circle key={k} className="ink-detail" cx={s.px} cy={s.py} r={s.r} fill="#111111" />
            ))}
          </g>
        )
      })}
      {[52, 68, 84, 100, 116].map((deg, k) => {
        const a = rad(deg)
        const len = 26 + (k % 2) * 6
        const ex = Math.cos(a) * len
        const ey = Math.sin(a) * len
        return (
          <g key={deg}>
            <line x1={0} y1={0} x2={ex} y2={ey} stroke="#111111" strokeWidth={2.2} strokeLinecap="round" />
            <ellipse
              cx={ex}
              cy={ey}
              rx={4.2}
              ry={1.8}
              transform={`rotate(${deg + 90} ${ex} ${ey})`}
              fill="#111111"
            />
          </g>
        )
      })}
      <circle cx={0} cy={0} r={3.6} fill="#111111" />
    </g>
  )
}

function Stem({ d, width = 5 }: { d: string; width?: number }) {
  return <path d={d} fill="none" stroke="#111111" strokeWidth={width} strokeLinecap="round" />
}

function Leaf({
  x,
  y,
  angle,
  len,
  w,
}: {
  x: number
  y: number
  angle: number
  len: number
  w: number
}) {
  const a = rad(angle)
  return (
    <g>
      <path d={blade(x, y, angle, len, w, 0.25, 0.4)} fill="#111111" />
      <line
        x1={x + Math.cos(a) * len * 0.1}
        y1={y + Math.sin(a) * len * 0.1}
        x2={x + Math.cos(a) * len * 0.85}
        y2={y + Math.sin(a) * len * 0.85}
        stroke="#ffffff"
        strokeWidth={1.1}
        strokeLinecap="round"
      />
    </g>
  )
}

type LilyProps = {
  className?: string
  /** `partial` fades streaks and speckles until the nearest `.bloom-host` is hovered. */
  state?: 'partial' | 'full'
}

/** Single lily with stem and two leaves. viewBox 0 0 150 230. */
export function Lily({ className = '', state = 'full' }: LilyProps) {
  return (
    <svg
      viewBox="0 0 150 230"
      className={`${state === 'full' ? 'ink-full' : ''} ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      <Stem d="M74 98 C72 130 78 170 76 226" width={5} />
      <Leaf x={76} y={160} angle={206} len={54} w={9} />
      <Leaf x={77} y={188} angle={-22} len={50} w={8} />
      <Bloom x={74} y={78} scale={1} rotate={-6} seed={11} />
    </svg>
  )
}

/** Three lilies on converging stems. viewBox 0 0 260 380. */
export function LilyBouquet({ className = '', state = 'full' }: LilyProps) {
  return (
    <svg
      viewBox="0 0 260 380"
      className={`${state === 'full' ? 'ink-full' : ''} ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      <Stem d="M182 92 C186 150 176 240 160 376" width={5} />
      <Stem d="M84 148 C96 210 130 300 150 376" width={5.5} />
      <Stem d="M170 236 C166 290 158 340 152 376" width={4.5} />
      <Leaf x={136} y={300} angle={214} len={70} w={10} />
      <Leaf x={158} y={330} angle={-28} len={62} w={9} />
      <Leaf x={148} y={352} angle={200} len={48} w={7} />
      <Bloom x={182} y={74} scale={0.82} rotate={14} seed={3} />
      <Bloom x={84} y={128} scale={1.08} rotate={-12} seed={7} />
      <Bloom x={170} y={218} scale={0.96} rotate={4} seed={19} />
    </svg>
  )
}
