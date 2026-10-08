import { useNavigate, useLocation } from 'react-router-dom'
import { PH } from '@/components/Placeholder'
import { Header } from '@/components/Layout'
import { MEDIA_PRESS_POSTS } from '@/data/menu'

// 103-SL-AL-36 언론사 전용 PRESS 센터 상세
export function MediaPressCenterDetailScreen() {
  const navigate = useNavigate()
  const location = useLocation()
  const postId = Number(new URLSearchParams(location.search).get('id') ?? '1')
  const post = MEDIA_PRESS_POSTS.find(item => item.id === postId) ?? MEDIA_PRESS_POSTS[0]

  return (
    <div className="min-h-full bg-[#F5F7FB] pb-6">
      <Header title="PRESS 센터" />
      <div className="flex flex-col gap-4 px-4 pt-5">
        <div className="flex items-center gap-2">
          <span className="rounded bg-[#EBF0FF] px-2 py-1 text-[10px] font-semibold text-[#1B5BF0]">{post.category}</span>
          <span className="text-[11px] text-[#9CA3AF]">{post.date}</span>
          <span className="ml-auto rounded-full bg-[#0E1A40] px-2 py-1 text-[9px] font-bold text-white">언론사 전용</span>
        </div>

        <h2 className="text-[18px] font-bold leading-snug text-[#111827]">{post.title}</h2>
        <div className="h-px bg-[#DDE1EC]" />
        <div className="aspect-video overflow-hidden rounded-2xl border border-[#DDE1EC] bg-white">
          <PH className="h-full w-full rounded-none" />
        </div>
        <div className="flex flex-col gap-4 text-[14px] leading-relaxed text-[#374151]">
          {post.content.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
          <p>감사합니다.</p>
        </div>

        <div className="rounded-2xl border border-[#DDE1EC] bg-white p-4">
          <p className="text-[12px] font-bold text-[#111827]">첨부 자료</p>
          <button type="button" className="mt-3 flex w-full items-center gap-3 rounded-xl bg-[#F5F7FB] px-3 py-3 text-left">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EBF0FF] text-[#1B5BF0]">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                <path d="M12 3v12M7 10l5 5 5-5M5 21h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <p className="text-[12px] font-semibold text-[#111827]">PRESS_자료_{post.id}.zip</p>
              <p className="mt-0.5 text-[10px] text-[#9CA3AF]">보도자료 및 고해상도 이미지</p>
            </div>
          </button>
        </div>

        <button
          type="button"
          onClick={() => navigate('/all/media-press-center')}
          className="h-12 w-full rounded-2xl bg-[#111827] text-[14px] font-bold text-white"
        >
          목록
        </button>
      </div>
    </div>
  )
}
