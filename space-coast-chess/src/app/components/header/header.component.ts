import { Component, HostBinding, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs';

interface NavItem {
  label: string;
  link?: string;
  children?: NavItem[];
}

interface BreadcrumbItem {
  label: string;
  link?: string;
}

@Component({
  selector: 'sccf-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    MatIconModule,
    MatButtonModule
  ],
  template: `
    <header class="navbar">
      <div class="navbar-brand fraunces italic">
        <a routerLink="/">Space Coast Chess Foundation</a>
      </div>

      <hr class="line" />

      <div class="mobile-btn-container">
        <button class="menu-toggle" (click)="menuOpen = !menuOpen">☰</button>
        @if (breadcrumbs().length > 0) {
          <div class="path fraunces">
            <a routerLink="/" class="home-link" aria-label="Home">
              <button
                mat-icon-button
                [disableRipple]="true"
                class="icon-only-btn"
              >
                <mat-icon>home</mat-icon>
              </button>
            </a>

            <span class="separator">|</span>

            @for (crumb of breadcrumbs(); track crumb.label; let last = $last) {
              @if (crumb.link) {
                <a [routerLink]="crumb.link" class="breadcrumb-link">
                  {{ crumb.label }}
                </a>
              } @else {
                <span class="breadcrumb-current">
                  {{ crumb.label }}
                </span>
              }

              @if (!last) {
                <span class="separator">|</span>
              }
            }
          </div>
        }
      </div>

      <nav class="fraunces" [class.open]="menuOpen">
        @for (item of navItems; track item) {
          <ng-container>
            @if (item.children) {
              <div class="dropdown">
                <span>{{ item.label }} ▾</span>
                <div class="dropdown-menu">
                  @for (child of item.children; track child) {
                    <a
                      [routerLink]="child.link"
                      (click)="closeMenu()"
                    >
                      {{ child.label }}
                    </a>
                  }
                </div>
              </div>
            }
            @else {
              <a
                [routerLink]="item.link"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: item.link === '/' }"
                (click)="closeMenu()"
              >
                {{ item.label }}
              </a>
            }
          </ng-container>
        }
      </nav>

      <hr class="line" />
    </header>
  `,
  styles: [`
    :host {
      position: sticky;
      top: 0;
      z-index: 1000;
    }

    .icon-only-btn {
      width: 24px;
      height: 24px;
      line-height: 24px;
      padding: 0;
      min-width: 0;
      flex-shrink: 0;
    }

    .icon-only-btn .mat-icon {
      margin: 0;
      width: 24px;
      height: 24px;
      font-size: 24px;
    }

    .mobile-btn-container {
      display: contents;
    }

    .path {
      text-align: left;
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 0.45rem;
      flex-wrap: wrap;
      margin-top: 0.5em;
    }

    .home-link,
    .breadcrumb-link {
      color: inherit;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
    }

    .breadcrumb-link:hover,
    .home-link:hover {
      text-decoration: underline;
      cursor: pointer;
    }

    .breadcrumb-current {
      color: inherit;
    }

    .separator {
      opacity: 0.7;
    }

    .navbar {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      padding: 0.5em 2em;
      background-color: #F4F2EC;
      color: black;
      flex-wrap: wrap;
      gap: 0.5em;
    }

    .line {
      width: 95%;
    }

    .navbar-brand a {
      font-size: 2.5em;
      font-weight: 500;
      color: inherit;
      text-align: center;
      text-decoration: none;
    }

    nav {
      display: flex;
      gap: 1.5em;
      align-items: center;
      flex-wrap: wrap;
    }

    nav a,
    nav span {
      text-decoration: none;
      cursor: pointer;
      font-size: 0.95em;
      color: inherit;
    }

    nav a:hover,
    nav span:hover {
      text-decoration: underline;
    }

    nav a.active {
      font-weight: bold;
      text-decoration: underline;
    }

    .dropdown {
      position: relative;
    }

    .dropdown-menu {
      display: none;
      position: absolute;
      top: 100%;
      left: 0;
      background: #dfdbcf;
      color: black;
      border: 1px solid #444;
      padding: 0.5em 0;
      min-width: 220px;
      z-index: 100;
      flex-direction: column;
      border-radius: 5px;
    }

    .dropdown:hover .dropdown-menu {
      display: flex;
    }

    .dropdown-menu a {
      padding: 0.4em 1em;
      display: block;
      white-space: nowrap;
    }

    .dropdown-menu a:hover {
      background: lightgray;
    }

    .menu-toggle {
      display: none;
      background: none;
      border: none;
      color: black;
      font-size: 1.5em;
      cursor: pointer;
    }

    @media (max-width: 768px) {
      .mobile-btn-container {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        min-height: 40px;
        padding-right: 2.5rem;
      }

      .menu-toggle {
        display: block;
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
      }

      .path {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        margin-top: 0;
        max-width: 100%;
        flex-wrap: wrap;
      }

      nav {
        display: none;
        width: 100%;
        flex-direction: column;
        align-items: flex-start;
      }

      nav.open {
        display: flex;
        align-items: center;
      }

      .dropdown-menu {
        position: static;
        border: none;
        padding-left: 1em;
      }

      .dropdown:hover .dropdown-menu {
        display: flex;
      }

      .navbar-brand {
        text-align: center;
        font-size: 0.7em;
      }
    }
  `]
})
export class HeaderComponent {
  @HostBinding('style.--mat-icon-button-touch-target-size') touchSize = '24px';

  private readonly route = inject(Router);

  readonly url = toSignal(
    this.route.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.route.url)
    ),
    { initialValue: this.route.url }
  );

  menuOpen = false;

  readonly breadcrumbs = computed(() => {
    const url = this.url().split('?')[0].split('#')[0];

    if (url === '/') {
      return [];
    }

    if (url.startsWith('/events/')) {
      const second = url.replace('/events/', '');
      return [
        { label: 'Events', link: '/events' },
        { label: this.getEventLabel(second) }
      ];
    }

    if (url === '/events') {
      return [
        { label: 'Events' }
      ];
    }

    if (url === '/news') {
      return [
        { label: 'News & Blog' }
      ];
    }

    if (url.startsWith('/news/')) {
      const second = url.replace('/news/', '');
      return [
        { label: 'News & Blog', link: '/news' },
        { label: this.formatSlug(second) }
      ];
    }

    if (url === '/resources-coaching') {
      return [
        { label: 'Resources & Coaching' }
      ];
    }

    if (url === '/where-to-play-chess') {
      return [
        { label: 'Where To Play Chess' }
      ];
    }

    if (url.startsWith('/info/')) {
      const second = url.replace('/info/', '');
      return [
        { label: 'Info', link: '/info' },
        { label: this.getInfoLabel(second) }
      ];
    }

    return this.buildGenericBreadcrumbs(url);
  });

  closeMenu(): void {
    this.menuOpen = false;
  }

  navItems: NavItem[] = [
    {
      label: 'Home',
      link: '/'
    },
    {
      label: 'Events',
      children: [
        { label: 'Space Coast Open', link: '/events/spacecoastopen' },
        { label: 'Florida State Championship', link: '/events/floridastatechampionship' },
        { label: 'Summer Chess Camp', link: '/events/summer-chess-camp' },
        { label: 'Upcoming Events', link: '/events/upcoming-events' },
        { label: 'Completed Events', link: '/events/completed-events' },
        { label: 'Tournament Results', link: '/events/tournament-results' },
        { label: 'Event Rules & Policies', link: '/events/event-rules' }
      ]
    },
    {
      label: 'Resources & Coaching',
      link: '/resources-coaching'
    },
    {
      label: 'Where To Play Chess',
      link: '/where-to-play-chess'
    },
    {
      label: 'News & Blog',
      link: '/news'
    },
    {
      label: 'Contact & About',
      children: [
        { label: 'Contact Us', link: '/info/contact-us' },
        { label: 'About Us', link: '/info/about-us' },
        { label: 'Board Members', link: '/info/board-members' }
      ]
    }
  ];

  private getEventLabel(slug: string): string {
    const labels: Record<string, string> = {
      spacecoastopen: 'Space Coast Open',
      floridastatechampionship: 'Florida State Championship',
      'summer-chess-camp': 'Summer Chess Camp',
      'upcoming-events': 'Upcoming Events',
      'completed-events': 'Completed Events',
      'tournament-results': 'Tournament Results',
      'event-rules': 'Event Rules & Policies'
    };

    return labels[slug] ?? this.formatSlug(slug);
  }

  private getInfoLabel(slug: string): string {
    const labels: Record<string, string> = {
      'contact-us': 'Contact Us',
      'about-us': 'About Us',
      'board-members': 'Board Members'
    };

    return labels[slug] ?? this.formatSlug(slug);
  }

  private formatSlug(value: string): string {
    return value
      .replace(/-/g, ' ')
      .replace(/\b\w/g, char => char.toUpperCase());
  }

  private buildGenericBreadcrumbs(url: string): BreadcrumbItem[] {
    const segments = url.split('/').filter(Boolean);

    return segments.map((segment, index) => {
      const isLast = index === segments.length - 1;
      const link = '/' + segments.slice(0, index + 1).join('/');

      return {
        label: this.formatSlug(segment),
        link: isLast ? undefined : link
      };
    });
  }
}