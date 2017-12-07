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
import { CheckoutPage } from '../pages/checkout/checkout'
import { EditPage } from'../pages/edit/edit'


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ItemService } from '../providers/item-service/item-service';
import { RecommendationService } from '../providers/recommendation-service/recommendation-service';
import { CheckoutService } from '../providers/checkout-service/checkout-service';
import { UrlService } from '../providers/url-service/url-service';
import { AdminPage } from '../pages/admin/admin'
import { IonicStorageModule } from '@ionic/storage';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ItemPage,
    FormPage,
    MenuPage,
    RecommendationsPage,
    CheckoutPage,
    AdminPage,
    EditPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ItemPage,
    FormPage,
    MenuPage,
    RecommendationsPage,
    CheckoutPage,
    AdminPage,
    EditPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ItemService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RecommendationService,
    CheckoutService,
    UrlService,
  ]
})
export class AppModule {}
