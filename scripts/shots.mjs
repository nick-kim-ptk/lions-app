/**
 * CI용 전체 화면 캡처 (Playwright) — GitHub Pages 배포물에 `/shots/` 로 함께 올라갑니다.
 *
 * 사용: node shots.mjs --dist ../dist --out ../dist/shots [--only 004,054] [--width 390]
 *
 * 결과
 *   {화면ID}.png    폭 390 풀페이지 (안쪽 스크롤 영역까지 펼쳐서 한 장)
 *   index.json      [{ id, file, capturedAt, sha }]  (화면 ID 순)
 *   (구역·케이스 단위 캡처는 shots-cases.mjs)
 *
 * 화면 목록은 src/data/overview.ts 의 SCREENS 입니다. 같은 경로를 쓰는 팝업(variant) 화면은
 * 별도 라우트가 없어 제외합니다. 일부 화면이 실패해도 나머지는 계속 캡처하고 종료 코드는 0 입니다.
 */

import { chromium } from "playwright"

import crypto from "node:crypto"

import fs from "node:fs"

import http from "node:http"

import path from "node:path"

import { fileURLToPath, pathToFileURL } from "node:url"

const here = path.dirname(fileURLToPath(import.meta.url))

const argv = process.argv.slice(2)

export const opt = (name, def) => {
  const i = argv.indexOf(`--${name}`)

  return i >= 0 ? argv[i + 1] : def
}

export const DIST = path.resolve(here, opt("dist", "../dist"))

export const OUT = path.resolve(here, opt("out", "../dist/shots"))

const ONLY = opt("only", "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean)

export const WIDTH = Number(opt("width", 390))

export const HEIGHT = Number(opt("height", 844))

export const WAIT = Number(opt("wait", 600))

// 재현 가능한 캡처: 시각·난수 고정 (내용이 같으면 같은 PNG)
const NOW = new Date(opt("now", "2026-10-01T10:00:00+09:00"))

const SEED = Number(opt("seed", 20261001))

export const SCALE = Number(opt("scale", 2))

// Chromium 캡처 한계(16384 장치 px) 아래: 높이 × 배율 ≤ 16000
export const MAX_H = Math.floor(16000 / SCALE)

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

export function serve(dir) {
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

export async function snap(page, file) {
  await page.evaluate(() => document.fonts.ready)

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

  await page.screenshot({ path: file, animations: "disabled", caret: "hide" })

  if (target !== HEIGHT)
    await page.setViewportSize({ width: WIDTH, height: HEIGHT })
}

// 컨텍스트 공통 고정: 시계(멈춤) + Math.random 시드 + crypto.randomUUID 대체
export async function freeze(context) {
  // 화면 ID 배지(상단 중앙)는 캡처에 나오지 않게 숨긴다
  await context.addInitScript(() => {
    const css = "[data-id-badge],[data-screen-id]{display:none !important}"
    const add = () => {
      const st = document.createElement("style")
      st.textContent = css
      document.head.appendChild(st)
    }
    if (document.head) add()
    else document.addEventListener("DOMContentLoaded", add)
  })

  await context.clock.install({ time: NOW })

  await context.clock.pauseAt(new Date(NOW.getTime() + 1000))

  await context.addInitScript((seed) => {
    let a = seed >>> 0

    Math.random = () => {
      a = (a + 0x6d2b79f5) >>> 0

      let t = a

      t = Math.imul(t ^ (t >>> 15), t | 1)

      t ^= t + Math.imul(t ^ (t >>> 7), t | 61)

      return ((t ^ (t >>> 14)) >>> 0) / 4294967296
    }

    // 부드러운 스크롤은 캡처 시점에 따라 위치가 달라지므로 즉시 이동으로 고정
    const instant = (orig) =>
      function (arg, ...rest) {
        if (arg && typeof arg === "object" && "behavior" in arg)
          arg = { ...arg, behavior: "instant" }

        return orig.call(this, arg, ...rest)
      }

    for (const k of ["scrollIntoView", "scrollTo", "scrollBy"])
      Element.prototype[k] = instant(Element.prototype[k])

    window.scrollTo = instant(window.scrollTo)

    window.scrollBy = instant(window.scrollBy)

    // 스크롤바 폭·모서리 픽셀 차이 제거
    document.addEventListener("DOMContentLoaded", () => {
      const st = document.createElement("style")

      st.textContent = "*::-webkit-scrollbar{display:none}*{scrollbar-width:none}"

      document.head.appendChild(st)
    })

    let n = 0

    if (window.crypto && crypto.randomUUID)
      crypto.randomUUID = () =>
        `00000000-0000-4000-8000-${String(++n).padStart(12, "0")}`
  }, SEED)
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
      deviceScaleFactor: SCALE,
      locale: "ko-KR",
    })

    await freeze(context)

    const page = await context.newPage()

    try {
      await page.goto(`${base}#${s.path}`, { waitUntil: "networkidle" })

      await page.evaluate(() => document.fonts.ready)

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

  // 파일 내용의 sha256 (변경 감지용)
  for (const e of index)
    e.sha = crypto
      .createHash("sha256")
      .update(fs.readFileSync(path.join(OUT, e.file)))
      .digest("hex")

  fs.writeFileSync(
    path.join(OUT, "index.json"),
    JSON.stringify(index, null, 2) + "\n",
  )

  console.log(`\n캡처 ${index.length}장 / 실패 ${failed.length} / 제외 ${skipped.length}`)

  for (const f of failed) console.log(`  실패: ${f}`)

  for (const k of skipped) console.log(`  제외: ${k}`)
}

// 직접 실행했을 때만 캡처를 돈다 (shots-cases.mjs 가 serve·freeze 를 가져다 쓸 수 있게)
if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href
) {
  main().catch((e) => {
    console.error(e)

    process.exit(1)
  })
}
