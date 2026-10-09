import { useState } from "react"

import { PH } from "@/components/Placeholder"

import { Header } from "@/components/Layout"

// 025(027)-SL-LG-08 디지털 굿즈 사용 방법

export function DigitalGuideScreen() {
  const [guideType, setGuideType] = useState<"스티커" | "템플릿(굿노트)">(
    "스티커",
  )

  const stickerSteps = [
    {
      title: "스티커 꾹 눌러 복사하기",

      details: [
        "스마트폰 갤러리(사진 앱)에서 다운로드한 스티커 이미지를 엽니다.",

        "이미지를 지그시 꾹 누른 후 [복사하기]를 눌러주세요.",
      ],
    },

    {
      title: "인스타 스토리 열고 배경 준비하기",

      details: [
        "인스타그램 앱을 켜고 스토리 만들기 화면으로 이동합니다.",

        "원하는 배경 사진이나 영상을 먼저 불러옵니다.",
      ],
    },

    {
      title: "화면 터치해서 붙여넣기",

      details: [
        "텍스트 입력창을 띄우듯이 화면을 한 번 툭 터치한 후, [붙여넣기]를 누르면 스티커가 쏙 들어옵니다.",

        "(아이폰의 경우, 스토리를 열자마자 왼쪽 아래에 팝업으로 뜨는 스티커 아이콘을 바로 눌러도 돼요!)",
      ],
    },
  ]

  const templateSteps = [
    {
      title: "PDF 템플릿 다운로드하기",

      details: [
        "제공된 다운로드 링크를 눌러 PDF 파일을 스마트폰이나 태블릿에 저장해 주세요.",

        "*팁: 파일을 저장할 때 [파일 앱]의 다운로드 폴더나 iCloud 등에 저장해 두면 찾기 쉽습니다.",
      ],
    },

    {
      title: "굿노트(Goodnotes) 앱 열기",

      details: [
        "굿노트 앱을 실행한 뒤, 메인 화면(신규 추가 화면)으로 이동합니다.",

        "화면에 보이는 [+] 버튼 (새로 만들기/신규)을 눌러주세요.",
      ],
    },

    {
      title: "[불러오기] 선택 후 파일 열기",

      details: [
        "메뉴 항목 중 [불러오기(Import)]를 선택합니다.",

        "Step 1에서 다운로드해 둔 PDF 파일을 터치하면, 템플릿이 새 노트로 즉시 열리며 바로 필기할 수 있습니다!",
      ],
    },
  ]

  const steps = guideType === "스티커" ? stickerSteps : templateSteps

  return (
    <div className="min-h-full bg-[#F5F7FB] pb-4">
      <Header title="이용 방법" />

      <div className="px-4 pt-4 flex flex-col gap-4">
        <div className="grid grid-cols-2 rounded-xl bg-[#E8EBF4] p-1">
          {(["스티커", "템플릿(굿노트)"] as const).map((type) => (
            <button
              type="button"
              key={type}
              onClick={() => setGuideType(type)}
              className={`h-9 rounded-lg text-[12px] font-semibold transition-colors ${
                guideType === type
                  ? "bg-white text-[#1B5BF0] shadow-sm"
                  : "text-[#64748B]"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {steps.map((step, i) => (
          <div
            key={step.title}
            className="overflow-hidden rounded-2xl border border-[#DDE1EC] bg-white"
          >
            <div className="flex items-center gap-3 border-b border-[#F1F3F8] px-4 py-3.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1B5BF0]">
                <span className="text-[11px] font-bold text-white">
                  {i + 1}
                </span>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wide text-[#1B5BF0]">
                  Step {i + 1}
                </p>
                <p className="text-[14px] font-semibold text-[#111827]">
                  {step.title}
                </p>
              </div>
            </div>
            <PH className="h-40 w-full rounded-none" />
            <div className="flex flex-col gap-3 p-4">
              {step.details.map((detail) => (
                <div key={detail} className="flex items-start gap-2">
                  <span className="mt-0.5 shrink-0 text-[12px] font-bold text-[#1B5BF0]">
                    •
                  </span>
                  <p className="text-[12px] leading-relaxed text-[#64748B]">
                    {detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
