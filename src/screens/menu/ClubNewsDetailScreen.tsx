import { useNavigate, useLocation } from "react-router-dom"

import { PH } from "@/components/Placeholder"

import { Header } from "@/components/Layout"

import { PrevNextNav } from "@/components/PrevNextNav"

import {
  CLUB_NEWS_DATA,
  CLUB_NEWS_CATEGORY_STYLE,
  type ClubNews,
} from "@/data/menu"

// 109-SL-AL-32 구단 소식 상세 (구단 소식 목록 072-SL-AL-16에서 진입, `?id=` 로 글 선택)

/** 더미 본문 — 분류별 문구 (실제 서비스에서는 어드민 구단 소식 등록 내용) */
const BODY: Record<ClubNews["category"], string[]> = {
  "선수단 소식": [
    "삼성 라이온즈 선수단 소식을 전해 드립니다.",
    "경기 기록과 선수 컨디션 등 상세 내용은 구단 공식 자료를 기준으로 안내됩니다.",
    "앞으로도 선수단에 많은 응원 부탁드립니다.",
  ],
  "이벤트/행사": [
    "삼성 라이온즈가 팬 여러분을 위한 이벤트·행사를 준비했습니다.",
    "■ 진행 안내\n일정과 참여 방법은 아래 내용을 확인해 주세요. 준비된 수량 소진 시 조기 종료될 수 있습니다.",
    "자세한 참여 방법은 앱 이벤트 메뉴에서도 확인할 수 있습니다.",
  ],
  "티켓/상품": [
    "티켓 및 상품 관련 안내를 드립니다.",
    "■ 안내 사항\n예매 일정, 판매 대상, 유의 사항은 아래 내용을 참고해 주세요.",
    "예매 관련 문의는 고객센터(1588-0000)로 연락해 주시기 바랍니다.",
  ],
  전지훈련: [
    "삼성 라이온즈 선수단의 전지훈련 소식을 전해 드립니다.",
    "훈련 일정과 현지 진행 상황은 구단 공식 채널을 통해 순차적으로 안내됩니다.",
  ],
  사회공헌: [
    "삼성 라이온즈는 지역사회와 함께하는 사회공헌 활동을 이어가고 있습니다.",
    "■ 활동 내용\n참여 대상과 활동 내용은 아래 내용을 확인해 주세요.",
    "팬 여러분의 많은 관심과 참여 부탁드립니다.",
  ],
  "구장/운영": [
    "구장 및 경기 운영과 관련한 안내를 드립니다.",
    "■ 변경·안내 사항\n이용에 참고하실 수 있도록 주요 내용을 정리했습니다.",
    "이용 중 불편한 점은 고객센터(1588-0000)로 문의해 주시기 바랍니다.",
  ],
}

export function ClubNewsDetailScreen() {
  const navigate = useNavigate()

  const location = useLocation()

  const id = Number(new URLSearchParams(location.search).get("id") ?? "1")

  // 목록과 같은 순서(최신순)
  const list = CLUB_NEWS_DATA

  const idx = Math.max(
    0,
    list.findIndex((n) => n.id === id),
  )

  const news = list[idx]

  const goto = (n: ClubNews) => navigate(`/all/club-news-detail?id=${n.id}`)

  return (
    <div className="min-h-full bg-[#F5F7FB] pb-4">
      <Header title="구단 소식" />
      <div className="px-4 pt-5 flex flex-col gap-4">
        {/* 뱃지 + 날짜 */}
        <div className="flex items-center gap-2">
          {news.important && (
            <span className="text-[10px] font-bold text-white bg-[#EF4444] rounded px-1.5 py-0.5 leading-tight">
              중요
            </span>
          )}
          <span
            className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${CLUB_NEWS_CATEGORY_STYLE[news.category]}`}
          >
            {news.category}
          </span>
          <span className="text-[12px] text-[#9CA3AF]">{news.date}</span>
        </div>
        {/* 제목 */}
        <h2 className="text-[17px] font-bold text-[#111827] leading-snug">
          {news.title}
        </h2>
        <div className="h-px bg-[#DDE1EC]" />
        {/* 대표 이미지 — 본문 상단 */}
        <div className="w-full rounded-2xl overflow-hidden border border-[#DDE1EC] bg-[#F5F7FB] aspect-video">
          <PH className="w-full h-full rounded-none" />
        </div>
        {/* 본문 */}
        <div className="flex flex-col gap-3 text-[14px] text-[#374151] leading-relaxed">
          <p>안녕하세요, 삼성 라이온즈입니다.</p>
          {BODY[news.category].map((p, i) => (
            <p key={i} className="whitespace-pre-line">
              {p}
            </p>
          ))}
          <p>감사합니다.</p>
        </div>

        {/* 이전 글 / 다음 글 */}
        <PrevNextNav list={list} currentId={news.id} onGo={goto} />

        <div className="h-px bg-[#DDE1EC]" />
        <button
          onClick={() => navigate("/all/club-news")}
          className="w-full h-12 rounded-2xl bg-[#111827] text-white text-[14px] font-bold active:opacity-90 transition-opacity"
        >
          목록
        </button>
      </div>
    </div>
  )
}
