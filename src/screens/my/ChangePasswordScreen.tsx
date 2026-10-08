import { useState } from 'react'
import { Header } from '@/components/Layout'

// 034(036)-SL-MY-07 비밀번호 변경
export function ChangePasswordScreen() {
  const [currentPw, setCurrentPw] = useState('')
  const [newPw, setNewPw] = useState('')
  const [confirmPw, setConfirmPw] = useState('')
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const mismatch = confirmPw.length > 0 && newPw !== confirmPw
  const canSubmit = currentPw.length >= 8 && newPw.length >= 8 && confirmPw.length >= 8 && !mismatch

  const EyeIcon = ({ visible }: { visible: boolean }) => visible ? (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19M1 1l22 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ) : (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
    </svg>
  )

  return (
    <div className="min-h-full bg-[#F5F7FB] pb-8">
      <Header title="비밀번호 변경" />
      <div className="px-4 pt-6 flex flex-col gap-5">
        {/* 현재 비밀번호 */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-[#64748B]">현재 비밀번호</label>
          <div className={`h-14 bg-white border rounded-2xl px-4 flex items-center gap-3 transition-colors ${currentPw.length > 0 ? 'border-[#1B5BF0]' : 'border-[#DDE1EC]'}`}>
            <input
              type={showCurrent ? 'text' : 'password'}
              value={currentPw}
              onChange={(e) => setCurrentPw(e.target.value)}
              placeholder="현재 비밀번호 입력"
              className="flex-1 bg-transparent text-sm text-[#111827] placeholder-[#9CA3AF] outline-none"
            />
            <button onClick={() => setShowCurrent(!showCurrent)} className="text-[#9CA3AF]">
              <EyeIcon visible={showCurrent} />
            </button>
          </div>
        </div>

        {/* 새 비밀번호 */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-[#64748B]">새 비밀번호</label>
          <div className={`h-14 bg-white border rounded-2xl px-4 flex items-center gap-3 transition-colors ${newPw.length > 0 ? 'border-[#1B5BF0]' : 'border-[#DDE1EC]'}`}>
            <input
              type={showNew ? 'text' : 'password'}
              value={newPw}
              onChange={(e) => setNewPw(e.target.value)}
              placeholder="새 비밀번호 입력"
              className="flex-1 bg-transparent text-sm text-[#111827] placeholder-[#9CA3AF] outline-none"
            />
            <button onClick={() => setShowNew(!showNew)} className="text-[#9CA3AF]">
              <EyeIcon visible={showNew} />
            </button>
          </div>
          <span className="text-[10px] text-[#9CA3AF]">영문·숫자·특수문자 조합 8자 이상</span>
        </div>

        {/* 새 비밀번호 확인 */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-[#64748B]">새 비밀번호 확인</label>
          <div className={`h-14 bg-white border rounded-2xl px-4 flex items-center gap-3 transition-colors ${mismatch ? 'border-[#E53935]' : confirmPw.length > 0 ? 'border-[#1B5BF0]' : 'border-[#DDE1EC]'}`}>
            <input
              type={showConfirm ? 'text' : 'password'}
              value={confirmPw}
              onChange={(e) => setConfirmPw(e.target.value)}
              placeholder="새 비밀번호 다시 입력"
              className="flex-1 bg-transparent text-sm text-[#111827] placeholder-[#9CA3AF] outline-none"
            />
            <button onClick={() => setShowConfirm(!showConfirm)} className="text-[#9CA3AF]">
              <EyeIcon visible={showConfirm} />
            </button>
          </div>
          {mismatch && <span className="text-[10px] text-[#E53935]">비밀번호가 일치하지 않습니다</span>}
        </div>
      </div>

      <div className="px-4 pt-6">
        <button
          disabled={!canSubmit}
          className={`w-full h-14 rounded-2xl font-bold text-sm transition-colors ${canSubmit ? 'bg-[#1B5BF0] text-white' : 'bg-[#DDE1EC] text-[#9CA3AF]'}`}
        >
          비밀번호 변경
        </button>
      </div>
    </div>
  )
}
