import {Component, ViewChild} from '@angular/core';
import {ModalController, NavController, Navbar, LoadingController} from 'ionic-angular';
import { CheckoutService} from "../../providers/checkout-service/checkout-service";
import {EditPage} from "../edit/edit";
import {HomePage} from "../home/home";

@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html'
})

export class CheckoutPage {

  @ViewChild(Navbar) navBar: Navbar;
  items = [];

  constructor(public navCtrl: NavController,
              public checkoutService: CheckoutService,
              public loadingCtrl: LoadingController,
              public modalCtrl: ModalController) {
    this.items = checkoutService.getCart()
    console.log(this.items);
  }

  ionViewDidEnter() {
    console.log("DidEnter");
    this.navBar.backButtonClick = (e:UIEvent)=>{
      this.navCtrl.setRoot(HomePage);
      this.navCtrl.popToRoot();
    }
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
