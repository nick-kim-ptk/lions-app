import { useState } from 'react'
import { Header } from '@/components/Layout'
import { TEAM_RECORDS } from '@/data/game'
import { BATTERS, BATTER_STATS, PITCHERS, PITCHER_STATS } from '@/data/mock'

// 011-SL-GM-06 투수/타자/팀 기록
type PitcherKey = '탈삼진' | '다승' | '평균자책점' | '세이브' | '홀드'
type BatterKey = '타율' | '홈런' | '타점' | '안타' | '도루'

const TABS = ['투수 기록', '타자 기록', '팀 기록']
const PITCHER_SORTS: PitcherKey[] = ['탈삼진', '다승', '평균자책점', '세이브', '홀드']
const BATTER_SORTS: BatterKey[] = ['타율', '홈런', '타점', '안타', '도루']

const PITCHER_COLS: { label: string; sort?: PitcherKey; value: (s: (typeof PITCHER_STATS)[string]) => string | number }[] = [
  { label: 'ERA', sort: '평균자책점', value: (s) => s.era },
  { label: 'W', sort: '다승', value: (s) => s.w },
  { label: 'L', value: (s) => s.l },
  { label: 'SV', sort: '세이브', value: (s) => s.sv },
  { label: 'HLD', sort: '홀드', value: (s) => s.hld },
  { label: 'IP', value: (s) => s.ip },
  { label: 'K', sort: '탈삼진', value: (s) => s.k },
]
const BATTER_COLS: { label: string; sort: BatterKey; value: (s: (typeof BATTER_STATS)[string]) => string | number }[] = [
  { label: '타율', sort: '타율', value: (s) => s.avg },
  { label: 'HR', sort: '홈런', value: (s) => s.hr },
  { label: '타점', sort: '타점', value: (s) => s.rbi },
  { label: '안타', sort: '안타', value: (s) => s.h },
  { label: '도루', sort: '도루', value: (s) => s.sb },
]

function SortChips<K extends string>({ items, value, onChange }: { items: K[]; value: K; onChange: (k: K) => void }) {
  return (
    <div className="flex gap-2 px-4 py-3 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
      {items.map((s) => (
        <button
          key={s}
          onClick={() => onChange(s)}
          className={`shrink-0 h-7 px-3 rounded-full text-[12px] font-semibold border transition-colors ${value === s ? 'bg-[#1B5BF0] text-white border-[#1B5BF0]' : 'bg-white text-[#64748B] border-[#DDE1EC]'}`}
        >
          {s}
        </button>
      ))}
    </div>
  )
}

export function StatsScreen() {
  const [tab, setTab] = useState(0)
  const [pitcherSort, setPitcherSort] = useState<PitcherKey>('탈삼진')
  const [batterSort, setBatterSort] = useState<BatterKey>('타율')

  // 평균자책점만 오름차순(낮을수록 좋음), 나머지는 내림차순. 동률이면 선수 이름순.
  const pitcherValue = (id: string, key: PitcherKey) => {
    const s = PITCHER_STATS[id]
    return { 탈삼진: s.k, 다승: s.w, 평균자책점: Number(s.era), 세이브: s.sv, 홀드: s.hld }[key]
  }
  const pitchers = PITCHERS.filter((p) => PITCHER_STATS[p.id]).sort((a, b) => {
    const d = pitcherValue(b.id, pitcherSort) - pitcherValue(a.id, pitcherSort)
    return (pitcherSort === '평균자책점' ? -d : d) || a.name.localeCompare(b.name, 'ko')
  })

  const batterValue = (id: string, key: BatterKey) => {
    const s = BATTER_STATS[id]
    return { 타율: Number(s.avg), 홈런: s.hr, 타점: s.rbi, 안타: s.h, 도루: s.sb }[key]
  }
  const batters = BATTERS.filter((p) => BATTER_STATS[p.id]).sort(
    (a, b) => batterValue(b.id, batterSort) - batterValue(a.id, batterSort) || a.name.localeCompare(b.name, 'ko'),
  )

  return (
    <div className="min-h-full bg-[#F5F7FB] pb-6">
      <Header title="선수 기록" />

      {/* Custom tab bar */}
      <div className="flex border-b border-[#DDE1EC] bg-[#FFFFFF]">
        {TABS.map((t, i) => (
          <button key={i} onClick={() => setTab(i)}
            className={`flex-1 py-3 text-[13px] font-semibold border-b-2 transition-colors ${
              tab === i ? 'border-[#1B5BF0] text-[#1B5BF0]' : 'border-transparent text-[#9CA3AF]'
            }`}>
            {t}
          </button>
        ))}
      </div>

      {/* 투수 기록 */}
      {tab === 0 && (
        <div className="pb-4">
          <SortChips items={PITCHER_SORTS} value={pitcherSort} onChange={setPitcherSort} />
          <div className="px-4 overflow-x-auto">
            <table className="w-full min-w-[400px] text-[12px]">
              <thead>
                <tr className="bg-[#E8EBF4] rounded-t-xl">
                  <th className="text-left py-2.5 pl-3 text-[#64748B] font-medium w-24">선수</th>
                  {PITCHER_COLS.map((c) => (
                    <th key={c.label} className={`py-2.5 text-center font-medium ${c.sort === pitcherSort ? 'text-[#1B5BF0]' : 'text-[#64748B]'}`}>{c.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pitchers.map((p, i) => (
                  <tr key={p.id} className={`border-t border-[#DDE1EC] ${i % 2 === 0 ? 'bg-[#FFFFFF]' : 'bg-[#F8F9FC]'}`}>
                    <td className="py-2.5 pl-3">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] text-[#9CA3AF] w-5">#{p.no}</span>
                        <span className="text-[#111827] font-medium">{p.name}</span>
                      </div>
                    </td>
                    {PITCHER_COLS.map((c) => (
                      <td key={c.label} className={`py-2.5 text-center ${c.sort === pitcherSort ? 'text-[#1B5BF0] font-semibold' : 'text-[#111827]'}`}>
                        {c.value(PITCHER_STATS[p.id])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 타자 기록 */}
      {tab === 1 && (
        <div className="pb-4">
          <SortChips items={BATTER_SORTS} value={batterSort} onChange={setBatterSort} />
          <div className="px-4 overflow-x-auto">
            <table className="w-full min-w-[360px] text-[12px]">
              <thead>
                <tr className="bg-[#E8EBF4]">
                  <th className="text-left py-2.5 pl-3 text-[#64748B] font-medium w-24">선수</th>
                  {BATTER_COLS.map((c) => (
                    <th key={c.label} className={`py-2.5 text-center font-medium ${c.sort === batterSort ? 'text-[#1B5BF0]' : 'text-[#64748B]'}`}>{c.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {batters.map((b, i) => (
                  <tr key={b.id} className={`border-t border-[#DDE1EC] ${i % 2 === 0 ? 'bg-[#FFFFFF]' : 'bg-[#F8F9FC]'}`}>
                    <td className="py-2.5 pl-3">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] text-[#9CA3AF] w-5">#{b.no}</span>
                        <span className="text-[#111827] font-medium">{b.name}</span>
                      </div>
                    </td>
                    {BATTER_COLS.map((c) => (
                      <td key={c.label} className={`py-2.5 text-center ${c.sort === batterSort ? 'text-[#1B5BF0] font-semibold' : 'text-[#111827]'}`}>
                        {c.value(BATTER_STATS[b.id])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 팀 기록 */}
      {tab === 2 && (
        <div className="px-4 pt-4 pb-4 flex flex-col gap-4">
          <p className="text-[12px] text-[#9CA3AF]">삼성 라이온즈 구단 대기록</p>
          {TEAM_RECORDS.map((r, i) => (
            <div key={i} className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] overflow-hidden">
              {/* Top accent bar */}
              <div className="h-1 bg-[#1B5BF0]" />
              <div className="p-4 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-white bg-[#1B5BF0] rounded-full px-2.5 py-0.5">{r.badge}</span>
                  <span className="text-[11px] text-[#9CA3AF]">{r.date}</span>
                </div>
                <p className="text-[15px] font-bold text-[#111827] leading-snug">{r.record}</p>
                <p className="text-[12px] text-[#64748B] leading-relaxed">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
