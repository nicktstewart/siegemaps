# SiegeMaps

レインボーシックス シージのマップ内で使われる、日本語の場所の名称をまとめたサイトです。

## 開発環境

Node.js 22 LTS（22.12以降）とnpmを使用します。リポジトリ直下で実行してください。

```sh
npm ci
npm run dev
```

[http://localhost:3000](http://localhost:3000)で確認できます。変更後は`npm run check`と`npm run build`を実行してください。

## ディレクトリ構成

| パス | 用途 |
| --- | --- |
| `apps/web/` | Next.jsフロントエンド |
| `docs/` | 公開ドキュメント |
| `scripts/` | リポジトリの検査 |
| `.github/workflows/` | GitHub Actions |

npm workspacesで管理しています。バックエンドを追加する場合は`apps/`配下に配置します。詳細は[構成](docs/architecture.md)と[開発手順](docs/development.md)を参照してください。

## マップ画像

サイトで使用する22枚の画像は`apps/web/public/maps/`に含まれ、Gitで管理されています。クローン後に原図を別途ダウンロードする必要はありません。ルートの`maps/`は、サイトから参照しない原図保管用のローカルフォルダです。

対象は銀行、国境、山荘、クラブハウス、領事館、カフェ・ドストエフスキー、ナイトヘイヴンラボ、高層ビルです。マップ画像と現行ゲームの照合、名称の登録はまだ完了していません。Google Slides連携も未実装です。

## クレジット

自由に利用できる[マップ原図](https://drive.google.com/drive/folders/1nBG6OcSTvI3fCErspyEPWwVwxRiLRj3C)を制作・公開してくださったSternab氏に感謝します。

本サイトはUbisoftと提携・公認関係にない個人のファンサイトです。Rainbow Six Siegeおよび関連コンテンツの権利はUbisoftに帰属します。第三者が作成した画像には、本リポジトリのコードライセンスは適用されません。
