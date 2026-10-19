"use client"

/* 전화 앱 — 통화 기록은 /data.ts 의 callHistory 에서 고치세요. */

import { useState } from "react"
import { Clock, Grid3x3, Info, PhoneIncoming, PhoneOutgoing, Star, UserCircle, Voicemail } from "lucide-react"
import { callHistory } from "@/data"
import { cn } from "@/lib/utils"
import { LargeTitle, TabBar } from "./ios-ui"

export function PhoneApp() {
  const [filter, setFilter] = useState<"all" | "missed">("all")
  const list = filter === "all" ? callHistory : callHistory.filter((c) => c.type === "missed")

  return (
    <div className="absolute inset-0 bg-white">
      <div className="absolute inset-0 overflow-y-auto pb-[100px] pt-[54px] no-scrollbar">
        <div className="flex h-[44px] items-center justify-between px-4">
          <span className="w-[40px]" />
          <div className="flex rounded-[9px] bg-[#7676801f] p-[2px] text-[13px] font-semibold" role="tablist">
            {(["all", "missed"] as const).map((f) => (
              <button
                key={f}
                type="button"
                role="tab"
                aria-selected={filter === f}
                onClick={() => setFilter(f)}
                className={cn(
                  "w-[88px] rounded-[7px] py-[5px] transition-all",
                  filter === f ? "bg-white shadow-[0_2px_6px_rgba(0,0,0,0.12)]" : "text-black/80",
                )}
              >
                {f === "all" ? "모두" : "부재중"}
              </button>
            ))}
          </div>
          <span className="w-[40px] text-right text-[17px] text-[#0a84ff]">편집</span>
        </div>
        <LargeTitle className="mt-[4px]">최근 항목</LargeTitle>

        <ul className="mt-[6px]">
          {list.map((c, i) => {
            const missed = c.type === "missed"
            return (
              <li key={`${c.name}-${i}`} className="flex items-center pl-[16px]">
                <span className="flex w-[22px] shrink-0 justify-start text-[#8e8e93]">
                  {c.type === "outgoing" ? <PhoneOutgoing className="h-[14px] w-[14px]" aria-label="발신" /> : null}
                  {c.type === "incoming" ? <PhoneIncoming className="h-[14px] w-[14px] opacity-0" aria-hidden /> : null}
                </span>
                <div className="flex min-w-0 flex-1 items-center border-b border-[#c6c6c8]/60 py-[8px] pr-[14px]">
                  <div className="min-w-0 flex-1">
                    <p className={cn("truncate text-[17px] font-semibold leading-[22px]", missed ? "text-[#ff3b30]" : "text-black")}>
                      {c.name}
                      {c.count > 1 ? ` (${c.count})` : ""}
                    </p>
                    <p className="text-[15px] leading-[20px] text-[#8e8e93]">{c.label}</p>
                  </div>
                  <span className="mr-[10px] text-[15px] text-[#8e8e93]">{c.time}</span>
                  <Info className="h-[22px] w-[22px] text-[#0a84ff]" strokeWidth={1.8} aria-label="정보" />
                </div>
              </li>
            )
          })}
        </ul>
      </div>

      <TabBar
        items={[
          { label: "즐겨찾기", icon: Star },
          { label: "최근 항목", icon: Clock, active: true },
          { label: "연락처", icon: UserCircle },
          { label: "키패드", icon: Grid3x3 },
          { label: "음성 사서함", icon: Voicemail },
        ]}
      />
    </div>
  )
}
