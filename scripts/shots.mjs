/**
 * CI용 전체 화면 캡처 (Playwright) — GitHub Pages 배포물에 `/shots/` 로 함께 올라갑니다.
 *
 * 사용: node shots.mjs --dist ../dist --out ../dist/shots [--only 004,054] [--width 390]
 *
 * 결과
 *   {화면ID}.png    폭 390 풀페이지 (안쪽 스크롤 영역까지 펼쳐서 한 장)
 *   index.json      [{ id, file, capturedAt }]  (화면 ID 순)
 *
 * 화면 목록은 src/data/overview.ts 의 SCREENS 입니다. 같은 경로를 쓰는 팝업(variant) 화면은
 * 별도 라우트가 없어 제외합니다. 일부 화면이 실패해도 나머지는 계속 캡처하고 종료 코드는 0 입니다.
 */

import { chromium } from "playwright"

import fs from "node:fs"

import http from "node:http"

import path from "node:path"

import { fileURLToPath, pathToFileURL } from "node:url"

const here = path.dirname(fileURLToPath(import.meta.url))

const argv = process.argv.slice(2)

const opt = (name, def) => {
  const i = argv.indexOf(`--${name}`)

  return i >= 0 ? argv[i + 1] : def
}

const DIST = path.resolve(here, opt("dist", "../dist"))

const OUT = path.resolve(here, opt("out", "../dist/shots"))

const ONLY = opt("only", "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean)

const WIDTH = Number(opt("width", 390))

const HEIGHT = Number(opt("height", 844))

const WAIT = Number(opt("wait", 600))

const MAX_H = 16000 // Chromium 캡처 높이 한계(16384) 아래

// ── 정적 서버 (dist 를 루트로 서빙) ──

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".ico": "image/x-icon",
}

function serve(dir) {
  const server = http.createServer((req, res) => {
    const url = decodeURIComponent((req.url ?? "/").split("?")[0])

    let file = path.join(dir, url)

    if (!file.startsWith(dir)) file = path.join(dir, "index.html")

    if (fs.existsSync(file) && fs.statSync(file).isDirectory())
      file = path.join(file, "index.html")

    if (!fs.existsSync(file)) file = path.join(dir, "index.html")

    res.setHeader(
      "Content-Type",
      MIME[path.extname(file).toLowerCase()] ?? "application/octet-stream",
    )

    fs.createReadStream(file).pipe(res)
  })

  return new Promise((resolve) =>
    server.listen(0, "127.0.0.1", () => resolve(server)),
  )
}

// ── 화면 목록 ──

async function loadScreens() {
  const mod = await import(
    pathToFileURL(path.resolve(here, "../src/data/overview.ts")).href
  )

  const all = mod.SCREENS

  const basePaths = new Set(all.filter((s) => !s.variant).map((s) => s.path))

  const seen = new Set()

  const list = []

  const skipped = []

  for (const s of all) {
    if (seen.has(s.id)) continue

    seen.add(s.id)

    // 팝업(variant)은 같은 경로의 기본 화면과 구분되는 라우트(쿼리)가 있을 때만 캡처
    if (s.variant && basePaths.has(s.path)) {
      skipped.push(`${s.id} ${s.name} (별도 경로 없음)`)

      continue
    }

    list.push({ id: s.id, name: s.name, path: s.path })
  }

  return { list, skipped }
}

// 스크롤 영역 전체가 보이도록 뷰포트 높이를 늘려 캡처

async function snap(page, file) {
  await page.waitForTimeout(WAIT)

  const h = await page.evaluate((vh) => {
    let max = document.documentElement.scrollHeight

    for (const el of document.querySelectorAll("*")) {
      const cs = getComputedStyle(el)

      if (
        (cs.overflowY === "auto" || cs.overflowY === "scroll") &&
        el.scrollHeight > el.clientHeight + 4
      ) {
        max = Math.max(max, el.scrollHeight + (vh - el.clientHeight))
      }
    }

    return max
  }, HEIGHT)

  const target = Math.min(Math.max(h, HEIGHT), MAX_H)

  if (target !== HEIGHT) {
    await page.setViewportSize({ width: WIDTH, height: target })

    await page.waitForTimeout(300)
  }

  await page.screenshot({ path: file })

  if (target !== HEIGHT)
    await page.setViewportSize({ width: WIDTH, height: HEIGHT })
}

async function main() {
  let { list, skipped } = await loadScreens()

  if (ONLY.length)
    list = list.filter((s) =>
      ONLY.some((k) => `${s.id} ${s.name} ${s.path}`.includes(k)),
    )

  fs.mkdirSync(OUT, { recursive: true })

  const server = await serve(DIST)

  const base = `http://127.0.0.1:${server.address().port}/`

  const browser = await chromium.launch()

  const index = []

  const failed = []

  for (const s of list) {
    const context = await browser.newContext({
      viewport: { width: WIDTH, height: HEIGHT },
      deviceScaleFactor: 1,
      locale: "ko-KR",
    })

    const page = await context.newPage()

    try {
      await page.goto(`${base}#${s.path}`, { waitUntil: "networkidle" })

      // 홈 첫 진입 공지 팝업은 닫고 찍는다 (003 팝업 화면은 그대로)
      if (s.path === "/home") {
        const ok = page.getByRole("button", { name: "확인", exact: true })

        if (await ok.first().isVisible().catch(() => false))
          await ok.first().click()
      }

      const file = `${s.id}.png`

      await snap(page, path.join(OUT, file))

      index.push({ id: s.id, file, capturedAt: new Date().toISOString() })

      console.log(`✓ ${s.id} ${s.name}`)
    } catch (e) {
      failed.push(`${s.id} ${s.name}: ${e.message.split("\n")[0]}`)

      console.log(`✗ ${s.id} ${s.name} — ${e.message.split("\n")[0]}`)
    } finally {
      await context.close()
    }
  }

  await browser.close()

  server.close()

  index.sort((a, b) => a.id.localeCompare(b.id))

  fs.writeFileSync(
    path.join(OUT, "index.json"),
    JSON.stringify(index, null, 2) + "\n",
  )

  console.log(`\n캡처 ${index.length}장 / 실패 ${failed.length} / 제외 ${skipped.length}`)

  for (const f of failed) console.log(`  실패: ${f}`)

  for (const k of skipped) console.log(`  제외: ${k}`)
}

main().catch((e) => {
  console.error(e)

  process.exit(1)
})
