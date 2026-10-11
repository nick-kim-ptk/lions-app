import { useEffect, useLayoutEffect, useRef, useState } from "react"

import { nextCaseId, removeCase, upsertCase } from "@/lib/caseRegistry"

type Option<T extends string> = T | { value: T; label: string }

/**
 * 케이스(상태) 전환용 드롭다운 — 와이어프레임 전용.
 * 빨간 점선 테두리 = 베리에이션 케이스를 바꾸는 컨트롤이라는 표시입니다. (실제 앱 UI 아님)
 */

export function CaseSelect<T extends string>({
  value,

  options,

  onChange,

  variant = "light",

  dropUp = false,

  className = "",

  disabled = false,

  group,
}: {
  value: T

  options: readonly Option<T>[]

  onChange: (v: T) => void

  variant?: "light" | "dark"

  dropUp?: boolean

  className?: string

  disabled?: boolean

  /** 케이스 그룹명(한글) — window.__wfCase.list() 에 이 이름으로 나온다. 생략하면 '케이스 N' */
  group?: string
}) {
  const [open, setOpen] = useState(false)

  const idRef = useRef(0)

  if (!idRef.current) idRef.current = nextCaseId()

  const ref = useRef<HTMLDivElement>(null)

  const items = options.map((o) =>
    typeof o === "string" ? { value: o as T, label: o as string } : o,
  )

  const current = items.find((o) => o.value === value) ?? items[0]

  // 코드로 케이스를 바꾸는 창구(window.__wfCase)에 현재 상태를 알린다
  useLayoutEffect(() => {
    upsertCase(idRef.current, {
      group,
      options: items.map((o) => ({ value: o.value, label: o.label })),
      value: current.value,
      disabled,
      onChange: (v) => onChange(v as T),
    })
  })

  useEffect(() => {
    const id = idRef.current

    return () => removeCase(id)
  }, [])

  useEffect(() => {
    if (!open) return

    const close = (e: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }

    document.addEventListener("mousedown", close)

    document.addEventListener("touchstart", close)

    return () => {
      document.removeEventListener("mousedown", close)

      document.removeEventListener("touchstart", close)
    }
  }, [open])

  const tone =
    variant === "dark"
      ? "bg-white/10 text-white"
      : "bg-[#E8EBF4] text-[#0E1A40]"

  return (
    <div
      ref={ref}
      data-wf-case=""
      className={`relative inline-block ${className}`}
    >
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-1 rounded-full border border-dashed border-red-400 px-2.5 py-1 text-[11px] font-semibold whitespace-nowrap ${tone} ${
          disabled ? "opacity-40" : ""
        }`}
      >
        <span>{current.label}</span>
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {open && (
        <ul
          className={`absolute right-0 z-[60] min-w-full overflow-hidden rounded-xl border border-[#DDE1EC] bg-white py-1 shadow-lg ${
            dropUp ? "bottom-full mb-1" : "top-full mt-1"
          }`}
        >
          {items.map((o) => (
            <li key={o.value}>
              <button
                type="button"
                onClick={() => {
                  onChange(o.value)

                  setOpen(false)
                }}
                className={`flex w-full items-center justify-between gap-3 whitespace-nowrap px-3 py-2 text-left text-[12px] ${
                  o.value === value
                    ? "bg-[#EBF0FF] font-bold text-[#1B5BF0]"
                    : "text-[#374151]"
                }`}
              >
                {o.label}
                {o.value === value && (
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#1B5BF0"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
