import { Component } from '@angular/core';

@Component({
  selector: 'sccf-footer',
  standalone: true,
  template: `
    <footer class="footer">
      <p class="title fraunces italic">Space Coast Chess Foundation</p>
      <p>
        <a href="mailto:spacecoastchessfoundation@hotmail.com">
          spacecoastchessfoundation@hotmail.com
        </a>
      </p>
      <p>©2026 by Space Coast Chess Foundation.</p>
    </footer>
  `,
  styles: [`
    .footer {
      text-align: center;
      padding-top: 2em;
      background-color: #F4F2EC;
      color: black;
      font-family: "Times New Roman", Times, serif;

      & .title {
        font-size: x-large;
      }
    }
    
    .footer a {
      color: inherit;
      text-decoration: none;
    }
    .footer a:hover {
      text-decoration: underline;
    }
  `]
})
export class FooterComponent {}