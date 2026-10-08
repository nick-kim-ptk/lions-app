import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { PH } from '@/components/Placeholder'

// 047(049)-SL-MY-20 사용 완료 처리
export function CouponUseScreen() {
  const navigate = useNavigate()
  const [pin, setPin] = useState(['', '', '', ''])
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ]

  const handleInputChange = (index: number, value: string) => {
    // Only accept numeric digit
    const digit = value.replace(/[^0-9]/g, '').slice(-1)
    const newPin = [...pin]
    newPin[index] = digit
    setPin(newPin)

    // Move to next input if filled
    if (digit && index < 3) {
      inputRefs[index + 1].current?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      inputRefs[index - 1].current?.focus()
    }
  }

  const isComplete = pin.every((digit) => digit !== '')

  return (
    <div className="relative min-h-full bg-[#F5F7FB] flex flex-col items-center justify-center px-8 text-center gap-6 pb-4">
      {/* Top right X close button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 right-4 p-2 text-[#111827] hover:opacity-70 focus:outline-none"
        aria-label="닫기"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      <div className="w-24 h-24 rounded-2xl bg-[#FFFFFF] border border-[#DDE1EC] overflow-hidden">
        <PH className="w-full h-full rounded-none" />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-[#111827] font-bold text-lg">쿠폰 사용 승인</p>
        <p className="text-[12px] text-[#9CA3AF] leading-relaxed">사용 처리된 쿠폰은 시스템상 복구가 불가능합니다.<br />반드시 권한을 가진 관리자만 처리해 주시기 바랍니다.</p>
      </div>

      {/* Admin Password 4-digit input boxes */}
      <div className="flex flex-col items-center gap-2 my-2">
        <p className="text-xs text-[#64748B] font-medium">관리자 비밀번호 4자리 입력</p>
        <div className="flex gap-3">
          {pin.map((digit, i) => (
            <input
              key={i}
              ref={inputRefs[i]}
              type="password"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleInputChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className="w-12 h-14 bg-white border border-[#DDE1EC] rounded-xl text-center text-xl font-bold text-[#111827] focus:border-[#1B5BF0] focus:ring-1 focus:ring-[#1B5BF0] focus:outline-none transition-all"
            />
          ))}
        </div>
      </div>

      <div className="w-full flex flex-col gap-3">
        <button
          disabled={!isComplete}
          onClick={() => {
            if (isComplete) {
              navigate(-1)
            }
          }}
          className={`w-full h-14 rounded-2xl font-bold transition-all ${
            isComplete
              ? 'bg-[#1B5BF0] text-white cursor-pointer hover:bg-[#154ecb]'
              : 'bg-[#DDE1EC] text-[#9CA3AF] cursor-not-allowed'
          }`}
        >
          쿠폰 사용하기
        </button>
      </div>
    </div>
  )
}
