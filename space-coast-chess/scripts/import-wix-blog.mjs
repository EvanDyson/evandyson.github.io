import { mkdir, rm, writeFile } from 'node:fs/promises';
import { JSDOM } from 'jsdom';

const SITE = 'https://www.spacecoastchessfoundation.org';
const BLOG_POSTS_SITEMAP = `${SITE}/blog-posts-sitemap.xml`;
const OUT_DIR = new URL('../src/content/blog/', import.meta.url);
const CATEGORY_URLS = [
  '/news',
  '/news/categories/30th-space-coast-open',
  '/news/categories/29th-space-coast-open',
  '/news/categories/28th-space-coast-open',
  '/news/categories/27th-space-coast-open',
  '/news/categories/26th-space-coast-open',
  '/news/categories/25th-space-coast-open',
  '/news/categories/24th-space-coast-open',
  '/news/categories/monthly-tournament-series'
];

const SAMPLE_SLUGS = new Set([
  'sample-event-flyer',
  'sample-event-index',
  'sample-media-post',
  'sample-photo-gallery',
  'sample-results-post',
  'sample-tournament-report',
  'welcome-to-the-new-blog'
]);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function absoluteUrl(path) {
  return path.startsWith('http') ? path : `${SITE}${path}`;
}

function decodeHtml(value = '') {
  return value
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 90);
}

function yamlString(value = '') {
  return JSON.stringify(value);
}

function normalizeWhitespace(value = '') {
  return decodeHtml(value)
    .replace(/\u00a0/g, ' ')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function cleanImageUrl(url = '') {
  const match = url.match(/^(https:\/\/static\.wixstatic\.com\/media\/[^/]+)(?:\/v1\/.*)?$/);
  return match ? match[1] : url;
}

function getJsonLd(document) {
  const script = document.querySelector('script[type="application/ld+json"]');
  if (!script?.textContent) {
    return {};
  }

  try {
    return JSON.parse(script.textContent);
  } catch {
    return {};
  }
}

function getMeta(document, selector) {
  return document.querySelector(selector)?.getAttribute('content') || '';
}

function inferCategory(url, title) {
  const value = `${url} ${title}`.toLowerCase();

  if (value.includes('monthly') || value.includes('turkey-bash') || value.includes('fracas') || value.includes('brouhaha')) {
    return 'Monthly Tournament Series';
  }

  const match = value.match(/(\d{2})(?:th|st|nd|rd)-space-coast-open|(\d{2})(?:th|st|nd|rd) space coast open/);
  if (match) {
    const number = match[1] || match[2];
    return `${number}th Space Coast Open`;
  }

  if (value.includes('space-coast-open') || value.includes('space coast open')) {
    return 'Space Coast Open';
  }

  return 'General';
}

function inferLayout(title, body, images, links) {
  const text = `${title} ${body}`.toLowerCase();

  if (text.includes('table of contents') || text.includes('quick access index')) {
    return 'index';
  }

  if (text.includes('final standings') || text.includes('round-by-round') || text.includes('pairings')) {
    return 'results';
  }

  if (text.includes('video') || text.includes('commentary') || text.includes('games') || links.some((link) => /youtube|lichess|chessbase/i.test(link.url))) {
    return 'media';
  }

  if (text.includes('flyer') || text.includes('schedule') || text.includes('sponsor') || links.some((link) => /\.pdf|drive\.google/i.test(link.url))) {
    return 'file';
  }

  if (images.length >= 4 && body.length < 1200) {
    return 'gallery';
  }

  return 'article';
}

function excerptFrom(body, fallback) {
  const source = normalizeWhitespace(body || fallback);
  return source.replace(/\n/g, ' ').slice(0, 220);
}

function markdownFromElement(root) {
  const parts = [];
  const links = [];
  const images = [];
  const seenImages = new Set();

  function pushText(text) {
    const cleaned = normalizeWhitespace(text);
    if (cleaned) {
      parts.push(cleaned);
    }
  }

  function walk(node) {
    if (node.nodeType !== 1) {
      return;
    }

    const element = node;
    const hook = element.getAttribute('data-hook') || '';

    if (hook === 'post-title' || hook === 'avatar-image' || hook === 'more-button') {
      return;
    }

    if (element.matches('header, nav, style, script, button')) {
      return;
    }

    if (element.tagName === 'A') {
      const href = element.getAttribute('href') || '';
      const label = normalizeWhitespace(element.textContent) || href;
      if (href && label) {
        links.push({ label, url: absoluteUrl(href) });
      }
      return;
    }

    if (element.tagName === 'IMG') {
      const rawSrc = element.getAttribute('src') || '';
      const src = cleanImageUrl(rawSrc);
      const alt = normalizeWhitespace(element.getAttribute('alt') || '');
      if (src && !seenImages.has(src) && !src.includes('static.parastorage.com')) {
        seenImages.add(src);
        images.push({ src, alt });
        parts.push(`![${alt || 'Blog image'}](${src})`);
      }
      return;
    }

    if (/^H[1-6]$/.test(element.tagName)) {
      const level = Math.min(Number(element.tagName.slice(1)) + 1, 6);
      pushText(`${'#'.repeat(level)} ${element.textContent}`);
      return;
    }

    if (element.tagName === 'P' || element.getAttribute('type') === 'paragraph') {
      pushText(element.textContent);
      return;
    }

    if (element.tagName === 'LI') {
      pushText(`- ${element.textContent}`);
      return;
    }

    if (element.tagName === 'FIGURE') {
      const img = element.querySelector('img');
      if (img) {
        walk(img);
      }
      const caption = normalizeWhitespace(element.querySelector('figcaption')?.textContent || '');
      if (caption) {
        parts.push(`_${caption}_`);
      }
      return;
    }

    for (const child of element.children) {
      walk(child);
    }
  }

  for (const child of root.children) {
    walk(child);
  }

  return {
    markdown: parts.join('\n\n'),
    images,
    links: Array.from(new Map(links.map((link) => [link.url, link])).values())
  };
}

async function fetchText(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`${response.status} ${url}`);
  }
  return response.text();
}

async function getPostUrls() {
  const urls = new Set();

  try {
    const sitemap = await fetchText(BLOG_POSTS_SITEMAP);
    const sitemapUrls = sitemap.matchAll(/<loc>(.*?)<\/loc>/g);
    for (const match of sitemapUrls) {
      if (match[1].includes('/post/')) {
        urls.add(match[1]);
      }
    }
  } catch (error) {
    console.warn(`Could not read blog posts sitemap: ${error.message}`);
  }

  for (const categoryUrl of CATEGORY_URLS) {
    let html = '';
    try {
      html = await fetchText(absoluteUrl(categoryUrl));
    } catch (error) {
      console.warn(`Skipping ${categoryUrl}: ${error.message}`);
      continue;
    }
    const matches = html.matchAll(/href="([^"]*\/post\/[^"#?]+)[^"]*"/g);
    for (const match of matches) {
      urls.add(absoluteUrl(match[1]));
    }
    await sleep(150);
  }

  return [...urls].sort();
}

async function scrapePost(url) {
  const html = await fetchText(url);
  const dom = new JSDOM(html);
  const document = dom.window.document;
  const jsonLd = getJsonLd(document);
  const title = normalizeWhitespace(jsonLd.headline || document.querySelector('[data-hook="post-title"]')?.textContent || getMeta(document, 'meta[property="og:title"]'));
  const slug = slugify(new URL(url).pathname.split('/').pop() || title);
  const date = (jsonLd.datePublished || '').slice(0, 10);
  const author = normalizeWhitespace(jsonLd.author?.name || document.querySelector('[data-hook="profile-link"]')?.textContent || 'Space Coast Chess Foundation');
  const description = normalizeWhitespace(jsonLd.description || getMeta(document, 'meta[property="og:description"]'));
  const contentRoot = document.querySelector('section[data-hook="post-description"]');
  const { markdown, images, links } = contentRoot
    ? markdownFromElement(contentRoot)
    : { markdown: description, images: [], links: [] };

  const heroImage = cleanImageUrl(jsonLd.image?.url || getMeta(document, 'meta[property="og:image"]') || images[0]?.src || '');
  const category = inferCategory(url, title);
  const layout = inferLayout(title, markdown, images, links);
  const body = markdown || description || `Imported from ${url}.`;

  return {
    title,
    slug,
    date,
    author,
    category,
    thumbnail: heroImage,
    heroImage,
    excerpt: excerptFrom(body, description),
    layout,
    sourceUrl: url,
    images,
    links,
    body
  };
}

function postToMarkdown(post) {
  const frontmatter = [
    '---',
    `title: ${yamlString(post.title)}`,
    `slug: ${yamlString(post.slug)}`,
    `date: ${yamlString(post.date || '2026-01-01')}`,
    `author: ${yamlString(post.author || 'Space Coast Chess Foundation')}`,
    `category: ${yamlString(post.category)}`,
    post.thumbnail ? `thumbnail: ${yamlString(post.thumbnail)}` : '',
    post.heroImage ? `heroImage: ${yamlString(post.heroImage)}` : '',
    'pinned: false',
    'pinOrder: 0',
    `excerpt: ${yamlString(post.excerpt)}`,
    `layout: ${yamlString(post.layout)}`,
    `sourceUrl: ${yamlString(post.sourceUrl)}`,
    post.layout === 'gallery' && post.images.length
      ? ['gallery:', ...post.images.map((image) => `  - src: ${yamlString(image.src)}\n    alt: ${yamlString(image.alt || '')}`)].join('\n')
      : '',
    post.links.length
      ? ['externalLinks:', ...post.links.map((link) => `  - label: ${yamlString(link.label)}\n    url: ${yamlString(link.url)}`)].join('\n')
      : '',
    '---',
    '',
    post.body,
    '',
    `_[Original post](${post.sourceUrl})_`,
    ''
  ].filter(Boolean);

  return frontmatter.join('\n');
}

async function main() {
  const urls = await getPostUrls();
  console.log(`Found ${urls.length} post URLs`);

  await mkdir(OUT_DIR, { recursive: true });

  for (const slug of SAMPLE_SLUGS) {
    await rm(new URL(`${slug}.md`, OUT_DIR), { force: true });
  }

  let imported = 0;
  const failures = [];

  for (const url of urls) {
    try {
      const post = await scrapePost(url);
      await writeFile(new URL(`${post.slug}.md`, OUT_DIR), postToMarkdown(post), 'utf8');
      imported += 1;
      console.log(`Imported ${imported}/${urls.length}: ${post.title}`);
      await sleep(150);
    } catch (error) {
      failures.push({ url, error: error.message });
      console.warn(`Failed: ${url} (${error.message})`);
    }
  }

  await writeFile(
    new URL('../src/content/blog-import-report.json', import.meta.url),
    JSON.stringify({ imported, failures }, null, 2),
    'utf8'
  );

  console.log(`Done. Imported ${imported}. Failures: ${failures.length}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
