"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Plus, Video } from "lucide-react"

export default function SchedulePage() {
  const todaySchedule = [
    {
      time: "14:00",
      member: "星野ミライ",
      title: "マインクラフト建築配信",
      duration: "2時間",
      status: "予定",
    },
    {
      time: "16:30",
      member: "藤原サクラ",
      title: "週間ニュース解説",
      duration: "1時間",
      status: "準備中",
    },
    {
      time: "19:00",
      member: "月川アカリ",
      title: "歌枠：リクエスト受付",
      duration: "1.5時間",
      status: "予定",
    },
    {
      time: "21:00",
      member: "星野ミライ",
      title: "視聴者参加型ゲーム",
      duration: "2時間",
      status: "予定",
    },
  ]

  const weeklyStats = [
    { day: "月", streams: 8, hours: 16 },
    { day: "火", streams: 6, hours: 12 },
    { day: "水", streams: 10, hours: 20 },
    { day: "木", streams: 7, hours: 14 },
    { day: "金", streams: 9, hours: 18 },
    { day: "土", streams: 12, hours: 24 },
    { day: "日", streams: 11, hours: 22 },
  ]

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">配信スケジュール</h1>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          新規配信予約
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <div className="col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                今日の配信予定
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {todaySchedule.map((schedule, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="text-lg font-bold">{schedule.time}</div>
                      <div className="text-sm text-gray-500">{schedule.duration}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Video className="h-5 w-5 text-blue-500" />
                      <div>
                        <div className="font-semibold">{schedule.title}</div>
                        <div className="text-sm text-gray-600">{schedule.member}</div>
                      </div>
                    </div>
                  </div>
                  <Badge
                    variant={schedule.status === "準備中" ? "default" : "secondary"}
                    className={schedule.status === "準備中" ? "bg-yellow-100 text-yellow-800" : ""}
                  >
                    {schedule.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Weekly Overview */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>週間配信統計</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {weeklyStats.map((stat, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="font-medium">{stat.day}曜日</div>
                  <div className="text-right">
                    <div className="text-sm font-semibold">{stat.streams}配信</div>
                    <div className="text-xs text-gray-500">{stat.hours}時間</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                配信時間統計
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">今日</span>
                  <span className="font-semibold">6.5時間</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">今週</span>
                  <span className="font-semibold">42時間</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">今月</span>
                  <span className="font-semibold">168時間</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
