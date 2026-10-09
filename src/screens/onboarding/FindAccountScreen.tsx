import { useNavigate } from "react-router-dom"

import { Page } from "@/components/Layout"

// 094-SL-CM-09 아이디/비밀번호 찾기

export function FindAccountScreen() {
  const navigate = useNavigate()

  return (
    <Page>
      <div className="px-5 pt-14 pb-4 flex items-center gap-2">
        <button onClick={() => navigate(-1)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 19l-7-7 7-7"
              stroke="#111827"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <span className="text-[#111827] font-semibold">
          아이디/비밀번호 찾기
        </span>
      </div>
      <div className="flex-1 px-5 pb-8 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-[#111827] text-lg font-bold leading-snug">
            본인 인증 방법을 선택해 주세요.
          </h2>
          <p className="text-sm text-[#64748B] leading-relaxed">
            본인인증 완료 후 아이디를 확인하거나 비밀번호를 변경할 수 있습니다.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {/* PASS 인증 */}
          <button
            onClick={() => navigate("/find-complete")}
            className="w-full rounded-2xl border-2 border-[#DDE1EC] bg-white p-5 flex items-center gap-4 transition-all hover:border-[#1B5BF0] hover:bg-[#EBF0FF] active:border-[#1B5BF0] active:bg-[#EBF0FF]"
          >
            <div className="w-10 h-10 rounded-xl bg-[#F5F7FB] flex items-center justify-center shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <rect
                  x="5"
                  y="2"
                  width="14"
                  height="20"
                  rx="3"
                  stroke="#64748B"
                  strokeWidth="1.8"
                />
                <circle cx="12" cy="14" r="2" fill="#64748B" />
                <path
                  d="M9 7h6"
                  stroke="#64748B"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="flex-1 text-left">
              <p className="text-[15px] font-bold text-[#111827]">
                PASS 인증하기
              </p>
              <p className="text-xs text-[#64748B] mt-0.5">
                통신사 PASS 앱을 통한 휴대폰 본인인증
              </p>
            </div>
          </button>
        </div>
      </div>
    </Page>
  )
}
