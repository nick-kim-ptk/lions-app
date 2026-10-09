import { useState } from "react"

import { CaseSelect } from "@/components/CaseSelect"

import { useNavigate } from "react-router-dom"

import { Header } from "@/components/Layout"

import {
  BOOKING_FEE,
  DETAIL_BOOKING_NO,
  LEAGUE_LABEL,
  TICKET_PRICE,
  addDays,
  bookingByNo,
  cancelDeadline,
  fmtDotYMD,
  fmtDotYMDWT,
  gameOf,
  matchTitle,
} from "@/data/mock"

const won = (n: number) => `${n.toLocaleString("ko-KR")}원`

// 043(045)-SL-MY-16 예매 취소

export function BookingCancelScreen() {
  const navigate = useNavigate()

  const [agreed, setAgreed] = useState(false)

  const [cancelMode, setCancelMode] =
    useState<"부분 취소" | "전체 취소" | "취소 마감 후">("부분 취소")

  const isClosed = cancelMode === "취소 마감 후"

  const isFullCancel = cancelMode === "전체 취소"

  const booking = bookingByNo(DETAIL_BOOKING_NO)!

  const game = gameOf(booking)

  const qty = booking.seats.length

  const deadline = cancelDeadline(game)

  const bookedDate = booking.bookedAt.date

  // 선택 티켓 금액/수수료 (부분 취소는 1매 기준)

  const n = isFullCancel ? qty : 1

  const ticketAmount = TICKET_PRICE * n

  const feeAmount = BOOKING_FEE * n

  const cancelFee = Math.round(ticketAmount * 0.1)

  const REFUND_ROWS = [
    {
      label: isFullCancel ? "전체 티켓 금액" : "선택 티켓 금액",
      value: won(ticketAmount),
      highlight: false,
    },

    {
      label: "예매 수수료",
      value: `${won(feeAmount)} (환불 불가)`,
      highlight: false,
    },

    {
      label: "취소 수수료",
      value: `${won(cancelFee)} (티켓 금액의 10%)`,
      highlight: true,
    },

    {
      label: "환불 예상 금액",
      value: won(ticketAmount - cancelFee),
      highlight: false,
    },

    { label: "환불 수단", value: "카카오페이-머니", highlight: false },

    {
      label: "환불 예상 일정",
      value: "취소 후 3~5 영업일 이내",
      highlight: false,
    },
  ]

  return (
    <div className="min-h-full bg-[#F5F7FB] pb-32">
      <Header
        title="예매 취소"
        rightSlot={
          <CaseSelect
            value={cancelMode}
            options={["부분 취소", "전체 취소", "취소 마감 후"] as const}
            onChange={(mode) => {
              setCancelMode(mode)
              setAgreed(false)
            }}
          />
        }
      />
      <div className="px-4 pt-4 flex flex-col gap-4">
        {isClosed && (
          <div className="rounded-2xl border border-[#E53935]/30 bg-[#FFF5F5] px-4 py-3">
            <p className="text-[13px] font-bold text-[#E53935]">
              취소 기간이 종료되었어요
            </p>
            <p className="text-[11px] text-[#64748B] mt-1 leading-relaxed">
              취소 마감시간({fmtDotYMD(deadline.date)} {deadline.time})이 지나
              취소·환불이 불가합니다. 경기 취소(우천 등) 시에는 별도 신청 없이
              자동 환불됩니다.
            </p>
          </div>
        )}

        {/* 예매 정보 요약 */}
        <div className="bg-white rounded-2xl border border-[#DDE1EC] overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 bg-[#FFF5F5] border-b border-[#DDE1EC]">
            <span className="text-[11px] font-semibold text-[#E53935]">
              {isFullCancel
                ? `전체 취소 예정 · ${qty}매`
                : "부분 취소 예정 · 1매"}
            </span>
            <span className="text-[10px] text-[#9CA3AF] font-mono">
              {booking.no}
            </span>
          </div>
          <div className="flex flex-col gap-3 px-4 py-4">
            <div>
              <p className="text-[11px] font-medium text-[#64748B]">
                {LEAGUE_LABEL}
              </p>
              <p className="mt-0.5 text-[15px] font-bold text-[#111827]">
                {matchTitle(game)}
              </p>
              <p className="mt-1 text-[11px] text-[#64748B]">
                {fmtDotYMDWT(game.date, game.time)} · {game.stadium}
              </p>
            </div>
            <div className="rounded-xl border border-[#E53935]/20 bg-[#FFF5F5] px-3 py-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold text-[#E53935]">
                  {isFullCancel ? "전체 취소할 티켓" : "취소할 티켓"}
                </span>
                <span className="text-[10px] text-[#9CA3AF]">
                  일반 · {isFullCancel ? "4매" : "1매"}
                </span>
              </div>
              <p className="mt-1 text-[13px] font-bold text-[#111827]">
                3루 네이비석{" "}
                {isFullCancel ? "333블록 3열 47~50번" : "333블록 3열 47번"}
              </p>
              <div className="mt-2 flex items-center justify-between border-t border-[#E53935]/10 pt-2">
                <span className="text-[11px] text-[#64748B]">티켓 금액</span>
                <span className="text-[13px] font-bold text-[#111827]">
                  {isFullCancel ? "64,000원" : "16,000원"}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-[#F5F7FB] px-3 py-2.5">
              <span className="text-[11px] text-[#64748B]">
                취소 후 잔여 티켓
              </span>
              <span
                className={`text-[12px] font-bold ${
                  isFullCancel ? "text-[#E53935]" : "text-[#1B5BF0]"
                }`}
              >
                {isFullCancel ? "0매" : "3매"}
              </span>
            </div>
          </div>
        </div>

        {/* 환불 안내 */}
        <div className="bg-white rounded-2xl border border-[#F0A500]/40 overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-[#F0A500]/20 bg-[#FFF8E1]">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="#F0A500"
                strokeWidth="1.8"
              />
              <path
                d="M12 8v4m0 4h.01"
                stroke="#F0A500"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
            <span className="text-[11px] font-semibold text-[#92400E]">
              환불 안내
            </span>
          </div>
          <div className="divide-y divide-[#F1F3F8]">
            {REFUND_ROWS.map(({ label, value, highlight }) => (
              <div
                key={label}
                className={`flex items-center justify-between px-4 ${
                  label === "환불 예상 금액" ? "bg-[#EBF0FF] py-4" : "py-3"
                }`}
              >
                <span
                  className={`text-[12px] ${
                    label === "환불 예상 금액"
                      ? "font-semibold text-[#1B5BF0]"
                      : "text-[#9CA3AF]"
                  }`}
                >
                  {label}
                </span>
                <span
                  className={`font-semibold ${
                    label === "환불 예상 금액"
                      ? "text-[18px] font-black text-[#1B5BF0]"
                      : highlight
                        ? "text-[12px] text-[#E53935]"
                        : "text-[12px] text-[#111827]"
                  }`}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 취소 정책 안내 */}
        <div className="bg-[#F5F7FB] rounded-2xl border border-[#DDE1EC] p-4 flex flex-col gap-2">
          <p className="text-[11px] font-semibold text-[#64748B] mb-1">
            취소 수수료 정책
          </p>
          {[
            `취소 마감시간 : ${fmtDotYMD(deadline.date)} ${deadline.time}`,

            `예매 당일(${fmtDotYMD(bookedDate)}) : 취소 수수료 없음`,

            `${fmtDotYMD(addDays(bookedDate, 1))} ~ 취소 마감시간 전 : 티켓 금액의 10%`,

            "취소 마감시간 이후에는 취소가 불가합니다.",

            "우천 등으로 경기가 취소되면 별도 신청 없이 전액 자동 환불됩니다.",
          ].map((t, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-[#9CA3AF] text-[11px] shrink-0 mt-0.5">
                ·
              </span>
              <span className="text-[11px] text-[#64748B] leading-relaxed">
                {t}
              </span>
            </div>
          ))}
        </div>

        {/* 동의 체크 */}
        <button
          disabled={isClosed}
          onClick={() => setAgreed((a) => !a)}
          className={`flex items-center gap-3 py-1 ${
            isClosed ? "opacity-40" : ""
          }`}
        >
          <div
            className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
              agreed ? "bg-[#1B5BF0] border-[#1B5BF0]" : "border-[#DDE1EC]"
            }`}
          >
            {agreed && (
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                <path
                  d="M20 6L9 17l-5-5"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
          <span className="text-[13px] text-[#374151]">
            취소 및 환불 정책에 동의합니다
          </span>
        </button>
        <p className="text-[11px] leading-relaxed text-[#9CA3AF]">
          {isFullCancel
            ? "예매한 티켓 4매가 모두 취소되며, 취소 완료 후에는 되돌릴 수 없습니다."
            : "선택한 티켓만 취소되며, 나머지 3매는 기존 예매 상태로 유지됩니다."}
        </p>
      </div>

      {/* 하단 플로팅 CTA */}
      <div className="fixed bottom-0 left-0 right-0 lg:right-auto lg:left-1/2 lg:-translate-x-1/2 lg:w-full lg:max-w-[1200px] bg-white border-t border-[#DDE1EC] px-4 pt-3 pb-8">
        <button
          disabled={!agreed || isClosed}
          onClick={() => navigate(-1)}
          className={`w-full h-14 rounded-2xl font-semibold text-[15px] transition-colors ${
            agreed && !isClosed
              ? "bg-[#E53935] text-white"
              : "bg-[#DDE1EC] text-[#9CA3AF]"
          }`}
        >
          {isClosed
            ? "취소할 수 없어요"
            : isFullCancel
              ? "전체 4매 취소하기"
              : "선택한 1매 취소하기"}
        </button>
      </div>
    </div>
  )
}
