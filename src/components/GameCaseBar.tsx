import { CaseSelect } from '@/components/CaseSelect'
import { MATCH_STATES } from '@/data/home'
import {
  POSTSEASON_INFO, SEASON_PHASES, setMatchState, setSeasonPhase, useCaseState,
} from '@/data/caseStore'

/** 홈 '오늘의 경기' 위 케이스 바 — 시즌 단계 / 경기 상태를 바꾸면 앱 전체가 연동된다 (와이어프레임 전용) */
export function GameCaseBar() {
  const { phase, match } = useCaseState()
  return (
    <div className="flex items-center justify-between gap-2 px-4 pt-4">
      <span className="text-[10px] font-semibold leading-tight text-red-400">케이스 전환<br />전체 화면 연동</span>
      <div className="flex gap-1.5">
        <CaseSelect value={phase} options={SEASON_PHASES} onChange={setSeasonPhase} />
        <CaseSelect value={match} options={MATCH_STATES} onChange={setMatchState} />
      </div>
    </div>
  )
}

/** 포스트시즌(와일드카드·준PO·PO·KS)일 때 오늘의 경기 카드를 강조하는 프레임 */
export function PostseasonFrame({ children }: { children: React.ReactNode }) {
  const { phase } = useCaseState()
  if (phase === '정규시즌') return <>{children}</>
  const info = POSTSEASON_INFO[phase]
  return (
    <div className="rounded-3xl bg-gradient-to-br from-[#0E1A40] via-[#1B3A80] to-[#0E1A40] p-1.5 shadow-lg ring-1 ring-[#F0A500]/60">
      <div className="flex items-center justify-between px-2.5 pb-2 pt-1.5">
        <div className="flex items-center gap-1.5">
          <span className="text-[13px]">🏆</span>
          <span className="text-[12px] font-black tracking-wide text-[#F0A500]">{info.title}</span>
          <span className="text-[11px] font-semibold text-white">{info.game}</span>
        </div>
        <span className="text-[10px] text-white/70">{info.format} · {info.record}</span>
      </div>
      {children}
    </div>
  )
}

type Context = 'game' | 'schedule' | 'lineup' | 'ticket' | 'ticketlist' | 'bookings'

const MESSAGES: Record<Context, Partial<Record<(typeof MATCH_STATES)[number], string>>> = {
  game: {
    '우천 지연': '우천으로 경기 개시가 지연되고 있어요.',
    '우천 취소': '우천으로 오늘 경기가 취소됐어요. 순연 일정은 확정 후 안내드려요.',
    '경기 연기': '오늘 경기가 연기됐어요. 재편성 일정은 확정 후 안내드려요.',
    '서스펜디드': '경기가 중단(서스펜디드)됐어요. 속개 일정은 확정 후 안내드려요.',
    '더블헤더': '오늘은 더블헤더예요. 1차전 16:00, 2차전은 1차전 종료 30분 후 시작해요.',
  },
  schedule: {
    '우천 지연': '오늘 경기가 우천으로 지연되고 있어요.',
    '우천 취소': '오늘 경기가 우천 취소됐어요. 순연 경기는 확정되면 일정에 추가돼요.',
    '경기 연기': '오늘 경기가 연기됐어요. 재편성 경기는 확정되면 일정에 추가돼요.',
    '서스펜디드': '중단된 경기는 속개가 확정되면 일정에 추가돼요.',
    '더블헤더': '오늘 경기는 더블헤더로 두 경기가 열려요.',
  },
  lineup: {
    '우천 지연': '경기 지연 중이라 라인업이 변경될 수 있어요.',
    '경기 중': '교체된 선수는 경기 중 실시간으로 반영돼요.',
    '서스펜디드': '중단 시점(6회초)의 라인업과 교체 내역이 그대로 유지돼요. 속개 시 이어서 진행돼요.',
    '더블헤더': '1차전과 2차전 라인업은 각각 발표돼요. 2차전은 1차전 종료 후 확정돼요.',
  },
  ticket: {
    '우천 지연': '경기 개시가 지연 중이에요. 입장 가능 여부는 확정되면 알려드려요.',
    '우천 취소': '경기가 취소되어 입장할 수 없어요. 티켓은 자동 환불됩니다.',
    '경기 후': '경기가 종료되어 입장 QR이 만료됐어요.',
    '경기 연기': '경기가 연기되어 입장할 수 없어요. 재편성 일정과 티켓 처리 방법은 확정 후 안내드려요.',
    '서스펜디드': '경기가 중단됐어요. 속개 일정이 확정되면 안내드려요.',
  },
  ticketlist: {},
  bookings: {
    '우천 지연': '오늘 경기가 지연 중이에요. 취소가 확정되면 예매 티켓은 자동 환불됩니다.',
    '우천 취소': '오늘 경기가 취소되어 예매 티켓이 자동 환불 진행 중이에요.',
    '경기 연기': '오늘 경기가 연기됐어요. 예매 티켓의 환불·유효 여부는 재편성 확정 후 안내드려요.',
    '서스펜디드': '중단된 경기는 속개 시 기존 예매 티켓이 유효해요. (예시)',
  },
}

/** 전역 케이스(포스트시즌·우천 등)에 따라 각 화면 상단에 보여주는 안내 */
export function GameStateNotice({ context, dark = false, inset = true }: { context: Context; dark?: boolean; inset?: boolean }) {
  const { phase, match } = useCaseState()
  const msg = MESSAGES[context][match]
  const post = phase !== '정규시즌' ? POSTSEASON_INFO[phase] : null
  if (!msg && !post) return null
  const warn = match === '우천 취소' || match === '경기 연기'
  const body = (
    <div className="flex flex-col gap-1.5">
      {post && (
        <div className="flex items-center gap-1.5 rounded-xl bg-[#0E1A40] px-3 py-2">
          <span className="text-[12px]">🏆</span>
          <span className="text-[12px] font-black text-[#F0A500]">{post.title}</span>
          <span className="text-[11px] font-semibold text-white">{post.game}</span>
          <span className="ml-auto text-[10px] text-white/70">{post.record}</span>
        </div>
      )}
      {msg && (
        <p
          className={`rounded-xl px-3 py-2.5 text-[12px] font-semibold leading-snug ${
            dark ? 'bg-white/10 text-white' : warn ? 'bg-[#FDECEC] text-[#C62828]' : 'bg-[#FFF9E6] text-[#8A5A00]'
          }`}
        >
          {msg}
        </p>
      )}
    </div>
  )
  return inset ? <div className="px-4 pt-3">{body}</div> : body
}
