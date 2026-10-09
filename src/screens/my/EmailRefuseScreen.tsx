import { Header } from "@/components/Layout"

import { EMAIL_REFUSE, LEGAL_DUMMY_NOTE } from "@/data/my"

// 032(034)-SL-MY-05 이메일 무단수집거부

export function EmailRefuseScreen() {
  return (
    <div className="min-h-full bg-[#F5F7FB] pb-4">
      <Header title="이메일 무단수집거부" />
      <div className="px-4 pt-8 flex flex-col items-center text-center gap-5">
        <div className="w-16 h-16 rounded-2xl bg-[#FFFFFF] border border-[#DDE1EC] flex items-center justify-center">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
              stroke="#8595AB"
              strokeWidth="1.8"
            />
            <path
              d="M22 6l-10 7L2 6"
              stroke="#8595AB"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div className="flex flex-col gap-3 text-left w-full">
          {EMAIL_REFUSE.paragraphs.map((t, i) => (
            <p key={i} className="text-[13px] text-[#374151] leading-relaxed">
              {t}
            </p>
          ))}
          <p className="text-[11px] text-[#9CA3AF]">{EMAIL_REFUSE.date}</p>
          <p className="mt-6 text-[11px] text-[#9CA3AF] leading-relaxed">
            {LEGAL_DUMMY_NOTE}
          </p>
        </div>
      </div>
    </div>
  )
}
