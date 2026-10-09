import { useNavigate, useLocation } from "react-router-dom"

import { CaseSelect } from "@/components/CaseSelect"

import { useState, useEffect, useRef } from "react"

import { Header } from "@/components/Layout"

type MissionType = "사지선다" | "OX퀴즈" | "VS선택" | "예측형"

const MISSION_PHASES = [
  "참여 중",
  "정답 발표 · 정답",
  "정답 발표 · 오답",
  "정답 발표 · 미참여",
] as const

type MissionPhase = typeof MISSION_PHASES[number]

// 정답 발표 더미 (경기 종료 후)

const REVEAL: Record<MissionType, {
  q: string
  options: string[]
  answer: string
  wrong: string
  note?: string
}> = {
  사지선다: {
    q: "오늘 경기에서 홈런을 칠 선수는 누구일까요?",
    options: ["구자욱", "이재현", "디아즈", "강민호"],
    answer: "디아즈",
    wrong: "구자욱",
  },

  OX퀴즈: {
    q: "오늘 삼성 라이온즈가 7점 이상 득점할까요?",
    options: ["O", "X"],
    answer: "O",
    wrong: "X",
  },

  VS선택: {
    q: "원태인 선수는 오늘 경기 끝나고 ____ 을 먹을 것이다.",
    options: ["막창", "삼겹살"],
    answer: "삼겹살",
    wrong: "막창",
    note: "라이온즈 인스타 스토리를 통해 생생한 정답을 확인할 수 있어요!",
  },

  예측형: {
    q: "오늘 경기 최종 점수를 예측해보세요!",
    options: [],
    answer: "5 : 3",
    wrong: "3 : 1",
  },
}

function MissionReveal({
  type,
  outcome,
}: {
  type: MissionType
  outcome: "correct" | "wrong" | "none"
}) {
  const r = REVEAL[type]

  const mine =
    outcome === "correct" ? r.answer : outcome === "wrong" ? r.wrong : null

  const banner =
    outcome === "correct"
      ? {
          cls: "bg-[#ECFDF3] text-[#16A34A]",
          t: "🎉 정답이에요!",
          d: "앰블럼은 오늘 자정에 일괄 지급돼요.",
        }
      : outcome === "wrong"
        ? {
            cls: "bg-[#FEF2F2] text-[#DC2626]",
            t: "아쉽게도 오답이에요",
            d: "내일 미션에 다시 도전해 보세요.",
          }
        : {
            cls: "bg-[#F3F4F6] text-[#6B7280]",
            t: "참여하지 않은 미션이에요",
            d: "다음 미션에는 꼭 참여해 보세요.",
          }

  return (
    <>
      <div className="bg-gradient-to-r from-[#0D1117] to-[#1A2035] px-4 py-3 flex items-center justify-between">
        <span className="text-white text-[11px] font-bold tracking-widest">
          정답 발표
        </span>
        <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-bold text-[#9CA3AF]">
          경기 종료
        </span>
      </div>
      <div className="p-4">
        <p className="text-[13px] font-bold text-[#111827] mb-3">{r.q}</p>
        {type === "예측형" ? (
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="rounded-xl border border-[#16A34A] bg-[#ECFDF3] py-2.5 text-center">
              <p className="text-[10px] font-bold text-[#16A34A]">정답</p>
              <p className="text-[20px] font-black text-[#111827]">
                {r.answer}
              </p>
            </div>
            <div className="rounded-xl border border-[#DDE1EC] bg-[#F5F7FB] py-2.5 text-center">
              <p className="text-[10px] font-bold text-[#64748B]">내 예측</p>
              <p className="text-[20px] font-black text-[#111827]">
                {mine ?? "-"}
              </p>
            </div>
          </div>
        ) : (
          <div
            className={`grid ${
              r.options.length === 4 ? "grid-cols-2" : "grid-cols-2"
            } gap-2 mb-3`}
          >
            {r.options.map((o) => {
              const isAns = o === r.answer

              const isMine = o === mine

              return (
                <div
                  key={o}
                  className={`relative flex ${
                    type === "사지선다" ? "h-10" : "h-16"
                  } items-center justify-center rounded-xl border-2 font-bold ${
                    type === "OX퀴즈" ? "text-[26px] font-black" : "text-[13px]"
                  } ${
                    isAns
                      ? "border-[#16A34A] bg-[#ECFDF3] text-[#16A34A]"
                      : isMine
                        ? "border-[#DC2626] bg-[#FEF2F2] text-[#DC2626]"
                        : "border-[#DDE1EC] bg-[#F5F7FB] text-[#9CA3AF]"
                  }`}
                >
                  {o}
                  {isAns && (
                    <span className="absolute -top-2 left-2 rounded-full bg-[#16A34A] px-1.5 text-[9px] font-bold text-white">
                      정답
                    </span>
                  )}
                  {isMine && (
                    <span
                      className={`absolute -top-2 right-2 rounded-full px-1.5 text-[9px] font-bold text-white ${
                        isAns ? "bg-[#1B5BF0]" : "bg-[#DC2626]"
                      }`}
                    >
                      내 선택
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        )}
        {r.note && (
          <p className="mb-3 text-center text-[11px] text-[#64748B]">
            {r.note}
          </p>
        )}
        <div className={`rounded-xl px-4 py-3 text-center ${banner.cls}`}>
          <p className="text-[13px] font-bold">{banner.t}</p>
          <p className="mt-0.5 text-[11px] opacity-80">{banner.d}</p>
        </div>
        <p className="mt-3 text-center text-[10px] text-[#9CA3AF]">
          1,284명 참여 · 정답자 312명 (24%)
        </p>
      </div>
    </>
  )
}

// 018(020)-SL-LG-01 라운지 대시보드

export function LoungeDashboardScreen() {
  const navigate = useNavigate()

  const location = useLocation()

  const missionRef = useRef<HTMLDivElement>(null)

  const [selectedPlayer, setSelectedPlayer] = useState<string>("구자욱")

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

  const [missionType, setMissionType] = useState<MissionType>("사지선다")

  const [missionPhase, setMissionPhase] = useState<MissionPhase>("참여 중")

  const revealed = missionPhase !== "참여 중"

  const [predScore, setPredScore] = useState<[number, number]>([3, 1])

  const [menuExpanded, setMenuExpanded] = useState(false)

  const [eldoradoMatch, setEldoradoMatch] =
    useState<"경기 전" | "경기 중" | "미 운영">("경기 중")

  const [blueSignalMode, setBlueSignalMode] =
    useState<"직관용" | "원정용" | "전체용" | "종료 시">("직관용")

  useEffect(() => {
    if (location.hash === "#mission" && missionRef.current) {
      setTimeout(
        () =>
          missionRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          }),
        100,
      )
    }
  }, [location.hash])

  return (
    <div className="min-h-full bg-[#F5F7FB] pb-8">
      <Header showBack={false} showNotif showMenu bare />

      {/* ── 독점 콘텐츠 preview — 최상단 ── */}
      <div className="px-4 pt-4 mb-5">
        <button
          onClick={() => navigate("/lounge/exclusive")}
          className="w-full"
        >
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#1A1A2E] via-[#16213E] to-[#0F3460] h-36 flex flex-col items-center justify-center gap-2 px-5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-white bg-[#1B5BF0] rounded-full px-2.5 py-0.5 tracking-wide">
                EXCLUSIVE
              </span>
              <span className="text-[10px] text-[#F0A500] font-semibold bg-black/40 rounded-full px-2 py-0.5">
                ⏱ 23:47 남음
              </span>
            </div>
            <p className="text-white text-[14px] font-bold text-center leading-snug">
              구자욱 선수의 카메라 렌즈 세레머니를 확인하세요! 📸
            </p>
            <p className="text-white/50 text-[11px]">
              오늘 자정까지만 확인할 수 있어요
            </p>
          </div>
        </button>
      </div>

      {/* Menu grid */}
      <div className="px-4 mb-6">
        <div className="relative">
          <div
            className="grid grid-cols-3 gap-2 overflow-hidden transition-all duration-300"
            style={{ maxHeight: menuExpanded ? "1000px" : "168px" }}
          >
            {[
              { label: "독점 콘텐츠", path: "/lounge/exclusive", emoji: "🎬" },

              { label: "엘도라도 ZONE", path: "/lounge/eldorado", emoji: "⚡" },

              {
                label: "디지털 피켓",
                path: "/lounge/cheer-board",
                emoji: "📣",
              },

              { label: "승리 운세", path: "/lounge/fortune", emoji: "🔮" },

              {
                label: "디지털 굿즈",
                path: "/lounge/digital-goods",
                emoji: "🎁",
              },

              { label: "블루 메이트", path: "/lounge/sns", emoji: "📸" },

              {
                label: "블루 시그널",
                path: "/lounge/blue-signal",
                emoji: "📍",
              },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className="flex flex-col items-center gap-2 bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] py-4"
              >
                <span className="text-2xl">{item.emoji}</span>
                <span className="text-[10px] text-[#64748B] text-center leading-tight">
                  {item.label}
                </span>
              </button>
            ))}
          </div>
          {/* 그라데이션 + 더보기 버튼 */}
          {!menuExpanded && (
            <div
              className="absolute bottom-0 left-0 right-0 flex flex-col items-center pt-10"
              style={{
                background:
                  "linear-gradient(to bottom, transparent, #F5F7FB 70%)",
              }}
            >
              <button
                onClick={() => setMenuExpanded(true)}
                className="mb-1 flex items-center gap-1 bg-white border border-[#DDE1EC] rounded-full px-4 py-1.5 text-[12px] font-semibold text-[#1B5BF0] shadow-sm"
              >
                더보기
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6 9l6 6 6-6"
                    stroke="#1B5BF0"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── 엘도라도 ZONE preview ── */}
      <div className="px-4 mb-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[14px] font-bold text-[#111827]">
            엘도라도 ZONE
          </span>
          {/* 케이스 베리에이션용 토글 */}
          <CaseSelect
            value={eldoradoMatch}
            options={["경기 전", "경기 중", "미 운영"] as const}
            onChange={setEldoradoMatch}
          />
        </div>
        {/* 미 운영 — 클릭 비활성 */}
        {eldoradoMatch === "미 운영" ? (
          <div className="bg-gradient-to-r from-[#64748B] to-[#94A3B8] rounded-2xl p-4">
            <div className="h-[60px] flex items-center justify-center">
              <p className="text-white text-[14px] font-bold w-full text-center">
                오늘은 경기가 없습니다.
              </p>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/lounge/eldorado")}
            className="w-full"
          >
            <div className="bg-gradient-to-r from-[#1B5BF0] to-[#3B7BFF] rounded-2xl p-4">
              <div className="h-[60px] flex items-center">
                {eldoradoMatch === "경기 중" ? (
                  <div className="w-full flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                      <span className="text-[10px] text-white font-bold tracking-widest">
                        LIVE
                      </span>
                      <span className="text-[10px] text-white/70">
                        5회 초 · 1아웃
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                          <span className="text-white text-xs font-bold">
                            삼성
                          </span>
                        </div>
                        <span className="text-white text-3xl font-black">
                          3
                        </span>
                      </div>
                      <span className="text-white/50 text-sm font-bold">
                        VS
                      </span>
                      <div className="flex items-center gap-3">
                        <span className="text-white text-3xl font-black">
                          1
                        </span>
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                          <span className="text-white text-xs font-bold">
                            롯데
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* 경기 전 */

                  <p className="text-white text-[14px] font-bold w-full text-center">
                    잠시 후 경기가 시작됩니다.
                  </p>
                )}
              </div>
              <div className="mt-3 flex items-center gap-2 bg-black/20 rounded-xl px-3 py-2">
                <div className="flex -space-x-1.5">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-5 h-5 rounded-full bg-white/30 border border-white/50 flex items-center justify-center"
                    >
                      <span className="text-[7px] text-white font-bold">
                        {["L", "K", "S"][i]}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-white font-black text-[18px] leading-none tabular-nums">
                    {eldoradoMatch === "경기 중" ? "2,847" : "315"}
                  </span>
                  <span className="text-white/60 text-[11px] font-medium">
                    {eldoradoMatch === "경기 중"
                      ? "명이 지금 함께 응원 중"
                      : "명이 함께 기다리는 중"}
                  </span>
                </div>
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#4ADE80] animate-pulse shrink-0" />
              </div>
            </div>
          </button>
        )}
      </div>

      {/* ── 블루 시그널 preview ── */}
      <div className="px-4 mb-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[14px] font-bold text-[#111827]">
            블루 시그널
          </span>
          {/* 케이스 베리에이션용 토글 */}
          <CaseSelect
            value={blueSignalMode}
            options={["직관용", "원정용", "전체용", "종료 시"] as const}
            onChange={setBlueSignalMode}
          />
        </div>
        <div
          onClick={() => navigate("/lounge/blue-signal")}
          className="w-full cursor-pointer"
        >
          <div className="bg-gradient-to-br from-[#0D1117] to-[#1A2A5E] rounded-2xl p-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#1B5BF0]/30 rounded-full blur-2xl" />
            {blueSignalMode !== "종료 시" && (
              <div className="absolute top-4 right-4 flex items-center gap-1">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="#F0A500"
                    strokeWidth="2"
                  />
                  <path
                    d="M12 6v6l3 2"
                    stroke="#F0A500"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="text-[#F0A500] text-[10px] font-semibold">
                  오늘 9시까지
                </span>
              </div>
            )}
            <div className="relative flex items-center gap-4 pr-16">
              <div className="relative w-12 h-12 shrink-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-[#1B5BF0]/20 border border-[#1B5BF0]/40 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-[#1B5BF0]" />
                </div>
                {[0, 0.25, 0.5].map((d, i) => (
                  <div
                    key={i}
                    className="absolute rounded-full bg-[#1B5BF0] animate-ping"
                    style={{
                      width: `${(i + 1) * 14 + 14}px`,
                      height: `${(i + 1) * 14 + 14}px`,
                      opacity: 0.15 - i * 0.04,
                      animationDelay: `${d}s`,
                      animationDuration: "1.5s",
                    }}
                  />
                ))}
              </div>
              <div className="flex-1 text-left">
                {blueSignalMode === "직관용" && (
                  <>
                    <p className="text-white font-bold text-[13px] mb-0.5">
                      오늘 경기 직관 인증 📸
                    </p>
                    <p className="text-white/60 text-[11px] leading-snug">
                      추첨을 통해 앰블럼 및 상품을 드립니다.
                    </p>
                  </>
                )}
                {blueSignalMode === "원정용" && (
                  <>
                    <p className="text-white font-bold text-[13px] mb-0.5">
                      원정석을 채우는 사자들! 🗺
                    </p>
                    <p className="text-white/60 text-[11px] leading-snug">
                      원정 직관 인증하시면 추첨을 통해 선물 및 앰블럼을
                      드립니다.
                    </p>
                  </>
                )}
                {blueSignalMode === "전체용" && (
                  <>
                    <p className="text-white font-bold text-[13px] mb-0.5">
                      라이온즈를 응원해주세요 🦁
                    </p>
                    <p className="text-white/60 text-[11px] leading-snug">
                      모든 라이온즈 팬들 모여라!
                    </p>
                  </>
                )}
                {blueSignalMode === "종료 시" && (
                  <>
                    <p className="text-white font-bold text-[13px] mb-0.5">
                      블루 시그널이 종료되었습니다.
                    </p>
                    <p className="text-white/60 text-[11px] leading-snug">
                      블루 시그널에 참여해 주신 팬 여러분께 감사드립니다.
                      <br />
                      당첨자 발표는 잠시 후 안내해 드리겠습니다.
                    </p>
                  </>
                )}
              </div>
            </div>
            {blueSignalMode !== "종료 시" && (
              <div className="mt-3 relative z-10">
                <div className="w-full h-9 rounded-xl bg-[#1B5BF0] text-white text-[12px] font-bold flex items-center justify-center">
                  {blueSignalMode === "직관용" && "직관 인증하기"}
                  {blueSignalMode === "원정용" && "원정 경기 인증하기"}
                  {blueSignalMode === "전체용" && "라이온즈 응원하기"}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── 승리 운세 preview ── */}
      <div className="px-4 mb-5">
        <button
          onClick={() => navigate("/lounge/fortune")}
          className="w-full text-left"
        >
          <div
            className="relative overflow-hidden rounded-2xl border border-[#1B5BF0]/20"
            style={{
              background:
                "linear-gradient(135deg,#070e22 0%,#1B3A80 60%,#0E1A40 100%)",
            }}
          >
            {/* 배경 장식 */}
            <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-[#1B5BF0]/10 blur-2xl pointer-events-none" />
            <div className="absolute right-4 bottom-0 text-[90px] leading-none select-none pointer-events-none opacity-10">
              🦁
            </div>
            {/* 별 */}
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute text-[#F0A500] select-none pointer-events-none animate-pulse"
                style={{
                  top: `${12 + i * 16}%`,
                  left: `${60 + i * 7}%`,
                  fontSize: `${6 + (i % 2) * 4}px`,
                  opacity: 0.4,
                  animationDelay: `${i * 0.4}s`,
                }}
              >
                ★
              </div>
            ))}

            <div className="relative px-5 py-5">
              {/* 라벨 */}
              <div className="flex items-center justify-center mb-3">
                <span className="text-[#F0A500] text-[10px] font-bold tracking-widest">
                  MY LUCKY PLAYER
                </span>
              </div>

              {/* 메인 카피 */}
              <p className="text-white text-[18px] font-black leading-snug mb-1 text-center">
                오늘 나의 운은
                <br />
                어떤 선수에게 힘이 될까요?
              </p>
              <p className="text-white/50 text-[11px] leading-relaxed mb-4 text-center">
                블루블러드 님이 응원하면 분명히 힘이 될거예요!
              </p>
            </div>
          </div>
        </button>
      </div>

      {/* ── 디지털 굿즈 preview ── */}
      <div className="px-4 mb-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[14px] font-bold text-[#111827]">
            디지털 굿즈
          </span>
          <button
            onClick={() => navigate("/lounge/digital-goods")}
            className="text-[11px] text-[#9CA3AF]"
          >
            전체보기 ›
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-1">
          {[
            {
              label: "배경화면 Vol.3",
              tag: "배경화면",
              color: "from-[#1B5BF0] to-[#6EC6FF]",
            },

            {
              label: "라이온즈 캐릭터",
              tag: "캐릭터",
              color: "from-[#F0A500] to-[#FFD966]",
            },

            {
              label: "직관 스티커팩",
              tag: "스티커",
              color: "from-[#E53935] to-[#FF8A65]",
            },

            {
              label: "시즌 테마팩",
              tag: "테마",
              color: "from-[#4ADE80] to-[#A7F3D0]",
            },
          ].map((g) => (
            <button
              key={g.label}
              onClick={() => navigate("/lounge/digital-goods")}
              className="shrink-0 w-32 bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] overflow-hidden"
            >
              <div
                className={`w-full h-24 bg-gradient-to-br ${g.color} flex items-center justify-center`}
              >
                <span className="text-white text-3xl">🎁</span>
              </div>
              <div className="p-2.5">
                <p className="text-[11px] font-semibold text-[#111827] text-left mb-1 leading-snug">
                  {g.label}
                </p>
                <div className="flex items-center">
                  <span className="text-[9px] text-[#64748B]">{g.tag}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── 오늘의 미션 preview ── */}
      <div ref={missionRef} id="mission" className="px-4 mb-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[14px] font-bold text-[#111827]">
            오늘의 미션
          </span>
          <div className="flex items-center gap-1.5">
            <CaseSelect
              value={missionPhase}
              options={MISSION_PHASES}
              onChange={setMissionPhase}
            />
            <CaseSelect
              value={missionType}
              options={["사지선다", "OX퀴즈", "VS선택", "예측형"] as const}
              onChange={(t) => {
                setMissionType(t)
                setIsSubmitted(false)
                setSelectedPlayer("")
              }}
            />
          </div>
        </div>
        <div className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] overflow-hidden">
          {revealed ? (
            <MissionReveal
              type={missionType}
              outcome={
                missionPhase === "정답 발표 · 정답"
                  ? "correct"
                  : missionPhase === "정답 발표 · 오답"
                    ? "wrong"
                    : "none"
              }
            />
          ) : (
            <>
              <div className="bg-gradient-to-r from-[#0D1117] to-[#1A2035] px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#E53935] animate-pulse" />
                  <span className="text-white text-[11px] font-bold tracking-widest">
                    LIVE
                  </span>
                </div>
                <div className="flex items-center gap-1 bg-white/10 rounded-full px-2.5 py-0.5">
                  <span className="text-[#F0A500] text-[11px] font-bold">
                    ⏱ 35:00 남음
                  </span>
                </div>
              </div>
              <div className="p-4">
                {/* 사지선다 */}
                {missionType === "사지선다" && (
                  <>
                    <p className="text-[13px] font-bold text-[#111827] mb-3">
                      오늘 경기에서 홈런을 칠 선수는 누구일까요?
                    </p>
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      {["구자욱", "이재현", "디아즈", "강민호"].map((a) => (
                        <button
                          key={a}
                          type="button"
                          disabled={isSubmitted}
                          onClick={() => setSelectedPlayer(a)}
                          className={`h-10 rounded-xl border text-[12px] font-semibold flex items-center justify-center transition-all ${
                            selectedPlayer === a
                              ? "bg-[#1B5BF0] border-[#1B5BF0] text-white"
                              : "bg-[#F5F7FB] border-[#DDE1EC] text-[#111827]"
                          } ${
                            isSubmitted
                              ? "cursor-default opacity-90"
                              : "cursor-pointer"
                          }`}
                        >
                          {a}
                        </button>
                      ))}
                    </div>
                  </>
                )}

                {/* OX퀴즈 */}
                {missionType === "OX퀴즈" && (
                  <>
                    <p className="text-[13px] font-bold text-[#111827] mb-3">
                      오늘 삼성 라이온즈가 7점 이상 득점할까요?
                    </p>
                    <div className="grid grid-cols-2 gap-3 mb-2">
                      {[
                        { label: "O", color: "bg-[#1B5BF0]" },
                        { label: "X", color: "bg-[#E53935]" },
                      ].map(({ label, color }) => (
                        <button
                          key={label}
                          type="button"
                          disabled={isSubmitted}
                          onClick={() => setSelectedPlayer(label)}
                          className={`h-16 rounded-2xl border-2 text-[28px] font-black flex items-center justify-center transition-all ${
                            selectedPlayer === label
                              ? `${color} border-transparent text-white`
                              : "bg-[#F5F7FB] border-[#DDE1EC] text-[#111827]"
                          } ${
                            isSubmitted
                              ? "cursor-default opacity-90"
                              : "cursor-pointer"
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </>
                )}

                {/* VS선택 */}
                {missionType === "VS선택" && (
                  <>
                    <p className="text-[13px] font-bold text-[#111827] mb-3">
                      원태인 선수는 오늘 경기 끝나고{" "}
                      <span className="border-b-2 border-dashed border-[#1B5BF0] text-[#1B5BF0]">
                        {selectedPlayer || "________"}
                      </span>{" "}
                      을 먹을 것이다.
                    </p>
                    <div className="grid grid-cols-2 gap-3 mb-2">
                      {["막창", "삼겹살"].map((item) => (
                        <button
                          key={item}
                          type="button"
                          disabled={isSubmitted}
                          onClick={() => setSelectedPlayer(item)}
                          className={`h-16 rounded-2xl border-2 flex items-center justify-center transition-all ${
                            selectedPlayer === item
                              ? "bg-[#1B5BF0] border-[#1B5BF0] text-white"
                              : "bg-[#F5F7FB] border-[#DDE1EC] text-[#111827]"
                          } ${
                            isSubmitted
                              ? "cursor-default opacity-90"
                              : "cursor-pointer"
                          }`}
                        >
                          <span className="text-[14px] font-black">{item}</span>
                        </button>
                      ))}
                    </div>
                  </>
                )}

                {/* 예측형 */}
                {missionType === "예측형" && (
                  <>
                    <p className="text-[13px] font-bold text-[#111827] mb-4">
                      오늘 경기 최종 점수를 예측해보세요!
                    </p>
                    <div className="flex items-center justify-center gap-4 mb-3">
                      {/* 삼성 점수 */}
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-[11px] font-bold text-[#1B5BF0]">
                          삼성
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            disabled={isSubmitted || predScore[0] === 0}
                            onClick={() =>
                              setPredScore([
                                Math.max(0, predScore[0] - 1),
                                predScore[1],
                              ])
                            }
                            className="w-9 h-9 rounded-xl bg-[#F5F7FB] border border-[#DDE1EC] text-[18px] font-bold text-[#111827] flex items-center justify-center disabled:opacity-30 active:bg-slate-200"
                          >
                            −
                          </button>
                          <span className="w-10 text-center text-[24px] font-black text-[#111827]">
                            {predScore[0]}
                          </span>
                          <button
                            type="button"
                            disabled={isSubmitted || predScore[0] === 19}
                            onClick={() =>
                              setPredScore([
                                Math.min(19, predScore[0] + 1),
                                predScore[1],
                              ])
                            }
                            className="w-9 h-9 rounded-xl bg-[#1B5BF0] text-white text-[18px] font-bold flex items-center justify-center disabled:opacity-30 active:bg-[#154EC8]"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <span className="text-[24px] font-black text-[#9CA3AF] mt-4">
                        :
                      </span>
                      {/* 상대팀 점수 */}
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-[11px] font-bold text-[#9CA3AF]">
                          상대팀
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            disabled={isSubmitted || predScore[1] === 0}
                            onClick={() =>
                              setPredScore([
                                predScore[0],
                                Math.max(0, predScore[1] - 1),
                              ])
                            }
                            className="w-9 h-9 rounded-xl bg-[#F5F7FB] border border-[#DDE1EC] text-[18px] font-bold text-[#111827] flex items-center justify-center disabled:opacity-30 active:bg-slate-200"
                          >
                            −
                          </button>
                          <span className="w-10 text-center text-[24px] font-black text-[#111827]">
                            {predScore[1]}
                          </span>
                          <button
                            type="button"
                            disabled={isSubmitted || predScore[1] === 19}
                            onClick={() =>
                              setPredScore([
                                predScore[0],
                                Math.min(19, predScore[1] + 1),
                              ])
                            }
                            className="w-9 h-9 rounded-xl bg-[#E53935] text-white text-[18px] font-bold flex items-center justify-center disabled:opacity-30 active:bg-[#C62828]"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <p className="text-[10px] text-[#9CA3AF] text-center mb-3">
                  1,284명 참여 중
                </p>
                <button
                  type="button"
                  disabled={
                    isSubmitted || (missionType !== "예측형" && !selectedPlayer)
                  }
                  onClick={() => setIsSubmitted(true)}
                  className={`w-full h-10 rounded-xl text-[13px] font-bold transition-colors ${
                    isSubmitted
                      ? "bg-gray-200 text-[#94A3B8] cursor-not-allowed"
                      : "bg-[#1B5BF0] text-white cursor-pointer"
                  }`}
                >
                  {isSubmitted ? "참여 완료" : "참여하기"}
                </button>
                <div className="flex flex-col items-center gap-0.5 mt-2">
                  {missionType === "VS선택" && (
                    <p className="text-[11px] text-[#9CA3AF] text-center">
                      정답은 경기 종료 후 라이온즈 인스타 스토리를 통해 확인하실
                      수 있습니다.
                    </p>
                  )}
                  <p className="text-[11px] text-[#9CA3AF] text-center">
                    정답을 맞힌 회원에게는 앰블럼이 제공되며, 매일 자정에 일괄
                    지급됩니다.
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* ── 블루메이트 1기 preview ── */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[14px] font-bold text-[#111827]">
            블루메이트 1기
          </span>
          <button
            onClick={() => navigate("/lounge/sns")}
            className="text-[11px] text-[#9CA3AF]"
          >
            전체보기 ›
          </button>
        </div>
        <div className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] p-3">
          <div className="grid grid-cols-3 gap-1.5">
            {[
              "from-[#1B5BF0] to-[#6EC6FF]",
              "from-[#F0A500] to-[#FFD966]",
              "from-[#E53935] to-[#FF8A65]",
              "from-[#4ADE80] to-[#A7F3D0]",
              "from-[#0E1A40] to-[#1B5BF0]",
              "from-[#9333EA] to-[#C084FC]",
            ].map((c, i) => (
              <div
                key={i}
                className={`aspect-square rounded-xl bg-gradient-to-br ${c} flex items-center justify-center`}
              >
                <span className="text-xl">📸</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}
