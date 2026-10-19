import type React from "react"
import { Mic, Search } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

/* 여러 앱에서 같이 쓰는 iOS 기본 부품들 */

export function LargeTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h1 className={cn("px-4 text-[34px] font-bold leading-[41px] tracking-tight text-black", className)}>{children}</h1>
}

export function SearchField({ placeholder = "검색", className }: { placeholder?: string; className?: string }) {
  return (
    <div className={cn("mx-4 flex h-[36px] items-center gap-[6px] rounded-[10px] bg-[#7676801f] px-[8px] text-[#8e8e93]", className)}>
      <Search className="h-[16px] w-[16px]" strokeWidth={2.4} aria-hidden />
      <span className="flex-1 text-[17px]">{placeholder}</span>
      <Mic className="h-[16px] w-[16px]" strokeWidth={2.2} aria-hidden />
    </div>
  )
}

export type TabItem = { label: string; icon: LucideIcon; active?: boolean }

export function TabBar({ items, activeColor = "#0a84ff" }: { items: TabItem[]; activeColor?: string }) {
  return (
    <nav className="absolute inset-x-0 bottom-0 z-10 flex border-t border-black/10 bg-[#f9f9f9]/90 pb-[30px] pt-[7px] backdrop-blur-xl">
      {items.map((item) => {
        const Icon = item.icon
        return (
          <div
            key={item.label}
            className="flex flex-1 flex-col items-center gap-[3px]"
            style={{ color: item.active ? activeColor : "#999999" }}
            aria-current={item.active ? "page" : undefined}
          >
            <Icon className="h-[24px] w-[24px]" strokeWidth={item.active ? 2.4 : 2} aria-hidden />
            <span className="text-[10px] font-medium">{item.label}</span>
          </div>
        )
      })}
    </nav>
  )
}
