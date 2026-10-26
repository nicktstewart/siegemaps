import { z } from 'zod';

const id = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
export const calloutSchema = z.object({
  id,
  primaryNames: z.array(z.string().trim().min(1)).min(1),
  shortNames: z.array(z.string().trim().min(1)),
  x: z.number().min(0).max(1),
  y: z.number().min(0).max(1),
  reviewStatus: z.enum(['draft', 'community', 'reviewed']),
});
export const floorSchema = z.object({
  mapId: id,
  id,
  label: z.string().min(1),
  imagePath: z.string().regex(/^\/maps\/[a-z0-9/-]+\.(jpg|png|webp|svg)$/),
  thumbnailPath: z.string().regex(/^\/maps\/[a-z0-9/-]+\.webp$/),
  imageWidth: z.number().int().positive(),
  imageHeight: z.number().int().positive(),
  sourceUrl: z.url(),
  sourceFile: z.string().min(1),
  layoutStatus: z.enum(['unverified', 'reviewed']),
  callouts: z.array(calloutSchema),
}).superRefine((floor, context) => {
  const ids = new Set<string>();
  floor.callouts.forEach((callout, index) => {
    if (ids.has(callout.id)) context.addIssue({ code: 'custom', path: ['callouts', index, 'id'], message: 'Duplicate callout ID' });
    ids.add(callout.id);
  });
});
export const mapSchema = z.object({
  id,
  nameJa: z.string().min(1),
  nameEn: z.string().min(1),
  floorIds: z.array(id).min(1).refine((ids) => new Set(ids).size === ids.length, 'Duplicate floor ID'),
});
export type Callout = z.infer<typeof calloutSchema>;
export type Floor = z.infer<typeof floorSchema>;
export type MapEntry = z.infer<typeof mapSchema>;
