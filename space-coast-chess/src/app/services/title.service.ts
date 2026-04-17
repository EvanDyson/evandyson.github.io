import { inject, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
export class TitleService {
  private title = inject(Title);

  setTitle(page?: string) {
    const isDev = import.meta.env.DEV;

    const baseTitle = isDev
      ? 'Space Coast Chess'
      : 'Space Coast Chess Foundation';

    const prefix = isDev ? '[DEV] | ' : '';

    const fullTitle = page?.trim()
      ? `${prefix}${page} | ${baseTitle}`
      : `${prefix}${baseTitle}`;

    this.title.setTitle(fullTitle);
  }
}