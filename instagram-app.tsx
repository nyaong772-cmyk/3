"use client"

/* 인스타그램 앱 — 스토리/게시물은 /data.ts 의 instagram 에서 고치세요. */

import { Bookmark, Clapperboard, Heart, Home, MessageCircle, MoreHorizontal, PlusSquare, Search, Send } from "lucide-react"
import { instagram, people } from "@/data"

export function InstagramApp() {
  return (
    <div className="absolute inset-0 bg-white text-black">
      <div className="absolute inset-0 overflow-y-auto pb-[90px] pt-[54px] no-scrollbar">
        <header className="flex h-[44px] items-center justify-between px-[14px]">
          <span className="font-insta text-[32px] leading-none">Instagram</span>
          <div className="flex items-center gap-[20px]">
            <Heart className="h-[25px] w-[25px]" aria-label="알림" />
            <span className="relative">
              <Send className="h-[24px] w-[24px]" aria-label="메시지" />
              <span className="absolute -right-[7px] -top-[6px] flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#ff3040] px-[4px] text-[11px] font-semibold text-white">
                2
              </span>
            </span>
          </div>
        </header>

        <ul className="flex gap-[14px] overflow-x-auto px-[12px] py-[10px] no-scrollbar">
          {instagram.stories.map((s, i) => (
            <li key={s.username} className="flex w-[70px] shrink-0 flex-col items-center gap-[4px]">
              <span
                className="rounded-full p-[2.5px]"
                style={{
                  background: i === 0 ? "#dbdbdb" : "linear-gradient(45deg, #feda75, #fa7e1e, #d62976, #962fbf, #4f5bd5)",
                }}
              >
                <span className="block rounded-full bg-white p-[2.5px]">
                  <img src={s.photo || "/placeholder.svg"} alt="" className="h-[60px] w-[60px] rounded-full object-cover" />
                </span>
              </span>
              <span className="w-full truncate text-center text-[12px]">{s.username}</span>
            </li>
          ))}
        </ul>

        {instagram.posts.map((p) => (
          <article key={`${p.username}-${p.caption}`} className="border-t border-black/5 pb-[14px]">
            <div className="flex items-center gap-[10px] px-[12px] py-[10px]">
              <img src={p.userPhoto || "/placeholder.svg"} alt="" className="h-[32px] w-[32px] rounded-full object-cover" />
              <div className="min-w-0 flex-1 leading-tight">
                <p className="text-[14px] font-semibold">{p.username}</p>
                <p className="text-[12px]">{p.location}</p>
              </div>
              <MoreHorizontal className="h-[20px] w-[20px]" aria-label="더 보기" />
            </div>
            <img src={p.image || "/placeholder.svg"} alt={p.caption} className="aspect-square w-full object-cover" />
            <div className="flex items-center gap-[16px] px-[12px] pt-[10px]">
              <Heart className="h-[25px] w-[25px]" aria-label="좋아요" />
              <MessageCircle className="h-[25px] w-[25px] -scale-x-100" aria-label="댓글" />
              <Send className="h-[24px] w-[24px]" aria-label="공유" />
              <Bookmark className="ml-auto h-[25px] w-[25px]" aria-label="저장" />
            </div>
            <p className="px-[12px] pt-[8px] text-[14px] font-semibold">{`좋아요 ${p.likes}개`}</p>
            <p className="px-[12px] pt-[2px] text-[14px]">
              <span className="font-semibold">{p.username}</span> {p.caption}
            </p>
            <p className="px-[12px] pt-[4px] text-[12px] text-[#737373]">{p.time}</p>
          </article>
        ))}
      </div>

      <nav className="absolute inset-x-0 bottom-0 flex items-center justify-around border-t border-black/10 bg-white pb-[30px] pt-[10px]">
        <Home className="h-[26px] w-[26px]" strokeWidth={2.4} aria-label="홈" />
        <Search className="h-[26px] w-[26px]" aria-label="검색" />
        <PlusSquare className="h-[26px] w-[26px]" aria-label="만들기" />
        <Clapperboard className="h-[26px] w-[26px]" aria-label="릴스" />
        <img src={people.owner.photo || "/placeholder.svg"} alt="내 프로필" className="h-[26px] w-[26px] rounded-full object-cover" />
      </nav>
    </div>
  )
}
