import { Component } from '@angular/core';

interface CoachSection {
  name: string;
  description: string[];
  website?: {
    url?: string;
    display?: string;
  };
  email?: string;
  phone?: string;
  image?: string;
  reverse?: boolean;
}

@Component({
  standalone: true,
  imports: [],
  template: `
    <section class="contact-card">
      <h1 class="fraunces italic less-bold">Resources & Coaching</h1>
        
      <p class="intro">
        Currently the Space Coast Chess Foundation does not offer group or
        individual instruction, with the exception of free seminars that are
        offered as part of our annual Space Coast Open Chess Festival. For
        information on these seminars, refer to information on the festival.
      </p>

      <p class="intro">
        As a service to the community, we will provide information on this page
        about chess classes and coaches in the Brevard County area. The providers
        of these services are independent from the Space Coast Chess Foundation.
        We assume no responsibility for the accuracy of the information provided
        or for any aspects of the services provided.
      </p>

      @for (coach of coaches; track coach) {
        <hr style="width: 100%; opacity: 0.25;" />
        <section
          class="coach-row"
          [class.reverse]="coach.reverse"
        >
          @if (coach.image) {
            <div class="coach-media">
              <img [src]="coach.image" />
            </div>
          }

          <div class="coach-content">
            <h2 class="fraunces coach-name">{{ coach.name }}</h2>

            @for (paragraph of coach.description; track paragraph) {
              <p class="intro">
                {{ paragraph }}
              </p>
            }

            <div class="coach-links">
              @if (coach.website) {
                <a
                  class="contact-link"
                  [href]="coach.website.url"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Website: {{ coach.website.display }}
                </a>
              }
              @if (coach.email) {
                <a
                  class="contact-link"
                  [href]="'mailto:' + coach.email"
                >
                  Email: {{ coach.email }}
                </a>
              }
              @if (coach.phone) {
                <a
                  class="contact-link"
                  [href]="'tel:' + digitsOnly(coach.phone)"
                >
                  Phone: {{ coach.phone }}
                </a>
              }
            </div>
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

    .hero {
      position: relative;
      width: 100%;
      overflow: hidden;
      border-radius: 12px;
    }

    .hero img {
      display: block;
      width: 100%;
      height: auto;
      object-fit: cover;
      border-radius: 12px;
    }

    .title-overlay {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5em;
      pointer-events: none;
    }

    .title {
      margin: 0;
      font-size: 2em;
      color: white;
      padding: 0.5em 1em;
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.18);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.18);
      text-align: center;
    }

    .intro {
      width: 100%;
      font-size: 1em;
      line-height: 1.6;
      color: #333;
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

    .coach-links {
      display: flex;
      flex-direction: column;
      gap: 0.5em;
    }
    .coach-row.reverse .coach-content .coach-links {
      align-items: end;
    }

    .contact-link {
      color: #1a1a2e;
      text-decoration: none;
      font-size: 1em;
      line-height: 1.6;
      font-weight: 600;
      word-break: break-word;
      width: fit-content;
    }

    .contact-link:hover {
      text-decoration: underline;
    }

    @media (max-width: 768px) {
      .contact-card {
        max-width: calc(100vw - 2em);
        padding: 1.5em;
      }

      .title {
        font-size: 1.75em;
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
export default class ResourcesCoachingPageComponent {
  protected readonly coaches: CoachSection[] = [
    {
      name: 'Steven Vigil',
      image: '/images/coaches/Steven-Vigil.png',
      reverse: false,
      description: [
        'Steven Vigil is a tournament director and chess teacher. He offers after school chess classes at several Brevard County schools. He also gives private lessons by appointment.'
      ],
      website: {
        url: 'https://www.stevenvigilchess.com',
        display: 'stevenvigilchess'
      },
      email: 'chessteacher1977@yahoo.com'
    },
    {
      name: 'Sureshkumar Rajamani',
      image: '/images/coaches/Sureshkumar-Rajamani.png',
      reverse: true,
      description: [
        'Sureshkumar Rajamani is an Expert rated chess player, board member of the Space Coast Chess Foundation and coach at RSK Chess Academy. He offers chess classes for individuals or groups in person or online by appointment.'
      ],
      website: {
        url: 'https://rskchess.com',
        display: 'rskchess'
      },
      email: 'rskcc22@att.net',
      phone: '616-881-1094'
    },
    {
      name: 'Zoe Zelner',
      image: '/images/coaches/Zoe-Zelner.png',
      reverse: false,
      description: [
        'Hi, I\'m Zoe Zelner. I am Florida\'s Girls State Champion and representative for Susan Polgar\'s Invitational 2023 as well as the Haring National Tournament of Girls State Champions at the U.S. Open.',
        'My FIDE rating is 1902, and my USCF is 1821 (Mid 2024). I offer online and in person chess lessons at our location in Merritt Island. I teach all ages. I specialize in teaching beginners and scholastic players.',
        'I charge $40 an hr or $50 for 1.5 hrs. I am looking forward to starting your chess journey with you!'
      ],
      email: 'zoezelner@gmail.com',
      phone: '407-883-1517'
    }
  ];

  protected digitsOnly(value: string): string {
    return value.replace(/\D/g, '');
  }
}