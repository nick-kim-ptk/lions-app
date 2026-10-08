import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Header } from '@/components/Layout'
import { PRESS_POSTS } from '@/data/menu'

// 100-SL-AL-33 이슈와 팩트
export function PressCenterScreen() {
  const navigate = useNavigate()
  const [category, setCategory] = useState<'전체' | '공지' | '알려드립니다'>('전체')
  const filteredPosts = PRESS_POSTS.filter(post => category === '전체' || post.category === category)

  return (
    <div className="min-h-full bg-[#F5F7FB] pb-6">
      <Header title="이슈와 팩트" />

      <div className="px-4 pt-4">
        <div className="rounded-2xl bg-gradient-to-br from-[#0E1A40] to-[#1B5BF0] p-5 text-white">
          <p className="text-[18px] font-bold">삼성라이온즈 이슈와 팩트</p>
          <p className="mt-3 text-[12px] leading-relaxed text-white/80">
            언론과 온라인에서 접하는 삼성라이온즈 관련 각종 이슈에 대해 구단 측 입장을 가장 빠르고 정확하게 알려 드리는 공간입니다.
          </p>
          <div className="mt-4 flex flex-col gap-2.5 border-t border-white/15 pt-4">
            <p className="text-[11px] leading-relaxed text-white/70">
              <span className="font-bold text-white">&lt;공지&gt;</span>는 삼성라이온즈 관련 각종 이슈에 대한 설명과 신속하게 알려야 할 사항을 제공하는 곳이며,
            </p>
            <p className="text-[11px] leading-relaxed text-white/70">
              <span className="font-bold text-white">&lt;알려드립니다&gt;</span>는 언론의 오보나 온라인에 떠도는 루머에 대한 정확한 사실관계를 밝히는 코너입니다.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex gap-5 border-b border-[#DDE1EC] px-4">
        {(['전체', '공지', '알려드립니다'] as const).map(tab => (
          <button
            type="button"
            key={tab}
            onClick={() => setCategory(tab)}
            className={`border-b-2 pb-3 text-[13px] font-semibold transition-colors ${
              category === tab
                ? 'border-[#1B5BF0] text-[#1B5BF0]'
                : 'border-transparent text-[#9CA3AF]'
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
            onClick={() => navigate(`/all/press-center-detail?id=${post.id}`)}
            className={`flex w-full flex-col gap-1.5 border-b border-[#DDE1EC] py-4 text-left ${
              post.important ? 'bg-[#F0F4FF] px-3' : ''
            }`}
          >
            <div className="flex items-center gap-2">
              {post.important && (
                <span className="rounded bg-[#E53935] px-1.5 py-0.5 text-[9px] font-bold text-white">중요</span>
              )}
              <span className={`rounded px-1.5 py-0.5 text-[10px] font-semibold ${
                post.category === '공지'
                  ? 'bg-[#EBF0FF] text-[#1B5BF0]'
                  : 'bg-[#FFF8E1] text-[#B45309]'
              }`}>
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
