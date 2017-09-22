import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {NavParams} from "ionic-angular/index";

@Component({
  selector: 'page-item',
  templateUrl: 'item.html'
})

export class ItemPage {

  item = {};
  constructor(public navCtrl:NavController, navParams:NavParams) {
    this.item = navParams.data.item;
  //  this.item =
  //    {
  //      'name': 'Cup of Jamaican Joe',
  //      'description': 'The cup of Jamaican Joe is our rendition of the classic cup of Joe, one of the most popular drinks in the world. It has a slightly nutty, mellow flavor, as well as acidic, sweet, and winey nuances.',
  //      'jslImage': '',
  //      'itemImage': '',
  //      'caffeine': true,
  //      'modifiers': '',
  //      'size:': 'List(String)'
  //    }
  }
}
