import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-recommendations',
  templateUrl: 'recommendations.html'
})

export class RecommendationsPage {

    items;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.items = navParams.data.items[0]; 
    }

}
