import { PH, PHText } from '@/components/Placeholder'
import { Header } from '@/components/Layout'

// 012-SL-GM-07 유튜브 콘텐츠 — 카테고리 없이 연속 리스트
export function YoutubeScreen() {
  return (
    <div className="min-h-full bg-[#F5F7FB] pb-4">
      <Header title="유튜브 콘텐츠" />

      {/* Featured (top) */}
      <div className="px-4 py-3">
        <div className="relative rounded-2xl overflow-hidden">
          <PH className="w-full h-52 rounded-none" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-[#E53935] flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90">
            <PHText className="w-3/4 mb-1" />
            <div className="flex items-center gap-2">
              <PHText className="w-20" />
              <div className="bg-black/50 rounded px-1.5">
                <span className="text-[9px] text-white">07:42</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Continuous list — no category tabs */}
      <div className="px-4 flex flex-col gap-4">
        {Array.from({length: 10}).map((_, i) => (
          <div key={i} className="flex gap-3">
            <div className="relative shrink-0 w-36 h-24 rounded-xl overflow-hidden">
              <PH className="w-full h-full rounded-none" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-7 h-7 rounded-full bg-black/60 flex items-center justify-center">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
                </div>
              </div>
              <div className="absolute bottom-1 right-1 bg-black/70 rounded px-1">
                <span className="text-[8px] text-white">{`0${(i % 9) + 1}:${(i * 13 + 24) % 60}`.padStart(5,'0')}</span>
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-1.5 justify-center">
              <PHText className="w-full" />
              <PHText className="w-4/5" />
              <div className="flex gap-2 mt-0.5">
                <PHText className="w-16" />
                <PHText className="w-12" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
