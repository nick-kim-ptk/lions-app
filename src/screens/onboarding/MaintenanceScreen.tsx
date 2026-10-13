import { Page } from "@/components/Layout"

import { MAINTENANCE } from "@/data/maintenance"

// 108-SL-CM-13 서비스 점검 (전체 화면 · 점검 중에는 다른 화면으로 이동할 수 없음)

export function MaintenanceScreen() {
  return (
    <Page className="items-center justify-center">
      <div className="flex w-full flex-col items-center gap-6 px-8 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[#1B5BF0]/40 bg-[#1B5BF0]/20">
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
            <path
              d="M14.7 6.3a4 4 0 0 0-5.4 5.1L3.5 17.2a1.6 1.6 0 0 0 2.3 2.3l5.8-5.8a4 4 0 0 0 5.1-5.4l-2.6 2.6-2.1-.5-.5-2.1 2.6-2.6z"
              stroke="#1B5BF0"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-bold text-[#111827]">서비스 점검 안내</h2>
          <p className="whitespace-pre-line text-sm leading-relaxed text-[#64748B]">
            {MAINTENANCE.message}
          </p>
        </div>

        <div className="w-full rounded-2xl border border-[#DDE1EC] bg-[#FFFFFF] p-5">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#9CA3AF]">점검 시작</span>
              <span className="text-xs font-medium text-[#111827]">
                {MAINTENANCE.start}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-[#9CA3AF]">점검 종료</span>
              <span className="text-xs font-medium text-[#111827]">
                {MAINTENANCE.end}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Page>
  )
}
