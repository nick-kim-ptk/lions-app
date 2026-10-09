import { useNavigate } from 'react-router-dom'
import { Page } from '@/components/Layout'

// 092-SL-CM-07 개인정보수집이용 동의서 — 동의 체크 없음
export function PrivacyConsentScreen() {
  const navigate = useNavigate()
  return (
    <Page>
      <div className="px-5 pt-14 pb-4 flex items-center gap-2">
        <button onClick={() => navigate(-1)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M15 19l-7-7 7-7" stroke="#111827" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        <span className="text-[#111827] font-semibold">개인정보 수집·이용 동의</span>
      </div>
      <div className="flex-1 px-5 pb-8 overflow-y-auto">
        <p className="text-sm text-[#64748B] mb-4">라이온즈 멤버십 가입을 위해 아래와 같이 개인정보를 수집·이용합니다.</p>

        {/* 필수 항목 */}
        <p className="text-xs text-[#E53935] font-semibold mb-2">■ 필수 수집 항목</p>
        <div className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] overflow-hidden mb-5">
          <div className="flex bg-[#E8EBF4]">
            {['수집 항목', '수집 목적', '보유 기간'].map((h) => (
              <div key={h} className="flex-1 py-3 text-center text-xs text-[#64748B] font-medium border-r border-[#DDE1EC] last:border-0">{h}</div>
            ))}
          </div>
          {[
            ['이름, 이메일, 비밀번호', '회원 식별 및 서비스 제공', '회원 탈퇴 후 즉시 삭제 (3년 미이용 시 자동 탈퇴)'],
            ['생년월일, 성별', '연령 확인 및 맞춤 서비스', '회원 탈퇴 후 즉시 삭제 (3년 미이용 시 자동 탈퇴)'],
            ['휴대폰 번호', '본인 인증 및 고객 지원', '회원 탈퇴 후 즉시 삭제 (3년 미이용 시 자동 탈퇴)'],
          ].map((row, i) => (
            <div key={i} className="flex border-t border-[#DDE1EC]">
              {row.map((cell, j) => (
                <div key={j} className="flex-1 py-3 px-2 border-r border-[#DDE1EC] last:border-0 flex items-center">
                  <span className="text-[10px] text-[#64748B] leading-relaxed">{cell}</span>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* 선택 항목 */}
        <p className="text-xs text-[#9CA3AF] font-semibold mb-2">■ 선택 수집 항목</p>
        <div className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] overflow-hidden mb-5">
          <div className="flex bg-[#E8EBF4]">
            {['수집 항목', '수집 목적', '보유 기간'].map((h) => (
              <div key={h} className="flex-1 py-3 text-center text-xs text-[#64748B] font-medium border-r border-[#DDE1EC] last:border-0">{h}</div>
            ))}
          </div>
          {[
            ['주소, 거주지', '지역 기반 이벤트 안내', '동의 철회 시 즉시 삭제'],
          ].map((row, i) => (
            <div key={i} className="flex border-t border-[#DDE1EC]">
              {row.map((cell, j) => (
                <div key={j} className="flex-1 py-3 px-2 border-r border-[#DDE1EC] last:border-0 flex items-center">
                  <span className="text-[10px] text-[#64748B]">{cell}</span>
                </div>
              ))}
            </div>
          ))}
        </div>

        <p className="text-xs text-[#9CA3AF] leading-relaxed">
          귀하는 개인정보 수집·이용에 대한 동의를 거부할 권리가 있으며, 필수 항목 미동의 시 서비스 이용이 제한될 수 있습니다.
        </p>
      </div>
      {/* 닫기 버튼 — 하단 플로팅 */}
      <div className="sticky bottom-0 bg-white border-t border-[#DDE1EC] px-5 pt-4 pb-10">
        <button onClick={() => navigate(-1)} className="w-full h-14 rounded-2xl bg-[#FFFFFF] border border-[#DDE1EC] text-[#111827] font-medium">
          닫기
        </button>
      </div>
    </Page>
  )
}
