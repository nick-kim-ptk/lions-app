import { useState } from "react"

import { PHImage } from "@/components/Placeholder"

import { Header } from "@/components/Layout"

import { LIONS21_CHAPTERS } from "@/data/club"

// 070-SL-AL-14 라이온즈 21 (창단 21주년 기념책자 발췌)

export function Lions21Screen() {
  const [tab, setTab] = useState(0)

  const chapter = LIONS21_CHAPTERS[tab]

  return (
    <div className="min-h-full bg-[#F5F7FB] pb-6">
      <Header title="라이온즈 21" />
      <div className="px-4 pt-4 flex flex-col items-center mb-5">
        <PHImage
          className="h-64 w-48"
          rounded="rounded-2xl"
          label="창단 21주년 기념책자 표지"
        />
        <p className="mt-3 text-[12px] text-[#64748B] text-center leading-relaxed">
          창단 21주년 기념책자의 구성입니다.
        </p>
      </div>
      <div className="flex border-b border-[#DDE1EC] overflow-x-auto">
        {LIONS21_CHAPTERS.map((c, i) => (
          <button
            key={c.tab}
            onClick={() => setTab(i)}
            className={`shrink-0 px-4 py-3 text-sm font-medium border-b-2 ${
              i === tab
                ? "border-[#1B5BF0] text-[#1B5BF0]"
                : "border-transparent text-[#64748B]"
            }`}
          >
            {c.tab}
          </button>
        ))}
      </div>
      <div className="px-4 pt-4 flex flex-col gap-6">
        {chapter.sections?.map((s) => (
          <div key={s.title}>
            <p className="text-[12px] font-bold text-[#1B5BF0] mb-1">
              {s.title}
            </p>
            <p className="text-[15px] font-bold text-[#111827] mb-2">
              {s.sub}
            </p>
            <p className="text-[13px] text-[#374151] leading-relaxed">
              {s.body}
            </p>
            <PHImage
              className="h-36 mt-3"
              rounded="rounded-2xl"
              label={s.imageLabel}
            />
          </div>
        ))}
        {chapter.items && (
          <div className="flex flex-col gap-2 lg:grid lg:grid-cols-2">
            {chapter.items.map((it) => (
              <div
                key={it.no + it.title}
                className="flex items-center gap-3 bg-white rounded-2xl border border-[#DDE1EC] px-4 py-3.5"
              >
                <span className="shrink-0 min-w-14 text-center text-[11px] font-bold text-[#1B5BF0] bg-[#EBF0FF] rounded-full px-2.5 py-1">
                  {it.no}
                </span>
                <span className="text-[14px] font-semibold text-[#111827]">
                  {it.title}
                </span>
              </div>
            ))}
          </div>
        )}
        {chapter.note && (
          <p className="text-[11px] text-[#9CA3AF]">* {chapter.note}</p>
        )}
      </div>
    </div>
  )
}
