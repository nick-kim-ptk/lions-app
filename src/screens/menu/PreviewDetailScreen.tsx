import { useNavigate } from 'react-router-dom'
import { PH } from '@/components/Placeholder'
import { Header } from '@/components/Layout'

// 082(084)-SL-AL-28 프리뷰 상세
export function PreviewDetailScreen() {
  const navigate = useNavigate()
  return (
    <div className="min-h-full bg-[#F5F7FB] pb-8">
      <Header title="경기 프리뷰" />

      <div className="px-4 pt-5 flex flex-col gap-5">

        {/* 출처 + 제목 + 등록일 */}
        <div className="flex flex-col gap-2">
          <span className="text-[11px] text-[#9CA3AF]">삼성 라이온즈 공식</span>
          <div className="flex flex-col gap-1.5">
            <h1 className="text-[18px] font-black text-[#0E1A40] leading-snug">
              [16일 프리뷰] 삼성 마지막 잠실 나들이, 페덱이 승리 피날레 이끌까
            </h1>
            <span className="text-[12px] text-[#9CA3AF]">등록일 2026.09.16</span>
          </div>
        </div>

        {/* 구분선 */}
        <div className="h-px bg-[#DDE1EC]" />

        {/* 대표 이미지 */}
        <div className="w-full rounded-2xl overflow-hidden">
          <PH className="w-full h-52 rounded-none" />
        </div>

        {/* 본문 */}
        <div className="flex flex-col gap-4 text-[14px] text-[#374151] leading-relaxed">
          <p className="font-semibold text-[#0E1A40]">
            삼성의 마지막 잠실 나들이. 외국인투수 크리스 페덱이 승리 피날레를 이끌 수 있을까.
          </p>
          <p>
            프로야구 삼성 라이온즈는 16일 서울 잠실구장에서 열리는 2026 신한 SOL KBO리그 두산 베어스와의 시즌 13번째 맞대결을 앞두고 있다.
          </p>
          <p>
            2026시즌을 끝으로 철거가 확정된 잠실구장에서 치르는 삼성의 마지막 경기다. 삼성은 이번 시즌 LG 트윈스와 16차례 맞대결(8승 8패)을 모두 마쳤고, 두산과 이날 포함 4번의 만남이 남아 있다. 16일 잠실에 이어 내달 3일부터 5일까지 대구 3연전이 잡히면서 잠실 최종전을 치르게 됐다.
          </p>

          <p>
            선발 마운드에는 크리스 페덱이 오른다. 페덱은 올 시즌 25경기에 선발 등판해 13승 7패, 평균자책점 3.21을 기록 중이다. 특히 원정 경기에서 강한 면모를 보이며 팀의 든든한 에이스 역할을 해왔다.
          </p>
          <p>
            두산 타선은 리그 상위권의 득점력을 보유하고 있어 페덱의 제구력과 변화구 구사가 승패를 가를 핵심 변수가 될 전망이다. 삼성은 올 시즌 두산전 8승 4패로 우위를 점하고 있다.
          </p>

          <p className="text-[#9CA3AF] text-[12px] italic">
            ※ 이하 생략
          </p>
        </div>

        {/* 구분선 */}
        <div className="h-px bg-[#DDE1EC]" />

        {/* 목록 CTA */}
        <button
          onClick={() => navigate('/all/preview-list')}
          className="w-full h-12 rounded-2xl bg-[#0E1A40] text-white text-[15px] font-semibold"
        >
          목록
        </button>

      </div>
    </div>
  )
}
