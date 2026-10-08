import ticketKv from '@/assets/images/ticket-kv.png'
import { KBO_TEAM_NAMES, SMART_TICKET_BOOKINGS, TEAMS, fmtDotMDW, gameOf, seatText } from '@/data/mock'

// 029(031)-SL-MY-02 설정
// 211x61 PNG — 아이콘 3개 가로 배열: 카카오(0~70), 네이버(70~140), 구글(140~211)
export const SOCIAL_ICONS = [
  { label: '카카오', bgX: 0 },
  { label: '네이버', bgX: -71 },
  { label: '구글',   bgX: -142 },
]

// 033(035)-SL-MY-06 내 정보 수정
export const KBO_TEAMS = KBO_TEAM_NAMES

export const WITHDRAW_REASONS = [
  '앱 사용 빈도가 낮아서',
  '원하는 콘텐츠가 부족해서',
  '개인정보 보호가 걱정돼서',
  '다른 계정으로 재가입하려고',
  '서비스에 불만족해서',
  '기타',
]

// 037(039)-SL-MY-10 스마트티켓 (QR) — 전체화면
// 발권된 예매(data/mock/bookings)를 좌석 1매 = 티켓 1장으로 펼친 목록
export const MOBILE_TICKETS = SMART_TICKET_BOOKINGS.flatMap((b) => {
  const g = gameOf(b)
  const seats = b.status === '부분 취소' ? b.seats.slice(0, 1) : b.seats
  return seats.map((seat) => ({
    opponent: TEAMS[g.opp].name,
    date: `${fmtDotMDW(g.date)} ${g.time}`,
    gate: b.gate,
    zone: b.zone,
    seat: seatText(b, [seat]),
    ticketNo: `TK-${g.date.replace(/-/g, '')}-${b.no.slice(-4)}`,
    barcode: `SL-${g.date}-${b.no.slice(-4)}-S${seat}`,
    kvImage: ticketKv,
  }))
}).map((t, i) => ({ id: i + 1, ...t }))
