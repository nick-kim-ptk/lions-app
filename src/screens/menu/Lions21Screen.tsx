import { PH, PHText, PHTabBar } from '@/components/Placeholder'
import { Header } from '@/components/Layout'

// 068(070)-SL-AL-14 라이온즈 21
export function Lions21Screen() {
  return (
    <div className="min-h-full bg-[#F5F7FB] pb-4">
      <Header title="라이온즈 21" />
      {/* Book cover */}
      <div className="px-4 pt-4 flex justify-center mb-5">
        <PH className="w-48 h-64 rounded-2xl" />
      </div>
      <PHTabBar tabs={['Chapter 1', 'Chapter 2', 'Chapter 3', 'Chapter 4']} />
      <div className="px-4 pt-4 flex flex-col gap-4">
        {Array.from({length: 3}).map((_, i) => (
          <div key={i}>
            <PH className="w-32 h-4 rounded-full bg-[#D8DCE9] mb-3" />
            <div className="flex flex-col gap-2">
              {Array.from({length: 4}).map((_, j) => (
                <PHText key={j} className={j % 2 === 0 ? 'w-full' : 'w-5/6'} />
              ))}
            </div>
            <PH className="w-full h-36 rounded-2xl mt-3" />
          </div>
        ))}
      </div>
    </div>
  )
}
