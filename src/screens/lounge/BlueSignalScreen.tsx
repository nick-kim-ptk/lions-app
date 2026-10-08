import { useState } from 'react'
import { CaseSelect } from '@/components/CaseSelect'
import { Header, useScreenIdOverride } from '@/components/Layout'

// 098-SL-LG-10 블루 시그널
function FeedCard({ item }: { item: { nick: string; time: string; text: string; hasImage: boolean; imgColor: string; avatarColor: string; likes: number } }) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(item.likes)
  const toggleLike = () => {
    setLiked(v => {
      setLikeCount(c => !v ? c + 1 : c - 1)
      return !v
    })
  }
  return (
    <div className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] p-4">
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${item.avatarColor} flex items-center justify-center shrink-0`}>
          <span className="text-white text-[13px] font-bold">{item.nick[0]}</span>
        </div>
        <div className="flex-1">
          <p className="text-[13px] font-bold text-[#111827]">{item.nick}</p>
          <p className="text-[11px] text-[#9CA3AF]">{item.time}</p>
        </div>
        <div className="flex items-center gap-1">
          <button className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-[#F5F7FB] transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          </button>
          <button className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-[#FEF2F2] transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F87171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
              <path d="M10 11v6M14 11v6"/>
              <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
            </svg>
          </button>
        </div>
      </div>
      {item.hasImage && (
        <div className="aspect-square w-full rounded-xl mb-3 flex items-center justify-center overflow-hidden" style={{ background: item.imgColor }}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" opacity="0.25">
            <path d="M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2zM8.5 13.5l2.5 3 3.5-4.5 4.5 6H5l3.5-4.5z" fill="white"/>
          </svg>
        </div>
      )}
      <p className="text-[13px] text-[#374151] leading-relaxed mb-3">{item.text}</p>
      <button
        onClick={toggleLike}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-colors ${
          liked ? 'border-[#E53935] bg-[#FFF0F0]' : 'border-[#DDE1EC] bg-[#F9FAFB]'
        }`}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill={liked ? '#E53935' : 'none'} stroke={liked ? '#E53935' : '#9CA3AF'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
        <span className={`text-[12px] font-semibold ${liked ? 'text-[#E53935]' : 'text-[#9CA3AF]'}`}>{likeCount}</span>
      </button>
    </div>
  )
}

export function BlueSignalScreen() {
  const [participationType, setParticipationType] = useState<null | '직관 인증' | '집관 참여'>(null)
  const [locationState, setLocationState] = useState<0|1|2>(0)
  const cycleLocation = () => setLocationState(s => ((s + 1) % 3) as 0|1|2)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authText, setAuthText] = useState('')
  const [authPhoto, setAuthPhoto] = useState(false)
  useScreenIdOverride(showAuthModal ? '100-SL-LG-13' : null)
  const [signalMode, setSignalMode] = useState<'직관용'|'원정용'|'전체용'|'종료 시'>('직관용')

  const feedItems = [
    { type: '직관', hasImage: true },
    { type: '집관', hasImage: false },
    { type: '직관', hasImage: true },
    { type: '집관', hasImage: false },
    { type: '직관', hasImage: false },
  ]

  const filteredFeed = feedItems.filter((f) => {
    if (participationType === '직관 인증') return f.type === '직관'
    if (participationType === '집관 참여') return f.type === '집관'
    return true
  })

  return (
    <div className="min-h-full bg-[#F5F7FB] pb-4">
      <Header title="블루 시그널" />

      {/* 케이스 베리에이션 토글 */}
      <div className="px-4 pt-4 flex justify-end mb-2">
        <CaseSelect value={signalMode} options={['직관용', '원정용', '전체용', '종료 시'] as const} onChange={setSignalMode} />
      </div>

      {/* 인증 배너 */}
      <div className="px-4 mb-4">
        <div className="bg-gradient-to-br from-[#0D1117] to-[#1A2A5E] rounded-2xl p-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-28 h-28 bg-[#1B5BF0]/30 rounded-full blur-2xl" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-[#E53935] animate-pulse" />
              <span className="text-white text-[11px] font-bold tracking-widest">{signalMode === '종료 시' ? 'CLOSED' : 'LIVE'}</span>
              {signalMode !== '종료 시' && <span className="ml-auto text-[#F0A500] text-[11px] font-semibold">39분 남음</span>}
            </div>

            {/* 직관용 */}
            {signalMode === '직관용' && (
              <>
                <p className="text-white font-bold text-[16px] leading-snug mb-1">오늘 직관을 인증해주세요 🦁</p>
                <p className="text-white/60 text-[12px] leading-relaxed mb-4">
                  경기장 위치가 확인되면 <span className="text-white font-semibold">직관 인증</span>이 가능합니다.
                </p>
                <div className={`flex items-center gap-2 rounded-xl px-3 py-2.5 mb-3 transition-colors ${
                  locationState === 0 ? 'bg-white/10' : locationState === 1 ? 'bg-white/5 border border-white/10' : 'bg-[#E53935]/10 border border-[#E53935]/20'
                }`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${locationState === 0 ? 'bg-[#1B5BF0]' : locationState === 1 ? 'bg-white/20' : 'bg-[#E53935]/60'}`}>
                    {locationState === 0
                      ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      : <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="white" fillOpacity="0.85"/></svg>
                    }
                  </div>
                  <div className="flex-1">
                    {locationState === 0 && <><p className="text-white text-[12px] font-semibold">위치가 확인되었습니다.</p><p className="text-white/50 text-[10px]">수성구 야구전설로 1</p></>}
                    {locationState === 1 && <><p className="text-white/70 text-[12px] font-semibold">위치를 확인 중입니다.</p><p className="text-white/40 text-[10px]">경기장 근처에서 인증해주세요</p></>}
                    {locationState === 2 && <><p className="text-[#FF6B6B] text-[12px] font-semibold">위치가 감지되지 않았습니다.</p><p className="text-white/40 text-[10px]">북구 태평로 161</p></>}
                  </div>
                  <button onClick={cycleLocation} className="flex items-center justify-center w-7 h-7 rounded-full bg-white/10 active:bg-white/20 transition-colors">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M4 12a8 8 0 0 1 14.93-4H16v2h5V5h-2v2.5A9.97 9.97 0 0 0 2 12h2z" fill="white"/><path d="M20 12a8 8 0 0 1-14.93 4H8v-2H3v5h2v-2.5A9.97 9.97 0 0 0 22 12h-2z" fill="white"/></svg>
                  </button>
                </div>
                <p className="text-white/40 text-[11px] text-center mb-3">경기장 반경 1km 이내에서 위치 인증이 가능합니다.</p>
                <button
                  disabled={locationState !== 0}
                  onClick={() => locationState === 0 && setShowAuthModal(true)}
                  className={`w-full h-10 rounded-xl text-[14px] font-bold transition-colors ${locationState === 0 ? 'bg-[#1B5BF0] text-white' : 'bg-white/10 text-white/30 cursor-not-allowed'}`}
                >
                  인증하기
                </button>
              </>
            )}

            {/* 원정용 */}
            {signalMode === '원정용' && (
              <>
                <p className="text-white font-bold text-[16px] leading-snug mb-1">원정 직관을 인증해주세요 🗺</p>
                <p className="text-white/60 text-[12px] leading-relaxed mb-4">
                  원정 경기장 위치가 확인되면 <span className="text-white font-semibold">원정 인증</span>이 가능합니다.
                </p>
                <div className="flex items-center gap-2 rounded-xl px-3 py-2.5 mb-3 bg-white/10">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 bg-[#1B5BF0]">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-[12px] font-semibold">위치가 확인되었습니다.</p>
                    <p className="text-white/50 text-[10px]">서울 송파구 올림픽로 25 · 잠실 야구장</p>
                  </div>
                  <button onClick={cycleLocation} className="flex items-center justify-center w-7 h-7 rounded-full bg-white/10">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M4 12a8 8 0 0 1 14.93-4H16v2h5V5h-2v2.5A9.97 9.97 0 0 0 2 12h2z" fill="white"/><path d="M20 12a8 8 0 0 1-14.93 4H8v-2H3v5h2v-2.5A9.97 9.97 0 0 0 22 12h-2z" fill="white"/></svg>
                  </button>
                </div>
                <p className="text-white/40 text-[11px] text-center mb-3">원정 경기장 반경 1km 이내에서 위치 인증이 가능합니다.</p>
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="w-full h-10 rounded-xl text-[14px] font-bold bg-[#1B5BF0] text-white"
                >
                  원정 인증하기
                </button>
              </>
            )}

            {/* 전체용 */}
            {signalMode === '전체용' && (
              <>
                <p className="text-white font-bold text-[16px] leading-snug mb-1">라이온즈를 응원해주세요 🦁</p>
                <p className="text-white/60 text-[12px] leading-relaxed mb-4">
                  모든 라이온즈 팬들 모여라! 위치 확인 없이 자유롭게 응원을 남겨보세요.
                </p>
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="w-full h-10 rounded-xl text-[14px] font-bold bg-[#1B5BF0] text-white"
                >
                  라이온즈 응원하기
                </button>
              </>
            )}

            {/* 종료 시 */}
            {signalMode === '종료 시' && (
              <p className="text-white/70 text-[13px] leading-relaxed">
                블루 시그널에 참여해 주신 팬 여러분께 감사드립니다.<br />
                당첨자 발표는 잠시 후 안내해 드리겠습니다.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* 당첨자 발표 */}
      {signalMode === '종료 시' && <div className="px-4 mb-4">
        <div className="bg-white rounded-2xl border border-[#DDE1EC] p-4">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[14px] font-bold text-[#111827]">당첨자 발표</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { nick: '사직동직관러', prize: '선수 싸인 야구공 + 앰블럼', avatarColor: 'from-[#1B5BF0] to-[#7B3FF0]' },
              { nick: '치킨은필수', prize: '라이온즈 스티커 세트 + 앰블럼', avatarColor: 'from-[#E53935] to-[#7B3FF0]' },
              { nick: '에이스믿어', prize: '라이온즈 스티커 세트 + 앰블럼', avatarColor: 'from-[#1B5BF0] to-[#00B894]' },
              { nick: '야구가좋아', prize: '앰블럼', avatarColor: 'from-[#F0A500] to-[#E53935]' },
              { nick: '3루응원석단골', prize: '앰블럼', avatarColor: 'from-[#00B894] to-[#1B5BF0]' },
              { nick: '라팍단골손님', prize: '앰블럼', avatarColor: 'from-[#7B3FF0] to-[#1B5BF0]' },
              { nick: '9회말역전팬', prize: '앰블럼', avatarColor: 'from-[#E53935] to-[#F0A500]' },
              { nick: '블루유니폼', prize: '앰블럼', avatarColor: 'from-[#1B5BF0] to-[#0E2F80]' },
              { nick: '대구직관러', prize: '앰블럼', avatarColor: 'from-[#00B894] to-[#7B3FF0]' },
              { nick: '삼성파이팅', prize: '앰블럼', avatarColor: 'from-[#F0A500] to-[#1B5BF0]' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2.5 p-2.5 rounded-xl border border-[#F3F4F6] bg-[#F8F9FC]">
                <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${item.avatarColor} flex items-center justify-center shrink-0`}>
                  <span className="text-white text-[12px] font-bold">{item.nick[0]}</span>
                </div>
                <div className="min-w-0">
                  <p className="text-[12px] font-bold text-[#111827] truncate">{item.nick}</p>
                  <p className="text-[10px] text-[#9CA3AF] leading-tight">{item.prize}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-[#9CA3AF] mt-3">* 당첨자에게 Push 알림으로 발송됩니다.</p>
        </div>
      </div>}

      {/* Feed */}
      <div className="px-4">
        <div className="flex flex-col gap-4">
          {[
            { nick: '사직동직관러', time: '3분 전', text: '오늘 경기 분위기 미쳤다ㅋㅋ 3회부터 응원단이 완전 달아올랐어요 🔥', hasImage: true, imgColor: '#1A2A5E', avatarColor: 'from-[#1B5BF0] to-[#7B3FF0]', likes: 24 },
            { nick: '야구가좋아', time: '11분 전', text: '처음으로 직관 왔는데 이 맛에 야구 보는구나 싶었어요. 다음주도 예매해야겠다!', hasImage: false, imgColor: '', avatarColor: 'from-[#F0A500] to-[#E53935]', likes: 11 },
            { nick: '치킨은필수', time: '18분 전', text: '라이온즈 파크 치킨 퀄리티 실화냐고요 진짜 꼭 드셔보세요 👍', hasImage: true, imgColor: '#2A1A0A', avatarColor: 'from-[#E53935] to-[#7B3FF0]', likes: 37 },
            { nick: '3루응원석단골', time: '27분 전', text: '5회말 역전 순간 옆자리 아저씨랑 하이파이브 했어요 ㅎㅎ 직관은 역시 생생하네요', hasImage: false, imgColor: '', avatarColor: 'from-[#00B894] to-[#1B5BF0]', likes: 8 },
            { nick: '에이스믿어', time: '34분 전', text: '오늘 선발 투수 완전 폼 장난 아님. 7이닝 무실점이면 진짜 에이스 아닙니까', hasImage: true, imgColor: '#0D1F0A', avatarColor: 'from-[#1B5BF0] to-[#00B894]', likes: 52 },
          ].map((item, i) => (
            <FeedCard key={i} item={item} />
          ))}
        </div>
      </div>

      {/* 직관 인증 모달 */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowAuthModal(false)} />
          <div className="relative w-full bg-white rounded-t-3xl p-6 pb-10 flex flex-col gap-5" style={{ minHeight: '72vh' }}>
            <div className="w-10 h-1 rounded-full bg-[#E5E7EB] mx-auto -mt-1 mb-1" />

            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-1 flex-1 pr-3">
                <h2 className="text-[18px] font-bold text-[#111827]">함께 보낸 오늘, 소중한 순간을 기록해보세요.</h2>
                <p className="text-[13px] text-[#6B7280]">함께 만드는 V9, 기억에 남는 장면을 자유롭게 남겨보세요.</p>
              </div>
              <button onClick={() => setShowAuthModal(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F3F4F6] flex-shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M6 6l12 12M18 6L6 18" stroke="#6B7280" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            <button
              onClick={() => setAuthPhoto(v => !v)}
              className={`w-full aspect-video rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-colors ${
                authPhoto ? 'border-[#1B5BF0] bg-[#1A2A5E]' : 'border-[#DDE1EC] bg-[#F9FAFB]'
              }`}
            >
              {authPhoto ? (
                <>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" opacity="0.4">
                    <path d="M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2zM8.5 13.5l2.5 3 3.5-4.5 4.5 6H5l3.5-4.5z" fill="white"/>
                  </svg>
                  <span className="text-white/50 text-[12px]">사진 선택됨 (탭하여 취소)</span>
                </>
              ) : (
                <>
                  <div className="w-10 h-10 rounded-full bg-[#EBF0FF] flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M12 5v14M5 12h14" stroke="#1B5BF0" strokeWidth="2.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <span className="text-[13px] font-semibold text-[#374151]">사진 추가</span>
                  <span className="text-[11px] text-[#9CA3AF]">탭하여 갤러리에서 선택</span>
                </>
              )}
            </button>

            <textarea
              value={authText}
              onChange={e => setAuthText(e.target.value)}
              placeholder="파란 피의 자부심, 언어에서도 빛납니다.&#10;선수들에게 상처가 되는 말 대신, 승리를 향한 긍정의 메시지를 남겨주세요!"
              rows={6}
              className="w-full rounded-2xl border border-[#DDE1EC] bg-[#F9FAFB] px-4 py-3 text-[13px] text-[#111827] placeholder:text-[#9CA3AF] resize-none outline-none focus:border-[#1B5BF0] focus:bg-white transition-colors"
            />

            {/* 주의사항 체크박스 */}
            <label className="flex items-start gap-2.5 cursor-pointer">
              <div className="w-4 h-4 mt-0.5 rounded border-2 border-[#DDE1EC] bg-[#F9FAFB] shrink-0 flex items-center justify-center">
              </div>
              <span className="text-[12px] text-[#6B7280] leading-snug">경기와 무관한 게시물은 이용이 제한될 수 있습니다.</span>
            </label>

            <button
              disabled={!authPhoto && authText.trim().length === 0}
              onClick={() => setShowAuthModal(false)}
              className={`w-full h-14 rounded-xl text-[16px] font-bold transition-colors ${
                authPhoto || authText.trim().length > 0
                  ? 'bg-[#1B5BF0] text-white'
                  : 'bg-[#F3F4F6] text-[#9CA3AF] cursor-not-allowed'
              }`}
            >
              등록하기
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
