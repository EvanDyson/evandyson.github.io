import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <header class="navbar">
      <div class="navbar-brand">
        <a routerLink="/">Space Coast Chess Foundation</a>
      </div>

      <button class="menu-toggle" (click)="menuOpen = !menuOpen">☰</button>

      <nav [class.open]="menuOpen">
        <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">Home</a>

        <div class="dropdown">
          <span>Events ▾</span>
          <div class="dropdown-menu">
            <a routerLink="/event/spacecoastopen">Space Coast Open</a>
            <a routerLink="/event/floridastatechampionship">Florida State Championship</a>
            <a routerLink="/event/summer-chess-camp">Summer Chess Camp</a>
            <a routerLink="/event/upcoming-events">Upcoming Events</a>
            <a routerLink="/event/completed-events">Completed Events</a>
            <a routerLink="/event/tournament-results">Tournament Results</a>
            <a routerLink="/event/event-rules">Event Rules & Policies</a>
          </div>
        </div>

        <a routerLink="/resources-coaching">Resources & Coaching</a>
        <a routerLink="/wheretoplaychess">Where To Play Chess</a>
        <a routerLink="/news">News & Blog</a>

        <div class="dropdown">
          <span>Contact & About ▾</span>
          <div class="dropdown-menu">
            <a routerLink="/contactus">Contact Us</a>
            <a routerLink="/aboutus">About Us</a>
            <a routerLink="/boardmembers">Board Members</a>
          </div>
        </div>
      </nav>
    </header>

    <main>
      <router-outlet />
    </main>

    <footer>
      <p>Space Coast Chess Foundation</p>
      <p><a href="mailto:spacecoastchessfoundation@hotmail.com">spacecoastchessfoundation&#64;hotmail.com</a></p>
      <p>©2026 by Space Coast Chess Foundation.</p>
    </footer>
  `,
  styles: `
    * { box-sizing: border-box; margin: 0; padding: 0; }

    :host {
      width: 100%;
      background-color: #F4F2EC
    }

    .navbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1.5rem 2rem;
      background: #f8f9fa;
      color: #212529;
      border-bottom: 1px solid #e9ecef;
      flex-wrap: wrap;
      gap: 1rem;
    }
    .navbar-brand a {
      color: white;
      text-decoration: none;
      font-size: 1.2rem;
      font-weight: bold;
    }
    nav {
      display: flex;
      gap: 1.5rem;
      align-items: center;
      flex-wrap: wrap;
    }
    nav a, nav span {
      color: white;
      text-decoration: none;
      cursor: pointer;
      font-size: 0.95rem;
    }
    nav a:hover, nav span:hover { text-decoration: underline; }
    nav a.active { font-weight: bold; text-decoration: underline; }

    .dropdown { position: relative; }
    .dropdown-menu {
      display: none;
      position: absolute;
      top: 100%;
      left: 0;
      background: #1a1a2e;
      border: 1px solid #444;
      padding: 0.5rem 0;
      min-width: 220px;
      z-index: 100;
      flex-direction: column;
    }
    .dropdown:hover .dropdown-menu { display: flex; }
    .dropdown-menu a {
      padding: 0.4rem 1rem;
      display: block;
      white-space: nowrap;
    }
    .dropdown-menu a:hover { background: #333; }

    .menu-toggle {
      display: none;
      background: none;
      border: none;
      color: white;
      font-size: 1.5rem;
      cursor: pointer;
    }

    main {
      min-height: calc(100vh - 60px);
    }

    footer {
      text-align: center;
      padding: 2rem;
      background: #1a1a2e;
      color: #ccc;
      margin-top: 3rem;
      line-height: 2;
    }
    footer a { color: #ccc; }

    @media (max-width: 768px) {
      .menu-toggle { display: block; }
      nav {
        display: none;
        width: 100%;
        flex-direction: column;
        align-items: flex-start;
      }
      nav.open { display: flex; }
      .dropdown-menu {
        position: static;
        border: none;
        padding-left: 1rem;
      }
      .dropdown:hover .dropdown-menu { display: flex; }
    }
  `
})
export class App {
  menuOpen = false;
}