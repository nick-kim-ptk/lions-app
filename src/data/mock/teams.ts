export type TeamCode = 'SS' | 'LG' | 'OB' | 'KT' | 'SK' | 'LT' | 'HH' | 'HT' | 'NC' | 'WO'

export interface Team {
  code: TeamCode
  /** 롯데 */
  short: string
  /** 롯데 자이언츠 */
  name: string
  /** 구단 대표 색 (앱 UI의 이니셜 원형 등에 사용) */
  color: string
  /** 홈 구장 */
  stadium: string
}

export const TEAMS: Record<TeamCode, Team> = {
  SS: { code: 'SS', short: '삼성', name: '삼성 라이온즈', color: '#074CA1', stadium: '대구 삼성 라이온즈파크' },
  LG: { code: 'LG', short: 'LG', name: 'LG 트윈스', color: '#C30452', stadium: '서울 잠실야구장' },
  OB: { code: 'OB', short: '두산', name: '두산 베어스', color: '#131230', stadium: '서울 잠실야구장' },
  KT: { code: 'KT', short: 'KT', name: 'KT 위즈', color: '#1A1A1A', stadium: '수원 KT위즈파크' },
  SK: { code: 'SK', short: 'SSG', name: 'SSG 랜더스', color: '#CE0E2D', stadium: '인천 SSG랜더스필드' },
  LT: { code: 'LT', short: '롯데', name: '롯데 자이언츠', color: '#D00A23', stadium: '부산 사직야구장' },
  HH: { code: 'HH', short: '한화', name: '한화 이글스', color: '#FF6600', stadium: '대전 한화생명 볼파크' },
  HT: { code: 'HT', short: 'KIA', name: 'KIA 타이거즈', color: '#EA0029', stadium: '광주-기아 챔피언스 필드' },
  NC: { code: 'NC', short: 'NC', name: 'NC 다이노스', color: '#315288', stadium: '창원 NC파크' },
  WO: { code: 'WO', short: '키움', name: '키움 히어로즈', color: '#570514', stadium: '서울 고척스카이돔' },
}

export const MY_TEAM = TEAMS.SS

export const KBO_TEAM_NAMES = Object.values(TEAMS).map((t) => t.name)
