import { useState } from 'react'
import { Header } from '@/components/Layout'

// 039(041)-SL-MY-12 변동 내역
export function EmblemDetailScreen() {
  const [activeTab, setActiveTab] = useState<'획득 내역' | '소진 내역'>('획득 내역')

  const earnList = [
    { id: 7, name: '구자욱 30홈런 기념', location: '기념 앰블럼 받기', date: '2026.09.21', qty: 1 },
    { id: 6, name: '사지선다왕', location: '오늘의 미션 퀴즈 정답', date: '2026.09.18', qty: 1 },
    { id: 5, name: 'OX 감별사', location: '오늘의 미션 OX 퀴즈', date: '2026.09.15', qty: 1 },
    { id: 4, name: '승부사', location: '이벤트 참여 보상', date: '2026.09.10', qty: 1 },
    { id: 3, name: '예언가', location: '경기 결과 예측 적중', date: '2026.09.05', qty: 1 },
    { id: 2, name: '블루 메이트', location: '블루 시그널 이벤트 당첨', date: '2026.08.28', qty: 1 },
    { id: 1, name: '10번째 선수', location: '홈경기 직관 체크인', date: '2026.08.20', qty: 1 },
  ]

  const spendList = [
    { id: 5, name: '사지선다왕', location: '이벤트 응모 차감', date: '2026.09.16', qty: 5 },
    { id: 4, name: 'OX 감별사', location: '이벤트 응모 차감', date: '2026.09.08', qty: 3 },
    { id: 3, name: '승부사', location: '이벤트 응모 차감', date: '2026.09.01', qty: 1 },
    { id: 2, name: '사지선다왕', location: '이벤트 응모 차감', date: '2026.08.25', qty: 3 },
    { id: 1, name: 'OX 감별사', location: '이벤트 응모 차감', date: '2026.08.18', qty: 5 },
  ]

  const list = activeTab === '획득 내역' ? earnList : spendList
  const isEarn = activeTab === '획득 내역'

  return (
    <div className="min-h-full bg-[#F5F7FB] pb-8">
      <Header title="변동 내역" />

      {/* 탭 */}
      <div className="px-4 pt-4 mb-4">
        <div className="flex bg-[#E8EBF4] p-0.5 rounded-full">
          {(['획득 내역', '소진 내역'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-1.5 rounded-full text-[12px] font-bold transition-colors ${activeTab === tab ? 'bg-white text-[#111827] shadow-xs' : 'text-[#64748B]'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* 리스트 */}
      <div className="px-4 flex flex-col gap-2">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-bold text-[#4A5570]">{activeTab}</span>
          <span className="text-[11px] text-[#64748B]">총 {list.length}건</span>
        </div>

        {/* 헤더 */}
        <div className="flex items-center px-4 py-2 text-[11px] font-semibold text-[#9CA3AF]">
          <span className="flex-1">앰블럼명</span>
          <span className="w-24 text-center">{isEarn ? '획득 위치' : '소진 위치'}</span>
          <span className="w-10 text-center">수량</span>
          <span className="w-20 text-right">{isEarn ? '획득 날짜' : '소진 날짜'}</span>
        </div>

        {list.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl border border-[#DDE1EC] px-4 py-3.5 flex items-center">
            <div className="flex items-center flex-1">
              <span className="text-[13px] font-semibold text-[#111827]">{item.name}</span>
            </div>
            <span className="w-24 text-[12px] text-[#6B7280] text-center">{item.location}</span>
            <span className={`w-10 text-center text-[13px] font-bold ${isEarn ? 'text-[#1B5BF0]' : 'text-[#EF4444]'}`}>{isEarn ? `+${item.qty}` : `-${item.qty}`}</span>
            <span className="w-20 text-[11px] text-[#9CA3AF] text-right">{item.date}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
