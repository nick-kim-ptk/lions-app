import { Header } from '@/components/Layout'
import { CATCHPHRASE, CATCHPHRASE_HISTORY } from '@/data/club'

// 062-SL-AL-06 캐치프레이즈
export function CatchphraseScreen() {
  return (
    <div className="min-h-full bg-[#F5F7FB] pb-6">
      <Header title="캐치프레이즈" />
      <div className="px-4 pt-6 flex flex-col items-center gap-6 text-center">
        <div className="w-full h-64 bg-gradient-to-b from-[#EBF0FF] to-[#F5F7FB] rounded-3xl border border-[#1B5BF0]/30 flex flex-col items-center justify-center gap-3 p-6">
          <span className="text-xs text-[#1B5BF0] tracking-widest uppercase">{CATCHPHRASE.season}</span>
          <p className="text-[30px] font-black text-[#0E1A40] leading-tight">{CATCHPHRASE.phrase}</p>
          <p className="text-[12px] tracking-[0.3em] text-[#64748B]">{CATCHPHRASE.sub}</p>
        </div>
        <div className="flex flex-col gap-2 text-left w-full">
          <p className="text-[14px] font-bold text-[#111827]">슬로건에 담은 뜻</p>
          {CATCHPHRASE.desc.map((t, i) => (
            <p key={i} className="text-[13px] text-[#374151] leading-relaxed">{t}</p>
          ))}
        </div>
        <div className="w-full flex flex-col gap-3">
          <p className="text-xs text-[#9CA3AF] font-medium text-left">역대 캐치프레이즈</p>
          {CATCHPHRASE_HISTORY.map((h) => (
            <div key={h.year} className="flex justify-between items-center bg-[#FFFFFF] rounded-xl border border-[#DDE1EC] px-4 py-3">
              <span className="text-[12px] font-bold text-[#1B5BF0]">{h.year}</span>
              <span className="text-[13px] font-semibold text-[#111827]">{h.phrase}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
