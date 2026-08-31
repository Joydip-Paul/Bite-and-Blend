import { Component, inject, signal } from '@angular/core';
import { MainLayoutComponent } from "./layouts/main-layout/main-layout.component";
import { SeoService } from './shared/services/seo.service';

@Component({
  selector: 'app-root',
  imports: [ MainLayoutComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('bite-and-blend');

  constructor() {
    inject(SeoService);
  }
}
