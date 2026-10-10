// 013-SL-GM-08 라팍 정보 > 주차 (구단 제공 안내 기준)

export interface ParkingBlock {
  title?: string
  lines: string[]
}

export interface ParkingLot {
  id: "jeonseolro" | "dalgubeol" | "museum"
  name: string
  /** 한 줄 요약 (칩 아래) */
  summary: string
  /** 핵심 정보 (라벨/값) */
  facts: { label: string; value: string }[]
  blocks: ParkingBlock[]
  /** 하단 배너 (없으면 표시 안 함) */
  banner?: { title: string; desc: string; cta: string }
}

export const PARKING_LOTS: ParkingLot[] = [
  {
    id: "jeonseolro",
    name: "전설로 주차장",
    summary: "구장 내 주차장 · 사전예약제 운영",
    facts: [
      { label: "주차 규모", value: "1층 209대 / 2층 439대" },
      { label: "연결 게이트", value: "GATE 1" },
      { label: "주차요금", value: "2,000원" },
    ],
    blocks: [
      {
        title: "사전예약제 운영",
        lines: [
          "구장 내 전설로 주차장 (사전예약 차량 및 유료 출차, 미예약 차량 이용 불가)",
        ],
      },
      {
        title: "운영시간",
        lines: [
          "경기 시작 3시간 전 ~ 경기 종료 후 1시간",
          "주중(화~금): 15:30 ~ 경기 종료 후 1시간",
          "주말·공휴일: 14:00 ~ 경기 종료 후 1시간",
          "경기 일정 변경 시 변경된 경기시간 기준",
        ],
      },
      {
        title: "예약 · 결제",
        lines: [
          "예약: 경기일 기준 1주일 전 오전 11:00 오픈",
          "결제: 경기 당일 입차 시 무인정산기 결제 / 출차 시 무인정산기 결제 불가",
          "기타: 출차 지연 방지를 위해 사전정산 권장",
          "우천 취소: 자동 취소 처리되며, 정규 출차 시 주차요금 환불 불가",
        ],
      },
    ],
    banner: {
      title: "전설로 주차장 사전 예약",
      desc: "경기일 1주일 전 오전 11:00 오픈",
      cta: "사전 예약하기",
    },
  },
  {
    id: "dalgubeol",
    name: "달구벌 주차장",
    summary: "시즌권 회원 중 사전 차량 등록 완료 회원 전용",
    facts: [
      { label: "주차 규모", value: "164대" },
      { label: "연결 게이트", value: "GATE 2" },
    ],
    blocks: [
      {
        title: "이용 안내",
        lines: [
          "이용 대상: 삼성 라이온즈 시즌권(달구벌시즌권 등) 회원 중 사전 차량 등록 완료 회원",
          "이용 방식: 사전 등록 차량에 한해 이용 가능",
        ],
      },
    ],
    banner: {
      title: "시즌권 이용자 차량 등록",
      desc: "사전 등록한 차량만 이용할 수 있습니다",
      cta: "차량 등록하기",
    },
  },
  {
    id: "museum",
    name: "대구미술관 주차장",
    summary: "무료 · 셔틀버스로 구장까지 이동",
    facts: [
      { label: "운영일", value: "정규시즌 홈경기 전체" },
      { label: "주차요금", value: "무료" },
      { label: "승하차 지점", value: "대구미술관 버스정류장(미술관로)" },
    ],
    blocks: [
      {
        title: "셔틀버스 운행시간",
        lines: [
          "삼성라이온즈파크까지 셔틀버스 운행",
          "경기 전: 경기 시작 2시간 전 ~ 경기 시작 후 1시간",
          "경기 후: 경기 종료 후 1시간까지",
        ],
      },
    ],
  },
]
