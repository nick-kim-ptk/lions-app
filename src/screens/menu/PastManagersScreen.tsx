import { PHCircle, PHText } from '@/components/Placeholder'
import { Header } from '@/components/Layout'

// 067(069)-SL-AL-13 역대 감독
export function PastManagersScreen() {
  return (
    <div className="min-h-full bg-[#F5F7FB] pb-4">
      <Header title="역대 감독" />
      <div className="px-4 pt-4 flex flex-col gap-3">
        {Array.from({length: 8}).map((_, i) => (
          <div key={i} className="flex gap-4 bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] p-4">
            <PHCircle className="w-14 h-14" />
            <div className="flex-1 flex flex-col gap-1.5 justify-center">
              <PHText className="w-24" />
              <PHText className="w-32" />
              <div className="flex gap-3 mt-1">
                {['승', '패', '무'].map((s) => (
                  <div key={s} className="flex items-center gap-1">
                    <span className="text-[10px] text-[#9CA3AF]">{s}</span>
                    <PHText className="w-8" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
