/**
 * 캡처 결과를 한 번에 보고 받을 수 있게 묶는다 — /shots/index.html (모아보기) + /shots/{이름}-shots.zip (전체 다운로드)
 *
 * 사용: node shots-pack.mjs --out ../dist/shots --name lions-app [--title "삼성 라이온즈 앱 화면 캡처"]
 *
 * 입력(있는 것만 사용): {out}/index.json (전체 화면), {out}/cases.json (구역·케이스)
 * 출력: {out}/index.html, {out}/{name}-shots.zip  (zip 안에는 PNG 와 index.json·cases.json 이 들어간다)
 * 실패해도 배포를 막지 않도록 호출하는 쪽에서 continue-on-error 로 둔다.
 */

import { execFileSync } from "node:child_process"

import fs from "node:fs"

import path from "node:path"

import { fileURLToPath } from "node:url"

const here = path.dirname(fileURLToPath(import.meta.url))

const argv = process.argv.slice(2)

const opt = (name, def) => {
  const i = argv.indexOf(`--${name}`)

  return i >= 0 ? argv[i + 1] : def
}

const OUT = path.resolve(here, opt("out", "../dist/shots"))

const NAME = opt("name", "app")

const TITLE = opt("title", `${NAME} 화면 캡처`)

const readJson = (f) => {
  try {
    return JSON.parse(fs.readFileSync(path.join(OUT, f), "utf8"))
  } catch {
    return null
  }
}

const esc = (s) =>
  String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c])

const pages = readJson("index.json") ?? []

const cases = readJson("cases.json") ?? []

const zipName = `${NAME}-shots.zip`

// ── zip (PNG + json 만, 이전 zip·html 제외) ──
const zipPath = path.join(OUT, zipName)

fs.rmSync(zipPath, { force: true })

execFileSync("zip", ["-qr", zipName, ".", "-i", "*.png", "*.json"], { cwd: OUT })

const zipMB = (fs.statSync(zipPath).size / 1024 / 1024).toFixed(1)

// ── 모아보기 ──
const card = (file, title, sub) => `
    <figure data-q="${esc(`${title} ${sub} ${file}`.toLowerCase())}">
      <a href="${esc(file)}" target="_blank" rel="noopener"><img src="${esc(file)}" loading="lazy" alt="${esc(title)}"></a>
      <figcaption><b>${esc(title)}</b>${sub ? `<span>${esc(sub)}</span>` : ""}<a href="${esc(file)}" download>PNG 받기</a></figcaption>
    </figure>`

const pageCards = pages
  .map((p) => card(p.file, p.id, p.type === "modal" ? "모달" : ""))
  .join("")

// 구역 캡처: 화면 > 구역 > 그룹 순으로 묶는다
const byArea = new Map()

for (const c of cases) {
  const k = `${c.id} · ${c.area}`

  if (!byArea.has(k)) byArea.set(k, [])

  byArea.get(k).push(c)
}

const caseSections = [...byArea.entries()]
  .map(
    ([k, list]) => `
  <h3>${esc(k)}</h3>
  <div class="grid">${list.map((c) => card(c.file, c.case, c.group)).join("")}</div>`,
  )
  .join("")

const html = `<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>${esc(TITLE)}</title>
<style>
  :root { color-scheme: light dark; --bg:#f5f7fb; --card:#fff; --text:#111827; --sub:#64748b; --line:#dde1ec; --blue:#1b5bf0; }
  @media (prefers-color-scheme: dark) { :root { --bg:#0e1424; --card:#161d33; --text:#f0f2f8; --sub:#8595ab; --line:#27304a; --blue:#6ea0ff; } }
  * { box-sizing: border-box; }
  body { margin:0; background:var(--bg); color:var(--text); font:14px/1.5 "Pretendard Variable", Pretendard, system-ui, sans-serif; }
  header { position:sticky; top:0; z-index:5; background:var(--bg); border-bottom:1px solid var(--line); padding:12px 16px; display:flex; flex-wrap:wrap; gap:10px; align-items:center; }
  h1 { font-size:16px; margin:0; margin-right:auto; }
  .btn { background:var(--blue); color:#fff; text-decoration:none; padding:8px 14px; border-radius:10px; font-weight:700; }
  input { padding:8px 12px; border:1px solid var(--line); border-radius:10px; background:var(--card); color:var(--text); min-width:200px; }
  main { padding:16px; max-width:1600px; margin:0 auto; }
  h2 { font-size:15px; margin:24px 0 4px; } h3 { font-size:13px; margin:18px 0 8px; color:var(--sub); }
  .grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(180px,1fr)); gap:12px; align-items:start; }
  figure { margin:0; background:var(--card); border:1px solid var(--line); border-radius:12px; padding:8px; }
  figure img { width:100%; height:auto; display:block; border-radius:8px; background:#e8ebf4; min-height:60px; }
  figcaption { margin-top:6px; display:flex; flex-direction:column; gap:2px; font-size:12px; }
  figcaption span { color:var(--sub); } figcaption a { color:var(--blue); text-decoration:none; }
  .hide { display:none; }
  .note { color:var(--sub); font-size:12px; }
</style>
</head>
<body>
<header>
  <h1>${esc(TITLE)}</h1>
  <input id="q" type="search" placeholder="화면 ID·이름으로 찾기">
  <a class="btn" href="${esc(zipName)}" download>전체 다운로드 (zip · ${zipMB}MB)</a>
</header>
<main>
  ${pages.length ? `<h2>전체 화면 (${pages.length}장)</h2><p class="note">이미지를 누르면 원본 크기로 열립니다.</p><div class="grid">${pageCards}</div>` : ""}
  ${cases.length ? `<h2>구역·케이스별 (${cases.length}장)</h2>${caseSections}` : ""}
  ${pages.length || cases.length ? "" : "<p>캡처 결과가 없습니다.</p>"}
</main>
<script>
  const q = document.getElementById("q")
  q.addEventListener("input", () => {
    const k = q.value.trim().toLowerCase()
    document.querySelectorAll("figure").forEach((f) => f.classList.toggle("hide", !!k && !f.dataset.q.includes(k)))
  })
</script>
</body>
</html>
`

fs.writeFileSync(path.join(OUT, "index.html"), html)

console.log(`모아보기 index.html · ${zipName} (${zipMB}MB) · 전체 ${pages.length}장 · 구역 ${cases.length}장`)
