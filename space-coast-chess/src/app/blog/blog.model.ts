export type BlogLayout =
  | 'text'
  | 'article'
  | 'gallery'
  | 'file'
  | 'results'
  | 'media'
  | 'index';

export interface BlogGalleryItem {
  src: string;
  alt?: string;
  caption?: string;
  credit?: string;
}

export interface BlogAttachment {
  label: string;
  file: string;
  type?: string;
}

export interface BlogExternalLink {
  label: string;
  url: string;
}

export interface BlogVideo {
  label: string;
  url: string;
}

export interface BlogRelatedPost {
  title: string;
  slug: string;
}

export interface BlogPostAttributes {
  title?: string;
  slug?: string;
  date?: string;
  author?: string;
  category?: string;
  thumbnail?: string;
  pinned?: boolean;
  pinOrder?: number;
  excerpt?: string;
  layout?: BlogLayout;
  heroImage?: string;
  imageCredit?: string;
  gallery?: BlogGalleryItem[];
  attachments?: BlogAttachment[];
  externalLinks?: BlogExternalLink[];
  videos?: BlogVideo[];
  relatedPosts?: BlogRelatedPost[];
}

export interface BlogPostSummary extends Required<Pick<BlogPostAttributes, 'title' | 'slug' | 'date' | 'author' | 'excerpt' | 'layout'>> {
  category?: string;
  thumbnail?: string;
  pinned: boolean;
  pinOrder: number;
}
