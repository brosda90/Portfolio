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
    const projectTextPosition = this.getElementPosition(
      this.projectTextArea,
      offset
    );
    const frameImagePosition = this.getElementPosition(this.frameImage, offset);
    const scrollPosition = window.scrollY + window.innerHeight;

    return (
      scrollPosition >= projectTextPosition &&
      scrollPosition >= frameImagePosition
    );
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

  openLiveTest(): void {
    window.open('https://join.sebastianbrosda.de', '_blank');
  }

  openGitHub(): void {
    window.open('https://github.com/brosda90/Join-Gruppenarbeit', '_blank');
  }
}
