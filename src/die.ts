/**
 * Geometry for the isometric die used as the site symbol ("dado" is both
 * "data" and "die" in Portuguese). Shared by the React component and the
 * animated favicon, so both draw exactly the same cube.
 */

export type Pt = [number, number]
type Face = { o: Pt; u: Pt; v: Pt }

/** Cube in a 0..100 viewBox. Each face is a parallelogram: origin + u*U + v*V. */
export const FACES: Record<'top' | 'left' | 'right', Face> = {
  top: { o: [16, 32], u: [34, -18], v: [34, 18] },
  left: { o: [16, 32], u: [34, 18], v: [0, 40] },
  right: { o: [50, 50], u: [34, -18], v: [0, 40] },
}

const L = 0.26
const M = 0.5
const H = 0.74

/** Pip layout per face value in unit-square coordinates. */
export const PIPS: Record<number, Pt[]> = {
  1: [[M, M]],
  2: [
    [L, L],
    [H, H],
  ],
  3: [
    [L, L],
    [M, M],
    [H, H],
  ],
  4: [
    [L, L],
    [H, L],
    [L, H],
    [H, H],
  ],
  5: [
    [L, L],
    [H, L],
    [M, M],
    [L, H],
    [H, H],
  ],
  6: [
    [L, L],
    [H, L],
    [L, M],
    [H, M],
    [L, H],
    [H, H],
  ],
}

export function faceCorners(f: Face): Pt[] {
  const { o, u, v } = f
  return [o, [o[0] + u[0], o[1] + u[1]], [o[0] + u[0] + v[0], o[1] + u[1] + v[1]], [o[0] + v[0], o[1] + v[1]]]
}

export function facePath(f: Face): string {
  return faceCorners(f)
    .map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x} ${y}`)
    .join(' ')
    .concat('Z')
}

export function pipPoints(f: Face, value: number): Pt[] {
  const { o, u, v } = f
  return (PIPS[value] ?? PIPS[1]).map(([a, b]) => [o[0] + a * u[0] + b * v[0], o[1] + a * u[1] + b * v[1]])
}

/** Three visible values that never repeat, derived from the top face. */
export function visibleFaces(top: number): { top: number; left: number; right: number } {
  const t = ((top - 1) % 6 + 6) % 6 + 1
  return { top: t, left: (t % 6) + 1, right: ((t + 1) % 6) + 1 }
}

/** Standalone SVG markup (for the favicon). Colors are literal because favicons have no CSS. */
export function dieSvg(top: number, rotate = 0, ink = '#111111', paper = '#ffffff'): string {
  const f = visibleFaces(top)
  const face = (key: keyof typeof FACES, value: number, fill: string, pipR: number) =>
    `<path d="${facePath(FACES[key])}" fill="${fill}" stroke="${ink}" stroke-width="5" stroke-linejoin="round"/>` +
    pipPoints(FACES[key], value)
      .map(([x, y]) => `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${pipR}" fill="${ink}"/>`)
      .join('')
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">` +
    `<g transform="rotate(${rotate} 50 52)">` +
    face('top', f.top, paper, 4.2) +
    face('left', f.left, paper, 4) +
    face('right', f.right, ink === '#111111' ? '#eeeeee' : '#262626', 4) +
    `</g></svg>`
  )
}
