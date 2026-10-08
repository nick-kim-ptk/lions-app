/**
 * 프로토타입 기준 시각.
 *
 * 모든 화면은 `new Date()` 대신 이 값을 기준으로 "오늘 / 다음 경기 / 예매 오픈 여부"를 계산합니다.
 * (실제 날짜로 돌리면 더미 경기 일정과 어긋나기 때문입니다. API 연동 시 이 파일만 걷어내면 됩니다.)
 *
 * 날짜는 모두 한국 시간(KST) 기준 문자열입니다.
 *   date : 'YYYY-MM-DD'
 *   time : 'HH:mm'
 */
export const MOCK_TODAY = '2026-09-19' // 토요일
export const MOCK_TIME = '15:30'

export const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'] as const

/** 'YYYY-MM-DD' → 요일 인덱스 (0=일). 타임존 영향을 받지 않도록 UTC로 계산. */
export function weekdayIndex(date: string): number {
  const [y, m, d] = date.split('-').map(Number)
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay()
}

export const weekdayOf = (date: string) => WEEKDAYS[weekdayIndex(date)]

export function addDays(date: string, days: number): string {
  const [y, m, d] = date.split('-').map(Number)
  const t = new Date(Date.UTC(y, m - 1, d + days))
  return `${t.getUTCFullYear()}-${String(t.getUTCMonth() + 1).padStart(2, '0')}-${String(t.getUTCDate()).padStart(2, '0')}`
}

/** a → b 까지 일수 (b가 미래면 양수) */
export function diffDays(a: string, b: string): number {
  const toMs = (s: string) => {
    const [y, m, d] = s.split('-').map(Number)
    return Date.UTC(y, m - 1, d)
  }
  return Math.round((toMs(b) - toMs(a)) / 86_400_000)
}

/** 'YYYY-MM-DD' + 'HH:mm' → 비교 가능한 숫자 (분 단위) */
export function toMinutes(date: string, time: string): number {
  const [y, m, d] = date.split('-').map(Number)
  const [hh, mm] = time.split(':').map(Number)
  return Date.UTC(y, m - 1, d, hh, mm) / 60_000
}

export const NOW_MINUTES = toMinutes(MOCK_TODAY, MOCK_TIME)

const parts = (date: string) => date.split('-').map(Number) as [number, number, number]

/** 9월 19일 */
export const fmtMD = (date: string) => {
  const [, m, d] = parts(date)
  return `${m}월 ${d}일`
}
/** 9월 19일 (토) */
export const fmtMDW = (date: string) => `${fmtMD(date)} (${weekdayOf(date)})`
/** 9/19 (토) */
export const fmtSlashMDW = (date: string) => {
  const [, m, d] = parts(date)
  return `${m}/${d} (${weekdayOf(date)})`
}
/** 09.19 (토) */
export const fmtDotMDW = (date: string) => {
  const [, m, d] = parts(date)
  return `${String(m).padStart(2, '0')}.${String(d).padStart(2, '0')} (${weekdayOf(date)})`
}
/** 2026.09.19 */
export const fmtDotYMD = (date: string) => date.replace(/-/g, '.')
/** 2026.09.19(토) 17:00 */
export const fmtDotYMDWT = (date: string, time: string) => `${fmtDotYMD(date)}(${weekdayOf(date)}) ${time}`
/** 17:00 → 오후 5:00 */
export function fmtKoTime(time: string): string {
  const [h, m] = time.split(':').map(Number)
  const ap = h < 12 ? '오전' : '오후'
  const hh = h % 12 === 0 ? 12 : h % 12
  return `${ap} ${hh}:${String(m).padStart(2, '0')}`
}
