import { useNavigate } from 'react-router-dom'
import { CaseSelect } from '@/components/CaseSelect'
import { useState, useEffect } from 'react'
import { PHCircle } from '@/components/Placeholder'
import { LIVE_REACTIONS } from '@/data/lounge'

export function EldoradoScreen() {
  const navigate = useNavigate()
  const [hasMatch, setHasMatch] = useState<'경기' | '경기 전' | '제재시'>('경기')
  useEffect(() => {
    const prev = document.body.style.backgroundColor
    document.body.style.backgroundColor = '#0D1117'
    document.documentElement.style.backgroundColor = '#0D1117'
    return () => {
      document.body.style.backgroundColor = prev
      document.documentElement.style.backgroundColor = ''
    }
  }, [])
  return (
    <div className="fixed inset-0 bg-[#0D1117] flex flex-col overflow-hidden" style={{zIndex:50}}>

      {/* Top bar with close */}
      <div className="flex items-center justify-between px-4 pt-12 pb-2">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full animate-pulse ${hasMatch === '경기' ? 'bg-[#E53935]' : 'bg-white/30'}`} />
          <span className="text-white text-[13px] font-bold tracking-wide">엘도라도 ZONE</span>
        </div>
        <div className="flex items-center gap-2">
          {/* 경기 / 경기 전 / 제재시 토글 */}
          <CaseSelect variant="dark" value={hasMatch} options={['경기', '경기 전', '제재시'] as const} onChange={setHasMatch} />
          <button onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Score banner or notice */}
      <div className="px-4 pt-2 pb-3">
        {hasMatch === '경기 전' ? (
          <div className="bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center justify-center gap-2 text-center" style={{minHeight: 96}}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="14" fill="white" stroke="white" strokeWidth="0.5"/>
              <path d="M7 10.5C9.5 12 10.5 14.5 10.5 16C10.5 17.5 9.5 20 7 21.5" stroke="#C8102E" strokeWidth="1.6" strokeLinecap="round" fill="none"/>
              <path d="M25 10.5C22.5 12 21.5 14.5 21.5 16C21.5 17.5 22.5 20 25 21.5" stroke="#C8102E" strokeWidth="1.6" strokeLinecap="round" fill="none"/>
              <path d="M10.5 7C12 9.5 12.5 12 12.5 16C12.5 20 12 22.5 10.5 25" stroke="#C8102E" strokeWidth="1.6" strokeLinecap="round" fill="none"/>
              <path d="M21.5 7C20 9.5 19.5 12 19.5 16C19.5 20 20 22.5 21.5 25" stroke="#C8102E" strokeWidth="1.6" strokeLinecap="round" fill="none"/>
            </svg>
            <p className="text-white/70 text-[14px] font-semibold text-center">잠시 후 경기가 시작됩니다.</p>
          </div>
        ) : (
          <div className="bg-gradient-to-r from-[#1B5BF0] to-[#3B7BFF] rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="text-[10px] text-white font-bold tracking-widest">LIVE</span>
              <span className="text-[10px] text-white/60">5회 초 · 1아웃</span>
              <span className="ml-auto text-[10px] text-white/50">👥 2,847명 참여 중</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <PHCircle className="w-9 h-9" />
                <div className="flex flex-col">
                  <span className="text-white/60 text-[10px]">삼성</span>
                  <span className="text-white text-3xl font-black">3</span>
                </div>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-white/40 text-xs">VS</span>
                <div className="flex gap-1">
                  {[1,2,3].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/20" />)}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-end">
                  <span className="text-white/60 text-[10px]">롯데</span>
                  <span className="text-white text-3xl font-black">1</span>
                </div>
                <PHCircle className="w-9 h-9" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 안내 문구 */}
      <div className="px-4 pb-3 text-center">
        <p className="text-white/30 text-[11px] leading-relaxed">
          대화 내용은 저장되지 않습니다.<br />모두가 함께 즐길 수 있는 말을 남겨주세요.
        </p>
      </div>

      {/* Live chat + floating reactions */}
      <div className="relative flex-1 overflow-hidden min-h-0">

        {/* Floating reaction animations — rising from bottom */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {LIVE_REACTIONS.map((r, i) => (
            <div
              key={i}
              className="absolute bottom-0 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-white/10"
              style={{
                left: `${r.x}%`,
                animation: `floatUp 3.5s ease-in infinite`,
                animationDelay: `${r.delay}s`,
                opacity: 0,
              }}
            >
              <span className="text-base">{r.emoji}</span>
              <span className="text-white text-[11px] font-medium whitespace-nowrap">{r.msg}</span>
            </div>
          ))}
        </div>

        {/* Chat messages */}
        <div className="flex flex-col justify-end h-full px-4 pb-3 gap-2">
          {[
            { user: '라이온즈팬123', msg: '원태인 오늘 진짜 폼 미쳤다', mine: false },
            { user: '구자욱사랑해', msg: '가즈아!! 3점 더 뽑아라', mine: false },
            { user: 'ME', msg: '홈런 기대합니다!!', mine: true },
            { user: '대구블루', msg: '5회인데 이 흐름 계속 가자', mine: false },
            { user: '삼팬2025', msg: '오늘 꼭 이겨라 제발', mine: false },
            { user: 'ME', msg: '화이팅 !! 💙', mine: true },
          ].map((c, i) => (
            <div key={i} className={`flex items-end gap-2 ${c.mine ? 'flex-row-reverse' : ''}`}>
              {!c.mine && (
                <div className="w-6 h-6 rounded-full bg-[#1B5BF0]/40 shrink-0 flex items-center justify-center">
                  <span className="text-[8px] text-white font-bold">{c.user[0]}</span>
                </div>
              )}
              <div className={`max-w-[75%] ${c.mine ? '' : ''}`}>
                {!c.mine && <p className="text-white/40 text-[9px] mb-0.5 ml-1">{c.user}</p>}
                <div className={`px-3 py-2 rounded-2xl text-[12px] ${
                  c.mine
                    ? 'bg-[#1B5BF0] text-white rounded-br-sm'
                    : 'bg-white/10 text-white rounded-bl-sm backdrop-blur-sm border border-white/10'
                }`}>
                  {c.msg}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Emoji bar + input */}
      <div className="relative px-4 pt-3 pb-safe bg-[#161B22] border-t border-white/10" style={{paddingBottom: 'max(24px, env(safe-area-inset-bottom))'}}>
        <div className="flex gap-2 mb-3 overflow-x-auto pb-1" style={{scrollbarWidth:'none'}}>
          {[
            { emoji: '🦁', label: '가즈아!!' },
            { emoji: '🔥', label: '빨리빨리!' },
            { emoji: '⚾', label: '홈런 쳐라!!' },
            { emoji: '😤', label: '삼진 잡자!' },
            { emoji: '💙', label: '우리가 이긴다!' },
            { emoji: '👏', label: '잘한다!!' },
            { emoji: '🎉', label: '득점이다!!' },
            { emoji: '😭', label: '제발요...' },
            { emoji: '🙌', label: '역전 가자!!' },
          ].map(({ emoji, label }) => (
            <button key={emoji}
              className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 active:scale-95 transition-transform">
              <span className="text-[16px] leading-none">{emoji}</span>
              <span className="text-white/70 text-[11px] font-medium whitespace-nowrap">{label}</span>
            </button>
          ))}
        </div>
        <p className="mb-2 text-[10px] text-white/40 leading-snug">채팅은 저장되지 않고 사라져요 · 선수와 팬에게 상처가 되는 표현은 전송할 수 없어요</p>
        <div className="flex gap-2">
          <div className="flex-1 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center px-3">
            <span className="text-white/30 text-sm">응원 메시지를 입력하세요</span>
          </div>
          <button className="h-10 px-4 rounded-xl bg-[#1B5BF0] text-white text-sm font-medium">전송</button>
        </div>
        {/* 제재시 — 입력 영역만 차단 */}
        {hasMatch === '제재시' && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center px-5 gap-3"
               style={{ background: 'rgba(13,17,23,0.92)', backdropFilter: 'blur(4px)' }}>
            <div className="w-full bg-[#161B22] border border-white/15 rounded-2xl p-4 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#EF4444]/20 flex items-center justify-center shrink-0">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                    <path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="#EF4444" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <span className="text-[13px] font-bold text-white">이용 제한 안내</span>
              </div>
              <p className="text-[12px] text-white/70 leading-snug">
                블루블러드 회원님의 이용이 <span className="text-white font-semibold">2026년 10월 30일</span>까지 제한됩니다.
              </p>
              <div className="border-t border-white/10 pt-2 flex items-center gap-2">
                <span className="text-[11px] text-white/40">사유</span>
                <span className="text-[11px] text-[#EF4444] font-medium">부적절한 표현 사용</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes floatUp {
          0%   { transform: translateY(0);    opacity: 0; }
          10%  { opacity: 1; }
          80%  { opacity: 0.8; }
          100% { transform: translateY(-340px); opacity: 0; }
        }
      `}</style>
    </div>
  )
}
