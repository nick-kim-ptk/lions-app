import { useState } from "react"

import { useNavigate } from "react-router-dom"

import { Header } from "@/components/Layout"

import {
  BoardPagination,
  BoardSearchBar,
  useBoardSearch,
} from "@/components/BoardSearchPaging"

import { EmptyState } from "@/components/EmptyState"

import {
  ClubNewsCategory,
  ClubNews,
  CLUB_NEWS_DATA,
  CLUB_NEWS_TABS,
} from "@/data/menu"

// 070(072)-SL-AL-16 구단 소식

export function ClubNewsListScreen() {
  const navigate = useNavigate()

  const [tab, setTab] = useState<ClubNewsCategory>("전체")

  const filtered = CLUB_NEWS_DATA.filter(
    (n) => tab === "전체" || n.category === tab,
  )

  const pinnedAll = filtered.filter((n) => n.important)

  const normalAll = filtered.filter((n) => !n.important)

  // 검색 + 페이징 — 중요 소식은 항상 상단에 두고, 일반 글만 10건씩 나눈다
  const bs = useBoardSearch(normalAll, (n) => n.title, tab)

  const q = bs.query.trim().toLowerCase()

  const pinned = q
    ? pinnedAll.filter((n) => n.title.toLowerCase().includes(q))
    : pinnedAll

  const normal = bs.pageItems

  function NewsRow({
    news,
    pinned: isPinned,
  }: {
    news: ClubNews
    pinned: boolean
  }) {
    return (
      <button
        onClick={() => navigate(`/all/club-news-detail?id=${news.id}`)}
        className={`w-full flex flex-col py-4 border-b border-[#DDE1EC] text-left gap-1.5 ${
          isPinned
            ? "bg-[#F0F4FF] px-4 -mx-4 border-l-[3px] border-l-[#1B5BF0]"
            : ""
        }`}
      >
        <div className="flex items-start gap-1.5">
          <span
            className="shrink-0 mt-px text-[10px] font-bold text-white bg-[#EF4444] rounded px-1.5 py-0.5 leading-tight"
            style={{ visibility: isPinned ? "visible" : "hidden" }}
          >
            중요
          </span>
          <span
            className={`text-[14px] font-medium leading-snug ${
              isPinned ? "text-[#0E1A40]" : "text-[#111827]"
            }`}
          >
            {news.title}
          </span>
        </div>
        <span className="text-[11px] text-[#9CA3AF] pl-[34px]">
          {news.date}
        </span>
      </button>
    )
  }

  return (
    <div className="min-h-full bg-[#F5F7FB] pb-4">
      <Header title="구단 소식" />

      {/* 탭 — 가로 스크롤 */}
      <div
        className="flex px-4 pt-3 gap-5 border-b border-[#DDE1EC] overflow-x-auto"
        style={{ scrollbarWidth: "none" }}
      >
        {CLUB_NEWS_TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`shrink-0 pb-3 text-[13px] font-semibold border-b-2 transition-colors whitespace-nowrap ${
              tab === t
                ? "border-[#1B5BF0] text-[#1B5BF0]"
                : "border-transparent text-[#9CA3AF]"
            }`}
          >
            {t}
          </button>
        ))}
      </div>


      {/* 검색 */}
      <BoardSearchBar
        value={bs.input}
        onChange={bs.setInput}
        onSubmit={bs.submit}
        onClear={bs.clear}
      />

      {/* 목록 */}
      <div className="px-4">
        {/* 중요 공지 — 상단 고정 영역 */}
        {pinned.length > 0 && (
          <div className="bg-[#F0F4FF] -mx-4 px-4 border-b border-[#C7D4F8]">
            {pinned.map((news) => (
              <NewsRow key={news.id} news={news} pinned />
            ))}
          </div>
        )}

        {/* 일반 목록 */}
        {normal.map((news) => (
          <NewsRow key={news.id} news={news} pinned={false} />
        ))}
        {pinned.length === 0 && normal.length === 0 && (
          <EmptyState
            icon="🔍"
            title="검색 결과가 없습니다"
            desc="다른 검색어로 다시 검색해 주세요."
            className="py-16"
          />
        )}
        <BoardPagination
          page={bs.page}
          totalPages={bs.totalPages}
          onChange={bs.setPage}
        />
      </div>
    </div>
  )
}
