import { PHCircle } from "@/components/Placeholder"

import { Header } from "@/components/Layout"

import { PAST_MANAGERS } from "@/data/club"

// 069-SL-AL-13 역대 감독

export function PastManagersScreen() {
  const cur = PAST_MANAGERS.find((m) => m.current)
  const past = PAST_MANAGERS.filter((m) => !m.current)
  return (
    <div className="min-h-full bg-[#F5F7FB] pb-6">
      <Header title="역대 감독" />
      <div className="px-4 pt-4 flex flex-col gap-4">
        {cur && (
          <div className="rounded-3xl bg-gradient-to-br from-[#0E1A40] to-[#1B5BF0] p-5 text-white flex flex-col items-center gap-3 text-center">
            <span className="text-[11px] font-bold tracking-widest bg-white/20 rounded-full px-3 py-1">
              현재 감독 · 제{cur.order}
            </span>
            <PHCircle className="w-24 h-24" />
            <div>
              <p className="text-[22px] font-black">{cur.name} 감독</p>
              <p className="mt-1 text-[12px] text-white/80">
                재임 {cur.term}
              </p>
            </div>
          </div>
        )}
        <p className="text-xs text-[#9CA3AF] font-medium">역대 감독</p>
        <div className="flex flex-col gap-3 lg:grid lg:grid-cols-2">
          {past.map((m) => (
            <div
              key={m.order + m.name + m.term}
              className="flex gap-4 bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] p-4"
            >
              <PHCircle className="w-14 h-14" />
              <div className="flex-1 flex flex-col gap-1 justify-center min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-[#1B5BF0] bg-[#EBF0FF] rounded-full px-2 py-0.5">
                    {m.order}
                  </span>
                  <span className="text-[14px] font-bold text-[#111827]">
                    {m.name} 감독
                  </span>
                </div>
                <span className="text-[12px] text-[#64748B]">
                  재임 {m.term}
                </span>
                <div className="flex flex-wrap gap-x-3 mt-0.5 text-[12px] text-[#111827]">
                  <span>
                    <span className="text-[10px] text-[#9CA3AF]">경기 </span>
                    {m.games}
                  </span>
                  <span>
                    <span className="text-[10px] text-[#9CA3AF]">승 </span>
                    {m.w}
                  </span>
                  <span>
                    <span className="text-[10px] text-[#9CA3AF]">패 </span>
                    {m.l}
                  </span>
                  <span>
                    <span className="text-[10px] text-[#9CA3AF]">무 </span>
                    {m.d}
                  </span>
                  <span className="font-semibold text-[#1B5BF0]">
                    <span className="text-[10px] font-normal text-[#9CA3AF]">
                      승률{" "}
                    </span>
                    {m.rate}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
