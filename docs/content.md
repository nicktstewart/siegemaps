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

22階層分のWebPとサムネイルを`apps/web/public/maps/`に同梱しています。選択済みのJPEG原本は`assets/map-sources/`で管理し、サイトから配信しません。画像の更新方法は[配信と軽量化](performance.md)を参照してください。`thumbnailPath`は一覧用の画像です。`sourceFile`は[Sternab氏の原図集](https://drive.google.com/drive/folders/1nBG6OcSTvI3fCErspyEPWwVwxRiLRj3C)内のファイル名です。リワーク版があるものは、原図集内の該当フォルダから選んでいます。

画像の現行ゲームとの一致は未確認です。マップ構造と名称を確認してから`layoutStatus`や`reviewStatus`を更新してください。出典の表記を残し、画像の利用条件とコードのライセンスは分けて扱います。

マップ名や階層が変わっても既存URLを安易に変更しないでください。名称の文面は`content/ja.json`で管理します。
