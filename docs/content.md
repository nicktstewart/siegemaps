# Map content

Map metadata is in `apps/web/content/maps.json`; each floor has its own JSON file under `content/maps/<map>/`. The loader validates identifiers, dimensions, coordinates and callout IDs before building routes. Empty callout arrays are allowed while content is being prepared.

```json
{
  "id": "example-position",
  "primaryNames": ["主名称", "別の主名称"],
  "shortNames": ["略称"],
  "x": 0.5,
  "y": 0.5,
  "reviewStatus": "draft"
}
```

This example is illustrative, not a real position. Coordinates range from 0 to 1 relative to the entire published background. Primary names are ordered; the first is shown by default. Abbreviations are hidden by default. Do not bake labels into map images or add dedicated official-name/English-name switches.

The included Border backgrounds come from [Sternab's original blueprint collection](https://drive.google.com/drive/folders/1nBG6OcSTvI3fCErspyEPWwVwxRiLRj3C), specifically `BorderTopFloorBW.jpg` and `BorderGroundFloorBW.jpg`. They are selected copies of the source images, not a mirror of the full pack. Current-game layout verification is pending. Preserve source attribution and keep map artwork separate from any code license.

Before publishing a floor as reviewed, verify its image against the current game, review names and coordinates, and update its status/date. Proposed community editing uses Google Slides copies reviewed by maintainers; the API importer is not available yet. No player or community endorsement is implied.
