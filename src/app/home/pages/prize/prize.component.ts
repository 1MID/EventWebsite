import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CommonService } from '../../service/common.service';

@Component({
  selector: 'app-prize',
  templateUrl: './prize.component.html',
  styleUrls: ['./prize.component.scss']
})
export class PrizeComponent implements OnInit {
  @ViewChild("prizeItem1") prizeItem1!: ElementRef;
  @ViewChild("prizeItem2") prizeItem2!: ElementRef;
  @ViewChild("prizeItem3") prizeItem3!: ElementRef;

  hiddenPrize = true;

  prizeInfo = [
    { imgSrc: "assets/prize/3.png", hide: true },
    { imgSrc: "assets/prize/2.png", hide: true },
    { imgSrc: "assets/prize/1.png", hide: true }
  ]

  touchMode = {
    prizeItem1: false,
    prizeItem2: false,
    prizeItem3: false
  }

  private scrollEventSub!: Subscription;
  private touchEventSub!: Subscription;

  constructor(
    private renderer: Renderer2,
    public commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.subscribeWheelEvent();
    this.subscribeTouchEvent();
  }

  ngOnDestroy(): void {
    this.scrollEventSub.unsubscribe();
    this.touchEventSub.unsubscribe();
  }

  subscribeWheelEvent() {
    this.scrollEventSub = this.commonService.wheelEvent.asObservable().subscribe((e) => { this.scrollEventHandler(); });
  }

  subscribeTouchEvent() {
    this.touchEventSub = fromEvent(window, 'touchmove').pipe(tap(() => { this.scrollEventHandler(); }))
      .subscribe(() => this.touchEventHandler())
  }

  scrollEventHandler() {
    if (this.commonService.isFirstTimeHere() && this.commonService.getIndex() === 11) {
      this.addFadeInAnimate(this.prizeItem1); this.prizeInfo[0].hide = false;
      setTimeout(() => { this.addFadeInAnimate(this.prizeItem2); this.prizeInfo[1].hide = false; }, 200);
      setTimeout(() => { this.addFadeInAnimate(this.prizeItem3); this.prizeInfo[2].hide = false; }, 400);
    }
  }

  touchEventHandler() {
    if (this.commonService.thisElementInScreen(this.prizeItem1)) {
      this.addFadeInAnimate(this.prizeItem1); this.touchMode.prizeItem1 = true;
      setTimeout(() => { this.addFadeInAnimate(this.prizeItem2); this.touchMode.prizeItem2 = true; }, 200);
      setTimeout(() => { this.addFadeInAnimate(this.prizeItem3); this.touchMode.prizeItem3 = true; }, 400);
    };
  }

  private addFadeInAnimate(el: ElementRef) {
    this.renderer.addClass(el.nativeElement, 'animate__fadeInDownBig');
  }


}
