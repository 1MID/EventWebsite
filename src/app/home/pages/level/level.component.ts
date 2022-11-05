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
  private scrollEventSub!: Subscription;

  @HostListener("wheel", ["$event"])
  public onScroll(event: any) {
    const inLevelArea = this.currentLevelItemIndex <= 3 && this.currentLevelItemIndex >= 0; // 限制範圍內才禁用wheel，否則會到不了其他頁面
    if (this.onBoardFinish && inLevelArea) {
      event.preventDefault();
    }
  }

  constructor(
    private renderer: Renderer2,
    private commonService: CommonService
  ) { }

  get onBoardFinish() {
    return this.commonService.getStatus().includes('onBoardFinish');
  }

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
        tap((event: any) => { this.scrollEventHandler(event) })
      ).subscribe();
  }

  scrollEventHandler(scrollEvent: any) {
    if (!this.onBoardFinish) { return; }

    const overEdge =
      (scrollEvent.wheelDelta < 0 && this.currentLevelItemIndex >= this.levelInfo.length) ||
      (scrollEvent.wheelDelta > 0 && this.currentLevelItemIndex < 0)
    if (overEdge) { return; }

    this.currentLevelItemIndex += (scrollEvent.wheelDelta < 0) ? 1 : -1;
    this.maxReadIndex = Math.max(this.maxReadIndex, this.currentLevelItemIndex);

    setTimeout(() => {
      this.scrollToCurElement();
      switch (this.currentLevelItemIndex) {
        case 1: this.showItem1Animate(); break;
        case 2: this.showItem2Animate(); break;
        case 3: this.showItem3Animate(); break;
        default: break;
      }
    }, 0);

  }

  private scrollToCurElement() {
    const el = document.getElementById('levelItem' + this.currentLevelItemIndex);
    el?.scrollIntoView({ behavior: 'smooth', block: this.currentLevelItemIndex === 0 ? 'start' : 'center' })
  }

  private showItem1Animate() {
    this.renderer.addClass(this.levelItem1.nativeElement, 'animate__animated');
    this.renderer.addClass(this.levelItem1.nativeElement, 'animate__slideInLeft');
  }

  private showItem2Animate() {
    this.renderer.addClass(this.levelItem2.nativeElement, 'animate__animated');
    this.renderer.addClass(this.levelItem2.nativeElement, 'animate__slideInRight');
  }

  private showItem3Animate() {
    this.renderer.addClass(this.levelItem3.nativeElement, 'animate__animated');
    this.renderer.addClass(this.levelItem3.nativeElement, 'animate__slideInLeft');
  }

}
