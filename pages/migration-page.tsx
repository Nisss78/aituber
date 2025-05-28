"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, ArrowRight, RefreshCw } from "lucide-react"

export default function MigrationPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)

  const migrationSteps = [
    {
      id: 1,
      title: "データベース移行",
      description: "ユーザーデータとメンバー情報を新システムに移行中",
      status: "completed",
      duration: "2分30秒",
    },
    {
      id: 2,
      title: "AIモデル移行",
      description: "LLMモデルと音声モデルを新環境に移行中",
      status: "completed",
      duration: "5分15秒",
    },
    {
      id: 3,
      title: "VRMモデル移行",
      description: "3Dアバターモデルとアニメーションデータを移行中",
      status: "in-progress",
      duration: "推定3分",
    },
    {
      id: 4,
      title: "配信設定移行",
      description: "配信設定とスケジュールデータを移行中",
      status: "pending",
      duration: "推定1分",
    },
    {
      id: 5,
      title: "最終検証",
      description: "移行データの整合性チェックと動作確認",
      status: "pending",
      duration: "推定2分",
    },
  ]

  const memberMigrationStatus = [
    {
      name: "星野ミライ",
      avatar: "🌟",
      status: "completed",
      models: { llm: "✓", voice: "✓", vrm: "✓", background: "✓" },
    },
    {
      name: "藤原サクラ",
      avatar: "🌸",
      status: "completed",
      models: { llm: "✓", voice: "✓", vrm: "✓", background: "✓" },
    },
    {
      name: "月川アカリ",
      avatar: "🌙",
      status: "in-progress",
      models: { llm: "✓", voice: "✓", vrm: "⏳", background: "✓" },
    },
    {
      name: "青空ハルカ",
      avatar: "☀️",
      status: "pending",
      models: { llm: "⏳", voice: "⏳", vrm: "⏳", background: "⏳" },
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setIsCompleted(true)
          clearInterval(timer)
          return 100
        }
        return prev + 1
      })
    }, 100)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const stepTimer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < migrationSteps.length - 1) {
          return prev + 1
        }
        return prev
      })
    }, 3000)

    return () => clearInterval(stepTimer)
  }, [])

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">システム移行中</h1>
        <p className="text-gray-600">新しいAItuberプラットフォームへの移行を実行しています</p>
      </div>

      {/* Overall Progress */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RefreshCw className={`h-5 w-5 ${!isCompleted ? "animate-spin" : ""}`} />
            移行進捗
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">全体進捗</span>
              <span className="text-sm font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-3" />
            <div className="flex justify-between text-sm text-gray-600">
              <span>開始時刻: 14:30:00</span>
              <span>推定完了時刻: 14:45:00</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-6">
        {/* Migration Steps */}
        <Card>
          <CardHeader>
            <CardTitle>移行ステップ</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {migrationSteps.map((step, index) => (
              <div key={step.id} className="flex items-center gap-4 p-3 rounded-lg bg-gray-50">
                <div className="flex-shrink-0">
                  {step.status === "completed" ? (
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  ) : step.status === "in-progress" ? (
                    <RefreshCw className="h-6 w-6 text-blue-500 animate-spin" />
                  ) : (
                    <Clock className="h-6 w-6 text-gray-400" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{step.title}</div>
                  <div className="text-sm text-gray-600">{step.description}</div>
                  <div className="text-xs text-gray-500 mt-1">{step.duration}</div>
                </div>
                <Badge
                  variant={
                    step.status === "completed" ? "default" : step.status === "in-progress" ? "secondary" : "outline"
                  }
                  className={
                    step.status === "completed"
                      ? "bg-green-100 text-green-800"
                      : step.status === "in-progress"
                        ? "bg-blue-100 text-blue-800"
                        : ""
                  }
                >
                  {step.status === "completed" ? "完了" : step.status === "in-progress" ? "実行中" : "待機中"}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Member Migration Status */}
        <Card>
          <CardHeader>
            <CardTitle>メンバー移行状況</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {memberMigrationStatus.map((member, index) => (
              <div key={index} className="p-3 rounded-lg bg-gray-50">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{member.avatar}</div>
                    <div className="font-medium">{member.name}</div>
                  </div>
                  <Badge
                    variant={
                      member.status === "completed"
                        ? "default"
                        : member.status === "in-progress"
                          ? "secondary"
                          : "outline"
                    }
                    className={
                      member.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : member.status === "in-progress"
                          ? "bg-blue-100 text-blue-800"
                          : ""
                    }
                  >
                    {member.status === "completed" ? "完了" : member.status === "in-progress" ? "移行中" : "待機中"}
                  </Badge>
                </div>
                <div className="grid grid-cols-4 gap-2 text-xs">
                  <div className="text-center">
                    <div className="text-gray-600">LLM</div>
                    <div className="text-lg">{member.models.llm}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-gray-600">音声</div>
                    <div className="text-lg">{member.models.voice}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-gray-600">VRM</div>
                    <div className="text-lg">{member.models.vrm}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-gray-600">背景</div>
                    <div className="text-lg">{member.models.background}</div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Migration Complete */}
      {isCompleted && (
        <Card className="mt-6 border-green-200 bg-green-50">
          <CardContent className="p-6 text-center">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-green-800 mb-2">移行完了！</h2>
            <p className="text-green-700 mb-4">すべてのデータが正常に新システムに移行されました。</p>
            <Button className="bg-green-600 hover:bg-green-700">
              <ArrowRight className="h-4 w-4 mr-2" />
              新システムを開始
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
