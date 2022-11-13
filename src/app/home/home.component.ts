import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { fromEvent, Subscription, interval } from 'rxjs';
import { tap, throttleTime, throttle } from 'rxjs/operators';
import { CommonService } from './service/common.service';
import { MouseEffectService } from './service/mouse-effect.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild("main") main!: ElementRef;
  private scrollEventSub!: Subscription;
  private touchEventSub!: Subscription;
  trails: any = [];
  touchStartY = 0;
  showLoading = true;

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

  @HostListener('window:resize', ['$event'])
  public onResize(event: any) {
    this.reloadPage();
    this.commonService.scrollToCurElement();
  }

  constructor(
    private commonService: CommonService,
    private mouseEffectService: MouseEffectService,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.scrollEventSub = this.getWheelEvent().subscribe();
    this.touchEventSub = this.getTouchEvent().subscribe();
    this.mouseEffectService.init();
  }

  ngAfterViewInit(): void {
    setTimeout(() => { this.reloadPage(), 1500 });
  }

  ngOnDestroy(): void {
    this.scrollEventSub?.unsubscribe();
    this.touchEventSub?.unsubscribe();
    this.mouseEffectService.destroy();
  }

  reloadPage() {
    this.commonService.disabledModifyIndex();
    this.showLoading = true;
    this.renderer.removeClass(this.main.nativeElement, 'animate__fadeIn')
    setTimeout(() => {
      this.showLoading = false;
      this.renderer.addClass(this.main.nativeElement, 'animate__fadeIn')
      this.commonService.enabledModifyIndex();
    }, 1000);
  }

  private getWheelEvent() {
    return fromEvent(window, 'wheel')
      .pipe(
        throttle(() =>
          this.commonService.getMaxIndex() > 15 ? interval(100)
            : this.commonService.getMaxIndex() > 11 ? interval(400) : interval(750)
        ), // speed up
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
