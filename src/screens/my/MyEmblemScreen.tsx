import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Header } from '@/components/Layout'
import { EmptyState } from '@/components/EmptyState'
import { ListCaseBar, type ListCase } from '@/components/ListCaseBar'
import { EMBLEMS, EMBLEM_TOTAL } from '@/data/emblems'

// 038(040)-SL-MY-11 내 앰블럼
export function MyEmblemScreen() {
  const navigate = useNavigate()
  const [listCase, setListCase] = useState<ListCase>('목록 있음')
  const empty = listCase === '목록 없음'
  return (
    <div className="min-h-full bg-[#F5F7FB] pb-4">
      <Header
        title="내 앰블럼"
        rightSlot={
          <button onClick={() => navigate('/my/emblem-detail')} className="text-[13px] font-medium text-[#1B5BF0]">변동 내역</button>
        }
      />

      <ListCaseBar value={listCase} onChange={setListCase} />
      <div className="px-4 pt-4 mb-5">
        <div className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] p-5 flex flex-col items-center gap-1">
          <span className="text-[12px] text-[#9CA3AF]">보유 앰블럼 수</span>
          <span className="text-[#111827] text-[42px] font-black leading-none">{empty ? 0 : EMBLEM_TOTAL}</span>
        </div>
      </div>

      <div className="px-4 mb-5">
        <div className="bg-[#EBF0FF] border border-[#1B5BF0]/20 rounded-2xl px-4 py-3 flex items-start gap-3">
          <span className="text-lg shrink-0">💡</span>
          <p className="text-[12px] text-[#1B5BF0] leading-relaxed">
            모아둔 앰블럼은 <span className="font-bold">이벤트 참여 조건</span>이 될 수 있어요.<br />
            앰블럼을 꾸준히 모아 특별한 혜택을 누려보세요!
          </p>
        </div>
      </div>

      <div className="px-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[15px] font-bold text-[#111827]">획득 앰블럼</span>
        </div>
        <div className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] p-4">
          {empty ? (
            <EmptyState icon="🦁" title="아직 모은 앰블럼이 없어요" desc="경기 관람과 미션 참여로 앰블럼을 모아보세요." actionLabel="블루 시그널 가기" onAction={() => navigate('/lounge/blue-signal')} className="py-8" />
          ) : (
          <div className="flex flex-col divide-y divide-[#EEF0F6]">
            {EMBLEMS.map((em) => (
              <div key={em.name} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                <div className={`relative w-12 h-12 shrink-0 rounded-2xl bg-gradient-to-br ${em.color} flex items-center justify-center`}>
                  <span className="text-xl">{em.emoji}</span>
                  <div className="absolute -top-1.5 -right-1.5 min-w-5 h-5 px-1 rounded-full bg-[#111827] border-2 border-white flex items-center justify-center">
                    <span className="text-[9px] font-bold text-white">{em.count}</span>
                  </div>
                </div>
                <div className="min-w-0">
                  <p className="text-[13px] font-bold text-[#111827] leading-tight">{em.name}</p>
                  <p className="mt-0.5 text-[12px] text-[#6B7280] leading-snug">{em.desc}</p>
                </div>
              </div>
            ))}
          </div>
          )}
        </div>
      </div>
    </div>
  )
}
