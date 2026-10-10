import { useState } from "react"

import {
  MAP_LINKS,
  PARK_PLACE,
  TRANSIT_DEST,
  TRANSIT_ORIGINS,
} from "@/data/transit"

const LINE_COLOR: Record<string, string> = {
  "1호선": "#D6001C",
  "2호선": "#00A84D",
  "3호선": "#F29A00",
  대경선: "#1B5BF0",
}

/** 출발 — 노선 — 도착 한 줄 도식 (가운데에 이용 수단 표기) */
function RouteLine({
  from,
  to,
  label,
}: {
  from: string
  to: string
  label: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="relative px-2">
        <div className="mb-2 flex min-h-[40px] flex-col items-center justify-end gap-0.5 text-center text-[13px] leading-tight text-[#111827]">
          {label}
        </div>
        <div className="relative h-4">
          <span className="absolute left-0 right-0 top-1/2 h-[5px] -translate-y-1/2 rounded bg-[#0E1A40]" />
          <span className="absolute left-0 top-0 h-4 w-4 rounded-full bg-[#1B5BF0]" />
          <span className="absolute right-0 top-0 h-4 w-4 rounded-full bg-[#1B5BF0]" />
        </div>
      </div>
      <div className="flex justify-between gap-4 text-[12px] font-semibold text-[#374151]">
        <span className="max-w-[48%] leading-snug">{from}</span>
        <span className="max-w-[48%] text-right leading-snug">{to}</span>
      </div>
    </div>
  )
}

function Card({
  time,
  tag,
  children,
}: {
  time: string
  tag?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-[#DDE1EC] bg-white p-4">
      <div className="flex items-center gap-2">
        <p className="text-[13px] text-[#374151]">
          소요시간 <span className="font-bold text-[#0E1A40]">{time}</span>
        </p>
        {tag && (
          <span className="rounded-full bg-[#FFF7ED] px-2 py-0.5 text-[10px] font-semibold text-[#EA580C]">
            {tag}
          </span>
        )}
      </div>
      {children}
    </div>
  )
}

// 013-SL-GM-08 교통: 지도 앱 연계 · 출발지 선택 · 버스/지하철 경로 도식 · 막차
export function TransitTab() {
  const [oid, setOid] = useState(TRANSIT_ORIGINS[0].id)
  const o = TRANSIT_ORIGINS.find((x) => x.id === oid)!

  return (
    <div className="flex flex-col gap-4 py-4">
      {/* 도착지 + 지도 앱 연계 */}
      <div className="px-4">
        <div className="flex flex-col gap-3 rounded-2xl border border-[#DDE1EC] bg-white p-4">
          <div>
            <p className="text-[15px] font-black text-[#0E1A40]">
              {PARK_PLACE.name}
            </p>
            <p className="text-[12px] text-[#6B7280]">{PARK_PLACE.address}</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {MAP_LINKS.map((m) => (
              <a
                key={m.id}
                href={m.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 rounded-xl border border-[#DDE1EC] py-2.5 text-[13px] font-bold text-[#111827]"
              >
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ background: m.color }}
                />
                {m.name}
              </a>
            ))}
          </div>
          <p className="text-[11px] text-[#9CA3AF]">
            지도 앱에서 현재 위치 기준 길찾기를 이용할 수 있습니다.
          </p>
        </div>
      </div>

      {/* 출발지 선택 */}
      <div className="flex flex-col gap-2">
        <p className="px-4 text-[13px] font-bold text-[#0E1A40]">
          출발지 선택
        </p>
        <div
          className="flex gap-2 overflow-x-auto px-4 snap-x scroll-pl-4"
          style={{ scrollbarWidth: "none" }}
        >
          {TRANSIT_ORIGINS.map((x) => (
            <button
              key={x.id}
              onClick={() => setOid(x.id)}
              className={`shrink-0 snap-start rounded-full border px-3.5 py-1.5 text-[12px] font-semibold ${
                oid === x.id
                  ? "border-[#0E1A40] bg-[#0E1A40] text-white"
                  : "border-[#DDE1EC] bg-white text-[#6B7280]"
              }`}
            >
              {x.name}
            </button>
          ))}
        </div>
        {o.sub && (
          <p className="px-4 text-[12px] text-[#9CA3AF]">{o.sub}</p>
        )}
      </div>

      <div className="flex flex-col gap-5 px-4 lg:grid lg:grid-cols-2 lg:items-start lg:gap-6">
        {/* 버스 */}
        <div className="flex flex-col gap-2">
          <p className="text-[15px] font-bold text-[#0E1A40]">🚌 버스</p>
          {o.bus.map((b) => (
            <Card key={b.stop} time={o.busTime}>
              <RouteLine
                from={b.stop}
                to={TRANSIT_DEST}
                label={b.buses.map((n) => (
                  <span key={n}>
                    <span className="font-bold text-[#1B5BF0]">간선</span>{" "}
                    <span className="font-black">{n}</span>번
                  </span>
                ))}
              />
            </Card>
          ))}
        </div>

        {/* 지하철 */}
        <div className="flex flex-col gap-2">
          <p className="text-[15px] font-bold text-[#0E1A40]">🚇 지하철</p>
          <Card time={o.subway.time} tag={o.subway.extra}>
            <RouteLine
              from={o.subway.from}
              to="수성알파시티역"
              label={
                <span className="flex flex-wrap items-center justify-center gap-1">
                  {o.subway.lines.map((l, i) => (
                    <span key={l} className="flex items-center gap-1">
                      {i > 0 && (
                        <span className="text-[11px] text-[#9CA3AF]">환승</span>
                      )}
                      <span
                        className="rounded-md px-1.5 py-0.5 text-[11px] font-bold text-white"
                        style={{ background: LINE_COLOR[l] ?? "#6B7280" }}
                      >
                        {l}
                      </span>
                    </span>
                  ))}
                </span>
              }
            />
            <p className="text-[12px] leading-relaxed text-[#6B7280]">
              {o.subway.path}
            </p>
            <div className="rounded-xl bg-[#F8FAFF] p-3">
              <p className="mb-1 text-[12px] font-bold text-[#0E1A40]">
                막차 시간
              </p>
              <ul className="flex flex-col gap-0.5 text-[12px] text-[#374151]">
                {o.subway.last.map((l) => (
                  <li key={l}>· {l}</li>
                ))}
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
