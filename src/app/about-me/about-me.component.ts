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

  triggerAnimation() {
    this.renderer.addClass(this.imageContainer.nativeElement, 'animate-image');
    this.renderer.addClass(this.aboutMeTitle.nativeElement, 'highlight-text');
  }

  getOffset(): number {
    return window.innerWidth < 1130 ? -300 : -300;
  }

  getElementPosition(elementRef: ElementRef, offset: number): number {
    return (
      elementRef.nativeElement.getBoundingClientRect().top +
      window.scrollY -
      offset
    );
  }

  scrollToContact(): void {
    document.getElementById('contactMe')?.scrollIntoView({
      behavior: 'smooth',
    });
  }
}
