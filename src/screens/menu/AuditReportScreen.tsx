import { Header } from '@/components/Layout'

// 071(073)-SL-AL-17 외부감사 보고서
export function AuditReportScreen() {
  return (
    <div className="min-h-full bg-[#F5F7FB] pb-4">
      <Header title="외부감사 보고서" />

      {/* 상단 문구 */}
      <div className="px-4 pt-5 pb-4">
        <p className="text-[13px] text-[#64748B] text-center">투명한 경영을 바탕으로 팬과의 신뢰를 이어갑니다.</p>
      </div>

      {/* 보고서 목록 */}
      <div className="px-4 flex flex-col gap-2.5">
        {[
          { year: '2025', date: '2026.03.31' },
          { year: '2024', date: '2025.03.31' },
          { year: '2023', date: '2024.03.29' },
          { year: '2022', date: '2023.03.31' },
          { year: '2021', date: '2022.03.31' },
          { year: '2020', date: '2021.03.31' },
        ].map((item) => (
          <div key={item.year} className="flex items-center gap-3 bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] p-4">
            <div className="w-10 h-10 rounded-xl bg-[#EBF0FF] flex items-center justify-center shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="#1B5BF0" strokeWidth="1.5"/>
                <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="#1B5BF0" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-[13px] font-semibold text-[#0E1A40]">{item.year}년 감사보고서</p>
              <p className="text-[11px] text-[#9CA3AF] mt-0.5">등록일 {item.date}</p>
            </div>
            <button className="flex items-center gap-1.5 h-8 px-3 rounded-xl bg-[#EBF0FF] shrink-0">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#1B5BF0" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              <span className="text-[12px] font-semibold text-[#1B5BF0]">다운로드</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
