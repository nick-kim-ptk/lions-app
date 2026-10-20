// 함께 만드는 V9 배너 — 030-SL-MY-01 마이페이지와 054-SL-MY-25 함께 만드는 V9 상단에서 같이 쓴다
// (제목·안내 문구만 화면마다 다르고, 직관·집관 진행 그래프는 동일)

export function V9Banner({
  title,
  sub,
  onClick,
}: {
  title: string
  sub: string
  onClick?: () => void
}) {
  return (
    <div
      className={`rounded-2xl overflow-hidden border border-[#DDE1EC] ${
        onClick ? "cursor-pointer active:opacity-90 transition-opacity" : ""
      }`}
      style={{
        background:
          "linear-gradient(135deg, #0A1A4E 0%, #112478 60%, #1B3FAD 100%)",
      }}
      onClick={onClick}
    >
      {/* 텍스트 영역 */}
      <div className="px-4 pt-4 pb-3">
        <p className="text-[15px] font-black text-white leading-snug mb-0.5">
          {title}
        </p>
        <p className="whitespace-pre-line text-[13px] font-semibold text-[#C8D8FF] leading-snug">
          {sub}
        </p>
      </div>

      {/* 바 그래프 영역 */}
      <div className="px-4 pb-3">
        {/* 경기 수 라벨 */}
        <div className="flex justify-between mb-1.5">
          <span className="text-[10px] text-[#6EC6FF]">0</span>
          <span className="text-[10px] text-[#6EC6FF]">36</span>
          <span className="text-[10px] text-[#6EC6FF]">72</span>
          <span className="text-[10px] text-[#6EC6FF]">108</span>
          <span className="text-[10px] text-[#6EC6FF]">144</span>
        </div>
        {/* 바 트랙 */}
        <div
          className="relative w-full h-5 rounded-full overflow-hidden"
          style={{ background: "rgba(255,255,255,0.1)" }}
        >
          {/* 미기록(전체 잠재) */}
          <div
            className="absolute inset-0 rounded-full"
            style={{ background: "rgba(255,255,255,0.06)" }}
          />
          {/* 집관 (직관 + 집관 누적) */}
          <div
            className="absolute left-0 top-0 bottom-0 rounded-full transition-all duration-700"
            style={{
              width: `${((36 + 26) / 144) * 100}%`,
              background: "linear-gradient(90deg,#4F6EF7,#6EC6FF)",
            }}
          />
          {/* 직관 */}
          <div
            className="absolute left-0 top-0 bottom-0 rounded-full"
            style={{
              width: `${(36 / 144) * 100}%`,
              background: "linear-gradient(90deg,#3454D1,#4F6EF7)",
            }}
          />
          {/* 현재 위치 마커 */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-white/60"
            style={{ left: `${((36 + 26) / 144) * 100}%` }}
          />
        </div>
        {/* 경기 수 요약 */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2.5">
            {[
              { label: "직관", color: "#4F6EF7", val: 36 },

              { label: "집관", color: "#6EC6FF", val: 26 },
            ].map((b) => (
              <div key={b.label} className="flex items-center gap-1">
                <span
                  className="w-1.5 h-1.5 rounded-sm shrink-0"
                  style={{ background: b.color }}
                />
                <span className="text-[10px] text-[#C8D8FF]">
                  {b.label}{" "}
                  <span className="font-bold text-white">{b.val}</span>
                </span>
              </div>
            ))}
          </div>
          <span className="text-[10px] text-[#C8D8FF]">
            <span className="font-bold text-white">62경기째</span> 함께하는
            중
          </span>
        </div>
      </div>
    </div>
  )
}
