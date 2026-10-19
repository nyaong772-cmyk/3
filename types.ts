export type AppId =
  | "messages"
  | "phone"
  | "instagram"
  | "music"
  | "photos"
  | "notes"
  | "calendar"
  | "safari"
  | "camera"
  | "settings"
  | "clock"
  | "weather"
  | "kakao"
  | "maps"

/* 눌렀을 때 실제로 화면이 열리는 앱 목록 */
export const OPENABLE_APPS: AppId[] = ["messages", "phone", "instagram", "music", "photos", "notes", "calendar"]

export type OpenOrigin = { x: number; y: number }
