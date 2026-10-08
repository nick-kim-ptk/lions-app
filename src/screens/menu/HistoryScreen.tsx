import { PHText } from '@/components/Placeholder'
import { Header } from '@/components/Layout'

// 066(068)-SL-AL-12 구단 연혁
export function HistoryScreen() {
  return (
    <div className="min-h-full bg-[#F5F7FB] pb-4">
      <Header title="구단 연혁" />
      <div className="px-4 pt-5">
        <div className="relative pl-6 border-l-2 border-[#1B5BF0]/30 flex flex-col gap-8">
          {['2026', '2020', '2015', '2010', '2005', '2000', '1985'].map((year, i) => (
            <div key={year} className="relative">
              {/* Timeline dot */}
              <div className="absolute -left-[29px] w-4 h-4 rounded-full bg-[#1B5BF0] border-2 border-[#F5F7FB]" />
              <span className="text-[#1B5BF0] text-sm font-bold mb-2 block">{year}</span>
              <div className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] p-3 flex flex-col gap-2">
                {Array.from({length: i === 0 ? 3 : 2}).map((_, j) => (
                  <div key={j} className="flex gap-2">
                    <span className="text-[#9CA3AF] text-xs shrink-0">·</span>
                    <PHText className="flex-1" />
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
