import { PH } from '@/components/Placeholder'
import { Header } from '@/components/Layout'
import { MOCK_TODAY, addDays, fmtMD } from '@/data/mock'

// 009-SL-GM-04 라이온즈 뉴스
export function LionsNewsScreen() {
  const today = MOCK_TODAY
  const yesterday = addDays(MOCK_TODAY, -1)
  const fmt = fmtMD

  const newsGroups = [
    {
      date: `오늘 · ${fmt(today)}`,
      items: [
        { title: '삼성 라이온즈, NC전 선발 원태인 낙점…시즌 12승 도전', source: '스포츠조선', time: '13:42' },
        { title: '구자욱, 시즌 홈런 20호 돌파…팀 내 최다', source: '일간스포츠', time: '11:20' },
        { title: '라이온즈 파크, 26일 KT전 토요일 경기 입장권 매진', source: '대구MBC', time: '09:05' },
      ],
    },
    {
      date: `어제 · ${fmt(yesterday)}`,
      items: [
        { title: '삼성, NC 꺾고 3연승…선두권 진입', source: '스포츠서울', time: '22:30' },
        { title: '박진만 감독 "선수들 집중력이 승리 이끌었다"', source: 'OSEN', time: '21:15' },
        { title: '이재현, 결승 2타점 적시타…팀 승리 주역', source: '뉴시스', time: '20:48' },
        { title: '삼성 불펜, 6이닝 무실점 호투로 마무리', source: '스포츠경향', time: '19:30' },
      ],
    },
  ]

  return (
    <div className="min-h-full bg-[#F5F7FB] pb-4">
      <Header title="라이온즈 뉴스" />

      {/* News groups */}
      <div className="px-4 pt-3">
        {newsGroups.map((group, gi) => (
          <div key={gi} className="mb-6">
            {/* Date label */}
            <p className="text-[12px] font-semibold text-[#64748B] mb-3">{group.date}</p>

            {/* Featured top article (first item of each group) */}
            {gi === 0 && (
              <div className="mb-4">
                <div className="relative rounded-2xl overflow-hidden">
                  <PH className="w-full h-44 rounded-2xl" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent rounded-2xl" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white text-[14px] font-semibold leading-snug mb-1 line-clamp-2">
                      {group.items[0].title}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-white/60 text-[11px]">{group.items[0].source}</span>
                      <span className="text-white/40 text-[11px]">·</span>
                      <span className="text-white/60 text-[11px]">{group.items[0].time}</span>
                      {/* 아웃링크 표시 */}
                      <div className="ml-auto flex items-center gap-1 bg-white/20 rounded-full px-2 py-0.5">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                          <path d="M15 3h6v6M10 14L21 3" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                        <span className="text-white text-[10px]">외부 링크</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Article list */}
            <div className="flex flex-col">
              {(gi === 0 ? group.items.slice(1) : group.items).map((item, i) => (
                <div key={i} className="flex gap-3 py-3 border-b border-[#DDE1EC] items-center">
                  <PH className="w-18 h-14 rounded-xl shrink-0" />
                  <div className="flex-1 flex flex-col gap-1 justify-center">
                    <p className="text-[13px] text-[#111827] font-medium leading-snug line-clamp-2">{item.title}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[11px] text-[#9CA3AF]">{item.source}</span>
                      <span className="text-[11px] text-[#C4C9D6]">·</span>
                      <span className="text-[11px] text-[#9CA3AF]">{item.time}</span>
                    </div>
                  </div>
                  {/* 아웃링크 아이콘 */}
                  <div className="shrink-0 w-7 h-7 rounded-full bg-[#F5F7FB] border border-[#DDE1EC] flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M15 3h6v6M10 14L21 3" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
