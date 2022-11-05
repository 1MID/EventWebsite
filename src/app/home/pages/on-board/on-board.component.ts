import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CommonService } from '../../service/common.service';

@Component({
  selector: 'app-on-board',
  templateUrl: './on-board.component.html',
  styleUrls: ['./on-board.component.scss']
})
export class OnBoardComponent implements OnInit {
  @ViewChild("anonymous") anonymous!: ElementRef;

  title = "THE F2E"
  term = "4th";
  content = "前端工程師和介面設計師，攜手合作拿獎金";
  subContent = "羨慕別人的酷酷網頁動畫？滿足不了同事的許願？動畫技能樹太雜無從下手？"
  attendInfo = [1158, 1052, 41];
  bounty = [
    { prize: "個人獎", reward: "$3,000" },
    { prize: "團體獎", reward: "$10,000" }
  ]

  enabledPaperAnimate = false;
  showCompleteBoardPage = false;

  constructor(
    private commonService: CommonService,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.initAnimate();
  }

  initAnimate() {
    this.enabledPaperAnimate = true;
  }

  getMaskStage(stage: number) {
    switch (stage) {
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

  paperAnimateFinish() {
    this.enabledPaperAnimate = false;
    this.showCompleteBoardPage = true;
    this.commonService.setStatus('onBoardLeave');
  }
}