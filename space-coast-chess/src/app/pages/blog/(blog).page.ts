import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, effect, inject, signal, untracked } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { injectContentFiles } from '@analogjs/content';
import type { BlogPostAttributes } from '../../blog/blog.model';
import {
  formatBlogDate,
  getBlogPostSummaries,
  getCategoryCounts,
  isBlogContentFile,
  matchesBlogSearch
} from '../../blog/blog.utils';

@Component({
  standalone: true,
  imports: [FormsModule, NgTemplateOutlet, RouterLink],
  template: `
    <section class="blog-page">
      <header class="blog-hero">
        <p class="eyebrow">Space Coast Chess Foundation</p>
        <h1 class="fraunces italic less-bold">News & Blog</h1>
        <p class="hero-copy">
          Tournament updates, photos, standings, games, announcements, and event resources.
        </p>
      </header>

      <div class="blog-layout">
        <aside class="category-sidebar" aria-label="Categories">
          <div class="category-panel">
            <h2>Categories</h2>
            <button
              type="button"
              class="category-button"
              [class.active]="selectedCategory() === ''"
              (click)="selectedCategory.set('')"
            >
              <span>All Posts</span>
              <strong>{{ posts().length }}</strong>
            </button>

            @for (category of categories(); track category.label) {
              <button
                type="button"
                class="category-button"
                [class.active]="selectedCategory() === category.label"
                (click)="selectedCategory.set(category.label)"
              >
                <span>{{ category.label }}</span>
                <strong>{{ category.count }}</strong>
              </button>
            }
          </div>
        </aside>

        <div class="blog-main">
          <section class="blog-controls" aria-label="Blog search">
            <label class="search-field">
              <span>Search posts</span>
              <input
                type="search"
                [ngModel]="searchTerm()"
                (ngModelChange)="searchTerm.set($event)"
                placeholder="Search by title, category, or author"
              />
            </label>
          </section>

          @if (pinnedPosts().length) {
            <section class="post-section" aria-labelledby="pinned-heading">
              <div class="section-heading">
                <h2 id="pinned-heading">Pinned Posts</h2>
                <span>{{ pinnedPosts().length }}</span>
              </div>
              <div class="post-grid featured">
                @for (post of pinnedPosts(); track post.slug) {
                  <a [routerLink]="['/blog', post.slug]" class="post-card pinned">
                    <ng-container *ngTemplateOutlet="postCard; context: { $implicit: post }" />
                  </a>
                }
              </div>
            </section>
          }

          <section class="post-section" aria-labelledby="latest-heading">
            <div class="section-heading">
              <h2 id="latest-heading">Latest Posts</h2>
              <span>{{ regularPosts().length }}</span>
            </div>

            @if (regularPosts().length) {
              <div class="post-grid">
                @for (post of regularPosts(); track post.slug) {
                  <a [routerLink]="['/blog', post.slug]" class="post-card">
                    <ng-container *ngTemplateOutlet="postCard; context: { $implicit: post }" />
                  </a>
                }
              </div>
            } @else {
              <div class="empty-state">
                <h3>No posts found</h3>
                <p>Try a different search term or category.</p>
              </div>
            }
          </section>
        </div>
      </div>
    </section>

    <ng-template #postCard let-post>
      @if (post.thumbnail) {
        <img [src]="post.thumbnail" [alt]="post.title" />
      }

      <div class="post-content">
        <div class="meta-row">
          @if (post.category) {
            <span class="category">{{ post.category }}</span>
          }
          <span>{{ formatDate(post.date) }}</span>
        </div>

        <h3>{{ post.title }}</h3>
        <p>{{ post.excerpt }}</p>

        @if (post.pinned) {
          <div class="pin-row">
            <span class="pin">Pinned</span>
          </div>
        }
      </div>
    </ng-template>
  `,
  styles: [`
    .blog-page {
      width: min(80vw, 1500px);
      margin: 0 auto;
      padding: 2.5rem 0 4rem;
      color: #1f1f1f;
    }

    .blog-hero {
      border: 1px solid #d4cdbc;
      background: linear-gradient(135deg, #f8f6ef 0%, #dfdbcf 100%);
      padding: 2.5rem;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .eyebrow {
      margin: 0;
      text-transform: uppercase;
      font-size: 0.78rem;
      letter-spacing: 0.08em;
      color: #665f51;
      font-weight: 700;
    }

    h1,
    h2,
    h3,
    p {
      margin: 0;
    }

    h1 {
      font-size: 2.5rem;
      line-height: 1.1;
    }

    .hero-copy {
      max-width: 650px;
      line-height: 1.65;
      color: #3f3a31;
    }

    .blog-layout {
      margin-top: 1.5rem;
      display: grid;
      grid-template-columns: 260px minmax(0, 1fr);
      gap: 1.5rem;
      align-items: start;
    }

    .category-sidebar {
      position: sticky;
      top: 9rem;
      max-height: calc(100vh - 10rem);
      min-height: 0;
    }

    .category-panel {
      border: 1px solid #d4cdbc;
      background: #fffdf8;
      border-radius: 8px;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.65rem;
      max-height: inherit;
      overflow-y: auto;
      overscroll-behavior: contain;
      scrollbar-width: thin;
      scrollbar-color: #8b7355 #eee8da;
    }

    .category-panel::-webkit-scrollbar {
      width: 8px;
    }

    .category-panel::-webkit-scrollbar-track {
      background: #eee8da;
      border-radius: 999px;
    }

    .category-panel::-webkit-scrollbar-thumb {
      background: #8b7355;
      border-radius: 999px;
    }

    .category-panel h2 {
      font-size: 1.1rem;
      padding-bottom: 0.6rem;
      border-bottom: 1px solid #d4cdbc;
    }

    .blog-main,
    .blog-controls {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .search-field {
      display: flex;
      flex-direction: column;
      gap: 0.45rem;
      font-weight: 700;
      color: #2d2a24;
    }

    .search-field input {
      width: 100%;
      border: 1px solid #c7beaa;
      border-radius: 6px;
      padding: 0.9rem 1rem;
      background: #fffdf8;
      color: #1f1f1f;
      font: inherit;
    }

    .search-field input:focus {
      outline: 2px solid #8b7355;
      outline-offset: 2px;
    }

    .category-button {
      border: 1px solid #c7beaa;
      background: #f8f6ef;
      color: #1f1f1f;
      border-radius: 6px;
      padding: 0.65rem 0.75rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.75rem;
      font: inherit;
      text-align: left;
      width: 100%;
    }

    .category-button strong {
      min-width: 1.45rem;
      min-height: 1.45rem;
      border-radius: 999px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: #e4ded0;
      font-size: 0.8rem;
      font-weight: 700;
      flex-shrink: 0;
    }

    .category-button.active,
    .category-button:hover {
      background: #2d2a24;
      color: #fffdf8;
      border-color: #2d2a24;
    }

    .category-button.active strong,
    .category-button:hover strong {
      background: rgba(255, 255, 255, 0.18);
    }

    .post-section {
      margin-top: 2.25rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .section-heading {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      border-bottom: 1px solid #d4cdbc;
      padding-bottom: 0.65rem;
    }

    .section-heading h2 {
      font-size: 1.35rem;
    }

    .section-heading span {
      color: #665f51;
      font-weight: 700;
    }

    .post-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 1rem;
    }

    .post-grid.featured {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .post-card {
      min-height: 100%;
      border: 1px solid #d4cdbc;
      background: #fffdf8;
      color: inherit;
      text-decoration: none;
      border-radius: 8px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      transition: transform 160ms ease, box-shadow 160ms ease, border-color 160ms ease;
    }

    .post-card:hover {
      transform: translateY(-2px);
      border-color: #8b7355;
      box-shadow: 0 10px 24px rgba(45, 42, 36, 0.12);
    }

    .post-card img {
      width: 100%;
      aspect-ratio: 16 / 9;
      object-fit: cover;
      background: #dfdbcf;
    }

    .post-content {
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.65rem;
      flex: 1;
    }

    .meta-row,
    .pin-row {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0.45rem;
      color: #665f51;
      font-size: 0.85rem;
    }

    .category,
    .pin-row span {
      background: #eee8da;
      color: #3f3a31;
      padding: 0.25rem 0.45rem;
      border-radius: 999px;
      font-size: 0.78rem;
      font-weight: 700;
    }

    .pin-row .pin {
      background: #2d2a24;
      color: #fffdf8;
    }

    .post-content h3 {
      font-size: 1.1rem;
      line-height: 1.25;
    }

    .post-content p {
      color: #4f493f;
      line-height: 1.55;
      flex: 1;
    }

    .empty-state {
      border: 1px dashed #b9af9b;
      background: #f8f6ef;
      border-radius: 8px;
      padding: 2rem;
      text-align: center;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    @media (max-width: 900px) {
      .blog-page {
        width: min(100% - 2rem, 1120px);
      }

      .blog-layout {
        grid-template-columns: 1fr;
      }

      .category-sidebar {
        position: static;
        max-height: none;
      }

      .category-panel {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        max-height: none;
        overflow: visible;
      }

      .category-panel h2 {
        grid-column: 1 / -1;
      }

      .post-grid,
      .post-grid.featured {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    @media (max-width: 640px) {
      .blog-page {
        width: min(100% - 1rem, 1120px);
        padding-top: 1rem;
      }

      .blog-hero {
        padding: 1.5rem;
      }

      h1 {
        font-size: 2rem;
      }

      .post-grid,
      .post-grid.featured {
        grid-template-columns: 1fr;
      }

      .category-panel {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export default class BlogPageComponent {
  private readonly contentFiles = injectContentFiles<BlogPostAttributes>(isBlogContentFile);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly searchTerm = signal('');
  readonly selectedCategory = signal('');
  readonly posts = computed(() => getBlogPostSummaries(this.contentFiles));
  readonly categories = computed(() => getCategoryCounts(this.posts()));
  readonly filteredPosts = computed(() =>
    this.posts().filter(post => matchesBlogSearch(post, this.searchTerm(), this.selectedCategory()))
  );
  readonly pinnedPosts = computed(() => this.filteredPosts().filter(post => post.pinned));
  readonly regularPosts = computed(() => this.filteredPosts().filter(post => !post.pinned));

  constructor() {
    this.searchTerm.set(this.route.snapshot.queryParamMap.get('q') || '');
    this.selectedCategory.set(this.route.snapshot.queryParamMap.get('category') || '');

    this.route.queryParamMap
      .pipe(takeUntilDestroyed())
      .subscribe(params => {
        this.searchTerm.set(params.get('q') || '');
        this.selectedCategory.set(params.get('category') || '');
      });

    effect(() => {
      const q = this.searchTerm().trim();
      const category = this.selectedCategory().trim();
      const currentQ = untracked(() => this.route.snapshot.queryParamMap.get('q') || '');
      const currentCategory = untracked(() => this.route.snapshot.queryParamMap.get('category') || '');

      if (q === currentQ && category === currentCategory) {
        return;
      }

      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {
          q: q || null,
          category: category || null
        },
        replaceUrl: true
      });
    });
  }

  formatDate(value: string): string {
    return formatBlogDate(value);
  }
}
