import { PH } from "@/components/Placeholder"

import { Header } from "@/components/Layout"

import { PARTNERS } from "@/data/menu"

export function PartnersScreen() {
  return (
    <div className="min-h-full bg-[#F5F7FB] pb-6">
      <Header title="라이온즈 파트너" />

      {/* 소개 배너 */}
      <div className="mx-4 mt-4 mb-5 rounded-2xl bg-gradient-to-br from-[#0E1A40] to-[#1B5BF0] px-5 py-5 flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <circle cx="9" cy="7" r="4" stroke="white" strokeWidth="1.8" />
            <path
              d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <p className="text-white text-[13px] font-medium leading-snug">
          라이온즈의 공식 파트너를
          <br />
          <span className="font-bold">한 눈에 만나보세요!</span>
        </p>
      </div>

      {/* 파트너 카드 그리드 */}
      <div className="px-4 grid grid-cols-2 gap-3">
        {PARTNERS.map((p) => (
          <div
            key={p.name}
            className="bg-white rounded-2xl border border-[#DDE1EC] overflow-hidden"
          >
            {/* 컬러 상단 띠 */}
            <div
              className="h-1.5 w-full"
              style={{ backgroundColor: p.color }}
            />
            <div className="px-4 py-4 flex flex-col gap-2">
              {/* 로고 플레이스홀더 */}
              <div className="h-10 flex items-center">
                <PH className="w-20 h-6 rounded-md" />
              </div>
              {/* 회사명 */}
              <p className="text-[14px] font-bold text-[#0E1A40] leading-snug whitespace-pre-line">
                {p.name}
              </p>
              {/* 카테고리 뱃지 */}
              <span className="self-start text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#EBF0FF] text-[#1B5BF0]">
                {p.category}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
