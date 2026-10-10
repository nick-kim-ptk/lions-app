import { useNavigate } from "react-router-dom"

import { PHImage } from "@/components/Placeholder"

import { Header } from "@/components/Layout"

import {
  ABOUT_FACTS,
  ABOUT_ORG,
  ABOUT_RETIRED,
  ABOUT_SECTIONS,
  ABOUT_SHORTCUTS,
  ABOUT_TITLES,
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

        <div className="flex flex-col gap-2">
          <p className="text-[15px] font-bold text-[#0E1A40]">구단 조직</p>
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
            {ABOUT_ORG.map((o) => (
              <div
                key={o.role}
                className="bg-white rounded-2xl border border-[#DDE1EC] px-4 py-3"
              >
                <p className="text-[11px] font-semibold text-[#1B5BF0]">
                  {o.role}
                </p>
                <p className="mt-1 text-[16px] font-bold text-[#0E1A40]">
                  {o.name}
                </p>
                {o.sub && (
                  <p className="mt-0.5 text-[11px] text-[#9CA3AF]">{o.sub}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-[15px] font-bold text-[#0E1A40]">
            역대 우승 기록 <span className="text-[#1B5BF0]">V1 ~ V8</span>
          </p>
          <div className="flex flex-col gap-2 lg:grid lg:grid-cols-2">
            {ABOUT_TITLES.map((t) => (
              <div
                key={t.v}
                className="flex gap-3 bg-white rounded-2xl border border-[#DDE1EC] p-3.5"
              >
                <div className="shrink-0 w-12 h-12 rounded-xl bg-[#0E1A40] text-white flex flex-col items-center justify-center">
                  <span className="text-[14px] font-black leading-none">
                    {t.v}
                  </span>
                  <span className="mt-0.5 text-[9px] text-white/70">
                    {t.year}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="text-[13px] font-bold text-[#111827] leading-snug">
                    {t.title}
                  </p>
                  <p className="text-[11px] text-[#1B5BF0]">
                    {t.manager} 감독
                  </p>
                  <p className="mt-1 text-[12px] text-[#64748B] leading-relaxed">
                    {t.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-[15px] font-bold text-[#0E1A40]">영구결번</p>
          <div className="flex flex-col gap-2 lg:grid lg:grid-cols-2">
            {ABOUT_RETIRED.map((r) => (
              <div
                key={r.no}
                className="flex gap-3 bg-white rounded-2xl border border-[#DDE1EC] p-3.5"
              >
                <div className="shrink-0 w-14 h-14 rounded-2xl bg-[#EBF0FF] flex flex-col items-center justify-center">
                  <span className="text-[9px] font-bold text-[#1B5BF0]">
                    NO.
                  </span>
                  <span className="text-[22px] font-black leading-none text-[#1B5BF0]">
                    {r.no}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="text-[14px] font-bold text-[#111827]">
                    {r.name}{" "}
                    <span className="text-[11px] font-normal text-[#9CA3AF]">
                      {r.pos} · 지정 {r.date}
                    </span>
                  </p>
                  <p className="mt-1 text-[12px] text-[#64748B] leading-relaxed">
                    {r.desc}
                  </p>
                </div>
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
