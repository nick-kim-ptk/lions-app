import { PH } from '@/components/Placeholder'
import { Header } from '@/components/Layout'
import { YOUTUBE_FEATURED, YOUTUBE_VIDEOS } from '@/data/game'

// 012-SL-GM-07 유튜브 콘텐츠 — 카테고리 없이 연속 리스트
export function YoutubeScreen() {
  return (
    <div className="min-h-full bg-[#F5F7FB] pb-6">
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
            <p className="text-white text-[13px] font-bold leading-snug mb-1">{YOUTUBE_FEATURED.title}</p>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-white/70">{YOUTUBE_FEATURED.channel} · 조회수 {YOUTUBE_FEATURED.views} · {YOUTUBE_FEATURED.date}</span>
              <div className="bg-black/50 rounded px-1.5 ml-auto">
                <span className="text-[9px] text-white">{YOUTUBE_FEATURED.duration}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Continuous list — no category tabs */}
      <div className="px-4 flex flex-col gap-4">
        {YOUTUBE_VIDEOS.map((v) => (
          <div key={v.title} className="flex gap-3">
            <div className="relative shrink-0 w-36 h-24 rounded-xl overflow-hidden">
              <PH className="w-full h-full rounded-none" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-7 h-7 rounded-full bg-black/60 flex items-center justify-center">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
                </div>
              </div>
              <div className="absolute bottom-1 right-1 bg-black/70 rounded px-1">
                <span className="text-[8px] text-white">{v.duration}</span>
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-1 justify-center min-w-0">
              <p className="text-[13px] font-semibold text-[#111827] leading-snug line-clamp-2">{v.title}</p>
              <p className="text-[11px] text-[#9CA3AF]">조회수 {v.views} · {v.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
