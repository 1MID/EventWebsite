import { Injectable } from '@angular/core';
import { tap, throttleTime } from 'rxjs/operators';
import { fromEvent, Subscription } from 'rxjs';
import { Star } from './mouse-effect.class';

@Injectable({
  providedIn: 'root'
})
export class MouseEffectService {
  eventSub: Subscription | undefined;
  stars: any[] = [];

  constructor() { }

  init() {
    this.eventSub = fromEvent(window, 'mousemove')
      .pipe(
        throttleTime(30),
        tap((e: any) => {
          const cursor = { x: e.clientX, y: e.clientY };
          this.addStar(cursor.x, cursor.y);
        })
      ).subscribe();

    this.loop();
  }

  destroy() {
    this.eventSub?.unsubscribe();
  }

  private addStar(x: number, y: number) {
    var star = new Star();
    star.init(x, y);
    this.stars.push(star);
  }

  private updateStars() {
    if (!this.stars.length) { return; };

    // Updated
    for (var i = 0; i < this.stars.length; i++) {
      this.stars[i].update();
    }

    // Remove dead stars
    for (var i = this.stars.length - 1; i >= 0; i--) {
      if (this.stars[i].lifeSpan < 0) {
        this.stars[i].die();
        this.stars.splice(i, 1);
      }
    }
  }

  private loop() {
    window.requestAnimationFrame(() => this.loop());
    this.updateStars();
  }

}
