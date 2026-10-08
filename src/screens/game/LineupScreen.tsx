import { useState } from 'react'
import { GameStateNotice } from '@/components/GameCaseBar'
import { useCaseState } from '@/data/caseStore'
import { CaseSelect } from '@/components/CaseSelect'
import { Header } from '@/components/Layout'
import {
  BATTER_STATS, MOCK_TODAY, MY_TEAM, PLAYER_BY_ID, TEAMS, TODAY_GAME, TODAY_LINEUP,
  fmtMDW, type LineupEntry,
} from '@/data/mock'

// 007-SL-GM-02 오늘의 라인업
export function LineupScreen() {
  const game = TODAY_GAME
  // 케이스 베리에이션용 토글 — 선발 투수는 전날 예고되지만, 타순은 경기 시작 약 1시간 전에 발표됩니다.
  const { match } = useCaseState()
  const [announcedLocal, setAnnounced] = useState(true)
  // 경기 전에는 발표 전/후 토글로 확인하고, 그 외 상태는 전역 케이스를 따른다
  const announced = match === '경기 전' ? announcedLocal : match !== '우천 취소'
  const [side, setSide] = useState<'us' | 'them'>('us')

  if (!game) {
    return (
      <div className="min-h-full bg-[#F5F7FB] pb-4">
        <Header title="오늘의 라인업" />
        <div className="px-4 pt-10 text-center">
          <p className="text-[14px] font-semibold text-[#111827]">오늘은 경기가 없습니다</p>
          <p className="mt-1 text-[12px] text-[#9CA3AF]">월요일·휴식일에는 라인업이 제공되지 않아요.</p>
        </div>
      </div>
    )
  }

  if (match === '우천 취소') {
    return (
      <div className="min-h-full bg-[#F5F7FB] pb-4">
        <Header title="오늘의 라인업" />
        <GameStateNotice context="lineup" />
        <div className="px-4 pt-10 text-center">
          <p className="text-[14px] font-semibold text-[#111827]">오늘 경기가 우천 취소되어 라인업이 없어요</p>
          <p className="mt-1 text-[12px] text-[#9CA3AF]">순연 경기가 확정되면 라인업이 다시 발표돼요.</p>
        </div>
      </div>
    )
  }

  const opp = TEAMS[game.opp]
  const set = TODAY_LINEUP[side]
  const teamName = side === 'us' ? MY_TEAM.name : opp.name
  const sp = set.startingPitcher

  const rowOf = (p: LineupEntry) => {
    const player = p.playerId ? PLAYER_BY_ID[p.playerId] : undefined
    return {
      no: player ? String(player.no) : String(p.no ?? ''),
      avg: p.playerId ? BATTER_STATS[p.playerId]?.avg ?? '-' : p.avg ?? '-',
    }
  }

  return (
    <div className="min-h-full bg-[#F5F7FB] pb-4">
      <Header title="오늘의 라인업" />

      {/* Today date banner */}
      <div className="px-4 pt-4 pb-2 flex items-center gap-2">
        <span className="text-[11px] font-semibold text-white bg-[#1B5BF0] rounded-full px-2.5 py-0.5">TODAY</span>
        <span className="text-[13px] font-semibold text-[#111827]">{MOCK_TODAY.slice(0, 4)}년 {fmtMDW(MOCK_TODAY)}</span>
        <span className="text-[12px] text-[#64748B]">{MY_TEAM.short} vs {opp.short} · {game.time}</span>
        {/* 상태 토글 — 케이스 베리에이션용 */}
        {match === '경기 전' && <CaseSelect className="ml-auto" value={announced ? '발표 후' : '발표 전'} options={['발표 후', '발표 전'] as const} onChange={(v) => setAnnounced(v === '발표 후')} />}
      </div>

      <GameStateNotice context="lineup" />

      {/* Match header */}
      <div className="px-4 py-2">
        <div className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] p-4">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[12px] text-[#64748B]">{game.stadium}</span>
            <span className="text-[12px] font-semibold text-[#1B5BF0]">{game.time}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: MY_TEAM.color }}>
                <span className="text-[10px] font-black text-white">{MY_TEAM.short}</span>
              </div>
              <span className="text-[15px] font-black text-[#111827]">{MY_TEAM.name}</span>
            </div>
            <span className="text-[#9CA3AF] text-sm font-bold">VS</span>
            <div className="flex items-center gap-3">
              <span className="text-[15px] font-black text-[#111827]">{opp.name}</span>
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: opp.color }}>
                <span className="text-[10px] font-black text-white">{opp.short}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 삼성 / 상대 탭 */}
      <div className="flex px-4 pt-2 gap-6 border-b border-[#DDE1EC]">
        {([['us', MY_TEAM.short], ['them', opp.short]] as const).map(([k, label]) => (
          <button
            key={k}
            onClick={() => setSide(k)}
            className={`pb-3 text-[14px] font-bold border-b-2 transition-colors ${side === k ? 'border-[#1B5BF0] text-[#1B5BF0]' : 'border-transparent text-[#9CA3AF]'}`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Starting pitcher */}
      <div className="px-4 pt-4 pb-4">
        <div className="flex items-center gap-2 mb-3">
          <p className="text-xs text-[#64748B]">선발 투수</p>
          <span className="text-[10px] text-[#9CA3AF]">전날 예고</span>
        </div>
        <div className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] p-4 flex items-center gap-4">
          <div className="w-16 h-20 rounded-xl bg-gradient-to-b from-[#EBF0FF] to-[#D6E0FA] flex items-center justify-center shrink-0">
            <span className="text-3xl">⚾</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-[#9CA3AF]">No. {sp.no} · {sp.handed}</span>
            <span className="text-[18px] font-black text-[#111827]">{sp.name}</span>
            <div className="flex gap-4 mt-1">
              {[
                { label: 'ERA', value: sp.era },
                { label: 'W', value: String(sp.w) },
                { label: 'K', value: String(sp.k) },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col items-center gap-0.5">
                  <span className="text-[10px] text-[#9CA3AF]">{stat.label}</span>
                  <span className="text-[13px] font-bold text-[#111827]">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Batting order */}
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs text-[#64748B]">{teamName} 타순</p>
          {announced && (
            <div className="flex gap-4 pr-2">
              <span className="text-[10px] text-[#9CA3AF] w-10 text-right">포지션</span>
              <span className="text-[10px] text-[#9CA3AF] w-10 text-right">타율</span>
            </div>
          )}
        </div>
        {announced ? (
          <div className="flex flex-col gap-2">
            {set.batting.map((p) => {
              const { no, avg } = rowOf(p)
              return (
                <div key={p.order} className="flex items-center gap-3 rounded-xl border p-3 bg-[#FFFFFF] border-[#DDE1EC]">
                  <span className="text-[#1B5BF0] font-black text-[14px] w-5 shrink-0">{p.order}</span>
                  <div className="w-9 h-9 rounded-full bg-gradient-to-b from-[#EBF0FF] to-[#D6E0FA] flex items-center justify-center shrink-0">
                    <span className="text-[10px] font-bold text-[#0E2F80]">{no}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-[14px] font-bold text-[#111827]">{p.name}</p>
                  </div>
                  <span className="text-[11px] font-semibold w-10 text-right shrink-0 text-[#64748B]">{p.pos}</span>
                  <span className="text-[11px] font-medium text-[#9CA3AF] w-10 text-right shrink-0">{avg}</span>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-[#C4C9D6] bg-[#FFFFFF] py-10 px-6 text-center">
            <p className="text-[14px] font-semibold text-[#111827]">라인업 발표 전이에요</p>
            <p className="mt-1.5 text-[12px] leading-relaxed text-[#9CA3AF]">
              타순은 경기 시작 약 1시간 전({set.announcedAt}경)에 발표돼요.
              <br />
              우천 등으로 경기가 취소되면 라인업은 발표되지 않습니다.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
