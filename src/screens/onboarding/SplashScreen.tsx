import { useNavigate } from "react-router-dom"

// 001-SL-CM-01 스플래시 스크린

export function SplashScreen() {
  const navigate = useNavigate()

  return (
    <div className="fixed inset-0 bg-[#8C8C8C] overflow-hidden">
      {/* Full-bleed image placeholder — grey tone */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#AAAAAA] via-[#8C8C8C] to-[#5A5A5A]" />

      {/* 전체화면 버튼 */}
      <button
        onClick={() => navigate("/overview")}
        className="absolute top-12 right-5 h-7 px-2.5 flex items-center gap-1.5 bg-white/20 rounded-full"
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="7" height="7" rx="1.5" fill="white" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" fill="white" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" fill="white" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" fill="white" />
        </svg>
        <span className="text-[10px] font-semibold text-white">전체화면</span>
      </button>

      {/* Bottom overlay — loading */}
      <div className="absolute bottom-0 left-0 right-0 px-8 pb-16 pt-20 bg-gradient-to-t from-[#3A3A3A]/80 to-transparent flex flex-col items-center gap-4">
        <button
          onClick={() => navigate("/home")}
          className="text-white/60 text-xs tracking-wide"
        >
          오늘의 승리요정 소환 중…
        </button>
      </div>
    </div>
  )
}
