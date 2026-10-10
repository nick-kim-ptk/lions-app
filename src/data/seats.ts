// 013-SL-GM-08 라팍 정보 > 좌석배치 (구단 좌석안내도·요금표 기준, 3단계 입장 요금제)

export type SeatTier = "gray" | "white" | "blue"

export const SEAT_TIERS: { id: SeatTier; name: string; days: string }[] = [
  { id: "gray", name: "그레이", days: "화·수·목 (일반 주중경기)" },
  { id: "white", name: "화이트", days: "금·일, 이벤트 주중경기" },
  { id: "blue", name: "블루", days: "토·공휴일, 이벤트 주말경기 등" },
]

export const TIER_INTRO =
  "팬들이 각자의 라이프스타일에 맞춰 가성비 있는 평일 직관이나 풍성한 주말 이벤트를 합리적으로 선택할 수 있도록, 직관의 문턱을 낮추고 선택권을 넓힌 상생 요금제입니다."

export type SeatGroup = "5층" | "4층" | "3층" | "외야"

export const SEAT_GROUPS: SeatGroup[] = ["5층", "4층", "3층", "외야"]

/** 요금 한 줄: 그레이·화이트·블루 순서 (원) */
export interface SeatPrice {
  /** 구분 (예: 일반, 어린이·청소년·경로·장애인 등, 4인) */
  label?: string
  price: [number, number, number]
}

export interface SeatZone {
  /** seatGeo.ts의 구역 id와 같음 */
  id: string
  name: string
  group: SeatGroup
  /** 좌석안내도 범례 색 */
  color: string
  /** null이면 요금표에 없는 구역(별도 안내) */
  prices: SeatPrice[] | null
  note?: string
}

const DISC = "어린이·청소년·경로·장애인 등"

export const SEAT_ZONES: SeatZone[] = [
  {
    id: "yogibo",
    name: "SKY 요기보 패밀리존",
    group: "5층",
    color: "#F28C1E",
    prices: [{ label: "4인", price: [140000, 180000, 200000] }],
  },
  {
    id: "sky-low",
    name: "SKY 하단 지정석",
    group: "5층",
    color: "#C41E57",
    prices: [
      { label: "일반", price: [10000, 11000, 13000] },
      { label: DISC, price: [7000, 8000, 10000] },
    ],
  },
  {
    id: "sky3-up",
    name: "3루 SKY 상단 지정석",
    group: "5층",
    color: "#4B2E9E",
    prices: [
      { label: "일반", price: [8000, 9000, 11000] },
      { label: DISC, price: [5000, 6000, 8000] },
    ],
  },
  {
    id: "sky-mid",
    name: "중앙 SKY 상단 지정석",
    group: "5층",
    color: "#5E5AA8",
    prices: [
      { label: "일반", price: [9000, 10000, 12000] },
      { label: DISC, price: [6000, 7000, 9000] },
    ],
  },
  {
    id: "sky1-up",
    name: "1루 SKY 상단 지정석",
    group: "5층",
    color: "#9A8FC9",
    prices: [
      { label: "일반", price: [8000, 9000, 11000] },
      { label: DISC, price: [5000, 6000, 8000] },
    ],
  },
  {
    id: "sky-blue",
    name: "SKY 블루존",
    group: "5층",
    color: "#00A5E8",
    prices: [
      { label: "일반", price: [10000, 12000, 15000] },
      { label: DISC, price: [7000, 9000, 12000] },
    ],
  },
  {
    id: "sweet",
    name: "스윗박스",
    group: "4층",
    color: "#A8267D",
    prices: null,
    note: "요금표에 없는 구역입니다. 요금은 별도 안내합니다(구단 확인 필요).",
  },
  {
    id: "party",
    name: "파티플로어 라이브석",
    group: "4층",
    color: "#8B5A2B",
    prices: [{ price: [65000, 70000, 75000] }],
  },
  {
    id: "vip",
    name: "VIP석",
    group: "3층",
    color: "#C4C530",
    prices: [{ price: [50000, 60000, 65000] }],
  },
  {
    id: "center-table",
    name: "으뜸병원 중앙 테이블석",
    group: "3층",
    color: "#F0B323",
    prices: [{ price: [45000, 55000, 60000] }],
  },
  {
    id: "3f-table",
    name: "이수그룹 3루 테이블석",
    group: "3층",
    color: "#5C1111",
    prices: [{ label: "1·3루 테이블석", price: [40000, 50000, 55000] }],
  },
  {
    id: "1f-table",
    name: "이수페타시스 1루 테이블석",
    group: "3층",
    color: "#4BA6B0",
    prices: [{ label: "1·3루 테이블석", price: [40000, 50000, 55000] }],
  },
  {
    id: "3e",
    name: "3루 익사이팅석",
    group: "3층",
    color: "#0B6E6E",
    prices: [{ label: "1·3루 익사이팅", price: [22000, 27000, 30000] }],
  },
  {
    id: "1f-exc",
    name: "1루 익사이팅석",
    group: "3층",
    color: "#D984A8",
    prices: [{ label: "1·3루 익사이팅", price: [22000, 27000, 30000] }],
  },
  {
    id: "bluezone",
    name: "블루존",
    group: "3층",
    color: "#2878BE",
    prices: [{ price: [19000, 22000, 25000] }],
  },
  {
    id: "away",
    name: "원정 응원석",
    group: "3층",
    color: "#D6007F",
    prices: [{ price: [19000, 22000, 25000] }],
  },
  {
    id: "1f-in",
    name: "1루 내야지정석",
    group: "3층",
    color: "#5B1F82",
    prices: [{ price: [10000, 13000, 14000] }],
  },
  {
    id: "3f-in",
    name: "3루 내야지정석",
    group: "3층",
    color: "#1B2475",
    prices: [{ price: [15000, 17000, 19000] }],
  },
  {
    id: "green",
    name: "잔디 그린존",
    group: "3층",
    color: "#B5CF6B",
    prices: [{ price: [10000, 11000, 13000] }],
  },
  {
    id: "camp",
    name: "iM뱅크 캠핑존",
    group: "3층",
    color: "#9CA3AF",
    prices: [{ label: "6인", price: [180000, 240000, 270000] }],
  },
  {
    id: "wheel",
    name: "휠체어 장애인석",
    group: "3층",
    color: "#B3A5D6",
    prices: [{ price: [5000, 5000, 5000] }],
  },
  {
    id: "habitat",
    name: "한국해비타트 외야 패밀리석",
    group: "외야",
    color: "#E5D000",
    prices: [{ price: [18000, 20000, 23000] }],
  },
  {
    id: "of-table",
    name: "외야 테이블석",
    group: "외야",
    color: "#D32020",
    prices: [
      { label: "4인", price: [72000, 80000, 92000] },
      { label: "8인", price: [144000, 160000, 184000] },
    ],
  },
  {
    id: "of-seat",
    name: "외야 지정석",
    group: "외야",
    color: "#E8601C",
    prices: [
      { label: "일반", price: [9000, 10000, 11000] },
      { label: DISC, price: [6000, 7000, 8000] },
    ],
  },
  {
    id: "of-couple",
    name: "외야 커플 테이블석",
    group: "외야",
    color: "#8CC63F",
    prices: [{ label: "2인", price: [30000, 36000, 40000] }],
  },
  {
    id: "rooftop",
    name: "루프탑 테이블석",
    group: "외야",
    color: "#C4B35A",
    prices: [{ price: [20000, 23000, 25000] }],
  },
]

export const seatLowest = (z: SeatZone): number | null =>
  z.prices ? Math.min(...z.prices.map((p) => p.price[0])) : null
