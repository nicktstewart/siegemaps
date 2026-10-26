# SiegeMaps

日本語の Rainbow Six Siege コールアウトを、マップと一緒に確認できる無料のリファレンスを制作しています。

現在は初期開発段階です。国境のフロア閲覧、ズーム・移動、名称表示設定を実装しています。呼称データは準備中で、掲載画像の現行ゲームとの照合も未完了です。

## Development

Use Node.js 22 LTS (22.12 or later) and npm. From the repository root:

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Run `npm run check` and `npm run build` before committing. `npm start` serves the production build.

```text
apps/
  web/                  Next.js frontend
docs/                   Public documentation
scripts/                Repository maintenance checks
.github/workflows/      GitHub Actions entry points
```

This is an npm workspaces monorepo with one lockfile. A future backend can be added as another app; shared packages and import tools will be introduced when needed. See [architecture](docs/architecture.md) and [development](docs/development.md).

## Credits

Thank you to Sternab for creating and sharing the free-use [map blueprints](https://drive.google.com/drive/folders/1nBG6OcSTvI3fCErspyEPWwVwxRiLRj3C).

Rainbow Six Siege and its game content belong to Ubisoft. This is an unofficial community project. Third-party artwork is separate from the application code; no blanket open-source license is granted for those assets.
