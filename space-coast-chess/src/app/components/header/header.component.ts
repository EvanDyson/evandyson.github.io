import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'sccf-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="navbar">
      <div class="navbar-brand fraunces">
        <a routerLink="/">Space Coast Chess Foundation</a>
      </div>

      <button class="menu-toggle" (click)="menuOpen = !menuOpen">☰</button>

      <nav [class.open]="menuOpen">
        <a
          routerLink="/"
          routerLinkActive="active"
          [routerLinkActiveOptions]="{ exact: true }"
          (click)="closeMenu()"
        >
          Home
        </a>

        <div class="dropdown">
          <span>Events ▾</span>
          <div class="dropdown-menu">
            <a routerLink="/event/spacecoastopen" (click)="closeMenu()">Space Coast Open</a>
            <a routerLink="/event/floridastatechampionship" (click)="closeMenu()">Florida State Championship</a>
            <a routerLink="/event/summer-chess-camp" (click)="closeMenu()">Summer Chess Camp</a>
            <a routerLink="/event/upcoming-events" (click)="closeMenu()">Upcoming Events</a>
            <a routerLink="/event/completed-events" (click)="closeMenu()">Completed Events</a>
            <a routerLink="/event/tournament-results" (click)="closeMenu()">Tournament Results</a>
            <a routerLink="/event/event-rules" (click)="closeMenu()">Event Rules & Policies</a>
          </div>
        </div>

        <a routerLink="/resources-coaching" (click)="closeMenu()">Resources & Coaching</a>
        <a routerLink="/wheretoplaychess" (click)="closeMenu()">Where To Play Chess</a>
        <a routerLink="/news" (click)="closeMenu()">News & Blog</a>

        <div class="dropdown">
          <span>Contact & About ▾</span>
          <div class="dropdown-menu">
            <a routerLink="/contactus" (click)="closeMenu()">Contact Us</a>
            <a routerLink="/aboutus" (click)="closeMenu()">About Us</a>
            <a routerLink="/boardmembers" (click)="closeMenu()">Board Members</a>
          </div>
        </div>
      </nav>
    </header>
  `,
  styles: [`
    .navbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1.5rem 2rem;
      background-color: #F4F2EC;
      color: black;
      border-bottom: 1px solid #e9ecef;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .navbar-brand a {
      text-decoration: none;
      font-size: 1.2rem;
      font-weight: bold;
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
      background: #1a1a2e;
      color: white;
      border: 1px solid #444;
      padding: 0.5rem 0;
      min-width: 220px;
      z-index: 100;
      flex-direction: column;
    }

    .dropdown:hover .dropdown-menu {
      display: flex;
    }

    .dropdown-menu a {
      padding: 0.4rem 1rem;
      display: block;
      white-space: nowrap;
      color: white;
    }

    .dropdown-menu a:hover {
      background: #333;
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
}