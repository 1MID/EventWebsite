import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  // service
  public wheelEvent = new Subject();

  public disabledWheelEvent = true; // 禁用原始滑動，!!正式版為true!!
  private _index: number = 0; // 當前索引，!!正式版起始值為0!!
  private _maxIndexBeen: number = 0; // 曾到過的最大索引

  constructor() { }

  increaseIndex() {
    if (this._index + 1 > 17) { return };
    this._index++;
    this._maxIndexBeen = Math.max(this._index, this._maxIndexBeen);
    this.wheelEvent.next(this.getIndex());
  }

  decreaseIndex() {
    if (this._index - 1 < 5) { return };
    this._index--;
    this.wheelEvent.next(this.getIndex());
  }

  scrollToTargetIndex(index: number) {
    this._index = index;
    this.wheelEvent.next(this.getIndex());
    this.scrollToCurElement();
  }

  getIndex() {
    return this._index;
  }

  getMaxIndex() {
    return this._maxIndexBeen;
  }

  isFirstTimeHere() {
    return this._index === this._maxIndexBeen;
  }

  scrollToCurElement() {
    console.log('當前索引', this.getIndex())
    const el = document.getElementById('scrollItem' + this.getIndex());
    el?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }
}
