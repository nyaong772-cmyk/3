"use client"

import { useState } from "react"
import { useStory } from "@/lib/story-context"
import { HomeIndicator } from "./home-indicator"
import { HomeScreen } from "./home-screen"
import { LockScreen } from "./lock-screen"
import { NotificationBanner } from "./notification-banner"
import { StatusBar } from "./status-bar"
import { OPENABLE_APPS, type AppId, type OpenOrigin } from "./types"
import { MessagesApp } from "./apps/messages-app"
import { PhoneApp } from "./apps/phone-app"
import { InstagramApp } from "./apps/instagram-app"
import { MusicApp } from "./apps/music-app"
import { PhotosApp } from "./apps/photos-app"
import { NotesApp } from "./apps/notes-app"
import { CalendarApp } from "./apps/calendar-app"

type OpenApp = { id: AppId; origin: OpenOrigin; closing: boolean; initialThread?: string; key: number }

/* 휴대폰 전체 화면 흐름: 잠금화면 → 홈 화면 → 앱 */
export function PhoneShell() {
  const [locked, setLocked] = useState(true)
  const [justUnlocked, setJustUnlocked] = useState(false)
  const [app, setApp] = useState<OpenApp | null>(null)
  const { notifyHomeEntered, setActiveThread } = useStory()

  const openApp = (id: AppId, origin: OpenOrigin, initialThread?: string) => {
    if (!OPENABLE_APPS.includes(id)) return
    setApp({ id, origin, closing: false, initialThread, key: Date.now() })
  }

  const goHome = () => {
    if (!app || app.closing) return
    setActiveThread(null)
    setApp({ ...app, closing: true })
    setTimeout(() => setApp(null), 300)
  }

  const openThreadFromBanner = (threadId: string) => {
    if (app?.id === "messages" && !app.closing) {
      setApp({ ...app, initialThread: threadId, key: Date.now() })
    } else {
      openApp("messages", { x: 195, y: 40 }, threadId)
    }
  }

  const statusTone = locked || !app || app.closing ? "light" : "dark"

  return (
    <div data-phone-screen className="absolute inset-0">
      <HomeScreen onOpen={openApp} dimmed={!!app && !app.closing} entering={justUnlocked} />

      {app ? (
        <div
          key={app.key}
          className={`absolute inset-0 z-20 overflow-hidden bg-white ${app.closing ? "ios-app-close" : "ios-app-open"}`}
          style={{ transformOrigin: `${app.origin.x}px ${app.origin.y}px` }}
        >
          <AppScreen id={app.id} initialThread={app.initialThread} />
        </div>
      ) : null}

      {locked ? (
        <LockScreen
          onUnlocked={() => {
            setLocked(false)
            setJustUnlocked(true)
            notifyHomeEntered()
            setTimeout(() => setJustUnlocked(false), 600)
          }}
        />
      ) : null}

      {!locked ? <NotificationBanner onOpenThread={openThreadFromBanner} /> : null}

      <StatusBar tone={statusTone} showCarrier={locked} />
      {!locked ? <HomeIndicator tone={statusTone} onHome={app ? goHome : undefined} /> : null}
    </div>
  )
}

function AppScreen({ id, initialThread }: { id: AppId; initialThread?: string }) {
  switch (id) {
    case "messages":
      return <MessagesApp initialThread={initialThread} />
    case "phone":
      return <PhoneApp />
    case "instagram":
      return <InstagramApp />
    case "music":
      return <MusicApp />
    case "photos":
      return <PhotosApp />
    case "notes":
      return <NotesApp />
    case "calendar":
      return <CalendarApp />
    default:
      return null
  }
}
