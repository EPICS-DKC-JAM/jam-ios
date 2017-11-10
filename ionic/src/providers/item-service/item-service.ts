import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { UrlService } from '../url-service/url-service'
import { Storage } from '@ionic/storage';
import { AlertController } from "ionic-angular/index";
import { LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';

@Injectable()
export class ItemService {

  data:any;


  constructor(public http:Http, public loadingCtrl: LoadingController, public alertCtrl:AlertController, public urlService:UrlService, public storage:Storage) {
    // Check if in storage, if not, get from API
    storage.get('items').then((data) => {
      if (data) {
        console.log('Already in storage');
        this.data = data;
      } else {
        console.log('Not in storage');
        this.data = this.refreshAllItems();
      }
    });
  }


  refreshAllItems() {
    return new Promise(resolve => {
      var allConsumablesUrl = this.urlService.build('/consumables/get/all');

      let opt:RequestOptions;
      let headers:Headers = new Headers;
      opt = new RequestOptions({
        headers: headers
      });
      headers.set('x-access-token', this.urlService.getToken());

      let loader = this.loadingCtrl.create({
        content: 'Updating items...'
      });
      loader.present();

      //noinspection TypeScriptUnresolvedFunction
      this.http.get(allConsumablesUrl, opt)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data.data;
          this.storage.set("items", this.data);
          loader.dismiss();
          resolve(this.data);
        }, err => {
          let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: err,
            buttons: ['OK']
          });
          alert.present();
          loader.dismiss();
        });
    });
  }

  getAllItems() {
    if (this.data) {
      console.log('Already have');
      return Promise.resolve(this.data);
    } else {
      return this.refreshAllItems();
    }
  }
}

