import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
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
  @ViewChild("scrollItem7") scrollItem7!: ElementRef;
  @ViewChild("scrollItem8") scrollItem8!: ElementRef;
  @ViewChild("scrollItem9") scrollItem9!: ElementRef;

  levelInfo = levelInfoConfig
  private scrollEventSub!: Subscription;

  constructor(
    private renderer: Renderer2,
    public commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.subscribeWheelEvent();
  }

  ngOnDestroy(): void {
    this.scrollEventSub.unsubscribe();
  }

  subscribeWheelEvent() {
    this.scrollEventSub = this.commonService.wheelEvent.asObservable().subscribe((e) => { this.scrollEventHandler(); });
  }

  scrollEventHandler() {
    // 若是未看過動畫則新增class至該element並顯示動畫
    if (this.commonService.isFirstTimeHere() && this.commonService.getIndex() === 7) { this.showItem1Animate(); }
    else if (this.commonService.isFirstTimeHere() && this.commonService.getIndex() === 8) { this.showItem2Animate(); }
    else if (this.commonService.isFirstTimeHere() && this.commonService.getIndex() === 9) { this.showItem3Animate(); }
  }

  private showItem1Animate() {
    this.renderer.addClass(this.scrollItem7.nativeElement, 'animate__slideInLeft');
  }

  private showItem2Animate() {
    this.renderer.addClass(this.scrollItem8.nativeElement, 'animate__slideInRight');
  }

  private showItem3Animate() {
    this.renderer.addClass(this.scrollItem9.nativeElement, 'animate__slideInLeft');
  }
}
