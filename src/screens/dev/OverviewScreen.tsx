import { useNavigate } from "react-router-dom"

import { useState } from "react"

import {
  LayoutType,
  ScreenMeta,
  Group,
  SCREENS,
  GROUP_COLORS,
  GROUPS,
  ALL_GROUPS,
} from "@/data/overview"

// ─── Mini wireframe sketches ─────────────────────────────────────────────────

function MiniWireframe({
  layout,
  color,
}: {
  layout: LayoutType
  color: string
}) {
  const bar = <div className={`w-full h-2.5 ${color} rounded-sm opacity-60`} />

  const line = (w: string) => (
    <div className={`${w} h-1.5 bg-gray-200 rounded-full`} />
  )

  const block = (h: string, op = "") => (
    <div className={`w-full ${h} ${color} rounded-sm ${op} opacity-40`} />
  )

  const row = () => (
    <div className="flex gap-1 items-center">
      <div className={`w-5 h-5 ${color} rounded opacity-40 shrink-0`} />
      <div className="flex-1 flex flex-col gap-0.5">
        {line("w-3/4")}
        {line("w-1/2")}
      </div>
    </div>
  )

  const inputRow = () => (
    <div className="w-full h-3 bg-gray-100 border border-gray-200 rounded" />
  )

  switch (layout) {
    case "splash":
      return (
        <div className="flex flex-col h-full gap-1 p-1">
          <div className={`flex-1 ${color} rounded opacity-30`} />
          <div className="flex flex-col gap-1 pb-1">
            {line("w-2/3 mx-auto")}
            {line("w-1/3 mx-auto")}
          </div>
        </div>
      )

    case "dashboard":
      return (
        <div className="flex flex-col gap-1 h-full p-1">
          {bar}
          {block("h-10")}
          <div className="flex gap-1">
            <div className={`flex-1 h-7 ${color} rounded opacity-40`} />
            <div className={`flex-1 h-7 ${color} rounded opacity-40`} />
          </div>
          <div className="flex flex-col gap-0.5">
            {line("w-1/2")}
            {row()}
            {row()}
          </div>
          <div className="flex gap-1">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`flex-1 h-6 ${color} rounded opacity-30`}
              />
            ))}
          </div>
        </div>
      )

    case "list":
      return (
        <div className="flex flex-col gap-1 h-full p-1">
          {bar}
          <div className="flex gap-1 flex-wrap">
            {["", ""].map((_, i) => (
              <div key={i} className="h-2 w-8 bg-gray-200 rounded-full" />
            ))}
          </div>
          <div className="flex-1 flex flex-col gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i}>{row()}</div>
            ))}
          </div>
        </div>
      )

    case "detail":
      return (
        <div className="flex flex-col gap-1 h-full p-1">
          {bar}
          {block("h-9")}
          <div className="flex flex-col gap-0.5 flex-1">
            {line("w-1/2")}
            {line("w-full")}
            {line("w-full")}
            {line("w-5/6")}
            {line("w-4/5")}
            {line("w-2/3")}
          </div>
        </div>
      )

    case "grid":
      return (
        <div className="flex flex-col gap-1 h-full p-1">
          {bar}
          <div className="flex gap-1 flex-wrap">
            <div className="h-2 w-8 bg-gray-200 rounded-full" />
          </div>
          <div className="grid grid-cols-2 gap-1 flex-1">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className={`${color} rounded opacity-40`} />
            ))}
          </div>
        </div>
      )

    case "form":
      return (
        <div className="flex flex-col gap-1 h-full p-1">
          {bar}
          <div className="flex-1 flex flex-col gap-1 pt-1">
            {line("w-1/2")}
            {inputRow()}
            {inputRow()}
            {inputRow()}
            {inputRow()}
            <div className={`w-full h-4 ${color} rounded opacity-70 mt-auto`} />
          </div>
        </div>
      )

    case "calendar":
      return (
        <div className="flex flex-col gap-1 h-full p-1">
          {bar}
          <div className="grid grid-cols-7 gap-px">
            {Array.from({ length: 35 }).map((_, i) => (
              <div
                key={i}
                className={`h-2 rounded-sm ${
                  i === 14 ? color + " opacity-80" : "bg-gray-100"
                }`}
              />
            ))}
          </div>
          <div className="flex-1 flex flex-col gap-0.5 mt-0.5">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i}>{row()}</div>
            ))}
          </div>
        </div>
      )

    case "chat":
      return (
        <div className="flex flex-col gap-1 h-full p-1">
          {bar}
          <div className="flex-1 flex flex-col gap-1 overflow-hidden">
            {[false, false, true, false, true, false].map((right, i) => (
              <div
                key={i}
                className={`flex gap-0.5 ${right ? "flex-row-reverse" : ""}`}
              >
                <div className="w-3 h-3 rounded-full bg-gray-200 shrink-0" />
                <div
                  className={`w-12 h-3 rounded-full ${
                    right ? color + " opacity-60" : "bg-gray-200"
                  }`}
                />
              </div>
            ))}
          </div>
          <div className="h-3 bg-gray-100 rounded border border-gray-200" />
        </div>
      )

    case "qr":
      return (
        <div className="flex flex-col gap-1 h-full p-1 items-center">
          {bar}
          <div className="w-14 h-14 bg-white border-2 border-gray-300 rounded mt-1 grid grid-cols-5 gap-px p-1">
            {Array.from({ length: 25 }).map((_, i) => (
              <div
                key={i}
                className={`rounded-sm ${
                  Math.random() > 0.5 ? "bg-gray-800" : "bg-transparent"
                }`}
              />
            ))}
          </div>
          <div className="w-full flex flex-col gap-0.5">
            {[line("w-2/3"), line("w-1/2")].map((l, i) => (
              <div key={i} className="flex justify-center">
                {l}
              </div>
            ))}
          </div>
        </div>
      )

    case "policy":
      return (
        <div className="flex flex-col gap-1 h-full p-1">
          {bar}
          <div className="flex-1 flex flex-col gap-1 pt-1">
            {line("w-1/3")}
            <div className="flex flex-col gap-0.5">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 bg-gray-200 rounded-full ${
                    i % 3 === 0 ? "w-2/5" : i % 3 === 1 ? "w-full" : "w-4/5"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )

    case "player":
      return (
        <div className="flex flex-col gap-1 h-full p-1">
          {bar}
          <div
            className={`w-full h-10 ${color} rounded opacity-40 flex items-end justify-end pb-0.5 pr-0.5`}
          >
            <div className="w-5 h-8 bg-white/40 rounded-t" />
          </div>
          <div className="flex flex-col gap-0.5 flex-1">
            {line("w-1/4")}
            {line("w-1/2")}
            <div className="w-full h-px bg-gray-200 my-0.5" />
            <div className="grid grid-cols-3 gap-1">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-2 bg-gray-100 rounded" />
              ))}
            </div>
          </div>
        </div>
      )

    case "player-card":
      return (
        <div className="flex flex-col gap-1 h-full p-1">
          {bar}
          <div className="flex-1 flex flex-col gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex gap-1 items-center">
                <span
                  className={`text-[6px] font-bold ${color.replace("bg-", "text-")} w-2`}
                >
                  {i + 1}
                </span>
                <div className="w-4 h-4 bg-gray-200 rounded-full shrink-0" />
                <div className="flex-1 flex flex-col gap-0.5">
                  {line("w-10")}
                  {line("w-6")}
                </div>
              </div>
            ))}
          </div>
        </div>
      )

    case "menu":
      return (
        <div className="flex flex-col gap-1 h-full p-1">
          {bar}
          <div className="h-3 bg-gray-100 rounded border border-gray-200" />
          {["경기", "구단", "미디어", "쇼핑"].map((s) => (
            <div
              key={s}
              className="bg-white border border-gray-100 rounded p-0.5 flex flex-col gap-0.5"
            >
              <div className="h-1.5 w-8 bg-gray-200 rounded-full" />
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex justify-between items-center">
                  <div className="h-1 w-10 bg-gray-100 rounded-full" />
                  <div className="h-1 w-1 bg-gray-200 rounded-full" />
                </div>
              ))}
            </div>
          ))}
        </div>
      )

    default:
      return (
        <div className="flex flex-col gap-1 h-full p-1">
          {bar}
          <div className={`flex-1 ${color} rounded opacity-20`} />
        </div>
      )
  }
}

// ─── Screen card ─────────────────────────────────────────────────────────────

function ScreenCard({
  screen,
  onClick,
}: {
  screen: ScreenMeta
  onClick: () => void
}) {
  const g = GROUP_COLORS[screen.group]

  const dotColor = g.dot

  // Map group dot color to a bg- class for wireframe

  const wireColor: Record<Group, string> = {
    공통: "bg-slate-300",

    홈: "bg-blue-400",

    경기: "bg-green-400",

    "티켓+": "bg-orange-400",

    라운지: "bg-purple-400",

    MY: "bg-rose-400",

    전체메뉴: "bg-teal-400",
  }

  return (
    <button
      onClick={onClick}
      className="group flex flex-col rounded-2xl overflow-hidden border border-[#E5E7EB] hover:border-[#1B5BF0] hover:shadow-lg transition-all duration-150 bg-white text-left"
    >
      {/* Mini screen preview */}
      <div
        className="w-full bg-[#F8F9FC] border-b border-[#E5E7EB]"
        style={{ height: 140 }}
      >
        <MiniWireframe layout={screen.layout} color={wireColor[screen.group]} />
      </div>

      {/* Label area */}
      <div className="px-2.5 py-2 flex flex-col gap-1">
        <div className="flex items-center gap-1.5">
          <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColor}`} />
          <span className={`text-[9px] font-semibold ${g.text}`}>
            {screen.group}
          </span>
        </div>
        <p className="text-[11px] font-semibold text-[#111827] leading-tight line-clamp-2">
          {screen.name}
        </p>
        <p className="text-[9px] text-[#9CA3AF] font-mono">{screen.id}</p>
      </div>
    </button>
  )
}

export function OverviewScreen() {
  const navigate = useNavigate()

  const [activeGroup, setActiveGroup] = useState<"전체" | Group>("전체")

  const [query, setQuery] = useState("")

  const filtered = SCREENS.filter((s) => {
    const matchGroup = activeGroup === "전체" || s.group === activeGroup

    const q = query.toLowerCase()

    const matchQuery =
      !q || s.name.includes(q) || s.id.toLowerCase().includes(q)

    return matchGroup && matchQuery
  })

  const counts: Record<string, number> = { 전체: SCREENS.length }

  GROUPS.forEach((g) => {
    counts[g] = SCREENS.filter((s) => s.group === g).length
  })

  return (
    <div className="min-h-screen bg-[#F5F7FB]">
      {/* Top bar */}
      <div className="sticky top-0 z-20 bg-white border-b border-[#E5E7EB] shadow-sm">
        <div className="flex items-center gap-3 px-4 h-14">
          <button
            onClick={() => navigate(-1)}
            className="w-8 h-8 flex items-center justify-center shrink-0"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 19l-7-7 7-7"
                stroke="#111827"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <div>
            <h1 className="text-[#111827] font-bold text-base leading-tight">
              화면 전체보기
            </h1>
            <p className="text-[10px] text-[#9CA3AF]">
              삼성 라이온즈 · {SCREENS.length} screens
            </p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            {/* Search input */}
            <div className="flex items-center gap-2 h-9 px-3 bg-[#F5F7FB] border border-[#E5E7EB] rounded-xl">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <circle
                  cx="11"
                  cy="11"
                  r="8"
                  stroke="#9CA3AF"
                  strokeWidth="2"
                />
                <path
                  d="M21 21l-4.35-4.35"
                  stroke="#9CA3AF"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="화면 검색…"
                className="text-xs bg-transparent outline-none text-[#111827] placeholder:text-[#9CA3AF] w-24"
              />
            </div>
            <span className="text-xs text-[#9CA3AF] shrink-0">
              {filtered.length}개
            </span>
          </div>
        </div>

        {/* Group filter tabs */}
        <div className="flex overflow-x-auto px-4 pb-2 gap-1.5">
          {ALL_GROUPS.map((g) => {
            const active = g === activeGroup

            const col = g !== "전체" ? GROUP_COLORS[(g as Group)] : null

            return (
              <button
                key={g}
                onClick={() => setActiveGroup(g)}
                className={`shrink-0 flex items-center gap-1.5 h-7 px-3 rounded-full text-xs font-medium border transition-all ${
                  active
                    ? "bg-[#1B5BF0] border-[#1B5BF0] text-white"
                    : "bg-white border-[#E5E7EB] text-[#6B7280] hover:border-[#1B5BF0]/40"
                }`}
              >
                {g !== "전체" && col && !active && (
                  <div className={`w-1.5 h-1.5 rounded-full ${col.dot}`} />
                )}
                {g}
                <span
                  className={`text-[9px] ${
                    active ? "text-white/70" : "text-[#9CA3AF]"
                  }`}
                >
                  {counts[g]}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Grid */}
      <div className="p-4">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="w-12 h-12 rounded-full bg-[#E8EBF4] flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle
                  cx="11"
                  cy="11"
                  r="8"
                  stroke="#9CA3AF"
                  strokeWidth="2"
                />
                <path
                  d="M21 21l-4.35-4.35"
                  stroke="#9CA3AF"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <p className="text-sm text-[#9CA3AF]">검색 결과가 없습니다</p>
          </div>
        ) : (
          <>
            {/* When all groups shown, group by section */}
            {activeGroup === "전체" ? (
              GROUPS.map((group) => {
                const screens = filtered.filter((s) => s.group === group)

                if (screens.length === 0) return null

                const g = GROUP_COLORS[group]

                return (
                  <div key={group} className="mb-8">
                    <div className="flex items-center gap-2 mb-3">
                      <div className={`w-2 h-2 rounded-full ${g.dot}`} />
                      <span className={`text-xs font-bold ${g.text}`}>
                        {group}
                      </span>
                      <span className="text-xs text-[#9CA3AF]">
                        {screens.length}개
                      </span>
                    </div>
                    <div
                      className="grid gap-3"
                      style={{
                        gridTemplateColumns:
                          "repeat(auto-fill, minmax(120px, 1fr))",
                      }}
                    >
                      {screens.map((s) => (
                        <ScreenCard
                          key={s.id}
                          screen={s}
                          onClick={() => navigate(s.path)}
                        />
                      ))}
                    </div>
                  </div>
                )
              })
            ) : (
              <div
                className="grid gap-3"
                style={{
                  gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
                }}
              >
                {filtered.map((s) => (
                  <ScreenCard
                    key={s.id}
                    screen={s}
                    onClick={() => navigate(s.path)}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
