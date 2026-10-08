import { Header } from '@/components/Layout'
import { HISTORY_TIMELINE } from '@/data/club'

// 068-SL-AL-12 구단 연혁
export function HistoryScreen() {
  return (
    <div className="min-h-full bg-[#F5F7FB] pb-6">
      <Header title="구단 연혁" />
      <div className="px-4 pt-5">
        <div className="relative pl-6 border-l-2 border-[#1B5BF0]/30 flex flex-col gap-8">
          {HISTORY_TIMELINE.map((row) => (
            <div key={row.year} className="relative">
              <div className="absolute -left-[29px] w-4 h-4 rounded-full bg-[#1B5BF0] border-2 border-[#F5F7FB]" />
              <span className="text-[#1B5BF0] text-sm font-bold mb-2 block">{row.year}</span>
              <div className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] p-3 flex flex-col gap-2">
                {row.items.map((t) => (
                  <div key={t} className="flex gap-2">
                    <span className="text-[#9CA3AF] text-xs shrink-0">·</span>
                    <span className="text-[13px] text-[#111827] leading-snug">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
