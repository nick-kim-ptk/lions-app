import { PH, PHText } from '@/components/Placeholder'
import { Header } from '@/components/Layout'

// 056(058)-SL-AL-02 구단 소개
export function AboutClubScreen() {
  return (
    <div className="min-h-full bg-[#F5F7FB] pb-4">
      <Header title="구단 소개" />
      <PH className="w-full h-56 rounded-none" />
      <div className="px-4 pt-5 flex flex-col gap-5">
        {['창단 배경', '구단 가치', '경영 철학'].map((section) => (
          <div key={section}>
            <PH className="w-28 h-4 rounded-full bg-[#D8DCE9] mb-3" />
            <div className="flex flex-col gap-2">
              {Array.from({length: 4}).map((_, i) => (
                <PHText key={i} className={i % 2 === 0 ? 'w-full' : 'w-4/5'} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
