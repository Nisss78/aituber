"use client"

import { useEffect, useRef, useState } from "react"

export interface ModelSettings {
  llm: {
    provider: string
    model: string
    temperature: number
    maxTokens: number
  }
  voice: {
    model: string
    pitch: number
    speed: number
    emotion: number
  }
  vrm: {
    model: string
    expressiveness: number
    blinkRate: number
    headMovement: number
    lipSync: number
  }
  background: {
    scene: string
    lighting: number
    shadows: number
    colorTemp: number
    blur: number
    particles: string
  }
}

export interface SceneElement {
  id: string
  type: "avatar" | "chat" | "viewer-count" | "live-badge" | "background" | "overlay" | "webcam" | "screen-share"
  name: string
  x: number
  y: number
  width: number
  height: number
  visible: boolean
  locked: boolean
  opacity: number
  rotation: number
  zIndex: number
}

export interface Scene {
  id: string
  name: string
  elements: SceneElement[]
}

// 配信状態の型を追加
export type StreamStatus = "preparation" | "waiting" | "live" | "ended"

export interface StreamState {
  isStreaming: boolean
  streamStatus: StreamStatus // 新しく追加
  viewerCount: number
  streamDuration: number
  activeScene: string
  modelSettings: ModelSettings
  overlaySettings: {
    chatPosition: string
    chatOpacity: number
    chatSize: string
    showViewerCount: boolean
    showLiveBadge: boolean
    showFollowButton: boolean
    backgroundColor: string
    accentColor: string
    fontFamily: string
    fontSize: number
  }
  effectSettings: {
    followEffect: string
    superChatEffect: string
    likeEffect: string
    effectIntensity: number
    soundEffects: boolean
    particleEffects: boolean
    transitionEffect: string
  }
  chatMessages: Array<{
    id: number
    user: string
    message: string
    timestamp: string
    type: string
    amount?: number
  }>
  currentSpeech: string
  currentBubble: string
  scenes: Scene[]
  currentSceneId: string
  canvasMode: "edit" | "preview" | "live"
  selectedElementId: string | null
  // 待機画面・終了画面の設定を追加
  waitingScreen: {
    title: string
    subtitle: string
    startTime: string
    backgroundImage: string
    showCountdown: boolean
  }
  endScreen: {
    title: string
    subtitle: string
    nextStreamTime: string
    showStats: boolean
    thanksMessage: string
  }
}

const initialState: StreamState = {
  isStreaming: false,
  streamStatus: "preparation", // 初期状態は準備中
  viewerCount: 0,
  streamDuration: 0,
  activeScene: "main",
  modelSettings: {
    llm: {
      provider: "OpenAI",
      model: "gpt-4o",
      temperature: 0.7,
      maxTokens: 2048,
    },
    voice: {
      model: "ミライボイス v2.1",
      pitch: 50,
      speed: 60,
      emotion: 80,
    },
    vrm: {
      model: "ミライアバター v1.5",
      expressiveness: 75,
      blinkRate: 60,
      headMovement: 50,
      lipSync: 80,
    },
    background: {
      scene: "ゲーミングルーム",
      lighting: 70,
      shadows: 40,
      colorTemp: 50,
      blur: 20,
      particles: "なし",
    },
  },
  overlaySettings: {
    chatPosition: "left",
    chatOpacity: 90,
    chatSize: "medium",
    showViewerCount: true,
    showLiveBadge: true,
    showFollowButton: true,
    backgroundColor: "#f8f9fa",
    accentColor: "#3b82f6",
    fontFamily: "default",
    fontSize: 14,
  },
  effectSettings: {
    followEffect: "confetti",
    superChatEffect: "fireworks",
    likeEffect: "hearts",
    effectIntensity: 70,
    soundEffects: true,
    particleEffects: true,
    transitionEffect: "fade",
  },
  chatMessages: [
    { id: 1, user: "視聴者1", message: "こんにちは！", timestamp: "14:30", type: "normal" },
    { id: 2, user: "視聴者2", message: "配信お疲れ様です", timestamp: "14:31", type: "normal" },
    { id: 3, user: "視聴者3", message: "スーパーチャット！", timestamp: "14:32", type: "superchat", amount: 500 },
  ],
  currentSpeech:
    "じゃあ、そろそろアンケートを締め切ろうかな。まだ投票してないキミは急いでね！みんなの意見を聞けるの、楽しみにしてるから！",
  currentBubble: "アンケート締め切ろうかな",
  scenes: [
    {
      id: "main",
      name: "メインシーン",
      elements: [
        {
          id: "avatar",
          type: "avatar",
          name: "アバター",
          x: 50,
          y: 40,
          width: 300,
          height: 300,
          visible: true,
          locked: false,
          opacity: 100,
          rotation: 0,
          zIndex: 2,
        },
        {
          id: "chat",
          type: "chat",
          name: "チャット",
          x: 5,
          y: 20,
          width: 350,
          height: 400,
          visible: true,
          locked: false,
          opacity: 90,
          rotation: 0,
          zIndex: 3,
        },
        {
          id: "viewer-count",
          type: "viewer-count",
          name: "視聴者数",
          x: 45,
          y: 5,
          width: 150,
          height: 40,
          visible: true,
          locked: false,
          opacity: 100,
          rotation: 0,
          zIndex: 4,
        },
        {
          id: "live-badge",
          type: "live-badge",
          name: "LIVEバッジ",
          x: 85,
          y: 5,
          width: 100,
          height: 35,
          visible: true,
          locked: false,
          opacity: 100,
          rotation: 0,
          zIndex: 5,
        },
      ],
    },
    {
      id: "game",
      name: "ゲームシーン",
      elements: [
        {
          id: "avatar",
          type: "avatar",
          name: "アバター",
          x: 75,
          y: 65,
          width: 200,
          height: 200,
          visible: true,
          locked: false,
          opacity: 100,
          rotation: 0,
          zIndex: 2,
        },
        {
          id: "chat",
          type: "chat",
          name: "チャット",
          x: 70,
          y: 20,
          width: 280,
          height: 300,
          visible: true,
          locked: false,
          opacity: 85,
          rotation: 0,
          zIndex: 3,
        },
      ],
    },
    {
      id: "chat-focus",
      name: "チャット重視",
      elements: [
        {
          id: "avatar",
          type: "avatar",
          name: "アバター",
          x: 65,
          y: 20,
          width: 250,
          height: 250,
          visible: true,
          locked: false,
          opacity: 100,
          rotation: 0,
          zIndex: 2,
        },
        {
          id: "chat",
          type: "chat",
          name: "チャット",
          x: 5,
          y: 15,
          width: 400,
          height: 500,
          visible: true,
          locked: false,
          opacity: 95,
          rotation: 0,
          zIndex: 3,
        },
      ],
    },
  ],
  currentSceneId: "main",
  canvasMode: "edit",
  selectedElementId: null,
  // 待機画面の設定
  waitingScreen: {
    title: "まもなく配信開始！",
    subtitle: "少々お待ちください",
    startTime: "20:00",
    backgroundImage: "",
    showCountdown: true,
  },
  // 終了画面の設定
  endScreen: {
    title: "配信終了",
    subtitle: "ご視聴ありがとうございました！",
    nextStreamTime: "明日 20:00",
    showStats: true,
    thanksMessage: "今日も楽しい時間をありがとう！また明日会いましょう♪",
  },
}

export function useBroadcastChannel(channelName: string, memberId: number) {
  const channelRef = useRef<BroadcastChannel | null>(null)
  const [streamState, setStreamState] = useState<StreamState>(initialState)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const fullChannelName = `${channelName}-${memberId}`
      channelRef.current = new BroadcastChannel(fullChannelName)

      // Load initial state from localStorage
      const savedState = localStorage.getItem(fullChannelName)
      if (savedState) {
        try {
          const parsedState = JSON.parse(savedState)
          setStreamState((prev) => ({ ...prev, ...parsedState }))
        } catch (error) {
          console.error("Failed to parse saved state:", error)
        }
      }

      channelRef.current.onmessage = (event) => {
        const { type, data } = event.data

        setStreamState((prev) => {
          let newState = prev

          switch (type) {
            case "FULL_STATE_UPDATE":
              newState = { ...prev, ...data }
              break
            case "STREAM_STATE_UPDATE":
              newState = { ...prev, ...data }
              break
            case "STREAM_STATUS_CHANGE":
              newState = { ...prev, streamStatus: data.status }
              break
            case "CHAT_MESSAGE":
              newState = {
                ...prev,
                chatMessages: [...prev.chatMessages.slice(-20), data],
              }
              break
            case "OVERLAY_SETTINGS_UPDATE":
              newState = {
                ...prev,
                overlaySettings: { ...prev.overlaySettings, ...data },
              }
              break
            case "MODEL_SETTINGS_UPDATE":
              newState = {
                ...prev,
                modelSettings: { ...prev.modelSettings, ...data },
              }
              break
            case "EFFECT_SETTINGS_UPDATE":
              newState = {
                ...prev,
                effectSettings: { ...prev.effectSettings, ...data },
              }
              break
            case "SCENE_CHANGE":
              newState = { ...prev, activeScene: data.activeScene }
              break
            case "SPEECH_UPDATE":
              newState = {
                ...prev,
                currentSpeech: data.speech,
                currentBubble: data.bubble,
              }
              break
          }

          // Save to localStorage
          localStorage.setItem(fullChannelName, JSON.stringify(newState))
          return newState
        })
      }
    }

    return () => {
      if (channelRef.current) {
        channelRef.current.close()
      }
    }
  }, [channelName, memberId])

  const broadcast = (type: string, data: any) => {
    if (channelRef.current) {
      channelRef.current.postMessage({ type, data })
    }
  }

  const updateStreamState = (updates: Partial<StreamState>) => {
    setStreamState((prev) => {
      const newState = { ...prev, ...updates }
      localStorage.setItem(`${channelName}-${memberId}`, JSON.stringify(newState))
      return newState
    })
    broadcast("STREAM_STATE_UPDATE", updates)
  }

  const changeStreamStatus = (status: StreamStatus) => {
    setStreamState((prev) => {
      const newState = { ...prev, streamStatus: status }
      localStorage.setItem(`${channelName}-${memberId}`, JSON.stringify(newState))
      return newState
    })
    broadcast("STREAM_STATUS_CHANGE", { status })
  }

  const sendChatMessage = (message: any) => {
    setStreamState((prev) => {
      const newState = {
        ...prev,
        chatMessages: [...prev.chatMessages.slice(-20), message],
      }
      localStorage.setItem(`${channelName}-${memberId}`, JSON.stringify(newState))
      return newState
    })
    broadcast("CHAT_MESSAGE", message)
  }

  const updateOverlaySettings = (settings: Partial<StreamState["overlaySettings"]>) => {
    setStreamState((prev) => {
      const newState = {
        ...prev,
        overlaySettings: { ...prev.overlaySettings, ...settings },
      }
      localStorage.setItem(`${channelName}-${memberId}`, JSON.stringify(newState))
      return newState
    })
    broadcast("OVERLAY_SETTINGS_UPDATE", settings)
  }

  const updateModelSettings = (settings: Partial<ModelSettings>) => {
    setStreamState((prev) => {
      const newState = {
        ...prev,
        modelSettings: { ...prev.modelSettings, ...settings },
      }
      localStorage.setItem(`${channelName}-${memberId}`, JSON.stringify(newState))
      return newState
    })
    broadcast("MODEL_SETTINGS_UPDATE", settings)
  }

  const updateEffectSettings = (settings: Partial<StreamState["effectSettings"]>) => {
    setStreamState((prev) => {
      const newState = {
        ...prev,
        effectSettings: { ...prev.effectSettings, ...settings },
      }
      localStorage.setItem(`${channelName}-${memberId}`, JSON.stringify(newState))
      return newState
    })
    broadcast("EFFECT_SETTINGS_UPDATE", settings)
  }

  const changeScene = (activeScene: string) => {
    setStreamState((prev) => {
      const newState = { ...prev, activeScene }
      localStorage.setItem(`${channelName}-${memberId}`, JSON.stringify(newState))
      return newState
    })
    broadcast("SCENE_CHANGE", { activeScene })
  }

  const updateSpeech = (speech: string, bubble: string) => {
    setStreamState((prev) => {
      const newState = {
        ...prev,
        currentSpeech: speech,
        currentBubble: bubble,
      }
      localStorage.setItem(`${channelName}-${memberId}`, JSON.stringify(newState))
      return newState
    })
    broadcast("SPEECH_UPDATE", { speech, bubble })
  }

  return {
    streamState,
    updateStreamState,
    changeStreamStatus,
    sendChatMessage,
    updateOverlaySettings,
    updateModelSettings,
    updateEffectSettings,
    changeScene,
    updateSpeech,
  }
}
