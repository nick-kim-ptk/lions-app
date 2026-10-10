import { PHImage } from "@/components/Placeholder"

/** 층 평면도 자리 + (선택 시) 매장 위치 핀 */
export function FloorMap({
  label,
  pin,
}: {
  label: string
  pin?: { x: number; y: number }
}) {
  return (
    <div className="relative h-full w-full">
      <PHImage className="h-full" rounded="rounded-2xl" label={label} />
      {pin && (
        <span
          className="absolute -translate-x-1/2 -translate-y-full text-[28px] leading-none drop-shadow"
          style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
        >
          📍
        </span>
      )}
    </div>
  )
}
