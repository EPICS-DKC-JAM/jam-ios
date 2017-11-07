import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ItemPage } from '../item/item';
import { FormPage } from '../form/form';
import { MenuPage } from "../menu/menu";
import { RecommendationsPage } from "../recommendations/recommendations";
import { CheckoutPage } from '../checkout/checkout';
import { UrlService } from '../../providers/url-service/url-service';
import { AlertController } from "ionic-angular/index";
import { ItemService } from "../../providers/item-service/item-service"

@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html'
})


export class AdminPage {

  constructor(public navCtrl:NavController, public itemService: ItemService, public urlService:UrlService, public alertCtrl:AlertController) {

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

  changeHost(host) {
    this.urlService.changeHost(host);
  }

  updateItems() {
    this.itemService.refreshAllItems();
  }
}
