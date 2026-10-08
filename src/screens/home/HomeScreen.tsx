import { useNavigate } from 'react-router-dom'
import { useState, useRef, useSyncExternalStore } from 'react'
import { PH, PHCircle, PHSection } from '@/components/Placeholder'
import { useCaseState, setMatchState, useTodayGame } from '@/data/caseStore'
import { GameCaseBar, PostseasonFrame } from '@/components/GameCaseBar'
import { subscribeNotif, getHasUnread } from '@/data/notifStore'
import { KV_SLIDES, MATCH_STATES, MAGAZINE_ITEMS, LIONS_TV_ITEMS, LIVE_SNAPSHOT, FINAL_SNAPSHOT, SUSPENDED_SNAPSHOT, DOUBLEHEADER, MY_SEAT } from '@/data/home'
import { MY_TEAM, TEAMS, TODAY_LINEUP, fmtKoTime, fmtSlashMDW, nextGame, ticketStateOf } from '@/data/mock'


function TeamBadge({ name, score, highlight, dim }: { name: string; score?: number; highlight?: boolean; dim?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <PHCircle className="w-14 h-14" />
      <span className="text-[12px] font-bold text-[#0E1A40]">{name}</span>
      {score !== undefined && (
        <span className={`text-[28px] font-black leading-none ${highlight ? 'text-[#1B5BF0]' : dim ? 'text-[#9CA3AF]' : 'text-[#0E1A40]'}`}>{score}</span>
      )}
    </div>
  )
}

/** 예매한 좌석 + 스마트 티켓 바로가기 (구매한 티켓이 있을 때만 노출) */
function SeatRow({ onTicket }: { onTicket: () => void }) {
  return (
    <div className="bg-[#F5F7FB] rounded-xl px-3 py-2.5 flex items-center gap-2 mb-3">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1B5BF0" strokeWidth="2" strokeLinecap="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg>
      <span className="text-[12px] font-semibold text-[#0E1A40] flex-1">{MY_SEAT}</span>
      <button onClick={onTicket} className="text-[10px] font-bold text-[#1B5BF0]">스마트 티켓</button>
    </div>
  )
}

// 004-SL-HM-01 홈
export function HomeScreen() {
  const navigate = useNavigate()
  const [kvIndex, setKvIndex] = useState(0)
  const touchStartX = useRef(0)
  const { match: matchState, phase } = useCaseState()
  const [selectedLionsVideo, setSelectedLionsVideo] = useState<(typeof LIONS_TV_ITEMS)[number] | null>(null)
  const matchTouchStartX = useRef(0)
  const matchIndex = MATCH_STATES.indexOf(matchState)

  // 오늘의 경기 — 일정 더미(data/mock)에서 읽음. 경기가 없는 날(월요일 등)은 TODAY_GAME 이 없음
  const game = useTodayGame()
  const opp = game ? TEAMS[game.opp] : null
  const venueShort = game ? (game.home ? '라이온즈 파크' : TEAMS[game.opp].stadium) : ''
  const upcoming = nextGame()
  const hasUnread = useSyncExternalStore(subscribeNotif, getHasUnread)

  return (
    <div className="min-h-full bg-[#F5F7FB] pb-4">

      {/* KV Carousel — GNB 포함 */}
      <div
        className="relative w-full h-[374px] overflow-hidden"
        onTouchStart={e => { touchStartX.current = e.touches[0].clientX }}
        onTouchEnd={e => {
          const dx = e.changedTouches[0].clientX - touchStartX.current
          if (dx < -40) setKvIndex(i => Math.min(i + 1, KV_SLIDES.length - 1))
          if (dx > 40)  setKvIndex(i => Math.max(i - 1, 0))
        }}
      >
        {/* Floating GNB */}
        <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 h-14 gap-1">
          <button onClick={() => navigate('/case-guide')} className="rounded-full border border-dashed border-red-400 bg-black/30 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">가이드</button>
          <div className="flex items-center gap-1">
          <button onClick={() => navigate('/notifications')} className="w-8 h-8 flex items-center justify-center relative">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
            {/* 미확인 알림 Red Dot */}
            {hasUnread && <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 ring-1 ring-white/30" />}
          </button>
          <button onClick={() => navigate('/all-menu')} className="w-8 h-8 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M4 6h16M4 12h16M4 18h16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          </div>
        </div>
        {/* Slides strip */}
        <div
          className="flex h-full transition-transform duration-300 ease-out"
          style={{ width: `${KV_SLIDES.length * 100}%`, transform: `translateX(-${kvIndex * (100 / KV_SLIDES.length)}%)` }}
        >
          {KV_SLIDES.map((slide) => (
            <div
              key={slide.id}
              className={`relative flex-shrink-0 bg-gradient-to-br ${slide.bg}`}
              style={{ width: `${100 / KV_SLIDES.length}%` }}
            >
              {/* BG texture */}
              <div className="absolute inset-0 opacity-5" style={{backgroundImage:'repeating-linear-gradient(135deg,transparent,transparent 12px,rgba(255,255,255,0.5) 12px,rgba(255,255,255,0.5) 13px)'}} />

              {/* Graphic */}
              <div className={`absolute right-5 top-1/2 -translate-y-1/2 w-28 h-28 rounded-3xl ${slide.graphicBg} flex items-center justify-center`}>
                <span className="text-[72px] leading-none">{slide.graphic}</span>
              </div>

              {/* Content — 하단 정렬, 버튼 없음 */}
              <div className="absolute inset-0 flex flex-col justify-end p-5 pb-10">
                {!slide.hideBadge && (
                  <span className={`self-start text-[10px] font-bold text-white ${slide.badgeColor} rounded-full px-2.5 py-0.5 mb-3`}>
                    {slide.badge}
                  </span>
                )}
                <p className="text-white text-[22px] font-black leading-tight mb-2 whitespace-pre-line">
                  {slide.title}
                </p>
                <p className="text-white/60 text-[11px] leading-relaxed">{slide.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* AD badge — 광고 슬라이드일 때만 */}
        {KV_SLIDES[kvIndex].badge === 'AD' && (
          <div className="absolute top-3 right-4 bg-black/40 rounded-md px-1.5 py-0.5 backdrop-blur-sm">
            <span className="text-white text-[9px] font-bold tracking-wider">AD</span>
          </div>
        )}

        {/* Dot indicators */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {KV_SLIDES.map((_, i) => (
            <button key={i} onClick={() => setKvIndex(i)}
              className={`rounded-full transition-all ${i === kvIndex ? 'w-4 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/30'}`}
            />
          ))}
        </div>
      </div>

      {/* Today's Match Carousel */}
      <GameCaseBar />
      <div className="pb-4 pt-2">
        <div className="flex items-center justify-between px-4 mb-3">
          <span className="text-sm font-bold text-[#111827]">오늘의 경기</span>
          {phase === '시범경기' && <span className="rounded-full bg-[#64748B] px-2 py-0.5 text-[10px] font-bold text-white">시범경기 · 순위 미반영</span>}
        </div>

        {/* 카드 캐러셀 */}
        <div className="overflow-hidden px-4"
          onTouchStart={e => { matchTouchStartX.current = e.touches[0].clientX }}
          onTouchEnd={e => {
            const dx = e.changedTouches[0].clientX - matchTouchStartX.current
            if (dx < -40) setMatchState(MATCH_STATES[Math.min(matchIndex + 1, MATCH_STATES.length - 1)])
            if (dx > 40)  setMatchState(MATCH_STATES[Math.max(matchIndex - 1, 0)])
          }}>

          {!game || !opp ? (
            phase === '비시즌' ? (
              /* 비시즌: 시즌 정리 + 다음 시즌 개막 D-day (수치는 예시) */
              <div className="rounded-2xl bg-gradient-to-br from-[#0E1A40] to-[#1B3A80] p-5 text-white">
                <span className="rounded-full bg-white/15 px-2.5 py-0.5 text-[10px] font-bold">2026 시즌 종료</span>
                <p className="mt-3 text-[15px] font-black">올 시즌도 함께해 주셔서 감사합니다</p>
                <p className="mt-0.5 text-[11px] text-white/60">정규시즌 2위 · 82승 3무 59패 (예시)</p>
                <div className="mt-4 flex items-center justify-between rounded-xl bg-white/10 px-3 py-2.5">
                  <span className="text-[11px] text-white/70">2027 시즌 개막까지</span>
                  <span className="text-[16px] font-black text-[#F0A500]">D-146</span>
                </div>
                <p className="mt-4 text-center text-[13px] font-bold text-white">비시즌도 라이온즈와 함께!</p>
                <div className="mt-2 flex gap-2">
                  <button onClick={() => window.open('https://www.youtube.com/@lionstv1982', '_blank', 'noopener,noreferrer')} className="h-10 flex-1 rounded-xl bg-white text-[12px] font-bold text-[#0E1A40]">공식 유튜브</button>
                  <button onClick={() => window.open('https://www.instagram.com/samsunglions_baseballclub/', '_blank', 'noopener,noreferrer')} className="h-10 flex-1 rounded-xl border border-white/30 text-[12px] font-bold text-white">공식 인스타그램</button>
                </div>
              </div>
            ) : phase === '올스타 브레이크' ? (
              <div className="bg-white rounded-2xl border border-[#DDE1EC] p-5 text-center">
                <span className="rounded-full bg-[#F3E8FF] px-2.5 py-0.5 text-[10px] font-bold text-[#7E22CE]">올스타 브레이크</span>
                <p className="mt-3 text-[13px] font-bold text-[#0E1A40]">정규 경기가 쉬는 기간이에요</p>
                {upcoming && (
                  <p className="mt-1.5 text-[11px] text-[#9CA3AF]">
                    재개 경기 · {fmtSlashMDW(upcoming.date)} {fmtKoTime(upcoming.time)} {MY_TEAM.short} vs {TEAMS[upcoming.opp].short}
                  </p>
                )}
              </div>
            ) : (
            /* 경기 없는 날 (월요일 휴식일) */
            <div className="bg-white rounded-2xl border border-[#DDE1EC] p-5 text-center">
              <p className="text-[13px] font-bold text-[#0E1A40]">오늘은 경기가 없어요</p>
              {upcoming && (
                <p className="mt-1.5 text-[11px] text-[#9CA3AF]">
                  다음 경기 · {fmtSlashMDW(upcoming.date)} {fmtKoTime(upcoming.time)} {MY_TEAM.short} vs {TEAMS[upcoming.opp].short}
                </p>
              )}
            </div>
            )
          ) : (
            <PostseasonFrame>
              {/* 경기 전 */}
              {matchState === '경기 전' && (
                <div className="bg-white rounded-2xl border border-[#DDE1EC] p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-[10px] font-bold bg-[#F0F2F5] text-[#64748B] rounded-full px-2.5 py-0.5">경기 전</span>
                    <span className="text-[11px] text-[#9CA3AF]">{fmtKoTime(game.time)} · {venueShort}</span>
                  </div>
                  <div className="flex items-center justify-between mb-5">
                    <TeamBadge name={MY_TEAM.short} />
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-[11px] text-[#9CA3AF]">{game.home ? '홈경기' : '원정경기'}</span>
                      <span className="text-[22px] font-black text-[#DDE1EC]">VS</span>
                      <span className="text-[10px] text-[#9CA3AF]">{fmtSlashMDW(game.date)}</span>
                    </div>
                    <TeamBadge name={opp.short} />
                  </div>
                  <p className="text-center text-[11px] text-[#9CA3AF] -mt-2 mb-4">
                    선발 {TODAY_LINEUP.us.startingPitcher.name} vs {TODAY_LINEUP.them.startingPitcher.name} ·{' '}
                    <button onClick={() => navigate('/game/lineup')} className="font-semibold text-[#1B5BF0]">라인업 {TODAY_LINEUP.us.announcedAt}경 발표</button>
                  </p>
                  <SeatRow onTicket={() => navigate('/my/ticket-qr')} />
                  <button onClick={() => navigate('/ticket')}
                    className="w-full h-11 rounded-xl bg-[#1B5BF0] text-white text-[13px] font-bold">
                    티켓 예매하기
                  </button>
                </div>
              )}

              {/* 경기 중 */}
              {matchState === '경기 중' && (
                <div className="bg-white rounded-2xl border border-[#DDE1EC] p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-[10px] font-bold bg-[#E53935] text-white rounded-full px-2.5 py-0.5 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse inline-block" />
                      LIVE
                    </span>
                    <span className="text-[11px] text-[#9CA3AF]">{LIVE_SNAPSHOT.inning} · {venueShort}</span>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <TeamBadge name={MY_TEAM.short} score={LIVE_SNAPSHOT.us} />
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-[11px] font-bold text-[#E53935]">진행 중</span>
                      <span className="text-[16px] font-black text-[#DDE1EC]">:</span>
                    </div>
                    <TeamBadge name={opp.short} score={LIVE_SNAPSHOT.them} />
                  </div>
                  <SeatRow onTicket={() => navigate('/my/ticket-qr')} />
                  <div className="flex gap-2">

                <button className="flex-1 h-10 rounded-xl bg-[#0E1A40] text-white text-[12px] font-bold flex items-center justify-center gap-1.5">
                  <span>🍔</span> 스마트 오더
                </button>
                <button className="flex-1 h-10 rounded-xl bg-[#F5F7FB] border border-[#DDE1EC] text-[12px] text-[#64748B] font-medium flex items-center justify-center gap-1.5">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="#64748B" strokeWidth="1.8" strokeLinecap="round"/></svg>
                  주문 내역
                </button>
              </div>
            </div>
          )}

              {/* 경기 후 */}
              {matchState === '경기 후' && (
                <div className="bg-white rounded-2xl border border-[#DDE1EC] p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-[10px] font-bold bg-[#EBF0FF] text-[#1B5BF0] rounded-full px-2.5 py-0.5">경기 종료</span>
                    <span className="text-[11px] text-[#9CA3AF]">{fmtSlashMDW(game.date)} · {venueShort}</span>
                  </div>
                  {/* 결과 */}
                  <div className="flex items-center justify-between mb-1">
                    <TeamBadge name={MY_TEAM.short} score={FINAL_SNAPSHOT.us} highlight />
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-[11px] font-bold text-[#1B5BF0]">승리 🏆</span>
                      <span className="text-[16px] font-black text-[#DDE1EC]">:</span>
                    </div>
                    <TeamBadge name={opp.short} score={FINAL_SNAPSHOT.them} dim />
                  </div>
                  <p className="text-center text-[11px] text-[#9CA3AF] mb-4">{FINAL_SNAPSHOT.summary}</p>
                  {/* 다음 경기 */}
                  {upcoming && (
                    <div className="border-t border-[#F0F2F5] pt-3">
                      <p className="text-[10px] text-[#9CA3AF] font-semibold mb-2">다음 경기</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <PHCircle className="w-8 h-8" />
                          <div>
                            <span className="text-[12px] font-bold text-[#0E1A40]">{MY_TEAM.short} vs {TEAMS[upcoming.opp].short}</span>
                            <p className="text-[10px] text-[#9CA3AF]">{fmtSlashMDW(upcoming.date)} {fmtKoTime(upcoming.time)} · {upcoming.home ? '라이온즈 파크' : TEAMS[upcoming.opp].stadium}</p>
                          </div>
                        </div>
                        {upcoming.home && ['open', 'presale'].includes(ticketStateOf(upcoming)) && (
                          <button onClick={() => navigate('/ticket')}
                            className="h-8 px-3 rounded-xl border border-[#1B5BF0] text-[#1B5BF0] text-[11px] font-bold">
                            예매
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 우천 지연 */}
              {matchState === '우천 지연' && (
                <div className="bg-white rounded-2xl border border-[#DDE1EC] p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-[10px] font-bold bg-[#FFF4D6] text-[#B7791F] rounded-full px-2.5 py-0.5">우천 지연</span>
                    <span className="text-[11px] text-[#9CA3AF]">{fmtKoTime(game.time)} 예정 · {venueShort}</span>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <TeamBadge name={MY_TEAM.short} />
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-[22px] font-black text-[#DDE1EC]">VS</span>
                    </div>
                    <TeamBadge name={opp.short} />
                  </div>
                  <div className="rounded-xl bg-[#FFF9E6] px-3 py-2.5 mb-3">
                    <p className="text-[12px] font-semibold text-[#8A5A00]">비로 경기 개시가 지연되고 있어요</p>
                    <p className="mt-0.5 text-[11px] leading-relaxed text-[#8A5A00]/80">경기 개시 여부는 확정되는 대로 알림으로 알려드려요. 취소가 확정되면 예매 티켓은 자동 환불됩니다.</p>
                  </div>
                  <SeatRow onTicket={() => navigate('/my/ticket-qr')} />
                  <button className="w-full h-11 rounded-xl bg-[#F5F7FB] border border-[#DDE1EC] text-[#64748B] text-[13px] font-bold">
                    경기 시작 알림 받기
                  </button>
                </div>
              )}

              {/* 우천 취소 */}
              {matchState === '우천 취소' && (
                <div className="bg-white rounded-2xl border border-[#DDE1EC] p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-[10px] font-bold bg-[#FDECEC] text-[#E53935] rounded-full px-2.5 py-0.5">우천 취소</span>
                    <span className="text-[11px] text-[#9CA3AF]">{fmtSlashMDW(game.date)} · {venueShort}</span>
                  </div>
                  <div className="flex items-center justify-between mb-4 opacity-60">
                    <TeamBadge name={MY_TEAM.short} />
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-[22px] font-black text-[#DDE1EC]">VS</span>
                    </div>
                    <TeamBadge name={opp.short} />
                  </div>
                  <div className="rounded-xl bg-[#F5F7FB] px-3 py-2.5 mb-3">
                    <p className="text-[12px] font-semibold text-[#0E1A40]">우천으로 오늘 경기가 취소됐어요</p>
                    <p className="mt-0.5 text-[11px] leading-relaxed text-[#64748B]">예매하신 티켓은 별도 신청 없이 자동 환불되며, 순연 경기 일정은 확정 후 안내드려요.</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => navigate('/my/booking-history')}
                      className="flex-1 h-11 rounded-xl bg-[#0E1A40] text-white text-[13px] font-bold">
                      예매 내역 확인
                    </button>
                    <button onClick={() => navigate('/game/schedule')}
                      className="flex-1 h-11 rounded-xl bg-[#F5F7FB] border border-[#DDE1EC] text-[#64748B] text-[13px] font-bold">
                      경기 일정
                    </button>
                  </div>
                </div>
              )}

              {/* 경기 연기 */}
              {matchState === '경기 연기' && (
                <div className="bg-white rounded-2xl border border-[#DDE1EC] p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-[10px] font-bold bg-[#FDECEC] text-[#E53935] rounded-full px-2.5 py-0.5">경기 연기</span>
                    <span className="text-[11px] text-[#9CA3AF]">{fmtSlashMDW(game.date)} · {venueShort}</span>
                  </div>
                  <div className="flex items-center justify-between mb-4 opacity-60">
                    <TeamBadge name={MY_TEAM.short} />
                    <span className="text-[22px] font-black text-[#DDE1EC]">VS</span>
                    <TeamBadge name={opp.short} />
                  </div>
                  <div className="rounded-xl bg-[#F5F7FB] px-3 py-2.5 mb-3">
                    <p className="text-[12px] font-semibold text-[#0E1A40]">오늘 경기가 연기됐어요</p>
                    <p className="mt-0.5 text-[11px] leading-relaxed text-[#64748B]">재편성 일정은 확정되는 대로 알림으로 알려드려요. 예매하신 티켓의 처리 방법도 함께 안내드려요.</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => navigate('/my/booking-history')}
                      className="flex-1 h-11 rounded-xl bg-[#0E1A40] text-white text-[13px] font-bold">
                      예매 내역 확인
                    </button>
                    <button onClick={() => navigate('/game/schedule')}
                      className="flex-1 h-11 rounded-xl bg-[#F5F7FB] border border-[#DDE1EC] text-[#64748B] text-[13px] font-bold">
                      경기 일정
                    </button>
                  </div>
                </div>
              )}

              {/* 서스펜디드 */}
              {matchState === '서스펜디드' && (
                <div className="bg-white rounded-2xl border border-[#DDE1EC] p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-[10px] font-bold bg-[#F3E8FF] text-[#7E22CE] rounded-full px-2.5 py-0.5">서스펜디드</span>
                    <span className="text-[11px] text-[#9CA3AF]">{SUSPENDED_SNAPSHOT.inning} · {venueShort}</span>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <TeamBadge name={MY_TEAM.short} score={SUSPENDED_SNAPSHOT.us} />
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-[11px] font-bold text-[#7E22CE]">경기 중단</span>
                      <span className="text-[16px] font-black text-[#DDE1EC]">:</span>
                    </div>
                    <TeamBadge name={opp.short} score={SUSPENDED_SNAPSHOT.them} />
                  </div>
                  <div className="rounded-xl bg-[#F8F2FF] px-3 py-2.5 mb-3">
                    <p className="text-[12px] font-semibold text-[#5B1A99]">경기가 {SUSPENDED_SNAPSHOT.inning}됐어요</p>
                    <p className="mt-0.5 text-[11px] leading-relaxed text-[#5B1A99]/80">서스펜디드 경기는 추후 중단 시점부터 이어서 진행돼요. 속개 일정은 확정 후 알림으로 알려드려요.</p>
                  </div>
                  <SeatRow onTicket={() => navigate('/my/ticket-qr')} />
                  <button onClick={() => navigate('/game/schedule')}
                    className="w-full h-11 rounded-xl bg-[#F5F7FB] border border-[#DDE1EC] text-[#64748B] text-[13px] font-bold">
                    경기 일정
                  </button>
                </div>
              )}

              {/* 더블헤더 */}
              {matchState === '더블헤더' && (
                <div className="bg-white rounded-2xl border border-[#DDE1EC] p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-[10px] font-bold bg-[#0E1A40] text-white rounded-full px-2.5 py-0.5">더블헤더</span>
                    <span className="text-[11px] text-[#9CA3AF]">{fmtSlashMDW(game.date)} · {venueShort}</span>
                  </div>
                  <div className="flex flex-col gap-2 mb-4">
                    {[
                      { n: '1차전', t: fmtKoTime(DOUBLEHEADER.first) },
                      { n: '2차전', t: DOUBLEHEADER.second },
                    ].map((r) => (
                      <div key={r.n} className="flex items-center gap-3 rounded-xl bg-[#F5F7FB] px-3 py-3">
                        <span className="text-[11px] font-bold text-[#1B5BF0] w-10">{r.n}</span>
                        <span className="text-[13px] font-bold text-[#0E1A40] flex-1">{MY_TEAM.short} vs {opp.short}</span>
                        <span className="text-[11px] text-[#64748B]">{r.t}</span>
                      </div>
                    ))}
                  </div>
                  <SeatRow onTicket={() => navigate('/my/ticket-qr')} />
                  <button onClick={() => navigate('/game/lineup')}
                    className="w-full h-11 rounded-xl bg-[#1B5BF0] text-white text-[13px] font-bold">
                    1차전 라인업 보기
                  </button>
                </div>
              )}
            </PostseasonFrame>
          )}
        </div>

        {/* 인디케이터 */}
        <div className={`flex justify-center gap-1.5 mt-3 ${game ? '' : 'hidden'}`}>
          {MATCH_STATES.map((_, i) => (
            <div key={i} className={`rounded-full transition-all ${i === matchIndex ? 'w-4 h-1.5 bg-[#1B5BF0]' : 'w-1.5 h-1.5 bg-[#DDE1EC]'}`} />
          ))}
        </div>
      </div>

      {/* 라이온즈 매거진 */}
      <div className="mb-6">
        <div className="px-4">
          <PHSection label="라이온즈 매거진" onMore={() => navigate('/game/magazine')} />
        </div>
        <div className="flex gap-3 overflow-x-auto px-4 pb-1">
          {MAGAZINE_ITEMS.map((item) => (
            <div key={item.id} className="shrink-0 w-44 flex flex-col">
              <div className="w-44 rounded-2xl mb-2 overflow-hidden bg-gradient-to-b from-[#1A2A5E] to-[#0D1117]" style={{ aspectRatio: '9/16' }} />
              <span className="text-[10px] font-bold text-[#1B5BF0] bg-[#EBF0FF] rounded-full px-2 py-0.5 self-start mb-1">{item.issue}</span>
              <span className="text-[12px] font-semibold text-[#0E1A40] leading-snug line-clamp-2">{item.title}</span>
              <span className="text-[10px] text-[#9CA3AF] mt-0.5">{item.date}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Lions News */}
      <div className="px-4 mb-6">
        <PHSection label="라이온즈 뉴스" onMore={() => navigate('/game/news')} />
        <div className="flex flex-col">
          {[
            { title: '원태인, 시즌 15승 달성… 에이스 자리 굳혔다', source: '스포츠조선', time: '13:42' },
            { title: '구자욱 통산 200홈런 눈앞… 오늘 경기가 변수', source: '일간스포츠', time: '11:20' },
            { title: '삼성 라이온즈, 9월 홈경기 전승 행진 계속', source: '대구MBC', time: '09:05' },
            { title: '라이온즈파크 올 시즌 관중 130만 돌파 기념 이벤트 예고', source: 'OSEN', time: '08:30' },
          ].map((item, i) => (
            <div key={i} className="flex gap-3 py-3 border-b border-[#DDE1EC] items-center">
              <PH className="w-18 h-14 rounded-xl shrink-0" />
              <div className="flex-1 flex flex-col gap-1 justify-center">
                <p className="text-[13px] text-[#111827] font-medium leading-snug line-clamp-2">{item.title}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[11px] text-[#9CA3AF]">{item.source}</span>
                  <span className="text-[11px] text-[#C4C9D6]">·</span>
                  <span className="text-[11px] text-[#9CA3AF]">{item.time}</span>
                </div>
              </div>
              <div className="shrink-0 w-7 h-7 rounded-full bg-[#F5F7FB] border border-[#DDE1EC] flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M15 3h6v6M10 14L21 3" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* LIONS TV */}
      <div className="mb-6">
        <div className="px-4">
          <button
            type="button"
            onClick={() => setSelectedLionsVideo(LIONS_TV_ITEMS[0])}
            className="mb-3 text-[15px] font-bold text-[#111827]"
          >
            LIONS TV
          </button>
        </div>
        <div className="flex items-start gap-3 overflow-x-auto px-4 pb-1">
          {LIONS_TV_ITEMS.map((item) => (
            <button
              type="button"
              key={item.id}
              onClick={() => setSelectedLionsVideo(item)}
              className={`shrink-0 flex flex-col text-left ${item.format === 'short' ? 'w-32' : 'w-52'}`}
            >
              <div className={`relative mb-2 w-full overflow-hidden rounded-2xl ${item.format === 'short' ? 'aspect-[9/16]' : 'aspect-video'}`}>
                <PH className="w-full h-full rounded-2xl" />
                {item.format === 'short' && (
                  <span className="absolute left-2 top-2 rounded-md bg-[#FF0000] px-1.5 py-0.5 text-[9px] font-bold text-white">
                    SHORTS
                  </span>
                )}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-xs flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
              </div>
              <span className="text-[12px] font-semibold text-[#0E1A40] leading-snug mb-1 line-clamp-2">{item.title}</span>
              <span className="text-[10px] text-[#9CA3AF] font-medium">{item.duration} · 조회수 {item.views}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Notice */}
      <div className="px-4 mb-6">
        <PHSection label="공지사항" onMore={() => navigate('/all/notice-list')} />
        <div className="flex flex-col">
          {[
            { badge: '구단', title: '2026 삼성 라이온즈 홈경기 입장 안내', date: '2026.09.15' },
            { badge: '구단', title: '라이온즈파크 주차장 운영 변경 안내', date: '2026.09.12' },
            { badge: '앱', title: '앱 업데이트 및 이용 안내 (v4.1.0)', date: '2026.09.13' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 py-3 border-b border-[#DDE1EC]">
              <span className={`shrink-0 text-[10px] font-semibold px-1.5 py-0.5 rounded ${item.badge === '앱' ? 'bg-[#F0FDF4] text-[#16A34A]' : 'bg-[#EEF3FF] text-[#1B5BF0]'}`}>{item.badge}</span>
              <span className="flex-1 text-sm text-[#111827] truncate">{item.title}</span>
              <span className="shrink-0 text-xs text-[#9CA3AF]">{item.date}</span>
            </div>
          ))}
        </div>
      </div>

      {/* SNS 아이콘 */}
      <div className="px-4 pt-2 pb-6 flex justify-center gap-5">
        {/* 인스타그램 */}
        <button className="w-11 h-11 rounded-full bg-[#FFFFFF] border border-[#DDE1EC] flex items-center justify-center shadow-sm">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="2" width="20" height="20" rx="5" stroke="#9CA3AF" strokeWidth="1.8"/>
            <circle cx="12" cy="12" r="4.5" stroke="#9CA3AF" strokeWidth="1.8"/>
            <circle cx="17.5" cy="6.5" r="1" fill="#9CA3AF"/>
          </svg>
        </button>
        {/* 유튜브 */}
        <button className="w-11 h-11 rounded-full bg-[#FFFFFF] border border-[#DDE1EC] flex items-center justify-center shadow-sm">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="5" width="20" height="14" rx="4" fill="#D1D5DB"/>
            <path d="M10 9.5l5 2.5-5 2.5V9.5z" fill="white"/>
          </svg>
        </button>
        {/* 페이스북 */}
        <button className="w-11 h-11 rounded-full bg-[#FFFFFF] border border-[#DDE1EC] flex items-center justify-center shadow-sm">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="2" width="20" height="20" rx="5" fill="#D1D5DB"/>
            <path d="M13.5 8H15V6h-1.5C12.1 6 11 7.1 11 8.5V10H9.5v2H11v6h2v-6h1.5l.5-2H13v-1.5c0-.3.2-.5.5-.5z" fill="white"/>
          </svg>
        </button>
        {/* 트위터(X) */}
        <button className="w-11 h-11 rounded-full bg-[#FFFFFF] border border-[#DDE1EC] flex items-center justify-center shadow-sm">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="2" width="20" height="20" rx="5" fill="#D1D5DB"/>
            <path d="M17 6h-2.5l-2.8 3.5L9 6H6l4.3 5.5L6 18h2.5l3-3.8 2.8 3.8H17l-4.5-5.8L17 6z" fill="white"/>
          </svg>
        </button>
      </div>

      {/* Copyright */}
      <div className="px-4 pt-2 pb-4 text-center">
        <p className="text-[10px] text-[#9CA3AF]">© 2026 Samsung Lions. All rights reserved.</p>
      </div>

      {selectedLionsVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-5"
          onClick={() => setSelectedLionsVideo(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="LIONS TV 영상"
            className="w-full max-w-lg overflow-hidden rounded-2xl bg-[#111827] shadow-2xl"
            onClick={event => event.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3">
              <div className="min-w-0 pr-3">
                <span className="truncate text-[13px] font-bold text-white">{selectedLionsVideo.title}</span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedLionsVideo(null)}
                aria-label="영상 닫기"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-[#0E1A40] via-[#1B3A80] to-black">
              <div className="absolute inset-0 flex items-center justify-center opacity-25">
                <span className="text-[72px] font-black text-white">SL</span>
              </div>
              <div className="absolute left-4 top-4 rounded bg-black/60 px-2 py-1 text-[10px] font-semibold text-white">
                재생 중
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent px-4 pb-3 pt-12">
                <div className="mb-2 h-1 overflow-hidden rounded-full bg-white/30">
                  <div className="h-full w-1/3 rounded-full bg-[#FF0000]" />
                </div>
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-3">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
                      <rect x="6" y="5" width="4" height="14" rx="1" />
                      <rect x="14" y="5" width="4" height="14" rx="1" />
                    </svg>
                    <span className="text-[10px]">03:02 / {selectedLionsVideo.duration}</span>
                  </div>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                    <path d="M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="border-t border-white/10 p-3">
              <button
                type="button"
                onClick={() => window.open('https://www.youtube.com/@LionsTV', '_blank', 'noopener,noreferrer')}
                className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-white text-[13px] font-bold text-[#111827]"
              >
                <span className="flex h-5 w-7 items-center justify-center rounded bg-[#FF0000]">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
                LionsTV 유튜브 이동
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M14 4h6v6M10 14L20 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M20 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V5a1 1 0 011-1h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chatbot FAB */}
      <button className="fixed bottom-24 right-4 z-30 w-12 h-12 rounded-full bg-[#1B5BF0] shadow-lg flex items-center justify-center">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" fill="white"/>
        </svg>
      </button>
    </div>
  )
}
