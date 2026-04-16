import { Component } from '@angular/core';

interface ChessLocationSection {
  name?: string;
  description?: string[];
  address?: string[];
  when?: string[];
  contact?: string[];
  website?: {
    url?: string;
    display?: string;
  };
  links?: {
    label: string;
    url: string;
  }[];
  image?: string;
  reverse?: boolean;
}

@Component({
  standalone: true,
  imports: [],
  template: `
    <section class="contact-card">
      <h1 class="fraunces italic less-bold">Where To Play Chess</h1>

      <p class="intro">
        Organizations listed on this page are not affiliated with the Space
        Coast Chess Foundation. Information is provided as a service to the
        community.
      </p>

      <p class="intro">
        If you are involved with organizing a club and have information to
        update this page, please get in contact via the email link on our
        Contact page.
      </p>

      <p class="intro">
        Please support these businesses that welcome chess players!
      </p>

      @for (location of locations; track location) {
        <hr style="width: 100%; opacity: 0.25;" />
        <section
          class="coach-row"
          [class.reverse]="location.reverse"
        >
          @if (location.image) {
            <div class="coach-media">
              <img [src]="location.image" [alt]="location.name" />
            </div>
          }

          <div class="coach-content">
            <h2 class="fraunces coach-name">{{ location.name }}</h2>

            @if (location.address?.length) {
              <div class="info-block">
                <p class="label">Address</p>
                @for (line of location.address; track line) {
                  <p class="intro">{{ line }}</p>
                }
              </div>
            }

            @if (location.when?.length) {
              <div class="info-block">
                <p class="label">When</p>
                @for (line of location.when; track line) {
                  <p class="intro">{{ line }}</p>
                }
              </div>
            }

            <p class="label">About</p>
            @for (paragraph of location.description; track paragraph) {
              <p class="intro">{{ paragraph }}</p>
            }

            @if (location.contact?.length || location.website || location.links?.length) {
              <div class="coach-links">
                @if (location.website) {
                  <a
                    class="contact-link"
                    [href]="location.website.url"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Website: {{ location.website.display }}
                  </a>
                }

                @for (link of location.links ?? []; track link) {
                  <a
                    class="contact-link"
                    [href]="link.url"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {{ link.label }}
                  </a>
                }

                @for (item of location.contact ?? []; track item) {
                  <p class="contact-text">{{ item }}</p>
                }
              </div>
            }
          </div>
        </section>
      }
    </section>
  `,
  styles: [`
    .contact-card {
      display: flex;
      flex-direction: column;
      margin-left: auto;
      margin-right: auto;
      align-items: center;
      gap: 1em;
      max-width: 70%;
      border-radius: 12px;
      background: #dfdbcf;
      border: 1px solid #d3cec0;
      padding: 3em 1.5em;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);
    }

    h1 {
      margin: 0 0 1em;
      font-size: 2em;
      color: #1f1f1f;
    }

    .intro {
      width: 100%;
      font-size: 1em;
      line-height: 1.6;
      color: #333;
      margin: 0;
    }

    .coach-row {
      width: 100%;
      display: flex;
      align-items: flex-start;
      gap: 1.5em;
      padding: 1em 0;
    }

    .coach-row.reverse {
      flex-direction: row-reverse;
      text-align: right;
    }

    .coach-media {
      flex: 0 0 34%;
      max-width: 34%;
    }

    .coach-media img {
      display: block;
      width: 100%;
      height: auto;
      border-radius: 12px;
      object-fit: cover;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
    }

    .coach-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.75em;
      min-width: 0;
    }

    .coach-name {
      margin: 0;
      font-size: 1.5em;
      color: #1f1f1f;
    }

    .info-block {
      display: flex;
      flex-direction: column;
      gap: 0.25em;
    }

    .label {
      margin: 0;
      font-size: 1em;
      font-weight: 700;
      color: #1f1f1f;
    }

    .coach-links {
      display: flex;
      flex-direction: column;
      gap: 0.5em;
    }

    .coach-row.reverse .coach-content .coach-links {
      align-items: end;
    }

    .contact-link,
    .contact-text {
      color: #1a1a2e;
      font-size: 1em;
      line-height: 1.6;
      font-weight: 600;
      word-break: break-word;
      width: fit-content;
      margin: 0;
    }

    .contact-link {
      text-decoration: none;
    }

    .contact-link:hover {
      text-decoration: underline;
    }

    @media (max-width: 768px) {
      .contact-card {
        max-width: calc(100vw - 2em);
        padding: 1.5em;
      }

      .coach-row,
      .coach-row.reverse {
        flex-direction: column;
        text-align: left;
      }

      .coach-row.reverse .coach-content .coach-links {
        align-items: start;
      }

      .coach-media {
        flex: none;
        max-width: 100%;
        width: 100%;
      }

      .coach-name {
        font-size: 1.3em;
      }
    }
  `]
})
export default class WhereToPlayChessPageComponent {
  protected readonly locations: ChessLocationSection[] = [
    {
      name: 'RSK Chess Academy',
      description: [
        'Open to all ages and skill levels!',
        'Free and fun for all!'
      ],
      address: [
        'Publix at Addison Center in Viera',
        '7655 Stadium Pkwy, Melbourne, FL 32940'
      ],
      when: [
        'Monday evenings at 7-9PM',
      ],
      image: '/images/where-to-play/viera-chess-club.png',
      reverse: false,
      website: {
        url: 'https://rskchess.com',
        display: 'rskchess'
      },
      contact: [
        'Sureshkumar Rajamani',
        'Email: rskcc22@att.net',
        'Phone: 616-881-1094'
      ],
    },
    {
      name: "Cocoa Beach at Juice 'n Java Cafe Every Monday",
      image: '/images/where-to-play/juice-n-java.png',
      reverse: true,
      address: [
        '75 N Orlando Ave, Cocoa Beach, FL 32931'
      ],
      when: [
        'Every Monday, first round starts at 7:00 PM'
      ],
      description: [
        'Hosted by Brevard Chess Club. Five round Swiss tournament. Welcome to players of all levels and ages.',
        'Complementary drip coffee as well as pastries and specialty coffee drinks are available for sale.',
        '$20 buy in for adults, $15 for kids under 18, and $10 for kids under 13.',
        'To receive the reduced price for kids, you must pay at the door.',
      ],
      contact: [
        'Sean Malone',
        'Phone: 321-514-8547',
        'Email: seanmalone21@live.com'
      ],
      website: {
        url: 'https://brevardchess.org',
        display: 'Brevard Chess Club'
      },
      links: [
        {
          label: 'Register on Chessregister',
          url: 'https://www.chessregister.com'
        }
      ]
    },
    {
      name: 'West Melbourne at Panera Bread every Thursday evening',
      image: '/images/where-to-play/panera.png',
      reverse: false,
      address: [
        '245 Palm Bay Rd NE, West Melbourne, FL 32904'
      ],
      when: [
        'Every Thursday at 6:30 PM'
      ],
      description: [
        'Hosted by Brevard Chess Club. Every Thursday is a five round Swiss tournament at Panera Bread in West Melbourne.',
        'First round will start at 6:30 PM sharp.',
        '$15 buy in for adults, $10 for players under 18.',
        'Prizes for top placements are cash based on entries.',
        'If there is a sufficient amount of players, there will be sections for different skill levels.',
        'Look for chess boards and register with Sean Malone or Alex Dshalalow.',
        'Tournament is U.S. Chess Federation rated for US Chess members.',
        'Players are highly encouraged to bring their own board and clock.'
      ],
      website: {
        url: 'https://brevardchess.org',
        display: 'Brevard Chess Club'
      },
      contact: [
        'Sean Malone',
        'Phone: 321-514-8547',
        'Email: seanmalone21@live.com'
      ]
    },
    {
      name: 'Casual Sunday Chess at the Cocoa Library',
      image: '/images/where-to-play/CasualSundayChess.png',
      reverse: true,
      address: [
        'The Cocoa Library (Catherine Schweinsberg Rood Central Library)',
        '308 Forrest Ave., Cocoa, Florida 32922'
      ],
      when: [
        'Sunday afternoons, starting at 1:00 PM and usually ending around 5:00 PM'
      ],
      description: [
        'Free and open to all.'
      ],
      contact: [
        'For additional information contact the Cocoa Library directly:',
        '321-633-1792 (ask for the reference desk)'
      ]
    },
    {
      name: 'Sun Shoppe Cafe',
      image: '/images/where-to-play/sunshop.png',
      reverse: false,
      description: [
        'Located in downtown Melbourne.',
        'Main time for chess used to be Saturday afternoon from 1:00 PM to 4:00 PM, but it appears that chess players are welcome anytime.',
        'There is no point of contact for this group, but a handful of intermediate to advanced level players gather to play some games there.',
        'This is not recommended for newer chess players.'
      ],
      website: {
        url: 'https://thesunshoppe.com',
        display: 'The Sun Shoppe'
      }
    },
    {
      name: 'Little Shack of Checkmate',
      image: '/images/where-to-play/shack-of-checkmate.png',
      reverse: true,
      address: [
        'The Plant Shack',
        '5800 U.S. Rte 1, Cocoa, FL 32927'
      ],
      when: [
        'Sunday from 2:00 PM to 5:00 PM'
      ],
      description: [
        'Tucked inside The Plant Shack, the Little Shack of Checkmate is a cozy corner where curiosity meets strategy and every move has a story.',
        'Pull up a chair, set the board, and settle in.',
        'All ages and skill levels are welcome to this chess club, from first-timers learning how the pieces wander to seasoned players plotting elegant traps.'
      ],
      contact: [
        'The Plant Shack\'s Phone: (321) 208-8001',
        'Email (Rebecca): ewager.realestate@gmail.com'
      ]
    }
  ];
}