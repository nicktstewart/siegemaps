import { writeFileSync } from 'node:fs';
import path from 'node:path';
import { getMap } from '@/lib/content';
import { floorSchema } from '@/lib/schema';

// The editor writes into the working tree, so it only exists under `next dev` and only for same-origin JSON requests.
export async function POST(request: Request) {
  if (process.env.NODE_ENV !== 'development') return new Response(null, { status: 404 });
  const origin = request.headers.get('origin');
  if (!request.headers.get('content-type')?.startsWith('application/json') || (origin && new URL(origin).host !== request.headers.get('host'))) return new Response(null, { status: 403 });
  const floor: unknown = await request.json();
  const parsed = floorSchema.safeParse(floor);
  if (!parsed.success) return Response.json({ errors: parsed.error.issues.map((issue) => `${issue.path.join('.')}: ${issue.message}`) }, { status: 400 });
  const { mapId, id } = parsed.data;
  if (!getMap(mapId)?.floorIds.includes(id)) return Response.json({ errors: ['Unknown floor'] }, { status: 400 });
  writeFileSync(path.join(process.cwd(), 'content', 'maps', mapId, `${id}.json`), JSON.stringify(floor, null, 2) + '\n');
  return Response.json({ ok: true });
}
