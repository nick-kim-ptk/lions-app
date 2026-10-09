import { useNavigate } from "react-router-dom"

import React from "react"

import { Page } from "@/components/Layout"

// 003-SL-CM-03 팝업(공지) — 3가지 형태 스와이프 캐러셀

export function NoticePopupScreen() {
  const navigate = useNavigate()

  const [current, setCurrent] = React.useState(0)

  const total = 3

  const touchStartX = React.useRef(0)

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX
  }

  function onTouchEnd(e: React.TouchEvent) {
    const dx = e.changedTouches[0].clientX - touchStartX.current

    if (dx < -40 && current < total - 1) setCurrent((c) => c + 1)

    if (dx > 40 && current > 0) setCurrent((c) => c - 1)
  }

  // Dots — always at same position

  const Dots = ({ dark }: { dark?: boolean }) => (
    <div className="flex items-center justify-center gap-1.5 py-3">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => setCurrent(i)}
          className={`rounded-full transition-all ${
            i === current
              ? dark
                ? "w-4 h-1.5 bg-white"
                : "w-4 h-1.5 bg-[#1B5BF0]"
              : dark
                ? "w-1.5 h-1.5 bg-white/40"
                : "w-1.5 h-1.5 bg-[#DDE1EC]"
          }`}
        />
      ))}
    </div>
  )

  const ActionsRow = ({ dark }: { dark?: boolean }) => (
    <div
      className={`flex border-t ${
        dark ? "border-white/10" : "border-[#DDE1EC]"
      }`}
    >
      <button
        className={`flex-1 py-4 text-sm ${
          dark ? "text-white/50" : "text-[#64748B]"
        }`}
      >
        오늘 하루 보지 않기
      </button>
      <div className={`w-px ${dark ? "bg-white/10" : "bg-[#DDE1EC]"}`} />
      <button
        onClick={() => navigate("/home")}
        className={`flex-1 py-4 text-sm font-semibold ${
          dark ? "text-white" : "text-[#1B5BF0]"
        }`}
      >
        확인
      </button>
    </div>
  )

  return (
    <Page className="justify-center items-center">
      <div
        className="absolute inset-0 bg-black/70"
        onClick={() => navigate("/home")}
      />

      {/* 고정 높이 컨테이너 — 높이 흔들림 없음 */}
      <div
        className="relative z-10 w-[340px]"
        style={{ height: 480 }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* ── 형태 1: 썸네일 + 텍스트 ── */}
        <div
          className={`absolute inset-0 transition-opacity duration-300 ${
            current === 0
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="w-full h-full bg-[#FFFFFF] rounded-3xl overflow-hidden border border-[#DDE1EC] flex flex-col">
            {/* 상단 썸네일 — 이미지만, 텍스트 없음 */}
            <div className="relative overflow-hidden" style={{ height: 260 }}>
              <div className="absolute inset-0 bg-gradient-to-b from-[#1B5BF0] via-[#0E2F80] to-[#0A1A4A]" />
              {/* 장식 요소만 */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(135deg,transparent,transparent 20px,rgba(255,255,255,0.4) 20px,rgba(255,255,255,0.4) 21px)",
                }}
              />
              <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full bg-white/5" />
              <div className="absolute -left-6 bottom-0 w-32 h-32 rounded-full bg-white/5" />
            </div>
            {/* 하단 텍스트 */}
            <div className="flex-1 px-5 pt-4 pb-0 flex flex-col gap-1.5">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[11px] text-[#9CA3AF]">2026.09.19</span>
              </div>
              <p className="text-[14px] font-bold text-[#111827] leading-snug">
                9월 27일 키즈런 이벤트 접수 안내
              </p>
              <p className="text-[12px] text-[#64748B] leading-relaxed">
                이번 키즈런은 금년 시즌 마지막으로 진행되는 키즈런으로, 선정
                인원을 999명으로 확대했습니다.
              </p>
            </div>
            <Dots />
            <ActionsRow />
          </div>
        </div>

        {/* ── 형태 2: 풀 썸네일 ── */}
        <div
          className={`absolute inset-0 transition-opacity duration-300 ${
            current === 1
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="w-full h-full rounded-3xl overflow-hidden border border-white/20 flex flex-col relative">
            {/* 풀 배경 이미지 */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A2E] via-[#16213E] to-[#0F3460]" />
            <div className="absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-black/80 to-transparent" />
            {/* 콘텐츠 */}
            <div className="relative flex-1 flex flex-col justify-between p-5">
              <div />
              <div className="flex flex-col gap-1.5">
                <p className="text-white text-[20px] font-black leading-snug drop-shadow-lg">
                  9월 27일
                  <br />
                  키즈런 이벤트
                  <br />
                  접수 안내
                </p>
                <p className="text-white/60 text-[12px]">
                  2026.09.27 (일) 라이온즈 파크
                </p>
              </div>
            </div>
            {/* 점 + 액션 — 반투명 */}
            <div className="relative">
              <Dots dark />
              <div className="flex border-t border-white/10">
                <button className="flex-1 py-4 text-sm text-white/50">
                  오늘 하루 보지 않기
                </button>
                <div className="w-px bg-white/10" />
                <button
                  onClick={() => navigate("/home")}
                  className="flex-1 py-4 text-sm font-semibold text-white"
                >
                  확인
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── 형태 3: 텍스트만 ── */}
        <div
          className={`absolute inset-0 transition-opacity duration-300 ${
            current === 2
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="w-full h-full bg-[#FFFFFF] rounded-3xl overflow-hidden border border-[#DDE1EC] flex flex-col">
            <div className="flex-1 px-6 pt-7 pb-0 flex flex-col gap-3 overflow-hidden">
              {/* 태그 + 날짜 */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-[#9CA3AF]">2026.09.19</span>
              </div>
              {/* 제목 */}
              <p className="text-[17px] font-black text-[#111827] leading-snug">
                9월 27일 키즈런
                <br />
                이벤트 접수 안내
              </p>
              {/* 본문 */}
              <p className="text-[12px] text-[#64748B] leading-relaxed">
                이번 키즈런은 금년 시즌 마지막으로 진행되는 키즈런으로, 선정
                인원을 999명으로 확대했습니다. 지금 바로 참여하세요.
              </p>
              {/* 구분선 + 세부 정보 */}
              <div className="h-px bg-[#DDE1EC]" />
              <div className="flex flex-col gap-1.5">
                {[
                  { label: "일시", value: "2026년 9월 27일 (일) 오전 10:00" },

                  { label: "장소", value: "라이온즈 파크 외야 잔디광장" },

                  { label: "대상", value: "만 3~12세 어린이 동반 가족" },
                ].map((row) => (
                  <div key={row.label} className="flex gap-3 text-[12px]">
                    <span className="text-[#9CA3AF] w-8 shrink-0">
                      {row.label}
                    </span>
                    <span className="text-[#111827] font-medium">
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <Dots />
            <ActionsRow />
          </div>
        </div>
      </div>
    </Page>
  )
}
