import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ItemPage } from '../item/item';
import { FormPage } from '../form/form';
import { MenuPage } from "../menu/menu";
import { RecommendationsPage } from "../recommendations/recommendations";
import { CheckoutPage } from '../checkout/checkout';
import { AdminPage } from "../admin/admin";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {

  private adminCount: number;

  ionViewDidEnter() {
    this.adminCount = 0;
  }

  constructor(public navCtrl:NavController) {
    this.adminCount = 0;
  }

  openFullMenu() {
    this.navCtrl.push(MenuPage);
  }

  openForm() {
    this.navCtrl.push(FormPage);
  }

  openItemPage() {
    this.navCtrl.push(ItemPage);
  }

  openRecommendationsPage() {
    this.navCtrl.push(RecommendationsPage);
  }

  openCheckoutPage() {
    this.navCtrl.push(CheckoutPage);
  }

  openAdminPage() {
    this.adminCount++;
    if (this.adminCount >= 10) {
      this.adminCount = 0;
      this.navCtrl.push(AdminPage);
    }
  }
}
