import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Header } from '@/components/Layout'
import {
  BOOKING_FEE, DETAIL_BOOKING_NO, LEAGUE_LABEL, TICKET_PRICE, bookingByNo, cancelDeadline, fmtCancelUntil,
  fmtDotYMD, fmtViewingAt, gameOf, matchTitle, seatText, addDays,
} from '@/data/mock'

const won = (n: number) => `${n.toLocaleString('ko-KR')}원`

// 042(044)-SL-MY-15 예매 상세
export function BookingDetailScreen() {
  const navigate = useNavigate()
  const [detailTab, setDetailTab] = useState<'예매 확인' | '예매 취소'>('예매 취소')
  const [selectedDetailTickets, setSelectedDetailTickets] = useState<number[]>([0])
  const [cancelAvailability, setCancelAvailability] = useState<'취소 가능' | '취소 불가'>('취소 가능')
  const isCancelled = detailTab === '예매 취소'
  const canCancel = cancelAvailability === '취소 가능'

  const booking = bookingByNo(DETAIL_BOOKING_NO)!
  const game = gameOf(booking)
  const qty = booking.seats.length
  const bookedDate = booking.bookedAt.date
  const deadline = cancelDeadline(game)
  const cancelledAtText = `${fmtDotYMD(bookedDate)} 20:00` // 예매 당일 취소 (수수료 없음)
  const deadlineText = fmtCancelUntil(game)

  const bookingInfo = [
    [
      { label: '티켓명', value: `${LEAGUE_LABEL} ${matchTitle(game)}` },
      { label: '예매자', value: '백두산' },
    ],
    [
      { label: '관람일시', value: fmtViewingAt(game) },
      { label: '장소', value: game.stadium },
    ],
    [
      { label: '좌석', value: `${booking.zone} ${seatText(booking)}${isCancelled ? ' (예매취소)' : ''}` },
      { label: '티켓수령 방법', value: '스마트티켓/지류티켓' },
    ],
    [
      { label: '예매일', value: fmtDotYMD(bookedDate) },
      { label: '현재상태', value: isCancelled ? '전체취소' : '예매완료' },
    ],
    [
      { label: '결제수단', value: '카카오페이-머니' },
      { label: '예매채널', value: 'PC웹' },
    ],
  ]

  const ticketTotal = TICKET_PRICE * qty
  const feeTotal = BOOKING_FEE * qty
  const paymentRows = [
    ['티켓금액', won(ticketTotal), '배송료', '0원'],
    ['예매수수료', won(feeTotal), '휴대폰결제 수수료', '0원'],
    ['쿠폰할인', '0원', '부가상품', '0원'],
    ['총 결제금액', won(ticketTotal + feeTotal), '', ''],
    ['결제상세정보', `카카오페이-머니 ${won(ticketTotal + feeTotal)}`, '', ''],
  ]

  const refundRows = [
    ['티켓금액', won(ticketTotal), '휴대폰 결제 수수료', '0원'],
    ['예매수수료', won(feeTotal), '취소수수료', '0원'],
    ['배송료', '0원', '부가상품', '0원'],
    ['총 환불금액', won(ticketTotal + feeTotal), '', ''],
  ]

  const ticketRows = booking.seats.map((n) => ({ seat: `${booking.block} ${n}번`, price: won(TICKET_PRICE) }))

  const notices = [
    '취소마감시간이 공연전시 상품 및 스포츠 구단마다 상이하며, 마감시간이 지난 이후에는 취소가 불가능합니다. 취소 진행 시 취소 마감시간 확인 후 취소해주시기 바랍니다.',
    '예매수수료는 예매일 당일 취소하실 경우만 환불되며, 그 이후 취소 시에는 환불되지 않습니다.',
    '행사상의 문제로 인해 환불을 진행하는 경우, 취소수수료를 제공하지 않으며, 환불 주체가 예매처가 아닌 행사 주최사가 될 수 있습니다.',
    '신용카드로 결제한 건에 대해 취소하실 경우, 최초 결제와 동일한 카드로 예매 시점에 따라 취소 수수료와 배송비 등을 재승인합니다. 따라서 무이자 할부 혜택 등 기간별 프로모션 혜택이 적용되지 않을 수 있습니다.',
    '배송준비중 혹은 배송중 상태에서는 배송지 변경이 불가합니다.',
    '발송받으신 티켓을 분실하셨거나 티켓이 훼손되었을 경우 취소 및 변경이 절대 불가하오니 이 점 유의하시기 바랍니다.',
    '이미 배송이 시작된 티켓의 경우는 온라인 및 콜센터에서 취소가 불가합니다. 반드시 취소마감시간 이전에 티켓이 아래 주소로 반송되어야 합니다. 취소수수료는 도착일자 기준으로 부과됩니다.',
    '티켓 반송 시, 고객님의 예매번호와 연락처, 반송사유를 함께 보내주시면 빠른 처리에 도움이 됩니다. 또한 무통장입금이나 계좌이체를 이용하셨을 경우 환불받으실 계좌와 예금주를 적으셔서 티켓과 함께 등기우편으로 보내주시길 부탁드립니다.',
  ]

  const AmountTable = ({ rows }: { rows: string[][] }) => (
    <div className="overflow-hidden rounded-2xl border border-[#DDE1EC] bg-white">
      <div className="grid grid-cols-[1fr_auto_1fr_auto] bg-[#E8EBF4] text-[10px] font-semibold text-[#64748B]">
        <span className="px-3 py-2.5">항목</span>
        <span className="px-3 py-2.5 text-right">금액</span>
        <span className="px-3 py-2.5">항목</span>
        <span className="px-3 py-2.5 text-right">금액</span>
      </div>
      {rows.map((row, index) => (
        <div key={`${row[0]}-${index}`} className="grid grid-cols-[1fr_auto_1fr_auto] border-t border-[#F1F3F8] text-[11px]">
          <span className="px-3 py-3 text-[#64748B]">{row[0]}</span>
          <span className="px-3 py-3 text-right font-semibold text-[#111827]">{row[1]}</span>
          <span className="px-3 py-3 text-[#64748B]">{row[2]}</span>
          <span className="px-3 py-3 text-right font-semibold text-[#111827]">{row[3]}</span>
        </div>
      ))}
    </div>
  )

  return (
    <div className="min-h-full bg-[#F5F7FB] pb-8">
      <Header
        title="예매 확인/취소"
        rightSlot={
          <div className="rounded-full border border-dashed border-red-400 p-0.5">
            <div className="flex gap-0.5 rounded-full bg-[#E8EBF4] p-0.5">
              {(['예매 확인', '예매 취소'] as const).map(tab => (
                <button
                  type="button"
                  key={tab}
                  onClick={() => setDetailTab(tab)}
                  className={`rounded-full px-2.5 py-1 text-[10px] font-semibold transition-colors ${
                    detailTab === tab ? 'bg-white text-[#0E1A40] shadow-sm' : 'text-[#9CA3AF]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        }
      />

      <div className="flex flex-col gap-5 px-4 pt-4">
        <div className="rounded-2xl border border-[#DDE1EC] bg-white p-4">
          <p className="text-[14px] font-bold text-[#111827]">예매한 티켓 확인/취소가 가능합니다.</p>
          <p className="mt-2 text-[12px] leading-relaxed text-[#64748B]">
            신용카드 단일 결제 시 부분 취소가 가능합니다. 단, 복합결제 및 신용카드를 제외한 다른 결제수단으로 예매 시 부분취소가 불가합니다.
          </p>
        </div>

        <section>
          <p className="mb-3 text-[15px] font-bold text-[#111827]">예매정보</p>
          <div className="overflow-hidden rounded-2xl border border-[#DDE1EC] bg-white">
            {bookingInfo.map((row, rowIndex) => (
              <div key={rowIndex} className={`grid grid-cols-2 ${rowIndex > 0 ? 'border-t border-[#DDE1EC]' : ''}`}>
                {row.map((item, itemIndex) => (
                  <div key={item.label} className={`px-3 py-3.5 ${itemIndex === 1 ? 'border-l border-[#DDE1EC]' : ''}`}>
                    <p className="mb-1 text-[10px] text-[#9CA3AF]">{item.label}</p>
                    <p className={`text-[12px] font-semibold leading-relaxed ${
                      item.label === '현재상태'
                        ? isCancelled ? 'text-[#E53935]' : 'text-[#1B5BF0]'
                        : 'text-[#111827]'
                    }`}>
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        <section>
          <p className="mb-3 text-[15px] font-bold text-[#111827]">예매내역</p>
          <div className="mb-2 flex items-center justify-between gap-3">
            <p className="text-[12px] font-semibold text-[#64748B]">티켓 예매내역</p>
            {!isCancelled && (
              <div className="rounded-full border border-dashed border-red-400 p-0.5">
                <div className="flex gap-0.5 rounded-full bg-[#E8EBF4] p-0.5">
                  {(['취소 가능', '취소 불가'] as const).map(status => (
                    <button
                      type="button"
                      key={status}
                      onClick={() => {
                        setCancelAvailability(status)
                        if (status === '취소 불가') setSelectedDetailTickets([])
                      }}
                      className={`rounded-full px-2.5 py-1 text-[10px] font-semibold transition-colors ${
                        cancelAvailability === status
                          ? 'bg-white text-[#0E1A40] shadow-sm'
                          : 'text-[#9CA3AF]'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="overflow-x-auto rounded-2xl border border-[#DDE1EC] bg-white">
            <table className="w-[720px] border-collapse text-left">
              <thead className="bg-[#E8EBF4] text-[10px] font-semibold text-[#64748B]">
                <tr>
                  {[
                    ...(!isCancelled ? ['선택'] : []),
                    '예매번호', '좌석등급', '권종', '좌석번호', '가격', '취소여부', '취소(가능)일',
                  ].map(label => (
                    <th key={label} className="whitespace-nowrap px-3 py-2.5">{label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ticketRows.map((ticket, index) => {
                  const isSelected = selectedDetailTickets.includes(index)
                  return (
                    <tr key={ticket.seat} className="border-t border-[#F1F3F8] text-[11px] text-[#111827]">
                      {!isCancelled && (
                        <td className="px-3 py-3">
                          <button
                            type="button"
                            disabled={!canCancel}
                            onClick={() => setSelectedDetailTickets(selected =>
                              selected.includes(index)
                                ? selected.filter(ticketIndex => ticketIndex !== index)
                                : [...selected, index]
                            )}
                            aria-label={`${ticket.seat} 선택`}
                            className={`flex h-5 w-5 items-center justify-center rounded border-2 ${
                              !canCancel
                                ? 'cursor-not-allowed border-[#D1D5DB] bg-[#F1F3F8]'
                                : isSelected
                                  ? 'border-[#1B5BF0] bg-[#1B5BF0]'
                                  : 'border-[#D1D5DB] bg-white'
                            }`}
                          >
                            {isSelected && (
                              <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                                <path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            )}
                          </button>
                        </td>
                      )}
                      <td className="whitespace-nowrap px-3 py-3 font-mono font-semibold">{booking.no}</td>
                      <td className="whitespace-nowrap px-3 py-3">{booking.zone}</td>
                      <td className="whitespace-nowrap px-3 py-3">일반</td>
                      <td className="whitespace-nowrap px-3 py-3">{ticket.seat}</td>
                      <td className="whitespace-nowrap px-3 py-3 font-semibold">{ticket.price}</td>
                      <td className={`whitespace-nowrap px-3 py-3 font-semibold ${isCancelled ? 'text-[#E53935]' : 'text-[#1B5BF0]'}`}>
                        {isCancelled ? '취소완료' : '취소 전'}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3">{isCancelled ? cancelledAtText : deadlineText}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          {!isCancelled && (
            <>
              <button
                type="button"
                disabled={!canCancel || selectedDetailTickets.length === 0}
                onClick={() => navigate('/my/booking-cancel')}
                className={`mt-3 h-11 w-full rounded-xl border text-[13px] font-semibold ${
                  canCancel && selectedDetailTickets.length > 0
                    ? 'border-[#E53935] bg-white text-[#E53935]'
                    : 'border-[#DDE1EC] bg-[#F1F3F8] text-[#9CA3AF]'
                }`}
              >
                {canCancel
                  ? `선택한 티켓 취소하기 (${selectedDetailTickets.length}장)`
                  : '티켓 취소 불가'}
              </button>
              {!canCancel && (
                <p className="mt-2 text-[11px] font-medium text-[#E53935]">
                  *선물한 티켓을 모두 회수한 후 취소할 수 있습니다.
                </p>
              )}
            </>
          )}
        </section>

        <section>
          <p className="mb-3 text-[15px] font-bold text-[#111827]">결제정보</p>
          <AmountTable rows={paymentRows} />
        </section>

        {isCancelled && (
          <section>
            <p className="mb-3 text-[15px] font-bold text-[#111827]">환불정보</p>
            <AmountTable rows={refundRows} />
          </section>
        )}

        <section>
          <p className="mb-3 text-[15px] font-bold text-[#111827]">취소 유의사항</p>
          <div className="overflow-hidden rounded-2xl border border-[#DDE1EC] bg-white">
            <div className="grid grid-cols-[1fr_1.7fr] bg-[#E8EBF4] text-[10px] font-semibold text-[#64748B]">
              <span className="px-3 py-2.5">구분</span>
              <span className="px-3 py-2.5">취소수수료</span>
            </div>
            {[
              ['취소 마감시간', `${deadline.date.slice(0, 4)}년 ${deadline.date.slice(5, 7)}월 ${deadline.date.slice(8)}일 ${deadline.time}`],
              ['취소 수수료', `예매당일 / ${fmtDotYMD(bookedDate)} / 없음`],
              ['', `예매익일~취소마감시간 전 / ${fmtDotYMD(addDays(bookedDate, 1))}~${fmtDotYMD(deadline.date)} / 티켓 금액의 10% 부과`],
              ['경기 취소(우천 등)', '취소 수수료·예매 수수료 없이 전액 자동 환불'],
            ].map((row, index) => (
              <div key={index} className="grid grid-cols-[1fr_1.7fr] border-t border-[#F1F3F8] text-[11px]">
                <span className="px-3 py-3 text-[#64748B]">{row[0]}</span>
                <span className="px-3 py-3 font-medium leading-relaxed text-[#111827]">{row[1]}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <p className="mb-3 text-[15px] font-bold text-[#111827]">유의사항</p>
          <div className="flex flex-col gap-4 rounded-2xl border border-[#DDE1EC] bg-white p-4">
            {notices.map((notice, index) => (
              <div key={index} className="flex items-start gap-2">
                <span className="shrink-0 text-[12px] text-[#64748B]">·</span>
                <p className="text-[12px] leading-relaxed text-[#64748B]">{notice}</p>
              </div>
            ))}

            <div className="rounded-xl bg-[#F5F7FB] p-3 text-[12px] leading-relaxed text-[#374151]">
              <p><span className="font-semibold">주소:</span> 06043, 서울특별시 강남구 강남대로 586, 제이빌딩</p>
              <p className="mt-1"><span className="font-semibold">받는 사람:</span> NHN LINK 환불담당자</p>
              <p className="mt-1"><span className="font-semibold">연락처:</span> 1588-7890</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
