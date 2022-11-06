import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { tap, throttleTime } from 'rxjs/operators';
import { CommonService } from './service/common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private scrollEventSub!: Subscription;

  @HostListener("wheel", ["$event"])
  public onScroll(event: any) {
    event.preventDefault();
  }

  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
    this.subscribeWheelEvent();
  }

  ngOnDestroy(): void {
    this.scrollEventSub?.unsubscribe();
  }

  subscribeWheelEvent(throttle: number = 750) {
    this.scrollEventSub?.unsubscribe();
    this.scrollEventSub = fromEvent(window, 'wheel')
      .pipe(
        throttleTime(throttle),
        tap((event: any) => {
          this.adjustmentIndex(event);
          this.scrollToCurElement()
        })
      ).subscribe();
  }

  private adjustmentIndex(event: any) {
    event.wheelDelta < 0 ? this.commonService.increaseIndex() : this.commonService.decreaseIndex();
  }

  private scrollToCurElement() {
    console.log('當前索引', this.commonService.getIndex())
    const el = document.getElementById('scrollItem' + this.commonService.getIndex());
    el?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }

}
