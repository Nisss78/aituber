"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Plus, Search, Calendar, TrendingUp, Settings, Video } from "lucide-react"
import StreamInterface from "./stream-interface"

export default function MembersPage({ onMemberSelect }: { onMemberSelect: (id: number) => void }) {
  const [streamingMemberId, setStreamingMemberId] = useState<number | null>(null)

  const members = [
    {
      id: 1,
      name: "星野ミライ",
      avatar: "🌟",
      status: "配信中",
      followers: 125000,
      category: "ゲーム実況",
      joinDate: "2023-01-15",
      totalStreams: 245,
      avgViewers: 1245,
      lastStream: "2時間前",
    },
    {
      id: 2,
      name: "藤原サクラ",
      avatar: "🌸",
      status: "オフライン",
      followers: 98000,
      category: "雑談・ニュース",
      joinDate: "2023-02-20",
      totalStreams: 189,
      avgViewers: 876,
      lastStream: "1日前",
    },
    {
      id: 3,
      name: "月川アカリ",
      avatar: "🌙",
      status: "配信中",
      followers: 156000,
      category: "歌・音楽",
      joinDate: "2023-01-10",
      totalStreams: 312,
      avgViewers: 2187,
      lastStream: "30分前",
    },
    {
      id: 4,
      name: "青空ハルカ",
      avatar: "☀️",
      status: "休憩中",
      followers: 67000,
      category: "アート・創作",
      joinDate: "2023-03-05",
      totalStreams: 156,
      avgViewers: 543,
      lastStream: "3時間前",
    },
  ]

  const handleStreamStart = (memberId: number) => {
    // 配信コントロール画面を開く
    setStreamingMemberId(memberId)

    // 少し遅れて視聴者画面も開く
    setTimeout(() => {
      const viewerWindow = window.open(
        `/watch/${memberId}`,
        `watch-${memberId}`,
        "width=1200,height=800,scrollbars=yes,resizable=yes",
      )
      if (viewerWindow) {
        viewerWindow.focus()
      }
    }, 2000)
  }

  if (streamingMemberId) {
    return <StreamInterface memberId={streamingMemberId} onBack={() => setStreamingMemberId(null)} />
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">メンバー一覧</h1>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          新メンバー追加
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input placeholder="メンバーを検索..." className="pl-10" />
        </div>
        <select className="px-4 py-2 border rounded-md">
          <option>全てのステータス</option>
          <option>配信中</option>
          <option>オフライン</option>
          <option>休憩中</option>
        </select>
        <select className="px-4 py-2 border rounded-md">
          <option>全てのカテゴリ</option>
          <option>ゲーム実況</option>
          <option>雑談・ニュース</option>
          <option>歌・音楽</option>
          <option>アート・創作</option>
        </select>
      </div>

      {/* Members Grid */}
      <div className="grid grid-cols-2 gap-6">
        {members.map((member) => (
          <Card
            key={member.id}
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => onMemberSelect(member.id)}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{member.avatar}</div>
                  <div>
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                    <p className="text-sm text-gray-600">{member.category}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      member.status === "配信中" ? "default" : member.status === "休憩中" ? "secondary" : "outline"
                    }
                    className={
                      member.status === "配信中"
                        ? "bg-green-100 text-green-800"
                        : member.status === "休憩中"
                          ? "bg-yellow-100 text-yellow-800"
                          : ""
                    }
                  >
                    {member.status}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{member.followers.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">フォロワー</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{member.avgViewers}</div>
                  <div className="text-sm text-gray-600">平均視聴者</div>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">総配信数:</span>
                  <span className="font-medium">{member.totalStreams}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">最終配信:</span>
                  <span className="font-medium">{member.lastStream}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">参加日:</span>
                  <span className="font-medium">{member.joinDate}</span>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" className="flex-1">
                  <Calendar className="h-4 w-4 mr-1" />
                  スケジュール
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  分析
                </Button>
                <Button
                  size="sm"
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleStreamStart(member.id)
                  }}
                >
                  <Video className="h-4 w-4 mr-1" />
                  配信開始
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-4 gap-4 mt-6">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{members.length}</div>
            <div className="text-sm text-gray-600">総メンバー数</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {members.filter((m) => m.status === "配信中").length}
            </div>
            <div className="text-sm text-gray-600">配信中</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {members.reduce((sum, m) => sum + m.followers, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">総フォロワー数</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {Math.round(members.reduce((sum, m) => sum + m.avgViewers, 0) / members.length)}
            </div>
            <div className="text-sm text-gray-600">平均視聴者数</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
