import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './home/components/nav-bar/nav-bar.component';
import { OnBoardComponent } from './home/pages/on-board/on-board.component';
import { PaperMaskComponent } from './home/pages/on-board/paper-mask/paper-mask.component';
import { LevelComponent } from './home/pages/level/level.component';
import { LevelItemComponent } from './home/pages/level/level-item/level-item.component';
import { ScrollDownComponent } from './home/components/scroll-down/scroll-down.component';
import { ScheduleComponent } from './home/pages/schedule/schedule.component';
import { PrizeComponent } from './home/pages/prize/prize.component';

export function playerFactory() {
  return player;
}
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    OnBoardComponent,
    PaperMaskComponent,
    LevelComponent,
    LevelItemComponent,
    ScrollDownComponent,
    ScheduleComponent,
    PrizeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LottieModule.forRoot({ player: playerFactory })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
