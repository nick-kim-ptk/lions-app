import { useState } from 'react'
import { GameStateNotice } from '@/components/GameCaseBar'
import { withCaseGames } from '@/data/caseStore'
import { PHCircle } from '@/components/Placeholder'
import { Header } from '@/components/Layout'
import {
  FUTURES_GAMES, FUTURES_VENUE, GAMES, MOCK_TODAY, MY_TEAM, TEAMS, WEEKDAYS,
  gamesInMonth, resultOf, resultText, weekdayIndex, type Game,
} from '@/data/mock'

// 010-SL-GM-05 경기 일정
const MIN_MONTH = 9
const MAX_MONTH = 10
const YEAR = 2026

function monthMatrix(year: number, month: number) {
  const first = weekdayIndex(`${year}-${String(month).padStart(2, '0')}-01`)
  const days = new Date(Date.UTC(year, month, 0)).getUTCDate()
  const rows = Math.ceil((first + days) / 7)
  return { first, days, rows }
}

export function ScheduleScreen() {
  const [league, setLeague] = useState<'1군' | '퓨처스'>('1군')
  const [month, setMonth] = useState(9)

  const isFutures = league === '퓨처스'
  const source = isFutures ? FUTURES_GAMES : GAMES
  const games = gamesInMonth(YEAR, month, source).flatMap((g) => (isFutures ? [g] : withCaseGames(g)))
  const gameByDay = new Map(games.map((g) => [Number(g.date.slice(8)), g]))
  const todayDay = MOCK_TODAY.startsWith(`${YEAR}-${String(month).padStart(2, '0')}`) ? Number(MOCK_TODAY.slice(8)) : -1
  const { first, days, rows } = monthMatrix(YEAR, month)

  const accentColor = isFutures ? '#9333EA' : '#1B5BF0'
  const accentBg = isFutures ? 'bg-[#F5F3FF]' : 'bg-[#EBF0FF]'
  const accentBorder = isFutures ? 'border-[#9333EA]/40' : 'border-[#1B5BF0]/40'
  const homeDot = isFutures ? 'bg-[#9333EA]' : 'bg-[#1B5BF0]'
  const homeLabel = isFutures ? 'bg-[#9333EA]/10 text-[#9333EA]' : 'bg-[#1B5BF0]/10 text-[#1B5BF0]'
  const todayText = isFutures ? 'text-[#9333EA]' : 'text-[#1B5BF0]'
  const todayBg = isFutures ? 'bg-[#9333EA]' : 'bg-[#1B5BF0]'
  const venue = isFutures ? FUTURES_VENUE : '라이온즈파크'

  const oppLabel = (g: Game) => (isFutures ? `${TEAMS[g.opp].short} 퓨처스` : TEAMS[g.opp].short)

  return (
    <div className="min-h-full bg-[#F5F7FB] pb-4">
      <Header title="경기 일정" />
      {!isFutures && <GameStateNotice context="schedule" />}

      {/* 1군 / 퓨처스 탭 */}
      <div className="flex px-4 pt-3 gap-6 border-b border-[#DDE1EC]">
        {(['1군', '퓨처스'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setLeague(t)}
            className={`pb-3 text-[14px] font-bold border-b-2 transition-colors ${
              league === t ? todayText : 'border-transparent text-[#9CA3AF]'
            }`}
            style={league === t ? { borderBottomColor: accentColor, color: accentColor } : undefined}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Month nav */}
      <div className="flex items-center justify-between px-4 py-3">
        <button
          className={`w-8 h-8 flex items-center justify-center ${month <= MIN_MONTH ? 'opacity-25' : ''}`}
          disabled={month <= MIN_MONTH}
          onClick={() => setMonth((m) => m - 1)}
          aria-label="이전 달"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M15 19l-7-7 7-7" stroke="#111827" strokeWidth="2" strokeLinecap="round"/></svg>
        </button>
        <span className="text-[#111827] font-bold text-lg">{YEAR}년 {month}월</span>
        <button
          className={`w-8 h-8 flex items-center justify-center ${month >= MAX_MONTH ? 'opacity-25' : ''}`}
          disabled={month >= MAX_MONTH}
          onClick={() => setMonth((m) => m + 1)}
          aria-label="다음 달"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="#111827" strokeWidth="2" strokeLinecap="round"/></svg>
        </button>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 px-4 mb-2">
        {WEEKDAYS.map((d, i) => (
          <div key={d} className={`text-center text-xs font-medium py-1 ${i === 0 ? 'text-[#E53935]' : i === 6 ? 'text-[#1B5BF0]' : 'text-[#9CA3AF]'}`}>
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid — 해당 월의 1일 요일/말일 기준으로 계산 */}
      <div className="px-4 mb-5">
        {Array.from({ length: rows }).map((_, row) => (
          <div key={row} className="grid grid-cols-7 gap-y-2 mb-1">
            {Array.from({ length: 7 }).map((_, col) => {
              const day = row * 7 + col - first + 1
              const valid = day >= 1 && day <= days
              const g = valid ? gameByDay.get(day) : undefined
              const isToday = day === todayDay
              return (
                <div key={col} className="flex flex-col items-center gap-0.5 py-1">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center ${isToday ? todayBg : ''}`}>
                    <span className={`text-xs ${!valid ? 'text-transparent' : isToday ? 'text-white font-bold' : 'text-[#64748B]'}`}>
                      {valid ? day : ''}
                    </span>
                  </div>
                  {g && (
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${
                        g.status === 'cancelled' || g.status === 'postponed'
                          ? 'border border-[#E53935] bg-transparent'
                          : g.home ? homeDot : 'bg-[#4A5570]'
                      }`}
                    />
                  )}
                </div>
              )
            })}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex gap-4 px-4 mb-5">
        <div className="flex items-center gap-1.5">
          <div className={`w-2 h-2 rounded-full ${homeDot}`} />
          <span className="text-xs text-[#64748B]">홈 경기</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-[#4A5570]" />
          <span className="text-xs text-[#64748B]">원정 경기</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full border border-[#E53935]" />
          <span className="text-xs text-[#64748B]">취소·연기</span>
        </div>
        {isFutures && (
          <span className="ml-auto text-[10px] font-semibold text-[#9333EA] bg-[#F5F3FF] rounded-full px-2 py-0.5">
            퓨처스리그
          </span>
        )}
      </div>

      {/* Schedule list */}
      <div className="px-4">
        <p className="text-xs text-[#9CA3AF] mb-3">{month}월 경기 일정</p>
        {games.length === 0 ? (
          <div className="rounded-2xl border border-[#DDE1EC] bg-[#FFFFFF] py-10 text-center text-[13px] text-[#9CA3AF]">
            등록된 경기 일정이 없습니다
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {games.map((g) => {
              const isToday = g.date === MOCK_TODAY
              const day = Number(g.date.slice(8))
              const dow = WEEKDAYS[weekdayIndex(g.date)]
              const result = resultOf(g)
              const resText = resultText(g)
              const off = g.status === 'cancelled' || g.status === 'postponed'
              return (
                <div
                  key={g.id}
                  className={`flex items-center gap-3 rounded-2xl border p-3 ${
                    isToday ? `${accentBg} ${accentBorder}` : g.home ? 'bg-[#FFFFFF] border-[#DDE1EC]' : 'bg-[#F8F9FC] border-[#DDE1EC]'
                  } ${off ? 'opacity-70' : ''}`}
                >
                  {/* Date */}
                  <div className="flex flex-col items-center w-10 shrink-0">
                    <span className={`text-[10px] font-medium ${dow === '일' ? 'text-[#E53935]' : dow === '토' ? 'text-[#1B5BF0]' : 'text-[#9CA3AF]'}`}>{dow}</span>
                    <span className={`font-bold text-lg leading-tight ${isToday ? todayText : 'text-[#111827]'}`}>{day}</span>
                    {isToday && <span className={`text-[9px] font-bold ${todayText}`}>TODAY</span>}
                  </div>

                  <div className="w-px h-10 bg-[#DDE1EC]" />

                  {/* Home/Away badge + time */}
                  <div className="flex flex-col gap-1 w-14 shrink-0">
                    <span className={`text-[10px] font-semibold rounded px-1.5 py-0.5 text-center w-fit ${g.home ? homeLabel : 'bg-[#64748B]/10 text-[#64748B]'}`}>
                      {g.home ? '홈' : '원정'}
                    </span>
                    <span className="text-[11px] text-[#9CA3AF]">{g.time}</span>
                  </div>

                  {/* Teams */}
                  <div className="flex-1 min-w-0 flex items-center gap-2">
                    <PHCircle className="w-7 h-7 shrink-0" />
                    <span className="text-[#9CA3AF] text-xs">vs</span>
                    <PHCircle className="w-7 h-7 shrink-0" />
                    <div className="min-w-0">
                      <span className={`text-[13px] font-semibold text-[#111827] ${off ? 'line-through decoration-[#9CA3AF]' : ''}`}>{oppLabel(g)}</span>
                      {g.makeupOfId && <span className="ml-1.5 text-[9px] font-bold text-[#E53935] bg-[#FDECEC] rounded px-1 py-0.5 align-middle">순연</span>}
                    </div>
                  </div>

                  {/* Result / status / venue */}
                  <div className="shrink-0 text-right flex flex-col items-end gap-0.5">
                    {resText ? (
                      <span className={`text-[12px] font-bold ${result === 'win' ? todayText : result === 'loss' ? 'text-[#E53935]' : 'text-[#64748B]'}`}>
                        {resText}
                      </span>
                    ) : g.status === 'delayed' ? (
                      <span className="text-[12px] font-bold text-[#B7791F]">우천 지연</span>
                    ) : g.status === 'suspended' ? (
                      <span className="text-[12px] font-bold text-[#7E22CE]">서스펜디드</span>
                    ) : g.status === 'live' ? (
                      <span className="text-[12px] font-bold text-[#E53935]">LIVE</span>
                    ) : off ? (
                      <span className="text-[12px] font-bold text-[#E53935]">{g.status === 'cancelled' ? '우천 취소' : '경기 연기'}</span>
                    ) : (
                      <span className="text-[11px] text-[#9CA3AF]">{g.home ? venue : TEAMS[g.opp].stadium.split(' ')[0]}</span>
                    )}
                    {g.note && <span className="text-[10px] text-[#9CA3AF]">{g.note}</span>}
                  </div>
                </div>
              )
            })}
          </div>
        )}
        <p className="mt-4 text-[10px] leading-relaxed text-[#9CA3AF]">
          {MY_TEAM.name} 경기 일정은 우천 등 사유로 변경될 수 있으며, 취소·순연 경기는 확정 즉시 반영됩니다.
        </p>
      </div>
    </div>
  )
}
