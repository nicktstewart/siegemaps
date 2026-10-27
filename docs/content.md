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

25階層分のWebPとサムネイルを`apps/web/public/maps/`に同梱しています。選択済みのJPEG原本は`assets/map-sources/`で管理し、サイトから配信しません。画像の更新方法は[配信と軽量化](performance.md)を参照してください。`thumbnailPath`は一覧用の画像です。

`sourceUrl`は階層の出典リンク、`sourceFile`は原図集内のファイル名または再構成SVGのリポジトリ内パスです。`sourceCredit`は画面に表示する出典名で、省略した階層はSternab氏の原図として扱います。[Sternab氏の原図集](https://drive.google.com/drive/folders/1nBG6OcSTvI3fCErspyEPWwVwxRiLRj3C)にリワーク版があるものは、該当フォルダから選んでいます。

アジト（Lair）の3階層は、R6Callouts掲載の@HardBaguette氏の図を参考にした白黒の再構成背景です。採用したSVGとJPEGを`assets/map-sources/lair/`に同梱しています。部屋の名称は画像に含めず、日本語の`callouts`は空です。英語名称は独立した`englishCallouts`に登録しています。

| 階層 | 出典 |
| --- | --- |
| 2階 | [R6Callouts — Lair 2F](https://r6callouts.com/maps/lair/2f.png) |
| 1階 | [R6Callouts — Lair 1F](https://r6callouts.com/maps/lair/1f.png) |
| 地下1階 | [R6Callouts — Lair Basement](https://r6callouts.com/maps/lair/b.png) |

`layoutStatus`は背景図の確認状況、各名称の`reviewStatus`は名称の確認状況です。未確認の構造や名称を確認済みとして登録しないでください。背景が採用済みでも名称の登録・確認が終わるまでは、検索エンジンの登録対象から外します。出典の表記を残し、画像の利用条件とコードのライセンスは分けて扱います。

マップ名や階層が変わっても既存URLを安易に変更しないでください。名称の文面は`content/ja.json`で管理します。

## 英語の名称

`englishCallouts`は日本語の`callouts`と別の配列です。英語の表示は初期状態では無効です。収録範囲、出典、確認状況、データ形式は[英語の名称と出典](english-callouts.md)を参照してください。
