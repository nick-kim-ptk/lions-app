import React, { useEffect } from "react"

import { useNavigate, useLocation } from "react-router-dom"

import { PH } from "@/components/Placeholder"

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

  const sections: {
    title: string

    items: {
      label: string
      path: string
      external?: boolean
      badge?: string
      sub?: { label: string path: string external?: boolean }[]
    }[]

    groups?: {
      title: string
      items: { label: string path: string external?: boolean badge?: string }[]
    }[]
  }[] = [
    {
      title: "게임",

      items: [],

      groups: [
        {
          title: "경기",

          items: [
            { label: "경기 일정", path: "/game/schedule" },

            { label: "경기/선수 기록", path: "/game/stats" },

            { label: "프리뷰", path: "/all/preview-list" },
          ],
        },

        {
          title: "구장",

          items: [
            { label: "라팍 정보", path: "/game/stadium" },

            { label: "라이온즈 VR", path: "/game/vr" },

            { label: "라이온즈 원정대", path: "/game/away" },
          ],
        },

        {
          title: "콘텐츠",

          items: [
            { label: "라이온즈 뉴스", path: "/game/news" },

            { label: "라이온즈 매거진", path: "/game/magazine" },
          ],
        },
      ],
    },

    {
      title: "티켓+",

      items: [
        { label: "티켓 예매", path: "/ticket" },

        { label: "예매 내역", path: "/my/booking-history" },

        { label: "이용 안내", path: "/my/booking-guide" },

        { label: "티켓 선물하기", path: "/my/ticket-gift" },
      ],
    },

    {
      title: "라운지",

      items: [],

      groups: [
        {
          title: "응원",

          items: [
            { label: "독점 콘텐츠", path: "/lounge/exclusive" },

            { label: "디지털 굿즈", path: "/lounge/digital-goods" },

            { label: "나의 승리 운세", path: "/lounge/fortune" },

            { label: "블루메이트 1기", path: "/lounge/sns" },
          ],
        },

        {
          title: "참여",

          items: [
            { label: "오늘의 미션", path: "/lounge#mission" },

            { label: "엘도라도 ZONE", path: "/lounge/eldorado" },

            { label: "디지털 피켓", path: "/lounge/cheer-board" },

            { label: "블루 시그널", path: "/lounge/blue-signal" },
          ],
        },
      ],
    },

    {
      title: "라이온즈",

      items: [],

      groups: [
        {
          title: "팀",

          items: [
            { label: "구단 소개", path: "/all/about" },

            { label: "선수단 소개", path: "/all/players" },

            { label: "응원단 소개", path: "/all/cheer-squad" },
          ],
        },

        {
          title: "구단 BI",

          items: [
            { label: "구단 앰블럼", path: "/all/emblem" },

            { label: "구단 로고", path: "/all/logo" },

            { label: "구단 마스코트", path: "/all/mascot" },

            { label: "캐치프레이즈", path: "/all/catchphrase" },
          ],
        },

        {
          title: "구장 소개",

          items: [
            { label: "대구삼성라이온즈파크", path: "/game/stadium" },

            { label: "경산볼파크", path: "/all/gyeongsan-park" },
          ],
        },

        {
          title: "역사관",

          items: [
            { label: "구단 연혁", path: "/all/history" },

            { label: "역대 감독", path: "/all/past-managers" },

            { label: "라이온즈 21", path: "/all/lions-21" },

            { label: "히스토리", path: "/all/history-moments" },
          ],
        },

        {
          title: "파트너",

          items: [{ label: "라이온즈 파트너", path: "/all/partners" }],
        },
      ],
    },

    {
      title: "소식/안내",

      items: [],

      groups: [
        {
          title: "소식",

          items: [
            { label: "공지사항", path: "/all/notice-list" },

            { label: "이벤트", path: "/all/event-list" },

            {
              label: "PRESS 센터",
              path: "/all/media-press-center",
              badge: "언론사 전용",
            },

            {
              label: "이슈와 팩트",
              path: "/all/press-center",
              badge: "언론사 전용",
            },
          ],
        },

        {
          title: "구단",

          items: [
            { label: "구단 소식", path: "/all/club-news" },

            { label: "외부감사 보고서", path: "/all/audit-report" },

            {
              label: "언론 사진 자료실",
              path: "/all/news-list",
              external: true,
            },
          ],
        },

        {
          title: "안내",

          items: [{ label: "FAQ", path: "/all/faq" }],
        },
      ],
    },
  ]

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
          </div>
        </div>
      </div>
    </div>
  )
}
