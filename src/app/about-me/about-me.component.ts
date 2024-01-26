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
  @ViewChild('aboutMeSpan') aboutMeSpan!: ElementRef;
  @ViewChild('aboutMeButton') aboutMeButton!: ElementRef;
  private animationTriggered: boolean = false;

  constructor(
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}
  private lastScrollTop: number = 0;
  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.listenToScroll();
    }
  }

  listenToScroll() {
    window.addEventListener('scroll', () => {
      const aboutContainerRect = this.textArea.nativeElement.parentNode.getBoundingClientRect();
      const isInView = aboutContainerRect.top < window.innerHeight && aboutContainerRect.bottom >= 200;
      const isAlmostOutOfView = aboutContainerRect.bottom < 0; // adjust this value as needed
  
      if (isInView && !isAlmostOutOfView && !this.animationTriggered) {
        this.triggerAnimation();
        this.animationTriggered = true;
      } else if (isAlmostOutOfView && this.animationTriggered) {
        this.triggerReverseAnimation();
        this.animationTriggered = false;
      }
    });
  }

  triggerReverseAnimation() {
    this.renderer.removeClass(this.imageContainer.nativeElement, 'animate-image');
    this.renderer.removeClass(this.aboutMeTitle.nativeElement, 'animate-title');
    this.renderer.removeClass(this.aboutMeSpan.nativeElement, 'animate-span');
    this.renderer.removeClass(this.aboutMeButton.nativeElement, 'animate-button');
  
    this.renderer.addClass(this.aboutMeTitle.nativeElement, 'slide-out');
    this.renderer.addClass(this.aboutMeSpan.nativeElement, 'slide-out');
    this.renderer.addClass(this.aboutMeButton.nativeElement, 'slide-out');
  
    // Remove the slide-out classes after the animation has completed
    setTimeout(() => {
      this.renderer.removeClass(this.aboutMeTitle.nativeElement, 'slide-out');
      this.renderer.removeClass(this.aboutMeSpan.nativeElement, 'slide-out');
      this.renderer.removeClass(this.aboutMeButton.nativeElement, 'slide-out');
    }, 1000); // Adjust this timeout to match the duration of your slide-out animation
  }

  shouldTriggerAnimation(): boolean {
    const rect = this.textArea.nativeElement.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom >= 0;
  }


  triggerAnimation() {
    this.renderer.addClass(this.imageContainer.nativeElement, 'animate-image');
    this.renderer.addClass(this.aboutMeTitle.nativeElement, 'animate-title');
    this.renderer.addClass(this.aboutMeSpan.nativeElement, 'animate-span');
    this.renderer.addClass(this.aboutMeButton.nativeElement, 'animate-button');
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