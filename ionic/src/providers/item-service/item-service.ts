import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { UrlService } from '../url-service/url-service'
import 'rxjs/add/operator/map';

@Injectable()
export class ItemService {

  data: any;


  constructor(public http: Http, public urlService: UrlService) {
    console.log('Hello ItemServiceProvider Provider');
  }

  getAllItems() {
    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {
      var allConsumablesUrl = this.urlService.build('/consumables/get/all');
      //noinspection TypeScriptUnresolvedFunction
      this.http.get(allConsumablesUrl)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data.data;
          resolve(this.data);
        });
    });
  }


}
