# AI VTuber Management Platform

AI VTuberの配信管理と監視のための総合プラットフォームです。

## 技術スタック

- **フレームワーク**: Next.js 15.2.4
- **言語**: TypeScript
- **UI**: React 19, Tailwind CSS
- **コンポーネント**: Radix UI
- **開発ツール**: ESLint, Turbopack

## プロジェクト構造と詳細説明

### アプリケーション構造

```
aituber/
├── app/                    # Next.js アプリケーションのメインディレクトリ
│   ├── page.tsx           # メインページ（ランディングページ）
│   │   - プラットフォームの概要表示
│   │   - 主要機能へのクイックアクセス
│   │   - システムステータスの概要表示
│   │
│   ├── layout.tsx         # アプリケーションの共通レイアウト
│   │   - ヘッダー、フッター、ナビゲーション
│   │   - グローバルな状態管理
│   │   - エラーハンドリング
│   │
│   ├── globals.css        # グローバルスタイル定義
│   │   - Tailwind CSSの設定
│   │   - カスタム変数とテーマ
│   │   - アニメーション定義
│   │
│   ├── watch/             # 視聴ページ関連
│   │   └── [id]/         # 動的ルーティング（視聴者ID別）
│   │       - 個別視聴者向けインターフェース
│   │       - チャット機能
│   │       - 視聴者統計
│   │
│   ├── stream/            # 配信関連ページ
│   │   └── [id]/         # 動的ルーティング（配信ID別）
│   │       - 配信設定
│   │       - リアルタイムモニタリング
│   │       - 配信制御
│   │
│   └── migration/         # データ移行関連
│       └── page.tsx      # 移行設定ページ
│           - データ移行ツール
│           - 移行履歴
│           - エラー処理
│
├── components/            # Reactコンポーネント
│   ├── ui/               # 共通UIコンポーネント
│   │   ├── button.tsx    # カスタマイズ可能なボタンコンポーネント
│   │   │   - バリアント（primary, secondary, ghost）
│   │   │   - サイズ（sm, md, lg）
│   │   │   - アイコンサポート
│   │   │
│   │   ├── card.tsx      # 情報表示用カードコンポーネント
│   │   │   - ヘッダー、コンテンツ、フッター
│   │   │   - バリアント（default, bordered）
│   │   │   - アニメーション
│   │   │
│   │   ├── badge.tsx     # ステータス表示用バッジ
│   │   │   - カラー（success, warning, error）
│   │   │   - サイズバリアント
│   │   │   - アイコン統合
│   │   │
│   │   ├── progress.tsx  # 進捗表示用プログレスバー
│   │   │   - アニメーション
│   │   │   - カスタムカラー
│   │   │   - ラベル表示
│   │   │
│   │   ├── slider.tsx    # 数値調整用スライダー
│   │   │   - 範囲指定
│   │   │   - ステップ設定
│   │   │   - ツールチップ
│   │   │
│   │   ├── tabs.tsx      # タブ切り替えコンポーネント
│   │   │   - アニメーション
│   │   │   - レスポンシブ
│   │   │   - キーボード操作
│   │   │
│   │   ├── input.tsx     # フォーム入力フィールド
│   │   │   - バリデーション
│   │   │   - エラー表示
│   │   │   - プレースホルダー
│   │   │
│   │   ├── label.tsx     # フォームラベル
│   │   │   - アクセシビリティ
│   │   │   - スタイリング
│   │   │
│   │   ├── switch.tsx    # トグルスイッチ
│   │   │   - アニメーション
│   │   │   - カスタムカラー
│   │   │
│   │   └── textarea.tsx  # 複数行テキスト入力
│   │       - 自動リサイズ
│   │       - 文字数制限
│   │       - プレースホルダー
│   │
│   ├── layout.tsx        # アプリケーション全体のレイアウト
│   │   - レスポンシブデザイン
│   │   - ナビゲーション
│   │   - エラーバウンダリ
│   │
│   ├── stream-status-controls.tsx  # 配信状態管理コントロール
│   │   - 配信開始/停止
│   │   - 状態表示
│   │   - エラー処理
│   │
│   ├── obs-canvas.tsx    # OBS統合用キャンバス
│   │   - WebSocket接続
│   │   - シーン管理
│   │   - ソース制御
│   │
│   └── draggable-element.tsx      # ドラッグ可能なUI要素
│       - ドラッグ&ドロップ
│       - 位置制御
│       - アニメーション
│
├── pages/                # ページコンポーネント
│   ├── dashboard-page.tsx         # メインダッシュボード
│   │   - システム状態表示
│   │   - 配信状況モニタリング
│   │   - リソース使用率
│   │   - アクティブ配信一覧
│   │
│   ├── analytics-page.tsx         # データ分析・統計
│   │   - 視聴者統計
│   │   - 配信パフォーマンス
│   │   - グラフ表示
│   │   - データエクスポート
│   │
│   ├── schedule-page.tsx          # 配信スケジュール
│   │   - カレンダー表示
│   │   - スケジュール管理
│   │   - リマインダー設定
│   │
│   ├── settings-page.tsx          # システム設定
│   │   - 一般設定
│   │   - 配信設定
│   │   - 通知設定
│   │   - API設定
│   │
│   ├── members-page.tsx           # VTuberメンバー一覧
│   │   - メンバー検索
│   │   - フィルタリング
│   │   - 一括操作
│   │
│   ├── member-detail-page.tsx     # メンバー詳細
│   │   - 基本情報
│   │   - 配信履歴
│   │   - パフォーマンス統計
│   │   - 設定管理
│   │
│   ├── member-generation-page.tsx # VTuber生成
│   │   - モデル選択
│   │   - パラメータ調整
│   │   - プレビュー
│   │   - 生成プロセス
│   │
│   ├── stream-page.tsx            # 配信管理
│   │   - 配信設定
│   │   - ソース管理
│   │   - チャット管理
│   │   - モニタリング
│   │
│   ├── stream-interface.tsx       # 配信制御
│   │   - リアルタイム制御
│   │   - エフェクト管理
│   │   - トランジション
│   │   - ショートカット
│   │
│   ├── viewer-page.tsx            # 視聴者管理
│   │   - 視聴者リスト
│   │   - モデレーション
│   │   - 統計分析
│   │   - 通知設定
│   │
│   ├── advanced-member-settings.tsx # VTuber設定
│   │   - 詳細パラメータ
│   │   - 動作設定
│   │   - カスタマイズ
│   │   - テスト機能
│   │
│   └── migration-page.tsx         # データ移行
│       - 移行設定
│       - 進捗表示
│       - エラーハンドリング
│       - ログ表示
│
├── lib/                  # ユーティリティ関数
│   └── utils.ts         # 共通ユーティリティ
│       - 日付フォーマット
│       - 文字列処理
│       - バリデーション
│       - ヘルパー関数
│
├── public/              # 静的ファイル
│   ├── images/         # 画像ファイル
│   │   - アイコン
│   │   - ロゴ
│   │   - プレースホルダー
│   │
│   └── fonts/          # フォントファイル
│       - カスタムフォント
│       - アイコンフォント
│
└── hooks/              # カスタムReactフック
    ├── useStream.ts    # 配信状態管理
    │   - 配信状態
    │   - エラー処理
    │   - イベント管理
    │
    ├── useMember.ts    # メンバー管理
    │   - メンバー情報
    │   - 状態更新
    │   - キャッシュ管理
    │
    └── useSystem.ts    # システム監視
        - リソース監視
        - パフォーマンス
        - アラート管理
```

## 主要機能

1. **配信管理**
   - 複数AI VTuberの同時配信
   - 配信状態のリアルタイムモニタリング
   - 視聴者数・コメント数の追跡
   - OBS統合による配信制御

2. **システム監視**
   - リソース使用率の監視（CPU、GPU、メモリ、ネットワーク）
   - システムログの表示
   - パフォーマンスメトリクス
   - 自動スケーリング制御

3. **管理機能**
   - スケジュール管理
   - メンバー管理
   - 設定管理
   - 分析ダッシュボード
   - VTuber生成・カスタマイズ

## 開発環境のセットアップ

1. リポジトリのクローン
```bash
git clone [repository-url]
cd aituber
```

2. 依存関係のインストール
```bash
npm install
```

3. 開発サーバーの起動
```bash
npm run dev
```

4. ビルド
```bash
npm run build
```

## 環境要件

- Node.js 18.0.0以上
- npm 9.0.0以上
- OBS Studio（配信機能使用時）

## ライセンス

[ライセンス情報を記載]