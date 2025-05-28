"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Settings, Play, Square, Clock, Users, BarChart3, Zap } from "lucide-react"
import type { StreamStatus } from "../hooks/use-broadcast-channel"

interface StreamStatusControlsProps {
  currentStatus: StreamStatus
  isStreaming: boolean
  onStatusChange: (status: StreamStatus) => void
  onStartStream: () => void
  onStopStream: () => void
  viewerCount: number
  streamDuration: number
}

export default function StreamStatusControls({
  currentStatus,
  isStreaming,
  onStatusChange,
  onStartStream,
  onStopStream,
  viewerCount,
  streamDuration,
}: StreamStatusControlsProps) {
  const statusConfig = {
    preparation: {
      label: "準備中",
      color: "bg-gray-500",
      icon: Settings,
      description: "配信の準備をしています",
    },
    waiting: {
      label: "待機中",
      color: "bg-yellow-500",
      icon: Clock,
      description: "視聴者が待機画面を見ています",
    },
    live: {
      label: "配信中",
      color: "bg-red-500 animate-pulse",
      icon: Play,
      description: "ライブ配信中です",
    },
    ended: {
      label: "終了",
      color: "bg-blue-500",
      icon: BarChart3,
      description: "配信が終了しました",
    },
  }

  const currentConfig = statusConfig[currentStatus]
  const CurrentIcon = currentConfig.icon

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5" />
          配信状態コントロール
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Status */}
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <Badge className={`${currentConfig.color} text-white`}>
            <CurrentIcon className="h-3 w-3 mr-1" />
            {currentConfig.label}
          </Badge>
          <span className="text-sm text-gray-600">{currentConfig.description}</span>
        </div>

        {/* Status Controls */}
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant={currentStatus === "preparation" ? "default" : "outline"}
            size="sm"
            onClick={() => onStatusChange("preparation")}
            className="flex items-center gap-2"
          >
            <Settings className="h-4 w-4" />
            準備画面
          </Button>

          <Button
            variant={currentStatus === "waiting" ? "default" : "outline"}
            size="sm"
            onClick={() => onStatusChange("waiting")}
            className="flex items-center gap-2"
          >
            <Clock className="h-4 w-4" />
            待機画面
          </Button>

          <Button
            variant={currentStatus === "ended" ? "default" : "outline"}
            size="sm"
            onClick={() => onStatusChange("ended")}
            className="flex items-center gap-2"
          >
            <BarChart3 className="h-4 w-4" />
            終了画面
          </Button>

          {/* Live Button */}
          {!isStreaming ? (
            <Button
              onClick={onStartStream}
              className="bg-red-500 hover:bg-red-600 text-white flex items-center gap-2"
              size="sm"
            >
              <Play className="h-4 w-4" />
              配信開始
            </Button>
          ) : (
            <Button onClick={onStopStream} variant="destructive" className="flex items-center gap-2" size="sm">
              <Square className="h-4 w-4" />
              配信終了
            </Button>
          )}
        </div>

        {/* Stream Stats */}
        {isStreaming && (
          <div className="grid grid-cols-2 gap-4 pt-3 border-t">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-blue-600">
                <Users className="h-4 w-4" />
                <span className="font-bold">{viewerCount}</span>
              </div>
              <div className="text-xs text-gray-500">視聴者</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-green-600">{formatDuration(streamDuration)}</div>
              <div className="text-xs text-gray-500">配信時間</div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="pt-3 border-t">
          <div className="text-xs text-gray-600 mb-2">クイックアクション</div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                onStatusChange("waiting")
                setTimeout(() => onStartStream(), 1000)
              }}
              className="flex-1 text-xs"
            >
              待機→配信
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                onStopStream()
                setTimeout(() => onStatusChange("ended"), 500)
              }}
              className="flex-1 text-xs"
            >
              配信→終了
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
