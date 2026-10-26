# Development and deployment

Use Node.js 22 LTS (22.12 or later) and run commands from the repository root.

| Command | Purpose |
| --- | --- |
| `npm ci` | Install the locked workspace dependencies |
| `npm run dev` | Start the frontend on port 3000 |
| `npm run check` | Public-boundary check, lint, types and unit tests |
| `npm run build` | Generate the production Next.js build |
| `npm start` | Serve the built frontend |

The CI workflow runs install, checks and production build for pull requests and main-branch updates. It has read-only repository permissions. It neither deploys nor creates commits. Slides sync is future work; no scheduled Google API calls run yet.

## Vercel

Create a Vercel project for this repository, select Next.js and set **Root Directory** to `apps/web`. Enable access to source files outside that root so the root workspace lockfile is available. Use the normal npm workspace install and Next.js build detected by Vercel. Canonical URLs target `https://siegemaps.com`.

Repository creation, domain/DNS configuration and deployment are not performed by local build commands. Preview deployments are marked noindex by the app when `VERCEL_ENV=preview`; draft floor pages are also noindex until their content and layout have been reviewed.

## Private local material

`private-docs/` holds internal drafts and correspondence, and `maps/` holds the original source pack. Both are gitignored and excluded from Next.js imports/build inputs. Do not copy private content into public docs. The public-boundary check rejects accidentally staged files from these directories and environment secrets. Keep credentials out of all commits.
