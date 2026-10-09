import { useNavigate } from "react-router-dom"

// 036(038)-SL-MY-09 탈퇴 완료

export function WithdrawCompleteScreen() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#F5F7FB] flex flex-col items-center justify-center px-8 text-center gap-6">
      <div className="w-20 h-20 rounded-full bg-[#FFFFFF] border border-[#DDE1EC] flex items-center justify-center">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <path
            d="M20 6L9 17l-5-5"
            stroke="#8595AB"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-[#111827] text-xl font-bold">
          탈퇴가 완료되었습니다
        </h2>
        <p className="text-sm text-[#64748B] leading-relaxed">
          앞으로도 삼성 라이온즈에 아낌없는 응원을
          <br />
          부탁드립니다. 항상 감사합니다. 🦁
        </p>
      </div>
      <button
        onClick={() => navigate("/home")}
        className="w-full h-14 rounded-2xl bg-[#FFFFFF] border border-[#DDE1EC] text-[#111827] font-medium"
      >
        홈으로 이동
      </button>
    </div>
  )
}
