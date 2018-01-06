import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from "ionic-angular/index";
import { CheckoutService } from '../../providers/checkout-service/checkout-service'
import { ImageService } from '../../providers/image-service/image-service'
import { CheckoutPage } from '../checkout/checkout';
import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { WheelSelector } from '@ionic-native/wheel-selector';


@Component({
  selector: 'page-item',
  templateUrl: 'item.html'
})

export class ItemPage {

  sizeOpts:{title: string, subTitle: string}
  modifierOpts:{title: string, subTitle: string}
  caffeineOpts:{title: string, subTitle: string}
  item: any;
  answers:{itemName: string, size: string, modifiers: string[], caffeine: string, price: number};

  wheelData = {
    numbers: [
      { description: "1" },
      { description: "2" },
      { description: "3" }
    ]
  };

  constructor(public navCtrl:NavController,
              public toastCtrl:ToastController,
              public loadingCtrl:LoadingController,
              public alertCtrl: AlertController,
              public checkoutService:CheckoutService,
              public imageService:ImageService,
              navParams:NavParams,
              public selector:WheelSelector) {
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

    this.selectQuantity();
  }

  addToCart(item) {
    /** Require the user to select a size **/
    if (item.size == "") {
      this.alertCtrl.create({
        title: "Oops!",
        message: "You must at least select a size.",
        buttons: [
          { text: 'OK' }
        ]
      }).present();
      return;
    }

    let loader = this.loadingCtrl.create({
      content: 'Adding ' + item.itemName + ' to cart...',
    });
    loader.present();

    setTimeout(() => {
      loader.dismiss();
      let finalItem = {
        name: this.item.name,
        description: this.item.description,
        price: this.item.price,
        size: this.answers.size,
        sizeOptions: this.item.size,
        modifiers: this.answers.modifiers,
        modifierOptions: this.item.modifiers
      };
      this.checkoutService.addItem(finalItem);
      this.toastCtrl.create({
        message: item.itemName + " added to cart!",
        duration: 2000,
        position: 'bottom'
      }).present();
    }, 500);
    this.addOrCheckout()
  }

  openCheckoutPage() {
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

  getImagePath(name) {
    return this.imageService.getImage(name);
  }

  selectQuantity() {


    this.selector.show({
      title: "How Many?",
      items: [
        this.wheelData.numbers
      ],
    }).then(
      result => {
        console.log(result[0].description + ' at index: ' + result[0].index);
      },
      err => console.log('Error: ', err)
    );
  }
}
