import { PHImage } from '@/components/Placeholder'
import { Header } from '@/components/Layout'
import { EMBLEM_INTRO } from '@/data/club'

// 059-SL-AL-03 구단 앰블럼
export function EmblemIntroScreen() {
  return (
    <div className="min-h-full bg-[#F5F7FB] pb-6">
      <Header title="구단 앰블럼" />
      <PHImage className="h-52" label="구단 앰블럼 (사자 심볼) 확대 이미지" />
      <div className="px-4 pt-5 flex flex-col gap-4">
        <div>
          <p className="text-[18px] font-bold text-[#0E1A40] leading-snug">{EMBLEM_INTRO.title}</p>
          <p className="mt-2 text-[13px] text-[#374151] leading-relaxed">{EMBLEM_INTRO.lead}</p>
        </div>
        <div className="h-px bg-[#DDE1EC]" />
        <div className="flex flex-col gap-3">
          {EMBLEM_INTRO.points.map((p, i) => (
            <div key={p.title} className="flex gap-3 bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] p-4">
              <div className="w-8 h-8 rounded-full bg-[#EBF0FF] text-[#1B5BF0] text-[13px] font-black flex items-center justify-center shrink-0">{i + 1}</div>
              <div>
                <p className="text-[14px] font-bold text-[#111827]">{p.title}</p>
                <p className="mt-1 text-[12px] text-[#64748B] leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-[11px] text-[#9CA3AF] leading-relaxed">{EMBLEM_INTRO.note}</p>
      </div>
    </div>
  )
}
