import { Component } from '@angular/core';

interface BoardMemberSection {
  name: string;
  title: string;
  biography?: string[];
  image?: string;
  reverse?: boolean;
}

@Component({
  standalone: true,
  imports: [],
  template: `
    <section class="contact-card">
      <div class="header-row">
        <h1 class="fraunces italic less-bold">Board Members</h1>

        <label class="toggle-switch" for="bio-toggle">
          <input
            id="bio-toggle"
            type="checkbox"
            [checked]="showBios"
            (change)="toggleBios()"
          />
          <span>Show Bios</span>
        </label>
      </div>

      <p class="intro top">
        Meet the leadership team of the Space Coast Chess Foundation.
      </p>

      @if (showBios) {
        @for (member of members; track member.name) {
          <hr style="width: 100%; opacity: 0.25;" />
          <section
            class="coach-row"
            [class.reverse]="member.reverse"
          >
            @if (member.image) {
              <div class="coach-media">
                <img [src]="member.image" [alt]="member.name" />
              </div>
            }

            <div class="coach-content">
              <h2 class="fraunces coach-name">{{ member.name }}</h2>
              <p class="label">{{ member.title }}</p>

              @if (member.biography?.length) {
                <div class="info-block">
                  <p class="label">Biography</p>
                  @for (paragraph of member.biography; track paragraph) {
                    <p class="intro">{{ paragraph }}</p>
                  }
                </div>
              }
            </div>
          </section>
        }
      } @else {
        <section class="picture-grid">
          @for (member of members; track member.name) {
            @if (member.image) {
              <div class="member-picture-card">
                <div class="picture-card">
                  <img [src]="member.image" [alt]="member.name" />
                </div>
                <h3 class="fraunces member-name">{{ member.name }}</h3>
              </div>
            }
          }
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

    .header-row {
      width: 100%;
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      align-items: center;
    }

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
      grid-column: 2;
      justify-self: center;
      margin: 0 0 1em;
      font-size: 2em;
      color: #1f1f1f;
    }

    .toggle-switch {
      grid-column: 3;
      justify-self: end;
    }

    .member-picture-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      gap: 0.75em;
      min-width: 0;
    }

    .member-name {
      margin: 0;
      text-align: center;
      font-size: 1.2em;
      line-height: 1.3;
      color: #1f1f1f;
      width: 100%;
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
      text-align: left;
    }

    .coach-media {
      flex: 0 0 25%;
      max-width: 25%;
    }

    .coach-media img {
      display: block;
      width: 100%;
      height: auto;
      border-radius: 12px;
      object-fit: cover;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
      aspect-ratio: 1 / 1;
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
      gap: 0.5em;
    }

    .label {
      margin: 0;
      font-size: 1em;
      font-weight: 700;
      color: #1f1f1f;
    }

    .toggle-switch input {
      width: 1rem;
      height: 1rem;
      cursor: pointer;
    }

    .picture-grid {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 1.75em 1.25em;
      padding-top: 1em;
      align-items: start;
      justify-items: center;
    }

    .picture-card {
      width: 100%;
      aspect-ratio: 1 / 1;
      border-radius: 50%;
      overflow: hidden;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
    }

    .picture-card img {
      display: block;
      width: 100%;
      height: auto;
      aspect-ratio: 1 / 1;
      object-fit: cover;
    }

    @media (max-width: 768px) {
      .header-row {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.75em;
      }

      h1 {
        grid-column: auto;
        justify-self: auto;
        margin: 0;
        text-align: center;
      }

      .toggle-switch {
        grid-column: auto;
        justify-self: auto;
      }
      .contact-card {
        max-width: calc(100vw - 2em);
        padding: 1.5em;
      }

      .coach-row,
      .coach-row.reverse {
        flex-direction: column;
        text-align: left;
      }

      .coach-media {
        flex: none;
        max-width: 100%;
        width: 100%;
      }

      .coach-name {
        font-size: 1.3em;
      }

      .picture-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 1.25em 1em;
      }

      .picture-card {
        max-width: 140px;
      }

      .member-name {
        font-size: 1em;
      }
    }
  `]
})
export default class BoardMembersPageComponent {
  protected showBios = false;

  protected toggleBios(): void {
    this.showBios = !this.showBios;
  }
  protected readonly members: BoardMemberSection[] = [
    {
      name: 'Dr. Peter Koretsky',
      title: 'President',
      image: 'images/board-members/peter-koretsky.png',
      reverse: false,
      biography: [
        'Peter Koretsky lives in Melbourne Beach and has been active in Brevard chess since moving here from Massachusetts 40 years ago.',
        'He was captain of the Brookline High chess team, which won the Massachusetts State Team Championship 3 years in a row and won the National High School Championship.',
        'Dr. Koretsky won the Massachusetts High School State Championship in 1970. He ran the Harvard College Chess Club and tied for 2nd place in the 1973 U.S. Junior Open.',
        'He has taught chess at Gemini Elementary and organizes an annual summer chess camp for Brevard children.',
        'As Board Chairman his special interests are scholastic chess and fundraising.'
      ]
    },
    {
      name: 'Peter Dyson',
      title: 'Vice President, Treasurer',
      image: 'images/board-members/peter-dyson.png',
      reverse: true,
      biography: [
        'Peter Dyson is a co-founder of the Space Coast Chess Foundation and serves as a Board member, Vice President, and Treasurer. He launched the Space Coast Open series of chess festivals in 1991 and, the following year partnered with Dr. Koretsky to establish it as a premier event in Florida.',
        'In the early 1990s, Peter organized scholastic chess tournaments that laid the groundwork for the strong volunteer-led program that exists today. The Space Coast Chess Foundation became a 501(c)(3) nonprofit in 2011, with its board expanding to its current roster.',
        'At the State level, Peter co-organized the Florida State Championship three times and served as the Treasurer of the Florida Chess Association. Nationally, he is a Trustee of both the US Chess Life Membership Asset Trust and the US Chess Endowment Fund Trust.',
        'A US National Master, Peter\'s first passion is competition. He credits his early study of chess, beginning in middle school, with helping him develop the academic discipline that led to his success as a student.',
        'Outside of chess, Peter is co-founder and Chairman of Modus Operandi and enjoys sailing and spending time with his wife and extended family.'
      ]
    },
    {
      name: 'SureshKumar Rajamani',
      title: 'Vice President',
      image: 'images/board-members/sureshKumar-rajamani.png',
      reverse: false,
      biography: [
        'Sureshkumar Rajamani serves as a Board Member and Vice President of the Space Coast Chess Foundation. He is the lead organizer and assistant tournament director for the foundation\'s monthly tournament series.',
        'A dedicated chess player since 1990, Suresh reached the US Chess Federation\'s 1st Category milestone in 2024.',
        'He is especially committed to coaching and supporting scholastic chess. He is the Founder and Chairman of RSK Chess Academy LLC and he runs the Viera Chess Club at Publix (Addison Center, Viera), helping grow the next generation of players.',
        'Outside the chess world, Suresh is the President & CEO of YAETRAM LLC and a Senior Principal Engineer at Collins Aerospace.'
      ]
    },
    {
      name: 'Alex Dshalalow',
      title: 'Vice President, Secretary',
      image: 'images/board-members/alex-dshalalow.png',
      reverse: true
    },
    {
      name: 'Andrew Rea',
      title: 'Vice President',
      image: 'images/board-members/andrew-rea.png',
      reverse: false
    },
    
    {
      name: 'Sean Malone',
      title: 'Vice President',
      image: 'images/board-members/sean-malone.png',
      reverse: true
    },
    {
      name: 'Ori Tal',
      title: 'Vice President',
      image: 'images/board-members/generic.png',
      reverse: false
    },
    {
      name: 'Scott Langford',
      title: 'Director Emertus',
      image: 'images/board-members/generic.png',
      reverse: true
    }
  ];
}
