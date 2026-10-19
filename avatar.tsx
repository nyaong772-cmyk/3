import { cn } from "@/lib/utils"

/* 연락처 프로필 동그라미. 사진이 없으면 iOS 기본 회색 실루엣이 나와요. */
export function Avatar({ src, name, size = 45, className }: { src?: string; name: string; size?: number; className?: string }) {
  if (src) {
    return (
      <img
        src={src || "/placeholder.svg"}
        alt={`${name} 프로필 사진`}
        width={size}
        height={size}
        className={cn("shrink-0 rounded-full object-cover", className)}
        style={{ width: size, height: size }}
      />
    )
  }
  return (
    <div
      aria-hidden
      className={cn("relative shrink-0 overflow-hidden rounded-full bg-gradient-to-b from-[#a8adb8] to-[#868a95]", className)}
      style={{ width: size, height: size }}
    >
      <div className="absolute left-1/2 top-[22%] h-[34%] w-[34%] -translate-x-1/2 rounded-full bg-white/95" />
      <div className="absolute -bottom-[18%] left-1/2 h-[48%] w-[66%] -translate-x-1/2 rounded-full bg-white/95" />
    </div>
  )
}
