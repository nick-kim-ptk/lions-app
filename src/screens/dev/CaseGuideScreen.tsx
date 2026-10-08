import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Header } from '@/components/Layout'
import { isPostseason, setMatchState, setSeasonPhase, useCaseState } from '@/data/caseStore'
import {
  DECISIONS, GLOSSARY, GUIDE_INTRO, MATCH_GUIDE, OFF_SEASON, OPEN_ITEMS, PENDING_LINKS,
  ROUTE_TABLE, SCREEN_LINKS, SEASON_GUIDE, SYSTEM_GUIDE, type SystemGuide,
} from '@/data/caseGuide'

const TABS = ['개요', '시즌 단계', '경기 상태', '공통 시스템 상태', '화면 연동', '정의 필요', '용어'] as const
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


/** 공통 시스템 상태 미리보기 (작은 목업) */
function SystemPreview({ id }: { id: SystemGuide['id'] }) {
  const box = 'rounded-xl border border-dashed border-[#C4C9D6] bg-[#F8F9FC] p-3'
  const btn = 'mt-2 inline-block rounded-lg bg-[#1B5BF0] px-3 py-1.5 text-[11px] font-bold text-white'
  if (id === 'loading')
    return (
      <div className={`${box} flex flex-col gap-2`}>
        <div className="h-3 w-2/3 animate-pulse rounded bg-[#E4E8F5]" />
        <div className="h-16 w-full animate-pulse rounded-lg bg-[#E4E8F5]" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-[#E4E8F5]" />
      </div>
    )
  if (id === 'empty')
    return (
      <div className={`${box} text-center`}>
        <p className="text-2xl">🎟</p>
        <p className="mt-1 text-[12px] font-semibold text-[#0E1A40]">예매 내역이 없어요</p>
        <span className={btn}>티켓 예매하기</span>
      </div>
    )
  if (id === 'error')
    return (
      <div className={`${box} text-center`}>
        <p className="text-2xl">⚠️</p>
        <p className="mt-1 text-[12px] font-semibold text-[#0E1A40]">정보를 불러오지 못했어요</p>
        <p className="text-[11px] text-[#9CA3AF]">잠시 후 다시 시도해 주세요</p>
        <span className={btn}>다시 시도</span>
      </div>
    )
  if (id === 'offline')
    return (
      <div className={box}>
        <div className="rounded-lg bg-[#111827] px-3 py-2 text-[11px] font-semibold text-white">인터넷 연결을 확인해주세요</div>
        <div className="mt-2 h-10 rounded-lg bg-[#E4E8F5]" />
      </div>
    )
  if (id === 'maintenance')
    return (
      <div className={`${box} text-center`}>
        <p className="text-2xl">🛠</p>
        <p className="mt-1 text-[12px] font-semibold text-[#0E1A40]">서버 점검 중이에요</p>
        <p className="text-[11px] text-[#64748B]">점검 시간 00:00 ~ 06:00 (예시)</p>
        <span className={btn}>확인</span>
      </div>
    )
  if (id === 'update')
    return (
      <div className={box}>
        <div className="mx-auto w-4/5 rounded-xl bg-white p-3 text-center shadow">
          <p className="text-[12px] font-semibold text-[#0E1A40]">새 버전이 필요해요</p>
          <p className="text-[11px] text-[#9CA3AF]">업데이트 후 이용할 수 있어요</p>
          <span className={btn}>업데이트</span>
        </div>
      </div>
    )
  if (id === 'session')
    return (
      <div className={box}>
        <div className="mx-auto w-4/5 rounded-xl bg-white p-3 text-center shadow">
          <p className="text-[12px] font-semibold text-[#0E1A40]">로그인이 만료되었어요</p>
          <p className="text-[11px] text-[#9CA3AF]">다시 로그인해 주세요</p>
          <span className={btn}>다시 로그인</span>
        </div>
      </div>
    )
  if (id === 'login')
    return (
      <div className={`${box} pt-8`}>
        <div className="rounded-t-2xl bg-white p-3 text-center shadow">
          <p className="text-[12px] font-semibold text-[#0E1A40]">로그인이 필요해요</p>
          <div className="mt-2 flex gap-2">
            <span className="flex-1 rounded-lg border border-[#DDE1EC] py-1.5 text-[11px] text-[#64748B]">닫기</span>
            <span className="flex-1 rounded-lg bg-[#1B5BF0] py-1.5 text-[11px] font-bold text-white">로그인</span>
          </div>
        </div>
      </div>
    )
  return (
    <div className={`${box} text-center`}>
      <p className="text-2xl">📷</p>
      <p className="mt-1 text-[12px] font-semibold text-[#0E1A40]">사진 접근 권한이 필요해요</p>
      <p className="text-[11px] text-[#9CA3AF]">일기에 사진을 올리려면 권한을 허용해 주세요</p>
      <span className={btn}>설정으로 이동</span>
    </div>
  )
}

// 가이드 — 시즌 단계·경기 상태·공통 시스템 상태 정의서 (와이어프레임 전용 페이지)
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
      <Header title="가이드" />

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
              <H>확정된 정책</H>
              <div className="flex flex-col gap-2.5">
                {DECISIONS.map((d) => (
                  <div key={d.topic}>
                    <p className="text-[12px] font-semibold text-[#0E1A40]">{d.topic}</p>
                    <p className="text-[11px] leading-relaxed text-[#64748B]">{d.decision}</p>
                  </div>
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
                  <span className="text-[14px] font-black text-[#0E1A40]">{isPostseason(s.phase) ? `🏆 ${s.phase}` : s.phase}</span>
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
              <H>참고</H>
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

        {tab === '공통 시스템 상태' && (
          <>
            <p className="px-1 text-[11px] leading-relaxed text-[#64748B]">
              경기 상태와 상관없이 모든 화면에서 발생할 수 있는 상태 9종입니다. 화면마다 따로 만들지 않고 같은 규칙·같은 모양으로 쓰는 것을 전제로 합니다. 아래 미리보기는 모양 예시입니다.
            </p>
            {SYSTEM_GUIDE.map((g) => (
              <Card key={g.id}>
                <p className="mb-2 text-[14px] font-black text-[#0E1A40]">{g.name}</p>
                <SystemPreview id={g.id} />
                <div className="mt-3 flex flex-col gap-1">
                  <p className="text-[11px] leading-relaxed text-[#374151]"><span className="font-bold text-[#0E1A40]">발생 조건</span> — {g.when}</p>
                  <p className="text-[11px] leading-relaxed text-[#374151]"><span className="font-bold text-[#0E1A40]">화면 표시</span> — {g.display}</p>
                  <p className="text-[11px] leading-relaxed text-[#374151]"><span className="font-bold text-[#0E1A40]">사용자 동작</span> — {g.action}</p>
                  <p className="text-[11px] leading-relaxed text-[#374151]"><span className="font-bold text-[#0E1A40]">적용 화면</span> — {g.screens}</p>
                  {g.open && <p className="text-[11px] font-semibold text-[#C2410C]">⚠ 정의 필요: {g.open}</p>}
                </div>
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
              구단·티켓링크 확인이 필요한 정책입니다. 답변을 받으면 화면 설계서에 반영하고 이 목록에서 삭제합니다. 현재 화면의 관련 문구는 모두 "예시"입니다.
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
