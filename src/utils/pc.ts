import { getLoggedIn, rememberReturnTo } from "@/data/authStore"

// PC 뷰(1024px~) 공통 규칙. 와이어프레임에서 PC는 '티켓 예매'만 지원하고, 모바일 티켓·선물 등은 앱 전용이다.

/** 티켓링크 화면 (더미 라우트 /ticketlink) — PC에서는 새 창(_blank)으로 연다. 실제 서비스에서는 티켓링크 예매 URL로 교체 */

export const TICKETLINK_URL = () =>
  `${window.location.href.split("#")[0]}#/ticketlink`

export const isPc = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(min-width: 1024px)").matches

/** 예매하기 버튼: PC는 티켓링크 새 창, 모바일은 티켓+ 화면으로 이동 */

export function bookTicket(navigate: (path: string) => void) {
  if (!getLoggedIn()) {
    rememberReturnTo()
    navigate("/login")
  } else if (isPc()) window.open(TICKETLINK_URL(), "_blank")
  else navigate("/ticket")
}

/** PC에서 제공하지 않는 화면: 라이온즈 VR (에디터 CD11) */

export const isPcOnlyBlocked = (path: string) => path.startsWith("/game/vr")

export const PC_APP_ONLY_MESSAGE = "앱에서 확인하세요."

/** 이동 전에 확인: PC에서 막힌 화면이면 안내(alert)만 띄우고 true를 돌려준다 */

export function blockedOnPc(path: string) {
  if (isPc() && isPcOnlyBlocked(path)) {
    window.alert(PC_APP_ONLY_MESSAGE)

    return true
  }

  return false
}
