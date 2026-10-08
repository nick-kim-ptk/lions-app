import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PH } from '@/components/Placeholder'
import { Header } from '@/components/Layout'
import { PLAYERS, playerStatus, type PlayerGroup } from '@/data/mock'
import { PlayerStatusBadge } from '@/components/PlayerStatusBadge'
import { COACHING_STAFF } from '@/data/club'

const TABS = ['감독/코치', '투수', '포수', '내야수', '외야수'] as const
type Tab = (typeof TABS)[number]

// 063(065)-SL-AL-09 선수단 소개
export function PlayersScreen() {
  const navigate = useNavigate()
  const [tab, setTab] = useState<Tab>('투수')
  const list = tab === '감독/코치' ? [] : PLAYERS.filter((p) => p.group === (tab as PlayerGroup)).sort((a, b) => a.no - b.no)

  return (
    <div className="min-h-full bg-[#F5F7FB] pb-4">
      <Header title="선수단 소개" />
      <div className="flex border-b border-[#DDE1EC] overflow-x-auto">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`shrink-0 px-4 py-3 text-sm font-medium border-b-2 ${t === tab ? 'border-[#1B5BF0] text-[#1B5BF0]' : 'border-transparent text-[#64748B]'}`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="px-4 pt-4">
        <p className="text-xs text-[#9CA3AF] mb-3">{tab === '감독/코치' ? '코칭스태프' : `${tab}진`}</p>
        {tab === '감독/코치' ? (
          <div className="grid grid-cols-3 gap-3">
            {COACHING_STAFF.map((c, i) => (
              <div key={i} className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] overflow-hidden">
                <PH className="w-full h-28 rounded-none" />
                <div className="p-2 flex flex-col gap-0.5">
                  <span className="text-[12px] font-semibold text-[#111827] truncate">{c.name}</span>
                  <span className="text-[10px] text-[#9CA3AF]">{c.role}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-3">
            {list.map((p) => {
              const st = playerStatus(p)
              return (
              <button
                key={p.id}
                onClick={() => navigate(`/all/player-detail?id=${p.id}`)}
                className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] overflow-hidden text-left"
              >
                <PH className="w-full h-28 rounded-none" />
                <div className="p-2 flex flex-col gap-0.5">
                  <div className="flex items-center gap-1">
                    <span className="text-[#1B5BF0] text-[10px] font-bold">{p.no}</span>
                    <span className="text-[12px] font-semibold text-[#111827] truncate">{p.name}</span>
                    {p.foreign && <span className="text-[8px] font-bold text-[#64748B] bg-[#E8EBF4] rounded px-1">외국인</span>}
                  </div>
                  <span className="text-[10px] text-[#9CA3AF]">{p.pos} · {p.handed}</span>
                  <div className="flex items-center gap-1 flex-wrap">
                    <PlayerStatusBadge kind={st.kind} tier={st.tier} />
                    {st.tier === '부상' && st.kind !== '군입대' && st.injury && <span className="text-[9px] text-[#EF4444] truncate">{st.injury}</span>}
                  </div>
                </div>
              </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
