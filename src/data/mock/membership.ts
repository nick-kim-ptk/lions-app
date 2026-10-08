import { MOCK_TODAY, diffDays } from './clock'

/** 멤버십·어린이 회원 가입 일정 (더미). 매년 초 특정 기간에만 가입 접수, 시즌 종료 시 일괄 만료 */
export const JOIN_PERIODS = {
  member: { label: '블루멤버십', open: '2027-01-05', close: '2027-01-18' },
  child: { label: '어린이 멤버십', open: '2027-01-12', close: '2027-01-25' },
} as const

export type JoinKind = keyof typeof JOIN_PERIODS

const fmt = (d: string) => d.slice(2).replace(/-/g, '.')

export function joinInfo(kind: JoinKind) {
  const p = JOIN_PERIODS[kind]
  return {
    schedule: `${fmt(p.open)} ~ ${fmt(p.close)}`,
    dday: `D-${diffDays(MOCK_TODAY, p.open)}`,
  }
}
