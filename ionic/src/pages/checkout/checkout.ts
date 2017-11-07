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
    this.items = [
      {
        itemName: 'Cup of Jamaican Joe',
        size: 'Small',
        modifiers: ['Vanilla', 'Hazlenut'],
        caffeine: 'Regular',
        price: 4.99
      },
      {
        itemName: 'Cafe Latte',
        size: 'Medium',
        modifiers: ['Vanilla', 'Double Shot'],
        caffeine: 'Decaf',
        price: 3.99
      },
      {
        itemName: 'Cup of Jamaican Joe',
        size: 'Small',
        modifiers: ['Vanilla', 'Hazlenut'],
        caffeine: 'Regular',
        price: 4.99
      },
      {
        itemName: 'Cup of Jamaican Joe',
        size: 'Small',
        modifiers: ['Vanilla', 'Hazlenut'],
        caffeine: 'Regular',
        price: 4.99
      },
      {
        itemName: 'Cup of Jamaican Joe',
        size: 'Small',
        modifiers: ['Vanilla', 'Hazlenut'],
        caffeine: 'Regular',
        price: 4.99
      },
    ]
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
