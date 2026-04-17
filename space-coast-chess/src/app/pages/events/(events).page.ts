import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface EventCard {
  title: string;
  link: string;
}

@Component({
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="events-page">
      <section class="events-content">
        <div class="intro-card">
          <p>
            Explore tournaments, camps, upcoming programs, and event policies
            from the Space Coast Chess Foundation.
          </p>
        </div>

        <div class="events-grid">
          @for (event of events; track event.link) {
            <article class="event-card">
              <div class="event-card-content">
                <h2 class="fraunces">{{ event.title }}</h2>
                <a [routerLink]="event.link" class="event-link">
                  View More
                </a>
              </div>
            </article>
          }
        </div>
      </section>
    </section>
  `,
  styles: [`
    :host {
      display: block;
      background: #F4F2EC;
      color: black;
    }

    .events-page {
      width: 100%;
    }

    .events-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 1rem 1.5rem 4rem;
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .intro-card {
      background: #ebe7dc;
      border-radius: 18px;
      padding: 1.25rem 1.5rem;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
      text-align: center;
    }

    .intro-card p {
      margin: 0;
      font-size: 1.05rem;
      line-height: 1.7;
    }

    .events-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 1.5rem;
    }
    .events-grid > :nth-last-child(1):nth-child(3n + 1) {
      grid-column: 2;
    }

    .event-card {
      background: linear-gradient(180deg, #efeadd 0%, #e3dccd 100%);
      border-radius: 20px;
      min-height: 9.5em;
      box-shadow: 0 10px 28px rgba(0, 0, 0, 0.08);
      overflow: hidden;
      display: flex;
      align-items: stretch;
    }

    .event-card-content {
      width: 100%;
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 1rem;
    }

    .event-card h2 {
      margin: 0;
      font-size: 1.55rem;
      font-weight: 500;
      line-height: 1.2;
    }

    .event-link {
      align-self: flex-start;
      text-decoration: none;
      color: black;
      border-bottom: 1px solid black;
      font-weight: 500;
      padding-bottom: 0.15rem;
      transition: opacity 0.2s ease;
    }

    .event-link:hover {
      opacity: 0.7;
    }

    @media (max-width: 1024px) {
      .events-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    @media (max-width: 768px) {
      .events-content {
        padding: 2rem 1rem 3rem;
      }

      .events-grid {
        grid-template-columns: 1fr;
      }

      .event-card {
        min-height: 180px;
      }

      .event-card h2 {
        font-size: 1.3rem;
      }
    }
  `]
})
export default class EventsPage {
  readonly events: EventCard[] = [
    {
      title: 'Space Coast Open',
      link: '/events/spacecoastopen'
    },
    {
      title: 'Upcoming Events',
      link: '/events/upcoming-events'
    },
    {
      title: 'Kids Summer Chess Camp',
      link: '/events/summer-chess-camp'
    },
    {
      title: 'Florida State Championship',
      link: '/events/floridastatechampionship'
    },
    {
      title: 'Completed Events',
      link: '/events/completed-events'
    },
    {
      title: 'Event Rules & Policies',
      link: '/events/event-rules'
    },
    {
      title: 'Kids Summer Chess Camp',
      link: '/events/event-rules'
    },
  ];
}