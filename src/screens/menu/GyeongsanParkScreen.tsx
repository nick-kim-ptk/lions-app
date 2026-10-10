import { PHImage } from "@/components/Placeholder"

import { Header } from "@/components/Layout"

import { GYEONGSAN_PARK as G } from "@/data/club"

// 064-SL-AL-08 경산볼파크

export function GyeongsanParkScreen() {
  return (
    <div className="min-h-full bg-[#F5F7FB] pb-6">
      <Header title="경산볼파크" />
      <PHImage className="h-44" label={G.photos[0]} />
      <div className="px-4 pt-4 flex flex-col gap-5">
        <div>
          <p className="text-[17px] font-bold text-[#0E1A40]">{G.title}</p>
          {G.desc.map((t) => (
            <p key={t} className="mt-2 text-[13px] text-[#374151] leading-relaxed">
              {t}
            </p>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-[15px] font-bold text-[#0E1A40]">시설 구성</p>
          <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">
            {G.facilities.map((f) => (
              <div
                key={f.name}
                className="bg-white rounded-2xl border border-[#DDE1EC] p-3"
              >
                <p className="text-[13px] font-bold text-[#1B5BF0]">{f.name}</p>
                <p className="mt-1 text-[12px] text-[#64748B] leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-[15px] font-bold text-[#0E1A40]">구장 정보</p>
          <div className="bg-white rounded-2xl border border-[#DDE1EC] p-4 flex flex-col gap-2 text-[13px] text-[#374151]">
            {G.spec.map((r) => (
              <div key={r.label} className="flex gap-2">
                <span className="w-16 shrink-0 font-semibold text-[#6B7280]">
                  {r.label}
                </span>
                <span>{r.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-[15px] font-bold text-[#0E1A40]">교통</p>
          <div className="bg-white rounded-2xl border border-[#DDE1EC] p-4 text-[13px] text-[#374151] leading-relaxed">
            {G.traffic}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-[15px] font-bold text-[#0E1A40]">갤러리</p>
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
            {G.photos.slice(1).map((l) => (
              <PHImage key={l} className="h-28" rounded="rounded-xl" label={l} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
