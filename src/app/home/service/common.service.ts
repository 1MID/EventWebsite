import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private _status: string[] = [];

  constructor() { }

  setStatus(status: string) {
    this._status.push(status);
  }

  removeStatus(status: string) {
    this._status = this._status.filter(item => item !== status);
  }

  getStatus() {
    return this._status;
  }

}
