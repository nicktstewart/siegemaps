# マップデータ

マップ一覧は`apps/web/content/maps.json`、各階層は`content/maps/<map>/`で管理します。階層JSONには画像パス、寸法、出典ファイル、名称を記録します。

```json
{
  "id": "example-position",
  "primaryNames": ["主名称", "別名"],
  "shortNames": ["略称"],
  "x": 0.5,
  "y": 0.5,
  "reviewStatus": "draft"
}
```

これは形式の例です。実際の名称ではありません。名称の優先順は配列順とし、初期表示では先頭の主名称だけを表示します。略称は初期状態では非表示です。

座標は画像全体に対する0〜1の値です。背景の切り抜きや向きを変えると座標も変わるため、名称の登録前に画像を固定してください。

## 画像と出典

30階層分のWebPとサムネイルを`apps/web/public/maps/`に同梱しています。選択済みのJPEG原本は`assets/map-sources/`で管理し、サイトから配信しません。画像の更新方法は[配信と軽量化](performance.md)を参照してください。`thumbnailPath`は一覧用の画像です。

`sourceUrl`は階層の出典リンク、`sourceFile`は原図集内のファイル名または再構成SVGのリポジトリ内パスです。`sourceCredit`は画面に表示する出典名で、省略した階層はSternab氏の原図として扱います。[Sternab氏の原図集](https://drive.google.com/drive/folders/1nBG6OcSTvI3fCErspyEPWwVwxRiLRj3C)にリワーク版があるものは、該当フォルダから選んでいます。

アジト（Lair）の3階層は、R6Callouts掲載の@HardBaguette氏の図を参考にした白黒の再構成背景です。採用したSVGとJPEGを`assets/map-sources/lair/`に同梱しています。部屋の名称は画像に含めず、日本語の`callouts`は空です。英語名称は独立した`englishCallouts`に登録しています。

| 階層 | 出典 |
| --- | --- |
| 2階 | [R6Callouts — Lair 2F](https://r6callouts.com/maps/lair/2f.png) |
| 1階 | [R6Callouts — Lair 1F](https://r6callouts.com/maps/lair/1f.png) |
| 地下1階 | [R6Callouts — Lair Basement](https://r6callouts.com/maps/lair/b.png) |

`layoutStatus`は背景図の確認状況、各名称の`reviewStatus`は名称の確認状況です。未確認の構造や名称を確認済みとして登録しないでください。背景が採用済みでも名称の登録・確認が終わるまでは、検索エンジンの登録対象から外します。出典の表記を残し、画像の利用条件とコードのライセンスは分けて扱います。

マップ名や階層が変わっても既存URLを安易に変更しないでください。名称の文面は`content/ja.json`で管理します。

## VillaとFortressの背景

2026-10-28 JSTに、Stratbook掲載の更新版SVGを白黒へ調整しました。元の幾何形状と向きを保ち、1600×900の図を1600×1200の白い画面中央に配置しています。壁・ハッチを濃く、家具・階段を灰色にし、爆弾エリアの色は取り除いています。編集用SVGは`assets/map-sources/`に保持し、4800×3600のJPEGから配信画像を生成します。

| 階層 | 出典SVG | 編集用ファイル |
| --- | --- | --- |
| Villa 地下 | [Stratbook](https://www.stratbook.gg/assets/rainbow-six/maps/svg/villa/villa-basement.svg) | `assets/map-sources/villa/b1.svg` |
| Fortress 1階 | [Stratbook](https://www.stratbook.gg/assets/rainbow-six/maps/svg/fortress/fortress-1f.svg) | `assets/map-sources/fortress/1f.svg` |
| Fortress 2階 | [Stratbook](https://www.stratbook.gg/assets/rainbow-six/maps/svg/fortress/fortress-2f.svg) | `assets/map-sources/fortress/2f.svg` |

Villaの構造変更は地下のみのため、2階・1階はSternab氏の`VillaTopFloorBW.jpg`と`VillaGroundFloorBW.jpg`を使用します。追加5階層の背景は全て`unverified`で、日本語名称は未登録で、英語名称は出典付きの草案として登録しています。新しい出典に対する利用許諾を取得済みと主張するものではありません。第三者の図にコードのライセンスは適用しません。

## 英語の名称

`englishCallouts`は日本語の`callouts`と別の配列です。英語の表示は初期状態では無効です。収録範囲、出典、確認状況、データ形式は[英語の名称と出典](english-callouts.md)を参照してください。

## 競技対象と背景の版

収録11マップは現行の競技9マップに加えてConsulateとSkyscraperを含みます。[競技マッププールと収録状況](map-pool.md)に対象と背景の版を記録しています。原図集のフォルダ名や公式ページの更新日だけで、背景図の構造が現行版と一致すると判断しないでください。
