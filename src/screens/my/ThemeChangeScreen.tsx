import { useState } from "react"

import { Header } from "@/components/Layout"

// 040(042)-SL-MY-13 테마 변경

export function ThemeChangeScreen() {
  const [activeTab, setActiveTab] = useState(0)

  const [selectedIcon, setSelectedIcon] = useState(0)

  const [selectedSplash, setSelectedSplash] = useState(0)

  const [selectedMypage, setSelectedMypage] = useState(0)

  const tabs = ["앱 아이콘", "시작화면", "마이페이지"]

  const iconThemes = [
    { label: "라이온즈1", colors: ["#1B5BF0", "#0E2F80"] },

    { label: "라이온즈2", colors: ["#0E2F80", "#060F2E"] },

    { label: "라이온즈3", colors: ["#3B7BFF", "#1B5BF0"] },

    { label: "구자욱", colors: ["#1F2937", "#111827"] },

    { label: "원태인", colors: ["#E53935", "#B71C1C"] },

    { label: "강민호", colors: ["#F0A500", "#B7791F"] },

    { label: "이재현", colors: ["#10B981", "#065F46"] },

    { label: "김지찬", colors: ["#7C3AED", "#4C1D95"] },

    { label: "오재일", colors: ["#0891B2", "#164E63"] },

    { label: "박병호", colors: ["#DC2626", "#7F1D1D"] },

    { label: "디아즈", colors: ["#059669", "#064E3B"] },

    { label: "최성훈", colors: ["#9333EA", "#581C87"] },
  ]

  const splashThemes = [
    { label: "라이온즈1", bg: "#1B5BF0", accent: "#6EC6FF" },

    { label: "라이온즈2", bg: "#0E2F80", accent: "#1B5BF0" },

    { label: "라이온즈3", bg: "#060F2E", accent: "#3B7BFF" },

    { label: "구자욱", bg: "#1F2937", accent: "#E5E7EB" },

    { label: "원태인", bg: "#B71C1C", accent: "#FCA5A5" },

    { label: "강민호", bg: "#92400E", accent: "#FCD34D" },

    { label: "이재현", bg: "#065F46", accent: "#34D399" },

    { label: "김지찬", bg: "#4C1D95", accent: "#C4B5FD" },

    { label: "오재일", bg: "#164E63", accent: "#67E8F9" },

    { label: "박병호", bg: "#7F1D1D", accent: "#FB7185" },

    { label: "디아즈", bg: "#064E3B", accent: "#6EE7B7" },

    { label: "최성훈", bg: "#581C87", accent: "#D8B4FE" },
  ]

  const mypageThemes = [
    { label: "라이온즈1", headerBg: "#1B5BF0", cardBg: "#EBF0FF" },

    { label: "라이온즈2", headerBg: "#0E2F80", cardBg: "#DBEAFE" },

    { label: "라이온즈3", headerBg: "#3B7BFF", cardBg: "#EFF6FF" },

    { label: "구자욱", headerBg: "#334155", cardBg: "#F1F5F9" },

    { label: "원태인", headerBg: "#B71C1C", cardBg: "#FFE4E6" },

    { label: "강민호", headerBg: "#92400E", cardBg: "#FEF3C7" },

    { label: "이재현", headerBg: "#065F46", cardBg: "#D1FAE5" },

    { label: "김지찬", headerBg: "#4C1D95", cardBg: "#EDE9FE" },

    { label: "오재일", headerBg: "#164E63", cardBg: "#CFFAFE" },

    { label: "박병호", headerBg: "#7F1D1D", cardBg: "#FFE4E6" },

    { label: "디아즈", headerBg: "#064E3B", cardBg: "#D1FAE5" },

    { label: "최성훈", headerBg: "#581C87", cardBg: "#F3E8FF" },
  ]

  const applyBtn = (
    <button className="h-9 px-4 rounded-full bg-[#1B5BF0] text-white text-[13px] font-semibold">
      적용
    </button>
  )

  return (
    <div className="min-h-full bg-[#F5F7FB] pb-4">
      {/* 모바일: 헤더 우측 "적용" / PC: 제목 줄 우측 "적용". PC는 앱 아이콘·시작화면(앱 전용)을 빼고 마이페이지 테마만 노출 */}
      <div className="lg:hidden">
        <Header title="테마 변경" rightSlot={applyBtn} />
      </div>

      <div className="hidden lg:flex items-center justify-between px-4 pt-6">
        <h1 className="text-[20px] font-bold text-[#111827]">테마 변경</h1>
        {applyBtn}
      </div>

      {/* Tab bar */}
      <div className="flex border-b border-[#DDE1EC] bg-white lg:hidden">
        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === i
                ? "border-[#1B5BF0] text-[#1B5BF0]"
                : "border-transparent text-[#64748B]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 앱 아이콘 탭 */}
      {activeTab === 0 && (
        <div className="px-4 pt-4 lg:hidden">
          <div className="grid grid-cols-3 gap-3">
            {iconThemes.slice(0, 6).map((theme, i) => (
              <button
                key={i}
                onClick={() => setSelectedIcon(i)}
                className={`rounded-2xl border-2 overflow-hidden text-left transition-colors ${
                  selectedIcon === i ? "border-[#1B5BF0]" : "border-[#DDE1EC]"
                }`}
              >
                <div
                  className="w-full aspect-square flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${theme.colors[0]}, ${theme.colors[1]})`,
                  }}
                >
                  {/* 라이온 실루엣 */}
                  <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                    <circle
                      cx="22"
                      cy="18"
                      r="9"
                      fill="white"
                      fillOpacity="0.25"
                    />
                    <ellipse
                      cx="22"
                      cy="32"
                      rx="13"
                      ry="8"
                      fill="white"
                      fillOpacity="0.18"
                    />
                    <circle
                      cx="22"
                      cy="17"
                      r="6"
                      fill="white"
                      fillOpacity="0.9"
                    />
                    <ellipse
                      cx="22"
                      cy="28"
                      rx="8"
                      ry="5"
                      fill="white"
                      fillOpacity="0.7"
                    />
                    <circle cx="19" cy="16" r="1.2" fill={theme.colors[1]} />
                    <circle cx="25" cy="16" r="1.2" fill={theme.colors[1]} />
                    <path
                      d="M20 19.5 Q22 21 24 19.5"
                      stroke={theme.colors[1]}
                      strokeWidth="1"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </svg>
                </div>
                <div className="px-2 py-1.5 bg-white">
                  <span className="text-[11px] font-medium text-[#111827]">
                    {theme.label}
                  </span>
                  {selectedIcon === i && (
                    <span className="ml-1 text-[10px] text-[#1B5BF0]">✓</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 시작화면 탭 */}
      {activeTab === 1 && (
        <div className="px-4 pt-4 lg:hidden">
          <div className="grid grid-cols-3 gap-3">
            {splashThemes.slice(0, 6).map((theme, i) => (
              <button
                key={i}
                onClick={() => setSelectedSplash(i)}
                className={`rounded-2xl border-2 overflow-hidden text-left transition-colors ${
                  selectedSplash === i ? "border-[#1B5BF0]" : "border-[#DDE1EC]"
                }`}
              >
                {/* 스플래시 미리보기 — 세로 비율 */}
                <div
                  className="w-full relative overflow-hidden flex flex-col items-center justify-center gap-1.5 py-5"
                  style={{ background: theme.bg, aspectRatio: "9/14" }}
                >
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center"
                    style={{
                      background: theme.accent + "33",
                      border: `1.5px solid ${theme.accent}55`,
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 44 44" fill="none">
                      <circle
                        cx="22"
                        cy="17"
                        r="6"
                        fill={theme.accent}
                        fillOpacity="0.9"
                      />
                      <ellipse
                        cx="22"
                        cy="28"
                        rx="8"
                        ry="5"
                        fill={theme.accent}
                        fillOpacity="0.7"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col items-center gap-0.5">
                    <div
                      className="h-1.5 w-14 rounded-full"
                      style={{ background: theme.accent + "AA" }}
                    />
                    <div
                      className="h-1 w-10 rounded-full"
                      style={{ background: theme.accent + "55" }}
                    />
                  </div>
                  {/* 하단 로딩 바 */}
                  <div
                    className="absolute bottom-3 w-10 h-0.5 rounded-full"
                    style={{ background: theme.accent + "66" }}
                  />
                </div>
                <div className="px-2 py-1.5 bg-white">
                  <span className="text-[11px] font-medium text-[#111827]">
                    {theme.label}
                  </span>
                  {selectedSplash === i && (
                    <span className="ml-1 text-[10px] text-[#1B5BF0]">✓</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 마이페이지 탭 */}
      <div className={`px-4 pt-4 ${activeTab === 2 ? "" : "max-lg:hidden"}`}>
          <div className="grid grid-cols-3 gap-3 lg:grid-cols-[repeat(auto-fill,184px)]">
            {mypageThemes.slice(0, 6).map((theme, i) => (
              <button
                key={i}
                onClick={() => setSelectedMypage(i)}
                className={`rounded-2xl border-2 overflow-hidden text-left transition-colors ${
                  selectedMypage === i ? "border-[#1B5BF0]" : "border-[#DDE1EC]"
                }`}
              >
                {/* 마이페이지 미니 미리보기 */}
                <div
                  className="w-full bg-[#F5F7FB]"
                  style={{ aspectRatio: "9/14" }}
                >
                  {/* 헤더 */}
                  <div
                    className="h-8 flex items-center px-2 gap-1.5"
                    style={{ background: theme.headerBg }}
                  >
                    <div className="w-4 h-4 rounded-full bg-white/30" />
                    <div className="h-1.5 w-8 rounded-full bg-white/50" />
                  </div>
                  {/* 프로필 카드 */}
                  <div
                    className="mx-1.5 -mt-2 rounded-lg p-1.5"
                    style={{ background: theme.cardBg }}
                  >
                    <div className="flex items-center gap-1">
                      <div
                        className="w-5 h-5 rounded-full"
                        style={{ background: theme.headerBg + "55" }}
                      />
                      <div className="flex flex-col gap-0.5">
                        <div className="h-1 w-8 rounded-full bg-[#111827]/30" />
                        <div className="h-0.5 w-5 rounded-full bg-[#111827]/20" />
                      </div>
                    </div>
                  </div>
                  {/* 멤버십 카드 */}
                  <div
                    className="mx-1.5 mt-1.5 rounded-lg p-1.5"
                    style={{ background: theme.headerBg }}
                  >
                    <div className="h-1 w-10 rounded-full bg-white/40 mb-1" />
                    <div className="h-1 w-6 rounded-full bg-white/25" />
                  </div>
                  {/* 메뉴 리스트 */}
                  <div className="mx-1.5 mt-1.5 rounded-lg bg-white p-1.5 flex flex-col gap-1">
                    {[10, 8, 10].map((w, j) => (
                      <div
                        key={j}
                        className="h-0.5 rounded-full bg-[#DDE1EC]"
                        style={{ width: `${w * 4}px` }}
                      />
                    ))}
                  </div>
                </div>
                <div className="px-2 py-1.5 bg-white">
                  <span className="text-[11px] font-medium text-[#111827]">
                    {theme.label}
                  </span>
                  {selectedMypage === i && (
                    <span className="ml-1 text-[10px] text-[#1B5BF0]">✓</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
    </div>
  )
}
