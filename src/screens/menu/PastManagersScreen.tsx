import { PHCircle } from "@/components/Placeholder"

import { Header } from "@/components/Layout"

import { PAST_MANAGERS } from "@/data/club"

// 069-SL-AL-13 역대 감독

export function PastManagersScreen() {
  return (
    <div className="min-h-full bg-[#F5F7FB] pb-6">
      <Header title="역대 감독" />
      <div className="px-4 pt-4 flex flex-col gap-3">
        {PAST_MANAGERS.map((m) => (
          <div
            key={m.order}
            className="flex gap-4 bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] p-4"
          >
            <PHCircle className="w-14 h-14" />
            <div className="flex-1 flex flex-col gap-1 justify-center min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-[#1B5BF0] bg-[#EBF0FF] rounded-full px-2 py-0.5">
                  제{m.order}대
                </span>
                <span className="text-[14px] font-bold text-[#111827]">
                  {m.name} 감독
                </span>
              </div>
              <span className="text-[12px] text-[#64748B]">재임 {m.term}</span>
              <div className="flex gap-3 mt-0.5">
                {([
                  ["승", m.w],
                  ["패", m.l],
                  ["무", m.d],
                ] as const).map(([label, v]) => (
                  <div key={label} className="flex items-center gap-1">
                    <span className="text-[10px] text-[#9CA3AF]">{label}</span>
                    <span className="text-[12px] font-semibold text-[#111827]">
                      {v ?? "-"}
                    </span>
                  </div>
                ))}
              </div>
              {m.note && (
                <span className="text-[11px] text-[#1B5BF0] mt-0.5">
                  {m.note}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
