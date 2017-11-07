import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ItemPage } from '../item/item';
import { FormPage } from '../form/form';
import { MenuPage } from "../menu/menu";
import {RecommendationsPage} from "../recommendations/recommendations";
import { CheckoutPage } from '../checkout/checkout';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {

  constructor(public navCtrl:NavController) {

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
}
