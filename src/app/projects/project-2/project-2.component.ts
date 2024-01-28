import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseProjectComponent } from '../base-project/base-project.component';

@Component({
  selector: 'app-project-2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-2.component.html',
  styleUrls: [
    './project-2.component.scss',
    '../base-project/base-project.component.scss',
  ],
})
export class Project2Component extends BaseProjectComponent {
  /**
   * Open the live test page in a new tab.
   */
  openLiveTest(): void {
    window.open('https://el-pollo-loco.sebastianbrosda.de', '_blank');
  }

  /**
   * Open the GitHub page in a new tab.
   */
  openGitHub(): void {
    window.open('https://github.com/brosda90/Elle-Pollo-Loco', '_blank');
  }
}
