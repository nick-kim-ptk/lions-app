import { Page } from "@/components/Layout"

// 110-SL-CM-14 게이트 페이지 (화면 이동 중 · 외부 서비스·다른 화면으로 넘어가는 동안 잠깐 보여주는 전체 화면)

export function GateScreen() {
  return (
    <Page className="items-center justify-center">
      <div className="flex w-full flex-col items-center gap-6 px-8 text-center">
        {/* 로딩 스피너 */}
        <div className="relative flex h-20 w-20 items-center justify-center">
          <div className="absolute inset-0 rounded-full border-4 border-[#DDE1EC]" />
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-[#1B5BF0]" />
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-bold text-[#111827]">
            화면 이동중입니다.
          </h2>
          <p className="whitespace-pre-line text-sm leading-relaxed text-[#64748B]">
            {"잠시만 기다려 주세요."}
          </p>
        </div>
      </div>
    </Page>
  )
}
