import { useState } from 'react'
import { Header } from '@/components/Layout'
import { SPRING_CAMP, ROOKIE_DRAFT, FA_LIST, FOREIGN_PLAYERS, TRANSFER_LIST, HISTORY_TABS, YEAR_RANGES, ROOKIE_YEARS } from '@/data/menu'

type HistoryTab = typeof HISTORY_TABS[number]

export function HistoryMomentsScreen() {
  const [tab, setTab] = useState<HistoryTab>('해외스프링캠프')
  const [yearRange, setYearRange] = useState<typeof YEAR_RANGES[number]>('현재~2020')
  const [rookieYear, setRookieYear] = useState('2026')
  const [yearDropOpen, setYearDropOpen] = useState(false)

  const showRangeDropdown = tab === '해외스프링캠프' || tab === '이적현황'
  const showRookieDropdown = tab === '신인지명현황'
  const showDropdown = showRangeDropdown || showRookieDropdown

  const thCls = 'py-2 px-3 text-[11px] font-semibold text-[#9CA3AF] bg-[#F5F7FB] border-b border-[#DDE1EC] text-center'
  const tdCls = 'py-3 px-3 text-[12px] text-[#374151] text-center border-b border-[#F0F2F5]'

  return (
    <div className="min-h-full bg-[#F5F7FB] pb-8">
      <Header title="히스토리" />

      {/* 탭 */}
      <div className="flex border-b border-[#DDE1EC] bg-white overflow-x-auto" style={{scrollbarWidth:'none'}}>
        {HISTORY_TABS.map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`shrink-0 px-4 py-3 text-[12px] font-semibold border-b-2 transition-colors ${tab === t ? 'border-[#1B5BF0] text-[#1B5BF0]' : 'border-transparent text-[#9CA3AF]'}`}>
            {t}
          </button>
        ))}
      </div>

      <div className="px-4 py-4">
        {/* 연도 선택 */}
        {showDropdown && (
          <div className="relative flex justify-center mb-4">
            <button
              onClick={() => setYearDropOpen(v => !v)}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-[#DDE1EC] bg-white text-[13px] font-bold text-[#0E1A40] shadow-sm"
            >
              {showRookieDropdown ? rookieYear : yearRange}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className={`transition-transform ${yearDropOpen ? 'rotate-180' : ''}`}>
                <path d="M6 9l6 6 6-6" stroke="#0E1A40" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {yearDropOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-white border border-[#DDE1EC] rounded-2xl shadow-lg z-30 overflow-hidden min-w-[160px] max-h-60 overflow-y-auto">
                {showRookieDropdown
                  ? ROOKIE_YEARS.map((y) => (
                      <button key={y} onClick={() => { setRookieYear(y); setYearDropOpen(false) }}
                        className={`w-full px-5 py-3 text-[13px] font-semibold text-left border-b border-[#F0F2F5] last:border-0 flex items-center justify-between ${y === rookieYear ? 'text-[#1B5BF0] bg-[#EBF0FF]' : 'text-[#111827]'}`}>
                        {y}
                        {y === rookieYear && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1B5BF0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
                      </button>
                    ))
                  : YEAR_RANGES.map((r) => (
                      <button key={r} onClick={() => { setYearRange(r); setYearDropOpen(false) }}
                        className={`w-full px-5 py-3 text-[13px] font-semibold text-left border-b border-[#F0F2F5] last:border-0 flex items-center justify-between ${r === yearRange ? 'text-[#1B5BF0] bg-[#EBF0FF]' : 'text-[#111827]'}`}>
                        {r}
                        {r === yearRange && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1B5BF0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
                      </button>
                    ))
                }
              </div>
            )}
          </div>
        )}

        {/* 해외스프링캠프 */}
        {tab === '해외스프링캠프' && (
          <div className="bg-white rounded-2xl border border-[#DDE1EC] overflow-hidden">
            <table className="w-full">
              <thead><tr>
                <th className={thCls}>연도</th>
                <th className={thCls}>내용</th>
                <th className={thCls}>일정</th>
                <th className={thCls}>장소</th>
              </tr></thead>
              <tbody>
                {SPRING_CAMP.map((r, i) => (
                  <tr key={i}>
                    <td className={tdCls + ' font-semibold text-[#0E1A40]'}>{r.year}</td>
                    <td className={tdCls}>{r.round}</td>
                    <td className={tdCls}>{r.period}</td>
                    <td className={tdCls}>{r.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 신인지명현황 */}
        {tab === '신인지명현황' && (
          <div className="flex flex-col gap-3">
            <p className="text-[11px] text-[#9CA3AF] text-right">(단위: 만원)</p>
            <div className="bg-white rounded-2xl border border-[#DDE1EC] overflow-hidden">
              <table className="w-full">
                <thead><tr>
                  <th className={thCls}>선수명</th>
                  <th className={thCls}>포지션</th>
                  <th className={thCls}>경력</th>
                  <th className={thCls}>실업/군</th>
                  <th className={thCls}>입단</th>
                  <th className={thCls}>계약금</th>
                </tr></thead>
                <tbody>
                  {ROOKIE_DRAFT.map((r, i) => (
                    <tr key={i}>
                      <td className={tdCls + ' font-semibold text-[#0E1A40]'}>{r.name}</td>
                      <td className={tdCls}>{r.pos}</td>
                      <td className={tdCls}>{r.school}</td>
                      <td className={tdCls}>{r.military}</td>
                      <td className={tdCls}>{r.year}</td>
                      <td className={tdCls + ' font-semibold'}>{r.bonus}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* FA선수현황 */}
        {tab === 'FA선수현황' && (
          <div className="bg-white rounded-2xl border border-[#DDE1EC] overflow-hidden">
            <table className="w-full">
              <thead><tr>
                <th className={thCls}>연도</th>
                <th className={thCls}>선수명</th>
                <th className={thCls}>소속</th>
                <th className={thCls + ' text-left'}>내용</th>
              </tr></thead>
              <tbody>
                {FA_LIST.map((r, i) => (
                  <tr key={i}>
                    <td className={tdCls}>{r.year}</td>
                    <td className={tdCls + ' font-semibold text-[#0E1A40]'}>{r.name}</td>
                    <td className={tdCls}>{r.team}</td>
                    <td className={tdCls + ' text-left text-[11px]'}>{r.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 외국인선수현황 */}
        {tab === '외국인선수현황' && (
          <div className="bg-white rounded-2xl border border-[#DDE1EC] overflow-hidden">
            <table className="w-full">
              <thead><tr>
                <th className={thCls}>연도</th>
                <th className={thCls}>선수명</th>
                <th className={thCls}>국적</th>
                <th className={thCls}>포지션</th>
                <th className={thCls + ' text-left'}>내용</th>
              </tr></thead>
              <tbody>
                {FOREIGN_PLAYERS.map((r, i) => (
                  <tr key={i}>
                    <td className={tdCls}>{r.year}</td>
                    <td className={tdCls + ' font-semibold text-[#0E1A40]'}>{r.name}</td>
                    <td className={tdCls}>{r.nation}</td>
                    <td className={tdCls}>{r.pos}</td>
                    <td className={tdCls + ' text-left text-[11px]'}>{r.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 이적현황 */}
        {tab === '이적현황' && (
          <div className="bg-white rounded-2xl border border-[#DDE1EC] overflow-hidden">
            <table className="w-full">
              <thead><tr>
                <th className={thCls}>일정</th>
                <th className={thCls}>양수</th>
                <th className={thCls}>양도</th>
                <th className={thCls}>상대</th>
                <th className={thCls}>비고</th>
              </tr></thead>
              <tbody>
                {TRANSFER_LIST.map((r, i) => (
                  <tr key={i}>
                    <td className={tdCls + ' text-[11px]'}>{r.date}</td>
                    <td className={tdCls + ' font-semibold text-[#1B5BF0]'}>{r.receive}</td>
                    <td className={tdCls + ' font-semibold text-[#EF4444]'}>{r.send}</td>
                    <td className={tdCls}>{r.opponent}</td>
                    <td className={tdCls + ' text-[11px]'}>{r.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
