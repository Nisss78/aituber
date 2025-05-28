"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { ArrowLeft, Upload, Brain, Mic, User, ImageIcon, Palette, Zap, Play, Save, RefreshCw } from "lucide-react"

interface AdvancedMemberSettingsProps {
  memberId: number
  onBack: () => void
}

export default function AdvancedMemberSettings({ memberId, onBack }: AdvancedMemberSettingsProps) {
  const [activeTab, setActiveTab] = useState("llm")

  // Mock member data
  const member = {
    id: memberId,
    name: "星野ミライ",
    avatar: "🌟",
    category: "ゲーム実況",
  }

  const llmModels = [
    { id: "gpt-4", name: "GPT-4", provider: "OpenAI", status: "available" },
    { id: "gpt-3.5", name: "GPT-3.5 Turbo", provider: "OpenAI", status: "available" },
    { id: "claude-3", name: "Claude 3", provider: "Anthropic", status: "available" },
    { id: "gemini-pro", name: "Gemini Pro", provider: "Google", status: "available" },
  ]

  const voiceModels = [
    { id: "voice-1", name: "ミライボイス v2.1", type: "カスタム", status: "active" },
    { id: "voice-2", name: "標準女性音声", type: "プリセット", status: "available" },
    { id: "voice-3", name: "アニメ風音声", type: "プリセット", status: "available" },
  ]

  const vrmModels = [
    { id: "vrm-1", name: "ミライアバター v1.5", size: "15.2MB", status: "active" },
    { id: "vrm-2", name: "カジュアル衣装", size: "12.8MB", status: "available" },
    { id: "vrm-3", name: "フォーマル衣装", size: "14.1MB", status: "available" },
  ]

  const backgrounds = [
    { id: "bg-1", name: "ゲーミングルーム", type: "3D", status: "active" },
    { id: "bg-2", name: "宇宙ステーション", type: "3D", status: "available" },
    { id: "bg-3", name: "桜並木", type: "2D", status: "available" },
    { id: "bg-4", name: "カスタム背景", type: "カスタム", status: "available" },
  ]

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
            <h1 className="text-3xl font-bold">{member.name} - 詳細設定</h1>
            <p className="text-gray-600">AIモデル・デザイン・モーション設定</p>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="llm" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            LLMモデル
          </TabsTrigger>
          <TabsTrigger value="voice" className="flex items-center gap-2">
            <Mic className="h-4 w-4" />
            音声モデル
          </TabsTrigger>
          <TabsTrigger value="vrm" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            VRMモデル
          </TabsTrigger>
          <TabsTrigger value="background" className="flex items-center gap-2">
            <ImageIcon className="h-4 w-4" />
            背景・環境
          </TabsTrigger>
          <TabsTrigger value="design" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            デザイン
          </TabsTrigger>
          <TabsTrigger value="motion" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            モーション
          </TabsTrigger>
        </TabsList>

        {/* LLM Model Tab */}
        <TabsContent value="llm" className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>LLMモデル選択</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {llmModels.map((model) => (
                  <div key={model.id} className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">{model.name}</div>
                      <Badge variant={model.status === "available" ? "secondary" : "default"}>
                        {model.status === "available" ? "利用可能" : "選択中"}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600 mb-3">提供: {model.provider}</div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        詳細
                      </Button>
                      <Button size="sm">選択</Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>LLM設定</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>性格プロンプト</Label>
                  <Textarea
                    placeholder="AIの性格や話し方を詳細に設定..."
                    rows={6}
                    defaultValue="明るく元気な性格で、ゲームが大好き。視聴者との交流を大切にし、常にポジティブな発言を心がける。"
                  />
                </div>
                <div className="space-y-2">
                  <Label>応答速度</Label>
                  <Slider defaultValue={[70]} max={100} step={1} className="w-full" />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>低速</span>
                    <span>高速</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>創造性レベル</Label>
                  <Slider defaultValue={[60]} max={100} step={1} className="w-full" />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>保守的</span>
                    <span>創造的</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>最大トークン数</Label>
                  <Input type="number" defaultValue="2048" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Voice Model Tab */}
        <TabsContent value="voice" className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>音声モデル選択</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {voiceModels.map((model) => (
                  <div key={model.id} className="p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">{model.name}</div>
                      <Badge variant={model.status === "active" ? "default" : "secondary"}>
                        {model.status === "active" ? "使用中" : "利用可能"}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600 mb-3">タイプ: {model.type}</div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Play className="h-4 w-4 mr-1" />
                        試聴
                      </Button>
                      <Button size="sm">選択</Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>音声設定</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>音声の高さ</Label>
                  <Slider defaultValue={[50]} max={100} step={1} className="w-full" />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>低い</span>
                    <span>高い</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>話す速度</Label>
                  <Slider defaultValue={[60]} max={100} step={1} className="w-full" />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>ゆっくり</span>
                    <span>早口</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>感情表現</Label>
                  <Slider defaultValue={[80]} max={100} step={1} className="w-full" />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>控えめ</span>
                    <span>豊か</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>カスタム音声アップロード</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <Upload className="h-6 w-6 mx-auto mb-2 text-gray-400" />
                    <div className="text-sm text-gray-600">音声ファイルをアップロード</div>
                    <Button variant="outline" className="mt-2" size="sm">
                      ファイル選択
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* VRM Model Tab */}
        <TabsContent value="vrm" className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>VRMモデル管理</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {vrmModels.map((model) => (
                  <div key={model.id} className="p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">{model.name}</div>
                      <Badge variant={model.status === "active" ? "default" : "secondary"}>
                        {model.status === "active" ? "使用中" : "利用可能"}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600 mb-3">サイズ: {model.size}</div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        プレビュー
                      </Button>
                      <Button variant="outline" size="sm">
                        編集
                      </Button>
                      <Button size="sm">選択</Button>
                    </div>
                  </div>
                ))}

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <div className="text-sm text-gray-600 mb-2">新しいVRMモデルをアップロード</div>
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    VRMファイル選択
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>アバター設定</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>表情の豊かさ</Label>
                  <Slider defaultValue={[75]} max={100} step={1} className="w-full" />
                </div>
                <div className="space-y-2">
                  <Label>まばたき頻度</Label>
                  <Slider defaultValue={[60]} max={100} step={1} className="w-full" />
                </div>
                <div className="space-y-2">
                  <Label>頭の動き</Label>
                  <Slider defaultValue={[50]} max={100} step={1} className="w-full" />
                </div>
                <div className="space-y-2">
                  <Label>リップシンク感度</Label>
                  <Slider defaultValue={[80]} max={100} step={1} className="w-full" />
                </div>
                <div className="space-y-2">
                  <Label>アイドル時の動き</Label>
                  <select className="w-full p-2 border rounded-md">
                    <option>軽い揺れ</option>
                    <option>呼吸のみ</option>
                    <option>アクティブ</option>
                    <option>静止</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Background Tab */}
        <TabsContent value="background" className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>背景選択</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {backgrounds.map((bg) => (
                  <div key={bg.id} className="p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">{bg.name}</div>
                      <Badge variant={bg.status === "active" ? "default" : "secondary"}>
                        {bg.status === "active" ? "使用中" : "利用可能"}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600 mb-3">タイプ: {bg.type}</div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        プレビュー
                      </Button>
                      <Button size="sm">選択</Button>
                    </div>
                  </div>
                ))}

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <div className="text-sm text-gray-600 mb-2">カスタム背景をアップロード</div>
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    画像選択
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>環境設定</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>照明の明るさ</Label>
                  <Slider defaultValue={[70]} max={100} step={1} className="w-full" />
                </div>
                <div className="space-y-2">
                  <Label>影の濃さ</Label>
                  <Slider defaultValue={[40]} max={100} step={1} className="w-full" />
                </div>
                <div className="space-y-2">
                  <Label>色温度</Label>
                  <Slider defaultValue={[50]} max={100} step={1} className="w-full" />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>暖色</span>
                    <span>寒色</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>背景ぼかし</Label>
                  <Slider defaultValue={[20]} max={100} step={1} className="w-full" />
                </div>
                <div className="space-y-2">
                  <Label>パーティクル効果</Label>
                  <select className="w-full p-2 border rounded-md">
                    <option>なし</option>
                    <option>桜の花びら</option>
                    <option>星空</option>
                    <option>雪</option>
                    <option>光の粒子</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Design Tab */}
        <TabsContent value="design" className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>UI・オーバーレイ設定</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>チャット表示位置</Label>
                  <select className="w-full p-2 border rounded-md">
                    <option>右下</option>
                    <option>左下</option>
                    <option>右上</option>
                    <option>左上</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>チャットの透明度</Label>
                  <Slider defaultValue={[80]} max={100} step={1} className="w-full" />
                </div>
                <div className="space-y-2">
                  <Label>フォントサイズ</Label>
                  <Slider defaultValue={[14]} min={10} max={24} step={1} className="w-full" />
                </div>
                <div className="space-y-2">
                  <Label>アクセントカラー</Label>
                  <div className="flex gap-2">
                    <div className="w-8 h-8 bg-blue-500 rounded cursor-pointer border-2 border-blue-600"></div>
                    <div className="w-8 h-8 bg-pink-500 rounded cursor-pointer"></div>
                    <div className="w-8 h-8 bg-purple-500 rounded cursor-pointer"></div>
                    <div className="w-8 h-8 bg-green-500 rounded cursor-pointer"></div>
                    <div className="w-8 h-8 bg-orange-500 rounded cursor-pointer"></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>エフェクト設定</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>スーパーチャットエフェクト</Label>
                  <select className="w-full p-2 border rounded-md">
                    <option>花火</option>
                    <option>ハート</option>
                    <option>星</option>
                    <option>光の爆発</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>フォロー通知エフェクト</Label>
                  <select className="w-full p-2 border rounded-md">
                    <option>キラキラ</option>
                    <option>虹</option>
                    <option>紙吹雪</option>
                    <option>光の輪</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>エフェクトの強度</Label>
                  <Slider defaultValue={[60]} max={100} step={1} className="w-full" />
                </div>
                <div className="space-y-2">
                  <Label>サウンドエフェクト</Label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked />
                      <span className="text-sm">チャット音</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked />
                      <span className="text-sm">フォロー音</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked />
                      <span className="text-sm">スーパーチャット音</span>
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Motion Tab */}
        <TabsContent value="motion" className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>基本モーション設定</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>挨拶モーション</Label>
                  <select className="w-full p-2 border rounded-md">
                    <option>手を振る</option>
                    <option>お辞儀</option>
                    <option>ピース</option>
                    <option>カスタム</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>喜びモーション</Label>
                  <select className="w-full p-2 border rounded-md">
                    <option>ジャンプ</option>
                    <option>拍手</option>
                    <option>ガッツポーズ</option>
                    <option>ダンス</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>驚きモーション</Label>
                  <select className="w-full p-2 border rounded-md">
                    <option>後ずさり</option>
                    <option>手で口を覆う</option>
                    <option>目を見開く</option>
                    <option>飛び跳ねる</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>モーション速度</Label>
                  <Slider defaultValue={[70]} max={100} step={1} className="w-full" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>自動モーション設定</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>アイドル時の動き頻度</Label>
                  <Slider defaultValue={[30]} max={100} step={1} className="w-full" />
                </div>
                <div className="space-y-2">
                  <Label>感情に応じた自動モーション</Label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked />
                      <span className="text-sm">喜び表現</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked />
                      <span className="text-sm">驚き表現</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" />
                      <span className="text-sm">悲しみ表現</span>
                    </label>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>カスタムモーションアップロード</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <Upload className="h-6 w-6 mx-auto mb-2 text-gray-400" />
                    <div className="text-sm text-gray-600">モーションファイルをアップロード</div>
                    <Button variant="outline" className="mt-2" size="sm">
                      ファイル選択
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <div className="flex justify-end gap-4 mt-6">
        <Button variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          プレビュー
        </Button>
        <Button>
          <Save className="h-4 w-4 mr-2" />
          設定を保存
        </Button>
      </div>
    </div>
  )
}
