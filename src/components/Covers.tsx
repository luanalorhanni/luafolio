import type { Project } from '../data/content'

const common = {
  viewBox: '0 0 400 225',
  className: 'h-full w-full',
  'aria-hidden': true,
  focusable: false,
} as const

function Bars() {
  const heights = [60, 110, 80, 140, 95, 165, 120, 180]
  return (
    <svg {...common}>
      {heights.map((h, i) => (
        <rect key={i} x={40 + i * 42} y={200 - h} width={22} height={h} rx={3} fill="#111111" opacity={0.15 + (i / heights.length) * 0.85} />
      ))}
      <path d="M40 200 H380" stroke="#111111" strokeWidth={2} />
    </svg>
  )
}

function Layers() {
  return (
    <svg {...common}>
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(0 ${i * 42})`}>
          <path d="M200 40 L320 80 L200 120 L80 80 Z" fill={i === 2 ? '#111111' : '#ffffff'} stroke="#111111" strokeWidth={2.5} />
        </g>
      ))}
    </svg>
  )
}

function Scatter() {
  const pts = Array.from({ length: 40 }, (_, i) => {
    const x = 40 + ((i * 53) % 320)
    const y = 190 - ((i * 37) % 150) * (0.4 + (x / 400) * 0.9)
    return { x, y, r: 3 + (i % 3) * 1.5 }
  })
  return (
    <svg {...common}>
      <path d="M40 190 H370" stroke="#111111" strokeWidth={2} />
      <path d="M40 190 V30" stroke="#111111" strokeWidth={2} />
      <path d="M50 180 C150 160 240 110 360 45" fill="none" stroke="#111111" strokeWidth={2.5} strokeDasharray="6 6" />
      {pts.map((p, i) => (
        <circle key={i} cx={p.x} cy={Math.max(35, p.y)} r={p.r} fill="#111111" opacity={0.75} />
      ))}
    </svg>
  )
}

function Network() {
  const nodes = [
    [200, 112],
    [90, 60],
    [110, 170],
    [300, 55],
    [320, 165],
    [200, 30],
    [210, 200],
  ] as const
  return (
    <svg {...common}>
      {nodes.slice(1).map(([x, y], i) => (
        <line key={i} x1={200} y1={112} x2={x} y2={y} stroke="#111111" strokeWidth={2} />
      ))}
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i === 0 ? 16 : 10} fill={i === 0 ? '#111111' : '#ffffff'} stroke="#111111" strokeWidth={2.5} />
      ))}
    </svg>
  )
}

const covers = { bars: Bars, layers: Layers, scatter: Scatter, network: Network }

export function Cover({ kind }: { kind: Project['cover'] }) {
  const C = covers[kind]
  return (
    <div className="aspect-[16/9] w-full overflow-hidden rounded-t-2xl border-b border-paper p-6">
      <C />
    </div>
  )
}
