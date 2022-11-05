import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './home/components/nav-bar/nav-bar.component';
import { OnBoardComponent } from './home/pages/on-board/on-board.component';
import { PaperMaskComponent } from './home/components/paper-mask/paper-mask.component';
import { LevelComponent } from './home/pages/level/level.component';
import { LevelItemComponent } from './home/pages/level/level-item/level-item.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    OnBoardComponent,
    PaperMaskComponent,
    LevelComponent,
    LevelItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
