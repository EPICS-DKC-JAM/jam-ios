import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {ItemPage} from "../item/item";

@Component({
  selector: 'page-recommendations',
  templateUrl: 'recommendations.html'
})

export class RecommendationsPage {

  items = [];

  constructor(public navCtrl:NavController, public navParams:NavParams) {
    this.items = navParams.data.items;
  }

  openItemPage(item) {
    this.navCtrl.push(ItemPage);
    //this.nav.push(ItemPage, { item: item });
  }

}
