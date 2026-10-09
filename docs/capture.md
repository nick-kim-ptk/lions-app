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
