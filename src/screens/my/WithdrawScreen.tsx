import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Header } from '@/components/Layout'
import { WITHDRAW_REASONS } from '@/data/my'

// 035(037)-SL-MY-08 회원 탈퇴
export function WithdrawScreen() {
  const navigate = useNavigate()
  const [reason, setReason] = useState('')
  const [password, setPassword] = useState('')
  const canWithdraw = reason !== '' && password.length > 0

  return (
    <div className="min-h-full bg-[#F5F7FB] pb-8">
      <Header title="회원 탈퇴" />
      <div className="px-4 pt-6 flex flex-col gap-4">
        {/* 주의사항 */}
        <div className="flex flex-col items-center gap-3 py-4">
          <div className="w-16 h-16 rounded-full bg-[#E53935]/20 border border-[#E53935]/30 flex items-center justify-center">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="#E53935" strokeWidth="1.8"/>
              <path d="M12 9v4M12 17h.01" stroke="#E53935" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <p className="text-[#111827] font-semibold">탈퇴 시 주의사항</p>
        </div>
        <div className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] p-4 flex flex-col gap-3">
          {['보유 중인 앰블럼이 모두 삭제됩니다', '예매 내역 및 쿠폰이 소멸됩니다 (취소하지 않은 예매 티켓은 먼저 취소해 주세요)', '멤버십 혜택이 즉시 종료됩니다', '탈퇴 후 30일간 재가입이 불가합니다'].map((w, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-[#E53935] text-xs mt-0.5">•</span>
              <span className="text-sm text-[#64748B]">{w}</span>
            </div>
          ))}
        </div>

        {/* 탈퇴 사유 */}
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold text-[#111827]">탈퇴 사유 <span className="text-[#E53935]">*</span></p>
          <div className="flex flex-col gap-2">
            {WITHDRAW_REASONS.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setReason(r)}
                className={`w-full h-12 rounded-2xl border px-4 flex items-center justify-between text-sm transition-colors ${
                  reason === r
                    ? 'border-[#1B5BF0] bg-[#EBF0FF] text-[#1B5BF0] font-semibold'
                    : 'border-[#DDE1EC] bg-[#FFFFFF] text-[#111827]'
                }`}
              >
                <span>{r}</span>
                <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${reason === r ? 'border-[#1B5BF0]' : 'border-[#C4C9D6]'}`}>
                  {reason === r && <span className="w-2 h-2 rounded-full bg-[#1B5BF0]" />}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 비밀번호 확인 */}
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold text-[#111827]">비밀번호 확인 <span className="text-[#E53935]">*</span></p>
          <input
            type="password"
            placeholder="비밀번호를 입력해 주세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-12 rounded-2xl border border-[#DDE1EC] bg-[#FFFFFF] px-4 text-sm text-[#111827] placeholder-[#9CA3AF] outline-none focus:border-[#1B5BF0]"
          />
        </div>
      </div>

      <div className="px-4 pt-6">
        <button
          disabled={!canWithdraw}
          onClick={() => canWithdraw && navigate('/my/withdraw-complete')}
          className={`w-full h-14 rounded-2xl font-semibold transition-all ${canWithdraw ? 'bg-[#E53935] text-white' : 'bg-[#E53935]/20 border border-[#E53935]/30 text-[#E53935]/40'}`}
        >
          탈퇴하기
        </button>
      </div>
    </div>
  )
}
