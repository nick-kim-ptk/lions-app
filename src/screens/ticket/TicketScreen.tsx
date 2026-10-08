import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { PH, PHCircle, PHSection } from '@/components/Placeholder'
import { Header } from '@/components/Layout'
import { GameStateNotice } from '@/components/GameCaseBar'
import { withCaseGames, useCaseState } from '@/data/caseStore'
import { CaseSelect } from '@/components/CaseSelect'
import { AUTHENTIC_SHOP_ITEMS, BEERYS_SHOP_ITEMS, DURATION } from '@/data/ticket'
import {
  TEAMS, MY_TEAM, MOCK_TODAY, fmtMD, fmtMDW, fmtSlashMDW,
  bookableHomeGames, nextSaleOpeningGame, ticketSaleOf, ticketStateOf,
} from '@/data/mock'

function useTicketCountdown() {
  const [startedAt, setStartedAt] = useState(() => Date.now())
  const [ms, setMs] = useState(() => DURATION)
  useEffect(() => {
    const id = setInterval(() => setMs(Math.max(0, DURATION - (Date.now() - startedAt))), 10)
    return () => clearInterval(id)
  }, [startedAt])
  const reset = () => setStartedAt(Date.now())
  return { ms, label: '선예매', sub: '일반 11:00', reset }
}

// 017-SL-TK-01 티켓+(Ticket+)
export function TicketScreen() {
  const navigate = useNavigate()
  const { ms, label, sub, reset } = useTicketCountdown()
  const [showMoreGames, setShowMoreGames] = useState(false)
  const totalSec = Math.floor(ms / 1000)
  const mm = String(Math.floor(totalSec / 60)).padStart(2, '0')
  const ss = String(totalSec % 60).padStart(2, '0')
  const cs = String(Math.floor((ms % 1000) / 10)).padStart(2, '0')

  // 10초 이하에서 점점 황갈색으로 변하는 배경: 0초→#7A5C00, 10초→원래 네이비(#0E1A40)
  const urgency = totalSec <= 10 ? (10 - totalSec) / 10 : 0
  // #e8c444 = rgb(232, 196, 68)
  const r = Math.round(14 + (232 - 14) * urgency)
  const g = Math.round(26 + (196 - 26) * urgency)
  const b = Math.round(64 + (68 - 64) * urgency)
  const urgentDotColor = urgency > 0.5 ? '#e8c444' : '#4ADE80'
  const countdownBg = `rgb(${r},${g},${b})`

  // 예매 가능한 홈 경기 (오늘 이후). 상태(오픈 전/선예매/매진/마감)는 일정 더미에서 계산
  // 매진·예매 마감은 앱이 파악하지 않는다(예매 화면에서 처리). 전역 케이스(취소·연기·더블헤더)만 오늘 경기에 반영
  const { phase } = useCaseState()
  // 케이스: 시즌 중 / 시즌 종료 — 전역 시즌 단계가 비시즌이면 시즌 종료로 자동 전환
  const [ticketCase, setTicketCase] = useState<'시즌 중' | '시즌 종료'>(phase === '비시즌' ? '시즌 종료' : '시즌 중')
  useEffect(() => { setTicketCase(phase === '비시즌' ? '시즌 종료' : '시즌 중') }, [phase])
  const seasonEnd = ticketCase === '시즌 종료'
  const inSeason = !seasonEnd
  const homeGames = inSeason ? bookableHomeGames().flatMap(withCaseGames).filter((g) => g.status !== 'final') : []
  const visibleGames = showMoreGames ? homeGames : homeGames.slice(0, 3)

  // 예매 오픈 카운트다운/히어로 대상: 아직 열리지 않은 가장 가까운 홈 경기 (없으면 가장 가까운 예매 가능 경기)
  const openingGame = inSeason ? nextSaleOpeningGame() : undefined
  const heroGame = openingGame ?? homeGames[0]
  const heroSale = heroGame ? ticketSaleOf(heroGame) : null
  const heroOpp = heroGame ? TEAMS[heroGame.opp] : null
  const heroState = heroGame ? ticketStateOf(heroGame) : null
  const heroCanBook = heroState !== null && !['before', 'cancelled', 'away'].includes(heroState)
  const heroOff = heroState === 'cancelled'

  return (
    <div className="min-h-full bg-[#F5F7FB] pb-4">
      <Header showBack={false} showNotif showMenu bare />
      <GameStateNotice context="ticketlist" />
      <div className="flex justify-end px-4 pt-3">
        <CaseSelect value={ticketCase} options={['시즌 중', '시즌 종료'] as const} onChange={setTicketCase} />
      </div>

      {/* 예매 오픈 D-5분 카운트다운 바 */}
      {openingGame && heroOpp && (
        <div className="px-4 pt-3">
          <div
            className="relative overflow-hidden rounded-2xl px-4 flex items-center gap-3"
            style={{ backgroundColor: countdownBg, transition: 'background-color 0.5s ease', height: '56px' }}
          >
            {/* 배경 pulse 링 */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5">
              <div className="absolute inset-0 rounded-full animate-ping" style={{backgroundColor: urgentDotColor + '66', animationDuration: urgency > 0 ? '0.6s' : '1s'}} />
              <div className="absolute inset-0.5 rounded-full animate-ping" style={{backgroundColor: urgentDotColor + '99', animationDuration: urgency > 0 ? '0.6s' : '1s', animationDelay:'0.15s'}} />
              <div className="absolute inset-1 rounded-full" style={{backgroundColor: urgentDotColor}} />
            </div>
            {ms === 0 ? (
              <div className="flex-1 text-center py-1 cursor-pointer" onClick={reset}>
                <p className="text-white text-[16px] font-black leading-tight">🎉 행운을 빕니다!</p>
                <p className="text-white/60 text-[11px] mt-1 leading-snug">선예매가 오픈되었습니다. 일반 예매는 11시에 시작합니다.</p>
              </div>
            ) : (
              <>
                <div className="w-5 h-5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-white text-[12px] font-bold leading-tight">{fmtSlashMDW(openingGame.date)} {heroOpp.short}전 {label} 오픈 임박</p>
                  <p className="text-white/40 text-[10px] mt-0.5">{sub}</p>
                </div>
                <div className="flex items-baseline gap-0.5 tabular-nums shrink-0">
                  <span className="text-[26px] font-black text-white leading-none">{mm}</span>
                  <span className="text-[11px] font-bold text-white/50 leading-none mb-0.5">분</span>
                  <span className="text-[26px] font-black text-white leading-none ml-1">{ss}</span>
                  <span className="text-[11px] font-bold text-white/50 leading-none mb-0.5">초</span>
                  <span className="text-[18px] font-black text-[#4ADE80] leading-none ml-1">{cs}</span>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Hero Banner */}
      {heroGame && heroOpp && (
        <div className="px-4 pt-3 pb-4">
          <div className="relative w-full rounded-3xl overflow-hidden bg-gradient-to-br from-[#1B5BF0] to-[#0E2F80]">
            <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-white/5" />
            <div className="absolute right-10 bottom-0 w-24 h-24 rounded-full bg-white/5" />

            <div className="relative p-5">
              {/* 경기 일시 */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] font-bold text-white bg-white/20 rounded-full px-2.5 py-0.5 tracking-wide">홈</span>
                <span className="text-[12px] text-white/80 font-medium">{fmtMDW(heroGame.date)} · {heroGame.time}</span>
              </div>
              <div className="flex items-center gap-4 mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{MY_TEAM.short}</span>
                  </div>
                  <span className="text-white text-[18px] font-black">{MY_TEAM.name}</span>
                </div>
                <span className="text-white/40 text-sm font-bold">VS</span>
                <div className="flex items-center gap-2">
                  <span className="text-white/80 text-[15px] font-bold">{heroOpp.name}</span>
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{heroOpp.short}</span>
                  </div>
                </div>
              </div>
              {/* 예매 오픈 안내 + CTA */}
              <div className="flex items-center justify-between gap-3 bg-white/10 rounded-2xl px-4 py-3">
                <div>
                  <p className="text-white/60 text-[10px] font-medium mb-0.5">{heroOff ? '예매 불가' : heroCanBook ? '예매 가능' : '선예매 일시'}</p>
                  <p className="text-white text-[14px] font-black">
                    {heroOff ? '경기가 열리지 않아요' : heroCanBook ? '지금 예매하세요' : heroSale ? `${fmtMD(heroSale.preSaleAt.date)} ${heroSale.preSaleAt.time}` : ''}
                  </p>
                </div>
                <button
                  disabled={!heroCanBook}
                  className={`h-10 px-5 rounded-xl border text-sm font-bold shrink-0 ${
                    heroCanBook ? 'bg-white text-[#0E2F80] border-white' : 'bg-white/20 border-white/30 text-white/40 cursor-not-allowed'
                  }`}
                >
                  티켓 예매
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick actions */}
      <div className="px-4 mb-5">
        <div className="grid grid-cols-2 gap-2.5">
          {[
            {
              label: '예매 내역',
              path: '/my/booking-history',
              icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1B5BF0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              )
            },
            {
              label: '티켓 선물',
              path: '/my/ticket-gift',
              icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1B5BF0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 12 20 22 4 22 4 12" />
                  <rect x="2" y="7" width="20" height="5" />
                  <line x1="12" y1="22" x2="12" y2="7" />
                  <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
                  <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
                </svg>
              )
            },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className="flex items-center gap-2.5 bg-[#FFFFFF] rounded-xl border border-[#DDE1EC] px-3.5 py-2.5 active:bg-gray-50 transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-[#EBF0FF] flex items-center justify-center shrink-0">
                {item.icon}
              </div>
              <span className="text-[13px] font-bold text-[#111827]">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Games list */}
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[15px] font-bold text-[#111827]">경기 티켓</span>
          <button
            onClick={() => navigate('/my/booking-guide')}
            className="flex items-center gap-1 text-[12px] font-medium text-[#64748B] hover:text-[#111827] transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            <span>예매 안내</span>
          </button>
        </div>
        {homeGames.length === 0 && (
          <div className="rounded-2xl border border-[#DDE1EC] bg-white p-6 text-center">
            <p className="text-[13px] font-bold text-[#0E1A40]">{seasonEnd ? '2026 시즌 예매가 종료되었어요' : '예매 가능한 경기가 없어요'}</p>
            <p className="mt-1 text-[11px] text-[#9CA3AF]">다음 시즌 일정이 공개되면 안내드려요.</p>
          </div>
        )}
        <div className="flex flex-col gap-3">
          {visibleGames.map((g) => {
            const opp = TEAMS[g.opp]
            const state = ticketStateOf(g)
            const sale = ticketSaleOf(g)
            const isToday = g.date === MOCK_TODAY
            const dhTag = g.note?.startsWith('더블헤더') ? g.note.replace('더블헤더 ', '') : null
            return (
              <div key={g.id} className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold rounded-full px-2 py-0.5 text-white bg-[#1B5BF0]">홈</span>
                    <span className="text-[12px] font-semibold text-[#111827]">{fmtMDW(g.date)}</span>
                    <span className="text-[11px] text-[#64748B]">{g.time}</span>
                    {isToday && <span className="text-[10px] font-bold text-[#E53935] bg-[#FDECEC] rounded-full px-2 py-0.5">오늘</span>}
                    {dhTag && <span className="text-[10px] font-bold text-[#0E1A40] bg-[#F0F2F5] rounded-full px-2 py-0.5">{dhTag}</span>}
                  </div>
                  {state === 'before' && sale && (
                    <div className="flex items-center gap-1 bg-[#F5F7FB] rounded-full px-2.5 py-1">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#9CA3AF" strokeWidth="2"/><path d="M12 6v6l3 2" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"/></svg>
                      <span className="text-[10px] text-[#9CA3AF] font-medium">{fmtMD(sale.preSaleAt.date)} {sale.preSaleAt.time} 오픈</span>
                    </div>
                  )}
                  {state === 'presale' && (
                    <span className="text-[10px] font-semibold text-[#1B5BF0] bg-[#EBF0FF] rounded-full px-2.5 py-1">선예매 중 · 일반 11:00</span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <PHCircle className="w-8 h-8" />
                    <span className="text-[13px] font-semibold text-[#111827]">{MY_TEAM.short}</span>
                  </div>
                  <span className="text-[#9CA3AF] text-xs mx-1">VS</span>
                  <div className="flex items-center gap-2">
                    <PHCircle className="w-8 h-8" />
                    <span className="text-[13px] font-semibold text-[#111827]">{opp.short}</span>
                  </div>
                  <div className="ml-auto">
                    {state !== 'before' && state !== 'cancelled' && state !== 'away' ? (
                      <button className="h-8 px-4 rounded-xl bg-[#1B5BF0] text-white text-[12px] font-semibold">
                        예매
                      </button>
                    ) : (
                      <div className="h-8 px-4 rounded-xl bg-[#E8EBF4] text-[#9CA3AF] text-[12px] font-semibold flex items-center">
                        {state === 'cancelled' ? (g.status === 'postponed' ? '경기 연기' : '경기 취소') : '예매 예정'}
                      </div>
                    )}
                  </div>
                </div>
                {g.note && !dhTag && g.makeupOfId && (
                  <p className="mt-3 text-[11px] text-[#64748B] bg-[#F5F7FB] rounded-lg px-2.5 py-1.5">{g.note} · 기존 예매 내역은 자동 환불되며, 새 경기는 별도로 예매해 주세요.</p>
                )}
              </div>
            )
          })}
        </div>
        {homeGames.length > 3 && !showMoreGames && (
          <div className="relative -mt-16 flex flex-col items-center pt-16"
            style={{ background: 'linear-gradient(to bottom, transparent, #F5F7FB 55%)' }}>
            <button
              onClick={() => setShowMoreGames(true)}
              className="mb-1 flex items-center gap-1 bg-white border border-[#DDE1EC] rounded-full px-4 py-1.5 text-[12px] font-semibold text-[#1B5BF0]"
            >
              더보기
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path d="M6 9l6 6 6-6" stroke="#1B5BF0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Authentic Shop preview */}
      <div className="px-4 mb-6">
        <PHSection label="어센틱 샵" />
        <div className="flex gap-3 overflow-x-auto pb-1">
          {AUTHENTIC_SHOP_ITEMS.map((item) => (
            <div key={item.id} className="shrink-0 w-32 flex flex-col">
              <PH className="w-32 h-32 rounded-2xl mb-2" />
              <span className="text-[10px] font-semibold text-[#1B5BF0] mb-0.5 leading-none">{item.player}</span>
              <span className="text-[12px] font-medium text-[#0E1A40] leading-snug mb-1 line-clamp-2">{item.name}</span>
              <span className="text-[13px] font-bold text-[#0E1A40]">{item.price}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Beerys Shop feature banner */}
      <div className="px-4 mb-6">
        <div className="rounded-2xl overflow-hidden bg-gradient-to-r from-[#0E1A40] to-[#1B5BF0] relative">
          <div className="absolute inset-0 opacity-10" style={{backgroundImage:'repeating-linear-gradient(135deg,transparent,transparent 10px,rgba(255,255,255,0.3) 10px,rgba(255,255,255,0.3) 11px)'}} />
          <div className="relative flex items-center gap-4 px-4 py-4">
            <div className="w-16 h-16 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center shrink-0 overflow-hidden">
              <span className="text-3xl">👕</span>
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-bold text-white/60 mb-1">베리즈샵</p>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold text-white bg-white/20 rounded-full px-2 py-0.5">NEW</span>
                <span className="text-[10px] text-white/50">3일 전</span>
              </div>
              <p className="text-white font-bold text-[14px] leading-snug mb-0.5">달빛소년 구자욱</p>
              <p className="text-white/80 text-[12px]">1,000득점 기념 유니폼 출시</p>
            </div>
          </div>
        </div>
      </div>

      {/* Beerys Shop */}
      <div className="px-4 mb-6">
        <PHSection label="베리즈 샵" />
        <div className="grid grid-cols-2 gap-3">
          {BEERYS_SHOP_ITEMS.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl border border-[#DDE1EC] overflow-hidden">
              <PH className="w-full h-28 rounded-none" />
              <div className="p-3 flex flex-col gap-0.5">
                <span className="text-[10px] font-semibold text-[#1B5BF0] leading-none">{item.player}</span>
                <span className="text-[12px] font-medium text-[#0E1A40] leading-snug line-clamp-2">{item.name}</span>
                <span className="text-[13px] font-bold text-[#0E1A40] mt-0.5">{item.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ad Banner */}
      <div className="px-4">
        <PH className="w-full h-20 rounded-2xl" />
      </div>

      {/* Copyright */}
      <div className="px-4 pt-2 pb-4 text-center">
        <p className="text-[10px] text-[#9CA3AF]">© 2026 Samsung Lions. All rights reserved.</p>
      </div>
    </div>
  )
}
