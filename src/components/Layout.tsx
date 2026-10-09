import React from "react"

import { Outlet, useLocation, useNavigate } from "react-router-dom"

import { SCREENS } from "@/data/overview"

const SCREEN_ID_MAP: Record<string, string> = Object.fromEntries(
  SCREENS.filter((s) => !s.variant).map((s) => [s.path, s.id]),
)

// 같은 경로 안에서 팝업·등록 상태가 열릴 때 ID 배지를 해당 화면 ID로 바꾸기 위한 간단한 저장소

let idOverride: string | null = null

const idListeners = new Set<() => void>()

function setIdOverride(id: string | null) {
  idOverride = id

  idListeners.forEach((fn) => fn())
}

const subscribeId = (fn: () => void) => {
  idListeners.add(fn)

  return () => {
    idListeners.delete(fn)
  }
}

/** 팝업/등록 상태가 열려 있는 동안(`id`가 있을 때) 상단 ID 배지를 해당 화면 ID로 표시합니다. */

export function useScreenIdOverride(id: string | null) {
  React.useEffect(() => {
    setIdOverride(id)

    return () => setIdOverride(null)
  }, [id])
}

export function ScreenIdBadge() {
  const { pathname } = useLocation()

  const [copied, setCopied] = React.useState(false)

  const override = React.useSyncExternalStore(subscribeId, () => idOverride)

  const id = override ?? SCREEN_ID_MAP[pathname]

  if (!id) return null

  function handleCopy() {
    navigator.clipboard.writeText(id).then(() => {
      setCopied(true)

      setTimeout(() => setCopied(false), 1500)
    })
  }

  return (
    <div className="fixed top-0 left-1/2 -translate-x-1/2 z-[9999]">
      <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-sm rounded-b-lg px-2.5 py-0.5">
        <span className="text-white/70 text-[9px] font-mono tracking-widest">
          {id}
        </span>
        <button
          onClick={handleCopy}
          className="text-white/50 hover:text-white/90 transition-colors"
          title="ID 복사"
        >
          {copied ? (
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
              <path
                d="M20 6L9 17l-5-5"
                stroke="#4ADE80"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
              <rect
                x="9"
                y="9"
                width="13"
                height="13"
                rx="2"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  )
}

const NAV_ITEMS = [
  {
    label: "홈",

    path: "/home",

    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M3 9.5L12 3l9 6.5V21a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"
          stroke={active ? "#1B5BF0" : "#4A5570"}
          strokeWidth="1.8"
          fill={active ? "#1B5BF0" : "none"}
          strokeLinejoin="round"
        />
        <path
          d="M9 22V12h6v10"
          stroke={active ? "#fff" : "#4A5570"}
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },

  {
    label: "게임",

    path: "/game",

    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        {/* Home plate — pentagon */}
        <path
          d="M12 3L20 9V17H4V9L12 3Z"
          stroke={active ? "#1B5BF0" : "#4A5570"}
          strokeWidth="1.8"
          fill={active ? "#1B5BF0" : "none"}
          strokeLinejoin="round"
        />
        <path
          d="M4 17L12 22L20 17"
          stroke={active ? "#1B5BF0" : "#4A5570"}
          strokeWidth="1.8"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
    ),
  },

  {
    label: "티켓+",

    path: "/ticket",

    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        {/* Ticket shape with notch */}
        <path
          d="M2 9a1 1 0 011-1h18a1 1 0 011 1v2a2 2 0 000 4v2a1 1 0 01-1 1H3a1 1 0 01-1-1v-2a2 2 0 000-4V9z"
          stroke={active ? "#1B5BF0" : "#4A5570"}
          strokeWidth="1.8"
          fill={active ? "#EBF0FF" : "none"}
          strokeLinejoin="round"
        />
        {/* Perforated divider */}
        <path
          d="M8 8v8"
          stroke={active ? "#1B5BF0" : "#4A5570"}
          strokeWidth="1.4"
          strokeDasharray="2 2"
        />
      </svg>
    ),
  },

  {
    label: "라운지",

    path: "/lounge",

    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        {/* Crowd / fans — three people */}
        <circle
          cx="12"
          cy="6"
          r="2.5"
          stroke={active ? "#1B5BF0" : "#4A5570"}
          strokeWidth="1.7"
          fill={active ? "#1B5BF0" : "none"}
        />
        <path
          d="M7 19c0-2.8 2.2-5 5-5s5 2.2 5 5"
          stroke={active ? "#1B5BF0" : "#4A5570"}
          strokeWidth="1.7"
          strokeLinecap="round"
        />
        <circle
          cx="5"
          cy="8"
          r="1.8"
          stroke={active ? "#1B5BF0" : "#4A5570"}
          strokeWidth="1.5"
          fill={active ? "#1B5BF0" : "none"}
        />
        <path
          d="M2 19c0-2.2 1.6-4 3.5-4"
          stroke={active ? "#1B5BF0" : "#4A5570"}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle
          cx="19"
          cy="8"
          r="1.8"
          stroke={active ? "#1B5BF0" : "#4A5570"}
          strokeWidth="1.5"
          fill={active ? "#1B5BF0" : "none"}
        />
        <path
          d="M22 19c0-2.2-1.6-4-3.5-4"
          stroke={active ? "#1B5BF0" : "#4A5570"}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },

  {
    label: "MY",

    path: "/my",

    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle
          cx="12"
          cy="8"
          r="4"
          stroke={active ? "#1B5BF0" : "#4A5570"}
          strokeWidth="1.8"
        />
        <path
          d="M4 20c0-4 3.6-7 8-7s8 3 8 7"
          stroke={active ? "#1B5BF0" : "#4A5570"}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
]

function getActiveTab(pathname: string) {
  for (const item of NAV_ITEMS) {
    if (pathname.startsWith(item.path)) return item.path
  }

  return "/home"
}

export default function Layout() {
  const location = useLocation()

  const navigate = useNavigate()

  const activeTab = getActiveTab(location.pathname)

  return (
    <div className="flex flex-col h-full bg-[#F5F7FB]">
      <div className="flex-1 overflow-y-auto">
        <Outlet />
      </div>

      {/* Bottom Navigation */}
      <nav className="flex-shrink-0 h-[68px] bg-[#FFFFFF] border-t border-[#DDE1EC] flex items-center safe-area-bottom">
        {NAV_ITEMS.map((item) => {
          const active = activeTab === item.path

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="flex-1 flex flex-col items-center justify-center gap-1 py-2"
            >
              {item.icon(active)}
              <span
                className={`text-[10px] font-medium ${
                  active ? "text-[#1B5BF0]" : "text-[#9CA3AF]"
                }`}
              >
                {item.label}
              </span>
            </button>
          )
        })}
      </nav>
    </div>
  )
}

// Header component for use in screens

export function Header({
  title,

  showBack = true,

  showMenu = false,

  showNotif = false,

  transparent = false,

  dark = false,

  bare = false,

  rightSlot,
}: {
  title?: string

  showBack?: boolean

  showMenu?: boolean

  showNotif?: boolean

  transparent?: boolean

  dark?: boolean

  bare?: boolean

  rightSlot?: React.ReactNode
}) {
  const navigate = useNavigate()

  if (bare) {
    return (
      <div className="sticky top-0 z-20 flex items-center justify-end px-4 h-14 gap-1 bg-transparent">
        {showNotif && (
          <button
            className="w-8 h-8 flex items-center justify-center"
            onClick={() => navigate("/notifications")}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"
                stroke="#111827"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        )}
        {showMenu && (
          <button
            className="w-8 h-8 flex items-center justify-center"
            onClick={() => navigate("/all-menu")}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 6h16M4 12h16M4 18h16"
                stroke="#111827"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        )}
        {rightSlot}
      </div>
    )
  }

  return (
    <div
      className={`sticky top-0 z-20 flex items-center px-4 h-14 gap-3 ${
        dark
          ? "bg-[#0E1A40]/95 backdrop-blur-sm border-b border-white/10"
          : transparent
            ? "bg-transparent"
            : "bg-[#F5F7FB]/95 backdrop-blur-sm border-b border-[#DDE1EC]"
      }`}
    >
      {showBack && (
        <button
          onClick={() => navigate(-1)}
          className="w-8 h-8 flex items-center justify-center"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 19l-7-7 7-7"
              stroke={dark ? "white" : "#111827"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
      {title && (
        <h1
          className={`flex-1 font-semibold text-[16px] ${
            dark ? "text-white" : "text-[#111827]"
          }`}
        >
          {title}
        </h1>
      )}
      {!title && <div className="flex-1" />}
      {showNotif && (
        <button
          className="w-8 h-8 flex items-center justify-center"
          onClick={() => navigate("/notifications")}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"
              stroke="#111827"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}
      {showMenu && (
        <button
          className="w-8 h-8 flex items-center justify-center"
          onClick={() => navigate("/all-menu")}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 6h16M4 12h16M4 18h16"
              stroke="#111827"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}
      {rightSlot}
    </div>
  )
}

// Standalone page wrapper (no bottom nav — for auth/onboarding)

export function Page({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`min-h-screen bg-[#F5F7FB] flex flex-col ${className}`}>
      {children}
    </div>
  )
}
