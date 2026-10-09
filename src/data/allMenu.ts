// 전체 메뉴 구조 — 모바일 전체 메뉴(/all-menu)와 PC 상단 메뉴(GNB 메가 패널)가 같은 데이터를 씁니다.

export interface MenuLink {
  label: string
  path: string
  external?: boolean
  badge?: string
}

export interface MenuItemData extends MenuLink {
  sub?: { label: string; path: string; external?: boolean }[]
}

export interface MenuGroup {
  title: string
  items: MenuLink[]
}

export interface MenuSection {
  title: string
  items: MenuItemData[]
  groups?: MenuGroup[]
}

export const ALL_MENU_SECTIONS: MenuSection[] = [
  {
    title: "게임",

    items: [],

    groups: [
      {
        title: "경기",

        items: [
          { label: "경기 일정", path: "/game/schedule" },

          { label: "경기/선수 기록", path: "/game/stats" },

          { label: "프리뷰", path: "/all/preview-list" },
        ],
      },

      {
        title: "구장",

        items: [
          { label: "라팍 정보", path: "/game/stadium" },

          { label: "라이온즈 VR", path: "/game/vr" },

          { label: "라이온즈 원정대", path: "/game/away" },
        ],
      },

      {
        title: "콘텐츠",

        items: [
          { label: "라이온즈 뉴스", path: "/game/news" },

          { label: "라이온즈 매거진", path: "/game/magazine" },
        ],
      },
    ],
  },

  {
    title: "티켓+",

    items: [
      { label: "티켓 예매", path: "/ticket" },

      { label: "예매 내역", path: "/my/booking-history" },

      { label: "이용 안내", path: "/my/booking-guide" },

      { label: "티켓 선물하기", path: "/my/ticket-gift" },
    ],
  },

  {
    title: "라운지",

    items: [],

    groups: [
      {
        title: "응원",

        items: [
          { label: "독점 콘텐츠", path: "/lounge/exclusive" },

          { label: "디지털 굿즈", path: "/lounge/digital-goods" },

          { label: "나의 승리 운세", path: "/lounge/fortune" },

          { label: "블루메이트 1기", path: "/lounge/sns" },
        ],
      },

      {
        title: "참여",

        items: [
          { label: "오늘의 미션", path: "/lounge#mission" },

          { label: "엘도라도 ZONE", path: "/lounge/eldorado" },

          { label: "디지털 피켓", path: "/lounge/cheer-board" },

          { label: "블루 시그널", path: "/lounge/blue-signal" },
        ],
      },
    ],
  },

  {
    title: "라이온즈",

    items: [],

    groups: [
      {
        title: "팀",

        items: [
          { label: "구단 소개", path: "/all/about" },

          { label: "선수단 소개", path: "/all/players" },

          { label: "응원단 소개", path: "/all/cheer-squad" },
        ],
      },

      {
        title: "구단 BI",

        items: [
          { label: "구단 앰블럼", path: "/all/emblem" },

          { label: "구단 로고", path: "/all/logo" },

          { label: "구단 마스코트", path: "/all/mascot" },

          { label: "캐치프레이즈", path: "/all/catchphrase" },
        ],
      },

      {
        title: "구장 소개",

        items: [
          { label: "대구삼성라이온즈파크", path: "/game/stadium" },

          { label: "경산볼파크", path: "/all/gyeongsan-park" },
        ],
      },

      {
        title: "역사관",

        items: [
          { label: "구단 연혁", path: "/all/history" },

          { label: "역대 감독", path: "/all/past-managers" },

          { label: "라이온즈 21", path: "/all/lions-21" },

          { label: "히스토리", path: "/all/history-moments" },
        ],
      },

      {
        title: "파트너",

        items: [{ label: "라이온즈 파트너", path: "/all/partners" }],
      },
    ],
  },

  {
    title: "소식/안내",

    items: [],

    groups: [
      {
        title: "소식",

        items: [
          { label: "라이온즈 소식", path: "/all/notice-list" },

          { label: "이벤트", path: "/all/event-list" },

          {
            label: "PRESS 센터",
            path: "/all/media-press-center",
            badge: "언론사 전용",
          },

          {
            label: "이슈와 팩트",
            path: "/all/press-center",
            badge: "언론사 전용",
          },
        ],
      },

      {
        title: "구단",

        items: [
          { label: "구단 소식", path: "/all/club-news" },

          { label: "외부감사 보고서", path: "/all/audit-report" },

          {
            label: "언론 사진 자료실",
            path: "/all/news-list",
            external: true,
          },
        ],
      },

      {
        title: "안내",

        items: [{ label: "FAQ", path: "/all/faq" }],
      },
    ],
  },
]
