import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="contact-card">
      <img
        class="hero-image"
        src="https://static.wixstatic.com/media/b6ed22_ef20ec5a4ee34002a33a6ff6fe6903cb~mv2.jpg/v1/fill/w_536,h_402,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/b6ed22_ef20ec5a4ee34002a33a6ff6fe6903cb~mv2.jpg"
        alt="Florida State Championship playing hall"
      />

      <h1 class="fraunces italic less-bold">2026 Harvey Lerman Florida State Championship</h1>

      <p class="headline bold">$16,000 prize fund fully guaranteed!</p>
      <p class="subheadline">An event created by chess players for chess players!</p>

      <p class="intro"><strong>This page was last updated April 7, 2026.</strong></p>
      <p class="intro">
        Welcome to Online Registration for the 2026 Harvey Lerman Florida State
        Championship!
      </p>
      <p class="intro">
        You can register here and pay using a Credit Card via the ChessRegister
        website links below.
      </p>
      <p class="intro">Scroll down to bottom of page for link to the online entry.</p>

      <p class="intro">
        <a
          class="bold underline"
          href="https://www.spacecoastchessfoundation.org/_files/ugd/c567ef_ddae6b4cbb6b4e7cb8b7a975ce7cb0f6.pdf"
          target="_blank"
          rel="noreferrer"
        >
          Click here for a downloadable flyer (Full color version)
        </a>
      </p>
      <p class="intro">
        <a
          class="bold underline"
          href="https://www.spacecoastchessfoundation.org/_files/ugd/c567ef_f4d3865fe61649a293530f67ffbab4bb.pdf"
          target="_blank"
          rel="noreferrer"
        >
          Click here for a downloadable flyer (Printer friendly version)
        </a>
      </p>

      <section class="section-block">
        <p class="intro"><strong>Dates:</strong> September 5-7, 2026</p>
        <p class="intro"><strong>A US Chess Heritage Event!</strong></p>
        <p class="intro">US Chess Grand Prix Points: 60</p>
        <p class="intro">Top 2 sections FIDE Rated (Open and U2050)</p>
        <p class="intro">
          6 Round Swiss System, G/90+30 second increment for all sections.
        </p>
        <p class="intro">
          Spacious, first-class playing facility! 1 mile from Melbourne
          International Airport. 10 minutes from the beach!
        </p>
        <p class="intro">
          <a
            class="bold underline"
            href="https://www.hilton.com/en/hotels/mlbmhhf-hilton-melbourne-fl/"
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
        <h2 class="section-title bold">$16,000 Guaranteed Prize Fund</h2>
        <img
          class="content-image"
          src="https://static.wixstatic.com/media/c567ef_4e7a76264cf5456b854c5f4c90152465~mv2.png/v1/fill/w_957,h_287,al_c,lg_1,q_85,enc_avif,quality_auto/florida%20prizes_PNG.png"
          alt="Florida State Championship sections and prizes"
        />
      </section>

      <section class="section-block">
        <h2 class="section-title bold">All, Fine Print</h2>
        <ul class="event-list">
          <li>USCF & FCA memberships required for all events.</li>
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
            Players in Master/Expert and Under 2050 sections are required per
            FIDE regulations to turn in white copies of completed scoresheets at
            completion of each round.
          </li>
          <li>
            Unrated may not win over $100 or trophy except for Open section top
            4 prizes.
          </li>
          <li>
            Cash prizes for 1st-3rd brilliancy & book prizes for biggest upset
            rounds.
          </li>
          <li>
            1/2-point Bye available any round if requested in advance and before
            round 3 (limit 2).
          </li>
          <li>
            Out of state players welcome. Only Florida players eligible for
            trophies and titles.
          </li>
          <li>
            No Smoking. No computers. No cell phones or electronic devices
            during play. Wheelchair accessible.
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
        <h3 class="subsection-title bold">Regular Entry Fee</h3>
        <ul class="event-list">
          <li>Super-saver by 07/15: $99</li>
          <li>Early-bird by 07/31: $109</li>
          <li>08/01 to 08/20: $115</li>
          <li>08/21 to 08/31: $135</li>
          <li>09/01 to 09/04 (9PM deadline): $158</li>
          <li>On-site registration by 9AM: $160</li>
        </ul>

        <h3 class="subsection-title bold">Special Discounted Entry Fees</h3>
        <ul class="event-list">
          <li>
            Grandmasters have free entry available by request to Andrew Rea
            until 7/31, else $135 from prize.
          </li>
          <li>$10 service charge for refunds.</li>
          <li>On-site registration ends 1 hour before 1st round.</li>
          <li>Online registration ends 9pm Friday.</li>
          <li>
            Late entry registration permitted on-site with up to two 1/2 point
            BYEs for missed games.
          </li>
          <li>No phone, US Mail, or email entries.</li>
        </ul>
      </section>

      <section class="section-block">
        <h2 class="section-title bold">Florida Chess Association Membership</h2>
        <p class="intro">
          FCA membership is required for Florida players. Existing members can
          check their expiration date at the
          <a
            class="bold underline"
            href="https://floridachess.org/"
            target="_blank"
            rel="noreferrer"
          >
            FCA website
          </a>.
          To find your expiration date, log in and then click on your name at
          the top of the page. This will display a membership card with your
          expiration date. If you need to join or renew, you can do so at the
          <a
            class="bold underline"
            href="https://floridachess.org/join-us"
            target="_blank"
            rel="noreferrer"
          >
            FCA join/renew page
          </a>.
        </p>
      </section>

      <section class="section-block">
        <h2 class="section-title bold">Tournament Schedule</h2>
        <div class="schedule-block">
          <ul class="simple-list">
            <li>Saturday: Round 1 at 10am; Round 2 at 3:30pm</li>
            <li>Sunday: Round 3 at 10am; Round 4 at 3:30pm</li>
            <li>Monday: Round 5 at 10am; Round 6 at 3:30pm</li>
          </ul>
        </div>
      </section>

      <section class="section-block">
        <h2 class="section-title bold">Florida State Blitz Championship</h2>
        <ul class="event-list">
          <li>Time: Saturday 9/5 at 8:30pm</li>
          <li>Format: 6 Round Swiss System</li>
          <li>Time Control: G/3 d2</li>
          <li>
            Online entry is $25 available until 2pm Saturday, otherwise $5 more.
          </li>
          <li>On-Site entry for first round closes at 8pm Saturday.</li>
          <li>
            Later entries receive 1/2 BYE for missed rounds (limit of two 1/2
            BYES), additional missed rounds count as zero points.
          </li>
          <li>
            This has a separate registration link - scroll to bottom of this
            page.
          </li>
          <li>Cash prizes based on entries. 70% of entry fees paid out as prizes.</li>
        </ul>
      </section>

      <section class="section-block">
        <h2 class="section-title bold">Florida State Quick Championship</h2>
        <ul class="event-list">
          <li>Time: Sunday 9/6 at 8:30pm</li>
          <li>Format: 5 Round Swiss System</li>
          <li>Time Control: G/10 d3</li>
          <li>
            Online entry is $25 available until 2pm Sunday, otherwise $5 more.
          </li>
          <li>On-Site entry for first round closes at 8pm Sunday.</li>
          <li>
            Later entries receive 1/2 BYE for missed rounds (limit of two 1/2
            BYES), additional missed rounds count as zero points.
          </li>
          <li>
            This has a separate registration link - scroll to bottom of this
            page.
          </li>
          <li>Cash prizes based on entries. 70% of entry fees paid out as prizes.</li>
        </ul>
      </section>

      <section class="section-block">
        <h2 class="section-title bold">Florida Chess Association Meetings</h2>
        <ul class="event-list">
          <li>Sunday: Board meeting at 8:30am</li>
          <li>Sunday: Annual membership meeting at 9:15am</li>
        </ul>
      </section>

      <section class="section-block">
        <h2 class="section-title bold">Hotel Reservations</h2>
        <ul class="event-list">
          <li>
            Hilton Hotel at Rialto Place, 200 Rialto Place, Melbourne, FL,
            32901: $119 per night for single/double room, $149 for suite;
            includes breakfast for 2 & free parking.
          </li>
          <li>
            By phone call 800-HILTONS (445-8667), reference "Labor Day State
            Championship" or group code 91G.
          </li>
          <li>
            Online reservations can be made using our group link:
            <a
              class="bold underline"
              href="https://www.hilton.com/en/attend-my-event/mlbmhhf-91g-f0b7787a-bb9d-4ded-9d6e-f0bd1aedd762/"
              target="_blank"
              rel="noreferrer"
            >
              Melbourne Hilton at Rialto State Championship Reservations
            </a>.
            From the calendar select your desired dates and the available room
            types, along with our group rate, will display. Our group code, 91G,
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
            Very Important: Reserve early. Group rate available until August 21
            (5pm) or until Group rooms are sold out, whichever comes first. The
            group rate is unlikely to be available after the cut-off date.
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
            Hyatt Place Melbourne Airport (3 minute drive from venue), 747 Air
            Terminal Pkwy, Melbourne, FL 32901 (1 mile, 3-minute drive): $109
            per night for standard room. Includes breakfast & free parking.
          </li>
          <li>
            Suburban Studios (directly adjacent, 3-minute walk), 1125 Dr. Martin
            Luther King Jr. Blvd, Melbourne, FL 32901: $65 per night for 1 king
            bed; $70 for 2 queen beds (both prices include 2 guests, +$10 for
            each added guest).
          </li>
        </ul>
      </section>

      <section class="section-block">
        <h2 class="section-title bold">General Info</h2>
        <p class="intro">
          Andrew Rea
          (<a class="bold underline" href="mailto:andrerea2@yahoo.com">andrerea2@yahoo.com</a>
          or 412-418-1591)
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
          Early bird entry ends July 31. Enter early for lowest EF. See Entry
          Fee info above for full details.
        </p>
      </section>

      <section class="section-block">
        <h2 class="section-title bold">Register Now!</h2>

        <div class="register-block">
          <h3 class="subsection-title bold">Florida State Championship Main Event</h3>
          <p class="intro">
            <a
              class="bold underline"
              href="https://www.chessregister.com/register?event_key=-8HRXI2Vs4TjsCshkBENV81V04Ucuw73-2nkGVypuPY%3D"
              target="_blank"
              rel="noreferrer"
            >
              Click here to register (Main Event)
            </a>
          </p>
          <p class="intro">
            <a
              class="bold underline"
              href="https://www.chessregister.com/registrants?event_key=-8HRXI2Vs4TjsCshkBENV81V04Ucuw73-2nkGVypuPY%3D"
              target="_blank"
              rel="noreferrer"
            >
              Click here for the list of pre-registered players
            </a>
          </p>
        </div>

        <div class="register-block">
          <h3 class="subsection-title bold">Blitz Tournament</h3>
          <p class="intro">
            <a
              class="bold underline"
              href="https://www.chessregister.com/register?event_key=vjmSvmkFfPevvMQtBCKvfM1V04Ucuw73-2nkGVypuPY%3D"
              target="_blank"
              rel="noreferrer"
            >
              Click here to register (Blitz Tournament)
            </a>
          </p>
          <p class="intro">
            <a
              class="bold underline"
              href="https://www.chessregister.com/registrants?event_key=vjmSvmkFfPevvMQtBCKvfM1V04Ucuw73-2nkGVypuPY%3D"
              target="_blank"
              rel="noreferrer"
            >
              Click here for the list of pre-registered players
            </a>
          </p>
        </div>

        <div class="register-block">
          <h3 class="subsection-title bold">Quick Tournament</h3>
          <p class="intro">
            <a
              class="bold underline"
              href="https://www.chessregister.com/register?event_key=5pRSiRPxRJTCB8oafciE9s1V04Ucuw73-2nkGVypuPY%3D"
              target="_blank"
              rel="noreferrer"
            >
              Click here to register (Quick Tournament)
            </a>
          </p>
          <p class="intro">
            <a
              class="bold underline"
              href="https://www.chessregister.com/registrants?event_key=5pRSiRPxRJTCB8oafciE9s1V04Ucuw73-2nkGVypuPY%3D"
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
    }
  `]
})
export default class FloridaStateChampionshipPageComponent {}
