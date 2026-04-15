import { Component } from '@angular/core';

@Component({
  standalone: true,
  template: `
    <div class="contact-card">
      <h1 class="fraunces">Contact Us</h1>
      <p class="intro">
        Please feel free to contact us at email and phone mentioned below,
      </p>
      <a class="contact-link" href="mailto:spacecoastchessfoundation@hotmail.com">
        spacecoastchessfoundation@hotmail.com
      </a>
      <a class="contact-link" href="tel:16168811094">
        616-881-1094
      </a>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .contact-card {
      display: flex;
      flex-direction: column;
      margin-left: auto;
      margin-right: auto;
      align-items: center;
      gap: 1em;
    }

    h1 {
      margin: 0 0 1rem;
      font-size: 2rem;
      color: #1f1f1f;
    }

    .intro {
      font-size: 1rem;
      line-height: 1.6;
      color: #333;
    }

    .contact-link {
      color: #1a1a2e;
      text-decoration: none;
      font-size: 1rem;
      line-height: 1.6;
      font-weight: 600;
      word-break: break-word;
    }

    .contact-link:hover {
      text-decoration: underline;
    }

    @media (max-width: 768px) {
      .contact-page {
        padding: 2rem 1rem;
      }

      .contact-card {
        padding: 1.5rem;
      }

      h1 {
        font-size: 1.75rem;
      }
    }
  `]
})
export default class ContactUsPageComponent {}