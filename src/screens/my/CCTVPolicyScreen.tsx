import { PH, PHText } from '@/components/Placeholder'
import { Header } from '@/components/Layout'

// 031(033)-SL-MY-04 영상정보처리기기 운영관리방침
export function CCTVPolicyScreen() {
  return (
    <div className="min-h-full bg-[#F5F7FB] pb-4">
      <Header title="영상정보처리기기 운영관리방침" />
      <div className="px-4 pt-4 flex flex-col gap-4">
        {Array.from({length: 6}).map((_, i) => (
          <div key={i}>
            <PH className="w-36 h-4 rounded-full bg-[#D8DCE9] mb-2" />
            <div className="flex flex-col gap-1.5">
              {Array.from({length: 4}).map((_, j) => (
                <PHText key={j} className={j % 3 === 0 ? 'w-full' : j % 3 === 1 ? 'w-4/5' : 'w-2/3'} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
