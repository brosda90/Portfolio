import {
  Component,
  Renderer2,
  ElementRef,
  ViewChild,
  AfterViewInit,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-arrow-left',
  standalone: true,
  imports: [],
  templateUrl: './arrow-left.component.html',
  styleUrls: ['./arrow-left.component.scss'],
})
export class ArrowLeftComponent implements AfterViewInit {
  @ViewChild('arrowLeft') arrowLeft!: ElementRef;
  private offset: number = 400; // Offset in Pixeln, anpassen nach Bedarf
  private animationTriggered: boolean = false; // Variable, um zu verfolgen, ob die Animation bereits ausgelöst wurde

  constructor(
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.listenToScroll();
    }
  }

  listenToScroll() {
    window.addEventListener('scroll', () => {
      if (!this.animationTriggered) {
        const arrowPosition =
          this.arrowLeft.nativeElement.getBoundingClientRect().top +
          window.scrollY +
          this.offset;
        const scrollPosition = window.scrollY + window.innerHeight;

        // Überprüfen, ob der Scroll-Fortschritt den Punkt der Komponente (plus Offset) erreicht hat
        if (scrollPosition >= arrowPosition) {
          this.renderer.addClass(this.arrowLeft.nativeElement, 'moved');
          this.animationTriggered = true; // Markieren, dass die Animation ausgelöst wurde
        }
      }
    });
  }
}
