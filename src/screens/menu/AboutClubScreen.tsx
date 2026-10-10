import { PHImage } from "@/components/Placeholder"

import { Header } from "@/components/Layout"

import { ABOUT_FACTS, ABOUT_SECTIONS } from "@/data/club"

// 058-SL-AL-02 구단 소개

export function AboutClubScreen() {
  return (
    <div className="min-h-full bg-[#F5F7FB] pb-6">
      <Header title="구단 소개" />
      <p className="px-4 py-2 text-[11px] leading-snug text-[#6B7280] bg-[#FFF7E6] border-b border-[#F3E2B8]">
        * 구단에서 정리해서 주셔야 할 내용으로 삼성라이온즈파크 소개가 아닌
        구단에 대한 전반적인 Overview 내용이 구성됩니다.
      </p>
      <PHImage
        className="h-56"
        label="구단 대표 이미지 (홈구장 전경 또는 선수단 단체 사진)"
      />

      <div className="px-4 pt-4">
        <div className="grid grid-cols-2 gap-2">
          {ABOUT_FACTS.map((f) => (
            <div
              key={f.label}
              className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] px-3 py-3"
            >
              <p className="text-[10px] text-[#9CA3AF] mb-0.5">{f.label}</p>
              <p className="text-[13px] font-bold text-[#0E1A40] leading-snug">
                {f.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 pt-6 flex flex-col gap-6">
        {ABOUT_SECTIONS.map((sec) => (
          <div key={sec.title}>
            <p className="text-[15px] font-bold text-[#111827] mb-2">
              {sec.title}
            </p>
            <div className="flex flex-col gap-2">
              {sec.paragraphs.map((t, i) => (
                <p
                  key={i}
                  className="text-[13px] text-[#374151] leading-relaxed"
                >
                  {t}
                </p>
              ))}
            </div>
            {sec.chips && (
              <div className="flex flex-wrap gap-2 mt-3">
                {sec.chips.map((c) => (
                  <span
                    key={c}
                    className="text-[12px] font-semibold text-[#1B5BF0] bg-[#EBF0FF] rounded-full px-3 py-1"
                  >
                    {c}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
