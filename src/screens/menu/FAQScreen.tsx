import React from "react"

import { Header } from "@/components/Layout"

// 085-SL-AL-31 FAQ

export function FAQScreen() {
  const [activeTab, setActiveTab] = React.useState(0)

  const [openIndex, setOpenIndex] = React.useState<number | null>(0)

  const categories = [
    "전체",
    "자주 묻는 질문",
    "경기 관람",
    "예매",
    "구장 이용",
    "회원 / 앱 관련",
    "굿즈 / 상품",
    "이벤트",
    "기타",
  ]

  const faqData: Record<string, { q: string a: string }[]> = {
    전체: [
      {
        q: "티켓 예매는 어떻게 하나요?",
        a: "앱 하단 티켓+ 메뉴에서 경기를 선택한 후 좌석을 고르고 결제하시면 됩니다.",
      },

      {
        q: "경기 시작 시간은 언제인가요?",
        a: "홈경기 기준 평일 18:30, 주말 17:00 시작이며 경기마다 다를 수 있습니다.",
      },

      {
        q: "직관 인증은 어떻게 하나요?",
        a: "라운지 > 블루 시그널 메뉴에서 위치 인증 후 직관 등록이 가능합니다.",
      },

      {
        q: "예매 취소 및 환불 정책이 어떻게 되나요?",
        a: "경기 시작 4시간 전까지 취소할 수 있으며, 이후에는 취소가 불가합니다. 예매수수료는 예매 당일 자정까지 취소할 때만 환불됩니다. 우천 등으로 경기가 취소되면 전액 자동 환불됩니다.",
      },

      {
        q: "굿즈는 어디서 구매할 수 있나요?",
        a: "티켓+ > 베리즈 샵에서 온라인 구매 가능하며, 라이온즈 파크 내 매장에서도 직접 구매하실 수 있습니다.",
      },

      {
        q: "라이온즈 멤버십은 어떤 혜택이 있나요?",
        a: "라이온즈 멤버십 가입 시 선예매 우선권, 앰블럼 적립, 굿즈 할인 등 다양한 혜택이 제공됩니다.",
      },

      {
        q: "라이온즈 파크 주차는 가능한가요?",
        a: "경기 당일 유료 주차 가능합니다. 대중교통 이용을 권장드립니다.",
      },

      {
        q: "앱 로그인이 안 됩니다.",
        a: "아이디/비밀번호를 다시 확인해 주시거나, 비밀번호 찾기를 이용해 주세요.",
      },
    ],

    "자주 묻는 질문": [
      {
        q: "티켓 예매는 어떻게 하나요?",
        a: "앱 하단 티켓+ 메뉴에서 경기를 선택한 후 좌석을 고르고 결제하시면 됩니다.",
      },

      {
        q: "예매 취소 및 환불 정책이 어떻게 되나요?",
        a: "경기 시작 4시간 전까지 취소할 수 있으며, 이후에는 취소가 불가합니다. 예매수수료는 예매 당일 자정까지 취소할 때만 환불됩니다. 우천 등으로 경기가 취소되면 전액 자동 환불됩니다.",
      },

      {
        q: "라이온즈 멤버십은 어떤 혜택이 있나요?",
        a: "라이온즈 멤버십 가입 시 선예매 우선권, 앰블럼 적립, 굿즈 할인 등 다양한 혜택이 제공됩니다.",
      },
    ],

    "경기 관람": [
      {
        q: "경기 시작 시간은 언제인가요?",
        a: "홈경기 기준 평일 18:30, 주말 17:00 시작이며 경기마다 다를 수 있습니다.",
      },

      {
        q: "경기장 반입 금지 물품이 있나요?",
        a: "우산(투명 우산 가능), 외부 음식, 캔·유리병 음료는 반입이 제한됩니다.",
      },

      {
        q: "직관 인증은 어떻게 하나요?",
        a: "라운지 > 블루 시그널 메뉴에서 위치 인증 후 직관 등록이 가능합니다.",
      },
    ],

    예매: [
      {
        q: "티켓 예매는 어떻게 하나요?",
        a: "앱 하단 티켓+ 메뉴에서 경기를 선택한 후 좌석을 고르고 결제하시면 됩니다.",
      },

      {
        q: "예매 취소 및 환불 정책이 어떻게 되나요?",
        a: "경기 시작 4시간 전까지 취소할 수 있으며, 이후에는 취소가 불가합니다. 예매수수료는 예매 당일 자정까지 취소할 때만 환불됩니다. 우천 등으로 경기가 취소되면 전액 자동 환불됩니다.",
      },

      {
        q: "선예매는 언제 열리나요?",
        a: "라이온즈 멤버십·시즌권 회원은 경기 7일 전 오전 10시에 선예매가 열리고, 일반 예매는 같은 날 오전 11시에 열립니다.",
      },

      {
        q: "한 경기에 몇 장까지 예매할 수 있나요?",
        a: "경기당 1인 기준으로 선예매는 보유한 매수권만큼(최대 4매), 일반 예매는 최대 6매까지 가능합니다. 일반 예매는 선예매 매수를 포함해 합산하므로, 선예매로 4매를 예매했다면 일반 예매에서 2매까지 가능합니다.",
      },

      {
        q: "티켓 선물하기는 어떻게 하나요?",
        a: "MY > 티켓 선물하기 메뉴에서 예매한 티켓을 카카오톡으로 선물할 수 있습니다.",
      },
    ],

    "구장 이용": [
      {
        q: "라이온즈 파크 주차는 가능한가요?",
        a: "경기 당일 유료 주차 가능합니다. 대중교통 이용을 권장드립니다.",
      },

      {
        q: "경기장 내 음식 반입이 가능한가요?",
        a: "캔·유리병 음료와 외부 취식은 제한됩니다. 내부 매점 이용을 권장합니다.",
      },

      {
        q: "장애인 관람석은 어떻게 예매하나요?",
        a: "고객센터(1588-0000)로 문의 주시면 안내해 드립니다.",
      },
    ],

    "회원 / 앱 관련": [
      {
        q: "앱 로그인이 안 됩니다.",
        a: "아이디/비밀번호를 다시 확인해 주시거나, 비밀번호 찾기를 이용해 주세요.",
      },

      {
        q: "라이온즈 멤버십은 어떤 혜택이 있나요?",
        a: "라이온즈 멤버십 가입 시 선예매 우선권, 앰블럼 적립, 굿즈 할인 등 다양한 혜택이 제공됩니다.",
      },

      {
        q: "회원 탈퇴는 어떻게 하나요?",
        a: "MY > 설정 > 계정 관리 메뉴에서 회원 탈퇴를 진행할 수 있습니다.",
      },

      {
        q: "푸시 알림이 오지 않아요.",
        a: "기기 설정에서 삼성 라이온즈 앱의 알림 권한이 허용되어 있는지 확인해 주세요.",
      },
    ],

    "굿즈 / 상품": [
      {
        q: "굿즈는 어디서 구매할 수 있나요?",
        a: "티켓+ > 베리즈 샵에서 온라인 구매 가능하며, 라이온즈 파크 내 매장에서도 직접 구매하실 수 있습니다.",
      },

      {
        q: "디지털 굿즈는 어떻게 사용하나요?",
        a: "라운지 > 디지털 굿즈에서 다운로드 후 배경화면·스티커 등으로 활용 가능합니다.",
      },

      {
        q: "교환·반품이 가능한가요?",
        a: "수령 후 7일 이내 미사용 상품에 한해 교환·반품이 가능합니다.",
      },
    ],

    이벤트: [
      {
        q: "이벤트 당첨 결과는 어디서 확인하나요?",
        a: "MY > 이벤트 내역 메뉴에서 참여 내역 및 당첨 결과를 확인할 수 있습니다.",
      },

      {
        q: "오늘의 미션은 어떻게 참여하나요?",
        a: "라운지 > 오늘의 미션에서 퀴즈에 참여하면 경기 종료 후 추첨을 통해 경품이 지급됩니다.",
      },
    ],

    기타: [
      {
        q: "구단 공식 SNS 채널이 어디에 있나요?",
        a: "유튜브, 인스타그램, X(트위터)에서 @SamsungLions를 검색하시면 됩니다.",
      },
    ],
  }

  const currentFAQs = faqData[categories[activeTab]] ?? []

  return (
    <div className="min-h-full bg-[#F5F7FB] pb-4">
      <Header title="자주 묻는 질문" />

      {/* Search */}
      <div className="px-4 py-3">
        <div className="h-12 bg-[#FFFFFF] border border-[#DDE1EC] rounded-2xl flex items-center px-4 gap-3">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="8" stroke="#4A5570" strokeWidth="2" />
            <path
              d="M21 21l-4.35-4.35"
              stroke="#4A5570"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <span className="text-[13px] text-[#9CA3AF]">
            궁금한 내용을 검색해보세요
          </span>
        </div>
      </div>

      {/* Category tabs — horizontal scroll */}
      <div
        className="flex gap-2 overflow-x-auto pb-3 px-4"
        style={{ scrollbarWidth: "none" }}
      >
        {categories.map((c, i) => (
          <button
            key={c}
            onClick={() => {
              setActiveTab(i)
              setOpenIndex(null)
            }}
            className={`shrink-0 h-8 px-3 rounded-full text-[12px] font-semibold transition-colors whitespace-nowrap ${
              activeTab === i
                ? "bg-[#1B5BF0] text-white"
                : "bg-[#FFFFFF] border border-[#DDE1EC] text-[#64748B]"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* FAQ list — accordion */}
      <div className="px-4 flex flex-col gap-2">
        {currentFAQs.map((item, i) => (
          <div
            key={i}
            className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] overflow-hidden"
          >
            <button
              className="w-full flex items-start gap-3 p-4 text-left"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <span className="text-[#1B5BF0] font-bold text-sm shrink-0 mt-0.5">
                Q
              </span>
              <span className="flex-1 text-[13px] font-medium text-[#111827] leading-snug">
                {item.q}
              </span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                className={`shrink-0 mt-0.5 transition-transform ${
                  openIndex === i ? "rotate-180" : ""
                }`}
              >
                <path
                  d="M6 9l6 6 6-6"
                  stroke="#4A5570"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            {openIndex === i && (
              <div className="px-4 pb-4 flex items-start gap-3 border-t border-[#F5F7FB]">
                <span className="text-[#64748B] font-bold text-sm shrink-0 mt-3">
                  A
                </span>
                <p className="flex-1 text-[12px] text-[#64748B] leading-relaxed mt-3">
                  {item.a}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
