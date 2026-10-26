# 構成

npm workspacesを使うモノレポです。依存関係はルートの`package-lock.json`にまとめています。

| パス | 役割 |
| --- | --- |
| `apps/web/src/app/` | ルート、メタデータ、初期HTML |
| `apps/web/src/components/` | マップの操作 |
| `apps/web/src/lib/` | データ検証、名称の表示処理 |
| `apps/web/content/ja.json` | サイト内の日本語文面 |
| `apps/web/content/maps/` | マップ・階層ごとの呼称データ |
| `apps/web/public/maps/` | 配信する画像（Git管理対象） |
| `docs/` | 公開ドキュメント |
| `scripts/` | 検査用スクリプト |
| `.github/workflows/` | CIの定義 |

GitHub Actionsの定義は、GitHubが認識する`.github/workflows/`に配置します。処理が大きくなった場合は、実装を`tools/`配下のCLIに分けます。

バックエンドは`apps/api/`などに追加できます。複数のアプリで共有する実装ができた時点で`packages/`を導入します。現時点ではバックエンドやデータベースはありません。

## データの流れ

現在は、Git管理のJSONを検証し、マップと呼称を含むページを静的生成します。名称は画像に焼き込まず、HTMLテキストとして出力します。座標は画像全体に対する0〜1の相対値です。

Google Slides連携では、信頼済みの正本からJSONと差分を生成し、レビュー後にサイトへ反映する予定です。1マップを1プレゼンテーション、1階層を1スライドとし、未知のマップや階層の変更は自動公開しません。インポーターは未実装です。
