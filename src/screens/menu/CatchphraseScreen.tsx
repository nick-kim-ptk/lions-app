import { PH, PHText } from '@/components/Placeholder'
import { Header } from '@/components/Layout'

// 060(062)-SL-AL-06 캐치프레이즈
export function CatchphraseScreen() {
  return (
    <div className="min-h-full bg-[#F5F7FB] pb-4">
      <Header title="캐치프레이즈" />
      <div className="px-4 pt-6 flex flex-col items-center gap-6 text-center">
        <div className="w-full h-64 bg-gradient-to-b from-[#EBF0FF] to-[#F5F7FB] rounded-3xl border border-[#1B5BF0]/30 flex flex-col items-center justify-center gap-4 p-6">
          <span className="text-xs text-[#1B5BF0] tracking-widest uppercase">2026 Season</span>
          <PH className="w-48 h-8 rounded-xl bg-[#1B5BF0]/20" />
          <PHText className="w-40" />
        </div>
        <div className="flex flex-col gap-3 text-left w-full">
          <PH className="w-32 h-4 rounded-full bg-[#D8DCE9]" />
          <div className="flex flex-col gap-2">
            {Array.from({length: 4}).map((_, i) => (
              <PHText key={i} className={i % 2 === 0 ? 'w-full' : 'w-4/5'} />
            ))}
          </div>
        </div>
        {/* History */}
        <div className="w-full flex flex-col gap-3">
          <p className="text-xs text-[#9CA3AF] font-medium text-left">역대 캐치프레이즈</p>
          {Array.from({length: 4}).map((_, i) => (
            <div key={i} className="flex justify-between bg-[#FFFFFF] rounded-xl border border-[#DDE1EC] p-3">
              <PHText className="w-16" />
              <PHText className="w-36" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
