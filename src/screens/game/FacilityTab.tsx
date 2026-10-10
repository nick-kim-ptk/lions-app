import { useState } from "react"

import { FloorMap } from "@/components/FloorMap"

import {
  FACILITIES,
  FACILITY_FLOORS,
  type Facility,
  type FacilityFloor,
} from "@/data/facility"

type FloorSel = "전체" | FacilityFloor

const summary = (f: Facility) => f.sections[0].lines[0]

/** 편의시설 한 줄 카드 (전체·검색 결과용) */
function FacilityRow({ f, onPick }: { f: Facility; onPick: () => void }) {
  return (
    <button
      onClick={onPick}
      className="flex gap-3 text-left rounded-2xl border border-[#DDE1EC] bg-white p-3"
    >
      <span className="w-14 h-14 shrink-0 rounded-xl bg-[#EEF2FB] flex items-center justify-center text-2xl">
        {f.icon}
      </span>
      <div className="flex-1 flex flex-col gap-0.5 justify-center min-w-0">
        <div className="flex items-center gap-1.5">
          <p className="text-[14px] font-bold text-[#111827] truncate">
            {f.name}
          </p>
          <span className="shrink-0 text-[10px] font-semibold text-[#1B5BF0] bg-[#EBF0FF] rounded-full px-2 py-0.5">
            {f.floor}층
          </span>
        </div>
        <p className="text-[12px] text-[#6B7280] truncate">{summary(f)}</p>
      </div>
    </button>
  )
}

// 013-SL-GM-08 편의시설: 검색 · 층 탭 · 시설 리스트 · 평면도 위치 · 상세 안내
export function FacilityTab({
  onZoom,
}: {
  onZoom: (z: { title: string; pin?: { x: number; y: number } }) => void
}) {
  const [floor, setFloor] = useState<FloorSel>("전체")
  const [sel, setSel] = useState<Facility | null>(null)
  const [query, setQuery] = useState("")

  const q = query.trim().toLowerCase()
  const results = q
    ? FACILITIES.filter((f) =>
        [f.name, ...f.sections.flatMap((s) => [s.title ?? "", ...s.lines])].some(
          (t) => t.toLowerCase().includes(q),
        ),
      )
    : []
  const list = FACILITIES.filter((f) => floor === "전체" || f.floor === floor)

  const pickFloor = (fl: FloorSel) => {
    setFloor(fl)
    setSel(fl === "전체" ? null : (FACILITIES.find((f) => f.floor === fl) ?? null))
  }
  const pick = (f: Facility) => {
    setQuery("")
    setFloor(f.floor)
    setSel(f)
  }

  return (
    <div className="py-4 flex flex-col gap-4">
      {/* 검색 */}
      <div className="px-4">
        <div className="flex items-center gap-2 rounded-xl border border-[#DDE1EC] bg-white px-3 py-2.5">
          <span className="text-[14px] text-[#9CA3AF]">🔍</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="시설명, 위치로 검색"
            className="flex-1 min-w-0 bg-transparent text-[14px] text-[#111827] outline-none placeholder:text-[#9CA3AF]"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              aria-label="검색어 지우기"
              className="text-[12px] text-[#9CA3AF]"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* 층 탭 */}
      <div
        className="flex gap-2 overflow-x-auto px-4"
        style={{ scrollbarWidth: "none" }}
      >
        {(["전체", ...FACILITY_FLOORS] as const).map((fl) => (
          <button
            key={fl}
            onClick={() => pickFloor(fl)}
            className={`shrink-0 px-3.5 py-1.5 rounded-full text-[12px] font-semibold border ${
              floor === fl
                ? "bg-[#0E1A40] text-white border-[#0E1A40]"
                : "bg-white text-[#6B7280] border-[#DDE1EC]"
            }`}
          >
            {fl === "전체" ? "전체" : `${fl}층`}
          </button>
        ))}
      </div>

      {q ? (
        <div className="px-4 flex flex-col gap-3">
          <p className="text-[13px] text-[#6B7280]">
            검색 결과{" "}
            <span className="font-bold text-[#0E1A40]">{results.length}</span>곳
          </p>
          {results.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#DDE1EC] bg-white py-10 text-center text-[13px] text-[#9CA3AF]">
              검색 결과가 없습니다.
            </div>
          ) : (
            <div className="flex flex-col gap-2 lg:grid lg:grid-cols-2 lg:gap-3">
              {results.map((f) => (
                <FacilityRow key={f.id} f={f} onPick={() => pick(f)} />
              ))}
            </div>
          )}
        </div>
      ) : floor === "전체" ? (
        <div className="flex flex-col gap-6">
          {FACILITY_FLOORS.map((fl) => {
            const items = FACILITIES.filter((f) => f.floor === fl)

            return (
              <div key={fl} className="px-4 flex flex-col gap-2">
                <div className="flex items-baseline gap-2">
                  <p className="text-[15px] font-bold text-[#0E1A40]">{fl}층</p>
                  <span className="text-[12px] text-[#9CA3AF]">
                    시설 {items.length}곳
                  </span>
                </div>
                <div className="flex flex-col gap-2 lg:grid lg:grid-cols-2 lg:gap-3">
                  {items.map((f) => (
                    <FacilityRow key={f.id} f={f} onPick={() => pick(f)} />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:gap-6 lg:items-start lg:px-4">
          {/* 시설 리스트: 모바일은 가로 스크롤 카드(지도 바로 위), PC는 세로 목록 */}
          <div
            className="flex gap-2 overflow-x-auto px-4 py-1 snap-x scroll-pl-4 lg:flex-col lg:overflow-visible lg:px-0 lg:py-0"
            style={{ scrollbarWidth: "none" }}
          >
            {list.map((f) => (
              <button
                key={f.id}
                onClick={() => pick(f)}
                className={`shrink-0 snap-start w-[168px] lg:w-auto flex flex-col gap-2 lg:flex-row lg:gap-3 text-left rounded-2xl border p-3 bg-white ${
                  sel?.id === f.id
                    ? "border-[#1B5BF0] ring-1 ring-[#1B5BF0]"
                    : "border-[#DDE1EC]"
                }`}
              >
                <span className="w-full h-16 lg:w-14 lg:h-14 shrink-0 rounded-xl bg-[#EEF2FB] flex items-center justify-center text-2xl">
                  {f.icon}
                </span>
                <div className="flex-1 flex flex-col gap-0.5 justify-center min-w-0">
                  <p className="text-[14px] font-bold text-[#111827] truncate">
                    {f.name}
                  </p>
                  <p className="text-[12px] text-[#6B7280] truncate">
                    {summary(f)}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* 위치 지도 + 상세 안내 */}
          <div className="flex flex-col gap-3 px-4 lg:px-0">
            {sel && (
              <>
                <p className="text-[15px] font-bold text-[#0E1A40]">
                  {sel.floor}층 위치
                </p>
                <button
                  onClick={() =>
                    onZoom({
                      title: `${sel.floor}층 편의시설 지도 · ${sel.name}`,
                      pin: { x: sel.x, y: sel.y },
                    })
                  }
                  className="relative block w-full aspect-square rounded-2xl overflow-hidden"
                >
                  <FloorMap
                    label={`${sel.floor}층 평면도 (정사각형, 탭하면 확대)`}
                    pin={{ x: sel.x, y: sel.y }}
                  />
                  <span className="absolute right-2 bottom-2 text-[11px] font-semibold bg-black/55 text-white rounded-full px-2.5 py-1">
                    🔍 확대
                  </span>
                </button>
                <div className="bg-white rounded-2xl border border-[#DDE1EC] p-4 flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{sel.icon}</span>
                    <p className="text-[16px] font-black text-[#0E1A40]">
                      {sel.name}
                    </p>
                    <span className="text-[10px] font-semibold text-[#6B7280] bg-[#F3F4F6] rounded-full px-2 py-0.5">
                      {sel.floor}층
                    </span>
                  </div>
                  {sel.sections.map((sec, i) => (
                    <div key={i} className="flex flex-col gap-1.5">
                      {sec.title && (
                        <p className="text-[13px] font-bold text-[#0E1A40]">
                          {sec.title}
                        </p>
                      )}
                      <ul className="flex flex-col gap-1 text-[13px] text-[#374151] leading-relaxed">
                        {sec.lines.map((l) => (
                          <li key={l} className="flex gap-2">
                            <span className="text-[#1B5BF0] font-bold">·</span>
                            {l}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
