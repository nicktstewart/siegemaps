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

サイトで使用する30階層分のWebPとサムネイルは`apps/web/public/maps/`に含まれ、Gitで管理されています。選択済みのJPEG原本は`assets/map-sources/`で管理します。アジト、Villa地下、Fortressは編集用のSVGも同梱しています。クローン後に原図を別途ダウンロードしたり、画像を生成したりする必要はありません。画像更新時の手順は[配信と軽量化](docs/performance.md)を参照してください。ルートの`maps/`は、サイトから参照しない原図集保管用のローカルフォルダです。

対象は銀行、国境、山荘、クラブハウス、領事館、要塞、ヴィラ、カフェ・ドストエフスキー、アジト、ナイトヘイヴンラボ、高層ビルです。一部のマップ画像と現行ゲームの照合、名称の登録はまだ完了していません。Google Slides連携も未実装です。

## クレジット

自由に利用できる[マップ原図](https://drive.google.com/drive/folders/1nBG6OcSTvI3fCErspyEPWwVwxRiLRj3C)を制作・公開してくださったSternab氏に感謝します。

アジトは、[R6Callouts](https://r6callouts.com/maps/lair/2f.png)に掲載された@HardBaguette氏の図を参考に、SiegeMapsの白黒表現へ再構成した背景を使用しています。階層ごとの出典は[マップデータ](docs/content.md)に記載しています。

Villa地下とFortressは、[Stratbook](https://www.stratbook.gg/maps)の更新版SVGを白黒へ調整した背景です。Villaの上階はSternab氏の既存図を使用しています。ゲーム内での構造照合と日本語名称の登録は未完了です。英語名称は草案として登録しています。

本サイトはUbisoftと提携・公認関係にない個人のファンサイトです。Rainbow Six Siegeおよび関連コンテンツの権利はUbisoftに帰属します。第三者が作成した画像には、本リポジトリのコードライセンスは適用されません。
