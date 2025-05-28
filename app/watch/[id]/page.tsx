"use client"

import ViewerPage from "../../../pages/viewer-page"

interface WatchPageProps {
  params: Promise<{ id: string }>
}

export default async function Watch({ params }: WatchPageProps) {
  const { id } = await params
  const memberId = Number.parseInt(id)

  return <ViewerPage memberId={memberId} />
}
