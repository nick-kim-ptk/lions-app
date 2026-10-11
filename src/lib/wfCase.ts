import { MATCH_STATES } from "@/data/home"

import {
  SEASON_PHASES,
  getCaseState,
  isNoGamePhase,
  setMatchState,
  setSeasonPhase,
  type MatchState,
  type SeasonPhase,
} from "@/data/caseStore"

import { listRegistered } from "@/lib/caseRegistry"

/**
 * window.__wfCase — 케이스(상태)를 코드로 조회·변경하는 창구 (와이어프레임·화면 캡처 전용)
 *
 *   __wfCase.list()
 *     → [{ group:"경기 상태", options:["경기 전","경기 중",…], current:"경기 전" }, …]
 *     시즌 단계·경기 상태(전역 케이스)는 어느 화면에서나 나오고,
 *     그 화면에 떠 있는 빨간 점선 드롭다운(CaseSelect)은 자기 그룹명으로 함께 나온다.
 *     바꿀 수 없는 상태면 disabled:true.
 *
 *   await __wfCase.set("경기 상태", "우천 취소")
 *     → { ok:true } 또는 { ok:false, reason:"…" } (예외는 던지지 않는다)
 *     화면이 다시 그려질 때까지 기다렸다가 돌아온다.
 *
 * 옵션 이름은 화면에 보이는 한글 그대로입니다.
 */

export interface WfCaseGroup {
  group: string
  options: string[]
  current: string
  disabled?: boolean
}

export interface WfCaseResult {
  ok: boolean
  reason?: string
}

export interface WfCaseApi {
  list: () => WfCaseGroup[]
  set: (group: string, option: string) => Promise<WfCaseResult>
}

declare global {
  interface Window {
    __wfCase: WfCaseApi
  }
}

interface Item extends WfCaseGroup {
  /** 옵션 이름(라벨) → 실제 값 */
  values: Record<string, string>
  apply: (value: string) => void
}

const GLOBAL_GROUPS = ["시즌 단계", "경기 상태"]

function collect(): Item[] {
  const { phase, match } = getCaseState()

  const items: Item[] = [
    {
      group: "시즌 단계",
      options: [...SEASON_PHASES],
      current: phase,
      values: Object.fromEntries(SEASON_PHASES.map((p) => [p, p])),
      apply: (v) => setSeasonPhase(v as SeasonPhase),
    },

    {
      group: "경기 상태",
      options: [...MATCH_STATES],
      current: match,
      values: Object.fromEntries(MATCH_STATES.map((m) => [m, m])),
      apply: (v) => setMatchState(v as MatchState),
      ...(isNoGamePhase(phase) ? { disabled: true } : {}),
    },
  ]

  let n = 0

  for (const e of listRegistered()) {
    // 전역 케이스는 위에서 이미 넣었다 (홈의 케이스 바가 같은 이름으로 등록됨)
    if (e.group && GLOBAL_GROUPS.includes(e.group)) continue

    const group = e.group ?? `케이스 ${++n}`

    items.push({
      group,
      options: e.options.map((o) => o.label),
      current: e.options.find((o) => o.value === e.value)?.label ?? e.value,
      values: Object.fromEntries(e.options.map((o) => [o.label, o.value])),
      apply: e.onChange,
      ...(e.disabled ? { disabled: true } : {}),
    })
  }

  return items
}

// React 가 다시 그릴 시간 — 메시지 채널은 Playwright 의 가짜 시계(setTimeout·rAF)에 영향받지 않는다
const tick = () =>
  new Promise<void>((resolve) => {
    const ch = new MessageChannel()

    ch.port1.onmessage = () => {
      ch.port1.close()

      resolve()
    }

    ch.port2.postMessage(0)
  })

const api: WfCaseApi = {
  list: () =>
    collect().map(({ group, options, current, disabled }) => ({
      group,
      options,
      current,
      ...(disabled ? { disabled } : {}),
    })),

  async set(group, option) {
    const item = collect().find((i) => i.group === group)

    if (!item) return { ok: false, reason: `케이스 그룹 없음: ${group}` }

    if (!(option in item.values))
      return {
        ok: false,
        reason: `옵션 없음: ${group} / ${option} (있는 옵션: ${item.options.join(", ")})`,
      }

    if (item.disabled)
      return { ok: false, reason: `지금은 바꿀 수 없음: ${group}` }

    item.apply(item.values[option])

    for (let i = 0; i < 4; i++) await tick()

    return { ok: true }
  },
}

window.__wfCase = api
