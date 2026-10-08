import { useNavigate } from 'react-router-dom'
import { Page } from '@/components/Layout'

// 096-SL-CM-11 정보 찾기 완료
export function FindCompleteScreen() {
  const navigate = useNavigate()
  const userId = 'lions1028'

  return (
    <Page className="items-center justify-center">
      <div className="flex flex-col items-center gap-6 px-8 text-center">
        <div className="w-20 h-20 rounded-full bg-[#1B5BF0]/20 border border-[#1B5BF0]/40 flex items-center justify-center">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M20 6L9 17l-5-5" stroke="#1B5BF0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-[#111827] text-xl font-bold">아이디 찾기 완료</h2>
          <p className="text-sm text-[#64748B]">가입하신 아이디 정보입니다.</p>
        </div>
        <div className="w-full bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] p-5">
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <span className="text-xs text-[#9CA3AF]">아이디</span>
              <span className="text-xs font-medium text-[#111827]">{userId}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-[#9CA3AF]">가입일</span>
              <span className="text-xs font-medium text-[#111827]">2021.05.09</span>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-3 mt-2">
          <p className="text-sm text-[#64748B]">비밀번호도 바로 재설정하시겠어요?</p>
          <button className="w-full h-14 rounded-2xl bg-[#FFFFFF] border border-[#DDE1EC] text-[#111827] font-medium" onClick={() => navigate('/set-new-password')}>
            비밀번호 재설정
          </button>
        </div>
        <p className="text-sm text-[#64748B]">
          비밀번호는 알고 있어요.{' '}
          <button className="text-[#1B5BF0] font-semibold" onClick={() => navigate('/login')}>로그인하기</button>
        </p>
      </div>
    </Page>
  )
}
