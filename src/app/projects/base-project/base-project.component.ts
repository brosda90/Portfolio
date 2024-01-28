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
  selector: 'app-base-project',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './base-project.component.html',
  styleUrl: './base-project.component.scss'
})
export class BaseProjectComponent implements AfterViewInit{
  @ViewChild('projectTextArea') projectTextArea!: ElementRef;
  @ViewChild('frameImage') frameImage!: ElementRef;
  @ViewChild('imageContainer') imageContainer!: ElementRef;
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
      const projectTextAreaRect = this.projectTextArea.nativeElement.getBoundingClientRect();
      const isInView = projectTextAreaRect.top >= 0 && projectTextAreaRect.bottom <= window.innerHeight; // adjust this value as needed
      const isOutOfView = projectTextAreaRect.bottom < 100 || projectTextAreaRect.top > window.innerHeight; 
  
      if (isInView && !this.animationTriggered) {
        this.triggerAnimation();
        this.animationTriggered = true;
      } else if (isOutOfView && this.animationTriggered) {
        this.triggerReverseAnimation();
        this.animationTriggered = false;
      }
    });
  }
  triggerReverseAnimation() {
    const slideOutClass = window.innerWidth < 1130 ? 'slide-out-under-1130' : 'slide-out';
    
    this.renderer.removeClass(this.projectTextArea.nativeElement, 'animate-class');
    this.renderer.removeClass(this.projectTextArea.nativeElement, 'animateMobile-class');
    this.renderer.removeClass(this.frameImage.nativeElement, 'animate-class');
    this.renderer.removeClass(this.frameImage.nativeElement, 'animateMobile-class');
    this.renderer.removeClass(this.imageContainer.nativeElement, 'image-colorize');
    this.renderer.addClass(this.projectTextArea.nativeElement, slideOutClass);
    
    // Remove the slide-out class after the animation has completed
    setTimeout(() => {
      this.renderer.removeClass(this.projectTextArea.nativeElement, slideOutClass);
    }, 1000); // Adjust this timeout to match the duration of your slide-out animation
  }

  triggerAnimation() {
    const animationClass = this.getAnimationClass();
    this.renderer.addClass(this.projectTextArea.nativeElement, animationClass);
    this.renderer.addClass(this.frameImage.nativeElement, animationClass);
    this.renderer.addClass(this.imageContainer.nativeElement, 'image-colorize');
  }

  getOffset(): number {
    return window.innerWidth < 1130 ? -150 : -300;
  }

  getElementPosition(elementRef: ElementRef, offset: number): number {
    return (
      elementRef.nativeElement.getBoundingClientRect().top +
      window.scrollY -
      offset
    );
  }

  getAnimationClass(): string {
    return window.innerWidth < 1130 ? 'animateMobile-class' : 'animate-class';
  }

}
