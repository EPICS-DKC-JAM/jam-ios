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

  recommendationsUrl = 'https://calm-meadow-62208.herokuapp.com/recommendations/1';

  constructor(public http:Http) {
    console.log('Hello RecommendationServiceProvider Provider');
  }

  data:any;

  getAllItems(answers) {
    return {
      _id: 24,
      name: "Caffe Latte",
      description: "Espresso and steamed milk, nothing beats this classic! Add flavors to taste",
      price: 4,
      jslImage: "https://www.deafcancoffee.com/images/portfolio/IMG_6369.JPG",
      itemImage: "https://www.deafcancoffee.com/images/portfolio/IMG_6369.JPG",
      caffeine: true,
      modifiers: [
        "mocha",
        "vanilla",
        "ice",
        "no ice"
      ],
      size: [
        "small",
        "medium",
        "large"
      ],
      __v: 0
    };
    //if (this.data) {
    //  return Promise.resolve(this.data);
    //}
    //
    //return new Promise(resolve => {
    //  //noinspection TypeScriptUnresolvedFunction
    //  this.http.get(this.recommendationsUrl)
    //    .map(res => res.json())
    //    .subscribe(data => {
    //      this.data = data.data;
    //      resolve(this.data);
    //    });
    //});
  }

}
