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
- 케이스(상태) 전환 컨트롤은 `components/CaseSelect`(빨간 점선 드롭다운)만 사용한다. 탭·필터 등 실제 UI와 구분하기 위함.
- 시즌 단계·경기 상태·공통 시스템 상태 정의는 `src/data/caseGuide.ts`(가이드 페이지 `/case-guide`)가 단일 출처. 케이스를 추가하면 이 문서도 함께 갱신하고, `OPEN_ITEMS`(정의 필요)는 해결되면 삭제한다. 전역 케이스 상태는 `src/data/caseStore.ts`.
- PC 뷰(1024px~, 기준 1440): 규칙과 숨김 항목은 `docs/pc-view.md`. 모바일 컴포넌트는 그대로 두고 `lg:` 클래스로 칸 수·여백만 바꾼다. 메뉴 데이터는 `src/data/allMenu.ts`(모바일 전체 메뉴와 PC 상단 메뉴 공용).
