import { useNavigate } from "react-router-dom"

import { GameStateNotice } from "@/components/GameCaseBar"

import { CaseSelect } from "@/components/CaseSelect"

import { useEffect, useState } from "react"

import { isSeasonEndPhase, useCaseState } from "@/data/caseStore"

import { PH, PHCircle, PHSection } from "@/components/Placeholder"

import { Header } from "@/components/Layout"

import { AWAY_STADIUMS } from "@/data/game"

// 006-SL-GM-01 게임(GAME) 대시보드

export function GameDashboardScreen() {
  const navigate = useNavigate()

  const { phase } = useCaseState()

  const [matchType, setMatchType] = useState<"home" | "away" | "none" | "end">(
    isSeasonEndPhase(phase) ? "end" : "home",
  )

  // 전역 시즌 단계가 시즌 종료(탈락·우승·비시즌)이면 시즌 종료 케이스, 아니면 홈 경기로 복귀

  useEffect(() => {
    setMatchType((m) =>
      isSeasonEndPhase(phase) ? "end" : m === "end" ? "home" : m,
    )
  }, [phase])

  const seasonEnd = matchType === "end"

  const noMatch = matchType === "none" || seasonEnd

  const [isStandingsExpanded, setIsStandingsExpanded] = useState(false)

  const [awaySelected, setAwaySelected] = useState(0)

  const standingsData = [
    { rank: 1, name: "KT", w: 76, l: 46, pct: ".623", mine: false },

    { rank: 2, name: "삼성", w: 75, l: 50, pct: ".600", mine: true },

    { rank: 3, name: "LG", w: 72, l: 55, pct: ".567", mine: false },

    { rank: 4, name: "KIA", w: 68, l: 57, pct: ".544", mine: false },

    { rank: 5, name: "두산", w: 65, l: 60, pct: ".520", mine: false },

    { rank: 6, name: "NC", w: 59, l: 63, pct: ".484", mine: false },

    { rank: 7, name: "SSG", w: 56, l: 69, pct: ".448", mine: false },

    { rank: 8, name: "한화", w: 54, l: 69, pct: ".439", mine: false },

    { rank: 9, name: "롯데", w: 53, l: 71, pct: ".427", mine: false },

    { rank: 10, name: "키움", w: 45, l: 83, pct: ".352", mine: false },
  ]

  const currentAwayStadium = AWAY_STADIUMS[awaySelected]

  return (
    <div className="min-h-full bg-[#F5F7FB] pb-4">
      <Header showBack={false} showNotif showMenu bare />
      <GameStateNotice context="game" />

      {/* Match summary header & Chips */}
      <div className="px-4 pt-3 pb-1">
        <div className="flex items-center justify-between mb-2">
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-2">
              {seasonEnd ? (
                <span className="text-[22px] font-black text-[#111827] leading-none">
                  2026 시즌
                </span>
              ) : (
                <span className="text-[22px] font-black text-[#111827] leading-none">
                  9.18
                  <span className="text-[14px] font-semibold text-[#64748B] ml-1">
                    {noMatch ? "(수)" : "(수) 18:30"}
                  </span>
                </span>
              )}
            </div>
          </div>
          {/* 홈 / 원정 / 미경기 칩 — 케이스 베리에이션용 토글 */}
          <CaseSelect
            value={matchType}
            options={
              [
                { value: "home", label: "홈 경기" },
                { value: "away", label: "원정 경기" },
                { value: "none", label: "미경기" },
                { value: "end", label: "시즌 종료" },
              ] as const
            }
            onChange={setMatchType}
          />
        </div>

        {/* 시즌 종료: 올해 결과 카드 (수치는 예시) */}
        {seasonEnd && (
          <div className="rounded-2xl bg-gradient-to-br from-[#0E1A40] to-[#1B3A80] p-5 text-white">
            <span className="rounded-full bg-white/15 px-2.5 py-0.5 text-[10px] font-bold">
              2026 시즌 종료
            </span>
            <p className="mt-3 text-[15px] font-black">2026 시즌 최종 결과</p>
            <p className="mt-0.5 text-[11px] text-white/60">
              {phase === "우승 확정"
                ? "정규시즌 2위 · 한국시리즈 우승 · V9 달성 🏆 (예시)"
                : phase === "가을야구 탈락"
                  ? "정규시즌 2위 · 준플레이오프 탈락 (예시)"
                  : "정규시즌 2위 (예시)"}
            </p>
            <div className="mt-4 grid grid-cols-4 gap-2 text-center">
              {[
                { label: "승", value: "82" },

                { label: "무", value: "3" },

                { label: "패", value: "59" },

                { label: "승률", value: ".582" },
              ].map((r) => (
                <div key={r.label} className="rounded-xl bg-white/10 py-2.5">
                  <p className="text-[10px] text-white/60">{r.label}</p>
                  <p className="text-[16px] font-black text-[#F0A500]">
                    {r.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {!noMatch && /* Match summary card */

        (
          <div className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                    matchType === "home"
                      ? "bg-[#1B5BF0] text-white"
                      : "bg-[#FF5C35] text-white"
                  }`}
                >
                  {matchType === "home" ? "홈" : "원정"}
                </span>
                <span className="text-xs font-semibold text-[#111827]">
                  {matchType === "home"
                    ? "대구 삼성라이온즈파크"
                    : `${currentAwayStadium.name} (${currentAwayStadium.city})`}
                </span>
              </div>
              <span className="text-[11px] text-[#64748B] font-medium">
                18:30
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex flex-col items-center gap-1">
                <PHCircle className="w-12 h-12" />
                <span className="text-xs font-bold text-[#111827]">삼성</span>
                <span className="text-[#111827] text-xl font-bold">
                  {matchType === "home" ? "3" : "2"}
                </span>
              </div>
              <span className="text-[#64748B] font-bold">VS</span>
              <div className="flex flex-col items-center gap-1">
                <PHCircle className="w-12 h-12" />
                <span className="text-xs font-bold text-[#111827]">
                  {matchType === "home"
                    ? "롯데"
                    : currentAwayStadium.team.split(" ")[0]}
                </span>
                <span className="text-[#111827] text-xl font-bold">
                  {matchType === "home" ? "1" : "4"}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 미경기: 달력 + 경기 일정 */}
      {noMatch &&
        (() => {
          const days = ["일", "월", "화", "수", "목", "금", "토"]

          const scheduleList = [
            {
              day: 13,
              dow: "토",
              home: true,
              opp: "LG",
              time: "18:00",
              result: "승 5:3",
              done: true,
            },

            {
              day: 14,
              dow: "일",
              home: true,
              opp: "롯데",
              time: "14:00",
              result: "패 2:4",
              done: true,
            },

            {
              day: 16,
              dow: "화",
              home: false,
              opp: "KIA",
              time: "18:30",
              result: null,
              done: false,
            },

            {
              day: 17,
              dow: "수",
              home: false,
              opp: "KIA",
              time: "18:30",
              result: null,
              done: false,
            },

            {
              day: 19,
              dow: "금",
              home: true,
              opp: "NC",
              time: "18:30",
              result: null,
              done: false,
            },

            {
              day: 20,
              dow: "토",
              home: true,
              opp: "NC",
              time: "14:00",
              result: null,
              done: false,
            },

            {
              day: 21,
              dow: "일",
              home: true,
              opp: "NC",
              time: "14:00",
              result: null,
              done: false,
            },
          ]

          const gameDays = [
            2, 3, 4, 9, 10, 11, 13, 14, 16, 17, 19, 20, 21, 23, 24, 25,
          ]

          return (
            <div className="pt-2 mb-6">
              {/* Month nav */}
              <div className="flex items-center justify-between px-4 py-2">
                <button className="w-8 h-8 flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M15 19l-7-7 7-7"
                      stroke="#111827"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
                <span className="text-[#111827] font-bold">
                  {seasonEnd ? "2026년 10월" : "2026년 9월"}
                </span>
                <button className="w-8 h-8 flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M9 18l6-6-6-6"
                      stroke="#111827"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
              {/* Day labels */}
              <div className="grid grid-cols-7 px-4 mb-1">
                {days.map((d, i) => (
                  <div
                    key={d}
                    className={`text-center text-[11px] font-medium py-1 ${
                      i === 0
                        ? "text-[#E53935]"
                        : i === 6
                          ? "text-[#1B5BF0]"
                          : "text-[#9CA3AF]"
                    }`}
                  >
                    {d}
                  </div>
                ))}
              </div>
              {/* Calendar grid */}
              <div className="px-4 mb-3">
                {Array.from({ length: 5 }).map((_, row) => (
                  <div key={row} className="grid grid-cols-7 gap-y-1 mb-0.5">
                    {Array.from({ length: 7 }).map((_, col) => {
                      const day = row * 7 + col - (seasonEnd ? 3 : 5)

                      const monthDays = seasonEnd ? 31 : 30

                      const hasGame = !seasonEnd && gameDays.includes(day)

                      const isToday = day === 18

                      return (
                        <div
                          key={col}
                          className="flex flex-col items-center gap-0.5 py-1"
                        >
                          <div
                            className={`w-7 h-7 rounded-full flex items-center justify-center ${
                              isToday ? "bg-[#1B5BF0]" : ""
                            }`}
                          >
                            <span
                              className={`text-xs ${
                                day < 1 || day > monthDays
                                  ? "text-transparent"
                                  : isToday
                                    ? "text-white font-bold"
                                    : col === 0
                                      ? "text-[#E53935]"
                                      : col === 6
                                        ? "text-[#1B5BF0]"
                                        : "text-[#64748B]"
                              }`}
                            >
                              {day > 0 && day <= monthDays ? day : ""}
                            </span>
                          </div>
                          {hasGame && day > 0 && day <= monthDays && (
                            <div className="w-1.5 h-1.5 rounded-full bg-[#1B5BF0]" />
                          )}
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
              {/* Legend */}
              {!seasonEnd && (
                <div className="flex gap-4 px-4 mb-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-[#1B5BF0]" />
                    <span className="text-xs text-[#64748B]">홈 경기</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-[#4A5570]" />
                    <span className="text-xs text-[#64748B]">원정 경기</span>
                  </div>
                </div>
              )}
              {seasonEnd && (
                <p className="px-4 pt-2 text-center text-[12px] text-[#9CA3AF]">
                  예정된 경기가 없어요
                </p>
              )}
              {/* Schedule list */}
              {!seasonEnd && (
                <div className="px-4 flex flex-col gap-2 mt-4">
                  {scheduleList.map((g, i) => {
                    const isToday = g.day === 18

                    return (
                      <div
                        key={i}
                        className={`flex items-center gap-3 rounded-2xl border p-3 ${
                          isToday
                            ? "bg-[#EBF0FF] border-[#1B5BF0]/40"
                            : g.home
                              ? "bg-[#FFFFFF] border-[#DDE1EC]"
                              : "bg-[#F8F9FC] border-[#DDE1EC]"
                        }`}
                      >
                        <div className="flex flex-col items-center w-10 shrink-0">
                          <span
                            className={`text-[10px] font-medium ${
                              g.dow === "일"
                                ? "text-[#E53935]"
                                : g.dow === "토"
                                  ? "text-[#1B5BF0]"
                                  : "text-[#9CA3AF]"
                            }`}
                          >
                            {g.dow}
                          </span>
                          <span
                            className={`font-bold text-lg leading-tight ${
                              isToday ? "text-[#1B5BF0]" : "text-[#111827]"
                            }`}
                          >
                            {g.day}
                          </span>
                          {isToday && (
                            <span className="text-[9px] text-[#1B5BF0] font-bold">
                              TODAY
                            </span>
                          )}
                        </div>
                        <div className="w-px h-10 bg-[#DDE1EC]" />
                        <div className="flex flex-col gap-1 w-14 shrink-0">
                          <span
                            className={`text-[10px] font-semibold rounded px-1.5 py-0.5 text-center w-fit ${
                              g.home
                                ? "bg-[#1B5BF0]/10 text-[#1B5BF0]"
                                : "bg-[#64748B]/10 text-[#64748B]"
                            }`}
                          >
                            {g.home ? "홈" : "원정"}
                          </span>
                          <span className="text-[11px] text-[#9CA3AF]">
                            {g.time}
                          </span>
                        </div>
                        <div className="flex-1 flex items-center gap-2">
                          <PHCircle className="w-7 h-7 shrink-0" />
                          <span className="text-[#9CA3AF] text-xs">vs</span>
                          <PHCircle className="w-7 h-7 shrink-0" />
                          <span className="text-[13px] font-semibold text-[#111827]">
                            {g.opp}
                          </span>
                        </div>
                        <div className="shrink-0 text-right">
                          {g.done && g.result ? (
                            <span
                              className={`text-[12px] font-bold ${
                                g.result.startsWith("승")
                                  ? "text-[#1B5BF0]"
                                  : "text-[#E53935]"
                              }`}
                            >
                              {g.result}
                            </span>
                          ) : (
                            <span className="text-[11px] text-[#9CA3AF]">
                              {g.home ? "라이온즈파크" : "원정"}
                            </span>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })()}

      {/* 경기 프리뷰 */}
      {!noMatch && (
        <div className="px-4 pt-3 pb-1">
          <button
            onClick={() => navigate("/all/preview-detail")}
            className="w-full text-left"
          >
            <div className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] flex items-center gap-3 p-3">
              <PH className="shrink-0 w-16 h-16 rounded-xl" />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] text-[#1B5BF0] font-semibold">
                  오늘의 프리뷰
                </span>
                <p className="text-[13px] font-bold text-[#111827] leading-snug line-clamp-2 mt-0.5">
                  삼성 마지막 잠실 나들이, 페덱이 승리 피날레 이끌까
                </p>
                <span className="text-[11px] text-[#9CA3AF]">2026.09.16</span>
              </div>
              <svg
                className="shrink-0"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M9 18l6-6-6-6"
                  stroke="#9CA3AF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </button>
        </div>
      )}

      {/* Lineup preview */}
      {!noMatch && (
        <div className="mb-4 pt-3">
          <div className="flex items-center justify-between mb-2 px-4">
            <span className="text-sm font-bold text-[#111827]">
              오늘의 라인업
            </span>
            <button
              onClick={() => navigate("/game/lineup")}
              className="text-xs text-[#9CA3AF]"
            >
              전체보기 ›
            </button>
          </div>
          <div
            className="flex gap-2 overflow-x-auto pb-2 px-4"
            style={{ scrollbarWidth: "none" }}
          >
            {(() => {
              const starter =
                matchType === "home"
                  ? { name: "원태인", era: "2.87" }
                  : { name: "스트레일리", era: "3.44" }

              return (
                <button
                  onClick={() => navigate("/all/player-detail")}
                  className="shrink-0 flex flex-col items-center gap-2 bg-[#1B5BF0] rounded-2xl px-4 py-3.5 w-[82px] relative overflow-hidden"
                >
                  <div className="absolute inset-0 opacity-10 text-[60px] leading-none flex items-end justify-center pointer-events-none select-none">
                    ⚾
                  </div>
                  <span className="text-white/70 text-[11px] font-bold relative">
                    선발
                  </span>
                  <PHCircle className="w-12 h-12 opacity-80" />
                  <span className="text-[12px] font-semibold text-white text-center leading-tight relative">
                    {starter.name}
                  </span>
                  <span className="text-[11px] text-white/60 relative">
                    ERA {starter.era}
                  </span>
                </button>
              )
            })()}
            {[
              { order: "1번", name: "구자욱", pos: "LF" },

              { order: "2번", name: "이재현", pos: "2B" },

              { order: "3번", name: "디아즈", pos: "1B" },

              { order: "4번", name: "강민호", pos: "C" },

              { order: "5번", name: "김헌곤", pos: "RF" },

              { order: "6번", name: "이성규", pos: "CF" },

              { order: "7번", name: "김지찬", pos: "SS" },

              { order: "8번", name: "박계범", pos: "3B" },

              { order: "9번", name: "원태인", pos: "P" },
            ].map((p, i) => (
              <button
                key={i}
                onClick={() => navigate("/all/player-detail")}
                className="shrink-0 flex flex-col items-center gap-2 bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] px-4 py-3.5 w-[82px]"
              >
                <span className="text-[#1B5BF0] text-[11px] font-bold">
                  {p.order}
                </span>
                <PHCircle className="w-12 h-12" />
                <span className="text-[12px] font-semibold text-[#111827] text-center leading-tight">
                  {p.name}
                </span>
                <span className="text-[11px] text-[#9CA3AF]">{p.pos}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Cheerleader preview */}
      {!noMatch && (
        <div className="px-4 mb-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-[#111827]">
              오늘의 응원단
            </span>
            <button
              onClick={() => navigate("/all/cheer-squad")}
              className="text-xs text-[#9CA3AF]"
            >
              전체보기 ›
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-1">
            {[
              { name: "박성웅", role: "응원단장", emoji: "🎤" },

              { name: "한소희", role: "치어리더", emoji: "💙" },

              { name: "정유나", role: "치어리더", emoji: "💙" },

              { name: "김다현", role: "치어리더", emoji: "💙" },
            ].map((person) => (
              <div
                key={person.name}
                className="shrink-0 flex flex-col items-center gap-1.5"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-b from-[#EBF0FF] to-[#D6E0FA] flex items-center justify-center text-2xl">
                  {person.emoji}
                </div>
                <p className="text-[12px] font-semibold text-[#111827]">
                  {person.name}
                </p>
                <p className="text-[10px] text-[#9CA3AF]">{person.role}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 홈 경기 전용: 라팍 정보 & 라이온즈 VR */}
      {matchType === "home" && (
        <>
          {/* 라팍 정보 */}
          <div className="px-4 mb-6">
            <div className="rounded-2xl overflow-hidden border border-[#DDE1EC] bg-gradient-to-br from-[#0E1A40] to-[#1B3A80]">
              <div className="px-4 pt-4 pb-3">
                <p className="text-white font-black text-base leading-tight mb-0.5">
                  대구삼성라이온즈파크
                </p>
                <p className="text-white/50 text-[11px]">
                  DAEGU SAMSUNG LIONS PARK
                </p>
              </div>
              <div className="grid grid-cols-5 border-t border-white/10">
                {[
                  { icon: "🍔", label: "식음매장" },

                  { icon: "🅿️", label: "교통/주차" },

                  { icon: "♿", label: "편의시설" },

                  { icon: "💺", label: "좌석 배치" },

                  { icon: "📋", label: "이용 안내" },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => navigate("/game/stadium")}
                    className="flex flex-col items-center gap-1.5 py-3.5 border-r border-white/10 last:border-r-0 active:bg-white/5"
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-[10px] text-white/70 font-medium leading-tight text-center">
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 라이온즈 VR */}
          <div className="px-4 mb-6">
            <button onClick={() => navigate("/game/vr")} className="w-full">
              <div className="w-full h-16 rounded-2xl bg-gradient-to-r from-[#0A0A1A] to-[#1B1B3A] flex items-center justify-between px-5 overflow-hidden relative">
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 70% 50%, #6EC6FF 0%, transparent 60%)",
                  }}
                />
                <div className="flex items-center gap-3 z-10">
                  <span className="text-2xl opacity-80">🥽</span>
                  <div className="flex flex-col gap-0.5 text-left">
                    <span className="text-[9px] font-bold text-[#6EC6FF] tracking-widest uppercase">
                      Virtual Reality
                    </span>
                    <p className="text-white font-black text-sm leading-tight">
                      라이온즈 VR
                    </p>
                  </div>
                </div>
                <span className="text-white/50 text-[11px] z-10">
                  360° 몰입형 VR 체험 →
                </span>
              </div>
            </button>
          </div>
        </>
      )}

      {/* 원정 경기 전용: 오늘의 원정 구장 */}
      {matchType === "away" && (
        <div className="px-4 mb-6">
          <PHSection
            label="오늘의 원정 구장"
            right="전체보기 ›"
            onMore={() =>
              navigate("/game/away", {
                state: { tab: 0, stadiumIndex: awaySelected },
              })
            }
          />
          <div className="rounded-2xl overflow-hidden border border-[#DDE1EC] bg-[#FFFFFF]">
            {/* Stadium Header */}
            <div className="p-4 bg-gradient-to-br from-[#0E1A40] to-[#1B3A80] text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#6EC6FF] font-bold uppercase tracking-wider block mb-0.5">
                  AWAY STADIUM
                </span>
                <p className="font-black text-base leading-tight">
                  {currentAwayStadium.name}
                </p>
                <p className="text-white/60 text-[11px] mt-0.5">
                  {currentAwayStadium.city} · {currentAwayStadium.team}
                </p>
              </div>
              <span className="text-4xl opacity-80">🏟️</span>
            </div>

            {/* 4 Menu buttons: 구장 소개 / 대중교통 / 주차 / 편의시설 */}
            <div className="grid grid-cols-4 bg-[#F8F9FC]">
              {[
                { icon: "🏟", label: "구장 소개", tabIdx: 0 },

                { icon: "🚌", label: "대중교통", tabIdx: 1 },

                { icon: "🅿️", label: "주차", tabIdx: 2 },

                { icon: "♿", label: "편의시설", tabIdx: 3 },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() =>
                    navigate("/game/away", {
                      state: { tab: item.tabIdx, stadiumIndex: awaySelected },
                    })
                  }
                  className="flex flex-col items-center gap-1 py-3 border-r border-[#DDE1EC] last:border-r-0 hover:bg-[#EBF0FF] text-[#64748B] hover:text-[#1B5BF0] transition-colors"
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-[10px] font-medium leading-tight text-center">
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 경기 일정 (홈/원정 탭에서만) */}
      {!noMatch && (
        <div className="px-4 mb-6">
          <PHSection
            label="경기 일정"
            right="전체보기 ›"
            onMore={() => navigate("/game/schedule")}
          />
          <div className="flex flex-col gap-2">
            {[
              {
                day: 16,
                dow: "화",
                home: false,
                opp: "KIA",
                time: "18:30",
                done: false,
              },

              {
                day: 17,
                dow: "수",
                home: false,
                opp: "KIA",
                time: "18:30",
                done: false,
              },

              {
                day: 19,
                dow: "금",
                home: true,
                opp: "NC",
                time: "18:30",
                done: false,
              },
            ].map((g, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 rounded-2xl border p-3 ${
                  g.home
                    ? "bg-[#FFFFFF] border-[#DDE1EC]"
                    : "bg-[#F8F9FC] border-[#DDE1EC]"
                }`}
              >
                <div className="flex flex-col items-center w-10 shrink-0">
                  <span
                    className={`text-[10px] font-medium ${
                      g.dow === "일"
                        ? "text-[#E53935]"
                        : g.dow === "토"
                          ? "text-[#1B5BF0]"
                          : "text-[#9CA3AF]"
                    }`}
                  >
                    {g.dow}
                  </span>
                  <span className="font-bold text-lg leading-tight text-[#111827]">
                    {g.day}
                  </span>
                </div>
                <div className="w-px h-10 bg-[#DDE1EC]" />
                <div className="flex flex-col gap-1 w-14 shrink-0">
                  <span
                    className={`text-[10px] font-semibold rounded px-1.5 py-0.5 text-center w-fit ${
                      g.home
                        ? "bg-[#1B5BF0]/10 text-[#1B5BF0]"
                        : "bg-[#64748B]/10 text-[#64748B]"
                    }`}
                  >
                    {g.home ? "홈" : "원정"}
                  </span>
                  <span className="text-[11px] text-[#9CA3AF]">{g.time}</span>
                </div>
                <div className="flex-1 flex items-center gap-2">
                  <PHCircle className="w-7 h-7 shrink-0" />
                  <span className="text-[#9CA3AF] text-xs">vs</span>
                  <PHCircle className="w-7 h-7 shrink-0" />
                  <span className="text-[13px] font-semibold text-[#111827]">
                    {g.opp}
                  </span>
                </div>
                <span className="text-[11px] text-[#9CA3AF] shrink-0">
                  {g.home ? "라이온즈파크" : "원정"}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 경기 기록 */}
      <div className="px-4 mb-6">
        <PHSection label="경기 기록" onMore={() => navigate("/game/stats")} />
        <div
          className="flex gap-3 overflow-x-auto pb-1"
          style={{ scrollbarWidth: "none" }}
        >
          {/* 투수 */}
          {[
            {
              label: "탈삼진",
              name: "원태인",
              value: "134",
              unit: "K",
              color: "#1B5BF0",
              statTab: 0,
            },

            {
              label: "다승",
              name: "원태인",
              value: "11",
              unit: "승",
              color: "#1B5BF0",
              statTab: 0,
            },

            {
              label: "평균자책점",
              name: "오승환",
              value: "1.92",
              unit: "ERA",
              color: "#1B5BF0",
              statTab: 0,
            },

            {
              label: "세이브",
              name: "오승환",
              value: "28",
              unit: "SV",
              color: "#1B5BF0",
              statTab: 0,
            },

            {
              label: "홀드",
              name: "김태훈",
              value: "7",
              unit: "HLD",
              color: "#1B5BF0",
              statTab: 0,
            },

            /* 타자 */

            {
              label: "타율",
              name: "구자욱",
              value: ".321",
              unit: "AVG",
              color: "#0E1A40",
              statTab: 1,
            },

            {
              label: "홈런",
              name: "구자욱",
              value: "20",
              unit: "HR",
              color: "#0E1A40",
              statTab: 1,
            },

            {
              label: "타점",
              name: "구자욱",
              value: "74",
              unit: "RBI",
              color: "#0E1A40",
              statTab: 1,
            },

            {
              label: "안타",
              name: "구자욱",
              value: "128",
              unit: "H",
              color: "#0E1A40",
              statTab: 1,
            },

            {
              label: "도루",
              name: "김지찬",
              value: "29",
              unit: "SB",
              color: "#0E1A40",
              statTab: 1,
            },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => navigate("/game/stats")}
              className="shrink-0"
            >
              <div className="w-32 bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] p-3 flex flex-col items-center gap-2">
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                  style={{ background: item.color + "18", color: item.color }}
                >
                  {item.label}
                </span>
                <PHCircle className="w-11 h-11" />
                <div className="text-center">
                  <p className="text-[13px] font-bold text-[#0E1A40]">
                    {item.name}
                  </p>
                  <p
                    className="text-[18px] font-black leading-tight"
                    style={{ color: item.color }}
                  >
                    {item.value}
                  </p>
                  <p className="text-[10px] text-[#9CA3AF]">{item.unit}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 리그 순위 */}
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-bold text-[#111827]">리그 순위</span>
        </div>
        <div className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] overflow-hidden">
          {(isStandingsExpanded ? standingsData : standingsData.slice(0, 3))

            .map((team) => (
              <div
                key={team.rank}
                className={`flex items-center gap-3 px-4 py-3 border-b border-[#DDE1EC] ${
                  team.mine ? "bg-[#EBF0FF]/60" : ""
                }`}
              >
                <span
                  className={`text-sm font-bold w-4 ${
                    team.mine ? "text-[#1B5BF0]" : "text-[#64748B]"
                  }`}
                >
                  {team.rank}
                </span>
                <PHCircle className="w-7 h-7" />
                <span
                  className={`flex-1 text-sm ${
                    team.mine
                      ? "text-[#1B5BF0] font-semibold"
                      : "text-[#111827]"
                  }`}
                >
                  {team.name}
                </span>
                <span className="text-xs text-[#64748B]">
                  {team.w}승 {team.l}패
                </span>
                <span className="text-xs text-[#9CA3AF] w-10 text-right">
                  {team.pct}
                </span>
              </div>
            ))}
          <button
            onClick={() => setIsStandingsExpanded(!isStandingsExpanded)}
            className="w-full py-3 text-xs font-medium text-[#64748B] hover:text-[#111827] flex items-center justify-center gap-1 active:bg-[#F8FAFC] transition-colors"
          >
            <span>{isStandingsExpanded ? "닫기" : "더보기"}</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path
                d={isStandingsExpanded ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"}
              />
            </svg>
          </button>
        </div>
      </div>

    </div>
  )
}
