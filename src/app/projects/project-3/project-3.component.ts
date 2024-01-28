import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { BaseProjectComponent } from '../base-project/base-project.component';

@Component({
  selector: 'app-project-3',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-3.component.html',
  styleUrls: [
    './project-3.component.scss',
    '../base-project/base-project.component.scss',
  ],
})
export class Project3Component extends BaseProjectComponent {
  /**
   * Open the live test page in a new tab.
   */
  openLiveTest(): void {
    window.open('https://ring-of-fire.sebastianbrosda.de', '_blank');
  }

  /**
   * Open the GitHub page in a new tab.
   */
  openGitHub(): void {
    window.open('https://github.com/brosda90/Ring-of-fire-Game', '_blank');
  }
}
