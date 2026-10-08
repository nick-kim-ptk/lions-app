// 020(022)-SL-LG-03 엘도라도 ZONE
export const LIVE_REACTIONS = [
  { emoji: '🦁', msg: '가즈아~!', x: 15, delay: 0 },
  { emoji: '🔥', msg: '화이팅!!', x: 72, delay: 0.6 },
  { emoji: '💙', msg: '이겨라!!', x: 40, delay: 1.2 },
  { emoji: '⚾', msg: '홈런 가자', x: 60, delay: 1.8 },
  { emoji: '👏', msg: '잘한다~', x: 25, delay: 2.4 },
  { emoji: '🎉', msg: '가즈아~!', x: 82, delay: 0.3 },
  { emoji: '😭', msg: '실망이야', x: 50, delay: 0.9 },
  { emoji: '🙌', msg: '화이팅!', x: 10, delay: 1.5 },
  { emoji: '⚡', msg: '빨리 빨리', x: 68, delay: 2.1 },
  { emoji: '🦁', msg: '삼성 최고', x: 35, delay: 2.7 },
]

// 054-SL-MY-25 시즌 기록 그리드: 144개 타일 중 50개를 전체 영역에 분산하여 빈 타일로 표시
export const SEASON_GRID_EMPTY = new Set([2,3,6,7,11,14,17,19,23,26,29,31,34,38,42,44,47,49,51,55,56,58,62,67,68,71,74,79,82,83,86,90,95,96,98,102,107,109,110,114,115,118,121,122,126,129,133,135,136,140])

// 054-SL-MY-25 나의 직관 일기
export interface DiaryRecord {
  id: string
  date: string
  location: string
  homeAway: string
  score: string
  result: string
  watchMode: '직관' | '집관'
  mood: string
  player?: string
  comment?: string
  photos: string[]
  createdAt: number
}

export const INITIAL_DIARIES: DiaryRecord[] = [
  {
    id: '1',
    date: '9월 15일 (월) 18:30',
    location: '라이온즈파크 · 대구',
    homeAway: '홈',
    score: '삼성 5 : 3 롯데',
    result: '승리',
    watchMode: '직관',
    mood: '최고예요',
    player: '김지찬',
    comment: '9회말 극적인 끝내기 홈런! 라팍의 분위기가 최고였습니다 🦁🔥',
    photos: ['https://images.unsplash.com/photo-1508801935749-f33f4d4798e2?w=400&h=400&fit=crop&auto=format'],
    createdAt: Date.now() - 3600000 * 24 * 2
  },
  {
    id: '2',
    date: '9월 10일 (수) 18:30',
    location: '라이온즈파크 · 대구',
    homeAway: '홈',
    score: '삼성 4 : 2 NC',
    result: '승리',
    watchMode: '직관',
    mood: '좋았어요',
    player: '원태인',
    comment: '원태인 선수의 7이닝 무실점 호투! 최고의 경기였습니다.',
    photos: [],
    createdAt: Date.now() - 3600000 * 24 * 7
  },
  {
    id: '3',
    date: '9월 05일 (금) 18:30',
    location: '잠실 야구장',
    homeAway: '원정',
    score: '삼성 2 : 5 LG',
    result: '패배',
    watchMode: '집관',
    mood: '아쉬워요',
    player: '구자욱',
    comment: '아쉽게 패했지만 구자욱 선수의 멀티히트가 빛났어요.',
    photos: [],
    createdAt: Date.now() - 3600000 * 24 * 12
  }
]

// 021-SL-LG-04-WRITE 직관일기 작성하기
export const PLAYERS_LIST = [
  { id: '1', name: '김지찬', number: '7', position: '외야수', img: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=150&h=150&fit=crop&auto=format' },
  { id: '2', name: '구자욱', number: '65', position: '외야수', img: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=150&h=150&fit=crop&auto=format' },
  { id: '3', name: '원태인', number: '46', position: '투수', img: 'https://images.unsplash.com/photo-1508801935749-f33f4d4798e2?w=150&h=150&fit=crop&auto=format' },
  { id: '4', name: '강민호', number: '47', position: '포수', img: 'https://images.unsplash.com/photo-1519766304817-4f37bda74a29?w=150&h=150&fit=crop&auto=format' },
  { id: '5', name: '박병호', number: '59', position: '내야수', img: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=150&h=150&fit=crop&auto=format' },
  { id: '6', name: '이재현', number: '7', position: '내야수', img: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=150&h=150&fit=crop&auto=format' },
  { id: '7', name: '디아즈', number: '34', position: '내야수', img: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=150&h=150&fit=crop&auto=format' },
  { id: '8', name: '류지혁', number: '16', position: '내야수', img: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=150&h=150&fit=crop&auto=format' },
]

export const MOOD_OPTIONS = [
  { label: '아쉬워요', emoji: '😢' },
  { label: '그저 그래요', emoji: '😐' },
  { label: '좋았어요', emoji: '😊' },
  { label: '최고예요', emoji: '🔥' },
  { label: '전설이에요', emoji: '👑' },
]

// 029-SL-LG-12 삼팬 SNS (해시태그 취합 더미)
export const SNS_POSTS = [
  { user: 'lions_forever_', time: '2시간 전', likes: 128, caption: '오늘도 라팍은 푸르다 💙 승리 기원!', tags: ['#삼성라이온즈', '#직관'], imageLabel: '경기장 응원석 인증샷' },
  { user: 'daegu_blue_92', time: '3시간 전', likes: 94, caption: '치맥 세팅 완료. 오늘 경기 이겨라!', tags: ['#삼팬', '#라이온즈파크'], imageLabel: '먹거리 인증샷' },
  { user: 'samfan_mina', time: '5시간 전', likes: 213, caption: '아이랑 첫 직관! 블레오 만났어요', tags: ['#삼성라이온즈', '#SamsungLions'], imageLabel: '가족 직관 인증샷' },
  { user: 'blue_roar_kim', time: '어제', likes: 76, caption: '응원 피켓 들고 입장 🔥', tags: ['#삼팬', '#직관'], imageLabel: '응원 피켓 인증샷' },
  { user: 'lionsmania_', time: '어제', likes: 305, caption: '9회말 역전승… 소름 돋았다', tags: ['#삼성라이온즈', '#라이온즈파크'], imageLabel: '전광판 사진' },
  { user: 'v9_dreamer', time: '2일 전', likes: 57, caption: '유니폼 새로 장만! 올 시즌도 같이 달려요', tags: ['#SamsungLions', '#삼팬'], imageLabel: '유니폼 착용 사진' },
]
