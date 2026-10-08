import { useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Header } from '@/components/Layout'
import { CaseSelect } from '@/components/CaseSelect'
import { VR_SEAT_GROUPS, VR_TOPICS, type VrTopicId } from '@/data/game'

const MY_SEAT = '3루 네이비석 · 333블록 3열 47번 (예시)'

// 107-SL-GM-12 라이온즈 VR 뷰어  —  /game/vr-viewer?topic=<seat|player|space|explore>
export function VRViewerScreen() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const topicId = (params.get('topic') ?? 'seat') as VrTopicId
  const topic = VR_TOPICS.find((t) => t.id === topicId) ?? VR_TOPICS[0]

  const [itemIndex, setItemIndex] = useState(0)
  const [seatPick, setSeatPick] = useState<string | null>(null) // 좌석 종류별 보기에서 고른 구역
  const [booked, setBooked] = useState<'예매 있음' | '예매 없음'>('예매 있음')

  // 360° 뷰어 와이어프레임: 드래그로 시점 이동, 버튼으로 확대·축소·초기화
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const drag = useRef<{ x: number; y: number } | null>(null)
  const resetView = () => { setPan({ x: 0, y: 0 }); setZoom(1) }

  const isSeat = topic.id === 'seat'
  const noBooking = isSeat && seatPick === null && booked === '예매 없음'
  const label = isSeat ? (seatPick ?? '내가 예매한 좌석') : topic.items[itemIndex]
  const caption = isSeat && seatPick === null ? MY_SEAT : topic.title

  return (
    <div className="min-h-full bg-[#F5F7FB] pb-6">
      <Header title={topic.title} />

      {/* 세부 항목 버튼 */}
      <div className="flex gap-2 overflow-x-auto px-4 py-3" style={{ scrollbarWidth: 'none' }}>
        {topic.items.map((item, i) => {
          const active = isSeat ? seatPick === null : i === itemIndex
          return (
            <button
              key={item}
              onClick={() => { setItemIndex(i); setSeatPick(null); resetView() }}
              className={`shrink-0 rounded-full px-4 py-2 text-[12px] font-semibold border ${active ? 'bg-[#1B5BF0] border-[#1B5BF0] text-white' : 'bg-white border-[#DDE1EC] text-[#64748B]'}`}
            >
              {item}
            </button>
          )
        })}
        {isSeat && (
          <div className="shrink-0 flex items-center">
            <CaseSelect value={booked} options={['예매 있음', '예매 없음'] as const} onChange={setBooked} />
          </div>
        )}
      </div>

      {/* 360° 뷰어 */}
      <div className="px-4">
        <div
          className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-[#0E1A40] touch-none select-none"
          onPointerDown={(e) => { drag.current = { x: e.clientX, y: e.clientY }; (e.target as HTMLElement).setPointerCapture?.(e.pointerId) }}
          onPointerMove={(e) => {
            if (!drag.current) return
            const dx = e.clientX - drag.current.x
            const dy = e.clientY - drag.current.y
            drag.current = { x: e.clientX, y: e.clientY }
            setPan((p) => ({ x: p.x + dx, y: Math.max(-80, Math.min(80, p.y + dy)) }))
          }}
          onPointerUp={() => { drag.current = null }}
          onPointerLeave={() => { drag.current = null }}
        >
          {noBooking ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-8 text-center">
              <p className="text-white text-[14px] font-bold">예매한 좌석이 없어요</p>
              <p className="text-white/60 text-[12px]">예매하면 내 자리에서 보이는 풍경을 미리 볼 수 있어요. 아래에서 좌석 종류별로 둘러볼 수도 있어요.</p>
              <button onClick={() => navigate('/ticket')} className="mt-2 h-9 rounded-xl bg-white px-5 text-[12px] font-bold text-[#0E2F80]">티켓 예매하러 가기</button>
            </div>
          ) : (
            <>
              {/* 360° 이미지 더미 — 가로로 긴 파노라마를 드래그로 이동 */}
              <div
                className="absolute inset-y-0 -left-[100%] w-[300%]"
                style={{
                  transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                  background: 'repeating-linear-gradient(90deg,#14307a 0 120px,#1B5BF0 120px 240px,#0E2F80 240px 360px)',
                }}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
              {/* 장소명 */}
              <div className="pointer-events-none absolute left-4 top-4">
                <span className="rounded-full bg-black/40 px-3 py-1 text-[11px] font-bold text-white">360° · {label}</span>
                <p className="mt-1.5 text-[11px] text-white/70">{caption}</p>
              </div>
              {/* 첫 진입 안내 */}
              <div className="pointer-events-none absolute inset-x-0 bottom-16 flex justify-center">
                <span className="rounded-full bg-black/50 px-4 py-1.5 text-[11px] text-white">드래그해서 둘러보세요</span>
              </div>
              {/* 확대·축소·초기화 */}
              <div className="absolute bottom-4 right-4 flex flex-col gap-2">
                <button onClick={() => setZoom((z) => Math.min(2.5, +(z + 0.25).toFixed(2)))} className="h-9 w-9 rounded-full bg-black/50 text-white text-[16px] font-bold">+</button>
                <button onClick={() => setZoom((z) => Math.max(1, +(z - 0.25).toFixed(2)))} className="h-9 w-9 rounded-full bg-black/50 text-white text-[16px] font-bold">−</button>
                <button onClick={resetView} className="h-9 w-9 rounded-full bg-black/50 text-white text-[11px] font-bold">↺</button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* 내 자리 미리 보기: 좌석 종류별 보기 */}
      {isSeat && (
        <div className="px-4 pt-5">
          <p className="mb-3 text-[14px] font-bold text-[#111827]">좌석 종류별로 보기</p>
          <div className="flex flex-col gap-3">
            {VR_SEAT_GROUPS.map((g) => (
              <div key={g.group}>
                <p className="mb-1.5 text-[11px] font-semibold text-[#64748B]">{g.group}</p>
                <div className="flex flex-wrap gap-2">
                  {g.seats.map((seat) => (
                    <button
                      key={seat}
                      onClick={() => { setSeatPick(seat); resetView() }}
                      className={`rounded-full border px-3 py-1.5 text-[12px] font-medium ${seatPick === seat ? 'bg-[#1B5BF0] border-[#1B5BF0] text-white' : 'bg-white border-[#DDE1EC] text-[#374151]'}`}
                    >
                      {seat}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
