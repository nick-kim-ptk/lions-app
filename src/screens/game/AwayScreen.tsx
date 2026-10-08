import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { AWAY_STADIUMS, AWAY_TABS } from '@/data/game'

// 015-SL-GM-10 라이온즈 원정대
export function AwayScreen() {
  const location = useLocation()
  const [selected, setSelected] = useState(location.state?.stadiumIndex ?? 0)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [awayTab, setAwayTab] = useState(location.state?.tab ?? 0)

  useEffect(() => {
    if (location.state?.tab !== undefined) {
      setAwayTab(location.state.tab)
    }
    if (location.state?.stadiumIndex !== undefined) {
      setSelected(location.state.stadiumIndex)
    }
  }, [location.state])

  const stadium = AWAY_STADIUMS[selected]
  return (
    <div className="min-h-full bg-[#F5F7FB] pb-6">
      {/* 구장 이름 드롭다운 헤더 */}
      <div className="sticky top-0 z-20 bg-[#F5F7FB]/95 backdrop-blur-sm border-b border-[#DDE1EC]">
        <div className="flex items-center px-4 h-14 gap-2">
          <button onClick={() => window.history.back()} className="w-8 h-8 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M15 19l-7-7 7-7" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex-1 flex items-center gap-1.5">
            <span className="text-[16px] font-bold text-[#111827]">{stadium.name}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}>
              <path d="M6 9l6 6 6-6" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <span className="text-[11px] text-[#9CA3AF]">{stadium.city} · {stadium.team}</span>
        </div>

        {/* 드롭다운 */}
        {dropdownOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-[#DDE1EC] shadow-lg z-30">
            {AWAY_STADIUMS.map((s, i) => (
              <button key={i} onClick={() => { setSelected(i); setDropdownOpen(false) }}
                className={`w-full flex items-center gap-3 px-5 py-3.5 border-b border-[#F0F2F5] last:border-0 ${i === selected ? 'bg-[#EBF0FF]' : 'bg-white'}`}>
                <span className="text-[13px] font-semibold text-[#0E1A40] flex-1 text-left">{s.name}</span>
                <span className="text-[11px] text-[#9CA3AF]">{s.city} · {s.team}</span>
                {i === selected && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1B5BF0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 구장 이미지 */}
      <div className="w-full h-52 bg-gradient-to-br from-[#E8EEFF] to-[#C7D4F8] flex items-center justify-center">
        <span className="text-8xl opacity-20">🏟</span>
      </div>

      {/* 탭 */}
      <div className="flex border-b border-[#DDE1EC] bg-white overflow-x-auto" style={{scrollbarWidth:'none'}}>
        {AWAY_TABS.map((t, i) => (
          <button key={i} onClick={() => setAwayTab(i)}
            className={`shrink-0 px-4 py-3 text-[13px] font-semibold border-b-2 transition-colors ${awayTab === i ? 'border-[#1B5BF0] text-[#1B5BF0]' : 'border-transparent text-[#9CA3AF]'}`}>
            {t}
          </button>
        ))}
      </div>

      {/* 탭 콘텐츠 */}
      <div className="px-4 pt-4 pb-6 flex flex-col gap-4">

        {/* 구장 소개 */}
        {awayTab === 0 && (
          <>
            <div className="bg-white rounded-2xl border border-[#DDE1EC] divide-y divide-[#F0F2F5]">
              {[
                { label: '홈 구단', value: stadium.team },
                { label: '위치',    value: stadium.city },
                { label: '수용 인원', value: '24,000명' },
                { label: '개장 연도', value: '1982년' },
                { label: '잔디',    value: '인조잔디' },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between px-4 py-3">
                  <span className="text-[12px] text-[#9CA3AF]">{row.label}</span>
                  <span className="text-[13px] font-semibold text-[#0E1A40]">{row.value}</span>
                </div>
              ))}
            </div>
            <div className="bg-[#EBF0FF] rounded-2xl p-4">
              <p className="text-[11px] font-bold text-[#1B5BF0] mb-2">💡 원정 팁</p>
              <p className="text-[12px] text-[#374151] leading-relaxed">삼성 팬존은 3루 외야 지정석입니다. 원정 응원 시 해당 구역에서 함께해요!</p>
            </div>
          </>
        )}

        {/* 교통 */}
        {awayTab === 1 && (
          <div className="flex flex-col gap-3">
            {[
              { icon: '🚇', title: '지하철', desc: '2호선 삼성역 5번 출구에서 도보 10분' },
              { icon: '🚌', title: '버스', desc: '간선 146, 360 / 지선 4412 · 야구장 앞 하차' },
              { icon: '🚕', title: '택시', desc: '구장 정문 앞 택시 승하차 구역 이용' },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl border border-[#DDE1EC] px-4 py-3.5 flex gap-3 items-start">
                <span className="text-xl shrink-0">{item.icon}</span>
                <div>
                  <p className="text-[13px] font-semibold text-[#0E1A40] mb-0.5">{item.title}</p>
                  <p className="text-[12px] text-[#64748B] leading-snug">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 주차 */}
        {awayTab === 2 && (
          <div className="flex flex-col gap-3">
            {[
              { icon: '🅿️', title: '공식 주차장', desc: '구장 내 2,000면 운영 · 경기 시작 2시간 전 개방' },
              { icon: '💰', title: '주차 요금', desc: '최초 1시간 3,000원 / 이후 30분당 1,000원' },
              { icon: '⚠️', title: '주의사항', desc: '경기 당일 혼잡 예상 · 대중교통 이용 권장' },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl border border-[#DDE1EC] px-4 py-3.5 flex gap-3 items-start">
                <span className="text-xl shrink-0">{item.icon}</span>
                <div>
                  <p className="text-[13px] font-semibold text-[#0E1A40] mb-0.5">{item.title}</p>
                  <p className="text-[12px] text-[#64748B] leading-snug">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 편의시설 */}
        {awayTab === 3 && (
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: '🛒', title: '매점', desc: '1~3루 각 구역' },
              { icon: '🚻', title: '화장실', desc: '각 통로 2개소' },
              { icon: '♿', title: '장애인석', desc: '1루 외야 지정' },
              { icon: '👶', title: '수유실', desc: '1루 게이트 내' },
              { icon: '🏧', title: 'ATM', desc: '정문 · 3루 게이트' },
              { icon: '🏥', title: '응급실', desc: '본관 1층' },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl border border-[#DDE1EC] px-4 py-3.5 flex flex-col gap-1">
                <span className="text-2xl">{item.icon}</span>
                <p className="text-[13px] font-semibold text-[#0E1A40]">{item.title}</p>
                <p className="text-[11px] text-[#9CA3AF]">{item.desc}</p>
              </div>
            ))}
          </div>
        )}

        {/* 주변 맛집 */}
        {awayTab === 4 && (
          <div className="flex flex-col gap-3">
            {[
              { name: '삼성역 소고기 명가', category: '한식 · 고기', dist: '도보 3분', price: '1인 25,000원~' },
              { name: '야구장 앞 분식', category: '분식', dist: '도보 1분', price: '1인 8,000원~' },
              { name: '코엑스몰 푸드코트', category: '다양', dist: '도보 8분', price: '1인 10,000원~' },
              { name: '봉은사 순두부', category: '한식', dist: '도보 5분', price: '1인 12,000원~' },
            ].map((item) => (
              <div key={item.name} className="bg-white rounded-2xl border border-[#DDE1EC] px-4 py-3.5 flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-[#F0F2F5] flex items-center justify-center shrink-0">
                  <span className="text-xl">🍽</span>
                </div>
                <div className="flex-1">
                  <p className="text-[13px] font-semibold text-[#0E1A40]">{item.name}</p>
                  <p className="text-[11px] text-[#9CA3AF] mt-0.5">{item.category} · {item.dist}</p>
                </div>
                <p className="text-[11px] font-semibold text-[#1B5BF0] shrink-0">{item.price}</p>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}
