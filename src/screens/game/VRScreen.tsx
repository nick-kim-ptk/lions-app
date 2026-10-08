import { PHImage } from '@/components/Placeholder'
import { Header } from '@/components/Layout'
import { VR_EXPERIENCES, VR_INTRO } from '@/data/game'

// 016-SL-GM-11 라이온즈 VR
export function VRScreen() {
  return (
    <div className="min-h-full bg-[#F5F7FB] pb-6">
      <Header title="라이온즈 VR" />

      {/* Intro */}
      <div className="px-4 py-6 text-center flex flex-col items-center gap-2">
        <div className="w-16 h-16 rounded-2xl bg-[#EBF0FF] flex items-center justify-center">
          <span className="text-[11px] font-black text-[#1B5BF0] tracking-wider">360°</span>
        </div>
        <p className="text-[17px] font-bold text-[#0E1A40] mt-1">{VR_INTRO.title}</p>
        <p className="text-[13px] text-[#64748B] leading-relaxed">{VR_INTRO.desc}</p>
        <p className="text-[11px] text-[#9CA3AF]">{VR_INTRO.note}</p>
      </div>

      {/* VR experiences */}
      <div className="px-4">
        <p className="text-[15px] font-bold text-[#111827] mb-3">VR 체험 선택</p>
        <div className="flex flex-col gap-4">
          {VR_EXPERIENCES.map((exp) => (
            <div key={exp.title} className="relative overflow-hidden rounded-3xl border border-[#DDE1EC]">
              <PHImage className="h-44" label={exp.imageLabel} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/10 flex flex-col justify-end p-5">
                <span className="text-xs text-white/80 mb-1">360° VR · {exp.duration}</span>
                <p className="text-white font-bold text-lg">{exp.title}</p>
                <p className="text-white/80 text-[12px] mt-0.5">{exp.desc}</p>
                <div className="mt-3">
                  <span className="text-xs bg-white text-[#0E2F80] font-semibold rounded-full px-4 py-1.5">VR 체험하기</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
