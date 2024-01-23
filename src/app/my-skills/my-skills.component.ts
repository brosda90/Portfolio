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

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.listenToScroll();
    }
  }

  listenToScroll() {
    window.addEventListener('scroll', () => {
      if (
        !this.animationTriggered &&
        this.iconElements &&
        this.iconElements.length > 0 &&
        this.isInViewport(this.iconElements.first)
      ) {
        this.animateIcons();
        this.animationTriggered = true;
      }
    });
  }

  getOffset(): number {
    return window.innerWidth < 1130 ? -500 : -300;
  }

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

  animateIcons() {
    const iconArray = this.iconElements.toArray();
    this.shuffleArray(iconArray); // Mischen der Elemente

    iconArray.forEach((icon, index) => {
      const imgElement = icon.nativeElement.querySelector('img');
      const pElement = icon.nativeElement.querySelector('p');

      setTimeout(() => {
        icon.nativeElement.classList.add('animate-icon');
        imgElement.addEventListener('animationend', () => {
          pElement.style.color = '#00bc8f';
        });
      }, index * 3000);
    });
    this.renderer.addClass(this.mySkillsTitle.nativeElement, 'highlight-text');
  }

  // Hilfsfunktion zum Mischen der Array-Elemente
  shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
}
