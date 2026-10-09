import { useNavigate } from "react-router-dom"

import { useState, useEffect } from "react"

import { MOCK_TODAY, fmtDotYMD, weekdayOf } from "@/data/mock"

// 023(025)-SL-LG-06 나의 승리 운세

export function FortuneScreen() {
  const navigate = useNavigate()

  const [phase, setPhase] = useState<"loading" | "card">("loading")

  const [progress, setProgress] = useState(0)

  const dateStr = fmtDotYMD(MOCK_TODAY)

  const dayKo = weekdayOf(MOCK_TODAY)

  useEffect(() => {
    const tick = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(tick)
          setTimeout(() => setPhase("card"), 300)
          return 100
        }

        return p + 3
      })
    }, 40)

    return () => clearInterval(tick)
  }, [])

  return (
    <div className="fixed inset-0 lg:inset-x-auto lg:left-1/2 lg:-translate-x-1/2 lg:w-full lg:max-w-[1440px] bg-[#070e22] flex flex-col overflow-hidden">
      {phase === "loading" ? (
        /* ── 로딩 — 풀스크린 ── */

        <div className="flex-1 flex flex-col items-center justify-center gap-8 px-8 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-[#1B5BF0]/10 blur-3xl pointer-events-none" />
          {/* 닫기 버튼 */}
          <button
            onClick={() => navigate(-1)}
            className="absolute top-12 right-5 w-9 h-9 rounded-full bg-white/10 flex items-center justify-center z-10"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <div className="relative flex items-center justify-center">
            <svg width="160" height="160">
              <circle
                cx="80"
                cy="80"
                r="68"
                fill="none"
                stroke="white"
                strokeWidth="1"
                strokeOpacity="0.06"
              />
              <circle
                cx="80"
                cy="80"
                r="68"
                fill="none"
                stroke="url(#grad)"
                strokeWidth="3"
                strokeDasharray={`${(2 * Math.PI * 68 * progress) / 100} 999`}
                strokeLinecap="round"
                transform="rotate(-90 80 80)"
              />
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#1B5BF0" />
                  <stop offset="100%" stopColor="#F0A500" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute flex flex-col items-center gap-1">
              <span className="text-4xl">🔮</span>
              <span className="text-white text-[17px] font-black">
                {progress}%
              </span>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2 text-center">
            <p className="text-white font-bold text-[20px]">
              오늘의 궁합 선수를 찾는 중
            </p>
            <p className="text-white/40 text-[13px]">
              블루블러드 님의 사자 기운을 분석하고 있어요
            </p>
          </div>
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute text-[#F0A500] animate-pulse select-none pointer-events-none"
              style={{
                top: `${8 + i * 11}%`,
                left: `${4 + i * 12}%`,

                fontSize: `${7 + (i % 3) * 5}px`,
                opacity: 0.25 + (i % 3) * 0.15,

                animationDelay: `${i * 0.25}s`,
              }}
            >
              ★
            </div>
          ))}
        </div>
      ) : (
        /* ── 카드 — 풀스크린 ── */

        <>
          {/* 저장용 카드 영역 — 상단 2/3 */}
          <div className="relative flex-1 min-h-0 overflow-hidden">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(160deg,#1B3A80 0%,#0E1A40 45%,#070e22 100%)",
              }}
            >
              {/* 등번호 워터마크 */}
              <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                <span
                  className="text-[260px] font-black leading-none select-none"
                  style={{ color: "rgba(255,255,255,0.04)", marginTop: 60 }}
                >
                  53
                </span>
              </div>
              {/* 글로우 */}
              <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-[#1B5BF0]/15 blur-3xl pointer-events-none" />
              {/* 사자 이모지 */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
                <div
                  className="flex flex-col items-center justify-end"
                  style={{ width: 220, height: 300 }}
                >
                  <div
                    className="w-full h-full rounded-t-full flex items-end justify-center pb-6"
                    style={{
                      background:
                        "linear-gradient(to bottom, rgba(27,90,240,0.22) 0%, transparent 100%)",
                    }}
                  >
                    <span style={{ fontSize: 100, lineHeight: 1 }}>🦁</span>
                  </div>
                </div>
              </div>
              {/* 별 파티클 */}
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute text-[#F0A500] animate-pulse select-none pointer-events-none"
                  style={{
                    top: `${8 + i * 14}%`,
                    left: `${5 + i * 16}%`,
                    fontSize: `${6 + (i % 3) * 4}px`,
                    opacity: 0.3,
                    animationDelay: `${i * 0.35}s`,
                  }}
                >
                  ★
                </div>
              ))}
            </div>

            {/* 우측 상단 닫기 */}
            <button
              onClick={() => navigate(-1)}
              className="absolute top-12 right-5 z-20 w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 6L6 18M6 6l12 12"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            {/* 상단 날짜 + 뱃지 */}
            <div className="absolute top-12 left-5 z-20 flex flex-col gap-0.5">
              <p className="text-white/40 text-[10px] font-medium tracking-wider">
                나의 궁합 선수
              </p>
              <p className="text-white text-[13px] font-bold">
                {dateStr} ({dayKo})
              </p>
              <div className="flex items-center gap-1.5 mt-1.5">
                <span className="text-[10px] font-bold text-white bg-white/20 rounded-full px-2 py-0.5">
                  홈
                </span>
                <span className="text-white/70 text-[12px] font-semibold">
                  VS 롯데 자이언츠
                </span>
              </div>
            </div>

            {/* 하단 그라디언트 페이드 */}
            <div
              className="absolute bottom-0 inset-x-0 h-3/4 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to top,#070e22 0%,#070e22cc 40%,transparent 100%)",
              }}
            />

            {/* 선수명 + 궁합 점수 오버레이 */}
            <div className="absolute bottom-4 inset-x-0 px-5 flex items-end justify-between">
              <div>
                <p className="text-white/50 text-[11px] mb-0.5">
                  블루블러드 💙
                </p>
                <p className="text-white text-[38px] font-black leading-none tracking-tight">
                  김영웅
                </p>
                <p className="text-white/40 text-[12px] mt-1">외야수 · #53</p>
              </div>
              <div className="flex flex-col items-end leading-none">
                <span className="text-[10px] text-[#F0A500]/70 font-bold tracking-widest mb-0.5">
                  MATCH
                </span>
                <div className="flex items-end gap-0.5">
                  <span className="text-[#F0A500] text-[56px] font-black leading-none">
                    92
                  </span>
                  <span className="text-[#F0A500] text-[18px] font-bold pb-1">
                    점
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 하단 정보 패널 */}
          <div className="bg-[#070e22] px-5 pt-4 pb-10 flex flex-col gap-3.5 shrink-0">
            {/* 궁합 바 */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-white/40 text-[11px]">
                  오늘의 궁합 지수
                </span>
                <span className="text-[#F0A500] text-[11px] font-bold">
                  최상 🔥
                </span>
              </div>
              <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: "92%",
                    background:
                      "linear-gradient(to right,#1B5BF0,#6EC6FF,#F0A500)",
                  }}
                />
              </div>
            </div>

            {/* 핵심 카피 */}
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 flex flex-col gap-2">
              <p className="text-white text-[13px] font-bold leading-snug">
                블루블러드 님의 직관에서
                <br />
                <span className="text-[#6EC6FF]">유독 강한 모습</span>을 보여준
                선수예요 ⚾
              </p>

              {/* 3가지 타율 스탯 뱃지 */}
              <div className="flex gap-2 flex-wrap">
                {[
                  { label: "직관 경기 타율", val: ".375", color: "#F0A500" },

                  { label: "KT 상대 타율", val: ".333", color: "#6EC6FF" },

                  { label: "최근 5경기 타율", val: ".400", color: "#4ADE80" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="flex flex-col items-center px-3 py-1.5 rounded-xl bg-white/8 border border-white/10 min-w-0"
                  >
                    <span
                      className="font-black text-[17px] leading-none"
                      style={{ color: s.color }}
                    >
                      {s.val}
                    </span>
                    <span className="text-white/40 text-[9px] mt-0.5 whitespace-nowrap">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>

              <p className="text-white/20 text-[9px] font-bold tracking-widest pt-1.5 border-t border-white/10">
                SAMSUNG LIONS · 2026
              </p>
            </div>

            {/* 액션 버튼 */}
            <div className="flex gap-2.5">
              <button
                onClick={() => alert("이미지가 저장되었습니다.")}
                className="flex-1 py-3.5 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center gap-2 active:bg-white/20 transition-colors"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-white text-[13px] font-semibold">
                  이미지 저장
                </span>
              </button>
              <button
                onClick={() => alert("스토리 공유 기능은 준비 중입니다.")}
                className="flex-1 py-3.5 rounded-2xl bg-[#1B5BF0] flex items-center justify-center gap-2 active:bg-[#154EC8] transition-colors"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <circle cx="18" cy="5" r="3" stroke="white" strokeWidth="2" />
                  <circle cx="6" cy="12" r="3" stroke="white" strokeWidth="2" />
                  <circle
                    cx="18"
                    cy="19"
                    r="3"
                    stroke="white"
                    strokeWidth="2"
                  />
                  <path
                    d="M8.59 13.51l6.83 3.98M15.41 6.51L8.59 10.49"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="text-white text-[13px] font-semibold">
                  스토리 공유
                </span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
