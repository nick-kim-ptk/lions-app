// 013-SL-GM-08 라팍 정보 > 편의시설 (구단 제공 목록 기준, 더미 위치)

export type FacilityFloor = 1 | 3

export const FACILITY_FLOORS: FacilityFloor[] = [1, 3]

export interface FacilitySection {
  title?: string
  lines: string[]
}

export interface Facility {
  id: string
  floor: FacilityFloor
  name: string
  icon: string
  sections: FacilitySection[]
  /** 층 평면도 위 핀 위치 (이미지 기준 %) */
  x: number
  y: number
}

export const FACILITIES: Facility[] = [
  {
    id: "C-01",
    floor: 1,
    name: "팀스토어",
    icon: "🛍️",
    sections: [
      {
        lines: [
          "외부 1층 위치",
          "어센틱샵, 레플리카샵 2곳 운영",
          "마킹샵은 어센틱 매장 옆 위치",
        ],
      },
    ],
    x: 18,
    y: 70,
  },
  {
    id: "C-02",
    floor: 1,
    name: "언더아머샵",
    icon: "👕",
    sections: [{ lines: ["외부 1층 위치", "언더아머 전문 매장"] }],
    x: 30,
    y: 78,
  },
  {
    id: "C-03",
    floor: 1,
    name: "물품보관함",
    icon: "🎒",
    sections: [
      {
        lines: ["중앙매표소 양옆 A·B, 전설로주차장 입구 C 위치"],
      },
      {
        title: "사용안내",
        lines: [
          "소형 2,000원 / 대형 3,000원 / 대형 5,000원 (4시간 기준)",
          "4시간 초과 시 시간당 1,000원 추가",
          "고객센터 1599-2740",
        ],
      },
    ],
    x: 50,
    y: 84,
  },
  {
    id: "C-04",
    floor: 1,
    name: "흡연구역",
    icon: "🚬",
    sections: [
      { lines: ["라팍 외부에 위치하며, 게이트 입장 후 전 구역 금연"] },
      {
        title: "흡연구역 위치",
        lines: [
          "외야 출입구 뒤 주차장 인근",
          "GATE 21 아래 매표소 뒤편",
          "팀스토어 맞은편",
          "전설로주차장 2F 옆",
        ],
      },
    ],
    x: 82,
    y: 28,
  },
  {
    id: "C-05",
    floor: 3,
    name: "블루포카",
    icon: "🃏",
    sections: [{ lines: ["중앙테이블석 근처", "포토카드 출력 기기"] }],
    x: 50,
    y: 76,
  },
  {
    id: "C-06",
    floor: 3,
    name: "포토카드",
    icon: "🖼️",
    sections: [{ lines: ["3루 내야지정석 11구역", "포토카드 출력 기기"] }],
    x: 78,
    y: 52,
  },
  {
    id: "C-07",
    floor: 3,
    name: "블루샷(인생네컷)",
    icon: "📸",
    sections: [{ lines: ["중앙테이블석 근처", "네컷사진 촬영 기기"] }],
    x: 56,
    y: 72,
  },
  {
    id: "C-08",
    floor: 3,
    name: "보조배터리",
    icon: "🔋",
    sections: [{ lines: ["3루 블루존 2구역", "보조배터리 대여 / 대여소"] }],
    x: 74,
    y: 36,
  },
  {
    id: "C-09",
    floor: 3,
    name: "수유실",
    icon: "🍼",
    sections: [{ lines: ["T3-1 구역 뒤, 스카이석 09 출입구 앞에 위치"] }],
    x: 40,
    y: 24,
  },
  {
    id: "C-10",
    floor: 3,
    name: "어린이 쉼터(놀이방)",
    icon: "🧸",
    sections: [
      {
        lines: [
          "TC-2, 3 구역 뒤에 위치",
          "4~7세 어린이 이용 가능",
          "음식물·귀중품 반입 금지, 보호자 동반 필수",
        ],
      },
    ],
    x: 24,
    y: 40,
  },
]
