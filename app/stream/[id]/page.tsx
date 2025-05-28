"use client"

import StreamPage from "../../../pages/stream-page"

interface StreamPageProps {
  params: Promise<{ id: string }>
}

export default async function Stream({ params }: StreamPageProps) {
  const { id } = await params
  const memberId = Number.parseInt(id)

  return <StreamPage memberId={memberId} />
}
