import {
  Component,
  Renderer2,
  ElementRef,
  ViewChild,
  AfterViewInit,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-base-arrow',
  standalone: true,
  imports: [],
  templateUrl: './base-arrow.component.html',
  styleUrl: './base-arrow.component.scss',
})
export class BaseArrowComponent implements AfterViewInit {
  @ViewChild('baseArrow') arrow!: ElementRef;
  private offset: number = 400; 
  private animationTriggered: boolean = false; 

  constructor(
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}
  private enteredView: boolean = false;
  private exitedView: boolean = false;
  private scrollTimeoutId: number | null = null;

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
   * Listen to scroll events on the window and trigger animations based on the scroll position.
   */
  listenToScroll() {
    fromEvent(window, 'scroll')
      .pipe(debounceTime(50))
      .subscribe(() => {
        if (this.scrollTimeoutId !== null) {
          cancelAnimationFrame(this.scrollTimeoutId);
        }

        this.scrollTimeoutId = requestAnimationFrame(() => {
          const arrowPosition =
            this.arrow.nativeElement.getBoundingClientRect().top +
            window.scrollY +
            this.offset;
          const scrollPosition = window.scrollY + window.innerHeight;

          if (scrollPosition >= arrowPosition && !this.enteredView) {
            this.renderer.removeClass(
              this.arrow.nativeElement,
              'moved-reverse'
            );
            this.renderer.addClass(this.arrow.nativeElement, 'moved');
            this.enteredView = true;
            this.exitedView = false;
          } else if (
            scrollPosition < arrowPosition &&
            !this.exitedView &&
            this.enteredView
          ) {
            this.renderer.removeClass(this.arrow.nativeElement, 'moved');
            this.renderer.addClass(this.arrow.nativeElement, 'moved-reverse');
            this.exitedView = true;
            this.enteredView = false;
          }
        });
      });
  }
}
