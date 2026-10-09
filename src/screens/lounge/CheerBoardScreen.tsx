import { useState } from "react"

import { Header } from "@/components/Layout"

export function CheerBoardScreen() {
  const [text, setText] = useState("삼성 라이온즈 파이팅!! 🦁🔥")

  const [textColor, setTextColor] = useState("#1B5BF0")

  const [bgColor, setBgColor] = useState("#000000")

  const [size, setSize] = useState<"S" | "M" | "L">("L")

  const [speed, setSpeed] = useState<"느리게" | "중간" | "빠르게">("중간")

  const [effect, setEffect] = useState<"기본" | "흔들림" | "강조">("기본")

  const [fullscreen, setFullscreen] = useState(false)

  const TEXT_COLORS = [
    "#1B5BF0",
    "#FFFFFF",
    "#F0A500",
    "#E53935",
    "#22C55E",
    "#A855F7",
    "#F97316",
    "#000000",
  ]

  const BG_COLORS = [
    "#000000",
    "#0E2F80",
    "#C8102E",
    "#1A1A1A",
    "#FFFFFF",
    "#1B5BF0",
    "#064E3B",
    "#7C2D12",
  ]

  const fontSize = size === "S" ? "32px" : size === "M" ? "56px" : "80px"

  const speedDuration =
    speed === "느리게" ? "10s" : speed === "빠르게" ? "3s" : "6s"

  const effectStyle: React.CSSProperties =
    effect === "흔들림"
      ? { animation: "cheerShake 0.4s ease-in-out infinite alternate" }
      : effect === "강조"
        ? { animation: "cheerPulse 0.8s ease-in-out infinite alternate" }
        : {
            animation: `cheerScroll ${speedDuration} linear infinite`,
            display: "inline-block",
            whiteSpace: "nowrap",
          }

  const ColorRow = ({
    label,
    value,
    onChange,
  }: {
    label: string
    value: string
    onChange: (c: string) => void
  }) => {
    const palette = label === "글씨 색상" ? TEXT_COLORS : BG_COLORS

    return (
      <div className="flex flex-col gap-2">
        <span className="text-[11px] text-[#64748B] font-medium">{label}</span>
        <div className="flex gap-2 flex-wrap">
          {palette.map((c) => (
            <button
              key={c}
              onClick={() => onChange(c)}
              className="w-7 h-7 rounded-full border-2 transition-all"
              style={{
                backgroundColor: c,
                borderColor: value === c ? "#1B5BF0" : "#DDE1EC",
                transform: value === c ? "scale(1.2)" : "scale(1)",
              }}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-full bg-[#F5F7FB] flex flex-col">
      <style>{`
        @keyframes cheerShake { from { transform: translateX(-4px) } to { transform: translateX(4px) } }
        @keyframes cheerPulse { from { transform: scale(1); filter: brightness(1) } to { transform: scale(1.08); filter: brightness(1.3) } }
        @keyframes cheerScroll { from { transform: translateX(100%) } to { transform: translateX(-100%) } }
      `}</style>

      {/* 전체화면 가로 미리보기 */}
      {fullscreen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
          style={{
            backgroundColor: bgColor,
            transform: "rotate(90deg)",
            transformOrigin: "center center",

            width: "100vh",
            height: "100vw",
            left: "50%",
            top: "50%",

            marginLeft: "-50vh",
            marginTop: "-50vw",
          }}
        >
          <p
            className="font-black leading-none"
            style={{
              fontSize: `calc(${fontSize} * 1.6)`,
              color: textColor,
              letterSpacing: "-0.02em",

              ...(effect === "기본"
                ? {
                    animation: `cheerScroll ${speedDuration} linear infinite`,
                    display: "inline-block",
                    whiteSpace: "nowrap",
                  }
                : effect === "흔들림"
                  ? {
                      animation:
                        "cheerShake 0.4s ease-in-out infinite alternate",
                      paddingLeft: "2rem",
                      paddingRight: "2rem",
                    }
                  : {
                      animation:
                        "cheerPulse 0.8s ease-in-out infinite alternate",
                      paddingLeft: "2rem",
                      paddingRight: "2rem",
                    }),
            }}
          >
            {text || "응원 문구를 입력하세요"}
          </p>
          <button
            onClick={() => setFullscreen(false)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      )}

      <Header title="디지털 피켓" />

      <div className="flex-1 flex flex-col px-4 pt-4 gap-4 pb-6">
        {/* 가로 안내 */}
        <div className="flex items-center justify-center gap-1.5">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M7.5 21H2V3h20v5M22 15H11l3-3m-3 3l3 3"
              stroke="#9CA3AF"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="text-xs text-[#64748B] text-center">
            핸드폰을 <span className="font-bold text-[#1B5BF0]">가로</span>로
            놓으면 전체 화면으로 표시됩니다
          </p>
        </div>

        {/* 미리보기 */}
        <div
          className="w-full h-44 rounded-2xl border-4 border-[#1B5BF0]/40 flex items-center overflow-hidden relative"
          style={{ backgroundColor: bgColor }}
        >
          <p
            className="font-black leading-none"
            style={{
              fontSize,
              color: textColor,
              letterSpacing: "-0.02em",
              ...effectStyle,

              ...(effect !== "기본"
                ? { paddingLeft: "1rem", paddingRight: "1rem" }
                : {}),
            }}
          >
            {text || "응원 문구를 입력하세요"}
          </p>
          <div className="absolute right-1.5 top-1/2 -translate-y-1/2 w-1 h-8 bg-white/20 rounded-full" />
        </div>

        {/* 응원 문구 입력 */}
        <div className="bg-white rounded-2xl border border-[#DDE1EC] p-4 flex flex-col gap-2">
          <span className="text-[11px] text-[#64748B] font-medium">
            응원 문구 입력
          </span>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={20}
            placeholder="응원 문구를 입력하세요"
            className="h-10 bg-[#F5F7FB] border border-[#DDE1EC] rounded-xl px-3 text-sm text-[#111827] placeholder-[#C4C9D6] outline-none focus:border-[#1B5BF0]"
          />
          <p className="text-[10px] text-[#9CA3AF] text-right">
            {text.length}/20
          </p>
        </div>

        {/* 색상 */}
        <div className="bg-white rounded-2xl border border-[#DDE1EC] p-4 flex flex-col gap-4">
          <span className="text-[11px] font-semibold text-[#111827]">색상</span>
          <ColorRow
            label="글씨 색상"
            value={textColor}
            onChange={setTextColor}
          />
          <ColorRow label="배경 색상" value={bgColor} onChange={setBgColor} />
        </div>

        {/* 크기 */}
        <div className="bg-white rounded-2xl border border-[#DDE1EC] p-4 flex flex-col gap-3">
          <span className="text-[11px] font-semibold text-[#111827]">크기</span>
          <div className="flex gap-2">
            {(["S", "M", "L"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`flex-1 h-10 rounded-xl text-[13px] font-bold border transition-all ${
                  size === s
                    ? "bg-[#1B5BF0] text-white border-[#1B5BF0]"
                    : "bg-[#F5F7FB] text-[#64748B] border-[#DDE1EC]"
                }`}
              >
                {s === "S" ? "작게 (S)" : s === "M" ? "중간 (M)" : "크게 (L)"}
              </button>
            ))}
          </div>
        </div>

        {/* 속도 */}
        <div className="bg-white rounded-2xl border border-[#DDE1EC] p-4 flex flex-col gap-3">
          <span className="text-[11px] font-semibold text-[#111827]">속도</span>
          <div className="flex gap-2">
            {([
              ["느리게", "70%"],
              ["중간", "100%"],
              ["빠르게", "130%"],
            ] as const).map(([label, pct]) => (
              <button
                key={label}
                onClick={() => setSpeed(label)}
                className={`flex-1 h-10 rounded-xl text-[12px] font-semibold border transition-all ${
                  speed === label
                    ? "bg-[#1B5BF0] text-white border-[#1B5BF0]"
                    : "bg-[#F5F7FB] text-[#64748B] border-[#DDE1EC]"
                }`}
              >
                {label}
                <br />
                <span className="text-[10px] font-normal opacity-70">
                  {pct}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 효과 */}
        <div className="bg-white rounded-2xl border border-[#DDE1EC] p-4 flex flex-col gap-3">
          <span className="text-[11px] font-semibold text-[#111827]">효과</span>
          <div className="flex gap-2">
            {(["기본", "흔들림", "강조"] as const).map((ef) => (
              <button
                key={ef}
                onClick={() => setEffect(ef)}
                className={`flex-1 h-10 rounded-xl text-[12px] font-semibold border transition-all ${
                  effect === ef
                    ? "bg-[#1B5BF0] text-white border-[#1B5BF0]"
                    : "bg-[#F5F7FB] text-[#64748B] border-[#DDE1EC]"
                }`}
              >
                {ef}
              </button>
            ))}
          </div>
          <p className="text-[10px] text-[#9CA3AF] leading-relaxed">
            {effect === "기본" && "효과 없이 문구를 표시합니다."}
            {effect === "흔들림" &&
              "문구가 좌우로 짧게 흔들리는 모션을 반복 적용합니다."}
            {effect === "강조" &&
              "문구의 크기와 밝기가 순간적으로 커졌다가 원래 상태로 돌아오는 모션을 반복 적용합니다."}
          </p>
        </div>
      </div>

      {/* 하단 플로팅 CTA */}
      <div className="sticky bottom-0 bg-white border-t border-[#DDE1EC] px-4 pt-3 pb-8">
        <button
          onClick={() => setFullscreen(true)}
          className="w-full h-13 rounded-2xl bg-[#1B5BF0] text-white font-semibold text-[14px] h-12"
        >
          응원 피켓 열기
        </button>
      </div>
    </div>
  )
}
