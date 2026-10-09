import React from "react"

import { useLocation, useNavigate } from "react-router-dom"

import { setLoggedIn, useLoggedIn } from "@/data/authStore"

import { ALL_MENU_SECTIONS, type MenuLink } from "@/data/allMenu"

// PC(1024px~) 전용 상단 메뉴. 하단 탭바 대신 쓰고, 마우스를 올리면 하위 메뉴가 전체 폭 패널로 열린다.
// 라운지·알림은 PC에서 제공하지 않으므로 메뉴에 넣지 않는다. 메뉴 항목은 /all-menu와 같은 데이터(allMenu.ts)를 쓴다.

export const PC_CONTAINER = "w-full max-w-[1200px] mx-auto px-4"

const NAV: { label: string; path: string; section?: string }[] = [
  { label: "게임", path: "/game", section: "게임" },

  { label: "티켓+", path: "/ticket", section: "티켓+" },

  { label: "라이온즈", path: "/all/about", section: "라이온즈" },

  { label: "소식/안내", path: "/all/notice-list", section: "소식/안내" },

  { label: "MY", path: "/my" },
]

const linksOf = (title: string) => {
  const s = ALL_MENU_SECTIONS.find((x) => x.title === title)

  if (!s) return []

  const groups = s.groups?.length
    ? s.groups
    : [{ title: s.title, items: s.items as MenuLink[] }]

  return groups
}

/** 현재 경로가 속한 대메뉴 */

function activeLabel(pathname: string) {
  if (pathname.startsWith("/my/booking") || pathname.startsWith("/my/ticket"))
    return "티켓+"

  for (const n of NAV) {
    if (!n.section) continue

    const hit = linksOf(n.section).some((g) =>
      g.items.some((i) => i.path.split("#")[0] === pathname),
    )

    if (hit) return n.label
  }

  if (pathname.startsWith("/game")) return "게임"

  if (pathname.startsWith("/ticket")) return "티켓+"

  if (pathname.startsWith("/all")) return "라이온즈"

  if (pathname.startsWith("/my")) return "MY"

  return ""
}

export function PcGnb() {
  const navigate = useNavigate()

  const loggedIn = useLoggedIn()

  const { pathname } = useLocation()

  const [open, setOpen] = React.useState<string | null>(null)

  const active = activeLabel(pathname)

  // 경로가 바뀌면 패널을 닫는다
  React.useEffect(() => {
    setOpen(null)
  }, [pathname])

  const go = (path: string, external?: boolean) => {
    setOpen(null)

    if (external) {
      window.open(`#${path}`, "_blank")

      return
    }

    navigate(path.split("#")[0])
  }

  const hoverable = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover)").matches

  return (
    <header
      className="hidden lg:block flex-shrink-0 relative z-40 bg-white border-b border-[#DDE1EC]"
      onMouseLeave={() => setOpen(null)}
    >
      <div className={`${PC_CONTAINER} h-[72px] flex items-center gap-10`}>
        <button
          onClick={() => go("/home")}
          className="flex items-center gap-2 flex-shrink-0"
        >
          <span className="w-9 h-9 rounded-xl bg-[#1B5BF0] text-white text-[13px] font-bold flex items-center justify-center">
            SL
          </span>

          <span className="text-[16px] font-bold text-[#111827]">
            삼성 라이온즈
          </span>
        </button>

        <nav className="flex items-center gap-2 flex-1">
          {NAV.map((n) => {
            const on = active === n.label

            const opened = open === n.label

            return (
              <button
                key={n.label}
                onMouseEnter={() => setOpen(n.section ? n.label : null)}
                onFocus={() => setOpen(n.section ? n.label : null)}
                onClick={() => {
                  if (n.section && !hoverable()) {
                    setOpen(opened ? null : n.label)

                    return
                  }

                  go(n.path)
                }}
                className={`h-[72px] px-5 text-[16px] font-semibold border-b-2 transition-colors ${
                  on || opened
                    ? "text-[#1B5BF0] border-[#1B5BF0]"
                    : "text-[#111827] border-transparent"
                }`}
              >
                {n.label}
              </button>
            )
          })}
        </nav>

        {/* 로그인 상태 */}
        <div className="flex items-center gap-3 flex-shrink-0 text-[13px]">
          {loggedIn ? (
            <>
              <button
                onClick={() => go("/my")}
                className="flex items-center gap-2 text-[#111827]"
              >
                <span className="w-7 h-7 rounded-full bg-[#E8EBF4] flex items-center justify-center text-[11px] text-[#64748B]">
                  라
                </span>

                <span className="font-semibold">김라이온 님</span>
              </button>

              <span className="w-px h-3 bg-[#DDE1EC]" />

              <button
                onClick={() => setLoggedIn(false)}
                className="text-[#64748B]"
              >
                로그아웃
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="px-4 h-9 rounded-full bg-[#1B5BF0] text-white font-semibold"
            >
              로그인
            </button>
          )}
        </div>
      </div>

      {/* 하위 메뉴 패널 */}
      {open && (
        <div className="absolute left-0 right-0 top-full bg-white border-b border-[#DDE1EC] shadow-[0_12px_24px_rgba(17,24,39,0.08)]">
          <div className={`${PC_CONTAINER} py-8`}>
            <div className="flex justify-center gap-12">
              {linksOf(NAV.find((n) => n.label === open)?.section ?? "").map(
                (g) => (
                  <div key={g.title} className="min-w-[160px] text-center">
                    <p className="text-[13px] font-bold text-[#111827] pb-3 mb-3 border-b border-[#DDE1EC]">
                      {g.title}
                    </p>

                    <ul className="flex flex-col items-center gap-2.5">
                      {g.items.map((i) => (
                        <li key={i.label}>
                          <button
                            onClick={() => go(i.path, i.external)}
                            className="text-[14px] text-[#475569] hover:text-[#1B5BF0] hover:underline text-center"
                          >
                            {i.label}

                            {i.badge && (
                              <span className="ml-1.5 text-[10px] px-1.5 py-0.5 rounded bg-[#F5F7FB] text-[#64748B]">
                                {i.badge}
                              </span>
                            )}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

// 하단 푸터 — 모바일·PC 공통 (구단 사업자 정보)

const FOOTER_INFO = [
  "대표이사: 유정근",
  "사업자번호: 504-81-03755",
  "개인정보취급방침관리자: 삼성 라이온즈",
  "전화번호: 053-780-3300",
  "주소: 대구광역시 수성구 야구전설로 1",
]

export function PcFooter() {
  const navigate = useNavigate()

  const links = [
    { label: "개인정보 처리방침", path: "/my/privacy" },

    { label: "영상정보처리기기 운영·관리방침", path: "/my/cctv-policy" },

    { label: "이메일 무단수집 거부", path: "/my/email-refuse" },
  ]

  return (
    <footer className="mt-10 lg:mt-16 bg-white border-t border-[#DDE1EC]">
      <div className={`${PC_CONTAINER} py-6 lg:py-8`}>
        <div className="flex flex-wrap gap-x-4 gap-y-1.5 lg:gap-x-6 lg:gap-y-2 mb-3 lg:mb-4">
          {links.map((l) => (
            <button
              key={l.label}
              onClick={() => navigate(l.path)}
              className="text-[11px] lg:text-[13px] text-[#475569] hover:text-[#1B5BF0]"
            >
              {l.label}
            </button>
          ))}
        </div>

        <p className="text-[10px] lg:text-[12px] text-[#94A3B8] leading-relaxed">
          {FOOTER_INFO.map((t, i) => (
            <span key={t}>
              {i > 0 && <span className="mx-1.5 text-[#CBD5E1]">/</span>}
              {t}
            </span>
          ))}
        </p>

        <p className="mt-2 text-[10px] lg:text-[12px] text-[#94A3B8]">
          Copyright©Samsung Lions. All Right Reserved.
        </p>
      </div>
    </footer>
  )
}
