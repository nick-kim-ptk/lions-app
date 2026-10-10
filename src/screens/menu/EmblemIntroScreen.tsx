import { PHImage } from "@/components/Placeholder"

import { Header } from "@/components/Layout"

import { EMBLEM_INTRO } from "@/data/club"

// 059-SL-AL-03 구단 앰블럼

export function EmblemIntroScreen() {
  return (
    <div className="min-h-full bg-[#F5F7FB] pb-6">
      <Header title="구단 앰블럼" />
      <div className="px-4 pt-5 flex flex-col gap-4">
        <div>
          <p className="text-[18px] font-bold text-[#0E1A40] leading-snug">
            {EMBLEM_INTRO.title}
          </p>
          <p className="mt-2 text-[13px] text-[#374151] leading-relaxed">
            {EMBLEM_INTRO.lead}
          </p>
        </div>
        <div className="flex flex-col gap-4 lg:grid lg:grid-cols-2">
          {EMBLEM_INTRO.items.map((it) => (
            <div
              key={it.name}
              className="bg-white rounded-2xl border border-[#DDE1EC] p-4 flex flex-col gap-3"
            >
              <div>
                <p className="text-[10px] tracking-widest text-[#9CA3AF]">
                  {it.en}
                </p>
                <p className="text-[15px] font-bold text-[#0E1A40]">
                  {it.name}
                </p>
              </div>
              <PHImage
                className="h-32"
                rounded="rounded-xl"
                label={it.imageLabel}
              />
              <div className="flex flex-col gap-1.5">
                {it.desc.map((d) => (
                  <p
                    key={d}
                    className="text-[12px] text-[#64748B] leading-relaxed"
                  >
                    {d}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
