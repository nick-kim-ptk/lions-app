import { MOCK_TODAY, addDays, diffDays } from './clock'

/** 멤버십·어린이 회원 모집 일정 (더미). 특정 기간(최대 약 한 달)에만 접수, 시즌 종료 시 일괄 만료. 모집 오픈 D-14 기준 */
export const JOIN_PERIODS = {
  member: { label: '2027 라이온즈 멤버십 모집', open: addDays(MOCK_TODAY, 14), close: addDays(MOCK_TODAY, 27) },
  child: { label: '2027 어린이 회원 모집', open: addDays(MOCK_TODAY, 14), close: addDays(MOCK_TODAY, 27) },
}

export type JoinKind = keyof typeof JOIN_PERIODS

const fmt = (d: string) => d.slice(2).replace(/-/g, '.')

export type JoinState = '모집 전' | '모집 중'

/** 모집 전: 오픈까지 D-n / 모집 중: 마감까지 D-n (모집 오픈일을 오늘로 가정) */
export function joinInfo(kind: JoinKind, state: JoinState = '모집 전') {
  const p = JOIN_PERIODS[kind]
  return {
    schedule: `${fmt(p.open)} ~ ${fmt(p.close)}`,
    dday: state === '모집 전' ? `D-${diffDays(MOCK_TODAY, p.open)}` : `마감 D-${diffDays(p.open, p.close)}`,
  }
}
