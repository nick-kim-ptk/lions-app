# 삼성 라이온즈 앱 프로토타입

React 19 + Vite + Tailwind CSS v4 + react-router-dom(HashRouter). 모든 데이터는 더미입니다.

## 구조
- `src/App.tsx` — 라우트 정의 (화면 ID는 `src/data/overview.ts`의 `SCREENS`가 단일 출처)
- `src/screens/<영역>/<Name>Screen.tsx` — 화면 1개 = 파일 1개. 영역별 `index.ts` 배럴 제공
- `src/components/` — `Layout`(탭바·헤더·화면ID 배지), `Placeholder`(와이어프레임 조각), `PlayerDetailContent`
- `src/data/` — 화면별 더미 데이터
- `src/data/mock/` — 공용 목업 도메인(시계·팀·선수·경기·예매). 화면에서 날짜·상대팀·좌석을 직접 쓰지 말고 여기서 파생
- `docs/` — 메뉴 설명, 검토 문서(`REVIEW.md`), 디자인 참고 이미지

## 규칙
- 목업 기준일은 `src/data/mock/clock.ts`의 `MOCK_TODAY`. `new Date()`로 화면 날짜를 만들지 않는다.
- KBO 규칙(월요일 휴식, 경기 시작 시각, 예매 오픈, 취소 마감)은 `mock/games.ts`, `mock/bookings.ts`에 있다.
- 경로 별칭 `@` = `src`. 점검: `pnpm typecheck`, 빌드: `pnpm build`.
