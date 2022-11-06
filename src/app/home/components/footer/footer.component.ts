import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  block1ImgSrc = ['assets/footer/1.png', 'assets/footer/2.png', 'assets/footer/3.png', 'assets/footer/4.png']
  block2ImgSrc = ['assets/footer/a.png', 'assets/footer/b.png', 'assets/footer/c.png']
  constructor() { }

  ngOnInit(): void {
  }

}
