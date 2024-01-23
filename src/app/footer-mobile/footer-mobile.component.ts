import { Component } from '@angular/core';

@Component({
  selector: 'app-footer-mobile',
  standalone: true,
  imports: [],
  templateUrl: './footer-mobile.component.html',
  styleUrl: './footer-mobile.component.scss',
})
export class FooterMobileComponent {
  scrollToTop(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
