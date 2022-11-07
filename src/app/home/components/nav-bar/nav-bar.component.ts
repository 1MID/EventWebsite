import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  navItem = [
    { title: '關卡任務', href: 'https://2022.thef2e.com/news' },
    { title: '競賽說明', href: 'https://2022.thef2e.com/news/week1' }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
