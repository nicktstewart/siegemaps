# 検索と共有の設定

## 実装済み

- トップのマップ一覧とAboutを静的生成します。Aboutには、マップ名称を調べられる資料を提供し、報告の第一歩に役立ててもらうという目的を記載しています。
- 全ページ共通のヘッダーからマップ一覧とAboutへ移動できます。トップに紹介文は追加していません。
- 各ページに固有のtitle、description、canonical、OG・Xカード情報を設定します。共有画像はロゴを使わず、サイト名とURLを文字で表示します。
- WebSite、CollectionPage、AboutPageの構造化データを、その内容があるページの初期HTMLに出力します。評価や公認、実装されていない検索機能は記載しません。
- サイトマップとrobots.txtを生成します。正規URLは`https://www.siegemaps.com`です。wwwなしのホストからの恒久リダイレクトはVercelのドメイン設定で行います。
- 画像と名称を分離し、名称一覧はJavaScriptを実行しなくても読めるHTMLに出力します。

## 検索対象

本番のトップとAboutを検索対象とします。原図が確認済みで、名称が1件以上あり、すべてレビュー済みの階層だけを検索対象とし、サイトマップにも含めます。空の一覧や未確認のデータで検索流入を集めるために、この条件を外さないでください。サイト本体には開発中の表示を付けません。

Vercelのプレビューは、階層のレビュー状態にかかわらずnoindexとします。検索対象であることは登録や順位を保証しません。

## 公開後の作業

1. 本番ドメインとHTTPS、wwwからの転送を確認します。
2. Google Search Consoleにサイトを登録します。HTMLタグで確認する場合は、確認コードだけをVercelの`GOOGLE_SITE_VERIFICATION`に設定し、再ビルドします。DNSで所有権を確認する方法もあります。
3. `https://www.siegemaps.com/sitemap.xml`を送信し、トップとAboutをURL検査します。
4. 実データの登録後は、対象マップの構造・名称を確認し、レビュー状態を更新します。

Search Consoleの登録、DNS設定、所有権の確認、実際の検索登録は、このコード変更だけでは完了しません。

参考：[Next.jsのメタデータ](https://nextjs.org/docs/app/getting-started/metadata-and-og-images)、[Googleのタイトルリンク](https://developers.google.com/search/docs/appearance/title-link)、[Googleのサイト名](https://developers.google.com/search/docs/appearance/site-names)。
