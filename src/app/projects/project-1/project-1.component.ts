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
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-project-1',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-1.component.html',
  styleUrl: './project-1.component.scss',
})
export class Project1Component implements AfterViewInit {
  @ViewChild('projectTextArea') projectTextArea!: ElementRef;
  @ViewChild('frameImage') frameImage!: ElementRef;
  @ViewChild('imageContainer') imageContainer!: ElementRef;
  private animationTriggered: boolean = false;

  constructor(
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  /**
   * After view initialization, if the platform is a browser, start listening to scroll events.
   */
  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.listenToScroll();
    }
  }

  /**
   * Listen to scroll events and trigger animation when conditions are met.
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
   * Determine if the animation should be triggered based on the scroll position and element positions.
   * @returns {boolean} - Returns true if the animation should be triggered, false otherwise.
   */
  shouldTriggerAnimation(): boolean {
    const offset = this.getOffset();
    const projectTextPosition = this.getElementPosition(this.projectTextArea, offset);
    const frameImagePosition = this.getElementPosition(this.frameImage, offset);
    const scrollPosition = window.scrollY + window.innerHeight;

    return (
      scrollPosition >= projectTextPosition &&
      scrollPosition >= frameImagePosition
    );
  }

  /**
   * Trigger the animation by adding the appropriate classes to the elements.
   */
  triggerAnimation() {
    const animationClass = this.getAnimationClass();
    this.renderer.addClass(this.projectTextArea.nativeElement, animationClass);
    this.renderer.addClass(this.frameImage.nativeElement, animationClass);
    this.renderer.addClass(this.imageContainer.nativeElement, 'image-colorize');
  }

  /**
   * Get the offset value based on the window width.
   * @returns {number} - Returns the offset value.
   */
  getOffset(): number {
    return window.innerWidth < 1130 ? -150 : -300;
  }

  /**
   * Get the position of an element.
   * @param {ElementRef} elementRef - The reference to the element.
   * @param {number} offset - The offset value.
   * @returns {number} - Returns the position of the element.
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
   * @returns {string} - Returns the animation class.
   */
  getAnimationClass(): string {
    return window.innerWidth < 1130 ? 'animateMobile-class' : 'animate-class';
  }

  /**
   * Open the live test page in a new tab.
   */
  openLiveTest(): void {
    window.open('https://join.sebastianbrosda.de', '_blank');
  }

  /**
   * Open the GitHub page in a new tab.
   */
  openGitHub(): void {
    window.open('https://github.com/brosda90/Join-Gruppenarbeit', '_blank');
  }
}