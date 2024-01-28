import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { BaseProjectComponent } from '../base-project/base-project.component';

@Component({
  selector: 'app-project-1',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-1.component.html',
  styleUrls: [
    './project-1.component.scss',
    '../base-project/base-project.component.scss',
  ],
})
export class Project1Component extends BaseProjectComponent {
  /**
   * Open the live test page in a new tab.
   */
  openLiveTest(): void {
    window.open('https://join.sebastianbrosda.de', '_blank');
  }
  /**
   * Open the GitHub page in a new tab.
   */
  openGitHub(): void {
    window.open('https://github.com/brosda90/Join-Gruppenarbeit', '_blank');
  }
}
