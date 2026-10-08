import { useState } from 'react'
import { Header } from '@/components/Layout'

// 051(053)-SL-MY-24 어린이회원 등록
export function ChildRegisterScreen() {
  const [code, setCode] = useState('')

  return (
    <div className="min-h-full bg-[#F5F7FB] pb-4">
      <Header title="어린이회원 등록" />

      {/* 상단 타이틀 */}
      <div className="px-4 pt-8 pb-6 flex flex-col items-center text-center gap-2">
        <div className="w-16 h-16 rounded-2xl bg-[#EBF0FF] border border-[#1B5BF0]/20 flex items-center justify-center mb-1">
          <span className="text-3xl">🦁</span>
        </div>
        <p className="text-[#111827] text-lg font-bold">2026 삼성라이온즈</p>
        <p className="text-[#111827] text-lg font-bold">어린이 회원 등록</p>
      </div>

      <div className="px-4 flex flex-col gap-4">
        {/* 가입코드 입력 폼 */}
        <div className="flex flex-col gap-1.5">
          <span className="text-xs text-[#64748B]">가입코드</span>
          <input
            value={code}
            onChange={e => setCode(e.target.value)}
            placeholder="가입코드를 입력해주세요"
            className="h-14 bg-[#FFFFFF] border border-[#DDE1EC] rounded-2xl px-4 text-sm text-[#111827] outline-none focus:border-[#1B5BF0]"
          />
        </div>

        {/* 안내사항 */}
        <div className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] p-4 flex flex-col gap-2.5">
          <p className="text-xs text-[#9CA3AF] font-semibold">안내사항</p>
          <div className="flex items-start gap-2">
            <span className="text-[#1B5BF0] text-xs shrink-0">•</span>
            <p className="text-xs text-[#64748B] leading-relaxed">
              가입코드 분실 시 고객센터로 연락 또는 삼성 라이온즈 앱 내 채널톡 문의하기를 이용해주시기 바랍니다.
            </p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-[#1B5BF0] text-xs shrink-0">•</span>
            <p className="text-xs text-[#64748B]">
              고객센터 : <span className="font-semibold text-[#111827]">053-780-3300</span>
            </p>
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 bg-white border-t border-[#DDE1EC] px-4 pt-4 pb-10 mt-6">
        <button
          className={`w-full h-14 rounded-2xl font-bold text-[16px] transition-colors ${code.length > 0 ? 'bg-[#1B5BF0] text-white' : 'bg-[#DDE1EC] text-[#9CA3AF]'}`}
        >
          등록하기
        </button>
      </div>
    </div>
  )
}
