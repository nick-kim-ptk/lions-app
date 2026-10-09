import { useState, useRef } from "react"

import { useNavigate } from "react-router-dom"

import { PH, PHCircle } from "@/components/Placeholder"

import { CaseSelect } from "@/components/CaseSelect"

import { MemberCard } from "@/components/MemberCard"

import { EMBLEMS, EMBLEM_TOTAL } from "@/data/emblems"

import { joinInfo, type JoinKind, type JoinState } from "@/data/mock/membership"

type MemberCase = "멤버십 모집 전" | "멤버십 모집 중" | "가입 완료"

// 가입 후 카드(가입 완료)는 components/MemberCard 공용 — 나의 멤버십/시즌권 화면과 같은 디자인

// 모집 카드(멤버십 모집 전 / 멤버십 모집 중)는 아래 JoinClosedCard

function JoinClosedCard({
  kind,
  title,
  tone,
  state,
  onJoin,
}: {
  kind: JoinKind
  title: string
  tone: "blue" | "gold"
  state: JoinState
  onJoin: () => void
}) {
  const { schedule, dday } = joinInfo(kind, state)

  const open = state === "모집 중"

  const bg = open
    ? tone === "blue"
      ? "from-[#1B5BF0] to-[#0E2F80]"
      : "from-[#F0A500] to-[#D48B00]"
    : tone === "blue"
      ? "from-[#64748B] to-[#334155]"
      : "from-[#B8A27A] to-[#8A7650]"

  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${bg} p-5 aspect-[9/16] flex flex-col justify-between`}
    >
      <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-white/10 pointer-events-none" />
      <div className="absolute -left-10 bottom-24 w-32 h-32 rounded-full bg-white/5 pointer-events-none" />
      <div className="relative flex items-start justify-between gap-2">
        <div>
          <p className="text-white/70 text-[10px] font-medium tracking-widest mb-1">
            SAMSUNG LIONS
          </p>
          <p className="text-white text-[18px] font-bold leading-snug">
            {title}
          </p>
        </div>
      </div>
      <div className="relative flex flex-col items-center gap-1">
        <span className="text-[28px] font-black text-white">{dday}</span>
        <p className="text-white/70 text-[10px]">
          {open ? "모집 중 · 일정" : "모집 일정"}
        </p>
        <p className="text-white text-[12px] font-semibold">{schedule}</p>
      </div>
      {open ? (
        <button
          onClick={onJoin}
          className="relative w-full h-9 rounded-xl bg-white text-[#0E2F80] text-[13px] font-bold active:opacity-90"
        >
          가입하기
        </button>
      ) : (
        <button
          disabled
          className="relative w-full h-9 rounded-xl bg-white/25 text-white/60 text-[13px] font-bold cursor-not-allowed"
        >
          가입하기
        </button>
      )}
    </div>
  )
}

export function MyHomeScreen() {
  const navigate = useNavigate()

  const [cardIndex, setCardIndex] = useState(0)

  const [memberCase, setMemberCase] = useState<MemberCase>("가입 완료")

  const joined = memberCase === "가입 완료"

  const joinState: JoinState =
    memberCase === "멤버십 모집 중" ? "모집 중" : "모집 전"

  const cardCount = joined ? 3 : 2

  const touchStartX = useRef(0)

  const [showDiaryModal, setShowDiaryModal] = useState(false)

  const [diaryPhoto, setDiaryPhoto] = useState(false)

  const [diaryText, setDiaryText] = useState("")

  const [diaryWatchMode, setDiaryWatchMode] =
    useState<"직관" | "집관" | "원정">("직관")

  const [diaryPlayer, setDiaryPlayer] = useState("구자욱")

  const [diaryPlayerQuery, setDiaryPlayerQuery] = useState("구자욱")

  const [diaryPlayerFocused, setDiaryPlayerFocused] = useState(false)

  const [analysisTab, setAnalysisTab] = useState<"상대팀별" | "요일별">(
    "상대팀별",
  )

  const opponentStats = [
    { team: "롯데 자이언츠", count: 4, win: "3승 1패", max: 4 },

    { team: "LG 트윈스", count: 3, win: "2승 1패", max: 4 },

    { team: "KIA 타이거즈", count: 2, win: "1승 1패", max: 4 },

    { team: "두산 베어스", count: 1, win: "1승 0패", max: 4 },

    { team: "한화 이글스", count: 1, win: "1승 0패", max: 4 },
  ]

  const stadiumStats = [
    { stadium: "대구 삼성 라이온즈 파크", count: 9, max: 9 },

    { stadium: "잠실 야구장", count: 2, max: 9 },

    { stadium: "사직 야구장", count: 1, max: 9 },
  ]

  const dayStats = [
    { day: "토요일", count: 5, win: "4승 1패", max: 5 },

    { day: "일요일", count: 4, win: "2승 2패", max: 5 },

    { day: "금요일", count: 2, win: "2승 0패", max: 5 },

    { day: "수요일", count: 1, win: "0승 1패", max: 5 },
  ]

  const closeDiaryModal = () => {
    setShowDiaryModal(false)

    setDiaryPhoto(false)

    setDiaryText("")

    setDiaryWatchMode("직관")

    setDiaryPlayer("구자욱")

    setDiaryPlayerQuery("구자욱")
  }

  return (
    <div className="min-h-full bg-[#F5F7FB] pb-8">
      {/* Player theme hero banner — GNB 포함 */}
      <div className="relative w-full h-[270px] bg-gradient-to-br from-[#1B5BF0] to-[#0E2F80] overflow-hidden mb-4">
        {/* 케이스 전환 (와이어프레임 전용) — KV 좌측 상단 */}
        <div className="absolute top-0 left-4 z-20 h-14 flex items-center gap-1.5">
          <CaseSelect
            variant="dark"
            value={"로그인 상태" as "로그인 상태" | "비로그인"}
            options={["로그인 상태", { value: "비로그인", label: "비로그인" }]}
            onChange={(v) => {
              if (v === "비로그인") navigate("/login")
            }}
          />
          <CaseSelect
            variant="dark"
            value={memberCase}
            options={["멤버십 모집 전", "멤버십 모집 중", "가입 완료"] as const}
            onChange={(v) => {
              setMemberCase(v)
              setCardIndex(0)
            }}
          />
        </div>
        {/* Floating GNB */}
        <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-end px-4 h-14 gap-1">
          <button
            onClick={() => navigate("/notifications")}
            className="w-8 h-8 flex items-center justify-center"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <button
            onClick={() => navigate("/all-menu")}
            className="w-8 h-8 flex items-center justify-center"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 6h16M4 12h16M4 18h16"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
        <div className="absolute right-0 bottom-0 w-40 h-48">
          <PH className="w-full h-full rounded-none bg-[#FFFFFF]/10" />
        </div>
        <div className="absolute left-4 top-4 opacity-10">
          <span className="text-[80px] font-black text-white leading-none">
            13
          </span>
        </div>
        <div className="absolute inset-0 flex flex-col justify-end p-4">
          <div className="flex items-end gap-4">
            <div className="relative">
              <PHCircle className="w-16 h-16 border-2 border-white" />
            </div>
            <div className="flex flex-col gap-1 pb-1">
              <div className="flex items-center gap-2">
                <p className="text-white font-bold text-[16px] leading-tight">
                  블루블러드
                </p>
                <button
                  onClick={() => navigate("/my/edit-profile")}
                  className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex gap-1.5 mt-0.5 flex-wrap">
                <span className="text-[10px] font-bold text-[#7C5C00] bg-[#F0A500] rounded-full px-2.5 py-0.5">
                  GOLD
                </span>
                <span className="text-[10px] font-bold text-white bg-[#0E2F80] border border-white/30 rounded-full px-2.5 py-0.5">
                  PREMIUM BLUE
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="px-4 mb-4">
        <div className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] py-3 flex">
          {[
            { label: "예매 내역", val: "12", path: "/my/booking-history" },

            { label: "쿠폰", val: "3", path: "/my/coupons" },

            { label: "앰블럼", val: String(EMBLEM_TOTAL), path: "/my/emblem" },
          ].map((s, i) => (
            <button
              key={s.label}
              onClick={() => navigate(s.path)}
              className={`flex-1 flex flex-col items-center gap-0.5 py-1 active:bg-[#F5F7FB] transition-colors ${
                i < 2 ? "border-r border-[#DDE1EC]" : ""
              }`}
            >
              <span className="text-sm font-bold text-[#111827]">{s.val}</span>
              <span className="text-[10px] text-[#64748B]">{s.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Membership card — carousel (9:16 세로형) */}
      <div
        className="mb-4 overflow-hidden"
        onTouchStart={(e) => {
          touchStartX.current = e.touches[0].clientX
        }}
        onTouchEnd={(e) => {
          const dx = e.changedTouches[0].clientX - touchStartX.current

          if (dx < -40) setCardIndex((i) => Math.min(i + 1, cardCount - 1))

          if (dx > 40) setCardIndex((i) => Math.max(i - 1, 0))
        }}
      >
        <div
          className="flex ml-4 transition-transform duration-300 ease-out"
          style={{ transform: `translateX(${-cardIndex * 50}%)` }}
        >
          {joined && (
            <>
              {/* 카드 1 — 라이온즈 멤버십 */}
              <div className="shrink-0 pr-3" style={{ width: "50%" }}>
                <MemberCard
                  kind="blue"
                  onClick={() => navigate("/my/membership")}
                />
              </div>

              {/* 카드 2 — 프리미엄 블루 시즌권 */}
              <div className="shrink-0 pr-3" style={{ width: "50%" }}>
                <MemberCard
                  kind="season"
                  onClick={() => navigate("/my/membership")}
                />
              </div>

              {/* 카드 3 — 어린이 멤버십 */}
              <div className="shrink-0 pr-3" style={{ width: "50%" }}>
                <MemberCard
                  kind="kids"
                  onClick={() => navigate("/my/membership")}
                />
              </div>
            </>
          )}

          {!joined && (
            <>
              {/* 카드 4 — 라이온즈 멤버십 모집 */}
              <div className="shrink-0 pr-3" style={{ width: "50%" }}>
                <JoinClosedCard
                  kind="member"
                  title="2027 라이온즈 멤버십 모집"
                  tone="blue"
                  state={joinState}
                  onJoin={() => navigate("/my/membership-guide")}
                />
              </div>

              {/* 카드 5 — 어린이 회원 모집 (모집 기간 외) */}
              <div className="shrink-0 pr-3" style={{ width: "50%" }}>
                <JoinClosedCard
                  kind="child"
                  title="2027 어린이 회원 모집"
                  tone="gold"
                  state={joinState}
                  onJoin={() => navigate("/my/child-register")}
                />
              </div>
            </>
          )}
        </div>

        {/* 도트 인디케이터 */}
        <div className="flex justify-center gap-1.5 mt-3">
          {Array.from({ length: cardCount }, (_, i) => i).map((i) => (
            <button
              key={i}
              onClick={() => setCardIndex(i)}
              className={`rounded-full transition-all ${
                i === cardIndex
                  ? "w-4 h-1.5 bg-[#1B5BF0]"
                  : "w-1.5 h-1.5 bg-[#DDE1EC]"
              }`}
            />
          ))}
        </div>
      </div>

      {/* 라이온즈 기록 */}
      <div className="px-4 mb-5">
        {/* V9 섹션 */}
        <div className="mt-5 flex items-center justify-between mb-3">
          <span className="text-[14px] font-bold text-[#111827]">
            함께 만드는 V9
          </span>
          <button
            onClick={() => navigate("/my/diary")}
            className="text-[12px] font-medium text-[#9CA3AF]"
          >
            전체보기 ›
          </button>
        </div>
        <div
          className="rounded-2xl overflow-hidden border border-[#DDE1EC] cursor-pointer active:opacity-90 transition-opacity"
          style={{
            background:
              "linear-gradient(135deg, #0A1A4E 0%, #112478 60%, #1B3FAD 100%)",
          }}
          onClick={() => navigate("/my/diary")}
        >
          {/* 텍스트 영역 */}
          <div className="px-4 pt-4 pb-3">
            <p className="text-[15px] font-black text-white leading-snug mb-0.5">
              2027 시즌, 오늘의 라이온즈를 기록하고
            </p>
            <p className="text-[13px] font-semibold text-[#C8D8FF] leading-snug">
              함께한 경기를 하나씩 쌓아보세요.
            </p>
          </div>

          {/* 바 그래프 영역 */}
          <div className="px-4 pb-3">
            {/* 경기 수 라벨 */}
            <div className="flex justify-between mb-1.5">
              <span className="text-[10px] text-[#6EC6FF]">0</span>
              <span className="text-[10px] text-[#6EC6FF]">36</span>
              <span className="text-[10px] text-[#6EC6FF]">72</span>
              <span className="text-[10px] text-[#6EC6FF]">108</span>
              <span className="text-[10px] text-[#6EC6FF]">144</span>
            </div>
            {/* 바 트랙 */}
            <div
              className="relative w-full h-5 rounded-full overflow-hidden"
              style={{ background: "rgba(255,255,255,0.1)" }}
            >
              {/* 미기록(전체 잠재) */}
              <div
                className="absolute inset-0 rounded-full"
                style={{ background: "rgba(255,255,255,0.06)" }}
              />
              {/* 집관 (직관 + 집관 누적) */}
              <div
                className="absolute left-0 top-0 bottom-0 rounded-full transition-all duration-700"
                style={{
                  width: `${((36 + 26) / 144) * 100}%`,
                  background: "linear-gradient(90deg,#4F6EF7,#6EC6FF)",
                }}
              />
              {/* 직관 */}
              <div
                className="absolute left-0 top-0 bottom-0 rounded-full"
                style={{
                  width: `${(36 / 144) * 100}%`,
                  background: "linear-gradient(90deg,#3454D1,#4F6EF7)",
                }}
              />
              {/* 현재 위치 마커 */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-white/60"
                style={{ left: `${((36 + 26) / 144) * 100}%` }}
              />
            </div>
            {/* 경기 수 요약 */}
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-2.5">
                {[
                  { label: "직관", color: "#4F6EF7", val: 36 },

                  { label: "집관", color: "#6EC6FF", val: 26 },
                ].map((b) => (
                  <div key={b.label} className="flex items-center gap-1">
                    <span
                      className="w-1.5 h-1.5 rounded-sm shrink-0"
                      style={{ background: b.color }}
                    />
                    <span className="text-[10px] text-[#C8D8FF]">
                      {b.label}{" "}
                      <span className="font-bold text-white">{b.val}</span>
                    </span>
                  </div>
                ))}
              </div>
              <span className="text-[10px] text-[#C8D8FF]">
                <span className="font-bold text-white">62경기째</span> 함께하는
                중
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Emblem preview */}
      <div className="px-4 mb-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[14px] font-bold text-[#111827]">
            내 앰블럼
          </span>
          <button
            onClick={() => navigate("/my/emblem")}
            className="text-[11px] text-[#9CA3AF]"
          >
            전체보기 ›
          </button>
        </div>
        <div className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] p-4">
          <div className="grid grid-cols-3 gap-3">
            {EMBLEMS.slice(0, 3).map((em, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5">
                <div
                  className={`relative w-full aspect-square rounded-2xl bg-gradient-to-br ${em.color} flex items-center justify-center`}
                >
                  <span className="text-2xl">{em.emoji}</span>
                  <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#111827] border-2 border-white flex items-center justify-center">
                    <span className="text-[9px] font-bold text-white">
                      {em.count}
                    </span>
                  </div>
                </div>
                <span className="text-[11px] font-medium text-[#374151] text-center leading-tight">
                  {em.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Menu list */}
      <div className="px-4 mb-6">
        <div className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] px-4">
          {[
            { label: "테마 변경", path: "/my/theme" },

            { label: "티켓 선물하기", path: "/my/ticket-gift" },

            { label: "이벤트 참여 내역", path: "/all/event-history" },

            { label: "쿠폰함", path: "/my/coupons" },

            { label: "멤버십/시즌권 안내", path: "/my/membership-guide" },

            { label: "어린이회원 등록", path: "/my/child-register" },

            { label: "설정", path: "/my/settings" },
          ].map((item, i, arr) => (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className="w-full"
            >
              <div
                className={`flex items-center py-4 ${
                  i < arr.length - 1 ? "border-b border-[#DDE1EC]" : ""
                }`}
              >
                <span className="flex-1 text-sm text-[#111827] text-left">
                  {item.label}
                </span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 18l6-6-6-6"
                    stroke="#4A5570"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Logout — plain text, centered */}
      <div className="flex justify-center pb-4">
        <button className="text-[13px] text-[#9CA3AF]">로그아웃</button>
      </div>

      {/* 기록 작성 모달 */}
      {showDiaryModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeDiaryModal}
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
                  함께 만드는 V9, 기억에 남는 장면을 자유롭게 남겨보세요.
                </p>
              </div>
              <button
                onClick={closeDiaryModal}
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

            {/* 오늘의 경기 */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-bold text-[#111827]">
                오늘의 경기
              </label>
              <div className="w-full rounded-2xl border border-[#DDE1EC] bg-[#F9FAFB] px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-white bg-[#1B5BF0] rounded-full px-2 py-0.5">
                    홈
                  </span>
                  <span className="text-[13px] font-semibold text-[#111827]">
                    삼성 vs 롯데
                  </span>
                </div>
                <span className="text-[11px] text-[#9CA3AF]">
                  9월 19일 (금)
                </span>
              </div>
            </div>

            {/* 관람 방식 */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-bold text-[#111827]">
                관람 방식
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(["직관", "집관", "원정"] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setDiaryWatchMode(mode)}
                    className={`py-2.5 rounded-xl text-[13px] font-bold transition-all flex items-center justify-center gap-1.5 ${
                      diaryWatchMode === mode
                        ? "bg-[#1B5BF0] text-white"
                        : "bg-[#F9FAFB] text-[#9CA3AF] border border-[#DDE1EC]"
                    }`}
                  >
                    <span>
                      {mode === "직관" ? "🏟️" : mode === "집관" ? "📺" : "✈️"}
                    </span>
                    <span>{mode}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 오늘의 선수 */}
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
                diaryPlayerQuery.trim() === ""
                  ? PLAYERS
                  : PLAYERS.filter((n) => {
                      const q = diaryPlayerQuery.trim()
                      if (CHOSEONG[q]) return new RegExp(CHOSEONG[q]).test(n[0])
                      return n.includes(q)
                    })

              const showSuggestions =
                diaryPlayerFocused &&
                diaryPlayerQuery.trim() !== "" &&
                filtered.length > 0 &&
                diaryPlayerQuery !== diaryPlayer

              return (
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-bold text-[#111827]">
                    오늘의 선수{" "}
                    <span className="text-[11px] font-normal text-[#9CA3AF]">
                      (선택)
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={diaryPlayerQuery}
                      onChange={(e) => {
                        setDiaryPlayerQuery(e.target.value)
                        setDiaryPlayer("")
                      }}
                      onFocus={() => setDiaryPlayerFocused(true)}
                      onBlur={() =>
                        setTimeout(() => setDiaryPlayerFocused(false), 150)
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
                              setDiaryPlayer(name)
                              setDiaryPlayerQuery(name)
                              setDiaryPlayerFocused(false)
                            }}
                            className="w-full text-left px-4 py-2.5 text-[13px] text-[#111827] hover:bg-[#F5F7FB] transition-colors border-b border-[#F1F5F9] last:border-b-0"
                          >
                            {name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )
            })()}

            {/* 사진 추가 */}
            <button
              onClick={() => setDiaryPhoto((v) => !v)}
              className={`w-full aspect-video rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-colors ${
                diaryPhoto
                  ? "border-[#1B5BF0] bg-[#1A2A5E]"
                  : "border-[#DDE1EC] bg-[#F9FAFB]"
              }`}
            >
              {diaryPhoto ? (
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

            {/* 오늘의 한마디 */}
            <textarea
              value={diaryText}
              onChange={(e) => setDiaryText(e.target.value)}
              placeholder="파란 피의 자부심, 언어에서도 빛납니다.&#10;선수들에게 상처가 되는 말 대신, 승리를 향한 긍정의 메시지를 남겨주세요!"
              className="w-full rounded-2xl border border-[#DDE1EC] bg-[#F9FAFB] px-4 py-4 text-[13px] text-[#111827] placeholder:text-[#9CA3AF] resize-none outline-none focus:border-[#1B5BF0] focus:bg-white transition-colors"
              style={{ minHeight: 140 }}
            />

            <button
              disabled={!diaryPhoto && diaryText.trim().length === 0}
              onClick={closeDiaryModal}
              className={`w-full rounded-2xl text-[16px] font-bold transition-colors ${
                diaryPhoto || diaryText.trim().length > 0
                  ? "bg-[#1B5BF0] text-white"
                  : "bg-[#F3F4F6] text-[#9CA3AF] cursor-not-allowed"
              }`}
              style={{ minHeight: 56 }}
            >
              등록하기
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
