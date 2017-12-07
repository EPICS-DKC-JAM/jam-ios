import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the CheckoutService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class CheckoutService {

  items = [];

  constructor(public http: Http) {
    console.log('Hello CheckoutService Provider');
  }

  getCart() {
    return this.items;
  }

  addItem(item) {
    this.items.push(item)
    return this.items;
  }

  editItem(oldItem, newItem) {
    var index = this.items.indexOf(oldItem, 0);
    if (index > -1) {
      this.items[index] = newItem;
    }
    return this.items;
  }

  removeItem(item) {
    var index = this.items.indexOf(item, 0);
    if (index > -1) {
      this.items.splice(index, 1);
    }
    return this.items;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }
}
