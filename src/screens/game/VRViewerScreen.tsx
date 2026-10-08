import { useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { VR_SEAT_GROUPS, VR_TOPICS, type VrTopicId } from '@/data/game'

// 107-SL-GM-12 라이온즈 VR 뷰어 (전체 화면)  —  /game/vr-viewer?topic=<seat|player|space|explore>
export function VRViewerScreen() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const topicId = (params.get('topic') ?? 'seat') as VrTopicId
  const topic = VR_TOPICS.find((t) => t.id === topicId) ?? VR_TOPICS[0]
  const isSeat = topic.id === 'seat'

  const [itemIndex, setItemIndex] = useState(0) // 세부 항목 (좌석 주제에서는 좌석 그룹)
  const [seatIndex, setSeatIndex] = useState(0) // 좌석 주제의 좌석 종류
  const seatGroup = VR_SEAT_GROUPS[itemIndex] ?? VR_SEAT_GROUPS[0]
  const label = isSeat ? seatGroup.seats[seatIndex] : topic.items[itemIndex]

  // 360° 뷰어 와이어프레임: 드래그로 시점 이동, 버튼으로 확대·축소·초기화
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const drag = useRef<{ x: number; y: number } | null>(null)
  const resetView = () => { setPan({ x: 0, y: 0 }); setZoom(1) }
  const stop = (e: { stopPropagation: () => void }) => e.stopPropagation()

  const chip = (active: boolean) =>
    `shrink-0 rounded-full px-4 py-2 text-[12px] font-semibold border backdrop-blur-sm ${active ? 'bg-[#1B5BF0] border-[#1B5BF0] text-white' : 'bg-black/40 border-white/25 text-white/80'}`

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-[#0E1A40] touch-none select-none"
      onPointerDown={(e) => { drag.current = { x: e.clientX, y: e.clientY } }}
      onPointerMove={(e) => {
        if (!drag.current) return
        const dx = e.clientX - drag.current.x
        const dy = e.clientY - drag.current.y
        drag.current = { x: e.clientX, y: e.clientY }
        setPan((p) => ({ x: p.x + dx, y: Math.max(-120, Math.min(120, p.y + dy)) }))
      }}
      onPointerUp={() => { drag.current = null }}
      onPointerLeave={() => { drag.current = null }}
    >
      {/* 360° 이미지 더미 — 가로로 긴 파노라마를 드래그로 이동 */}
      <div
        className="absolute inset-y-0 -left-[100%] w-[300%]"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          background: 'repeating-linear-gradient(90deg,#14307a 0 120px,#1B5BF0 120px 240px,#0E2F80 240px 360px)',
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/50" />

      {/* 상단: 닫기 + 주제명 + 세부 항목 버튼 */}
      <div className="absolute inset-x-0 top-0 pt-9 pb-2" onPointerDown={stop}>
        <div className="flex items-center gap-3 px-4 mb-3">
          <button onClick={() => navigate(-1)} className="h-9 w-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center" aria-label="닫기">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" /></svg>
          </button>
          <p className="text-white text-[15px] font-bold">{topic.title}</p>
        </div>
        <div className="flex gap-2 overflow-x-auto px-4" style={{ scrollbarWidth: 'none' }}>
          {topic.items.map((item, i) => (
            <button key={item} onClick={() => { setItemIndex(i); setSeatIndex(0); resetView() }} className={chip(i === itemIndex)}>
              {item}
            </button>
          ))}
        </div>
        {isSeat && (
          <div className="flex gap-2 overflow-x-auto px-4 mt-2" style={{ scrollbarWidth: 'none' }}>
            {seatGroup.seats.map((seat, i) => (
              <button key={seat} onClick={() => { setSeatIndex(i); resetView() }} className={chip(i === seatIndex).replace('py-2', 'py-1.5')}>
                {seat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 하단: 현재 장소 + 안내 + 확대·축소·초기화 */}
      <div className="pointer-events-none absolute left-4 bottom-8">
        <span className="rounded-full bg-black/50 px-3 py-1.5 text-[12px] font-bold text-white">360° · {label}</span>
        <p className="mt-2 text-[11px] text-white/70">드래그해서 둘러보세요</p>
      </div>
      <div className="absolute bottom-8 right-4 flex flex-col gap-2" onPointerDown={stop}>
        <button onClick={() => setZoom((z) => Math.min(2.5, +(z + 0.25).toFixed(2)))} className="h-10 w-10 rounded-full bg-black/50 text-white text-[18px] font-bold" aria-label="확대">+</button>
        <button onClick={() => setZoom((z) => Math.max(1, +(z - 0.25).toFixed(2)))} className="h-10 w-10 rounded-full bg-black/50 text-white text-[18px] font-bold" aria-label="축소">−</button>
        <button onClick={resetView} className="h-10 w-10 rounded-full bg-black/50 text-white text-[13px] font-bold" aria-label="시점 초기화">↺</button>
      </div>
    </div>
  )
}
