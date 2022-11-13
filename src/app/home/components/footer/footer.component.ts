import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  block1ImgSrc = ['assets/footer/mobile/1.png', 'assets/footer/mobile/2.png', 'assets/footer/mobile/3.png', 'assets/footer/mobile/4.png']
  block2ImgSrc = [
    { src: 'assets/footer/a.png', url: 'https://blockstudio.tw/' },
    { src: 'assets/footer/b.png', url: 'https://www.kdanmobile.com/zh-tw' },
    { src: 'assets/footer/c.png', url: 'https://titansoft.com/tw' }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
