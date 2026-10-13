// 게시판형 상세 공통 — 이전 글 / 다음 글 영역
// 목록과 같은 순서(위가 최신)의 배열을 받아 현재 글 기준으로 계산한다.
// 다음 글 = 목록에서 바로 위(더 최신), 이전 글 = 바로 아래(더 오래된 글)

type Item = { id: number; title: string; date: string }

export function PrevNextNav<T extends Item>({
  list,
  currentId,
  onGo,
}: {
  list: T[]
  currentId: number
  onGo: (item: T) => void
}) {
  const idx = list.findIndex((n) => n.id === currentId)

  const prev = idx >= 0 ? list[idx + 1] : undefined

  const next = idx >= 0 ? list[idx - 1] : undefined

  return (
    <div className="bg-white border border-[#DDE1EC] rounded-2xl overflow-hidden">
      {[
        { label: "다음 글", item: next },
        { label: "이전 글", item: prev },
      ].map(({ label, item }, i) => (
        <button
          key={label}
          type="button"
          disabled={!item}
          onClick={() => item && onGo(item)}
          className={`w-full flex items-center gap-3 px-4 py-3 text-left disabled:opacity-40 ${
            i === 0 ? "border-b border-[#DDE1EC]" : ""
          }`}
        >
          <span className="shrink-0 w-12 text-[11px] font-bold text-[#6B7280]">
            {label}
          </span>
          <span className="flex-1 min-w-0 text-[13px] text-[#111827] truncate">
            {item ? item.title : "글이 없습니다."}
          </span>
          {item && (
            <span className="shrink-0 text-[11px] text-[#9CA3AF]">
              {item.date}
            </span>
          )}
        </button>
      ))}
    </div>
  )
}
