import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ItemService {

  data: any;

  allConsumablesUrl = 'http://localhost:3000/consumables/get/all';

  constructor(public http: Http) {
    console.log('Hello ItemServiceProvider Provider');
  }

  getAllItems() {
    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {
      //noinspection TypeScriptUnresolvedFunction
      this.http.get(this.allConsumablesUrl)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data.data;
          resolve(this.data);
        });
    });
  }


}
