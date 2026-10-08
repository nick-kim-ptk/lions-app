import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Page } from '@/components/Layout'

// 090-SL-CM-05 회원가입
export function SignupScreen() {
  const navigate = useNavigate()
  const [verified, setVerified] = useState(false)
  const [verifyMethod, setVerifyMethod] = useState<'pass' | 'ipin' | null>(null)
  const [nickname, setNickname] = useState('')
  const [nickChecked, setNickChecked] = useState(false)
  const [displayName, setDisplayName] = useState('홈런치는구자욱1028')
  const [displayNameChecked, setDisplayNameChecked] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [terms, setTerms] = useState({ t1: false, t2: false, t3: false, t4: false })

  const allRequired = terms.t1 && terms.t2
  const allTerms = terms.t1 && terms.t2 && terms.t3 && terms.t4
  const pwMatch = password.length >= 8 && password === passwordConfirm

  function toggleAll() {
    const next = !allTerms
    setTerms({ t1: next, t2: next, t3: next, t4: next })
  }

  const canSubmit = verified && nickChecked && pwMatch && allRequired

  return (
    <Page>
      {/* Header */}
      <div className="px-5 pt-14 pb-4 flex items-center gap-2">
        <button onClick={() => navigate(-1)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M15 19l-7-7 7-7" stroke="#111827" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        <span className="text-[#111827] font-semibold">회원가입</span>
      </div>

      <div className="flex-1 px-5 pb-4 flex flex-col gap-6 overflow-y-auto">

        {/* ① PASS 인증 */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${verified ? 'bg-[#1B5BF0] text-white' : 'bg-[#DDE1EC] text-[#9CA3AF]'}`}>1</div>
            <p className="text-[14px] font-bold text-[#111827]">본인 인증</p>
          </div>

          {!verified ? (
            <button
              onClick={() => setVerified(true)}
              className="w-full h-14 rounded-2xl bg-[#1B5BF0] text-white text-[14px] font-bold"
            >
              PASS 인증
            </button>
          ) : (
            <div className="bg-[#EBF0FF] border border-[#1B5BF0]/30 rounded-2xl px-4 py-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#1B5BF0] flex items-center justify-center shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="2.5" strokeLinecap="round"/></svg>
              </div>
              <div>
                <p className="text-xs font-semibold text-[#1B5BF0]">PASS 인증 완료</p>
              </div>
            </div>
          )}
        </div>

        {/* ② 인증 후 자동입력 정보 */}
        <div className={`flex flex-col gap-3 transition-opacity duration-300 ${verified ? 'opacity-100' : 'opacity-30 pointer-events-none select-none'}`}>
          <div className="flex items-center gap-2">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${verified ? 'bg-[#1B5BF0] text-white' : 'bg-[#DDE1EC] text-[#9CA3AF]'}`}>2</div>
            <p className="text-[14px] font-bold text-[#111827]">기본 정보</p>
            {verified && <span className="text-[10px] text-[#1B5BF0] bg-[#EBF0FF] rounded-full px-2 py-0.5 font-medium">자동 입력됨</span>}
          </div>
          <div className="flex flex-col gap-2.5">
            {[
              { label: '이름', value: '홍길동' },
              { label: '휴대폰 번호', value: '010-****-1234' },
              { label: '생년월일', value: '1990.03.15' },
            ].map((f) => (
              <div key={f.label} className="flex flex-col gap-1">
                <span className="text-xs text-[#64748B] font-medium">{f.label}</span>
                <div className="h-12 bg-[#F5F7FB] border border-[#DDE1EC] rounded-xl px-4 flex items-center gap-2">
                  <span className="text-sm text-[#111827]">{verified ? f.value : <span className="w-24 h-3 bg-[#E8EAF0] rounded-full inline-block" />}</span>
                  {verified && (
                    <svg className="ml-auto shrink-0" width="13" height="13" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm0 0" stroke="#1B5BF0" strokeWidth="1.5"/>
                      <path d="M9 12l2 2 4-4" stroke="#1B5BF0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ③ 직접 입력 — 아이디·닉네임·비밀번호 */}
        <div className={`flex flex-col gap-3 transition-opacity duration-300 ${verified ? 'opacity-100' : 'opacity-30 pointer-events-none select-none'}`}>
          <div className="flex items-center gap-2">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${verified ? 'bg-[#1B5BF0] text-white' : 'bg-[#DDE1EC] text-[#9CA3AF]'}`}>3</div>
            <p className="text-[14px] font-bold text-[#111827]">로그인 정보 입력</p>
          </div>

          {/* 아이디 + 중복확인 */}
          <div className="flex flex-col gap-1">
            <span className="text-xs text-[#64748B] font-medium">아이디 <span className="text-[#E53935]">*</span></span>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="아이디를 입력해 주세요"
                value={nickname}
                onChange={(e) => { setNickname(e.target.value); setNickChecked(false) }}
                className="flex-1 h-12 bg-[#FFFFFF] border border-[#DDE1EC] rounded-xl px-4 text-sm text-[#111827] placeholder-[#C4C9D6] outline-none focus:border-[#1B5BF0]"
              />
              <button
                onClick={() => nickname.length > 0 && setNickChecked(true)}
                className={`h-12 px-4 rounded-xl text-[12px] font-semibold shrink-0 border transition-colors ${nickChecked ? 'bg-[#EBF0FF] border-[#1B5BF0]/30 text-[#1B5BF0]' : 'bg-[#1B5BF0] border-[#1B5BF0] text-white'}`}
              >
                {nickChecked ? '사용가능' : '중복확인'}
              </button>
            </div>
            {nickChecked && (
              <p className="text-[11px] text-[#1B5BF0]">✓ 사용 가능한 아이디입니다.</p>
            )}
          </div>

          {/* 닉네임 + 중복확인 */}
          <div className="flex flex-col gap-1">
            <span className="text-xs text-[#64748B] font-medium">닉네임 <span className="text-[#E53935]">*</span></span>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="닉네임을 입력해 주세요"
                value={verified ? displayName : ''}
                onChange={(e) => { setDisplayName(e.target.value); setDisplayNameChecked(false) }}
                className="flex-1 h-12 bg-[#FFFFFF] border border-[#DDE1EC] rounded-xl px-4 text-sm text-[#111827] placeholder-[#C4C9D6] outline-none focus:border-[#1B5BF0]"
              />
              <button
                onClick={() => displayName.length > 0 && setDisplayNameChecked(true)}
                className={`h-12 px-4 rounded-xl text-[12px] font-semibold shrink-0 border transition-colors ${displayNameChecked ? 'bg-[#EBF0FF] border-[#1B5BF0]/30 text-[#1B5BF0]' : 'bg-[#1B5BF0] border-[#1B5BF0] text-white'}`}
              >
                {displayNameChecked ? '사용가능' : '중복확인'}
              </button>
            </div>
            {displayNameChecked && (
              <p className="text-[11px] text-[#1B5BF0]">✓ 사용 가능한 닉네임입니다.</p>
            )}
          </div>

          {/* 비밀번호 */}
          <div className="flex flex-col gap-1">
            <span className="text-xs text-[#64748B] font-medium">비밀번호 <span className="text-[#E53935]">*</span></span>
            <input
              type="password"
              placeholder="8자 이상 영문+숫자+특수문자"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 bg-[#FFFFFF] border border-[#DDE1EC] rounded-xl px-4 text-sm text-[#111827] placeholder-[#C4C9D6] outline-none focus:border-[#1B5BF0]"
            />
          </div>

          {/* 비밀번호 확인 */}
          <div className="flex flex-col gap-1">
            <span className="text-xs text-[#64748B] font-medium">비밀번호 확인 <span className="text-[#E53935]">*</span></span>
            <input
              type="password"
              placeholder="비밀번호를 다시 입력해 주세요"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              className={`h-12 bg-[#FFFFFF] border rounded-xl px-4 text-sm text-[#111827] placeholder-[#C4C9D6] outline-none ${passwordConfirm.length > 0 ? (pwMatch ? 'border-[#1B5BF0]' : 'border-[#E53935]') : 'border-[#DDE1EC]'}`}
            />
            {passwordConfirm.length > 0 && (
              <p className={`text-[11px] ${pwMatch ? 'text-[#1B5BF0]' : 'text-[#E53935]'}`}>
                {pwMatch ? '✓ 비밀번호가 일치합니다.' : '비밀번호가 일치하지 않습니다.'}
              </p>
            )}
          </div>
        </div>

        {/* ④ 약관 동의 */}
        <div className={`flex flex-col gap-3 transition-opacity duration-300 ${verified ? 'opacity-100' : 'opacity-30 pointer-events-none'}`}>
          <div className="flex items-center gap-2">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${verified ? 'bg-[#1B5BF0] text-white' : 'bg-[#DDE1EC] text-[#9CA3AF]'}`}>4</div>
            <p className="text-[14px] font-bold text-[#111827]">약관 동의</p>
          </div>

          {/* 전체 동의 */}
          <button onClick={toggleAll}
            className={`flex items-center gap-3 h-12 bg-[#FFFFFF] rounded-xl px-4 border-2 transition-colors ${allTerms ? 'border-[#1B5BF0]' : 'border-[#DDE1EC]'}`}>
            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${allTerms ? 'bg-[#1B5BF0] border-[#1B5BF0]' : 'border-[#DDE1EC]'}`}>
              {allTerms && <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="2.5" strokeLinecap="round"/></svg>}
            </div>
            <span className="text-sm text-[#111827] font-semibold">전체 동의</span>
          </button>

          <div className="h-px bg-[#DDE1EC]" />

          <div className="flex flex-col gap-3">
            {([
              { key: 't1', label: '블루멤버십 이용약관 동의', required: true, path: '/signup/terms' },
              { key: 't2', label: '개인정보 수집·이용 동의', required: true, path: '/signup/privacy' },
              { key: 't3', label: '마케팅 정보 수신 동의', required: false, path: '' },
              { key: 't4', label: '제3자 정보 제공 동의', required: false, path: '' },
            ] as const).map((t) => (
              <div key={t.key} className="flex items-center gap-3">
                <button onClick={() => setTerms(prev => ({ ...prev, [t.key]: !prev[t.key] }))}
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${terms[t.key] ? 'bg-[#1B5BF0] border-[#1B5BF0]' : 'border-[#DDE1EC]'}`}>
                  {terms[t.key] && <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="2.5" strokeLinecap="round"/></svg>}
                </button>
                <span className="flex-1 text-sm text-[#64748B]">
                  {t.label}
                  <span className={`ml-1 text-[10px] ${t.required ? 'text-[#E53935]' : 'text-[#9CA3AF]'}`}>
                    ({t.required ? '필수' : '선택'})
                  </span>
                </span>
                {t.path && (
                  <button onClick={() => navigate(t.path)} className="text-xs text-[#9CA3AF] shrink-0">보기 ›</button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA — 하단 플로팅 */}
      <div className="sticky bottom-0 bg-white border-t border-[#DDE1EC] px-5 pt-4 pb-10">
        <button
          disabled={!canSubmit}
          onClick={() => canSubmit && navigate('/signup/welcome')}
          className={`w-full h-14 rounded-2xl font-bold text-[16px] transition-colors ${canSubmit ? 'bg-[#1B5BF0] text-white' : 'bg-[#DDE1EC] text-[#9CA3AF]'}`}
        >
          가입하기
        </button>
      </div>
    </Page>
  )
}
