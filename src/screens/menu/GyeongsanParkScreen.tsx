import { PHImage } from '@/components/Placeholder'
import { Header } from '@/components/Layout'
import { GYEONGSAN_PARK } from '@/data/club'

// 064-SL-AL-08 경산볼파크
export function GyeongsanParkScreen() {
  return (
    <div className="min-h-full bg-[#F5F7FB] pb-6">
      <Header title="경산볼파크" />
      <PHImage className="h-44" label="경산볼파크 전경" />
      <div className="px-4 pt-4 flex flex-col gap-4">
        <div>
          <p className="text-[17px] font-bold text-[#0E1A40]">{GYEONGSAN_PARK.title}</p>
          <div className="mt-2 flex flex-col gap-2">
            {GYEONGSAN_PARK.desc.map((t, i) => (
              <p key={i} className="text-[13px] text-[#374151] leading-relaxed">{t}</p>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {GYEONGSAN_PARK.facilities.map((f) => (
            <span key={f} className="text-[12px] font-semibold text-[#1B5BF0] bg-[#EBF0FF] rounded-full px-3 py-1">{f}</span>
          ))}
        </div>

        <PHImage className="h-44" rounded="rounded-2xl" label="위치 지도" />

        <div className="flex flex-col gap-3">
          {GYEONGSAN_PARK.info.map((row) => (
            <div key={row.label} className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] p-3">
              <span className="text-xs text-[#9CA3AF]">{row.label}</span>
              <p className="mt-1 text-[13px] text-[#111827] leading-relaxed">{row.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
