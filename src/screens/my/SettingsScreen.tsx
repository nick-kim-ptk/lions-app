import { useState } from "react"

import iconSocial from "@/assets/images/social-login-icons.png"

import { useNavigate } from "react-router-dom"

import { Header } from "@/components/Layout"

import { CaseSelect } from "@/components/CaseSelect"

import { SOCIAL_ICONS } from "@/data/my"

// Reusable list row

function ListRow({
  label,
  value,
  arrow = true,
}: {
  label: string
  value?: string
  arrow?: boolean
}) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-[#DDE1EC]">
      <span className="text-sm text-[#111827]">{label}</span>
      <div className="flex items-center gap-2">
        {value && <span className="text-sm text-[#64748B]">{value}</span>}
        {arrow && (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 18l6-6-6-6"
              stroke="#4A5570"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        )}
      </div>
    </div>
  )
}

function SocialIconRow() {
  const [grayed, setGrayed] = useState<boolean[]>([false, false, false])

  return (
    <div className="flex items-center gap-4">
      {SOCIAL_ICONS.map((icon, i) => (
        <button
          key={i}
          onClick={() =>
            setGrayed((prev) => prev.map((v, j) => (j === i ? !v : v)))
          }
          className="w-[36px] h-[36px] rounded-full overflow-hidden shrink-0 flex items-center justify-center"
          style={{
            backgroundImage: `url(${iconSocial})`,

            backgroundSize: "108px 31px",

            backgroundPosition: `${icon.bgX * (108 / 211)}px center`,

            backgroundRepeat: "no-repeat",

            filter: grayed[i] ? "grayscale(100%)" : "none",

            transition: "filter 0.2s",
          }}
          aria-label={icon.label}
        />
      ))}
    </div>
  )
}

export function SettingsScreen() {
  const navigate = useNavigate()

  const [allowNotif, setAllowNotif] = useState(true)

  const [permission, setPermission] = useState<"권한 허용" | "권한 거부">(
    "권한 허용",
  )

  const denied = permission === "권한 거부"

  const REQUIRED_NOTIFS = [
    {
      name: "예매·발권·취소·환불 알림",
      desc: "예매 확인, 티켓 발권, 취소·환불 처리 결과",
    },

    {
      name: "경기 변경 알림(예매자)",
      desc: "우천 지연·취소, 경기 연기·재편성 시 예매하신 경기 안내",
    },

    { name: "계정·멤버십 안내", desc: "가입 완료, PRESS 승인·반려 결과" },
  ]

  const [isVersionModalOpen, setIsVersionModalOpen] = useState(false)

  const [notifs, setNotifs] = useState({
    "경기 시작 알림": true,

    "라인업 발표 알림": true,

    "경기 결과 알림": true,

    "티켓 예매 오픈 알림": true,

    "이벤트 알림": true,

    "공지 알림": true,

    "마케팅 알림": false,

    "엘도라도 ZONE 알림": true,

    "블루 시그널 알림": true,

    "독점 콘텐츠 알림": true,

    "선물 알림": true,

    "직관 기록 리마인드": true,

    "오늘의 미션": true,
  })

  function toggleOne(key: keyof typeof notifs) {
    if (!allowNotif || denied) return

    setNotifs((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="min-h-full bg-[#F5F7FB] flex flex-col pb-16">
      <Header title="설정" />

      <div className="px-4 pt-4 flex flex-col gap-4 flex-1">
        {/* 알림 설정 카드 — 앱 전용(푸시 권한·기기 알림)이라 PC에서는 숨김 */}
        <div className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] px-4 pb-1 lg:hidden">
          <div className="flex items-center justify-between py-3">
            <p className="text-xs text-[#9CA3AF]">알림 설정</p>
            <CaseSelect
              value={permission}
              options={["권한 허용", "권한 거부"] as const}
              onChange={setPermission}
            />
          </div>

          {denied && (
            <div className="mb-3 rounded-xl bg-[#FFF4E5] border border-[#F0A500]/40 px-3 py-3">
              <p className="text-[12px] font-bold text-[#7C5C00]">
                기기 알림 권한이 꺼져 있어요
              </p>
              <p className="text-[11px] text-[#7C5C00]/80 mt-0.5">
                알림을 받으려면 기기 설정에서 권한을 허용해 주세요.
              </p>
              <button
                type="button"
                className="mt-2 h-8 px-3 rounded-lg bg-[#F0A500] text-white text-[12px] font-bold"
              >
                설정으로 이동
              </button>
            </div>
          )}

          {/* 필수 알림 — 토글 없이 항상 발송 */}
          {REQUIRED_NOTIFS.map((r) => (
            <div
              key={r.name}
              className="flex items-center justify-between py-3 border-t border-[#DDE1EC]"
            >
              <div className="min-w-0 pr-3">
                <p className="text-sm text-[#111827]">{r.name}</p>
                <p className="text-[11px] text-[#9CA3AF] mt-0.5">{r.desc}</p>
              </div>
              <span className="shrink-0 text-[10px] font-bold text-[#64748B] bg-[#EEF1F7] rounded-full px-2.5 py-1">
                항상 수신
              </span>
            </div>
          ))}

          {/* Master toggle: 전체 알림 ON/OFF */}
          <div className="flex items-center justify-between py-3.5 border-t border-[#DDE1EC]">
            <span className="text-sm font-bold text-[#111827]">
              전체 알림 ON/OFF
            </span>
            <button
              type="button"
              onClick={() => setAllowNotif(!allowNotif)}
              className={`w-12 h-6 rounded-full flex items-center transition-colors duration-200 ${
                allowNotif
                  ? "bg-[#1B5BF0] justify-end pr-0.5"
                  : "bg-[#D1D5DB] justify-start pl-0.5"
              }`}
            >
              <div className="w-5 h-5 rounded-full bg-white shadow-sm" />
            </button>
          </div>

          {/* 개별 알림 리스트 */}
          {(Object.keys(notifs) as (keyof typeof notifs)[]).map((n) => (
            <div
              key={n}
              className="flex items-center justify-between py-3 border-t border-[#DDE1EC]"
            >
              <div className="min-w-0 pr-3">
                <span
                  className={`text-sm ${
                    allowNotif && !denied ? "text-[#111827]" : "text-[#9CA3AF]"
                  }`}
                >
                  {n}
                </span>
                {n === "경기 시작 알림" && (
                  <p className="text-[11px] text-[#9CA3AF] mt-0.5">
                    경기 시작 30분 전에 알려드려요
                  </p>
                )}
                {n === "선물 알림" && (
                  <p className="text-[11px] text-[#9CA3AF] mt-0.5">
                    받은 선물 티켓이 자동 회수되기 1시간 전에 알려드려요
                  </p>
                )}
                {n === "직관 기록 리마인드" && (
                  <p className="text-[11px] text-[#9CA3AF] mt-0.5">
                    경기 당일 22시까지 기록하지 않았을 때 알려드려요
                  </p>
                )}
                {n === "오늘의 미션" && (
                  <p className="text-[11px] text-[#9CA3AF] mt-0.5">
                    미션 정답이 발표되면 알려드려요
                  </p>
                )}
                {n === "마케팅 알림" && (
                  <p className="text-[11px] text-[#9CA3AF] mt-0.5">
                    21시~08시에는 발송되지 않아요
                  </p>
                )}
              </div>
              <button
                type="button"
                disabled={!allowNotif || denied}
                onClick={() => toggleOne(n)}
                className={`w-12 h-6 rounded-full flex items-center transition-colors duration-200 ${
                  !allowNotif || denied
                    ? "bg-[#E5E7EB] justify-start pl-0.5 cursor-not-allowed"
                    : notifs[n]
                      ? "bg-[#1B5BF0] justify-end pr-0.5"
                      : "bg-[#D1D5DB] justify-start pl-0.5"
                }`}
              >
                <div className="w-5 h-5 rounded-full bg-white shadow-sm" />
              </button>
            </div>
          ))}
        </div>

        {/* Account */}
        <div className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] px-4">
          <p className="text-xs text-[#9CA3AF] py-3">계정</p>
          <ListRow label="비밀번호 변경" />
          <button
            type="button"
            onClick={() => navigate("/my/press-application")}
            className="flex w-full items-center justify-between border-b border-[#DDE1EC] py-4 text-left"
          >
            <span className="text-sm text-[#111827]">PRESS 신청</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 18l6-6-6-6"
                stroke="#4A5570"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <div className="flex items-center justify-between py-3 border-t border-[#F0F2F5]">
            <span className="text-sm text-[#111827]">계정 연동</span>
            <SocialIconRow />
          </div>
        </div>

        {/* App info */}
        <div className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] px-4">
          <p className="text-xs text-[#9CA3AF] py-3">앱 정보</p>
          <div className="flex items-center justify-between py-4 border-b border-[#DDE1EC]">
            <button
              type="button"
              onClick={() => setIsVersionModalOpen(true)}
              className="text-sm text-[#111827]"
            >
              앱 버전
            </button>
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#64748B]">2.5.0</span>
              <span className="rounded-full bg-[#EBF0FF] px-2.5 py-1 text-[11px] font-bold text-[#1B5BF0]">
                최신 버전 2.5.2
              </span>
            </div>
          </div>
          <ListRow label="개인정보 처리방침" />
          <ListRow label="서비스 이용약관" />
          <ListRow label="오픈소스 라이선스" />
        </div>
      </div>

      {/* 회원 탈퇴 — 최하단 중앙 텍스트 */}
      <div className="px-4 pt-6 pb-4 flex justify-center">
        <button
          onClick={() => navigate("/my/withdraw")}
          className="text-xs text-[#9CA3AF] underline underline-offset-2"
        >
          회원 탈퇴
        </button>
      </div>

      {isVersionModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-7"
          onClick={() => setIsVersionModalOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="version-update-title"
            className="w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="px-6 pb-5 pt-6 text-center">
              <p
                id="version-update-title"
                className="text-[17px] font-bold text-[#111827]"
              >
                앱 업데이트
              </p>
              <p className="mt-3 text-[13px] leading-relaxed text-[#64748B]">
                더 편리해진 라이온즈 앱을 위해
                <br />
                최신 버전으로 업데이트해 주세요.
              </p>
            </div>
            <div className="border-t border-[#DDE1EC]">
              <button
                type="button"
                onClick={() => setIsVersionModalOpen(false)}
                className="h-12 w-full text-[14px] font-bold text-[#1B5BF0]"
              >
                업데이트
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
