import { PH, PHText } from '@/components/Placeholder'
import { Header } from '@/components/Layout'

// 062(064)-SL-AL-08 경산볼파크
export function GyeongsanParkScreen() {
  return (
    <div className="min-h-full bg-[#F5F7FB] pb-4">
      <Header title="경산볼파크" />
      <PH className="w-full h-44 rounded-none" />
      <div className="px-4 pt-4 flex flex-col gap-4">
        <PH className="w-48 h-5 rounded-lg" />
        <div className="flex flex-col gap-2">
          {Array.from({length: 4}).map((_, i) => (
            <PHText key={i} className={i % 2 === 0 ? 'w-full' : 'w-3/4'} />
          ))}
        </div>
        {/* Map */}
        <PH className="w-full h-44 rounded-2xl" />
        <div className="flex flex-col gap-3">
          {['주소', '교통편'].map((l) => (
            <div key={l} className="flex gap-3 bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] p-3">
              <PH className="w-8 h-8 rounded-lg shrink-0" />
              <div className="flex flex-col gap-1.5">
                <span className="text-xs text-[#9CA3AF]">{l}</span>
                <PHText className="w-40" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
