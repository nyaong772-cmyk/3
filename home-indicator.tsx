"use client"

import { useRef } from "react"
import { cn } from "@/lib/utils"

/* 화면 맨 아래 가로 막대(홈 인디케이터).
 * 앱 안에서 누르거나 위로 쓸어올리면 홈 화면으로 돌아갑니다. */
export function HomeIndicator({ tone, onHome }: { tone: "light" | "dark"; onHome?: () => void }) {
  const startY = useRef<number | null>(null)

  return (
    <button
      type="button"
      aria-label="홈으로 가기"
      disabled={!onHome}
      onClick={onHome}
      onPointerDown={(e) => (startY.current = e.clientY)}
      onPointerUp={(e) => {
        if (startY.current !== null && startY.current - e.clientY > 30) onHome?.()
        startY.current = null
      }}
      className="absolute bottom-0 left-1/2 z-50 flex h-[34px] w-[200px] -translate-x-1/2 items-end justify-center pb-[8px] disabled:cursor-default"
    >
      <span
        className={cn(
          "block h-[5px] w-[134px] rounded-full transition-colors duration-300",
          tone === "light" ? "bg-white" : "bg-black",
        )}
      />
    </button>
  )
}
