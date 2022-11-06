import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonService } from '../../service/common.service';
import { onBoardConfig } from './on-board.config';

@Component({
  selector: 'app-on-board',
  templateUrl: './on-board.component.html',
  styleUrls: ['./on-board.component.scss']
})
export class OnBoardComponent implements OnInit {
  @ViewChild("anonymous") anonymous!: ElementRef;
  scrollEventSub!: Subscription;
  boardInfo = onBoardConfig;
  onBoardAnimateMaxStep = 4; // on-board頁動畫需4步Scroll

  constructor(
    private commonService: CommonService,
    private renderer: Renderer2
  ) { }

  get showPaperMask() {
    return this.commonService.getMaxIndex() <= this.onBoardAnimateMaxStep;
  }

  get showCompleteBoardPage() {
    return this.commonService.getMaxIndex() >= this.onBoardAnimateMaxStep;
  }

  ngOnInit(): void {
    this.subscribeWheelEvent();
  }

  subscribeWheelEvent() {
    this.scrollEventSub = this.commonService.wheelEvent.asObservable().subscribe((e) => { this.animateController(); });
  }

  animateController() {
    switch (this.commonService.getIndex()) {
      case 2:
        this.renderer.addClass(this.anonymous.nativeElement, 'anonymous-1');
        break;
      case 3:
        this.renderer.removeClass(this.anonymous.nativeElement, 'anonymous-1');
        this.renderer.addClass(this.anonymous.nativeElement, 'anonymous-2');
        break;
      default:
        break;
    }
  }
}
