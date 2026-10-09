import { useState, useEffect } from "react"

import { Header, useScreenIdOverride } from "@/components/Layout"

import { EmptyState } from "@/components/EmptyState"

import { CaseSelect } from "@/components/CaseSelect"

import {
  useCaseState,
  withCaseGames,
  isSeasonEndPhase,
  isNoGamePhase,
} from "@/data/caseStore"

import {
  BOOKINGS,
  GAME_BY_ID,
  TEAMS,
  TODAY_GAME,
  MOCK_TODAY,
  fmtMDW,
  resultOf,
  resultText,
  type Game,
  type GameResult,
} from "@/data/mock"

// 054-SL-MY-25 함께 만드는 V9 — 2027 시즌 직관·집관 기록 (경기 당일 24시까지 작성, 이후 수정·삭제 가능)

// 관람 방식은 직관/집관 2택, 홈/원정은 경기 정보에서 자동 표기, 승패는 경기 데이터에서 자동 반영

type WatchMode = "직관" | "집관"

type WriteCase = "작성 가능" | "이미 기록함" | "경기 시작 전" | "경기 없음" | "시즌 종료"

const WRITE_CASES = [
  "작성 가능",
  "이미 기록함",
  "경기 시작 전",
  "경기 없음",
  "시즌 종료",
] as const

type Post = {
  id: number
  gameId: string
  watchMode: WatchMode
  player: string
  text: string
  hasPhoto: boolean
}

// 더미 기록 (경기 일정 더미에서 날짜·상대·결과를 파생)

const INITIAL_POSTS: Post[] = [
  {
    id: 1,
    gameId: "G2026-09-18",
    watchMode: "집관",
    player: "구자욱",
    text: "오늘 경기 분위기 미쳤다ㅋㅋ 3회부터 응원단이 완전 달아올랐어요 🔥",
    hasPhoto: true,
  },

  {
    id: 2,
    gameId: "G2026-09-17",
    watchMode: "직관",
    player: "김지찬",
    text: "잠실 원정 직관! 비 오는 와중에 콜드게임 승리까지, 서울까지 온 보람이 있었어요 🙌",
    hasPhoto: true,
  },

  {
    id: 3,
    gameId: "G2026-09-13",
    watchMode: "직관",
    player: "디아즈",
    text: "LG전 시리즈 마무리 승리! 9회까지 응원석 분위기가 최고였어요 ⚾",
    hasPhoto: true,
  },

  {
    id: 4,
    gameId: "G2026-09-12",
    watchMode: "직관",
    player: "원태인",
    text: "아쉬운 패배였지만 원태인 선수 호투는 정말 멋졌어요. 내일은 꼭 이기자 👏",
    hasPhoto: false,
  },

  {
    id: 5,
    gameId: "G2026-09-06",
    watchMode: "집관",
    player: "",
    text: "12회 연장 무승부… 끝까지 긴장했던 경기!",
    hasPhoto: false,
  },
]

const baseId = (id: string) => id.replace(/-2$/, "")

const isConfirmedAttendance = (id: string) =>
  BOOKINGS.some(
    (b) =>
      b.gameId === baseId(id) &&
      (b.status === "예매 완료" || b.status === "관람 완료"),
  )

const WRITE_MESSAGES: Record<Exclude<WriteCase, "작성 가능">, string> = {
  "이미 기록함":
    "오늘 경기는 이미 기록했어요. 기록 카드의 수정 버튼으로 고칠 수 있어요.",

  "경기 시작 전": "경기가 시작되면 기록할 수 있어요.",

  "경기 없음": "오늘은 경기가 없어요. 기록은 경기 당일에만 남길 수 있어요.",

  "시즌 종료":
    "2027 시즌 기록이 마무리되었어요. 기존 기록은 수정·삭제할 수 있어요.",
}

function ResultStamp({ result }: { result: GameResult }) {
  const tone = result === "win" ? "rgba(220,38,38," : "rgba(100,116,139,"

  const lines =
    result === "win"
      ? ["WIN", "or", "WIN"]
      : result === "loss"
        ? ["NEXT", "GAME"]
        : ["DRAW"]

  return (
    <div
      className="absolute z-10 flex items-center justify-center pointer-events-none"
      style={{ top: 56, right: 40, transform: "rotate(-12deg)" }}
    >
      <div
        className="flex items-center justify-center"
        style={{
          width: 68,
          height: 68,
          borderRadius: "50%",
          border: `3.5px solid ${tone}0.8)`,
          background: `${tone}0.05)`,
        }}
      >
        <div className="flex flex-col items-center leading-none">
          {lines.map((l, i) => (
            <span
              key={i}
              style={
                l === "or"
                  ? {
                      fontFamily: "Georgia, serif",
                      fontSize: 7,
                      color: `${tone}0.7)`,
                      letterSpacing: "0.2em",
                      margin: "2px 0",
                      lineHeight: 1,
                    }
                  : {
                      fontFamily: 'Impact, "Arial Black", sans-serif',
                      fontSize: 12,
                      fontWeight: 900,
                      color: `${tone}0.88)`,
                      letterSpacing: "0.12em",
                      lineHeight: 1.1,
                    }
              }
            >
              {l}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function DiaryFeedCard({
  post,
  game,
  onEdit,
}: {
  post: Post
  game: Game
  onEdit: () => void
}) {
  const mode = post.watchMode

  const modeIcon = mode === "직관" ? "🏟️" : "📺"

  const modeBadgeClass =
    mode === "직관"
      ? "bg-[#EBF0FF] text-[#1B5BF0]"
      : "bg-[#F0FDF4] text-[#16A34A]"

  const result = resultOf(game)

  const confirmed = mode === "직관" && isConfirmedAttendance(post.gameId)

  return (
    <div className="relative bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] p-4">
      {result && <ResultStamp result={result} />}
      {/* 1행: 관람방식·홈/원정 뱃지 + 수정 버튼 */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <span
            className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${modeBadgeClass}`}
          >
            {modeIcon} {mode}
          </span>
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#F3F4F6] text-[#6B7280]">
            {game.home ? "홈" : "원정"}
          </span>
          {confirmed && (
            <span className="text-[10px] font-semibold text-[#16A34A]">
              ✓ 예매 내역 확인
            </span>
          )}
        </div>
        <button
          onClick={onEdit}
          className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-[#F5F7FB] transition-colors shrink-0"
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#9CA3AF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </button>
      </div>
      {/* 2행: 경기 정보 */}
      <div className="mb-3">
        <p className="text-[18px] font-black text-[#0E1A40] leading-tight">
          삼성 vs {TEAMS[game.opp].short}
        </p>
        <p className="text-[12px] text-[#9CA3AF] mt-0.5">
          {fmtMDW(game.date)}
          {resultText(game) && (
            <span className="ml-1.5 font-semibold text-[#64748B]">
              · {resultText(game)}
            </span>
          )}
        </p>
      </div>
      {/* 3행: 사진 */}
      {post.hasPhoto && (
        <div className="aspect-square w-full rounded-2xl mb-3 flex items-center justify-center overflow-hidden bg-[#1A2A5E]">
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            opacity="0.25"
          >
            <path
              d="M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2zM8.5 13.5l2.5 3 3.5-4.5 4.5 6H5l3.5-4.5z"
              fill="white"
            />
          </svg>
        </div>
      )}
      {/* 4행: 수훈선수 + 한마디 */}
      {post.player && (
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[11px] font-semibold text-[#9CA3AF]">
            오늘 나의 수훈선수
          </span>
          <span className="text-[12px] font-bold text-[#1B5BF0] bg-[#EBF0FF] rounded-full px-2.5 py-0.5">
            {post.player}
          </span>
        </div>
      )}
      {post.text && (
        <p className="text-[13px] text-[#374151] leading-relaxed">
          {post.text}
        </p>
      )}
    </div>
  )
}

export function DiaryScreen() {
  const { phase, match } = useCaseState()

  const todayGames = TODAY_GAME ? withCaseGames(TODAY_GAME) : []

  // 작성 가능 여부 케이스 (전역 시즌 단계·경기 상태에 맞춰 기본값, 직접 바꿔서 확인 가능)

  const deriveCase = (): WriteCase => {
    if (isSeasonEndPhase(phase)) return "시즌 종료"

    if (isNoGamePhase(phase) || match === "우천 취소" || match === "경기 연기")
      return "경기 없음"

    if (match === "경기 전" || match === "우천 지연") return "경기 시작 전"

    return "작성 가능"
  }

  const [writeCase, setWriteCase] = useState<WriteCase>(deriveCase)

  useEffect(() => {
    setWriteCase(deriveCase())
  }, [phase, match]) // eslint-disable-line react-hooks/exhaustive-deps

  const [watchFilter, setWatchFilter] = useState<"전체" | WatchMode>("전체")

  const [venueFilter, setVenueFilter] = useState<"전체" | "홈" | "원정">("전체")

  const [listEmpty, setListEmpty] = useState(false)

  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS)

  const [toast, setToast] = useState<string | null>(null)

  const [showWriteModal, setShowWriteModal] = useState(false)

  const [editingPostId, setEditingPostId] = useState<number | null>(null)

  const [writeGameId, setWriteGameId] = useState<string>(TODAY_GAME?.id ?? "")

  const [writePhoto, setWritePhoto] = useState(false)

  const [writeText, setWriteText] = useState("")

  const [writeWatchMode, setWriteWatchMode] = useState<WatchMode>("직관")

  const [writePlayer, setWritePlayer] = useState<string>("")

  const [playerQuery, setPlayerQuery] = useState<string>("")

  const [playerFocused, setPlayerFocused] = useState(false)

  useScreenIdOverride(showWriteModal ? "101-SL-MY-26" : null)

  useEffect(() => {
    if (!toast) return

    const t = setTimeout(() => setToast(null), 2600)

    return () => clearTimeout(t)
  }, [toast])

  // 게시물에 연결된 경기 (오늘 경기는 전역 경기 상태 반영)

  const gameOf = (id: string): Game => {
    const g = GAME_BY_ID[baseId(id)]

    if (g.date !== MOCK_TODAY) return g

    return withCaseGames(g).find((x) => x.id === id) ?? g
  }

  const visible = (listEmpty ? [] : posts)

    .filter((p) => watchFilter === "전체" || p.watchMode === watchFilter)

    .filter(
      (p) =>
        venueFilter === "전체" ||
        (venueFilter === "홈") === gameOf(p.gameId).home,
    )

    .sort((a, b) => {
      const da = gameOf(a.gameId).date

      const db = gameOf(b.gameId).date

      return da === db ? b.id - a.id : da < db ? 1 : -1
    })

  const canWrite = writeCase === "작성 가능"

  const resetForm = () => {
    setWritePhoto(false)

    setWriteText("")

    setWritePlayer("")

    setPlayerQuery("")
  }

  const openWriteModal = () => {
    if (!canWrite) {
      setToast(WRITE_MESSAGES[(writeCase as Exclude<WriteCase, "작성 가능">)])

      return
    }

    const gid = todayGames[0]?.id ?? ""

    setEditingPostId(null)

    setWriteGameId(gid)

    setWriteWatchMode(isConfirmedAttendance(gid) ? "직관" : "집관")

    resetForm()

    setShowWriteModal(true)
  }

  const openEditModal = (post: Post) => {
    setEditingPostId(post.id)

    setWriteGameId(post.gameId)

    setWriteWatchMode(post.watchMode)

    setWritePlayer(post.player)

    setPlayerQuery(post.player)

    setWriteText(post.text)

    setWritePhoto(post.hasPhoto)

    setShowWriteModal(true)
  }

  const closeModal = () => {
    setShowWriteModal(false)

    setEditingPostId(null)

    resetForm()
  }

  const savePost = () => {
    const player = writePlayer || playerQuery

    if (editingPostId !== null) {
      setPosts((prev) =>
        prev.map((p) =>
          p.id === editingPostId
            ? {
                ...p,
                watchMode: writeWatchMode,
                player,
                text: writeText,
                hasPhoto: writePhoto,
              }
            : p,
        ),
      )

      setToast("기록을 수정했어요.")
    } else {
      setPosts((prev) => [
        {
          id: Date.now(),
          gameId: writeGameId,
          watchMode: writeWatchMode,
          player,
          text: writeText,
          hasPhoto: writePhoto,
        },
        ...prev,
      ])

      setListEmpty(false)

      setWriteCase("이미 기록함")

      setToast("오늘의 기록을 남겼어요.")
    }

    closeModal()
  }

  const modalGame = writeGameId ? gameOf(writeGameId) : undefined

  const modalConfirmed = writeGameId
    ? isConfirmedAttendance(writeGameId)
    : false

  const chip = (active: boolean) =>
    `px-3 py-1 rounded-lg text-[12px] font-bold transition-all flex items-center gap-1 ${
      active ? "bg-[#1B5BF0] text-white" : "text-[#9CA3AF]"
    }`

  return (
    <div className="min-h-full bg-[#F5F7FB] pb-44">
      <Header title="함께 만드는 V9" />

      {/* 필터 — 플로팅 (관람 방식 / 경기장) */}
      <div className="fixed top-14 left-0 right-0 z-30 flex justify-center pt-3 pb-2 pointer-events-none">
        <div className="flex flex-col gap-1 bg-white/80 backdrop-blur-md rounded-2xl px-3 py-2 shadow-lg border border-[#DDE1EC]/60 pointer-events-auto">
          <div className="flex items-center gap-1">
            <span className="w-10 text-[10px] font-semibold text-[#9CA3AF]">
              관람
            </span>
            {(["전체", "직관", "집관"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setWatchFilter(m)}
                className={chip(watchFilter === m)}
              >
                {m !== "전체" && (
                  <span className="text-[11px]">
                    {m === "직관" ? "🏟️" : "📺"}
                  </span>
                )}
                <span>{m}</span>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1">
            <span className="w-10 text-[10px] font-semibold text-[#9CA3AF]">
              경기장
            </span>
            {(["전체", "홈", "원정"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setVenueFilter(v)}
                className={chip(venueFilter === v)}
              >
                <span>{v}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 케이스 전환 (와이어프레임 전용) */}
      <div className="mt-28 flex justify-end gap-2 px-4 pt-3">
        <CaseSelect
          value={writeCase}
          options={WRITE_CASES}
          onChange={setWriteCase}
        />
        <CaseSelect
          value={listEmpty ? "목록 없음" : "목록 있음"}
          options={["목록 있음", "목록 없음"] as const}
          onChange={(v) => setListEmpty(v === "목록 없음")}
        />
      </div>

      {/* 작성 안내 */}
      <div className="px-4 pt-3">
        <div className="bg-[#EBF0FF] border border-[#1B5BF0]/20 rounded-2xl px-4 py-3">
          <p className="text-[12px] font-bold text-[#1B5BF0]">
            2027 시즌, 직관·집관 경기를 기록해요
          </p>
          <p className="mt-0.5 text-[11px] text-[#1B5BF0]/80 leading-relaxed">
            경기 당일 24시까지 작성할 수 있어요. 작성한 기록은 이후에도
            수정·삭제할 수 있어요.
          </p>
        </div>
      </div>

      {/* 게시물 */}
      <div className="px-4 flex flex-col gap-4 mb-4 mt-3">
        {visible.length === 0 && (
          <EmptyState
            icon="📝"
            title={
              watchFilter === "전체" && venueFilter === "전체"
                ? "아직 2027 시즌 기록이 없어요"
                : "조건에 맞는 기록이 없어요"
            }
            desc={
              canWrite
                ? "경기 당일 24시까지, 오늘의 응원을 기록해 보세요."
                : "경기 당일에 직관·집관 기록을 남길 수 있어요."
            }
            actionLabel={
              canWrite && watchFilter === "전체" && venueFilter === "전체"
                ? "첫 기록 남기기"
                : undefined
            }
            onAction={openWriteModal}
          />
        )}
        {visible.map((post) => (
          <DiaryFeedCard
            key={post.id}
            post={post}
            game={gameOf(post.gameId)}
            onEdit={() => openEditModal(post)}
          />
        ))}
      </div>

      {/* 토스트 */}
      {toast && (
        <div
          className="fixed z-50 left-4 right-4 flex justify-center pointer-events-none"
          style={{ bottom: "calc(68px + 84px)" }}
        >
          <div className="max-w-[320px] rounded-xl bg-[#111827]/90 px-4 py-2.5 text-center text-[12px] leading-snug text-white shadow-lg">
            {toast}
          </div>
        </div>
      )}

      {/* 플로팅 펜 버튼 + 툴팁 (작성 가능할 때만 말풍선) */}
      <div
        className="fixed z-40 flex items-center gap-[5px]"
        style={{ bottom: "calc(68px + 16px)", right: 16 }}
      >
        {canWrite && (
          <div className="relative flex items-center">
            <div className="bg-[#FFD600] text-[#0E1A40] text-[12px] font-bold px-3 py-2 rounded-2xl shadow-md whitespace-nowrap leading-snug">
              오늘 경기,
              <br />
              기록하셨나요?
            </div>
            <div
              className="absolute -right-2 top-1/2 -translate-y-1/2 w-0 h-0"
              style={{
                borderTop: "6px solid transparent",
                borderBottom: "6px solid transparent",
                borderLeft: "8px solid #FFD600",
              }}
            />
          </div>
        )}
        <button
          onClick={openWriteModal}
          className={`rounded-full shadow-xl active:scale-95 transition-transform flex items-center justify-center shrink-0 ${
            canWrite ? "bg-[#1B5BF0]" : "bg-[#9CA3AF]"
          }`}
          style={{ width: 52, height: 52 }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* 기록 작성·수정 모달 (101-SL-MY-26) */}
      {showWriteModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeModal}
          />
          <div
            className="relative w-full bg-white rounded-t-3xl p-6 pb-10 flex flex-col gap-5 overflow-y-auto"
            style={{ minHeight: "72vh", maxHeight: "92vh" }}
          >
            <div className="w-10 h-1 rounded-full bg-[#E5E7EB] mx-auto -mt-1 mb-1" />

            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-1 flex-1 pr-3">
                <h2 className="text-[18px] font-bold text-[#111827]">
                  함께 보낸 오늘, 소중한 순간을 기록해보세요.
                </h2>
                <p className="text-[13px] text-[#6B7280]">
                  경기 당일 24시까지 작성할 수 있어요.
                </p>
              </div>
              <button
                onClick={closeModal}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F3F4F6] flex-shrink-0"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    stroke="#6B7280"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            {/* 기록할 경기 — 당일 경기 자동 선택 (더블헤더면 선택) */}
            {editingPostId === null && todayGames.length > 1 ? (
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-bold text-[#111827]">
                  어느 경기를 기록할까요?
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {todayGames.map((g) => (
                    <button
                      key={g.id}
                      onClick={() => {
                        setWriteGameId(g.id)
                        setWriteWatchMode(
                          isConfirmedAttendance(g.id) ? "직관" : "집관",
                        )
                      }}
                      className={`py-2.5 rounded-xl text-[13px] font-bold transition-all ${
                        writeGameId === g.id
                          ? "bg-[#1B5BF0] text-white"
                          : "bg-[#F9FAFB] text-[#9CA3AF] border border-[#DDE1EC]"
                      }`}
                    >
                      {g.note}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
            {modalGame && (
              <div className="w-full rounded-2xl border border-[#DDE1EC] bg-[#F9FAFB] px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-white bg-[#1B5BF0] rounded-full px-2 py-0.5">
                    {modalGame.home ? "홈" : "원정"}
                  </span>
                  <span className="text-[13px] font-semibold text-[#111827]">
                    삼성 vs {TEAMS[modalGame.opp].short}
                  </span>
                </div>
                <span className="text-[11px] text-[#9CA3AF]">
                  {fmtMDW(modalGame.date)}
                </span>
              </div>
            )}

            {/* 관람 방식 */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-bold text-[#111827]">
                어디서 경기를 보셨나요?
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(["직관", "집관"] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setWriteWatchMode(mode)}
                    className={`py-2.5 rounded-xl text-[13px] font-bold transition-all flex items-center justify-center gap-1.5 ${
                      writeWatchMode === mode
                        ? "bg-[#1B5BF0] text-white"
                        : "bg-[#F9FAFB] text-[#9CA3AF] border border-[#DDE1EC]"
                    }`}
                  >
                    <span>{mode === "직관" ? "🏟️" : "📺"}</span>
                    <span>{mode}</span>
                  </button>
                ))}
              </div>
              {modalConfirmed && (
                <p className="text-[11px] text-[#16A34A]">
                  ✓ 예매 내역이 확인된 경기라서 직관으로 선택했어요.
                </p>
              )}
            </div>

            {/* 오늘의 선수 — 자동완성 입력 */}
            {(() => {
              const PLAYERS = [
                "구자욱",
                "김지찬",
                "이재현",
                "강민호",
                "오재일",
                "디아즈",
                "원태인",
                "류지혁",
                "박병호",
                "김헌곤",
              ]

              const CHOSEONG: Record<string, string> = {
                ㄱ: "[가-깋]",
                ㄴ: "[나-닣]",
                ㄷ: "[다-딯]",
                ㄹ: "[라-맇]",
                ㅁ: "[마-밓]",

                ㅂ: "[바-빟]",
                ㅅ: "[사-싷]",
                ㅇ: "[아-잏]",
                ㅈ: "[자-짛]",
                ㅊ: "[차-칳]",

                ㅋ: "[카-킿]",
                ㅌ: "[타-팋]",
                ㅍ: "[파-핗]",
                ㅎ: "[하-힣]",
              }

              const filtered =
                playerQuery.trim() === ""
                  ? PLAYERS
                  : PLAYERS.filter((name) => {
                      const q = playerQuery.trim()

                      if (CHOSEONG[q])
                        return new RegExp(CHOSEONG[q]).test(name[0])

                      return name.includes(q)
                    })

              const showSuggestions =
                playerFocused &&
                playerQuery.trim() !== "" &&
                filtered.length > 0 &&
                playerQuery !== writePlayer

              return (
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-bold text-[#111827]">
                    오늘 나의 수훈선수{" "}
                    <span className="text-[11px] font-normal text-[#9CA3AF]">
                      (선택)
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={playerQuery}
                      onChange={(e) => {
                        setPlayerQuery(e.target.value)
                        setWritePlayer("")
                      }}
                      onFocus={() => setPlayerFocused(true)}
                      onBlur={() =>
                        setTimeout(() => setPlayerFocused(false), 150)
                      }
                      placeholder="선수 이름 또는 초성 입력 (예: ㄱ, 구자욱)"
                      className="w-full rounded-2xl border border-[#DDE1EC] bg-[#F9FAFB] px-4 py-3 text-[13px] text-[#111827] placeholder:text-[#9CA3AF] outline-none focus:border-[#1B5BF0] focus:bg-white transition-colors"
                    />
                    {showSuggestions && (
                      <div className="absolute left-0 right-0 top-full mt-1 bg-white rounded-2xl border border-[#DDE1EC] shadow-lg overflow-hidden z-10">
                        {filtered.map((name) => (
                          <button
                            key={name}
                            onMouseDown={() => {
                              setWritePlayer(name)
                              setPlayerQuery(name)
                              setPlayerFocused(false)
                            }}
                            className="w-full text-left px-4 py-2.5 text-[13px] text-[#111827] hover:bg-[#F5F7FB] transition-colors border-b border-[#F1F5F9] last:border-b-0"
                          >
                            {name}
                          </button>
                        ))}
                      </div>
                    )}
                    {playerFocused &&
                      playerQuery.trim() !== "" &&
                      filtered.length === 0 && (
                        <div className="absolute left-0 right-0 top-full mt-1 bg-white rounded-2xl border border-[#DDE1EC] shadow-lg px-4 py-3 z-10">
                          <p className="text-[12px] text-[#9CA3AF]">
                            검색 결과 없음
                          </p>
                        </div>
                      )}
                  </div>
                </div>
              )
            })()}

            <button
              onClick={() => setWritePhoto((v) => !v)}
              className={`w-full aspect-video rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-colors ${
                writePhoto
                  ? "border-[#1B5BF0] bg-[#1A2A5E]"
                  : "border-[#DDE1EC] bg-[#F9FAFB]"
              }`}
            >
              {writePhoto ? (
                <>
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    opacity="0.4"
                  >
                    <path
                      d="M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2zM8.5 13.5l2.5 3 3.5-4.5 4.5 6H5l3.5-4.5z"
                      fill="white"
                    />
                  </svg>
                  <span className="text-white/50 text-[12px]">
                    사진 선택됨 (탭하여 취소)
                  </span>
                </>
              ) : (
                <>
                  <div className="w-10 h-10 rounded-full bg-[#EBF0FF] flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 5v14M5 12h14"
                        stroke="#1B5BF0"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <span className="text-[13px] font-semibold text-[#374151]">
                    사진 추가
                  </span>
                  <span className="text-[11px] text-[#9CA3AF]">
                    탭하여 갤러리에서 선택
                  </span>
                </>
              )}
            </button>

            <textarea
              value={writeText}
              onChange={(e) => setWriteText(e.target.value)}
              placeholder={
                "파란 피의 자부심, 언어에서도 빛납니다.\n선수들에게 상처가 되는 말 대신, 승리를 향한 긍정의 메시지를 남겨주세요!"
              }
              className="w-full rounded-2xl border border-[#DDE1EC] bg-[#F9FAFB] px-4 py-4 text-[13px] text-[#111827] placeholder:text-[#9CA3AF] resize-none outline-none focus:border-[#1B5BF0] focus:bg-white transition-colors"
              style={{ minHeight: 140 }}
            />

            {editingPostId !== null ? (
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setPosts((prev) =>
                      prev.filter((p) => p.id !== editingPostId),
                    )
                    setToast("기록을 삭제했어요.")
                    closeModal()
                  }}
                  className="rounded-2xl text-[15px] font-bold bg-[#F3F4F6] text-[#6B7280] transition-colors"
                  style={{ minHeight: 56, flex: "0 0 30%" }}
                >
                  삭제하기
                </button>
                <button
                  disabled={!writePhoto && writeText.trim().length === 0}
                  onClick={savePost}
                  className={`rounded-2xl text-[16px] font-bold transition-colors ${
                    writePhoto || writeText.trim().length > 0
                      ? "bg-[#1B5BF0] text-white"
                      : "bg-[#F3F4F6] text-[#9CA3AF] cursor-not-allowed"
                  }`}
                  style={{ minHeight: 56, flex: "0 0 calc(70% - 4px)" }}
                >
                  수정 완료
                </button>
              </div>
            ) : (
              <button
                disabled={!writePhoto && writeText.trim().length === 0}
                onClick={savePost}
                className={`w-full rounded-2xl text-[16px] font-bold transition-colors ${
                  writePhoto || writeText.trim().length > 0
                    ? "bg-[#1B5BF0] text-white"
                    : "bg-[#F3F4F6] text-[#9CA3AF] cursor-not-allowed"
                }`}
                style={{ minHeight: 56 }}
              >
                등록하기
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
