// PC 뷰(1024px~) 공통 규칙. 와이어프레임에서 PC는 '티켓 예매'만 지원하고, 모바일 티켓·선물 등은 앱 전용이다.

/** 티켓링크 예매 페이지 (더미 주소) — PC에서는 새 창으로 연다 */

export const TICKETLINK_URL = "https://www.ticketlink.co.kr/sports/137/59"

export const isPc = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(min-width: 1024px)").matches

/** 예매하기 버튼: PC는 티켓링크 새 창, 모바일은 티켓+ 화면으로 이동 */

export function bookTicket(navigate: (path: string) => void) {
  if (isPc()) window.open(TICKETLINK_URL, "_blank", "noopener")
  else navigate("/ticket")
}
