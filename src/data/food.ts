// 013-SL-GM-08 라팍 정보 > 식음매장 (어드민 [운영 관리 > 식음매장 관리]에서 등록)

export type FoodFloor = 1 | 2 | 3 | 4 | 5

export const FOOD_FLOORS: FoodFloor[] = [1, 2, 3, 4, 5]

export interface FoodStore {
  id: string
  floor: FoodFloor
  name: string
  category: string
  /** 대표 메뉴 */
  menu: string
  hours: string
  /** 위치 설명 (예: 1루 내야 게이트 옆) */
  zone: string
  /** 층 평면도 위 핀 위치 (이미지 기준 %, 어드민에서 클릭으로 지정) */
  x: number
  y: number
}

export const FOOD_STORES: FoodStore[] = [
  {
    id: "F-01",
    floor: 1,
    name: "라팍 치킨",
    category: "치킨",
    menu: "치킨·감자튀김·맥주",
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
    menu: "수제버거·핫도그·콜라",
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
    menu: "아메리카노·라떼·스무디",
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
    menu: "도시락·김밥·떡볶이",
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
    menu: "라멘·교자·하이볼",
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
    menu: "족발·막창·생맥주",
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
    menu: "핫도그·츄러스·팝콘",
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
    menu: "칵테일·안주 세트",
    hours: "경기일 16:00~22:30",
    zone: "중앙 상단 전망 라운지",
    x: 50,
    y: 70,
  },
]
