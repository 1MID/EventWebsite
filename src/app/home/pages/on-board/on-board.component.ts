import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-on-board',
  templateUrl: './on-board.component.html',
  styleUrls: ['./on-board.component.scss']
})
export class OnBoardComponent implements OnInit {

  title = "THE F2E"
  term = "4th";
  content = "前端工程師和介面設計師，攜手合作拿獎金";
  subContent = "羨慕別人的酷酷網頁動畫？滿足不了同事的許願？動畫技能樹太雜無從下手？"
  attendInfo = [1158, 1052, 41];
  bounty = [
    { prize: "個人獎", reward: "$3,000" },
    { prize: "團體獎", reward: "$10,000" }
  ]

  constructor() { }

  ngOnInit(): void {

  }

  // @HostListener("wheel", ["$event"])
  // public onScroll(event: any) {
  //   console.log(event.wheelDelta)
  //   event.preventDefault();
  // }

}
