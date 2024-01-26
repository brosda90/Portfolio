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
  @ViewChildren(
    'moving0, moving1, moving2, moving3, moving4, moving5, moving6, moving7, moving8, moving9'
  )
  iconElements!: QueryList<ElementRef>;

  @ViewChild('MySkillsTitle')
  mySkillsTitle!: ElementRef;
  private animationTriggered: boolean = false;

  constructor(
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}
  private wasInView: boolean = false;

  /**
   * ngAfterViewInit is called after the view has been initialized.
   * If the platform is a browser, a scroll listener is added.
   */
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
  
      if (isInView && !this.animationTriggered) {
        this.triggerAnimation();
        this.animationTriggered = true;
        this.wasInView = true; // Bereich wurde erreicht
      } else if (!isInView && this.animationTriggered && this.wasInView) {
        this.triggerReverseAnimation();
        this.animationTriggered = false;
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
   * Animates the icons by adding the class 'animate-icon' and changing the color of the text.
   */
  animateIcons() {
    const iconArray = this.iconElements.toArray();
    this.shuffleArray(iconArray); // Shuffle the elements

    iconArray.forEach((icon, index) => {
      const imgElement = icon.nativeElement.querySelector('img');
      const pElement = icon.nativeElement.querySelector('p');

      setTimeout(() => {
        icon.nativeElement.classList.add('animate-icon');
        imgElement.addEventListener('animationend', () => {
          pElement.style.color = '#00bc8f';
        });
      }, index * 1500);
    });
    this.renderer.addClass(this.mySkillsTitle.nativeElement, 'highlight-text');
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
