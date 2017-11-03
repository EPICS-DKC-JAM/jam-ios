import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {NavParams} from "ionic-angular/index";
import { CheckoutService } from '../../providers/checkout-service/checkout-service'

@Component({
  selector: 'page-item',
  templateUrl: 'item.html'
})

export class ItemPage {

  sizeOpts: {title: string, subTitle: string}
  modifierOpts: {title: string, subTitle: string}
  caffeineOpts: {title: string, subTitle: string}
  item = {};
  answers: {itemName: string, size: string, modifiers: string[], caffeine: string, price: number};

  constructor(public navCtrl:NavController, navParams:NavParams, public checkoutService: CheckoutService) {
    this.item = navParams.data.item;

    // options for size
    this.sizeOpts = {
      title: 'Size',
      subTitle: 'Select a size!'
    };

    // options for modifiers
    this.modifierOpts = {
      title: 'Modifiers',
      subTitle: 'Select a modifier!'
    };

    // options for caffeination
    this.caffeineOpts = {
      title: 'Caffeination',
      subTitle: 'Select the caffeine level!'
    };

    // SELECTED OPTIONS
    this.answers = {
      itemName: navParams.data.item.name,
      size: '',
      modifiers: [],
      caffeine: '',
      price: navParams.data.item.price
    };
  }

  addToCart(item) {
    this.checkoutService.addItem(item)
  }
}
