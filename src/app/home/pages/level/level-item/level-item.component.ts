import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-level-item',
  templateUrl: './level-item.component.html',
  styleUrls: ['./level-item.component.scss']
})
export class LevelItemComponent implements OnInit {
  @Input() item: any;
  @Input() show: boolean = false;
  @Input() showScrollHint: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  openLinkTo(url: string) {
    window.open(url, '_blank');
  }

}
