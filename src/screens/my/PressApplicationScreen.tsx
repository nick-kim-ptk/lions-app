import { useState } from "react"

import { CaseSelect } from "@/components/CaseSelect"

import { Header } from "@/components/Layout"

// 099-SL-MY-28 PRESS 신청

export function PressApplicationScreen() {
  const [pressStatus, setPressStatus] =
    useState<"신청 전" | "신청 대기 중" | "신청 후">("신청 전")

  const [form, setForm] = useState({
    registrationCode: "",

    name: "",

    mediaCompany: "",

    position: "",

    email: "",
  })

  const [emailCode, setEmailCode] = useState("")

  const [emailSent, setEmailSent] = useState(false)

  const [emailVerified, setEmailVerified] = useState(false)

  const isComplete =
    Object.values(form).every((value) => value.trim().length > 0) &&
    emailVerified

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  return (
    <div className="min-h-full bg-[#F5F7FB] pb-28">
      <Header
        title="PRESS 신청"
        rightSlot={
          <CaseSelect
            value={pressStatus}
            options={["신청 전", "신청 대기 중", "신청 후"] as const}
            onChange={setPressStatus}
          />
        }
      />

      {pressStatus === "신청 전" ? (
        <>
          <div className="flex flex-col gap-4 px-4 pt-4">
            <div className="rounded-2xl border border-[#1B5BF0]/20 bg-[#EBF0FF] p-4">
              <p className="text-[13px] font-bold text-[#1B5BF0]">
                PRESS 등록 안내
              </p>
              <p className="mt-1.5 text-[12px] leading-relaxed text-[#64748B]">
                발급받은 등록 코드와 소속 정보를 입력해 주세요. 담당자 확인 후
                PRESS 권한이 승인됩니다.
              </p>
            </div>

            <div className="rounded-2xl border border-[#DDE1EC] bg-white p-4">
              <label
                className="text-[12px] font-semibold text-[#374151]"
                htmlFor="press-registration-code"
              >
                등록 코드
              </label>
              <input
                id="press-registration-code"
                type="text"
                value={form.registrationCode}
                onChange={(event) =>
                  updateField("registrationCode", event.target.value)
                }
                placeholder="등록 코드를 입력해 주세요"
                className="mt-2 h-12 w-full rounded-xl border border-[#DDE1EC] bg-[#F9FAFB] px-4 text-[14px] text-[#111827] outline-none focus:border-[#1B5BF0]"
              />
              <p className="mt-2 text-[11px] text-[#9CA3AF]">
                구단에서 안내받은 등록 코드를 입력해주세요.
              </p>
            </div>

            <div className="rounded-2xl border border-[#DDE1EC] bg-white p-4">
              <p className="mb-4 text-[13px] font-bold text-[#111827]">
                신청자 정보
              </p>
              <div className="flex flex-col gap-4">
                {[
                  {
                    key: "name" as const,
                    label: "이름",
                    placeholder: "이름을 입력해 주세요",
                  },

                  {
                    key: "mediaCompany" as const,
                    label: "소속 언론사",
                    placeholder: "소속 언론사를 입력해 주세요",
                  },

                  {
                    key: "position" as const,
                    label: "직책",
                    placeholder: "직책을 입력해 주세요",
                  },
                ].map((field) => (
                  <div key={field.key}>
                    <label
                      className="text-[12px] font-semibold text-[#374151]"
                      htmlFor={`press-${field.key}`}
                    >
                      {field.label}
                    </label>
                    <input
                      id={`press-${field.key}`}
                      type="text"
                      value={form[field.key]}
                      onChange={(event) =>
                        updateField(field.key, event.target.value)
                      }
                      placeholder={field.placeholder}
                      className="mt-2 h-12 w-full rounded-xl border border-[#DDE1EC] bg-[#F9FAFB] px-4 text-[14px] text-[#111827] outline-none focus:border-[#1B5BF0]"
                    />
                  </div>
                ))}

                <div>
                  <label
                    className="text-[12px] font-semibold text-[#374151]"
                    htmlFor="press-email"
                  >
                    이메일 인증
                  </label>
                  <div className="mt-2 flex gap-2">
                    <input
                      id="press-email"
                      type="email"
                      value={form.email}
                      onChange={(event) => {
                        updateField("email", event.target.value)

                        setEmailSent(false)

                        setEmailVerified(false)

                        setEmailCode("")
                      }}
                      placeholder="이메일 주소를 입력해 주세요"
                      className="h-12 min-w-0 flex-1 rounded-xl border border-[#DDE1EC] bg-[#F9FAFB] px-4 text-[14px] text-[#111827] outline-none focus:border-[#1B5BF0]"
                    />
                    <button
                      type="button"
                      disabled={!form.email.trim()}
                      onClick={() => {
                        setEmailSent(true)

                        setEmailVerified(false)

                        setEmailCode("")
                      }}
                      className={`h-12 shrink-0 rounded-xl px-4 text-[12px] font-semibold ${
                        form.email.trim()
                          ? "bg-[#1B5BF0] text-white"
                          : "bg-[#DDE1EC] text-[#9CA3AF]"
                      }`}
                    >
                      인증하기
                    </button>
                  </div>

                  {emailSent && (
                    <div className="mt-3 rounded-xl border border-[#DDE1EC] bg-[#F9FAFB] p-3">
                      <p className="mb-2 text-[11px] leading-relaxed text-[#64748B]">
                        이메일로 전송된 인증 코드를 입력해 주세요.
                      </p>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          inputMode="numeric"
                          value={emailCode}
                          onChange={(event) => {
                            setEmailCode(event.target.value)

                            setEmailVerified(false)
                          }}
                          placeholder="인증 코드 입력"
                          aria-label="이메일 인증 코드"
                          className="h-11 min-w-0 flex-1 rounded-lg border border-[#DDE1EC] bg-white px-3 text-[13px] text-[#111827] outline-none focus:border-[#1B5BF0]"
                        />
                        <button
                          type="button"
                          disabled={!emailCode.trim()}
                          onClick={() => setEmailVerified(true)}
                          className={`h-11 shrink-0 rounded-lg px-3 text-[12px] font-semibold ${
                            emailCode.trim()
                              ? "border border-[#1B5BF0] bg-white text-[#1B5BF0]"
                              : "border border-[#DDE1EC] bg-[#F1F3F8] text-[#9CA3AF]"
                          }`}
                        >
                          인증 확인
                        </button>
                      </div>
                      {emailVerified && (
                        <div className="mt-2 flex items-center gap-1.5 text-[11px] font-semibold text-[#16A34A]">
                          <svg
                            width="13"
                            height="13"
                            viewBox="0 0 24 24"
                            fill="none"
                            aria-hidden="true"
                          >
                            <circle
                              cx="12"
                              cy="12"
                              r="9"
                              stroke="currentColor"
                              strokeWidth="2"
                            />
                            <path
                              d="M8 12l2.5 2.5L16 9"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          이메일 인증이 완료되었습니다.
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="fixed inset-x-0 bottom-0 z-20 border-t border-[#DDE1EC] bg-white px-4 pb-8 pt-3">
            <button
              type="button"
              disabled={!isComplete}
              onClick={() => setPressStatus("신청 대기 중")}
              className={`h-14 w-full rounded-2xl text-[15px] font-bold ${
                isComplete
                  ? "bg-[#1B5BF0] text-white"
                  : "bg-[#DDE1EC] text-[#9CA3AF]"
              }`}
            >
              승인 요청
            </button>
          </div>
        </>
      ) : (
        <div className="px-4 pt-6">
          <div className="flex flex-col items-center rounded-3xl border border-[#DDE1EC] bg-white px-6 py-12 text-center">
            <div
              className={`flex h-14 w-14 items-center justify-center rounded-full ${
                pressStatus === "신청 대기 중"
                  ? "bg-[#FFF8E1] text-[#F59E0B]"
                  : "bg-[#F0FDF4] text-[#16A34A]"
              }`}
            >
              {pressStatus === "신청 대기 중" ? (
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M12 7v5l3 2"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M8 12l2.5 2.5L16 9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
            <p className="mt-5 text-[18px] font-bold text-[#111827]">
              {pressStatus === "신청 대기 중"
                ? "현재 신청 대기 중입니다."
                : "신청 된 상태입니다."}
            </p>
            <p className="mt-2 text-[12px] leading-relaxed text-[#64748B]">
              {pressStatus === "신청 대기 중" ? (
                "담당자가 신청 정보를 확인하고 있습니다. 승인 결과는 알림으로 안내해 드립니다."
              ) : (
                <>
                  PRESS 신청이 승인되었습니다. 승인된 계정으로 PRESS 서비스를
                  이용할 수 있습니다.
                  <br />
                  전체 메뉴 - 신청/안내에 개설된 PRESS 센터와 이슈와 팩트 메뉴를
                  확인해주세요.
                </>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
