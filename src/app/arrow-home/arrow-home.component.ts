import { Component } from '@angular/core';

@Component({
  selector: 'app-arrow-home',
  standalone: true,
  imports: [],
  templateUrl: './arrow-home.component.html',
  styleUrl: './arrow-home.component.scss',
})
export class ArrowHomeComponent {
  scrollToTop(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
