import { useState } from "react"

import { Header } from "@/components/Layout"

import { PH } from "@/components/Placeholder"

import {
  AUTHENTIC_SHOP_CATEGORIES,
  AUTHENTIC_SHOP_LIST,
  AuthenticShopCategory,
} from "@/data/shop"

// 111-SL-AL-33 어센틱샵 — 타이틀 + 풀 이미지 배너(더미) + 분류 칩 + 상품 카드 목록
// 상품 카드는 017-SL-TK-01 티켓 페이지의 어센틱 샵 카드(이미지·선수명·상품명·가격)와 같은 구성

export function AuthenticShopScreen() {
  const [category, setCategory] = useState<AuthenticShopCategory>("전체")

  const items = AUTHENTIC_SHOP_LIST.filter(
    (it) => category === "전체" || it.category === category,
  )

  return (
    <div className="min-h-full bg-[#F5F7FB] pb-8">
      <Header title="어센틱샵" />

      {/* 상단 타이틀(PC만 — 모바일은 상단 바와 중복) + 풀 이미지 배너(회색 더미 영역) */}
      <p className="hidden px-4 pt-4 pb-3 text-[18px] font-bold text-[#0E1A40] lg:block">
        어센틱샵
      </p>

      <div className="flex h-[180px] w-full items-center justify-center bg-[#E8EBF4] text-[12px] font-semibold text-[#9CA3AF] lg:h-[280px]">
        배너 이미지 (풀 사이즈)
      </div>

      {/* 분류 칩 */}
      <div
        className="flex gap-2 overflow-x-auto px-4 pt-4"
        style={{ scrollbarWidth: "none" }}
      >
        {AUTHENTIC_SHOP_CATEGORIES.map((c) => (
          <button
            type="button"
            key={c}
            onClick={() => setCategory(c)}
            className={`shrink-0 rounded-full border px-3.5 py-1.5 text-[12px] font-semibold ${
              category === c
                ? "border-[#1B5BF0] bg-[#1B5BF0] text-white"
                : "border-[#DDE1EC] bg-white text-[#64748B]"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* 상품 카드 */}
      <div className="grid grid-cols-2 gap-x-3 gap-y-5 px-4 pt-4 lg:grid-cols-4">
        {items.map((item) => (
          <div key={item.id} className="flex flex-col">
            <PH className="mb-2 aspect-square w-full rounded-2xl" />
            <span className="mb-0.5 text-[10px] font-semibold leading-none text-[#1B5BF0]">
              {item.player}
            </span>
            <span className="mb-1 line-clamp-2 text-[12px] font-medium leading-snug text-[#0E1A40]">
              {item.name}
            </span>
            <span className="text-[13px] font-bold text-[#0E1A40]">
              {item.price}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
