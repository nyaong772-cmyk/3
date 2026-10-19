"use client"

/* =====================================================================
 *  스토리 진행 엔진 (메시지 도착 연출)
 *  ⚠️ 대사/시간/이름은 여기서 고치지 말고 /data.ts 에서 고치세요.
 *  이 파일은 "언제 메시지가 도착하는지"를 처리하는 코드입니다.
 * ===================================================================== */

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react"
import {
  dongheeHistory,
  dongheeLiveMessages,
  dongheeReadReceipt,
  liveMessagesStartWhen,
  liveMessageTime,
  otherThreads,
  people,
} from "@/data"

export type ChatMessage = {
  id: string
  from: "me" | "them"
  text: string
  divider?: string
  live?: boolean
}

export type Thread = {
  id: string
  name: string
  photo: string
  time: string
  unread: boolean
  messages: ChatMessage[]
  readReceipt?: string
}

export type Banner = { id: number; threadId: string; title: string; body: string }

type StoryState = {
  threads: Thread[]
  typingThreadId: string | null
  totalUnread: number
  banner: Banner | null
  activeThreadId: string | null
  setActiveThread: (id: string | null) => void
  dismissBanner: () => void
  notifyHomeEntered: () => void
}

const StoryContext = createContext<StoryState | null>(null)

const DONGHEE_ID = "donghee"

const toMessages = (list: { from: string; text: string; divider?: string }[], prefix: string): ChatMessage[] =>
  list.map((m, i) => ({
    id: `${prefix}-${i}`,
    from: m.from === "me" ? "me" : "them",
    text: m.text,
    divider: m.divider,
  }))

export function StoryProvider({ children }: { children: React.ReactNode }) {
  const [dongheeMessages, setDongheeMessages] = useState<ChatMessage[]>(() =>
    toMessages(dongheeHistory, "dh"),
  )
  const [dongheeUnread, setDongheeUnread] = useState(true)
  const [dongheeTime, setDongheeTime] = useState(() => {
    const lastDivider = [...dongheeHistory].reverse().find((m) => m.divider)?.divider ?? ""
    return lastDivider.replace(/^오늘\s*/, "")
  })
  const [typingThreadId, setTypingThreadId] = useState<string | null>(null)
  const [banner, setBanner] = useState<Banner | null>(null)
  const [activeThreadId, setActiveThreadIdState] = useState<string | null>(null)

  const activeRef = useRef<string | null>(null)
  const liveStartedRef = useRef(false)
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])
  const bannerTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const timers = timersRef.current
    return () => {
      timers.forEach(clearTimeout)
      if (bannerTimerRef.current) clearTimeout(bannerTimerRef.current)
    }
  }, [])

  const showBanner = useCallback((title: string, body: string, threadId: string) => {
    setBanner({ id: Date.now(), title, body, threadId })
    if (bannerTimerRef.current) clearTimeout(bannerTimerRef.current)
    bannerTimerRef.current = setTimeout(() => setBanner(null), 4000)
  }, [])

  const startLiveMessages = useCallback(() => {
    if (liveStartedRef.current) return
    liveStartedRef.current = true

    let elapsed = 600
    dongheeLiveMessages.forEach((msg, index) => {
      const typingAt = elapsed
      const arriveAt = typingAt + msg.typingMs
      elapsed = arriveAt + msg.waitMs

      timersRef.current.push(setTimeout(() => setTypingThreadId(DONGHEE_ID), typingAt))
      timersRef.current.push(
        setTimeout(() => {
          setTypingThreadId(null)
          setDongheeMessages((prev) => [
            ...prev,
            { id: `live-${index}`, from: "them", text: msg.text, live: true },
          ])
          setDongheeTime(liveMessageTime)
          if (activeRef.current !== DONGHEE_ID) {
            setDongheeUnread(true)
            showBanner(people.donghee.name, msg.text, DONGHEE_ID)
          }
        }, arriveAt),
      )
    })
  }, [showBanner])

  const setActiveThread = useCallback(
    (id: string | null) => {
      activeRef.current = id
      setActiveThreadIdState(id)
      if (id === DONGHEE_ID) {
        setDongheeUnread(false)
        setBanner(null)
        if (liveMessagesStartWhen === "chatOpen") startLiveMessages()
      }
    },
    [startLiveMessages],
  )

  const notifyHomeEntered = useCallback(() => {
    if (liveMessagesStartWhen === "home") startLiveMessages()
  }, [startLiveMessages])

  const dismissBanner = useCallback(() => setBanner(null), [])

  const threads = useMemo<Thread[]>(
    () => [
      {
        id: DONGHEE_ID,
        name: people.donghee.name,
        photo: people.donghee.photo,
        time: dongheeTime,
        unread: dongheeUnread,
        messages: dongheeMessages,
        readReceipt: dongheeReadReceipt,
      },
      ...otherThreads.map((t) => ({
        id: t.id,
        name: t.name,
        photo: t.photo,
        time: t.time,
        unread: t.unread,
        messages: toMessages(t.messages, t.id),
      })),
    ],
    [dongheeMessages, dongheeTime, dongheeUnread],
  )

  const totalUnread = useMemo(() => {
    const liveUnread = dongheeUnread ? 1 + dongheeMessages.filter((m) => m.live).length : 0
    return liveUnread + otherThreads.filter((t) => t.unread).length
  }, [dongheeUnread, dongheeMessages])

  const value: StoryState = {
    threads,
    typingThreadId,
    totalUnread,
    banner,
    activeThreadId,
    setActiveThread,
    dismissBanner,
    notifyHomeEntered,
  }

  return <StoryContext.Provider value={value}>{children}</StoryContext.Provider>
}

export function useStory() {
  const ctx = useContext(StoryContext)
  if (!ctx) throw new Error("useStory must be used inside StoryProvider")
  return ctx
}
