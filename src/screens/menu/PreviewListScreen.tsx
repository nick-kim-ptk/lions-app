import { useNavigate } from "react-router-dom"

import { PH } from "@/components/Placeholder"

import { Header } from "@/components/Layout"

import { PREVIEW_LIST_ITEMS } from "@/data/menu"

export function PreviewListScreen() {
  const navigate = useNavigate()

  return (
    <div className="min-h-full bg-[#F5F7FB] pb-4">
      <Header title="경기 프리뷰" />
      <div className="px-4 pt-4 flex flex-col gap-4">
        {/* Featured preview */}
        <div
          className="relative rounded-2xl overflow-hidden cursor-pointer"
          onClick={() => navigate("/all/preview-detail")}
        >
          <PH className="w-full h-44 rounded-none" />
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90">
            <p className="text-white text-[14px] font-bold leading-snug mb-1">
              {PREVIEW_LIST_ITEMS[0].title}
            </p>
            <p className="text-white/70 text-[11px]">
              {PREVIEW_LIST_ITEMS[0].date}
            </p>
          </div>
        </div>
        {/* Preview list */}
        {PREVIEW_LIST_ITEMS.slice(1).map((item, i) => (
          <div
            key={i}
            onClick={() => navigate("/all/preview-detail")}
            className="cursor-pointer bg-white rounded-2xl p-4 flex gap-3 items-center shadow-sm"
          >
            <div className="w-20 h-16 rounded-xl overflow-hidden flex-shrink-0">
              <PH className="w-full h-full rounded-none" />
            </div>
            <div className="flex-1 flex flex-col gap-1.5">
              <p className="text-[13px] font-semibold text-[#0E1A40] leading-snug line-clamp-2">
                {item.title}
              </p>
              <p className="text-[11px] text-[#9CA3AF]">{item.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
