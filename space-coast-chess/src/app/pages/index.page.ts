import { Component } from '@angular/core';
import { HomePageComponent } from '../components/home-page/home-page.component';

@Component({
  standalone: true,
  imports: [HomePageComponent],
  template: `<sccf-home-page />`
})
export default class IndexPageComponent {}