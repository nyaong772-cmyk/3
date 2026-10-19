"use client"

/* =====================================================================
 *  메시지(iMessage) 앱
 *  ⚠️ 대화 내용·이름·시간은 /data.ts 의 "4. 메시지" 부분에서 고치세요.
 * ===================================================================== */

import { useEffect, useRef, useState } from "react"
import { ArrowUp, ChevronLeft, ChevronRight, Mic, Plus, SquarePen, Video } from "lucide-react"
import { useStory, type ChatMessage, type Thread } from "@/lib/story-context"
import { cn } from "@/lib/utils"
import { Avatar } from "../avatar"
import { LargeTitle, SearchField } from "./ios-ui"

export function MessagesApp({ initialThread }: { initialThread?: string }) {
  const { threads, typingThreadId, setActiveThread } = useStory()
  const [openId, setOpenId] = useState<string | null>(initialThread ?? null)
  const [returned, setReturned] = useState(false)

  useEffect(() => {
    setActiveThread(openId)
  }, [openId, setActiveThread])

  useEffect(() => () => setActiveThread(null), [setActiveThread])

  const thread = threads.find((t) => t.id === openId)

  if (thread) {
    const otherUnread = threads.filter((t) => t.id !== thread.id && t.unread).length
    return (
      <ChatView
        thread={thread}
        typing={typingThreadId === thread.id}
        otherUnread={otherUnread}
        onBack={() => {
          setReturned(true)
          setOpenId(null)
        }}
      />
    )
  }

  return (
    <div className={cn("absolute inset-0 overflow-y-auto bg-white pb-10 pt-[54px] no-scrollbar", returned && "ios-pop-back")}>
      <div className="flex h-[44px] items-center justify-between px-4 text-[17px] text-[#0a84ff]">
        <span>편집</span>
        <SquarePen className="h-[22px] w-[22px]" aria-label="새로운 메시지" />
      </div>
      <LargeTitle>메시지</LargeTitle>
      <SearchField className="mb-[10px] mt-[8px]" />

      <ul>
        {threads.map((t) => (
          <ThreadRow key={t.id} thread={t} typing={typingThreadId === t.id} onOpen={() => setOpenId(t.id)} />
        ))}
      </ul>
    </div>
  )
}

function ThreadRow({ thread, typing, onOpen }: { thread: Thread; typing: boolean; onOpen: () => void }) {
  const last = thread.messages[thread.messages.length - 1]
  return (
    <li>
      <button type="button" onClick={onOpen} className="flex w-full items-stretch text-left active:bg-[#e5e5ea]">
        <span className="flex w-[22px] shrink-0 items-center justify-center">
          {thread.unread ? <span className="h-[10px] w-[10px] rounded-full bg-[#0a84ff]" aria-label="읽지 않음" /> : null}
        </span>
        <span className="flex items-center py-[10px]">
          <Avatar src={thread.photo} name={thread.name} size={45} />
        </span>
        <span className="ml-[12px] min-w-0 flex-1 border-b border-[#c6c6c8]/60 py-[10px] pr-4">
          <span className="flex items-center justify-between gap-2">
            <span className="truncate text-[17px] font-semibold leading-[22px] text-black">{thread.name}</span>
            <span className="flex shrink-0 items-center gap-[2px] text-[15px] text-[#8e8e93]">
              {thread.time}
              <ChevronRight className="h-[16px] w-[16px] text-[#c4c4c6]" strokeWidth={2.6} aria-hidden />
            </span>
          </span>
          {typing ? (
            <span className="mt-[4px] inline-flex items-center gap-[3px] rounded-full bg-[#e9e9eb] px-[8px] py-[5px]" aria-label="입력 중">
              <Dot />
              <Dot />
              <Dot />
            </span>
          ) : (
            <span className="line-clamp-2 text-[15px] leading-[20px] text-[#8e8e93]">
              {last?.text}
            </span>
          )}
        </span>
      </button>
    </li>
  )
}

function ChatView({
  thread,
  typing,
  otherUnread,
  onBack,
}: {
  thread: Thread
  typing: boolean
  otherUnread: number
  onBack: () => void
}) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const firstScroll = useRef(true)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.scrollTo({ top: el.scrollHeight, behavior: firstScroll.current ? "auto" : "smooth" })
    firstScroll.current = false
  }, [thread.messages.length, typing])

  const lastMeIndex = thread.messages.map((m) => m.from).lastIndexOf("me")

  return (
    <div className="ios-push absolute inset-0 flex flex-col bg-white">
      <header className="absolute inset-x-0 top-0 z-20 border-b border-black/10 bg-[#f6f6f6]/85 pt-[54px] backdrop-blur-xl">
        <div className="relative flex h-[82px] items-start justify-center">
          <button
            type="button"
            onClick={onBack}
            aria-label="뒤로"
            className="absolute left-[6px] top-[10px] flex items-center text-[#0a84ff]"
          >
            <ChevronLeft className="h-[32px] w-[32px]" strokeWidth={2.4} />
            {otherUnread > 0 ? (
              <span className="-ml-[4px] flex h-[20px] min-w-[20px] items-center justify-center rounded-full bg-[#0a84ff] px-[6px] text-[13px] font-semibold text-white">
                {otherUnread}
              </span>
            ) : null}
          </button>
          <div className="flex flex-col items-center pt-[2px]">
            <Avatar src={thread.photo} name={thread.name} size={52} />
            <span className="mt-[4px] flex items-center text-[11px] text-black">
              {thread.name}
              <ChevronRight className="h-[10px] w-[10px] text-[#8e8e93]" strokeWidth={3} aria-hidden />
            </span>
          </div>
          <Video className="absolute right-[16px] top-[16px] h-[26px] w-[26px] text-[#0a84ff]" strokeWidth={1.8} aria-label="FaceTime" />
        </div>
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto overflow-x-hidden px-[16px] pb-[12px] pt-[150px] no-scrollbar" aria-live="polite">
        <p className="mb-[6px] text-center text-[11px] text-[#8e8e93]">iMessage</p>
        {thread.messages.map((m, i) => {
          const next = thread.messages[i + 1]
          const prev = thread.messages[i - 1]
          const tail = !next || next.from !== m.from || !!next.divider
          const groupStart = !prev || prev.from !== m.from || !!m.divider
          return (
            <div key={m.id}>
              {m.divider ? <Divider text={m.divider} /> : null}
              <Bubble message={m} tail={tail} spaced={groupStart && !m.divider && i > 0} />
              {i === lastMeIndex && thread.readReceipt ? (
                <p className="mt-[3px] pr-[4px] text-right text-[11px] font-medium text-[#8e8e93]">{thread.readReceipt}</p>
              ) : null}
            </div>
          )
        })}
        {typing ? <TypingBubble /> : null}
      </div>

      <InputBar />
    </div>
  )
}

function Divider({ text }: { text: string }) {
  const match = text.match(/^(.*?)\s*(오전|오후)\s*(.*)$/)
  return (
    <p className="mb-[6px] mt-[18px] text-center text-[11px] text-[#8e8e93]">
      {match ? (
        <>
          <span className="font-semibold">{match[1]}</span> {`${match[2]} ${match[3]}`}
        </>
      ) : (
        text
      )}
    </p>
  )
}

function Bubble({ message, tail, spaced }: { message: ChatMessage; tail: boolean; spaced: boolean }) {
  const me = message.from === "me"
  return (
    <div className={cn("flex", me ? "justify-end" : "justify-start", spaced ? "mt-[10px]" : "mt-[2px]")}>
      <div
        className={cn(
          "bubble max-w-[75%] rounded-[18px] px-[12px] py-[7px] text-[17px] leading-[22px] break-words",
          me ? "bubble-me bg-[#0a84ff] text-white" : "bubble-them bg-[#e9e9eb] text-black",
          tail && "bubble-tail",
          message.live && "ios-bubble-in",
        )}
      >
        <span>{message.text}</span>
      </div>
    </div>
  )
}

function Dot() {
  return <span className="ios-typing-dot block h-[7px] w-[7px] rounded-full bg-[#8e8e93]" />
}

function TypingBubble() {
  return (
    <div className="ios-bubble-in relative mt-[10px] ml-[4px] flex w-fit" aria-label="입력 중">
      <div className="flex items-center gap-[4px] rounded-[18px] bg-[#e9e9eb] px-[13px] py-[12px]">
        <Dot />
        <Dot />
        <Dot />
      </div>
      <span className="absolute -bottom-[1px] -left-[1px] h-[11px] w-[11px] rounded-full bg-[#e9e9eb]" />
      <span className="absolute -bottom-[7px] -left-[6px] h-[5px] w-[5px] rounded-full bg-[#e9e9eb]" />
    </div>
  )
}

function InputBar() {
  const [text, setText] = useState("")
  return (
    <div className="flex items-end gap-[8px] bg-white px-[10px] pb-[38px] pt-[6px]">
      <span className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-[#e9e9eb] text-[#8e8e93]">
        <Plus className="h-[20px] w-[20px]" strokeWidth={2.4} aria-hidden />
      </span>
      <label className="flex min-h-[34px] flex-1 items-center rounded-full border border-[#c6c6c8] pl-[12px] pr-[4px]">
        <span className="sr-only">메시지 입력</span>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="iMessage"
          className="min-w-0 flex-1 bg-transparent text-[17px] text-black outline-none placeholder:text-[#c4c4c6]"
        />
        {text ? (
          <span className="flex h-[27px] w-[27px] items-center justify-center rounded-full bg-[#0a84ff] text-white">
            <ArrowUp className="h-[18px] w-[18px]" strokeWidth={3} aria-hidden />
          </span>
        ) : (
          <Mic className="mr-[6px] h-[20px] w-[20px] text-[#8e8e93]" aria-hidden />
        )}
      </label>
    </div>
  )
}
