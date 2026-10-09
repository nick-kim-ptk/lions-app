import { PH } from "@/components/Placeholder"

import { Header } from "@/components/Layout"

// 076(078)-SL-AL-22 라이온즈 소식 상세보기

export function NoticeDetailScreen() {
  return (
    <div className="min-h-full bg-[#F5F7FB] pb-4">
      <Header title="라이온즈 소식" />
      <div className="px-4 pt-5 flex flex-col gap-4">
        {/* 뱃지 + 날짜 */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-[#F0FDF4] text-[#16A34A]">
            앱 공지
          </span>
          <span className="text-[12px] text-[#9CA3AF]">2026.09.13</span>
        </div>
        {/* 제목 */}
        <h2 className="text-[17px] font-bold text-[#111827] leading-snug">
          앱 업데이트 및 이용 안내
        </h2>
        <div className="h-px bg-[#DDE1EC]" />
        {/* 참조 이미지 — 본문 상단 */}
        <div className="w-full rounded-2xl overflow-hidden border border-[#DDE1EC] bg-[#F5F7FB] aspect-video">
          <PH className="w-full h-full rounded-none" />
        </div>
        {/* 본문 */}
        <div className="flex flex-col gap-3 text-[14px] text-[#374151] leading-relaxed">
          <p>안녕하세요, 삼성 라이온즈입니다.</p>
          <p>
            더 나은 서비스 제공을 위해 앱이 업데이트되었습니다. 주요 변경 사항을
            안내드립니다.
          </p>
          <p className="font-bold text-[#111827]">■ 업데이트 내용</p>
          <p>
            1. 홈 화면 개편 — 경기 정보 및 주요 콘텐츠 접근성이 개선되었습니다.
          </p>
          <p>
            2. 함께 만드는 V9 — 직관 기록 작성 및 시즌 기록 분석 기능이
            추가되었습니다.
          </p>
          <p>3. 엘도라도 ZONE — 라이브 채팅 성능이 향상되었습니다.</p>
          <p>
            4. 쿠폰함 — UI가 개선되어 보유 쿠폰을 한눈에 확인할 수 있습니다.
          </p>
          <p>5. 기타 안정성 개선 및 버그 수정이 포함되었습니다.</p>
          <p className="font-bold text-[#111827]">■ 업데이트 방법</p>
          <p>App Store 또는 Google Play에서 최신 버전으로 업데이트해 주세요.</p>
          <p>
            이용 중 불편한 점이 있으시면 고객센터(1588-0000)로 문의해 주시기
            바랍니다.
          </p>
          <p>앞으로도 더 나은 서비스로 찾아뵙겠습니다. 감사합니다.</p>
        </div>

        {/* 첨부 파일 */}
        <div className="flex flex-col gap-2">
          <span className="text-[12px] font-bold text-[#111827]">
            첨부 파일
          </span>
          {[{ name: "2026_앱_업데이트_안내문.pdf", size: "1.2 MB" }].map(
            (file, i) => (
              <button
                key={i}
                className="flex items-center gap-3 bg-white border border-[#DDE1EC] rounded-xl px-4 py-3 text-left active:bg-[#F5F7FB] transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-[#EBF0FF] flex items-center justify-center shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"
                      stroke="#1B5BF0"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M14 2v6h6M12 18v-6M9 15l3 3 3-3"
                      stroke="#1B5BF0"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium text-[#111827] truncate">
                    {file.name}
                  </p>
                  <p className="text-[11px] text-[#9CA3AF]">{file.size}</p>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"
                    stroke="#9CA3AF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            ),
          )}
        </div>

        <div className="h-px bg-[#DDE1EC]" />
        <button
          onClick={() => window.history.back()}
          className="w-full h-12 rounded-2xl bg-[#111827] text-white text-[14px] font-bold active:opacity-90 transition-opacity"
        >
          목록
        </button>
      </div>
    </div>
  )
}
