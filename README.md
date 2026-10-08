# 삼성 라이온즈 앱 프로토타입

Figma Make로 만든 삼성 라이온즈 팬 앱 화면(약 93개 라우트)을 React 코드로 정리한 프로토타입입니다.
**모든 데이터(선수·경기·예매·결제·회원 정보)는 가상의 더미**이며 실제 구단·KBO 데이터가 아닙니다.

## 실행
```bash
pnpm install
pnpm dev          # http://localhost:5173
pnpm typecheck
pnpm build        # dist/ 생성
```
Node 22 / pnpm (`.mise.toml` 참고). 모바일 폭(약 390px)에서 보는 것을 기준으로 디자인했습니다.

## 구조
```
src/
  App.tsx              라우트 (HashRouter)
  screens/<영역>/      화면 1개 = 파일 1개 (onboarding, home, game, ticket, lounge, my, menu, dev)
  components/          Layout, Placeholder, PlayerDetailContent
  data/                화면별 더미 데이터
  data/mock/           공용 목업 도메인: 기준 시각, 팀, 선수, 경기, 예매
  assets/images/       실사용 이미지
docs/
  REVIEW.md            누락·고도화 점검표와 야구 케이스 체크리스트
  app-menu-descriptions.md
  design-refs/         참고용 이미지 (앱에서 미사용)
```

## 목업 기준 시각
`src/data/mock/clock.ts`의 `MOCK_TODAY`(2026-09-19 토 15:30)가 모든 화면의 "오늘"입니다.
경기 일정·예매·알림·티켓 상태는 여기서 파생되므로, 날짜를 바꾸면 화면 전체가 같이 움직입니다.

## 배포 (GitHub Pages 등)
HashRouter + 상대 base(`./`)라서 하위 경로 배포에서도 동작합니다. 필요하면 `VITE_BASE=/repo-name/ pnpm build`.

## 공개 전 확인
- `docs/design-refs/`와 `src/assets/images/`의 사진·로고·선수 이름은 권리 확인 후 공개 저장소에 올리세요.
- `index.html`에 `noindex`를 넣어 두었습니다. 공개 서비스 용도라면 제거하세요.
