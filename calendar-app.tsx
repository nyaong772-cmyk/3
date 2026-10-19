"use client"

/* 캘린더 앱 — 일정은 /data.ts 의 calendar 에서 고치세요. */

import { useState } from "react"
import { ChevronLeft, List, Plus, Search } from "lucide-react"
import { calendar } from "@/data"
import { cn } from "@/lib/utils"

const RED = "#ff3b30"
const WEEK = ["일", "월", "화", "수", "목", "금", "토"]
const COLORS: Record<string, string> = {
  red: "#ff3b30",
  blue: "#0a84ff",
  green: "#34c759",
  orange: "#ff9500",
  purple: "#af52de",
}

const keyOf = (day: number) =>
  `${calendar.year}-${String(calendar.month).padStart(2, "0")}-${String(day).padStart(2, "0")}`

export function CalendarApp() {
  const [selected, setSelected] = useState(calendar.today)
  const firstWeekday = new Date(calendar.year, calendar.month - 1, 1).getDay()
  const daysInMonth = new Date(calendar.year, calendar.month, 0).getDate()
  const cells: (number | null)[] = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]
  const events = calendar.events.filter((e) => e.date === keyOf(selected))

  return (
    <div className="absolute inset-0 bg-white">
      <div className="absolute inset-0 overflow-y-auto pb-[100px] pt-[54px] no-scrollbar">
        <div className="flex h-[44px] items-center justify-between px-[8px]" style={{ color: RED }}>
          <span className="flex items-center text-[17px]">
            <ChevronLeft className="h-[30px] w-[30px]" strokeWidth={2.4} aria-hidden />
            {`${calendar.year}년`}
          </span>
          <div className="flex items-center gap-[20px] pr-[8px]">
            <List className="h-[22px] w-[22px]" aria-label="목록" />
            <Search className="h-[22px] w-[22px]" aria-label="검색" />
            <Plus className="h-[24px] w-[24px]" aria-label="일정 추가" />
          </div>
        </div>

        <div className="grid grid-cols-7 border-b border-black/10 px-[6px] pb-[6px] text-center text-[11px] text-black/60">
          {WEEK.map((d, i) => (
            <span key={d} className={cn(i === 0 || i === 6 ? "text-[#8e8e93]" : "")}>
              {d}
            </span>
          ))}
        </div>

        <h2 className="px-[16px] pt-[12px] text-[28px] font-bold text-black">{`${calendar.month}월`}</h2>

        <div className="grid grid-cols-7 px-[6px] pt-[4px]">
          {cells.map((day, i) => {
            if (!day) return <span key={`e-${i}`} />
            const isToday = day === calendar.today
            const isSel = day === selected
            const dots = calendar.events.filter((e) => e.date === keyOf(day))
            const weekend = i % 7 === 0 || i % 7 === 6
            return (
              <button
                key={day}
                type="button"
                onClick={() => setSelected(day)}
                className="flex h-[54px] flex-col items-center border-t border-black/5 pt-[6px]"
                aria-label={`${calendar.month}월 ${day}일`}
                aria-pressed={isSel}
              >
                <span
                  className={cn(
                    "flex h-[32px] w-[32px] items-center justify-center rounded-full text-[19px]",
                    isSel && isToday && "bg-[#ff3b30] font-semibold text-white",
                    isSel && !isToday && "bg-black font-semibold text-white",
                    !isSel && isToday && "font-semibold text-[#ff3b30]",
                    !isSel && !isToday && (weekend ? "text-[#8e8e93]" : "text-black"),
                  )}
                >
                  {day}
                </span>
                {dots.length > 0 ? <span className="mt-[2px] h-[6px] w-[6px] rounded-full bg-[#8e8e93]" /> : null}
              </button>
            )
          })}
        </div>

        <div className="mt-[10px] border-t border-black/10 px-[16px] pt-[12px]">
          {events.length === 0 ? (
            <p className="py-[20px] text-center text-[15px] text-[#8e8e93]">이벤트 없음</p>
          ) : (
            <ul className="flex flex-col gap-[10px]">
              {events.map((e) => (
                <li key={e.title} className="flex gap-[10px]">
                  <span className="w-[4px] rounded-full" style={{ background: COLORS[e.color] ?? COLORS.blue }} />
                  <div className="py-[2px]">
                    <p className="text-[17px] font-semibold text-black">{e.title}</p>
                    <p className="text-[15px] text-[#8e8e93]">{e.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-black/10 bg-[#f9f9f9]/90 px-[20px] pb-[34px] pt-[10px] text-[17px] backdrop-blur-xl" style={{ color: RED }}>
        <span>오늘</span>
        <span>캘린더</span>
        <span>받은 편지함</span>
      </div>
    </div>
  )
}
