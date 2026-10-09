import React, { useEffect } from "react"

import { useNavigate, useLocation } from "react-router-dom"

import { PH } from "@/components/Placeholder"

import { ALL_MENU_SECTIONS } from "@/data/allMenu"

import { FOOTER_COPYRIGHT, FOOTER_INFO } from "@/data/footer"

// 055(057)-SL-AL-01 전체 메뉴 — 2분할 레이아웃

export function AllMenuScreen() {
  const navigate = useNavigate()

  const location = useLocation()

  const initialSection = Number(
    new URLSearchParams(location.search).get("tab") ?? "0",
  )

  const [activeSection, setActiveSection] = React.useState(
    isNaN(initialSection) ? 0 : initialSection,
  )

  useEffect(() => {
    const params = new URLSearchParams(location.search)

    const tab = Number(params.get("tab") ?? "0")

    if (!isNaN(tab)) setActiveSection((prev) => (prev !== tab ? tab : prev))
  }, [location.search])

  function selectSection(i: number) {
    setActiveSection(i)

    const params = new URLSearchParams(location.search)

    params.set("tab", String(i))

    navigate({ search: params.toString() }, { replace: true })
  }

  function navTo(path: string) {
    const hashIdx = path.indexOf("#")

    if (hashIdx !== -1) {
      navigate({ pathname: path.slice(0, hashIdx), hash: path.slice(hashIdx) })
    } else {
      navigate(path)
    }
  }

  const sections = ALL_MENU_SECTIONS

  return (
    <div className="min-h-screen bg-[#F5F7FB] flex flex-col">
      <div className="sticky top-0 z-20 flex items-center justify-between px-4 h-14 bg-[#F5F7FB]/95 backdrop-blur-sm border-b border-[#DDE1EC]">
        <span className="text-[#111827] font-bold text-lg">전체 메뉴</span>
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 flex items-center justify-center"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M18 6L6 18M6 6l12 12"
              stroke="#111827"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* Two-panel split */}
      <div className="flex flex-1">
        {/* Left: Category list */}
        <div className="w-24 shrink-0 bg-[#FFFFFF] border-r border-[#DDE1EC] flex flex-col">
          {sections.map((s, i) => (
            <button
              key={s.title}
              onClick={() => selectSection(i)}
              className={`w-full py-5 flex flex-col items-center gap-1.5 border-b border-[#DDE1EC] transition-colors ${
                activeSection === i
                  ? "bg-[#EBF0FF] border-r-2 border-r-[#1B5BF0]"
                  : "hover:bg-[#F5F7FB]"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-xl ${
                  activeSection === i ? "bg-[#1B5BF0]" : "bg-[#E8EBF4]"
                } flex items-center justify-center`}
              >
                <PH
                  className={`w-4 h-4 rounded-md ${
                    activeSection === i ? "bg-white/40" : ""
                  }`}
                />
              </div>
              <span
                className={`text-[11px] font-medium text-center leading-tight ${
                  activeSection === i ? "text-[#1B5BF0]" : "text-[#64748B]"
                }`}
              >
                {s.title}
              </span>
            </button>
          ))}
        </div>

        {/* Right: Submenu items */}
        <div className="flex-1 bg-[#F5F7FB] overflow-y-auto">
          <div className="p-3 pb-8 flex flex-col gap-1">
            {sections[activeSection].items.length > 0 && (
              <p className="text-[10px] text-[#9CA3AF] font-semibold uppercase tracking-widest px-2 py-2">
                {sections[activeSection].title}
              </p>
            )}
            {sections[activeSection].items.map((item) => {
              const hasSub = !!(item.sub && item.sub.length > 0)

              return (
                <div key={item.label} className="mb-1">
                  <button
                    onClick={hasSub ? undefined : () => navTo(item.path)}
                    className={`w-full flex items-center justify-between px-3 py-3.5 bg-[#FFFFFF] rounded-xl border border-[#DDE1EC] text-left ${
                      hasSub ? "cursor-default" : ""
                    }`}
                  >
                    <span className="text-sm text-[#111827]">{item.label}</span>
                    {!hasSub &&
                      (item.external ? (
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"
                            stroke="#9CA3AF"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                          <path
                            d="M15 3h6v6M10 14L21 3"
                            stroke="#9CA3AF"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : (
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M9 18l6-6-6-6"
                            stroke="#9CA3AF"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                      ))}
                  </button>
                  {hasSub && (
                    <div className="flex flex-col gap-0.5 ml-3 mt-0.5">
                      {item.sub!.map((sub) => (
                        <button
                          key={sub.label}
                          onClick={() => navTo(sub.path)}
                          className="w-full flex items-center justify-between px-3 py-2.5 bg-[#F0F2F8] rounded-lg border border-[#DDE1EC] text-left"
                        >
                          <span className="text-[12px] text-[#64748B]">
                            {sub.label}
                          </span>
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M9 18l6-6-6-6"
                              stroke="#C4C9D6"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
            {/* 추가 그룹 (예: 샵) */}
            {sections[activeSection].groups?.map((group) => (
              <div key={group.title} className="mt-3">
                <p className="text-[10px] text-[#9CA3AF] font-semibold uppercase tracking-widest px-2 py-2">
                  {group.title}
                </p>
                {group.items.map((item) => (
                  <div key={item.label} className="mb-1">
                    <button
                      onClick={() => navTo(item.path)}
                      className="w-full flex items-center justify-between px-3 py-3.5 bg-[#FFFFFF] rounded-xl border border-[#DDE1EC] text-left"
                    >
                      <span className="flex items-center gap-2 text-sm text-[#111827]">
                        {item.label}
                        {item.badge && (
                          <span className="rounded-full bg-[#EBF0FF] px-2 py-0.5 text-[9px] font-bold text-[#1B5BF0]">
                            {item.badge}
                          </span>
                        )}
                      </span>
                      {item.external ? (
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"
                            stroke="#9CA3AF"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                          <path
                            d="M15 3h6v6M10 14L21 3"
                            stroke="#9CA3AF"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : (
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M9 18l6-6-6-6"
                            stroke="#9CA3AF"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            ))}

            {/* 구단 정보 — 라이온즈 메뉴 하단 (모바일 푸터 대체) */}
            {sections[activeSection].title === "라이온즈" && (
              <div className="mt-4 px-2 flex flex-col gap-0.5 text-[10px] leading-relaxed text-[#9CA3AF]">
                {FOOTER_INFO.map((t) => (
                  <span key={t}>{t}</span>
                ))}
                <span className="mt-1">{FOOTER_COPYRIGHT}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
