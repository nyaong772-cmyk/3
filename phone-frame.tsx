import type React from "react"
/* 휴대폰 외곽(베젤).
 * - 모바일: 화면 전체를 꽉 채움
 * - PC(가로 768px 이상): 화면 가운데에 아이폰 크기(390x844)로 표시 */
export function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-[100dvh] w-full items-center justify-center bg-black md:bg-[radial-gradient(ellipse_at_center,#2a2a2e_0%,#0a0a0b_70%)] md:py-8">
      <div className="phone-zoom relative md:rounded-[64px] md:bg-[#1b1b1d] md:p-[13px] md:shadow-[0_0_0_2px_#3a3a3c,0_40px_80px_rgba(0,0,0,0.6)]">
        <span aria-hidden className="absolute -left-[3px] top-[150px] hidden h-8 w-[3px] rounded-l bg-[#3a3a3c] md:block" />
        <span aria-hidden className="absolute -left-[3px] top-[210px] hidden h-14 w-[3px] rounded-l bg-[#3a3a3c] md:block" />
        <span aria-hidden className="absolute -left-[3px] top-[280px] hidden h-14 w-[3px] rounded-l bg-[#3a3a3c] md:block" />
        <span aria-hidden className="absolute -right-[3px] top-[240px] hidden h-20 w-[3px] rounded-r bg-[#3a3a3c] md:block" />

        <div className="ios-root relative h-[100dvh] w-screen overflow-hidden bg-black md:h-[844px] md:w-[390px] md:rounded-[52px]">
          {children}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-[11px] z-[60] hidden h-[37px] w-[125px] -translate-x-1/2 rounded-full bg-black md:block"
          />
        </div>
      </div>
    </main>
  )
}
