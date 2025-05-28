"use client"
import { Badge } from "@/components/ui/badge"
import { Users, Camera, Gift } from "lucide-react"
import DraggableElement from "./draggable-element"
import type { SceneElement, StreamState } from "../hooks/use-broadcast-channel"

interface OBSCanvasProps {
  streamState: StreamState
  member: any
  canvasMode: "edit" | "preview" | "live"
  selectedElementId: string | null
  onElementSelect: (id: string) => void
  onElementUpdate: (id: string, updates: Partial<SceneElement>) => void
  onElementDelete: (id: string) => void
  onCanvasClick: () => void
}

export default function OBSCanvas({
  streamState,
  member,
  canvasMode,
  selectedElementId,
  onElementSelect,
  onElementUpdate,
  onElementDelete,
  onCanvasClick,
}: OBSCanvasProps) {
  const currentScene = streamState.scenes.find((scene) => scene.id === streamState.currentSceneId)
  const elements = currentScene?.elements || []

  const renderElementContent = (element: SceneElement) => {
    switch (element.type) {
      case "avatar":
        return (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg border-2 border-dashed border-gray-300">
            {streamState.isStreaming ? (
              <div className="text-center">
                <div className="text-6xl mb-2 animate-bounce">{member.avatar}</div>
                <div className="text-sm font-bold text-gray-700">{member.name}</div>
              </div>
            ) : (
              <div className="text-center text-gray-500">
                <Camera className="h-8 w-8 mx-auto mb-2" />
                <div className="text-xs">アバター</div>
              </div>
            )}
          </div>
        )

      case "chat":
        return (
          <div className="w-full h-full bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gray-100 px-3 py-2 border-b">
              <div className="text-sm font-bold text-center">CHAT</div>
            </div>
            <div className="p-3 space-y-2 overflow-y-auto h-full">
              {streamState.chatMessages.slice(-5).map((msg) => (
                <div key={msg.id} className="text-xs">
                  {msg.type === "superchat" ? (
                    <div className="bg-yellow-100 border border-yellow-300 rounded p-2">
                      <div className="flex items-center gap-1 mb-1">
                        <Gift className="h-3 w-3 text-yellow-600" />
                        <span className="font-semibold text-yellow-800">{msg.user}</span>
                      </div>
                      <div className="text-yellow-800">{msg.message}</div>
                    </div>
                  ) : (
                    <div className={msg.type === "streamer" ? "bg-blue-50 rounded p-1" : ""}>
                      <span className="font-semibold">{msg.user}:</span> {msg.message}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )

      case "viewer-count":
        return (
          <div className="w-full h-full bg-gray-700 text-white rounded-full flex items-center justify-center shadow-lg">
            <div className="flex items-center gap-2 text-sm">
              <Users className="h-4 w-4" />
              <span className="font-semibold">{streamState.viewerCount}</span>
            </div>
          </div>
        )

      case "live-badge":
        return streamState.isStreaming ? (
          <Badge className="w-full h-full bg-red-500 text-white flex items-center justify-center text-sm font-bold rounded-lg">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse mr-2"></div>
            LIVE
          </Badge>
        ) : (
          <div className="w-full h-full bg-gray-300 text-gray-600 flex items-center justify-center text-sm font-bold rounded-lg">
            OFFLINE
          </div>
        )

      default:
        return (
          <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
            <div className="text-gray-500 text-sm">{element.type}</div>
          </div>
        )
    }
  }

  return (
    <div
      className="relative w-full aspect-video bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 rounded-lg overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${streamState.overlaySettings.backgroundColor}, #e0e7ff)`,
      }}
      onClick={onCanvasClick}
    >
      {/* Grid Background (Edit Mode) */}
      {canvasMode === "edit" && (
        <div className="absolute inset-0 opacity-30">
          <div className="w-full h-full grid grid-cols-20 grid-rows-12 gap-0">
            {Array.from({ length: 240 }).map((_, i) => (
              <div key={i} className="border border-gray-300 border-opacity-50"></div>
            ))}
          </div>
        </div>
      )}

      {/* Scene Elements */}
      {elements
        .sort((a, b) => a.zIndex - b.zIndex)
        .map((element) => (
          <DraggableElement
            key={element.id}
            element={element}
            isSelected={selectedElementId === element.id}
            isEditMode={canvasMode === "edit"}
            onSelect={onElementSelect}
            onUpdate={onElementUpdate}
            onDelete={onElementDelete}
          >
            {renderElementContent(element)}
          </DraggableElement>
        ))}

      {/* Speech Bubble (Live Mode) */}
      {streamState.isStreaming && canvasMode === "live" && (
        <div className="absolute top-20 right-20 z-50">
          <div className="bg-white rounded-2xl px-4 py-3 shadow-lg max-w-xs relative">
            <div className="text-sm text-gray-800 font-medium">{streamState.currentBubble}</div>
            <div className="absolute bottom-0 left-8 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-white transform translate-y-full"></div>
          </div>
        </div>
      )}

      {/* Telop/Subtitle Area (Live Mode) */}
      {streamState.isStreaming && canvasMode === "live" && (
        <div className="absolute bottom-4 left-4 right-4 z-50">
          <div className="bg-gray-800 text-white p-4 rounded-lg shadow-xl">
            <div className="flex items-center gap-3">
              <div className="text-2xl">📢</div>
              <div className="flex-1 text-sm font-medium leading-relaxed">{streamState.currentSpeech}</div>
            </div>
          </div>
        </div>
      )}

      {/* Canvas Mode Indicator */}
      <div className="absolute top-2 left-2 z-50">
        <Badge variant={canvasMode === "edit" ? "default" : canvasMode === "preview" ? "secondary" : "destructive"}>
          {canvasMode === "edit" ? "編集" : canvasMode === "preview" ? "プレビュー" : "ライブ"}
        </Badge>
      </div>
    </div>
  )
}
