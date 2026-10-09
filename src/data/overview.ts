// ─── Screen registry ───────────────────────────────────────────────────────

export type LayoutType = 'splash' | 'form' | 'dashboard' | 'list' | 'detail' | 'grid' | 'player' | 'modal' | 'calendar' | 'chat' | 'qr' | 'policy' | 'player-card' | 'menu'

export interface ScreenMeta {
  id: string
  name: string
  path: string
  group: Group
  layout: LayoutType
  /** 같은 경로의 화면 안에서 열리는 팝업/등록 상태 — ID 배지만 바뀌고 별도 라우트는 없음 */
  variant?: boolean
}

export type Group = '공통' | '홈' | '경기' | '티켓+' | '라운지' | 'MY' | '전체메뉴'

export const SCREENS: ScreenMeta[] = [
  // 공통
  { id: '001-SL-CM-01', name: '스플래시 스크린', path: '/splash', group: '공통', layout: 'splash' },
  { id: '002-SL-CM-02', name: '권한 요청', path: '/permissions', group: '공통', layout: 'form' },
  { id: '003-SL-CM-03', name: '팝업(공지)', path: '/notice', group: '공통', layout: 'modal' },
  { id: '089-SL-CM-04', name: '로그인', path: '/login', group: '공통', layout: 'form' },
  { id: '090-SL-CM-05', name: '회원가입', path: '/signup', group: '공통', layout: 'form' },
  { id: '091-SL-CM-06', name: '라이온즈 멤버십 회원 약관', path: '/signup/terms', group: '공통', layout: 'policy' },
  { id: '092-SL-CM-07', name: '개인정보수집이용 동의서', path: '/signup/privacy', group: '공통', layout: 'policy' },
  { id: '093-SL-CM-08', name: '가입환영', path: '/signup/welcome', group: '공통', layout: 'splash' },
  { id: '094-SL-CM-09', name: '아이디/비밀번호 찾기', path: '/find-account', group: '공통', layout: 'form' },
  { id: '096-SL-CM-11', name: '정보 찾기 완료', path: '/find-complete', group: '공통', layout: 'splash' },
  { id: '099-SL-CM-12', name: '비밀번호 재설정', path: '/set-new-password', group: '공통', layout: 'form' },
  // 홈
  { id: '004-SL-HM-01', name: '홈', path: '/home', group: '홈', layout: 'dashboard' },
  { id: '005-SL-HM-02', name: '알림', path: '/notifications', group: '홈', layout: 'list' },
  // 경기
  { id: '006-SL-GM-01', name: '게임', path: '/game', group: '경기', layout: 'dashboard' },
  { id: '007-SL-GM-02', name: '오늘의 라인업', path: '/game/lineup', group: '경기', layout: 'player-card' },
  { id: '009-SL-GM-04', name: '라이온즈 뉴스', path: '/game/news', group: '경기', layout: 'list' },
  { id: '010-SL-GM-05', name: '경기 일정', path: '/game/schedule', group: '경기', layout: 'calendar' },
  { id: '011-SL-GM-06', name: '선수 기록', path: '/game/stats', group: '경기', layout: 'list' },
  { id: '013-SL-GM-08', name: '라팍 정보', path: '/game/stadium', group: '경기', layout: 'detail' },
  { id: '014-SL-GM-09', name: '라이온즈 매거진', path: '/game/magazine', group: '경기', layout: 'list' },
  { id: '015-SL-GM-10', name: '라이온즈 원정대', path: '/game/away', group: '경기', layout: 'detail' },
  { id: '016-SL-GM-11', name: '라이온즈 VR', path: '/game/vr', group: '경기', layout: 'grid' },
  { id: '107-SL-GM-12', name: '라이온즈 VR 뷰어', path: '/game/vr-viewer', group: '경기', layout: 'detail' },
  // 티켓+
  { id: '017-SL-TK-01', name: '티켓+(Ticket+)', path: '/ticket', group: '티켓+', layout: 'dashboard' },
  // 라운지
  { id: '020-SL-LG-01', name: '라운지', path: '/lounge', group: '라운지', layout: 'dashboard' },
  { id: '021-SL-LG-02', name: '독점 콘텐츠', path: '/lounge/exclusive', group: '라운지', layout: 'grid' },
  { id: '022-SL-LG-03', name: '엘도라도 ZONE', path: '/lounge/eldorado', group: '라운지', layout: 'chat' },
  { id: '024-SL-LG-05', name: '디지털 피켓', path: '/lounge/cheer-board', group: '라운지', layout: 'form' },
  { id: '025-SL-LG-06', name: '나의 승리 운세', path: '/lounge/fortune', group: '라운지', layout: 'splash' },
  { id: '026-SL-LG-07', name: '디지털 굿즈', path: '/lounge/digital-goods', group: '라운지', layout: 'grid' },
  { id: '027-SL-LG-08', name: '사용 방법', path: '/lounge/digital-guide', group: '라운지', layout: 'detail' },
  { id: '029-SL-LG-12', name: '블루메이트 1기', path: '/lounge/sns', group: '라운지', layout: 'grid' },
  { id: '098-SL-LG-10', name: '블루 시그널', path: '/lounge/blue-signal', group: '라운지', layout: 'list' },
  { id: '100-SL-LG-13', name: '블루 시그널 등록', path: '/lounge/blue-signal', group: '라운지', layout: 'modal', variant: true },
  // MY
  { id: '030-SL-MY-01', name: 'My (마이페이지)', path: '/my', group: 'MY', layout: 'dashboard' },
  { id: '031-SL-MY-02', name: '설정', path: '/my/settings', group: 'MY', layout: 'list' },
  { id: '032-SL-MY-03', name: '개인정보 처리방침', path: '/my/privacy', group: 'MY', layout: 'policy' },
  { id: '033-SL-MY-04', name: 'CCTV 운영방침', path: '/my/cctv-policy', group: 'MY', layout: 'policy' },
  { id: '034-SL-MY-05', name: '이메일 무단수집거부', path: '/my/email-refuse', group: 'MY', layout: 'policy' },
  { id: '035-SL-MY-06', name: '내 정보 수정', path: '/my/edit-profile', group: 'MY', layout: 'form' },
  { id: '036-SL-MY-07', name: '비밀번호 변경', path: '/my/change-password', group: 'MY', layout: 'form' },
  { id: '037-SL-MY-08', name: '회원 탈퇴', path: '/my/withdraw', group: 'MY', layout: 'form' },
  { id: '038-SL-MY-09', name: '탈퇴 완료', path: '/my/withdraw-complete', group: 'MY', layout: 'splash' },
  { id: '039-SL-MY-10', name: '스마트 티켓 (QR)', path: '/my/ticket-qr', group: 'MY', layout: 'qr' },
  { id: '040-SL-MY-11', name: '내 앰블럼', path: '/my/emblem', group: 'MY', layout: 'grid' },
  { id: '041-SL-MY-12', name: '앰블럼 정보', path: '/my/emblem-detail', group: 'MY', layout: 'detail' },
  { id: '042-SL-MY-13', name: '테마 변경', path: '/my/theme', group: 'MY', layout: 'grid' },
  { id: '043-SL-MY-14', name: '예매 내역', path: '/my/booking-history', group: 'MY', layout: 'list' },
  { id: '044-SL-MY-15', name: '예매 상세', path: '/my/booking-detail', group: 'MY', layout: 'detail' },
  { id: '045-SL-MY-16', name: '예매 취소', path: '/my/booking-cancel', group: 'MY', layout: 'form' },
  { id: '046-SL-MY-17', name: '예매 안내', path: '/my/booking-guide', group: 'MY', layout: 'policy' },
  { id: '047-SL-MY-18', name: '티켓 선물', path: '/my/ticket-gift', group: 'MY', layout: 'form' },
  { id: '048-SL-MY-19', name: '쿠폰함', path: '/my/coupons', group: 'MY', layout: 'list' },
  { id: '049-SL-MY-20', name: '사용 완료 처리', path: '/my/coupon-use', group: 'MY', layout: 'qr' },
  { id: '050-SL-MY-21', name: '나의 멤버십', path: '/my/membership', group: 'MY', layout: 'detail' },
  { id: '051-SL-MY-22', name: '멤버십/시즌권 안내', path: '/my/membership-guide', group: 'MY', layout: 'list' },
  { id: '052-SL-MY-23', name: '멤버십 내역', path: '/my/membership-history', group: 'MY', layout: 'list' },
  { id: '053-SL-MY-24', name: '어린이회원 등록', path: '/my/child-register', group: 'MY', layout: 'form' },
  { id: '054-SL-MY-25', name: '함께 만드는 V9', path: '/my/diary', group: 'MY', layout: 'list' },
  { id: '101-SL-MY-26', name: '함께 만드는 V9 등록', path: '/my/diary', group: 'MY', layout: 'modal', variant: true },
  { id: '102-SL-MY-27', name: 'PRESS 신청', path: '/my/press-application', group: 'MY', layout: 'form' },
  // 전체메뉴
  { id: '057-SL-AL-01', name: '전체 메뉴', path: '/all-menu', group: '전체메뉴', layout: 'menu' },
  { id: '058-SL-AL-02', name: '구단 소개', path: '/all/about', group: '전체메뉴', layout: 'detail' },
  { id: '059-SL-AL-03', name: '구단 앰블럼', path: '/all/emblem', group: '전체메뉴', layout: 'detail' },
  { id: '060-SL-AL-04', name: '구단 로고', path: '/all/logo', group: '전체메뉴', layout: 'detail' },
  { id: '061-SL-AL-05', name: '구단 마스코트', path: '/all/mascot', group: '전체메뉴', layout: 'detail' },
  { id: '062-SL-AL-06', name: '캐치프레이즈', path: '/all/catchphrase', group: '전체메뉴', layout: 'detail' },
  { id: '064-SL-AL-08', name: '경산볼파크', path: '/all/gyeongsan-park', group: '전체메뉴', layout: 'detail' },
  { id: '065-SL-AL-09', name: '선수단 소개', path: '/all/players', group: '전체메뉴', layout: 'grid' },
  { id: '066-SL-AL-10', name: '선수별 개인 페이지', path: '/all/player-detail', group: '전체메뉴', layout: 'player' },
  { id: '067-SL-AL-11', name: '응원단 소개', path: '/all/cheer-squad', group: '전체메뉴', layout: 'list' },
  { id: '068-SL-AL-12', name: '구단 연혁', path: '/all/history', group: '전체메뉴', layout: 'list' },
  { id: '069-SL-AL-13', name: '역대 감독', path: '/all/past-managers', group: '전체메뉴', layout: 'list' },
  { id: '070-SL-AL-14', name: '라이온즈 21', path: '/all/lions-21', group: '전체메뉴', layout: 'detail' },
  { id: '071-SL-AL-15', name: '히스토리', path: '/all/history-moments', group: '전체메뉴', layout: 'grid' },
  { id: '072-SL-AL-16', name: '구단 소식', path: '/all/club-news', group: '전체메뉴', layout: 'list' },
  { id: '073-SL-AL-17', name: '외부감사 보고서', path: '/all/audit-report', group: '전체메뉴', layout: 'list' },
  { id: '074-SL-AL-18', name: '라이온즈 파트너', path: '/all/partners', group: '전체메뉴', layout: 'grid' },
  { id: '077-SL-AL-21', name: '공지 목록', path: '/all/notice-list', group: '전체메뉴', layout: 'list' },
  { id: '078-SL-AL-22', name: '공지 상세보기', path: '/all/notice-detail', group: '전체메뉴', layout: 'detail' },
  { id: '103-SL-AL-28', name: '이슈와 팩트', path: '/all/press-center', group: '전체메뉴', layout: 'list' },
  { id: '105-SL-AL-30', name: '이슈와 팩트 상세', path: '/all/press-center-detail', group: '전체메뉴', layout: 'detail' },
  { id: '104-SL-AL-29', name: 'PRESS 센터', path: '/all/media-press-center', group: '전체메뉴', layout: 'list' },
  { id: '106-SL-AL-31', name: 'PRESS 센터 상세', path: '/all/media-press-center-detail', group: '전체메뉴', layout: 'detail' },
  { id: '079-SL-AL-23', name: '이벤트 목록', path: '/all/event-list', group: '전체메뉴', layout: 'list' },
  { id: '080-SL-AL-24', name: '이벤트 상세보기', path: '/all/event-detail', group: '전체메뉴', layout: 'detail' },
  { id: '082-SL-AL-26', name: '이벤트 참여 내역', path: '/all/event-history', group: '전체메뉴', layout: 'list' },
  { id: '083-SL-AL-27', name: '프리뷰 목록', path: '/all/preview-list', group: '전체메뉴', layout: 'list' },
  { id: '084-SL-AL-28', name: '프리뷰 상세', path: '/all/preview-detail', group: '전체메뉴', layout: 'detail' },
  { id: '085-SL-AL-31', name: 'FAQ', path: '/all/faq', group: '전체메뉴', layout: 'list' },
]

// ─── Group metadata ─────────────────────────────────────────────────────────

export const GROUP_COLORS: Record<Group, { bg: string; text: string; dot: string }> = {
  '공통':    { bg: 'bg-slate-100',   text: 'text-slate-600',  dot: 'bg-slate-400' },
  '홈':      { bg: 'bg-blue-50',     text: 'text-blue-600',   dot: 'bg-blue-400' },
  '경기':    { bg: 'bg-green-50',    text: 'text-green-600',  dot: 'bg-green-400' },
  '티켓+':   { bg: 'bg-orange-50',   text: 'text-orange-600', dot: 'bg-orange-400' },
  '라운지':  { bg: 'bg-purple-50',   text: 'text-purple-600', dot: 'bg-purple-400' },
  'MY':      { bg: 'bg-rose-50',     text: 'text-rose-600',   dot: 'bg-rose-400' },
  '전체메뉴': { bg: 'bg-teal-50',    text: 'text-teal-600',   dot: 'bg-teal-400' },
}

export const GROUPS: Group[] = ['공통', '홈', '경기', '티켓+', '라운지', 'MY', '전체메뉴']

// ─── IA 구조도 ────────────────────────────────────────────────────────────────

export interface IATreeNode {
  id: string
  name: string
  path: string
  children?: IATreeNode[]
}

export const IA_TREE: { group: Group; screens: IATreeNode[] }[] = [
  {
    group: '공통',
    screens: [
      { id: '001-SL-CM-01', name: '스플래시 스크린', path: '/splash' },
      { id: '002-SL-CM-02', name: '권한 요청', path: '/permissions' },
      { id: '003-SL-CM-03', name: '팝업(공지)', path: '/notice' },
      { id: '089-SL-CM-04', name: '로그인', path: '/login', children: [
        { id: '094-SL-CM-09', name: '아이디/비밀번호 찾기', path: '/find-account' },
        { id: '096-SL-CM-11', name: '정보 찾기 완료', path: '/find-complete' },
        { id: '099-SL-CM-12', name: '비밀번호 재설정', path: '/set-new-password' },
      ]},
      { id: '090-SL-CM-05', name: '회원가입', path: '/signup', children: [
        { id: '091-SL-CM-06', name: '라이온즈 멤버십 회원 약관', path: '/signup/terms' },
        { id: '092-SL-CM-07', name: '개인정보수집이용 동의서', path: '/signup/privacy' },
        { id: '093-SL-CM-08', name: '가입환영', path: '/signup/welcome' },
      ]},
    ],
  },
  {
    group: '홈',
    screens: [
      { id: '004-SL-HM-01', name: '홈', path: '/home', children: [
        { id: '005-SL-HM-02', name: '알림', path: '/notifications' },
      ]},
    ],
  },
  {
    group: '경기',
    screens: [
      { id: '006-SL-GM-01', name: '게임', path: '/game', children: [
        { id: '007-SL-GM-02', name: '오늘의 라인업', path: '/game/lineup' },
        { id: '010-SL-GM-05', name: '경기 일정', path: '/game/schedule' },
        { id: '011-SL-GM-06', name: '선수 기록', path: '/game/stats' },
        { id: '013-SL-GM-08', name: '라팍 정보', path: '/game/stadium' },
        { id: '015-SL-GM-10', name: '라이온즈 원정대', path: '/game/away' },
      ]},
      { id: '009-SL-GM-04', name: '라이온즈 뉴스', path: '/game/news' },
      { id: '014-SL-GM-09', name: '라이온즈 매거진', path: '/game/magazine' },
      { id: '016-SL-GM-11', name: '라이온즈 VR', path: '/game/vr', children: [
        { id: '107-SL-GM-12', name: '라이온즈 VR 뷰어', path: '/game/vr-viewer' },
      ]},
    ],
  },
  {
    group: '티켓+',
    screens: [
      { id: '017-SL-TK-01', name: '티켓+(Ticket+)', path: '/ticket' },
    ],
  },
  {
    group: '라운지',
    screens: [
      { id: '020-SL-LG-01', name: '라운지', path: '/lounge', children: [
        { id: '021-SL-LG-02', name: '독점 콘텐츠', path: '/lounge/exclusive' },
        { id: '022-SL-LG-03', name: '엘도라도 ZONE', path: '/lounge/eldorado' },
        { id: '024-SL-LG-05', name: '디지털 피켓', path: '/lounge/cheer-board' },
        { id: '025-SL-LG-06', name: '나의 승리 운세', path: '/lounge/fortune' },
        { id: '026-SL-LG-07', name: '디지털 굿즈', path: '/lounge/digital-goods' },
        { id: '027-SL-LG-08', name: '사용 방법', path: '/lounge/digital-guide' },
        { id: '029-SL-LG-12', name: '블루메이트 1기', path: '/lounge/sns' },
        { id: '098-SL-LG-10', name: '블루 시그널', path: '/lounge/blue-signal', children: [
          { id: '100-SL-LG-13', name: '블루 시그널 등록', path: '/lounge/blue-signal' },
        ]},
      ]},
    ],
  },
  {
    group: 'MY',
    screens: [
      { id: '030-SL-MY-01', name: 'My (마이페이지)', path: '/my', children: [
        { id: '035-SL-MY-06', name: '내 정보 수정', path: '/my/edit-profile' },
        { id: '036-SL-MY-07', name: '비밀번호 변경', path: '/my/change-password' },
        { id: '037-SL-MY-08', name: '회원 탈퇴', path: '/my/withdraw' },
        { id: '039-SL-MY-10', name: '스마트 티켓 (QR)', path: '/my/ticket-qr' },
        { id: '042-SL-MY-13', name: '테마 변경', path: '/my/theme' },
        { id: '050-SL-MY-21', name: '나의 멤버십', path: '/my/membership' },
      ]},
      { id: '031-SL-MY-02', name: '설정', path: '/my/settings', children: [
        { id: '102-SL-MY-27', name: 'PRESS 신청', path: '/my/press-application' },
        { id: '032-SL-MY-03', name: '개인정보 처리방침', path: '/my/privacy' },
        { id: '033-SL-MY-04', name: 'CCTV 운영방침', path: '/my/cctv-policy' },
        { id: '034-SL-MY-05', name: '이메일 무단수집거부', path: '/my/email-refuse' },
      ]},
      { id: '040-SL-MY-11', name: '내 앰블럼', path: '/my/emblem', children: [
        { id: '041-SL-MY-12', name: '앰블럼 정보', path: '/my/emblem-detail' },
      ]},
      { id: '043-SL-MY-14', name: '예매 내역', path: '/my/booking-history', children: [
        { id: '044-SL-MY-15', name: '예매 상세', path: '/my/booking-detail' },
        { id: '045-SL-MY-16', name: '예매 취소', path: '/my/booking-cancel' },
        { id: '046-SL-MY-17', name: '예매 안내', path: '/my/booking-guide' },
        { id: '047-SL-MY-18', name: '티켓 선물', path: '/my/ticket-gift' },
      ]},
      { id: '048-SL-MY-19', name: '쿠폰함', path: '/my/coupons', children: [
        { id: '049-SL-MY-20', name: '사용 완료 처리', path: '/my/coupon-use' },
      ]},
      { id: '051-SL-MY-22', name: '멤버십/시즌권 안내', path: '/my/membership-guide', children: [
        { id: '052-SL-MY-23', name: '멤버십 내역', path: '/my/membership-history' },
      ]},
      { id: '053-SL-MY-24', name: '어린이회원 등록', path: '/my/child-register' },
      { id: '054-SL-MY-25', name: '함께 만드는 V9', path: '/my/diary', children: [
        { id: '101-SL-MY-26', name: '함께 만드는 V9 등록', path: '/my/diary' },
      ]},
    ],
  },
  {
    group: '전체메뉴',
    screens: [
      { id: '057-SL-AL-01', name: '전체 메뉴', path: '/all-menu', children: [
        { id: '058-SL-AL-02', name: '구단 소개', path: '/all/about' },
        { id: '059-SL-AL-03', name: '구단 앰블럼', path: '/all/emblem' },
        { id: '060-SL-AL-04', name: '구단 로고', path: '/all/logo' },
        { id: '061-SL-AL-05', name: '구단 마스코트', path: '/all/mascot' },
        { id: '062-SL-AL-06', name: '캐치프레이즈', path: '/all/catchphrase' },
        { id: '013-SL-GM-08', name: '라팍 정보', path: '/game/stadium' },
        { id: '064-SL-AL-08', name: '경산볼파크', path: '/all/gyeongsan-park' },
        { id: '065-SL-AL-09', name: '선수단 소개', path: '/all/players' },
        { id: '066-SL-AL-10', name: '선수별 개인 페이지', path: '/all/player-detail' },
        { id: '067-SL-AL-11', name: '응원단 소개', path: '/all/cheer-squad' },
        { id: '068-SL-AL-12', name: '구단 연혁', path: '/all/history' },
        { id: '069-SL-AL-13', name: '역대 감독', path: '/all/past-managers' },
        { id: '070-SL-AL-14', name: '라이온즈 21', path: '/all/lions-21' },
        { id: '071-SL-AL-15', name: '히스토리', path: '/all/history-moments' },
        { id: '072-SL-AL-16', name: '구단 소식', path: '/all/club-news' },
        { id: '073-SL-AL-17', name: '외부감사 보고서', path: '/all/audit-report' },
        { id: '074-SL-AL-18', name: '라이온즈 파트너', path: '/all/partners' },
        { id: '077-SL-AL-21', name: '공지 목록', path: '/all/notice-list' },
        { id: '078-SL-AL-22', name: '공지 상세보기', path: '/all/notice-detail' },
        { id: '103-SL-AL-28', name: '이슈와 팩트', path: '/all/press-center', children: [
          { id: '105-SL-AL-30', name: '이슈와 팩트 상세', path: '/all/press-center-detail' },
        ]},
        { id: '104-SL-AL-29', name: 'PRESS 센터', path: '/all/media-press-center', children: [
          { id: '106-SL-AL-31', name: 'PRESS 센터 상세', path: '/all/media-press-center-detail' },
        ]},
        { id: '079-SL-AL-23', name: '이벤트 목록', path: '/all/event-list' },
        { id: '080-SL-AL-24', name: '이벤트 상세보기', path: '/all/event-detail' },
        { id: '082-SL-AL-26', name: '이벤트 참여 내역', path: '/all/event-history' },
        { id: '083-SL-AL-27', name: '프리뷰 목록', path: '/all/preview-list' },
        { id: '084-SL-AL-28', name: '프리뷰 상세', path: '/all/preview-detail' },
        { id: '085-SL-AL-31', name: 'FAQ', path: '/all/faq' },
      ]},
    ],
  },
]

// ─── Overview page ────────────────────────────────────────────────────────────

export const ALL_GROUPS: ('전체' | Group)[] = ['전체', ...GROUPS]
