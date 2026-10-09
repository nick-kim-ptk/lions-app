import { PHCircle, PHImage } from "@/components/Placeholder"

import { Header } from "@/components/Layout"

import { BLUE_MATES, SNS_POSTS } from "@/data/lounge"

// 027(029)-SL-LG-12 블루메이트 1기

export function SNSScreen() {
  return (
    <div className="min-h-full bg-[#F5F7FB] pb-4">
      <Header title="블루메이트 1기" />

      {/* 블루메이트 1기 — 좌우로 드래그하는 프로필 카드 */}
      <div className="pt-4 mb-4">
        <p className="px-4 text-[13px] font-semibold text-[#111827] mb-3">
          블루메이트 1기로 선정되신 분들입니다
        </p>
        <div
          className="flex gap-3 overflow-x-auto px-4 pb-1 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none" }}
        >
          {BLUE_MATES.map((mate) => (
            <div
              key={mate.handle}
              className="snap-start shrink-0 w-[148px] bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] p-4 flex flex-col items-center text-center"
            >
              <PHCircle className="w-16 h-16" />
              <p className="mt-3 text-[13px] font-bold text-[#111827]">
                {mate.name}
              </p>
              <p className="text-[11px] text-[#9CA3AF] truncate w-full">
                @{mate.handle}
              </p>
              <p className="mt-1 text-[10px] text-[#64748B] truncate w-full">
                {mate.desc}
              </p>
              <button
                onClick={() =>
                  window.open(
                    `https://www.instagram.com/${mate.handle}/`,
                    "_blank",
                    "noopener,noreferrer",
                  )
                }
                className="mt-3 h-8 w-full rounded-lg bg-[#1B5BF0] text-white text-[11px] font-bold"
              >
                인스타 이동
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Single column Instagram-style scroll */}
      <div className="flex flex-col gap-4 pb-4">
        {SNS_POSTS.map((post) => (
          <div
            key={post.user + post.time}
            className="bg-[#FFFFFF] border-y border-[#DDE1EC]"
          >
            {/* Post header */}
            <div className="flex items-center gap-3 px-4 py-3">
              <PHCircle className="w-9 h-9" />
              <div className="flex flex-col gap-0.5 flex-1">
                <span className="text-[13px] font-semibold text-[#111827]">
                  {post.user}
                </span>
                <span className="text-[11px] text-[#9CA3AF]">
                  {post.time} · Instagram
                </span>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="5" r="1" fill="#9CA3AF" />
                <circle cx="12" cy="12" r="1" fill="#9CA3AF" />
                <circle cx="12" cy="19" r="1" fill="#9CA3AF" />
              </svg>
            </div>
            {/* Image */}
            <PHImage className="aspect-square" label={post.imageLabel} />
            {/* Actions */}
            <div className="px-4 py-3 flex items-center gap-4">
              <button>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
                    stroke="#111827"
                    strokeWidth="1.8"
                  />
                </svg>
              </button>
              <button>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z"
                    stroke="#111827"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13"
                    stroke="#111827"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            {/* Likes & caption */}
            <div className="px-4 pb-4 flex flex-col gap-1.5">
              <span className="text-[12px] font-semibold text-[#111827]">
                좋아요 {post.likes}개
              </span>
              <p className="text-[13px] text-[#111827] leading-snug">
                <span className="font-semibold">{post.user}</span>{" "}
                {post.caption}
              </p>
              <p className="text-[12px] text-[#1B5BF0]">
                {post.tags.join(" ")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
