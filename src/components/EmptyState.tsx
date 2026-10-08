/**
 * 빈 상태 — 조회는 성공했지만 보여줄 데이터가 0건일 때 (가이드 "빈 상태" 정의)
 * 아이콘 + 안내 문구, 이어서 할 일이 있으면 버튼 한 개
 */
export function EmptyState({
  icon = '📭',
  title,
  desc,
  actionLabel,
  onAction,
  className = 'py-16',
}: {
  icon?: string
  title: string
  desc?: string
  actionLabel?: string
  onAction?: () => void
  className?: string
}) {
  return (
    <div className={`flex flex-col items-center justify-center gap-1.5 px-6 text-center ${className}`}>
      <span className="text-4xl mb-1">{icon}</span>
      <p className="text-[14px] font-semibold text-[#374151]">{title}</p>
      {desc && <p className="text-[12px] leading-relaxed text-[#9CA3AF]">{desc}</p>}
      {actionLabel && (
        <button onClick={onAction} className="mt-3 h-10 rounded-xl bg-[#1B5BF0] px-5 text-[13px] font-bold text-white active:opacity-90">
          {actionLabel}
        </button>
      )}
    </div>
  )
}
