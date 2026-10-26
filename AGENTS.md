# SiegeMaps

Public monorepo for a Japanese Rainbow Six Siege callout reference.

- `apps/web/`: Next.js App Router frontend. Run commands from the repository root.
- `docs/`: public documentation. Everything here must be suitable for publication.
- `private-docs/`: ignored planning drafts, private correspondence and map-production plans. Read for context, never stage, import into the app, or publish.
- `maps/`: ignored original map pack. Publish only explicitly selected web assets under the frontend's `public/maps/`, retaining attribution.
- `.github/workflows/`: GitHub Actions entry points. Future sync implementation belongs in `tools/`, not embedded in workflow YAML.
- Future independently deployed services belong in `apps/`; introduce `packages/` only when code is actually shared.

Preserve the public/private boundary. The founder accepts existing Sternab permission evidence; its screenshot and discussion belong only in private material. Public credit: thank Sternab for the free-use blueprints and link the original Drive folder (see docs/README.md). Keep Lair production plans private. Do not claim community or player endorsement.

Never push or rewrite Git history. Make local commits for completed work with repository-local identity `nicktstewart <70402213+nicktstewart@users.noreply.github.com>`. Preserve unrelated changes. Read the founder workspace rules when available.

Before handing back code, run `npm run check` and `npm run build`. Keep callout text in initial HTML and separate from the background image. Do not invent reviewed names or treat an old blueprint as a verified current layout.
