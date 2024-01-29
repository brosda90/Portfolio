import { Component } from '@angular/core';

import { BaseArrowComponent } from '../base-arrow/base-arrow.component';

@Component({
  selector: 'app-arrow-left-outside',
  standalone: true,
  imports: [],
  templateUrl: './arrow-left-outside.component.html',
  styleUrl: './arrow-left-outside.component.scss',
})
export class ArrowLeftOutsideComponent extends BaseArrowComponent {}

