import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface LinkItem {
  label: string;
  href: string;
}

interface InfoSection {
  title: string;
  items?: string[];
  paragraphs?: string[];
  links?: LinkItem[];
}

@Component({
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="contact-card">
      <img
        class="hero-image"
        src="https://static.wixstatic.com/media/b6ed22_ef20ec5a4ee34002a33a6ff6fe6903cb~mv2.jpg/v1/fill/w_536,h_402,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/b6ed22_ef20ec5a4ee34002a33a6ff6fe6903cb~mv2.jpg"
        alt="Space Coast Open playing hall"
      />

      <h1 class="fraunces italic less-bold">31st Space Coast Open Chess Festival</h1>

      <p class="headline bold">$20,000 prize fund fully guaranteed!</p>
      <p class="subheadline">An event created by chess players for chess players!</p>

      <p class="intro"><strong>This page was last updated April 7, 2026.</strong></p>
      <p class="intro">Welcome to Online Registration for the 31st Space Coast Open!</p>
      <p class="intro">
        You can register here and pay using a Credit Card via the ChessRegister
        website links below.
      </p>
      <p class="intro">Scroll down to bottom of page for link to the online entry.</p>

      <p class="intro">
        <a
          class="bold underline"
          href="https://www.spacecoastchessfoundation.org/_files/ugd/c567ef_dffac24058c441609a254474f4f88639.pdf"
          target="_blank"
          rel="noreferrer"
        >
          Click here for a downloadable flyer
        </a>
      </p>

      <section class="section-block">
        <p class="intro"><strong>Dates:</strong> April 24-26, 2026 or April 25-26, 2026</p>
        <p class="intro">
          See our list of Past Space Coast Open Champions
          <a
            class="bold underline"
            href="https://www.spacecoastchessfoundation.org/event/spacecoastopenchampions"
            target="_blank"
            rel="noreferrer"
          >
            here
          </a>
        </p>
        <p class="intro"><strong>A US Chess Heritage Event!</strong></p>
        <p class="intro">US Chess Grand Prix Points: 120 (Enhanced)</p>
        <p class="intro">
          Master/Expert and Under 2000 Sections FIDE Rated
          (USCF ratings used for pairings and prizes)
        </p>
        <p class="intro">
          5 Round Swiss System, G/90+30 second increment for all sections except
          U1200, which is G/90 d5 (2-day rounds 1-2 for all sections G/60 d5).
        </p>
        <p class="intro">
          Spacious, first-class playing facility! 1 mile from Melbourne
          International Airport. 10 minutes from the beach!
        </p>
        <p class="intro">
          <a
            class="bold underline"
            href="https://www.hilton.com/en/hotels/mlbrhhf-hilton-melbourne-rialto-place/"
            target="_blank"
            rel="noreferrer"
          >
            Hilton Melbourne at Rialto Place
          </a>,
          200 Rialto Place, Melbourne, FL 32901. Hotel room booking link below.
          Free parking. No resort fees!
        </p>
      </section>

      <section class="section-block">
        <h2 class="section-title bold">$20,000 Guaranteed Prize Fund</h2>

        <h3 class="subsection-title bold">5 Sections:</h3>

        <p class="intro">
          Unrated players may play in any section except Master/Expert but may
          not win over $300 prize or trophy.
        </p>

        <img
          class="content-image"
          src="https://static.wixstatic.com/media/b6ed22_f836ee90b0b34247a18ec729b27fe5f3~mv2.png/v1/fill/w_957,h_413,al_c,lg_1,q_90,enc_avif,quality_auto/31st%20sco%20sections_PNG.png"
          alt="Space Coast Open sections and prizes"
        />
      </section>

      <section class="section-block">
        <h2 class="section-title bold">Special Prizes</h2>
        <ul class="event-list">
          <li>Top Upsets: Rds 1-4: Book Prize. Limit one per player.</li>
          <li>
            Wojtkiewicz Brilliancy Prizes: 1st $200, 2nd $100, 3rd $50
            (Judge: IM Javad Maharramzade)
          </li>
          <li>
            Book Prizes to oldest player, youngest player, player who has
            traveled the longest distance.
          </li>
        </ul>
      </section>

      <section class="section-block">
        <h2 class="section-title bold">All, Fine Print</h2>
        <ul class="event-list">
          <li>
            IMPORTANT: By registering for, participating in, or otherwise
            attending an event organized by the Space Coast Chess Foundation,
            Inc. (SCCF) you agree to the rules, policies, and terms set forth on
            our web site:
            <a
              class="bold underline"
              href="/events/event-rules"
              routerLink="/events/event-rules"
            >
              Event Rules & Policies
            </a>
          </li>
          <li>
            Chess set and boards not provided but a chess vendor will be onsite.
          </li>
          <li>
            Players in Master/Expert and Under 2000 sections are required per
            FIDE regulations to turn in white copies of completed scoresheets at
            completion of each round.
          </li>
          <li>
            Rated players may play in eligible sections as shown in above
            section prize details. Unrated may play in any section except
            Master/Expert but may not win over $300 prize or trophy. Unrated not
            eligible for U1000 or U800 prizes.
          </li>
          <li>
            ½-point Bye available any round if requested in advance and before
            round 2 (limit 2).
          </li>
          <li>
            No Smoking. No computers. No electronic devices during play.
            Wheelchair accessible.
          </li>
          <li>
            No food or outside beverages are allowed in the playing hall or any
            of the other meeting rooms used for the chess tournament and side
            activities.
          </li>
        </ul>
      </section>

      <section class="section-block">
        <h2 class="section-title bold">Entry Fee</h2>
        <ul class="event-list">
          <li>
            Regular Entry Fee: $124 early bird by 3/22, $144 by 4/17, $154
            later, $160 on-site.
          </li>
        </ul>

        <h3 class="subsection-title bold">Special Discounted Entry Fees</h3>
        <ul class="event-list">
          <li>GM/IM free entry available until 3/31, else $144 from prize.</li>
          <li>
            $20 discount if unrated or under age 18. Use Discount Code:
            UNR-UND18 (Discount will be shown at checkout). IMPORTANT: Youth
            players in U1200 section who wish to compete for the scholastic
            player trophies must enter their School Grade in the field at the
            bottom of the registration page.
          </li>
          <li>
            Special EF for Brevard County students in K-12 playing in any
            section: $29 by 3/22, $49 by 4/17, $59 later, $65 on-site. Use
            Discount Code: BREVARD (Discount will be shown at checkout).
            IMPORTANT: Players using this discount code are required to select
            or enter the name of their school and their grade in the fields
            provided at the bottom of the registration page (if playing in Under
            1200 section), or if playing in any other section, must email their
            school name and grade to the TD
            <a class="bold underline" href="mailto:jon@bocachess.com">
              jon@bocachess.com
            </a>.
          </li>
          <li>
            Free entry to past Master Section winners listed
            <a
              class="bold underline"
              href="https://www.spacecoastchessfoundation.org/event/spacecoastopenchampions"
              target="_blank"
              rel="noreferrer"
            >
              here
            </a>.
          </li>
          <li>
            GM/IMs and past Champions e-mail your name, playing schedule & Byes
            requested to
            <a class="bold underline" href="mailto:jon@bocachess.com">
              jon@bocachess.com
            </a>
          </li>
          <li>Re-entries $70 by round 3 (½ point byes for earlier rounds).</li>
          <li>No phone, US Mail or email entries.</li>
          <li>$10 service charge for refunds.</li>
          <li>
            On-site registration ends ½ hour before 1st round (ends 6:30 p.m.
            Friday or 10:00 a.m. Saturday; ½ point Bye available for later
            entries).
          </li>
        </ul>
      </section>

      <section class="section-block">
        <h2 class="section-title bold">Tournament Schedule</h2>

        <h3 class="subsection-title bold">All Sections except U1200</h3>
        <div class="schedule-block">
          <p class="label">3-DAY SCHEDULE (G/90+30 second increment)</p>
          <ul class="simple-list">
            <li>Friday: 7:00pm</li>
            <li>Saturday: 10:30am - 4:30pm</li>
            <li>Sunday: 10:30am - 3:30pm</li>
          </ul>
        </div>

        <div class="schedule-block">
          <p class="label">
            2-DAY SCHEDULE (G/90+30 second increment except rounds 1 & 2: G/60 d5)
          </p>
          <p class="intro">(merges with 3-day after round 2)</p>
          <ul class="simple-list">
            <li>Saturday: 10:30am - 1:30pm - 4:30pm</li>
            <li>Sunday: 10:30am - 3:30pm</li>
          </ul>
        </div>

        <h3 class="subsection-title bold">U1200 Section</h3>
        <div class="schedule-block">
          <p class="label">3-DAY SCHEDULE (G/90+5 second delay)</p>
          <ul class="simple-list">
            <li>Friday: 7:00pm</li>
            <li>Saturday: 10:30am - 2:45pm</li>
            <li>Sunday: 10:30am - 2:45pm</li>
          </ul>
        </div>

        <div class="schedule-block">
          <p class="label">
            2-DAY SCHEDULE (G/90+5 second delay except rounds 1 & 2: G/60 d5)
          </p>
          <p class="intro">(merges with 3-day after round 3)</p>
          <ul class="simple-list">
            <li>Saturday: 10:30am - 1:30pm - 4:30pm</li>
            <li>Sunday: 10:30am - 2:45pm</li>
          </ul>
        </div>

        <p class="intro">
          All Sections: Players may pause clocks during pre-round announcements
          for later-starting sections.
        </p>
      </section>

      <section class="section-block">
        <h2 class="section-title bold">Space Coast Open Saturday Night Blitz</h2>
        <ul class="event-list">
          <li>Time: 9:15pm</li>
          <li>Format: 6 Round Swiss System</li>
          <li>Time Control: G/3 d2</li>
          <li>Cash prizes based on entries.</li>
          <li>Online EF $20, $30 if not playing in main tournament.</li>
          <li>
            Blitz online entry is available until noon Saturday, otherwise $5
            more.
          </li>
          <li>
            The Blitz has a separate registration link – scroll to bottom of
            this page.
          </li>
        </ul>
      </section>

      <section class="section-block">
        <h2 class="section-title bold">Additional Events</h2>
        <ul class="event-list">
          <li>
            Worldwide Broadcast: the top 6 boards will be broadcast on lichess
            with live commentary (details to be announced)
          </li>
          <li>Free Master and GM lectures:</li>
          <li>Saturday: 9:15am: GM Jianchao Zhou - Topic: Sicilian Najdorf + Endgame lessons</li>
          <li>Sunday: 9:15am: GM Samy Shoker - Topic: Sacrifices in Fianchetto Positions</li>
          <li>Books and Equipment by Orlando Chess & Games: Friday – Sunday</li>
        </ul>

        <img
          class="divider-image"
          src="https://static.wixstatic.com/media/b6ed22_7b7a93801ff04adcb9df8fa9d093f4a7~mv2.png/v1/fill/w_598,h_580,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/b6ed22_7b7a93801ff04adcb9df8fa9d093f4a7~mv2.png"
          alt="Decorative chess graphic"
        />
      </section>

      <section class="section-block">
        <h2 class="section-title bold">Chess on the Beach T-shirts</h2>
        <p class="intro">
          Our copyrighted Chess on the Beach T-shirt is available for advance
          online purchase at the link below.
        </p>
        <p class="intro">
          Orlando Chess & Games will offer a similar T-shirt at the site!
        </p>

        <div class="shirt-grid">
          <img
            class="shirt-image"
            src="https://static.wixstatic.com/media/b6ed22_e68faf0918654242b4cddbaec05eaa8c~mv2.png/v1/fill/w_199,h_284,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/chess_on_the_beach_30th_sco_dark_t_shirt-removebg-preview.png"
            alt="Dark Chess on the Beach shirt"
          />
          <img
            class="shirt-image"
            src="https://static.wixstatic.com/media/b6ed22_f7bc503ad82346538808d2617278d021~mv2.png/v1/fill/w_190,h_284,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/chess_on_the_beach_30th_sco_light_t_shirt-removebg-preview.png"
            alt="Light Chess on the Beach shirt"
          />
        </div>

        <ul class="event-list">
          <li>Lots of colors are available, both men’s and women’s styles.</li>
          <li>
            Two Design Themes are available: white text (best for dark shirts)
            and dark text (best for light-colored shirts).
          </li>
          <li>
            Shop here:
            <a
              class="bold underline"
              href="https://www.zazzle.com/store/IRTCustomFabrics?rf=238539699927486672"
              target="_blank"
              rel="noreferrer"
            >
              Zazzle Store
            </a>
          </li>
        </ul>
      </section>

      <section class="section-block">
        <h2 class="section-title bold">Hotel Reservations</h2>
        <ul class="event-list">
          <li>
            Hilton Hotel Rate: $164 King or 2 Queen beds, $194 Junior Suite
            (King or 2 Queen beds). No resort fee. Free parking.
          </li>
          <li>
            By phone call 800-HILTONS (445-8667), reference “Space Coast Open
            Chess Festival” or group code 902.
          </li>
          <li>
            Online reservations can be made using our group link:
            <a
              class="bold underline"
              href="https://www.hilton.com/en/attend-my-event/mlbrhhf-space-coast-open-reservations/"
              target="_blank"
              rel="noreferrer"
            >
              Melbourne Hilton at Rialto Space Coast Open Reservations
            </a>.
            From the calendar select your desired dates and the available room
            types, along with our group rate, will display. Our group code, 902,
            will be pre-assigned when using the above link. Group rate is
            available for 3 days before and 3 days after the tournament (subject
            to availability).
          </li>
          <li>
            If the group rate does not show up for earlier or later arrivals
            within the 3-day window, contact the hotel directly. Note: Must
            cancel 3 days prior to arrival to avoid cancellation penalty.
          </li>
          <li>
            Very Important: Reserve early. Group rate available until April 13
            (midnight) or until Group rooms are sold out, whichever comes first.
            The group rate is unlikely to be available after the cut-off date.
            RESERVE EARLY!
          </li>
        </ul>

        <h3 class="subsection-title bold">Overflow Hotels</h3>
        <ul class="event-list">
          <li>
            A limited number of discounted rooms are available at the following
            nearby hotels:
          </li>
          <li>
            Hyatt Place Melbourne Airport, 747 Air Terminal Pkwy, Melbourne, FL
            32901 (1 mile, 3-minute drive): $115 Standard Room. Free breakfast
            for 2. Free parking. Online reservations can be made using our group
            link for Hyatt Place and entering your desired dates:
            <a
              class="bold underline"
              href="https://www.hyatt.com"
              target="_blank"
              rel="noreferrer"
            >
              Click here for the Hyatt Website
            </a>
            or call Hyatt reservation 24/7 at 1 (888) 591-1234 and ask for
            Space Coast Chess Foundation Open Block rate (Group Code: G-CHES).
          </li>
          <li>
            Note: Must cancel 48 hours prior to arrival to avoid cancellation
            penalty.
          </li>
          <li>
            Suburban Studios (directly adjacent, 3-minute walk): King (1-bed)
            $65 single/double. Queen (2-beds) $70 single/double. Both $10 each
            additional occupant. For reservations call hotel at (321) 768-9777.
            Ask for the Space Coast Chess Foundation group number: AI11Q5.
            Note: Must cancel 3 days prior to arrival to avoid cancellation
            penalty.
          </li>
        </ul>
      </section>

      <section class="section-block">
        <h2 class="section-title bold">General Info</h2>
        <p class="intro">
          Jon Haskel 561-302-4377
          (<a class="bold underline" href="mailto:jon@bocachess.com">jon@bocachess.com</a>)
        </p>
        <p class="intro">
          Entries: Enter online or at tournament site. No phone, US Mail or
          email entries.
        </p>
        <p class="intro">
          Payment accepted by Credit Card and PayPal balance via link below.
          Onsite payments accepted in cash or by Credit Card. No checks
          accepted.
        </p>
        <p class="intro">
          Early bird entry ends March 22. Enter early for lowest EF. See Entry
          Fee info above for full details.
        </p>
      </section>

      <section class="section-block">
        <h2 class="section-title bold">Register Now!</h2>

        <div class="register-block">
          <h3 class="subsection-title bold">Space Coast Open Main Event</h3>
          <p class="intro">
            <a
              class="bold underline"
              href="https://www.chessregister.com/register?event_key=XLwbhs8aD2O-Rc3NxO4wJSKcyn3cxCyhjhCdpvANdSU%3D"
              target="_blank"
              rel="noreferrer"
            >
              Click here to register (Main Event)
            </a>
          </p>
          <p class="intro">
            <a
              class="bold underline"
              href="https://www.chessregister.com/registrants?event_key=XLwbhs8aD2O-Rc3NxO4wJSKcyn3cxCyhjhCdpvANdSU%3D"
              target="_blank"
              rel="noreferrer"
            >
              Click here for the list of pre-registered players
            </a>
          </p>
        </div>

        <div class="register-block">
          <h3 class="subsection-title bold">Saturday Night Blitz Tournament</h3>
          <p class="intro">
            <a
              class="bold underline"
              href="https://www.chessregister.com/register?event_key=-Sx7m8d8lEP1AnD-5tFdp5zNqEJ8Wb3n9SX1QETv2eQ%3D"
              target="_blank"
              rel="noreferrer"
            >
              Click here to register (Blitz Tournament)
            </a>
          </p>
          <p class="intro">
            <a
              class="bold underline"
              href="https://www.chessregister.com/registrants?event_key=-Sx7m8d8lEP1AnD-5tFdp5zNqEJ8Wb3n9SX1QETv2eQ%3D"
              target="_blank"
              rel="noreferrer"
            >
              Click here for the list of pre-registered players
            </a>
          </p>
        </div>
      </section>
    </section>
  `,
  styles: [`
    :host {
      display: block;
      background: #F4F2EC;
      color: #1f1f1f;
    }

    .contact-card {
      display: flex;
      flex-direction: column;
      margin-left: auto;
      margin-right: auto;
      align-items: center;
      gap: 1.25em;
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

    .hero-image {
      width: 100%;
      max-width: 640px;
      height: auto;
      border-radius: 12px;
      object-fit: cover;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
    }

    .headline {
      margin: 0;
      font-size: 1.4em;
      text-align: center;
      color: #1f1f1f;
    }

    .subheadline {
      margin: 0;
      font-size: 1.05em;
      text-align: center;
      color: #333;
      font-style: italic;
    }

    .intro {
      width: 100%;
      font-size: 1em;
      line-height: 1.6;
      color: #333;
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

    .subsection-title {
      margin: 0;
      font-size: 1.1em;
      color: #1f1f1f;
    }

    .label {
      margin: 0;
      font-size: 1em;
      font-weight: 700;
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
      gap: 0.65em;
      margin: 0;
    }

    .event-list li,
    .simple-list li {
      padding-left: 0.25em;
    }

    .content-image {
      width: 100%;
      border-radius: 12px;
      object-fit: contain;
      background: white;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
    }

    .divider-image {
      width: min(320px, 100%);
      margin: 0 auto;
      height: auto;
    }

    .schedule-block,
    .register-block {
      display: flex;
      flex-direction: column;
      gap: 0.5em;
      width: 100%;
      padding: 1em;
      border-radius: 10px;
      border: 1px solid #d3cec0;
      background: rgba(255, 255, 255, 0.3);
    }

    .shirt-grid {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 1.25em;
      justify-items: center;
      align-items: start;
    }

    .shirt-image {
      max-width: 220px;
      width: 100%;
      height: auto;
      object-fit: contain;
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

      .headline {
        font-size: 1.25em;
      }

      .section-title {
        font-size: 1.25em;
      }

      .shirt-grid {
        grid-template-columns: 1fr;
      }

      .shirt-image {
        max-width: 180px;
      }
    }
  `]
})
export default class SpaceCoastOpenPageComponent {}