import { PH, PHCircle, PHText } from '@/components/Placeholder'
import { Header } from '@/components/Layout'

// 027(029)-SL-LG-12 삼팬 SNS
export function SNSScreen() {
  return (
    <div className="min-h-full bg-[#F5F7FB] pb-4">
      <Header title="삼팬 SNS" />

      {/* Hashtag guide banner */}
      <div className="px-4 pt-4 mb-4">
        <div className="bg-gradient-to-r from-[#EBF0FF] to-[#F5F7FB] rounded-2xl border border-[#1B5BF0]/20 p-4">
          <p className="text-[13px] font-semibold text-[#111827] mb-1.5">
            아래 해시태그를 붙여서 인스타 피드를 올려주시면<br />실시간으로 확인할 수 있어요 📸
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            {['#삼성라이온즈', '#SamsungLions', '#삼팬', '#라이온즈파크', '#직관'].map((tag) => (
              <span key={tag} className="text-[12px] font-semibold text-[#1B5BF0] bg-[#1B5BF0]/10 rounded-full px-3 py-1">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Single column Instagram-style scroll */}
      <div className="flex flex-col gap-4 pb-4">
        {Array.from({length: 6}).map((_, i) => (
          <div key={i} className="bg-[#FFFFFF] border-y border-[#DDE1EC]">
            {/* Post header */}
            <div className="flex items-center gap-3 px-4 py-3">
              <PHCircle className="w-9 h-9" />
              <div className="flex flex-col gap-0.5 flex-1">
                <PHText className="w-24" />
                <PHText className="w-16" />
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="5" r="1" fill="#9CA3AF"/><circle cx="12" cy="12" r="1" fill="#9CA3AF"/><circle cx="12" cy="19" r="1" fill="#9CA3AF"/></svg>
            </div>
            {/* Image */}
            <PH className="w-full aspect-square rounded-none" />
            {/* Actions */}
            <div className="px-4 py-3 flex items-center gap-4">
              <button>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" stroke="#111827" strokeWidth="1.8"/></svg>
              </button>
              <button>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" stroke="#111827" strokeWidth="1.8" strokeLinejoin="round"/></svg>
              </button>
              <button>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" stroke="#111827" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
            {/* Likes & caption */}
            <div className="px-4 pb-4 flex flex-col gap-1.5">
              <PHText className="w-16" />
              <div className="flex gap-2">
                <PHText className="w-20" />
                <PHText className="w-32" />
              </div>
              <PHText className="w-24" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
