import { PHImage } from '@/components/Placeholder'
import { Header } from '@/components/Layout'
import { LOGO_GUIDES, LOGO_ITEMS } from '@/data/club'

// 060-SL-AL-04 구단 로고
export function LogoIntroScreen() {
  return (
    <div className="min-h-full bg-[#F5F7FB] pb-6">
      <Header title="구단 로고" />
      <div className="px-4 pt-5 flex flex-col gap-6">
        {LOGO_ITEMS.map((item) => (
          <div key={item.type}>
            <p className="text-xs text-[#9CA3AF] mb-3">{item.type}</p>
            <div className="bg-white rounded-2xl border border-[#DDE1EC] p-6 mb-3">
              <PHImage className="h-24" rounded="rounded-xl" label={item.imageLabel} />
            </div>
            <p className="text-[13px] font-semibold text-[#111827]">{item.desc}</p>
            <p className="mt-1 text-[12px] text-[#64748B] leading-relaxed">{item.note}</p>
          </div>
        ))}

        <div className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] p-4">
          <p className="text-[13px] font-bold text-[#111827] mb-2">로고 사용 가이드</p>
          <ul className="flex flex-col gap-1.5">
            {LOGO_GUIDES.map((g) => (
              <li key={g} className="flex gap-2 text-[12px] text-[#64748B] leading-relaxed">
                <span className="text-[#1B5BF0]">·</span>
                <span>{g}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
