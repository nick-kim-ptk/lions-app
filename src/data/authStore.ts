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

export const getLoggedIn = () => loggedIn

/** 로그아웃 상태에서 접근하면 로그인으로 보내는 화면 (약관·방침 페이지는 공개) */

const PUBLIC_MY = ["/my/privacy", "/my/cctv-policy", "/my/email-refuse"]

export const requiresLogin = (pathname: string) =>
  (pathname.startsWith("/my") && !PUBLIC_MY.includes(pathname)) ||
  pathname.startsWith("/notifications") ||
  pathname.startsWith("/lounge")

export const useLoggedIn = () =>
  useSyncExternalStore(subscribe, () => loggedIn)
