import { PARKING_LOTS } from "@/data/parking"

type Banner = NonNullable<(typeof PARKING_LOTS)[number]["banner"]>

/** 주차장 배너 (013-SL-GM-08 주차 탭 · 017 티켓 · 043 예매 내역 공용). 기본은 전설로 주차장 사전 예약 */
export const PARKING_RESERVE_BANNER = PARKING_LOTS[0].banner as Banner

export function ParkingReserveBanner({
  banner = PARKING_RESERVE_BANNER,
  onClick,
}: {
  banner?: Banner
  onClick?: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center justify-between gap-3 rounded-2xl bg-[#1B5BF0] px-4 py-3.5 text-left text-white"
    >
      <span>
        <span className="block text-[14px] font-bold">{banner.title}</span>
        <span className="block text-[11px] text-white/80">{banner.desc}</span>
      </span>
      <span className="shrink-0 rounded-full bg-white px-3 py-1.5 text-[12px] font-bold text-[#1B5BF0]">
        {banner.cta} ›
      </span>
    </button>
  )
}
