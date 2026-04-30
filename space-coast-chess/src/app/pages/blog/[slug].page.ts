import { Component, ViewEncapsulation, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { injectContent, MarkdownComponent } from '@analogjs/content';
import type { BlogPostAttributes } from '../../blog/blog.model';
import { formatBlogDate } from '../../blog/blog.utils';
import { TitleService } from '../../services/title.service';

@Component({
  standalone: true,
  imports: [MarkdownComponent, RouterLink],
  encapsulation: ViewEncapsulation.None,
  template: `
    <section class="blog-post-page">
      @if (hasPost()) {
        <article class="blog-article">
          <a routerLink="/blog" class="back-link">&larr; Back to Blog</a>

          <header class="article-header">
            <div class="meta-row">
              @if (post()?.category) {
                <span class="category">{{ post()?.category }}</span>
              }
              <span>{{ formatDate(post()?.date) }}</span>
              <span>{{ post()?.author || 'Space Coast Chess Foundation' }}</span>
            </div>

            <h1 class="fraunces italic less-bold">{{ post()?.title }}</h1>

            @if (post()?.excerpt) {
              <p class="excerpt">{{ post()?.excerpt }}</p>
            }
          </header>

          @if (post()?.heroImage) {
            <figure class="hero-image">
              <img [src]="post()?.heroImage" [alt]="post()?.title || ''" />
              @if (post()?.imageCredit) {
                <figcaption>{{ post()?.imageCredit }}</figcaption>
              }
            </figure>
          }

          <analog-markdown [content]="contentFile()?.content" classes="article-body" />

          @if (post()?.gallery?.length) {
            <section class="format-section">
              <h2>Gallery</h2>
              <div class="gallery-grid">
                @for (image of post()?.gallery || []; track image.src) {
                  <figure>
                    <img [src]="image.src" [alt]="image.alt || image.caption || post()?.title || ''" />
                    @if (image.caption || image.credit) {
                      <figcaption>
                        @if (image.caption) {
                          <span>{{ image.caption }}</span>
                        }
                        @if (image.credit) {
                          <small>{{ image.credit }}</small>
                        }
                      </figcaption>
                    }
                  </figure>
                }
              </div>
            </section>
          }

          @if (post()?.attachments?.length) {
            <section class="format-section">
              <h2>Files</h2>
              <div class="link-grid">
                @for (attachment of post()?.attachments || []; track attachment.file) {
                  <a [href]="attachment.file" class="resource-link">
                    <strong>{{ attachment.label }}</strong>
                    @if (attachment.type) {
                      <span>{{ attachment.type }}</span>
                    }
                  </a>
                }
              </div>
            </section>
          }

          @if (post()?.externalLinks?.length || post()?.videos?.length) {
            <section class="format-section">
              <h2>Links</h2>
              <div class="link-grid">
                @for (link of post()?.externalLinks || []; track link.url) {
                  <a [href]="link.url" class="resource-link" target="_blank" rel="noreferrer">
                    <strong>{{ link.label }}</strong>
                    <span>Open link</span>
                  </a>
                }
                @for (video of post()?.videos || []; track video.url) {
                  <a [href]="video.url" class="resource-link" target="_blank" rel="noreferrer">
                    <strong>{{ video.label }}</strong>
                    <span>Watch video</span>
                  </a>
                }
              </div>
            </section>
          }

          @if (post()?.relatedPosts?.length) {
            <section class="format-section">
              <h2>Related Posts</h2>
              <div class="link-grid">
                @for (related of post()?.relatedPosts || []; track related.slug) {
                  <a [routerLink]="['/blog', related.slug]" class="resource-link">
                    <strong>{{ related.title }}</strong>
                    <span>Read post</span>
                  </a>
                }
              </div>
            </section>
          }

        </article>
      } @else {
        <section class="not-found">
          <h1 class="fraunces italic less-bold">Post Not Found</h1>
          <p>The blog post you are looking for could not be found.</p>
          <a routerLink="/blog">Back to Blog</a>
        </section>
      }
    </section>
  `,
  styles: [`
    .blog-post-page {
      width: min(900px, calc(100% - 2rem));
      margin: 0 auto;
      padding: 2.5rem 0 4rem;
      color: #1f1f1f;
    }

    .blog-article,
    .not-found {
      border: 1px solid #d4cdbc;
      background: #fffdf8;
      border-radius: 8px;
      padding: 2rem;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .back-link,
    .not-found a {
      color: #3f3a31;
      font-weight: 700;
      text-decoration: none;
    }

    .back-link:hover,
    .not-found a:hover {
      text-decoration: underline;
    }

    .article-header {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      border-bottom: 1px solid #d4cdbc;
      padding-bottom: 1.25rem;
    }

    .meta-row {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      align-items: center;
      color: #665f51;
      font-size: 0.9rem;
    }

    .category {
      background: #eee8da;
      color: #3f3a31;
      padding: 0.25rem 0.5rem;
      border-radius: 999px;
      font-size: 0.78rem;
      font-weight: 700;
    }

    h1,
    h2,
    p,
    figure {
      margin: 0;
    }

    h1 {
      font-size: 2.5rem;
      line-height: 1.1;
    }

    .excerpt {
      color: #4f493f;
      line-height: 1.65;
      font-size: 1.1rem;
    }

    .hero-image {
      display: flex;
      flex-direction: column;
      gap: 0.45rem;
    }

    .hero-image img,
    .gallery-grid img {
      width: 100%;
      display: block;
      border-radius: 6px;
      object-fit: cover;
      background: #dfdbcf;
    }

    .hero-image img {
      max-height: 460px;
    }

    figcaption {
      color: #665f51;
      font-size: 0.85rem;
    }

    .article-body {
      color: #2d2a24;
      line-height: 1.75;
      font-size: 1.03rem;
    }

    .article-body h2,
    .article-body h3 {
      margin-top: 1.35rem;
      margin-bottom: 0.5rem;
      line-height: 1.25;
    }

    .article-body p,
    .article-body ul,
    .article-body ol,
    .article-body table {
      margin: 0.85rem 0;
    }

    .article-body img {
      max-width: 100%;
      border-radius: 6px;
    }

    .article-body table {
      width: 100%;
      border-collapse: collapse;
      overflow: hidden;
      display: block;
    }

    .article-body th,
    .article-body td {
      border: 1px solid #d4cdbc;
      padding: 0.55rem;
      text-align: left;
    }

    .article-body th {
      background: #eee8da;
    }

    .format-section {
      display: flex;
      flex-direction: column;
      gap: 0.85rem;
      border-top: 1px solid #d4cdbc;
      padding-top: 1.25rem;
    }

    .format-section h2 {
      font-size: 1.35rem;
    }

    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 1rem;
    }

    .gallery-grid figure {
      display: flex;
      flex-direction: column;
      gap: 0.45rem;
    }

    .gallery-grid img {
      aspect-ratio: 4 / 3;
    }

    .gallery-grid figcaption {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
    }

    .link-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 0.75rem;
    }

    .resource-link {
      border: 1px solid #d4cdbc;
      border-radius: 8px;
      padding: 0.9rem;
      color: inherit;
      text-decoration: none;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      background: #f8f6ef;
    }

    .resource-link:hover {
      border-color: #8b7355;
      background: #eee8da;
    }

    .resource-link span {
      color: #665f51;
      font-size: 0.88rem;
    }

    .not-found {
      text-align: center;
      align-items: center;
    }

    @media (max-width: 640px) {
      .blog-post-page {
        width: min(100% - 1rem, 900px);
        padding-top: 1rem;
      }

      .blog-article,
      .not-found {
        padding: 1.25rem;
      }

      h1 {
        font-size: 2rem;
      }

      .gallery-grid,
      .link-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export default class BlogPostPageComponent {
  private readonly titleService = inject(TitleService);
  readonly contentFile = toSignal(
    injectContent<BlogPostAttributes>({ param: 'slug', subdirectory: 'blog' }),
    { initialValue: undefined }
  );

  readonly post = computed(() => this.contentFile()?.attributes as BlogPostAttributes | undefined);
  readonly hasPost = computed(() => Boolean(this.post()?.title));

  constructor() {
    effect(() => {
      const post = this.post();

      if (post?.title) {
        this.titleService.setTitle(post.title);
      }
    });
  }

  formatDate(value: string | undefined): string {
    return formatBlogDate(value);
  }
}
