"use client"

import { phone } from "@/data"
import { usePhoneClock } from "@/lib/use-phone-clock"
import { cn } from "@/lib/utils"

/* 화면 맨 위 상태바 (시간 · 신호 · 와이파이 · 배터리)
 * 배터리/통신사 값은 data.ts 의 phone 에서 바꿀 수 있어요. */
export function StatusBar({ tone, showCarrier }: { tone: "light" | "dark"; showCarrier?: boolean }) {
  const { time } = usePhoneClock()
  const color = tone === "light" ? "text-white" : "text-black"
  const low = phone.batteryPercent <= 20

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-x-0 top-0 z-50 flex h-[54px] items-center justify-between pl-[34px] pr-[26px] pt-[6px] transition-colors duration-300",
        color,
      )}
    >
      <span className="w-[86px] text-center text-[17px] font-semibold tracking-tight">
        {showCarrier ? <span className="text-[15px]">{phone.carrier}</span> : time}
      </span>
      <div className="flex items-center gap-[6px]">
        <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor" aria-hidden>
          <rect x="0" y="8" width="3" height="4" rx="1" />
          <rect x="5" y="5.5" width="3" height="6.5" rx="1" />
          <rect x="10" y="3" width="3" height="9" rx="1" />
          <rect x="15" y="0" width="3" height="12" rx="1" opacity="0.35" />
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor" aria-hidden>
          <path d="M8 2.4c2.3 0 4.4.9 6 2.4l1.1-1.2A10.2 10.2 0 0 0 8 .8C5.3.8 2.8 1.8.9 3.6L2 4.8a8.6 8.6 0 0 1 6-2.4Z" />
          <path d="M8 5.6c1.4 0 2.7.5 3.7 1.4l1.1-1.2A7 7 0 0 0 8 4a7 7 0 0 0-4.8 1.8L4.3 7A5.4 5.4 0 0 1 8 5.6Z" />
          <path d="M8 8.8c.6 0 1.1.2 1.5.6L8 11.2 6.5 9.4c.4-.4.9-.6 1.5-.6Z" />
        </svg>
        <span className="sr-only">{`배터리 ${phone.batteryPercent}%`}</span>
        <div className="relative flex items-center" aria-hidden>
          <div className="relative h-[13px] w-[25px] rounded-[4px] border border-current/40 p-[1.5px] opacity-100">
            <div
              className={cn("h-full rounded-[2px]", low ? "bg-[#ff3b30]" : "bg-current")}
              style={{ width: `${Math.max(8, phone.batteryPercent)}%` }}
            />
          </div>
          <div className="ml-[1px] h-[4px] w-[1.5px] rounded-r-sm bg-current opacity-40" />
        </div>
      </div>
    </div>
  )
}
