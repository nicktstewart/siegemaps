# Architecture

## Current structure

The root is an npm workspaces monorepo with a single lockfile and shared command entry points. There is no need for a build orchestrator with one app.

| Path | Responsibility |
| --- | --- |
| `apps/web/src/app/` | Next.js routes, metadata, sitemap and initial HTML |
| `apps/web/src/components/` | Interactive map viewer |
| `apps/web/src/lib/` | Validated content and display logic |
| `apps/web/content/` | Public JSON data, grouped by map and floor |
| `apps/web/public/maps/` | Selected backgrounds served by the frontend |
| `docs/` | Public documentation |
| `scripts/` | Repository checks |
| `.github/workflows/` | CI workflows discovered by GitHub |

GitHub requires workflow YAML at `.github/workflows/`. Substantial import logic should become a separately testable CLI under `tools/slides-sync/`; workflow files should just invoke it. Reusable composite actions, if needed, belong in `.github/actions/`.

Future deployed services can live in `apps/api/`. Introduce `packages/content/` or another shared package only when multiple consumers need it. The frontend currently has no backend, database or Google credentials.

## Data flow

Today: checked-in floor JSON → validation → statically generated Next.js routes → independent HTML callout labels over map images.

Planned: trusted Google Drive/Slides masters → bounded read-only import CLI → validated floor JSON and reviewable diff → human review → website rebuild. One presentation represents one map; one slide represents one floor. Unknown maps and changed floor mappings must require review. This importer and its scheduled workflow are not implemented yet.

Callout coordinates are normalized to the background image, not the browser viewport. Image and labels share a transform so zoom and pan preserve alignment. Original assets and internal drafts are kept outside public source. Each published background has explicit provenance and layout-review status.
