import { Header } from '@/components/Layout'

// 050(052)-SL-MY-23 멤버십 내역
export function MembershipHistoryScreen() {
  const histories = [
    { year: '2026', type: '멤버십', name: '블루멤버십 (GOLD)', member: '홍길동', date: '2026.01.03', amount: '120,000원', status: '결제 완료' },
    { year: '2026', type: '시즌권', name: '프리미엄 블루 시즌권', member: '홍길동', date: '2026.01.03', amount: '1,500,000원', status: '결제 완료' },
    { year: '2026', type: '멤버십', name: '어린이 멤버십', member: '홍길동 Jr.', date: '2026.01.05', amount: '30,000원', status: '결제 완료' },
    { year: '2025', type: '멤버십', name: '블루멤버십 (GOLD)', member: '홍길동', date: '2025.01.08', amount: '100,000원', status: '결제 완료' },
    { year: '2025', type: '시즌권', name: '프리미엄 블루 시즌권', member: '홍길동', date: '2025.01.08', amount: '1,300,000원', status: '결제 완료' },
    { year: '2025', type: '멤버십', name: '어린이 멤버십', member: '홍길동 Jr.', date: '2025.01.10', amount: '25,000원', status: '결제 완료' },
    { year: '2024', type: '멤버십', name: '블루멤버십 (SILVER)', member: '홍길동', date: '2024.01.12', amount: '80,000원', status: '결제 완료' },
  ]

  const grouped = histories.reduce<Record<string, typeof histories>>((acc, h) => {
    acc[h.year] = acc[h.year] ?? []
    acc[h.year].push(h)
    return acc
  }, {})

  const typeColor: Record<string, string> = {
    '멤버십': 'bg-[#EBF0FF] text-[#1B5BF0]',
    '시즌권': 'bg-[#0E2F80] text-white',
  }

  return (
    <div className="min-h-full bg-[#F5F7FB] pb-8">
      <Header title="가입 내역" />
      <div className="px-4 pt-4 flex flex-col gap-6">
        {Object.entries(grouped).sort(([a], [b]) => Number(b) - Number(a)).map(([year, items]) => (
          <div key={year}>
            <p className="text-[12px] font-bold text-[#9CA3AF] mb-2">{year}년</p>
            <div className="flex flex-col gap-2.5">
              {items.map((h, i) => (
                <div key={i} className="bg-white rounded-2xl border border-[#DDE1EC] p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${typeColor[h.type]}`}>{h.type}</span>
                      <span className="text-[13px] font-bold text-[#111827]">{h.name}</span>
                    </div>
                    <span className="text-[11px] text-white bg-[#22C55E] font-semibold px-2 py-0.5 rounded-full">{h.status}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[11px] text-[#9CA3AF]">회원명 · {h.member}</span>
                      <span className="text-[11px] text-[#9CA3AF]">구입일 · {h.date}</span>
                    </div>
                    <span className="text-[15px] font-black text-[#111827]">{h.amount}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
