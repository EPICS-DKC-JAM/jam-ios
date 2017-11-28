import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {ItemPage} from "../item/item";

@Component({
  selector: 'page-recommendations',
  templateUrl: 'recommendations.html'
})

export class RecommendationsPage {

  numFullMatches: Number;
  numPartialMatches: Number;
  fullMatches = [];
  partialMatches = [];


  constructor(public navCtrl:NavController, public navParams:NavParams) {
    this.numFullMatches = navParams.data.numFullMatches;
    this.numPartialMatches = navParams.data.numPartialMatches;
    this.fullMatches = navParams.data.fullMatches;
    this.partialMatches = navParams.data.partialMatches;
  }

  openItemPage(item) {
    this.navCtrl.push(ItemPage, {item: item});
  }

}
