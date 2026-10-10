// 구단 소개 계열 화면(전체 메뉴) 더미 콘텐츠. 실제 서비스 전 구단 제공 문구로 교체합니다.

// ※ 인명·세부 수치 중 확인되지 않은 항목은 ○ 로 마스킹한 예시입니다.

// 058-SL-AL-02 구단 소개

// 숫자로 보는 라이온즈 (수치는 구단 확인 필요)
export const ABOUT_FACTS = [
  { value: "1982", unit: "년", label: "창단 (KBO 원년)" },

  { value: "8", unit: "회", label: "한국시리즈 우승" },

  { value: "2016", unit: "년", label: "대구삼성라이온즈파크 개장" },

  { value: "24,000", unit: "명", label: "홈구장 수용인원" },
]

export const ABOUT_VISION = {
  phrase: "WIN OR WOW",

  desc: "승리를 넘어 팬에게 감동을 선물하는 구단",

  team: "혼연일체 · One Team, One Body",

  values: ["팬 우선", "도전", "상생", "신뢰"],
}

export const ABOUT_SECTIONS = [
  {
    title: "창단 배경",

    paragraphs: [
      "삼성라이온즈는 1982년 KBO 리그 출범과 함께 대구·경북 지역을 연고로 시작한 프로야구단입니다.",

      "지역 팬들의 뜨거운 응원과 함께 성장하며 한국 프로야구의 역사와 늘 같은 자리에서 걸어왔습니다.",
    ],
  },
]

export const ABOUT_SHORTCUTS = [
  { icon: "🦁", label: "구단 앰블럼", path: "/all/emblem" },

  { icon: "🔤", label: "구단 로고", path: "/all/logo" },

  { icon: "🐾", label: "구단 마스코트", path: "/all/mascot" },

  { icon: "📅", label: "구단 연혁", path: "/all/history" },

  { icon: "🧢", label: "역대 감독", path: "/all/past-managers" },

  { icon: "⚾", label: "선수단 소개", path: "/all/players" },

  { icon: "📣", label: "응원단 소개", path: "/all/cheer-squad" },

  { icon: "🏟", label: "경산볼파크", path: "/all/gyeongsan-park" },
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

// 064-SL-AL-08 경산볼파크 (출처: 구단 홈페이지 구단 > 경산볼파크)

export const GYEONGSAN_PARK = {
  title: "경산볼파크",

  desc: [
    "삼성 라이온즈 선수들을 위한 국내 최대 규모의 야구 종합훈련장입니다.",
  ],

  facilities: [
    {
      name: "필승관",
      desc: "선수단 합숙소와 외래객실 등이 있는 4층 규모의 문화시설",
    },

    {
      name: "체력단련장",
      desc: "지하 1층, 지상 4층, 약 712평 규모의 웨이트 시설",
    },

    {
      name: "실내연습장",
      desc: "약 913평, 3층 구조의 철근콘크리트 건물 (내부 인조잔디)",
    },

    {
      name: "주경기장",
      desc: "관람석 1,165석, 정식 경기가 가능한 전광판과 2층 본부석 보유",
    },

    { name: "보조경기장", desc: "약 800평 규모의 인조잔디 구장" },

    { name: "기타 편의시설", desc: "수영장, 물리치료실, 사우나" },
  ],

  spec: [
    { label: "규격", value: "좌우 98m, 중앙 125m" },

    { label: "관람석", value: "1,165석" },

    { label: "그라운드", value: "천연잔디 (펜스 고정식)" },

    { label: "전광판", value: "있음 (조명 없음, 백넷 있음)" },

    { label: "본부석", value: "기록실, 심판실, 방송실, 덕아웃" },

    { label: "건립", value: "1992년 (관리주체: 삼성 라이온즈)" },

    { label: "주차", value: "80대" },
  ],

  traffic: "대구 중심가에서 남동쪽으로 약 25km, 구단버스로 약 40분 소요",

  photos: [
    "경산볼파크 본관",
    "보조구장 우측 전경",
    "보조구장 정면",
    "보조구장",
    "주경기장 1",
    "주경기장 2",
    "실내연습장 1",
    "실내연습장 2",
  ],
}

// 068-SL-AL-12 구단 연혁 (출처: 구단 홈페이지 구단 > 연혁, 1992년 이후 주요 항목)

export const HISTORY_TIMELINE = [
  {
    year: "2026",
    items: [
      "3월 대체 외국인 투수 잭 오러클린 영입",
    ],
  },

  {
    year: "2025",
    items: [
      "9월 오승환 은퇴식",
      "11월 박병호·임창민 은퇴",
      "11월 박진만 감독 재계약",
      "12월 최형우 FA 영입",
    ],
  },

  {
    year: "2024",
    items: [
      "1월 오승환 FA 계약",
      "5월 오재일–박병호 트레이드",
      "8월 창단 첫 홈 관중 100만 돌파",
      "12월 최원태 FA 영입",
    ],
  },

  {
    year: "2023",
    items: [
      "1월 유정근 구단주 겸 대표이사 내정",
      "3월 \"Win or Wow\" 캐치프레이즈 발표",
      "10월 이종열 단장 선임",
    ],
  },

  {
    year: "2022",
    items: [
      "1월 혼연일체 엠블럼 유니폼 착용",
      "9월 이대호 은퇴 투어",
      "10월 박진만 감독 선임",
    ],
  },

  {
    year: "2021",
    items: [
      "4월 오승환 300세이브 기념 행사",
      "8월 이재현 1차 지명",
      "11월 박진만 퓨처스 감독 선임",
      "12월 강민호 FA 계약",
    ],
  },

  {
    year: "2020",
    items: [
      "3월 원기찬 구단주 겸 대표이사 선임",
      "10월 권오준 은퇴식",
      "12월 오재일·우규민·이원석 영입",
    ],
  },

  {
    year: "2019",
    items: [
      "1월 김상수 FA 계약",
      "8월 오승환 6년 만에 복귀",
    ],
  },

  {
    year: "2018",
    items: [
      "1월 임대기 구단주 취임",
      "2월 KBO 구단 최초 트랙맨 도입",
      "10월 원태인 계약",
    ],
  },

  {
    year: "2017",
    items: [
      "6월 구자욱데이 개최",
      "10월 이승엽 은퇴경기",
      "11월 강민호 FA 계약",
    ],
  },

  {
    year: "2016",
    items: [
      "3월 대구삼성라이온즈파크 개장식",
      "4월 개막식",
      "10월 김한수 감독 선임",
      "11월 이원석 FA 영입",
    ],
  },

  {
    year: "2015",
    items: [
      "5월 신축구장 '대구 삼성 라이온즈 파크' 결정",
      "11월 이승엽 FA 계약",
      "12월 김동환 대표이사 취임",
    ],
  },

  {
    year: "2014",
    items: [
      "3월 임창용 복귀",
      "8월 안현호 단장 선임",
      "11월 조동찬 FA 계약",
    ],
  },

  {
    year: "2013",
    items: [
      "11월 한국시리즈 우승 축하 팬 페스티벌",
      "11월 장원삼·박한이 FA 계약",
    ],
  },

  {
    year: "2012",
    items: [
      "12월 LG와 3대3 트레이드",
    ],
  },

  {
    year: "2011",
    items: [
      "1월 류중일 감독 취임",
    ],
  },

  {
    year: "2010",
    items: [
      "9월 양준혁 은퇴식 및 영구결번 선포",
      "10월 한국시리즈 준우승",
    ],
  },

  {
    year: "2009",
    items: [
      "9월 선동열 감독 재계약",
      "9월 정규시즌 5위",
    ],
  },

  {
    year: "2008",
    items: [
      "9월 12년 연속 포스트시즌 진출",
      "정규시즌 4위",
    ],
  },

  {
    year: "2007",
    items: [
      "6월 양준혁 통산 2,000안타 달성",
      "9월 오승환 최소경기 100세이브",
    ],
  },

  {
    year: "2006",
    items: [
      "10월 한국시리즈 우승",
      "10월 오승환 한 시즌 최다세이브 아시아 신기록",
    ],
  },

  {
    year: "2005",
    items: [
      "6월 양준혁 통산 최다안타 신기록",
      "10월 한국시리즈 우승",
    ],
  },

  {
    year: "2004",
    items: [
      "정규시즌 2위",
      "11~12월 김응용 사장 취임 및 선동열 감독 승격",
    ],
  },

  {
    year: "2003",
    items: [
      "3월 역사관 개관",
      "6월 이승엽 세계 최연소 300홈런 달성",
      "10월 아시아 홈런 신기록 56호",
    ],
  },

  {
    year: "2002",
    items: [
      "9월 김응용 감독 개인 통산 1,300승",
      "11월 한국시리즈 우승",
    ],
  },

  {
    year: "2001",
    items: [
      "정규시즌 1위",
      "12월 SK와 대형 트레이드 단행",
      "12월 양준혁 FA 영입",
    ],
  },

  {
    year: "2000",
    items: [
      "4월 프로 최초 팀 통산 2,000홈런 달성",
      "10월 김응용 감독 취임",
    ],
  },

  {
    year: "1999",
    items: [
      "11월 김용희 감독 취임",
      "매직리그 우승",
    ],
  },

  {
    year: "1998",
    items: [
      "4월 공식 홈페이지 오픈",
      "4월 팀 통산 100승 달성",
    ],
  },

  {
    year: "1997",
    items: [
      "4월 요미우리 자이언츠와 우호구단 협정 체결",
      "11월 서정환 감독 취임",
    ],
  },

  {
    year: "1996",
    items: [
      "7월 프로 최초 팀 통산 15,000안타 달성",
    ],
  },

  {
    year: "1995",
    items: [
      "대구구장 시설 현대화 준공(컬러전광판, 인조잔디)",
      "10월 백인천 감독 취임",
      "홈 구장 최다관중 623,970명",
    ],
  },

  {
    year: "1994",
    items: [
      "8월 팀 통산 800승 달성",
      "11월 구단 CI 및 유니폼 변경",
    ],
  },

  {
    year: "1993",
    items: [
      "9월 홈 구장 시즌 최다관중 539,102명 기록",
      "10월 한국시리즈 준우승",
    ],
  },

  {
    year: "1992",
    items: [
      "4월 팀 통산 1만 안타 달성",
      "9월 준플레이오프 진출",
      "10월 우용득 감독 취임",
    ],
  },

]

// 070-SL-AL-14 라이온즈 21 (출처: 구단 홈페이지 히스토리 > 삼성라이온즈21, 구성만 반영)

export interface Lions21Tab {
  tab: string
  /** 머리글: 사진 + 요약 */
  sections?: { title: string; sub: string; body: string; imageLabel: string }[]
  /** 장·편 목차: 번호/기간 + 제목 */
  items?: { no: string; title: string }[]
  note?: string
}

export const LIONS21_CHAPTERS: Lions21Tab[] = [
  {
    tab: "머리글",

    sections: [
      {
        title: "기념사 (삼성회장)",
        sub: "세계 수준의 명문구단으로 발돋움하기를...",
        body: "2002년 우승을 축하하고, 구단의 성장 과정을 평가하며 세계 수준의 명문구단이 되기를 당부합니다.",
        imageLabel: "삼성회장 사진·사인",
      },

      {
        title: "기념사 (구단주)",
        sub: "온 국민의 꿈과 희망으로 뿌리내리길",
        body: "야구를 경기 이상의 의미로 보고, 어린이에게는 꿈의 구장, 어른에게는 휴식처가 되겠다고 다짐합니다.",
        imageLabel: "구단주 사진·사인",
      },

      {
        title: "발간사 (대표이사)",
        sub: "不蜚不鳴 雄飛 삼성라이온즈",
        body: "21년 역사를 돌아보며 실패와 성취를 함께 기록하고, 이를 바탕으로 더 성숙한 구단이 되겠다는 의지를 밝힙니다.",
        imageLabel: "대표이사 사진·사인",
      },

      {
        title: "축사",
        sub: "한국 프로야구 발전에 선도적 역할을",
        body: "프로야구 성장에 대한 구단의 기여(시설 투자, 아마야구 지원, 기록 등)를 평가하고 지속적인 역할을 기원합니다.",
        imageLabel: "KBO 총재 사진·사인",
      },
    ],
  },

  {
    tab: "본문",

    items: [
      { no: "1장", title: "서설" },
      { no: "2장", title: "영욕의 21년" },
      { no: "3장", title: "21년의 스타들" },
      { no: "4장", title: "이승엽의 탄생" },
      { no: "5장", title: "신기록의 산실" },
      { no: "6장", title: "빅딜" },
      { no: "7장", title: "동양 최대의 볼파크" },
      { no: "8장", title: "야구의 국제 교류" },
      { no: "9장", title: "역사속의 사건사고" },
      { no: "10장", title: "사회봉사 활동" },
    ],

    note: "장별 상세 내용은 구단 제공 자료로 등록합니다.",
  },

  {
    tab: "연대별",

    items: [
      { no: "1982~1984", title: "삼성라이온즈 출범" },
      { no: "1985", title: "통합우승의 위업달성" },
      { no: "1986~1988", title: "신기록의 산실" },
      { no: "1989~1994", title: "제2창단의 다짐으로" },
      { no: "1995~2001", title: "승리를 위하여" },
      { no: "2002", title: "가을의 전설" },
    ],

    note: "연대별 상세 내용은 구단 제공 자료로 등록합니다.",
  },
]

// 069-SL-AL-13 역대 감독 (출처: 구단 홈페이지 구단 > 역대 감독)

export interface Manager {
  order: string
  name: string
  term: string
  current?: boolean
  games?: number
  w?: number
  l?: number
  d?: number
  rate?: string
}

export const PAST_MANAGERS: Manager[] = [
  { order: "16대", name: "박진만", term: "2022.08.01 ~ 현재", current: true },
  { order: "15대", name: "허삼영", term: "2019.09.30 ~ 2022.07", games: 382, w: 178, l: 188, d: 16, rate: ".486" },
  { order: "14대", name: "김한수", term: "2016.10.17 ~ 2019.09", games: 432, w: 183, l: 239, d: 10, rate: ".434" },
  { order: "13대", name: "류중일", term: "2011.01.05 ~ 2016.10", games: 810, w: 465, l: 333, d: 12, rate: ".574" },
  { order: "12대", name: "선동렬", term: "2004.11.09 ~ 2010.12", games: 847, w: 454, l: 380, d: 13, rate: ".536" },
  { order: "11대", name: "김응용", term: "2000.12.02 ~ 2004.11.08", games: 532, w: 312, l: 204, d: 16, rate: ".605" },
  { order: "10대", name: "김용희", term: "1999.11.11 ~ 2000.12.01", games: 133, w: 69, l: 59, d: 5, rate: ".539" },
  { order: "9대", name: "서정환", term: "1997.10.30 ~ 1999.11.10", games: 258, w: 139, l: 115, d: 4, rate: ".547" },
  { order: "감독대행", name: "조창수", term: "1997.06.24 ~ 07.31 / 09.04 ~ 10.29", games: 41, w: 22, l: 17, d: 2, rate: ".561" },
  { order: "8대", name: "백인천", term: "1995.09.29 ~ 1997.10.29", games: 211, w: 98, l: 103, d: 10, rate: ".488" },
  { order: "7대", name: "우용득", term: "1992.10.05 ~ 1995.09.28", games: 378, w: 193, l: 172, d: 13, rate: ".528" },
  { order: "6대", name: "김성근", term: "1990.11.02 ~ 1992.10.04", games: 252, w: 137, l: 112, d: 3, rate: ".550" },
  { order: "5대", name: "정동진", term: "1988.11.14 ~ 1990.11.01", games: 240, w: 123, l: 110, d: 7, rate: ".527" },
  { order: "4대", name: "박영길", term: "1986.11.24 ~ 1988.11.13", games: 216, w: 120, l: 94, d: 2, rate: ".560" },
  { order: "감독대행", name: "정동진", term: "1986.04.25 ~ 05.09", games: 10, w: 5, l: 5, d: 0, rate: ".500" },
  { order: "3대", name: "김영덕", term: "1983.11.01 ~ 1986.10.20", games: 308, w: 197, l: 109, d: 2, rate: ".644" },
  { order: "2대", name: "이충남", term: "1983.05.27 ~ 1983.10.31", games: 70, w: 31, l: 36, d: 3, rate: ".463" },
  { order: "1대", name: "서영무", term: "1982 (1년)", games: 110, w: 69, l: 40, d: 1, rate: ".633" },
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
