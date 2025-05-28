"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Settings, Bell, Shield, Database } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">設定</h1>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              一般設定
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="agency-name">事務所名</Label>
              <Input id="agency-name" defaultValue="AItuber Agency" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">説明</Label>
              <Textarea id="description" defaultValue="最新のAI技術を活用したバーチャルタレント事務所です。" rows={3} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-email">連絡先メール</Label>
              <Input id="contact-email" type="email" defaultValue="contact@aituber-agency.com" />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              通知設定
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>配信開始通知</Label>
                <p className="text-sm text-gray-600">メンバーが配信を開始した時に通知</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>システムアラート</Label>
                <p className="text-sm text-gray-600">システムエラーや警告の通知</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>収益レポート</Label>
                <p className="text-sm text-gray-600">日次・週次収益レポートの通知</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>メンテナンス通知</Label>
                <p className="text-sm text-gray-600">定期メンテナンスの事前通知</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              セキュリティ設定
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>二段階認証</Label>
                <p className="text-sm text-gray-600">ログイン時の追加認証</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="space-y-2">
              <Label htmlFor="session-timeout">セッションタイムアウト（分）</Label>
              <Input id="session-timeout" type="number" defaultValue="30" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>ログイン履歴記録</Label>
                <p className="text-sm text-gray-600">ログイン履歴を保存</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Button variant="outline" className="w-full">
              パスワードを変更
            </Button>
          </CardContent>
        </Card>

        {/* System Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              システム設定
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="backup-frequency">バックアップ頻度</Label>
              <select className="w-full p-2 border rounded-md">
                <option>毎日</option>
                <option>毎週</option>
                <option>毎月</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="log-retention">ログ保持期間（日）</Label>
              <Input id="log-retention" type="number" defaultValue="30" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>自動スケーリング</Label>
                <p className="text-sm text-gray-600">負荷に応じてリソースを自動調整</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Button variant="outline" className="w-full">
              システム診断を実行
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Button variant="outline">キャンセル</Button>
        <Button>設定を保存</Button>
      </div>
    </div>
  )
}
