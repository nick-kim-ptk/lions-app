import { useState } from "react"

import { Header } from "@/components/Layout"

import { CHEER_MEMBERS } from "@/data/menu"

// 065(067)-SL-AL-11 응원단 소개

export function CheerSquadScreen() {
  const [tab, setTab] = useState<keyof typeof CHEER_MEMBERS>("응원단장")

  const members = CHEER_MEMBERS[tab]

  return (
    <div className="min-h-full bg-[#F5F7FB] pb-6">
      <Header title="응원단 소개" />

      {/* 탭 */}
      <div className="flex px-4 pt-3 gap-2 border-b border-[#DDE1EC]">
        {(Object.keys(CHEER_MEMBERS) as keyof typeof CHEER_MEMBERS[]).map(
          (t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`pb-3 px-1 text-[13px] font-semibold border-b-2 transition-colors ${
                tab === t
                  ? "border-[#1B5BF0] text-[#1B5BF0]"
                  : "border-transparent text-[#9CA3AF]"
              }`}
            >
              {t}
            </button>
          ),
        )}
      </div>

      <div className="px-4 pt-4 flex flex-col gap-4">
        {members.map((m) => (
          <div
            key={m.name}
            className="bg-[#FFFFFF] rounded-3xl border border-[#DDE1EC] overflow-hidden"
          >
            {/* 이미지 영역 */}
            <div
              className="relative w-full bg-gradient-to-b from-[#EBF0FF] to-[#D6E0FA]"
              style={{ height: 220 }}
            >
              <div className="absolute inset-0 flex items-end justify-center">
                <span
                  style={{ fontSize: 100, lineHeight: 1, paddingBottom: 16 }}
                >
                  {m.emoji}
                </span>
              </div>
              <div className="absolute top-4 right-4 bg-[#1B5BF0] rounded-full px-3 py-1">
                <span className="text-white text-[10px] font-bold">
                  {m.career}
                </span>
              </div>
            </div>

            {/* 이름 + 직책 */}
            <div className="px-5 pt-4 pb-3 border-b border-[#F1F3F8]">
              <p className="text-[10px] text-[#9CA3AF] mb-0.5">{m.role}</p>
              <p className="text-[22px] font-black text-[#111827] leading-none">
                {m.name}
              </p>
            </div>

            {/* 좌우명 */}
            <div className="px-5 pt-3 pb-2.5 border-b border-[#F1F3F8]">
              <p className="text-[10px] font-semibold text-[#9CA3AF] mb-1">
                좌우명
              </p>
              <p className="text-[13px] font-bold text-[#1B5BF0]">
                "{m.motto}"
              </p>
            </div>

            {/* 시즌 각오 */}
            <div className="px-5 pt-3 pb-4">
              <p className="text-[10px] font-semibold text-[#9CA3AF] mb-1">
                시즌 각오
              </p>
              <p className="text-[12px] text-[#374151] leading-relaxed">
                {m.resolution}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
