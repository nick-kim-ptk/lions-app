import { useNavigate } from "react-router-dom"

import { useState } from "react"

import { Header } from "@/components/Layout"

import { EmptyState } from "@/components/EmptyState"

import { ListCaseBar, type ListCase } from "@/components/ListCaseBar"

import { CaseSelect } from "@/components/CaseSelect"

import { EMBLEMS, EMBLEM_TOTAL, type Emblem } from "@/data/emblems"

// 기념 앰블럼(기간 한정 받기) 상태 — 어드민에서 기간·선착순 수량을 정해 등록

const COMMEMORATIVE_CASES = [
  "받기 가능",
  "받음",
  "선착순 마감",
  "기간 종료",
] as const

type CommemorativeCase = typeof COMMEMORATIVE_CASES[number]

// 038(040)-SL-MY-11 내 앰블럼

export function MyEmblemScreen() {
  const navigate = useNavigate()

  const [listCase, setListCase] = useState<ListCase>("목록 있음")

  const empty = listCase === "목록 없음"

  const [commCase, setCommCase] = useState<CommemorativeCase>("받기 가능")

  const [sel, setSel] = useState<Emblem | null>(null)

  return (
    <div className="min-h-full bg-[#F5F7FB] pb-4">
      <Header
        title="내 앰블럼"
        rightSlot={
          <button
            onClick={() => navigate("/my/emblem-detail")}
            className="text-[13px] font-medium text-[#1B5BF0]"
          >
            변동 내역
          </button>
        }
      />

      <ListCaseBar value={listCase} onChange={setListCase} />
      <div className="px-4 pt-4 mb-5">
        <div className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] p-5 flex flex-col items-center gap-1">
          <span className="text-[12px] text-[#9CA3AF]">보유 앰블럼 수</span>
          <span className="text-[#111827] text-[42px] font-black leading-none">
            {empty ? 0 : EMBLEM_TOTAL}
          </span>
        </div>
      </div>

      <div className="px-4 mb-5">
        <div className="bg-[#EBF0FF] border border-[#1B5BF0]/20 rounded-2xl px-4 py-3 flex items-start gap-3">
          <span className="text-lg shrink-0">💡</span>
          <p className="text-[12px] text-[#1B5BF0] leading-relaxed">
            모아둔 앰블럼은 <span className="font-bold">이벤트 참여 조건</span>
            이 될 수 있어요.
            <br />
            앰블럼을 꾸준히 모아 특별한 혜택을 누려보세요!
          </p>
        </div>
      </div>

      <div className="px-4 mb-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[15px] font-bold text-[#111827]">
            기념 앰블럼 받기
          </span>
          <CaseSelect
            value={commCase}
            options={COMMEMORATIVE_CASES}
            onChange={setCommCase}
          />
        </div>
        <div className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] p-4 flex items-center gap-3">
          <div className="w-12 h-12 shrink-0 rounded-2xl bg-gradient-to-br from-[#F0A500] to-[#FFD966] flex items-center justify-center text-xl">
            🏅
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-bold text-[#111827] leading-tight">
              구자욱 30홈런 기념
            </p>
            <p className="mt-0.5 text-[12px] text-[#6B7280] leading-snug">
              2026.09.20 ~ 2026.09.27 받을 수 있어요
            </p>
            <p className="mt-1 text-[11px] text-[#1B5BF0] leading-snug">
              {commCase === "선착순 마감"
                ? "선착순 100명이 모두 받았어요"
                : commCase === "기간 종료"
                  ? "받기 기간이 끝났어요"
                  : "선착순 100명 · 현재 64명 받음"}
            </p>
            <p className="mt-1 text-[10px] text-[#9CA3AF] leading-snug">
              기념 앰블럼은 이벤트 응모에 사용되지 않아요
            </p>
          </div>
          <button
            disabled={commCase !== "받기 가능"}
            className={`shrink-0 h-9 px-4 rounded-xl text-[12px] font-bold ${
              commCase === "받기 가능"
                ? "bg-[#1B5BF0] text-white"
                : "bg-[#E5E7EB] text-[#9CA3AF]"
            }`}
            onClick={() => setCommCase("받음")}
          >
            {commCase === "받음"
              ? "받음"
              : commCase === "선착순 마감"
                ? "마감"
                : commCase === "기간 종료"
                  ? "종료"
                  : "받기"}
          </button>
        </div>
      </div>

      <div className="px-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[15px] font-bold text-[#111827]">
            획득 앰블럼
          </span>
        </div>
        <div className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] p-4">
          {empty ? (
            <EmptyState
              icon="🦁"
              title="아직 모은 앰블럼이 없어요"
              desc="경기 관람과 미션 참여로 앰블럼을 모아보세요."
              actionLabel="블루 시그널 가기"
              onAction={() => navigate("/lounge/blue-signal")}
              className="py-8"
            />
          ) : (
            <div className="grid grid-cols-3 gap-x-3 gap-y-5 lg:grid-cols-[repeat(auto-fill,140px)] lg:gap-x-5 lg:justify-start">
              {EMBLEMS.map((em) => (
                <button
                  key={em.name}
                  type="button"
                  onClick={() => setSel(em)}
                  className="flex flex-col items-center gap-1.5 text-center"
                >
                  <div
                    className={`relative w-full lg:w-[140px] aspect-square rounded-2xl bg-gradient-to-br ${em.color} flex items-center justify-center`}
                  >
                    <span className="text-3xl">{em.emoji}</span>
                    <div className="absolute -top-1.5 -right-1.5 min-w-5 h-5 px-1 rounded-full bg-[#111827] border-2 border-white flex items-center justify-center">
                      <span className="text-[9px] font-bold text-white">
                        {em.count}
                      </span>
                    </div>
                  </div>
                  <span className="text-[11px] font-medium text-[#374151] leading-tight">
                    {em.name}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 앰블럼 상세 모달 — 설명·획득 조건 */}
      {sel && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-7"
          onClick={() => setSel(null)}
        >
          <div
            className="w-full max-w-[320px] rounded-3xl bg-white px-6 pb-5 pt-7 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={`relative mx-auto flex h-28 w-28 items-center justify-center rounded-3xl bg-gradient-to-br ${sel.color}`}
            >
              <span className="text-5xl">{sel.emoji}</span>
              <div className="absolute -right-2 -top-2 flex h-6 min-w-6 items-center justify-center rounded-full border-2 border-white bg-[#111827] px-1.5">
                <span className="text-[11px] font-bold text-white">
                  {sel.count}
                </span>
              </div>
            </div>
            <p className="mt-4 text-[17px] font-bold text-[#111827]">
              {sel.name}
            </p>
            <p className="mt-1 text-[13px] text-[#6B7280]">{sel.desc}</p>
            <div className="mt-4 rounded-2xl bg-[#F5F7FB] px-4 py-3 text-left">
              <p className="text-[11px] font-semibold text-[#64748B]">
                획득 조건
              </p>
              <p className="mt-1 text-[13px] leading-snug text-[#1B5BF0]">
                {sel.cond}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setSel(null)}
              className="mt-5 h-12 w-full rounded-2xl bg-[#1B5BF0] text-[15px] font-bold text-white"
            >
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
