import { Component } from '@angular/core';
import { BaseArrowComponent } from '../base-arrow/base-arrow.component';


@Component({
  selector: 'app-arrow-right',
  standalone: true,
  imports: [],
  templateUrl: './arrow-right.component.html',
  styleUrls: ['./arrow-right.component.scss'],
})
export class ArrowRightComponent extends BaseArrowComponent {}
