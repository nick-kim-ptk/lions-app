import type { PlayerKind, PlayerTier } from '@/data/mock'

/** 선수 상태 배지 — 신입단 / 군입대 / 2군 / 부상(사유). 1군·일반은 기본 상태라 표시하지 않음 */
export function PlayerStatusBadge({ kind, tier, injury, size = 'sm' }: { kind: PlayerKind; tier: PlayerTier; injury?: string; size?: 'sm' | 'md' }) {
  const cls = size === 'sm' ? 'text-[8px] px-1 rounded' : 'text-[10px] px-2 py-0.5 rounded-full'
  return (
    <>
      {kind === '신입단' && <span className={`font-bold text-white bg-[#1B5BF0] ${cls}`}>신입단</span>}
      {kind === '군입대' && <span className={`font-bold text-white bg-[#64748B] ${cls}`}>군입대</span>}
      {kind !== '군입대' && tier === '2군' && <span className={`font-bold text-[#64748B] bg-[#E8EBF4] ${cls}`}>2군</span>}
      {kind !== '군입대' && tier === '부상' && <span className={`font-bold text-white bg-[#EF4444] ${cls}`}>부상{size === 'md' && injury ? ` : ${injury}` : ''}</span>}
    </>
  )
}
