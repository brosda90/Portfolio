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
@ViewChild('portfolioText') portfolioText!: ElementRef;
  private animationTriggered: boolean = false;

  constructor(
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  /**
   * ngAfterViewInit is called after the view has been initialized.
   * If the platform is a browser, a scroll listener is added.
   */
  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.listenToScroll();
    }
  }

  /**
   * Adds a scroll listener to the window.
   * If the animation has not been triggered yet and the animation should be triggered, the animation is triggered.
   */
  listenToScroll() {
    window.addEventListener('scroll', () => {
      const portfolioRect = this.portfolioTitle.nativeElement.getBoundingClientRect();
      const isInView = portfolioRect.top < window.innerHeight && portfolioRect.bottom >= 0;
      const isOutOfView = portfolioRect.bottom < 0 || portfolioRect.top > window.innerHeight; // adjust this value as needed
  
      if (isInView && !this.animationTriggered) {
        this.triggerAnimation();
        this.animationTriggered = true;
      } else if (isOutOfView && this.animationTriggered) {
        this.triggerReverseAnimation();
        this.animationTriggered = false;
      }
    });
  }
  
  resetAnimation() {
    this.renderer.removeClass(this.portfolioTitle.nativeElement, 'slide-out');
    this.renderer.removeClass(this.portfolioText.nativeElement, 'slide-out');
  }

  /**
   * Determines whether the animation should be triggered.
   * @returns {boolean} - Returns true if the scroll position is greater or equal to the position of the portfolio title.
   */
  shouldTriggerAnimation(): boolean {
    const offset = this.getOffset();
    const portfolioTitlePosition = this.getElementPosition(
      this.portfolioTitle,
      offset
    );

    const scrollPosition = window.scrollY + window.innerHeight;

    return scrollPosition >= portfolioTitlePosition;
  }

  /**
   * Triggers the animation by adding the class 'highlight-text' to the portfolio title.
   */
  triggerAnimation() {
    this.renderer.addClass(this.portfolioTitle.nativeElement, 'animate-title');
    setTimeout(() => {
      this.renderer.addClass(this.portfolioText.nativeElement, 'animate-text');
    }, 100); // Verzögerung für das 'p'-Element
  }
  
  triggerReverseAnimation() {
    this.renderer.addClass(this.portfolioTitle.nativeElement, 'slide-out');
    setTimeout(() => {
      this.renderer.addClass(this.portfolioText.nativeElement, 'slide-out');
    }, 100); // Verzögerung für das 'p'-Element
  
    // Entfernen Sie die Klassen nach Abschluss der Animation
    setTimeout(() => {
      this.renderer.removeClass(this.portfolioTitle.nativeElement, 'animate-title');
      this.renderer.removeClass(this.portfolioTitle.nativeElement, 'slide-out');
      this.renderer.removeClass(this.portfolioText.nativeElement, 'animate-text');
      this.renderer.removeClass(this.portfolioText.nativeElement, 'slide-out');
    }, 1000); // Passen Sie diesen Timeout an die Dauer Ihrer Animationen an
  }

  /**
   * Determines the offset based on the window width.
   * @returns {number} - Returns -500 if the window width is less than 1130, otherwise -300.
   */
  getOffset(): number {
    return window.innerWidth < 1130 ? -500 : -300;
  }

  /**
   * Determines the position of an element.
   * @param {ElementRef} elementRef - Reference to the element.
   * @param {number} offset - The offset.
   * @returns {number} - Returns the position of the element.
   */
  getElementPosition(elementRef: ElementRef, offset: number): number {
    return (
      elementRef.nativeElement.getBoundingClientRect().top +
      window.scrollY -
      offset
    );
  }
}
