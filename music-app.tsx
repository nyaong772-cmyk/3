"use client"

/* 음악 앱 — 재생 중인 곡/플레이리스트는 /data.ts 의 music 에서 고치세요. */

import { useState } from "react"
import {
  ChevronRight,
  Disc3,
  FastForward,
  House,
  LayoutGrid,
  ListMusic,
  Mic2,
  Music,
  Pause,
  Play,
  Radio,
  Search,
  SquarePlay,
  Tv,
} from "lucide-react"
import { music } from "@/data"
import { LargeTitle, TabBar } from "./ios-ui"

const RED = "#fa2d48"

const LIBRARY = [
  { label: "플레이리스트", icon: ListMusic },
  { label: "아티스트", icon: Mic2 },
  { label: "앨범", icon: Disc3 },
  { label: "노래", icon: Music },
  { label: "뮤직비디오", icon: Tv },
]

export function MusicApp() {
  const [playing, setPlaying] = useState(false)

  return (
    <div className="absolute inset-0 bg-white">
      <div className="absolute inset-0 overflow-y-auto pb-[170px] pt-[54px] no-scrollbar">
        <div className="flex h-[44px] items-center justify-end px-4 text-[17px]" style={{ color: RED }}>
          편집
        </div>
        <LargeTitle>보관함</LargeTitle>

        <ul className="mt-[8px]">
          {LIBRARY.map(({ label, icon: Icon }) => (
            <li key={label} className="flex items-center pl-[18px]">
              <Icon className="h-[24px] w-[24px]" style={{ color: RED }} aria-hidden />
              <div className="ml-[14px] flex flex-1 items-center justify-between border-b border-[#c6c6c8]/60 py-[12px] pr-[16px]">
                <span className="text-[20px] text-black">{label}</span>
                <ChevronRight className="h-[18px] w-[18px] text-[#c4c4c6]" strokeWidth={2.6} aria-hidden />
              </div>
            </li>
          ))}
        </ul>

        <h2 className="px-4 pb-[10px] pt-[24px] text-[22px] font-bold text-black">최근 추가된 항목</h2>
        <ul className="grid grid-cols-2 gap-x-[14px] gap-y-[16px] px-4">
          {music.recent.map((r) => (
            <li key={r.title}>
              <img src={r.image || "/placeholder.svg"} alt="" className="aspect-square w-full rounded-[8px] object-cover shadow-sm" />
              <p className="mt-[6px] truncate text-[13px] text-black">{r.title}</p>
              <p className="truncate text-[13px] text-[#8e8e93]">{r.artist}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="absolute inset-x-[10px] bottom-[90px] z-20 flex items-center gap-[10px] rounded-[14px] bg-[#f5f5f7]/95 p-[8px] pr-[14px] shadow-[0_4px_18px_rgba(0,0,0,0.12)] backdrop-blur-xl">
        <img src={music.nowPlaying.image || "/placeholder.svg"} alt="" className="h-[40px] w-[40px] rounded-[6px] object-cover" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[15px] text-black">{music.nowPlaying.title}</p>
          <p className="truncate text-[13px] text-[#8e8e93]">{music.nowPlaying.artist}</p>
        </div>
        <button type="button" onClick={() => setPlaying((p) => !p)} aria-label={playing ? "일시정지" : "재생"}>
          {playing ? <Pause className="h-[24px] w-[24px]" fill="black" /> : <Play className="h-[24px] w-[24px]" fill="black" />}
        </button>
        <FastForward className="h-[24px] w-[24px]" fill="black" aria-label="다음 곡" />
      </div>

      <TabBar
        activeColor={RED}
        items={[
          { label: "홈", icon: House },
          { label: "새로운 항목", icon: LayoutGrid },
          { label: "라디오", icon: Radio },
          { label: "보관함", icon: SquarePlay, active: true },
          { label: "검색", icon: Search },
        ]}
      />
    </div>
  )
}
