import { Component } from '@angular/core';
import {ModalController, NavController} from 'ionic-angular';
import {NavParams} from "ionic-angular/index";
import { CheckoutService} from "../../providers/checkout-service/checkout-service";
import {EditPage} from "../edit/edit";

@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html'
})

export class CheckoutPage {

  items = [];
  constructor(public navCtrl:NavController,
              public navParams:NavParams,
              public checkoutService:CheckoutService,
              public modalCtrl: ModalController) {
    this.items = checkoutService.getCart()
    console.log(this.items);
  }

  findTotal() {
    let total = 0;
    this.items.forEach( (item) => {
      total += item.price;
    });

    return total.toFixed(2);
  }

  editItem(item) {
    let itemModal = this.modalCtrl.create(EditPage, item);
    itemModal.onDidDismiss(data => {
      this.items = this.checkoutService.getCart();
    });
    itemModal.present();
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
