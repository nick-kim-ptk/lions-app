import { PHImage, PHSection } from "@/components/Placeholder"

import { Header } from "@/components/Layout"

import { MASCOT_FAMILY, MASCOT_INTRO } from "@/data/club"

// 061-SL-AL-05 구단 마스코트

export function MascotScreen() {
  return (
    <div className="min-h-full bg-[#F5F7FB] pb-6">
      <Header title="구단 마스코트" />
      <div className="px-4 pt-4 flex flex-col gap-6">
        <PHImage
          className="h-64"
          rounded="rounded-3xl"
          label="대표 마스코트 '블레오' 대표 이미지"
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
        <div>
          <PHSection label="블레오 패밀리" right="" />
          <div className="flex gap-3 overflow-x-auto pb-1">
            {MASCOT_FAMILY.map((m) => (
              <div
                key={m.name}
                className="shrink-0 flex flex-col items-center gap-2 w-24"
              >
                <PHImage className="h-28" rounded="rounded-2xl" />
                <div className="text-center">
                  <p className="text-[13px] font-bold text-[#111827]">
                    {m.name}
                  </p>
                  <p className="text-[10px] text-[#9CA3AF]">{m.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
