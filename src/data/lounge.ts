// 020(022)-SL-LG-03 엘도라도 ZONE

export const LIVE_REACTIONS = [
  { emoji: "🦁", msg: "가즈아~!", x: 15, delay: 0 },

  { emoji: "🔥", msg: "화이팅!!", x: 72, delay: 0.6 },

  { emoji: "💙", msg: "이겨라!!", x: 40, delay: 1.2 },

  { emoji: "⚾", msg: "홈런 가자", x: 60, delay: 1.8 },

  { emoji: "👏", msg: "잘한다~", x: 25, delay: 2.4 },

  { emoji: "🎉", msg: "가즈아~!", x: 82, delay: 0.3 },

  { emoji: "😭", msg: "실망이야", x: 50, delay: 0.9 },

  { emoji: "🙌", msg: "화이팅!", x: 10, delay: 1.5 },

  { emoji: "⚡", msg: "빨리 빨리", x: 68, delay: 2.1 },

  { emoji: "🦁", msg: "삼성 최고", x: 35, delay: 2.7 },
]

// 021-SL-LG-04-WRITE 직관일기 작성하기

export const PLAYERS_LIST = [
  {
    id: "1",
    name: "김지찬",
    number: "7",
    position: "외야수",
    img: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=150&h=150&fit=crop&auto=format",
  },

  {
    id: "2",
    name: "구자욱",
    number: "65",
    position: "외야수",
    img: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=150&h=150&fit=crop&auto=format",
  },

  {
    id: "3",
    name: "원태인",
    number: "46",
    position: "투수",
    img: "https://images.unsplash.com/photo-1508801935749-f33f4d4798e2?w=150&h=150&fit=crop&auto=format",
  },

  {
    id: "4",
    name: "강민호",
    number: "47",
    position: "포수",
    img: "https://images.unsplash.com/photo-1519766304817-4f37bda74a29?w=150&h=150&fit=crop&auto=format",
  },

  {
    id: "5",
    name: "박병호",
    number: "59",
    position: "내야수",
    img: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=150&h=150&fit=crop&auto=format",
  },

  {
    id: "6",
    name: "이재현",
    number: "7",
    position: "내야수",
    img: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=150&h=150&fit=crop&auto=format",
  },

  {
    id: "7",
    name: "디아즈",
    number: "34",
    position: "내야수",
    img: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=150&h=150&fit=crop&auto=format",
  },

  {
    id: "8",
    name: "류지혁",
    number: "16",
    position: "내야수",
    img: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=150&h=150&fit=crop&auto=format",
  },
]

export const MOOD_OPTIONS = [
  { label: "아쉬워요", emoji: "😢" },

  { label: "그저 그래요", emoji: "😐" },

  { label: "좋았어요", emoji: "😊" },

  { label: "최고예요", emoji: "🔥" },

  { label: "전설이에요", emoji: "👑" },
]

// 029-SL-LG-12 블루메이트 1기 — 선정 멤버 5명 (더미)

export const BLUE_MATES = [
  { name: "민아", handle: "samfan_mina", desc: "가족 직관 · 먹거리" },

  { name: "라팍러", handle: "lions_forever_", desc: "경기장 응원 · 직관 기록" },

  { name: "블루로어", handle: "blue_roar_kim", desc: "응원 문화 · 굿즈" },

  { name: "대구블루", handle: "daegu_blue_92", desc: "맛집 · 경기장 주변" },

  {
    name: "라이온즈매니아",
    handle: "lionsmania_",
    desc: "경기 분석 · 하이라이트",
  },
]

// 블루메이트 1기 피드 (더미)

export const SNS_POSTS = [
  {
    user: "lions_forever_",
    time: "2시간 전",
    likes: 128,
    caption: "오늘도 라팍은 푸르다 💙 승리 기원!",
    tags: ["#삼성라이온즈", "#직관"],
    imageLabel: "경기장 응원석 인증샷",
  },

  {
    user: "daegu_blue_92",
    time: "3시간 전",
    likes: 94,
    caption: "치맥 세팅 완료. 오늘 경기 이겨라!",
    tags: ["#삼팬", "#라이온즈파크"],
    imageLabel: "먹거리 인증샷",
  },

  {
    user: "samfan_mina",
    time: "5시간 전",
    likes: 213,
    caption: "아이랑 첫 직관! 블레오 만났어요",
    tags: ["#삼성라이온즈", "#SamsungLions"],
    imageLabel: "가족 직관 인증샷",
  },

  {
    user: "blue_roar_kim",
    time: "어제",
    likes: 76,
    caption: "응원 피켓 들고 입장 🔥",
    tags: ["#삼팬", "#직관"],
    imageLabel: "응원 피켓 인증샷",
  },

  {
    user: "lionsmania_",
    time: "어제",
    likes: 305,
    caption: "9회말 역전승… 소름 돋았다",
    tags: ["#삼성라이온즈", "#라이온즈파크"],
    imageLabel: "전광판 사진",
  },

  {
    user: "v9_dreamer",
    time: "2일 전",
    likes: 57,
    caption: "유니폼 새로 장만! 올 시즌도 같이 달려요",
    tags: ["#SamsungLions", "#삼팬"],
    imageLabel: "유니폼 착용 사진",
  },
]
