import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {NavParams} from "ionic-angular/index";
import { CheckoutService} from "../../providers/checkout-service/checkout-service";

@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html'
})

export class CheckoutPage {

  items = [];
  constructor(public navCtrl:NavController, navParams:NavParams, public checkoutService:CheckoutService) {
    this.items = checkoutService.getCart()
  }

  findTotal() {
    let total = 0;
    this.items.forEach( (item) => {
      total += item.price;
    });

    return total.toFixed(2);
  }

  removeItem(item) {
    this.items = this.checkoutService.removeItem(item);
  }

  clearCart() {
    this.items = this.checkoutService.clearCart();
  }

  printCart() {
    console.log(this.items);
  }
}
