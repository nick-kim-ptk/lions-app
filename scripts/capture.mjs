/**
 * 와이어프레임 전체 화면 캡처 스크립트 (Playwright)
 *
 * 준비 (최초 1회)
 *   cd scripts && npm install && npx playwright install chromium
 *
 * 실행
 *   1) 루트에서 앱 실행:   pnpm dev            (기본 주소 http://localhost:5173/)
 *   2) scripts 폴더에서:   node capture.mjs
 *
 * 결과: ../captures/ 폴더
 *   기본 화면   004-SL-HM-01_홈.png
 *   변형 화면   004-SL-HM-01_홈-1_가을야구_탈락.png, -2_..., (드롭다운 케이스를 하나씩 바꿔서 캡처)
 *   모아보기    ../captures/index.html (브라우저로 열면 전체를 한눈에 확인)
 *
 * 옵션
 *   --base <url>        앱 주소 (기본 http://localhost:5173/)
 *   --out <dir>         저장 폴더 (기본 ../captures)
 *   --only <키워드,..>  화면 ID/이름/경로에 키워드가 포함된 것만 (예: --only 054,스마트)
 *   --no-variants       기본 화면만 캡처
 *   --width 390 --height 844 --scale 2   뷰포트 (기본 390x844 @2x)
 *   --wait 500          화면 진입 후 대기(ms)
 *   --list              캡처하지 않고 대상 목록만 출력
 *
 * 참고
 *  - 빨간 점선 드롭다운(CaseSelect)을 자동으로 찾아 옵션을 하나씩 바꿔 캡처합니다. (한 번에 하나의 컨트롤만 변경)
 *  - 긴 화면은 스크롤 영역 전체 높이로 늘려 한 장으로 저장합니다. (최대 6000px)
 *  - 팝업(variant) 화면(예: 함께 만드는 V9 등록, 블루 시그널 등록)은 별도 라우트가 없어 자동 캡처 대상에서 제외합니다.
 */

import { chromium } from "playwright"

import fs from "node:fs"

import path from "node:path"

import { fileURLToPath } from "node:url"

const here = path.dirname(fileURLToPath(import.meta.url))

// ── 옵션 파싱 ──

const argv = process.argv.slice(2)

const opt = (name, def) => {
  const i = argv.indexOf(`--${name}`)

  return i >= 0 ? argv[i + 1] : def
}

const flag = (name) => argv.includes(`--${name}`)

const BASE = opt("base", "http://localhost:5173/").replace(/#.*$/, "")

const OUT = path.resolve(here, opt("out", "../captures"))

const ONLY = (opt("only", "") || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean)

const WIDTH = Number(opt("width", 390))

const HEIGHT = Number(opt("height", 844))

const SCALE = Number(opt("scale", 2))

const WAIT = Number(opt("wait", 500))

const MAX_H = 6000

const WITH_VARIANTS = !flag("no-variants")

// ── 화면 목록: src/data/overview.ts 의 SCREENS 에서 읽음 ──

function loadScreens() {
  const src = fs.readFileSync(
    path.resolve(here, "../src/data/overview.ts"),
    "utf8",
  )

  const list = []

  for (const line of src.split("\n")) {
    const m = line.match(
      /id:\s*'([^']+)',\s*name:\s*'([^']+)',\s*path:\s*'([^']+)'/,
    )

    if (!m) continue

    if (/variant:\s*true/.test(line)) continue // 팝업 상태는 제외

    list.push({ id: m[1], name: m[2], path: m[3] })
  }

  // 같은 ID 중복 제거

  const seen = new Set()

  return list.filter((s) => (seen.has(s.id) ? false : (seen.add(s.id), true)))
}

// 쿼리로 달라지는 화면은 추가 변형으로 캡처 (기본 화면은 쿼리 없이 캡처)

const EXTRA_ROUTES = {
  "/game/vr-viewer": [
    { label: "선수의_눈으로_보기", query: "?topic=player" },

    { label: "선수들의_공간", query: "?topic=space" },

    { label: "라팍_탐험", query: "?topic=explore" },
  ],
}

const safe = (s) =>
  s.replace(/[\\/:*?"<>|]+/g, "")
    .replace(/\s+/g, "_")
    .replace(/[()]/g, "")

// 스크롤 영역 전체가 보이도록 뷰포트를 늘려 캡처

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

    await page.waitForTimeout(250)
  }

  await page.screenshot({ path: file })

  if (target !== HEIGHT)
    await page.setViewportSize({ width: WIDTH, height: HEIGHT })
}

const CONTROL = "button.border-dashed.border-red-400" // CaseSelect 버튼

async function openPage(browser, url) {
  const context = await browser.newContext({
    viewport: { width: WIDTH, height: HEIGHT },
    deviceScaleFactor: SCALE,
    locale: "ko-KR",
  })

  const page = await context.newPage()

  await page.goto(url, { waitUntil: "networkidle" })

  return { context, page }
}

// 기본 상태에서 컨트롤별 옵션 목록 수집

async function readControls(page) {
  const controls = page.locator(CONTROL)

  const n = await controls.count()

  const result = []

  for (let i = 0; i < n; i++) {
    const c = controls.nth(i)

    if (!(await c.isVisible())) {
      result.push({ options: [], current: "" })
      continue
    }

    const current = (await c.innerText()).trim()

    await c.click({ force: true })

    const opts = await c
      .locator("xpath=following-sibling::ul//button")
      .allInnerTexts()

    await c.click({ force: true }) // 닫기

    result.push({ current, options: opts.map((t) => t.trim()).filter(Boolean) })
  }

  return result
}

async function main() {
  let screens = loadScreens()

  if (ONLY.length)
    screens = screens.filter((s) =>
      ONLY.some((k) => `${s.id} ${s.name} ${s.path}`.includes(k)),
    )

  if (flag("list")) {
    for (const s of screens) console.log(`${s.id}\t${s.name}\t${s.path}`)

    console.log(`\n총 ${screens.length}개 화면`)

    return
  }

  fs.mkdirSync(OUT, { recursive: true })

  const browser = await chromium.launch()

  const made = [] // { file, id, name, label }

  const failed = []

  for (const s of screens) {
    const prefix = `${s.id}_${safe(s.name)}`

    const url = `${BASE}#${s.path}`

    try {
      // 1) 기본 화면

      let { context, page } = await openPage(browser, url)

      const base = `${prefix}.png`

      await snap(page, path.join(OUT, base))

      made.push({ file: base, id: s.id, name: s.name, label: "기본" })

      let n = 0

      // 2) 쿼리 변형

      for (const ex of EXTRA_ROUTES[s.path] ?? []) {
        n++

        const f = `${prefix}-${n}_${ex.label}.png`

        const p2 = await context.newPage()

        await p2.goto(`${url}${ex.query}`, { waitUntil: "networkidle" })

        await snap(p2, path.join(OUT, f))

        await p2.close()

        made.push({ file: f, id: s.id, name: s.name, label: ex.label })
      }

      // 3) 드롭다운 케이스 변형

      if (WITH_VARIANTS) {
        const controls = await readControls(page)

        await context.close()

        for (let ci = 0; ci < controls.length; ci++) {
          const { current, options } = controls[ci]

          for (const label of options) {
            if (label === current) continue

            n++

            const f = `${prefix}-${n}_${safe(label)}.png`

            const v = await openPage(browser, url)

            try {
              const c = v.page.locator(CONTROL).nth(ci)

              await c.click({ force: true })

              await c
                .locator("xpath=following-sibling::ul//button", {
                  hasText: label,
                })
                .first()
                .click({ force: true })

              await snap(v.page, path.join(OUT, f))

              made.push({
                file: f,
                id: s.id,
                name: s.name,
                label: `${current} → ${label}`,
              })
            } catch (e) {
              failed.push(
                `${s.id} ${s.name} [${label}]: ${e.message.split("\n")[0]}`,
              )
            } finally {
              await v.context.close()
            }
          }
        }
      } else {
        await context.close()
      }

      console.log(`✓ ${s.id} ${s.name} (${n + 1}장)`)
    } catch (e) {
      failed.push(`${s.id} ${s.name}: ${e.message.split("\n")[0]}`)

      console.log(`✗ ${s.id} ${s.name} — ${e.message.split("\n")[0]}`)
    }
  }

  await browser.close()

  // 모아보기 index.html

  const rows = made

    .map(
      (m) =>
        `<figure><a href="${encodeURI(m.file)}"><img loading="lazy" src="${encodeURI(m.file)}"></a><figcaption><b>${m.id}</b> ${m.name}<br><small>${m.label}</small></figcaption></figure>`,
    )

    .join("\n")

  fs.writeFileSync(
    path.join(OUT, "index.html"),

    `<!doctype html><meta charset="utf-8"><title>화면 캡처</title><style>body{font:13px system-ui;background:#f1f3f8;margin:16px}.g{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:14px}figure{margin:0;background:#fff;border:1px solid #dde1ec;border-radius:10px;padding:8px}img{width:100%;border-radius:6px;display:block}figcaption{margin-top:6px}</style><h2>화면 캡처 (${made.length}장)</h2><div class="g">${rows}</div>`,
  )

  console.log(`\n완료: ${made.length}장 → ${OUT}`)

  if (failed.length) {
    console.log(`\n실패 ${failed.length}건:`)

    failed.forEach((f) => console.log(" -", f))
  }
}

main().catch((e) => {
  console.error(e)

  process.exit(1)
})
