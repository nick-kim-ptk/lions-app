import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PH } from '@/components/Placeholder'
import { Header } from '@/components/Layout'
import { PLAYERS, playerStatus } from '@/data/mock'
import { COACHING_STAFF, MANAGER, TEAM_INTRO, type StaffInfo } from '@/data/club'

// 감독·코칭스텝 카드 (16:9, 상세 페이지 없음)
function StaffCard({ s }: { s: StaffInfo }) {
  const rows = [
    ['생년월일', s.birth],
    ['키/몸무게', s.bodyInfo],
    ['경력', s.career],
    ['삼성입단', s.joined],
  ]
  return (
    <div className="flex bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] overflow-hidden aspect-video">
      <PH className="h-full aspect-[9/16] rounded-none shrink-0" />
      <div className="flex-1 min-w-0 p-3 flex flex-col justify-center gap-0.5">
        <p className="text-[15px] font-bold text-[#111827] truncate">{s.name}</p>
        <p className="text-[11px] font-semibold text-[#1B5BF0] mb-1.5">{s.role}</p>
        {rows.map(([k, v]) => (
          <p key={k} className="text-[10px] text-[#64748B] leading-snug"><span className="text-[#9CA3AF]">{k} : </span>{v}</p>
        ))}
      </div>
    </div>
  )
}

const TABS = ['소개', '감독', '코칭스텝', '투수', '타자', '군입대', '신입단'] as const
type Tab = (typeof TABS)[number]

// 063(065)-SL-AL-09 선수단 소개
export function PlayersScreen() {
  const navigate = useNavigate()
  const [tab, setTab] = useState<Tab>('소개')

  const byNo = (a: { no: number }, b: { no: number }) => a.no - b.no
  const list =
    tab === '투수' ? PLAYERS.filter((p) => p.group === '투수' && playerStatus(p).kind !== '군입대').sort(byNo)
    : tab === '타자' ? PLAYERS.filter((p) => p.group !== '투수' && playerStatus(p).kind !== '군입대').sort(byNo)
    : tab === '군입대' ? PLAYERS.filter((p) => playerStatus(p).kind === '군입대').sort(byNo)
    : tab === '신입단' ? PLAYERS.filter((p) => playerStatus(p).kind === '신입단').sort(byNo)
    : []
  const isPlayerTab = tab === '투수' || tab === '타자' || tab === '군입대' || tab === '신입단'

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
        {/* 소개 — 감독·주장·대표 타자·대표 투수 */}
        {tab === '소개' && (
          <div className="flex flex-col gap-4">
            {TEAM_INTRO.map((m) => (
              <div key={m.label} className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#050B24] to-[#0E1F5C] aspect-[16/10]">
                <p className="absolute left-4 top-3 text-[11px] font-bold tracking-wide text-white/50">{m.label}</p>
                {/* 선수 사진 더미 영역 */}
                <div className="absolute right-0 bottom-0 w-[48%] h-[88%]">
                  <PH className="w-full h-full rounded-none bg-white/10" />
                </div>
                <div className="absolute left-4 top-10 w-[55%]">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-white text-[26px] font-black leading-none">{m.name}</span>
                    <span className="text-white/70 text-[12px]">{m.role}</span>
                  </div>
                  <div className="h-px bg-white/30 my-3" />
                  <p className="text-white/80 text-[11px] leading-relaxed whitespace-pre-line">{m.message}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 감독 */}
        {tab === '감독' && <StaffCard s={MANAGER} />}

        {/* 코칭스텝 */}
        {tab === '코칭스텝' && (
          <div className="flex flex-col gap-3">
            {COACHING_STAFF.map((c, i) => <StaffCard key={i} s={c} />)}
          </div>
        )}

        {/* 선수 — 9:16 카드, 한 줄 2명 */}
        {isPlayerTab && (
          <>
            {list.length === 0 && <p className="text-center text-sm text-[#9CA3AF] py-16">해당하는 선수가 없어요</p>}
            <div className="grid grid-cols-2 gap-3">
              {list.map((p) => {
                const st = playerStatus(p)
                return (
                  <button
                    key={p.id}
                    onClick={() => navigate(`/all/player-detail?id=${p.id}`)}
                    className="relative bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] overflow-hidden text-left"
                  >
                    <PH className="w-full aspect-[9/16] rounded-none" />
                    {/* 1군 / 2군 / 부상 배지 — 군입대 선수는 표시 안 함 */}
                    {tab !== '군입대' && (
                      <span className={`absolute left-2 top-2 text-[10px] font-bold rounded-full px-2 py-0.5 ${
                        st.tier === '부상' ? 'bg-[#EF4444] text-white' : st.tier === '2군' ? 'bg-[#E8EBF4] text-[#64748B]' : 'bg-[#1B5BF0] text-white'
                      }`}>
                        {st.tier}
                      </span>
                    )}
                    <div className="absolute left-0 right-0 bottom-0 p-2.5 bg-gradient-to-t from-black/60 to-transparent">
                      <div className="flex items-center gap-1">
                        <span className="text-[#F0A500] text-[11px] font-bold">{p.no}</span>
                        <span className="text-[13px] font-semibold text-white truncate">{p.name}</span>
                        {p.foreign && <span className="text-[8px] font-bold text-white/80 bg-white/20 rounded px-1">외국인</span>}
                      </div>
                      <span className="text-[10px] text-white/70">{p.pos} · {p.handed}</span>
                      {tab !== '군입대' && st.tier === '부상' && st.injury && (
                        <p className="text-[10px] text-[#FCA5A5] truncate">부상 : {st.injury}</p>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
