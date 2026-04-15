import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="contact-card">
      <div class="hero">
        <img src="/images/about-us/about-us.png" alt="About Us" />
        <div class="title-overlay">
          <h1 class="fraunces italic less-bold title">About Us</h1>
        </div>
      </div>

      <p class="intro">
        The Space Coast Chess Foundation, Inc., a 501(c)(3) educational
        organization, is one of the premier chess organizations in Florida.
        Our mission is to promote the educational, scientific, cultural and
        sporting value of the game chess among people of all ages, with a
        focus on the East Central Coast of Florida (the “Space Coast”).
      </p>

      <p class="intro">
        The Foundation supports scholastic and community chess programs,
        provides free chess equipment, and organizes and sponsors chess
        events with the goal of fostering the development of chess and
        realizing its benefits in life-long learning.
      </p>

      <p class="intro">
        We are best known for organizing and sponsoring the Space Coast Open
        Chess Festival, which has been held almost every year since 1991.
        We also started the local Scholastics Chess program, which currently
        hosts monthly chess tournaments.
      </p>

      <a class="contact-link" routerLink="/event/upcoming-events">
        See the events page for more details on these monthly tournaments.
      </a>
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
      color: black;
      padding: 0.5em 1em;
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.18);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.18);
      text-align: center;
    }

    .intro {
      font-size: 1em;
      line-height: 1.6;
      color: #333;
      width: 100%;
    }

    .contact-link {
      color: #1a1a2e;
      text-decoration: none;
      font-size: 1em;
      line-height: 1.6;
      font-weight: 600;
      word-break: break-word;
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
        padding: 0.45em 0.8em;
      }
    }
  `]
})
export default class AboutUsPageComponent {}