import {
  Component,
  ElementRef,
  AfterViewInit,
  Renderer2,
  ViewChild,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
})
export class PortfolioComponent implements AfterViewInit {
  @ViewChild('portfolioTitle') portfolioTitle!: ElementRef;
  private animationTriggered: boolean = false;

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
      if (!this.animationTriggered && this.shouldTriggerAnimation()) {
        this.triggerAnimation();
        this.animationTriggered = true;
      }
    });
  }

  shouldTriggerAnimation(): boolean {
    const offset = this.getOffset();
    const portfolioTitlePosition = this.getElementPosition(
      this.portfolioTitle,
      offset
    );

    const scrollPosition = window.scrollY + window.innerHeight;

    return scrollPosition >= portfolioTitlePosition;
  }

  triggerAnimation() {
    this.renderer.addClass(this.portfolioTitle.nativeElement, 'highlight-text');
  }

  getOffset(): number {
    return window.innerWidth < 1130 ? -500 : -300;
  }

  getElementPosition(elementRef: ElementRef, offset: number): number {
    return (
      elementRef.nativeElement.getBoundingClientRect().top +
      window.scrollY -
      offset
    );
  }
}
