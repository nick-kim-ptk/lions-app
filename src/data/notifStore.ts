import { NOTIF_DATA } from "@/data/home"

/**
 * 알림 읽음 상태 (005-SL-HM-02 정책)
 * - 홈 알림 아이콘에 레드닷이 있는 상태에서 알림 페이지에 진입하면,
 *   미확인 알림을 포함한 전체 알림이 읽은 상태로 간주된다.
 * - 별도의 '모두 읽음' 버튼·개별 읽음 처리는 없다.
 */

let allRead = !NOTIF_DATA.some((n) => !n.read)

const listeners = new Set<() => void>()

export const subscribeNotif = (fn: () => void) => {
  listeners.add(fn)

  return () => {
    listeners.delete(fn)
  }
}

export const getHasUnread = () => !allRead

export function markAllNotifRead() {
  if (allRead) return

  allRead = true

  listeners.forEach((fn) => fn())
}
