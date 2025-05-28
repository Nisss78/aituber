"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Calendar,
  TrendingUp,
  Upload,
  Settings,
  ExternalLink,
  Play,
  MessageSquare,
  Heart,
  Eye,
  Video,
} from "lucide-react"
import StreamInterface from "./stream-interface"

interface MemberDetailPageProps {
  memberId: number
  onBack: () => void
  onAdvancedSettings?: () => void
}

export default function MemberDetailPage({ memberId, onBack, onAdvancedSettings }: MemberDetailPageProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [showStreamInterface, setShowStreamInterface] = useState(false)

  // Mock data for the selected member
  const member = {
    id: memberId,
    name: "星野ミライ",
    avatar: "🌟",
    status: "配信中",
    followers: 125000,
    category: "ゲーム実況",
    joinDate: "2023-01-15",
    totalStreams: 245,
    avgViewers: 1245,
    lastStream: "2時間前",
    description: "マインクラフトとホラーゲームが大好きなAIライバーです！みんなで楽しく配信しましょう♪",
    sns: {
      youtube: "https://youtube.com/@hoshino-mirai",
      tiktok: "https://tiktok.com/@hoshino.mirai",
      twitter: "https://x.com/hoshino_mirai_ai",
    },
  }

  const handleStreamStart = () => {
    setShowStreamInterface(true)
    // Don't automatically open viewer page here anymore
  }

  const scheduleData = [
    {
      date: "2024-01-15",
      time: "14:00",
      title: "マインクラフト建築配信",
      duration: "2時間",
      status: "予定",
    },
    {
      date: "2024-01-15",
      time: "19:00",
      title: "視聴者参加型ホラーゲーム",
      duration: "1.5時間",
      status: "予定",
    },
    {
      date: "2024-01-16",
      time: "16:00",
      title: "雑談配信",
      duration: "1時間",
      status: "予定",
    },
  ]

  const analyticsData = {
    monthlyStats: [
      { month: "12月", viewers: 45000, streams: 28, revenue: 180000 },
      { month: "11月", viewers: 42000, streams: 25, revenue: 165000 },
      { month: "10月", viewers: 38000, streams: 22, revenue: 152000 },
    ],
    topContent: [
      { title: "マインクラフト城建築", views: 15000, likes: 1200, comments: 450 },
      { title: "ホラーゲーム実況", views: 12000, likes: 980, comments: 380 },
      { title: "視聴者との雑談", views: 8500, likes: 750, comments: 290 },
    ],
  }

  if (showStreamInterface) {
    return <StreamInterface memberId={memberId} onBack={() => setShowStreamInterface(false)} />
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          戻る
        </Button>
        <div className="flex items-center gap-4">
          <div className="text-4xl">{member.avatar}</div>
          <div>
            <h1 className="text-3xl font-bold">{member.name}</h1>
            <p className="text-gray-600">{member.category}</p>
          </div>
          <Badge
            variant={member.status === "配信中" ? "default" : "outline"}
            className={member.status === "配信中" ? "bg-green-100 text-green-800" : ""}
          >
            {member.status}
          </Badge>
          <Button
            className="bg-red-500 hover:bg-red-600 text-white flex items-center gap-2"
            onClick={handleStreamStart}
          >
            <Video className="h-4 w-4" />
            配信コントロール
          </Button>
          <Button variant="outline" className="flex items-center gap-2" onClick={onAdvancedSettings}>
            <Settings className="h-4 w-4" />
            詳細設定
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">概要</TabsTrigger>
          <TabsTrigger value="sns">SNS管理</TabsTrigger>
          <TabsTrigger value="schedule">スケジュール</TabsTrigger>
          <TabsTrigger value="analytics">分析</TabsTrigger>
          <TabsTrigger value="models">モデル管理</TabsTrigger>
          <TabsTrigger value="settings">設定</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{member.followers.toLocaleString()}</div>
                <div className="text-sm text-gray-600">フォロワー</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">{member.avgViewers}</div>
                <div className="text-sm text-gray-600">平均視聴者</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{member.totalStreams}</div>
                <div className="text-sm text-gray-600">総配信数</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">8.5%</div>
                <div className="text-sm text-gray-600">エンゲージメント</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>プロフィール</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>自己紹介</Label>
                  <p className="text-sm text-gray-700 mt-1">{member.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">参加日:</span>
                    <span className="ml-2 font-medium">{member.joinDate}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">最終配信:</span>
                    <span className="ml-2 font-medium">{member.lastStream}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>最近の活動</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                  <Play className="h-4 w-4 text-green-500" />
                  <div className="text-sm">
                    <div className="font-medium">マインクラフト建築配信</div>
                    <div className="text-gray-600">2時間前 • 1,245視聴者</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                  <Video className="h-4 w-4 text-blue-500" />
                  <div className="text-sm">
                    <div className="font-medium">TikTok動画投稿</div>
                    <div className="text-gray-600">5時間前 • 8,500再生</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                  <MessageSquare className="h-4 w-4 text-purple-500" />
                  <div className="text-sm">
                    <div className="font-medium">Xでファンとの交流</div>
                    <div className="text-gray-600">1日前 • 450いいね</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Other tabs remain the same... */}
        <TabsContent value="sns" className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>SNSアカウント管理</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="youtube">YouTube</Label>
                  <div className="flex gap-2">
                    <Input id="youtube" defaultValue={member.sns.youtube} />
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tiktok">TikTok</Label>
                  <div className="flex gap-2">
                    <Input id="tiktok" defaultValue={member.sns.tiktok} />
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitter">X (Twitter)</Label>
                  <div className="flex gap-2">
                    <Input id="twitter" defaultValue={member.sns.twitter} />
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Button className="w-full">SNS設定を保存</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>SNS統計</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-red-500 rounded"></div>
                      <span className="text-sm">YouTube</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">125K</div>
                      <div className="text-xs text-gray-500">登録者</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-black rounded"></div>
                      <span className="text-sm">TikTok</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">89K</div>
                      <div className="text-xs text-gray-500">フォロワー</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-blue-500 rounded"></div>
                      <span className="text-sm">X</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">67K</div>
                      <div className="text-xs text-gray-500">フォロワー</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Continue with other tabs... */}
        <TabsContent value="schedule" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">配信スケジュール</h2>
            <Button className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              新規予約
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>今週の予定</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {scheduleData.map((schedule, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="text-sm text-gray-500">{schedule.date}</div>
                      <div className="text-lg font-bold">{schedule.time}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Video className="h-5 w-5 text-blue-500" />
                      <div>
                        <div className="font-semibold">{schedule.title}</div>
                        <div className="text-sm text-gray-600">{schedule.duration}</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{schedule.status}</Badge>
                    <Button variant="ghost" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">45K</div>
                <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
                  <Eye className="h-3 w-3" />
                  月間視聴数
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">28</div>
                <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
                  <Video className="h-3 w-3" />
                  月間配信数
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">¥180K</div>
                <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
                  <Heart className="h-3 w-3" />
                  月間収益
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">8.5%</div>
                <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  成長率
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>月別パフォーマンス</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {analyticsData.monthlyStats.map((stat, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="font-medium">{stat.month}</div>
                    <div className="text-right">
                      <div className="text-sm font-semibold">{stat.viewers.toLocaleString()} 視聴</div>
                      <div className="text-xs text-gray-500">
                        {stat.streams}配信 • ¥{stat.revenue.toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>人気コンテンツ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {analyticsData.topContent.map((content, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <div className="font-medium mb-2">{content.title}</div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {content.views.toLocaleString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="h-3 w-3" />
                        {content.likes.toLocaleString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-3 w-3" />
                        {content.comments}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="models" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">AIモデル管理</h2>
            <Button className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              新しいモデルをアップロード
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>現在のモデル</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">音声モデル v2.1</div>
                    <Badge variant="default" className="bg-green-100 text-green-800">
                      アクティブ
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600 mb-3">最新の音声合成モデル。自然な発話が可能。</div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4 mr-1" />
                      設定
                    </Button>
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-1" />
                      更新
                    </Button>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">3Dアバターモデル v1.5</div>
                    <Badge variant="default" className="bg-green-100 text-green-800">
                      アクティブ
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600 mb-3">高品質な3Dアバター。表情豊かな配信が可能。</div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4 mr-1" />
                      設定
                    </Button>
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-1" />
                      更新
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>モデルアップロード</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>モデルタイプ</Label>
                  <select className="w-full p-2 border rounded-md">
                    <option>音声モデル</option>
                    <option>3Dアバターモデル</option>
                    <option>2Dアバターモデル</option>
                    <option>動作モデル</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label>ファイルアップロード</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <div className="text-sm text-gray-600">ファイルをドラッグ&ドロップまたはクリックして選択</div>
                    <Button variant="outline" className="mt-2">
                      ファイル選択
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="model-name">モデル名</Label>
                  <Input id="model-name" placeholder="モデル名を入力" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="model-description">説明</Label>
                  <Textarea id="model-description" placeholder="モデルの説明を入力" rows={3} />
                </div>

                <Button className="w-full">アップロード開始</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>基本設定</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="display-name">表示名</Label>
                  <Input id="display-name" defaultValue={member.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">カテゴリ</Label>
                  <select className="w-full p-2 border rounded-md" defaultValue={member.category}>
                    <option>ゲーム実況</option>
                    <option>雑談・ニュース</option>
                    <option>歌・音楽</option>
                    <option>アート・創作</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">自己紹介</Label>
                  <Textarea id="bio" defaultValue={member.description} rows={4} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>配信設定</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="stream-quality">配信品質</Label>
                  <select className="w-full p-2 border rounded-md">
                    <option>1080p 60fps</option>
                    <option>1080p 30fps</option>
                    <option>720p 60fps</option>
                    <option>720p 30fps</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-viewers">最大視聴者数</Label>
                  <Input id="max-viewers" type="number" defaultValue="5000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="auto-record">自動録画</Label>
                  <select className="w-full p-2 border rounded-md">
                    <option>有効</option>
                    <option>無効</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-end gap-4">
            <Button variant="outline">変更を破棄</Button>
            <Button>設定を保存</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
