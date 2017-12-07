import { Component } from '@angular/core';
import {NavController, ViewController} from 'ionic-angular';
import { NavParams } from "ionic-angular/index";
import { CheckoutService } from '../../providers/checkout-service/checkout-service'
import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-item',
  templateUrl: 'edit.html'
})

export class EditPage {

  oldItem: any;
  newItem: any;

  constructor(public navCtrl:NavController,
              public viewCtrl:ViewController,
              public toastCtrl:ToastController,
              public loadingCtrl:LoadingController,
              public alertCtrl: AlertController,
              public checkoutService:CheckoutService,
              navParams:NavParams) {
    this.oldItem = navParams.data;
    this.newItem = JSON.parse(JSON.stringify(this.oldItem)); // deep copy
  }

  save() {
    this.checkoutService.editItem(this.oldItem, this.newItem);
    this.viewCtrl.dismiss();
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

}
