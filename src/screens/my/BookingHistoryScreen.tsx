import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Header } from '@/components/Layout'
import {
  CANCELLED_BOOKINGS, LEAGUE_LABEL, MOCK_TODAY, UPCOMING_BOOKINGS, addDays,
  fmtCancelUntil, fmtViewingAt, gameOf, matchTitle, type Booking,
} from '@/data/mock'

// 041(043)-SL-MY-14 예매 내역
export function BookingHistoryScreen() {
  const navigate = useNavigate()
  const [tab, setTab] = useState<'예매 확인' | '예매 취소'>('예매 확인')
  const [isCancelGuideOpen, setIsCancelGuideOpen] = useState(false)
  const [isSmartTicketConfirmOpen, setIsSmartTicketConfirmOpen] = useState(false)
  const [bookingPeriod, setBookingPeriod] = useState<'1개월' | '3개월' | '6개월' | '1년' | '날짜 지정'>('1개월')
  const [bookingStartDate, setBookingStartDate] = useState(addDays(MOCK_TODAY, -30))
  const [bookingEndDate, setBookingEndDate] = useState(MOCK_TODAY)

  // 예매 더미(data/mock/bookings)를 목록 카드 형태로 변환
  const toCard = (b: Booking) => {
    const g = gameOf(b)
    return {
      no: b.no,
      league: LEAGUE_LABEL,
      match: matchTitle(g),
      viewingAt: fmtViewingAt(g),
      cancelUntil: fmtCancelUntil(g),
      status: b.status,
      issued: b.issued,
      memo: b.memo,
    }
  }
  const UPCOMING = UPCOMING_BOOKINGS.map(toCard)
  const CANCELLED = CANCELLED_BOOKINGS.map(toCard)

  const UpcomingBookingCard = ({ no, league, match, viewingAt, cancelUntil, status, issued, memo }: typeof UPCOMING[0]) => {
    const isUnissued = !issued
    return (
    <div className="overflow-hidden rounded-2xl border border-[#DDE1EC] bg-[#FFFFFF]">
      <div className="divide-y divide-[#F1F3F8] px-4">
        <div className="flex items-center justify-between py-3.5">
          <span className="text-[11px] text-[#9CA3AF]">예매 번호</span>
          <button
            type="button"
            onClick={() => navigate('/my/booking-detail')}
            className="font-mono text-[13px] font-semibold text-[#111827] underline underline-offset-2"
          >
            {no}
          </button>
        </div>
        <div className="py-3.5">
          <p className="mb-1.5 text-[11px] text-[#9CA3AF]">티켓명</p>
          <p className="text-[12px] font-medium text-[#64748B]">{league}</p>
          <p className="mt-0.5 text-[15px] font-bold text-[#111827]">{match}</p>
        </div>
        <div className="flex items-center justify-between py-3.5">
          <span className="text-[11px] text-[#9CA3AF]">관람일시</span>
          <span className="text-[13px] font-semibold text-[#111827]">{viewingAt}</span>
        </div>
        <div className="flex items-center justify-between py-3.5">
          <span className="text-[11px] text-[#9CA3AF]">취소 가능일</span>
          <span className="text-[13px] font-semibold text-[#111827]">{cancelUntil}</span>
        </div>
        <div className="flex items-center justify-between py-3.5">
          <span className="text-[11px] text-[#9CA3AF]">상태</span>
          <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${
            status === '예매 완료'
              ? 'bg-[#EBF0FF] text-[#1B5BF0]'
              : status === '관람 완료'
                ? 'bg-[#F0F2F7] text-[#64748B]'
                : status === '전체 취소' || status === '경기 취소'
                  ? 'bg-[#FFF1F1] text-[#E53935]'
                  : 'bg-[#FFF8E1] text-[#B45309]'
          }`}>{status}</span>
        </div>
        {memo && (
          <div className="flex items-start justify-between gap-4 py-3.5">
            <span className="shrink-0 text-[11px] text-[#9CA3AF]">비고</span>
            <span className="text-right text-[12px] font-medium leading-relaxed text-[#64748B]">{memo}</span>
          </div>
        )}
      </div>
      {status === '예매 완료' && (
        <div className="border-t border-[#DDE1EC] p-4">
          {isUnissued && (
            <p className="mb-2.5 text-center text-[12px] font-medium leading-relaxed text-[#374151]">
              스마트티켓을 발권한 이후에는 종이(지류) 티켓을 일절 발권할 수 없습니다.
            </p>
          )}
          <button
            type="button"
            onClick={() => setIsSmartTicketConfirmOpen(true)}
            className={`flex h-11 w-full items-center justify-center gap-1.5 rounded-xl border text-[13px] font-semibold ${
              isUnissued
                ? 'border-[#1B5BF0] bg-white text-[#1B5BF0]'
                : 'border-[#1B5BF0] bg-[#1B5BF0] text-white'
            }`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.8" />
              <path d="M7 7h4v4H7zM13 7h4v4h-4zM7 13h4v4H7zM15 15h2v2h-2z" fill="currentColor" />
            </svg>
            {isUnissued ? '스마트 티켓 발권 받기' : '스마트 티켓'}
          </button>
        </div>
      )}
    </div>
    )
  }

  const PeriodFilter = () => (
    <div className="rounded-2xl border border-[#DDE1EC] bg-white p-4">
      <p className="mb-3 text-[12px] font-semibold text-[#374151]">기간별 조회</p>
      <div className="flex flex-wrap gap-2">
        {(['1개월', '3개월', '6개월', '1년', '날짜 지정'] as const).map(period => (
          <button
            type="button"
            key={period}
            onClick={() => setBookingPeriod(period)}
            className={`h-8 rounded-full px-3 text-[11px] font-semibold transition-colors ${
              bookingPeriod === period
                ? 'bg-[#1B5BF0] text-white'
                : 'border border-[#DDE1EC] bg-[#F5F7FB] text-[#64748B]'
            }`}
          >
            {period === '날짜 지정' ? '날짜 지정 조회' : period}
          </button>
        ))}
      </div>
      {bookingPeriod === '날짜 지정' && (
        <div className="mt-3 flex items-center gap-2 border-t border-[#F1F3F8] pt-3">
          <input
            type="date"
            value={bookingStartDate}
            onChange={event => setBookingStartDate(event.target.value)}
            aria-label="조회 시작일"
            className="h-9 min-w-0 flex-1 rounded-lg border border-[#DDE1EC] bg-[#F9FAFB] px-2 text-[11px] text-[#374151] outline-none"
          />
          <span className="text-[11px] text-[#9CA3AF]">~</span>
          <input
            type="date"
            value={bookingEndDate}
            onChange={event => setBookingEndDate(event.target.value)}
            aria-label="조회 종료일"
            className="h-9 min-w-0 flex-1 rounded-lg border border-[#DDE1EC] bg-[#F9FAFB] px-2 text-[11px] text-[#374151] outline-none"
          />
          <button
            type="button"
            className="h-9 shrink-0 rounded-lg bg-[#0E1A40] px-3 text-[11px] font-semibold text-white"
          >
            조회
          </button>
        </div>
      )}
    </div>
  )

  return (
    <div className="min-h-full bg-[#F5F7FB] pb-4">
      <Header
        title="예매 내역"
        rightSlot={
          <button
            type="button"
            onClick={() => setIsCancelGuideOpen(true)}
            className="flex items-center gap-1 text-[12px] font-semibold text-[#64748B]"
          >
            티켓 취소 안내
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
              <path d="M12 11v5M12 8h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        }
      />

      {/* 탭 */}
      <div className="flex border-b border-[#DDE1EC]">
        {(['예매 확인', '예매 취소'] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`flex-1 py-3 text-[13px] font-semibold border-b-2 transition-colors ${tab === t ? 'border-[#1B5BF0] text-[#1B5BF0]' : 'border-transparent text-[#9CA3AF]'}`}>
            {t}
          </button>
        ))}
      </div>

      <div className="px-4 pt-4 flex flex-col gap-3">
        {tab === '예매 취소' && <PeriodFilter />}

        {tab === '예매 확인' && (
          <div className="rounded-2xl border border-[#DDE1EC] bg-[#F5F7FB] px-4 py-3">
            <p className="text-[12px] leading-relaxed text-[#64748B]">
              신용카드 단일 결제 시 부분 취소가 가능합니다.<br />
              단, 복합 결제 및 다른 결제 수단으로 예매 시에는 부분 취소가 불가합니다.
            </p>
          </div>
        )}
        {tab === '예매 확인' && (
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0E1A40] to-[#1B5BF0] px-5 py-4">
            <div className="absolute -right-5 -top-8 h-24 w-24 rounded-full bg-white/10" />
            <div className="relative flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M7 20V4h6.25a4.75 4.75 0 0 1 0 9.5H7" stroke="white" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <span className="text-[11px] font-semibold text-white/60">승리를 보러 가는 길, 주차부터 준비하세요!</span>
                <p className="mt-0.5 text-[16px] font-bold text-white">전설로 주차장 사전 예약</p>
              </div>
            </div>
          </div>
        )}
        {tab === '예매 확인' && <PeriodFilter />}
        {tab === '예매 확인' && UPCOMING.map((item) => <UpcomingBookingCard key={item.no} {...item} />)}

        {tab === '예매 취소' && CANCELLED.map((item) => <UpcomingBookingCard key={item.no} {...item} />)}
      </div>

      {isCancelGuideOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-5 py-10"
          onClick={() => setIsCancelGuideOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="cancel-guide-title"
            className="flex max-h-full w-full max-w-md flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={event => event.stopPropagation()}
          >
            <div className="flex shrink-0 items-center justify-between border-b border-[#DDE1EC] px-5 py-4">
              <p id="cancel-guide-title" className="text-[17px] font-bold text-[#111827]">티켓 취소 안내</p>
              <button
                type="button"
                onClick={() => setIsCancelGuideOpen(false)}
                aria-label="티켓 취소 안내 닫기"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F1F3F8] text-[#64748B]"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <div className="flex flex-col gap-4 overflow-y-auto px-5 py-5 text-[13px] leading-relaxed text-[#374151]">
              <p>
                · 예매한 티켓 전체 취소, 혹은 신용카드 결제 시 부분 취소가 가능합니다.<br />
                단, 일부 상품 및 스마트티켓 발권 시 부분취소가 불가합니다.
              </p>
              <p>
                · 예매 당일 자정까지 취소하실 경우는 예매수수료도 환불되며, 취소수수료가 부과되지 않습니다. 그 이후 취소하실 경우에는 예매수수료가 환불되지 않으며, 취소수수료는 정책에 따라 부과됩니다.
              </p>
              <p>
                · 일부 경기의 경우 상황에 따라 일괄 취소 건이 발생할 수 있으며, 일괄 취소 시에는 취소수수료가 부과되지 않습니다.
              </p>
              <p>
                · 티켓의 날짜/시간/좌석 등급/좌석 위치 변경은 불가합니다. 자세한 안내가 필요할 경우 고객센터를 이용해주세요.
              </p>
              <p>
                · 구단 홈페이지에서 예매한 내역은 구단 홈페이지에서만 확인이 가능합니다.
              </p>
            </div>
            <div className="shrink-0 border-t border-[#DDE1EC] p-4">
              <button
                type="button"
                onClick={() => setIsCancelGuideOpen(false)}
                className="h-11 w-full rounded-xl bg-[#1B5BF0] text-[14px] font-bold text-white"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}

      {isSmartTicketConfirmOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-7"
          onClick={() => setIsSmartTicketConfirmOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="smart-ticket-confirm-title"
            className="w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={event => event.stopPropagation()}
          >
            <div className="px-6 pb-5 pt-6 text-center">
              <p id="smart-ticket-confirm-title" className="text-[17px] font-bold text-[#111827]">
                스마트 티켓을 발권하시겠습니까?
              </p>
              <p className="mt-3 text-[13px] leading-relaxed text-[#64748B]">
                발권하시면 종이(지류) 티켓은<br />
                발권하실 수 없습니다.
              </p>
            </div>
            <div className="grid grid-cols-2 border-t border-[#DDE1EC]">
              <button
                type="button"
                onClick={() => setIsSmartTicketConfirmOpen(false)}
                className="h-12 border-r border-[#DDE1EC] text-[14px] font-medium text-[#64748B]"
              >
                취소
              </button>
              <button
                type="button"
                onClick={() => navigate('/my/ticket-qr')}
                className="h-12 text-[14px] font-bold text-[#1B5BF0]"
              >
                발권하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
