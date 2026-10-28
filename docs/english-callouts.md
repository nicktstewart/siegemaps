# 英語の名称と出典

調査・登録日：2026-10-28 JST。

サイト収録の9マップ・25階層に、英語の部屋・階段・主要な位置の名称334件を登録しました。日本語の名称は補完・翻訳していません。英語は「英語の名称を表示」で切り替え、初期状態では非表示です。設定は端末に保存し、以前の表示設定に英語の設定がない場合は非表示を引き継ぎます。先頭の名称だけを表示する設定は英語の別名にも適用します。略称表示とは独立しています。

競技マッププールの網羅状況とは異なります。VillaとFortressの不足は[競技マッププールと収録状況](map-pool.md)を参照してください。

## 採用した資料

- [R6Calls / DudeKiller](https://www.r6calls.com/)：Lair以外の8マップ。サイトが配信する各マップのSVGにある英語テキストを確認し、部屋・階段を中心に選びました。[マップ一覧データ](https://www.r6calls.com/data/dataMap.json)で参照時の版番号を確認しました。
- [R6Callouts / @HardBaguette](https://r6callouts.com/maps/lair)：Lairの3階層。背景の参考図と同じ図で位置と名称を照合しました。Ops、Zulu、R6 Room、Security / CC、Eboxなど、この資料に記載された呼称を使用しています。R6Callsでは同じ場所がOperational、Six、Reception、Electricalなどと呼ばれるため、資料をまたぐ別名の自動統合は行っていません。

R6Calloutsのトップページには9マップが並びますが、調査時に7マップへのリンクは無効でした。全マップに使える根拠とは扱っていません。[旧R6Callsの公開リポジトリ](https://github.com/DudeKiller82/r6calls)は旧版のため、現行サイトのSVGを優先しました。[Steamの英語名称集](https://steamcommunity.com/sharedfiles/filedetails/?id=2071634544)は最終更新が2022年で、現在のConsulateやLairを揃える資料には採用していません。

## 収録範囲

| マップ | 階層別の件数 | 合計 | 参照SVGの版番号 |
| --- | --- | ---: | ---: |
| Bank | 2f: 13、1f: 15、b1: 13 | 41 | 11 |
| Border | 2f: 12、1f: 14 | 26 | 9 |
| Chalet | 2f: 11、1f: 12、b1: 10 | 33 | 9 |
| Clubhouse | 2f: 13、1f: 15、b1: 8 | 36 | 6 |
| Consulate | 2f: 17、1f: 13、b1: 13 | 43 | 8 |
| Kafe Dostoyevsky | 3f: 12、2f: 13、1f: 14 | 39 | 5 |
| Lair | 2f: 14、1f: 18、b1: 14 | 46 | — |
| Nighthaven Labs | 2f: 12、1f: 15、b1: 10 | 37 | 6 |
| Skyscraper | 2f: 16、1f: 17 | 33 | 6 |

全ての細かい位置・屋外・スポーン地点を網羅した資料ではありません。地域・チームによって異なる俗称を、世界共通の正式名称として扱いません。

## データと確認状況

各階層JSONの`englishCallouts`に`id`、`names`（優先順の別名配列）、`x`、`y`、任意の`labelWidth`・`labelScale`、`sourceUrl`、`reviewStatus`を記録します。日本語の`callouts`とは別の配列で、両方を同時に表示できます。英語の一覧と地図ラベルは初期HTMLにも含め、非表示の状態から操作で切り替えます。選択した英語名称から出典に移動できます。

採用済み背景の部屋・階段の範囲内に名称を配置し、25階層のブラウザー描画を視覚確認しました。`labelWidth`は画像全幅に対する名称の最大幅（0より大きく0.25以下）です。英語名称には背景や枠線を付けず、文字サイズと最大幅はマップの表示幅に比例させます。狭い場所では`labelScale`（0.5〜1）で文字を縮小できます。文字を白で縁取りして階段の暗い部分でも読めるようにし、選択中は文字色と下線で示します。全件`draft`です。現行ゲーム内での確認、日本の競技コミュニティによるレビュー、全端末・拡大率での重なり解消は未完了です。英語名称を追加しただけでは日本語ページの検索登録条件を満たしません。

背景画像の出典と英語名称の出典は別に管理します。調査用に取得した第三者の画像・SVG・コードは配信・コミットしません。以下のリンクとハッシュは参照した版を特定するための記録で、利用許諾を新しく主張するものではありません。

## 参照ファイル

| マップ | 参照ファイル | SHA-256 |
| --- | --- | --- |
| Bank | [参照](https://www.r6calls.com/img/maps/bank.svg) | `8151d75fe284c4338f199cf2a8196a840a4a430fa95e946cb93126f0cdf82b79` |
| Border | [参照](https://www.r6calls.com/img/maps/border.svg) | `5acea5b9bd8f9cf50ed9903f6d8734469ccf3c475a71db7c0952f88ff43f1c30` |
| Chalet | [参照](https://www.r6calls.com/img/maps/chalet.svg) | `087ce88ff73047348b5937b1e6f9929b9f5f0e04d9346bc898eac4717b93d178` |
| Clubhouse | [参照](https://www.r6calls.com/img/maps/club.svg) | `c6bf657fd443d2fe95bc8bdff8c73dfc251045de97bde7a26794075e602ff24e` |
| Consulate | [参照](https://www.r6calls.com/img/maps/consulate.svg) | `1b95deba77afb4116be97f963781839f84f94220ab20813cea53fc8eaec0aead` |
| Kafe Dostoyevsky | [参照](https://www.r6calls.com/img/maps/kafe.svg) | `d661ae30cbc531cc9d80d0ceeee8ada19c7e05588ede90b13e46a385b5275d1c` |
| Lair | [参照](https://r6callouts.com/maps/lair/2f.png) | `a376a2ff1099a129cd86e93004e5c5cc5bcccebcb1f7173413908bf4c6fa90e9` |
| Lair | [参照](https://r6callouts.com/maps/lair/1f.png) | `bc01eb9f4140f67984a15d1d4e7ec4ef41ec9e4aa7e914818487e886a8d398e6` |
| Lair | [参照](https://r6callouts.com/maps/lair/b.png) | `b29130fdb7e8a2fe274b53bee1fddd30a56644297a3568c281a646e1bc9a73aa` |
| Nighthaven Labs | [参照](https://www.r6calls.com/img/maps/labs.svg) | `8f570ecc3a6561efafbfce785d0c690edebbcaa3544f1d1429658ac3aaf0393d` |
| Skyscraper | [参照](https://www.r6calls.com/img/maps/skyscraper.svg) | `0860d7994d75470407cba0e0fe8dbe0635153a508aa65f5953767f310ebdff50` |
