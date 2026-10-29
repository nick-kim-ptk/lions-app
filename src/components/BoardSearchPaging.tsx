import { useEffect, useState } from "react"

// 게시판형 목록 공통 — 검색 영역 + 페이징
// 라이온즈 소식 · PRESS 센터 · 이슈와 팩트 · 구단 소식 목록에서 같이 쓴다.
// 검색은 제목(필요하면 요약 포함) 기준이며, 검색어를 입력하고 검색 버튼(또는 엔터)을 누르면 적용된다.
// 페이징은 한 페이지 10건, 번호 5개 단위 + 이전/다음 화살표. 총 1페이지면 숨긴다.

export const BOARD_PAGE_SIZE = 10

/**
 * 검색 + 페이징 상태.
 * items = 탭(분류) 필터까지 끝난 목록, textOf = 검색 대상 문자열, resetKey = 탭 등이 바뀌면 1페이지로 돌리기 위한 값
 */
export function useBoardSearch<T>(
  items: T[],
  textOf: (item: T) => string,
  resetKey: string,
  pageSize = BOARD_PAGE_SIZE,
) {
  const [input, setInput] = useState("")

  const [query, setQuery] = useState("")

  const [page, setPage] = useState(1)

  useEffect(() => {
    setPage(1)
  }, [query, resetKey])

  const q = query.trim().toLowerCase()

  const matched = q ? items.filter((it) => textOf(it).toLowerCase().includes(q)) : items

  const totalPages = Math.max(1, Math.ceil(matched.length / pageSize))

  const current = Math.min(page, totalPages)

  const pageItems = matched.slice((current - 1) * pageSize, current * pageSize)

  return {
    input,
    setInput,
    query,
    submit: () => setQuery(input),
    clear: () => {
      setInput("")

      setQuery("")
    },
    matched,
    pageItems,
    page: current,
    setPage,
    totalPages,
  }
}

export function BoardSearchBar({
  value,
  onChange,
  onSubmit,
  onClear,
  placeholder = "제목을 검색해 주세요",
}: {
  value: string
  onChange: (v: string) => void
  onSubmit: () => void
  onClear: () => void
  placeholder?: string
}) {
  return (
    <form
      className="px-4 pt-3 pb-1"
      onSubmit={(e) => {
        e.preventDefault()

        onSubmit()
      }}
    >
      <div className="relative">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full h-9 rounded-lg border border-[#DDE1EC] bg-white pl-3 pr-16 text-[12px] text-[#111827] placeholder:text-[#9CA3AF] outline-none focus:border-[#1B5BF0]"
        />
        {value && (
          <button
            type="button"
            onClick={onClear}
            aria-label="검색어 지우기"
            className="absolute right-9 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#C4CAD8] text-white text-[9px] leading-none flex items-center justify-center"
          >
            ✕
          </button>
        )}
        <button
          type="submit"
          aria-label="검색"
          className="absolute right-0 top-0 h-9 w-9 flex items-center justify-center text-[#64748B]"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" />
          </svg>
        </button>
      </div>
    </form>
  )
}

export function BoardPagination({
  page,
  totalPages,
  onChange,
}: {
  page: number
  totalPages: number
  onChange: (p: number) => void
}) {
  if (totalPages <= 1) return null

  const WINDOW = 5

  const start = Math.floor((page - 1) / WINDOW) * WINDOW + 1

  const end = Math.min(start + WINDOW - 1, totalPages)

  const nums = Array.from({ length: end - start + 1 }, (_, i) => start + i)

  const arrow = (label: string, to: number, disabled: boolean) => (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onChange(to)}
      aria-label={label}
      className="w-8 h-8 flex items-center justify-center rounded-lg text-[14px] text-[#64748B] disabled:opacity-30"
    >
      {label === "이전 페이지" ? "‹" : "›"}
    </button>
  )

  return (
    <div className="flex items-center justify-center gap-1 pt-5 pb-2">
      {arrow("이전 페이지", page - 1, page <= 1)}
      {nums.map((n) => (
        <button
          type="button"
          key={n}
          onClick={() => onChange(n)}
          className={`w-8 h-8 rounded-lg text-[13px] font-semibold ${
            n === page ? "bg-[#1B5BF0] text-white" : "text-[#64748B]"
          }`}
        >
          {n}
        </button>
      ))}
      {arrow("다음 페이지", page + 1, page >= totalPages)}
    </div>
  )
}
