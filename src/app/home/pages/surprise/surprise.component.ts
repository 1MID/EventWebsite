import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CommonService } from '../../service/common.service';

@Component({
  selector: 'app-surprise',
  templateUrl: './surprise.component.html',
  styleUrls: ['./surprise.component.scss']
})
export class SurpriseComponent implements OnInit {
  @ViewChild("scrollItem13") scrollItem13!: ElementRef;
  @ViewChild("scrollItem14") scrollItem14!: ElementRef;
  @ViewChild("scrollItem15") scrollItem15!: ElementRef;
  @ViewChild("scrollItem16") scrollItem16!: ElementRef;

  showUnrevealed: boolean = false;
  surpriseCardFinish = false;

  constructor(
    private renderer: Renderer2,
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
  }

  showUnrevealedInfo(): void {
    this.showUnrevealed = true;

    setTimeout(() => {
      this.renderer.addClass(this.scrollItem13.nativeElement, 'animate__fadeIn');
      this.renderer.addClass(this.scrollItem13.nativeElement, 'animate__slow');
      this.renderer.addClass(this.scrollItem13.nativeElement, 'show-card');
      this.commonService.scrollToTargetIndex(13);
    }, 500);

    setTimeout(() => {
      this.renderer.addClass(this.scrollItem14.nativeElement, 'animate__fadeIn');
      this.renderer.addClass(this.scrollItem14.nativeElement, 'animate__slow');
      this.renderer.addClass(this.scrollItem14.nativeElement, 'show-card');
      this.commonService.scrollToTargetIndex(14);
    }, 1000);

    setTimeout(() => {
      this.renderer.addClass(this.scrollItem15.nativeElement, 'animate__fadeIn');
      this.renderer.addClass(this.scrollItem15.nativeElement, 'animate__slow');
      this.renderer.addClass(this.scrollItem15.nativeElement, 'show-card');
      this.commonService.scrollToTargetIndex(15);
    }, 1500);

    setTimeout(() => {
      this.renderer.addClass(this.scrollItem16.nativeElement, 'animate__fadeIn');
      this.renderer.addClass(this.scrollItem16.nativeElement, 'animate__slow');
      this.renderer.addClass(this.scrollItem16.nativeElement, 'show-card');
      this.commonService.scrollToTargetIndex(16);
      this.commonService.surpriseCardFinish();
      this.surpriseCardFinish = true;
    }, 2000);

  }
}
