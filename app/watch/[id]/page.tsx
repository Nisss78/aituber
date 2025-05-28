"use client"

import { useParams } from "next/navigation"
import ViewerPage from "../../../pages/viewer-page"

export default function Watch() {
  const params = useParams()
  const memberId = params?.id ? Number.parseInt(params.id as string) : null

  if (!memberId) {
    return <div>Invalid member ID</div>
  }

  return <ViewerPage memberId={memberId} />
}