import { PH, PHText, PHTabBar } from '@/components/Placeholder'
import { Header } from '@/components/Layout'

// 044(046)-SL-MY-17 예매 안내
export function BookingGuideScreen() {
  return (
    <div className="min-h-full bg-[#F5F7FB] pb-4">
      <Header title="예매 안내" />
      <PHTabBar tabs={['예매 일정', '예매 방법', '취소/환불', '주의사항']} />
      <div className="px-4 pt-4 flex flex-col gap-4">
        {Array.from({length: 5}).map((_, i) => (
          <div key={i} className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] p-4">
            <PH className="w-32 h-4 rounded-full bg-[#D8DCE9] mb-3" />
            <div className="flex flex-col gap-1.5">
              {Array.from({length: 3}).map((_, j) => (
                <PHText key={j} className={j === 0 ? 'w-full' : 'w-4/5'} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
