"use client"

import { useParams } from "next/navigation"
import StreamPage from "../../../pages/stream-page"

export default function Stream() {
  const params = useParams()
  const memberId = params?.id ? Number.parseInt(params.id as string) : null

  if (!memberId) {
    return <div>Invalid member ID</div>
  }

  return <StreamPage memberId={memberId} />
}