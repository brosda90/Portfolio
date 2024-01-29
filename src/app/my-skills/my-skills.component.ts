import {
  Component,
  ViewChild,
  Renderer2,
  ElementRef,
  AfterViewInit,
  Inject,
  PLATFORM_ID,
  OnDestroy,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-my-skills',
  standalone: true,
  imports: [],
  templateUrl: './my-skills.component.html',
  styleUrls: ['./my-skills.component.scss'],
})
export class MySkillsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('MySkillsTitle')
  mySkillsTitle!: ElementRef;

  private wasInView: boolean = false;
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
      const mySkillsRect =
        this.mySkillsTitle.nativeElement.getBoundingClientRect();
      const isInView =
        mySkillsRect.top < window.innerHeight && mySkillsRect.bottom >= 0;
      const isAlmostOutOfView =
        mySkillsRect.bottom < 100 || mySkillsRect.top > window.innerHeight;

      if (isInView && !this.wasInView) {
        this.triggerAnimation();
        this.wasInView = true; 
      } else if (!isInView && this.wasInView) {
        this.triggerReverseAnimation();
        this.wasInView = false; 
      }
    });
  };

  /**
   * Trigger animation by adding appropriate classes.
   */
  triggerAnimation() {
    this.renderer.addClass(this.mySkillsTitle.nativeElement, 'rotate-in-x');
  }

  /**
   * Trigger reverse animation by removing and adding appropriate classes.
   */
  triggerReverseAnimation() {
    this.renderer.addClass(this.mySkillsTitle.nativeElement, 'rotate-out-x');
    setTimeout(() => {
      this.renderer.removeClass(
        this.mySkillsTitle.nativeElement,
        'rotate-in-x'
      );
      this.renderer.removeClass(
        this.mySkillsTitle.nativeElement,
        'rotate-out-x'
      );
    }, 300); 
  }

  /**
   * Determines the offset based on the window width.
   * @returns {number} - Returns -500 if the window width is less than 1130, otherwise -300.
   */
  getOffset(): number {
    return window.innerWidth < 1130 ? -500 : -300;
  }

  /**
   * Determines whether an element is in the viewport.
   * @param {ElementRef} element - The element to check.
   * @returns {boolean} - Returns true if the element is in the viewport, otherwise false.
   */
  isInViewport(element: ElementRef): boolean {
    const bounding = element.nativeElement.getBoundingClientRect();
    const offset = this.getOffset();
    return (
      bounding.top + offset >= 0 &&
      bounding.left >= 0 &&
      bounding.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      bounding.right <=
        (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  /**
   * Shuffles the elements of an array.
   * @param {any[]} array - The array to shuffle.
   */
  shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
}
