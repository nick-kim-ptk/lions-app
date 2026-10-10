import { useNavigate } from "react-router-dom"

import { PHImage } from "@/components/Placeholder"

import { Header } from "@/components/Layout"

import {
  ABOUT_FACTS,
  ABOUT_SECTIONS,
  ABOUT_SHORTCUTS,
  ABOUT_VISION,
} from "@/data/club"

// 058-SL-AL-02 구단 소개

export function AboutClubScreen() {
  const navigate = useNavigate()

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

      <div className="px-4 pt-5 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <p className="text-[15px] font-bold text-[#0E1A40]">
            숫자로 보는 라이온즈
          </p>
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
            {ABOUT_FACTS.map((f) => (
              <div
                key={f.label}
                className="bg-white rounded-2xl border border-[#DDE1EC] px-4 py-4"
              >
                <p className="text-[26px] font-black leading-none text-[#1B5BF0]">
                  {f.value}
                  <span className="ml-0.5 text-[13px] font-bold text-[#0E1A40]">
                    {f.unit}
                  </span>
                </p>
                <p className="mt-2 text-[11px] text-[#6B7280]">{f.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl bg-gradient-to-br from-[#0E1A40] to-[#1B5BF0] p-5 text-white flex flex-col gap-3">
          <span className="text-[11px] font-bold tracking-widest text-white/70">
            VISION
          </span>
          <div>
            <p className="text-[26px] font-black leading-tight">
              {ABOUT_VISION.phrase}
            </p>
            <p className="mt-1 text-[13px] text-white/85">
              {ABOUT_VISION.desc}
            </p>
            <p className="mt-1 text-[12px] text-white/70">
              선수단 슬로건 {ABOUT_VISION.team}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {ABOUT_VISION.values.map((v) => (
              <span
                key={v}
                className="text-[12px] font-semibold bg-white/15 rounded-full px-3 py-1"
              >
                {v}
              </span>
            ))}
          </div>
        </div>

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
          </div>
        ))}

        <div className="flex flex-col gap-2">
          <p className="text-[15px] font-bold text-[#0E1A40]">
            라이온즈 더 알아보기
          </p>
          <div className="grid grid-cols-4 gap-2">
            {ABOUT_SHORTCUTS.map((s) => (
              <button
                key={s.path}
                onClick={() => navigate(s.path)}
                className="bg-white rounded-2xl border border-[#DDE1EC] py-3 flex flex-col items-center gap-1.5"
              >
                <span className="text-[22px]">{s.icon}</span>
                <span className="text-[11px] font-semibold text-[#374151] text-center leading-tight">
                  {s.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
