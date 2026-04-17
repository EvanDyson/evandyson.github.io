import { Component } from '@angular/core';

interface EventLink {
  label: string;
  href: string;
}

interface EventItem {
  title: string;
  date: string;
  links?: EventLink[];
}

interface SectionDetail {
  heading: string;
  items: string[];
}

@Component({
  standalone: true,
  imports: [],
  template: `
    <section class="contact-card">
      <h1 class="fraunces italic less-bold">Upcoming Events</h1>

      <section class="section-block">
        <h2 class="section-title bold">Monthly Tournaments</h2>
        <p class="intro">
          <strong>New Location:</strong> Frank T. Forester Recreation Center,
          960 Cogswell St, Rockledge, FL 32955
        </p>
        <ul class="event-list">
          @for (event of monthlyTournaments; track event.title) {
            <li>
              <strong>{{ event.title }}</strong>
              <span> — {{ event.date }}</span>
              @if (event.links?.length) {
                <span>
                  —
                  @for (link of event.links; track link.href; let last = $last) {
                    <a
                      [href]="link.href"
                      target="_blank"
                      rel="noreferrer"
                      class="bold"
                    >
                      {{ link.label }}
                    </a>
                    @if (!last) {
                      <span>, </span>
                    }
                  }
                </span>
              }
            </li>
          }
        </ul>
      </section>

      <section class="section-block">
        <h2 class="section-title bold">Space Coast Open</h2>
        <ul class="event-list">
          @for (event of spaceCoastOpenEvents; track event.title) {
            <li>
              <strong>{{ event.title }}</strong>
              <span> — {{ event.date }}</span>
              @if (event.links?.length) {
                <span>
                  —
                  @for (link of event.links; track link.href; let last = $last) {
                    <a
                      [href]="link.href"
                      target="_blank"
                      rel="noreferrer"
                      class="bold"
                    >
                      {{ link.label }}
                    </a>
                    @if (!last) {
                      <span>, </span>
                    }
                  }
                </span>
              }
            </li>
          }
        </ul>
      </section>

      <section class="section-block">
        <h2 class="section-title bold">Harvey Lerman Florida State Championship</h2>
        <ul class="event-list">
          @for (event of floridaChampionshipEvents; track event.title) {
            <li>
              <strong>{{ event.title }}</strong>
              <span> — {{ event.date }}</span>
              @if (event.links?.length) {
                <span>
                  —
                  @for (link of event.links; track link.href; let last = $last) {
                    <a
                      [href]="link.href"
                      target="_blank"
                      rel="noreferrer"
                      class="bold"
                    >
                      {{ link.label }}
                    </a>
                    @if (!last) {
                      <span>, </span>
                    }
                  }
                </span>
              }
            </li>
          }
        </ul>
      </section>

      <section class="section-block">
        <h2 class="section-title bold">About the Space Coast Monthly Chess Tournament Series</h2>
        <p class="intro">
          This series features approximately one tournament each month as a
          one-day event.
        </p>
        <ul class="event-list">
          @for (item of overviewItems; track item) {
            <li>{{ item }}</li>
          }
        </ul>
      </section>

      <section class="section-block">
        <h2 class="section-title bold">Scholastic (K-12 Students)</h2>
        <ul class="event-list">
          @for (item of scholasticItems; track item) {
            <li>{{ item }}</li>
          }
        </ul>

        <div class="subsection-block">
          <h3 class="subsection-title">Sections</h3>
          <ul class="simple-list">
            @for (section of scholasticSections; track section) {
              <li>{{ section }}</li>
            }
          </ul>
        </div>
      </section>

      <section class="section-block">
        <h2 class="section-title bold">Non-Scholastic (Open Tournament)</h2>
        <ul class="event-list">
          @for (item of nonScholasticItems; track item) {
            <li>{{ item }}</li>
          }
        </ul>

        <div class="subsection-block">
          <h3 class="subsection-title">Sections</h3>
          <ul class="simple-list">
            @for (section of nonScholasticSections; track section) {
              <li>{{ section }}</li>
            }
          </ul>
        </div>

        <div class="subsection-block">
          <h3 class="subsection-title">Prize Fund</h3>
          <ul class="simple-list">
            @for (prize of prizeItems; track prize) {
              <li>{{ prize }}</li>
            }
          </ul>
        </div>
      </section>

      <section class="section-block">
        <h2 class="section-title bold">Refunds</h2>
        <p class="intro">
          All refunds are subject to a $5 service charge. Refunds for
          withdrawals must be requested before the first round is paired.
        </p>
      </section>

      <section class="section-block">
        <h2 class="section-title bold">More Info and Additional Event Rules</h2>
        <ul class="event-list">
          @for (item of additionalInfoItems; track item) {
            <li [innerHTML]="item"></li>
          }
        </ul>
      </section>

      <section class="section-block">
        <h2 class="section-title">Tournament Contacts</h2>
        <div class="contact-grid">
          @for (contact of contacts; track contact.name) {
            <article class="contact-item">
              <h3 class="subsection-title">{{ contact.role }}</h3>
              <p class="intro"><strong>{{ contact.name }}</strong></p>
              <p class="intro">Email: <a [href]="'mailto:' + contact.email" class="bold">{{ contact.email }}</a></p>
              <p class="intro">Phone: <a [href]="'tel:' + contact.phone" class="bold">{{ contact.phone }}</a></p>
            </article>
          }
        </div>
      </section>
    </section>
  `,
  styles: [`
    .contact-card {
      display: flex;
      flex-direction: column;
      margin-left: auto;
      margin-right: auto;
      align-items: center;
      gap: 1.5em;
      max-width: 70%;
      border-radius: 12px;
      background: #dfdbcf;
      border: 1px solid #d3cec0;
      padding: 3em 1.5em;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);
    }

    h1 {
      margin: 0;
      font-size: 2em;
      color: #1f1f1f;
      text-align: center;
    }

    p {
      margin: 0;
    }

    .intro {
      font-size: 1em;
      line-height: 1.6;
      color: #333;
      width: 100%;
    }

    .section-block {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 0.85em;
    }

    .section-title {
      margin: 0;
      font-size: 1.4em;
      color: #1f1f1f;
    }

    .subsection-block {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 0.5em;
    }

    .subsection-title {
      margin: 0;
      font-size: 1.1em;
      color: #1f1f1f;
    }

    .event-list,
    .simple-list {
      width: 100%;
      color: #333;
      font-size: 1em;
      line-height: 1.6;
      padding-left: 1.5em;
      display: flex;
      flex-direction: column;
      gap: 0.75em;
      margin: 0;
    }

    .event-list li,
    .simple-list li {
      padding-left: 0.25em;
    }

    .contact-grid {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 1em;
    }

    .contact-item {
      border: 1px solid #d3cec0;
      border-radius: 10px;
      background: rgba(255, 255, 255, 0.3);
      padding: 1em;
      display: flex;
      flex-direction: column;
      gap: 0.35em;
    }

    a {
      color: inherit;
      text-decoration: underline !important;
    }

    .underline {
      text-decoration: underline;
    }

    @media (max-width: 768px) {
      .contact-card {
        max-width: calc(100% - 2em);
        padding: 1.5em;
      }

      h1 {
        font-size: 1.75em;
      }

      .section-title {
        font-size: 1.25em;
      }

      .contact-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export default class UpcomingEventsPageComponent {
  monthlyTournaments: EventItem[] = [
    {
      title: 'Space Coast Chess - 2026 Brevard Championship!',
      date: 'April 11, 2026',
      links: [
        {
          label: 'Register',
          href: 'https://www.chessregister.com/event/space-coast-chess-2026-brevard-championship'
        },
        {
          label: 'View Participants',
          href: 'https://www.chessregister.com/event/space-coast-chess-2026-brevard-championship/players'
        }
      ]
    }
  ];

  spaceCoastOpenEvents: EventItem[] = [
    {
      title: '2026 Space Coast Open',
      date: 'April 24-26, 2026',
      links: [{ label: 'Link to page', href: '/event/space-coast-open' }]
    },
    {
      title: '2027 Space Coast Open',
      date: 'April 23-25, 2027'
    },
    {
      title: '2028 Space Coast Open',
      date: 'April 21-23, 2028'
    }
  ];

  floridaChampionshipEvents: EventItem[] = [
    {
      title: '2026 Florida Championship',
      date: 'September 5-7, 2026',
      links: [{ label: 'Link to page', href: '/event/florida-state-championship' }]
    }
  ];

  overviewItems: string[] = [
    'Onsite registration starts at 10:00 AM and the first round begins at 10:15 AM.',
    'Advance online registration is highly recommended.',
    'Lunch runs from 12:00 PM to 12:30 PM.',
    'Location: Frank T. Forester Recreation Center, 960 Cogswell St, Rockledge, FL 32955.'
  ];

  scholasticItems: string[] = [
    'US Chess dual-rated (counts for both regular and quick chess ratings).',
    'Time control is Game in 30 minutes with a 5-second delay per move.',
    '5-round Swiss System with rounds at 10:15 AM, 12:30 PM, 1:45 PM, 3:00 PM, and 4:15 PM.',
    'Prizes: Trophies to 1st, 2nd, and 3rd place winners, a best school team trophy, and participation medals for the remaining players.',
    'Entry fee: $25 if received by the Wednesday before the tournament. After that, add $5. Onsite entries must be on the registration line by 10:00 AM or may receive a half-point bye for round 1.'
  ];

  scholasticSections: string[] = [
    'K-1 (pre-K welcome)',
    'K-3',
    'K-5',
    'K-8',
    'K-12'
  ];

  nonScholasticItems: string[] = [
    'US Chess regular rated.',
    'Time control is Game in 40 minutes with a 10-second increment per move.',
    '4-round Swiss System with rounds at 10:15 AM, 12:30 PM, 2:15 PM, and 4:00 PM.',
    'Entry fee: $40 if received by the Wednesday before the tournament. After that, add $10. Onsite entries must be on the registration line by 10:00 AM or may receive a half-point bye for round 1.'
  ];

  nonScholasticSections: string[] = [
    'Open Section (minimum rating of 1600 required)',
    'Under 1600 Section (open to players under 1600 and unrated players)'
  ];

  prizeItems: string[] = [
    '$1,000 prize fund based on 40 entries, with 50% guaranteed.',
    'Open Section: 1st Place - $300, 2nd Place - $150, Under 1900 - $150.',
    'Under 1600 Section: 1st Place - $200, 2nd Place - $100, Under 1200 - $100.'
  ];

  additionalInfoItems: string[] = [
    'See the <a href="/event/event-rules" class="bold underline">Space Coast Chess Foundation (SCCF) Rules</a> for additional rules applicable to this event.',
    'No food or drink is permitted in the playing hall, except water or other beverages in tightly closed containers.',
    'Food is permitted in the skittles room, but all trash must be cleared afterward.',
    'Please do not crowd around posted pairings, standings, or other notices, or in areas used by the event.',
    'US Chess (USCF) membership is required. If the USCF website does not show you as a current member, you will not be paired. If joining USCF, include the membership payment with your registration.',
    'Chess sets are provided. Players are encouraged to bring a chess clock if they have one because only a limited number are available.'
  ];

  contacts = [
    {
      role: 'Chief Tournament Director',
      name: 'Steven Vigil',
      email: 'chessteacher1977@yahoo.com',
      phone: '321-297-7087'
    },
    {
      role: 'Assistant Tournament Director',
      name: 'Sureshkumar Rajamani',
      email: 'suresh231975@gmail.com',
      phone: '616-881-1094'
    }
  ];
}
