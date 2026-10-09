import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Header } from '@/components/Layout'
import { EmptyState } from '@/components/EmptyState'
import { ListCaseBar, type ListCase } from '@/components/ListCaseBar'

// 046(048)-SL-MY-19 쿠폰함
export function CouponsScreen() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'사용 가능' | '사용 완료' | '기간 만료'>('사용 가능')
  const [listCase, setListCase] = useState<ListCase>('목록 있음')
  const [code, setCode] = useState('')
  const [codeResult, setCodeResult] = useState<'' | 'ok' | 'used' | 'invalid' | 'expired'>('')

  const availableCoupons = [
    { id: 1, tag: '이벤트 참여', emoji: '⚾', title: '구자욱 선수 싸인볼', desc: '홈 개막전 이벤트 참여 당첨', expire: '2026.10.31 까지', color: 'from-[#1B5BF0] to-[#6EC6FF]' },
    { id: 2, tag: '미션 참여', emoji: '🦁', title: '선수단 싸인 유니폼', desc: '블루 시그널 미션 달성 보상', expire: '2026.09.30 까지', color: 'from-[#F0A500] to-[#FFD966]' },
    { id: 3, tag: '출석 이벤트', emoji: '🎽', title: '삼성 라이온즈 레플리카 유니폼', desc: '30일 연속 출석 달성 보상', expire: '2026.11.15 까지', color: 'from-[#00B894] to-[#55EFC4]' },
    { id: 4, tag: '직관 인증', emoji: '🏆', title: '원태인 선수 싸인 포토카드', desc: '직관 인증 이벤트 추첨 당첨', expire: '2026.10.15 까지', color: 'from-[#E53935] to-[#FF8A65]' },
  ]

  const usedCoupons = [
    { id: 5, tag: '이벤트 참여', emoji: '🎁', title: '김지찬 선수 싸인볼', desc: '시즌 개막 기념 이벤트 참여 당첨', usedAt: '2026.08.14 사용', color: 'from-[#9CA3AF] to-[#D1D5DB]' },
    { id: 6, tag: '미션 참여', emoji: '📸', title: '선수단 단체 싸인 포스터', desc: '홈런 예측 미션 달성 보상', usedAt: '2026.07.22 사용', color: 'from-[#9CA3AF] to-[#D1D5DB]' },
  ]

  const expiredCoupons = [
    { id: 7, tag: '출석 이벤트', emoji: '🧢', title: '삼성 라이온즈 공식 볼캡', desc: '7일 연속 출석 달성 보상', expiredAt: '2026.06.30 만료', color: 'from-[#9CA3AF] to-[#D1D5DB]' },
    { id: 8, tag: '이벤트 참여', emoji: '⚾', title: '강민호 선수 싸인볼', desc: '팬 감사 이벤트 참여 당첨', expiredAt: '2026.05.31 만료', color: 'from-[#9CA3AF] to-[#D1D5DB]' },
  ]

  const currentList = listCase === '목록 없음' ? [] : activeTab === '사용 가능' ? availableCoupons : activeTab === '사용 완료' ? usedCoupons : expiredCoupons
  const isActive = activeTab === '사용 가능'

  return (
    <div className="min-h-full bg-[#F5F7FB] pb-8">
      <Header title="쿠폰함" />
      <ListCaseBar value={listCase} onChange={setListCase} />

      {/* 쿠폰 코드 등록 — 어린이 멤버십 가입 쿠폰 등 코드로 받는 쿠폰 */}
      <div className="px-4 pt-4">
        <div className="bg-white rounded-2xl border border-[#DDE1EC] p-4">
          <p className="text-[13px] font-bold text-[#111827] mb-2">쿠폰 코드 등록</p>
          <div className="flex gap-2">
            <input value={code} onChange={(e) => { setCode(e.target.value.toUpperCase()); setCodeResult('') }}
              placeholder="쿠폰 코드를 입력해 주세요"
              className="flex-1 min-w-0 h-11 rounded-xl border border-[#DDE1EC] bg-[#F5F7FB] px-3 text-sm text-[#111827] placeholder-[#9CA3AF] outline-none focus:border-[#1B5BF0]" />
            <button disabled={!code.trim()}
              onClick={() => setCodeResult(code === 'USED' ? 'used' : code === 'OLD' ? 'expired' : code === 'WRONG' ? 'invalid' : 'ok')}
              className={`h-11 px-4 rounded-xl text-[13px] font-bold ${code.trim() ? 'bg-[#1B5BF0] text-white' : 'bg-[#E5E7EB] text-[#9CA3AF]'}`}>등록</button>
          </div>
          {codeResult && (
            <p className={`mt-2 text-[12px] ${codeResult === 'ok' ? 'text-[#1B5BF0]' : 'text-[#E53935]'}`}>
              {codeResult === 'ok' ? '쿠폰을 받았어요. 쿠폰함에서 확인해 보세요.'
                : codeResult === 'used' ? '이미 등록된 코드예요.'
                : codeResult === 'expired' ? '사용 기간이 지난 코드예요.'
                : '코드를 다시 확인해 주세요.'}
            </p>
          )}
          <p className="mt-2 text-[10px] text-[#9CA3AF]">시연용: WRONG(잘못된 코드) · USED(이미 등록) · OLD(기간 만료)를 입력해 보세요.</p>
        </div>
      </div>

      {/* 탭 */}
      <div className="flex border-b border-[#DDE1EC] px-4 pt-3">
        {(['사용 가능', '사용 완료', '기간 만료'] as const).map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`pb-3 px-3 text-[13px] font-semibold border-b-2 transition-colors ${activeTab === tab ? 'border-[#1B5BF0] text-[#1B5BF0]' : 'border-transparent text-[#9CA3AF]'}`}>
            {tab}
          </button>
        ))}
      </div>

      <div className="px-4 pt-4 flex flex-col gap-3">
        {currentList.length === 0 && (
          activeTab === '사용 가능' ? (
            <EmptyState icon="🎟" title="사용할 수 있는 쿠폰이 없어요" desc="이벤트에 참여하면 쿠폰을 받을 수 있어요." actionLabel="이벤트 보러가기" onAction={() => navigate('/all/event-list')} />
          ) : (
            <EmptyState icon="🎟" title={activeTab === '사용 완료' ? '사용한 쿠폰이 없어요' : '만료된 쿠폰이 없어요'} />
          )
        )}
        {currentList.map((c) => {
          const dateStr = 'expire' in c ? c.expire : 'usedAt' in c ? c.usedAt : (c as {expiredAt: string}).expiredAt
          const dimmed = !isActive
          return (
            <div key={c.id} className="relative flex rounded-2xl overflow-visible bg-white border border-[#E8EBF4] shadow-sm"
              style={{ opacity: dimmed ? 0.6 : 1 }}>
              {/* ── 기차표 메인 본체 ── */}
              <div className="flex-1 flex flex-col justify-center px-4 py-4 min-w-0">
                {/* 할인 내용 */}
                <p className="text-[15px] font-black text-[#111827] leading-tight mb-1">{c.desc}</p>
                <p className="text-[12px] text-[#64748B] leading-snug mb-3">{c.title}</p>
                {/* 유효기간 */}
                <div className="flex items-center gap-1">
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none" className="shrink-0">
                    <circle cx="6" cy="6" r="5" stroke="#9CA3AF" strokeWidth="1.2"/>
                    <path d="M6 3.5V6l1.5 1.5" stroke="#9CA3AF" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                  <span className="text-[10px] text-[#9CA3AF]">{dateStr}</span>
                </div>
              </div>

              {/* ── 절취선 (퍼포레이션) ── */}
              <div className="relative flex flex-col items-center justify-center w-0 z-10">
                <div className="absolute -top-2.5 w-5 h-5 rounded-full bg-[#F5F7FB] border border-[#E8EBF4] z-20" />
                <div className="absolute -bottom-2.5 w-5 h-5 rounded-full bg-[#F5F7FB] border border-[#E8EBF4] z-20" />
                <div className="absolute inset-y-0 left-0 w-px"
                  style={{ backgroundImage: 'repeating-linear-gradient(to bottom, #D1D5DB 0px, #D1D5DB 4px, transparent 4px, transparent 8px)' }} />
              </div>

              {/* ── 우측 스텁 (사용하기) ── */}
              <div className="w-[72px] shrink-0 flex flex-col items-center justify-center gap-1.5">
                {isActive ? (
                  <button onClick={() => navigate('/my/coupon-use')}
                    className="flex flex-col items-center gap-1.5 active:scale-95 transition-transform">
                    <div className="w-9 h-9 rounded-full bg-[#EBF0FF] flex items-center justify-center">
                      <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                        <path d="M7 9.5L9 11.5L12 7.5" stroke="#1B5BF0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        <rect x="1.5" y="1.5" width="15" height="15" rx="3.5" stroke="#1B5BF0" strokeWidth="1.5"/>
                      </svg>
                    </div>
                    <span className="text-[10px] font-bold text-[#1B5BF0] tracking-tight">사용하기</span>
                  </button>
                ) : (
                  <span className="text-[10px] font-semibold text-[#9CA3AF] text-center leading-snug">
                    {activeTab === '사용 완료' ? '사용\n완료' : '기간\n만료'}
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
