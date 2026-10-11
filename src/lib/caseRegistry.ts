/**
 * 화면에 떠 있는 케이스 드롭다운(CaseSelect) 목록 — window.__wfCase 가 읽는다. (와이어프레임·캡처 전용)
 * CaseSelect 가 렌더될 때마다 자기 상태를 여기에 갱신하고, 사라지면 지운다.
 */

export interface CaseEntry {
  /** 화면에 보이는 한글 그룹명 (CaseSelect 의 group). 없으면 '케이스 N' 으로 자동 부여 */
  group?: string
  options: { value: string; label: string }[]
  value: string
  disabled: boolean
  onChange: (v: string) => void
}

const entries = new Map<number, CaseEntry>()

let seq = 0

export const nextCaseId = () => ++seq

export const upsertCase = (id: number, e: CaseEntry) => {
  entries.set(id, e)
}

export const removeCase = (id: number) => {
  entries.delete(id)
}

/** 등록 순서대로 */
export const listRegistered = (): CaseEntry[] =>
  [...entries.entries()].sort((a, b) => a[0] - b[0]).map(([, e]) => e)
