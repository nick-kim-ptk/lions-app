import { seatLabelForGame } from "@/data/mock"

export const KV_SLIDES = [
  {
    id: 0,

    badge: "EVENT",

    badgeColor: "bg-[#1B5BF0]",

    hideBadge: true,

    bg: "from-[#0E1A40] via-[#1B3A80] to-[#2255CC]",

    accent: "#6EC6FF",

    title: "라이온즈 팬 인증샷\n이벤트",

    sub: "지금 바로 참여하고 특별한 상품을 받아가세요!",

    cta: "자세히 보기",

    graphic: "📸",

    graphicBg: "bg-white/10",
  },

  {
    id: 1,

    badge: "AD",

    badgeColor: "bg-[#9CA3AF]",

    bg: "from-[#1A1A2E] via-[#16213E] to-[#0F3460]",

    accent: "#F0A500",

    title: "달빛소년 구자욱\n1,000득점 기념 유니폼",

    sub: "베리즈 샵 한정 출시 · 수량 한정",

    cta: "지금 구매하기",

    graphic: "👕",

    graphicBg: "bg-[#F0A500]/10",
  },

  {
    id: 2,

    badge: "NEW",

    badgeColor: "bg-[#E53935]",

    bg: "from-[#0E2F80] via-[#1B5BF0] to-[#3B7BFF]",

    accent: "#FFFFFF",

    title: "달빛소년 구자욱\n유니폼 출시!",

    sub: "#13 구자욱 · 라이온즈 레전드 에디션",

    cta: "바로 보기",

    graphic: "🦁",

    graphicBg: "bg-white/10",
  },

  {
    id: 3,

    badge: "APP",

    badgeColor: "bg-[#4ADE80]",

    bg: "from-[#0A1628] via-[#0E1A40] to-[#1B3A80]",

    accent: "#4ADE80",

    title: "삼성 라이온즈\n공식 앱 출시",

    sub: "팬들의 모든 순간을 함께합니다. 지금 시작하세요!",

    cta: "앱 소개 보기",

    graphic: "⚾",

    graphicBg: "bg-[#4ADE80]/10",
  },
]

/**
 * 홈 > 오늘의 경기 카드 상태 (케이스 베리에이션용 토글)
 *  - 경기 전 / 경기 중 / 경기 후: 정상 진행
 *  - 우천 지연: 강우로 경기 개시·진행이 지연되는 중 (취소 여부는 심판 판단 후 확정)
 *  - 우천 취소: 경기 취소 확정 (예매 티켓 자동 환불, 순연 편성)
 */

export const MATCH_STATES = [
  "경기 전",
  "경기 중",
  "경기 후",
  "우천 지연",
  "우천 취소",
  "경기 연기",
  "서스펜디드",
  "더블헤더",
] as const

export const MAGAZINE_ITEMS = [
  {
    id: 0,
    issue: "Vol.23",
    title: "여름의 끝, 라이온즈의 시작",
    date: "2026.08.04",
  },

  {
    id: 1,
    issue: "Vol.22",
    title: "라이온즈 올스타 스페셜",
    date: "2026.07.04",
  },

  {
    id: 2,
    issue: "Vol.21",
    title: "승리의 루틴 — 선수단의 하루",
    date: "2026.06.04",
  },

  {
    id: 3,
    issue: "Vol.20",
    title: "신인들의 반란, 새로운 라이온즈",
    date: "2026.05.04",
  },
]

export const LIONS_TV_ITEMS = [
  {
    id: 0,
    format: "long",
    title: "[하이라이트] 9/13 LG전 구자욱 멀티홈런 & 승리의 순간",
    duration: "08:42",
    views: "2.4만회",
  },

  {
    id: 1,
    format: "short",
    title: "[SHORTS] 승리 직후 선수단 퇴근길 세리머니",
    duration: "00:48",
    views: "1.8만회",
  },

  {
    id: 2,
    format: "long",
    title: "[라이온즈 훈련소] 원태인의 마구 슬라이더 던지는 법 독점 공개",
    duration: "12:03",
    views: "3.1만회",
  },

  {
    id: 3,
    format: "short",
    title: "[SHORTS] 라이온즈파크를 뒤흔든 떼창 순간",
    duration: "00:57",
    views: "1.2만회",
  },
]

/** 경기 중 카드 스냅샷 (더미) */

export const LIVE_SNAPSHOT = { inning: "7회초", us: 3, them: 1 }

/** 서스펜디드(경기 중단) 카드 스냅샷 (더미) */

export const SUSPENDED_SNAPSHOT = { inning: "6회초 중단", us: 3, them: 3 }

/** 더블헤더 카드 (더미) — 2차전은 1차전 종료 후 개시 */

export const DOUBLEHEADER = { first: "16:00", second: "1차전 종료 30분 후" }

/** 경기 후 카드 스냅샷 (더미) */

export const FINAL_SNAPSHOT = {
  us: 5,
  them: 2,
  summary: "구자욱 2홈런 · 원태인 7이닝 1실점",
}

/** 내가 예매한 오늘 경기 좌석 (더미) */

export const MY_SEAT = seatLabelForGame("G2026-09-19") ?? ""

// 알림 아이템 데이터 (기준 시각: data/mock/clock.ts 의 MOCK_TODAY)

export type NotifItem = {
  id: number
  date: string
  title: string
  body: string
  time: string
  read: boolean

  link: { label: string path: string } | null

  /** 필수 알림 — 설정에서 끌 수 없고 항상 발송 (예매·취소·환불, 예매자 대상 경기 변경) */

  required?: boolean
}

export const NOTIF_DATA: NotifItem[] = [
  {
    id: 0,
    date: "오늘",
    title: "[이벤트] 9월 키즈런 이벤트 접수 안내",
    body: "이번 키즈런은 금년 시즌 마지막으로 진행되는 키즈런으로, 선정 인원을 999명으로 확대했습니다. 지금 바로 참여하세요.",
    time: "방금 전",
    read: false,
    link: { label: "이벤트 참여하기", path: "/all/event-list" },
  },

  {
    id: 9,
    date: "오늘",
    title: "[경기] 우천으로 경기 시작이 지연되고 있어요",
    body: "대구 라이온즈 파크에 비가 내려 경기 시작이 지연되고 있습니다. 재개 또는 취소가 결정되면 다시 알려드릴게요.",
    time: "10분 전",
    read: true,
    link: { label: "경기 일정 보기", path: "/game/schedule" },
    required: true,
  },

  {
    id: 10,
    date: "오늘",
    title: "[경기] 오늘 선발 라인업이 발표됐어요",
    body: "경기 약 1시간 전 라인업이 발표됐습니다. 오늘의 타순을 확인해 보세요.",
    time: "1시간 전",
    read: true,
    link: { label: "라인업 보기", path: "/game/lineup" },
  },

  {
    id: 1,
    date: "오늘",
    title: "[경기] 오늘 삼성 라이온즈 vs NC 다이노스 경기가 17시에 시작됩니다",
    body: "오후 5시 대구 라이온즈 파크에서 경기가 시작됩니다. 오늘의 선발은 원태인! 선발 라인업은 16시경 발표돼요.",
    time: "30분 전",
    read: false,
    link: { label: "라인업 보기", path: "/game/lineup" },
  },

  {
    id: 2,
    date: "오늘",
    title: "[공지] 앱 업데이트 안내 (v3.2.1)",
    body: "새로운 기능과 버그 수정이 포함된 업데이트가 출시되었습니다.",
    time: "3시간 전",
    read: true,
    link: null,
  },

  {
    id: 3,
    date: "어제",
    title: "[티켓] 예매하신 티켓이 발권되었습니다",
    body: "9월 20일 삼성 라이온즈 vs NC 다이노스 경기 티켓이 발권되었습니다. 스마트 티켓을 확인하세요.",
    time: "어제",
    read: true,
    link: { label: "스마트 티켓 확인", path: "/my/ticket-qr" },
  },

  {
    id: 4,
    date: "어제",
    title: "[이벤트] 블루 시그널 미션 완료 보상 지급",
    body: "이번 주 미션을 완료하셨습니다. 앰블럼 50개가 지급되었습니다.",
    time: "어제",
    read: true,
    link: { label: "블루 시그널 보기", path: "/lounge/blue-signal" },
  },

  {
    id: 5,
    date: "어제",
    title: "[경기] 삼성 라이온즈 승리! 최종 스코어 9:4",
    body: "어제(9/18) 경기에서 삼성 라이온즈가 NC 다이노스를 9:4로 꺾었습니다.",
    time: "어제",
    read: true,
    link: null,
  },

  {
    id: 11,
    date: "어제",
    title: "[티켓] 9월 26일 경기 예매가 오픈됐어요",
    body: "일반 예매가 오픈되었습니다. 원하는 좌석을 지금 예매하세요.",
    time: "어제",
    read: true,
    link: { label: "티켓 예매하기", path: "/ticket" },
  },

  {
    id: 6,
    date: "이전",
    title: "[쇼핑] 주문하신 상품이 배송 중입니다",
    body: "주문번호 SL20260912-003 상품이 출고되었습니다.",
    time: "9/12",
    read: true,
    link: null,
  },

  {
    id: 7,
    date: "이전",
    title: "[경기] 9월 9일 한화전 우천 취소 안내",
    body: "우천으로 9/9(수) 한화전이 취소되었습니다. 예매하신 티켓은 자동 환불되며, 순연 경기는 10/5(월) 18:30에 편성되었습니다.",
    time: "9/9",
    read: true,
    link: { label: "경기 일정 보기", path: "/game/schedule" },
  },

  {
    id: 8,
    date: "이전",
    title: "[이벤트] 팬미팅 응모 결과 안내",
    body: "팬미팅 응모 결과를 확인해주세요. MY > 이벤트 내역에서 확인 가능합니다.",
    time: "9/10",
    read: true,
    link: { label: "응모 내역 보기", path: "/all/event-history" },
  },

  {
    id: 12,
    date: "이전",
    title: "[티켓] 우천 취소 티켓 환불이 완료되었어요",
    body: "9/9(수) 한화전 티켓 환불이 완료되었습니다. 결제 수단에 따라 영업일 기준 3~5일 이내 반영됩니다.",
    time: "9/10",
    read: true,
    link: { label: "예매 내역 보기", path: "/my/booking-history" },
    required: true,
  },

  {
    id: 13,
    date: "이전",
    title: "[경기] 9월 5일 경기가 연기되었어요",
    body: "기상 악화로 경기가 연기되었습니다. 예매하신 티켓은 재편성 일정 확정 후 다시 안내드립니다.",
    time: "9/5",
    read: true,
    link: { label: "예매 내역 보기", path: "/my/booking-history" },
    required: true,
  },
]
