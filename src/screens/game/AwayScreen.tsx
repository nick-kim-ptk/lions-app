import { useLocation } from "react-router-dom"

import { useState, useEffect } from "react"

import { AWAY_STADIUMS, AWAY_TABS, AWAY_INFO } from "@/data/game"

import { TEAMS, GAMES, resultOf } from "@/data/mock"

import { PHImage } from "@/components/Placeholder"

const Card = ({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) => (
  <div className="bg-white rounded-2xl border border-[#DDE1EC] p-4">
    <p className="text-[13px] font-bold text-[#0E1A40] mb-3">{title}</p>
    {children}
  </div>
)

// 015-SL-GM-10 라이온즈 원정대

export function AwayScreen() {
  const location = useLocation()

  const [selected, setSelected] = useState<number>(
    location.state?.stadiumIndex ?? 0,
  )

  const [dropdownOpen, setDropdownOpen] = useState(false)

  const [awayTab, setAwayTab] = useState<number>(location.state?.tab ?? 0)

  const [toast, setToast] = useState(false)

  useEffect(() => {
    if (location.state?.tab !== undefined) setAwayTab(location.state.tab)

    if (location.state?.stadiumIndex !== undefined)
      setSelected(location.state.stadiumIndex)
  }, [location.state])

  useEffect(() => {
    if (!toast) return

    const t = setTimeout(() => setToast(false), 1800)

    return () => clearTimeout(t)
  }, [toast])

  const stadium = AWAY_STADIUMS[selected]

  const info = AWAY_INFO[selected]

  const copyAddress = () => {
    try {
      void navigator.clipboard?.writeText(info.address)
    } catch {
      /* 와이어프레임: 복사 실패 무시 */
    }

    setToast(true)
  }

  const q = encodeURIComponent(info.address)

  return (
    <div className="min-h-full bg-[#F5F7FB] pb-6 relative">
      {/* 구장 이름 드롭다운 헤더 */}
      <div className="sticky top-0 z-20 bg-[#F5F7FB]/95 backdrop-blur-sm border-b border-[#DDE1EC]">
        <div className="flex items-center px-4 h-14 gap-2">
          <button
            onClick={() => window.history.back()}
            className="w-8 h-8 flex items-center justify-center lg:hidden"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 19l-7-7 7-7"
                stroke="#111827"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex-1 flex items-center gap-1.5 lg:justify-center"
          >
            <span className="text-[16px] font-bold text-[#111827]">
              {stadium.name}
            </span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              className={`transition-transform ${
                dropdownOpen ? "rotate-180" : ""
              }`}
            >
              <path
                d="M6 9l6 6 6-6"
                stroke="#111827"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <span className="text-[11px] text-[#9CA3AF] lg:hidden">
            {stadium.city} · {stadium.team}
          </span>
        </div>
        {dropdownOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-[#DDE1EC] shadow-lg z-30">
            {AWAY_STADIUMS.map((s, i) => (
              <button
                key={i}
                onClick={() => {
                  setSelected(i)
                  setDropdownOpen(false)
                }}
                className={`w-full flex items-center gap-3 px-5 py-3.5 border-b border-[#F0F2F5] last:border-0 ${
                  i === selected ? "bg-[#EBF0FF]" : "bg-white"
                }`}
              >
                <span className="text-[13px] font-semibold text-[#0E1A40] flex-1 text-left">
                  {s.name}
                </span>
                <span className="text-[11px] text-[#9CA3AF]">
                  {s.city} · {s.team}
                </span>
                {i === selected && (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#1B5BF0"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 구장 이미지 */}
      <PHImage label={`${stadium.name} 전경`} className="w-full h-48" />

      {/* 탭 */}
      <div
        className="flex border-b border-[#DDE1EC] bg-white overflow-x-auto"
        style={{ scrollbarWidth: "none" }}
      >
        {AWAY_TABS.map((t, i) => (
          <button
            key={i}
            onClick={() => setAwayTab(i)}
            className={`shrink-0 flex-1 px-4 py-3 text-[13px] font-semibold border-b-2 transition-colors ${
              awayTab === i
                ? "border-[#1B5BF0] text-[#1B5BF0]"
                : "border-transparent text-[#9CA3AF]"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="px-4 pt-4 pb-6 flex flex-col gap-4">
        {/* 구장 소개 */}
        {awayTab === 0 && (
          <>
            <Card title="홈 구단 정보">
              <div className="flex flex-col gap-3">
                {stadium.teams.map((code) => {
                  const t = TEAMS[code]

                  const played = GAMES.filter(
                    (g) => g.opp === code && resultOf(g),
                  )

                  const w = played.filter((g) => resultOf(g) === "win").length

                  const l = played.filter((g) => resultOf(g) === "loss").length

                  const d = played.filter((g) => resultOf(g) === "draw").length

                  return (
                    <div
                      key={code}
                      className="flex items-center gap-3 bg-[#F8F9FC] rounded-xl px-3 py-3"
                    >
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white text-[12px] font-bold"
                        style={{ background: t.color }}
                      >
                        {t.short.slice(0, 2)}
                      </div>
                      <div className="flex-1">
                        <p className="text-[13px] font-semibold text-[#0E1A40]">
                          {t.name}
                        </p>
                        <p className="text-[11px] text-[#9CA3AF]">
                          올 시즌 상대 전적
                        </p>
                      </div>
                      <p className="text-[13px] font-bold text-[#1B5BF0]">
                        {w}승 {d}무 {l}패
                      </p>
                    </div>
                  )
                })}
              </div>
            </Card>

            <Card title="원정 경기 팁">
              <PHImage
                label="구장 좌석 배치도 · 삼성 원정 응원석 표시"
                className="w-full h-40 mb-3"
              />
              <p className="text-[12px] font-semibold text-[#1B5BF0] mb-2">
                {info.seatNote}
              </p>
              <ul className="flex flex-col gap-1.5">
                {info.tips.map((t) => (
                  <li
                    key={t}
                    className="text-[12px] text-[#374151] leading-relaxed flex gap-1.5"
                  >
                    <span className="text-[#1B5BF0]">•</span>
                    {t}
                  </li>
                ))}
              </ul>
            </Card>

            <Card title="구장 주소">
              <div className="flex items-center gap-2 mb-3">
                <p className="flex-1 text-[13px] text-[#0E1A40]">
                  {info.address}
                </p>
                <button
                  onClick={copyAddress}
                  className="shrink-0 px-3 py-1.5 rounded-lg border border-[#DDE1EC] text-[11px] font-semibold text-[#64748B]"
                >
                  복사
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`https://map.naver.com/p/search/${q}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-center py-2.5 rounded-xl bg-[#03C75A] text-white text-[12px] font-bold"
                >
                  네이버지도
                </a>
                <a
                  href={`https://map.kakao.com/?q=${q}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-center py-2.5 rounded-xl bg-[#FEE500] text-[#111827] text-[12px] font-bold"
                >
                  카카오맵
                </a>
              </div>
            </Card>
          </>
        )}

        {/* 대중교통 */}
        {awayTab === 1 && (
          <>
            <Card title="🚇 지하철">
              {info.subway.length === 0 ? (
                <p className="text-[12px] text-[#9CA3AF]">
                  구장 인근 지하철 정보가 없어요. 버스·택시·자차를 이용해
                  주세요.
                </p>
              ) : (
                info.subway.map((s) => (
                  <div key={s.line}>
                    <p className="text-[13px] font-semibold text-[#0E1A40]">
                      {s.line}
                    </p>
                    <p className="text-[12px] text-[#64748B] mt-0.5">
                      {s.detail}
                    </p>
                  </div>
                ))
              )}
            </Card>
            <Card title="🚌 버스">
              <div className="flex flex-col gap-2">
                {info.bus.map((b) => (
                  <div key={b.type} className="flex items-center gap-3">
                    <span className="px-2 py-0.5 rounded bg-[#EBF0FF] text-[#1B5BF0] text-[11px] font-bold">
                      {b.type}
                    </span>
                    <span className="text-[12px] text-[#374151]">
                      {b.numbers}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
            {info.extraTransit && (
              <Card title={`🚄 ${info.extraTransit.title}`}>
                <p className="text-[12px] text-[#374151] leading-relaxed">
                  {info.extraTransit.detail}
                </p>
              </Card>
            )}
          </>
        )}

        {/* 주차 */}
        {awayTab === 2 && (
          <>
            <Card title="🅿️ 구장 주차장">
              <div className="divide-y divide-[#F0F2F5]">
                {[
                  ["입차 가능 시간", info.parking.open],
                  ["주차 요금", info.parking.fee],
                  ["사전 예약", info.parking.reserve],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    className="flex items-start justify-between gap-4 py-2.5 first:pt-0 last:pb-0"
                  >
                    <span className="text-[12px] text-[#9CA3AF] shrink-0">
                      {k}
                    </span>
                    <span className="text-[12px] font-semibold text-[#0E1A40] text-right">
                      {v}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
            <Card title="인근 공영주차장">
              {info.parking.nearby.map((p) => (
                <div
                  key={p.name}
                  className="flex items-center justify-between py-1"
                >
                  <span className="text-[13px] text-[#0E1A40]">{p.name}</span>
                  <span className="text-[12px] text-[#64748B]">{p.fee}</span>
                </div>
              ))}
            </Card>
          </>
        )}

        {/* 편의시설 */}
        {awayTab === 3 && (
          <div className="grid grid-cols-2 gap-3">
            {info.facilities.map((f) => (
              <div
                key={f.title}
                className="bg-white rounded-2xl border border-[#DDE1EC] p-4 flex flex-col items-center text-center gap-1"
              >
                <span className="text-2xl">{f.icon}</span>
                <p className="text-[13px] font-semibold text-[#0E1A40]">
                  {f.title}
                </p>
                <p className="text-[11px] text-[#64748B]">{f.desc}</p>
              </div>
            ))}
          </div>
        )}

        <p className="text-[10px] text-[#9CA3AF] text-center">
          ※ 교통·주차 세부 수치는 예시이며 실제 정보는 각 구단 공식 안내
          기준으로 반영됩니다.
        </p>
      </div>

      {toast && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 px-4 py-2.5 rounded-full bg-[#111827]/90 text-white text-[12px] font-medium shadow-lg">
          주소가 복사되었어요
        </div>
      )}
    </div>
  )
}
