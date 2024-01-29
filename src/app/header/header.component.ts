import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor() {}

  /**
   * Scrolls to contact area.
   */
  scrollToContact(): void {
    document.getElementById('contactMe')?.scrollIntoView({
      behavior: 'smooth',
    });
  }

    /**
   * Opens the email client with a new email to a specific address.
   */
    sendEmail() {
      window.location.href = 'mailto:hi@sebastianbrosda.de';
    }
}
