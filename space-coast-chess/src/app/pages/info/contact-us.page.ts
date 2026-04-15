import { Component } from '@angular/core';

@Component({
  standalone: true,
  template: `
    <section class="contact-card">
      <h1 class="fraunces italic less-bold">Contact Us</h1>
      <p class="intro">
        Please feel free to contact us at email and phone mentioned below,
      </p>
      <a class="contact-link" href="mailto:spacecoastchessfoundation@hotmail.com">
        spacecoastchessfoundation@hotmail.com
      </a>
      <a class="contact-link" href="tel:16168811094">
        616-881-1094
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

    h1 {
      margin: 0 0 1em;
      font-size: 2em;
      color: #1f1f1f;
    }

    .intro {
      font-size: 1em;
      line-height: 1.6;
      color: #333;
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
      .contact-page {
        padding: 2em 1em;
      }

      .contact-card {
        padding: 1.5em;
      }

      h1 {
        font-size: 1.75em;
      }
    }
  `]
})
export default class ContactUsPageComponent {}