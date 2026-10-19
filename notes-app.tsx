"use client"

/* 메모 앱 — 메모 내용은 /data.ts 의 notes 에서 고치세요. */

import { useState } from "react"
import { ChevronLeft, CircleEllipsis, Share, SquarePen } from "lucide-react"
import { notes } from "@/data"
import { LargeTitle, SearchField } from "./ios-ui"

const YELLOW = "#e5a50a"

export function NotesApp() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const note = openIndex !== null ? notes[openIndex] : null

  if (note) {
    const [title, ...rest] = note.body.split("\n")
    return (
      <div className="ios-push absolute inset-0 overflow-y-auto bg-white pb-[60px] pt-[54px] no-scrollbar">
        <div className="flex h-[44px] items-center justify-between px-[8px]" style={{ color: YELLOW }}>
          <button type="button" onClick={() => setOpenIndex(null)} className="flex items-center text-[17px]">
            <ChevronLeft className="h-[30px] w-[30px]" strokeWidth={2.4} aria-hidden />
            메모
          </button>
          <div className="flex items-center gap-[18px] pr-[8px]">
            <Share className="h-[22px] w-[22px]" aria-label="공유" />
            <CircleEllipsis className="h-[24px] w-[24px]" aria-label="더 보기" />
          </div>
        </div>
        <p className="mt-[4px] text-center text-[13px] text-[#8e8e93]">{note.date}</p>
        <article className="px-[20px] pt-[10px] text-black">
          <h2 className="text-[28px] font-bold leading-tight">{title}</h2>
          <p className="mt-[10px] whitespace-pre-wrap text-[17px] leading-[24px]">{rest.join("\n")}</p>
        </article>
      </div>
    )
  }

  return (
    <div className="absolute inset-0 bg-[#f2f2f7]">
      <div className="absolute inset-0 overflow-y-auto pb-[100px] pt-[54px] no-scrollbar">
        <div className="flex h-[44px] items-center px-[8px] text-[17px]" style={{ color: YELLOW }}>
          <ChevronLeft className="h-[30px] w-[30px]" strokeWidth={2.4} aria-hidden />
          폴더
        </div>
        <LargeTitle>메모</LargeTitle>
        <SearchField className="mt-[8px]" />

        <h2 className="mb-[6px] mt-[22px] px-[20px] text-[20px] font-bold text-black">최근</h2>
        <ul className="mx-4 overflow-hidden rounded-[12px] bg-white">
          {notes.map((n, i) => {
            const preview = n.body.split("\n").slice(1).find((l) => l.trim()) ?? "추가 텍스트 없음"
            return (
              <li key={n.title}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(i)}
                  className="w-full pl-[16px] text-left active:bg-[#e5e5ea]"
                >
                  <div className={i < notes.length - 1 ? "border-b border-[#c6c6c8]/60 py-[11px] pr-[16px]" : "py-[11px] pr-[16px]"}>
                    <p className="truncate text-[17px] font-semibold leading-[22px] text-black">{n.title}</p>
                    <p className="truncate text-[15px] leading-[20px] text-[#8e8e93]">
                      <span className="text-black/70">{n.date}</span>
                      {"  "}
                      {preview}
                    </p>
                  </div>
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-[#f2f2f7]/90 px-[20px] pb-[34px] pt-[10px] backdrop-blur-xl">
        <span className="w-[24px]" />
        <span className="text-[11px] text-black">{`${notes.length}개의 메모`}</span>
        <SquarePen className="h-[24px] w-[24px]" style={{ color: YELLOW }} aria-label="새로운 메모" />
      </div>
    </div>
  )
}
