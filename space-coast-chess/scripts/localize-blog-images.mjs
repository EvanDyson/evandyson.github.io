import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
const BLOG_DIR = path.join(ROOT, 'src', 'content', 'blog');
const IMAGE_ROOT = path.join(ROOT, 'public', 'images', 'blog');
const REPORT_PATH = path.join(ROOT, 'src', 'content', 'blog-image-import-report.json');

const WIX_IMAGE_PATTERN = /https:\/\/static\.wixstatic\.com\/media\/[^\s)"']+/g;
const IMAGE_MARKDOWN_PATTERN = /!\[([^\]]*)\]\((https:\/\/static\.wixstatic\.com\/media\/[^)\s]+)\)/g;
const YAML_IMAGE_PATTERN = /^(thumbnail|heroImage|src):\s*"?(https:\/\/static\.wixstatic\.com\/media\/[^"\s]+)"?\s*$/gm;

function slugFromFilename(filename) {
  return filename.replace(/\.md$/i, '');
}

function cleanWixImageUrl(url) {
  const match = url.match(/^(https:\/\/static\.wixstatic\.com\/media\/[^/]+)(?:\/v1\/.*)?$/);
  return match ? match[1] : url;
}

function extensionFromContentType(contentType) {
  const clean = contentType.split(';')[0].trim().toLowerCase();
  const map = {
    'image/jpeg': '.jpg',
    'image/jpg': '.jpg',
    'image/png': '.png',
    'image/webp': '.webp',
    'image/gif': '.gif',
    'image/svg+xml': '.svg',
    'image/avif': '.avif'
  };

  return map[clean] || '';
}

function extensionFromUrl(url) {
  const pathname = new URL(url).pathname;
  const basename = pathname.split('/').pop() || '';
  const match = basename.match(/\.(jpe?g|png|webp|gif|svg|avif)$/i);
  return match ? `.${match[1].toLowerCase().replace('jpeg', 'jpg')}` : '';
}

function localPublicPath(slug, filename) {
  return `/images/blog/${slug}/${filename}`;
}

function absoluteImagePath(slug, filename) {
  return path.join(IMAGE_ROOT, slug, filename);
}

function sha256(buffer) {
  return createHash('sha256').update(buffer).digest('hex');
}

function uniqueWixUrls(markdown) {
  return Array.from(new Set(markdown.match(WIX_IMAGE_PATTERN) || [])).map(cleanWixImageUrl);
}

function excerptFromBody(markdown) {
  const parts = markdown.split('---');
  const body = parts.length >= 3 ? parts.slice(2).join('---') : markdown;
  return body
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/^#+\s*/gm, '')
    .replace(/[_*`>#-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 220);
}

function refreshExcerpt(markdown) {
  const excerpt = JSON.stringify(excerptFromBody(markdown));
  return markdown.replace(/^excerpt:\s*.*$/m, `excerpt: ${excerpt}`);
}

async function listMarkdownFiles() {
  const { readdir } = await import('node:fs/promises');
  return (await readdir(BLOG_DIR))
    .filter((file) => file.endsWith('.md'))
    .sort();
}

async function downloadImage(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  const contentType = response.headers.get('content-type') || '';
  if (!contentType.toLowerCase().startsWith('image/')) {
    throw new Error(`Unexpected content type: ${contentType || 'unknown'}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());

  if (buffer.length === 0) {
    throw new Error('Downloaded image was empty');
  }

  return {
    buffer,
    contentType,
    hash: sha256(buffer),
    extension: extensionFromContentType(contentType) || extensionFromUrl(url) || '.jpg'
  };
}

async function writeReport(files, posts, failures) {
  const verification = await verifyMarkdownImages(files);
  const summary = {
    postsChecked: files.length,
    imagesFound: posts.reduce((sum, post) => sum + post.found, 0),
    imagesDownloaded: posts.reduce((sum, post) => sum + post.downloaded, 0),
    imagesReused: posts.reduce((sum, post) => sum + post.reused, 0),
    imageUrlsRewritten: posts.reduce((sum, post) => sum + post.rewritten, 0),
    failures,
    verification,
    posts
  };

  await writeFile(REPORT_PATH, JSON.stringify(summary, null, 2), 'utf8');

  return summary;
}

async function localizePostImages(filename) {
  const slug = slugFromFilename(filename);
  const filePath = path.join(BLOG_DIR, filename);
  let markdown = await readFile(filePath, 'utf8');
  markdown = refreshExcerpt(markdown);
  const urls = uniqueWixUrls(markdown);
  const postImageDir = path.join(IMAGE_ROOT, slug);
  const mappings = [];
  const failures = [];
  const seenByHash = new Map();
  const seenByUrl = new Map();
  let imageIndex = 1;

  if (urls.length === 0) {
    await writeFile(filePath, markdown, 'utf8');
    return { slug, found: 0, downloaded: 0, reused: 0, rewritten: 0, mappings, failures };
  }

  await mkdir(postImageDir, { recursive: true });

  for (const url of urls) {
    try {
      const downloaded = await downloadImage(url);
      const existingForHash = seenByHash.get(downloaded.hash);
      const filenameBase = imageIndex === 1 ? 'hero' : `image-${String(imageIndex - 1).padStart(2, '0')}`;
      const imageFilename = existingForHash || `${filenameBase}${downloaded.extension}`;
      const localPath = localPublicPath(slug, imageFilename);
      const absolutePath = absoluteImagePath(slug, imageFilename);

      if (!existingForHash) {
        if (!existsSync(absolutePath)) {
          await writeFile(absolutePath, downloaded.buffer);
        }
        seenByHash.set(downloaded.hash, imageFilename);
        imageIndex += 1;
      }

      seenByUrl.set(url, localPath);
      mappings.push({
        originalUrl: url,
        localPath,
        sha256: downloaded.hash,
        bytes: downloaded.buffer.length,
        reused: Boolean(existingForHash)
      });
    } catch (error) {
      failures.push({ originalUrl: url, reason: error.message });
    }
  }

  for (const [originalUrl, localPath] of seenByUrl.entries()) {
    const escapedOriginal = originalUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    markdown = markdown.replace(new RegExp(escapedOriginal, 'g'), localPath);
  }

  markdown = refreshExcerpt(markdown);
  const rewritten = seenByUrl.size;
  await writeFile(filePath, markdown, 'utf8');

  return {
    slug,
    found: urls.length,
    downloaded: mappings.filter((mapping) => !mapping.reused).length,
    reused: mappings.filter((mapping) => mapping.reused).length,
    rewritten,
    mappings,
    failures
  };
}

async function verifyMarkdownImages(files) {
  const remainingRemote = [];
  const missingLocal = [];
  const crossPostReferences = [];

  for (const filename of files) {
    const slug = slugFromFilename(filename);
    const markdown = await readFile(path.join(BLOG_DIR, filename), 'utf8');

    for (const match of markdown.matchAll(WIX_IMAGE_PATTERN)) {
      remainingRemote.push({ slug, url: match[0] });
    }

    const localPaths = [
      ...markdown.matchAll(/!\[[^\]]*\]\((\/images\/blog\/[^)]+)\)/g),
      ...markdown.matchAll(/^(?:thumbnail|heroImage|src):\s*"?(\/images\/blog\/[^"\s]+)"?\s*$/gm)
    ].map((match) => match[1]);

    for (const publicPath of localPaths) {
      const expectedPrefix = `/images/blog/${slug}/`;
      if (!publicPath.startsWith(expectedPrefix)) {
        crossPostReferences.push({ slug, path: publicPath });
      }

      const absolutePath = path.join(ROOT, 'public', publicPath);
      if (!existsSync(absolutePath)) {
        missingLocal.push({ slug, path: publicPath });
      }
    }
  }

  return {
    remainingRemote,
    missingLocal,
    crossPostReferences
  };
}

async function main() {
  await mkdir(IMAGE_ROOT, { recursive: true });
  const files = await listMarkdownFiles();
  const posts = [];
  const failures = [];

  process.on('SIGINT', async () => {
    const summary = await writeReport(files, posts, failures);
    console.log('\nInterrupted. Partial report written.');
    console.log(JSON.stringify({
      postsProcessed: posts.length,
      failures: summary.failures.length,
      remainingRemote: summary.verification.remainingRemote.length
    }, null, 2));
    process.exit(130);
  });

  try {
    for (const file of files) {
      const result = await localizePostImages(file);
      posts.push(result);
      failures.push(...result.failures.map((failure) => ({ post: result.slug, ...failure })));
      console.log(`${result.slug}: found ${result.found}, downloaded ${result.downloaded}, reused ${result.reused}, rewritten ${result.rewritten}`);

      if (posts.length % 10 === 0) {
        await writeReport(files, posts, failures);
      }
    }
  } catch (error) {
    await writeReport(files, posts, failures);
    throw error;
  }

  const summary = await writeReport(files, posts, failures);

  console.log('\nSummary');
  console.log(JSON.stringify({
    postsChecked: summary.postsChecked,
    imagesFound: summary.imagesFound,
    imagesDownloaded: summary.imagesDownloaded,
    imagesReused: summary.imagesReused,
    imageUrlsRewritten: summary.imageUrlsRewritten,
    failures: failures.length,
    remainingRemote: summary.verification.remainingRemote.length,
    missingLocal: summary.verification.missingLocal.length,
    crossPostReferences: summary.verification.crossPostReferences.length
  }, null, 2));

  if (
    failures.length ||
    summary.verification.remainingRemote.length ||
    summary.verification.missingLocal.length ||
    summary.verification.crossPostReferences.length
  ) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
