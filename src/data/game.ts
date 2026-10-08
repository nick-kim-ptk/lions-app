// 013-SL-GM-08 라팍 정보
export const STADIUM_TABS = ['식음매장', '교통/주차', '편의시설', '좌석 배치', '이용 안내', '라팍 소개']

export const AWAY_STADIUMS = [
  { name: '잠실야구장',            team: 'LG · 두산', city: '서울',  emoji: '🏟', color: '#C8102E' },
  { name: '고척스카이돔',          team: '키움',       city: '서울',  emoji: '🏟', color: '#6B21A8' },
  { name: '인천 SSG 랜더스 필드', team: 'SSG',        city: '인천',  emoji: '🏟', color: '#C8102E' },
  { name: '수원 KT 위즈파크',     team: 'KT',         city: '수원',  emoji: '🏟', color: '#1B1B1B' },
  { name: '대전 한화생명 볼파크', team: '한화',        city: '대전',  emoji: '🏟', color: '#F97316' },
  { name: '광주-기아 챔피언스 필드', team: 'KIA',     city: '광주',  emoji: '🏟', color: '#C8102E' },
  { name: '사직야구장',            team: '롯데',       city: '부산',  emoji: '🏟', color: '#1B5BF0' },
  { name: '창원NC파크',            team: 'NC',         city: '창원',  emoji: '🏟', color: '#1B3A6B' },
]

export const AWAY_TABS = ['구장 소개', '교통', '주차', '편의시설', '주변 맛집']

// 011-SL-GM-06 선수 기록 > 팀 기록 (구단 대기록)
export const TEAM_RECORDS = [
  {
    year: '2024',
    date: '2024.09.01',
    record: 'KBO 리그 최초 통산 3,000승 돌파',
    desc: '삼성 라이온즈가 KBO 리그 출범 이후 최초로 통산 3,000승을 달성했습니다.',
    badge: '역사적 기록',
  },
  {
    year: '2023',
    date: '2023.07.22',
    record: 'KBO 역대 최초 팀 통산 50,000안타 달성',
    desc: '구단 창단 이래 누적 안타 수 50,000개를 KBO 최초로 돌파했습니다.',
    badge: '최초 기록',
  },
  {
    year: '1986',
    date: '1986시즌 종료',
    record: '단일 시즌 역대 최고 승률 (0.706)',
    desc: '1986년 시즌 최종 승률 0.706을 기록, KBO 역대 단일 시즌 최고 승률로 남아 있습니다.',
    badge: '최고 기록',
  },
  {
    year: '2023',
    date: '2023.10 기준',
    record: '프로야구 역사상 최다 포스트시즌 진출 (31회)',
    desc: '창단 이래 31회의 포스트시즌 진출로 KBO 역사상 가장 많은 가을야구 무대를 경험한 구단입니다.',
    badge: '최다 기록',
  },
]

// 012-SL-GM-07 유튜브 콘텐츠 (공식 채널 최근 영상 더미)
export const YOUTUBE_FEATURED = { title: '[하이라이트] 9월 14일 vs 두산 — 짜릿한 역전승 풀 하이라이트', duration: '07:42', channel: '삼성라이온즈 공식', views: '12만회', date: '5일 전' }
export const YOUTUBE_VIDEOS = [
  { title: '[비하인드] 경기 전 불펜 훈련 현장 — 선발 투수의 하루', duration: '05:18', views: '4.1만회', date: '6일 전' },
  { title: '[LIVE 다시보기] 9월 13일 응원 영상 모음', duration: '12:30', views: '2.8만회', date: '6일 전' },
  { title: '[인터뷰] 승리 투수 인터뷰 "팬들의 함성이 힘이 됐다"', duration: '03:46', views: '3.5만회', date: '1주 전' },
  { title: '[라팍 24시] 홈경기 날, 구장은 어떻게 준비될까', duration: '08:05', views: '5.9만회', date: '1주 전' },
  { title: '[하이라이트] 9월 9일 vs 한화 — 홈런 3방 폭발', duration: '06:12', views: '9.7만회', date: '10일 전' },
  { title: '[챌린지] 삼성 선수들의 응원가 따라 부르기', duration: '04:27', views: '6.3만회', date: '2주 전' },
  { title: '[Q&A] 신인 선수에게 물었다! 야구장 맛집 TOP 3', duration: '09:51', views: '2.2만회', date: '2주 전' },
  { title: '[V-log] 원정 버스에서 만난 선수단', duration: '10:14', views: '3.1만회', date: '3주 전' },
  { title: '[치어리더] 시즌 하이라이트 응원 퍼포먼스', duration: '03:20', views: '8.4만회', date: '3주 전' },
  { title: '[마스코트] 블레오와 함께하는 어린이날 특집', duration: '06:40', views: '1.9만회', date: '1개월 전' },
]

// 016-SL-GM-11 라이온즈 VR
export const VR_INTRO = {
  title: '경기장을 360°로 만나보세요',
  desc: '스마트폰을 움직여 라팍 곳곳을 둘러볼 수 있는 몰입형 VR 콘텐츠입니다.',
  note: 'Wi-Fi 환경에서 이용을 권장하며, 콘텐츠당 약 3~5분 소요됩니다.',
}
export const VR_EXPERIENCES = [
  { title: '좌석 체험', desc: '내야석·외야석·프리미엄석에서 바라본 경기장 전경', duration: '약 4분', imageLabel: '좌석 시야 360° 이미지' },
  { title: '선수 라커룸 체험', desc: '평소 볼 수 없는 선수단 라커룸 내부 둘러보기', duration: '약 3분', imageLabel: '라커룸 360° 이미지' },
  { title: '덕아웃 체험', desc: '그라운드와 가장 가까운 덕아웃에서 느끼는 현장감', duration: '약 5분', imageLabel: '덕아웃 360° 이미지' },
]
