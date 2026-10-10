// 구단 소개 계열 화면(전체 메뉴) 더미 콘텐츠. 실제 서비스 전 구단 제공 문구로 교체합니다.

// ※ 인명·세부 수치 중 확인되지 않은 항목은 ○ 로 마스킹한 예시입니다.

// 058-SL-AL-02 구단 소개

export const ABOUT_FACTS = [
  { label: "창단", value: "1982 (KBO 원년)" },

  { label: "연고지", value: "대구·경북" },

  { label: "홈구장", value: "대구삼성라이온즈파크" },

  { label: "한국시리즈 우승", value: "8회" },
]

export const ABOUT_SECTIONS = [
  {
    title: "창단 배경",

    paragraphs: [
      "삼성라이온즈는 1982년 KBO 리그 출범과 함께 대구·경북 지역을 연고로 시작한 프로야구단입니다.",

      "지역 팬들의 뜨거운 응원과 함께 성장하며 한국 프로야구의 역사와 늘 같은 자리에서 걸어왔습니다.",
    ],
  },

  {
    title: "구단 가치",

    paragraphs: [
      "라이온즈는 팬과 함께하는 구단, 끊임없이 도전하는 구단, 지역과 상생하는 구단을 지향합니다.",
    ],

    chips: ["팬 우선", "도전", "상생", "신뢰"],
  },

  {
    title: "경영 철학",

    paragraphs: [
      "투명하고 책임 있는 경영으로 팬의 신뢰를 얻고, 선수단이 최고의 경기력을 발휘할 수 있는 환경을 만듭니다.",

      "경기장 안팎에서 팬이 즐거운 구단, 지역 사회에 기여하는 구단이 되겠습니다.",
    ],
  },
]

// 059-SL-AL-03 구단 앰블럼 (출처: 구단 홈페이지 엠블럼 캐릭터 > 엠블럼)

export const EMBLEM_INTRO = {
  title: "삼성 라이온즈 엠블럼",

  lead: "삼성 라이온즈를 상징하는 다양한 엠블럼을 소개합니다.",

  items: [
    {
      name: "워드마크",
      en: "WORD MARK",
      imageLabel: "워드마크 (SAMSUNG LIONS 기울임꼴 글자 로고)",
      desc: [
        "구단의 젊은 미래상과 명문 구단이 되겠다는 비전을 담은 글자형 로고입니다.",
        "구단의 블루는 삼성의 이미지 자산인 생동감 있는 라이트블루(Light Blue)로 적용했습니다.",
        "가독성을 위해 명료하고 날카로운 느낌으로 만들고, 전체를 기울임꼴로 표현해 역동성을 살렸습니다.",
      ],
    },

    {
      name: "엠블럼",
      en: "EMBLEM",
      imageLabel: "엠블럼 (사자 심볼)",
      desc: [
        "홍보매체, 판촉물 등 다양한 프로모션에 사용합니다.",
        "워드마크를 쓰기 어렵거나 구단 이미지를 돋보이게 하고 싶을 때 사용합니다.",
      ],
    },

    {
      name: "챔피언스 엠블럼",
      en: "CHAMPIONS EMBLEM",
      imageLabel: "챔피언스 엠블럼 (1985~2012)",
      desc: ["1985년부터 2012년까지 사용한 엠블럼입니다."],
    },

    {
      name: "프로모션 엠블럼",
      en: "MASCOT EMBLEM",
      imageLabel: "프로모션 엠블럼 (마스코트 엠블럼)",
      desc: [
        "다양한 프로모션 아이템에 적용하기 위해 개발한 엠블럼입니다.",
        "구단과 팬을 더 쉽고 친근하게 이어 주는 역할을 합니다.",
      ],
    },

    {
      name: "색상활용",
      en: "COLOR VARIATIONS",
      imageLabel: "바탕색별 색상 활용 예시",
      desc: [
        "바탕색과 배색에 상관없이 워드마크가 명확하게 보여야 합니다.",
        "활용 기준이 애매하면 VI관리 부서와 협의해 주세요.",
      ],
    },
  ],
}

// 060-SL-AL-04 구단 로고 (출처: 구단 홈페이지 엠블럼 캐릭터 > 로고)

export const LOGO_ITEMS = [
  {
    type: "로고타입 (LOGOTYPE)",
    imageLabel: "로고타입",
    desc: "구단의 공식 표시이며, 사용할 때 각별한 주의가 필요합니다.",
    note: "고유 디자인이므로 어떤 경우에도 변형하면 안 됩니다.",
  },

  {
    type: "이니셜 로고 (EMBLEM)",
    imageLabel: "이니셜 로고 (SL)",
    desc: "'SAMSUNG LIONS'의 약자를 조합한 로고입니다.",
    note: "빠르고 강한 야구를 뜻하며, 공격과 수비 모두 1위를 한다는 중의적 의미를 담고 있습니다.",
  },

  {
    type: "시그니처 (SIGNATURE)",
    imageLabel: "시그니처 (워드마크 + 엠블럼 + 로고타입)",
    desc: "워드마크, 엠블럼, 로고타입을 조합해 시각 이미지를 체계적으로 통합한 로고입니다. 글자꼴에 따라 비례를 조정했습니다.",
    note: "워드마크, 엠블럼, 글자꼴, 굵기, 비례, 자간 등을 임의로 바꾸면 안 됩니다.",
  },
]

// 061-SL-AL-05 구단 마스코트 (출처: 구단 홈페이지 엠블럼 캐릭터 > 캐릭터)

export const MASCOT_INTRO = {
  title: "블레오 패밀리 (BLEO FAMILY)",

  paragraphs: [
    "먼 우주의 블레오 행성에는 천재적인 레전드 타자 블레오가 있습니다.",

    "블레오 리그에서 이룰 것을 모두 이룬 블레오는 선수 생활의 마지막을 보낼 팀으로 삼성 라이온즈를 선택합니다. 삼성 라이온즈는 은하계에서도 명문팀으로 알려져 있고, 2016년 대구삼성라이온즈파크로 이전했습니다.",

    "블레오는 김한수 감독과 함께 대구에서 마지막 불꽃을 태우기 위해, 가족과 함께 지구 대구로 이주합니다.",
  ],

  emblemLabel: "블레오 패밀리 엠블럼 (BLEO FAMILY EMBLEM)",
}

// 062-SL-AL-06 캐치프레이즈

export const CATCHPHRASE = {
  season: "2026 SEASON",

  phrase: "WIN OR WOW",

  sub: "2023 — 2026",

  desc: [
    "경기를 이기거나(WIN), 팬들을 열광시키거나(WOW). 프로야구단으로서 승리도 중요하지만 한발 더 나아가 팬들에게 승리를 뛰어넘는 감동과 팬덤을 선물하겠다는 의미를 담고 있습니다.",

    "2023시즌에 처음 도입된 이후 팬들의 사랑을 받아 2026시즌까지 4시즌 연속 유지되고 있습니다.",
  ],

  team: {
    label: "선수단 슬로건",
    phrase: "혼연일체",
    sub: "One Team, One Body",
  },
}

export const CATCHPHRASE_HISTORY: {
  year: string
  phrase: string
  note?: string
}[] = [
  { year: "2026", phrase: "WIN OR WOW" },

  { year: "2025", phrase: "WIN OR WOW" },

  {
    year: "2024",
    phrase: "WIN OR WOW",
    note: "가을야구: NOW OR NEVER (지금이 아니면 안 된다)",
  },

  { year: "2023", phrase: "WIN OR WOW", note: "최초 도입" },
]

// 064-SL-AL-08 경산볼파크

export const GYEONGSAN_PARK = {
  title: "경산 삼성라이온즈 볼파크",

  desc: [
    "퓨처스(2군) 선수단이 훈련하고 경기를 치르는 라이온즈의 육성 거점입니다.",

    "유망주 육성과 재활 훈련을 위한 전용 시설을 갖추고 있습니다.",
  ],

  facilities: [
    "퓨처스 경기장",
    "실내 훈련장",
    "재활·트레이닝 센터",
    "선수단 숙소",
  ],

  info: [
    { label: "주소", value: "경상북도 경산시 일원 (상세 주소 입력)" },

    {
      label: "교통편",
      value: "대구 도심에서 차량 약 30분 (예시) · 대중교통 안내 입력",
    },

    {
      label: "관람 안내",
      value: "퓨처스 경기는 무료 관람이며, 일정은 경기 일정에서 확인합니다.",
    },
  ],
}

// 068-SL-AL-12 구단 연혁

export const HISTORY_TIMELINE = [
  {
    year: "2026",
    items: ["대구삼성라이온즈파크 개장 10주년", "공식 앱 서비스 오픈"],
  },

  {
    year: "2016",
    items: ["대구삼성라이온즈파크 개장", "새 홈구장 첫 시즌 시작"],
  },

  { year: "2011–2014", items: ["정규시즌·한국시리즈 통합우승 4연패"] },

  { year: "2005–2006", items: ["한국시리즈 2연패"] },

  { year: "2002", items: ["한국시리즈 우승"] },

  { year: "1985", items: ["전·후기 통합우승"] },

  { year: "1982", items: ["KBO 리그 출범 · 원년 멤버로 참가"] },
]

// 070-SL-AL-14 라이온즈 21

export const LIONS21_CHAPTERS = [
  {
    tab: "Chapter 1",

    sections: [
      {
        title: "시작, 푸른 사자의 탄생",
        body: "프로야구의 시작과 함께 라이온즈는 대구·경북 팬들의 자부심이 되었습니다. 첫 시즌의 설렘과 도전을 되돌아봅니다.",
        imageLabel: "창단 당시 사진",
      },

      {
        title: "원년 멤버들",
        body: "그라운드 위에서 구단의 첫 역사를 써 내려간 선수들과 이야기를 소개합니다.",
        imageLabel: "원년 멤버 단체 사진",
      },
    ],
  },

  {
    tab: "Chapter 2",

    sections: [
      {
        title: "도전의 시간",
        body: "정상에 오르기까지의 시행착오와 성장의 기록, 팬들과 함께 견딘 시간들을 담았습니다.",
        imageLabel: "경기 장면",
      },

      {
        title: "팬이 만든 응원 문화",
        body: "응원가와 함성, 대구 팬들만의 응원 문화가 어떻게 만들어졌는지 소개합니다.",
        imageLabel: "응원석 전경",
      },
    ],
  },

  {
    tab: "Chapter 3",

    sections: [
      {
        title: "정상의 순간",
        body: "우승의 순간과 그 뒤에서 땀 흘린 사람들의 이야기를 기록했습니다.",
        imageLabel: "우승 세리머니",
      },

      {
        title: "기록으로 보는 라이온즈",
        body: "구단이 쌓아 온 주요 기록과 명장면을 한눈에 정리합니다.",
        imageLabel: "기록 인포그래픽",
      },
    ],
  },

  {
    tab: "Chapter 4",

    sections: [
      {
        title: "다음 21년",
        body: "새로운 홈구장과 함께 팬과 더 가까워지는 라이온즈의 미래를 이야기합니다.",
        imageLabel: "미래 비전 이미지",
      },
    ],
  },
]

// 069-SL-AL-13 역대 감독 (마스킹 예시)

export const PAST_MANAGERS = [
  {
    order: 1,
    name: "○○○",
    term: "1982–1983",
    w: null as number | null,
    l: null as number | null,
    d: null as number | null,
    note: "",
  },

  {
    order: 2,
    name: "○○○",
    term: "1984–1986",
    w: null as number | null,
    l: null as number | null,
    d: null as number | null,
    note: "1985 전·후기 통합우승",
  },

  {
    order: 3,
    name: "○○○",
    term: "1987–1992",
    w: null as number | null,
    l: null as number | null,
    d: null as number | null,
    note: "",
  },

  {
    order: 4,
    name: "○○○",
    term: "1993–2000",
    w: null as number | null,
    l: null as number | null,
    d: null as number | null,
    note: "",
  },

  {
    order: 5,
    name: "○○○",
    term: "2001–2004",
    w: null as number | null,
    l: null as number | null,
    d: null as number | null,
    note: "2002 한국시리즈 우승",
  },

  {
    order: 6,
    name: "○○○",
    term: "2005–2010",
    w: null as number | null,
    l: null as number | null,
    d: null as number | null,
    note: "2005·2006 한국시리즈 우승",
  },

  {
    order: 7,
    name: "○○○",
    term: "2011–2015",
    w: null as number | null,
    l: null as number | null,
    d: null as number | null,
    note: "2011–2014 통합우승",
  },

  {
    order: 8,
    name: "○○○",
    term: "2016–현재",
    w: null as number | null,
    l: null as number | null,
    d: null as number | null,
    note: "",
  },
]

// 065-SL-AL-09 선수단 소개 — 감독/코치 탭 (마스킹 예시)

export interface StaffInfo {
  name: string
  role: string
  birth: string
  bodyInfo: string
  career: string
  joined: string
}

export const MANAGER: StaffInfo = {
  name: "박진만",
  role: "감독",
  birth: "1976-11-30",
  bodyInfo: "178cm / 82kg",
  career: "서화초-상인천중-인천고-경기대",
  joined: "2016년",
}

/** 선수단 소개 > 소개 탭: 감독·주장·대표 타자·대표 투수 (사진은 더미 영역) */

export const TEAM_INTRO = [
  {
    label: "MANAGER PARK JIN MAN",
    name: "박진만",
    role: "감독",
    message:
      "매 경기 굳건한 마음으로\n최선을 다하겠습니다.\n많은 성원과 격려 부탁드립니다.",
  },

  {
    label: "LIONS BEST CAPTAIN",
    name: "구자욱",
    role: "주장",
    message:
      "작년 한 해 많은 응원 감사합니다.\n올 시즌도 많은 응원 부탁드립니다.",
  },

  {
    label: "LIONS BEST BATTER",
    name: "강민호",
    role: "타자",
    message:
      "선수단이 하나로 뭉쳐\n최고의 성적을 낼 수 있도록\n앞장서겠습니다.",
  },

  {
    label: "LIONS BEST PITCHER",
    name: "원태인",
    role: "투수",
    message:
      "마운드에서 누구보다 강하게\n팀을 위해 묵묵히 던지는\n투수가 되겠습니다.",
  },
]

/** 코칭스텝 (마스킹 예시) — 감독은 MANAGER */

export const COACHING_STAFF: StaffInfo[] = [
  {
    name: "○○○",
    role: "수석코치",
    birth: "1978-03-12",
    bodyInfo: "181cm / 85kg",
    career: "○○초-○○중-○○고-○○대",
    joined: "2015년",
  },

  {
    name: "○○○",
    role: "투수코치",
    birth: "1980-07-25",
    bodyInfo: "183cm / 88kg",
    career: "○○초-○○중-○○고",
    joined: "2018년",
  },

  {
    name: "○○○",
    role: "타격코치",
    birth: "1981-05-09",
    bodyInfo: "180cm / 84kg",
    career: "○○초-○○중-○○고-○○대",
    joined: "2019년",
  },

  {
    name: "○○○",
    role: "수비코치",
    birth: "1983-12-01",
    bodyInfo: "179cm / 82kg",
    career: "서석초-진흥중-진흥고",
    joined: "2017년",
  },

  {
    name: "○○○",
    role: "배터리코치",
    birth: "1979-10-18",
    bodyInfo: "182cm / 90kg",
    career: "○○초-○○중-○○고-○○대",
    joined: "2020년",
  },
]
