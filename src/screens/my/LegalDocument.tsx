import { LEGAL_DUMMY_NOTE } from "@/data/my"

// 법적 고지 화면 공통 본문 (개인정보 처리방침, 영상정보처리기기 운영관리방침)

export function LegalDocument({
  doc,
}: {
  doc: {
    version: string
    intro: string
    sections: { title: string lines: string[] }[]
  }
}) {
  return (
    <div className="px-4 pt-4">
      <p className="text-[11px] text-[#9CA3AF] mb-3">{doc.version}</p>
      <p className="text-[13px] text-[#374151] leading-relaxed mb-5">
        {doc.intro}
      </p>
      <div className="flex flex-col gap-5">
        {doc.sections.map((sec) => (
          <div key={sec.title}>
            <p className="text-[14px] font-bold text-[#111827] mb-2">
              {sec.title}
            </p>
            <ul className="flex flex-col gap-1.5">
              {sec.lines.map((l) => (
                <li
                  key={l}
                  className="flex gap-2 text-[12px] text-[#64748B] leading-relaxed"
                >
                  <span className="text-[#9CA3AF]">·</span>
                  <span>{l}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mt-8 text-[11px] text-[#9CA3AF] leading-relaxed">
        {LEGAL_DUMMY_NOTE}
      </p>
    </div>
  )
}
