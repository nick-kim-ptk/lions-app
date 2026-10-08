import { useNavigate, useLocation } from 'react-router-dom'
import { PH } from '@/components/Placeholder'
import { Header } from '@/components/Layout'
import { PRESS_POSTS } from '@/data/menu'

// 101-SL-AL-34 이슈와 팩트 상세
export function PressCenterDetailScreen() {
  const navigate = useNavigate()
  const location = useLocation()
  const postId = Number(new URLSearchParams(location.search).get('id') ?? '1')
  const post = PRESS_POSTS.find(item => item.id === postId) ?? PRESS_POSTS[0]

  return (
    <div className="min-h-full bg-[#F5F7FB] pb-6">
      <Header title="이슈와 팩트" />
      <div className="flex flex-col gap-4 px-4 pt-5">
        <div className="flex items-center gap-2">
          <span className={`rounded px-2 py-1 text-[10px] font-semibold ${
            post.category === '공지'
              ? 'bg-[#EBF0FF] text-[#1B5BF0]'
              : 'bg-[#FFF8E1] text-[#B45309]'
          }`}>
            {post.category}
          </span>
          <span className="text-[11px] text-[#9CA3AF]">{post.date}</span>
        </div>

        <h2 className="text-[18px] font-bold leading-snug text-[#111827]">{post.title}</h2>
        <div className="h-px bg-[#DDE1EC]" />

        <div className="aspect-video overflow-hidden rounded-2xl border border-[#DDE1EC] bg-white">
          <PH className="h-full w-full rounded-none" />
        </div>

        <div className="flex flex-col gap-4 text-[14px] leading-relaxed text-[#374151]">
          {post.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
          <p>감사합니다.</p>
        </div>

        <button
          type="button"
          onClick={() => navigate('/all/press-center')}
          className="h-12 w-full rounded-2xl bg-[#111827] text-[14px] font-bold text-white"
        >
          목록
        </button>
      </div>
    </div>
  )
}
