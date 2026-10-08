import { CaseSelect } from './CaseSelect'

export type ListCase = '목록 있음' | '목록 없음'

/** 목록형 화면의 빈 상태 확인용 케이스 전환 (와이어프레임 전용, 빨간 점선 드롭다운) */
export function ListCaseBar({ value, onChange }: { value: ListCase; onChange: (v: ListCase) => void }) {
  return (
    <div className="flex justify-end px-4 pt-3">
      <CaseSelect value={value} options={['목록 있음', '목록 없음'] as const} onChange={onChange} />
    </div>
  )
}
