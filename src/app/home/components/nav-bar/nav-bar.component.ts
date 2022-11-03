import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  navItem: string[] = ['關卡任務', '競賽說明']

  constructor() { }

  ngOnInit(): void {
  }

}
