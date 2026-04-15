import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'sccf-home-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="finished-pages">
      <p>Finished Pages</p>
      <hr style="width: 30vw;" />
      <a
        routerLink="/events/summer-chess-camp"
      >
        Summer chess camp
      </a>
      <a
        routerLink="/events/tournament-results"
      >
        Tournament Results
      </a>
      <a
        routerLink="/events/summer-chess-camp"
      >
        Tournament Rules
      </a>
      <a
        routerLink="/info/contact-us"
      >
        Contact Us
      </a>
      <hr style="width: 30vw;" />
    </section>

    <section class="events-grid">
      @for (card of eventCards; track card) {
        <a [routerLink]="card.link" class="event-card">
          <img [src]="card.image" [alt]="card.alt" />
          <p>{{ card.title }}</p>
        </a>
      }
    </section>

    <section class="blog-section">
      <h2>Recent News & Blog Posts</h2>
      <div class="blog-grid">
        @for (post of blogPosts; track post) {
          <a [routerLink]="post.link" class="blog-card">
            <span class="category">{{ post.category }}</span>
            <h3>{{ post.title }}</h3>
          </a>
        }
      </div>
      <a routerLink="/news" class="view-all">View All Posts →</a>
    </section>
  `,
  styles: [`
    .finished-pages {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1em;
      padding: 2em;
    }

    .events-grid {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 1.5em;
      padding: 2em;
    }

    .event-card {
      text-align: center;
      text-decoration: none;
      color: inherit;
      width: 225px;
    }

    .event-card img {
      width: 225px;
      height: 225px;
      object-fit: cover;
      border-radius: 8px;
    }

    .event-card p {
      margin-top: 0.5em;
      font-weight: bold;
    }

    .event-card:hover img {
      opacity: 0.85;
    }

    .blog-section {
      padding: 2em;
      max-width: 900px;
      margin: 0 auto;
    }

    .blog-section h2 {
      margin-bottom: 1em;
    }

    .blog-grid {
      display: flex;
      flex-direction: column;
      gap: 1em;
    }

    .blog-card {
      text-decoration: none;
      color: inherit;
      border: 1px solid #ddd;
      padding: 1em;
      border-radius: 6px;
    }

    .blog-card:hover {
      background: #f9f9f9;
    }

    .category {
      font-size: 0.8em;
      color: #888;
      text-transform: uppercase;
    }

    .blog-card h3 {
      margin: 0.25em 0 0;
      font-size: 1em;
    }

    .view-all {
      display: inline-block;
      margin-top: 1.5em;
      color: #1a1a2e;
      font-weight: bold;
      text-decoration: none;
    }

    .view-all:hover {
      text-decoration: underline;
    }
  `]
})
export class HomePageComponent {
  eventCards = [
    {
      image: '/images/space-coast-open.jpg',
      alt: 'Space Coast Open',
      title: '2026 Space Coast Open',
      link: '/event/spacecoastopen'
    },
    {
      image: '/images/florida-state-champ.png',
      alt: 'Florida State Championship',
      title: '2026 Harvey Lerman Florida State Championship',
      link: '/event/floridastatechampionship'
    },
    {
      image: '/images/brevard-monthly.jpg',
      alt: 'Brevard Monthly Events',
      title: 'Brevard Monthly Events',
      link: '/event/upcoming-events'
    },
    {
      image: '/images/summer-chess-camp.jpg',
      alt: '2026 Summer Chess Camp',
      title: '2026 Summer Chess Camp',
      link: '/event/summer-chess-camp'
    }
  ];

  blogPosts = [
    {
      title: 'Blog Entry Quick Access Index',
      category: 'General',
      link: '/news'
    },
    {
      title: '2025 Turkey Bash! @ Frank T. Forester Recreation Center — Nov 8th 2025',
      category: 'Monthly Tournament Series',
      link: '/news'
    },
    {
      title: '2025 Brouhaha! @ Frank T. Forester Recreation Center — Oct 4th 2025',
      category: 'Monthly Tournament Series',
      link: '/news'
    },
    {
      title: '2025 Fall Fracas! @ Frank T. Forester Recreation Center — Sep 13th 2025',
      category: 'Monthly Tournament Series',
      link: '/news'
    },
    {
      title: '2025 Harvest Challenge! @ Frank T. Forester Recreation Center — Aug 9th 2025',
      category: 'Monthly Tournament Series',
      link: '/news'
    }
  ];
}