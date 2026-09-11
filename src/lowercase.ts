/**
 * Site-wide lowercase-first aesthetic.
 *
 * Rules, applied to every visible string:
 * - acronyms and codes keep their case: SQL, GCP, BI, CNPq, UFMA, P&D
 * - names with an inner capital go fully lowercase: BigQuery → bigquery, GitHub → github
 * - short labels (titles, chips, roles) lowercase every non-acronym word
 * - sentences lowercase the leading run of capitalized words, then leave the rest alone,
 *   so mid-sentence names such as "Polen" or "Dataform" survive
 * - URLs, paths, e-mails and handles are never touched
 */

const isUpper = (c: string) => c !== c.toLowerCase() && c === c.toUpperCase()

function isAcronym(word: string): boolean {
  const core = word.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, '')
  if (core.length < 2) return false
  return isUpper(core[0]) && isUpper(core[1])
}

function hasInnerCapital(word: string): boolean {
  return [...word.slice(1)].some((c) => isUpper(c))
}

function lowerWord(word: string): string {
  if (isAcronym(word)) return word
  if (hasInnerCapital(word)) return word.toLowerCase()
  const i = [...word].findIndex((c) => /\p{L}/u.test(c))
  if (i < 0 || !isUpper(word[i])) return word
  return word.slice(0, i) + word[i].toLowerCase() + word.slice(i + 1)
}

function isCapitalized(word: string): boolean {
  const i = [...word].findIndex((c) => /\p{L}/u.test(c))
  if (i < 0) return false
  const rest = word.slice(i + 1)
  return isUpper(word[i]) && !isAcronym(word) && ([...rest].every((c) => !isUpper(c)) || hasInnerCapital(word))
}

const SKIP = /^(https?:|mailto:|\/|@)|@/

export function lowerText(s: string): string {
  if (!s || SKIP.test(s)) return s
  const words = s.split(' ')
  const sentence = /[.!?:;]/.test(s) || words.length > 8

  if (!sentence) return words.map(lowerWord).join(' ')

  const out = [...words]
  for (let i = 0; i < out.length; i++) {
    if (isAcronym(out[i])) continue
    if (!isCapitalized(out[i])) break
    out[i] = lowerWord(out[i])
  }
  return out.join(' ')
}

/** Recursively applies `lowerText` to every string in a plain data object. */
export function deepLower<T>(value: T): T {
  if (typeof value === 'string') return lowerText(value) as T
  if (Array.isArray(value)) return value.map(deepLower) as T
  if (value && typeof value === 'object') {
    const out: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) out[k] = deepLower(v)
    return out as T
  }
  return value
}

/** Only the first letter, keeping the rest exactly as written. */
export function lowerFirst(s: string): string {
  const i = [...s].findIndex((c) => /\p{L}/u.test(c))
  if (i < 0) return s
  return s.slice(0, i) + s[i].toLowerCase() + s.slice(i + 1)
}
