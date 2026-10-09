/**
 * 삼성 라이온즈 가상 경기 일정 (2026-09-01 ~ 2026-10-05).
 * 실제 KBO 일정이 아니라 화면 케이스를 보여주기 위한 더미입니다.
 *
 * 반영한 KBO 규칙/케이스
 *  - 월요일 휴식 (순연 경기만 예외)
 *  - 기본 시작 시각: 화~금 18:30 / 토 17:00 / 일 14:00
 *  - 연장 승리, 연장 무승부(12회), 강우콜드, 우천 취소 → 순연 편성
 */

import {
  MOCK_TODAY,
  NOW_MINUTES,
  addDays,
  toMinutes,
  weekdayIndex,
} from "./clock"

import { TEAMS, type TeamCode } from "./teams"

export type GameStatus = "scheduled" | "live" | "delayed" | "final" | "cancelled" | "postponed" | "suspended" // 경기 전 // 경기 중 // 우천 등으로 경기 개시/진행 지연 // 경기 종료 // 우천 취소 (순연) // 연기 (재편성 미정) // 서스펜디드

export interface Game {
  id: string

  date: string

  time: string

  /** true = 라이온즈파크 홈 경기 */

  home: boolean

  opp: TeamCode

  stadium: string

  status: GameStatus

  /** 삼성 득점 / 상대 득점 */

  score?: { us: number them: number }

  /** 연장/콜드 등으로 9회가 아닌 경우의 최종 이닝 */

  innings?: number

  /** 화면에 노출하는 부가 설명 (예: 우천 콜드, 연장 11회 끝내기) */

  note?: string

  /** 우천 취소된 경기의 순연 경기 id */

  makeupGameId?: string

  /** 순연 경기인 경우 원 경기 id */

  makeupOfId?: string

  /** 매진 여부 (홈 경기 예매용) */

  soldOut?: boolean
}

function defaultTime(date: string) {
  const w = weekdayIndex(date)

  if (w === 6) return "17:00"

  if (w === 0) return "14:00"

  return "18:30"
}

function game(
  date: string,

  ha: "H" | "A",

  opp: TeamCode,

  status: GameStatus,

  extra: Partial<Game> & { us?: number them?: number } = {},
): Game {
  const { us, them, ...rest } = extra

  const home = ha === "H"

  return {
    id: `G${date}`,

    date,

    time: defaultTime(date),

    home,

    opp,

    stadium: home ? TEAMS.SS.stadium : TEAMS[opp].stadium,

    status,

    score: us !== undefined && them !== undefined ? { us, them } : undefined,

    ...rest,
  }
}

export const GAMES: Game[] = [
  // 홈 3연전 vs 롯데

  game("2026-09-01", "H", "LT", "final", { us: 7, them: 3 }),

  game("2026-09-02", "H", "LT", "final", { us: 2, them: 5 }),

  game("2026-09-03", "H", "LT", "final", { us: 4, them: 1 }),

  // 원정 3연전 @SSG — 연장 승리 / 12회 무승부

  game("2026-09-04", "A", "SK", "final", { us: 3, them: 6 }),

  game("2026-09-05", "A", "SK", "final", {
    us: 8,
    them: 7,
    innings: 11,
    note: "연장 11회 승리",
  }),

  game("2026-09-06", "A", "SK", "final", {
    us: 4,
    them: 4,
    innings: 12,
    note: "연장 12회 무승부",
  }),

  // 홈 3연전 vs 한화 — 9/9 우천 취소 → 10/5 순연

  game("2026-09-08", "H", "HH", "final", { us: 5, them: 2 }),

  game("2026-09-09", "H", "HH", "cancelled", {
    note: "우천 취소 (10/5 순연)",
    makeupGameId: "G2026-10-05",
  }),

  game("2026-09-10", "H", "HH", "final", { us: 3, them: 2 }),

  // 홈 3연전 vs LG

  game("2026-09-11", "H", "LG", "final", { us: 6, them: 2 }),

  game("2026-09-12", "H", "LG", "final", { us: 1, them: 3 }),

  game("2026-09-13", "H", "LG", "final", { us: 5, them: 3 }),

  // 원정 3연전 @두산(잠실) — 9/17 강우 콜드

  game("2026-09-15", "A", "OB", "final", { us: 2, them: 4 }),

  game("2026-09-16", "A", "OB", "final", { us: 6, them: 5 }),

  game("2026-09-17", "A", "OB", "final", {
    us: 5,
    them: 2,
    innings: 6,
    note: "6회 강우 콜드게임 승리",
  }),

  // 홈 3연전 vs NC — 9/19(오늘)

  game("2026-09-18", "H", "NC", "final", { us: 9, them: 4 }),

  game("2026-09-19", "H", "NC", "scheduled"),

  game("2026-09-20", "H", "NC", "scheduled"),

  // 원정 3연전 @KIA

  game("2026-09-22", "A", "HT", "scheduled"),

  game("2026-09-23", "A", "HT", "scheduled"),

  game("2026-09-24", "A", "HT", "scheduled"),

  // 홈 3연전 vs KT — 토요일 매진

  game("2026-09-25", "H", "KT", "scheduled"),

  game("2026-09-26", "H", "KT", "scheduled", { soldOut: true }),

  game("2026-09-27", "H", "KT", "scheduled"),

  // 원정 3연전 @롯데

  game("2026-09-29", "A", "LT", "scheduled"),

  game("2026-09-30", "A", "LT", "scheduled"),

  game("2026-10-01", "A", "LT", "scheduled"),

  // 홈 3연전 vs SSG

  game("2026-10-02", "H", "SK", "scheduled"),

  game("2026-10-03", "H", "SK", "scheduled"),

  game("2026-10-04", "H", "SK", "scheduled"),

  // 9/9 우천 취소 순연 경기 (월요일에 편성된 예외 케이스)

  game("2026-10-05", "H", "HH", "scheduled", {
    note: "9/9 우천 취소 순연 경기",
    makeupOfId: "G2026-09-09",
  }),
]

export const GAME_BY_ID: Record<string, Game> = Object.fromEntries(
  GAMES.map((g) => [g.id, g]),
)

export const TODAY_GAME = GAMES.find((g) => g.date === MOCK_TODAY)

/** 퓨처스리그(2군) 가상 일정 — 홈 경기는 경산볼파크 */

export const FUTURES_VENUE = "경산볼파크"

export const FUTURES_GAMES: Game[] = [
  {
    ...game("2026-09-12", "H", "LG", "final", { us: 7, them: 2 }),
    time: "11:00",
    stadium: FUTURES_VENUE,
  },

  {
    ...game("2026-09-13", "H", "LG", "final", { us: 3, them: 5 }),
    time: "11:00",
    stadium: FUTURES_VENUE,
  },

  {
    ...game("2026-09-15", "A", "KT", "final", {
      us: 4,
      them: 4,
      innings: 9,
      note: "9회 무승부",
    }),
    time: "11:00",
  },

  {
    ...game("2026-09-16", "A", "KT", "final", { us: 6, them: 1 }),
    time: "11:00",
  },

  {
    ...game("2026-09-18", "H", "NC", "final", { us: 2, them: 3 }),
    time: "11:00",
    stadium: FUTURES_VENUE,
  },

  {
    ...game("2026-09-19", "H", "NC", "scheduled"),
    time: "11:00",
    stadium: FUTURES_VENUE,
  },

  { ...game("2026-09-22", "A", "HH", "scheduled"), time: "11:00" },

  { ...game("2026-09-23", "A", "HH", "scheduled"), time: "11:00" },
]

// ───────────────────────── 결과 / 상태 헬퍼 ─────────────────────────

export type GameResult = "win" | "loss" | "draw"

export function resultOf(g: Game): GameResult | null {
  if (g.status !== "final" || !g.score) return null

  if (g.score.us === g.score.them) return "draw"

  return g.score.us > g.score.them ? "win" : "loss"
}

export const RESULT_LABEL: Record<GameResult, string> = {
  win: "승",
  loss: "패",
  draw: "무",
}

/** '승 5:3' */

export function resultText(g: Game): string | null {
  const r = resultOf(g)

  return r && g.score
    ? `${RESULT_LABEL[r]} ${g.score.us}:${g.score.them}`
    : null
}

export const STATUS_LABEL: Record<GameStatus, string> = {
  scheduled: "경기 전",

  live: "경기 중",

  delayed: "경기 지연",

  final: "경기 종료",

  cancelled: "우천 취소",

  postponed: "경기 연기",

  suspended: "서스펜디드",
}

export const gameStartMinutes = (g: Game) => toMinutes(g.date, g.time)

export const upcomingGames = (from = MOCK_TODAY) =>
  GAMES.filter((g) => g.date >= from && g.status !== "cancelled")

export const pastGames = () => GAMES.filter((g) => g.status === "final")

export const nextGame = () =>
  GAMES.find((g) => g.date > MOCK_TODAY && g.status === "scheduled")

export const lastFinishedGame = () =>
  [...GAMES].reverse().find((g) => g.status === "final" && g.date <= MOCK_TODAY)

export const gamesInMonth = (
  year: number,
  month: number,
  list: Game[] = GAMES,
) =>
  list.filter((g) =>
    g.date.startsWith(`${year}-${String(month).padStart(2, "0")}`),
  )

/** 시즌 전적 (더미 구간 합산 — 화면 노출용은 아님) */

export function recordOf(list: Game[] = pastGames()) {
  return list.reduce(
    (acc, g) => {
      const r = resultOf(g)

      if (r === "win") acc.w++
      else if (r === "loss") acc.l++
      else if (r === "draw") acc.d++

      return acc
    },

    { w: 0, l: 0, d: 0 },
  )
}

// ───────────────────────── 예매 ─────────────────────────

export type TicketState = "before" | "presale" | "open" | "soldout" | "closed" | "cancelled" | "away" // 선예매 오픈 전 // 선예매(라이온즈 멤버십) 중 // 일반 예매 중 // 매진 // 예매 마감(경기 시작 이후/종료) // 경기 취소·연기 // 원정 경기 (앱 예매 대상 아님)

export interface TicketSale {
  preSaleAt: { date: string time: string }

  generalAt: { date: string time: string }
}

/** 선예매: 경기 7일 전 10:00 / 일반: 같은 날 11:00 (순연 경기도 동일 규칙을 가정) */

export function ticketSaleOf(g: Game): TicketSale | null {
  if (!g.home) return null

  const d = addDays(g.date, -7)

  return {
    preSaleAt: { date: d, time: "10:00" },
    generalAt: { date: d, time: "11:00" },
  }
}

export function ticketStateOf(g: Game, now = NOW_MINUTES): TicketState {
  if (!g.home) return "away"

  if (g.status === "cancelled" || g.status === "postponed") return "cancelled"

  if (g.status === "final" || now >= gameStartMinutes(g)) return "closed"

  const sale = ticketSaleOf(g)!

  if (now < toMinutes(sale.preSaleAt.date, sale.preSaleAt.time)) return "before"

  if (g.soldOut) return "soldout"

  if (now < toMinutes(sale.generalAt.date, sale.generalAt.time))
    return "presale"

  return "open"
}

export const TICKET_STATE_LABEL: Record<TicketState, string> = {
  before: "오픈 전",

  presale: "선예매 중",

  open: "예매 가능",

  soldout: "매진",

  closed: "예매 마감",

  cancelled: "경기 취소",

  away: "원정",
}

/** 예매 화면에 노출할 홈 경기 (오늘 이후, 취소 경기 제외 — 순연 경기는 별도 날짜로 포함) */

export const bookableHomeGames = () =>
  GAMES.filter(
    (g) => g.home && g.date >= MOCK_TODAY && g.status !== "cancelled",
  )

/** 가장 가까운 "아직 예매가 열리지 않은" 홈 경기 (예매 오픈 카운트다운 대상) */

export const nextSaleOpeningGame = () =>
  bookableHomeGames().find((g) => ticketStateOf(g) === "before")

// ───────────────────────── 오늘 경기 라인업 ─────────────────────────

export interface LineupEntry {
  order: number

  name: string

  pos: string

  /** 삼성 선수는 PLAYERS의 id, 상대 선수는 생략 */

  playerId?: string

  /** 상대 선수 표시용 (등번호/타율) */

  no?: number

  avg?: string
}

export interface LineupSet {
  /** KBO는 경기 시작 약 1시간 전에 선발 라인업을 발표 */

  announcedAt: string

  startingPitcher: {
    name: string
    playerId?: string
    no: number
    handed: string
    era: string
    w: number
    k: number
  }

  batting: LineupEntry[]
}

export const TODAY_LINEUP: { us: LineupSet them: LineupSet } = {
  us: {
    announcedAt: "16:00",

    startingPitcher: {
      name: "원태인",
      playerId: "won-tae-in",
      no: 29,
      handed: "우투우타",
      era: "2.31",
      w: 11,
      k: 134,
    },

    batting: [
      { order: 1, name: "김지찬", pos: "CF", playerId: "kim-ji-chan" },

      { order: 2, name: "구자욱", pos: "LF", playerId: "koo-ja-wook" },

      { order: 3, name: "이재현", pos: "SS", playerId: "lee-jae-hyun" },

      { order: 4, name: "디아즈", pos: "1B", playerId: "diaz" },

      { order: 5, name: "박병호", pos: "DH", playerId: "park-byung-ho" },

      { order: 6, name: "강민호", pos: "C", playerId: "kang-min-ho" },

      { order: 7, name: "김헌곤", pos: "RF", playerId: "kim-heon-gon" },

      { order: 8, name: "김영웅", pos: "3B", playerId: "kim-young-woong" },

      { order: 9, name: "류지혁", pos: "2B", playerId: "ryu-ji-hyuk" },
    ],
  },

  them: {
    announcedAt: "16:00",

    startingPitcher: {
      name: "구창모",
      no: 17,
      handed: "좌투좌타",
      era: "3.02",
      w: 9,
      k: 121,
    },

    batting: [
      { order: 1, name: "김휘집", pos: "2B", no: 1, avg: ".322" },

      { order: 2, name: "김주원", pos: "SS", no: 7, avg: ".281" },

      { order: 3, name: "박건우", pos: "RF", no: 37, avg: ".309" },

      { order: 4, name: "데이비슨", pos: "1B", no: 30, avg: ".274" },

      { order: 5, name: "권희동", pos: "LF", no: 31, avg: ".288" },

      { order: 6, name: "서호철", pos: "3B", no: 6, avg: ".265" },

      { order: 7, name: "김형준", pos: "C", no: 22, avg: ".251" },

      { order: 8, name: "천재환", pos: "CF", no: 8, avg: ".243" },

      { order: 9, name: "한석현", pos: "DH", no: 35, avg: ".238" },
    ],
  },
}
