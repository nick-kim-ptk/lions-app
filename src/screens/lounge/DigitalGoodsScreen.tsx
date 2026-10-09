import { useNavigate } from "react-router-dom"

import { useState } from "react"

import { PH } from "@/components/Placeholder"

// 024(026)-SL-LG-07 디지털 굿즈

export function DigitalGoodsScreen() {
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState(0)

  const [wallpaperType, setWallpaperType] = useState<"PC" | "모바일">("PC")

  const [selectedResolutions, setSelectedResolutions] =
    useState<Record<string, string>>({})

  const tabs = ["배경화면", "템플릿", "스티커"]

  const resolutionOptions = {
    PC: ["1920 x 1080", "3840 x 2160"],

    모바일: ["1290 x 2796 (iOS)", "1440 x 3120 (안드로이드)"],
  }

  const wallpaperItems = {
    PC: [
      "2026 블루 웨이브",
      "라이온즈파크 나이트",
      "승리의 순간",
      "레전드 넘버",
    ],

    모바일: [
      "블루 웨이브 잠금화면",
      "오늘도 최강삼성",
      "라이온즈 승리 요정",
      "라팍의 밤",
    ],
  }

  const goodsItems = {
    템플릿: [
      "굿노트 템플릿",
      "직관 노트 템플릿",
      "경기 기록 템플릿",
      "선수 응원 기록지",
    ],

    스티커: [
      "직관 인증 스티커",
      "승리 세리머니 팩",
      "선수 응원 스티커",
      "라팍 데이 스티커",
    ],
  }

  return (
    <div className="min-h-full bg-[#F5F7FB] pb-4">
      {/* Custom header */}
      <div className="sticky top-0 z-20 flex items-center px-4 h-14 gap-3 bg-[#F5F7FB]/95 backdrop-blur-sm border-b border-[#DDE1EC]">
        <button
          onClick={() => navigate("/lounge")}
          className="w-8 h-8 flex items-center justify-center"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 19l-7-7 7-7"
              stroke="#111827"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <h1 className="flex-1 text-[#111827] font-semibold text-[16px]">
          디지털 굿즈
        </h1>
        <button
          onClick={() => navigate("/lounge/digital-guide")}
          className="h-7 px-3 bg-[#1B5BF0]/10 border border-[#1B5BF0]/30 rounded-full flex items-center gap-1.5"
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#1B5BF0" strokeWidth="2" />
            <path
              d="M12 8v4M12 16h.01"
              stroke="#1B5BF0"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <span className="text-[10px] text-[#1B5BF0] font-medium">
            이용 방법
          </span>
        </button>
      </div>

      {/* Tab bar */}
      <div className="sticky top-14 z-10 flex border-b border-[#DDE1EC] bg-white overflow-x-auto">
        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === i
                ? "border-[#1B5BF0] text-[#1B5BF0]"
                : "border-transparent text-[#64748B]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 0 ? (
        <div className="px-4 pt-4">
          <div className="mb-4 grid grid-cols-2 rounded-xl bg-[#E8EBF4] p-1">
            {(["PC", "모바일"] as const).map((type) => (
              <button
                type="button"
                key={type}
                onClick={() => setWallpaperType(type)}
                className={`h-9 rounded-lg text-[12px] font-semibold transition-colors ${
                  wallpaperType === type
                    ? "bg-white text-[#1B5BF0] shadow-sm"
                    : "text-[#64748B]"
                }`}
              >
                {type} 배경화면
              </button>
            ))}
          </div>

          <div
            className={
              wallpaperType === "PC"
                ? "flex flex-col gap-4"
                : "grid grid-cols-2 gap-3"
            }
          >
            {wallpaperItems[wallpaperType].map((title, index) => (
              <div
                key={title}
                className="overflow-hidden rounded-2xl border border-[#DDE1EC] bg-white"
              >
                <div
                  className={`relative overflow-hidden bg-[#E8EBF4] ${
                    wallpaperType === "PC" ? "aspect-video" : "aspect-[9/16]"
                  }`}
                >
                  <PH className="h-full w-full rounded-none" />
                  <span className="absolute bottom-3 right-3 text-[26px] font-black text-white/50">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="p-3">
                  <p className="truncate text-[12px] font-semibold text-[#111827]">
                    {title}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <select
                      value={
                        selectedResolutions[title] ??
                        resolutionOptions[wallpaperType][0]
                      }
                      onChange={(event) =>
                        setSelectedResolutions((selected) => ({
                          ...selected,

                          [title]: event.target.value,
                        }))
                      }
                      aria-label={`${title} 해상도 선택`}
                      className="h-8 min-w-0 flex-1 rounded-lg border border-[#DDE1EC] bg-[#F5F7FB] px-2 text-[10px] font-medium text-[#374151] outline-none"
                    >
                      {resolutionOptions[wallpaperType].map((resolution) => (
                        <option key={resolution} value={resolution}>
                          {resolution}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      aria-label={`${title} ${selectedResolutions[title] ?? resolutionOptions[wallpaperType][0]} 다운로드`}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#1B5BF0] text-white"
                    >
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M12 3v12M7 10l5 5 5-5M5 21h14"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="px-4 pt-4">
          <div className="grid grid-cols-2 gap-3">
            {goodsItems[(tabs[activeTab] as keyof typeof goodsItems)].map(
              (title) => (
                <div
                  key={title}
                  className="overflow-hidden rounded-2xl border border-[#DDE1EC] bg-white"
                >
                  <PH className="aspect-square w-full rounded-none" />
                  <div className="flex items-center justify-between gap-2 p-3">
                    <p className="min-w-0 flex-1 text-[12px] font-semibold leading-snug text-[#111827]">
                      {title}
                    </p>
                    <button
                      type="button"
                      aria-label={`${title} 다운로드`}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#1B5BF0] text-white"
                    >
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M12 3v12M7 10l5 5 5-5M5 21h14"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      )}
    </div>
  )
}
