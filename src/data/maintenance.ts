import { MOCK_TODAY, addDays, weekdayOf } from "@/data/mock/clock"

// 108-SL-CM-13 서비스 점검 — 점검 시작·종료 일시 (더미: 목업 기준일 새벽 점검)

const fmt = (date: string, time: string) =>
  `${date.replaceAll("-", ".")}(${weekdayOf(date)}) ${time}`

export const MAINTENANCE = {
  message: "현재 서비스 점검 중입니다.\n잠시 후 다시 이용해 주세요.",

  start: fmt(MOCK_TODAY, "02:00"),

  end: fmt(addDays(MOCK_TODAY, 0), "06:00"),
}
