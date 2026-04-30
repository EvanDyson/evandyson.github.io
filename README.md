## Space Coast Chess Foundation^©^

### Direct clone of [Space Coast Chess Foundation](https://www.spacecoastchessfoundation.org/)

#### To visit the cloned website visit [evandyson.github.io](https://evandyson.github.io/)

## Development instructions
---
##### To locally start
- `cd space-coast-chess`
- `npm i`
- `npm run dev`

##### To update/import blog posts from the live SCCF website
The `/blog` posts are stored as Markdown files in `space-coast-chess/src/content/blog`.
To refresh them from the published Wix blog and download the blog images locally:

1. Open a terminal at the repo root.
2. Go into the app folder:
   - `cd space-coast-chess`
3. Install dependencies if needed:
   - `npm i`
4. Run the blog importer:
   - `node scripts/import-wix-blog.mjs`
5. Check the import report:
   - `src/content/blog-import-report.json`
   - Confirm `"failures": []`.
6. Download and localize blog images:
   - `node scripts/localize-blog-images.mjs`
7. Check the image import report:
   - `src/content/blog-image-import-report.json`
   - Confirm `"failures": []`.
   - Confirm `"remainingRemote": []`, `"missingLocal": []`, and `"crossPostReferences": []` under `"verification"`.
8. Confirm the number of imported posts:
   - `Get-ChildItem src/content/blog/*.md | Measure-Object`
9. Confirm there are no remaining Wix image URLs in the Markdown posts:
   - `Select-String -Path src/content/blog/*.md -Pattern 'static\.wixstatic\.com/media' | Measure-Object`
   - The count should be `0`.
10. Run a TypeScript check:
   - `node_modules\.bin\tsc.cmd --noEmit --project tsconfig.app.json`
11. Start the site locally and review `/blog`:
   - `npm run dev`

Notes:
- The importer reads the official Wix blog sitemap at `https://www.spacecoastchessfoundation.org/blog-posts-sitemap.xml`.
- Running the importer overwrites matching Markdown files in `src/content/blog` with the latest scraped content.
- The image localization script downloads Wix-hosted images into `public/images/blog/{post-slug}/` and rewrites Markdown image references to those local files.
- Always run `node scripts/localize-blog-images.mjs` after `node scripts/import-wix-blog.mjs` so newly imported or updated posts use local images.
- Wix HTML can be messy, so after importing, quickly review any new or important posts for formatting cleanup.

##### To update the live website
- Do a push to the main branch and the live website will automatically redeploy
---
