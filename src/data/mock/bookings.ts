/**
 * 내 예매 내역 더미 — 일정 더미(games.ts)의 경기와 1:1로 연결됩니다.
 * 예매/티켓 화면(예매 내역·상세·취소·스마트티켓·선물)과 홈의 좌석 표시가 같은 데이터를 봅니다.
 */

import { addDays, fmtDotYMD, fmtDotYMDWT, toMinutes } from "./clock"

import { GAME_BY_ID, type Game } from "./games"

import { TEAMS } from "./teams"

export type BookingStatus = "예매 완료" | "관람 완료" | "전체 취소" | "부분 취소" | "경기 취소"

export interface Booking {
  /** 예매번호 */

  no: string

  gameId: string

  /** 좌석 구역 (예: 3루 내야 지정석) */

  zone: string

  /** 블록/열 (예: 333블록 3열) */

  block: string

  /** 좌석 번호 목록 */

  seats: number[]

  /** 예매일 (일반 예매 오픈일 = 경기 7일 전 같은 날) */

  bookedAt: { date: string time: string }

  status: BookingStatus

  /** 스마트티켓 발권 여부 (미발권이면 "스마트 티켓 발권 받기" 노출) */

  issued: boolean

  /** 취소·환불 사유 메모 (예: 우천 취소 자동 환불) */

  memo?: string

  /** 입장 게이트 */

  gate: string
}

/** 1매 가격 / 예매수수료(1매당) — 예매 상세/취소 화면의 금액 계산용 */

export const TICKET_PRICE = 16000

export const BOOKING_FEE = 1000

export const BOOKINGS: Booking[] = [
  {
    no: "2093817465",
    gameId: "G2026-09-19",
    zone: "3루 네이비석",
    block: "333블록 3열",
    seats: [47],

    bookedAt: { date: "2026-09-12", time: "10:42" },
    status: "예매 완료",
    issued: true,
    gate: "GATE 3",
  },

  {
    no: "8472051943",
    gameId: "G2026-09-20",
    zone: "1루 내야 지정석",
    block: "115블록 8열",
    seats: [3, 4],

    bookedAt: { date: "2026-09-13", time: "11:05" },
    status: "예매 완료",
    issued: true,
    gate: "GATE 1",
  },

  {
    no: "1523782316",
    gameId: "G2026-09-25",
    zone: "3루 내야 지정석",
    block: "333블록 3열",
    seats: [47, 48, 49, 50],

    bookedAt: { date: "2026-09-18", time: "11:03" },
    status: "예매 완료",
    issued: false,
    gate: "GATE 3",
  },

  {
    no: "3901746258",
    gameId: "G2026-09-13",
    zone: "외야 응원석",
    block: "A구역 5열",
    seats: [21],

    bookedAt: { date: "2026-09-06", time: "11:01" },
    status: "관람 완료",
    issued: true,
    gate: "GATE 2",
  },

  // 취소 내역

  {
    no: "4082637195",
    gameId: "G2026-09-26",
    zone: "외야 응원석",
    block: "B구역 9열",
    seats: [3, 4],

    bookedAt: { date: "2026-09-19", time: "10:01" },
    status: "부분 취소",
    issued: true,
    gate: "GATE 4",

    memo: "2매 중 1매 취소 (4번)",
  },

  {
    no: "6215948307",
    gameId: "G2026-09-12",
    zone: "3루 내야 지정석",
    block: "320블록 5열",
    seats: [10],

    bookedAt: { date: "2026-09-05", time: "10:30" },
    status: "전체 취소",
    issued: false,
    gate: "GATE 3",
  },

  {
    no: "7340928156",
    gameId: "G2026-09-09",
    zone: "1루 내야 지정석",
    block: "112블록 4열",
    seats: [21, 22],

    bookedAt: { date: "2026-09-02", time: "11:12" },
    status: "경기 취소",
    issued: false,
    gate: "GATE 1",

    memo: "우천 취소로 전액 자동 환불 (취소 수수료·예매 수수료 면제)",
  },
]

// ───────────────────────── 파생값 ─────────────────────────

const noSpace = (s: string) => s.replace(/ /g, "")

export const LEAGUE_LABEL = "[2026 신한 SOL KBO 리그]"

export const gameOf = (b: Booking): Game => GAME_BY_ID[b.gameId]

/** 삼성라이온즈 VS 두산베어스 (예매 시스템 표기: 공백 없음) */

export const matchTitle = (g: Game) =>
  `삼성라이온즈 VS ${noSpace(TEAMS[g.opp].name)}`

/** 경기 시작 4시간 전 (KBO 구단 예매 취소 마감 기준을 가정) */

export function cancelDeadline(g: Game): { date: string time: string } {
  const start = toMinutes(g.date, g.time) - 4 * 60

  const dayOffset = Math.floor((start - toMinutes(g.date, "00:00")) / (24 * 60))

  const date = addDays(g.date, dayOffset)

  const mins = start - toMinutes(date, "00:00")

  const hh = String(Math.floor(mins / 60)).padStart(2, "0")

  const mm = String(mins % 60).padStart(2, "0")

  return { date, time: `${hh}:${mm}` }
}

export const fmtCancelUntil = (g: Game) => {
  const d = cancelDeadline(g)

  return `${fmtDotYMD(d.date)} ${d.time}`
}

/** 2026.09.25(금) 18:30 */

export const fmtViewingAt = (g: Game) => fmtDotYMDWT(g.date, g.time)

/** 선택 좌석 문자열: 333블록 3열 47~50번 / 47번 */

export function seatText(b: Booking, only?: number[]): string {
  const seats = only ?? b.seats

  const first = seats[0]

  const last = seats[seats.length - 1]

  const range =
    seats.length === 1
      ? `${first}번`
      : seats.length === last - first + 1
        ? `${first}~${last}번`
        : `${seats.join(", ")}번`

  return `${b.block} ${range}`
}

export const UPCOMING_BOOKINGS = BOOKINGS.filter(
  (b) => b.status === "예매 완료" || b.status === "관람 완료",
)

export const CANCELLED_BOOKINGS = BOOKINGS.filter((b) =>
  ["전체 취소", "부분 취소", "경기 취소"].includes(b.status),
)

/** 발권된 스마트티켓 (경기 전) */

export const SMART_TICKET_BOOKINGS = BOOKINGS.filter(
  (b) =>
    b.issued &&
    ["예매 완료", "부분 취소"].includes(b.status) &&
    gameOf(b).status === "scheduled",
)

/** 홈 > 오늘의 경기에 노출할 내 좌석 */

export function seatLabelForGame(gameId: string): string | null {
  const b = BOOKINGS.find(
    (x) => x.gameId === gameId && x.status === "예매 완료",
  )

  return b ? `${b.zone} ${seatText(b)}` : null
}

export const bookingByNo = (no: string) => BOOKINGS.find((b) => b.no === no)

/** 예매 상세·취소 화면이 보여주는 대표 예매 (9/25 KT전 4매) */

export const DETAIL_BOOKING_NO = "1523782316"
