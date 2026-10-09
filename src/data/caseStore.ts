import { useSyncExternalStore } from "react"

import {
  MATCH_STATES,
  FINAL_SNAPSHOT,
  SUSPENDED_SNAPSHOT,
  DOUBLEHEADER,
} from "@/data/home"

import { MOCK_TODAY, TODAY_GAME, type Game, type GameStatus } from "@/data/mock"

/**
 * 와이어프레임용 전역 케이스 상태.
 * 홈 '오늘의 경기' 위 케이스 바에서 바꾸면 홈·경기·일정·라인업·예매내역·스마트 티켓이 같이 바뀐다.
 */

export const SEASON_PHASES = [
  "시범경기",
  "정규시즌",
  "올스타 브레이크",
  "와일드카드",
  "준플레이오프",
  "플레이오프",
  "한국시리즈",
  "가을야구 탈락",
  "우승 확정",
  "비시즌",
] as const

export type SeasonPhase = typeof SEASON_PHASES[number]

export type MatchState = typeof MATCH_STATES[number]

/** 가을야구(포스트시즌) 단계별 더미 정보 */

export const POSTSEASON_PHASES = [
  "와일드카드",
  "준플레이오프",
  "플레이오프",
  "한국시리즈",
] as const

export type PostseasonPhase = typeof POSTSEASON_PHASES[number]

export const isPostseason = (p: SeasonPhase): p is PostseasonPhase =>
  (POSTSEASON_PHASES as readonly string[]).includes(p)

/** 삼성의 시즌이 끝난 구간 (가을야구 탈락·우승 확정·비시즌) — 앱에서는 모두 "시즌 종료"로 취급 */

export const isSeasonEndPhase = (p: SeasonPhase) =>
  p === "가을야구 탈락" || p === "우승 확정" || p === "비시즌"

/** 오늘 경기가 없는 구간 (올스타 브레이크·시즌 종료) */

export const isNoGamePhase = (p: SeasonPhase) =>
  p === "올스타 브레이크" || isSeasonEndPhase(p)

/** 헤더 등에 쓰는 시즌명 */

export const seasonLabel = (p: SeasonPhase) =>
  p === "시범경기" || isPostseason(p)
    ? p
    : p === "우승 확정"
      ? "한국시리즈"
      : p === "가을야구 탈락"
        ? "포스트시즌"
        : "정규시즌"

export const POSTSEASON_INFO: Record<PostseasonPhase, {
  title: string
  game: string
  format: string
  record: string
}> = {
  와일드카드: {
    title: "와일드카드 결정전",
    game: "1차전",
    format: "최대 2경기",
    record: "삼성 0승 0패",
  },

  준플레이오프: {
    title: "준플레이오프",
    game: "3차전",
    format: "5전 3선승",
    record: "삼성 1승 1패",
  },

  플레이오프: {
    title: "플레이오프",
    game: "4차전",
    format: "5전 3선승",
    record: "삼성 2승 1패",
  },

  한국시리즈: {
    title: "한국시리즈",
    game: "5차전",
    format: "7전 4선승",
    record: "삼성 2승 2패",
  },
}

let state: { phase: SeasonPhase; match: MatchState } = {
  phase: "정규시즌",
  match: "경기 전",
}

const listeners = new Set<() => void>()

const emit = () => listeners.forEach((fn) => fn())

const subscribe = (fn: () => void) => {
  listeners.add(fn)

  return () => {
    listeners.delete(fn)
  }
}

export const setSeasonPhase = (phase: SeasonPhase) => {
  state = { ...state, phase }
  emit()
}

export const setMatchState = (match: MatchState) => {
  state = { ...state, match }
  emit()
}

export const useCaseState = () => useSyncExternalStore(subscribe, () => state)

const STATUS_OF: Record<MatchState, GameStatus> = {
  "경기 전": "scheduled",

  "경기 중": "live",

  "경기 후": "final",

  "우천 지연": "delayed",

  "우천 취소": "cancelled",

  "경기 연기": "postponed",

  서스펜디드: "suspended",

  더블헤더: "scheduled",
}

/** 오늘 경기에 전역 케이스를 덮어씌운다 (일정 등 목록 화면용) */

export function withCaseState(g: Game): Game {
  if (g.date !== MOCK_TODAY) return g

  const status = STATUS_OF[state.match]

  if (status === "final")
    return {
      ...g,
      status,
      score: { us: FINAL_SNAPSHOT.us, them: FINAL_SNAPSHOT.them },
    }

  if (state.match === "서스펜디드")
    return { ...g, status, note: SUSPENDED_SNAPSHOT.inning }

  if (state.match === "경기 연기") return { ...g, status, note: "재편성 미정" }

  return { ...g, status }
}

/** 더블헤더는 오늘 경기를 1·2차전 두 경기로 나눠 보여준다 */

export function withCaseGames(g: Game): Game[] {
  if (g.date !== MOCK_TODAY || state.match !== "더블헤더")
    return [withCaseState(g)]

  return [
    { ...g, time: DOUBLEHEADER.first, note: "더블헤더 1차전" },

    { ...g, id: `${g.id}-2`, time: "1차전 후", note: "더블헤더 2차전" },
  ]
}

/** 오늘 경기 — 경기가 없는 시즌 구간에서는 없음 */

export function useTodayGame(): Game | undefined {
  const { phase } = useCaseState()

  return isNoGamePhase(phase) ? undefined : TODAY_GAME
}

/** 일정·예매처럼 경기 목록이 있는 화면에서 시즌 종료 구간이면 빈 목록 */

export const hasGamesInPhase = (p: SeasonPhase) => !isSeasonEndPhase(p)
