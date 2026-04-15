import { Component } from '@angular/core';

@Component({
  standalone: true,
  template: `
    <section class="results-card">
      <h1 class="fraunces italic less-bold">Tournament Results</h1>
      <p class="intro">
        View tournament results from all previous Space Coast Chess Foundation events.
      </p>
      <a
        class="results-link"
        href="https://ratings.uschess.org/affiliate/A6010312"
        target="_blank"
        rel="noopener noreferrer"
      >
        Click here to view the tournament results from all previous events.
      </a>
    </section>
  `,
  styles: [`
    .results-card {
      display: flex;
      flex-direction: column;
      gap: 1em;
      margin-left: auto;
      margin-right: auto;
      align-items: center;
      padding: 3rem 1.5rem;
      width: 100%;
      max-width: 75vw;
      background: #dfdbcf;
      border: 1px solid #d3cec0;
      border-radius: 12px;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);
    }

    h1 {
      margin: 0 0 1rem;
      font-size: 2rem;
      color: #1f1f1f;
    }

    .intro {
      margin: 0 0 1.5rem;
      font-size: 1rem;
      line-height: 1.6;
      color: #333;
    }

    .results-link {
      display: inline-block;
      color: #1a1a2e;
      text-decoration: none;
      font-size: 1.05rem;
      font-weight: 600;
      line-height: 1.5;
    }

    .results-link:hover {
      text-decoration: underline;
    }

    @media (max-width: 768px) {
      .results-page {
        padding: 2rem 1rem;
      }

      .results-card {
        padding: 1.5rem;
      }

      h1 {
        font-size: 1.75rem;
      }
    }
  `]
})
export default class TournamentResultsPageComponent {}