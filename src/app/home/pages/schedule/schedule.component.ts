import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  blockInfo = [
    [
      { title: '開始報名', isFocus: true, content: '10/13(四) 早上 11:00 至 11/6(日) 晚上 23:59' },
      { title: '開賽', isFocus: false, content: 'UI組、團體組開賽 10/31 前端組開賽 11 /7' },
      { title: '登陸作品', isFocus: false, content: '10/31(一) 中午 12:00 至 11/28(一) 中午 12:00' },
      { title: '線上直播', isFocus: false, content: '11/3 至 11/24(每週四)' }
    ],
    [
      { title: '初選', isFocus: true, content: '12/05(五)' },
      { title: '決選', isFocus: false, content: '12/05(五)' }
    ]
  ]

  details = [
    "初選：將由六角學院前端、UI 評審進行第一波篩選，並於 12/5（五）公布初選佳作名單。",
    "決選：由三大企業針對該企業主題進行入圍獎最後篩選，並於 12/23（五）公布企業得獎名單。"
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
