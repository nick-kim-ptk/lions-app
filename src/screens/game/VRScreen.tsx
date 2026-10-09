import { PHImage } from "@/components/Placeholder"

import { Header } from "@/components/Layout"

import { useNavigate } from "react-router-dom"

import { VR_GESTURES, VR_INTRO, VR_TOPICS } from "@/data/game"

// 016-SL-GM-11 라이온즈 VR

export function VRScreen() {
  const navigate = useNavigate()

  return (
    <div className="min-h-full bg-[#F5F7FB] pb-6">
      <Header title="라이온즈 VR" />

      {/* Intro */}
      <div className="px-4 py-6 text-center flex flex-col items-center gap-2">
        <div className="w-16 h-16 rounded-2xl bg-[#EBF0FF] flex items-center justify-center">
          <span className="text-[11px] font-black text-[#1B5BF0] tracking-wider">
            360°
          </span>
        </div>
        <p className="text-[17px] font-bold text-[#0E1A40] mt-1">
          {VR_INTRO.title}
        </p>
        <p className="text-[13px] text-[#64748B] leading-relaxed">
          {VR_INTRO.desc}
        </p>
        <p className="text-[11px] text-[#9CA3AF]">{VR_INTRO.note}</p>
      </div>

      {/* 사용 방법 */}
      <div className="px-4 mb-6">
        <div className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] px-4 py-3 flex flex-col gap-2.5">
          <p className="text-[12px] font-bold text-[#111827]">
            이렇게 둘러보세요
          </p>
          {VR_GESTURES.map((g) => (
            <div key={g.title} className="flex items-center gap-3">
              <span className="w-8 h-8 shrink-0 rounded-full bg-[#EBF0FF] flex items-center justify-center text-[14px]">
                {g.icon}
              </span>
              <div>
                <p className="text-[12px] font-semibold text-[#111827]">
                  {g.title}
                </p>
                <p className="text-[11px] text-[#64748B]">{g.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* VR experiences */}
      <div className="px-4">
        <p className="text-[15px] font-bold text-[#111827] mb-3">
          보고 싶은 곳을 골라보세요
        </p>
        <div className="flex flex-col gap-4">
          {VR_TOPICS.map((t) => (
            <button
              key={t.id}
              onClick={() => navigate(`/game/vr-viewer?topic=${t.id}`)}
              className="relative overflow-hidden rounded-3xl border border-[#DDE1EC] text-left"
            >
              <PHImage className="h-44" label={t.imageLabel} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/10 flex flex-col justify-end p-5">
                <span className="text-xs text-white/80 mb-1">
                  360° · {t.id === "seat" ? "좌석 20종" : `${t.items.length}곳`}
                </span>
                <p className="text-white font-bold text-lg">{t.title}</p>
                <p className="text-white/80 text-[12px] mt-0.5">{t.desc}</p>
                <div className="mt-3">
                  <span className="text-xs bg-white text-[#0E2F80] font-semibold rounded-full px-4 py-1.5">
                    360°로 보기
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
