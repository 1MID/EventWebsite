import { Component, ElementRef, Renderer2, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonService } from 'src/app/home/service/common.service';

@Component({
  selector: 'app-paper-mask',
  templateUrl: './paper-mask.component.html',
  styleUrls: ['./paper-mask.component.scss']
})
export class PaperMaskComponent implements OnInit, OnDestroy {
  @ViewChild("paperTop") paperTop!: ElementRef;
  @ViewChild("paperRight") paperRight!: ElementRef;
  @ViewChild("paperLeft") paperLeft!: ElementRef;
  @ViewChild("scrollDown") scrollDown!: ElementRef;

  private scrollEventSub!: Subscription;

  constructor(
    private renderer: Renderer2,
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.subscribeWheelEvent();
  }

  ngOnDestroy(): void {
    this.scrollEventSub.unsubscribe();
  }

  subscribeWheelEvent() {
    this.scrollEventSub = this.commonService.wheelEvent.asObservable().subscribe((e) => { this.animateController(); });
  }

  animateController() {
    switch (this.commonService.getIndex()) {
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

        setTimeout(() => { this.scrollEventSub.unsubscribe(); }, 750);
        break;

      default:
        break;
    }
  }
}