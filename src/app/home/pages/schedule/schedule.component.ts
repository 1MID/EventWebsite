import { Component, OnInit } from '@angular/core';
import { scheduleConfig } from './schedule.config';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  scheduleInfo = scheduleConfig;

  constructor(
  ) { }

  ngOnInit(): void {
  }


}
