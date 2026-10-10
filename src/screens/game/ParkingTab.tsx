import { useState } from "react"

import dalgubeol from "@/assets/parking-dalgubeol.jpg"
import jeonseolro from "@/assets/parking-jeonseolro.jpg"
import shuttle from "@/assets/parking-shuttle.jpg"
import { PARKING_LOTS } from "@/data/parking"

const MAPS: Record<string, string> = {
  jeonseolro,
  dalgubeol,
  museum: shuttle,
}

// 013-SL-GM-08 주차: 주차장 선택 → 지도(영역 표기) → 안내/배너
export function ParkingTab() {
  const [id, setId] = useState(PARKING_LOTS[0].id)
  const lot = PARKING_LOTS.find((l) => l.id === id)!

  return (
    <div className="flex flex-col gap-4 py-4">
      <div
        className="flex gap-2 overflow-x-auto px-4 py-1 snap-x scroll-pl-4"
        style={{ scrollbarWidth: "none" }}
      >
        {PARKING_LOTS.map((l) => (
          <button
            key={l.id}
            onClick={() => setId(l.id)}
            className={`shrink-0 snap-start rounded-full border px-3.5 py-1.5 text-[12px] font-semibold ${
              id === l.id
                ? "border-[#0E1A40] bg-[#0E1A40] text-white"
                : "border-[#DDE1EC] bg-white text-[#6B7280]"
            }`}
          >
            {l.name}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-4 px-4 lg:grid lg:grid-cols-2 lg:items-start lg:gap-6">
        <div className="flex flex-col gap-3">
          <div className="overflow-hidden rounded-2xl border border-[#DDE1EC] bg-white">
            <img
              src={MAPS[lot.id]}
              alt={`${lot.name} 위치`}
              className="block w-full"
            />
          </div>
          <p className="text-[12px] text-[#6B7280]">
            {lot.id === "museum"
              ? "셔틀버스 승하차 지점(대구미술관 ↔ 삼성라이온즈파크)"
              : "지도의 붉은 영역이 주차장 위치입니다."}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {/* 배너: 지도 바로 아래, 상세 안내보다 먼저 */}
          {lot.banner && (
            <button className="flex items-center justify-between gap-3 rounded-2xl bg-[#1B5BF0] px-4 py-3.5 text-left text-white">
              <span>
                <span className="block text-[14px] font-bold">
                  {lot.banner.title}
                </span>
                <span className="block text-[11px] text-white/80">
                  {lot.banner.desc}
                </span>
              </span>
              <span className="shrink-0 rounded-full bg-white px-3 py-1.5 text-[12px] font-bold text-[#1B5BF0]">
                {lot.banner.cta} ›
              </span>
            </button>
          )}

          <div className="flex flex-col gap-3 rounded-2xl border border-[#DDE1EC] bg-white p-4">
            <div>
              <p className="text-[15px] font-bold text-[#0E1A40]">{lot.name}</p>
              <p className="text-[12px] text-[#6B7280]">{lot.summary}</p>
            </div>
            <div className="flex flex-col gap-2 text-[13px] text-[#374151]">
              {lot.facts.map((f) => (
                <div key={f.label} className="flex gap-2">
                  <span className="w-20 shrink-0 font-semibold text-[#6B7280]">
                    {f.label}
                  </span>
                  <span>{f.value}</span>
                </div>
              ))}
            </div>
            {lot.blocks.map((b, i) => (
              <div key={i} className="rounded-xl bg-[#F8FAFF] p-3">
                {b.title && (
                  <p className="mb-1 text-[12px] font-bold text-[#0E1A40]">
                    {b.title}
                  </p>
                )}
                <ul className="flex flex-col gap-0.5 text-[12px] leading-relaxed text-[#374151]">
                  {b.lines.map((l) => (
                    <li key={l}>· {l}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
