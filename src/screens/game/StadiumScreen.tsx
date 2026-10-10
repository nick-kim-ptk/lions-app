import { useState } from "react"
import { useLocation } from "react-router-dom"

import { PH, PHImage } from "@/components/Placeholder"
import { FloorMap } from "@/components/FloorMap"
import { FacilityTab } from "./FacilityTab"
import { SeatTab } from "./SeatTab"

import { Header } from "@/components/Layout"

import { STADIUM_TABS } from "@/data/game"
import { FOOD_FLOORS, FOOD_STORES, type FoodStore } from "@/data/food"

const EVAC_FLOORS = [3, 4, 5] as const

/** 식음매장 한 줄 카드 (전체·검색 결과용) */
function StoreRow({ st, onPick }: { st: FoodStore; onPick: () => void }) {
  return (
    <button
      onClick={onPick}
      className="flex gap-3 text-left rounded-2xl border border-[#DDE1EC] bg-white p-3"
    >
      <PH className="w-14 h-14 rounded-xl shrink-0" />
      <div className="flex-1 flex flex-col gap-0.5 justify-center min-w-0">
        <div className="flex items-center gap-1.5">
          <p className="text-[14px] font-bold text-[#111827] truncate">
            {st.name}
          </p>
          <span className="shrink-0 text-[10px] font-semibold text-[#1B5BF0] bg-[#EBF0FF] rounded-full px-2 py-0.5">
            {st.floor}층
          </span>
        </div>
        <p className="text-[12px] text-[#6B7280] truncate">
          {st.menus.map((m) => m.name).join("·")}
        </p>
        <p className="text-[11px] text-[#9CA3AF] truncate">{st.zone}</p>
      </div>
    </button>
  )
}

export function StadiumScreen() {
  const location = useLocation()
  const [floor, setFloor] = useState<(typeof EVAC_FLOORS)[number]>(3)
  const [zoom, setZoom] = useState<{
    title: string
    pin?: { x: number; y: number }
  } | null>(null)
  const [foodFloor, setFoodFloor] = useState<"전체" | (typeof FOOD_FLOORS)[number]>("전체")
  const [foodSel, setFoodSel] = useState<FoodStore | null>(null)
  const [foodQuery, setFoodQuery] = useState("")
  const q = foodQuery.trim().toLowerCase()
  // 검색: 매장명·분류·위치·메뉴명 어디든 포함되면 노출 (전 층 대상)
  const foodResults = q
    ? FOOD_STORES.filter((st) =>
        [st.name, st.category, st.zone, ...st.menus.map((m) => m.name)].some(
          (t) => t.toLowerCase().includes(q),
        ),
      )
    : []
  const foodList = FOOD_STORES.filter(
    (st) => foodFloor === "전체" || st.floor === foodFloor,
  )
  // 층 탭 선택: 특정 층이면 그 층의 첫 매장을 자동 선택해 지도를 바로 보여준다
  const pickFoodFloor = (f: "전체" | (typeof FOOD_FLOORS)[number]) => {
    setFoodFloor(f)
    setFoodSel(f === "전체" ? null : (FOOD_STORES.find((st) => st.floor === f) ?? null))
  }
  // 매장 선택: 전체 탭에서 누르면 해당 층 탭으로 이동한다
  const pickStore = (st: FoodStore) => {
    setFoodQuery("")
    setFoodFloor(st.floor)
    setFoodSel(st)
  }
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
        <div className="py-4 flex flex-col gap-4">
          {/* 검색 */}
          <div className="px-4">
            <div className="flex items-center gap-2 rounded-xl border border-[#DDE1EC] bg-white px-3 py-2.5">
              <span className="text-[14px] text-[#9CA3AF]">🔍</span>
              <input
                value={foodQuery}
                onChange={(e) => setFoodQuery(e.target.value)}
                placeholder="매장명, 메뉴명으로 검색"
                className="flex-1 min-w-0 bg-transparent text-[14px] text-[#111827] outline-none placeholder:text-[#9CA3AF]"
              />
              {foodQuery && (
                <button
                  onClick={() => setFoodQuery("")}
                  aria-label="검색어 지우기"
                  className="text-[12px] text-[#9CA3AF]"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* 층 탭 */}
          <div
            className="flex gap-2 overflow-x-auto px-4"
            style={{ scrollbarWidth: "none" }}
          >
            {(["전체", ...FOOD_FLOORS] as const).map((f) => (
              <button
                key={f}
                onClick={() => pickFoodFloor(f)}
                className={`shrink-0 px-3.5 py-1.5 rounded-full text-[12px] font-semibold border ${
                  foodFloor === f
                    ? "bg-[#0E1A40] text-white border-[#0E1A40]"
                    : "bg-white text-[#6B7280] border-[#DDE1EC]"
                }`}
              >
                {f === "전체" ? "전체" : `${f}층`}
              </button>
            ))}
          </div>

          {q ? (
            /* 검색 결과 (전 층) */
            <div className="px-4 flex flex-col gap-3">
              <p className="text-[13px] text-[#6B7280]">
                검색 결과 <span className="font-bold text-[#0E1A40]">{foodResults.length}</span>곳
              </p>
              {foodResults.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-[#DDE1EC] bg-white py-10 text-center text-[13px] text-[#9CA3AF]">
                  검색 결과가 없습니다.
                </div>
              ) : (
                <div className="flex flex-col gap-2 lg:grid lg:grid-cols-2 lg:gap-3">
                  {foodResults.map((st) => (
                    <StoreRow key={st.id} st={st} onPick={() => pickStore(st)} />
                  ))}
                </div>
              )}
            </div>
          ) : foodFloor === "전체" ? (
            /* 전체: 대표 메뉴 모음 + 층별 매장 */
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <p className="px-4 text-[15px] font-bold text-[#0E1A40]">
                  대표 메뉴
                </p>
                <div
                  className="flex gap-3 overflow-x-auto px-4 snap-x scroll-pl-4"
                  style={{ scrollbarWidth: "none" }}
                >
                  {FOOD_STORES.map((st) => (
                    <button
                      key={st.id}
                      onClick={() => pickStore(st)}
                      className="shrink-0 snap-start w-[132px] text-left flex flex-col gap-1.5"
                    >
                      <PH className="w-full aspect-square rounded-2xl" />
                      <p className="text-[13px] font-semibold text-[#111827] leading-tight truncate">
                        {st.menus[0].name}
                      </p>
                      <p className="text-[12px] font-bold text-[#1B5BF0]">
                        {st.menus[0].price.toLocaleString()}원
                      </p>
                      <p className="text-[11px] text-[#9CA3AF] truncate">
                        {st.floor}층 · {st.name}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {FOOD_FLOORS.map((fl) => {
                const list = FOOD_STORES.filter((st) => st.floor === fl)

                if (list.length === 0) return null

                return (
                  <div key={fl} className="px-4 flex flex-col gap-2">
                    <div className="flex items-baseline gap-2">
                      <p className="text-[15px] font-bold text-[#0E1A40]">
                        {fl}층
                      </p>
                      <span className="text-[12px] text-[#9CA3AF]">
                        매장 {list.length}곳
                      </span>
                    </div>
                    <div className="flex flex-col gap-2 lg:grid lg:grid-cols-2 lg:gap-3">
                      {list.map((st) => (
                        <StoreRow key={st.id} st={st} onPick={() => pickStore(st)} />
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
          <div className="flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:gap-6 lg:items-start lg:px-4">
            {/* 매장 리스트: 모바일은 가로 스크롤 카드(지도 바로 위), PC는 세로 목록 */}
            <div
              className="flex gap-2 overflow-x-auto px-4 py-1 snap-x scroll-pl-4 lg:flex-col lg:overflow-visible lg:px-0 lg:py-0"
              style={{ scrollbarWidth: "none" }}
            >
              {foodList.map((st) => (
                <button
                  key={st.id}
                  onClick={() => pickStore(st)}
                  className={`shrink-0 snap-start w-[168px] lg:w-auto flex flex-col gap-2 lg:flex-row lg:gap-3 text-left rounded-2xl border p-3 bg-white ${
                    foodSel?.id === st.id
                      ? "border-[#1B5BF0] ring-1 ring-[#1B5BF0]"
                      : "border-[#DDE1EC]"
                  }`}
                >
                  <PH className="w-full h-20 lg:w-14 lg:h-14 rounded-xl shrink-0" />
                  <div className="flex-1 flex flex-col gap-0.5 justify-center min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="text-[14px] font-bold text-[#111827] truncate">
                        {st.name}
                      </p>
                      <span className="shrink-0 text-[10px] font-semibold text-[#1B5BF0] bg-[#EBF0FF] rounded-full px-2 py-0.5">
                        {st.floor}층
                      </span>
                    </div>
                    <p className="text-[12px] text-[#6B7280] truncate">
                      {st.menus.map((m) => m.name).join("·")}
                    </p>
                    <p className="text-[11px] text-[#9CA3AF] truncate">
                      {st.zone}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            {/* 위치 지도 + 매장 정보 */}
            <div className="flex flex-col gap-3 px-4 lg:px-0">
              {foodSel ? (
                <>
                  <p className="text-[15px] font-bold text-[#0E1A40]">
                    {foodSel.floor}층 위치
                  </p>
                  <button
                    onClick={() =>
                      setZoom({
                        title: `${foodSel.floor}층 식음매장 지도 · ${foodSel.name}`,
                        pin: { x: foodSel.x, y: foodSel.y },
                      })
                    }
                    className="relative block w-full aspect-square rounded-2xl overflow-hidden"
                  >
                    <FloorMap
                      label={`${foodSel.floor}층 평면도 (정사각형, 탭하면 확대)`}
                      pin={{ x: foodSel.x, y: foodSel.y }}
                    />
                    <span className="absolute right-2 bottom-2 text-[11px] font-semibold bg-black/55 text-white rounded-full px-2.5 py-1">
                      🔍 확대
                    </span>
                  </button>
                  <div className="bg-white rounded-2xl border border-[#DDE1EC] p-4 flex flex-col gap-4">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2">
                        <p className="text-[16px] font-black text-[#0E1A40]">
                          {foodSel.name}
                        </p>
                        <span className="text-[10px] font-semibold text-[#6B7280] bg-[#F3F4F6] rounded-full px-2 py-0.5">
                          {foodSel.category}
                        </span>
                      </div>
                      <div className="flex flex-col gap-2 text-[13px] text-[#374151]">
                        {[
                          {
                            label: "위치",
                            value: `${foodSel.floor}층 · ${foodSel.zone}`,
                          },
                          { label: "운영 시간", value: foodSel.hours },
                        ].map((row) => (
                          <div key={row.label} className="flex gap-3">
                            <span className="w-16 shrink-0 font-semibold text-[#6B7280]">
                              {row.label}
                            </span>
                            <span>{row.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="text-[13px] font-bold text-[#0E1A40]">
                        주요 메뉴
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        {foodSel.menus.map((m) => (
                          <div key={m.name} className="flex flex-col gap-1.5">
                            <PH className="w-full aspect-square rounded-xl" />
                            <p className="text-[12px] font-semibold text-[#111827] leading-tight">
                              {m.name}
                            </p>
                            <p className="text-[12px] font-bold text-[#1B5BF0]">
                              {m.price.toLocaleString()}원
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="rounded-2xl border border-dashed border-[#DDE1EC] bg-white py-10 text-center text-[13px] text-[#9CA3AF]">
                  매장을 선택하면 위치와 정보가 표시됩니다.
                </div>
              )}
            </div>
          </div>
          )}
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
      {tab === 2 && <FacilityTab onZoom={setZoom} />}

      {/* 좌석배치 */}
      {tab === 3 && <SeatTab />}

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
                  onClick={() => setZoom({ title: "구장 구조도" })}
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
                  onClick={() => setZoom({ title: `피난 안내도 ${floor}층` })}
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
              <p className="text-[15px] font-bold">{zoom.title}</p>
              <button
                onClick={() => setZoom(null)}
                aria-label="닫기"
                className="w-8 h-8 rounded-full bg-white/15 text-[18px] leading-none"
              >
                ✕
              </button>
            </div>
            <div className="w-full aspect-square lg:aspect-auto lg:h-[calc(100vh-120px)]">
              <FloorMap label={`${zoom.title} 확대 이미지`} pin={zoom.pin} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
