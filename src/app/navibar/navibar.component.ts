import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navibar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navibar.component.html',
  styleUrls: ['./navibar.component.scss'],
})
export class NavibarComponent {
  menuOpen = false;
  menuButtonImage = './assets/img/Buttons/menu_btn_animationa_1.png';

  /**
   * Toggles the menu open state and animates the menu button.
   */
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    this.animateMenuButton(
      this.menuOpen ? 1 : 5,
      this.menuOpen ? 5 : 1,
      this.menuOpen
    );
  }

  /**
   * Animates the menu button by changing the image source.
   * @param {number} startFrame - The starting frame of the animation.
   * @param {number} endFrame - The ending frame of the animation.
   * @param {boolean} opening - Whether the menu is opening or not.
   */
  animateMenuButton(startFrame: number, endFrame: number, opening: boolean) {
    let currentFrame = startFrame;
    const frameChange = opening ? 1 : -1;

    const interval = setInterval(() => {
      this.menuButtonImage = `./assets/img/Buttons/menu_btn_animationa_${currentFrame}.png`;

      if (currentFrame === endFrame) {
        clearInterval(interval);
      } else {
        currentFrame += frameChange;
      }
    }, 60);
  }

  /**
   * Scrolls to a specific section smoothly, considering the navbar height and a negative margin.
   * @param {string} elementId - The id of the element to scroll to.
   * @param {number} negativeMargin - The negative margin to consider when scrolling.
   */
  scrollToSection(elementId: string, negativeMargin: number): void {
    this.toggleMenu();
    setTimeout(() => {
      const element = document.getElementById(elementId);
      if (element) {
        const navbarHeight = 50;
        const offsetPosition =
          element.offsetTop - navbarHeight - negativeMargin;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }, 400);
  }

  /**
   * Opens the Github page in a new tab.
   */
  openGithub(): void {
    window.open('https://github.com/brosda90', '_blank');
  }

  /**
   * Opens the LinkedIn page in a new tab.
   */
  openLinkedIn(): void {
    window.open(
      'https://www.linkedin.com/in/sebastian-brosda-b827902a8/',
      '_blank'
    );
  }

  /**
   * Opens the email client with a new email to a specific address.
   */
  sendEmail() {
    window.location.href = 'mailto:hi@sebastianbrosda.de';
  }
}
