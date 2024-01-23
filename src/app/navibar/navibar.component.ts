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

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    this.animateMenuButton(
      this.menuOpen ? 1 : 5,
      this.menuOpen ? 5 : 1,
      this.menuOpen
    );
  }

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
    }, 50); // 100ms für jedes Bild, kann angepasst werden
  }

  scrollToContact(): void {
    document.getElementById('contactMe')?.scrollIntoView({
      behavior: 'smooth',
    });
  }

  openGithub(): void {
    window.open('https://github.com/brosda90', '_blank');
  }
  openLinkedIn(): void {
    window.open(
      'https://www.linkedin.com/in/sebastian-brosda-b827902a8/',
      '_blank'
    );
  }
  sendEmail() {
    window.location.href = 'mailto:s@sebastianbrosda.de';
  }

  scrollToMySkills(): void {
    const mySkillsElement = document.getElementById('mySkills');
    if (mySkillsElement) {
      const navbarHeight = 50; // Ersetzen Sie dies durch die tatsächliche Höhe Ihrer Navbar
      const negativeMargin = 86; // Negative Margin von mySkills
      const offsetPosition =
        mySkillsElement.offsetTop - navbarHeight - negativeMargin;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }
}
