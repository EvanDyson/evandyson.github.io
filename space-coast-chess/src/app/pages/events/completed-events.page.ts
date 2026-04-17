import { Component } from '@angular/core';

interface EventLink {
  label: string;
  href: string;
}

interface CompletedEvent {
  title: string;
  date: string;
  links?: EventLink[];
  details?: string[];
}

interface EventYearGroup {
  year: string;
  events: CompletedEvent[];
}

@Component({
  standalone: true,
  imports: [],
  template: `
    <section class="contact-card">
      <h1 class="fraunces italic less-bold">Completed Events</h1>

      @for (group of completedEventGroups; track group.year) {
        <section class="section-block">
          <h2 class="section-title fraunces bold">{{ group.year }}</h2>

          <ul class="event-list">
            @for (event of group.events; track event.title + event.date) {
              <li class="event-item">
                <p class="event-summary">
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
                        >{{ link.label }}</a>@if (!last) {<span>, </span>}
                      }
                    </span>
                  }
                </p>

                @if (event.details?.length) {
                  <ul class="detail-list">
                    @for (detail of event.details; track detail) {
                      <li>{{ detail }}</li>
                    }
                  </ul>
                }
              </li>
            }
          </ul>
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

    .event-list,
    .detail-list {
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

    .event-item {
      padding-left: 0.25em;
    }

    .event-summary {
      width: 100%;
    }

    .detail-list {
      margin-top: 0.5em;
      padding-left: 1.25em;
      gap: 0.5em;
      font-size: 0.98em;
    }

    a {
      color: inherit;
      text-decoration: underline !important;
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
    }
  `]
})
export default class CompletedEventsPageComponent {
  completedEventGroups: EventYearGroup[] = [
    {
      year: '2026',
      events: [
        {
          title: 'Space Coast Chess - 2026 Chess Carnival!',
          date: 'Feb. 7th, 2026',
          links: [
            {
              label: 'USCF Ratings Report',
              href: 'https://ratings.uschess.org/event/202602070833?section=0'
            }
          ]
        },
        {
          title: 'Space Coast Chess - 2026 City Classic!',
          date: 'Mar. 7th, 2026',
          links: [
            {
              label: 'USCF Ratings Report',
              href: 'https://ratings.uschess.org/event/202603070613?section=0'
            }
          ]
        }
      ]
    },
    {
      year: '2025',
      events: [
        {
          title: 'Space Coast Chess - 2025 Brevard Celebration!',
          date: 'Dec. 6th, 2025',
          links: [
            {
              label: 'USCF Ratings Report',
              href: 'https://ratings.uschess.org/event/202512060523'
            }
          ]
        },
        {
          title: 'Space Coast Chess - 2025 Turkey Bash!',
          date: 'Nov. 8th, 2025',
          links: [
            {
              label: 'USCF Ratings Report',
              href: 'https://ratings.uschess.org/event/202511080603'
            }
          ]
        },
        {
          title: 'Space Coast Chess - 2025 Brouhaha!',
          date: 'Oct. 4th, 2025',
          links: [
            {
              label: 'USCF Ratings Report',
              href: 'https://www.uschess.org/assets/msa_joomla/XtblMain.php?202510045342'
            }
          ]
        },
        {
          title: 'Space Coast Chess - 2025 Fall Fracas!',
          date: 'Sep. 13th, 2025',
          links: [
            {
              label: 'USCF Ratings Report',
              href: 'https://www.uschess.org/assets/msa_joomla/XtblMain.php?202509139012'
            }
          ]
        },
        {
          title: 'Space Coast Chess - 2025 Harvest Challenge!',
          date: 'Aug. 9th, 2025',
          links: [
            {
              label: 'USCF Ratings Report',
              href: 'https://www.uschess.org/msa/XtblMain.php?202508099132'
            }
          ]
        },
        {
          title: 'Space Coast Chess - 2025 Summer Challenge!',
          date: 'Jul. 12th, 2025',
          links: [
            {
              label: 'USCF Ratings Report',
              href: 'https://www.uschess.org/msa/XtblMain.php?202507122102.0'
            }
          ]
        },
        {
          title: 'Space Coast Chess - Brevard Classic!',
          date: 'Jun. 7th, 2025',
          links: [
            {
              label: 'USCF Ratings Report',
              href: 'https://www.uschess.org/msa/XtblMain.php?202506073692'
            }
          ]
        },
        {
          title: 'Space Coast Chess - Brevard Championship!',
          date: 'Apr. 12th, 2025',
          links: [
            {
              label: 'USCF Ratings Report',
              href: 'https://www.uschess.org/msa/XtblMain.php?202504128162'
            }
          ]
        },
        {
          title: 'Space Coast Chess - City Classic!',
          date: 'Mar. 1st, 2025',
          links: [
            {
              label: 'USCF Ratings Report',
              href: 'https://www.uschess.org/msa/XtblMain.php?202503011172'
            }
          ]
        },
        {
          title: 'Space Coast Chess - Chess Carnival',
          date: 'Feb. 8th, 2025',
          links: [
            {
              label: 'USCF Ratings Report',
              href: 'https://www.uschess.org/msa/XtblMain.php?202502087882'
            }
          ]
        },
        {
          title: 'Space Coast Chess - Blizzard Bowl',
          date: 'Jan. 11th, 2025',
          links: [
            {
              label: 'USCF Ratings Report',
              href: 'https://www.uschess.org/msa/XtblMain.php?202501110382'
            }
          ]
        }
      ]
    },
    {
      year: '2024',
      events: [
        {
          title: 'Space Coast Chess - Turkey Bash',
          date: 'Nov. 16th, 2024',
          links: [
            {
              label: 'USCF Ratings Report',
              href: 'https://www.uschess.org/msa/XtblMain.php?202411168342'
            }
          ]
        },
        {
          title: 'Space Coast Chess - Brouhaha',
          date: 'Oct. 19th, 2024',
          links: [
            {
              label: 'USCF Ratings Report',
              href: 'https://www.uschess.org/msa/XtblMain.php?202410190922'
            }
          ]
        },
        {
          title: 'Space Coast Chess - Fall Fracas',
          date: 'Sept. 14th, 2024',
          links: [
            {
              label: 'USCF Ratings Report',
              href: 'https://www.uschess.org/msa/XtblMain.php?202409149812'
            }
          ]
        },
        {
          title: 'Space Coast Chess - City Classic',
          date: 'June 8th, 2024',
          links: [
            {
              label: 'USCF Ratings Report',
              href: 'https://www.uschess.org/msa/XtblMain.php?202406083612'
            }
          ],
          details: [
            'Open Division Winners: 1st place - IM Mladen Vucic, 2nd place - NM Mikel Petersen, 3rd place - Peter McQuillan',
            'Under 1600 Division Winners: 1st place - Evan Qian, 2nd place - Joseph Toth, 3rd place (shared) - Alex Dshalalow, Nicholas Tadros, Braden Blackwell, Owen Christo Deao, Richard Liu',
            'Scholastic K-12 Winners: 1st place - Shivbhagat Hegde, 2nd place - Daniel Shi, 3rd place - Cooper Johnson'
          ]
        },
        {
          title: 'Kids Summer Chess Camp',
          date: '6/10 - 6/14 @ 12pm - 3pm',
          details: [
            'Ages: 5-12'
          ]
        },
        {
          title: '2024 Space Coast Open',
          date: 'May 3-5, 2024',
          links: [
            {
              // (TODO) NEED LINK TO NEW BLOG POST
              label: 'Event Report',
              href: 'https://www.spacecoastchessfoundation.org/post/alex-zelner-memorial-29th-space-coast-open-table-of-contents'
            },
            {
              label: 'USCF Ratings Report',
              href: 'https://www.uschess.org/msa/XtblMain.php?202405054442'
            }
          ]
        },
        {
          title: 'Space Coast Chess - 2024 Brevard Championship',
          date: 'Apr. 13th, 2024',
          links: [
            {
              label: 'USCF Ratings Report',
              href: 'https://www.uschess.org/msa/XtblMain.php?202404136482'
            }
          ],
          details: [
            'Non-Scholastic Winners: 1st place - Andrew Rea, 2nd place - Alex Dshalalow, 3rd place (shared) - Peter McQuillan, Sean Luong, Mike Yang',
            'Scholastic K8 Winners: 1st place (shared) - Maheem Modi, Cooper Johnson, 3rd place (shared) - Lily Sharma, Asher Roberts',
            'Scholastic K5 Winners: 1st place (shared) - Alonzo Rege, Elijah Gonzalez, Benjamin Liao',
            'Scholastic K3 Winners: 1st place - Karthikeya Pasupuleti, 2nd place - Nynisha Shankar, 3rd place - Ezra Dshalalow',
            'Top School - Indialantic'
          ]
        },
        {
          title: 'Space Coast Chess - Chess Carnival',
          date: 'Feb. 17th, 2024',
          links: [
            {
              label: 'USCF Ratings Report',
              href: 'https://www.uschess.org/msa/XtblMain.php?202402170632'
            }
          ],
          details: [
            'Non-Scholastic Winners: 1st place - Peter Dyson, 2nd place - Andrew Rea, 3rd place (shared) - Zoe Zelner, Carter Zsittnik',
            'Scholastic K12 Winners: 1st place - Nicholas Tadros, 2nd place (shared) - Braden Blackwell, Tommy Jantunen',
            'Scholastic K5 Winners: 1st place (shared) - Cooper Johnson, Sofiya Tal, 3rd place - Alonzo Rege',
            'Top School - Indialantic'
          ]
        },
        {
          title: 'Space Coast Chess - Blizzard Bowl',
          date: 'Jan. 13th, 2024',
          links: [
            {
              label: 'USCF Ratings Report',
              href: 'https://www.uschess.org/msa/XtblMain.php?202401130842'
            }
          ],
          details: [
            'Non-Scholastic Winners: 1st place - Peter McQuillan, 2nd place - Diego Milla, 3rd place (shared) - Ethan Tal, Ivan Goponenko, Alexander Dshalalow',
            'Scholastic K-12 Winners: 1st place - Nicholas Tadros, 2nd place (shared) - Braden Blackwell, Nishant Chandrasekar',
            'Scholastic K-5 Winners: 1st place - Cooper Michael, 2nd place (shared) - Sofiya Tal, Ethan Nastasi, Alonzo Rege, Liam Korestsky-Staples',
            'Scholastic K-3 Winners: 1st place - Benjamin Liao, 2nd place - Lucas Moule, 3rd place (shared) - Liam Kettering, Braden Flickinger',
            'Top School - Holy Trinity'
          ]
        }
      ]
    },
    {
      year: '2023',
      events: [
        {
          title: 'Space Coast Chess - 2023 Turkey Bash',
          date: 'Dec. 9, 2023',
          links: [
            {
              label: 'USCF Ratings Report',
              href: 'https://www.uschess.org/msa/XtblMain.php?202312092332'
            }
          ],
          details: [
            'Non-Scholastic Winners: 1st place - Peter McQuillan, 2nd place - Peter Dyson, 3rd place (shared) - Andrew Rea, Sureshkumar Rajamani, Yash Gupta',
            'Scholastic K-12 Winners: 1st place (shared) - Maheem Modi, Shreeya Jethwani, Nishant Chandrasekar; 2nd place (shared) - Aahan Gupta, Mukilan Karthik, Lily Sharma; 3rd place (shared) - Lucas Moule, Alonzo Rege',
            'Top School - Holy Trinity'
          ]
        },
        {
          title: 'Space Coast Chess - 2023 Brouhaha',
          date: 'Oct. 28, 2023',
          links: [
            {
              label: 'USCF Ratings Report',
              href: 'https://www.uschess.org/msa/XtblMain.php?202310287742'
            }
          ],
          details: [
            'Non-Scholastic Winners: 1st place - Ceejay Jacobs, 2nd place - Norbert Lou, 3rd place - Sureshkumar Rajamani',
            'Scholastic K-12 Winners: 1st place - Sam Lou, 2nd place - Arthur O\'Connor, 3rd place - Archit Kulkarni; Top School - Trinity Prep',
            'Scholastic K-5 Winners: 1st place - Elisey Kulichenko, 2nd place - Ezra Dshalalow, 3rd place - Leo Zhao, 4th place - Sofiya Tal',
            'Top school - Holy Trinity'
          ]
        },
        {
          title: 'Space Coast Chess - 2023 Fall Fracas',
          date: 'Sep. 30, 2023',
          links: [
            {
              // (TODO) NEED LINK TO NEW BLOG POST
              label: 'Photos',
              href: 'https://www.spacecoastchessfoundation.org/post/2023-fall-fracas-monthly-spacecoast-chess-memorable-snaps'
            },
            {
              label: 'USCF Ratings Report',
              href: 'https://www.uschess.org/msa/XtblMain.php?202309301122'
            }
          ],
          details: [
            'Non-Scholastic Winners: 1st place - Peter Dyson, 2nd place/U1600 - Dr Tadros Guirguiss, 2nd place/U1600 tied - Daniel Tal, U1200 - Davey Ward',
            'Scholastic K-12 Winners: 1st place - Nicholas Tadros, 2nd place - Braden E Blackwell, 3rd place - Maleyna K Ward',
            'Scholastic K-5 Winners: 1st place - Maheem Modi, 2nd place - Leo Zhao, 3rd place - Sofiya Tal, 3rd place tied - Sophie Gittsovich',
            'Scholastic Top School: Holy Trinity'
          ]
        }
      ]
    }
  ];
}