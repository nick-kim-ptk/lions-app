// 구단 소개 계열 화면(전체 메뉴) 더미 콘텐츠. 실제 서비스 전 구단 제공 문구로 교체합니다.
// ※ 인명·세부 수치 중 확인되지 않은 항목은 ○ 로 마스킹한 예시입니다.

// 058-SL-AL-02 구단 소개
export const ABOUT_FACTS = [
  { label: '창단', value: '1982 (KBO 원년)' },
  { label: '연고지', value: '대구·경북' },
  { label: '홈구장', value: '대구삼성라이온즈파크' },
  { label: '한국시리즈 우승', value: '8회' },
]

export const ABOUT_SECTIONS = [
  {
    title: '창단 배경',
    paragraphs: [
      '삼성라이온즈는 1982년 KBO 리그 출범과 함께 대구·경북 지역을 연고로 시작한 프로야구단입니다.',
      '지역 팬들의 뜨거운 응원과 함께 성장하며 한국 프로야구의 역사와 늘 같은 자리에서 걸어왔습니다.',
    ],
  },
  {
    title: '구단 가치',
    paragraphs: [
      '라이온즈는 팬과 함께하는 구단, 끊임없이 도전하는 구단, 지역과 상생하는 구단을 지향합니다.',
    ],
    chips: ['팬 우선', '도전', '상생', '신뢰'],
  },
  {
    title: '경영 철학',
    paragraphs: [
      '투명하고 책임 있는 경영으로 팬의 신뢰를 얻고, 선수단이 최고의 경기력을 발휘할 수 있는 환경을 만듭니다.',
      '경기장 안팎에서 팬이 즐거운 구단, 지역 사회에 기여하는 구단이 되겠습니다.',
    ],
  },
]

// 059-SL-AL-03 구단 앰블럼
export const EMBLEM_INTRO = {
  title: '푸른 사자, 라이온즈의 얼굴',
  lead: '사자의 위엄과 삼성 블루의 정체성을 하나의 형상에 담은 구단 공식 심볼입니다.',
  points: [
    { title: '사자', desc: '정상을 향해 달려가는 용맹과 도전 정신을 상징합니다.' },
    { title: '블루', desc: '신뢰와 열정, 그리고 팬과 함께하는 푸른 하늘을 의미합니다.' },
    { title: '원형 구도', desc: '선수단과 팬이 하나가 되는 라이온즈 패밀리를 표현합니다.' },
  ],
  note: '앰블럼은 구단의 공식 자산이며, 사용 시 구단의 사전 승인이 필요합니다.',
}

// 060-SL-AL-04 구단 로고
export const LOGO_ITEMS = [
  { type: '워드마크', imageLabel: 'SAMSUNG LIONS 워드마크 (가로형)', desc: '구단 이름을 문자로 표현한 기본 로고입니다.', note: '가로형·세로형 두 가지 조합을 제공합니다.' },
  { type: 'CI / VI', imageLabel: '앰블럼 + 워드마크 조합 CI', desc: '앰블럼과 워드마크를 결합한 구단 대표 아이덴티티입니다.', note: '기본 컬러는 라이온즈 블루, 보조 컬러는 화이트·네이비입니다.' },
  { type: '서브 로고', imageLabel: '약칭 SL 심볼 / 이니셜 로고', desc: '작은 크기나 SNS 프로필 등 제한된 공간에서 사용하는 로고입니다.', note: '최소 크기 이하로 줄여 사용하지 않습니다.' },
]

export const LOGO_GUIDES = ['로고 주변에 최소 여백을 확보합니다.', '지정된 컬러 외의 색상으로 변경하지 않습니다.', '비율을 임의로 늘이거나 왜곡하지 않습니다.', '복잡한 배경 위에서는 흰색 버전을 사용합니다.']

// 061-SL-AL-05 구단 마스코트
export const MASCOT_INTRO = {
  title: '블레오 (BLEO)',
  paragraphs: [
    '블레오는 삼성라이온즈를 대표하는 공식 마스코트로, 경기장 안팎에서 팬들과 가장 가까이 소통하는 캐릭터입니다.',
    '용맹하지만 장난기 많은 사자의 모습으로, 홈경기마다 응원석과 이벤트 현장에 등장합니다.',
  ],
}
export const MASCOT_FAMILY = [
  { name: '블레오', role: '대표 마스코트' },
  { name: '블레리', role: '블레오의 단짝' },
  { name: '블레미', role: '응원 담당' },
  { name: '블레디', role: '먹거리 담당' },
  { name: '블레니', role: '막내' },
]

// 062-SL-AL-06 캐치프레이즈
export const CATCHPHRASE = {
  season: '2026 SEASON',
  phrase: '다시, 푸른 함성',
  sub: 'ONE MORE ROAR',
  desc: [
    '올 시즌 라이온즈는 팬 여러분의 함성과 함께 다시 정상을 향해 달립니다.',
    '경기장에서, 그리고 앱에서 함께 만드는 푸른 함성이 선수단의 가장 큰 힘입니다.',
  ],
}
export const CATCHPHRASE_HISTORY = [
  { year: '2025', phrase: '새로운 도약' },
  { year: '2024', phrase: '푸른 사자의 질주' },
  { year: '2023', phrase: 'Blue Roar' },
  { year: '2022', phrase: '다시 뛰는 심장' },
]

// 064-SL-AL-08 경산볼파크
export const GYEONGSAN_PARK = {
  title: '경산 삼성라이온즈 볼파크',
  desc: [
    '퓨처스(2군) 선수단이 훈련하고 경기를 치르는 라이온즈의 육성 거점입니다.',
    '유망주 육성과 재활 훈련을 위한 전용 시설을 갖추고 있습니다.',
  ],
  facilities: ['퓨처스 경기장', '실내 훈련장', '재활·트레이닝 센터', '선수단 숙소'],
  info: [
    { label: '주소', value: '경상북도 경산시 일원 (상세 주소 입력)' },
    { label: '교통편', value: '대구 도심에서 차량 약 30분 (예시) · 대중교통 안내 입력' },
    { label: '관람 안내', value: '퓨처스 경기는 무료 관람이며, 일정은 경기 일정에서 확인합니다.' },
  ],
}

// 068-SL-AL-12 구단 연혁
export const HISTORY_TIMELINE = [
  { year: '2026', items: ['대구삼성라이온즈파크 개장 10주년', '공식 앱 서비스 오픈'] },
  { year: '2016', items: ['대구삼성라이온즈파크 개장', '새 홈구장 첫 시즌 시작'] },
  { year: '2011–2014', items: ['정규시즌·한국시리즈 통합우승 4연패'] },
  { year: '2005–2006', items: ['한국시리즈 2연패'] },
  { year: '2002', items: ['한국시리즈 우승'] },
  { year: '1985', items: ['전·후기 통합우승'] },
  { year: '1982', items: ['KBO 리그 출범 · 원년 멤버로 참가'] },
]

// 070-SL-AL-14 라이온즈 21
export const LIONS21_CHAPTERS = [
  {
    tab: 'Chapter 1',
    sections: [
      { title: '시작, 푸른 사자의 탄생', body: '프로야구의 시작과 함께 라이온즈는 대구·경북 팬들의 자부심이 되었습니다. 첫 시즌의 설렘과 도전을 되돌아봅니다.', imageLabel: '창단 당시 사진' },
      { title: '원년 멤버들', body: '그라운드 위에서 구단의 첫 역사를 써 내려간 선수들과 이야기를 소개합니다.', imageLabel: '원년 멤버 단체 사진' },
    ],
  },
  {
    tab: 'Chapter 2',
    sections: [
      { title: '도전의 시간', body: '정상에 오르기까지의 시행착오와 성장의 기록, 팬들과 함께 견딘 시간들을 담았습니다.', imageLabel: '경기 장면' },
      { title: '팬이 만든 응원 문화', body: '응원가와 함성, 대구 팬들만의 응원 문화가 어떻게 만들어졌는지 소개합니다.', imageLabel: '응원석 전경' },
    ],
  },
  {
    tab: 'Chapter 3',
    sections: [
      { title: '정상의 순간', body: '우승의 순간과 그 뒤에서 땀 흘린 사람들의 이야기를 기록했습니다.', imageLabel: '우승 세리머니' },
      { title: '기록으로 보는 라이온즈', body: '구단이 쌓아 온 주요 기록과 명장면을 한눈에 정리합니다.', imageLabel: '기록 인포그래픽' },
    ],
  },
  {
    tab: 'Chapter 4',
    sections: [
      { title: '다음 21년', body: '새로운 홈구장과 함께 팬과 더 가까워지는 라이온즈의 미래를 이야기합니다.', imageLabel: '미래 비전 이미지' },
    ],
  },
]

// 069-SL-AL-13 역대 감독 (마스킹 예시)
export const PAST_MANAGERS = [
  { order: 1, name: '○○○', term: '1982–1983', w: null as number | null, l: null as number | null, d: null as number | null, note: '' },
  { order: 2, name: '○○○', term: '1984–1986', w: null as number | null, l: null as number | null, d: null as number | null, note: '1985 전·후기 통합우승' },
  { order: 3, name: '○○○', term: '1987–1992', w: null as number | null, l: null as number | null, d: null as number | null, note: '' },
  { order: 4, name: '○○○', term: '1993–2000', w: null as number | null, l: null as number | null, d: null as number | null, note: '' },
  { order: 5, name: '○○○', term: '2001–2004', w: null as number | null, l: null as number | null, d: null as number | null, note: '2002 한국시리즈 우승' },
  { order: 6, name: '○○○', term: '2005–2010', w: null as number | null, l: null as number | null, d: null as number | null, note: '2005·2006 한국시리즈 우승' },
  { order: 7, name: '○○○', term: '2011–2015', w: null as number | null, l: null as number | null, d: null as number | null, note: '2011–2014 통합우승' },
  { order: 8, name: '○○○', term: '2016–현재', w: null as number | null, l: null as number | null, d: null as number | null, note: '' },
]

// 065-SL-AL-09 선수단 소개 — 감독/코치 탭 (마스킹 예시)
export const COACHING_STAFF = [
  { name: '○○○', role: '감독' },
  { name: '○○○', role: '수석코치' },
  { name: '○○○', role: '투수코치' },
  { name: '○○○', role: '타격코치' },
  { name: '○○○', role: '수비코치' },
  { name: '○○○', role: '배터리코치' },
]
