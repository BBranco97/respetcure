import type { ReactNode } from "react"
import background from "@/assets/backgroundPages.svg"

interface BackgroundLayoutProps {
  children: ReactNode
}

export default function BackgroundLayout({ children }: BackgroundLayoutProps) {
  return (
    <div
      className="flex min-h-screen w-full flex-col items-center justify-center bg-fixed bg-cover"
      style={{ backgroundImage: `url('${background}')` }}
    >
      {children}
    </div>
  )
}
