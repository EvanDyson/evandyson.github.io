import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavItem {
  label: string;
  link?: string;
  children?: NavItem[];
}

@Component({
  selector: 'sccf-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="navbar">
      <div class="navbar-brand fraunces italic">
        <a routerLink="/">Space Coast Chess Foundation</a>
      </div>
      <hr class="line" />
      <button class="menu-toggle" (click)="menuOpen = !menuOpen">☰</button>
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
            @else if (!item.children) {
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
    .navbar {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      padding: 1.5rem 2rem;
      background-color: #F4F2EC;
      color: black;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .line {
      width: 95vw;
    }

    .navbar-brand a {
      font-size: 2.5em;
      font-weight: 500;
      color: inherit;
    }

    nav {
      display: flex;
      gap: 1.5rem;
      align-items: center;
      flex-wrap: wrap;
    }

    nav a,
    nav span {
      text-decoration: none;
      cursor: pointer;
      font-size: 0.95rem;
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
      padding: 0.5rem 0;
      min-width: 220px;
      z-index: 100;
      flex-direction: column;
      border-radius: 5px;
    }

    .dropdown:hover .dropdown-menu {
      display: flex;
    }

    .dropdown-menu a {
      padding: 0.4rem 1rem;
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
      font-size: 1.5rem;
      cursor: pointer;
    }

    @media (max-width: 768px) {
      .menu-toggle {
        display: block;
      }

      nav {
        display: none;
        width: 100%;
        flex-direction: column;
        align-items: flex-start;
      }

      nav.open {
        display: flex;
      }

      .dropdown-menu {
        position: static;
        border: none;
        padding-left: 1rem;
      }

      .dropdown:hover .dropdown-menu {
        display: flex;
      }
    }
  `]
})
export class HeaderComponent {
  menuOpen = false;

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
}