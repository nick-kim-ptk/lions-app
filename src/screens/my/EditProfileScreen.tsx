import { useState } from 'react'
import { PHCircle } from '@/components/Placeholder'
import { Header } from '@/components/Layout'
import { KBO_TEAMS } from '@/data/my'

export function EditProfileScreen() {
  const [nickname, setNickname] = useState('사자왕구자욱팬')
  const [nickChecked, setNickChecked] = useState(false)
  const [nicknameApplied, setNicknameApplied] = useState(false)
  const [favoriteTeam, setFavoriteTeam] = useState('삼성 라이온즈')
  const [idCopied, setIdCopied] = useState(false)

  const handleCheckDuplicate = () => {
    if (nickname.trim().length === 0) return
    setNickChecked(true)
    setNicknameApplied(false)
  }

  const handleApply = () => {
    if (!nickChecked) return
    setNicknameApplied(true)
  }

  const handleCopyId = async () => {
    if (!navigator.clipboard) return
    await navigator.clipboard.writeText('lions1028')
    setIdCopied(true)
    window.setTimeout(() => setIdCopied(false), 1500)
  }

  return (
    <div className="min-h-full bg-[#F5F7FB] pb-8">
      <Header title="내 정보 수정" />

      <div className="px-4 pt-6 flex flex-col gap-4">
        {/* Avatar */}
        <div className="flex flex-col items-center mb-4">
          <div className="relative">
            <PHCircle className="w-20 h-20" />
            <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-[#1B5BF0] flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" stroke="white" strokeWidth="2"/>
              </svg>
            </div>
          </div>
        </div>

        {/* 닉네임 */}
        <div className="flex flex-col gap-1.5">
          <span className="text-xs text-[#64748B] font-medium">닉네임</span>
          <div className="flex gap-2">
            <input
              value={nickname}
              onChange={e => { setNickname(e.target.value); setNickChecked(false); setNicknameApplied(false) }}
              placeholder="닉네임 입력"
              className="flex-1 h-12 bg-white border border-[#DDE1EC] rounded-xl px-4 text-sm text-[#111827] outline-none focus:border-[#1B5BF0]"
            />
            <button
              onClick={handleCheckDuplicate}
              className={`h-12 px-4 rounded-xl text-sm font-semibold shrink-0 transition-colors ${nickname.trim().length > 0 ? 'bg-[#1B5BF0] text-white' : 'bg-[#DDE1EC] text-[#9CA3AF]'}`}
            >
              중복 확인
            </button>
          </div>
          {nickChecked && (
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs text-[#1B5BF0]">✓ "{nickname}" 닉네임은 사용 가능합니다.</span>
              <button
                onClick={handleApply}
                className="h-9 px-4 rounded-xl text-sm font-semibold shrink-0 bg-[#0E1A40] text-white transition-colors"
              >
                적용
              </button>
            </div>
          )}
        </div>

        {/* 이름 */}
        <div className="flex flex-col gap-1.5">
          <span className="text-xs text-[#9CA3AF] font-medium">이름</span>
          <div className="h-12 bg-[#F5F7FB] border border-[#DDE1EC] rounded-xl px-4 flex items-center">
            <span className="text-sm text-[#111827]">김민준</span>
          </div>
        </div>

        {/* 아이디 */}
        <div className="flex flex-col gap-1.5">
          <span className="text-xs text-[#9CA3AF] font-medium">아이디</span>
          <div className="h-12 bg-[#F5F7FB] border border-[#DDE1EC] rounded-xl px-4 flex items-center">
            <span className="text-sm text-[#111827]">lions1028</span>
            <button
              type="button"
              onClick={handleCopyId}
              aria-label="아이디 복사"
              className={`ml-auto flex h-8 w-8 items-center justify-center rounded-lg ${
                idCopied ? 'bg-[#F0FDF4] text-[#16A34A]' : 'bg-white text-[#64748B]'
              }`}
            >
              {idCopied ? (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <rect x="8" y="8" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M16 8V6a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2h2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* 휴대폰 번호 */}
        <div className="flex flex-col gap-1.5">
          <span className="text-xs text-[#9CA3AF] font-medium">휴대폰 번호</span>
          <div className="h-12 bg-[#F5F7FB] border border-[#DDE1EC] rounded-xl px-4 flex items-center">
            <span className="text-sm text-[#111827]">010-1234-5678</span>
          </div>
        </div>

        {/* 주소 */}
        <div className="flex flex-col gap-1.5">
          <span className="text-xs text-[#64748B] font-medium">주소</span>
          <input
            defaultValue="대구광역시 수성구 야구전설로 29"
            className="h-12 bg-white border border-[#DDE1EC] rounded-xl px-4 text-sm text-[#111827] outline-none focus:border-[#1B5BF0]"
          />
        </div>

        {/* 가입일 — 비활성화 */}
        <div className="flex flex-col gap-1.5">
          <span className="text-xs text-[#9CA3AF] font-medium">가입일</span>
          <div className="h-12 bg-[#F5F7FB] border border-[#DDE1EC] rounded-xl px-4 flex items-center">
            <span className="text-sm text-[#9CA3AF]">2021.05.09</span>
          </div>
        </div>

        {/* 선호 구단 */}
        <div className="flex flex-col gap-1.5">
          <span className="text-xs text-[#64748B] font-medium">선호 구단</span>
          <div className="relative">
            <select
              value={favoriteTeam}
              onChange={e => setFavoriteTeam(e.target.value)}
              className="w-full h-12 bg-white border border-[#DDE1EC] rounded-xl px-4 pr-10 text-sm text-[#111827] outline-none focus:border-[#1B5BF0] appearance-none"
            >
              {KBO_TEAMS.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <svg className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M6 9l6 6 6-6" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
