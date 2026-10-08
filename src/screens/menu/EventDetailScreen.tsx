import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Header } from '@/components/Layout'

// 078(080)-SL-AL-24 이벤트 상세보기
export function EventDetailScreen() {
  const navigate = useNavigate()
  const [mode, setMode] = useState<'앰블럼' | '일반'>('앰블럼')
  const userEmblem = 3
  const requiredEmblem = 5
  const canJoin = userEmblem >= requiredEmblem

  return (
    <div className="min-h-full bg-white">
      {/* 투명 헤더 (뒤로가기만) */}
      <Header title="" transparent />

      {/* 풀 이미지 */}
      <div className="w-full bg-[#DDE1EC]" style={{minHeight: 600}} />

      {/* 하단 고정 참여 조건 + 버튼 */}
      <div className="sticky bottom-0 bg-white border-t border-[#DDE1EC] px-4 pt-4 pb-6">
        {/* 앰블럼 / 일반참여 토글 */}
        <div className="flex items-center justify-end mb-4">
          <div className="border border-dashed border-red-400 rounded-full p-0.5">
            <div className="flex bg-[#E8EBF4] rounded-full p-0.5 gap-0.5">
              {(['앰블럼', '일반'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setMode(tab)}
                  className={`text-[10px] font-semibold px-2.5 py-1 rounded-full transition-colors ${
                    mode === tab ? 'bg-white text-[#0E1A40] shadow-sm' : 'text-[#9CA3AF]'
                  }`}
                >
                  {tab} 참여
                </button>
              ))}
            </div>
          </div>
        </div>

        {mode === '앰블럼' ? (
          <>
            {/* 앰블럼 조건 */}
            <div className={`flex items-center justify-between rounded-2xl px-4 py-3 mb-3 ${canJoin ? 'bg-[#EBF0FF]' : 'bg-[#FEF2F2]'}`}>
              <div className="flex items-center gap-2">
                <span className="text-lg shrink-0">🔷</span>
                <div>
                  <p className="text-[12px] font-semibold text-[#0E1A40]">미션 앰블럼 {requiredEmblem}개 이상 획득 시 참여 가능</p>
                  <p className="text-[11px] mt-0.5">
                    <span className={`font-bold ${canJoin ? 'text-[#1B5BF0]' : 'text-[#EF4444]'}`}>보유 {userEmblem}개</span>
                    <span className="text-[#9CA3AF]"> / 필요 {requiredEmblem}개</span>
                  </p>
                </div>
              </div>
              {canJoin && <span className="text-[11px] font-bold text-[#1B5BF0]">참여 가능 ✓</span>}
            </div>
            <button
              onClick={() => canJoin && navigate('/all/event-history')}
              className={`w-full h-14 rounded-2xl font-bold text-[15px] transition-opacity ${canJoin ? 'bg-[#1B5BF0] text-white' : 'bg-[#DDE1EC] text-[#9CA3AF]'}`}>
              {canJoin ? '이벤트 참여하기' : `앰블럼 ${requiredEmblem - userEmblem}개 부족`}
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate('/all/event-history')}
            className="w-full h-14 rounded-2xl font-bold text-[15px] bg-[#1B5BF0] text-white">
            참여하기
          </button>
        )}
      </div>
    </div>
  )
}
