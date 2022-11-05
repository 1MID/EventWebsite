import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { tap, throttleTime } from 'rxjs/operators';
import { CommonService } from '../../service/common.service';
import { levelInfoConfig } from './level.config';

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.scss']
})
export class LevelComponent implements OnInit, OnDestroy {
  @ViewChild("levelItem1") levelItem1!: ElementRef;
  @ViewChild("levelItem2") levelItem2!: ElementRef;
  @ViewChild("levelItem3") levelItem3!: ElementRef;

  levelInfo = levelInfoConfig
  currentLevelItemIndex = -1; // 當前畫面的item索引
  maxReadIndex = 0; // 滑到過最後面的索引
  disabledScroll = false;
  scrollSnapAlignIsStart = true;
  alreadyReduceThrottleTime = false;
  private scrollEventSub!: Subscription;

  @HostListener("wheel", ["$event"])
  public onScroll(event: any) {
    if (this.disabledScroll) {
      event.preventDefault();
    }
  }

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
    this.scrollEventSub = this.getScrollObservable(750).subscribe();
  }

  scrollEventHandler(scrollEvent: any) {
    // 判斷是否屬於level頁範圍中，如果不是則不往下做
    this.disabledScroll = this.shouldDisableScroll(scrollEvent.wheelDelta < 0 ? 'down' : 'up');
    if (!this.disabledScroll) { return; }

    // 當前屬於level頁範圍中，根據 滑鼠scroll事件 對當前ItemIndex進行修改
    this.currentLevelItemIndex += (scrollEvent.wheelDelta < 0) ? 1 : -1;

    // 紀錄當前看到的最後一個Item，避免動畫看過又重複看
    // 如果已經結束所有item動畫，則將Throttle 從原先 750ms 調整為 200ms 加快使用者體驗
    this.maxReadIndex = Math.max(this.maxReadIndex, this.currentLevelItemIndex);
    const alreadyFinishItemAnimate = this.maxReadIndex === (this.levelInfo.length + 1)
    if (alreadyFinishItemAnimate) { this.reduceScrollThrottleTime(); }

    //  移到該區域
    this.scrollToCurElement();
    // 若是未看過動畫則新增class至該element並顯示動畫
    if ((this.currentLevelItemIndex === this.maxReadIndex) && (this.currentLevelItemIndex === 1)) { this.showItem1Animate(); }
    else if ((this.currentLevelItemIndex === this.maxReadIndex) && (this.currentLevelItemIndex === 2)) { this.showItem2Animate(); }
    else if ((this.currentLevelItemIndex === this.maxReadIndex) && (this.currentLevelItemIndex === 3)) { this.showItem3Animate(); }

    console.log('當前item索引：' + this.currentLevelItemIndex, '當前看過最大索引：' + this.maxReadIndex);
  }

  private shouldDisableScroll(sreenScroll: 'up' | 'down') {
    if (!this.commonService.getStatus().includes('onBoardLeave')) { return false; } // 還沒離開onBoard頁面

    // 判斷有沒有越界
    const nextStep = (sreenScroll === 'down') ? this.currentLevelItemIndex + 1 : this.currentLevelItemIndex - 1;
    const overLowwer = (sreenScroll === 'up' && nextStep < -1);
    const overUpper = (sreenScroll === 'down' && nextStep > this.levelInfo.length + 1);
    // 如果越界，順便更改下次進來時的scroll-snap-align
    if (overLowwer) { this.scrollSnapAlignIsStart = true; return false; }
    else if (overUpper) { this.scrollSnapAlignIsStart = false; return false; }
    else { return true };
  }

  private scrollToCurElement() {
    const el = document.getElementById('levelItem' + this.currentLevelItemIndex);
    console.log(this.currentLevelItemIndex === 0 ? 'start' : 'center')
    el?.scrollIntoView({ behavior: 'smooth', block: this.currentLevelItemIndex === 0 ? 'start' : 'center' })
  }

  private showItem1Animate() {
    this.renderer.addClass(this.levelItem1.nativeElement, 'animate__slideInLeft');
  }

  private showItem2Animate() {
    this.renderer.addClass(this.levelItem2.nativeElement, 'animate__slideInRight');
  }

  private showItem3Animate() {
    this.renderer.addClass(this.levelItem3.nativeElement, 'animate__slideInLeft');
  }

  private reduceScrollThrottleTime() {
    if (this.alreadyReduceThrottleTime) { return; };
    this.scrollEventSub.unsubscribe();
    this.scrollEventSub = this.getScrollObservable(200).subscribe();
    this.alreadyReduceThrottleTime = true;
  }

  private getScrollObservable(throttle: number) {
    return fromEvent(window, 'wheel')
      .pipe(
        throttleTime(throttle),
        tap((event: any) => { this.scrollEventHandler(event) })
      )
  }

}
