import { useNavigate } from "react-router-dom"

import { useState } from "react"

import { Page } from "@/components/Layout"

// 098-SL-CM-12 비밀번호 재설정

export function SetNewPasswordScreen() {
  const navigate = useNavigate()

  const [newPw, setNewPw] = useState("")

  const [confirmPw, setConfirmPw] = useState("")

  const [showNew, setShowNew] = useState(false)

  const [showConfirm, setShowConfirm] = useState(false)

  const mismatch = confirmPw.length > 0 && newPw !== confirmPw

  const canSubmit = newPw.length >= 8 && confirmPw.length >= 8 && !mismatch

  return (
    <Page>
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-[#DDE1EC]">
        <button onClick={() => navigate(-1)} className="p-1">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 18l-6-6 6-6"
              stroke="#111827"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <span className="text-[#111827] font-bold text-base">
          비밀번호 재설정
        </span>
      </div>

      <div className="flex flex-col flex-1 px-4 pt-6 gap-5">
        {/* 새 비밀번호 */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-[#64748B]">
            새 비밀번호
          </label>
          <div
            className={`h-14 bg-white border rounded-2xl px-4 flex items-center gap-3 transition-colors ${
              newPw.length > 0 ? "border-[#1B5BF0]" : "border-[#DDE1EC]"
            }`}
          >
            <input
              type={showNew ? "text" : "password"}
              value={newPw}
              onChange={(e) => setNewPw(e.target.value)}
              placeholder="새 비밀번호 입력"
              className="flex-1 bg-transparent text-sm text-[#111827] placeholder-[#9CA3AF] outline-none"
            />
            <button
              onClick={() => setShowNew(!showNew)}
              className="text-[#9CA3AF]"
            >
              {showNew ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19M1 1l22 22"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="3"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              )}
            </button>
          </div>
          <span className="text-[10px] text-[#9CA3AF]">
            영문·숫자·특수문자 조합 8자 이상
          </span>
        </div>

        {/* 새 비밀번호 확인 */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-[#64748B]">
            새 비밀번호 확인
          </label>
          <div
            className={`h-14 bg-white border rounded-2xl px-4 flex items-center gap-3 transition-colors ${
              mismatch
                ? "border-[#E53935]"
                : confirmPw.length > 0
                  ? "border-[#1B5BF0]"
                  : "border-[#DDE1EC]"
            }`}
          >
            <input
              type={showConfirm ? "text" : "password"}
              value={confirmPw}
              onChange={(e) => setConfirmPw(e.target.value)}
              placeholder="새 비밀번호 다시 입력"
              className="flex-1 bg-transparent text-sm text-[#111827] placeholder-[#9CA3AF] outline-none"
            />
            <button
              onClick={() => setShowConfirm(!showConfirm)}
              className="text-[#9CA3AF]"
            >
              {showConfirm ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19M1 1l22 22"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="3"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              )}
            </button>
          </div>
          {mismatch && (
            <span className="text-[10px] text-[#E53935]">
              비밀번호가 일치하지 않습니다
            </span>
          )}
        </div>
      </div>

      {/* CTA */}
      <div className="px-4 pb-8 pt-4">
        <button
          disabled={!canSubmit}
          className={`w-full h-14 rounded-2xl font-bold text-sm transition-colors ${
            canSubmit
              ? "bg-[#1B5BF0] text-white"
              : "bg-[#DDE1EC] text-[#9CA3AF]"
          }`}
          onClick={() => navigate("/find-complete")}
        >
          비밀번호 재설정
        </button>
      </div>
    </Page>
  )
}
