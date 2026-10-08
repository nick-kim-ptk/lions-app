import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Header } from '@/components/Layout'

// 048(050)-SL-MY-21 나의 멤버십/시즌권
export function MembershipScreen() {
  const navigate = useNavigate()
  const [mainTab, setMainTab] = useState<'멤버십' | '시즌권'>('멤버십')

  return (
    <div className="min-h-full bg-[#F5F7FB] pb-4">
      <Header
        title="나의 멤버십/시즌권"
        rightSlot={
          <button
            onClick={() => navigate('/my/membership-history')}
            className="flex items-center gap-0.5 text-[12px] text-[#1B5BF0] font-semibold"
          >
            가입 내역
          </button>
        }
      />
      <div className="px-4 pt-4 flex flex-col gap-4">

        {/* 메인 탭 — 멤버십 / 시즌권 */}
        <div className="flex bg-[#E8EBF4] rounded-2xl p-1 gap-1">
          {(['멤버십', '시즌권'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setMainTab(tab)}
              className={`flex-1 h-9 rounded-xl text-[13px] font-semibold transition-all ${mainTab === tab ? 'bg-white text-[#0E1A40] shadow-sm' : 'text-[#9CA3AF]'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {mainTab === '멤버십' && (<>
          {/* 블루멤버십 카드 */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1B5BF0] to-[#0A2E80] p-5 text-white shadow-sm border border-blue-500/30">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-white/70 text-xs font-semibold tracking-widest">SAMSUNG LIONS</p>
                <p className="text-white text-xl font-bold mt-0.5">블루멤버십</p>
              </div>
              <span className="text-xs font-bold text-[#F0A500] bg-[#F0A500]/20 border border-[#F0A500]/40 rounded-full px-3 py-1">GOLD</span>
            </div>
            <div>
              <p className="text-white/60 text-xs mb-1">MEMBER</p>
              <p className="text-white text-lg font-bold tracking-wider">홍 길 동</p>
              <div className="flex items-center justify-between mt-3 text-xs text-white/70 border-t border-white/15 pt-2.5">
                <span>회원번호 · SL-2026-GOLD-88</span>
                <span>유효기간 · 27.12.31</span>
              </div>
            </div>
          </div>

          {/* 블루멤버십 혜택 */}
          <div className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] p-4 shadow-2xs">
            <p className="text-xs font-bold text-[#111827] mb-3">멤버십 혜택</p>
            <div className="flex flex-col gap-2.5 text-xs text-[#374151]">
              {[
                '홈경기 선예매 혜택 (일반 예매 1시간 전)',
                '티켓 결제 시 블루포인트 3% 적립',
                '구단 공식 쇼핑몰 5% 할인 쿠폰 제공',
                '멤버십 전용 독점 라이브 콘텐츠 시청권',
                '시즌 종료 후 회원 전용 팬미팅 추첨 응모권',
              ].map((benefit, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#1B5BF0] mt-1.5 shrink-0" />
                  <span className="leading-tight">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 어린이 멤버십 카드 */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#F0A500] to-[#D48B00] p-5 text-white shadow-sm border border-[#F0A500]/30">
            <div className="absolute -right-6 -top-6 w-32 h-32 rounded-full bg-white/10 pointer-events-none" />
            <div className="absolute -right-2 top-8 w-20 h-20 rounded-full bg-white/10 pointer-events-none" />
            <div className="absolute right-5 top-1/2 -translate-y-1/2 text-[56px] opacity-20 pointer-events-none">🦁</div>
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-white/80 text-xs font-semibold tracking-widest uppercase">SAMSUNG LIONS</p>
                <p className="text-white text-xl font-bold mt-0.5">어린이 멤버십</p>
              </div>
              <span className="text-xs font-bold text-white bg-white/20 border border-white/40 rounded-full px-3 py-1">KIDS</span>
            </div>
            <div>
              <p className="text-white/70 text-xs mb-1">MEMBER</p>
              <p className="text-white text-lg font-bold tracking-wider">홍 길 동 Jr.</p>
              <div className="flex items-center justify-between mt-3 text-xs text-white/80 border-t border-white/20 pt-2.5">
                <span>회원번호 · SL-2026-KIDS-01</span>
                <span>유효기간 · 27.12.31</span>
              </div>
            </div>
          </div>

          {/* 어린이 멤버십 혜택 */}
          <div className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] p-4 shadow-2xs">
            <p className="text-xs font-bold text-[#111827] mb-3">어린이 멤버십 혜택</p>
            <div className="flex flex-col gap-2.5 text-xs text-[#374151]">
              {[
                '어린이 회원 전용 홈경기 지정석 30% 할인',
                '2026 시즌 어린이 회원 전용 웰컴 기프트 패키지 제공',
                '라팍 어린이날 특별 이벤트 및 체험행사 우선참가권',
                '주말 홈경기 시구 / 시타자 이벤트 응모 자격',
                '어린이 회원 전용 디지털 랜선 팬미팅 참여권',
              ].map((benefit, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#F0A500] mt-1.5 shrink-0" />
                  <span className="leading-tight">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </>)}

        {mainTab === '시즌권' && (<>
          {/* 시즌권 카드 */}
          <div className="relative overflow-hidden rounded-3xl p-5 text-white shadow-sm" style={{ background: 'linear-gradient(135deg, #0A1A4E 0%, #0E2F80 55%, #1B5BF0 100%)' }}>
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full border border-white/10" />
              <div className="absolute -right-4 -top-2 w-28 h-28 rounded-full border border-white/8" />
              <div className="absolute right-6 bottom-0 w-16 h-16 rounded-full bg-[#1B5BF0]/40" />
            </div>
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-white/50 text-xs font-semibold tracking-widest">SAMSUNG LIONS</p>
                <p className="text-white text-xl font-bold mt-0.5">프리미엄 블루 시즌권</p>
              </div>
              <span className="text-xs font-bold text-white bg-white/15 border border-white/25 rounded-full px-3 py-1">SEASON</span>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-white/50 text-xs mb-1">MEMBER</p>
                <p className="text-white text-lg font-bold tracking-wider">홍 길 동</p>
                <div className="flex items-center justify-between mt-3 text-xs text-white/60 border-t border-white/15 pt-2.5">
                  <span>회원번호 · SL-2026-PRE-07</span>
                  <span>유효기간 · 27.12.31</span>
                </div>
              </div>
            </div>
            <div className="mt-3 bg-white/10 rounded-xl px-3 py-2.5 flex items-center justify-between">
              <div>
                <p className="text-white/50 text-[9px] mb-0.5">SEAT</p>
                <p className="text-white text-[13px] font-bold">1루 프리미엄석</p>
              </div>
              <p className="text-white/60 text-[11px]">블록 A · 12열 · 7번</p>
            </div>
          </div>

          {/* 시즌권 혜택 */}
          <div className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] p-4 shadow-2xs">
            <p className="text-xs font-bold text-[#111827] mb-3">시즌권 혜택</p>
            <div className="flex flex-col gap-2.5 text-xs text-[#374151]">
              {[
                '지정 좌석 시즌 전 경기 무제한 입장',
                '시즌권 전용 라운지 및 편의시설 우선 이용',
                '구단 공식 쇼핑몰 10% 할인 쿠폰 제공',
                '선수단 팬사인회 및 미팅 우선 초청',
                '홈경기 주차권 시즌 전체 무료 제공',
              ].map((benefit, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0E2F80] mt-1.5 shrink-0" />
                  <span className="leading-tight">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </>)}
      </div>
    </div>
  )
}
