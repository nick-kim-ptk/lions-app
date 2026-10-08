import { useState } from 'react'
import { Header } from '@/components/Layout'

// 049(051)-SL-MY-22 멤버십/시즌권 안내
export function MembershipGuideScreen() {
  const [activeTab, setActiveTab] = useState<'멤버십' | '시즌권'>('멤버십')

  const membershipTiers = [
    {
      name: 'GOLD',
      label: '골드 멤버십',
      color: 'from-[#F0A500] to-[#FFD966]',
      textColor: '#7C5C00',
      price: '연 120,000원',
      benefits: [
        '홈경기 선예매 우선권 (일반 예매 3일 전)',
        '라이온즈파크 매점 10% 할인',
        '어센틱 샵 15% 할인',
        '연간 굿즈 박스 제공 (골드 에디션)',
        '선수단 팬사인회 우선 응모권',
        '독점 라이브 콘텐츠 시청권',
      ],
    },
    {
      name: 'SILVER',
      label: '실버 멤버십',
      color: 'from-[#9CA3AF] to-[#D1D5DB]',
      textColor: '#4B5563',
      price: '연 60,000원',
      benefits: [
        '홈경기 선예매 우선권 (일반 예매 1일 전)',
        '라이온즈파크 매점 5% 할인',
        '어센틱 샵 10% 할인',
        '연간 굿즈 박스 제공 (실버 에디션)',
        '앱 전용 이벤트 응모권 제공',
      ],
    },
  ]

  const seasonTickets = [
    {
      name: 'PREMIUM BLUE',
      label: '프리미엄 블루 시즌권',
      color: 'from-[#1B5BF0] to-[#6EC6FF]',
      textColor: '#0E2F80',
      price: '연 1,800,000원',
      benefits: [
        '지정석 프리미엄 구역 전 홈경기 입장권',
        '전용 라운지 이용권',
        '라이온즈파크 매점 20% 할인',
        '어센틱 샵 20% 할인',
        '선수단 팬사인회 초청권 (연 2회)',
        '프리미엄 굿즈 박스 제공 (한정 에디션)',
        '홈경기 주차권 제공',
      ],
    },
    {
      name: 'BLUE',
      label: '블루 시즌권',
      color: 'from-[#3B82F6] to-[#93C5FD]',
      textColor: '#1E40AF',
      price: '연 900,000원',
      benefits: [
        '지정석 블루 구역 전 홈경기 입장권',
        '라이온즈파크 매점 10% 할인',
        '어센틱 샵 10% 할인',
        '블루 시즌권 전용 굿즈 박스 제공',
        '홈경기 선예매 우선권',
      ],
    },
  ]

  const list = activeTab === '멤버십' ? membershipTiers : seasonTickets

  return (
    <div className="min-h-full bg-[#F5F7FB] pb-8">
      <Header title="멤버십/시즌권 안내" />
      {/* 탭 */}
      <div className="flex border-b border-[#DDE1EC] bg-white sticky top-0 z-10">
        {(['멤버십', '시즌권'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3.5 text-[14px] font-semibold transition-colors ${
              activeTab === tab ? 'text-[#1B5BF0] border-b-2 border-[#1B5BF0]' : 'text-[#9CA3AF]'
            }`}
          >{tab}</button>
        ))}
      </div>
      <div className="px-4 pt-5 flex flex-col gap-5">
        {list.map((item) => (
          <div key={item.name} className="bg-white rounded-2xl border border-[#DDE1EC] overflow-hidden">
            {/* 카드 헤더 */}
            <div className={`bg-gradient-to-r ${item.color} px-5 py-4`}>
              <p className="text-[11px] font-bold text-white/70 tracking-widest uppercase">{item.name}</p>
              <p className="text-white text-[17px] font-black mt-0.5">{item.label}</p>
              <p className="text-white/80 text-[13px] font-semibold mt-1">{item.price}</p>
            </div>
            {/* 혜택 목록 */}
            <div className="px-5 py-4 flex flex-col gap-2.5">
              <p className="text-[12px] font-bold text-[#111827] mb-0.5">주요 혜택</p>
              {item.benefits.map((b, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="w-4 h-4 rounded-full bg-[#EBF0FF] flex items-center justify-center shrink-0 mt-0.5">
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none">
                      <path d="M20 6L9 17l-5-5" stroke="#1B5BF0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="text-[13px] text-[#374151] leading-snug">{b}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
