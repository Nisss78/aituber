"use client"

import { useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { useBroadcastChannel } from "../hooks/use-broadcast-channel"
import { Users, Camera, Clock, BarChart3 } from "lucide-react"

interface ViewerPageProps {
  memberId: number
}

export default function ViewerPage({ memberId }: ViewerPageProps) {
  const { streamState, sendChatMessage } = useBroadcastChannel("stream-control", memberId)

  // Mock member data
  const member = {
    id: memberId,
    name: "星野ミライ",
    avatar: "🌟",
    category: "ゲーム実況",
  }

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Add new chat messages periodically from viewers
      const newMessages = [
        "かわいい！",
        "今日も配信ありがとう",
        "ミライちゃん〜",
        "アンケート投票した！",
        "楽しい配信だね",
        "また見に来るよ〜",
        "かわいい❤",
        "今日の配信最高！",
      ]

      if (Math.random() < 0.3) {
        const newMessage = {
          id: Date.now(),
          user: `視聴者${Math.floor(Math.random() * 1000)}`,
          message: newMessages[Math.floor(Math.random() * newMessages.length)],
          timestamp: new Date().toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" }),
          type: "normal",
        }
        sendChatMessage(newMessage)
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [sendChatMessage])

  // 現在のシーンを取得
  const currentScene = streamState.scenes.find((scene) => scene.id === streamState.currentSceneId)
  const elements = currentScene?.elements || []

  // 配信状態に応じた画面表示
  const renderStreamStatus = () => {
    switch (streamState.streamStatus) {
      case "preparation":
        return (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 z-50">
            <div className="bg-white rounded-2xl p-12 text-center shadow-2xl max-w-md">
              <div className="text-6xl mb-6">{member.avatar}</div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{member.name}</h2>
              <div className="flex items-center justify-center gap-2 mb-4">
                <Camera className="h-6 w-6 text-blue-500" />
                <span className="text-xl text-gray-700">準備中...</span>
              </div>
              <p className="text-gray-600 mb-6">配信の準備をしています</p>
              <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
            </div>
          </div>
        )

      case "waiting":
        return (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 z-50">
            <div className="bg-white rounded-2xl p-12 text-center shadow-2xl max-w-lg">
              <div className="text-8xl mb-6 animate-bounce">{member.avatar}</div>
              <h2 className="text-4xl font-bold text-gray-800 mb-2">{streamState.waitingScreen.title}</h2>
              <p className="text-xl text-gray-600 mb-6">{streamState.waitingScreen.subtitle}</p>

              <div className="flex items-center justify-center gap-3 mb-6">
                <Clock className="h-8 w-8 text-purple-500" />
                <span className="text-2xl font-bold text-purple-600">{streamState.waitingScreen.startTime}</span>
              </div>

              {streamState.waitingScreen.showCountdown && (
                <div className="bg-purple-100 rounded-lg p-4 mb-6">
                  <div className="text-sm text-purple-600 mb-2">配信開始まで</div>
                  <div className="text-3xl font-bold text-purple-800">
                    {Math.floor(Math.random() * 10) + 1}分{Math.floor(Math.random() * 60)}秒
                  </div>
                </div>
              )}

              <div className="flex items-center justify-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                <span className="text-purple-600 font-medium">まもなく開始</span>
              </div>
            </div>
          </div>
        )

      case "ended":
        return (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 z-50">
            <div className="bg-white rounded-2xl p-12 text-center shadow-2xl max-w-lg">
              <div className="text-8xl mb-6">{member.avatar}</div>
              <h2 className="text-4xl font-bold text-gray-800 mb-2">{streamState.endScreen.title}</h2>
              <p className="text-xl text-gray-600 mb-6">{streamState.endScreen.subtitle}</p>

              <div className="bg-blue-50 rounded-lg p-6 mb-6">
                <p className="text-lg text-blue-800 font-medium mb-4">{streamState.endScreen.thanksMessage}</p>

                {streamState.endScreen.showStats && (
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{streamState.viewerCount}</div>
                      <div className="text-sm text-blue-500">最大視聴者数</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{streamState.chatMessages.length}</div>
                      <div className="text-sm text-green-500">総コメント数</div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-center gap-3 mb-6">
                <BarChart3 className="h-6 w-6 text-blue-500" />
                <div className="text-left">
                  <div className="text-sm text-gray-600">次回配信予定</div>
                  <div className="text-lg font-bold text-blue-600">{streamState.endScreen.nextStreamTime}</div>
                </div>
              </div>

              <Badge className="bg-blue-500 text-white px-6 py-2 text-lg">配信終了</Badge>
            </div>
          </div>
        )

      case "live":
      default:
        // ライブ配信中は通常の要素表示
        return null
    }
  }

  return (
    <div
      className="w-screen h-screen relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${streamState.overlaySettings.backgroundColor}, #e0e7ff)`,
      }}
    >
      {/* Background matching the control screen */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100"></div>

      {/* 配信状態に応じた画面表示 */}
      {renderStreamStatus()}

      {/* ライブ配信中のみ要素を表示 */}
      {streamState.streamStatus === "live" && (
        <>
          {/* 各要素を動的にレンダリング */}
          {elements
            .filter((element) => element.visible)
            .sort((a, b) => a.zIndex - b.zIndex)
            .map((element) => (
              <div
                key={element.id}
                className="absolute"
                style={{
                  left: `${element.x}%`,
                  top: `${element.y}%`,
                  width: `${element.width}px`,
                  height: `${element.height}px`,
                  opacity: element.opacity / 100,
                  transform: `rotate(${element.rotation}deg)`,
                  zIndex: element.zIndex,
                }}
              >
                {element.type === "avatar" && (
                  <div className="w-full h-full flex items-center justify-center">
                    {streamState.isStreaming ? (
                      <div className="text-center text-white">
                        <div className="text-6xl mb-2 animate-bounce">{member.avatar}</div>
                        <div className="text-lg font-bold">{member.name}</div>
                      </div>
                    ) : (
                      <div className="text-center text-gray-500">
                        <Camera className="h-12 w-12 mx-auto mb-2" />
                        <div className="text-sm">アバター</div>
                      </div>
                    )}
                  </div>
                )}

                {element.type === "chat" && (
                  <div className="w-full h-full bg-white bg-opacity-90 rounded-lg p-3 overflow-hidden shadow-lg">
                    <div className="text-sm font-bold mb-3 text-center">CHAT</div>
                    <div className="space-y-2 text-xs overflow-y-auto h-full">
                      {streamState.chatMessages.slice(-8).map((msg) => (
                        <div key={msg.id}>
                          {msg.type === "superchat" ? (
                            <div className="bg-yellow-100 border border-yellow-300 rounded p-2">
                              <div className="font-semibold text-yellow-800 mb-1">
                                {msg.user}: {msg.message}
                              </div>
                              <div className="text-xs text-yellow-600">¥{msg.amount}</div>
                            </div>
                          ) : (
                            <div className={msg.type === "streamer" ? "font-semibold text-blue-700" : "text-gray-800"}>
                              <span className="font-semibold">{msg.user}:</span> {msg.message}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {element.type === "viewer-count" && (
                  <div className="w-full h-full bg-gray-700 text-white rounded-full flex items-center justify-center shadow-lg">
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4" />
                      <span className="font-semibold">{streamState.viewerCount}</span>
                    </div>
                  </div>
                )}

                {element.type === "live-badge" && streamState.isStreaming && (
                  <Badge className="w-full h-full bg-red-500 text-white flex items-center justify-center text-sm font-bold rounded-lg shadow-lg">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse mr-2"></div>
                    LIVE
                  </Badge>
                )}
              </div>
            ))}
        </>
      )}

      <style jsx>{`
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        
        .animate-bounce-subtle {
          animation: bounce-subtle 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
