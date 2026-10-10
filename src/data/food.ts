// 013-SL-GM-08 라팍 정보 > 식음매장 (더미 데이터 — 어드민 관리 없음)

export type FoodFloor = 1 | 2 | 3 | 4 | 5

export const FOOD_FLOORS: FoodFloor[] = [1, 2, 3, 4, 5]

/** 매장 주요 메뉴 (사진은 자리 표시) */
export interface FoodMenu {
  name: string
  price: number
}

export interface FoodStore {
  id: string
  floor: FoodFloor
  name: string
  category: string
  /** 주요 메뉴 2~3개 */
  menus: FoodMenu[]
  hours: string
  /** 위치 설명 (예: 1루 내야 게이트 옆) */
  zone: string
  /** 층 평면도 위 핀 위치 (이미지 기준 %) */
  x: number
  y: number
}

export const FOOD_STORES: FoodStore[] = [
  {
    id: "F-01",
    floor: 1,
    name: "라팍 치킨",
    category: "치킨",
    menus: [
      { name: "후라이드 치킨", price: 19000 },
      { name: "양념 치킨", price: 20000 },
      { name: "감자튀김", price: 5000 },
    ],
    hours: "경기일 12:00~22:00",
    zone: "1루 게이트 옆",
    x: 24,
    y: 62,
  },
  {
    id: "F-02",
    floor: 1,
    name: "삼성파이브 버거",
    category: "양식",
    menus: [
      { name: "라이온 버거", price: 9500 },
      { name: "치즈 핫도그", price: 5500 },
    ],
    hours: "경기일 12:00~21:00",
    zone: "3루 게이트 옆",
    x: 76,
    y: 60,
  },
  {
    id: "F-03",
    floor: 1,
    name: "블루스타 카페",
    category: "음료",
    menus: [
      { name: "아메리카노", price: 4000 },
      { name: "카페라떼", price: 4500 },
      { name: "딸기 스무디", price: 6000 },
    ],
    hours: "경기일 10:00~22:00",
    zone: "중앙 홈플레이트 뒤편",
    x: 50,
    y: 82,
  },
  {
    id: "F-04",
    floor: 2,
    name: "파크뷰 도시락",
    category: "한식",
    menus: [
      { name: "불고기 도시락", price: 8500 },
      { name: "참치김밥", price: 4500 },
      { name: "떡볶이", price: 5000 },
    ],
    hours: "경기일 11:00~20:00",
    zone: "3루 내야 콘코스",
    x: 72,
    y: 44,
  },
  {
    id: "F-05",
    floor: 2,
    name: "V9 라멘바",
    category: "일식",
    menus: [
      { name: "돈코츠 라멘", price: 11000 },
      { name: "군만두", price: 6000 },
      { name: "하이볼", price: 7000 },
    ],
    hours: "경기일 15:00~22:00",
    zone: "1루 내야 콘코스",
    x: 28,
    y: 46,
  },
  {
    id: "F-06",
    floor: 3,
    name: "라이온 포차",
    category: "주류",
    menus: [
      { name: "족발 세트", price: 28000 },
      { name: "막창구이", price: 18000 },
      { name: "생맥주 500cc", price: 5500 },
    ],
    hours: "경기일 16:00~22:00",
    zone: "외야 방향 콘코스",
    x: 50,
    y: 22,
  },
  {
    id: "F-07",
    floor: 4,
    name: "라이온즈 스낵바",
    category: "분식",
    menus: [
      { name: "핫도그", price: 4500 },
      { name: "츄러스", price: 4000 },
      { name: "팝콘", price: 5000 },
    ],
    hours: "경기일 12:00~21:00",
    zone: "1루 상단 콘코스",
    x: 30,
    y: 38,
  },
  {
    id: "F-08",
    floor: 5,
    name: "스카이 라운지 바",
    category: "주류",
    menus: [
      { name: "시그니처 칵테일", price: 12000 },
      { name: "안주 세트", price: 25000 },
    ],
    hours: "경기일 16:00~22:30",
    zone: "중앙 상단 전망 라운지",
    x: 50,
    y: 70,
  },
]
