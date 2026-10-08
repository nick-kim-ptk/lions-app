import { PH, PHText, PHSection } from '@/components/Placeholder'
import { Header } from '@/components/Layout'

// 016-SL-GM-11 라이온즈 VR
export function VRScreen() {
  return (
    <div className="min-h-full bg-[#F5F7FB] pb-4">
      <Header title="라이온즈 VR" />

      {/* Intro */}
      <div className="px-4 py-6 text-center flex flex-col items-center gap-3">
        <PH className="w-16 h-16 rounded-2xl" />
        <PHText className="w-48" />
        <PHText className="w-56" />
      </div>

      {/* VR experiences */}
      <div className="px-4">
        <PHSection label="VR 체험 선택" right="" />
        <div className="flex flex-col gap-4">
          {['좌석 체험', '선수 라커룸 체험', '덕아웃 체험'].map((exp, i) => (
            <div key={i} className="relative overflow-hidden rounded-3xl border border-[#DDE1EC]">
              <PH className="w-full h-44 rounded-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/20 flex flex-col justify-end p-5">
                <span className="text-xs text-[#1B5BF0] mb-1">360° VR</span>
                <p className="text-[#111827] font-bold text-lg">{exp}</p>
                <div className="mt-2">
                  <span className="text-xs bg-[#1B5BF0]/20 border border-[#1B5BF0]/40 text-[#1B5BF0] rounded-full px-3 py-1">
                    VR 체험하기
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
