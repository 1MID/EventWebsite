import { ElementRef, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  // service
  public wheelEvent = new Subject();

  public disabledWheelEvent = true; // 禁用原始滑動  :非測試時為true:
  private _index: number = 0; // 當前索引  :非測試時為0:
  private _maxIndexBeen: number = 0; // 曾到過的最大索引
  private _surpriseCardFinish = false;
  private _disabledModifyIndex = true; // 禁止索引值增加或減少

  constructor() { }

  increaseIndex() {
    if (!this.canIncrease()) { return };
    this._index++;
    this._maxIndexBeen = Math.max(this._index, this._maxIndexBeen);
    this.wheelEvent.next(this.getIndex());
  }

  decreaseIndex() {
    if (!this.canDecrease()) { return };
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
    // console.log('當前索引', this.getIndex())
    const el = document.getElementById('scrollItem' + this.getIndex());
    el?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }

  thisElementInScreen(el: ElementRef) {
    const distance = el.nativeElement.getBoundingClientRect().top;
    const eleHeight = el.nativeElement.getBoundingClientRect().height;
    const halfEleHeight = eleHeight / 2;

    const isMobileSize = window.innerWidth < 767;
    const isTabletSize = window.innerWidth < 1280;

    if (isMobileSize) { return (distance * 1.4 > -halfEleHeight) && (distance * 1.4 < eleHeight); }
    else if (isTabletSize) { return (distance * 0.7 > -halfEleHeight) && (distance * 0.7 < eleHeight); }
    else { return (distance > -halfEleHeight) && (distance < eleHeight); }
  }

  surpriseCardFinish() {
    this._surpriseCardFinish = true;
  }

  disabledModifyIndex() {
    this._disabledModifyIndex = true;
  }

  enabledModifyIndex() {
    this._disabledModifyIndex = false;
  }

  private canIncrease() {
    if (this._disabledModifyIndex) { return false };
    if ((this._index + 1 > 12) && !this._surpriseCardFinish) { return false }; // 未跑完surprise卡片
    if (this._index + 1 > 17) { return false }; // 超過最大索引

    return true;
  }

  private canDecrease() {
    if (this._disabledModifyIndex) { return false };
    if (this._index - 1 < 5) { return false };

    return true;
  }
}
