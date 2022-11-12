import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, AfterViewInit {
  @ViewChild("menu") menu!: ElementRef;
  showMenu = false;

  navItem = [
    { title: '關卡任務', href: 'https://2022.thef2e.com/news' },
    { title: '競賽說明', href: 'https://2022.thef2e.com/news/week1' }
  ]

  get menuImgSrc() {
    return !this.showMenu ? 'assets/common/menu.png' : 'assets/common/close.png'
  }

  constructor(
    private renderer: Renderer2,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.renderer.addClass(this.menu.nativeElement, 'animate__fadeOut')
  }

  menuOnClick(e: any) {
    e.preventDefault();
    this.showMenu = !this.showMenu;

    if (this.showMenu) {
      this.renderer.removeClass(this.menu.nativeElement, 'animate__fadeIn')
      this.renderer.removeClass(this.menu.nativeElement, 'animate__fadeOut')
      this.renderer.addClass(this.menu.nativeElement, 'animate__fadeIn')
    } else {
      this.renderer.removeClass(this.menu.nativeElement, 'animate__fadeIn')
      this.renderer.removeClass(this.menu.nativeElement, 'animate__fadeOut')
      this.renderer.addClass(this.menu.nativeElement, 'animate__fadeOut')
    }
  }
}
