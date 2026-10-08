import { useState } from 'react'
import { Header } from '@/components/Layout'
import { BOOKING_GUIDE, BOOKING_GUIDE_TABS } from '@/data/my'

// 046-SL-MY-17 예매 안내
export function BookingGuideScreen() {
  const [tab, setTab] = useState<(typeof BOOKING_GUIDE_TABS)[number]>('예매 일정')
  return (
    <div className="min-h-full bg-[#F5F7FB] pb-6">
      <Header title="예매 안내" />
      <div className="flex border-b border-[#DDE1EC] overflow-x-auto">
        {BOOKING_GUIDE_TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`shrink-0 px-4 py-3 text-sm font-medium border-b-2 ${t === tab ? 'border-[#1B5BF0] text-[#1B5BF0]' : 'border-transparent text-[#64748B]'}`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="px-4 pt-4 flex flex-col gap-4">
        {BOOKING_GUIDE[tab].map((sec) => (
          <div key={sec.title} className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] p-4">
            <p className="text-[14px] font-bold text-[#111827] mb-2">{sec.title}</p>
            <ul className="flex flex-col gap-1.5">
              {sec.lines.map((l) => (
                <li key={l} className="flex gap-2 text-[12px] text-[#64748B] leading-relaxed">
                  <span className="text-[#1B5BF0]">·</span>
                  <span>{l}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
