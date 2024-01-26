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
  selector: 'app-arrow-left',
  standalone: true,
  imports: [],
  templateUrl: './arrow-left.component.html',
  styleUrls: ['./arrow-left.component.scss'],
})
export class ArrowLeftComponent implements AfterViewInit {
  @ViewChild('arrowLeft') arrowLeft!: ElementRef;
  private offset: number = 300; // Offset in Pixeln, anpassen nach Bedarf
  private animationTriggered: boolean = false; // Variable, um zu verfolgen, ob die Animation bereits ausgelöst wurde

  constructor(
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}
  private enteredView: boolean = false;
  private exitedView: boolean = false;

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.listenToScroll();
    }
  }

  listenToScroll() {
    fromEvent(window, 'scroll').pipe(debounceTime(50)).subscribe(() => {
      const arrowPosition =
        this.arrowLeft.nativeElement.getBoundingClientRect().top +
        window.scrollY +
        this.offset;
      const scrollPosition = window.scrollY + window.innerHeight;
  
      if (scrollPosition >= arrowPosition && !this.enteredView) {
        this.renderer.removeClass(this.arrowLeft.nativeElement, 'moved-reverse');
        this.renderer.addClass(this.arrowLeft.nativeElement, 'moved');
        this.enteredView = true;
        this.exitedView = false;
      } else if (scrollPosition < arrowPosition && !this.exitedView && this.enteredView) {
        this.renderer.removeClass(this.arrowLeft.nativeElement, 'moved');
        this.renderer.addClass(this.arrowLeft.nativeElement, 'moved-reverse');
        this.exitedView = true;
        this.enteredView = false;
      }
    });
  }}