"use client"

import { useEffect, useState } from "react"
import { phone } from "@/data"

/* 폰 시간을 돌려줍니다.
 * data.ts 의 phone.time 이 "2:14" 처럼 고정되어 있으면 그 값을,
 * null 이면 실제 현재 시간을 1초마다 갱신해서 돌려줍니다. */
const WEEKDAYS = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"]

function formatNow() {
  const now = new Date()
  const h = now.getHours() % 12 || 12
  const m = String(now.getMinutes()).padStart(2, "0")
  return {
    time: `${h}:${m}`,
    hours: now.getHours(),
    minutes: now.getMinutes(),
    date: `${now.getMonth() + 1}월 ${now.getDate()}일 ${WEEKDAYS[now.getDay()]}`,
  }
}

function parseFixed(time: string) {
  const [h, m] = time.split(":").map(Number)
  return { time, hours: h || 0, minutes: m || 0, date: phone.date }
}

export function usePhoneClock() {
  const [clock, setClock] = useState(() => parseFixed(phone.time ?? "9:41"))

  useEffect(() => {
    if (phone.time) return
    setClock(formatNow())
    const id = setInterval(() => setClock(formatNow()), 1000)
    return () => clearInterval(id)
  }, [])

  return clock
}
