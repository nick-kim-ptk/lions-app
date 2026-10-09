import { useNavigate, useSearchParams } from "react-router-dom"

import { PlayerDetailContent } from "@/components/PlayerDetailContent"

// 064(066)-SL-AL-10 선수별 개인 페이지  —  /all/player-detail?id=<playerId>

export function PlayerDetailScreen() {
  const navigate = useNavigate()

  const [params] = useSearchParams()

  return (
    <div className="fixed inset-0 lg:top-[72px] lg:inset-x-auto lg:left-1/2 lg:-translate-x-1/2 lg:w-full lg:max-w-[1440px] bg-[#F5F7FB] overflow-y-auto">
      <PlayerDetailContent
        playerId={params.get("id") ?? undefined}
        onClose={() => navigate(-1)}
      />
    </div>
  )
}
