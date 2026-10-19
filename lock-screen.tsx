"use client"

import { useEffect, useRef, useState } from "react"
import { Camera, Flashlight, Lock, LockOpen } from "lucide-react"
import { lockNotifications, phone } from "@/data"
import { usePhoneClock } from "@/lib/use-phone-clock"
import { cn } from "@/lib/utils"
import { IconArt } from "./app-icon"
import type { AppId } from "./types"

/* 잠금화면
 * - 배경사진: data.ts → phone.lockWallpaper
 * - 알림 내용/순서/간격: data.ts → lockNotifications */
export function LockScreen({ onUnlocked }: { onUnlocked: () => void }) {
  const { time, date } = usePhoneClock()
  const [visibleCount, setVisibleCount] = useState(0)
  const [dragY, setDragY] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [leaving, setLeaving] = useState(false)
  const [torch, setTorch] = useState(false)
  const startY = useRef<number | null>(null)

  useEffect(() => {
    let total = 0
    const timers = lockNotifications.map((n, i) => {
      total += n.delay
      return setTimeout(() => setVisibleCount(i + 1), total)
    })
    return () => timers.forEach(clearTimeout)
  }, [])

  const unlock = () => {
    if (leaving) return
    setLeaving(true)
    setTimeout(onUnlocked, 420)
  }

  const onPointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest("button")) return
    startY.current = e.clientY
    setDragging(true)
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (startY.current === null) return
    setDragY(Math.min(0, e.clientY - startY.current))
  }
  const onPointerUp = () => {
    if (startY.current === null) return
    startY.current = null
    setDragging(false)
    if (dragY < -110) unlock()
    else setDragY(0)
  }

  const shown = lockNotifications.slice(0, visibleCount).reverse()
  const translate = leaving ? "-100%" : `${dragY}px`

  return (
    <section
      aria-label="잠금화면"
      className="absolute inset-0 z-30 touch-none overflow-hidden"
      style={{
        transform: `translateY(${translate})`,
        transition: dragging ? "none" : "transform 420ms cubic-bezier(0.3, 0.8, 0.3, 1)",
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      <img
        src={phone.lockWallpaper || "/placeholder.svg"}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        style={{ filter: `brightness(${1 + dragY / 900})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />

      <div className="relative flex h-full flex-col items-center px-3 pb-[44px] pt-[58px] text-white">
        {leaving ? <LockOpen className="h-[18px] w-[18px]" aria-hidden /> : <Lock className="h-[18px] w-[18px]" aria-hidden />}

        <p className="mt-[10px] text-[21px] font-semibold tracking-tight text-white/90 [text-shadow:0_1px_6px_rgba(0,0,0,0.2)]">
          {date}
        </p>
        <p
          className="-mt-[2px] text-[104px] font-semibold leading-[1] tracking-[-0.03em] text-white/95 [text-shadow:0_2px_12px_rgba(0,0,0,0.15)]"
          style={{ fontFeatureSettings: '"tnum"' }}
        >
          {time}
        </p>

        <div className="mt-auto flex w-full flex-col gap-[8px]" aria-live="polite">
          {shown.map((n) => (
            <article
              key={`${n.app}-${n.body}`}
              className="ios-notif-in flex items-start gap-[10px] rounded-[22px] bg-[rgba(240,240,244,0.62)] p-[12px] pr-[14px] text-black shadow-[0_4px_20px_rgba(0,0,0,0.12)] backdrop-blur-2xl"
            >
              <IconArt id={n.app as AppId} size={38} />
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="truncate text-[15px] font-semibold leading-[20px]">{n.title || n.appName}</h3>
                  <span className="shrink-0 text-[13px] text-black/50">{n.time}</span>
                </div>
                <p className="text-[15px] leading-[20px] text-black/90">{n.body}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-[22px] flex w-full items-center justify-between px-[34px]">
          <button
            type="button"
            aria-label="손전등"
            aria-pressed={torch}
            onClick={() => setTorch((t) => !t)}
            className={cn(
              "flex h-[50px] w-[50px] items-center justify-center rounded-full backdrop-blur-xl transition-all active:scale-110",
              torch ? "bg-white text-black" : "bg-black/30 text-white",
            )}
          >
            <Flashlight className="h-[22px] w-[22px]" fill={torch ? "currentColor" : "none"} />
          </button>
          <button
            type="button"
            aria-label="카메라"
            className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-xl transition-transform active:scale-110"
          >
            <Camera className="h-[22px] w-[22px]" />
          </button>
        </div>

        <button
          type="button"
          onClick={unlock}
          className="mt-[10px] text-[14px] font-medium text-white/85 [text-shadow:0_1px_4px_rgba(0,0,0,0.3)]"
        >
          위로 쓸어올려 열기
        </button>
      </div>
      <span aria-hidden className="absolute bottom-[8px] left-1/2 h-[5px] w-[134px] -translate-x-1/2 rounded-full bg-white" />
    </section>
  )
}
