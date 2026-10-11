/**
 * CI용 구역·케이스 단위 캡처 (Playwright) — 배포물의 `/shots/cases/` 와 `/shots/cases.json` 으로 올라갑니다.
 *
 * 사용: node shots-cases.mjs --dist ../dist --out ../dist/shots [--only today-game,emblem] [--config ../capture-cases.json]
 *
 * 무엇을 찍나
 *   저장소 루트의 capture-cases.json 에 적힌 "구역"마다, 케이스 그룹을 한 번에 하나씩 바꿔 가며
 *   그 구역(요소 [data-cap="키"])만 찍는다. 나머지 그룹은 base 값으로 고정.
 *   케이스는 앱의 window.__wfCase (src/lib/wfCase.ts) 로 바꾼다.
 *
 * 결과
 *   cases/{화면ID}__{cap}__{그룹순번}-{옵션순번}.png   (한글 없음, 폭 390 · 2배 해상도)
 *   cases.json   [{ id, area, cap, group, case, file, capturedAt, sha }]
 *     area·group·case 는 화면에 보이는 한글 그대로. 그룹순번 = capture-cases.json 의 groups 순서,
 *     옵션순번 = 그 그룹 드롭다운의 옵션 순서(1부터).
 *
 * 실패 처리: 구역이 없거나 바꿀 수 없는 조합은 건너뛰고 로그에만 남긴다. 전체는 멈추지 않고 종료 코드 0.
 * 구역 밖 요소(이웃·고정 헤더·탭바)는 감추고, 빨간 점선 케이스 드롭다운도 기본으로 가려서 찍는다 (--keep-case-ui 로 남김).
 */

import { chromium } from "playwright"

import crypto from "node:crypto"

import fs from "node:fs"

import path from "node:path"

import { fileURLToPath } from "node:url"

import {
  serve,
  freeze,
  opt,
  DIST,
  OUT,
  WIDTH,
  HEIGHT,
  SCALE,
  WAIT,
  MAX_H,
} from "./shots.mjs"

const here = path.dirname(fileURLToPath(import.meta.url))

const CONFIG = path.resolve(here, opt("config", "../capture-cases.json"))

const ONLY = opt("only", "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean)

const KEEP_CASE_UI = process.argv.includes("--keep-case-ui")

const CASES_DIR = path.join(OUT, "cases")

// 전역 케이스는 시즌 단계 → 경기 상태 순으로 적용해야 한다 (시즌 종료에서는 경기 상태를 못 바꿈)
const GLOBAL_ORDER = ["시즌 단계", "경기 상태"]

const ordered = (base) =>
  Object.entries(base ?? {}).sort(([a], [b]) => {
    const ia = GLOBAL_ORDER.indexOf(a)

    const ib = GLOBAL_ORDER.indexOf(b)

    return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib)
  })

const real = (ms) => new Promise((r) => setTimeout(r, ms))

const shortErr = (e) => String(e?.message ?? e).split("\n")[0]

/** 새 컨텍스트로 화면을 열고 base 케이스까지 적용한 상태의 page 를 돌려준다 */
async function openScene(browser, baseUrl, entry) {
  const context = await browser.newContext({
    viewport: { width: WIDTH, height: HEIGHT },
    deviceScaleFactor: SCALE,
    locale: "ko-KR",
  })

  try {
    await freeze(context)

    const page = await context.newPage()

    await page.goto(`${baseUrl}#${entry.route}`, { waitUntil: "networkidle" })

    await page.evaluate(() => document.fonts.ready)

    // 홈 첫 진입 공지 팝업은 닫고 찍는다 (shots.mjs 와 동일)
    if (entry.route === "/home") {
      const ok = page.getByRole("button", { name: "확인", exact: true })

      if (await ok.first().isVisible().catch(() => false))
        await ok.first().click()
    }

    const has = await page.evaluate(() => typeof window.__wfCase === "object")

    if (!has) throw new Error("window.__wfCase 없음 (앱이 케이스 창구를 열지 않음)")

    for (const [g, o] of ordered(entry.base)) {
      const r = await page.evaluate(([g, o]) => window.__wfCase.set(g, o), [g, o])

      if (!r.ok) throw new Error(`base 적용 실패 — ${r.reason}`)
    }

    return { context, page }
  } catch (e) {
    await context.close()

    throw e
  }
}

/** 그 구역이 통째로 보이도록 뷰포트 높이를 늘린 뒤 구역만 찍는다 */
async function shootArea(page, entry, file) {
  const area = page.locator(`[data-cap="${entry.cap}"]`)

  const n = await area.count()

  if (n === 0) throw new Error("구역 없음")

  if (n > 1) console.log(`  ! [data-cap="${entry.cap}"] 가 ${n}개 — 첫 번째만 찍음`)

  // 폰트·애니메이션 대기 (끝없이 도는 애니메이션은 기다리지 않고 screenshot 이 처음 상태로 고정한다)
  await page.evaluate(() => document.fonts.ready)

  await Promise.race([
    page.evaluate(async () => {
      const finite = document
        .getAnimations()
        .filter((a) => a.effect?.getComputedTiming().iterations !== Infinity)

      await Promise.all(finite.map((a) => a.finished.catch(() => {})))
    }),

    real(4000),
  ])

  await real(WAIT)

  if (!KEEP_CASE_UI)
    await page.addStyleTag({
      content: "[data-wf-case]{visibility:hidden !important}",
    })

  // 구역 밖(위·아래 이웃 요소, 고정 헤더·탭바)은 감춘다 — 구역 가장자리에 이웃이 1px 걸리거나 가려지는 것을 막는다 (자리는 그대로)
  await page.evaluate((sel) => {
    let node = document.querySelector(sel)

    while (node && node !== document.body && node.parentElement) {
      for (const sib of node.parentElement.children)
        if (sib !== node) sib.style.setProperty("visibility", "hidden", "important")

      node = node.parentElement
    }
  }, `[data-cap="${entry.cap}"]`)

  // 안쪽 스크롤 영역까지 펼쳐서 구역이 잘리지 않게 (shots.mjs 의 snap 과 같은 방식)
  const h = await page.evaluate((vh) => {
    let max = document.documentElement.scrollHeight

    for (const el of document.querySelectorAll("*")) {
      const cs = getComputedStyle(el)

      if (
        (cs.overflowY === "auto" || cs.overflowY === "scroll") &&
        el.scrollHeight > el.clientHeight + 4
      )
        max = Math.max(max, el.scrollHeight + (vh - el.clientHeight))
    }

    return max
  }, HEIGHT)

  const target = Math.min(Math.max(h, HEIGHT), MAX_H)

  if (target !== HEIGHT) {
    await page.setViewportSize({ width: WIDTH, height: target })

    await real(300)
  }

  // 구역 경계를 장치 픽셀 안쪽으로 맞춰 자른다 — 소수점 좌표 때문에 이웃 요소가 1px 걸려 나오는 것을 막는다
  await area.first().scrollIntoViewIfNeeded()

  const box = await area.first().boundingBox()

  const vh = page.viewportSize().height

  if (box && box.y >= 0 && box.y + box.height <= vh) {
    const x0 = Math.ceil(box.x * SCALE) / SCALE

    const y0 = Math.ceil(box.y * SCALE) / SCALE

    const x1 = Math.floor((box.x + box.width) * SCALE) / SCALE

    const y1 = Math.floor((box.y + box.height) * SCALE) / SCALE

    await page.screenshot({
      path: file,
      clip: { x: x0, y: y0, width: x1 - x0, height: y1 - y0 },
      animations: "disabled",
      caret: "hide",
    })
  } else {
    // 뷰포트 밖으로 나가는 아주 긴 구역은 요소 캡처로
    await area.first().screenshot({ path: file, animations: "disabled", caret: "hide" })
  }
}

async function main() {
  let config

  try {
    config = JSON.parse(fs.readFileSync(CONFIG, "utf8"))
  } catch (e) {
    console.log(`capture-cases.json 을 읽지 못했습니다 (${CONFIG}): ${shortErr(e)}`)

    process.exit(1)
  }

  if (!Array.isArray(config)) {
    console.log("capture-cases.json 은 배열이어야 합니다")

    process.exit(1)
  }

  const entries = config.filter(
    (c) =>
      !ONLY.length ||
      ONLY.some((k) => `${c.screen} ${c.cap} ${c.area}`.includes(k)),
  )

  fs.mkdirSync(CASES_DIR, { recursive: true })

  const server = await serve(DIST)

  const baseUrl = `http://127.0.0.1:${server.address().port}/`

  const browser = await chromium.launch()

  const rows = []

  const skipped = []

  const skip = (msg) => {
    skipped.push(msg)

    console.log(`↷ 건너뜀: ${msg}`)
  }

  for (const entry of entries) {
    const tag = `${entry.screen} ${entry.area}(${entry.cap})`

    const groups = entry.groups ?? []

    for (let gi = 0; gi < groups.length; gi++) {
      const gname = groups[gi]

      // 이 그룹의 옵션 목록 — 실제 화면의 드롭다운에서 읽는다
      let options

      try {
        const { context, page } = await openScene(browser, baseUrl, entry)

        try {
          const found = (await page.evaluate(() => window.__wfCase.list())).find(
            (x) => x.group === gname,
          )

          options = found?.options
        } finally {
          await context.close()
        }
      } catch (e) {
        skip(`${tag} · ${gname} 전체 — ${shortErr(e)}`)

        continue
      }

      if (!options) {
        skip(`${tag} · 그룹 없음: ${gname}`)

        continue
      }

      for (let oi = 0; oi < options.length; oi++) {
        const opt = options[oi]

        const name = `${entry.screen}__${entry.cap}__${gi + 1}-${oi + 1}.png`

        let scene

        try {
          scene = await openScene(browser, baseUrl, entry)

          const r = await scene.page.evaluate(
            ([g, o]) => window.__wfCase.set(g, o),
            [gname, opt],
          )

          if (!r.ok) throw new Error(r.reason)

          await shootArea(scene.page, entry, path.join(CASES_DIR, name))

          rows.push({
            id: entry.screen,
            area: entry.area,
            cap: entry.cap,
            group: gname,
            case: opt,
            file: `cases/${name}`,
            capturedAt: new Date().toISOString(),
          })

          console.log(`✓ ${tag} · ${gname} = ${opt}  → ${name}`)
        } catch (e) {
          skip(`${tag} · ${gname} = ${opt} — ${shortErr(e)}`)
        } finally {
          if (scene) await scene.context.close()
        }
      }
    }
  }

  await browser.close()

  server.close()

  rows.sort((a, b) => a.file.localeCompare(b.file))

  for (const r of rows)
    r.sha = crypto
      .createHash("sha256")
      .update(fs.readFileSync(path.join(OUT, r.file)))
      .digest("hex")

  fs.writeFileSync(
    path.join(OUT, "cases.json"),
    JSON.stringify(rows, null, 2) + "\n",
  )

  console.log(`\n구역 캡처 ${rows.length}장 / 건너뜀 ${skipped.length}`)
}

main().catch((e) => {
  // 어떤 이유로든 전체 배포를 막지 않는다
  console.log(`구역 캡처 중단: ${shortErr(e)}`)
})
