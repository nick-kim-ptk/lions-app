// 앰블럼 마스터 (이름 + 설명). 내 앰블럼·MY 홈·변동 내역이 공용으로 사용
export interface Emblem {
  name: string
  desc: string
  emoji: string
  color: string
  /** 획득 조건 (예시 — 확정 시 수정) */
  cond: string
  count: number // 보유 수량(더미)
}

export const EMBLEMS: Emblem[] = [
  { name: '사지선다왕', cond: '오늘의 미션 사지선다 정답 시 1개 지급', desc: '찍기의 신, 퀴즈 마술사', emoji: '🎯', color: 'from-[#1B5BF0] to-[#6EC6FF]', count: 10 },
  { name: 'OX 감별사', cond: '오늘의 미션 OX퀴즈 정답 시 1개 지급', desc: '둘 중 하나는 확률 100%', emoji: '⭕', color: 'from-[#E53935] to-[#FF8A65]', count: 5 },
  { name: '승부사', cond: '오늘의 미션 VS선택 정답 시 1개 지급', desc: '근거는 없어도 촉은 있다', emoji: '🎲', color: 'from-[#F0A500] to-[#FFD966]', count: 3 },
  { name: '예언가', cond: '오늘의 미션 예측형(경기 점수 맞히기) 정답 시 1개 지급', desc: '앞 내다보는 승부사', emoji: '🔮', color: 'from-[#7B3FF0] to-[#B9A0FF]', count: 2 },
  { name: '블루 메이트', cond: '블루 시그널 이벤트 당첨 시 지급', desc: '특별한 순간을 함께해요', emoji: '💙', color: 'from-[#0E2F80] to-[#1B5BF0]', count: 1 },
  { name: '10번째 선수', cond: '함께 만드는 V9에 직관·집관 기록을 남길 때마다 1개 지급', desc: '그라운드 밖에서 함께 뛰어요', emoji: '🦁', color: 'from-[#00B894] to-[#6EE7B7]', count: 1 },
]

export const EMBLEM_TOTAL = EMBLEMS.reduce((s, e) => s + e.count, 0)
