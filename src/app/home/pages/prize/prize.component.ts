import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
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
    if (this.commonService.isFirstTimeHere() && this.commonService.getIndex() === 11) {
      this.renderer.addClass(this.prizeItem1.nativeElement, 'animate__fadeInDownBig'); this.prizeInfo[0].hide = false;
      setTimeout(() => { this.renderer.addClass(this.prizeItem2.nativeElement, 'animate__fadeInDownBig'); this.prizeInfo[1].hide = false; }, 200);
      setTimeout(() => { this.renderer.addClass(this.prizeItem3.nativeElement, 'animate__fadeInDownBig'); this.prizeInfo[2].hide = false; }, 400);
    }
  }

}
