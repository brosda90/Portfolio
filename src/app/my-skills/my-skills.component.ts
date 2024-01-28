import {
  Component,
  ViewChildren,
  ViewChild,
  QueryList,
  Renderer2,
  ElementRef,
  AfterViewInit,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-my-skills',
  standalone: true,
  imports: [],
  templateUrl: './my-skills.component.html',
  styleUrl: './my-skills.component.scss',
})
export class MySkillsComponent implements AfterViewInit {
 
  @ViewChild('MySkillsTitle')
  mySkillsTitle!: ElementRef;

  constructor(
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}
  private wasInView: boolean = false;

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.listenToScroll();
    }
  }
  
  listenToScroll() {
    window.addEventListener('scroll', () => {
      const mySkillsRect = this.mySkillsTitle.nativeElement.getBoundingClientRect();
      const isInView = mySkillsRect.top < window.innerHeight && mySkillsRect.bottom >= 0;
      const isAlmostOutOfView = mySkillsRect.bottom < 100 || mySkillsRect.top > window.innerHeight;
  
      if (isInView && !this.wasInView) {
        this.triggerAnimation();
        this.wasInView = true; // Bereich wurde erreicht
      } else if (!isInView && this.wasInView) {
        this.triggerReverseAnimation();
        this.wasInView = false; // Bereich wurde verlassen
      }
    });
  }
  
  triggerAnimation() {
    this.renderer.addClass(this.mySkillsTitle.nativeElement, 'rotate-in-x');
  }
  
  triggerReverseAnimation() {
    this.renderer.addClass(this.mySkillsTitle.nativeElement, 'rotate-out-x');
    setTimeout(() => {
      this.renderer.removeClass(this.mySkillsTitle.nativeElement, 'rotate-in-x');
      this.renderer.removeClass(this.mySkillsTitle.nativeElement, 'rotate-out-x');
    }, 500); // Adjust this timeout to match the duration of your rotate-out-x animation
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
