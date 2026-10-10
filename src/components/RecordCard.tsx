import { fmtRecordDate, type TeamRecord } from "@/data/game"

const DEFAULT_BG = "linear-gradient(160deg, #1B5BF0, #0A1A4E)"

/**
 * 구단 기록 카드 (011 팀 기록 / 066 선수 상세 공통).
 * 배경은 어드민에서 기록마다 등록한 이미지, 없으면 기본 배경. 기록명이 카드 정중앙에 온다.
 */

export function RecordCard({
  r,
  className = "",
  size = "lg",
}: {
  r: TeamRecord
  className?: string
  size?: "lg" | "sm"
}) {
  return (
    <div
      className={`relative aspect-square rounded-3xl overflow-hidden text-white text-center shadow-[0_8px_24px_rgba(14,47,128,0.28)] ${className}`}
      style={{ background: r.bg ?? DEFAULT_BG }}
    >
      {/* 글자 가독성용 어두운 막 */}
      <div className="absolute inset-0 bg-black/25" />

      <span
        className={`absolute left-1/2 -translate-x-1/2 font-bold text-[#0A1A4E] bg-[#FFD76A] rounded-full ${
          size === "lg"
            ? "top-5 text-[11px] px-3 py-1"
            : "top-4 text-[10px] px-2.5 py-0.5"
        }`}
      >
        {r.badge}
      </span>

      {/* 기록명 — 카드 정중앙 */}
      <div className="absolute inset-0 flex items-center justify-center px-7">
        <p
          className={`font-black leading-snug break-keep ${
            size === "lg" ? "text-[24px]" : "text-[18px]"
          }`}
        >
          {r.record}
        </p>
      </div>

      <p
        className={`absolute left-0 right-0 font-semibold text-[#FFD76A] ${
          size === "lg" ? "bottom-5 text-[13px]" : "bottom-4 text-[12px]"
        }`}
      >
        {fmtRecordDate(r.date)}
      </p>
    </div>
  )
}
