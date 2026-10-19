"use client"

import { Camera, Compass, MessageCircle, Music2, Navigation, Phone, Settings, Sun, Cloud } from "lucide-react"
import { phone } from "@/data"
import { cn } from "@/lib/utils"
import type { AppId, OpenOrigin } from "./types"

/* iOS 스타일 앱 아이콘 그림 (둥근 사각형) */
export function IconArt({ id, size }: { id: AppId; size: number }) {
  const s = size
  const base = "relative flex items-center justify-center overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.25)]"
  const style = { width: s, height: s, borderRadius: s * 0.225 }

  switch (id) {
    case "messages":
      return (
        <div className={cn(base, "bg-gradient-to-b from-[#67f77d] to-[#0bbd29]")} style={style}>
          <MessageCircle fill="white" stroke="white" strokeWidth={1} style={{ width: s * 0.62, height: s * 0.62 }} className="-scale-x-100" />
        </div>
      )
    case "phone":
      return (
        <div className={cn(base, "bg-gradient-to-b from-[#67f77d] to-[#0bbd29]")} style={style}>
          <Phone fill="white" stroke="white" strokeWidth={0.5} style={{ width: s * 0.5, height: s * 0.5 }} />
        </div>
      )
    case "instagram":
      return (
        <div
          className={base}
          style={{
            ...style,
            background:
              "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285aeb 90%)",
          }}
        >
          <div className="relative rounded-[30%] border-white" style={{ width: s * 0.6, height: s * 0.6, borderWidth: s * 0.06 }}>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-white" style={{ width: s * 0.26, height: s * 0.26, borderWidth: s * 0.055 }} />
            <div className="absolute rounded-full bg-white" style={{ width: s * 0.07, height: s * 0.07, right: s * 0.05, top: s * 0.05 }} />
          </div>
        </div>
      )
    case "music":
      return (
        <div className={cn(base, "bg-gradient-to-b from-[#fd6077] to-[#fa233b]")} style={style}>
          <Music2 stroke="white" strokeWidth={2.6} style={{ width: s * 0.55, height: s * 0.55 }} />
        </div>
      )
    case "photos": {
      const colors = ["#f9a33b", "#f6d530", "#9bd247", "#3ec7a5", "#3d9fe0", "#8b6ad8", "#d559b3", "#f2554f"]
      return (
        <div className={cn(base, "bg-white")} style={style}>
          {colors.map((c, i) => (
            <span
              key={c}
              className="absolute left-1/2 top-1/2 rounded-full mix-blend-multiply"
              style={{
                width: s * 0.2,
                height: s * 0.36,
                background: c,
                opacity: 0.88,
                transformOrigin: "50% 100%",
                transform: `translate(-50%, -100%) rotate(${i * 45}deg)`,
              }}
            />
          ))}
        </div>
      )
    }
    case "notes":
      return (
        <div className={cn(base, "flex-col items-stretch justify-start bg-white")} style={style}>
          <div className="bg-gradient-to-b from-[#fde27a] to-[#fbc93d]" style={{ height: s * 0.28 }} />
          <div className="border-b border-dashed border-[#c9c9c9]" style={{ marginInline: s * 0.1 }} />
          {[0, 1, 2].map((i) => (
            <div key={i} className="bg-[#dcdcdc]" style={{ height: 1, marginInline: s * 0.1, marginTop: s * 0.15 }} />
          ))}
        </div>
      )
    case "calendar":
      return (
        <div className={cn(base, "flex-col bg-white")} style={style}>
          <span className="font-semibold leading-none text-[#ff3b30]" style={{ fontSize: s * 0.17, marginTop: s * 0.04 }}>
            {phone.weekday}
          </span>
          <span className="font-light leading-none text-black" style={{ fontSize: s * 0.52, marginTop: s * 0.02 }}>
            {phone.dayNumber}
          </span>
        </div>
      )
    case "safari":
      return (
        <div className={cn(base, "bg-white")} style={style}>
          <div className="flex items-center justify-center rounded-full bg-gradient-to-b from-[#1ec8ff] to-[#1a6cf2]" style={{ width: s * 0.82, height: s * 0.82 }}>
            <Compass stroke="white" strokeWidth={1.4} style={{ width: s * 0.72, height: s * 0.72 }} />
          </div>
        </div>
      )
    case "camera":
      return (
        <div className={cn(base, "bg-gradient-to-b from-[#e8e8ea] to-[#a3a3a8]")} style={style}>
          <Camera stroke="#3a3a3c" strokeWidth={1.8} style={{ width: s * 0.58, height: s * 0.58 }} />
        </div>
      )
    case "settings":
      return (
        <div className={cn(base, "bg-gradient-to-b from-[#a1a1a6] to-[#6e6e73]")} style={style}>
          <Settings stroke="#e9e9ee" strokeWidth={1.6} style={{ width: s * 0.72, height: s * 0.72 }} />
        </div>
      )
    case "clock":
      return (
        <div className={cn(base, "bg-black")} style={style}>
          <svg viewBox="0 0 100 100" style={{ width: s * 0.86, height: s * 0.86 }} aria-hidden>
            <circle cx="50" cy="50" r="48" fill="white" />
            {Array.from({ length: 12 }).map((_, i) => (
              <line key={i} x1="50" y1="6" x2="50" y2="12" stroke="#333" strokeWidth="3" transform={`rotate(${i * 30} 50 50)`} />
            ))}
            <line x1="50" y1="50" x2="50" y2="24" stroke="black" strokeWidth="5" strokeLinecap="round" transform="rotate(70 50 50)" />
            <line x1="50" y1="50" x2="50" y2="14" stroke="black" strokeWidth="3.5" strokeLinecap="round" transform="rotate(84 50 50)" />
            <line x1="50" y1="58" x2="50" y2="12" stroke="#ff9500" strokeWidth="1.8" transform="rotate(200 50 50)" />
            <circle cx="50" cy="50" r="3.5" fill="#ff9500" />
          </svg>
        </div>
      )
    case "weather":
      return (
        <div className={cn(base, "bg-gradient-to-b from-[#4aaaf7] to-[#1d6fe0]")} style={style}>
          <Sun fill="#ffd60a" stroke="#ffd60a" className="absolute" style={{ width: s * 0.42, height: s * 0.42, left: s * 0.18, top: s * 0.16 }} />
          <Cloud fill="white" stroke="white" className="absolute" style={{ width: s * 0.52, height: s * 0.52, left: s * 0.28, top: s * 0.34 }} />
        </div>
      )
    case "kakao":
      return (
        <div className={cn(base, "bg-[#fee500]")} style={style}>
          <div className="relative flex items-center justify-center rounded-[50%] bg-[#3c1e1e]" style={{ width: s * 0.72, height: s * 0.56 }}>
            <span className="font-extrabold tracking-tight text-[#fee500]" style={{ fontSize: s * 0.17 }}>
              TALK
            </span>
            <span
              className="absolute bg-[#3c1e1e]"
              style={{ width: s * 0.12, height: s * 0.12, left: s * 0.12, bottom: -s * 0.05, clipPath: "polygon(0 0, 100% 0, 10% 100%)" }}
            />
          </div>
        </div>
      )
    case "maps":
      return (
        <div className={cn(base, "bg-gradient-to-br from-[#d7f0c2] via-[#f6efd9] to-[#aee0f5]")} style={style}>
          <div className="absolute h-[22%] w-[140%] rotate-[-35deg] bg-[#fbd96b]" />
          <div className="flex items-center justify-center rounded-full bg-[#0a84ff] shadow" style={{ width: s * 0.42, height: s * 0.42 }}>
            <Navigation fill="white" stroke="white" style={{ width: s * 0.22, height: s * 0.22 }} />
          </div>
        </div>
      )
  }
}

/* 홈 화면용 아이콘 버튼 (눌림 애니메이션 + 빨간 숫자 배지) */
export function AppIcon({
  id,
  label,
  name,
  badge,
  size = 62,
  onOpen,
}: {
  id: AppId
  label?: string
  name?: string
  badge?: number
  size?: number
  onOpen: (id: AppId, origin: OpenOrigin) => void
}) {
  return (
    <button
      type="button"
      aria-label={name ?? label ?? id}
      onTouchStart={() => {}}
      onClick={(e) => {
        const screenEl = e.currentTarget.closest("[data-phone-screen]") as HTMLElement | null
        const screen = screenEl?.getBoundingClientRect()
        const zoom = screen && screenEl?.offsetWidth ? screen.width / screenEl.offsetWidth : 1
        const r = e.currentTarget.getBoundingClientRect()
        const x = screen ? (r.left + r.width / 2 - screen.left) / zoom : 0
        const y = screen ? (r.top - screen.top) / zoom + size / 2 : 0
        onOpen(id, { x, y })
      }}
      className="ios-press flex flex-col items-center gap-[5px] outline-none"
    >
      <span className="relative block shrink-0" style={{ width: size, height: size }}>
        <IconArt id={id} size={size} />
        {badge ? (
          <span className="absolute -right-[7px] -top-[7px] flex h-[23px] min-w-[23px] items-center justify-center rounded-full bg-[#ff3b30] px-[6px] text-[14px] font-medium text-white">
            {badge}
          </span>
        ) : null}
      </span>
      {label ? (
        <span className="max-w-[76px] truncate text-[12px] font-medium leading-[14px] text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.35)]">
          {label}
        </span>
      ) : null}
    </button>
  )
}
