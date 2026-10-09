import { useState } from "react"

import { PH } from "@/components/Placeholder"

import { Header } from "@/components/Layout"

import { STADIUM_TABS } from "@/data/game"

export function StadiumScreen() {
  const [tab, setTab] = useState(0)

  return (
    <div className="min-h-full bg-[#F5F7FB] pb-8">
      <Header title="대구삼성라이온즈파크" />

      {/* Tab bar */}
      <div
        className="flex border-b border-[#DDE1EC] bg-white overflow-x-auto"
        style={{ scrollbarWidth: "none" }}
      >
        {STADIUM_TABS.map((t, i) => (
          <button
            key={i}
            onClick={() => setTab(i)}
            className={`shrink-0 px-4 py-3 text-[13px] font-semibold border-b-2 transition-colors ${
              tab === i
                ? "border-[#1B5BF0] text-[#1B5BF0]"
                : "border-transparent text-[#9CA3AF]"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* 식음매장 */}
      {tab === 0 && (
        <div className="pb-4">
          <div className="px-4 py-4">
            <PH className="w-full h-44 rounded-2xl" />
          </div>
          <div className="px-4 mb-4">
            <div
              className="flex gap-2 overflow-x-auto"
              style={{ scrollbarWidth: "none" }}
            >
              {["전체", "한식", "양식", "분식", "음료", "주류"].map((c, i) => (
                <span
                  key={c}
                  className={`shrink-0 px-3 py-1 rounded-full text-[12px] font-semibold border ${
                    i === 0
                      ? "bg-[#0E1A40] text-white border-[#0E1A40]"
                      : "bg-white text-[#6B7280] border-[#DDE1EC]"
                  }`}
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
          <div className="px-4 flex flex-col gap-3">
            {[
              {
                name: "라팍 치킨",
                zone: "1루 외야",
                menu: "치킨·감자튀김·맥주",
                hours: "경기일 12:00~22:00",
              },

              {
                name: "삼성파이브 버거",
                zone: "3루 내야",
                menu: "수제버거·핫도그·콜라",
                hours: "경기일 12:00~21:00",
              },

              {
                name: "라이온 포차",
                zone: "외야 잔디석",
                menu: "족발·막창·생맥주",
                hours: "경기일 16:00~22:00",
              },

              {
                name: "블루스타 카페",
                zone: "1층 중앙",
                menu: "아메리카노·라떼·스무디",
                hours: "경기일 10:00~22:00",
              },

              {
                name: "파크뷰 도시락",
                zone: "3루 외야",
                menu: "도시락·김밥·떡볶이",
                hours: "경기일 11:00~20:00",
              },

              {
                name: "V9 라멘바",
                zone: "1루 내야",
                menu: "라멘·교자·하이볼",
                hours: "경기일 15:00~22:00",
              },
            ].map((s, i) => (
              <div
                key={i}
                className="flex gap-3 bg-white rounded-2xl border border-[#DDE1EC] p-3"
              >
                <PH className="w-16 h-16 rounded-xl shrink-0" />
                <div className="flex-1 flex flex-col gap-1 justify-center">
                  <p className="text-[14px] font-bold text-[#111827]">
                    {s.name}
                  </p>
                  <p className="text-[12px] text-[#6B7280]">{s.menu}</p>
                  <p className="text-[11px] text-[#9CA3AF]">
                    {s.zone} · {s.hours}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 교통/주차 */}
      {tab === 1 && (
        <div className="px-4 py-4 flex flex-col gap-4">
          <PH className="w-full h-52 rounded-2xl" />
          <div className="bg-white rounded-2xl border border-[#DDE1EC] p-4 flex flex-col gap-3">
            <p className="text-[15px] font-bold text-[#0E1A40]">대중교통</p>
            <div className="flex flex-col gap-2 text-[13px] text-[#374151]">
              <div className="flex gap-2">
                <span className="w-12 shrink-0 font-semibold text-[#1B5BF0]">
                  지하철
                </span>
                <span>
                  1호선 아양교역 1번 출구 도보 10분 / 2호선 대구스타디움역 셔틀
                  운행
                </span>
              </div>
              <div className="flex gap-2">
                <span className="w-12 shrink-0 font-semibold text-[#1B5BF0]">
                  버스
                </span>
                <span>
                  순환3(-1), 349, 509번 → 삼성라이온즈파크 정류장 하차
                </span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-[#DDE1EC] p-4 flex flex-col gap-3">
            <p className="text-[15px] font-bold text-[#0E1A40]">주차 안내</p>
            <div className="flex flex-col gap-2 text-[13px] text-[#374151]">
              <div className="flex gap-2">
                <span className="w-16 shrink-0 font-semibold text-[#374151]">
                  주차 요금
                </span>
                <span>최초 30분 무료 / 이후 10분당 500원</span>
              </div>
              <div className="flex gap-2">
                <span className="w-16 shrink-0 font-semibold text-[#374151]">
                  운영 시간
                </span>
                <span>경기 시작 3시간 전 ~ 경기 종료 후 1시간</span>
              </div>
              <div className="flex gap-2">
                <span className="w-16 shrink-0 font-semibold text-[#374151]">
                  주차 대수
                </span>
                <span>본관 주차장 1,200대 / 외야 주차장 800대</span>
              </div>
            </div>
          </div>
          <div className="bg-[#FFF7ED] rounded-2xl border border-[#FED7AA] p-4">
            <p className="text-[12px] text-[#EA580C] font-semibold">
              ⚠️ 홈경기 당일은 주차장 혼잡이 예상됩니다. 대중교통 이용을
              권장합니다.
            </p>
          </div>
        </div>
      )}

      {/* 편의시설 */}
      {tab === 2 && (
        <div className="px-4 py-4 flex flex-col gap-3">
          {[
            {
              icon: "🏥",
              name: "의무실",
              desc: "1루 내야 1층, 응급처치 및 의료 지원",
              hours: "경기일 상시 운영",
            },

            {
              icon: "👶",
              name: "수유실",
              desc: "1루·3루 내야 각 1층, 기저귀 교환대 완비",
              hours: "경기일 12:00~경기 종료",
            },

            {
              icon: "♿",
              name: "장애인석",
              desc: "1루·3루 내야 전용 구역, 엘리베이터 연결",
              hours: "상시 이용 가능",
            },

            {
              icon: "🎒",
              name: "물품보관소",
              name2: "",
              desc: "정문·3루 입구 각 1개소, 무료 이용",
              hours: "경기일 12:00~경기 종료 후 30분",
            },

            {
              icon: "🛍️",
              name: "공식 굿즈샵",
              desc: "정문 1층 및 외야 팝업스토어 운영",
              hours: "경기일 12:00~22:00",
            },

            {
              icon: "📸",
              name: "포토존",
              desc: "외야 잔디석 입구 및 1루 내야 홈플레이트 앞",
              hours: "경기일 상시 운영",
            },
          ].map((f, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-[#DDE1EC] p-4 flex gap-3 items-start"
            >
              <span className="text-2xl">{f.icon}</span>
              <div className="flex flex-col gap-0.5">
                <p className="text-[14px] font-bold text-[#111827]">{f.name}</p>
                <p className="text-[12px] text-[#6B7280]">{f.desc}</p>
                <p className="text-[11px] text-[#9CA3AF]">{f.hours}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 좌석 배치 */}
      {tab === 3 && (
        <div className="px-4 py-4 flex flex-col gap-4">
          <PH className="w-full h-64 rounded-2xl" />
          <div className="flex flex-col gap-2">
            {[
              {
                name: "테이블석",
                color: "#7C3AED",
                desc: "1루·3루 내야 프리미엄 좌석, 테이블 및 모니터 제공",
                price: "75,000원~",
              },

              {
                name: "프리미엄석",
                color: "#1B5BF0",
                desc: "1루·3루 내야 지정석, 넓은 시야 확보",
                price: "45,000원~",
              },

              {
                name: "내야 지정석",
                color: "#0EA5E9",
                desc: "1·3루 내야 일반 지정석",
                price: "18,000원~",
              },

              {
                name: "외야 블루석",
                color: "#16A34A",
                desc: "외야 응원 구역, 라이온즈 응원단과 함께",
                price: "12,000원~",
              },

              {
                name: "잔디석",
                color: "#84CC16",
                desc: "외야 잔디 위 돗자리 관람",
                price: "8,000원~",
              },
            ].map((s, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-[#DDE1EC] p-4 flex items-center gap-3"
              >
                <div
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ background: s.color }}
                />
                <div className="flex-1">
                  <p className="text-[14px] font-bold text-[#111827]">
                    {s.name}
                  </p>
                  <p className="text-[12px] text-[#6B7280]">{s.desc}</p>
                </div>
                <span className="text-[13px] font-semibold text-[#1B5BF0] shrink-0">
                  {s.price}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 이용 안내 */}
      {tab === 4 && (
        <div className="px-4 py-4 flex flex-col gap-4">
          <div className="bg-white rounded-2xl border border-[#DDE1EC] p-4 flex flex-col gap-3">
            <p className="text-[15px] font-bold text-[#0E1A40]">
              반입 금지 물품
            </p>
            <ul className="flex flex-col gap-1.5 text-[13px] text-[#374151]">
              {[
                "부부젤라, 메가폰 등 소음 기구",
                "외부 음식물 (단, 생수·유아식 제외)",
                "우산 (우비만 허용)",
                "대형 현수막 (50cm×50cm 초과)",
                "드론 및 촬영 장비",
                "위험물 및 인화성 물질",
              ].map((item, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-[#EF4444] font-bold">✕</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-2xl border border-[#DDE1EC] p-4 flex flex-col gap-3">
            <p className="text-[15px] font-bold text-[#0E1A40]">입장 안내</p>
            <div className="flex flex-col gap-2 text-[13px] text-[#374151]">
              <div className="flex gap-2">
                <span className="w-20 shrink-0 font-semibold">게이트 오픈</span>
                <span>경기 시작 2시간 전</span>
              </div>
              <div className="flex gap-2">
                <span className="w-20 shrink-0 font-semibold">본인 확인</span>
                <span>스마트 티켓 또는 신분증 지참</span>
              </div>
              <div className="flex gap-2">
                <span className="w-20 shrink-0 font-semibold">재입장</span>
                <span>당일 재입장 1회 허용 (스탬프 필수)</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-[#DDE1EC] p-4 flex flex-col gap-3">
            <p className="text-[15px] font-bold text-[#0E1A40]">환불 정책</p>
            <ul className="flex flex-col gap-1.5 text-[13px] text-[#374151]">
              <li>경기 시작 전 취소: 100% 환불</li>
              <li>경기 시작 후 취소: 환불 불가</li>
              <li>우천 취소 (3이닝 미만): 100% 환불</li>
              <li>우천 취소 (3이닝 이상): 환불 불가</li>
            </ul>
          </div>
        </div>
      )}

      {/* 라팍 소개 */}
      {tab === 5 && (
        <div className="flex flex-col gap-0 pb-4">
          <PH className="w-full h-56 rounded-none" />
          <div className="px-4 py-5 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <p className="text-[11px] font-semibold text-[#1B5BF0] tracking-wider uppercase">
                Samsung Lions Park
              </p>
              <h2 className="text-[20px] font-black text-[#0E1A40] leading-snug">
                대구삼성라이온즈파크
              </h2>
            </div>
            <p className="text-[13px] text-[#374151] leading-relaxed">
              2016년 개장한 대구삼성라이온즈파크는 수용 인원 29,000명 규모의
              현대식 돔형 야구장입니다. 삼성 라이온즈의 홈 구장으로, 최첨단
              시설과 팬 친화적인 환경을 갖추고 있습니다.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "개장", value: "2016년 3월" },

                { label: "수용 인원", value: "29,000명" },

                { label: "구장 형태", value: "개방형 자연잔디" },

                { label: "위치", value: "대구광역시 수성구" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-[#DDE1EC] p-3 flex flex-col gap-1"
                >
                  <p className="text-[11px] text-[#9CA3AF]">{item.label}</p>
                  <p className="text-[14px] font-bold text-[#111827]">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
            <PH className="w-full h-44 rounded-2xl" />
            <div className="flex flex-col gap-2">
              <p className="text-[15px] font-bold text-[#0E1A40]">구장 특징</p>
              <ul className="flex flex-col gap-2 text-[13px] text-[#374151]">
                {[
                  "내·외야를 아우르는 파노라믹 관람 시야",

                  "1루·3루 프리미엄 테이블석과 루프탑 전망 구역",

                  "외야 천연잔디 피크닉존 및 어린이 놀이공간",

                  "삼성 라이온즈 역사관 및 기념품 전시 공간",

                  "전 좌석 USB 충전 포트 및 무료 Wi-Fi 제공",
                ].map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-[#1B5BF0] font-bold">·</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
