import type { ContentFile } from '@analogjs/content';
import type { BlogPostAttributes, BlogPostSummary } from './blog.model';

const DEFAULT_AUTHOR = 'Space Coast Chess Foundation';
const DEFAULT_LAYOUT = 'article';
const CATEGORY_DISPLAY_ORDER = [
  'Space Coast Open',
  'Monthly Tournament Series',
  '31st Space Coast Open',
  '30th Space Coast Open',
  '29th Space Coast Open',
  '28th Space Coast Open',
  '27th Space Coast Open',
  '26th Space Coast Open',
  '25th Space Coast Open',
  '24th Space Coast Open'
];

const CATEGORY_DISPLAY_RANK = new Map(
  CATEGORY_DISPLAY_ORDER.map((category, index) => [category, index])
);

export function isBlogContentFile(file: ContentFile<BlogPostAttributes>): boolean {
  return file.filename.includes('/blog/') && !file.filename.includes('/_');
}

export function toBlogPostSummary(file: ContentFile<BlogPostAttributes>): BlogPostSummary | null {
  const attrs = file.attributes;
  const slug = attrs.slug || file.slug;

  if (!attrs.title || !attrs.date || !slug) {
    return null;
  }

  return {
    title: attrs.title,
    slug,
    date: attrs.date,
    author: attrs.author || DEFAULT_AUTHOR,
    category: attrs.category,
    thumbnail: attrs.thumbnail,
    pinned: attrs.pinned === true,
    pinOrder: attrs.pinOrder ?? 0,
    excerpt: attrs.excerpt || '',
    layout: attrs.layout || DEFAULT_LAYOUT
  };
}

export function getBlogPostSummaries(files: ContentFile<BlogPostAttributes>[]): BlogPostSummary[] {
  return files
    .map(toBlogPostSummary)
    .filter((post): post is BlogPostSummary => post !== null)
    .sort(sortBlogPosts);
}

export function sortBlogPosts(a: BlogPostSummary, b: BlogPostSummary): number {
  if (a.pinned !== b.pinned) {
    return a.pinned ? -1 : 1;
  }

  if (a.pinned && b.pinned && a.pinOrder !== b.pinOrder) {
    return a.pinOrder - b.pinOrder;
  }

  return new Date(b.date).getTime() - new Date(a.date).getTime();
}

export function getCategoryCounts(posts: BlogPostSummary[]): Array<{ label: string; count: number }> {
  const counts = new Map<string, number>();

  for (const post of posts) {
    if (!post.category) {
      continue;
    }

    counts.set(post.category, (counts.get(post.category) || 0) + 1);
  }

  return Array.from(counts.entries())
    .map(([label, count]) => ({ label, count }))
    .sort(sortBlogCategories);
}

function sortBlogCategories(
  a: { label: string; count: number },
  b: { label: string; count: number }
): number {
  const aRank = CATEGORY_DISPLAY_RANK.get(a.label);
  const bRank = CATEGORY_DISPLAY_RANK.get(b.label);

  if (aRank !== undefined && bRank !== undefined) {
    return aRank - bRank;
  }

  if (aRank !== undefined) {
    return -1;
  }

  if (bRank !== undefined) {
    return 1;
  }

  return a.label.localeCompare(b.label);
}

export function formatBlogDate(value: string | undefined): string {
  if (!value) {
    return '';
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date(value));
}

export function matchesBlogSearch(post: BlogPostSummary, searchTerm: string, category: string): boolean {
  const normalizedCategory = category.trim();

  if (normalizedCategory && post.category !== normalizedCategory) {
    return false;
  }

  const normalizedSearch = searchTerm.trim().toLowerCase();

  if (!normalizedSearch) {
    return true;
  }

  const searchable = [
    post.title,
    post.excerpt,
    post.author,
    post.category || ''
  ].join(' ').toLowerCase();

  return searchable.includes(normalizedSearch);
}
