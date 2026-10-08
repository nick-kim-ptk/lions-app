/**
 * 선수단 더미 데이터 — 선수 정보(등번호/포지션/투타)와 시즌 기록의 단일 출처.
 * 라인업·기록·선수단 소개·선수 상세·직관일기/응원보드 선수 선택이 모두 여기서 읽습니다.
 * 모든 기록 수치는 가상의 값입니다.
 */
export type PlayerGroup = '투수' | '포수' | '내야수' | '외야수'
export type Pos = 'P' | 'C' | '1B' | '2B' | '3B' | 'SS' | 'LF' | 'CF' | 'RF' | 'DH'

/** 어드민 선수 구분 (일반 / 신입단 / 군입대) */
export type PlayerKind = '일반' | '신입단' | '군입대'
/** 어드민 등록 상태 (1군 / 2군 / 부상 — 부상은 사유 입력) */
export type PlayerTier = '1군' | '2군' | '부상'

export interface Player {
  id: string
  name: string
  no: number
  group: PlayerGroup
  /** 주 포지션 */
  pos: Pos
  /** 투타 (예: 우투좌타) */
  handed: string
  foreign?: boolean
  role?: '선발' | '불펜' | '마무리'
  /** 미지정이면 '일반' */
  kind?: PlayerKind
  /** 미지정이면 '1군' */
  tier?: PlayerTier
  /** tier가 '부상'일 때 어드민에서 입력하는 사유 */
  injury?: string
}

export interface BatterStats {
  avg: string
  hr: number
  rbi: number
  h: number
  sb: number
  obp: string
  slg: string
}

export interface PitcherStats {
  era: string
  w: number
  l: number
  sv: number
  hld: number
  ip: string
  k: number
}

export const PLAYERS: Player[] = [
  // 투수
  { id: 'won-tae-in', name: '원태인', no: 29, group: '투수', pos: 'P', handed: '우투우타', role: '선발' },
  { id: 'choi-chae-heung', name: '최채흥', no: 18, group: '투수', pos: 'P', handed: '좌투좌타', role: '선발' },
  { id: 'buchanan', name: '뷰캐넌', no: 45, group: '투수', pos: 'P', handed: '우투우타', role: '선발', foreign: true },
  { id: 'lee-seung-hyun', name: '이승현', no: 51, group: '투수', pos: 'P', handed: '좌투좌타', role: '불펜', kind: '군입대' },
  { id: 'reyes', name: '레예스', no: 53, group: '투수', pos: 'P', handed: '우투우타', role: '선발', foreign: true },
  { id: 'oh-seung-hwan', name: '오승환', no: 21, group: '투수', pos: 'P', handed: '우투우타', role: '마무리' },
  { id: 'kim-tae-hoon', name: '김태훈', no: 40, group: '투수', pos: 'P', handed: '우투우타', role: '불펜', tier: '2군' },
  { id: 'jang-pil-jun', name: '장필준', no: 31, group: '투수', pos: 'P', handed: '우투우타', role: '불펜', tier: '부상', injury: '어깨 통증' },
  // 포수
  { id: 'kang-min-ho', name: '강민호', no: 11, group: '포수', pos: 'C', handed: '우투우타' },
  // 내야수
  { id: 'lee-jae-hyun', name: '이재현', no: 27, group: '내야수', pos: 'SS', handed: '우투좌타' },
  { id: 'diaz', name: '디아즈', no: 44, group: '내야수', pos: '1B', handed: '우투우타', foreign: true },
  { id: 'park-byung-ho', name: '박병호', no: 52, group: '내야수', pos: 'DH', handed: '우투우타' },
  { id: 'kim-young-woong', name: '김영웅', no: 5, group: '내야수', pos: '3B', handed: '우투좌타', kind: '신입단' },
  { id: 'ryu-ji-hyuk', name: '류지혁', no: 16, group: '내야수', pos: '2B', handed: '우투좌타' },
  { id: 'lee-seong-gyu', name: '이성규', no: 36, group: '내야수', pos: '3B', handed: '우투우타', kind: '신입단' },
  { id: 'park-gye-beom', name: '박계범', no: 37, group: '내야수', pos: '2B', handed: '우투우타', kind: '군입대' },
  { id: 'oh-jae-il', name: '오재일', no: 10, group: '내야수', pos: '1B', handed: '우투좌타', tier: '2군' },
  // 외야수
  { id: 'koo-ja-wook', name: '구자욱', no: 9, group: '외야수', pos: 'LF', handed: '우투좌타' },
  { id: 'kim-ji-chan', name: '김지찬', no: 3, group: '외야수', pos: 'CF', handed: '좌투좌타' },
  { id: 'kim-heon-gon', name: '김헌곤', no: 32, group: '외야수', pos: 'RF', handed: '우투우타' },
]

export const PLAYER_BY_ID: Record<string, Player> = Object.fromEntries(PLAYERS.map((p) => [p.id, p]))
export const playerByName = (name: string) => PLAYERS.find((p) => p.name === name)

export const BATTER_STATS: Record<string, BatterStats> = {
  'koo-ja-wook': { avg: '.321', hr: 20, rbi: 74, h: 128, sb: 12, obp: '.398', slg: '.541' },
  'lee-jae-hyun': { avg: '.308', hr: 14, rbi: 61, h: 117, sb: 8, obp: '.371', slg: '.489' },
  'kim-heon-gon': { avg: '.295', hr: 11, rbi: 55, h: 108, sb: 3, obp: '.352', slg: '.447' },
  'kang-min-ho': { avg: '.281', hr: 9, rbi: 48, h: 99, sb: 1, obp: '.349', slg: '.412' },
  'diaz': { avg: '.276', hr: 18, rbi: 67, h: 95, sb: 2, obp: '.341', slg: '.503' },
  'park-byung-ho': { avg: '.263', hr: 16, rbi: 58, h: 88, sb: 0, obp: '.344', slg: '.478' },
  'kim-ji-chan': { avg: '.258', hr: 4, rbi: 32, h: 94, sb: 29, obp: '.337', slg: '.339' },
  'ryu-ji-hyuk': { avg: '.248', hr: 2, rbi: 28, h: 82, sb: 14, obp: '.321', slg: '.322' },
  'park-gye-beom': { avg: '.241', hr: 3, rbi: 25, h: 70, sb: 6, obp: '.301', slg: '.318' },
  'kim-young-woong': { avg: '.243', hr: 15, rbi: 52, h: 80, sb: 5, obp: '.312', slg: '.431' },
  'lee-seong-gyu': { avg: '.236', hr: 10, rbi: 35, h: 60, sb: 4, obp: '.298', slg: '.402' },
  'oh-jae-il': { avg: '.232', hr: 7, rbi: 30, h: 55, sb: 1, obp: '.309', slg: '.365' },
}

export const PITCHER_STATS: Record<string, PitcherStats> = {
  'won-tae-in': { era: '2.31', w: 11, l: 5, sv: 0, hld: 0, ip: '132.1', k: 134 },
  'choi-chae-heung': { era: '2.87', w: 9, l: 6, sv: 0, hld: 0, ip: '115.2', k: 98 },
  'buchanan': { era: '3.15', w: 8, l: 7, sv: 0, hld: 0, ip: '108.0', k: 112 },
  'lee-seung-hyun': { era: '3.44', w: 6, l: 4, sv: 0, hld: 9, ip: '81.0', k: 77 },
  'reyes': { era: '3.78', w: 7, l: 8, sv: 0, hld: 0, ip: '102.1', k: 89 },
  'oh-seung-hwan': { era: '1.92', w: 3, l: 2, sv: 28, hld: 0, ip: '42.0', k: 48 },
  'kim-tae-hoon': { era: '2.54', w: 4, l: 1, sv: 7, hld: 14, ip: '35.1', k: 41 },
  'jang-pil-jun': { era: '3.21', w: 2, l: 3, sv: 3, hld: 11, ip: '28.0', k: 30 },
}

export const PITCHERS = PLAYERS.filter((p) => p.group === '투수')
export const BATTERS = PLAYERS.filter((p) => p.group !== '투수')

/** 선수 상세 화면에서만 쓰는 부가 정보 (현재는 이재현 1명만 작성) */
export interface PlayerProfile {
  nameEn: string
  birth: string
  height: string
  weight: string
  school: string
  debut: string
  entranceSong: string
  cheer: string
  history: { season: string; avg: string; hr: number; rbi: number; h: number }[]
}

export const PLAYER_PROFILES: Record<string, PlayerProfile> = {
  'lee-jae-hyun': {
    nameEn: 'Lee Jae-hyun',
    birth: '2003.02.04',
    height: '181cm',
    weight: '78kg',
    school: '서울고 → 삼성라이온즈',
    debut: '2022',
    entranceSong: 'Believer · Imagine Dragons',
    cheer: '날아라 이재현, 사자처럼 달려라\n라이온즈의 힘, 이재현 파이팅!',
    history: [
      { season: '2025', avg: '.289', hr: 12, rbi: 55, h: 104 },
      { season: '2024', avg: '.274', hr: 9, rbi: 47, h: 96 },
      { season: '2023', avg: '.262', hr: 6, rbi: 38, h: 82 },
      { season: '2022', avg: '.241', hr: 4, rbi: 29, h: 71 },
    ],
  },
}

/** 앱 표기용 상태 — 어드민의 구분(kind) + 등록 상태(tier) */
export function playerStatus(p: Player) {
  return { kind: p.kind ?? '일반', tier: p.tier ?? '1군', injury: p.injury ?? '' }
}
