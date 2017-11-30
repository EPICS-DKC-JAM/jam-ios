import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from "ionic-angular/index";
import { CheckoutService } from '../../providers/checkout-service/checkout-service'
import { CheckoutPage } from '../checkout/checkout';
import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-item',
  templateUrl: 'item.html'
})

export class ItemPage {

  sizeOpts:{title: string, subTitle: string}
  modifierOpts:{title: string, subTitle: string}
  caffeineOpts:{title: string, subTitle: string}
  item = {};
  answers:{itemName: string, size: string, modifiers: string[], caffeine: string, price: number};

  constructor(public navCtrl:NavController,
              public toastCtrl:ToastController,
              public loadingCtrl:LoadingController,
              public alertCtrl: AlertController,
              public checkoutService:CheckoutService,
              navParams:NavParams) {
    console.log(this.navCtrl.getViews());
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
    let loader = this.loadingCtrl.create({
      content: 'Adding ' + item.itemName + ' to cart...',
    });
    loader.present();

    setTimeout(() => {
      loader.dismiss();
      this.checkoutService.addItem(item);
      let toast = this.toastCtrl.create({
        message: item.itemName + " added to cart!",
        duration: 2000,
        position: 'bottom'
      });
      toast.present();
    }, 500);
    this.addOrCheckout()
  }

  openCheckoutPage() {
    this.navCtrl.popToRoot();
    this.navCtrl.push(CheckoutPage)
  }

  addOrCheckout() {
    let decision = this.alertCtrl.create({
      title: 'Where to next?',
      message: 'Would you like to add more items or checkout now?',
      buttons: [
        {
          text: 'Add more items.',
          handler: () => {
            this.navCtrl.pop();
            //console.log('Disagree clicked');
          }
        },
        {
          text: 'Go to checkout.',
          handler: () => {
            this.openCheckoutPage();
            //console.log('Agree clicked');
          }
        }
      ]
    });
    decision.present();
  }
}
