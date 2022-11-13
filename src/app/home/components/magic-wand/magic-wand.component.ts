import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-magic-wand',
  templateUrl: './magic-wand.component.html',
  styleUrls: ['./magic-wand.component.scss']
})
export class MagicWandComponent implements OnInit {
  lottieOptions: AnimationOptions = { path: 'assets/surprise/magic_wand.json' }

  constructor() { }

  ngOnInit(): void {
  }

}
