import { useNavigate } from "react-router-dom"

import { PH } from "@/components/Placeholder"

import { Page } from "@/components/Layout"

import { setLoggedIn, takeReturnTo } from "@/data/authStore"

// 089-SL-CM-04 로그인

export function LoginScreen() {
  const navigate = useNavigate()

  return (
    <Page>
      <div className="flex-1 px-5 pt-16 pb-8 flex flex-col">
        {/* Logo */}
        <div className="flex flex-col items-center gap-3 mb-12">
          <div className="w-16 h-16 rounded-2xl bg-[#FFFFFF] border border-[#DDE1EC] flex items-center justify-center">
            <PH className="w-10 h-10 rounded-xl" />
          </div>
          <p className="text-[18px] font-black text-[#111827] tracking-tight">
            삼성 라이온즈
          </p>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex flex-col gap-1.5">
            <span className="text-xs text-[#64748B]">아이디</span>
            <div className="h-14 bg-[#FFFFFF] border border-[#DDE1EC] rounded-2xl px-4 flex items-center">
              <PH className="w-1/2 h-3 rounded-full" />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-xs text-[#64748B]">비밀번호</span>
            <div className="h-14 bg-[#FFFFFF] border border-[#DDE1EC] rounded-2xl px-4 flex items-center">
              <div className="flex gap-1">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="w-2 h-2 rounded-full bg-[#4A5570]" />
                ))}
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            setLoggedIn(true)

            navigate(takeReturnTo() ?? "/home")
          }}
          className="h-14 rounded-2xl bg-[#1B5BF0] text-white font-bold text-[16px] mb-5"
        >
          로그인
        </button>

        {/* Links */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <button
            className="text-xs text-[#64748B]"
            onClick={() => navigate("/find-account")}
          >
            아이디/비밀번호 찾기
          </button>
          <span className="text-[#DDE1EC]">|</span>
          <button
            className="text-xs text-[#64748B]"
            onClick={() => navigate("/signup")}
          >
            회원가입
          </button>
        </div>

        {/* SNS Login */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-[#DDE1EC]" />
            <span className="text-xs text-[#9CA3AF]">SNS 간편 로그인</span>
            <div className="flex-1 h-px bg-[#DDE1EC]" />
          </div>
          <div className="flex justify-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#000000] flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.4c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.39-1.32 2.76-2.53 3.99zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
            </div>
            <div className="w-12 h-12 rounded-full bg-[#FEE500] flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 3C7.04 3 3 6.36 3 10.5c0 2.64 1.68 4.97 4.23 6.35L6.3 20.1c-.1.3.22.55.5.4l4.1-2.73c.36.04.73.06 1.1.06 4.96 0 9-3.36 9-7.5S16.96 3 12 3z"
                  fill="#3A1D1D"
                />
              </svg>
            </div>
            <div className="w-12 h-12 rounded-full bg-[#FFFFFF] border border-[#DDE1EC] flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
            </div>
            <div className="w-12 h-12 rounded-full bg-[#03C75A] flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M16.273 12.845L7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Page>
  )
}
