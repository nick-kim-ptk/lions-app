import { PH, PHText } from '@/components/Placeholder'
import { Header } from '@/components/Layout'

// Detail content page template
function DetailContent({ id, title }: { id: string; title: string }) {
  return (
    <div className="min-h-full bg-[#F5F7FB] pb-4">
      <Header title={title} />
      <PH className="w-full h-52 rounded-none" />
      <div className="px-4 pt-5 flex flex-col gap-4">
        <PH className="w-48 h-6 rounded-lg" />
        <div className="flex flex-col gap-2">
          {Array.from({length: 6}).map((_, i) => (
            <PHText key={i} className={i % 3 === 0 ? 'w-full' : i % 3 === 1 ? 'w-4/5' : 'w-3/5'} />
          ))}
        </div>
        <div className="h-px bg-[#DDE1EC]" />
        <div className="flex flex-col gap-2">
          {Array.from({length: 5}).map((_, i) => (
            <PHText key={i} className={i === 0 ? 'w-full' : 'w-5/6'} />
          ))}
        </div>
      </div>
    </div>
  )
}

// 057(059)-SL-AL-03 구단 앰블럼
export function EmblemIntroScreen() {
  return <DetailContent id="059-SL-AL-03" title="구단 앰블럼" />
}
