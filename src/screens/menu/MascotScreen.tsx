import { PHImage } from "@/components/Placeholder"

import { Header } from "@/components/Layout"

import { MASCOT_INTRO } from "@/data/club"

// 061-SL-AL-05 구단 마스코트

export function MascotScreen() {
  return (
    <div className="min-h-full bg-[#F5F7FB] pb-6">
      <Header title="구단 마스코트" />
      <div className="px-4 pt-4 flex flex-col gap-6 lg:grid lg:grid-cols-2 lg:items-start">
        <PHImage
          className="h-64"
          rounded="rounded-3xl"
          label="블레오 패밀리 대표 이미지"
        />
        <div className="flex flex-col gap-2">
          <p className="text-[17px] font-bold text-[#0E1A40]">
            {MASCOT_INTRO.title}
          </p>
          {MASCOT_INTRO.paragraphs.map((t, i) => (
            <p key={i} className="text-[13px] text-[#374151] leading-relaxed">
              {t}
            </p>
          ))}
        </div>
        <div className="bg-white rounded-2xl border border-[#DDE1EC] p-4 flex flex-col gap-3 lg:col-span-2">
          <p className="text-[14px] font-bold text-[#0E1A40]">
            블레오 패밀리 엠블럼
          </p>
          <PHImage
            className="h-40"
            rounded="rounded-xl"
            label={MASCOT_INTRO.emblemLabel}
          />
        </div>
      </div>
    </div>
  )
}
