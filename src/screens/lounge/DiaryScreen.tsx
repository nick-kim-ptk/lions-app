import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import samsungImg from '@/assets/images/v9-team-photo.jpg'
import { Header, useScreenIdOverride } from '@/components/Layout'
import { SEASON_GRID_EMPTY, DiaryRecord, INITIAL_DIARIES } from '@/data/lounge'

function DiaryFeedCard({ watchMode, player, date, match, text, result, onEdit }: {
  watchMode: '직관' | '집관' | '원정';
  player: string;
  date?: string;
  match?: string;
  text?: string;
  result?: 'win' | 'loss' | null;
  onEdit?: () => void;
}) {
  const modeIcon = watchMode === '직관' ? '🏟️' : watchMode === '집관' ? '📺' : '✈️'
  const modeBadgeClass = watchMode === '직관' ? 'bg-[#EBF0FF] text-[#1B5BF0]'
    : watchMode === '집관' ? 'bg-[#F0FDF4] text-[#16A34A]'
    : 'bg-[#FFF7ED] text-[#EA580C]'
  return (
    <div className="relative bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] p-4">
      {/* WIN 스탬프 — 수정하기와 오늘의 선수 사이, 우측 */}
      {result === 'win' && (
        <div
          className="absolute z-10 flex items-center justify-center pointer-events-none"
          style={{ top: 56, right: 40, transform: 'rotate(-12deg)' }}
        >
          <svg width="0" height="0" style={{ position: 'absolute' }}>
            <defs>
              <filter id="stamp-rough2" x="-20%" y="-20%" width="140%" height="140%">
                <feTurbulence type="fractalNoise" baseFrequency="0.065" numOctaves="4" seed="3" result="noise"/>
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.2" xChannelSelector="R" yChannelSelector="G"/>
              </filter>
            </defs>
          </svg>
          <div
            className="flex items-center justify-center"
            style={{
              width: 68,
              height: 68,
              borderRadius: '50%',
              border: '3.5px solid rgba(220,38,38,0.82)',
              background: 'rgba(220,38,38,0.05)',
              filter: 'url(#stamp-rough2)',
            }}
          >
            <div className="flex flex-col items-center leading-none">
              <span style={{ fontFamily: 'Impact, "Arial Black", sans-serif', fontSize: 12, fontWeight: 900, color: 'rgba(220,38,38,0.88)', letterSpacing: '0.15em', lineHeight: 1 }}>WIN</span>
              <span style={{ fontFamily: 'Georgia, serif', fontSize: 7, color: 'rgba(220,38,38,0.7)', letterSpacing: '0.2em', marginTop: 2, lineHeight: 1 }}>or</span>
              <span style={{ fontFamily: 'Impact, "Arial Black", sans-serif', fontSize: 12, fontWeight: 900, color: 'rgba(220,38,38,0.88)', letterSpacing: '0.15em', lineHeight: 1 }}>WIN</span>
            </div>
          </div>
        </div>
      )}
      {/* 1행: 관람방식 뱃지 + 수정 버튼 */}
      <div className="flex items-center justify-between mb-3">
        <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${modeBadgeClass}`}>{modeIcon} {watchMode}</span>
        <button onClick={onEdit} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-[#F5F7FB] transition-colors shrink-0">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
        </button>
      </div>
      {/* 2행: 경기 정보 */}
      <div className="mb-3">
        <p className="text-[18px] font-black text-[#0E1A40] leading-tight">{match ?? '삼성 vs 롯데'}</p>
        <p className="text-[12px] text-[#9CA3AF] mt-0.5">{date ?? '9월 19일 (금)'}</p>
      </div>
      {/* 3행: 사진 */}
      <div className="aspect-square w-full rounded-2xl mb-3 flex items-center justify-center overflow-hidden bg-[#1A2A5E]">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" opacity="0.25">
          <path d="M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2zM8.5 13.5l2.5 3 3.5-4.5 4.5 6H5l3.5-4.5z" fill="white"/>
        </svg>
      </div>
      {/* 4행: 오늘의 선수 + 한마디 */}
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[11px] font-semibold text-[#9CA3AF]">오늘 나의 수훈선수</span>
        <span className="text-[12px] font-bold text-[#1B5BF0] bg-[#EBF0FF] rounded-full px-2.5 py-0.5">{player || '—'}</span>
      </div>
      <p className="text-[13px] text-[#374151] leading-relaxed">{text ?? '오늘 경기 분위기 미쳤다ㅋㅋ 3회부터 응원단이 완전 달아올랐어요 🔥'}</p>
    </div>
  )
}

export function DiaryScreen() {
  const navigate = useNavigate()
  const [recordState] = useState<'after' | 'before'>('after')
  const [analysisTab, setAnalysisTab] = useState<'상대팀별'|'야구장별'|'요일별'>('상대팀별')
  const [sheetOpen, setSheetOpen] = useState(false)
  const [filterMode, setFilterMode] = useState<'전체' | '직관' | '집관' | '원정'>('전체')
  const [showWriteModal, setShowWriteModal] = useState(false)
  const [editingPostId, setEditingPostId] = useState<number | null>(null)
  const [writePhoto, setWritePhoto] = useState(false)
  useScreenIdOverride(showWriteModal ? '101-SL-MY-26' : null)
  const [writeText, setWriteText] = useState('')
  const [writeWatchMode, setWriteWatchMode] = useState<'직관' | '집관' | '원정'>('직관')
  const [writePlayer, setWritePlayer] = useState<string>('구자욱')
  const [playerQuery, setPlayerQuery] = useState<string>('구자욱')
  const [playerFocused, setPlayerFocused] = useState(false)

  type Post = { id: number; watchMode: '직관'|'집관'|'원정'; date: string; match: string; player: string; text: string; hasPhoto: boolean; result?: 'win' | 'loss' | null }
  const [posts, setPosts] = useState<Post[]>([
    { id: 1, watchMode: '직관', date: '9월 19일 (금)', match: '삼성 vs 롯데', player: '구자욱', text: '오늘 경기 분위기 미쳤다ㅋㅋ 3회부터 응원단이 완전 달아올랐어요 🔥', hasPhoto: true, result: 'win' },
    { id: 2, watchMode: '직관', date: '9월 18일 (목)', match: '삼성 vs LG', player: '김지찬', text: 'LG전 짜릿한 역전승! 9회말 끝내기 안타 현장에서 직접 봤는데 진짜 소름 돋았어요 ⚾', hasPhoto: true, result: 'win' },
    { id: 3, watchMode: '집관', date: '9월 17일 (수)', match: '삼성 vs KIA', player: '원태인', text: '원태인 오늘 7이닝 1실점 완벽한 피칭이었다. 역시 에이스는 달라 👏', hasPhoto: true, result: 'loss' },
    { id: 4, watchMode: '원정', date: '9월 16일 (화)', match: '삼성 vs 두산', player: '구자욱', text: '잠실 원정 직관! 구자욱 선수 투런 홈런 보려고 서울까지 왔는데 이 맛에 야구 보는 것 같아요 🙌', hasPhoto: true, result: 'win' },
  ])

  const openEditModal = (post: Post) => {
    setEditingPostId(post.id)
    setWriteWatchMode(post.watchMode)
    setWritePlayer(post.player)
    setPlayerQuery(post.player)
    setWriteText(post.text)
    setWritePhoto(post.hasPhoto)
    setShowWriteModal(true)
  }

  const closeModal = () => {
    setShowWriteModal(false)
    setEditingPostId(null)
    setWritePhoto(false)
    setWriteText('')
    setWriteWatchMode('직관')
    setWritePlayer('구자욱')
    setPlayerQuery('구자욱')
  }

  const savePost = () => {
    if (editingPostId !== null) {
      setPosts(prev => prev.map(p => p.id === editingPostId
        ? { ...p, watchMode: writeWatchMode, player: writePlayer || playerQuery, text: writeText, hasPhoto: writePhoto }
        : p
      ))
    }
    closeModal()
  }
  const [selectedFeedIdx, setSelectedFeedIdx] = useState<number | null>(null)
  const [diaries, setDiaries] = useState<DiaryRecord[]>(() => {
    try {
      const saved = localStorage.getItem('sl_diaries')
      if (saved) return JSON.parse(saved)
    } catch (e) {
      console.error(e)
    }
    return INITIAL_DIARIES
  })

  useEffect(() => {
    try {
      localStorage.setItem('sl_diaries', JSON.stringify(diaries))
    } catch (e) {
      console.error(e)
    }
  }, [diaries])

  // 상대팀별 직관 데이터
  const opponentStats = [
    { team: '롯데 자이언츠', count: 4, win: '3승 1패', max: 4 },
    { team: 'LG 트윈스', count: 3, win: '2승 1패', max: 4 },
    { team: 'KIA 타이거즈', count: 2, win: '1승 1패', max: 4 },
    { team: '두산 베어스', count: 1, win: '1승 0패', max: 4 },
    { team: '한화 이글스', count: 1, win: '1승 0패', max: 4 },
  ]

  // 야구장별 직관 데이터
  const stadiumStats = [
    { stadium: '대구 삼성 라이온즈 파크', count: 9, max: 9 },
    { stadium: '잠실 야구장', count: 2, max: 9 },
    { stadium: '사직 야구장', count: 1, max: 9 },
  ]

  // 요일별 직관 데이터
  const dayStats = [
    { day: '토요일', count: 5, max: 5 },
    { day: '일요일', count: 4, max: 5 },
    { day: '금요일', count: 2, max: 5 },
    { day: '수요일', count: 1, max: 5 },
  ]

  return (
    <div className="min-h-full bg-[#F5F7FB] pb-44">
      <Header title="함께 만드는 V9" />

      {/* 관람방식 필터 — 플로팅 */}
      <div className="fixed top-14 left-0 right-0 z-30 flex justify-center pt-3 pb-2 pointer-events-none">
        <div className="flex gap-2 bg-white/80 backdrop-blur-md rounded-2xl px-3 py-2 shadow-lg border border-[#DDE1EC]/60 pointer-events-auto">
          {(['전체', '직관', '집관', '원정'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setFilterMode(mode)}
              className={`px-3.5 py-1.5 rounded-xl text-[13px] font-bold transition-all flex items-center gap-1 ${
                filterMode === mode
                  ? 'bg-[#1B5BF0] text-white'
                  : 'text-[#9CA3AF]'
              }`}
            >
              {mode !== '전체' && <span className="text-[12px]">{mode === '직관' ? '🏟️' : mode === '집관' ? '📺' : '✈️'}</span>}
              <span>{mode}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 게시물 */}
      <div className="px-4 flex flex-col gap-4 mb-4 mt-20">
        {posts.filter(post => filterMode === '전체' || post.watchMode === filterMode).map(post => (
          <DiaryFeedCard
            key={post.id}
            watchMode={post.watchMode}
            date={post.date}
            match={post.match}
            player={post.player}
            text={post.text}
            result={post.result}
            onEdit={() => openEditModal(post)}
          />
        ))}
      </div>

      {/* 플로팅 펜 버튼 + 툴팁 */}
      <div className="fixed z-40 flex items-center gap-[5px]" style={{ bottom: 'calc(68px + 16px)', right: 16 }}>
        {/* 말풍선 툴팁 */}
        <div className="relative flex items-center">
          <div className="bg-[#FFD600] text-[#0E1A40] text-[12px] font-bold px-3 py-2 rounded-2xl shadow-md whitespace-nowrap leading-snug">
            오늘 경기,<br />기록하셨나요?
          </div>
          {/* 말풍선 꼬리 (오른쪽) */}
          <div
            className="absolute -right-2 top-1/2 -translate-y-1/2 w-0 h-0"
            style={{
              borderTop: '6px solid transparent',
              borderBottom: '6px solid transparent',
              borderLeft: '8px solid #FFD600',
            }}
          />
        </div>

        <button
          onClick={() => setShowWriteModal(true)}
          className="bg-[#1B5BF0] text-white rounded-full shadow-xl active:scale-95 transition-transform flex items-center justify-center shrink-0"
          style={{ width: 52, height: 52 }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Bottom Sheet 오버레이 */}
      {sheetOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40"
          onClick={() => setSheetOpen(false)}
        />
      )}

      {/* Bottom Sheet */}
      <div
        className="fixed left-0 right-0 bottom-0 z-50 bg-[#F5F7FB] rounded-t-3xl overflow-hidden flex flex-col"
        style={{
          maxHeight: '85vh',
          transform: sheetOpen ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.35s cubic-bezier(0.32, 0.72, 0, 1)',
        }}
      >
        {/* 핸들 */}
        <div className="flex flex-col items-center pt-3 pb-2 shrink-0">
          <div className="w-10 h-1 rounded-full bg-[#DDE1EC] mb-2" />
          <div className="flex items-center justify-between w-full px-5 pb-1">
            <span className="text-[15px] font-bold text-[#111827]">나의 시즌 기록</span>
            <button onClick={() => setSheetOpen(false)} className="w-8 h-8 rounded-full bg-[#E8EBF4] flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="#64748B" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* 스크롤 콘텐츠 */}
        <div className="overflow-y-auto flex-1 pb-8">
          {/* 3. 시즌 기록 */}
          <div className="px-4 pt-2 mb-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-[#111827] font-bold">2026 시즌 기록</span>
              <span className="text-xs text-[#64748B]">20/144 경기</span>
            </div>
            <div className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] p-3">
              <div className="grid gap-0.5" style={{ gridTemplateColumns: 'repeat(12, 1fr)' }}>
                {Array.from({length: 144}).map((_, i) => {
                  const row = Math.floor(i / 12)
                  const col = i % 12
                  const posX = (col / 11) * 100
                  const posY = (row / 11) * 100
                  const isEmpty = SEASON_GRID_EMPTY.has(i)
                  return (
                    <div
                      key={i}
                      className="aspect-square rounded-sm"
                      style={isEmpty ? { backgroundColor: '#FFFFFF' } : {
                        backgroundImage: `url(${samsungImg})`,
                        backgroundSize: '1200% 1200%',
                        backgroundPosition: `${posX}% ${posY}%`,
                      }}
                    />
                  )
                })}
              </div>
            </div>
          </div>

          {/* 핵심 지표 */}
          <div className="px-4 mb-5">
            <div className="grid grid-cols-3 gap-2.5">
              <div className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] p-3 text-center flex flex-col justify-center">
                <p className="text-[#111827] text-2xl font-bold leading-tight">{diaries.length + 9}</p>
                <span className="text-[11px] font-medium text-[#64748B] mt-0.5">직관 기록</span>
              </div>
              <div className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] p-3 text-center flex flex-col justify-center">
                <p className="text-[#111827] text-2xl font-bold leading-tight">66.7%</p>
                <span className="text-[11px] font-medium text-[#64748B] mt-0.5">직관 승률</span>
                <span className="text-[10px] text-[#1B5BF0] font-semibold">8승 4패</span>
              </div>
              <div className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] p-3 text-center flex flex-col justify-center">
                <p className="text-[#111827] text-2xl font-bold leading-tight">롯데</p>
                <span className="text-[11px] font-medium text-[#64748B] mt-0.5">최다 직관 상대</span>
                <span className="text-[10px] text-[#64748B]">4경기</span>
              </div>
            </div>
          </div>

          {/* 나의 직관 분석 */}
          <div className="px-4 mb-5">
            <span className="text-sm text-[#111827] font-bold block mb-3">나의 직관 분석</span>
            <div className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] p-4">
              <div className="flex bg-[#F5F7FB] p-1 rounded-xl mb-4">
                {(['상대팀별', '야구장별', '요일별'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setAnalysisTab(tab)}
                    className={`flex-1 py-1.5 text-[12px] font-semibold rounded-lg transition-all ${
                      analysisTab === tab
                        ? 'bg-white text-[#111827] shadow-sm'
                        : 'text-[#64748B] hover:text-[#111827]'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              {analysisTab === '상대팀별' && (
                <div className="flex flex-col gap-3">
                  {opponentStats.map((item) => (
                    <div key={item.team} className="flex flex-col gap-1">
                      <div className="flex justify-between items-center text-[12px]">
                        <span className="font-semibold text-[#111827]">{item.team}</span>
                        <span className="font-bold text-[#1B5BF0]">{item.count}경기 <span className="text-[10px] text-[#64748B] font-normal ml-1">({item.win})</span></span>
                      </div>
                      <div className="w-full bg-[#F5F7FB] h-2 rounded-full overflow-hidden">
                        <div className="bg-[#1B5BF0] h-full rounded-full transition-all duration-300" style={{ width: `${(item.count / item.max) * 100}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {analysisTab === '야구장별' && (
                <div className="flex flex-col gap-3">
                  {stadiumStats.map((item) => (
                    <div key={item.stadium} className="flex flex-col gap-1">
                      <div className="flex justify-between items-center text-[12px]">
                        <span className="font-semibold text-[#111827]">{item.stadium}</span>
                        <span className="font-bold text-[#1B5BF0]">{item.count}경기</span>
                      </div>
                      <div className="w-full bg-[#F5F7FB] h-2 rounded-full overflow-hidden">
                        <div className="bg-[#1B5BF0] h-full rounded-full transition-all duration-300" style={{ width: `${(item.count / item.max) * 100}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {analysisTab === '요일별' && (
                <div className="flex flex-col gap-3">
                  {dayStats.map((item) => (
                    <div key={item.day} className="flex flex-col gap-1">
                      <div className="flex justify-between items-center text-[12px]">
                        <span className="font-semibold text-[#111827]">{item.day}</span>
                        <span className="font-bold text-[#1B5BF0]">{item.count}경기</span>
                      </div>
                      <div className="w-full bg-[#F5F7FB] h-2 rounded-full overflow-hidden">
                        <div className="bg-[#1B5BF0] h-full rounded-full transition-all duration-300" style={{ width: `${(item.count / item.max) * 100}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 기록 작성 모달 (098-SL-LG-10 인증하기 모달 폼 복제) */}
      {showWriteModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => { closeModal() }} />
          <div className="relative w-full bg-white rounded-t-3xl p-6 pb-10 flex flex-col gap-5 overflow-y-auto" style={{ minHeight: '72vh', maxHeight: '92vh' }}>
            <div className="w-10 h-1 rounded-full bg-[#E5E7EB] mx-auto -mt-1 mb-1" />

            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-1 flex-1 pr-3">
                <h2 className="text-[18px] font-bold text-[#111827]">함께 보낸 오늘, 소중한 순간을 기록해보세요.</h2>
                <p className="text-[13px] text-[#6B7280]">함께 만드는 V9, 기억에 남는 장면을 자유롭게 남겨보세요.</p>
              </div>
              <button onClick={() => { closeModal() }} className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F3F4F6] flex-shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M6 6l12 12M18 6L6 18" stroke="#6B7280" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            {/* 오늘의 경기 — 폼 필드 아님, 내용 노출 */}
            <div className="w-full rounded-2xl border border-[#DDE1EC] bg-[#F9FAFB] px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-white bg-[#1B5BF0] rounded-full px-2 py-0.5">홈</span>
                <span className="text-[13px] font-semibold text-[#111827]">삼성 vs 롯데</span>
              </div>
              <span className="text-[11px] text-[#9CA3AF]">9월 19일 (금)</span>
            </div>

            {/* 관람 방식 */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-bold text-[#111827]">어디서 경기를 보셨나요?</label>
              <div className="grid grid-cols-3 gap-2">
                {(['직관', '집관', '원정'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setWriteWatchMode(mode)}
                    className={`py-2.5 rounded-xl text-[13px] font-bold transition-all flex items-center justify-center gap-1.5 ${
                      writeWatchMode === mode
                        ? 'bg-[#1B5BF0] text-white'
                        : 'bg-[#F9FAFB] text-[#9CA3AF] border border-[#DDE1EC]'
                    }`}
                  >
                    <span>{mode === '직관' ? '🏟️' : mode === '집관' ? '📺' : '✈️'}</span>
                    <span>{mode}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 오늘의 선수 — 자동완성 입력 */}
            {(() => {
              const PLAYERS = ['구자욱', '김지찬', '이재현', '강민호', '오재일', '디아즈', '원태인', '류지혁', '박병호', '김헌곤']
              const CHOSEONG: Record<string, string> = {
                'ㄱ':'[가-깋]','ㄴ':'[나-닣]','ㄷ':'[다-딯]','ㄹ':'[라-맇]','ㅁ':'[마-밓]',
                'ㅂ':'[바-빟]','ㅅ':'[사-싷]','ㅇ':'[아-잏]','ㅈ':'[자-짛]','ㅊ':'[차-칳]',
                'ㅋ':'[카-킿]','ㅌ':'[타-팋]','ㅍ':'[파-핗]','ㅎ':'[하-힣]'
              }
              const filtered = playerQuery.trim() === ''
                ? PLAYERS
                : PLAYERS.filter(name => {
                    const q = playerQuery.trim()
                    if (CHOSEONG[q]) return new RegExp(CHOSEONG[q]).test(name[0])
                    return name.includes(q)
                  })
              const showSuggestions = playerFocused && playerQuery.trim() !== '' && filtered.length > 0 && playerQuery !== writePlayer
              return (
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-bold text-[#111827]">오늘 나의 수훈선수 <span className="text-[11px] font-normal text-[#9CA3AF]">(선택)</span></label>
                  <div className="relative">
                    <input
                      type="text"
                      value={playerQuery}
                      onChange={e => { setPlayerQuery(e.target.value); setWritePlayer('') }}
                      onFocus={() => setPlayerFocused(true)}
                      onBlur={() => setTimeout(() => setPlayerFocused(false), 150)}
                      placeholder="선수 이름 또는 초성 입력 (예: ㄱ, 구자욱)"
                      className="w-full rounded-2xl border border-[#DDE1EC] bg-[#F9FAFB] px-4 py-3 text-[13px] text-[#111827] placeholder:text-[#9CA3AF] outline-none focus:border-[#1B5BF0] focus:bg-white transition-colors"
                    />
                    {showSuggestions && (
                      <div className="absolute left-0 right-0 top-full mt-1 bg-white rounded-2xl border border-[#DDE1EC] shadow-lg overflow-hidden z-10">
                        {filtered.map(name => (
                          <button
                            key={name}
                            onMouseDown={() => { setWritePlayer(name); setPlayerQuery(name); setPlayerFocused(false) }}
                            className="w-full text-left px-4 py-2.5 text-[13px] text-[#111827] hover:bg-[#F5F7FB] transition-colors border-b border-[#F1F5F9] last:border-b-0"
                          >
                            {name}
                          </button>
                        ))}
                      </div>
                    )}
                    {playerFocused && playerQuery.trim() !== '' && filtered.length === 0 && (
                      <div className="absolute left-0 right-0 top-full mt-1 bg-white rounded-2xl border border-[#DDE1EC] shadow-lg px-4 py-3 z-10">
                        <p className="text-[12px] text-[#9CA3AF]">검색 결과 없음</p>
                      </div>
                    )}
                  </div>
                </div>
              )
            })()}

            <button
              onClick={() => setWritePhoto(v => !v)}
              className={`w-full aspect-video rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-colors ${
                writePhoto ? 'border-[#1B5BF0] bg-[#1A2A5E]' : 'border-[#DDE1EC] bg-[#F9FAFB]'
              }`}
            >
              {writePhoto ? (
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
              value={writeText}
              onChange={e => setWriteText(e.target.value)}
              placeholder="파란 피의 자부심, 언어에서도 빛납니다.&#10;선수들에게 상처가 되는 말 대신, 승리를 향한 긍정의 메시지를 남겨주세요!"
              className="w-full rounded-2xl border border-[#DDE1EC] bg-[#F9FAFB] px-4 py-4 text-[13px] text-[#111827] placeholder:text-[#9CA3AF] resize-none outline-none focus:border-[#1B5BF0] focus:bg-white transition-colors"
              style={{ minHeight: 140 }}
            />

            {editingPostId !== null ? (
              <div className="flex gap-2">
                <button
                  onClick={() => { setPosts(prev => prev.filter(p => p.id !== editingPostId)); closeModal() }}
                  className="rounded-2xl text-[15px] font-bold bg-[#F3F4F6] text-[#6B7280] transition-colors"
                  style={{ minHeight: 56, flex: '0 0 30%' }}
                >
                  삭제하기
                </button>
                <button
                  disabled={!writePhoto && writeText.trim().length === 0}
                  onClick={savePost}
                  className={`rounded-2xl text-[16px] font-bold transition-colors ${
                    writePhoto || writeText.trim().length > 0
                      ? 'bg-[#1B5BF0] text-white'
                      : 'bg-[#F3F4F6] text-[#9CA3AF] cursor-not-allowed'
                  }`}
                  style={{ minHeight: 56, flex: '0 0 calc(70% - 4px)' }}
                >
                  수정 완료
                </button>
              </div>
            ) : (
              <button
                disabled={!writePhoto && writeText.trim().length === 0}
                onClick={savePost}
                className={`w-full rounded-2xl text-[16px] font-bold transition-colors ${
                  writePhoto || writeText.trim().length > 0
                    ? 'bg-[#1B5BF0] text-white'
                    : 'bg-[#F3F4F6] text-[#9CA3AF] cursor-not-allowed'
                }`}
                style={{ minHeight: 56 }}
              >
                등록하기
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
