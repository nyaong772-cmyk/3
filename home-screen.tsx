"use client"

import { Search } from "lucide-react"
import { appLabels, calendar, callHistory, phone } from "@/data"
import { useStory } from "@/lib/story-context"
import { usePhoneClock } from "@/lib/use-phone-clock"
import { cn } from "@/lib/utils"
import { AppIcon } from "./app-icon"
import type { AppId, OpenOrigin } from "./types"

/* 홈 화면 앱 배치 — 순서를 바꾸고 싶으면 아래 배열 안의 순서를 바꾸세요. */
const GRID_APPS: AppId[] = [
  "instagram",
  "kakao",
  "photos",
  "music",
  "notes",
  "calendar",
  "weather",
  "clock",
  "maps",
  "settings",
]
const DOCK_APPS: AppId[] = ["phone", "safari", "messages", "camera"]

export function HomeScreen({
  onOpen,
  dimmed,
  entering,
}: {
  onOpen: (id: AppId, origin: OpenOrigin) => void
  dimmed: boolean
  entering: boolean
}) {
  const { totalUnread } = useStory()
  const missedCalls = callHistory.filter((c) => c.type === "missed").reduce((sum, c) => sum + c.count, 0)

  const badges: Partial<Record<AppId, number>> = {
    messages: totalUnread,
    phone: missedCalls,
  }

  return (
    <section
      aria-label="홈 화면"
      className="absolute inset-0 z-0 overflow-hidden"
    >
      <img src={phone.homeWallpaper || "/placeholder.svg"} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-black/10" />

      <div
        className={cn(
          "relative flex h-full flex-col px-[22px] pt-[70px] transition-transform duration-500 ease-out",
          entering && "ios-home-in",
          dimmed && "scale-[0.92]",
        )}
      >
        <div className="flex justify-between px-[6px]">
          <ClockWidget />
          <CalendarWidget />
        </div>

        <div className="mt-[26px] grid grid-cols-4 gap-x-[16px] gap-y-[24px] justify-items-center">
          {GRID_APPS.map((id) => (
            <AppIcon key={id} id={id} label={appLabels[id]} badge={badges[id]} onOpen={onOpen} />
          ))}
        </div>

        <div className="mt-auto flex justify-center pb-[14px]">
          <div className="flex items-center gap-1 rounded-full bg-white/25 px-3 py-[5px] text-[12px] font-medium text-white backdrop-blur-xl">
            <Search className="h-3 w-3" strokeWidth={3} aria-hidden />
            검색
          </div>
        </div>

        <nav
          aria-label="Dock"
          className="-mx-[10px] mb-[10px] grid grid-cols-4 justify-items-center rounded-[34px] bg-white/25 px-[14px] py-[16px] backdrop-blur-2xl"
        >
          {DOCK_APPS.map((id) => (
            <AppIcon key={id} id={id} name={appLabels[id]} badge={badges[id]} onOpen={onOpen} />
          ))}
        </nav>
      </div>
    </section>
  )
}

function ClockWidget() {
  const { hours, minutes } = usePhoneClock()
  const hourDeg = ((hours % 12) + minutes / 60) * 30
  const minDeg = minutes * 6

  return (
    <div className="flex flex-col items-center gap-[5px]">
      <div className="flex h-[158px] w-[158px] items-center justify-center rounded-[22px] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.15)]">
        <svg viewBox="0 0 100 100" className="h-[140px] w-[140px]" role="img" aria-label="시계 위젯">
          {Array.from({ length: 12 }).map((_, i) => (
            <text
              key={i}
              x={50 + 38 * Math.sin(((i + 1) * Math.PI) / 6)}
              y={50 - 38 * Math.cos(((i + 1) * Math.PI) / 6) + 4}
              textAnchor="middle"
              fontSize="11"
              fontWeight="500"
              fill="#111"
            >
              {i + 1}
            </text>
          ))}
          <line x1="50" y1="50" x2="50" y2="28" stroke="#111" strokeWidth="4" strokeLinecap="round" transform={`rotate(${hourDeg} 50 50)`} />
          <line x1="50" y1="50" x2="50" y2="17" stroke="#111" strokeWidth="3" strokeLinecap="round" transform={`rotate(${minDeg} 50 50)`} />
          <line x1="50" y1="58" x2="50" y2="14" stroke="#ff9500" strokeWidth="1.2" transform="rotate(168 50 50)" />
          <circle cx="50" cy="50" r="3" fill="#ff9500" />
          <text x="50" y="70" textAnchor="middle" fontSize="8" fontWeight="600" fill="#8e8e93">
            서울
          </text>
        </svg>
      </div>
      <span className="text-[12px] font-medium text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.35)]">시계</span>
    </div>
  )
}

function CalendarWidget() {
  const todayKey = `${calendar.year}-${String(calendar.month).padStart(2, "0")}-${String(calendar.today).padStart(2, "0")}`
  const todays = calendar.events.filter((e) => e.date === todayKey)

  return (
    <div className="flex flex-col items-center gap-[5px]">
      <div className="flex h-[158px] w-[158px] flex-col rounded-[22px] bg-white p-[14px] shadow-[0_2px_10px_rgba(0,0,0,0.15)]">
        <span className="text-[12px] font-semibold uppercase leading-none text-[#ff3b30]">{phone.weekday}</span>
        <span className="mt-[2px] text-[38px] font-light leading-none text-black">{phone.dayNumber}</span>
        <div className="mt-auto flex flex-col gap-[4px]">
          {todays.length === 0 ? (
            <span className="text-[12px] text-[#8e8e93]">오늘 일정 없음</span>
          ) : (
            todays.slice(0, 2).map((e) => (
              <div key={e.title} className="flex gap-[6px]">
                <span className="w-[3px] shrink-0 rounded-full bg-[#0a84ff]" />
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-semibold leading-tight text-black">{e.title}</p>
                  <p className="text-[12px] leading-tight text-[#8e8e93]">{e.time}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <span className="text-[12px] font-medium text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.35)]">캘린더</span>
    </div>
  )
}
