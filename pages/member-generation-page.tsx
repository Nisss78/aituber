"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import {
  Sparkles,
  Brain,
  Mic,
  User,
  Palette,
  Save,
  Upload,
  RefreshCw,
  Check,
  Play,
  Wand2,
  Loader2,
  Download,
  Lightbulb,
  Dices,
  Layers,
  Sliders,
} from "lucide-react"

export default function MemberGenerationPage() {
  const [activeTab, setActiveTab] = useState("persona")
  const [generatingPersona, setGeneratingPersona] = useState(false)
  const [generatingVoice, setGeneratingVoice] = useState(false)
  const [generatingVRM, setGeneratingVRM] = useState(false)
  const [tuningLLM, setTuningLLM] = useState(false)
  const [progress, setProgress] = useState(0)
  const [previewMode, setPreviewMode] = useState(false)

  // Mock data for persona suggestions
  const personaSuggestions = [
    {
      name: "星空ルナ",
      type: "ゲーマー系",
      description: "ゲームが大好きな元気な女の子。特にFPSとRPGが得意。視聴者と一緒にゲームを楽しむのが目標。",
      traits: ["明るい", "元気", "負けず嫌い", "フレンドリー"],
      interests: ["ゲーム", "アニメ", "テクノロジー"],
      avatar: "🌙",
    },
    {
      name: "桜木カナ",
      type: "アーティスト系",
      description: "イラストと音楽が大好きな繊細な女の子。自分の作品を配信で披露しながら、視聴者と交流するのが好き。",
      traits: ["優しい", "繊細", "創造的", "夢見がち"],
      interests: ["イラスト", "音楽", "ファッション"],
      avatar: "🌸",
    },
    {
      name: "青山ハルト",
      type: "知的系",
      description: "本が大好きな博識な男の子。様々な知識を視聴者と共有し、一緒に学ぶことを楽しんでいる。",
      traits: ["冷静", "知的", "好奇心旺盛", "分析的"],
      interests: ["読書", "科学", "歴史", "哲学"],
      avatar: "📚",
    },
  ]

  // Mock voice samples
  const voiceSamples = [
    { id: "voice-1", name: "明るい女性", type: "女性", pitch: "高め", sample: "sample1.mp3" },
    { id: "voice-2", name: "落ち着いた女性", type: "女性", pitch: "中", sample: "sample2.mp3" },
    { id: "voice-3", name: "元気な男性", type: "男性", pitch: "中高", sample: "sample3.mp3" },
    { id: "voice-4", name: "渋い男性", type: "男性", pitch: "低め", sample: "sample4.mp3" },
    { id: "voice-5", name: "かわいい女性", type: "女性", pitch: "高め", sample: "sample5.mp3" },
  ]

  // Mock VRM models
  const vrmModels = [
    { id: "vrm-1", name: "スタンダード女性", type: "女性", style: "アニメ調", preview: "preview1.png" },
    { id: "vrm-2", name: "スタンダード男性", type: "男性", style: "アニメ調", preview: "preview2.png" },
    { id: "vrm-3", name: "ファンタジー女性", type: "女性", style: "ファンタジー", preview: "preview3.png" },
    { id: "vrm-4", name: "ファンタジー男性", type: "男性", style: "ファンタジー", preview: "preview4.png" },
    { id: "vrm-5", name: "SF風女性", type: "女性", style: "SF", preview: "preview5.png" },
  ]

  // Mock LLM models
  const llmModels = [
    { id: "llm-1", name: "GPT-4o", provider: "OpenAI", speciality: "汎用" },
    { id: "llm-2", name: "Claude 3", provider: "Anthropic", speciality: "長文理解" },
    { id: "llm-3", name: "Gemini Pro", provider: "Google", speciality: "マルチモーダル" },
    { id: "llm-4", name: "Llama 3", provider: "Meta", speciality: "オープンソース" },
    { id: "llm-5", name: "AItuber特化モデル", provider: "自社開発", speciality: "配信特化" },
  ]

  const handleGeneratePersona = () => {
    setGeneratingPersona(true)
    setProgress(0)

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setGeneratingPersona(false)
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  const handleGenerateVoice = () => {
    setGeneratingVoice(true)
    setProgress(0)

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setGeneratingVoice(false)
          return 100
        }
        return prev + 5
      })
    }, 200)
  }

  const handleGenerateVRM = () => {
    setGeneratingVRM(true)
    setProgress(0)

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setGeneratingVRM(false)
          return 100
        }
        return prev + 2
      })
    }, 100)
  }

  const handleTuneLLM = () => {
    setTuningLLM(true)
    setProgress(0)

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTuningLLM(false)
          return 100
        }
        return prev + 4
      })
    }, 150)
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Sparkles className="h-8 w-8 text-purple-500" />
          AItuberメンバー生成
        </h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setPreviewMode(!previewMode)}>
            {previewMode ? "編集モード" : "プレビューモード"}
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Save className="h-4 w-4 mr-2" />
            メンバーを保存
          </Button>
        </div>
      </div>

      {previewMode ? (
        <div className="grid grid-cols-2 gap-6">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>AItuberプレビュー</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center p-8">
              <div className="text-8xl mb-6">🌟</div>
              <h2 className="text-3xl font-bold mb-2">星空ルナ</h2>
              <div className="text-gray-600 mb-6">ゲーマー系AItuber</div>

              <div className="w-full max-w-md bg-gray-100 p-6 rounded-lg mb-6">
                <div className="text-lg font-medium mb-4">
                  「こんにちは！星空ルナです！今日はみんなと一緒にゲームを楽しみたいと思います！よろしくね！」
                </div>
                <div className="flex justify-center">
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Play className="h-4 w-4 mr-2" />
                    音声を再生
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 w-full max-w-md">
                <div className="text-center p-3 bg-purple-100 rounded-lg">
                  <div className="font-semibold text-purple-800">性格</div>
                  <div className="text-sm text-gray-600">明るい、元気</div>
                </div>
                <div className="text-center p-3 bg-blue-100 rounded-lg">
                  <div className="font-semibold text-blue-800">声質</div>
                  <div className="text-sm text-gray-600">女性・高め</div>
                </div>
                <div className="text-center p-3 bg-green-100 rounded-lg">
                  <div className="font-semibold text-green-800">特技</div>
                  <div className="text-sm text-gray-600">FPS、RPG</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="persona" className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              ペルソナ設定
            </TabsTrigger>
            <TabsTrigger value="llm" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              言語モデル
            </TabsTrigger>
            <TabsTrigger value="voice" className="flex items-center gap-2">
              <Mic className="h-4 w-4" />
              音声モデル
            </TabsTrigger>
            <TabsTrigger value="vrm" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              VRMモデル
            </TabsTrigger>
            <TabsTrigger value="final" className="flex items-center gap-2">
              <Layers className="h-4 w-4" />
              最終調整
            </TabsTrigger>
          </TabsList>

          {/* Persona Tab */}
          <TabsContent value="persona" className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-yellow-500" />
                    基本ペルソナ設定
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">名前</Label>
                    <Input id="name" placeholder="AItuberの名前" defaultValue="星空ルナ" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="avatar">アバター絵文字</Label>
                    <Input id="avatar" placeholder="絵文字を入力" defaultValue="🌟" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="type">タイプ</Label>
                    <select className="w-full p-2 border rounded-md" defaultValue="ゲーマー系">
                      <option value="ゲーマー系">ゲーマー系</option>
                      <option value="アーティスト系">アーティスト系</option>
                      <option value="知的系">知的系</option>
                      <option value="アイドル系">アイドル系</option>
                      <option value="コメディアン系">コメディアン系</option>
                      <option value="カスタム">カスタム</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">自己紹介・設定</Label>
                    <Textarea
                      id="description"
                      rows={5}
                      placeholder="AItuberの自己紹介や設定を入力"
                      defaultValue="ゲームが大好きな元気な女の子。特にFPSとRPGが得意。視聴者と一緒にゲームを楽しむのが目標。"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>性格特性</Label>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">明るい</Badge>
                      <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">元気</Badge>
                      <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">負けず嫌い</Badge>
                      <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">フレンドリー</Badge>
                      <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">+ 追加</Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>興味・関心</Label>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">ゲーム</Badge>
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">アニメ</Badge>
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">テクノロジー</Badge>
                      <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">+ 追加</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sliders className="h-5 w-5 text-blue-500" />
                    詳細設定
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>話し方の特徴</Label>
                    <Textarea
                      rows={3}
                      placeholder="話し方の特徴や口癖など"
                      defaultValue="語尾に「〜だよ！」をつけることが多い。ゲーム用語をよく使う。"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>バックストーリー</Label>
                    <Textarea
                      rows={3}
                      placeholder="AItuberのバックストーリー"
                      defaultValue="小さい頃からゲームが好きで、プロゲーマーを目指していたが、より多くの人とゲームの楽しさを共有したいと思いAItuberになることを決意した。"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>明るさ - 暗さ</Label>
                    <Slider defaultValue={[80]} max={100} step={1} className="w-full" />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>暗い</span>
                      <span>明るい</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>内向的 - 外交的</Label>
                    <Slider defaultValue={[75]} max={100} step={1} className="w-full" />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>内向的</span>
                      <span>外交的</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>論理的 - 感情的</Label>
                    <Slider defaultValue={[60]} max={100} step={1} className="w-full" />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>論理的</span>
                      <span>感情的</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>真面目 - ふざけた</Label>
                    <Slider defaultValue={[50]} max={100} step={1} className="w-full" />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>真面目</span>
                      <span>ふざけた</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Dices className="h-5 w-5 text-green-500" />
                  ペルソナ生成・サジェスト
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-4 items-center">
                    <Button
                      onClick={handleGeneratePersona}
                      disabled={generatingPersona}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      {generatingPersona ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          生成中...
                        </>
                      ) : (
                        <>
                          <Wand2 className="h-4 w-4 mr-2" />
                          AIでペルソナを生成
                        </>
                      )}
                    </Button>

                    {generatingPersona && (
                      <div className="flex-1">
                        <Progress value={progress} className="h-2" />
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-4 mt-4">
                    {personaSuggestions.map((persona, index) => (
                      <Card key={index} className="hover:shadow-md cursor-pointer transition-shadow">
                        <CardContent className="p-4">
                          <div className="text-center text-3xl mb-2">{persona.avatar}</div>
                          <div className="font-bold text-center mb-1">{persona.name}</div>
                          <div className="text-xs text-gray-500 text-center mb-2">{persona.type}</div>
                          <div className="text-xs text-gray-700 mb-3 line-clamp-3">{persona.description}</div>
                          <div className="flex flex-wrap gap-1 mb-2">
                            {persona.traits.slice(0, 2).map((trait, i) => (
                              <Badge key={i} className="bg-purple-100 text-purple-800 text-xs">
                                {trait}
                              </Badge>
                            ))}
                            {persona.traits.length > 2 && (
                              <Badge className="bg-gray-100 text-gray-800 text-xs">+{persona.traits.length - 2}</Badge>
                            )}
                          </div>
                          <Button variant="outline" size="sm" className="w-full text-xs">
                            適用
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* LLM Tab */}
          <TabsContent value="llm" className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-purple-500" />
                    言語モデル選択
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>ベースモデル</Label>
                    <select className="w-full p-2 border rounded-md" defaultValue="llm-1">
                      {llmModels.map((model) => (
                        <option key={model.id} value={model.id}>
                          {model.name} ({model.provider}) - {model.speciality}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label>モデルサイズ</Label>
                    <select className="w-full p-2 border rounded-md" defaultValue="中 (バランス)">
                      <option value="小 (高速・低コスト)">小 (高速・低コスト)</option>
                      <option value="中 (バランス)">中 (バランス)</option>
                      <option value="大 (高品質・高コスト)">大 (高品質・高コスト)</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label>コンテキスト長</Label>
                    <select className="w-full p-2 border rounded-md" defaultValue="中 (8K tokens)">
                      <option value="短 (4K tokens)">短 (4K tokens)</option>
                      <option value="中 (8K tokens)">中 (8K tokens)</option>
                      <option value="長 (16K tokens)">長 (16K tokens)</option>
                      <option value="超長 (32K tokens)">超長 (32K tokens)</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label>チューニング方法</Label>
                    <select className="w-full p-2 border rounded-md" defaultValue="ファインチューニング">
                      <option value="プロンプトエンジニアリング">プロンプトエンジニアリング</option>
                      <option value="ファインチューニング">ファインチューニング</option>
                      <option value="RAG (検索拡張生成)">RAG (検索拡張生成)</option>
                      <option value="ハイブリッド">ハイブリッド</option>
                    </select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sliders className="h-5 w-5 text-blue-500" />
                    モデルパラメータ
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>温度 (Temperature): 0.7</Label>
                    <Slider defaultValue={[70]} max={100} step={1} className="w-full" />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>決定的 (0.0)</span>
                      <span>創造的 (1.0)</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Top P: 0.9</Label>
                    <Slider defaultValue={[90]} max={100} step={1} className="w-full" />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>確実 (0.5)</span>
                      <span>多様 (1.0)</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>最大出力トークン</Label>
                    <Input type="number" defaultValue="2048" />
                  </div>

                  <div className="space-y-2">
                    <Label>システムプロンプト</Label>
                    <Textarea
                      rows={4}
                      placeholder="モデルの基本的な指示"
                      defaultValue="あなたは「星空ルナ」というゲーム好きな女性AItuberです。明るく元気な性格で、視聴者と楽しくコミュニケーションを取ることを心がけてください。ゲーム用語をよく使い、語尾に「〜だよ！」をつけることが多いです。"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RefreshCw className="h-5 w-5 text-green-500" />
                  チューニングと検証
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>チューニングデータ</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                        <Upload className="h-6 w-6 mx-auto mb-2 text-gray-400" />
                        <div className="text-sm text-gray-600 mb-2">会話サンプルやスクリプトをアップロード</div>
                        <Button variant="outline" size="sm">
                          ファイル選択
                        </Button>
                      </div>
                    </div>

                    <div className="flex gap-4 items-center">
                      <Button onClick={handleTuneLLM} disabled={tuningLLM} className="bg-green-600 hover:bg-green-700">
                        {tuningLLM ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            チューニング中...
                          </>
                        ) : (
                          <>
                            <RefreshCw className="h-4 w-4 mr-2" />
                            モデルをチューニング
                          </>
                        )}
                      </Button>

                      {tuningLLM && (
                        <div className="flex-1">
                          <Progress value={progress} className="h-2" />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>応答テスト</Label>
                    <div className="border rounded-lg p-4 bg-gray-50 space-y-4">
                      <div className="space-y-2">
                        <Input
                          placeholder="テストメッセージを入力"
                          defaultValue="こんにちは！好きなゲームは何ですか？"
                        />
                        <Button variant="outline" size="sm" className="w-full">
                          テスト実行
                        </Button>
                      </div>

                      <div className="bg-white p-3 rounded border text-sm">
                        <div className="font-semibold mb-1">応答プレビュー:</div>
                        <div className="text-gray-700">
                          こんにちは！星空ルナだよ！好きなゲームは何って聞かれると迷っちゃうな〜。FPSだとVALORANTが大好きだし、RPGならFF14をよくプレイしてるよ！あとは最近はホラーゲームにもハマってて、Phasmophobiaとか配信でよくやってるんだ！視聴者さんは何のゲームが好きなの？一緒にプレイできたら楽しいよね！
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <div className="font-medium text-blue-800 mb-2">チューニング状態</div>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="text-gray-600">ペルソナ一致度</div>
                      <div className="font-semibold text-blue-700">92%</div>
                    </div>
                    <div>
                      <div className="text-gray-600">応答速度</div>
                      <div className="font-semibold text-blue-700">高速</div>
                    </div>
                    <div>
                      <div className="text-gray-600">文脈理解</div>
                      <div className="font-semibold text-blue-700">良好</div>
                    </div>
                    <div>
                      <div className="text-gray-600">モデルサイズ</div>
                      <div className="font-semibold text-blue-700">2.1GB</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Voice Tab */}
          <TabsContent value="voice" className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mic className="h-5 w-5 text-red-500" />
                    音声モデル設定
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>音声タイプ</Label>
                    <select className="w-full p-2 border rounded-md" defaultValue="女性 - 若い">
                      <option value="女性 - 若い">女性 - 若い</option>
                      <option value="女性 - 大人">女性 - 大人</option>
                      <option value="男性 - 若い">男性 - 若い</option>
                      <option value="男性 - 大人">男性 - 大人</option>
                      <option value="中性的">中性的</option>
                      <option value="カスタム">カスタム</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label>音声サンプル</Label>
                    <div className="space-y-2">
                      {voiceSamples.slice(0, 3).map((sample, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 border rounded hover:bg-gray-50"
                        >
                          <div>
                            <div className="font-medium">{sample.name}</div>
                            <div className="text-xs text-gray-600">
                              {sample.type} / ピッチ: {sample.pitch}
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            <Play className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>カスタム音声サンプル</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <Upload className="h-6 w-6 mx-auto mb-2 text-gray-400" />
                      <div className="text-sm text-gray-600 mb-2">音声サンプルをアップロード (30秒以上推奨)</div>
                      <Button variant="outline" size="sm">
                        ファイル選択
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sliders className="h-5 w-5 text-blue-500" />
                    音声パラメータ調整
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>音の高さ (ピッチ): +20%</Label>
                    <Slider defaultValue={[70]} max={100} step={1} className="w-full" />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>低い (-50%)</span>
                      <span>高い (+50%)</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>話す速度: +10%</Label>
                    <Slider defaultValue={[60]} max={100} step={1} className="w-full" />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>遅い (-50%)</span>
                      <span>速い (+50%)</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>抑揚 (イントネーション): +15%</Label>
                    <Slider defaultValue={[65]} max={100} step={1} className="w-full" />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>平坦 (-50%)</span>
                      <span>強調 (+50%)</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>声質 (クリアさ): +5%</Label>
                    <Slider defaultValue={[55]} max={100} step={1} className="w-full" />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>ソフト (-50%)</span>
                      <span>クリア (+50%)</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>感情表現: +25%</Label>
                    <Slider defaultValue={[75]} max={100} step={1} className="w-full" />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>控えめ (-50%)</span>
                      <span>豊か (+50%)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wand2 className="h-5 w-5 text-green-500" />
                  音声生成とテスト
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>テストテキスト</Label>
                      <Textarea
                        rows={3}
                        placeholder="音声変換するテキストを入力"
                        defaultValue="こんにちは！星空ルナです！今日はみんなと一緒にゲームを楽しみたいと思います！よろしくね！"
                      />
                    </div>

                    <div className="flex gap-4 items-center">
                      <Button
                        onClick={handleGenerateVoice}
                        disabled={generatingVoice}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        {generatingVoice ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            生成中...
                          </>
                        ) : (
                          <>
                            <Wand2 className="h-4 w-4 mr-2" />
                            音声を生成
                          </>
                        )}
                      </Button>

                      {generatingVoice && (
                        <div className="flex-1">
                          <Progress value={progress} className="h-2" />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>生成結果</Label>
                      <div className="border rounded-lg p-4 bg-gray-50 h-[120px] flex flex-col items-center justify-center">
                        <Button className="mb-2">
                          <Play className="h-4 w-4 mr-2" />
                          音声を再生
                        </Button>
                        <div className="text-sm text-gray-600">生成された音声: sample_output.mp3</div>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        音声をダウンロード
                      </Button>
                      <Button variant="outline" size="sm">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        再生成
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <div className="font-medium text-blue-800 mb-2">音声モデル情報</div>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="text-gray-600">モデルタイプ</div>
                      <div className="font-semibold text-blue-700">Neural TTS</div>
                    </div>
                    <div>
                      <div className="text-gray-600">サンプリングレート</div>
                      <div className="font-semibold text-blue-700">24kHz</div>
                    </div>
                    <div>
                      <div className="text-gray-600">モデルサイズ</div>
                      <div className="font-semibold text-blue-700">125MB</div>
                    </div>
                    <div>
                      <div className="text-gray-600">生成速度</div>
                      <div className="font-semibold text-blue-700">リアルタイム</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* VRM Tab */}
          <TabsContent value="vrm" className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-indigo-500" />
                    VRMモデル設定
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>モデルタイプ</Label>
                    <select className="w-full p-2 border rounded-md" defaultValue="アニメ調 - 女性">
                      <option value="アニメ調 - 女性">アニメ調 - 女性</option>
                      <option value="アニメ調 - 男性">アニメ調 - 男性</option>
                      <option value="リアル調 - 女性">リアル調 - 女性</option>
                      <option value="リアル調 - 男性">リアル調 - 男性</option>
                      <option value="ファンタジー">ファンタジー</option>
                      <option value="SF">SF</option>
                      <option value="カスタム">カスタム</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label>ベースモデル</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {vrmModels.slice(0, 3).map((model, index) => (
                        <div
                          key={index}
                          className={`border rounded-lg p-2 text-center cursor-pointer hover:bg-gray-50 ${index === 0 ? "ring-2 ring-blue-500" : ""}`}
                        >
                          <div className="w-full h-24 bg-gray-200 rounded mb-2 flex items-center justify-center">
                            <User className="h-8 w-8 text-gray-400" />
                          </div>
                          <div className="text-xs font-medium">{model.name}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>カスタムVRMモデル</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <Upload className="h-6 w-6 mx-auto mb-2 text-gray-400" />
                      <div className="text-sm text-gray-600 mb-2">VRMファイルをアップロード</div>
                      <Button variant="outline" size="sm">
                        ファイル選択
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>テクスチャ・マテリアル</Label>
                    <select className="w-full p-2 border rounded-md" defaultValue="アニメ風">
                      <option value="標準">標準</option>
                      <option value="アニメ風">アニメ風</option>
                      <option value="セル調">セル調</option>
                      <option value="リアル調">リアル調</option>
                      <option value="カスタム">カスタム</option>
                    </select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="h-5 w-5 text-pink-500" />
                    外見カスタマイズ
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>髪の色</Label>
                      <div className="flex gap-2">
                        <div className="w-8 h-8 bg-blue-400 rounded-full cursor-pointer border-2 border-blue-500"></div>
                        <div className="w-8 h-8 bg-pink-400 rounded-full cursor-pointer"></div>
                        <div className="w-8 h-8 bg-purple-400 rounded-full cursor-pointer"></div>
                        <div className="w-8 h-8 bg-yellow-400 rounded-full cursor-pointer"></div>
                        <div className="w-8 h-8 bg-black rounded-full cursor-pointer"></div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>目の色</Label>
                      <div className="flex gap-2">
                        <div className="w-8 h-8 bg-blue-500 rounded-full cursor-pointer border-2 border-blue-600"></div>
                        <div className="w-8 h-8 bg-green-500 rounded-full cursor-pointer"></div>
                        <div className="w-8 h-8 bg-amber-500 rounded-full cursor-pointer"></div>
                        <div className="w-8 h-8 bg-purple-500 rounded-full cursor-pointer"></div>
                        <div className="w-8 h-8 bg-red-500 rounded-full cursor-pointer"></div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>衣装スタイル</Label>
                    <select className="w-full p-2 border rounded-md" defaultValue="ゲーマー">
                      <option value="カジュアル">カジュアル</option>
                      <option value="ゲーマー">ゲーマー</option>
                      <option value="フォーマル">フォーマル</option>
                      <option value="スポーティ">スポーティ</option>
                      <option value="ファンタジー">ファンタジー</option>
                      <option value="SF">SF</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label>アクセサリー</Label>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-gray-100 text-gray-800">ヘッドフォン</Badge>
                      <Badge className="bg-gray-100 text-gray-800">メガネ</Badge>
                      <Badge className="bg-gray-100 text-gray-800">帽子</Badge>
                      <Badge className="bg-gray-100 text-gray-800">+ 追加</Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>体型</Label>
                    <select className="w-full p-2 border rounded-md" defaultValue="標準">
                      <option value="スリム">スリム</option>
                      <option value="標準">標準</option>
                      <option value="アスリート">アスリート</option>
                      <option value="ちびキャラ">ちびキャラ</option>
                      <option value="カスタム">カスタム</option>
                    </select>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wand2 className="h-5 w-5 text-green-500" />
                  VRMモデル生成
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>モデル生成プロンプト</Label>
                      <Textarea
                        rows={3}
                        placeholder="モデルの詳細な説明"
                        defaultValue="青い髪と青い目を持つ元気な女の子。ゲーマー風の服装で、ヘッドフォンを着用している。表情が豊かで、笑顔が特徴的。"
                      />
                    </div>

                    <div className="flex gap-4 items-center">
                      <Button
                        onClick={handleGenerateVRM}
                        disabled={generatingVRM}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        {generatingVRM ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            生成中...
                          </>
                        ) : (
                          <>
                            <Wand2 className="h-4 w-4 mr-2" />
                            VRMモデルを生成
                          </>
                        )}
                      </Button>

                      {generatingVRM && (
                        <div className="flex-1">
                          <Progress value={progress} className="h-2" />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>プレビュー</Label>
                    <div className="border rounded-lg p-4 bg-gray-50 h-[150px] flex items-center justify-center">
                      <div className="text-center">
                        <User className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                        <div className="text-sm text-gray-600">モデルプレビュー</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <div className="font-medium text-blue-800 mb-2">モデル情報</div>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="text-gray-600">ポリゴン数</div>
                      <div className="font-semibold text-blue-700">20K</div>
                    </div>
                    <div>
                      <div className="text-gray-600">テクスチャ解像度</div>
                      <div className="font-semibold text-blue-700">2K</div>
                    </div>
                    <div>
                      <div className="text-gray-600">ブレンドシェイプ</div>
                      <div className="font-semibold text-blue-700">52個</div>
                    </div>
                    <div>
                      <div className="text-gray-600">ファイルサイズ</div>
                      <div className="font-semibold text-blue-700">15MB</div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mt-4">
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    VRMをダウンロード
                  </Button>
                  <Button variant="outline">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    モデルを調整
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Final Tab */}
          <TabsContent value="final" className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    最終確認
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>AItuber名</Label>
                    <div className="flex items-center gap-2">
                      <div className="text-2xl">🌟</div>
                      <div className="text-xl font-bold">星空ルナ</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>タイプ</Label>
                    <div className="font-medium">ゲーマー系</div>
                  </div>

                  <div className="space-y-2">
                    <Label>自己紹介</Label>
                    <div className="text-sm text-gray-700">
                      ゲームが大好きな元気な女の子。特にFPSとRPGが得意。視聴者と一緒にゲームを楽しむのが目標。
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>モデル構成</Label>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">言語モデル:</span>
                        <span className="font-medium">GPT-4o (ファインチューン済み)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">音声モデル:</span>
                        <span className="font-medium">Neural TTS (カスタム)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">VRMモデル:</span>
                        <span className="font-medium">アニメ調 - ゲーマー風</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>配信設定</Label>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">推奨解像度:</span>
                        <span className="font-medium">1080p</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">推奨FPS:</span>
                        <span className="font-medium">60fps</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">必要スペック:</span>
                        <span className="font-medium">中〜高</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sliders className="h-5 w-5 text-blue-500" />
                    パフォーマンス設定
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>パフォーマンスモード</Label>
                    <select className="w-full p-2 border rounded-md" defaultValue="バランス (推奨)">
                      <option value="低負荷 (低スペックPC向け)">低負荷 (低スペックPC向け)</option>
                      <option value="バランス (推奨)">バランス (推奨)</option>
                      <option value="高品質 (高スペックPC向け)">高品質 (高スペックPC向け)</option>
                      <option value="カスタム">カスタム</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label>LLM応答速度</Label>
                    <Slider defaultValue={[70]} max={100} step={1} className="w-full" />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>遅い (低負荷)</span>
                      <span>速い (高負荷)</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>VRMモデル品質</Label>
                    <Slider defaultValue={[60]} max={100} step={1} className="w-full" />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>低品質 (低負荷)</span>
                      <span>高品質 (高負荷)</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>音声品質</Label>
                    <Slider defaultValue={[80]} max={100} step={1} className="w-full" />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>低品質 (低負荷)</span>
                      <span>高品質 (高負荷)</span>
                    </div>
                  </div>

                  <div className="space-y-3 mt-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">自動最適化</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">バックグラウンド処理</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">GPU加速</Label>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-purple-500" />
                  AItuber生成完了
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center p-6">
                  <div className="text-6xl mb-4">🌟</div>
                  <h2 className="text-2xl font-bold mb-2">星空ルナの生成が完了しました！</h2>
                  <p className="text-gray-600 mb-6">新しいAItuberメンバーの準備が整いました。</p>

                  <div className="grid grid-cols-4 gap-4 max-w-3xl mx-auto mb-6">
                    <div className="p-4 bg-green-50 rounded-lg text-center">
                      <Check className="h-6 w-6 text-green-500 mx-auto mb-2" />
                      <div className="font-medium text-green-800">ペルソナ</div>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg text-center">
                      <Check className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                      <div className="font-medium text-blue-800">言語モデル</div>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg text-center">
                      <Check className="h-6 w-6 text-purple-500 mx-auto mb-2" />
                      <div className="font-medium text-purple-800">音声モデル</div>
                    </div>
                    <div className="p-4 bg-pink-50 rounded-lg text-center">
                      <Check className="h-6 w-6 text-pink-500 mx-auto mb-2" />
                      <div className="font-medium text-pink-800">VRMモデル</div>
                    </div>
                  </div>

                  <div className="flex justify-center gap-4">
                    <Button variant="outline" size="lg" className="gap-2">
                      <Download className="h-5 w-5" />
                      モデルをエクスポート
                    </Button>
                    <Button size="lg" className="gap-2 bg-purple-600 hover:bg-purple-700">
                      <Play className="h-5 w-5" />
                      配信を開始
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
