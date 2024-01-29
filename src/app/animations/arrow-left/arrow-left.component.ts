import { Component } from '@angular/core';
import { BaseArrowComponent } from '../base-arrow/base-arrow.component';



@Component({
  selector: 'app-arrow-left',
  standalone: true,
  imports: [],
  templateUrl: './arrow-left.component.html',
  styleUrls: ['./arrow-left.component.scss'],
})
export class ArrowLeftComponent extends BaseArrowComponent {}
