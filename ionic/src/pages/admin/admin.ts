import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ItemPage } from '../item/item';
import { FormPage } from '../form/form';
import { MenuPage } from "../menu/menu";
import { RecommendationsPage } from "../recommendations/recommendations";
import { CheckoutPage } from '../checkout/checkout';
import { UrlService } from '../../providers/url-service/url-service';
import { AlertController } from "ionic-angular/index";
import { ItemService } from "../../providers/item-service/item-service";
import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';


@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html'
})


export class AdminPage {

  constructor(public navCtrl:NavController, public toastCtrl:ToastController, public loadingCtrl:LoadingController, public itemService:ItemService, public urlService:UrlService, public alertCtrl:AlertController) {
  }

  showPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Change API Hostname',
      message: "Enter the URL of the API Hostname",
      inputs: [
        {
          name: 'URL',
          placeholder: 'https://localhost:3000'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.changeHost(data.URL);
            console.log(data);
          }
        }
      ]
    });
    prompt.present();
  }

  authenticateApp() {
    let prompt = this.alertCtrl.create({
      title: 'Authenticate App',
      message: "Enter username and password",
      inputs: [
        {
          name: 'username',
          placeholder: 'Username'
        },
        {
          name: 'password',
          placeholder: 'Password',
          type: 'password'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Authenticate',
          handler: data => {
            this.urlService.authenticate(data.username, data.password);
          }
        }
      ]
    });
    prompt.present();
  }

  changeHost(host) {
    this.urlService.changeHost(host);
    this.urlService.checkConnection();
  }

  updateItems() {
    if (this.urlService.isLoggedIn()) {

      this.itemService.refreshAllItems()
        .then(data => {
          if (data) {
            let toast = this.toastCtrl.create({
              message: 'Successfully updated items!',
              duration: 3000,
              position: 'bottom'
            });
            toast.present();
          } else {
            let toast = this.toastCtrl.create({
              message: 'Could not update items',
              duration: 3000,
              position: 'bottom'
            });
            toast.present();
          }
        });
    }
  }
}
