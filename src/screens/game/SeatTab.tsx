import { useState } from "react"

import seatMap from "@/assets/seat-map.jpg"

import { SEAT_GEO, SEAT_MAP_SIZE } from "@/data/seatGeo"
import {
  SEAT_GROUPS,
  TIER_INTRO,
  SEAT_TIERS,
  SEAT_ZONES,
  type SeatGroup,
  type SeatTier,
  type SeatZone,
} from "@/data/seats"

const TIER_IDX: Record<SeatTier, number> = { gray: 0, white: 1, blue: 2 }

const TIER_STYLE: Record<SeatTier, { bg: string; fg: string; hl: string }> = {
  gray: { bg: "#8E8E8E", fg: "#FFFFFF", hl: "#F1F1F1" },
  white: { bg: "#FFFFFF", fg: "#111827", hl: "#F8FAFF" },
  blue: { bg: "#0B5CAD", fg: "#FFFFFF", hl: "#E8F1FB" },
}

const won = (n: number) => `${n.toLocaleString()}원`

const ZOOMS = [1, 1.8, 2.6]

// 013-SL-GM-08 좌석배치: 요금제 선택 · 좌석안내도(구역 클릭) · 구역별 요금 · 전체 요금표
export function SeatTab() {
  const [tier, setTier] = useState<SeatTier | null>(null)
  const [group, setGroup] = useState<SeatGroup | "전체">("전체")
  const [selId, setSelId] = useState<string | null>(null)
  const [zoom, setZoom] = useState(0)
  const [tableOpen, setTableOpen] = useState(false)

  const sel = SEAT_ZONES.find((z) => z.id === selId) ?? null
  const tIdx = tier ? TIER_IDX[tier] : -1
  const chips = SEAT_ZONES.filter((z) => group === "전체" || z.group === group)
  // 스포트라이트: 선택한 구역, 없으면 선택한 층의 모든 구역
  const active = new Set(
    sel
      ? [sel.id]
      : group === "전체"
        ? []
        : SEAT_ZONES.filter((z) => z.group === group).map((z) => z.id),
  )
  const { w, h } = SEAT_MAP_SIZE
  const activeGeo = SEAT_GEO.filter(([id]) => active.has(id))

  const pickGroup = (g: SeatGroup | "전체") => {
    setGroup(g)
    setSelId(null)
  }

  const priceTable = (z: SeatZone) =>
    z.prices ? (
      <div className="overflow-hidden rounded-xl border border-[#DDE1EC]">
        <div className="grid grid-cols-[1fr_repeat(3,72px)] text-[11px] font-bold">
          <div className="bg-[#F3F4F6] px-3 py-2 text-[#6B7280]">구분</div>
          {SEAT_TIERS.map((t) => (
            <div
              key={t.id}
              className="px-1 py-2 text-center"
              style={{
                background: TIER_STYLE[t.id].bg,
                color: TIER_STYLE[t.id].fg,
                borderLeft: "1px solid #DDE1EC",
              }}
            >
              {t.name}
            </div>
          ))}
        </div>
        {z.prices.map((p, i) => (
          <div
            key={i}
            className="grid grid-cols-[1fr_repeat(3,72px)] border-t border-[#EEF0F6] text-[12px]"
          >
            <div className="px-3 py-2.5 text-[#374151] leading-snug">
              {p.label ?? "1석"}
            </div>
            {p.price.map((v, ti) => (
              <div
                key={ti}
                className={`px-1 py-2.5 text-center ${ti === tIdx ? "font-black text-[#0E1A40]" : "text-[#6B7280]"}`}
                style={{
                  background: ti === tIdx ? "#EAF1FF" : undefined,
                  borderLeft: "1px solid #EEF0F6",
                }}
              >
                {v.toLocaleString()}
              </div>
            ))}
          </div>
        ))}
      </div>
    ) : null

  // 입장 요금제 범례 (요금 표 아래): 누르면 해당 요금제 열을 강조
  const tierLegend = (
    <div className="rounded-xl border border-[#DDE1EC] bg-[#F8FAFF] p-3 flex flex-col gap-2">
      <p className="text-[12px] font-bold text-[#0E1A40]">3단계 입장 요금제</p>
      <div className="flex flex-col gap-1.5">
        {SEAT_TIERS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTier(tier === t.id ? null : t.id)}
            className="flex items-center gap-2 text-left"
          >
            <span
              className="w-14 shrink-0 rounded-md border border-[#DDE1EC] py-0.5 text-center text-[11px] font-bold"
              style={{ background: TIER_STYLE[t.id].bg, color: TIER_STYLE[t.id].fg }}
            >
              {t.name}
            </span>
            <span
              className={`text-[12px] ${tier === t.id ? "font-bold text-[#0E1A40]" : "text-[#374151]"}`}
            >
              {t.days}
            </span>
          </button>
        ))}
      </div>
      <p className="text-[11px] leading-relaxed text-[#6B7280]">{TIER_INTRO}</p>
    </div>
  )

  return (
    <div className="py-4 flex flex-col gap-4">
      {/* 층 필터 */}
      <div
        className="flex gap-2 overflow-x-auto px-4"
        style={{ scrollbarWidth: "none" }}
      >
        {(["전체", ...SEAT_GROUPS] as const).map((g) => (
          <button
            key={g}
            onClick={() => pickGroup(g)}
            className={`shrink-0 px-3.5 py-1.5 rounded-full text-[12px] font-semibold border ${
              group === g
                ? "bg-[#0E1A40] text-white border-[#0E1A40]"
                : "bg-white text-[#6B7280] border-[#DDE1EC]"
            }`}
          >
            {g}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-4 lg:grid lg:grid-cols-[1fr_420px] lg:gap-6 lg:items-start lg:px-4">
        {/* 좌석안내도 */}
        <div className="flex flex-col gap-2 px-4 lg:px-0">
          <div className="flex items-center justify-between">
            <p className="text-[15px] font-bold text-[#0E1A40]">좌석안내도</p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setTableOpen(true)}
                className="mr-1 rounded-full border border-[#DDE1EC] bg-white px-3 py-1.5 text-[12px] font-semibold text-[#0E1A40]"
              >
                ⓘ 전체 요금표
              </button>
              <button
                onClick={() => setZoom((z) => Math.max(0, z - 1))}
                disabled={zoom === 0}
                aria-label="축소"
                className="w-8 h-8 rounded-full border border-[#DDE1EC] bg-white text-[16px] disabled:opacity-30"
              >
                −
              </button>
              <button
                onClick={() => setZoom((z) => Math.min(ZOOMS.length - 1, z + 1))}
                disabled={zoom === ZOOMS.length - 1}
                aria-label="확대"
                className="w-8 h-8 rounded-full border border-[#DDE1EC] bg-white text-[16px] disabled:opacity-30"
              >
                +
              </button>
            </div>
          </div>
          <div
            className="overflow-auto rounded-2xl border border-[#DDE1EC] bg-white"
            style={{ maxHeight: zoom === 0 ? undefined : 460 }}
          >
            <div
              className="relative"
              style={{ width: `${ZOOMS[zoom] * 100}%` }}
            >
              <img
                src={seatMap}
                alt="대구삼성라이온즈파크 좌석안내도"
                draggable={false}
                className="block w-full select-none"
              />
              <svg
                viewBox={`0 0 ${w} ${h}`}
                className="absolute inset-0 w-full h-full"
              >
                <defs>
                  <mask id="seat-spot">
                    <rect width={w} height={h} fill="white" />
                    {activeGeo.map(([id, polys]) =>
                      polys.map((p, i) => (
                        <polygon key={`${id}${i}`} points={p} fill="black" />
                      )),
                    )}
                  </mask>
                </defs>
                {active.size > 0 && (
                  <rect
                    width={w}
                    height={h}
                    fill="rgba(255,255,255,0.72)"
                    mask="url(#seat-spot)"
                    pointerEvents="none"
                  />
                )}
                {SEAT_GEO.map(([id, polys]) =>
                  polys.map((p, i) => (
                    <polygon
                      key={`${id}${i}`}
                      points={p}
                      fill="transparent"
                      stroke={active.has(id) ? "#0E1A40" : "none"}
                      strokeWidth={4}
                      strokeLinejoin="round"
                      style={{ cursor: "pointer" }}
                      onClick={() => setSelId(id === selId ? null : id)}
                    />
                  )),
                )}
              </svg>
            </div>
          </div>
          <p className="text-[11px] text-[#9CA3AF]">
            지도의 구역을 누르거나 아래 목록에서 좌석을 선택하세요. +로
            확대하면 좌우·상하로 움직일 수 있습니다.
          </p>
        </div>

        <div className="flex flex-col gap-4 lg:min-w-0">
          {/* 구역 선택 */}
          <div
            className="flex gap-2 overflow-x-auto px-4 py-1 snap-x scroll-pl-4 lg:flex-wrap lg:overflow-visible lg:px-0"
            style={{ scrollbarWidth: "none" }}
          >
            {chips.map((z) => (
              <button
                key={z.id}
                onClick={() => setSelId(z.id === selId ? null : z.id)}
                className={`shrink-0 snap-start flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12px] font-semibold bg-white ${
                  selId === z.id
                    ? "border-[#0E1A40] text-[#0E1A40] ring-1 ring-[#0E1A40]"
                    : "border-[#DDE1EC] text-[#374151]"
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ background: z.color }}
                />
                {z.name}
              </button>
            ))}
          </div>

          {/* 선택 구역 정보 */}
          <div className="px-4 lg:px-0">
            {sel ? (
              <div className="bg-white rounded-2xl border border-[#DDE1EC] p-4 flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <span
                    className="w-3.5 h-3.5 rounded-full shrink-0"
                    style={{ background: sel.color }}
                  />
                  <p className="text-[16px] font-black text-[#0E1A40]">
                    {sel.name}
                  </p>
                  <span className="text-[10px] font-semibold text-[#1B5BF0] bg-[#EBF0FF] rounded-full px-2 py-0.5">
                    {sel.group}
                  </span>
                </div>
                {sel.prices ? (
                  <>
                    <div className="flex items-center justify-between">
                      <p className="text-[13px] font-bold text-[#0E1A40]">
                        요금 <span className="font-normal text-[#9CA3AF]">(원)</span>
                      </p>
                      <button
                        onClick={() => setTableOpen(true)}
                        className="flex items-center gap-1 rounded-full bg-[#EBF0FF] px-2.5 py-1 text-[11px] font-semibold text-[#1B5BF0]"
                      >
                        ⓘ 전체 요금표
                      </button>
                    </div>
                    {priceTable(sel)}
                    <p className="text-[11px] text-[#9CA3AF]">
                      테이블·패밀리·캠핑존은 표기된 인원 기준 1구역 요금입니다.
                    </p>
                    {tierLegend}
                  </>
                ) : (
                  <p className="text-[13px] text-[#6B7280]">{sel.note}</p>
                )}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-[#DDE1EC] bg-white py-8 text-center text-[13px] text-[#9CA3AF]">
                좌석을 선택하면 요금이 표시됩니다.
              </div>
            )}
          </div>

        </div>
      </div>

      {/* 전체 요금표 모달 */}
      {tableOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 lg:p-8"
          onClick={() => setTableOpen(false)}
        >
          <div
            className="flex max-h-[85vh] w-full max-w-[560px] lg:max-w-[720px] flex-col overflow-hidden rounded-3xl bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#EEF0F6]">
              <p className="text-[16px] font-black text-[#0E1A40]">전체 요금표</p>
              <button
                onClick={() => setTableOpen(false)}
                aria-label="닫기"
                className="w-8 h-8 rounded-full bg-[#F3F4F6] text-[16px] leading-none"
              >
                ✕
              </button>
            </div>
            <div className="overflow-y-auto">
              <div className="grid grid-cols-[1fr_repeat(3,62px)] text-[12px] font-bold sticky top-0">
                <div className="bg-[#F3F4F6] px-4 py-2.5 text-[#6B7280]">구분 (원)</div>
                {SEAT_TIERS.map((t) => (
                  <div
                    key={t.id}
                    className="px-1 py-2.5 text-center"
                    style={{ background: TIER_STYLE[t.id].bg, color: TIER_STYLE[t.id].fg }}
                  >
                    {t.name}
                  </div>
                ))}
              </div>
              {SEAT_ZONES.filter((z) => z.prices).map((z) =>
                z.prices!.map((p, i) => (
                  <button
                    key={z.id + i}
                    onClick={() => {
                      setGroup("전체")
                      setSelId(z.id)
                      setTableOpen(false)
                    }}
                    className="grid w-full grid-cols-[1fr_repeat(3,62px)] border-t border-[#EEF0F6] text-left text-[13px]"
                  >
                    <div className="px-4 py-2.5 text-[#374151] leading-snug">
                      <span className="font-semibold">{i === 0 ? z.name : ""}</span>
                      {p.label && (
                        <span className="block text-[11px] text-[#9CA3AF]">{p.label}</span>
                      )}
                    </div>
                    {p.price.map((v, ti) => (
                      <div
                        key={ti}
                        className={`px-1 py-2.5 text-center ${ti === tIdx ? "font-bold text-[#0E1A40]" : "text-[#6B7280]"}`}
                        style={{ background: ti === tIdx && tier ? TIER_STYLE[tier].hl : undefined }}
                      >
                        {v.toLocaleString()}
                      </div>
                    ))}
                  </button>
                )),
              )}
              <div className="border-t border-[#EEF0F6] p-4">{tierLegend}</div>
              <p className="px-4 pb-4 text-[11px] text-[#9CA3AF]">
                행을 누르면 해당 구역을 지도에서 확인합니다. 스윗박스는 요금표에 없어 제외했습니다.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
