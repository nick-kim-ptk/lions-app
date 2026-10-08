import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Header } from '@/components/Layout'
import { setMatchState, setSeasonPhase, useCaseState } from '@/data/caseStore'
import {
  GLOSSARY, GUIDE_INTRO, MATCH_GUIDE, OFF_SEASON, OPEN_ITEMS, PENDING_LINKS, ROADMAP,
  ROUTE_TABLE, SCREEN_LINKS, SEASON_GUIDE,
} from '@/data/caseGuide'

const TABS = ['개요', '시즌 단계', '경기 상태', '화면 연동', '정의 필요', '용어'] as const
type Tab = (typeof TABS)[number]

const KIND_STYLE = {
  정상: 'bg-[#EBF0FF] text-[#1B5BF0]',
  변경: 'bg-[#FFF4D6] text-[#B7791F]',
  특수: 'bg-[#F3E8FF] text-[#7E22CE]',
} as const

const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-2xl border border-[#DDE1EC] bg-white p-4">{children}</div>
)
const H = ({ children }: { children: React.ReactNode }) => (
  <p className="px-1 pb-2 pt-1 text-[13px] font-bold text-[#111827]">{children}</p>
)

// 케이스 가이드 — 시즌 단계·경기 상태 정의서 (와이어프레임 전용 페이지)
export function CaseGuideScreen() {
  const navigate = useNavigate()
  const [tab, setTab] = useState<Tab>('개요')
  const { phase, match } = useCaseState()

  const applyPhase = (p: (typeof SEASON_GUIDE)[number]['phase']) => {
    setSeasonPhase(p)
    navigate('/home')
  }
  const applyMatch = (m: (typeof MATCH_GUIDE)[number]['state']) => {
    setMatchState(m)
    navigate('/home')
  }

  return (
    <div className="min-h-full bg-[#F5F7FB] pb-10">
      <Header title="케이스 가이드" />

      <div className="sticky top-14 z-10 flex gap-1 overflow-x-auto border-b border-[#DDE1EC] bg-[#F5F7FB] px-3 py-2" style={{ scrollbarWidth: 'none' }}>
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`shrink-0 rounded-full px-3 py-1.5 text-[12px] font-semibold ${tab === t ? 'bg-[#0E1A40] text-white' : 'bg-white text-[#64748B] border border-[#DDE1EC]'}`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3 px-4 pt-4">
        {tab === '개요' && (
          <>
            <Card>
              <H>이 페이지는 무엇인가요?</H>
              <div className="flex flex-col gap-2">
                {GUIDE_INTRO.map((t) => (
                  <p key={t} className="text-[12px] leading-relaxed text-[#374151]">{t}</p>
                ))}
              </div>
            </Card>
            <Card>
              <H>지금 적용 중인 케이스</H>
              <p className="text-[13px] font-semibold text-[#0E1A40]">{phase} · {match}</p>
              <button onClick={() => navigate('/home')} className="mt-3 h-10 w-full rounded-xl bg-[#1B5BF0] text-[13px] font-bold text-white">
                홈에서 보기
              </button>
            </Card>
            <Card>
              <H>케이스 정의 진행 순서</H>
              <div className="flex flex-col gap-2">
                {ROADMAP.map((r) => (
                  <div key={r.n} className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#EBF0FF] text-[11px] font-bold text-[#1B5BF0]">{r.n}</span>
                    <div>
                      <p className="text-[13px] font-semibold text-[#0E1A40]">{r.name}</p>
                      <p className="text-[11px] text-[#64748B]">{r.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </>
        )}

        {tab === '시즌 단계' && (
          <>
            <Card>
              <H>정규시즌 순위별 시작 단계</H>
              <div className="divide-y divide-[#F0F2F5]">
                {ROUTE_TABLE.map((r) => (
                  <div key={r.rank} className="flex items-center justify-between py-2">
                    <span className="text-[12px] font-bold text-[#0E1A40]">{r.rank}</span>
                    <span className="text-[12px] text-[#64748B]">{r.start}</span>
                  </div>
                ))}
              </div>
            </Card>
            {SEASON_GUIDE.map((s) => (
              <Card key={s.phase}>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[14px] font-black text-[#0E1A40]">{s.phase === '정규시즌' ? s.phase : `🏆 ${s.phase}`}</span>
                  {phase === s.phase && <span className="rounded-full bg-[#EBF0FF] px-2 py-0.5 text-[10px] font-bold text-[#1B5BF0]">적용 중</span>}
                </div>
                <p className="text-[12px] font-semibold text-[#1B5BF0]">{s.who}</p>
                <p className="mb-2 text-[11px] text-[#64748B]">{s.format}</p>
                <p className="mb-3 text-[12px] leading-relaxed text-[#374151]">{s.summary}</p>
                <div className="mb-3 rounded-xl bg-[#F5F7FB] p-3">
                  <p className="mb-1 text-[10px] font-bold text-[#9CA3AF]">앱 영향</p>
                  {s.appImpact.map((a) => (
                    <p key={a} className="text-[11px] leading-relaxed text-[#374151]">• {a}</p>
                  ))}
                </div>
                <button onClick={() => applyPhase(s.phase)} className="h-9 w-full rounded-xl border border-[#1B5BF0] text-[12px] font-bold text-[#1B5BF0]">
                  홈에서 이 단계 보기
                </button>
              </Card>
            ))}
            <Card>
              <H>시즌 밖 구간 (제안 2번에서 케이스 추가 예정)</H>
              <div className="flex flex-col gap-2">
                {OFF_SEASON.map((o) => (
                  <div key={o.name}>
                    <p className="text-[12px] font-bold text-[#0E1A40]">{o.name}</p>
                    <p className="text-[11px] leading-relaxed text-[#64748B]">{o.desc}</p>
                  </div>
                ))}
              </div>
            </Card>
          </>
        )}

        {tab === '경기 상태' && (
          <>
            <p className="px-1 text-[11px] leading-relaxed text-[#64748B]">
              오늘 경기의 상태 8종입니다. 한 경기는 항상 하나의 상태이며, 시즌 단계와는 독립적으로 조합됩니다(예: 한국시리즈 + 우천 지연).
            </p>
            {MATCH_GUIDE.map((m) => (
              <Card key={m.state}>
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-[14px] font-black text-[#0E1A40]">{m.state}</span>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${KIND_STYLE[m.kind]}`}>{m.kind}</span>
                  {match === m.state && <span className="ml-auto rounded-full bg-[#EBF0FF] px-2 py-0.5 text-[10px] font-bold text-[#1B5BF0]">적용 중</span>}
                </div>
                <p className="mb-1 text-[12px] leading-relaxed text-[#374151]">{m.definition}</p>
                <p className="mb-3 text-[11px] text-[#9CA3AF]">발생 원인: {m.cause}</p>
                <div className="mb-3 rounded-xl bg-[#F5F7FB] p-3">
                  <p className="mb-1 text-[10px] font-bold text-[#9CA3AF]">화면별 영향</p>
                  {m.effects.map((e) => (
                    <p key={e.screen} className="text-[11px] leading-relaxed text-[#374151]">
                      <span className="font-bold text-[#0E1A40]">{e.screen}</span> — {e.text}
                    </p>
                  ))}
                </div>
                <p className="mb-1 text-[11px] text-[#374151]"><span className="font-bold text-[#0E1A40]">티켓 처리</span> — {m.ticket}</p>
                {m.open && <p className="mb-3 text-[11px] font-semibold text-[#C2410C]">⚠ 정의 필요: {m.open}</p>}
                <button onClick={() => applyMatch(m.state)} className="mt-2 h-9 w-full rounded-xl border border-[#1B5BF0] text-[12px] font-bold text-[#1B5BF0]">
                  홈에서 이 상태 보기
                </button>
              </Card>
            ))}
          </>
        )}

        {tab === '화면 연동' && (
          <>
            <Card>
              <H>케이스에 따라 바뀌는 화면</H>
              <div className="flex flex-col gap-3">
                {SCREEN_LINKS.map((s) => (
                  <div key={s.screen} className="border-b border-[#F0F2F5] pb-3 last:border-0 last:pb-0">
                    <p className="text-[13px] font-bold text-[#0E1A40]">{s.screen}</p>
                    <p className="text-[11px] text-[#64748B]">시즌 단계 — {s.season}</p>
                    <p className="text-[11px] text-[#64748B]">경기 상태 — {s.match}</p>
                  </div>
                ))}
              </div>
            </Card>
            <Card>
              <H>아직 연동하지 않은 화면</H>
              {PENDING_LINKS.map((p) => (
                <div key={p.screen} className="flex items-start justify-between gap-3 py-1.5">
                  <span className="text-[12px] text-[#0E1A40]">{p.screen}</span>
                  <span className="text-right text-[11px] text-[#64748B]">{p.plan}</span>
                </div>
              ))}
            </Card>
          </>
        )}

        {tab === '정의 필요' && (
          <>
            <p className="px-1 text-[11px] leading-relaxed text-[#64748B]">
              앱 화면만으로는 확정할 수 없는 정책입니다. 구단·티켓링크·기획 확인 후 화면 설계서에 반영합니다. 현재 화면의 관련 문구는 모두 "예시"입니다.
            </p>
            {OPEN_ITEMS.map((o, i) => (
              <Card key={o.topic}>
                <div className="mb-1 flex items-center gap-2">
                  <span className="text-[11px] font-bold text-[#C2410C]">미정 {i + 1}</span>
                  <span className="rounded-full bg-[#F0F2F5] px-2 py-0.5 text-[10px] font-semibold text-[#64748B]">{o.owner}</span>
                </div>
                <p className="text-[13px] font-bold text-[#0E1A40]">{o.topic}</p>
                <p className="mt-0.5 text-[12px] leading-relaxed text-[#374151]">{o.detail}</p>
                <p className="mt-1 text-[11px] text-[#9CA3AF]">영향 화면: {o.screens}</p>
              </Card>
            ))}
          </>
        )}

        {tab === '용어' && (
          <Card>
            <H>야구 용어 (개발·기획용)</H>
            <div className="flex flex-col gap-3">
              {GLOSSARY.map((g) => (
                <div key={g.term}>
                  <p className="text-[13px] font-bold text-[#0E1A40]">{g.term}</p>
                  <p className="text-[12px] leading-relaxed text-[#64748B]">{g.desc}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-[10px] leading-relaxed text-[#9CA3AF]">※ 이닝 기준·연장 이닝 등 세부 규정은 KBO 규정 확인 후 확정합니다.</p>
          </Card>
        )}
      </div>
    </div>
  )
}
