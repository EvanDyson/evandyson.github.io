import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [],
  template: `
    <section class="contact-card">
      <h1 class="fraunces italic less-bold">Space Coast Chess Foundation (SCCF) Rules</h1>
      <p class="intro">Last revised on 12/22/23</p>
      <p class="intro">
        By registering for, participating in, or otherwise attending an event
        organized by the Space Coast Chess Foundation, Inc. (SCCF), you agree to
        the rules, policies, and terms set forth below. The terms “you” and
        “your” as used herein means the player and/or the player's parent or
        guardian for players under age 18.
      </p>
      <p class="intro">
        The following rules, policies, and terms apply to all Space Coast Chess
        Foundation events:
      </p>
      <ol class="rules-list">
        @for (rule of generalRules; track rule) {
          <li [innerHTML]="rule"></li>
        }
      </ol>
      <p class="intro">
        The following additional rules, policies, and terms apply to Space Coast
        Chess Open (SCO) and to the 2026 Harvey Lerman Florida State Championship:
      </p>
      <ol class="rules-list">
        @for (rule of additionalRules; track rule) {
          <li [innerHTML]="rule"></li>
        }
      </ol>
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
      text-align: center;
    }

    p {
      margin-bottom: 0;
    }

    .intro {
      font-size: 1em;
      line-height: 1.6;
      color: #333;
      width: 100%;
    }

    .rules-list {
      width: 100%;
      color: #333;
      font-size: 1em;
      line-height: 1.6;
      padding-left: 1.5em;
      display: flex;
      flex-direction: column;
      gap: 0.75em;
    }

    .rules-list li {
      padding-left: 0.25em;
    }

    @media (max-width: 768px) {
      .contact-card {
        max-width: calc(100% - 2em);
        padding: 1.5em;
      }

      h1 {
        font-size: 1.75em;
      }
    }
  `]
})
export default class EventRulesPageComponent {
  generalRules: string[] = [
    `1. Leave the tournament hall as soon as your game ends.`,

    `2. Post your game result on the pairing sheet (for events with a table for result reporting, report 
    your result at the results table). Do not write on the standings wall chart.`,

    `3. NO ANALYSIS IN THE TOURNAMENT ROOM, PLEASE. If you wish to analyze, talk, whisper, play blitz, etc., you may go to skittles room.`,

    `4. The foyer near the entrance to the playing hall is a “quiet area”. Please avoid conversations 
    in this area as sound will carry into the playing hall and disturb players with games in progress.`,

    `5. Start clock promptly when round begins.`,

    `6. All scoresheets should be signed by both players indicating the result. In the event of a dispute 
    over the outcome you may need to show a scoresheet signed by your opponent, accepting the result.`,

    `7. In case of a problem, stop the clock and see TD. If the TD feels clocks were stopped without good reason, a penalty is possible.`,

    `8. You may be required to show your social security ID and picture ID, and to complete IRS Form 
    W-9 to receive a prize. Non-resident foreign players must have 30% of any prize withheld for remittance 
    to the IRS. Prizes will be paid only to the player winning the prize regardless of age or nationality.`,

    `9. FAIR PLAY. During play, you may not possess cellphones, smart watches, or other devices capable of 
    chess analysis or communication during play. Such devices may, if shut off, be stored in a bag near your 
    table. For detailed rules and penalties concerning electronic devices, the SCCF applies the Continental Chess 
    Association's Electronic Device Rules. See <a href="http://www.chesstour.com/devices.htm" target="_blank" class="bold">CLICK HERE</a>. 
    Rule 15. Exceptions is replaced by the following: “To request an exception, contact the TD or point of contact listed in 
    the SCCF event announcement at least two weeks before the tournament and attach supporting documentation. 
    Do not contact the Continental Chess Association.”`,

    `10. PHOTO, VIDEO AND AUDIO RELEASE. By participating in any SCCF event you grant permission to the Space Coast 
    Chess Foundation, Inc. to use photographs, video and/or audio recordings of you that are taken in connection with the 
    tournament in publications, news releases, online content, social media, and in other communications related in any way 
    to the mission of the Space Coast Chess Foundation, Inc.`,

    `11. EMAIL POLICY: By registering for this event and providing your email address you grant permission to the Space 
    Coast Chess Foundation, Inc. to use the provided email address to communicate with you regarding the event or future SCCF 
    activities. SCCF does not sell our email list. You may opt out of our email list by following the instructions included with each email.`,

    `12. LIABILITY DISCLAIMER: By participating in any SCCF event you acknowledge you are aware of the nature of the activity, 
    that there are inherent risks in any such activity, and you accept the risks of said activity and release the Space Coast 
    Chess Foundation, Inc., its officers, directors, and staff, and the owners/managers of the event venue from any and all claims for personal injuries and/or financial loss.`
  ];

  additionalRules: string[] = [
    `1. FIDE regulations apply to FIDE-rated sections, however USCF ratings will be used for pairings and prize eligibility. USCF regulations apply in all other sections.`,
    
    `2. Bring your own regulation chess set, clock, and board. The SCCF does not provide equipment at the SCO.`,
    
    `3. Players in FIDE rated sections must use the provided carbonless copy scoresheets provided by 
    the TD and must sign both players' original white scoresheet at the end of the game. Both players' 
    white scoresheets must be turned in to the TD prior to departing the tournament hall. FIDE regulations 
    stipulate that the original scoresheets are the property of the SCCF. Players may retain the yellow copy.`,
    
    `4. Players in non-FIDE rated sections should bring their own scorebook, however single copy scoresheets may be available from the TD.`,
    
    `5. In order to comply with the SCCF's contract with the host Hotel, no food or outside beverages 
    (except water) are allowed in the playing hall or any of the other meeting rooms used for the chess 
    tournament and side activities. For water or other beverages provided by the organizer, please remove 
    your drink cups when your game ends so the playing hall remains tidy for the next round.`
  ];
}