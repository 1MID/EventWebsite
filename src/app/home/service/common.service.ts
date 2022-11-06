import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  // service
  public wheelEvent = new Subject();
  private _index: number = 0; // 當前索引
  private _preIndex: number = 0; // 前一個索引 記錄前一頁是在上或在下
  private _maxIndexBeen: number = 0; // 曾到過的最大索引

  constructor() { }

  increaseIndex() {
    this._preIndex = this._index;
    this._index++;
    this._maxIndexBeen = Math.max(this._index, this._maxIndexBeen);
    this.wheelEvent.next(this.getIndex());
  }

  decreaseIndex() {
    this._preIndex = this._index;
    this._index--;
    this.wheelEvent.next(this.getIndex());
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

  getPrevPageFromTop() { // 從上往下
    return this._preIndex < this._index;
  }
}
