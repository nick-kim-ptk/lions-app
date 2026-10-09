import { useNavigate } from "react-router-dom"

import { Header } from "@/components/Layout"

import { MemberCard, type MemberCardKind } from "@/components/MemberCard"

// 048(050)-SL-MY-21 나의 멤버십/시즌권 — 멤버십·시즌권을 나누지 않고 가입한 카드를 쭉 나열

const SECTIONS: {
  kind: MemberCardKind
  title: string
  dot: string
  benefits: string[]
}[] = [
  {
    kind: "blue",

    title: "라이온즈 멤버십 혜택",

    dot: "bg-[#1B5BF0]",

    benefits: [
      "홈경기 선예매 혜택 (경기 7일 전 10:00, 보유 매수권만큼, 경기당 최대 4매)",

      "티켓 결제 시 블루포인트 3% 적립",

      "구단 공식 쇼핑몰 5% 할인 쿠폰 제공",

      "멤버십 전용 독점 라이브 콘텐츠 시청권",

      "시즌 종료 후 회원 전용 팬미팅 추첨 응모권",
    ],
  },

  {
    kind: "season",

    title: "시즌권 혜택",

    dot: "bg-[#0E2F80]",

    benefits: [
      "지정 좌석 시즌 전 경기 무제한 입장",

      "시즌권 전용 라운지 및 편의시설 우선 이용",

      "구단 공식 쇼핑몰 10% 할인 쿠폰 제공",

      "선수단 팬사인회 및 미팅 우선 초청",

      "홈경기 주차권 시즌 전체 무료 제공",
    ],
  },

  {
    kind: "kids",

    title: "어린이 멤버십 혜택",

    dot: "bg-[#F0A500]",

    benefits: [
      "어린이 회원 전용 홈경기 지정석 30% 할인",

      "2027 시즌 어린이 회원 전용 웰컴 기프트 패키지 제공",

      "라팍 어린이날 특별 이벤트 및 체험행사 우선참가권",

      "주말 홈경기 시구 / 시타자 이벤트 응모 자격",

      "어린이 회원 전용 디지털 랜선 팬미팅 참여권",
    ],
  },
]

export function MembershipScreen() {
  const navigate = useNavigate()

  return (
    <div className="min-h-full bg-[#F5F7FB] pb-6">
      <Header
        title="나의 멤버십/시즌권"
        rightSlot={
          <button
            onClick={() => navigate("/my/membership-history")}
            className="flex items-center gap-0.5 text-[12px] text-[#1B5BF0] font-semibold"
          >
            가입 내역
          </button>
        }
      />
      <div className="px-4 pt-4 flex flex-col gap-6">
        {SECTIONS.map((sec) => (
          <div key={sec.kind} className="flex flex-col gap-3">
            {/* MY 홈과 같은 9:16 카드 */}
            <div className="mx-auto w-[50%]">
              <MemberCard kind={sec.kind} />
            </div>
            <div className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] p-4 shadow-2xs">
              <p className="text-xs font-bold text-[#111827] mb-3">
                {sec.title}
              </p>
              <div className="flex flex-col gap-2.5 text-xs text-[#374151]">
                {sec.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div
                      className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${sec.dot}`}
                    />
                    <span className="leading-tight">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
