import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the RecommendationServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class RecommendationServiceProvider {

  recommendationsUrl = 'http://localhost:3000/consumables/get/all';

  constructor(public http: Http) {
    console.log('Hello RecommendationServiceProvider Provider');
  }

  data: any;

  getAllItems() {
    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {
      //noinspection TypeScriptUnresolvedFunction
      this.http.get(this.recommendationsUrl)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data.data;
          resolve(this.data);
        });
    });
  }

}
