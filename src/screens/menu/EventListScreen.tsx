import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Header } from '@/components/Layout'
import { EVENT_LIST } from '@/data/menu'
import { MOCK_TODAY, diffDays } from '@/data/mock'

function getDday(endDateStr: string): { label: string; active: boolean } {
  const diff = diffDays(MOCK_TODAY, endDateStr)
  if (diff < 0) return { label: '종료', active: false }
  if (diff === 0) return { label: 'D-Day', active: true }
  return { label: `D-${diff}`, active: true }
}

// 077(079)-SL-AL-23 이벤트 목록
export function EventListScreen() {
  const navigate = useNavigate()
  const [tab, setTab] = useState<'전체' | '진행 중' | '종료'>('전체')

  const filtered = EVENT_LIST.filter((e) => {
    if (tab === '전체') return true
    const { active } = getDday(e.endDate)
    return tab === '진행 중' ? active : !active
  })

  return (
    <div className="min-h-full bg-[#F5F7FB] pb-4">
      <Header title="이벤트" rightSlot={
        <button onClick={() => navigate('/all/event-history')}
          className="text-[12px] font-semibold text-[#1B5BF0] px-1">
          참여 내역
        </button>
      } />

      {/* 탭 */}
      <div className="flex px-4 pt-3 gap-4 border-b border-[#DDE1EC]">
        {(['전체', '진행 중', '종료'] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`pb-3 px-1 text-[13px] font-semibold border-b-2 transition-colors ${tab === t ? 'border-[#1B5BF0] text-[#1B5BF0]' : 'border-transparent text-[#9CA3AF]'}`}>
            {t}
          </button>
        ))}
      </div>

      <div className="px-4 pt-4 flex flex-col gap-3">
        {filtered.map((event) => {
          const dday = getDday(event.endDate)
          return (
            <button key={event.id} onClick={() => navigate('/all/event-detail')}
              className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] overflow-hidden text-left">
              <div className={`w-full h-36 flex items-center justify-center ${dday.active ? 'bg-gradient-to-br from-[#E8EEFF] to-[#C7D4F8]' : 'bg-[#F0F2F5]'}`}>
                <span className="text-5xl opacity-20">🦁</span>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${dday.active ? 'bg-[#EBF0FF] text-[#1B5BF0]' : 'bg-[#F0F2F5] text-[#9CA3AF]'}`}>
                      {event.category}
                    </span>
                  </div>
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                    dday.label === '종료' ? 'bg-[#F0F2F5] text-[#9CA3AF]' :
                    dday.label === 'D-Day' ? 'bg-[#EF4444] text-white' :
                    parseInt(dday.label.replace('D-','')) <= 3 ? 'bg-[#FEF3C7] text-[#D97706]' :
                    'bg-[#EBF0FF] text-[#1B5BF0]'
                  }`}>
                    {dday.label}
                  </span>
                </div>
                <p className={`text-[14px] font-semibold leading-snug mb-1.5 ${dday.active ? 'text-[#0E1A40]' : 'text-[#9CA3AF]'}`}>
                  {event.title}
                </p>
                <p className="text-[11px] text-[#9CA3AF]">{event.period}</p>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
