import { useNavigate } from 'react-router-dom'
import { Page } from '@/components/Layout'

// 095-SL-CM-10 계정 활성화
export function AccountActivateScreen() {
  const navigate = useNavigate()
  return (
    <Page>
      <div className="px-5 pt-14 pb-4 flex items-center gap-2">
        <button onClick={() => navigate(-1)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M15 19l-7-7 7-7" stroke="#111827" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        <span className="text-[#111827] font-semibold">계정 활성화</span>
      </div>
      <div className="flex-1 px-5 pb-8 flex flex-col items-center justify-center gap-8 text-center">
        {/* Locked icon */}
        <div className="w-24 h-24 rounded-3xl bg-[#FFFFFF] border border-[#F0A500]/30 flex items-center justify-center">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
            <rect x="5" y="11" width="14" height="10" rx="2" stroke="#F0A500" strokeWidth="1.8"/>
            <path d="M8 11V7a4 4 0 118 0v4" stroke="#F0A500" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-[#111827] text-xl font-bold">장기 미이용 계정</h2>
          <p className="text-sm text-[#64748B] leading-relaxed">
            마지막 로그인으로부터 1년이 경과하여<br />계정이 휴면 상태로 전환되었습니다.
          </p>
        </div>
        <div className="w-full bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] p-4 text-left flex flex-col gap-2">
          <p className="text-xs text-[#64748B]">계정 정보</p>
          {[
            { label: '아이디', value: 'lions1028' },
            { label: '마지막 로그인', value: '2024.08.21' },
            { label: '휴면 전환일', value: '2025.08.21' },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between py-1.5 border-b border-[#DDE1EC] last:border-0">
              <span className="text-xs text-[#9CA3AF]">{label}</span>
              <span className="text-xs font-medium text-[#111827]">{value}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="px-5 pb-10 flex flex-col gap-3">
        <button className="w-full h-14 rounded-2xl bg-[#1B5BF0] text-white font-bold">
          PASS로 계정 활성화
        </button>
      </div>
    </Page>
  )
}
