import { PH, PHText, PHSection } from '@/components/Placeholder'
import { Header } from '@/components/Layout'

// 059(061)-SL-AL-05 구단 마스코트
export function MascotScreen() {
  return (
    <div className="min-h-full bg-[#F5F7FB] pb-4">
      <Header title="구단 마스코트" />
      <div className="px-4 pt-4 flex flex-col gap-6">
        <PH className="w-full h-64 rounded-3xl" />
        <div className="flex flex-col gap-3">
          <PH className="w-32 h-5 rounded-lg" />
          <div className="flex flex-col gap-2">
            {Array.from({length: 5}).map((_, i) => (
              <PHText key={i} className={i % 2 === 0 ? 'w-full' : 'w-4/5'} />
            ))}
          </div>
        </div>
        {/* Mascot family */}
        <PHSection label="블레오 패밀리" />
        <div className="flex gap-3 overflow-x-auto pb-1">
          {Array.from({length: 5}).map((_, i) => (
            <div key={i} className="shrink-0 flex flex-col items-center gap-2">
              <PH className="w-24 h-28 rounded-2xl" />
              <PHText className="w-16" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
