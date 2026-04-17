import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { TitleService } from './services/title.service';

@Component({
  selector: 'sccf-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <sccf-header />

    <main>
      <router-outlet />
    </main>

    <sccf-footer />
  `,
  styles: [`
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    :host {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      background-color: #F4F2EC;
      color: black;
    }

    main {
      flex: 1;
    }
  `]
})
export class App {
  constructor(private titleService: TitleService) {
    this.titleService.setTitle();
  }
}