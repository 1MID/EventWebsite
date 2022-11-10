import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, Subscription, interval } from 'rxjs';
import { tap, throttleTime, throttle } from 'rxjs/operators';
import { CommonService } from './service/common.service';
import { MouseEffectService } from './service/mouse-effect.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private scrollEventSub!: Subscription;
  private touchEventSub!: Subscription;
  trails: any = [];
  touchStartY = 0;

  @HostListener("wheel", ["$event"])
  public onScroll(event: any) {
    if (this.commonService.disabledWheelEvent) { event.preventDefault(); }
  }

  @HostListener("touchmove", ["$event"])
  public onTouchMove(event: any) {
    if (this.commonService.disabledWheelEvent) { event.preventDefault(); }
  }

  @HostListener("touchstart", ["$event"])
  public onTouchStart(event: any) {
    this.touchStartY = event.targetTouches[0].clientY;
  }

  constructor(
    private commonService: CommonService,
    private mouseEffectService: MouseEffectService
  ) { }

  ngOnInit(): void {
    this.scrollEventSub = this.getWheelEvent().subscribe();
    this.touchEventSub = this.getTouchEvent().subscribe();
    this.mouseEffectService.init();
  }

  ngOnDestroy(): void {
    this.scrollEventSub?.unsubscribe();
    this.touchEventSub?.unsubscribe();
    this.mouseEffectService.destroy();
  }

  private getWheelEvent() {
    return fromEvent(window, 'wheel')
      .pipe(
        throttle(() => this.commonService.getMaxIndex() > 11 ? interval(400) : interval(750)), // speed up
        tap((event: any) => {
          event.wheelDelta < 0 ? this.commonService.increaseIndex() : this.commonService.decreaseIndex();
          this.commonService.scrollToCurElement(); // 如果這個只交由Service控制則無法操縱throttle time
        })
      )
  }

  private getTouchEvent() {
    return fromEvent(window, 'touchend')
      .pipe(
        throttle(() => interval(750)),
        tap((event: any) => {
          const pageDown = event.changedTouches[0].clientY < this.touchStartY;
          if (pageDown) {
            this.commonService.increaseIndex();
            const paperMaskFinish = this.commonService.getIndex() > 3;
            if (paperMaskFinish) { this.commonService.disabledWheelEvent = false; };
          }
        }))
  }


}
