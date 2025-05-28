"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Calendar,
  BarChart3,
  Settings,
  Users,
  MessageSquare,
  Radio,
  Cpu,
  HardDrive,
  Wifi,
  Zap,
} from "lucide-react"

export default function AItuberDashboard() {
  const sidebarItems = [
    { icon: LayoutDashboard, label: "ダッシュボード", active: true },
    { icon: Calendar, label: "スケジュール" },
    { icon: BarChart3, label: "分析" },
    { icon: Settings, label: "設定" },
    { icon: Users, label: "メンバー一覧" },
  ]

  const activeStreams = [
    {
      name: "星野ミライ",
      activity: "ゲーム実況：マインクラフト",
      viewers: 1245,
      status: "配信中",
    },
    {
      name: "藤原サクラ",
      activity: "雑談配信：週間ニュース",
      viewers: 876,
      status: "配信中",
    },
    {
      name: "月川アカリ",
      activity: "歌配信：リクエスト受付中",
      viewers: 2187,
      status: "配信中",
    },
  ]

  const systemLogs = [
    { time: "10:23:45", type: "INFO", message: "星野ミライの配信が開始されました" },
    { time: "10:24:12", type: "INFO", message: "自動スケーリング：GPUインスタンス追加" },
  ]

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-2xl font-bold">LOGO</h1>
        </div>

        <nav className="flex-1 py-4">
          {sidebarItems.map((item, index) => (
            <Button
              key={index}
              variant={item.active ? "secondary" : "ghost"}
              className={`w-full justify-start px-6 py-3 text-left ${
                item.active ? "bg-gray-600 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.label}
            </Button>
          ))}
        </nav>

        <div className="p-6 border-t border-gray-700">
          <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-gray-700">
            <MessageSquare className="mr-3 h-5 w-5" />
            AGENTchat
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {/* Top Metrics */}
          <div className="grid grid-cols-5 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-gray-600">同時配信数</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  12<span className="text-gray-400">/20</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-gray-600">総視聴者数</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">8,423</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-gray-600">コメント数/分</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-pink-600">642</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-gray-600">CPU使用率</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">67%</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-gray-600">システム状態</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">正常</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Active Streams */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Radio className="h-5 w-5 text-red-500" />
                  アクティブ配信
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {activeStreams.map((stream, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      <div>
                        <div className="font-semibold">{stream.name}</div>
                        <div className="text-sm text-gray-600">{stream.activity}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        {stream.status}
                      </Badge>
                      <div className="text-sm text-gray-600 mt-1">視聴者: {stream.viewers.toLocaleString()}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* System Status and Logs */}
            <Card>
              <CardHeader>
                <CardTitle>システム状態とログ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-3">リソース監視</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Cpu className="h-4 w-4" />
                        <span className="text-sm">CPU</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={67} className="w-20" />
                        <span className="text-sm font-medium">67%</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4" />
                        <span className="text-sm">GPU</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={82} className="w-20" />
                        <span className="text-sm font-medium">82%</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <HardDrive className="h-4 w-4" />
                        <span className="text-sm">メモリ</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={54} className="w-20" />
                        <span className="text-sm font-medium">54%</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Wifi className="h-4 w-4" />
                        <span className="text-sm">ネットワーク</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={43} className="w-20" />
                        <span className="text-sm font-medium">43%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">システムログ</h4>
                  <div className="space-y-2">
                    {systemLogs.map((log, index) => (
                      <div key={index} className="flex items-start gap-2 text-sm">
                        <span className="text-gray-500">[{log.time}]</span>
                        <Badge variant="outline" className="text-xs">
                          {log.type}
                        </Badge>
                        <span className="text-gray-700">{log.message}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
