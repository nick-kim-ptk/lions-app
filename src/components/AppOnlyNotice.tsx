// PC에서 지원하지 않는 기능(티켓 선물 등)을 눌렀을 때 뜨는 안내

export function AppOnlyNotice({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-5"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[360px] rounded-2xl bg-white overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 pt-7 pb-6 text-center">
          <p className="text-[16px] font-bold text-[#111827] mb-2">
            모바일 앱에서 이용해 주세요
          </p>

          <p className="text-[13px] leading-relaxed text-[#64748B]">
            이 기능은 삼성 라이온즈 앱에서만 제공됩니다.
          </p>
        </div>

        <button
          onClick={onClose}
          className="h-12 w-full border-t border-[#DDE1EC] text-[14px] font-bold text-[#1B5BF0]"
        >
          확인
        </button>
      </div>
    </div>
  )
}
