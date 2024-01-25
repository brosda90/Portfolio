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
  selector: 'app-about-me',
  standalone: true,
  imports: [],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss',
})
export class AboutMeComponent implements AfterViewInit {
  @ViewChild('textArea') textArea!: ElementRef;
  @ViewChild('imageContainer') imageContainer!: ElementRef;
  @ViewChild('aboutMeTitle') aboutMeTitle!: ElementRef;
  private animationTriggered: boolean = false;

  constructor(
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

   /**
   * Lifecycle hook that is called after Angular has fully initialized a component's view.
   * Adds a scroll listener if the platform is a browser.
   */
   ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.listenToScroll();
    }
  }

  /**
   * Adds a scroll event listener to the window.
   * Triggers the animation if it hasn't been triggered yet and should be triggered.
   */
  listenToScroll() {
    window.addEventListener('scroll', () => {
      if (!this.animationTriggered && this.shouldTriggerAnimation()) {
        this.triggerAnimation();
        this.animationTriggered = true;
      }
    });
  }

  /**
   * Determines if the animation should be triggered based on the scroll position and element positions.
   * @returns {boolean} - True if the animation should be triggered, false otherwise.
   */
  shouldTriggerAnimation(): boolean {
    const offset = this.getOffset();
    const textAreaPosition = this.getElementPosition(this.textArea, offset);
    const imageContainerPosition = this.getElementPosition(
      this.imageContainer,
      offset
    );
    const scrollPosition = window.scrollY + window.innerHeight;

    return (
      scrollPosition >= textAreaPosition &&
      scrollPosition >= imageContainerPosition
    );
  }

  /**
   * Triggers the animation by adding classes to the image container and the title.
   */
  triggerAnimation() {
    this.renderer.addClass(this.imageContainer.nativeElement, 'animate-image');
    this.renderer.addClass(this.aboutMeTitle.nativeElement, 'highlight-text');
  }

  /**
   * Gets the offset value based on the window's inner width.
   * @returns {number} - The offset value.
   */
  getOffset(): number {
    return window.innerWidth < 1130 ? -300 : -300;
  }

  /**
   * Gets the position of an element.
   * @param {ElementRef} elementRef - The element to get the position of.
   * @param {number} offset - The offset to subtract from the position.
   * @returns {number} - The position of the element.
   */
  getElementPosition(elementRef: ElementRef, offset: number): number {
    return (
      elementRef.nativeElement.getBoundingClientRect().top +
      window.scrollY -
      offset
    );
  }

  /**
   * Scrolls to the contact section smoothly.
   */
  scrollToContact(): void {
    document.getElementById('contactMe')?.scrollIntoView({
      behavior: 'smooth',
    });
  }
}