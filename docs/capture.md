# 화면 캡처 스크립트 사용법

전체 화면을 모바일 크기(390x844 @2x)로 한 장씩 캡처합니다. 스크립트: `scripts/capture.mjs`

## 최초 1회
```
cd scripts
npm install
npx playwright install chromium
```
(`scripts/`는 앱 빌드·배포와 분리된 별도 패키지라 루트 lockfile·GitHub Actions에 영향이 없습니다.)

## 실행
1. 루트에서 앱 실행: `pnpm dev` (기본 http://localhost:5173/)
2. `scripts` 폴더에서: `node capture.mjs`

## 결과 (`captures/`, git 제외)
| 파일명 | 내용 |
|---|---|
| `004-SL-HM-01_홈.png` | 기본 화면 |
| `004-SL-HM-01_홈-1_가을야구_탈락.png`, `-2_…` | 변형: 빨간 점선 드롭다운(CaseSelect)을 하나씩 바꾼 화면. 번호 뒤는 선택한 옵션명 |
| `107-SL-GM-12_라이온즈_VR_뷰어-1_선수의_눈으로_보기.png` | 쿼리로 달라지는 화면(VR 뷰어 주제별) |
| `index.html` | 전체 모아보기(브라우저로 열기) |

## 옵션
- `--only 054,스마트` : 화면 ID·이름·경로에 키워드가 포함된 것만
- `--no-variants` : 기본 화면만
- `--list` : 캡처 없이 대상 목록만 출력
- `--base <url>` `--out <dir>` `--width 390 --height 844 --scale 2` `--wait 500`

## 참고
- 긴 화면은 스크롤 영역 전체 높이로 한 장 저장(최대 6000px).
- 팝업 상태(함께 만드는 V9 등록, 블루 시그널 등록)는 별도 라우트가 없어 자동 캡처에서 제외 — 필요하면 수동 캡처.
- 변형은 컨트롤을 하나씩만 바꿉니다(조합 캡처 없음). 변형 장수는 컨트롤·옵션 수만큼 늘어납니다.

---

# 구역·케이스 단위 캡처 (GitHub Actions 자동)

화면 전체가 아니라 **한 구역**(예: 홈 "오늘의 경기")만, **케이스를 하나씩 바꿔 가며** 찍습니다. main에 푸시할 때마다 Actions가 전체 화면 캡처(`shots.mjs`)에 이어 `shots-cases.mjs`를 실행하고, 결과는 배포 사이트의 `/shots/` 아래로 올라갑니다. 화면설계서 에디터는 이 이름으로 구역과 케이스 줄을 맞춥니다.

| 위치 | 내용 |
|---|---|
| `…/shots/cases/{화면ID}__{cap}__{그룹순번}-{옵션순번}.png` | 구역 이미지 (폭 390 · 2배 해상도, 파일명에 한글 없음) |
| `…/shots/cases.json` | 목록 `[{ id, area, cap, group, case, file, capturedAt, sha }]` — `area`·`group`·`case`는 화면에 보이는 한글 그대로 |

그룹순번 = `capture-cases.json`의 `groups` 배열 순서, 옵션순번 = 그 그룹 드롭다운의 옵션 순서(1부터). 예: `004-SL-HM-01__today-game__1-5.png` = 홈 · 오늘의 경기 · 경기 상태(1번 그룹) · 5번째 옵션(우천 취소).

## 구성 요소
1. **`window.__wfCase`** (`src/lib/wfCase.ts`) — 케이스를 코드로 조회·변경
   - `list()` → `[{ group:"경기 상태", options:[…], current:"경기 전" }, …]`. 시즌 단계·경기 상태(전역)는 어느 화면에서나 나오고, 그 화면의 빨간 점선 드롭다운(`CaseSelect`)은 자기 그룹명으로 함께 나옵니다. 바꿀 수 없는 상태는 `disabled:true`.
   - `await set(group, option)` → `{ ok:true }` 또는 `{ ok:false, reason }` (예외 없음). 화면이 다시 그려질 때까지 기다린 뒤 돌아옵니다.
2. **`data-cap="키"`** — 찍을 구역을 감싸는 요소의 속성.
3. **`capture-cases.json`** — 찍을 대상 목록. 구역이 늘면 이 파일만 고치면 됩니다.
   ```json
   { "screen":"004-SL-HM-01", "route":"/home", "area":"오늘의 경기", "cap":"today-game",
     "groups":["경기 상태","시즌 단계"], "base":{"시즌 단계":"정규시즌","경기 상태":"경기 전"} }
   ```
   그룹은 한 번에 하나씩만 바꾸고, 나머지는 `base` 값으로 고정합니다.

## 지금 대상 (6개 구역)
| 화면 | 구역(설계서 이름) | cap | 바꾸는 그룹 |
|---|---|---|---|
| 004-SL-HM-01 홈 | 오늘의 경기 | `today-game` | 경기 상태 · 시즌 단계 |
| 006-SL-GM-01 게임 | 오늘의 경기 | `game-today` | 경기 유형 |
| 017-SL-TK-01 티켓+ | 서버시간 타이머 | `server-timer` | 시즌 구분 |
| 017-SL-TK-01 티켓+ | 오늘 예매(KV) | `today-ticket` | 시즌 구분 |
| 030-SL-MY-01 My | 멤버십/시즌권/어린이회원 카드 | `membership-card` | 멤버십 상태 |
| 040-SL-MY-11 내 앰블럼 | 획득 앰블럼 | `emblem-list` | 목록 상태 |

- 게임(006)·티켓(017)의 구역은 경기 상태가 바뀌어도 모양이 같아 그룹에서 뺐습니다(전체 화면의 상단 안내 문구만 바뀜). 구역 안이 바뀌게 되면 `groups`에 추가하세요.
- 시즌 종료 상태에서는 티켓+의 타이머·예매 KV가 아예 없어서 그 조합은 건너뜁니다(로그에만 남음).

## 새 구역·케이스를 추가하려면
1. 구역을 감싸는 요소에 `data-cap="영문키"` 추가.
2. 그 화면의 `CaseSelect`에 `group="한글 그룹명"` 지정 (생략하면 `케이스 1, 2…`로 나와 이름이 불안정). 목록 빈 상태 바(`ListCaseBar`)는 기본 "목록 상태".
3. `capture-cases.json`에 항목 추가.

## 로컬에서 시험
```
cd scripts
npm install && npx playwright install chromium
pnpm build        # (루트에서) dist 생성
node shots-cases.mjs --dist ../dist --out ../captures/cases-out [--only today-game,emblem] [--keep-case-ui]
```
- 구역 밖 요소(이웃·고정 헤더·탭바)와 빨간 점선 드롭다운은 기본으로 감추고 찍습니다(`--keep-case-ui`로 드롭다운 남김).
- 구역이 없거나 바꿀 수 없는 조합은 건너뛰고 로그(`↷ 건너뜀`)에만 남기며, 전체 캡처는 멈추지 않습니다. 시계·난수는 `shots.mjs`와 같이 고정되어 같은 내용이면 같은 PNG(`sha`)가 나옵니다.

---

# 전체 보기·다운로드 (배포 사이트)

main에 푸시할 때마다 Actions가 캡처를 모아 아래 주소에 올립니다.

| | 모아보기 | 전체 다운로드 |
|---|---|---|
| 앱 | `https://nick-kim-ptk.github.io/lions-app/shots/` | `…/lions-app/shots/lions-app-shots.zip` |
| 어드민 | `https://nick-kim-ptk.github.io/lions-admin/shots/` | `…/lions-admin/shots/lions-admin-shots.zip` |

- 모아보기: 화면 ID로 찾기, 이미지 클릭 시 원본 크기, 장별 PNG 받기. 앱은 전체 화면 아래에 구역·케이스별 이미지도 함께 나옵니다.
- zip에는 PNG와 `index.json`(·`cases.json`)이 들어 있습니다. 만드는 스크립트는 `scripts/shots-pack.mjs`.


## 탭 화면 캡처 (`/shots/views.json`)
탭이 있는 화면을 탭별 이미지로 찍는다. Actions 의 "Capture tab views" 단계(`scripts/shots-views.mjs`)가 만든다.
- 대상 설정: `scripts/view-tabs.json` — `{ id, path, tabs: ["첫 탭", "둘째 탭", …] }` (왼쪽부터 순번 0). 화면을 더하거나 뺄 때 이 파일만 고친다.
- 결과: `shots/views/{화면ID}__{탭 순번}.png` + `shots/views.json` (`[{id, tab, index, default | file, sha, capturedAt}]`).
- 첫 탭은 `default: true` 만 적고 이미지는 `index.json` 의 기본 캡처를 쓴다. 나머지는 화면 안 탭 버튼(하단 메뉴 제외)을 누른 뒤 풀 페이지로 찍는다(폭·배율·시계 고정은 전체 캡처와 동일).
- 이전 배포의 `views.json` 과 sha 가 같으면 `capturedAt` 을 유지한다(못 읽으면 새로 기록).
- 탭 글자가 화면과 다르면 그 탭만 건너뛰고 로그에 `↷ 건너뜀` 으로 남는다. 목록 필터·앵커 이동 탭 화면(010·015·072·077·079·082·103·104)은 제외.
- 로컬: `node shots-views.mjs --dist ../dist --out ../dist/shots [--only 011]`

## 언제 캡처가 새로 찍히나
- **수동 실행일 때만**: GitHub > Actions > Deploy to GitHub Pages > Run workflow. 전체 화면·구역·탭 캡처를 모두 새로 찍어 `/shots/`에 올린다(약 5분).
- **일반 푸시**: 캡처는 다시 찍지 않는다. 배포 때 지금 공개된 `/shots/`의 zip(`lions-app-shots.zip`)을 받아 그대로 유지하므로 `/shots/`가 사라지지 않고, 배포는 약 1분 안에 끝난다.
