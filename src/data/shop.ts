// 111-SL-AL-33 어센틱샵 더미 상품 (티켓 페이지 017-SL-TK-01 의 샵 카드와 같은 구성: 선수명·상품명·가격)

export const AUTHENTIC_SHOP_CATEGORIES = [
  "전체",
  "유니폼",
  "의류",
  "모자·잡화",
  "굿즈",
] as const

export type AuthenticShopCategory = (typeof AUTHENTIC_SHOP_CATEGORIES)[number]

export interface ShopItem {
  id: number
  category: Exclude<AuthenticShopCategory, "전체">
  player: string
  name: string
  price: string
}

export const AUTHENTIC_SHOP_LIST: ShopItem[] = [
  { id: 0, category: "유니폼", player: "구자욱", name: "구자욱 1,000득점 기념 유니폼", price: "159,000원" },
  { id: 1, category: "유니폼", player: "원태인", name: "원태인 15승 기념 어센틱 저지", price: "189,000원" },
  { id: 2, category: "유니폼", player: "오재일", name: "오재일 200홈런 기념 어센틱 유니폼", price: "175,000원" },
  { id: 3, category: "굿즈", player: "강민호", name: "강민호 포수 마스크 한정판 굿즈", price: "85,000원" },
  { id: 4, category: "유니폼", player: "김지찬", name: "홈 어센틱 유니폼 (블루)", price: "169,000원" },
  { id: 5, category: "유니폼", player: "삼성라이온즈", name: "원정 어센틱 유니폼 (화이트)", price: "169,000원" },
  { id: 6, category: "의류", player: "삼성라이온즈", name: "덕아웃 바람막이 자켓", price: "129,000원" },
  { id: 7, category: "의류", player: "삼성라이온즈", name: "라이온즈 후드 집업", price: "89,000원" },
  { id: 8, category: "의류", player: "구자욱", name: "구자욱 시그니처 티셔츠", price: "39,000원" },
  { id: 9, category: "모자·잡화", player: "삼성라이온즈", name: "어센틱 볼캡 (네이비)", price: "45,000원" },
  { id: 10, category: "모자·잡화", player: "삼성라이온즈", name: "스포츠 타올 3종 세트", price: "28,000원" },
  { id: 11, category: "모자·잡화", player: "삼성라이온즈", name: "엠블럼 에코백", price: "22,000원" },
  { id: 12, category: "굿즈", player: "원태인", name: "원태인 포토카드 세트", price: "15,000원" },
  { id: 13, category: "굿즈", player: "삼성라이온즈", name: "라이온즈 응원 막대 풍선", price: "9,000원" },
  { id: 14, category: "굿즈", player: "삼성라이온즈", name: "엠블럼 키링 (블루)", price: "12,000원" },
]

// 112-SL-AL-34 베리즈샵 더미 상품 (굿즈 위주)

export const BERRIZ_SHOP_CATEGORIES = [
  "전체",
  "포토카드",
  "응원용품",
  "리빙",
  "패션잡화",
] as const

export type BerrizShopCategory = (typeof BERRIZ_SHOP_CATEGORIES)[number]

export interface BerrizShopItem {
  id: number
  category: Exclude<BerrizShopCategory, "전체">
  player: string
  name: string
  price: string
}

export const BERRIZ_SHOP_LIST: BerrizShopItem[] = [
  { id: 0, category: "포토카드", player: "구자욱", name: "구자욱 1,000득점 포토카드 세트", price: "18,000원" },
  { id: 1, category: "응원용품", player: "원태인", name: "원태인 15승 기념 응원 타월", price: "22,000원" },
  { id: 2, category: "리빙", player: "오재일", name: "오재일 200홈런 기념 머그컵", price: "29,000원" },
  { id: 3, category: "리빙", player: "강민호", name: "강민호 한정판 아크릴 스탠드", price: "35,000원" },
  { id: 4, category: "패션잡화", player: "박병호", name: "박병호 입단 기념 로고 볼캡", price: "32,000원" },
  { id: 5, category: "패션잡화", player: "이재현", name: "이재현 유니폼 키링 세트", price: "15,000원" },
  { id: 6, category: "포토카드", player: "원태인", name: "원태인 시즌 포토카드 세트", price: "18,000원" },
  { id: 7, category: "포토카드", player: "삼성라이온즈", name: "스페셜 포토카드 바인더", price: "25,000원" },
  { id: 8, category: "응원용품", player: "삼성라이온즈", name: "공식 응원 슬로건 타월", price: "12,000원" },
  { id: 9, category: "응원용품", player: "삼성라이온즈", name: "응원 야광봉 2개 세트", price: "10,000원" },
  { id: 10, category: "리빙", player: "삼성라이온즈", name: "엠블럼 텀블러 (블루)", price: "26,000원" },
  { id: 11, category: "리빙", player: "구자욱", name: "구자욱 아크릴 키링 스탠드", price: "14,000원" },
  { id: 12, category: "패션잡화", player: "삼성라이온즈", name: "라이온즈 에코백", price: "22,000원" },
  { id: 13, category: "패션잡화", player: "삼성라이온즈", name: "엠블럼 양말 3종 세트", price: "16,000원" },
]
