// 013-SL-GM-08 라팍 정보 > 교통 (구단 제공 대중교통 안내표 기준)
// 모든 경로의 도착지는 수성알파시티역(5번출구)입니다.

export const TRANSIT_DEST = "수성알파시티역(5번출구)"

export const PARK_PLACE = {
  name: "대구삼성라이온즈파크",
  address: "대구광역시 수성구 야구전설로 1",
}

export const PARK_POS = { lat: 35.8412, lng: 128.6816 }

/** 지도 앱 연계: 출발지 → 라팍 대중교통 길찾기 (좌표는 근사값, 구단 확인 후 보정) */
export function mapLinks(o: { name: string; lat: number; lng: number }) {
  const pn = PARK_PLACE.name
  return [
    {
      id: "naver",
      name: "네이버 지도",
      color: "#03C75A",
      url: `https://map.naver.com/p/directions/${o.lng},${o.lat},${encodeURIComponent(o.name)}/${PARK_POS.lng},${PARK_POS.lat},${encodeURIComponent(pn)}/-/transit`,
    },
    {
      id: "kakao",
      name: "카카오맵",
      color: "#FEE500",
      url: `https://map.kakao.com/link/by/publictransit/${encodeURIComponent(o.name)},${o.lat},${o.lng}/${encodeURIComponent(pn)},${PARK_POS.lat},${PARK_POS.lng}`,
    },
  ]
}

export interface BusRoute {
  /** 탑승 정류장 */
  stop: string
  /** 간선 버스 번호 */
  buses: string[]
}

export interface SubwayRoute {
  time: string
  /** 소요시간 외 추가 안내 (예: 도보 14분 추가) */
  extra?: string
  from: string
  /** 이용 노선 (환승 순서) */
  lines: string[]
  path: string
  /** 막차 */
  last: string[]
}

export interface TransitOrigin {
  id: string
  lat: number
  lng: number
  name: string
  sub?: string
  busTime: string
  bus: BusRoute[]
  subway: SubwayRoute
}

export const TRANSIT_ORIGINS: TransitOrigin[] = [
  {
    id: "dongdaegu",
    lat: 35.8798,
    lng: 128.6283,
    name: "동대구역",
    sub: "고속철도·터미널",
    busTime: "약 40분",
    bus: [
      { stop: "동대구역복합환승센터건너", buses: ["399"] },
      { stop: "동대구역건너", buses: ["937"] },
    ],
    subway: {
      time: "약 40분",
      from: "동대구역",
      lines: ["1호선", "2호선"],
      path: "1호선 동대구역 → 반월당역 → 2호선 환승 → 수성알파시티역",
      last: ["동대구역 방면 23:42 (반월당역)", "반월당 방면 23:30 (수성알파시티역)"],
    },
  },
  {
    id: "daegu",
    lat: 35.8758,
    lng: 128.5961,
    name: "대구역",
    sub: "경부선",
    busTime: "약 55분",
    bus: [{ stop: "2.28기념중앙공원앞", buses: ["309", "724"] }],
    subway: {
      time: "약 30분",
      from: "대구역",
      lines: ["1호선", "2호선"],
      path: "1호선 대구역 → 반월당역 → 2호선 환승 → 수성알파시티역",
      last: ["대구역 방면 23:42 (반월당역)", "반월당 방면 23:30 (수성알파시티역)"],
    },
  },
  {
    id: "seodaegu",
    lat: 35.8799,
    lng: 128.5569,
    name: "서대구역",
    sub: "고속철도",
    busTime: "약 70분",
    bus: [{ stop: "서대구역(남측)1", buses: ["309"] }],
    subway: {
      time: "약 45분",
      from: "서대구역",
      lines: ["대경선", "1호선", "2호선"],
      path: "대경선 서대구역 → 대구역 → 1호선 환승 → 반월당역 → 2호선 환승 → 수성알파시티역",
      last: ["대구역 방면 23:42 (반월당역)", "반월당 방면 23:30 (수성알파시티역)"],
    },
  },
  {
    id: "seodaegu-bus",
    lat: 35.8664,
    lng: 128.5516,
    name: "서대구고속버스터미널",
    busTime: "약 70분",
    bus: [
      { stop: "만평네거리", buses: ["309"] },
      { stop: "만평역(서대구고속버스터미널)2", buses: ["724"] },
    ],
    subway: {
      time: "약 40분",
      from: "만평역",
      lines: ["3호선", "2호선"],
      path: "3호선 만평역 → 청라언덕역 → 2호선 환승 → 수성알파시티역",
      last: ["만평 방면 23:37 (청라언덕역)", "청라언덕 방면 23:30 (수성알파시티역)"],
    },
  },
  {
    id: "bukbu",
    lat: 35.8905,
    lng: 128.5933,
    name: "대구북부시외버스터미널",
    busTime: "약 70분",
    bus: [
      { stop: "북부정류장", buses: ["724"] },
      { stop: "북부정류장건너", buses: ["309"] },
    ],
    subway: {
      time: "약 55분",
      extra: "도보 14분 추가",
      from: "만평역",
      lines: ["3호선", "2호선"],
      path: "3호선 만평역 → 청라언덕역 → 2호선 환승 → 수성알파시티역",
      last: ["연호 방면 23:30 (종점: 아양)", "고산 방면 23:48 (종점: 영남대)"],
    },
  },
  {
    id: "seobu",
    lat: 35.8523,
    lng: 128.5368,
    name: "대구서부정류장",
    busTime: "약 60분",
    bus: [
      { stop: "서부정류장(관문시장앞)", buses: ["609"] },
      { stop: "대구공공시설관리공단건너", buses: ["649"] },
    ],
    subway: {
      time: "약 40분",
      from: "서부정류장",
      lines: ["1호선", "2호선"],
      path: "1호선 서부정류장 → 반월당역 → 2호선 환승 → 수성알파시티역",
      last: ["서부정류장 방면 23:38 (반월당역)", "반월당 방면 23:30 (수성알파시티역)"],
    },
  },
]
