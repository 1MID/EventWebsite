import { Component, ElementRef, Renderer2, OnInit, ViewChild, AfterViewInit, HostListener, OnDestroy, Output, EventEmitter } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { tap, throttleTime } from 'rxjs/operators';

@Component({
  selector: 'app-paper-mask',
  templateUrl: './paper-mask.component.html',
  styleUrls: ['./paper-mask.component.scss']
})
export class PaperMaskComponent implements OnInit, OnDestroy {
  @Output() animateFinish = new EventEmitter<any>();
  @Output() animateStageEmit = new EventEmitter<any>();

  @ViewChild("paperTop") paperTop!: ElementRef;
  @ViewChild("paperRight") paperRight!: ElementRef;
  @ViewChild("paperLeft") paperLeft!: ElementRef;
  @ViewChild("scrollDown") scrollDown!: ElementRef;

  animateStage = 0;

  private scrollEventSub!: Subscription;

  @HostListener("wheel", ["$event"])
  public onScroll(event: any) {
    if (this.animateStage <= 3) {
      event.preventDefault();
    }
  }

  constructor(
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.subscribeWheelEvent();
  }

  ngOnDestroy(): void {
    this.scrollEventSub.unsubscribe();
  }

  subscribeWheelEvent() {
    this.scrollEventSub = fromEvent(window, 'wheel')
      .pipe(
        throttleTime(750),
        tap((event: any) => { this.animateController(event) })
      ).subscribe();
  }

  animateController(scrollEvent: any) {
    if (scrollEvent.wheelDelta > 0) { return; }
    this.animateStage++;
    this.animateStageEmit.emit(this.animateStage);

    switch (this.animateStage) {
      case 1:
        this.renderer.addClass(this.paperTop.nativeElement, 'top-1');
        break;

      case 2:
        this.renderer.removeClass(this.paperTop.nativeElement, 'top-1');
        this.renderer.addClass(this.paperTop.nativeElement, 'top-2');

        this.renderer.addClass(this.paperRight.nativeElement, 'right-1');
        this.renderer.addClass(this.paperLeft.nativeElement, 'left-1');

        this.renderer.addClass(this.scrollDown.nativeElement, 'animate__animated');
        this.renderer.addClass(this.scrollDown.nativeElement, 'animate__fadeOut');
        break;

      case 3:
        this.renderer.removeClass(this.paperLeft.nativeElement, 'left-1');
        this.renderer.addClass(this.paperLeft.nativeElement, 'left-2');

        setTimeout(() => {
          this.animateFinish.emit(true);
          this.scrollEventSub.unsubscribe();
        }, 750);
        break;

      default:
        break;
    }
  }
}