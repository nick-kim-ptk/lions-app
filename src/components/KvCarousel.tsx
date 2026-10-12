import { useRef, useState, useSyncExternalStore } from "react"

import { useNavigate } from "react-router-dom"

import { subscribeNotif, getHasUnread } from "@/data/notifStore"

export interface KvSlide {
  id: number
  badge: string
  badgeColor: string
  hideBadge?: boolean
  bg: string
  title: string
  sub: string
  graphic: string
  graphicBg: string
}

/**
 * 상단 KV 영역 — 홈·라운지 공용. 좌우 스와이프·도트 인디케이터·AD 배지, 위에 떠 있는 GNB(가이드·알림·전체 메뉴) 포함.
 * 슬라이드 내용만 화면별로 다르다.
 */

export function KvCarousel({ slides }: { slides: readonly KvSlide[] }) {
  const navigate = useNavigate()

  const [kvIndex, setKvIndex] = useState(0)

  const touchStartX = useRef(0)

  const hasUnread = useSyncExternalStore(subscribeNotif, getHasUnread)

  return (
      <div
        className="relative w-full h-[374px] overflow-hidden pc-bleed"
        onTouchStart={(e) => {
          touchStartX.current = e.touches[0].clientX
        }}
        onTouchEnd={(e) => {
          const dx = e.changedTouches[0].clientX - touchStartX.current

          if (dx < -40) setKvIndex((i) => Math.min(i + 1, slides.length - 1))

          if (dx > 40) setKvIndex((i) => Math.max(i - 1, 0))
        }}
      >
        {/* Floating GNB */}
        <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 h-14 gap-1 pc-kv-pad">
          <button
            onClick={() => navigate("/case-guide")}
            className="rounded-full border border-dashed border-red-400 bg-black/30 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm"
          >
            가이드
          </button>
          <div className="flex items-center gap-1">
            <button
              onClick={() => navigate("/notifications")}
              className="w-8 h-8 flex items-center justify-center relative lg:hidden"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
              {/* 미확인 알림 Red Dot */}
              {hasUnread && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 ring-1 ring-white/30" />
              )}
            </button>
            <button
              onClick={() => navigate("/all-menu")}
              className="w-8 h-8 flex items-center justify-center lg:hidden"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 6h16M4 12h16M4 18h16"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
        {/* Slides strip */}
        <div
          className="flex h-full transition-transform duration-300 ease-out"
          style={{
            width: `${slides.length * 100}%`,
            transform: `translateX(-${kvIndex * (100 / slides.length)}%)`,
          }}
        >
          {slides.map((slide) => (
            <div
              key={slide.id}
              className={`relative flex-shrink-0 bg-gradient-to-br ${slide.bg}`}
              style={{ width: `${100 / slides.length}%` }}
            >
              {/* BG texture */}
              <div
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(135deg,transparent,transparent 12px,rgba(255,255,255,0.5) 12px,rgba(255,255,255,0.5) 13px)",
                }}
              />

              {/* Graphic */}
              <div
                className={`absolute right-5 top-1/2 -translate-y-1/2 w-28 h-28 rounded-3xl ${slide.graphicBg} flex items-center justify-center pc-kv-right`}
              >
                <span className="text-[72px] leading-none">
                  {slide.graphic}
                </span>
              </div>

              {/* Content — 하단 정렬, 버튼 없음 */}
              <div className="absolute inset-0 flex flex-col justify-end p-5 pb-10 pc-kv-pad">
                {!slide.hideBadge && (
                  <span
                    className={`self-start text-[10px] font-bold text-white ${slide.badgeColor} rounded-full px-2.5 py-0.5 mb-3`}
                  >
                    {slide.badge}
                  </span>
                )}
                <p className="text-white text-[22px] font-black leading-tight mb-2 whitespace-pre-line">
                  {slide.title}
                </p>
                <p className="text-white/60 text-[11px] leading-relaxed">
                  {slide.sub}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* AD badge — 광고 슬라이드일 때만 */}
        {slides[kvIndex].badge === "AD" && (
          <div className="absolute top-3 right-4 bg-black/40 rounded-md px-1.5 py-0.5 backdrop-blur-sm">
            <span className="text-white text-[9px] font-bold tracking-wider">
              AD
            </span>
          </div>
        )}

        {/* Dot indicators */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setKvIndex(i)}
              className={`rounded-full transition-all ${
                i === kvIndex ? "w-4 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>
  )
}
