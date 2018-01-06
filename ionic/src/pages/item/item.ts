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

  sizeChoice: any;
  modifierChoice: Array<any>;

  item: any;
  wheelData: any;

  answers:{itemName: string, size: {}, modifiers: {name: string, price:number}[], caffeine: string, price: number};
  constructor(public navCtrl:NavController,
              public toastCtrl:ToastController,
              public loadingCtrl:LoadingController,
              public alertCtrl: AlertController,
              public checkoutService:CheckoutService,
              public imageService:ImageService,
              navParams:NavParams,
              public selector:WheelSelector) {
    this.item = navParams.data.item;

    this.wheelData = {
      numbers: [
        { description: "1" },
        { description: "2" },
        { description: "3" }
      ]
    };

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
    // this.answers = {};
    // this.answers.itemName = navParams.data.item.name;
    // this.answers.price = navParams.data.item.price;
    this.answers = {
      itemName: navParams.data.item.name,
      size: navParams.data.item.size[0],
      modifiers: [],
      caffeine: '',
      price: navParams.data.item.price
    };

    this.sizeChoice = this.item.size[0];
    this.modifierChoice = new Array();

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

    let selectModifiers = new Array();
    for (var i = 0; i < this.modifierChoice.length; i++) {
      selectModifiers.push(this.modifierChoice[i].name);
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
        price: this.answers.price,
        size: this.sizeChoice.name,
        sizeOptions: this.item.size,
        modifiers: selectModifiers,
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

  updatePrice() {
    let totalPrice = this.item.price;
    if (this.sizeChoice) {
      totalPrice += Number(this.sizeChoice.price);
    }
    for (var i = 0; i < this.modifierChoice.length; i++) {
      totalPrice += Number(this.modifierChoice[i].price);
    }
    var priceBox = document.getElementById("priceBox");
    this.answers.price = totalPrice;
    priceBox.textContent = "$" + totalPrice;
  }

  compareFn(a: any, b: any) {
    return a.name == b.name;
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
