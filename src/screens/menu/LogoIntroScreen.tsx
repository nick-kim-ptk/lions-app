import { PH, PHText } from '@/components/Placeholder'
import { Header } from '@/components/Layout'

// 058(060)-SL-AL-04 구단 로고
export function LogoIntroScreen() {
  return (
    <div className="min-h-full bg-[#F5F7FB] pb-4">
      <Header title="구단 로고" />
      <div className="px-4 pt-6 flex flex-col gap-6">
        {['워드마크', 'CI / VI', '서브 로고'].map((type) => (
          <div key={type}>
            <p className="text-xs text-[#9CA3AF] mb-3">{type}</p>
            <div className="bg-white rounded-2xl p-8 flex items-center justify-center mb-3">
              <PH className="w-40 h-16 rounded-xl" />
            </div>
            <div className="flex flex-col gap-2">
              <PHText className="w-3/4" />
              <PHText className="w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
