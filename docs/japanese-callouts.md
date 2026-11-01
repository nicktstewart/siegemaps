# 日本語の名称と出典

調査・登録日：2026-11-02 JST。

11マップ・30階層に、日本語の名称425件を`callouts`として登録しました。全て`draft`です。同じ調査で英語の名称を見直し、全30階層の422件を455件にしました。

同日、創設者が[名称エディタ](editor.md)で競技対象9マップの日本語・英語の名称を修正しました（領事館と高層ビルは対象外）。修正後は日本語425件、英語458件です。創設者が修正した19階層の名称（539件）は`reviewed`とし、それ以外は`draft`のままです。`draft`のまま残る競技マップの階層は、クラブハウス1階、要塞1階・2階、アジト1階・地下、ヴィラ地下です。

## 名称の順序

`primaryNames`は、日本のプレイヤーが実際に使う呼び方を先頭に置き、ゲーム内の公式名称が異なる場合は後ろに別名として加えています。例：銀行1階の「吹き抜け / スクエア」、銀行2階の「バナナ / 2Fロビー」、クラブハウス地下の「バイク / 記念室」。呼び方を確認できなかった場所は公式名称だけを登録しています。略称（「証券」「鯖」「連通」など）は`shortNames`に分けています。

## 公式名称の根拠

ゲームは現在地の名前を日本語で画面上部（方位計の下）に表示します。日本語クライアントのプレイ動画から数秒ごとにフレームを取り出し、この表示を読み取りました。部屋との対応は、映像と移動の順序から判断しています。以下の資料は補助として使いました。

- [Ubisoftの日本語マップページ](https://www.ubisoft.com/ja-jp/game/rainbow-six/siege/game-info/maps/clubhouse)の爆弾地点名。Fortressは改修前の地点名が残っているため使っていません。
- [r6maps（capajon）](https://github.com/capajon/r6maps)の日本語訳（2018年）。改修前の名称のため、新しい根拠がない場合だけ使い、旧名称として扱っています。
- [ファミ通のBorder改修記事](https://www.famitsu.com/matome/r6s/Y6S1_01.html)の画面写真。

ゲーム内で表示を確認できなかった場所は、公式名称を空のままにしています。

## 呼び方の根拠

日本語の解説動画の文字起こし、動画内の名称入りマップ、実況・解説での呼び方を照合しました。主な資料は次のとおりです。

| マップ | 主な動画 |
| --- | --- |
| 銀行 | [ようぺん](https://www.youtube.com/watch?v=jYEN9hhxCKA)、[Apple Gaming](https://www.youtube.com/watch?v=aBPfLuI8yGo) |
| 国境 | [Apple Gaming](https://www.youtube.com/watch?v=kOr4prBAwis)、[解説動画](https://www.youtube.com/watch?v=cAP8PBdTqhc) |
| 山荘 | [解説動画](https://www.youtube.com/watch?v=JPwsvFPSFeg)、[Apple Gaming](https://www.youtube.com/watch?v=hWjfHMKAbBA) |
| クラブハウス | [ようぺん](https://www.youtube.com/watch?v=vW613IpTGNc)、[Apple Gaming](https://www.youtube.com/watch?v=ad-zXvuCFCs) |
| 領事館 | [Apple Gaming](https://www.youtube.com/watch?v=gKTQB8NUx0g)、[山野智三](https://www.youtube.com/watch?v=jMxFm4ChAhs) |
| 要塞 | [山野智三](https://www.youtube.com/watch?v=3SnGiU-RpHg) |
| カフェ | [ようぺん](https://www.youtube.com/watch?v=KWRDSeFNYpE) |
| アジト | [公式 Siege TV](https://www.youtube.com/watch?v=-982d_AI3-8) |
| ナイトヘイヴンラボ | [タマチャンネル](https://www.youtube.com/watch?v=IuVLpKPigY4) |
| 高層ビル | [解説動画](https://www.youtube.com/watch?v=oJi_7Cyc81A)、[Apple Gaming](https://www.youtube.com/watch?v=gKTQB8NUx0g) |
| ヴィラ | [解説動画](https://www.youtube.com/watch?v=XbnzkcbvHMw)、[Apple Gaming](https://www.youtube.com/watch?v=gKTQB8NUx0g) |

これらは実際の用例であり、利用頻度を統計的に示すものではありません。調査の途中でYouTubeの字幕取得が制限され、領事館とカフェは発話の文字起こしを確認できていません。両マップの呼び方は根拠が少なく、確度は低めです。

## 英語の名称の見直し

部屋の名前と合わない名称を直し、使われている呼び方を別名として加えました。旧名称は別名に残しています。主な変更：

- 高層ビル2階：Lounge・Displayのラベルが別の部屋を指していたため移動し、Terraceを追加。
- カフェ2階：長テーブルの部屋はFireplace Hall（暖炉ホール）。旧Diningを削除し、Fireplaceを移動。
- 領事館地下：KitchenをCafeteria（爆弾地点名）に変更。
- 国境2階：CCTV→Security、Cafeteria→Break Room、Red Hallway→Main Hallway。
- ナイトヘイヴンラボ：Gaming→Lounge、Blue Stairs→CC Stairs（旧名は別名）。
- アジト：Meeting→Briefing、Zulu→Storage Hallなど、ゲーム内の英語表示を先頭に。
- 山荘地下：Garage→Snowmobile Garage。
- ヴィラ地下：同じ部屋に重複していたArtを削除。

追加した名称の`sourceUrl`は、R6Calls・R6Calloutsに限らず根拠とした資料を指します。

## 未確認の事項

- アジトは2025年9月に改修されました。背景図と名称の根拠は改修前（2024年）の映像です。
- ヴィラ2階：ゲーム内の「踊り場」はtrophy-entrance、「トロフィールーム入口」はtrophy-balconyの位置にあたります。英語名は変更していません。Skullの位置も未確認です。
- 屋外、バルコニー、屋根などは、背景図上の位置を確定できたものだけを登録しています。
- 現行ゲーム内での位置の再確認と、日本の競技コミュニティによるレビューは未完了です。
