"use client"

import { useStory } from "@/lib/story-context"
import { IconArt } from "./app-icon"

/* 앱 사용 중/홈 화면에서 위쪽에 내려오는 메시지 알림 배너 */
export function NotificationBanner({ onOpenThread }: { onOpenThread: (threadId: string) => void }) {
  const { banner, dismissBanner } = useStory()
  if (!banner) return null

  return (
    <div className="absolute inset-x-[8px] top-[8px] z-[70]" role="status">
      <button
        key={banner.id}
        type="button"
        onClick={() => {
          dismissBanner()
          onOpenThread(banner.threadId)
        }}
        className="ios-banner-in flex w-full items-start gap-[10px] rounded-[24px] bg-[rgba(245,245,248,0.82)] p-[12px] pr-[14px] text-left text-black shadow-[0_8px_30px_rgba(0,0,0,0.25)] backdrop-blur-2xl"
      >
        <IconArt id="messages" size={38} />
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-2">
            <span className="truncate text-[15px] font-semibold leading-[20px]">{banner.title}</span>
            <span className="shrink-0 text-[13px] text-black/50">지금</span>
          </div>
          <p className="truncate text-[15px] leading-[20px]">{banner.body}</p>
        </div>
      </button>
    </div>
  )
}
