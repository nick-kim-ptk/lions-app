import { useState, useRef, useEffect } from 'react'
import { GameStateNotice } from '@/components/GameCaseBar'
import { useCaseState, seasonLabel, isSeasonEndPhase } from '@/data/caseStore'
import { CaseSelect } from '@/components/CaseSelect'
import mobileTicketQr from '@/assets/images/mobile-ticket-qr-sample.png'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { MOBILE_TICKETS, SEASON_PASS, SEASON_PASS_TICKETS } from '@/data/my'
import { MOCK_TIME, MOCK_TODAY, addDays, fmtMDW } from '@/data/mock'

type TicketMode = '스마트 티켓' | '시즌권 티켓' | 'QR 오픈 전' | '선물 받은 티켓' | '선물 전'
const TICKET_MODES = ['스마트 티켓', '시즌권 티켓', 'QR 오픈 전', '선물 받은 티켓', '선물 전'] as const

export function MobileTicketQRScreen() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [current, setCurrent] = useState(0)
  const [ticketMode, setTicketMode] = useState<TicketMode>(
    searchParams.get('mode') === 'gift' ? '선물 전' : '스마트 티켓'
  )
  const [drag, setDrag] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [returned, setReturned] = useState<number[]>([])
  const [returnConfirm, setReturnConfirm] = useState(false)
  const [qrSeconds, setQrSeconds] = useState(59)
  const [isQrModalOpen, setIsQrModalOpen] = useState(false)
  const touchStartX = useRef(0)
  const isPass = ticketMode === '시즌권 티켓'
  const tickets = isPass ? SEASON_PASS_TICKETS : MOBILE_TICKETS
  const ticket = tickets[Math.min(current, tickets.length - 1)]
  const { phase } = useCaseState()

  useEffect(() => {
    const timer = window.setInterval(() => {
      setQrSeconds(seconds => (seconds <= 0 ? 59 : seconds - 1)) // 1분마다 자동 갱신
    }, 1000)
    return () => window.clearInterval(timer)
  }, [])

  // 자동 회수 시각: 기준 시각(mock clock)으로부터 24시간 후
  const expireStr = `${fmtMDW(addDays(MOCK_TODAY, 1))} ${MOCK_TIME}까지`

  // 시즌 종료(탈락·우승·비시즌): 사용할 수 있는 스마트 티켓이 없음
  if (isSeasonEndPhase(phase)) {
    return (
      <div className="fixed inset-0 z-50 bg-[#0E1A40] flex flex-col">
        <div className="flex items-center justify-between px-5 pt-12 pb-4">
          <span className="text-white font-bold text-base">스마트 티켓</span>
          <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center gap-1 px-8 text-center">
          <p className="text-white text-[15px] font-bold">사용할 수 있는 티켓이 없어요</p>
          <p className="text-white/60 text-[12px]">다음 시즌 예매가 열리면 스마트 티켓이 여기에 표시돼요.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#0E1A40] flex flex-col overflow-y-auto">
      {/* 상단 닫기 */}
      <div className="flex items-center justify-between px-5 pt-12 pb-4">
        <div className="flex flex-col gap-0.5">
          <span className="text-white/50 text-[11px]">2027 KBO {seasonLabel(phase)}</span>
          <span className="text-white font-bold text-base">스마트 티켓</span>
        </div>
        <div className="flex items-center gap-2">
          {/* 토글 — 빨간 닷 감싸기 */}
          <CaseSelect variant="dark" value={ticketMode} options={TICKET_MODES} onChange={(m) => { setTicketMode(m); setCurrent(0) }} />
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="px-5 pb-3"><GameStateNotice context="ticket" dark inset={false} /></div>

      {/* 티켓 카운터 — 경기 날짜순, 숫자 표기 */}
      <div className="flex items-center justify-between px-5 mb-3">
        <span className="text-white text-[12px] font-bold tabular-nums">{current + 1} <span className="text-white/40 font-medium">/ {tickets.length}장</span></span>
        <span className="text-white/40 text-[11px]">경기 날짜순 · 좌우로 넘겨보세요</span>
      </div>

      {/* 티켓 카드 — 카드 자체가 좌우로 이동하는 캐러셀 */}
      <div
        className="overflow-hidden"
        onTouchStart={e => { touchStartX.current = e.touches[0].clientX; setDragging(true) }}
        onTouchMove={e => {
          const dx = e.touches[0].clientX - touchStartX.current
          const atEdge = (current === 0 && dx > 0) || (current === tickets.length - 1 && dx < 0)
          setDrag(atEdge ? dx * 0.25 : dx)
        }}
        onTouchEnd={() => {
          if (drag < -60) setCurrent(i => Math.min(i + 1, tickets.length - 1))
          if (drag > 60) setCurrent(i => Math.max(i - 1, 0))
          setDrag(0)
          setDragging(false)
        }}
      >
        <div
          className="flex"
          style={{
            transform: `translateX(calc(${-current * 100}% + ${drag}px))`,
            transition: dragging ? 'none' : 'transform 0.3s ease',
          }}
        >
          {tickets.map((ticket) => (
            <div key={ticket.id} className="w-full shrink-0 px-5">
              <div className={`bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col ${isPass ? 'ring-2 ring-[#F0A500]/70' : ''}`}>
        {/* ── KV 이미지 영역 ── */}
        <div className="relative h-[440px] overflow-hidden flex flex-col justify-between">
          {/* 폴백 배경 — 항상 깔림 */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A1A4E] via-[#1B5BF0] to-[#0E2F80]" />
          {isPass && (
            <>
              {/* 시즌권 전용 고정 디자인 — 시즌 내내 동일(테마 KV 미적용) */}
              <div className="absolute inset-0" style={{ background: 'linear-gradient(165deg,#050D26 0%,#0A1A4E 45%,#0E2F80 100%)' }} />
              <div className="absolute inset-0 opacity-30" style={{ background: 'repeating-linear-gradient(135deg, transparent 0 22px, rgba(240,165,0,0.35) 22px 23px)' }} />
              <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full" style={{ background: 'radial-gradient(circle, rgba(240,165,0,0.45) 0%, transparent 65%)' }} />
              <div className="absolute -left-20 bottom-24 h-56 w-56 rounded-full" style={{ background: 'radial-gradient(circle, rgba(27,91,240,0.5) 0%, transparent 70%)' }} />
              <span className="absolute left-1/2 top-[88px] -translate-x-1/2 select-none text-[120px] font-black leading-none tracking-tighter text-white/[0.06]">2027</span>
              <div className="absolute left-1/2 top-[120px] z-10 flex -translate-x-1/2 flex-col items-center gap-2">
                <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#F0A500] bg-[#0A1A4E]/70 shadow-[0_0_28px_rgba(240,165,0,0.45)]">
                  <span className="text-[38px]">🦁</span>
                </div>
                <span className="text-[#F0A500] text-[11px] font-black tracking-[0.35em]">PREMIUM BLUE</span>
                <span className="text-white text-[22px] font-black leading-none tracking-[0.12em]">SEASON PASS</span>
              </div>
            </>
          )}
          {/* 교체 가능한 KV 이미지 — 중앙 정렬 */}
          {!isPass && ticket.kvImage && (
            <div
              className="absolute inset-0 bg-center bg-cover"
              style={{ backgroundImage: `url(${ticket.kvImage})`, backgroundSize: 'cover', backgroundPosition: 'center top' }}
            />
          )}
          {/* 하단 그라데이션 오버레이 — 텍스트 가독성 */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

          {/* 상단 eyebrow */}
          <div className="px-5 pt-4 relative z-10">
            <span className="text-white/70 text-[9px] font-bold tracking-[0.2em] uppercase drop-shadow">Samsung Lions · {isPass ? '2027 SEASON PASS' : '2027 KBO'}</span>
          </div>

          {/* 빈 중앙 — 선수 이미지 공간 */}
          <div className="flex-1" />

          {/* 경기 정보 — 하단 정렬 */}
          <div className="flex items-end justify-between px-5 pb-2 relative z-10">
            <div className="flex flex-col">
              <span className="text-white text-[20px] font-black leading-none tracking-tight drop-shadow-md">삼성 라이온즈</span>
              <span className="text-white/60 text-[11px] font-semibold mt-0.5 drop-shadow">vs {ticket.opponent}</span>
            </div>
            <div className="flex flex-col items-end gap-0.5">
              <span className="text-white text-[12px] font-bold drop-shadow">{ticket.date}</span>
              <span className="text-white/50 text-[10px] drop-shadow">대구 삼성 라이온즈파크</span>
            </div>
          </div>

          {/* 흐르는 띠 — 하단 */}
          <div className="relative h-7 bg-black/40 overflow-hidden flex items-center z-10">
            <div
              className="flex items-center gap-8 whitespace-nowrap absolute h-full"
              style={{ animation: 'ticketScroll 12s linear infinite' }}
            >
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 shrink-0">
                  <span className={`w-1 h-1 rounded-full inline-block ${isPass ? 'bg-[#F0A500]' : 'bg-[#4ADE80]'}`} />
                  <span className={`text-[9px] font-bold tracking-[0.18em] ${isPass ? 'text-[#F0A500]' : 'text-[#4ADE80]'}`}>캡처·촬영 시 입장 제한됩니다</span>
                  <span className="text-white/30 text-[9px] font-bold tracking-[0.18em]">{isPass ? 'SEASON PASS MEMBER' : 'VALID TICKET'}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── 티어 라인 ── */}
        <div className="relative flex items-center bg-white">
          <div className="w-5 h-5 rounded-full bg-[#0E1A40] -ml-2.5 z-10" />
          <div className="flex-1 border-t-2 border-dashed border-[#DDE1EC]" />
          <div className="w-5 h-5 rounded-full bg-[#0E1A40] -mr-2.5 z-10" />
        </div>

        {/* ── 하단 콘텐츠 — 모드 분기 ── */}
        {ticketMode !== '선물 전' ? (
          <div className="flex flex-col px-5 py-4 gap-3">
            {isPass && (
              <div className="flex items-center justify-between rounded-xl px-3.5 py-3" style={{ background: 'linear-gradient(90deg,#0A1A4E,#0E2F80)' }}>
                <div>
                  <p className="text-[#F0A500] text-[9px] font-bold tracking-[0.2em]">SEASON PASS MEMBER</p>
                  <p className="mt-0.5 text-white text-[15px] font-black leading-none">{SEASON_PASS.holder}</p>
                </div>
                <div className="text-right">
                  <p className="text-white/50 text-[9px]">{SEASON_PASS.name}</p>
                  <p className="mt-0.5 text-white text-[11px] font-semibold">유효기간 · 27.12.31</p>
                </div>
              </div>
            )}
            {ticketMode === '선물 받은 티켓' && (
              <div className="flex items-center justify-between rounded-xl bg-[#FFF1F0] px-3 py-2">
                <span className="text-[11px] font-bold text-[#E53935]">🎁 선물 받은 티켓</span>
                <span className="text-[10px] text-[#9CA3AF]">보낸 분 · <span className="font-semibold text-[#64748B]">라이온하트</span></span>
              </div>
            )}
            {/* 티켓 정보 */}
            <div className="grid grid-cols-[1fr_auto] gap-x-8 gap-y-4">
              <div className="col-span-2">
                <p className="text-[10px] text-[#9CA3AF] mb-0.5">{isPass ? '시즌권 회원번호' : '티켓 번호'}</p>
                <p className="text-[17px] font-mono font-black leading-none tracking-tight text-[#111827]">{ticket.ticketNo}</p>
              </div>
              <div>
                <p className="text-[10px] text-[#9CA3AF] mb-0.5">{isPass ? '좌석 정보 · 고정석' : '좌석 정보'}</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-[#111827] text-[16px] font-black leading-tight">{ticket.zone}</p>
                  <p className="text-[#1B5BF0] text-[13px] font-bold leading-tight">{ticket.seat}</p>
                </div>
              </div>
              <div>
                <p className="text-[10px] text-[#9CA3AF] mb-0.5">게이트</p>
                <p className="text-[#111827] text-[17px] font-black leading-none tracking-tight">{ticket.gate}</p>
              </div>
            </div>

            {/* QR — 경기 시작 2시간 전부터 노출 */}
            {returned.includes(ticket.id) ? (
              <div className="flex flex-col items-center gap-1 border-t border-[#F1F3F8] py-8 text-center">
                <p className="text-[14px] font-bold text-[#374151]">보낸 분에게 돌려준 티켓이에요</p>
                <p className="text-[11px] text-[#9CA3AF]">이 티켓은 더 이상 사용할 수 없어요.</p>
              </div>
            ) : !(ticketMode !== 'QR 오픈 전' && ticket.barcodeOpen) ? (
              <div className="flex flex-col items-center gap-2 border-t border-[#F1F3F8] py-7 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F1F3F8]">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <rect x="5" y="11" width="14" height="10" rx="2" stroke="#64748B" strokeWidth="2" />
                    <path d="M8 11V8a4 4 0 018 0v3" stroke="#64748B" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <p className="text-[14px] font-bold text-[#374151]">입장 QR은 아직 열리지 않았어요</p>
                <p className="text-[12px] leading-relaxed text-[#64748B]">
                  경기 시작 2시간 전부터 표시돼요.<br />
                  <span className="font-semibold text-[#1B5BF0]">{ticket.barcodeOpenLabel}</span> 오픈
                </p>
              </div>
            ) : (
            <div className="flex flex-col items-center border-t border-[#F1F3F8] pt-3">
              <div className="mb-1 flex items-center justify-center gap-2">
                <p className="text-center text-[13px] font-semibold text-[#374151]">
                  입장 시, 직원에게 QR을 제시해주시기 바랍니다.
                </p>
                <button
                  onClick={() => setIsQrModalOpen(true)}
                  aria-label="QR 코드 크게 보기"
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-[#DDE1EC] bg-white text-[#64748B]"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                    <path d="M20 20l-4-4M11 8v6M8 11h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
              <div className="relative h-44 w-44">
                <img
                  src={mobileTicketQr}
                  alt="입장용 QR 코드"
                  className={`h-full w-full `}
                />
              </div>
              <div className="relative flex w-44 items-center justify-center">
                <span className="text-[11px] font-semibold tabular-nums text-[#64748B]">
                  QR 자동 갱신까지 00:{String(qrSeconds).padStart(2, '0')}
                </span>
                <button
                  onClick={() => setQrSeconds(59)}
                  aria-label="QR 코드 새로고침"
                  className="absolute right-0 flex h-7 w-7 items-center justify-center rounded-md border border-[#DDE1EC] bg-white text-[#64748B]"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6v5h-5M4 18v-5h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M18.5 9A7 7 0 006.7 6.7L4 11M5.5 15A7 7 0 0017.3 17.3L20 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
            )}
          </div>
        ) : (
          /* 선물 전 모드 */
          <div className="flex flex-col px-5 py-5 gap-4">
            {/* 티켓 도착 안내 */}
            <div className="flex flex-col items-center gap-2 py-2">
              <div className="w-11 h-11 rounded-full bg-[#E53935]/10 flex items-center justify-center">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M20 12v8a1 1 0 01-1 1H5a1 1 0 01-1-1v-8" stroke="#E53935" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 7H2v5h20V7z" stroke="#E53935" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 22V7" stroke="#E53935" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z" stroke="#E53935" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z" stroke="#E53935" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="text-[15px] font-black text-[#111827]">티켓이 도착했습니다.</p>
              <p className="text-[12px] text-[#64748B] text-center leading-relaxed">
                24시간 내로 선물 받기를 누르지 않으면<br />티켓이 자동으로 회수됩니다.
              </p>
            </div>

            {/* 보내는 메시지 */}
            <div className="w-full bg-[#F5F7FB] border border-[#DDE1EC] rounded-2xl px-4 py-3 flex flex-col gap-1.5">
              <div className="flex items-center gap-1.5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="shrink-0">
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" stroke="#9CA3AF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-[10px] text-[#9CA3AF] font-semibold">보내는 메시지</span>
              </div>
              <p className="text-[13px] text-[#374151] leading-relaxed italic">"생일 축하해! 같이 응원하자 🦁"</p>
              <p className="text-[10px] text-[#9CA3AF]">보낸 분 · <span className="font-semibold text-[#64748B]">라이온하트</span></p>
            </div>

            {/* 자동 회수 기간 */}
            <div className="flex items-center justify-center gap-1.5 bg-[#FFF8E1] border border-[#FBBF24]/40 rounded-xl px-4 py-2.5">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#F59E0B" strokeWidth="1.8"/>
                <path d="M12 6v6l4 2" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
              <span className="text-[11px] text-[#92400E] font-medium">자동 회수 기간 · {expireStr}</span>
            </div>

            {/* 선물 받기 / 받지 않기 */}
            <div className="flex flex-col gap-2">
              <button className="w-full h-12 rounded-2xl bg-[#E53935] text-white text-[14px] font-black shadow-md shadow-[#E53935]/20">
                선물 받기
              </button>
              <button className="w-full h-10 rounded-2xl bg-[#F3F4F6] text-[#6B7280] text-[13px] font-medium">
                받지 않기
              </button>
            </div>
          </div>
        )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 하단 버튼 영역 */}
      {isPass && (
        <div className="px-5 pt-4 pb-10 text-center text-[11px] leading-relaxed text-white/50">
          시즌권 티켓은 회원 본인 좌석으로 홈경기마다 자동 발급돼요.<br />경기 시작 2시간 전부터 QR이 표시돼요.
        </div>
      )}
      {ticketMode === '스마트 티켓' && (
        <div className="px-5 pt-4 pb-10">
          <button
            onClick={() => navigate('/my/ticket-gift')}
            className="w-full h-12 rounded-2xl bg-white/10 border border-white/20 text-white text-sm font-semibold"
          >
            티켓 선물하기
          </button>
        </div>
      )}
      {ticketMode === 'QR 오픈 전' && (
        <div className="px-5 pt-4 pb-10">
          <button
            onClick={() => navigate('/my/ticket-gift')}
            className="w-full h-12 rounded-2xl bg-white/10 border border-white/20 text-white text-sm font-semibold"
          >
            티켓 선물하기
          </button>
        </div>
      )}
      {ticketMode === '선물 받은 티켓' && (
        <div className="px-5 pt-4 pb-10 flex flex-col gap-2">
          <button
            disabled={returned.includes(ticket.id)}
            onClick={() => setReturnConfirm(true)}
            className="w-full h-12 rounded-2xl bg-white/10 border border-white/20 text-white text-sm font-semibold disabled:opacity-40"
          >
            {returned.includes(ticket.id) ? '돌려주기 완료' : '돌려주기'}
          </button>
          <p className="text-center text-[11px] text-white/50">선물 받은 티켓은 다시 선물할 수 없어요. 보낸 분에게 돌려줄 수 있어요.</p>
        </div>
      )}
      {ticketMode === '선물 전' && <div className="pb-10" />}

      {returnConfirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 px-8" onClick={() => setReturnConfirm(false)}>
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 text-center" onClick={e => e.stopPropagation()}>
            <p className="text-[16px] font-black text-[#111827]">티켓을 돌려줄까요?</p>
            <p className="mt-2 text-[12px] leading-relaxed text-[#64748B]">
              보낸 분(라이온하트)에게 티켓이 돌아가며,<br />돌려준 티켓은 다시 받을 수 없어요.
            </p>
            <div className="mt-5 flex gap-2">
              <button onClick={() => setReturnConfirm(false)} className="h-11 flex-1 rounded-xl bg-[#F3F4F6] text-[13px] font-bold text-[#6B7280]">취소</button>
              <button
                onClick={() => { setReturned(r => [...r, ticket.id]); setReturnConfirm(false) }}
                className="h-11 flex-1 rounded-xl bg-[#1B5BF0] text-[13px] font-bold text-white"
              >
                돌려주기
              </button>
            </div>
          </div>
        </div>
      )}

      {isQrModalOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 px-6"
          onClick={() => setIsQrModalOpen(false)}
        >
          <div
            className="relative w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl"
            onClick={event => event.stopPropagation()}
          >
            <button
              onClick={() => setIsQrModalOpen(false)}
              aria-label="QR 코드 크게 보기 닫기"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#F1F3F8] text-[#374151]"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            <div className="flex flex-col items-center pt-8">
              <p className="mb-1 text-[15px] font-bold text-[#111827]">입장용 QR 코드</p>
              <p className="mb-4 text-[11px] text-[#9CA3AF]">확대하면 화면 밝기가 자동으로 높아지고, 닫으면 원래대로 돌아와요.</p>
              <div className="relative h-72 w-72 max-w-full">
                <img
                  src={mobileTicketQr}
                  alt="확대된 입장용 QR 코드"
                  className={`h-full w-full `}
                />
              </div>
              <span className="mt-3 text-[12px] font-semibold tabular-nums text-[#64748B]">
                QR 자동 갱신까지 00:{String(qrSeconds).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
