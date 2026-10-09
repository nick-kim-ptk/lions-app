import { useSyncExternalStore } from "react"

/**
 * PC 상단 메뉴의 로그인 상태 (프로토타입용)
 * - 기본값은 로그인 상태. 로그아웃 → 로그인 화면(/login) → 로그인 버튼 → 다시 로그인 상태.
 */

let loggedIn = true

const listeners = new Set<() => void>()

const subscribe = (fn: () => void) => {
  listeners.add(fn)

  return () => {
    listeners.delete(fn)
  }
}

export function setLoggedIn(v: boolean) {
  if (loggedIn === v) return

  loggedIn = v

  listeners.forEach((fn) => fn())
}

export const useLoggedIn = () =>
  useSyncExternalStore(subscribe, () => loggedIn)
