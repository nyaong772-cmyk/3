import { PhoneFrame } from "@/components/phone/phone-frame"
import { PhoneShell } from "@/components/phone/phone-shell"
import { StoryProvider } from "@/lib/story-context"

export default function Page() {
  return (
    <StoryProvider>
      <PhoneFrame>
        <PhoneShell />
      </PhoneFrame>
    </StoryProvider>
  )
}
