import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AItuber 配信画面",
  description: "AItuber配信管理システム",
}

export default function StreamLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}
