# space-coast-chess

This project was generated with [Analog](https://analogjs.org), the fullstack meta-framework for Angular.

## Setup

Run `npm install` to install the application dependencies.

## Development

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The application automatically reloads if you change any of the source files.

## Blog Import

The `/blog` posts are Markdown files in `src/content/blog`.
Blog images are stored locally in `public/images/blog/{post-slug}/`.

To refresh blog posts from the live Space Coast Chess Foundation Wix site and download the blog images locally:

1. Install dependencies if needed.
   ```powershell
   npm install
   ```

2. Run the importer.
   ```powershell
   node scripts/import-wix-blog.mjs
   ```

3. Check the import report.
   ```powershell
   Get-Content src/content/blog-import-report.json
   ```
   Confirm `"failures": []`.

4. Download and localize blog images.
   ```powershell
   node scripts/localize-blog-images.mjs
   ```

5. Check the image import report.
   ```powershell
   Get-Content src/content/blog-image-import-report.json
   ```
   Confirm `"failures": []`.
   Confirm `"remainingRemote": []`, `"missingLocal": []`, and `"crossPostReferences": []` under `"verification"`.

6. Confirm the imported post count.
   ```powershell
   Get-ChildItem src/content/blog/*.md | Measure-Object
   ```

7. Confirm there are no remaining Wix image URLs in the Markdown posts.
   ```powershell
   Select-String -Path src/content/blog/*.md -Pattern 'static\.wixstatic\.com/media' | Measure-Object
   ```
   The count should be `0`.

8. Run a TypeScript check.
   ```powershell
   node_modules\.bin\tsc.cmd --noEmit --project tsconfig.app.json
   ```

9. Start the local site and review `/blog`.
   ```powershell
   npm run dev
   ```

The importer reads `https://www.spacecoastchessfoundation.org/blog-posts-sitemap.xml`, writes posts into `src/content/blog`, and writes a summary to `src/content/blog-import-report.json`.

Always run `node scripts/localize-blog-images.mjs` after `node scripts/import-wix-blog.mjs`. The image localization script downloads Wix-hosted images into `public/images/blog/{post-slug}/`, rewrites the Markdown image references to local files, and verifies that no posts still point to Wix image URLs or another post's image folder.

Imported posts may need light formatting cleanup because Wix HTML is not perfectly structured.

## Build

Run `npm run build` to build the client/server project. The client build artifacts are located in the `dist/analog/public` directory. The server for the API build artifacts are located in the `dist/analog/server` directory.

## Test

Run `npm run test` to run unit tests with [Vitest](https://vitest.dev).

## Community

- Visit and Star the [GitHub Repo](https://github.com/analogjs/analog)
- Join the [Discord](https://chat.analogjs.org)
- Follow us on [Twitter](https://twitter.com/analogjs)
- Become a [Sponsor](https://github.com/sponsors/brandonroberts)
