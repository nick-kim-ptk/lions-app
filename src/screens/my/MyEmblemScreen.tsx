import { useNavigate } from 'react-router-dom'
import { Header } from '@/components/Layout'

// 038(040)-SL-MY-11 내 앰블럼
export function MyEmblemScreen() {
  const navigate = useNavigate()
  return (
    <div className="min-h-full bg-[#F5F7FB] pb-4">
      <Header
        title="내 앰블럼"
        rightSlot={
          <button onClick={() => navigate('/my/emblem-detail')} className="text-[13px] font-medium text-[#1B5BF0]">변동 내역</button>
        }
      />

      <div className="px-4 pt-4 mb-5">
        <div className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] p-5 flex flex-col items-center gap-1">
          <span className="text-[12px] text-[#9CA3AF]">보유 앰블럼 수</span>
          <span className="text-[#111827] text-[42px] font-black leading-none">247</span>
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
          <div className="grid grid-cols-3 gap-3">
            {[
              { emoji: '🦁', count: 10, color: 'from-[#1B5BF0] to-[#6EC6FF]', name: '라이온 킹' },
              { emoji: '🏆', count: 3, color: 'from-[#F0A500] to-[#FFD966]', name: '챔피언십' },
              { emoji: '⚾', count: 5, color: 'from-[#E53935] to-[#FF8A65]', name: '홈런왕' },
            ].map((em, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5">
                <div className={`relative w-full aspect-square rounded-2xl bg-gradient-to-br ${em.color} flex items-center justify-center`}>
                  <span className="text-2xl">{em.emoji}</span>
                  <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#111827] border-2 border-white flex items-center justify-center">
                    <span className="text-[9px] font-bold text-white">{em.count}</span>
                  </div>
                </div>
                <span className="text-[11px] font-medium text-[#374151] text-center leading-tight">{em.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
