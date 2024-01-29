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
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-base-project',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './base-project.component.html',
  styleUrl: './base-project.component.scss',
})
export class BaseProjectComponent implements AfterViewInit, OnDestroy {
  @ViewChild('projectTextArea') projectTextArea!: ElementRef;
  @ViewChild('frameImage') frameImage!: ElementRef;
  @ViewChild('imageContainer') imageContainer!: ElementRef;
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
   * Listen to scroll events on the window and trigger animations based on the scroll position.
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
      const projectTextAreaRect =
        this.projectTextArea.nativeElement.getBoundingClientRect();
      const isInView =
        projectTextAreaRect.top >= 0 &&
        projectTextAreaRect.bottom <= window.innerHeight;
      const isOutOfView =
        projectTextAreaRect.bottom < 100 ||
        projectTextAreaRect.top > window.innerHeight;

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
   * Trigger animation by adding appropriate classes.
   */
  triggerAnimation() {
    const animationClass = this.getAnimationClass();
    this.renderer.addClass(this.projectTextArea.nativeElement, animationClass);
    this.renderer.addClass(this.frameImage.nativeElement, animationClass);
    this.renderer.addClass(this.imageContainer.nativeElement, 'image-colorize');
  }

  /**
   * Trigger reverse animation by removing and adding appropriate classes.
   */
  triggerReverseAnimation() {
    const slideOutClass =
      window.innerWidth < 1130 ? 'slide-out-under-1130' : 'slide-out';

    this.renderer.removeClass(
      this.projectTextArea.nativeElement,
      'animate-class'
    );
    this.renderer.removeClass(
      this.projectTextArea.nativeElement,
      'animateMobile-class'
    );
    this.renderer.removeClass(this.frameImage.nativeElement, 'animate-class');
    this.renderer.removeClass(
      this.frameImage.nativeElement,
      'animateMobile-class'
    );
    this.renderer.removeClass(
      this.imageContainer.nativeElement,
      'image-colorize'
    );
    this.renderer.addClass(this.projectTextArea.nativeElement, slideOutClass);

    setTimeout(() => {
      this.renderer.removeClass(
        this.projectTextArea.nativeElement,
        slideOutClass
      );
    }, 500); // Adjust this timeout to match the duration of your slide-out animation
  }

  /**
   * Get the offset based on the window width.
   * @returns {number} - Returns -150 if the window width is less than 1130, otherwise -300.
   */
  getOffset(): number {
    return window.innerWidth < 1130 ? -150 : -300;
  }

  /**
   * Get the position of an element.
   * @param {ElementRef} elementRef - The reference to the element.
   * @param {number} offset - The offset to consider when calculating the position.
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
   * Get the animation class based on the window width.
   * @returns {string} - Returns 'animateMobile-class' if the window width is less than 1130, otherwise 'animate-class'.
   */
  getAnimationClass(): string {
    return window.innerWidth < 1130 ? 'animateMobile-class' : 'animate-class';
  }
}
