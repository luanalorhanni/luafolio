import { useEffect, useState } from 'react'
import { useLang } from '../lang'

function useReducedMotion() {
  const [reduce, setReduce] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduce(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return reduce
}

const FLOW_PATH = 'M132 70 L258 70 L330 70 L402 70 L474 70 L590 70 L716 70'

function Box({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  return <rect x={x} y={y} width={w} height={h} rx={8} fill="#ffffff" stroke="#111111" strokeWidth={2} />
}

function Label({ x, title, sub }: { x: number; title: string; sub: string }) {
  return (
    <>
      <text x={x} y={130} textAnchor="middle" fontSize={12.5} fontWeight={600} fill="#111111">
        {title}
      </text>
      <text x={x} y={145} textAnchor="middle" fontSize={11} fill="#666666">
        {sub}
      </text>
    </>
  )
}

/**
 * Sketch of how data moves through the work: rows travel from a production
 * source, through continuous ingestion, into layered models, past quality
 * checks and out to people and agents. Static under prefers-reduced-motion.
 */
export function Pipeline() {
  const { t } = useLang()
  const reduce = useReducedMotion()
  const dots = [0, 1.6, 3.2, 4.8, 6.4]
  const [source, ingestion, transform, quality, consumption] = t.ui.pipeline.stages
  const [l1, l2, l3] = t.ui.pipeline.layers

  return (
    <figure className="surface rounded-3xl border border-paper p-6 md:p-10">
      <div className="mb-6 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h2 className="text-lg font-semibold tracking-tight">{t.ui.pipeline.title}</h2>
        <p className="font-hand text-2xl text-muted">{t.ui.pipeline.caption}</p>
      </div>
      <svg viewBox="0 0 860 150" className="block w-full" role="img" aria-label={t.ui.pipeline.alt}>
        <path d={FLOW_PATH} fill="none" stroke="#111111" strokeWidth={2} strokeDasharray="7 7" className="dash-flow" />

        {dots.map((delay, i) =>
          reduce ? (
            <circle key={i} cx={132 + i * 146} cy={70} r={4} fill="#111111" />
          ) : (
            <circle key={i} r={4} fill="#111111">
              <animateMotion dur="8s" begin={`-${delay}s`} repeatCount="indefinite" path={FLOW_PATH} />
            </circle>
          ),
        )}

        <path d="M40 46 V92 Q86 108 132 92 V46" fill="#ffffff" stroke="#111111" strokeWidth={2} />
        <ellipse cx={86} cy={46} rx={46} ry={11} fill="#ffffff" stroke="#111111" strokeWidth={2} />
        <path d="M40 62 Q86 78 132 62" fill="none" stroke="#111111" strokeWidth={1.5} />
        <Label x={86} title={source.title} sub={source.sub} />

        <circle cx={195} cy={70} r={14} fill="#ffffff" stroke="#111111" strokeWidth={2} />
        <path
          d="M187 70 h4 l3 -7 l3 14 l3 -7 h5"
          fill="none"
          stroke="#111111"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Label x={195} title={ingestion.title} sub={ingestion.sub} />

        <Box x={258} y={50} w={72} h={40} />
        <Box x={330} y={50} w={72} h={40} />
        <Box x={402} y={50} w={72} h={40} />
        <text x={294} y={75} textAnchor="middle" fontSize={11.5} fontWeight={600} fill="#111111">
          {l1}
        </text>
        <text x={366} y={75} textAnchor="middle" fontSize={11.5} fontWeight={600} fill="#111111">
          {l2}
        </text>
        <text x={438} y={75} textAnchor="middle" fontSize={11.5} fontWeight={600} fill="#111111">
          {l3}
        </text>
        <Label x={366} title={transform.title} sub={transform.sub} />

        <Box x={512} y={44} w={78} h={52} />
        <path d="M534 70 L546 82 L570 56" fill="none" stroke="#111111" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
        <Label x={551} title={quality.title} sub={quality.sub} />

        <Box x={716} y={38} w={104} h={64} />
        <g fill="#111111">
          <rect x={732} y={78} width={10} height={14} />
          <rect x={748} y={64} width={10} height={28} />
          <rect x={764} y={72} width={10} height={20} />
          <rect x={780} y={54} width={10} height={38} />
        </g>
        <path d="M730 60 L744 52 L760 58 L776 44 L792 48" fill="none" stroke="#111111" strokeWidth={2} strokeLinecap="round" />
        <Label x={768} title={consumption.title} sub={consumption.sub} />
      </svg>
    </figure>
  )
}
