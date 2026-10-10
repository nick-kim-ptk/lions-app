import type { TeamCode } from "@/data/mock"

// 013-SL-GM-08 라팍 정보

export const STADIUM_TABS = [
  "식음매장",
  "교통/주차",
  "편의시설",
  "좌석 배치",
  "이용 안내",
  "라팍 소개",
]

/** 015-SL-GM-10 라이온즈 원정대 — 원정 구장 목록 (게임 대시보드 '오늘의 원정 구장'과 공유) */

export const AWAY_STADIUMS: {
  name: string
  team: string
  city: string
  emoji: string
  color: string
  teams: TeamCode[]
}[] = [
  {
    name: "잠실야구장",
    team: "LG · 두산",
    city: "서울",
    emoji: "🏟",
    color: "#C8102E",
    teams: ["LG", "OB"],
  },

  {
    name: "고척스카이돔",
    team: "키움",
    city: "서울",
    emoji: "🏟",
    color: "#6B21A8",
    teams: ["WO"],
  },

  {
    name: "인천 SSG랜더스필드",
    team: "SSG",
    city: "인천",
    emoji: "🏟",
    color: "#C8102E",
    teams: ["SK"],
  },

  {
    name: "수원 KT위즈파크",
    team: "KT",
    city: "수원",
    emoji: "🏟",
    color: "#1B1B1B",
    teams: ["KT"],
  },

  {
    name: "대전 한화생명볼파크",
    team: "한화",
    city: "대전",
    emoji: "🏟",
    color: "#F97316",
    teams: ["HH"],
  },

  {
    name: "광주-기아 챔피언스 필드",
    team: "KIA",
    city: "광주",
    emoji: "🏟",
    color: "#C8102E",
    teams: ["HT"],
  },

  {
    name: "사직야구장",
    team: "롯데",
    city: "부산",
    emoji: "🏟",
    color: "#1B5BF0",
    teams: ["LT"],
  },

  {
    name: "창원NC파크",
    team: "NC",
    city: "창원",
    emoji: "🏟",
    color: "#1B3A6B",
    teams: ["NC"],
  },
]

export const AWAY_TABS = ["구장 소개", "대중교통", "주차", "편의시설"]

/**
 * 구장별 상세 (AWAY_STADIUMS와 같은 순서). 교통·주차 세부 값은 화면 구성을 위한 예시이며
 * 설계서 기준 QA 시 확인 후 보강합니다.
 */

export const AWAY_INFO: {
  address: string

  seatNote: string

  tips: string[]

  subway: { line: string; detail: string }[]

  bus: { type: string; numbers: string }[]

  extraTransit?: { title: string; detail: string }

  parking: {
    open: string
    fee: string
    reserve: string
    nearby: { name: string; fee: string }[]
  }

  facilities: { icon: string; title: string; desc: string }[]
}[] = [
  {
    address: "서울특별시 송파구 올림픽로 25",

    seatNote: "삼성 원정 응원석은 3루 측 지정 구역입니다.",

    tips: [
      "경기 시작 2시간 전부터 입장할 수 있어요.",
      "원정 응원석은 3루 측이며 응원 도구 반입 규정이 있어요.",
      "경기 종료 직후 지하철이 매우 혼잡하니 여유 있게 이동하세요.",
    ],

    subway: [
      { line: "2·9호선 종합운동장역", detail: "6번 출구에서 도보 약 5분" },
    ],

    bus: [
      { type: "간선", numbers: "340, 2412 (예시)" },
      { type: "지선", numbers: "3411, 3412 (예시)" },
    ],

    parking: {
      open: "경기 시작 3시간 전부터",
      fee: "최초 30분 1,500원, 이후 10분당 500원 (예시)",
      reserve: "사전 예약 가능 (구단 공식 안내 확인)",
      nearby: [{ name: "종합운동장 공영주차장", fee: "10분당 400원 (예시)" }],
    },

    facilities: [
      { icon: "♿", title: "장애인 화장실", desc: "각 층 통로" },
      { icon: "👶", title: "수유실", desc: "1루·3루 게이트 인근" },
      { icon: "🧳", title: "물품보관함", desc: "정문 앞 20칸" },
      { icon: "🛍", title: "팀스토어", desc: "구장 1층" },
    ],
  },

  {
    address: "서울특별시 구로구 경인로 430",

    seatNote: "삼성 원정 응원석은 3루 측 지정 구역입니다.",

    tips: [
      "돔구장이라 우천 취소가 거의 없어요.",
      "실내라 냉난방이 되어 계절과 관계없이 쾌적해요.",
      "지하철 구일역에서 가까워 대중교통 이용을 권장해요.",
    ],

    subway: [{ line: "1호선 구일역", detail: "1번 출구에서 도보 약 10분" }],

    bus: [
      { type: "간선", numbers: "503, 662 (예시)" },
      { type: "지선", numbers: "6411 (예시)" },
    ],

    parking: {
      open: "경기 시작 2시간 전부터",
      fee: "최초 30분 2,000원, 이후 10분당 600원 (예시)",
      reserve: "사전 예약 필수 (예시)",
      nearby: [{ name: "고척동 공영주차장", fee: "10분당 300원 (예시)" }],
    },

    facilities: [
      { icon: "♿", title: "장애인 화장실", desc: "각 층 통로" },
      { icon: "👶", title: "수유실", desc: "1층 게이트 인근" },
      { icon: "🛍", title: "팀스토어", desc: "1루 측 1층" },
    ],
  },

  {
    address: "인천광역시 미추홀구 매소홀로 618",

    seatNote: "삼성 원정 응원석은 3루 측 지정 구역입니다.",

    tips: [
      "바다가 가까워 저녁에는 바람이 강해요. 겉옷을 챙기세요.",
      "외야 잔디석에서 돗자리를 펴고 관람할 수 있어요.",
      "경기 후 문학경기장역이 붐비니 한 정거장 걸어가는 것도 방법이에요.",
    ],

    subway: [
      { line: "인천1호선 문학경기장역", detail: "3번 출구에서 도보 약 5분" },
    ],

    bus: [
      { type: "간선", numbers: "519, 908 (예시)" },
      { type: "지선", numbers: "306 (예시)" },
    ],

    parking: {
      open: "경기 시작 3시간 전부터",
      fee: "최초 30분 1,000원, 이후 10분당 400원 (예시)",
      reserve: "사전 예약 가능 (예시)",
      nearby: [{ name: "문학경기장 주차장", fee: "10분당 300원 (예시)" }],
    },

    facilities: [
      { icon: "♿", title: "장애인 화장실", desc: "각 게이트 인근" },
      { icon: "👶", title: "수유실", desc: "1루 게이트 내" },
      { icon: "🧳", title: "물품보관함", desc: "정문 앞" },
      { icon: "🛍", title: "팀스토어", desc: "구장 1층" },
    ],
  },

  {
    address: "경기도 수원시 장안구 경수대로 893",

    seatNote: "삼성 원정 응원석은 3루 측 지정 구역입니다.",

    tips: [
      "지하철역이 멀어 버스·셔틀 이용이 편해요.",
      "경기 후 수원역 방면 버스가 붐벼요.",
      "외야석은 그늘이 적으니 선크림과 모자를 챙기세요.",
    ],

    subway: [
      {
        line: "1호선 수원역",
        detail: "버스로 환승해 약 20분 (도보 이동 어려움)",
      },
    ],

    bus: [
      { type: "간선", numbers: "13, 36 (예시)" },
      { type: "지선", numbers: "82-1 (예시)" },
    ],

    parking: {
      open: "경기 시작 3시간 전부터",
      fee: "최초 30분 1,000원, 이후 10분당 500원 (예시)",
      reserve: "사전 예약 불가 (예시)",
      nearby: [{ name: "수원종합운동장 주차장", fee: "10분당 300원 (예시)" }],
    },

    facilities: [
      { icon: "♿", title: "장애인 화장실", desc: "각 통로" },
      { icon: "👶", title: "수유실", desc: "1루 게이트 내" },
      { icon: "🛍", title: "팀스토어", desc: "정문 인근" },
    ],
  },

  {
    address: "대전광역시 중구 대종로 373",

    seatNote: "삼성 원정 응원석은 3루 측 지정 구역입니다.",

    tips: [
      "신축 구장이라 시설이 깔끔하고 동선이 넓어요.",
      "경기 전 구장 주변 야구 거리에서 사진 찍기 좋아요.",
      "KTX 이용 시 대전역에서 이동 시간을 넉넉히 잡으세요.",
    ],

    subway: [{ line: "1호선 오룡역", detail: "도보 약 10분 (예시)" }],

    bus: [
      { type: "간선", numbers: "102, 314 (예시)" },
      { type: "지선", numbers: "811 (예시)" },
    ],

    extraTransit: {
      title: "KTX",
      detail:
        "대전역 하차 후 택시 또는 버스로 약 15분 (구단 공식 홈페이지 안내 기준)",
    },

    parking: {
      open: "경기 시작 3시간 전부터",
      fee: "최초 30분 1,000원, 이후 10분당 500원 (예시)",
      reserve: "사전 예약 가능 (예시)",
      nearby: [{ name: "중구 공영주차장", fee: "10분당 400원 (예시)" }],
    },

    facilities: [
      { icon: "♿", title: "장애인 화장실", desc: "각 층 통로" },
      { icon: "👶", title: "수유실", desc: "1층 게이트 인근" },
      { icon: "🧳", title: "물품보관함", desc: "정문 앞" },
      { icon: "🛍", title: "팀스토어", desc: "구장 1층" },
    ],
  },

  {
    address: "광주광역시 북구 서림로 10",

    seatNote: "삼성 원정 응원석은 3루 측 지정 구역입니다.",

    tips: [
      "경기장 주변 먹거리가 다양해 일찍 가서 즐기기 좋아요.",
      "여름에는 햇볕이 강하니 모자와 물을 챙기세요.",
      "버스 노선이 많아 환승 없이 이동하기 편해요.",
    ],

    subway: [
      { line: "광주1호선 (인근 역 입력)", detail: "버스 환승 후 이동 (예시)" },
    ],

    bus: [
      { type: "간선", numbers: "16, 26 (예시)" },
      { type: "지선", numbers: "1000 (예시)" },
    ],

    parking: {
      open: "경기 시작 3시간 전부터",
      fee: "최초 30분 1,000원, 이후 10분당 500원 (예시)",
      reserve: "사전 예약 불가 (예시)",
      nearby: [{ name: "광주종합경기장 주차장", fee: "10분당 300원 (예시)" }],
    },

    facilities: [
      { icon: "♿", title: "장애인 화장실", desc: "각 통로" },
      { icon: "👶", title: "수유실", desc: "1루 게이트 내" },
      { icon: "🛍", title: "팀스토어", desc: "정문 인근" },
    ],
  },

  {
    address: "부산광역시 동래구 사직로 45",

    seatNote: "삼성 원정 응원석은 3루 측 지정 구역입니다.",

    tips: [
      "롯데 팬들의 응원 열기가 뜨거워요. 현장 분위기를 즐겨 보세요.",
      "경기 후 사직종합운동장역이 매우 붐벼요.",
      "내야 상단은 계단이 가파르니 신발을 편하게 신으세요.",
    ],

    subway: [
      { line: "3호선 종합운동장역", detail: "1번 출구에서 도보 약 3분" },
    ],

    bus: [
      { type: "간선", numbers: "10, 44 (예시)" },
      { type: "지선", numbers: "129 (예시)" },
    ],

    parking: {
      open: "경기 시작 3시간 전부터",
      fee: "최초 30분 1,000원, 이후 10분당 400원 (예시)",
      reserve: "사전 예약 불가 (예시)",
      nearby: [{ name: "사직종합운동장 주차장", fee: "10분당 300원 (예시)" }],
    },

    facilities: [
      { icon: "♿", title: "장애인 화장실", desc: "각 통로" },
      { icon: "👶", title: "수유실", desc: "1루 게이트 내" },
      { icon: "🧳", title: "물품보관함", desc: "정문 앞" },
    ],
  },

  {
    address: "경상남도 창원시 마산회원구 삼호로 63",

    seatNote: "삼성 원정 응원석은 3루 측 지정 구역입니다.",

    tips: [
      "가까운 지하철역이 없어 버스·택시·자차 이용이 필요해요.",
      "구장이 넓어 게이트 위치를 미리 확인하세요.",
      "외야에서 바라보는 야경이 멋져요.",
    ],

    subway: [],

    bus: [
      { type: "간선", numbers: "110, 250 (예시)" },
      { type: "지선", numbers: "35 (예시)" },
    ],

    parking: {
      open: "경기 시작 3시간 전부터",
      fee: "최초 30분 1,000원, 이후 10분당 500원 (예시)",
      reserve: "사전 예약 가능 (예시)",
      nearby: [{ name: "마산종합운동장 주차장", fee: "10분당 300원 (예시)" }],
    },

    facilities: [
      { icon: "♿", title: "장애인 화장실", desc: "각 층 통로" },
      { icon: "👶", title: "수유실", desc: "1층 게이트 인근" },
      { icon: "🧳", title: "물품보관함", desc: "정문 앞" },
      { icon: "🛍", title: "팀스토어", desc: "구장 1층" },
    ],
  },
]

// 011-SL-GM-06 선수 기록 > 팀 기록 (구단 대기록) — 어드민 [경기 관리 > 구단 기록 관리]에서 등록
// 팀 대상 기록은 팀 기록 탭에, 선수 대상 기록은 해당 선수 상세(066)에 노출한다. 목록은 달성일 내림차순.

export type RecordBadge = "최초 기록" | "최고 기록" | "최다 기록" | "역사적 기록"

export interface TeamRecord {
  /** 기록 대상: 팀 또는 선수 */
  target: "팀" | "선수"

  /** 대상이 선수일 때 PLAYERS의 id */
  playerId?: string

  /** 달성일 (YYYY-MM-DD) */
  date: string

  record: string

  badge: RecordBadge

  /** 어드민에서 등록한 카드 배경 이미지 (더미: 그라데이션으로 대체). 없으면 기본 배경 */
  bg?: string
}

/** 2024-09-01 → 2024.09.01 */
export const fmtRecordDate = (d: string) => d.replace(/-/g, ".")

const bg = (a: string, b: string) => `linear-gradient(160deg, ${a}, ${b})`

export const TEAM_RECORDS: TeamRecord[] = [
  {
    target: "팀",
    date: "2024-09-01",
    record: "KBO 리그 최초 통산 3,000승 돌파",
    badge: "역사적 기록",
    bg: bg("#1B5BF0", "#0A1A4E"),
  },

  {
    target: "선수",
    playerId: "koo-ja-wook",
    date: "2024-08-14",
    record: "구단 역대 최초 4시즌 연속 150안타",
    badge: "최초 기록",
    bg: bg("#0E7C86", "#06303A"),
  },

  {
    target: "팀",
    date: "2023-10-20",
    record: "프로야구 역사상 최다 포스트시즌 진출 (31회)",
    badge: "최다 기록",
    bg: bg("#6D28D9", "#2E1065"),
  },

  {
    target: "선수",
    playerId: "won-tae-in",
    date: "2023-09-05",
    record: "구단 한 시즌 최다 탈삼진 (200개)",
    badge: "최다 기록",
    bg: bg("#B45309", "#451A03"),
  },

  {
    target: "팀",
    date: "2023-07-22",
    record: "KBO 역대 최초 팀 통산 50,000안타 달성",
    badge: "최초 기록",
  },

  {
    target: "팀",
    date: "1986-10-31",
    record: "단일 시즌 역대 최고 승률 (0.706)",
    badge: "최고 기록",
    bg: bg("#BE123C", "#4C0519"),
  },
]

// 016-SL-GM-11 라이온즈 VR

export const VR_INTRO = {
  title: "라팍을 360°로 둘러보세요",

  desc: "360° 카메라로 담은 경기장 곳곳을 화면 속에서 직접 둘러볼 수 있어요.",

  note: "용량이 큰 콘텐츠라 Wi-Fi 환경에서 이용을 권장해요.",
}

/** 360° 뷰어 조작법 */

export const VR_GESTURES = [
  {
    icon: "👆",
    title: "드래그",
    desc: "손가락으로 밀어 좌우·위아래로 시점을 돌려요",
  },

  {
    icon: "🤏",
    title: "핀치",
    desc: "두 손가락을 벌리거나 오므려 확대·축소해요",
  },

  { icon: "🔄", title: "더블 탭", desc: "처음 시점으로 돌아가요" },
]

/** VR 주제 4종 — 카드를 누르면 뷰어가 열리고, 뷰어 상단 버튼으로 세부 장소를 바꿈 */

export const VR_TOPICS = [
  {
    id: "seat",
    title: "내 자리 미리 보기",
    desc: "좌석 종류별로 내 자리에서 보이는 풍경을 미리 확인해요",
    items: ["특별석", "테이블석", "내야석", "SKY석", "외야석"],
    imageLabel: "좌석 시야 360° 이미지",
  },

  {
    id: "player",
    title: "선수의 눈으로 보기",
    desc: "선수들이 머무는 공간에서 경기장을 바라봐요",
    items: ["선수 라커룸", "원정팀 라커룸", "덕아웃", "불펜"],
    imageLabel: "선수 시점 360° 이미지",
  },

  {
    id: "space",
    title: "선수들의 공간 들여다보기",
    desc: "선수들이 서는 그 자리, 마운드와 타석에서 둘러봐요",
    items: ["마운드", "타석", "그라운드"],
    imageLabel: "그라운드 360° 이미지",
  },

  {
    id: "explore",
    title: "라팍 곳곳 탐험하기",
    desc: "평소 들어가기 어려운 라팍 곳곳을 탐험해요",
    items: ["중계석", "기자실", "선수단 식당", "전광판 뒤"],
    imageLabel: "라팍 탐험 360° 이미지",
  },
] as const

export type VrTopicId = typeof VR_TOPICS[number]["id"]

/** 내 자리 미리 보기 — 좌석 종류별 보기 (예매 정보와는 연결하지 않음) */

export const VR_SEAT_GROUPS = [
  { group: "특별석", seats: ["VIP석", "특별석", "커플석", "중앙 테이블석"] },

  {
    group: "테이블석",
    seats: [
      "1루 테이블석",
      "3루 테이블석",
      "외야 테이블석",
      "외야 미니 테이블석",
    ],
  },

  {
    group: "내야석",
    seats: ["1루 내야 지정석", "3루 내야 지정석", "블루존", "1·3루 익사이팅석"],
  },

  {
    group: "SKY석",
    seats: [
      "SKY 블루존",
      "SKY 하단 지정석",
      "SKY 상단 지정석",
      "SKY 패밀리존",
      "SKY 요기보 패밀리존",
    ],
  },

  { group: "외야석", seats: ["외야 지정석", "외야 자유석", "외야 그린존"] },
] as const
