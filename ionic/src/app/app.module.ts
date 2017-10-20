import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { ItemPage } from '../pages/item/item';
import { FormPage } from '../pages/form/form';
import { MenuPage } from '../pages/menu/menu';
import { RecommendationsPage } from '../pages/recommendations/recommendations';
import { HttpModule } from '@angular/http';



import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ItemService } from '../providers/item-service/item-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ItemPage,
    FormPage,
    MenuPage,
    RecommendationsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ItemPage,
    FormPage,
    MenuPage,
    RecommendationsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ItemService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
