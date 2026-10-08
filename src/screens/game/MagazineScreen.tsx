import { PH } from '@/components/Placeholder'
import { Header } from '@/components/Layout'

// 014-SL-GM-09 라이온즈 매거진
export function MagazineScreen() {
  return (
    <div className="min-h-full bg-[#F5F7FB] pb-4">
      <Header title="라이온즈 매거진" />

      {/* Issues list */}
      <div className="px-4 py-4 pb-4">
        <div className="flex flex-col gap-4">
          {[
            { issue: 'Vol.23', date: '2026.08.04', title: '여름의 끝, 라이온즈의 시작', sub: '홈 관중 100만 돌파 특집 기획' },
            { issue: 'Vol.22', date: '2026.07.04', title: '라이온즈 올스타 스페셜', sub: '올스타전 비하인드 & 선수 화보 수록' },
            { issue: 'Vol.21', date: '2026.06.04', title: '승리의 루틴 — 선수단의 하루', sub: '훈련부터 경기 후까지, 24시간 밀착 취재' },
            { issue: 'Vol.20', date: '2026.05.04', title: '신인들의 반란, 새로운 라이온즈', sub: '2026 신예 선수 집중 조명' },
          ].map((item, i) => (
            <div key={i} className="flex gap-4 bg-white rounded-2xl border border-[#DDE1EC] p-3">
              <PH className="w-20 h-28 rounded-xl shrink-0" />
              <div className="flex-1 flex flex-col justify-center gap-1.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold text-[#1B5BF0] bg-[#EBF0FF] rounded-full px-2 py-0.5">{item.issue}</span>
                </div>
                <p className="text-[13px] font-bold text-[#111827] leading-snug">{item.title}</p>
                <p className="text-[11px] text-[#6B7280] leading-snug">{item.sub}</p>
                <div className="flex items-center justify-between mt-0.5">
                  <p className="text-[10px] text-[#9CA3AF]">{item.date}</p>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" stroke="#9CA3AF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M15 3h6v6" stroke="#9CA3AF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10 14L21 3" stroke="#9CA3AF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
