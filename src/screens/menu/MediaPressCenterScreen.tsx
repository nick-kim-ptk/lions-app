import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Header } from '@/components/Layout'
import { MEDIA_PRESS_POSTS } from '@/data/menu'

// 102-SL-AL-35 언론사 전용 PRESS 센터
export function MediaPressCenterScreen() {
  const navigate = useNavigate()
  const [category, setCategory] = useState<'전체' | '보도자료' | '미디어 공지' | '사진자료'>('전체')
  const filteredPosts = MEDIA_PRESS_POSTS.filter(post => category === '전체' || post.category === category)

  return (
    <div className="min-h-full bg-[#F5F7FB] pb-6">
      <Header title="PRESS 센터" />

      <div className="px-4 pt-4">
        <div className="rounded-2xl border border-[#1B5BF0]/20 bg-[#EBF0FF] p-4">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-[#1B5BF0] px-2.5 py-1 text-[10px] font-bold text-white">언론사 전용</span>
            <p className="text-[15px] font-bold text-[#111827]">삼성라이온즈 PRESS 센터</p>
          </div>
          <p className="mt-3 text-[12px] leading-relaxed text-[#64748B]">
            승인된 언론사를 대상으로 공식 보도자료, 취재 안내, 고해상도 사진 자료를 제공하는 공간입니다.
          </p>
        </div>
      </div>

      <div className="mt-4 flex gap-4 overflow-x-auto border-b border-[#DDE1EC] px-4">
        {(['전체', '보도자료', '미디어 공지', '사진자료'] as const).map(tab => (
          <button
            type="button"
            key={tab}
            onClick={() => setCategory(tab)}
            className={`shrink-0 border-b-2 pb-3 text-[13px] font-semibold transition-colors ${
              category === tab ? 'border-[#1B5BF0] text-[#1B5BF0]' : 'border-transparent text-[#9CA3AF]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="px-4">
        {filteredPosts.map(post => (
          <button
            type="button"
            key={post.id}
            onClick={() => navigate(`/all/media-press-center-detail?id=${post.id}`)}
            className="flex w-full flex-col gap-1.5 border-b border-[#DDE1EC] py-4 text-left"
          >
            <div className="flex items-center gap-2">
              <span className="rounded bg-[#EBF0FF] px-1.5 py-0.5 text-[10px] font-semibold text-[#1B5BF0]">
                {post.category}
              </span>
              <span className="ml-auto text-[10px] text-[#9CA3AF]">{post.date}</span>
            </div>
            <p className="text-[14px] font-semibold leading-snug text-[#111827]">{post.title}</p>
            <p className="line-clamp-2 text-[11px] leading-relaxed text-[#64748B]">{post.summary}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
