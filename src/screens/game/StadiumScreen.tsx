import { useState } from "react"
import { useLocation } from "react-router-dom"

import { PH, PHImage } from "@/components/Placeholder"

import { Header } from "@/components/Layout"

import { STADIUM_TABS } from "@/data/game"

const EVAC_FLOORS = [3, 4, 5] as const

export function StadiumScreen() {
  const location = useLocation()
  const [floor, setFloor] = useState<(typeof EVAC_FLOORS)[number]>(3)
  const [zoom, setZoom] = useState<string | null>(null)
  const [tab, setTab] = useState<number>(
    (location.state as { tab?: number } | null)?.tab ?? 0,
  )

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
      {tab === 1 && (
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

      {/* 교통 */}
      {tab === 4 && (
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
        </div>
      )}

      {/* 주차 */}
      {tab === 5 && (
        <div className="px-4 py-4 flex flex-col gap-4">
          <PH className="w-full h-52 rounded-2xl" />
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

      {/* 구장 소개 */}
      {tab === 0 && (
        <div className="pb-4">
          <PHImage
            className="h-56"
            label="구장 대표 이미지 (팔각 다이아몬드 전경)"
          />
          <div className="px-4 py-5 flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <p className="text-[11px] font-semibold text-[#1B5BF0] tracking-wider uppercase">
                Samsung Lions Park
              </p>
              <h2 className="text-[20px] font-black text-[#0E1A40] leading-snug">
                대구삼성라이온즈파크
              </h2>
            </div>
            <div className="flex flex-col gap-2 text-[13px] text-[#374151] leading-relaxed">
              <p>
                삼성라이온즈파크는 국내 최초의 팔각 다이아몬드 형태로 설계된
                야구장입니다.
              </p>
              <p>
                최고의 전문성을 갖춘 Professional Park, 관중과 최강구단을 위한
                차별화된 Different Park, 자연과 시민이 함께 공존하는 친환경 Eco
                Park를 지향하는 야구장입니다.
              </p>
            </div>

            {/* 구장 정보 */}
            <div className="bg-white rounded-2xl border border-[#DDE1EC] divide-y divide-[#EEF0F6]">
              {[
                { label: "위치", value: "대구광역시 수성구 야구전설로 1" },
                { label: "대지면적", value: "151,379㎡ (45,792평)" },
                { label: "연면적", value: "46,943㎡ (14,200평)" },
                { label: "수용인원", value: "24,000명" },
                { label: "개장연도", value: "2016년" },
                { label: "펜스", value: "좌우측펜스 99m, 중앙펜스 122m" },
              ].map((row) => (
                <div key={row.label} className="flex gap-3 px-4 py-3 text-[13px]">
                  <span className="w-16 shrink-0 font-semibold text-[#6B7280]">
                    {row.label}
                  </span>
                  <span className="text-[#111827]">{row.value}</span>
                </div>
              ))}
            </div>

            {/* 구장 특징 */}
            <div className="flex flex-col gap-3">
              <p className="text-[15px] font-bold text-[#0E1A40]">구장 특징</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  {
                    tag: "Octagon",
                    title: "팔각 다이아몬드",
                    desc: "국내 최초의 팔각 다이아몬드 형태로 설계",
                    color: "#0E1A40",
                  },
                  {
                    tag: "Professional",
                    title: "Professional Park",
                    desc: "최고의 전문성을 갖춘 야구장",
                    color: "#1B5BF0",
                  },
                  {
                    tag: "Different",
                    title: "Different Park",
                    desc: "관중과 최강구단을 위한 차별화된 야구장",
                    color: "#7C3AED",
                  },
                  {
                    tag: "Eco",
                    title: "Eco Park",
                    desc: "자연과 시민이 함께 공존하는 친환경 야구장",
                    color: "#16A34A",
                  },
                ].map((f) => (
                  <div
                    key={f.tag}
                    className="rounded-2xl p-4 flex flex-col gap-2 min-h-[132px] text-white"
                    style={{ background: f.color }}
                  >
                    <span className="text-[10px] font-semibold tracking-wider uppercase text-white/70">
                      {f.tag}
                    </span>
                    <p className="text-[15px] font-black leading-tight">
                      {f.title}
                    </p>
                    <p className="text-[12px] leading-snug text-white/85">
                      {f.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 구장 구조 / 피난 안내도: 모바일 세로, PC 좌우 */}
            <div className="flex flex-col gap-5 lg:grid lg:grid-cols-2 lg:gap-6">
              <div className="flex flex-col gap-2">
                <p className="text-[15px] font-bold text-[#0E1A40] leading-[30px]">
                  구장 구조
                </p>
                <button
                  onClick={() => setZoom("구장 구조도")}
                  className="relative block w-full aspect-square rounded-2xl overflow-hidden"
                >
                  <PHImage
                    className="h-full"
                    rounded="rounded-2xl"
                    label="구장 구조도 (정사각형, 탭하면 확대)"
                  />
                  <span className="absolute right-2 bottom-2 text-[11px] font-semibold bg-black/55 text-white rounded-full px-2.5 py-1">
                    🔍 확대
                  </span>
                </button>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <p className="text-[15px] font-bold text-[#0E1A40]">
                    피난 안내도
                  </p>
                  <div className="flex gap-1.5">
                  {EVAC_FLOORS.map((f) => (
                    <button
                      key={f}
                      onClick={() => setFloor(f)}
                      className={`px-3 py-1 rounded-full text-[12px] font-semibold border ${
                        floor === f
                          ? "bg-[#0E1A40] text-white border-[#0E1A40]"
                          : "bg-white text-[#6B7280] border-[#DDE1EC]"
                      }`}
                    >
                      {f}층
                    </button>
                  ))}
                  </div>
                </div>
                <button
                  onClick={() => setZoom(`피난 안내도 ${floor}층`)}
                  className="relative block w-full aspect-square rounded-2xl overflow-hidden"
                >
                  <PHImage
                    className="h-full"
                    rounded="rounded-2xl"
                    label={`피난 안내도 ${floor}층 (정사각형, 탭하면 확대)`}
                  />
                  <span className="absolute right-2 bottom-2 text-[11px] font-semibold bg-black/55 text-white rounded-full px-2.5 py-1">
                    🔍 확대
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 이미지 확대 모달 */}
      {zoom && (
        <div
          className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4 lg:p-8"
          onClick={() => setZoom(null)}
        >
          <div
            className="w-full max-w-[560px] lg:max-w-[1440px] flex flex-col gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between text-white">
              <p className="text-[15px] font-bold">{zoom}</p>
              <button
                onClick={() => setZoom(null)}
                aria-label="닫기"
                className="w-8 h-8 rounded-full bg-white/15 text-[18px] leading-none"
              >
                ✕
              </button>
            </div>
            <div className="w-full aspect-square lg:aspect-auto lg:h-[calc(100vh-120px)]">
              <PHImage
                className="h-full"
                rounded="rounded-2xl"
                label={`${zoom} 확대 이미지`}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
