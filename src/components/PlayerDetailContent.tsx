import { useState } from "react"

import { PH, PHSection } from "./Placeholder"

import { CaseSelect } from "./CaseSelect"

import { PlayerStatusBadge } from "./PlayerStatusBadge"

import {
  BATTER_STATS,
  PITCHER_STATS,
  PLAYER_BY_ID,
  PLAYER_PROFILES,
  playerStatus,
  type PlayerKind,
  type PlayerTier,
} from "@/data/mock"

type StatusCase = "1군" | "2군" | "부상" | "신입단" | "군입대"

const STATUS_CASES: StatusCase[] = ["1군", "2군", "부상", "신입단", "군입대"]

const DEFAULT_INJURY = "어깨 통증"

const DEFAULT_PLAYER_ID = "lee-jae-hyun"

export function PlayerDetailContent({
  onClose,
  playerId = DEFAULT_PLAYER_ID,
}: {
  onClose: () => void
  playerId?: string
}) {
  const base = PLAYER_BY_ID[playerId] ?? PLAYER_BY_ID[DEFAULT_PLAYER_ID]

  const profile = PLAYER_PROFILES[base.id]

  const st0 = playerStatus(base)

  // 케이스 전환(와이어프레임 전용): 어드민 구분(일반/신입단/군입대) + 등록 상태(1군/2군/부상)

  const [statusCase, setStatusCase] = useState<StatusCase>(
    st0.kind === "신입단"
      ? "신입단"
      : st0.kind === "군입대"
        ? "군입대"
        : st0.tier,
  )

  const kind: PlayerKind =
    statusCase === "신입단"
      ? "신입단"
      : statusCase === "군입대"
        ? "군입대"
        : "일반"

  const tier: PlayerTier =
    statusCase === "2군" ? "2군" : statusCase === "부상" ? "부상" : "1군"

  const injury = tier === "부상" ? st0.injury || DEFAULT_INJURY : ""

  const isPitcher = base.group === "투수"

  const [throws, bats] = [base.handed.slice(0, 2), base.handed.slice(2)]

  const player = {
    number: base.no,

    name: base.name,

    nameEn: profile?.nameEn ?? "",

    position: base.group,

    bats,

    throws,

    birth: profile?.birth ?? "-",

    height: profile?.height ?? "-",

    weight: profile?.weight ?? "-",

    school: profile?.school ?? "-",

    debut: profile?.debut ?? "-",

    entranceSong: profile?.entranceSong ?? "등록 예정",

    cheer: profile?.cheer ?? `${base.name} 응원가는 준비 중입니다.`,
  }

  // 시즌 기록 — 투수/타자에 따라 항목이 다름

  const bs = BATTER_STATS[base.id]

  const ps = PITCHER_STATS[base.id]

  const currentStats =
    isPitcher && ps
      ? [
          { label: "평균자책점", value: ps.era },

          { label: "승", value: String(ps.w) },

          { label: "패", value: String(ps.l) },

          { label: "세이브", value: String(ps.sv) },

          { label: "홀드", value: String(ps.hld) },

          { label: "탈삼진", value: String(ps.k) },
        ]
      : bs
        ? [
            { label: "타율", value: bs.avg },

            { label: "홈런", value: String(bs.hr) },

            { label: "타점", value: String(bs.rbi) },

            { label: "안타", value: String(bs.h) },

            { label: "출루율", value: bs.obp },

            { label: "장타율", value: bs.slg },
          ]
        : []

  const pastStats = profile?.history ?? []

  return (
    <div className="bg-[#F5F7FB] min-h-full">
      {/* 히어로 */}
      <div
        className="relative w-full bg-gradient-to-b from-[#0E1A40] to-[#1B3A80] overflow-hidden"
        style={{ minHeight: 320 }}
      >
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
          <span
            className="text-[220px] font-black leading-none select-none"
            style={{ color: "rgba(255,255,255,0.05)" }}
          >
            {player.number}
          </span>
        </div>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path
              d="M18 6L6 18M6 6l12 12"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <div className="absolute top-4 left-4 z-10">
          <CaseSelect
            variant="dark"
            value={statusCase}
            options={STATUS_CASES}
            onChange={setStatusCase}
          />
        </div>
        <div className="absolute bottom-0 right-4 w-44 h-56 flex items-end justify-center">
          <div
            className="w-full h-full rounded-t-full flex items-end justify-center pb-2"
            style={{
              background:
                "linear-gradient(to bottom,rgba(27,90,240,0.3) 0%,transparent 100%)",
            }}
          >
            <span style={{ fontSize: 96, lineHeight: 1 }}>🦁</span>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-6 pt-16">
          <div className="flex items-end gap-3">
            <span className="text-[#F0A500] text-[48px] font-black leading-none">
              {player.number}
            </span>
            <div>
              <p className="text-white text-[28px] font-black leading-none">
                {player.name}
              </p>
              {player.nameEn && (
                <p className="text-white/50 text-[12px] mt-0.5">
                  {player.nameEn}
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-2 mt-3">
            <span className="text-[10px] font-semibold text-white bg-white/15 rounded-full px-2.5 py-1">
              {player.position}
            </span>
            <span className="text-[10px] font-semibold text-white bg-white/15 rounded-full px-2.5 py-1">
              {player.bats} · {player.throws}
            </span>
            <span className="text-[10px] font-semibold text-[#F0A500] bg-[#F0A500]/15 rounded-full px-2.5 py-1">
              #{player.number}
            </span>
            {kind === "일반" && tier === "1군" && (
              <span className="text-[10px] font-semibold text-white bg-white/15 rounded-full px-2.5 py-1">
                1군
              </span>
            )}
            <PlayerStatusBadge
              kind={kind}
              tier={tier}
              injury={injury}
              size="md"
            />
          </div>
        </div>
      </div>

      <div className="px-4 pt-5 flex flex-col gap-6">
        {(tier !== "1군" || kind !== "일반") && (
          <div
            className={`rounded-2xl px-4 py-3 border ${
              tier === "부상" && kind !== "군입대"
                ? "bg-[#FEF2F2] border-[#EF4444]/30"
                : "bg-[#EEF1F7] border-[#DDE1EC]"
            }`}
          >
            <p className="text-[13px] font-bold text-[#111827]">
              {kind === "군입대"
                ? "군 복무 중인 선수예요"
                : kind === "신입단"
                  ? "올 시즌 새로 입단한 선수예요"
                  : tier === "2군"
                    ? "현재 2군(퓨처스리그)에서 뛰고 있어요"
                    : `부상 : ${injury}`}
            </p>
            <p className="text-[11px] text-[#64748B] mt-0.5">
              {kind === "군입대"
                ? "복무 기간 동안에는 1군 경기와 라인업에 나오지 않아요."
                : kind === "신입단"
                  ? "시즌 기록은 출전 후부터 쌓여요."
                  : tier === "2군"
                    ? "1군 등록 시 라인업과 기록에 다시 반영돼요."
                    : "복귀 전까지 라인업에 나오지 않을 수 있어요."}
            </p>
          </div>
        )}
        <div className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] p-4">
          <p className="text-[13px] font-bold text-[#111827] mb-3">선수 정보</p>
          <div className="grid grid-cols-3 gap-y-4">
            {[
              { label: "포지션", value: player.position },

              { label: "생년월일", value: player.birth },

              {
                label: "신장/체중",
                value: `${player.height} / ${player.weight}`,
              },

              { label: "투/타", value: `${player.throws} / ${player.bats}` },

              { label: "프로 데뷔", value: player.debut },

              { label: "출신", value: player.school.split(" → ")[0] },
            ].map((item) => (
              <div key={item.label} className="flex flex-col gap-1">
                <span className="text-[10px] text-[#9CA3AF]">{item.label}</span>
                <span className="text-[12px] font-semibold text-[#111827]">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {currentStats.length > 0 && kind === "일반" && (
          <div>
            <PHSection label="2026 시즌 기록" right="" />
            <div className="grid grid-cols-3 gap-3">
              {currentStats.map((s) => (
                <div
                  key={s.label}
                  className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] p-3 flex flex-col items-center gap-1"
                >
                  <span className="text-[10px] text-[#9CA3AF]">{s.label}</span>
                  <span className="text-[20px] font-black text-[#1B5BF0]">
                    {s.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {pastStats.length > 0 && kind === "일반" && (
          <div>
            <PHSection label="연도별 기록" right="" />
            <div className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] overflow-hidden">
              <div className="flex bg-[#E8EBF4]">
                {["시즌", "타율", "HR", "RBI", "안타"].map((h) => (
                  <div
                    key={h}
                    className="flex-1 py-2.5 text-center text-[10px] font-semibold text-[#64748B]"
                  >
                    {h}
                  </div>
                ))}
              </div>
              {pastStats.map((row, i) => (
                <div
                  key={row.season}
                  className={`flex ${
                    i > 0 ? "border-t border-[#DDE1EC]" : ""
                  } ${i === 0 ? "bg-[#EBF0FF]/40" : ""}`}
                >
                  <div className="flex-1 py-3 text-center text-[12px] font-bold text-[#1B5BF0]">
                    {row.season}
                  </div>
                  <div className="flex-1 py-3 text-center text-[12px] text-[#111827]">
                    {row.avg}
                  </div>
                  <div className="flex-1 py-3 text-center text-[12px] text-[#111827]">
                    {row.hr}
                  </div>
                  <div className="flex-1 py-3 text-center text-[12px] text-[#111827]">
                    {row.rbi}
                  </div>
                  <div className="flex-1 py-3 text-center text-[12px] text-[#111827]">
                    {row.h}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <PHSection label="등장곡" right="" />
          <div className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] px-4 py-3.5">
            <p className="text-[13px] font-semibold text-[#111827] truncate">
              {player.entranceSong}
            </p>
          </div>
        </div>

        <div>
          <PHSection label="응원가" right="" />
          <div className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] p-4">
            <div className="flex items-center gap-3 mb-3">
              <button className="w-10 h-10 rounded-full bg-[#1B5BF0] flex items-center justify-center shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M5 3l14 9-14 9V3z" fill="white" />
                </svg>
              </button>
              <div>
                <p className="text-[13px] font-semibold text-[#111827]">
                  {player.name} 응원가
                </p>
                <p className="text-[11px] text-[#9CA3AF]">
                  삼성 라이온즈 공식 응원가
                </p>
              </div>
            </div>
            <div className="bg-[#F5F7FB] rounded-xl p-3">
              {player.cheer.split("\n").map((line, i) => (
                <p
                  key={i}
                  className="text-[13px] text-[#64748B] leading-relaxed text-center"
                >
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div>
          <PHSection label="관련 영상" right="" />
          <div className="flex gap-3 overflow-x-auto pb-1">
            {[
              { title: `${player.name} 시즌 하이라이트`, sub: "2026.09.10" },

              { title: `${player.name} 인터뷰`, sub: "2026.08.22" },

              { title: `${player.name} 하이라이트 모음`, sub: "2026.07.15" },
            ].map((v) => (
              <div key={v.title} className="shrink-0 w-44">
                <div className="w-44 h-28 bg-[#E8EBF4] rounded-2xl mb-2 relative overflow-hidden flex items-center justify-center">
                  <PH className="w-full h-full rounded-none" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-9 h-9 rounded-full bg-black/40 flex items-center justify-center">
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path d="M5 3l14 9-14 9V3z" fill="white" />
                      </svg>
                    </div>
                  </div>
                </div>
                <p className="text-[12px] font-medium text-[#111827] leading-snug">
                  {v.title}
                </p>
                <p className="text-[10px] text-[#9CA3AF] mt-0.5">{v.sub}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <PHSection label="관련 굿즈" right="" />
          <div className="flex gap-3 overflow-x-auto pb-1">
            {[
              {
                player: player.name,
                name: `${player.name} 어센틱 유니폼`,
                price: "175,000원",
              },

              {
                player: player.name,
                name: `${player.name} 포토카드 세트`,
                price: "18,000원",
              },

              {
                player: player.name,
                name: `${player.name} 응원 타월`,
                price: "22,000원",
              },

              {
                player: player.name,
                name: `${player.name} 아크릴 스탠드`,
                price: "35,000원",
              },
            ].map((g) => (
              <div key={g.name} className="shrink-0 w-32 lg:w-[184px] flex flex-col">
                <PH className="w-32 h-32 lg:w-[184px] lg:h-[184px] rounded-2xl mb-2" />
                <span className="text-[10px] font-semibold text-[#1B5BF0] mb-0.5 leading-none">
                  {g.player}
                </span>
                <span className="text-[12px] font-medium text-[#0E1A40] leading-snug mb-1 line-clamp-2">
                  {g.name}
                </span>
                <span className="text-[13px] font-bold text-[#0E1A40]">
                  {g.price}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="pb-12" />
    </div>
  )
}
