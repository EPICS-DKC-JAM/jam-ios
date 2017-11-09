import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { UrlService } from '../url-service/url-service'
import { Storage } from '@ionic/storage';
import { AlertController } from "ionic-angular/index";
import 'rxjs/add/operator/map';

@Injectable()
export class ItemService {

  data:any;


  constructor(public http:Http, public alertCtrl:AlertController, public urlService:UrlService, public storage:Storage) {
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

      let opt:RequestOptions
      let headers:Headers = new Headers
      headers.set('Content-type', 'application/json')
      opt = new RequestOptions({
        headers: headers
      });

      headers.set('x-access-token', this.urlService.getToken());

      console.log(headers);
      //noinspection TypeScriptUnresolvedFunction
      this.http.get(allConsumablesUrl, opt)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data.data;
          this.storage.set("items", this.data);
          resolve(this.data);
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

