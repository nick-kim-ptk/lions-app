/**
 * 가입 완료 카드 — MY 홈(030-SL-MY-01)과 나의 멤버십/시즌권(050-SL-MY-21)이 같은 디자인을 공유합니다.
 * 9:16 세로형. 크기는 부모 너비로 정합니다.
 */

export type MemberCardKind = "blue" | "season" | "kids"

const CARDS: Record<MemberCardKind, {
  title: string[]
  tag: string
  tagCls: string
  name: string
  no: string
  label: string
}> = {
  blue: {
    title: ["2027 라이온즈 멤버십"],
    tag: "GOLD",
    tagCls: "text-[#F0A500] bg-[#F0A500]/20 border-[#F0A500]/40",
    name: "홍 길 동",
    no: "SL-2027-GOLD-88",
    label: "text-white/60",
  },

  season: {
    title: ["2027 프리미엄 블루", "시즌권"],
    tag: "SEASON",
    tagCls: "text-white bg-white/15 border-white/25",
    name: "홍 길 동",
    no: "SL-2027-PRE-07",
    label: "text-white/50",
  },

  kids: {
    title: ["2027 어린이 멤버십"],
    tag: "KIDS",
    tagCls: "text-white bg-white/20 border-white/40",
    name: "홍 길 동 Jr.",
    no: "SL-2027-KIDS-01",
    label: "text-white/70",
  },
}

export function MemberCard({
  kind,
  onClick,
}: {
  kind: MemberCardKind
  onClick?: () => void
}) {
  const c = CARDS[kind]

  const bg =
    kind === "blue"
      ? "bg-gradient-to-br from-[#1B5BF0] to-[#0E2F80]"
      : kind === "kids"
        ? "bg-gradient-to-br from-[#F0A500] to-[#D48B00]"
        : ""

  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden rounded-2xl p-5 aspect-[9/16] lg:aspect-[16/10] flex flex-col justify-between text-white ${bg} ${
        onClick ? "cursor-pointer active:opacity-90" : ""
      }`}
      style={
        kind === "season"
          ? {
              background:
                "linear-gradient(135deg, #0A1A4E 0%, #0E2F80 55%, #1B5BF0 100%)",
            }
          : undefined
      }
    >
      {/* 배경 장식 */}
      {kind === "season" ? (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full border border-white/10" />
          <div className="absolute -right-4 -top-2 w-28 h-28 rounded-full border border-white/10" />
          <div className="absolute right-6 bottom-0 w-16 h-16 rounded-full bg-[#1B5BF0]/40" />
        </div>
      ) : (
        <>
          <div
            className={`absolute -right-8 -top-8 w-40 h-40 rounded-full pointer-events-none ${
              kind === "kids" ? "bg-white/10" : "bg-white/5"
            }`}
          />
          <div className="absolute -left-10 bottom-24 w-32 h-32 rounded-full bg-white/5 pointer-events-none" />
        </>
      )}
      {kind === "kids" && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[64px] opacity-20 pointer-events-none">
          🦁
        </div>
      )}

      <div className="relative flex items-start justify-between gap-2">
        <div>
          <p className="text-white/60 text-[10px] font-medium tracking-widest mb-1">
            SAMSUNG LIONS
          </p>
          <p className="text-white text-[18px] font-bold leading-snug">
            {c.title.map((t, i) => (
              <span key={i}>
                {i > 0 && <br />}
                {t}
              </span>
            ))}
          </p>
          <span
            className={`mt-1.5 inline-block text-[10px] font-bold border rounded-full px-2 py-0.5 ${c.tagCls}`}
          >
            {c.tag}
          </span>
        </div>
      </div>

      <div className="relative">
        {kind === "season" && (
          <>
            <p className="text-white/50 text-[9px] mb-0.5">SEAT</p>
            <p className="text-white text-[13px] font-bold">1루 프리미엄석</p>
            <p className="text-white/50 text-[10px] mt-0.5 mb-3">
              블록 A · 12열 · 7번
            </p>
          </>
        )}
        <p className={`${c.label} text-[9px] mb-0.5`}>MEMBER</p>
        <p className="text-white text-[14px] font-semibold tracking-wider">
          {c.name}
        </p>
        <p className="text-white/50 text-[9px] mt-1.5">회원번호 · {c.no}</p>
        <p className="text-white/50 text-[9px] mt-0.5">유효기간 · 27.12.31</p>
      </div>
    </div>
  )
}
