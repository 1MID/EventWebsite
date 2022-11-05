import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-scroll-down',
  templateUrl: './scroll-down.component.html',
  styleUrls: ['./scroll-down.component.scss']
})
export class ScrollDownComponent implements OnInit {
  lottieOptions: AnimationOptions = { path: '../../../../assets/common/scroll_down.json' }

  constructor() { }

  ngOnInit(): void {
  }

}
