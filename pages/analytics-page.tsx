"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Users, MessageSquare, Heart, Eye } from "lucide-react"

export default function AnalyticsPage() {
  const memberStats = [
    {
      name: "星野ミライ",
      avatar: "🌟",
      followers: 125000,
      avgViewers: 1245,
      totalHours: 156,
      engagement: 8.5,
    },
    {
      name: "藤原サクラ",
      avatar: "🌸",
      followers: 98000,
      avgViewers: 876,
      totalHours: 134,
      engagement: 7.2,
    },
    {
      name: "月川アカリ",
      avatar: "🌙",
      followers: 156000,
      avgViewers: 2187,
      totalHours: 189,
      engagement: 9.1,
    },
  ]

  const monthlyData = [
    { month: "1月", viewers: 45000, hours: 320 },
    { month: "2月", viewers: 52000, hours: 380 },
    { month: "3月", viewers: 48000, hours: 360 },
    { month: "4月", viewers: 61000, hours: 420 },
    { month: "5月", viewers: 58000, hours: 400 },
    { month: "6月", viewers: 67000, hours: 450 },
  ]

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">分析・統計</h1>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600 flex items-center gap-2">
              <Users className="h-4 w-4" />
              総フォロワー数
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">379K</div>
            <div className="text-sm text-green-600 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +12.5%
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600 flex items-center gap-2">
              <Eye className="h-4 w-4" />
              月間視聴時間
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">450h</div>
            <div className="text-sm text-green-600 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +8.2%
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600 flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              平均エンゲージメント
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.3%</div>
            <div className="text-sm text-green-600 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +2.1%
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600 flex items-center gap-2">
              <Heart className="h-4 w-4" />
              収益
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">¥2.1M</div>
            <div className="text-sm text-green-600 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +15.3%
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Member Performance */}
        <Card>
          <CardHeader>
            <CardTitle>メンバー別パフォーマンス</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {memberStats.map((member, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{member.avatar}</div>
                    <div>
                      <div className="font-semibold">{member.name}</div>
                      <div className="text-sm text-gray-600">{member.followers.toLocaleString()} フォロワー</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold">平均視聴者: {member.avgViewers}</div>
                    <div className="text-xs text-gray-500">配信時間: {member.totalHours}h</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>エンゲージメント率</span>
                    <span>{member.engagement}%</span>
                  </div>
                  <Progress value={member.engagement * 10} className="h-2" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Monthly Trends */}
        <Card>
          <CardHeader>
            <CardTitle>月別トレンド</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyData.map((data, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="font-medium">{data.month}</div>
                  <div className="text-right">
                    <div className="text-sm font-semibold">{data.viewers.toLocaleString()} 視聴者</div>
                    <div className="text-xs text-gray-500">{data.hours}時間</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
