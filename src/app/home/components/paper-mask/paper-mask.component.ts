import { Component, ElementRef, Renderer2, OnInit, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-paper-mask',
  templateUrl: './paper-mask.component.html',
  styleUrls: ['./paper-mask.component.scss']
})
export class PaperMaskComponent implements OnInit, AfterViewInit {
  @ViewChild("paperTop") paperTop!: ElementRef;
  @ViewChild("paperRight") paperRight!: ElementRef;
  @ViewChild("paperLeft") paperLeft!: ElementRef;

  constructor(
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.animateStage1();
    setTimeout(() => {
      this.animateStage2();
      setTimeout(() => {
        this.animateStage3();
      }, 1000);
    }, 1000);
  }

  animateStage1() {
    this.renderer.addClass(this.paperTop.nativeElement, 'top-1');
  }

  animateStage2() {
    this.renderer.removeClass(this.paperTop.nativeElement, 'top-1');
    this.renderer.addClass(this.paperTop.nativeElement, 'top-2');

    this.renderer.addClass(this.paperRight.nativeElement, 'right-1');
    this.renderer.addClass(this.paperLeft.nativeElement, 'left-1');
  }

  animateStage3() {
    this.renderer.removeClass(this.paperLeft.nativeElement, 'left-1');
    this.renderer.addClass(this.paperLeft.nativeElement, 'left-2');
  }
}
