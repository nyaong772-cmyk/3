"use client"

/* 사진(앨범) 앱 — 사진 목록은 /data.ts 의 photos 에서 고치세요.
 * 사진 파일은 /public/photos 폴더에 넣으면 됩니다. */

import { useState } from "react"
import { ChevronLeft, Heart, Images, Info, Search, Share, SquareStack, Trash2, UserSquare } from "lucide-react"
import { photos } from "@/data"
import { TabBar } from "./ios-ui"

export function PhotosApp() {
  const [viewing, setViewing] = useState<number | null>(null)
  const photo = viewing !== null ? photos[viewing] : null

  return (
    <div className="absolute inset-0 bg-white">
      <div className="absolute inset-0 overflow-y-auto pb-[100px] pt-[54px] no-scrollbar">
        <div className="flex items-end justify-between px-4 pb-[8px] pt-[6px]">
          <div>
            <h1 className="text-[34px] font-bold leading-[41px] tracking-tight text-black">보관함</h1>
            <p className="text-[15px] text-[#8e8e93]">{`${photos.length}장의 사진`}</p>
          </div>
          <div className="flex gap-[8px] pb-[4px]">
            <span className="rounded-full bg-[#7676801f] px-[12px] py-[4px] text-[15px] font-semibold text-[#0a84ff]">선택</span>
          </div>
        </div>

        <ul className="grid grid-cols-3 gap-[2px]">
          {photos.map((p, i) => (
            <li key={`${p.src}-${i}`}>
              <button type="button" onClick={() => setViewing(i)} className="block aspect-square w-full overflow-hidden">
                <img src={p.src || "/placeholder.svg"} alt={`${p.date}에 찍은 사진`} className="h-full w-full object-cover" />
              </button>
            </li>
          ))}
        </ul>
      </div>

      <TabBar
        items={[
          { label: "보관함", icon: Images, active: true },
          { label: "For You", icon: UserSquare },
          { label: "앨범", icon: SquareStack },
          { label: "검색", icon: Search },
        ]}
      />

      {photo ? (
        <div className="ios-app-open absolute inset-0 z-30 flex flex-col bg-white">
          <div className="flex items-center justify-between px-[8px] pb-[6px] pt-[54px]">
            <button type="button" onClick={() => setViewing(null)} className="flex items-center text-[17px] text-[#0a84ff]" aria-label="뒤로">
              <ChevronLeft className="h-[30px] w-[30px]" strokeWidth={2.4} />
            </button>
            <p className="text-[15px] font-semibold text-black">{photo.date}</p>
            <span className="w-[40px] pr-[8px] text-right text-[17px] text-[#0a84ff]">편집</span>
          </div>
          <div className="flex flex-1 items-center justify-center bg-black">
            <img src={photo.src || "/placeholder.svg"} alt={`${photo.date}에 찍은 사진`} className="max-h-full w-full object-contain" />
          </div>
          <div className="flex items-center justify-between px-[24px] pb-[40px] pt-[12px] text-[#0a84ff]">
            <Share className="h-[22px] w-[22px]" aria-label="공유" />
            <Heart className="h-[22px] w-[22px]" aria-label="즐겨찾기" />
            <Info className="h-[22px] w-[22px]" aria-label="정보" />
            <Trash2 className="h-[22px] w-[22px]" aria-label="삭제" />
          </div>
        </div>
      ) : null}
    </div>
  )
}
