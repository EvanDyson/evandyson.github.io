import { Component } from '@angular/core';

@Component({
  standalone: true,
  template: `
    <section class="camp-card">
      <h1 class="fraunces">2026 Kids Summer Chess Camp</h1>
      <p class="intro">
        Offering full day and half day options.
      </p>
      <p class="dates">
        <strong>Dates:</strong> June 22–26
      </p>
      <a
        class="register-link"
        href="https://martialmethods.sites.zenplanner.com/registration.cfm?payment=MEMBERSHIP&MembershipTemplateId=295CD97E-C1C4-4562-96B5-9F17BAC42397"
        target="_blank"
        rel="noopener noreferrer"
      >
        Full Day Option: Click Here
      </a>
      <a
        class="register-link"
        href="https://martialmethods.sites.zenplanner.com/registration.cfm?payment=MEMBERSHIP&MembershipTemplateId=2B091FA2-E6FB-4726-A14C-FF56F60DD0AD"
        target="_blank"
        rel="noopener noreferrer"
      >
        Half Day Option: Click Here
      </a>
      <img src="/images/summer-camp/2026-camp-picture.png">
    </section>
  `,
  styles: [`
    .camp-card {
      display: flex;
      flex-direction: column;
      margin-left: auto;
      margin-right: auto;
      align-items: center;
      gap: 1em;
      max-width: 70vw;
      background: #dfdbcf;
      border: 1px solid #d3cec0;
      border-radius: 12px;
      padding: 3rem 1.5rem;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);
    }

    h1 {
      margin: 0 0 1rem;
      font-size: 2rem;
      color: #1f1f1f;
    }

    .intro {
      margin: 0 0 1rem;
      font-size: 1rem;
      line-height: 1.6;
      color: #333;
    }

    .dates {
      margin: 0 0 1.5rem;
      font-size: 1rem;
      color: #333;
    }

    .register-link {
      display: inline-block;
      color: #1a1a2e;
      text-decoration: none;
      font-size: 1.05rem;
      font-weight: 600;
      line-height: 1.5;
    }

    .register-link:hover {
      text-decoration: underline;
    }

    @media (max-width: 768px) {
      .camp-page {
        padding: 2rem 1rem;
      }

      .camp-card {
        padding: 1.5rem;
      }

      h1 {
        font-size: 1.75rem;
      }
    }
  `]
})
export default class SummerChessCampPageComponent {}