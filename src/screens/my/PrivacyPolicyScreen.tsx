import { PH, PHText } from '@/components/Placeholder'
import { Header } from '@/components/Layout'

// 030(032)-SL-MY-03 개인정보 처리방침
export function PrivacyPolicyScreen() {
  return (
    <div className="min-h-full bg-[#F5F7FB] pb-4">
      <Header title="개인정보 처리방침" />
      <div className="px-4 pt-4">
        <PHText className="w-32 mb-4" />
        <div className="flex flex-col gap-4">
          {Array.from({length: 8}).map((_, i) => (
            <div key={i}>
              <div className="flex flex-col gap-2 mb-2">
                <PH className="w-40 h-4 rounded-full bg-[#D8DCE9]" />
              </div>
              <div className="flex flex-col gap-2">
                {Array.from({length: i % 2 === 0 ? 3 : 5}).map((_, j) => (
                  <PHText key={j} className={j % 2 === 0 ? 'w-full' : 'w-4/5'} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
