import { useState } from "react"

import { useNavigate } from "react-router-dom"

import { Header } from "@/components/Layout"

import { EmptyState } from "@/components/EmptyState"

import { ListCaseBar, type ListCase } from "@/components/ListCaseBar"

import { EVENT_HISTORY, EventStatus, STATUS_STYLE } from "@/data/menu"

// 080(082)-SL-AL-26 이벤트 참여 내역

export function EventHistoryScreen() {
  const navigate = useNavigate()

  const [tab, setTab] = useState<EventStatus | "전체">("전체")

  const [listCase, setListCase] = useState<ListCase>("목록 있음")

  const tabs = ["전체", "당첨", "미당첨", "응모 중"] as const

  const filtered =
    listCase === "목록 없음"
      ? []
      : tab === "전체"
        ? EVENT_HISTORY
        : EVENT_HISTORY.filter((e) => e.status === tab)

  return (
    <div className="min-h-full bg-[#F5F7FB] pb-4">
      <Header title="이벤트 참여 내역" />
      <ListCaseBar value={listCase} onChange={setListCase} />

      {/* 탭 */}
      <div className="flex px-4 pt-3 gap-4 border-b border-[#DDE1EC]">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`pb-3 px-1 text-[13px] font-semibold border-b-2 transition-colors ${
              tab === t
                ? "border-[#1B5BF0] text-[#1B5BF0]"
                : "border-transparent text-[#9CA3AF]"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="px-4 pt-4 flex flex-col gap-3">
        {filtered.map((event) => (
          <div
            key={event.id}
            className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] p-4"
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <p
                className={`text-[13px] font-semibold leading-snug flex-1 ${
                  event.status === "미당첨"
                    ? "text-[#9CA3AF]"
                    : "text-[#0E1A40]"
                }`}
              >
                {event.title}
              </p>
              <span
                className={`shrink-0 text-[11px] font-bold px-2.5 py-0.5 rounded-full ${STATUS_STYLE[event.status]}`}
              >
                {event.status}
              </span>
            </div>
            <p className="text-[11px] text-[#9CA3AF]">
              참여일 · {event.joinedAt}
            </p>
          </div>
        ))}
        {filtered.length === 0 &&
          (tab === "전체" ? (
            <EmptyState
              icon="🎟"
              title="참여한 이벤트가 없어요"
              desc="진행 중인 이벤트에 참여해 보세요."
              actionLabel="이벤트 보러가기"
              onAction={() => navigate("/all/event-list")}
            />
          ) : (
            <EmptyState icon="🎟" title={`${tab} 내역이 없어요`} />
          ))}
      </div>
    </div>
  )
}
