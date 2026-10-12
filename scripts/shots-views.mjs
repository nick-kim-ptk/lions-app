/**
 * CI용 탭 화면 캡처 (Playwright) — 배포물의 `/shots/views/` 와 `/shots/views.json` 으로 올라갑니다.
 *
 * 사용: node shots-views.mjs --dist ../dist --out ../dist/shots [--only 011,065] [--config ./view-tabs.json] [--prev <이전 views.json 주소>]
 *
 * 무엇을 찍나
 *   scripts/view-tabs.json 의 화면마다, 콘텐츠 탭 버튼을 차례로 눌러 그 탭이 선택된 화면을 풀 페이지로 찍는다.
 *   첫 탭(처음 열렸을 때 선택된 탭)은 index.json 의 기본 화면 캡처를 그대로 쓰므로 `default: true` 만 적는다.
 *   하단 메뉴(nav)의 버튼은 대상이 아니다. 캡처 조건(폭·배율·폰트·시계 고정)은 shots.mjs 와 같다.
 *
 * 결과
 *   views/{화면ID}__{탭 순번(0부터)}.png
 *   views.json  [{ id, tab, index, default? | file, sha, capturedAt }]
 *   다시 찍은 PNG 의 sha 가 이전 배포(views.json)와 같으면 capturedAt 도 이전 값을 유지한다.
 *
 * 실패 처리: 탭 버튼을 못 찾거나 화면이 안 열리면 그 탭만 건너뛰고 로그에 남긴다. 전체는 멈추지 않고 종료 코드 0.
 */

import { chromium } from "playwright"

import crypto from "node:crypto"

import fs from "node:fs"

import path from "node:path"

import { fileURLToPath } from "node:url"

import { serve, snap, freeze, opt, DIST, OUT, WIDTH, HEIGHT, SCALE } from "./shots.mjs"

const here = path.dirname(fileURLToPath(import.meta.url))

const CONFIG = path.resolve(here, opt("config", "./view-tabs.json"))

const ONLY = opt("only", "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean)

const VIEWS_DIR = path.join(OUT, "views")

const shortErr = (e) => String(e?.message ?? e).split("\n")[0]

// 이전 배포의 views.json (capturedAt 유지용, 없으면 무시)
async function loadPrev() {
  const repo = process.env.GITHUB_REPOSITORY // 예: nick-kim-ptk/lions-app

  const url =
    opt("prev", "") ||
    (repo
      ? `https://${repo.split("/")[0]}.github.io/${repo.split("/")[1]}/shots/views.json`
      : "")

  if (!url) return new Map()

  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(10000) })

    if (!res.ok) throw new Error(`HTTP ${res.status}`)

    const rows = await res.json()

    return new Map(rows.filter((r) => r.file).map((r) => [r.file, r]))
  } catch (e) {
    console.log(`이전 views.json 을 읽지 못함 (${shortErr(e)}) — capturedAt 은 새로 기록`)

    return new Map()
  }
}

async function main() {
  let config

  try {
    config = JSON.parse(fs.readFileSync(CONFIG, "utf8"))
  } catch (e) {
    console.log(`view-tabs.json 을 읽지 못했습니다 (${CONFIG}): ${shortErr(e)}`)

    process.exit(1)
  }

  const entries = config.filter(
    (c) => !ONLY.length || ONLY.some((k) => `${c.id} ${c.path}`.includes(k)),
  )

  fs.mkdirSync(VIEWS_DIR, { recursive: true })

  const prev = await loadPrev()

  const server = await serve(DIST)

  const base = `http://127.0.0.1:${server.address().port}/`

  const browser = await chromium.launch()

  const rows = []

  let skipped = 0

  for (const entry of entries) {
    const tabs = entry.tabs ?? []

    for (let i = 0; i < tabs.length; i++) {
      const tab = String(tabs[i]).trim()

      if (i === 0) {
        rows.push({ id: entry.id, tab, index: 0, default: true })

        continue
      }

      const name = `${entry.id}__${i}.png`

      const context = await browser.newContext({
        viewport: { width: WIDTH, height: HEIGHT },
        deviceScaleFactor: SCALE,
        locale: "ko-KR",
      })

      try {
        await freeze(context)

        const page = await context.newPage()

        await page.goto(`${base}#${entry.path}`, { waitUntil: "networkidle" })

        await page.evaluate(() => document.fonts.ready)

        // 하단 메뉴(nav) 밖의 버튼만 대상
        const btn = page
          .getByRole("button", { name: tab, exact: true })
          .and(page.locator(":not(nav button)"))

        const n = await btn.count()

        if (n === 0) throw new Error(`탭 버튼 없음: ${tab}`)

        if (n > 1) console.log(`  ! ${entry.id} "${tab}" 버튼이 ${n}개 — 첫 번째를 누름`)

        await btn.first().click()

        await snap(page, path.join(VIEWS_DIR, name))

        rows.push({ id: entry.id, tab, index: i, file: `views/${name}` })

        console.log(`✓ ${entry.id} [${i}] ${tab}`)
      } catch (e) {
        skipped++

        console.log(`↷ 건너뜀: ${entry.id} [${i}] ${tab} — ${shortErr(e)}`)
      } finally {
        await context.close()
      }
    }
  }

  await browser.close()

  server.close()

  rows.sort((a, b) => a.id.localeCompare(b.id) || a.index - b.index)

  const now = new Date().toISOString()

  for (const r of rows) {
    if (r.default) continue

    r.sha = crypto
      .createHash("sha256")
      .update(fs.readFileSync(path.join(OUT, r.file)))
      .digest("hex")

    const old = prev.get(r.file)

    r.capturedAt = old && old.sha === r.sha && old.capturedAt ? old.capturedAt : now
  }

  fs.writeFileSync(path.join(OUT, "views.json"), JSON.stringify(rows, null, 2) + "\n")

  console.log(`\n탭 캡처 ${rows.filter((r) => !r.default).length}장 / 기본 ${rows.filter((r) => r.default).length} / 건너뜀 ${skipped}`)
}

main().catch((e) => {
  // 어떤 이유로든 전체 배포를 막지 않는다
  console.log(`탭 캡처 중단: ${shortErr(e)}`)
})
