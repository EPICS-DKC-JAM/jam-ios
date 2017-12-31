import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UrlService } from '../../providers/url-service/url-service';
import { AlertController } from "ionic-angular/index";
import { ItemService } from "../../providers/item-service/item-service";
import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { ImageService } from '../../providers/image-service/image-service';
import {RecommendationService} from "../../providers/recommendation-service/recommendation-service";


@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html'
})


export class AdminPage {

  constructor(public navCtrl:NavController, public toastCtrl:ToastController, public loadingCtrl:LoadingController, public itemService:ItemService, public urlService:UrlService, public alertCtrl:AlertController, public imageService:ImageService, public recommendationService:RecommendationService) {
  }

  showPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Change API Hostname',
      message: "Enter the URL of the API Hostname",
      inputs: [
        {
          name: 'URL',
          placeholder: 'https://localhost:3000',
          value: 'https://calm-meadow-62208.herokuapp.com'
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
          placeholder: 'Username',
          value: 'blake'
        },
        {
          name: 'password',
          placeholder: 'Password',
          type: 'password',
          value: 'ilovedeafcancoffee'
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
      this.recommendationService.refreshAllQuestions()
        .then( data => {
          if (data) {
            let toast = this.toastCtrl.create({
              message: 'Successfully updated questions!',
              duration: 3000,
              position: 'bottom'
            });
            toast.present();
          } else {
            let toast = this.toastCtrl.create({
              message: 'Could not update questions',
              duration: 3000,
              position: 'bottom'
            });
            toast.present();
          }
        });
      this.recommendationService.refreshAllAnswers()
        .then( data => {
          if (data) {
            let toast = this.toastCtrl.create({
              message: 'Successfully updated answers!',
              duration: 3000,
              position: 'bottom'
            });
            toast.present();
          } else {
            let toast = this.toastCtrl.create({
              message: 'Could not update answers',
              duration: 3000,
              position: 'bottom'
            });
            toast.present();
          }
        });
    }
  }

  downloadImages() {
    this.imageService.downloadImages();
  }
}
