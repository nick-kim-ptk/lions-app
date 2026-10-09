import { useNavigate } from "react-router-dom"

import { Page } from "@/components/Layout"

// 093-SL-CM-08 가입환영 페이지 — 혜택 없이 기능 소개

export function WelcomeScreen() {
  const navigate = useNavigate()

  return (
    <Page>
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-16 pb-8">
        {/* Hero */}
        <div className="relative mb-8">
          <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-[#EBF0FF] to-[#1B5BF0]/30 border border-[#1B5BF0]/40 flex items-center justify-center">
            <div className="w-20 h-20 rounded-2xl bg-[#1B5BF0]/50" />
          </div>
          <div className="absolute -top-2 -right-2 w-5 h-5 bg-[#F0A500] rounded-full" />
          <div className="absolute -bottom-1 -left-2 w-3 h-3 bg-[#1B5BF0] rounded-full opacity-60" />
        </div>

        <h2 className="text-[#111827] text-2xl font-bold text-center mb-4">
          반가워요,
          <br />
          라이온즈의 새로운 10번째 선수!
        </h2>
        <p className="text-[14px] text-[#64748B] text-center leading-relaxed mb-2">
          경기부터 응원, 기록, 다양한 팬 서비스까지
          <br />
          삼성 라이온즈의 새로운 즐거움을 만나보세요.
        </p>
        <p className="text-[14px] text-[#64748B] text-center leading-relaxed">
          직관도, 집관도, 원정도
          <br />
          어디서든 함께하는 우리는 라이온즈입니다.
        </p>
      </div>

      {/* 시작하기 버튼 — 하단 플로팅 */}
      <div className="sticky bottom-0 bg-white border-t border-[#DDE1EC] px-5 pt-4 pb-10">
        <button
          onClick={() => navigate("/home")}
          className="w-full h-14 rounded-2xl bg-[#1B5BF0] text-white font-bold"
        >
          시작하기
        </button>
      </div>
    </Page>
  )
}
