import { useSyncExternalStore } from 'react'
import { MATCH_STATES, FINAL_SNAPSHOT } from '@/data/home'
import { MOCK_TODAY, type Game, type GameStatus } from '@/data/mock'

/**
 * 와이어프레임용 전역 케이스 상태.
 * 홈 '오늘의 경기' 위 케이스 바에서 바꾸면 홈·경기·일정·라인업·예매내역·스마트 티켓이 같이 바뀐다.
 */
export const SEASON_PHASES = ['정규시즌', '와일드카드', '준플레이오프', '플레이오프', '한국시리즈'] as const
export type SeasonPhase = (typeof SEASON_PHASES)[number]
export type MatchState = (typeof MATCH_STATES)[number]

/** 가을야구(포스트시즌) 단계별 더미 정보 */
export const POSTSEASON_INFO: Record<Exclude<SeasonPhase, '정규시즌'>, { title: string; game: string; format: string; record: string }> = {
  와일드카드: { title: '와일드카드 결정전', game: '1차전', format: '최대 2경기', record: '삼성 0승 0패' },
  준플레이오프: { title: '준플레이오프', game: '3차전', format: '5전 3선승', record: '삼성 1승 1패' },
  플레이오프: { title: '플레이오프', game: '4차전', format: '5전 3선승', record: '삼성 2승 1패' },
  한국시리즈: { title: '한국시리즈', game: '5차전', format: '7전 4선승', record: '삼성 2승 2패' },
}

let state: { phase: SeasonPhase; match: MatchState } = { phase: '정규시즌', match: '경기 전' }
const listeners = new Set<() => void>()
const emit = () => listeners.forEach((fn) => fn())
const subscribe = (fn: () => void) => {
  listeners.add(fn)
  return () => { listeners.delete(fn) }
}

export const setSeasonPhase = (phase: SeasonPhase) => { state = { ...state, phase }; emit() }
export const setMatchState = (match: MatchState) => { state = { ...state, match }; emit() }
export const useCaseState = () => useSyncExternalStore(subscribe, () => state)

const STATUS_OF: Record<MatchState, GameStatus> = {
  '경기 전': 'scheduled',
  '경기 중': 'live',
  '경기 후': 'final',
  '우천 지연': 'delayed',
  '우천 취소': 'cancelled',
}

/** 오늘 경기에 전역 케이스를 덮어씌운다 (일정 등 목록 화면용) */
export function withCaseState(g: Game): Game {
  if (g.date !== MOCK_TODAY) return g
  const status = STATUS_OF[state.match]
  return status === 'final' ? { ...g, status, score: { us: FINAL_SNAPSHOT.us, them: FINAL_SNAPSHOT.them } } : { ...g, status }
}
