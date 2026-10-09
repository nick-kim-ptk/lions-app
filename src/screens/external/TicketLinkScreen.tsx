// 티켓링크 화면 (더미) — PC에서 '티켓 예매' 시 새 창(_blank)으로 열리는 외부 서비스 자리표시

export function TicketLinkScreen() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-3 bg-[#F5F7FB]">
      <p className="text-[28px] font-bold text-[#111827]">티켓링크 화면</p>

      <p className="text-[13px] text-[#64748B]">
        PC에서는 티켓 예매·결제를 티켓링크에서 진행합니다. (외부 서비스 자리)
      </p>
    </div>
  )
}
