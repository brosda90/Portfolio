import {
  Component,
  ElementRef,
  AfterViewInit,
  Renderer2,
  ViewChild,
  Inject,
  PLATFORM_ID,
  OnDestroy,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [],
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss'],
})
export class AboutMeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('textArea') textArea!: ElementRef;
  @ViewChild('imageContainer') imageContainer!: ElementRef;
  @ViewChild('aboutMeTitle') aboutMeTitle!: ElementRef;
  @ViewChild('aboutMeSpan') aboutMeSpan!: ElementRef;
  @ViewChild('aboutMeButton') aboutMeButton!: ElementRef;
  private animationTriggered: boolean = false;
  private scrollTimeoutId: number | null = null;

  constructor(
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  /**
   * Angular lifecycle hook that is called after a component's view has been fully initialized.
   * In this case, it is used to listen to scroll events if the platform is a browser.
   */
  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.listenToScroll();
    }
  }

  /**
   * Angular lifecycle hook that is called just before Angular destroys the directive/component.
   * In this case, it is used to remove the scroll event listener if the platform is a browser.
   */
  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('scroll', this.debouncedScrollHandler);
    }
  }

  /**
   * Listen to scroll events on the window.
   */
  listenToScroll() {
    window.addEventListener('scroll', this.debouncedScrollHandler);
  }

  /**
   * Handle scroll events with debouncing.
   * Triggers or reverses animation based on the scroll position.
   */
  debouncedScrollHandler = () => {
    if (this.scrollTimeoutId !== null) {
      cancelAnimationFrame(this.scrollTimeoutId);
    }

    this.scrollTimeoutId = requestAnimationFrame(() => {
      const aboutContainerRect =
        this.textArea.nativeElement.parentNode.getBoundingClientRect();
      const isInView =
        aboutContainerRect.top >= -300 &&
        aboutContainerRect.bottom <= window.innerHeight;
      const isOutOfView =
        aboutContainerRect.bottom < 100 ||
        aboutContainerRect.top > window.innerHeight;

      if (isInView && !this.animationTriggered) {
        this.triggerAnimation();
        this.animationTriggered = true;
      } else if (isOutOfView && this.animationTriggered) {
        this.triggerReverseAnimation();
        this.animationTriggered = false;
      }
    });
  };

  /**
   * Determine if the animation should be triggered based on the position of the text area.
   * @returns {boolean} - True if the text area is in view, false otherwise.
   */
  shouldTriggerAnimation(): boolean {
    const rect = this.textArea.nativeElement.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom >= 0;
  }

  /**
   * Trigger animation by adding appropriate classes.
   */
  triggerAnimation() {
    this.renderer.addClass(this.imageContainer.nativeElement, 'animate-image');
    this.renderer.addClass(this.aboutMeTitle.nativeElement, 'animate-title');
    this.renderer.addClass(this.aboutMeSpan.nativeElement, 'animate-span');
    this.renderer.addClass(this.aboutMeButton.nativeElement, 'animate-button');
  }

  /**
   * Trigger reverse animation by removing and adding appropriate classes.
   */
  triggerReverseAnimation() {
    this.renderer.removeClass(
      this.imageContainer.nativeElement,
      'animate-image'
    );
    this.renderer.removeClass(this.aboutMeTitle.nativeElement, 'animate-title');
    this.renderer.removeClass(this.aboutMeSpan.nativeElement, 'animate-span');
    this.renderer.removeClass(
      this.aboutMeButton.nativeElement,
      'animate-button'
    );

    this.renderer.addClass(this.aboutMeTitle.nativeElement, 'slide-out');
    this.renderer.addClass(this.aboutMeSpan.nativeElement, 'slide-out');
    this.renderer.addClass(this.aboutMeButton.nativeElement, 'slide-out');

    setTimeout(() => {
      this.renderer.removeClass(this.aboutMeTitle.nativeElement, 'slide-out');
      this.renderer.removeClass(this.aboutMeSpan.nativeElement, 'slide-out');
      this.renderer.removeClass(this.aboutMeButton.nativeElement, 'slide-out');
    }, 300);
  }

  /**
   * Get the offset value based on the window width.
   * @returns {number} - The offset value.
   */
  getOffset(): number {
    return window.innerWidth < 1130 ? -300 : -300;
  }

  /**
   * Get the position of a given element.
   * @param {ElementRef} elementRef - The reference to the element.
   * @param {number} offset - The offset value.
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
   * Scroll to the contact section smoothly.
   */
  scrollToContact(): void {
    document.getElementById('contactMe')?.scrollIntoView({
      behavior: 'smooth',
    });
  }
}
