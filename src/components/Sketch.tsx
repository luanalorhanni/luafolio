/** One-time SVG filter definitions. Render once near the root. */
export function SketchDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
      <defs>
        <filter id="wobble" x="-5%" y="-40%" width="110%" height="180%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012 0.035"
            numOctaves="2"
            seed="7"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="3.5"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  )
}
