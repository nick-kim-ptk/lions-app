import { useState } from "react"

import { Header } from "@/components/Layout"

import { PH } from "@/components/Placeholder"

import {
  AUTHENTIC_SHOP_CATEGORIES,
  AUTHENTIC_SHOP_LIST,
  AuthenticShopCategory,
} from "@/data/shop"

// 111-SL-AL-33 어센틱샵 — 상단 배너 + 분류 칩 + 상품 카드 목록
// 상품 카드는 017-SL-TK-01 티켓 페이지의 어센틱 샵 카드(이미지·선수명·상품명·가격)와 같은 구성

export function AuthenticShopScreen() {
  const [category, setCategory] = useState<AuthenticShopCategory>("전체")

  const items = AUTHENTIC_SHOP_LIST.filter(
    (it) => category === "전체" || it.category === category,
  )

  return (
    <div className="min-h-full bg-[#F5F7FB] pb-8">
      <Header title="어센틱샵" />

      {/* 상단 배너 */}
      <div className="px-4 pt-4">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0E1A40] to-[#1B5BF0]">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "repeating-linear-gradient(135deg,transparent,transparent 10px,rgba(255,255,255,0.3) 10px,rgba(255,255,255,0.3) 11px)",
            }}
          />
          <div className="relative flex items-center gap-4 px-5 py-6">
            <div className="flex-1">
              <p className="mb-1 text-[10px] font-bold text-white/60">
                AUTHENTIC SHOP
              </p>
              <p className="text-[18px] font-bold leading-snug text-white">
                삼성라이온즈 어센틱샵
              </p>
              <p className="mt-1 text-[12px] text-white/80">
                선수 기념 유니폼부터 응원 굿즈까지 한곳에서 만나보세요.
              </p>
            </div>
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/15 text-3xl">
              👕
            </div>
          </div>
        </div>
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
