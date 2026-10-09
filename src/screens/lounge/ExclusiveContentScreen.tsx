import { useNavigate } from "react-router-dom"

import { useState } from "react"

// 019(021)-SL-LG-02 독점 콘텐츠 — 24시간 한정, 선수 깜짝 제공

export function ExclusiveContentScreen() {
  const navigate = useNavigate()

  const [closed, setClosed] = useState(false)

  if (closed) {
    return (
      <div className="min-h-full bg-[#0A0A0A] flex flex-col items-center justify-center gap-4">
        <p className="text-white/40 text-sm">
          오늘의 독점 콘텐츠를 닫았습니다.
        </p>
        <button
          onClick={() => setClosed(false)}
          className="text-[#1B5BF0] text-sm font-semibold"
        >
          다시 보기
        </button>
        <button
          onClick={() => navigate(-1)}
          className="text-white/30 text-xs mt-2"
        >
          뒤로가기
        </button>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 lg:inset-x-auto lg:left-1/2 lg:-translate-x-1/2 lg:w-full lg:max-w-[1440px] bg-[#0A0A0A] flex flex-col overflow-hidden">
      {/* Full-screen video area */}
      <div className="relative flex-1 bg-[#111111]">
        {/* Video placeholder — full bleed */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A2E] via-[#16213E] to-[#0F3460]" />

        {/* Play indicator overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-sm">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {/* Scan lines texture */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.3) 2px, rgba(255,255,255,0.3) 3px)",
          }}
        />

        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-5 pt-12 pb-4 bg-gradient-to-b from-black/60 to-transparent">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-white bg-[#1B5BF0] rounded-full px-2.5 py-0.5 tracking-wide">
              EXCLUSIVE
            </span>
            <div className="flex items-center gap-1 bg-black/40 rounded-full px-2.5 py-0.5">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="#F0A500"
                  strokeWidth="2"
                />
                <path
                  d="M12 6v6l4 2"
                  stroke="#F0A500"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <span className="text-[11px] text-[#F0A500] font-semibold">
                23:47 남음
              </span>
            </div>
          </div>
          {/* Close button */}
          <button
            onClick={() => navigate("/lounge")}
            className="w-9 h-9 rounded-full bg-black/50 border border-white/20 flex items-center justify-center backdrop-blur-sm"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Progress bar (video scrubber) */}
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-4">
          <div className="w-full h-[2px] bg-white/20 rounded-full mb-3">
            <div className="h-full w-1/3 bg-white rounded-full" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-white/50 text-[11px]">0:42</span>
            <span className="text-white/50 text-[11px]">2:18</span>
          </div>
        </div>
      </div>

      {/* Bottom info panel */}
      <div className="bg-[#111111] px-5 pt-5 pb-10 flex flex-col gap-4">
        {/* Player + gift tag */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-[#1B5BF0]/20 border-2 border-[#1B5BF0]/50 flex items-center justify-center shrink-0">
            <span className="text-white text-[13px] font-bold">29</span>
          </div>
          <div>
            <p className="text-white font-bold text-[15px]">
              원태인 선수의 10승 싸인이 도착했습니다! 🎉
            </p>
            <p className="text-white/40 text-[11px] mt-0.5">
              오늘 자정까지만 확인할 수 있어요
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="text-white/60 text-[13px] leading-relaxed">
          시즌 10승을 자축하며 팬 여러분께 직접 메시지와 함께 싸인 영상을
          보내왔습니다. 오직 삼성 라이온즈 앱에서만 만날 수 있는 순간입니다.
        </p>

        {/* Actions */}
        <div className="flex gap-2">
          <button className="h-10 px-4 rounded-xl bg-[#1B5BF0] text-white font-semibold text-[13px] flex items-center gap-1.5 shrink-0">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 15V3M7 8l5-5 5 5"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            저장
          </button>
          <button className="h-10 px-4 rounded-xl bg-white/10 border border-white/20 flex items-center gap-1.5 shrink-0">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
            <span className="text-white text-[13px] font-semibold">공유</span>
          </button>
          <button
            className="flex-1 h-10 rounded-xl flex items-center justify-center gap-1.5"
            style={{
              background: "linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            <span className="text-white text-[13px] font-semibold">
              스토리 올리기
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
