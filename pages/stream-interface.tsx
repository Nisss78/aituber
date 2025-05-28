"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  ArrowLeft,
  Users,
  Eye,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Monitor,
  Send,
  Gift,
  Share,
  ExternalLink,
  Layers,
  Palette,
  Zap,
  Save,
  RotateCcw,
  Grid,
  Volume2,
  VolumeX,
  Sparkles,
  MessageCircle,
  Brain,
  User,
  ImageIcon,
} from "lucide-react"
import { useBroadcastChannel } from "../hooks/use-broadcast-channel"
import OBSCanvas from "../components/obs-canvas"
import StreamStatusControls from "../components/stream-status-controls"
import type { SceneElement } from "../hooks/use-broadcast-channel"

interface StreamInterfaceProps {
  memberId: number
  onBack: () => void
}

export default function StreamInterface({ memberId, onBack }: StreamInterfaceProps) {
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [chatMessage, setChatMessage] = useState("")
  const [layoutMode, setLayoutMode] = useState("edit")

  const {
    streamState,
    updateStreamState,
    changeStreamStatus,
    sendChatMessage,
    updateOverlaySettings,
    updateModelSettings,
    updateEffectSettings,
    changeScene,
    updateSpeech,
  } = useBroadcastChannel("stream-control", memberId)

  // Mock member data
  const member = {
    id: memberId,
    name: "星野ミライ",
    avatar: "🌟",
    category: "ゲーム実況",
  }

  const scenes = [
    { id: "main", name: "メイン画面", description: "通常の配信画面" },
    { id: "game", name: "ゲーム画面", description: "ゲーム実況用レイアウト" },
    { id: "chat", name: "チャット重視", description: "チャット中心のレイアウト" },
    { id: "minimal", name: "ミニマル", description: "シンプルなレイアウト" },
  ]

  const presets = [
    { id: "kawaii", name: "かわいい", colors: { bg: "#fef7f7", accent: "#f472b6" } },
    { id: "cool", name: "クール", colors: { bg: "#f0f9ff", accent: "#3b82f6" } },
    { id: "dark", name: "ダーク", colors: { bg: "#1f2937", accent: "#10b981" } },
    { id: "neon", name: "ネオン", colors: { bg: "#0f0f23", accent: "#a855f7" } },
  ]

  // Stream timer
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (streamState.isStreaming) {
      interval = setInterval(() => {
        const newDuration = streamState.streamDuration + 1
        const newViewerCount = Math.max(0, streamState.viewerCount + Math.floor(Math.random() * 10) - 5)

        updateStreamState({
          streamDuration: newDuration,
          viewerCount: newViewerCount,
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [streamState.isStreaming, streamState.streamDuration, streamState.viewerCount, updateStreamState])

  // Auto speech updates
  useEffect(() => {
    if (streamState.isStreaming) {
      const speeches = [
        {
          speech: "じゃあ、そろそろアンケートを締め切ろうかな。まだ投票してないキミは急いでね！",
          bubble: "アンケート締め切ろうかな",
        },
        { speech: "みんなのコメント見てるよ〜！ありがとう！", bubble: "コメントありがとう！" },
        { speech: "今日の配信も楽しんでもらえてるかな？", bubble: "楽しんでもらえてる？" },
        { speech: "次は何をしようか迷っちゃうな〜", bubble: "次は何しよう？" },
        { speech: "みんなと一緒にいると時間があっという間だね！", bubble: "時間があっという間！" },
      ]

      const speechInterval = setInterval(() => {
        const randomSpeech = speeches[Math.floor(Math.random() * speeches.length)]
        updateSpeech(randomSpeech.speech, randomSpeech.bubble)
      }, 8000)

      return () => clearInterval(speechInterval)
    }
  }, [streamState.isStreaming, updateSpeech])

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleStartStream = () => {
    updateStreamState({
      isStreaming: true,
      viewerCount: Math.floor(Math.random() * 100) + 50,
      streamDuration: 0,
    })
    changeStreamStatus("live")
    setLayoutMode("live")

    // Open viewer page in background without navigating
    setTimeout(() => {
      const viewerWindow = window.open(
        `/watch/${member.id}`,
        `watch-${member.id}`,
        "width=1200,height=800,scrollbars=yes,resizable=yes",
      )
      if (viewerWindow) {
        window.focus()
      }
    }, 1000)
  }

  const handleStopStream = () => {
    updateStreamState({
      isStreaming: false,
      streamDuration: 0,
      viewerCount: 0,
    })
    changeStreamStatus("ended")
    setLayoutMode("edit")
  }

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      const newMessage = {
        id: streamState.chatMessages.length + 1,
        user: member.name,
        message: chatMessage,
        timestamp: new Date().toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" }),
        type: "streamer",
      }
      sendChatMessage(newMessage)
      setChatMessage("")
    }
  }

  const handleOpenViewerPage = () => {
    const viewerWindow = window.open(
      `/watch/${member.id}`,
      `watch-${member.id}`,
      "width=1200,height=800,scrollbars=yes,resizable=yes",
    )

    if (viewerWindow) {
      viewerWindow.focus()
    }
  }

  const applyPreset = (preset: any) => {
    updateOverlaySettings({
      backgroundColor: preset.colors.bg,
      accentColor: preset.colors.accent,
    })
  }

  const saveLayout = () => {
    alert("レイアウトが保存されました！")
  }

  const resetLayout = () => {
    // レイアウトリセット機能の実装
  }

  const [selectedElementId, setSelectedElementId] = useState<string | null>(null)

  const handleElementSelect = (id: string) => {
    setSelectedElementId(id)
  }

  const handleElementUpdate = (id: string, updates: Partial<SceneElement>) => {
    const currentScene = streamState.scenes.find((scene) => scene.id === streamState.currentSceneId)
    if (!currentScene) return

    const updatedElements = currentScene.elements.map((element) =>
      element.id === id ? { ...element, ...updates } : element,
    )

    const updatedScenes = streamState.scenes.map((scene) =>
      scene.id === streamState.currentSceneId ? { ...scene, elements: updatedElements } : scene,
    )

    updateStreamState({ scenes: updatedScenes })
  }

  const handleElementDelete = (id: string) => {
    const currentScene = streamState.scenes.find((scene) => scene.id === streamState.currentSceneId)
    if (!currentScene) return

    const updatedElements = currentScene.elements.filter((element) => element.id !== id)
    const updatedScenes = streamState.scenes.map((scene) =>
      scene.id === streamState.currentSceneId ? { ...scene, elements: updatedElements } : scene,
    )

    updateStreamState({ scenes: updatedScenes })
    setSelectedElementId(null)
  }

  const handleCanvasClick = () => {
    setSelectedElementId(null)
  }

  const handleCanvasModeChange = (mode: "edit" | "preview" | "live") => {
    updateStreamState({ canvasMode: mode })
    setSelectedElementId(null)
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Enhanced Header */}
      <div className="flex items-center gap-4 mb-6 bg-white rounded-lg p-4 shadow-sm">
        <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          戻る
        </Button>
        <div className="flex items-center gap-4">
          <div className="text-2xl">{member.avatar}</div>
          <div>
            <h1 className="text-xl font-bold">{member.name} - 配信スタジオ Pro</h1>
            <p className="text-gray-600">
              {member.category} • シーン: {scenes.find((s) => s.id === streamState.activeScene)?.name}
            </p>
          </div>
          <Badge
            variant={streamState.isStreaming ? "default" : "secondary"}
            className={streamState.isStreaming ? "bg-red-500 animate-pulse" : ""}
          >
            {streamState.isStreaming ? "🔴 LIVE" : "⚫ オフライン"}
          </Badge>
        </div>
        <div className="ml-auto flex items-center gap-4">
          {streamState.isStreaming && (
            <>
              <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
                <Users className="h-4 w-4 text-blue-500" />
                <span className="font-semibold">{streamState.viewerCount}</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
                <Eye className="h-4 w-4 text-green-500" />
                <span className="font-semibold">{formatDuration(streamState.streamDuration)}</span>
              </div>
            </>
          )}
          <Button
            variant="default"
            size="sm"
            onClick={handleOpenViewerPage}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
          >
            <ExternalLink className="h-4 w-4" />
            視聴者画面を開く
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {/* Main Preview Area */}
        <div className="col-span-3 space-y-6">
          {/* Stream Status Controls */}
          <StreamStatusControls
            currentStatus={streamState.streamStatus}
            isStreaming={streamState.isStreaming}
            onStatusChange={changeStreamStatus}
            onStartStream={handleStartStream}
            onStopStream={handleStopStream}
            viewerCount={streamState.viewerCount}
            streamDuration={streamState.streamDuration}
          />

          {/* Scene Selector */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Layers className="h-5 w-5" />
                  シーン管理
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={saveLayout}>
                    <Save className="h-4 w-4 mr-1" />
                    保存
                  </Button>
                  <Button variant="outline" size="sm" onClick={resetLayout}>
                    <RotateCcw className="h-4 w-4 mr-1" />
                    リセット
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 mb-4">
                {scenes.map((scene) => (
                  <Button
                    key={scene.id}
                    variant={streamState.activeScene === scene.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => changeScene(scene.id)}
                    className="flex-1"
                  >
                    {scene.name}
                  </Button>
                ))}
              </div>
              <div className="flex gap-2">
                <Button
                  variant={streamState.canvasMode === "edit" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleCanvasModeChange("edit")}
                >
                  <Grid className="h-4 w-4 mr-1" />
                  編集
                </Button>
                <Button
                  variant={streamState.canvasMode === "preview" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleCanvasModeChange("preview")}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  プレビュー
                </Button>
                <Button
                  variant={streamState.canvasMode === "live" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleCanvasModeChange("live")}
                >
                  <Video className="h-4 w-4 mr-1" />
                  ライブ
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Video Preview */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Monitor className="h-5 w-5" />
                  配信プレビュー
                </CardTitle>
                <Badge variant="outline" className="text-xs">
                  状態: {streamState.streamStatus}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <OBSCanvas
                streamState={streamState}
                member={member}
                canvasMode={streamState.canvasMode}
                selectedElementId={selectedElementId}
                onElementSelect={handleElementSelect}
                onElementUpdate={handleElementUpdate}
                onElementDelete={handleElementDelete}
                onCanvasClick={handleCanvasClick}
              />
            </CardContent>
          </Card>

          {/* Enhanced Stream Controls */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsMuted(!isMuted)}
                      className={`${isMuted ? "bg-red-500 text-white border-red-500" : "border-gray-300"}`}
                    >
                      {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsVideoOn(!isVideoOn)}
                      className={`${!isVideoOn ? "bg-red-500 text-white border-red-500" : "border-gray-300"}`}
                    >
                      {isVideoOn ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                    </Button>

                    <Button variant="outline" size="sm">
                      <Monitor className="h-4 w-4" />
                    </Button>

                    <Button variant="outline" size="sm">
                      <Share className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>品質: 1080p 60fps</span>
                  </div>
                  <div>ビットレート: 6000 kbps</div>
                  <div className="flex items-center gap-2">
                    {isMuted ? (
                      <VolumeX className="h-4 w-4 text-red-500" />
                    ) : (
                      <Volume2 className="h-4 w-4 text-green-500" />
                    )}
                    <span>音声レベル</span>
                  </div>
                </div>
              </div>

              {/* Audio Level Meters */}
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs">マイク音量</Label>
                  <div className="flex items-center gap-2">
                    <Progress value={isMuted ? 0 : 75} className="flex-1 h-2" />
                    <span className="text-xs w-8">75%</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">BGM音量</Label>
                  <div className="flex items-center gap-2">
                    <Progress value={30} className="flex-1 h-2" />
                    <span className="text-xs w-8">30%</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">システム音</Label>
                  <div className="flex items-center gap-2">
                    <Progress value={50} className="flex-1 h-2" />
                    <span className="text-xs w-8">50%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Right Sidebar */}
        <div className="space-y-6">
          <Tabs defaultValue="models" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="models" className="text-xs">
                <Brain className="h-3 w-3 mr-1" />
                モデル
              </TabsTrigger>
              <TabsTrigger value="layout" className="text-xs">
                <Palette className="h-3 w-3 mr-1" />
                レイアウト
              </TabsTrigger>
              <TabsTrigger value="effects" className="text-xs">
                <Sparkles className="h-3 w-3 mr-1" />
                エフェクト
              </TabsTrigger>
              <TabsTrigger value="chat" className="text-xs">
                <MessageCircle className="h-3 w-3 mr-1" />
                チャット
              </TabsTrigger>
            </TabsList>

            {/* Models Tab */}
            <TabsContent value="models" className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Brain className="h-4 w-4" />
                    LLMモデル
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-xs">プロバイダー</Label>
                    <select
                      className="w-full p-2 text-xs border rounded"
                      value={streamState.modelSettings.llm.provider}
                      onChange={(e) =>
                        updateModelSettings({ llm: { ...streamState.modelSettings.llm, provider: e.target.value } })
                      }
                    >
                      <option value="OpenAI">OpenAI</option>
                      <option value="Anthropic">Anthropic</option>
                      <option value="Google">Google</option>
                      <option value="Local">ローカル</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs">モデル</Label>
                    <select
                      className="w-full p-2 text-xs border rounded"
                      value={streamState.modelSettings.llm.model}
                      onChange={(e) =>
                        updateModelSettings({ llm: { ...streamState.modelSettings.llm, model: e.target.value } })
                      }
                    >
                      <option value="gpt-4o">GPT-4o</option>
                      <option value="gpt-4">GPT-4</option>
                      <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                      <option value="claude-3">Claude 3</option>
                      <option value="gemini-pro">Gemini Pro</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs">創造性: {streamState.modelSettings.llm.temperature}</Label>
                    <Slider
                      value={[streamState.modelSettings.llm.temperature * 100]}
                      onValueChange={(value) =>
                        updateModelSettings({ llm: { ...streamState.modelSettings.llm, temperature: value[0] / 100 } })
                      }
                      max={100}
                      step={5}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs">最大トークン数</Label>
                    <Input
                      type="number"
                      value={streamState.modelSettings.llm.maxTokens}
                      onChange={(e) =>
                        updateModelSettings({
                          llm: { ...streamState.modelSettings.llm, maxTokens: Number.parseInt(e.target.value) },
                        })
                      }
                      className="text-xs"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Mic className="h-4 w-4" />
                    音声モデル
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-xs">音声モデル</Label>
                    <select
                      className="w-full p-2 text-xs border rounded"
                      value={streamState.modelSettings.voice.model}
                      onChange={(e) =>
                        updateModelSettings({ voice: { ...streamState.modelSettings.voice, model: e.target.value } })
                      }
                    >
                      <option value="ミライボイス v2.1">ミライボイス v2.1</option>
                      <option value="標準女性音声">標準女性音声</option>
                      <option value="アニメ風音声">アニメ風音声</option>
                      <option value="カスタム音声">カスタム音声</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs">音声の高さ: {streamState.modelSettings.voice.pitch}%</Label>
                    <Slider
                      value={[streamState.modelSettings.voice.pitch]}
                      onValueChange={(value) =>
                        updateModelSettings({ voice: { ...streamState.modelSettings.voice, pitch: value[0] } })
                      }
                      max={100}
                      step={5}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs">話す速度: {streamState.modelSettings.voice.speed}%</Label>
                    <Slider
                      value={[streamState.modelSettings.voice.speed]}
                      onValueChange={(value) =>
                        updateModelSettings({ voice: { ...streamState.modelSettings.voice, speed: value[0] } })
                      }
                      max={100}
                      step={5}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs">感情表現: {streamState.modelSettings.voice.emotion}%</Label>
                    <Slider
                      value={[streamState.modelSettings.voice.emotion]}
                      onValueChange={(value) =>
                        updateModelSettings({ voice: { ...streamState.modelSettings.voice, emotion: value[0] } })
                      }
                      max={100}
                      step={5}
                      className="w-full"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <User className="h-4 w-4" />
                    VRMモデル
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-xs">VRMモデル</Label>
                    <select
                      className="w-full p-2 text-xs border rounded"
                      value={streamState.modelSettings.vrm.model}
                      onChange={(e) =>
                        updateModelSettings({ vrm: { ...streamState.modelSettings.vrm, model: e.target.value } })
                      }
                    >
                      <option value="ミライアバター v1.5">ミライアバター v1.5</option>
                      <option value="カジュアル衣装">カジュアル衣装</option>
                      <option value="フォーマル衣装">フォーマル衣装</option>
                      <option value="カスタムアバター">カスタムアバター</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs">表情の豊かさ: {streamState.modelSettings.vrm.expressiveness}%</Label>
                    <Slider
                      value={[streamState.modelSettings.vrm.expressiveness]}
                      onValueChange={(value) =>
                        updateModelSettings({ vrm: { ...streamState.modelSettings.vrm, expressiveness: value[0] } })
                      }
                      max={100}
                      step={5}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs">まばたき頻度: {streamState.modelSettings.vrm.blinkRate}%</Label>
                    <Slider
                      value={[streamState.modelSettings.vrm.blinkRate]}
                      onValueChange={(value) =>
                        updateModelSettings({ vrm: { ...streamState.modelSettings.vrm, blinkRate: value[0] } })
                      }
                      max={100}
                      step={5}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs">リップシンク感度: {streamState.modelSettings.vrm.lipSync}%</Label>
                    <Slider
                      value={[streamState.modelSettings.vrm.lipSync]}
                      onValueChange={(value) =>
                        updateModelSettings({ vrm: { ...streamState.modelSettings.vrm, lipSync: value[0] } })
                      }
                      max={100}
                      step={5}
                      className="w-full"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <ImageIcon className="h-4 w-4" />
                    背景・環境
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-xs">背景シーン</Label>
                    <select
                      className="w-full p-2 text-xs border rounded"
                      value={streamState.modelSettings.background.scene}
                      onChange={(e) =>
                        updateModelSettings({
                          background: { ...streamState.modelSettings.background, scene: e.target.value },
                        })
                      }
                    >
                      <option value="ゲーミングルーム">ゲーミングルーム</option>
                      <option value="宇宙ステーション">宇宙ステーション</option>
                      <option value="桜並木">桜並木</option>
                      <option value="カスタム背景">カスタム背景</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs">照明の明るさ: {streamState.modelSettings.background.lighting}%</Label>
                    <Slider
                      value={[streamState.modelSettings.background.lighting]}
                      onValueChange={(value) =>
                        updateModelSettings({
                          background: { ...streamState.modelSettings.background, lighting: value[0] },
                        })
                      }
                      max={100}
                      step={5}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs">影の濃さ: {streamState.modelSettings.background.shadows}%</Label>
                    <Slider
                      value={[streamState.modelSettings.background.shadows]}
                      onValueChange={(value) =>
                        updateModelSettings({
                          background: { ...streamState.modelSettings.background, shadows: value[0] },
                        })
                      }
                      max={100}
                      step={5}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs">パーティクル効果</Label>
                    <select
                      className="w-full p-2 text-xs border rounded"
                      value={streamState.modelSettings.background.particles}
                      onChange={(e) =>
                        updateModelSettings({
                          background: { ...streamState.modelSettings.background, particles: e.target.value },
                        })
                      }
                    >
                      <option value="なし">なし</option>
                      <option value="桜の花びら">桜の花びら</option>
                      <option value="星空">星空</option>
                      <option value="雪">雪</option>
                      <option value="光の粒子">光の粒子</option>
                    </select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Layout Customization Tab */}
            <TabsContent value="layout" className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">プリセット</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    {presets.map((preset) => (
                      <Button
                        key={preset.id}
                        variant="outline"
                        size="sm"
                        onClick={() => applyPreset(preset)}
                        className="h-12 flex flex-col items-center justify-center"
                      >
                        <div className="w-4 h-4 rounded mb-1" style={{ backgroundColor: preset.colors.accent }}></div>
                        <span className="text-xs">{preset.name}</span>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">オーバーレイ設定</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-xs">チャット位置</Label>
                    <select
                      className="w-full p-2 text-xs border rounded"
                      value={streamState.overlaySettings.chatPosition}
                      onChange={(e) => updateOverlaySettings({ chatPosition: e.target.value })}
                    >
                      <option value="left">左</option>
                      <option value="right">右</option>
                      <option value="bottom">下</option>
                      <option value="top">上</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs">透明度: {streamState.overlaySettings.chatOpacity}%</Label>
                    <Slider
                      value={[streamState.overlaySettings.chatOpacity]}
                      onValueChange={(value) => updateOverlaySettings({ chatOpacity: value[0] })}
                      max={100}
                      step={5}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs">フォントサイズ: {streamState.overlaySettings.fontSize}px</Label>
                    <Slider
                      value={[streamState.overlaySettings.fontSize]}
                      onValueChange={(value) => updateOverlaySettings({ fontSize: value[0] })}
                      min={10}
                      max={24}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-xs">視聴者数表示</Label>
                      <Switch
                        checked={streamState.overlaySettings.showViewerCount}
                        onCheckedChange={(checked) => updateOverlaySettings({ showViewerCount: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-xs">LIVEバッジ</Label>
                      <Switch
                        checked={streamState.overlaySettings.showLiveBadge}
                        onCheckedChange={(checked) => updateOverlaySettings({ showLiveBadge: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-xs">フォローボタン</Label>
                      <Switch
                        checked={streamState.overlaySettings.showFollowButton}
                        onCheckedChange={(checked) => updateOverlaySettings({ showFollowButton: checked })}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Effects Tab */}
            <TabsContent value="effects" className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">エフェクト設定</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-xs">フォローエフェクト</Label>
                    <select
                      className="w-full p-2 text-xs border rounded"
                      value={streamState.effectSettings.followEffect}
                      onChange={(e) => updateEffectSettings({ followEffect: e.target.value })}
                    >
                      <option value="confetti">紙吹雪</option>
                      <option value="hearts">ハート</option>
                      <option value="stars">星</option>
                      <option value="fireworks">花火</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs">スーパーチャットエフェクト</Label>
                    <select
                      className="w-full p-2 text-xs border rounded"
                      value={streamState.effectSettings.superChatEffect}
                      onChange={(e) => updateEffectSettings({ superChatEffect: e.target.value })}
                    >
                      <option value="fireworks">花火</option>
                      <option value="rainbow">虹</option>
                      <option value="explosion">爆発</option>
                      <option value="sparkles">キラキラ</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs">エフェクト強度: {streamState.effectSettings.effectIntensity}%</Label>
                    <Slider
                      value={[streamState.effectSettings.effectIntensity]}
                      onValueChange={(value) => updateEffectSettings({ effectIntensity: value[0] })}
                      max={100}
                      step={10}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-xs">サウンドエフェクト</Label>
                      <Switch
                        checked={streamState.effectSettings.soundEffects}
                        onCheckedChange={(checked) => updateEffectSettings({ soundEffects: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-xs">パーティクルエフェクト</Label>
                      <Switch
                        checked={streamState.effectSettings.particleEffects}
                        onCheckedChange={(checked) => updateEffectSettings({ particleEffects: checked })}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">トランジション</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <Label className="text-xs">シーン切り替え効果</Label>
                    <select
                      className="w-full p-2 text-xs border rounded"
                      value={streamState.effectSettings.transitionEffect}
                      onChange={(e) => updateEffectSettings({ transitionEffect: e.target.value })}
                    >
                      <option value="fade">フェード</option>
                      <option value="slide">スライド</option>
                      <option value="zoom">ズーム</option>
                      <option value="flip">フリップ</option>
                    </select>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    <Zap className="h-3 w-3 mr-1" />
                    プレビュー
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Chat Tab */}
            <TabsContent value="chat" className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">ライブチャット</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="h-48 overflow-y-auto p-3 space-y-2 border-b">
                    {streamState.chatMessages.map((msg) => (
                      <div key={msg.id} className="text-xs">
                        {msg.type === "superchat" ? (
                          <div className="bg-yellow-500 bg-opacity-20 border border-yellow-500 rounded p-2">
                            <div className="flex items-center gap-1 mb-1">
                              <Gift className="h-3 w-3 text-yellow-500" />
                              <span className="font-semibold text-yellow-700">{msg.user}</span>
                            </div>
                            <div className="text-yellow-800">{msg.message}</div>
                            <div className="text-xs text-yellow-600 mt-1">¥{msg.amount}</div>
                          </div>
                        ) : (
                          <div className={msg.type === "streamer" ? "bg-blue-50 rounded p-2" : ""}>
                            <div className="flex items-center gap-1 mb-1">
                              <span
                                className={`font-semibold ${msg.type === "streamer" ? "text-blue-600" : "text-gray-700"}`}
                              >
                                {msg.user}
                              </span>
                              <span className="text-xs text-gray-500">{msg.timestamp}</span>
                            </div>
                            <div className="text-gray-800">{msg.message}</div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="p-3">
                    <div className="flex gap-2">
                      <Input
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                        placeholder="メッセージ..."
                        className="text-xs"
                        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      />
                      <Button onClick={handleSendMessage} size="sm">
                        <Send className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">統計</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="text-center p-2 bg-gray-50 rounded">
                      <div className="font-bold text-blue-600">{streamState.viewerCount}</div>
                      <div className="text-gray-600">視聴者</div>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded">
                      <div className="font-bold text-green-600">{streamState.chatMessages.length}</div>
                      <div className="text-gray-600">チャット</div>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded">
                      <div className="font-bold text-purple-600">
                        ¥
                        {streamState.chatMessages
                          .filter((m) => m.type === "superchat")
                          .reduce((sum, m) => sum + (m.amount || 0), 0)}
                      </div>
                      <div className="text-gray-600">収益</div>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded">
                      <div className="font-bold text-orange-600">{formatDuration(streamState.streamDuration)}</div>
                      <div className="text-gray-600">配信時間</div>
                    </div>
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
