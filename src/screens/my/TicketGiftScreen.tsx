import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Header } from '@/components/Layout'

function RecipientSection() {
  const [query, setQuery] = useState('')
  const [searched, setSearched] = useState(false)
  const [message, setMessage] = useState('')

  const MOCK_USER = { id: 'blueblood1028', nickname: '블루블러드', joined: '2021.03' }
  const found = searched && query.trim() === MOCK_USER.id
  const notFound = searched && !found

  return (
    <div className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] p-4">
      <p className="text-xs text-[#64748B] mb-3">받는 분 정보</p>
      <div className="flex flex-col gap-1.5 mb-3">
        <span className="text-xs font-medium text-[#64748B]">아이디 검색</span>
        <div className={`h-12 bg-[#FFFFFF] border rounded-xl px-4 flex items-center gap-2 transition-colors ${found ? 'border-[#1B5BF0]' : notFound ? 'border-[#E53935]' : 'border-[#DDE1EC]'}`}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="8" stroke="#9CA3AF" strokeWidth="1.8"/>
            <path d="M21 21l-4.35-4.35" stroke="#9CA3AF" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
          <input
            type="text"
            value={query}
            onChange={e => { setQuery(e.target.value); setSearched(false) }}
            onKeyDown={e => { if (e.key === 'Enter') setSearched(true) }}
            placeholder="아이디를 입력하세요"
            className="flex-1 bg-transparent text-sm text-[#111827] placeholder-[#9CA3AF] outline-none"
          />
          <button
            onClick={() => setSearched(true)}
            className="text-xs text-[#1B5BF0] shrink-0 font-semibold"
          >
            검색
          </button>
        </div>
        {notFound && (
          <span className="text-[10px] text-[#E53935]">해당 아이디의 사용자를 찾을 수 없습니다.</span>
        )}
      </div>

      {/* 검색 결과 */}
      {found && (
        <div className="flex items-center gap-3 bg-[#EEF3FF] border border-[#1B5BF0]/20 rounded-xl px-3.5 py-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-[#1B5BF0] flex items-center justify-center shrink-0">
            <span className="text-white text-sm font-black">블</span>
          </div>
          <div className="flex flex-col gap-0.5 flex-1 min-w-0">
            <span className="text-[14px] font-bold text-[#111827]">{MOCK_USER.nickname}</span>
            <span className="text-[11px] text-[#9CA3AF]">@{MOCK_USER.id}</span>
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M20 6L9 17l-5-5" stroke="#1B5BF0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      )}

      {/* 메시지 */}
      <div className="flex flex-col gap-1.5">
        <span className="text-xs font-medium text-[#64748B]">메시지 <span className="text-[#9CA3AF]">(선택)</span></span>
        <div className={`border rounded-2xl px-4 py-3 transition-colors ${message.length > 0 ? 'border-[#1B5BF0]' : 'border-[#DDE1EC]'}`}>
          <textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="선물 메시지를 입력하세요"
            rows={2}
            className="w-full bg-transparent text-sm text-[#111827] placeholder-[#9CA3AF] outline-none resize-none"
          />
        </div>
      </div>
    </div>
  )
}

// 045(047)-SL-MY-18 티켓 선물하기
export function TicketGiftScreen() {
  const navigate = useNavigate()
  const [confirmed, setConfirmed] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  const [giftHistoryTab, setGiftHistoryTab] = useState<'보낸 티켓' | '받은 티켓'>('보낸 티켓')
  const [selectedTickets, setSelectedTickets] = useState<number[]>([0, 4])

  // 1매씩 쪼갠 티켓 리스트 (예매번호+좌석번호로 각각 구분)
  const TICKETS = [
    { no: '1523782316', game: '[2026 신한 SOL KBO 리그]\n삼성라이온즈 VS KT위즈', date: '2026.09.25 (금) 18:30', seat: '3루 내야 지정석 333블록 3열 47번' },
    { no: '1523782316', game: '[2026 신한 SOL KBO 리그]\n삼성라이온즈 VS KT위즈', date: '2026.09.25 (금) 18:30', seat: '3루 내야 지정석 333블록 3열 48번' },
    { no: '1523782316', game: '[2026 신한 SOL KBO 리그]\n삼성라이온즈 VS KT위즈', date: '2026.09.25 (금) 18:30', seat: '3루 내야 지정석 333블록 3열 49번' },
    { no: '1523782316', game: '[2026 신한 SOL KBO 리그]\n삼성라이온즈 VS KT위즈', date: '2026.09.25 (금) 18:30', seat: '3루 내야 지정석 333블록 3열 50번' },
    { no: '8472051943', game: '[2026 신한 SOL KBO 리그]\n삼성라이온즈 VS NC다이노스', date: '2026.09.20 (일) 14:00', seat: '1루 내야 지정석 115블록 8열 3번' },
    { no: '8472051943', game: '[2026 신한 SOL KBO 리그]\n삼성라이온즈 VS NC다이노스', date: '2026.09.20 (일) 14:00', seat: '1루 내야 지정석 115블록 8열 4번' },
  ]

  const SENT_GIFTS = [
    {
      date: '2026.09.18 14:32', no: '1523782316',
      game: '[2026 신한 SOL KBO 리그]\n삼성라이온즈 VS KT위즈',
      gameDetail: '2026.09.25 (금) 18:30', seat: '3루 내야 지정석 333블록 3열 47~50번',
      qty: 4, sender: '라이온하트', message: '생일 축하해! 같이 응원하자 🦁',
      pending: false, received: false, expired: false, past: false,
    },
    {
      date: '2026.09.19 09:15', no: '8472051943',
      game: '[2026 신한 SOL KBO 리그]\n삼성라이온즈 VS NC다이노스',
      gameDetail: '2026.09.20 (일) 14:00', seat: '1루 내야 지정석 115블록 8열 3번',
      qty: 1, sender: '승리의여신', message: '',
      pending: true, received: false, expired: false, past: false,
    },
    {
      date: '2026.09.18 11:05', no: '1523782316',
      game: '[2026 신한 SOL KBO 리그]\n삼성라이온즈 VS KT위즈',
      gameDetail: '2026.09.25 (금) 18:30', seat: '3루 내야 지정석 333블록 3열 47~48번',
      qty: 2, sender: '사직동라이언', message: '',
      pending: false, received: false, expired: true, past: true,
    },
  ]

  const RECEIVED_GIFTS = [
    {
      date: '2026.09.18 14:32', no: '1523782316',
      game: '[2026 신한 SOL KBO 리그]\n삼성라이온즈 VS KT위즈',
      gameDetail: '2026.09.25 (금) 18:30', seat: '3루 내야 지정석 333블록 3열 47번',
      qty: 1, sender: '라이온하트', message: '생일 축하해! 같이 응원하자 🦁',
      pending: false, received: true, expired: false, past: false,
    },
    {
      date: '2026.09.19 10:20', no: '8472051943',
      game: '[2026 신한 SOL KBO 리그]\n삼성라이온즈 VS NC다이노스',
      gameDetail: '2026.09.20 (일) 14:00', seat: '1루 내야 지정석 115블록 8열 4번',
      qty: 1, sender: '블루라이온', message: '경기장에서 함께 응원해요!',
      pending: true, received: false, expired: false, past: false,
    },
    {
      date: '2026.09.12 18:44', no: '3901746258',
      game: '[2026 신한 SOL KBO 리그]\n삼성라이온즈 VS LG트윈스',
      gameDetail: '2026.09.13 (일) 14:00', seat: '외야 응원석 A구역 5열 21번',
      qty: 1, sender: '대구라이온', message: '즐거운 관람 되세요!',
      pending: false, received: true, expired: false, past: true,
    },
  ]

  const toggleTicket = (index: number) => {
    setSelectedTickets(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    )
  }
  return (
    <div className="min-h-full bg-[#F5F7FB] pb-4">
      <Header title="티켓 선물하기" />
      {/* Tab bar */}
      <div className="flex border-b border-[#DDE1EC]">
        {['선물하기', '선물 내역'].map((tab, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            className={`shrink-0 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === i ? 'border-[#1B5BF0] text-[#1B5BF0]' : 'border-transparent text-[#64748B]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 선물 내역 탭 */}
      {activeTab === 1 && (
        <div className="px-4 pt-4 flex flex-col gap-3">
          <div className="grid grid-cols-2 rounded-xl bg-[#E8EBF4] p-1">
            {(['보낸 티켓', '받은 티켓'] as const).map(historyTab => (
              <button
                type="button"
                key={historyTab}
                onClick={() => setGiftHistoryTab(historyTab)}
                className={`h-9 rounded-lg text-[12px] font-semibold transition-colors ${
                  giftHistoryTab === historyTab
                    ? 'bg-white text-[#1B5BF0] shadow-sm'
                    : 'text-[#64748B]'
                }`}
              >
                {historyTab}
              </button>
            ))}
          </div>

          {(giftHistoryTab === '보낸 티켓' ? SENT_GIFTS : RECEIVED_GIFTS).map((item, i) => (
            <div key={i} className={`rounded-2xl border overflow-hidden ${
              item.expired
                ? 'bg-[#F5F7FB] border-[#E2E5EF]'
                : item.pending
                  ? 'bg-white border-[#FBBF24]/50'
                  : 'bg-white border-[#DDE1EC]'
            }`}>
              {/* 상태 바 */}
              <div className={`flex items-center justify-between px-4 py-2.5 border-b ${
                item.expired
                  ? 'bg-[#EAECF2] border-[#E2E5EF]'
                  : item.pending
                    ? 'bg-[#FFF8E1] border-[#FBBF24]/40'
                    : item.past
                      ? 'bg-[#EAECF2] border-[#E2E5EF]'
                      : 'bg-[#EBF0FF] border-[#DDE1EC]'
              }`}>
                <div className="flex items-center gap-1.5">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                    <path d="M20 12v8a1 1 0 01-1 1H5a1 1 0 01-1-1v-8" stroke={item.expired || item.past ? '#9CA3AF' : item.pending ? '#F59E0B' : '#1B5BF0'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M22 7H2v5h20V7z" stroke={item.expired || item.past ? '#9CA3AF' : item.pending ? '#F59E0B' : '#1B5BF0'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 22V7" stroke={item.expired || item.past ? '#9CA3AF' : item.pending ? '#F59E0B' : '#1B5BF0'} strokeWidth="2" strokeLinecap="round"/>
                    <path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z" stroke={item.expired || item.past ? '#9CA3AF' : item.pending ? '#F59E0B' : '#1B5BF0'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z" stroke={item.expired || item.past ? '#9CA3AF' : item.pending ? '#F59E0B' : '#1B5BF0'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className={`text-[11px] font-semibold ${
                    item.expired || item.past ? 'text-[#9CA3AF]' : item.pending ? 'text-[#B45309]' : 'text-[#1B5BF0]'
                  }`}>
                    {item.expired ? '기간 만료' : item.pending ? '수락 대기' : item.received ? '받은 티켓' : '선물 완료'}
                  </span>
                </div>
                <span className="text-[11px] text-[#9CA3AF]">{item.date}</span>
              </div>
              {/* 티켓 정보 */}
              <div className="px-4 py-3.5 flex flex-col gap-2.5">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <span className="text-[10px] text-[#9CA3AF] font-mono">{item.no}</span>
                    <span className={`whitespace-pre-line text-[13px] font-bold leading-snug ${item.expired ? 'text-[#9CA3AF]' : 'text-[#111827]'}`}>{item.game}</span>
                    <span className="text-[11px] text-[#9CA3AF]">{item.gameDetail}</span>
                  </div>
                  <span className={`shrink-0 text-[11px] font-bold px-2 py-0.5 rounded-lg ${item.expired ? 'text-[#9CA3AF] bg-[#EAECF2]' : 'text-[#1B5BF0] bg-[#EBF0FF]'}`}>{item.qty}매</span>
                </div>
                <div className={`flex flex-col gap-1.5 pt-2 border-t ${item.expired ? 'border-[#E2E5EF]' : 'border-[#F1F3F8]'}`}>
                  <div className="flex items-center gap-1.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="#9CA3AF" strokeWidth="1.8"/><circle cx="12" cy="10" r="3" stroke="#9CA3AF" strokeWidth="1.8"/></svg>
                    <span className="text-[11px] text-[#9CA3AF]">{item.seat}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="#9CA3AF" strokeWidth="1.8" strokeLinecap="round"/><circle cx="12" cy="7" r="4" stroke="#9CA3AF" strokeWidth="1.8"/></svg>
                    <span className="text-[11px] text-[#9CA3AF]">보낸 분 · <span className={`font-medium ${item.expired ? 'text-[#9CA3AF]' : 'text-[#111827]'}`}>{item.sender}</span></span>
                  </div>
                  {item.message ? (
                    <div className="flex items-start gap-1.5 mt-0.5">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" stroke="#9CA3AF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      <span className="text-[11px] text-[#9CA3AF] italic">"{item.message}"</span>
                    </div>
                  ) : null}
                </div>
              </div>
              {item.pending && giftHistoryTab === '받은 티켓' && (
                <div className="border-t border-[#FBBF24]/30 px-4 py-3">
                  <button
                    type="button"
                    onClick={() => navigate('/my/ticket-qr?mode=gift')}
                    className="h-10 w-full rounded-xl bg-[#1B5BF0] text-[13px] font-semibold text-white"
                  >
                    선물 확인하기
                  </button>
                </div>
              )}
              {item.received && !item.past && giftHistoryTab === '받은 티켓' && (
                <div className="border-t border-[#DDE1EC] px-4 py-3">
                  <button
                    type="button"
                    onClick={() => navigate('/my/ticket-qr')}
                    className="h-10 w-full rounded-xl bg-[#1B5BF0] text-[13px] font-semibold text-white"
                  >
                    스마트 티켓
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* 선물하기 탭 콘텐츠 */}
      {activeTab === 0 && (
        <>
          <div className="px-4 pt-4 flex flex-col gap-4">
            {/* Select ticket */}
            <div className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] p-4">
              <p className="text-xs text-[#64748B] mb-1">선물할 티켓 선택</p>
              <p className="text-xs font-semibold text-[#1B5BF0] mb-3">총 {selectedTickets.length}매 선택</p>
              <div className="flex flex-col gap-2.5">
                {TICKETS.map((ticket, i) => {
                  const isSelected = selectedTickets.includes(i)
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => toggleTicket(i)}
                      className={`flex items-start gap-3 w-full text-left cursor-pointer rounded-xl p-3 border transition-colors ${isSelected ? 'border-[#1B5BF0] bg-[#EEF3FF]' : 'border-[#DDE1EC] bg-[#F9FAFB]'}`}
                    >
                      <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 border-2 mt-0.5 transition-colors ${isSelected ? 'bg-[#1B5BF0] border-[#1B5BF0]' : 'border-[#D1D5DB] bg-white'}`}>
                        {isSelected && (
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                            <path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                        <span className="text-[10px] text-[#9CA3AF] font-mono">{ticket.no}</span>
                        <span className="whitespace-pre-line text-[13px] font-semibold text-[#111827] leading-snug">{ticket.game}</span>
                        <span className="text-[11px] font-medium text-[#64748B]">{ticket.date}</span>
                        <span className="text-[11px] text-[#64748B]">{ticket.seat}</span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
            {/* Recipient — nickname search */}
            <RecipientSection />
          </div>
          <div className="px-4 pt-6 flex flex-col gap-4">
            {/* 유의사항 */}
            <div className="bg-[#FFF8F0] border border-[#FFD9B0] rounded-xl px-3.5 py-3.5 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="shrink-0">
                  <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="#E65100" strokeWidth="1.8"/>
                  <path d="M12 9v4M12 17h.01" stroke="#E65100" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span className="text-[11px] font-bold text-[#E65100]">티켓 선물 유의사항</span>
              </div>
              {[
                '선물한 티켓은 24시간 이내 수락하지 않으면 자동 취소됩니다.',
                '수락 후에는 회수할 수 없으며, 상대방이 \'돌려주기\'를 통해 다시 보내야 합니다.',
                '불법 거래 등 부정 이용이 확인될 경우, 해당 계정의 서비스 이용이 영구 정지될 수 있습니다.',
              ].map((msg, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-[10px] font-bold text-[#E65100] shrink-0 mt-0.5">{i + 1}.</span>
                  <p className="text-[11px] text-[#7C3A00] leading-relaxed">{msg}</p>
                </div>
              ))}
            </div>
            {/* 확인 체크박스 */}
            <button
              onClick={() => setConfirmed(v => !v)}
              className="flex items-start gap-3 w-full text-left"
            >
              <div className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center shrink-0 border-2 transition-colors ${confirmed ? 'bg-[#1B5BF0] border-[#1B5BF0]' : 'border-[#D1D5DB] bg-white'}`}>
                {confirmed && (
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[13px] font-semibold text-[#374151] leading-snug">
                  모바일 티켓 발권 동의 및 종이 티켓 전환 불가 안내 확인
                </span>
                <span className="text-[11px] text-[#64748B] leading-relaxed">
                  본 스마트 티켓 발권 시 종이 티켓으로의 교환 및 전환이 절대 불가함을 확인하였으며 이에 동의합니다.
                </span>
              </div>
            </button>

            <button
              disabled={!confirmed}
              className={`w-full h-14 rounded-2xl font-bold transition-colors ${confirmed ? 'bg-[#1B5BF0] text-white' : 'bg-[#DDE1EC] text-[#9CA3AF]'}`}
            >
              티켓 선물하기
            </button>
          </div>
        </>
      )}
    </div>
  )
}
