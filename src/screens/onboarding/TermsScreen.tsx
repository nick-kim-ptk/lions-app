import { useNavigate } from 'react-router-dom'
import { PHText } from '@/components/Placeholder'
import { Page } from '@/components/Layout'

// 091-SL-CM-06 블루멤버십 회원 약관 — 내용만 보기, 동의 체크 없음
export function TermsScreen() {
  const navigate = useNavigate()
  return (
    <Page>
      <div className="px-5 pt-14 pb-4 flex items-center gap-2">
        <button onClick={() => navigate(-1)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M15 19l-7-7 7-7" stroke="#111827" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        <span className="text-[#111827] font-semibold">블루멤버십 이용약관</span>
      </div>
      {/* 약관 내용만 표시 — 동의 체크 없음 */}
      <div className="flex-1 px-5 pb-8 overflow-y-auto">
        <p className="text-xs text-[#9CA3AF] mb-4">최종 수정일: 2025년 01월 01일</p>
        <div className="flex flex-col gap-5">
          {[
            { article: '제1조 (목적)', lines: 3 },
            { article: '제2조 (정의)', lines: 4 },
            { article: '제3조 (회원가입 및 이용계약)', lines: 3 },
            { article: '제4조 (서비스의 제공 및 변경)', lines: 5 },
            { article: '제5조 (서비스 이용 제한)', lines: 3 },
            { article: '제6조 (개인정보 보호)', lines: 2 },
            { article: '제7조 (면책조항)', lines: 4 },
            { article: '제8조 (분쟁해결)', lines: 2 },
          ].map(({ article, lines }, i) => (
            <div key={i} className="flex flex-col gap-2">
              <p className="text-sm text-[#111827] font-semibold">{article}</p>
              <div className="flex flex-col gap-1.5 pl-2">
                {Array.from({length: lines}).map((_, j) => (
                  <PHText key={j} className={j % 2 === 0 ? 'w-full' : 'w-4/5'} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* 닫기 버튼 — 하단 플로팅 */}
      <div className="sticky bottom-0 bg-white border-t border-[#DDE1EC] px-5 pt-4 pb-10">
        <button onClick={() => navigate(-1)} className="w-full h-14 rounded-2xl bg-[#FFFFFF] border border-[#DDE1EC] text-[#111827] font-medium">
          닫기
        </button>
      </div>
    </Page>
  )
}
