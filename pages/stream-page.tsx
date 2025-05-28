"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Play,
  Square,
  Settings,
  Users,
  Eye,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Monitor,
  Camera,
  Send,
  Gift,
  Share,
  Minimize2,
  Maximize2,
  Volume2,
  VolumeX,
} from "lucide-react"

interface StreamPageProps {
  memberId: number
}

export default function StreamPage({ memberId }: StreamPageProps) {
  const [isStreaming, setIsStreaming] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [viewerCount, setViewerCount] = useState(0)
  const [streamDuration, setStreamDuration] = useState(0)
  const [chatMessage, setChatMessage] = useState("")
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Mock member data
  const member = {
    id: memberId,
    name: "星野ミライ",
    avatar: "🌟",
    category: "ゲーム実況",
  }

  // Mock chat messages
  const [chatMessages, setChatMessages] = useState([
    { id: 1, user: "視聴者1", message: "こんにちは！", timestamp: "14:30", type: "normal" },
    { id: 2, user: "視聴者2", message: "配信お疲れ様です", timestamp: "14:31", type: "normal" },
    { id: 3, user: "視聴者3", message: "スーパーチャット！", timestamp: "14:32", type: "superchat", amount: 500 },
  ])

  // Stream timer
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isStreaming) {
      interval = setInterval(() => {
        setStreamDuration((prev) => prev + 1)
        setViewerCount((prev) => Math.max(0, prev + Math.floor(Math.random() * 10) - 5))
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isStreaming])

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleStartStream = () => {
    setIsStreaming(true)
    setViewerCount(Math.floor(Math.random() * 100) + 50)
  }

  const handleStopStream = () => {
    setIsStreaming(false)
    setStreamDuration(0)
    setViewerCount(0)
  }

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      const newMessage = {
        id: chatMessages.length + 1,
        user: member.name,
        message: chatMessage,
        timestamp: new Date().toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" }),
        type: "streamer" as const,
      }
      setChatMessages([...chatMessages, newMessage])
      setChatMessage("")
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Top Bar */}
      <div className="bg-gray-800 border-b border-gray-700 p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-xl">{member.avatar}</div>
            <div>
              <h1 className="text-lg font-bold">{member.name} - 配信スタジオ</h1>
              <p className="text-sm text-gray-400">{member.category}</p>
            </div>
            <Badge variant={isStreaming ? "default" : "secondary"} className={isStreaming ? "bg-red-500" : ""}>
              {isStreaming ? "配信中" : "オフライン"}
            </Badge>
          </div>
          <div className="flex items-center gap-4">
            {isStreaming && (
              <>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4" />
                  <span className="font-semibold">{viewerCount}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Eye className="h-4 w-4" />
                  <span className="font-semibold">{formatDuration(streamDuration)}</span>
                </div>
              </>
            )}
            <Button variant="ghost" size="sm" onClick={() => setIsFullscreen(!isFullscreen)}>
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-64px)]">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Video Capture Area - Matching the provided screenshot */}
          <div className="flex-1 bg-black relative">
            <div className="absolute inset-0 flex items-center justify-center">
              {isStreaming ? (
                <div className="text-center">
                  <div className="text-8xl mb-6">{member.avatar}</div>
                  <div className="text-3xl font-bold mb-4">{member.name}</div>
                  <div className="text-gray-300 text-lg mb-6">配信中...</div>
                  <div className="flex items-center justify-center gap-4">
                    <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-red-500 font-semibold text-xl">LIVE</span>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500">
                  <Camera className="h-24 w-24 mx-auto mb-6 text-gray-600" />
                  <div className="text-2xl mb-2 text-gray-400">配信を開始してください</div>
                  <div className="text-lg text-gray-500">カメラとマイクの準備ができています</div>
                </div>
              )}
            </div>

            {/* Stream Overlay Info */}
            {isStreaming && (
              <>
                <div className="absolute top-4 left-4 bg-black bg-opacity-70 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-red-400 font-semibold">LIVE</span>
                    <span className="ml-2 text-white">{viewerCount} 視聴者</span>
                  </div>
                </div>

                <div className="absolute top-4 right-4 bg-black bg-opacity-70 rounded-lg p-3">
                  <div className="text-sm text-white">
                    <div>配信時間: {formatDuration(streamDuration)}</div>
                    <div>品質: 1080p 60fps</div>
                  </div>
                </div>
              </>
            )}

            {/* Audio Level Indicator */}
            <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 rounded-lg p-3">
              <div className="flex items-center gap-2">
                {isMuted ? (
                  <VolumeX className="h-4 w-4 text-red-400" />
                ) : (
                  <Volume2 className="h-4 w-4 text-green-400" />
                )}
                <div className="flex gap-1">
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className={`w-1 h-4 rounded ${!isMuted && i < 6 ? "bg-green-400" : "bg-gray-600"}`} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Control Panel */}
          <div className="bg-gray-800 p-4 border-t border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {!isStreaming ? (
                  <Button
                    onClick={handleStartStream}
                    className="bg-red-500 hover:bg-red-600 flex items-center gap-2 px-6"
                  >
                    <Play className="h-5 w-5" />
                    配信開始
                  </Button>
                ) : (
                  <Button onClick={handleStopStream} variant="destructive" className="flex items-center gap-2 px-6">
                    <Square className="h-5 w-5" />
                    配信終了
                  </Button>
                )}

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsMuted(!isMuted)}
                    className={`${isMuted ? "bg-red-500 text-white border-red-500" : "border-gray-600"}`}
                  >
                    {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsVideoOn(!isVideoOn)}
                    className={`${!isVideoOn ? "bg-red-500 text-white border-red-500" : "border-gray-600"}`}
                  >
                    {isVideoOn ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                  </Button>

                  <Button variant="outline" size="sm" className="border-gray-600">
                    <Monitor className="h-4 w-4" />
                  </Button>

                  <Button variant="outline" size="sm" className="border-gray-600">
                    <Share className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-6 text-sm text-gray-400">
                <div>
                  ビットレート: <span className="text-white">6000 kbps</span>
                </div>
                <div>
                  FPS: <span className="text-white">60</span>
                </div>
                <div>
                  解像度: <span className="text-white">1920x1080</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col">
          <Tabs defaultValue="chat" className="flex-1 flex flex-col">
            <TabsList className="grid w-full grid-cols-3 bg-gray-700 m-2">
              <TabsTrigger value="chat" className="text-xs">
                チャット
              </TabsTrigger>
              <TabsTrigger value="stats" className="text-xs">
                統計
              </TabsTrigger>
              <TabsTrigger value="settings" className="text-xs">
                設定
              </TabsTrigger>
            </TabsList>

            {/* Chat Tab */}
            <TabsContent value="chat" className="flex-1 flex flex-col m-0">
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className="text-sm">
                    {msg.type === "superchat" ? (
                      <div className="bg-yellow-500 bg-opacity-20 border border-yellow-500 rounded p-2">
                        <div className="flex items-center gap-2 mb-1">
                          <Gift className="h-4 w-4 text-yellow-400" />
                          <span className="font-semibold text-yellow-300">{msg.user}</span>
                          <span className="text-xs text-gray-400">{msg.timestamp}</span>
                        </div>
                        <div className="text-yellow-100">{msg.message}</div>
                        <div className="text-xs text-yellow-400 mt-1">¥{msg.amount}</div>
                      </div>
                    ) : (
                      <div className={msg.type === "streamer" ? "bg-blue-500 bg-opacity-20 rounded p-2" : ""}>
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={`font-semibold ${msg.type === "streamer" ? "text-blue-400" : "text-gray-300"}`}
                          >
                            {msg.user}
                          </span>
                          <span className="text-xs text-gray-400">{msg.timestamp}</span>
                        </div>
                        <div className="text-gray-100">{msg.message}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-gray-700">
                <div className="flex gap-2">
                  <Input
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    placeholder="メッセージを入力..."
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  />
                  <Button onClick={handleSendMessage} size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Stats Tab */}
            <TabsContent value="stats" className="flex-1 p-4 space-y-4">
              <Card className="bg-gray-700 border-gray-600">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-gray-300">リアルタイム統計</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">現在の視聴者</span>
                    <span className="font-semibold text-white">{viewerCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">配信時間</span>
                    <span className="font-semibold text-white">{formatDuration(streamDuration)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">チャット数</span>
                    <span className="font-semibold text-white">{chatMessages.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">スーパーチャット</span>
                    <span className="font-semibold text-white">
                      ¥{chatMessages.filter((m) => m.type === "superchat").reduce((sum, m) => sum + (m.amount || 0), 0)}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-700 border-gray-600">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-gray-300">システム状態</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">CPU使用率</span>
                      <span className="text-white">45%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">メモリ使用率</span>
                      <span className="text-white">62%</span>
                    </div>
                    <Progress value={62} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">ネットワーク</span>
                      <span className="text-green-400">良好</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="flex-1 p-4 space-y-4">
              <Card className="bg-gray-700 border-gray-600">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-gray-300">配信設定</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">配信タイトル</label>
                    <Input
                      defaultValue="マインクラフト建築配信"
                      className="bg-gray-600 border-gray-500 text-white text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">カテゴリ</label>
                    <select className="w-full p-2 text-sm bg-gray-600 border border-gray-500 rounded text-white">
                      <option>ゲーム実況</option>
                      <option>雑談</option>
                      <option>歌・音楽</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">配信説明</label>
                    <Textarea
                      defaultValue="今日は城を建築します！"
                      className="bg-gray-600 border-gray-500 text-white text-sm"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-700 border-gray-600">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-gray-300">音声・映像</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">マイク音量</label>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">BGM音量</label>
                    <Progress value={30} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">映像品質</label>
                    <select className="w-full p-2 text-sm bg-gray-600 border border-gray-500 rounded text-white">
                      <option>1080p 60fps</option>
                      <option>1080p 30fps</option>
                      <option>720p 60fps</option>
                    </select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
