import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {ItemPage} from "../item/item";
import { CheckoutPage } from '../checkout/checkout';
import { ItemService } from "../../providers/item-service/item-service"

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})

export class MenuPage {

  items = [];
  hotItems = [];
  coldItems = [];
  blendedItems = [];

  constructor(public nav: NavController, public itemService: ItemService) {

    this.itemService.getAllItems()
      .then(data => {
        this.items = data;
        this.items.sort(function(a,b) {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        });
        console.log(this.items);
        for (var i = 0; i < this.items.length; i++) {
          switch (this.items[i].category) {
            case 'Hot':
              this.hotItems.push(this.items[i]);
              break;
            case 'Cold':
              this.coldItems.push(this.items[i]);
              break;
            case 'Blended':
              this.blendedItems.push(this.items[i]);
              break;
          }
        }
        console.log(this.hotItems);
        console.log(this.coldItems);
        console.log(this.blendedItems);
      });

  }

  openItemPage(item) {
    //noinspection TypeScriptValidateTypes
    this.nav.push(ItemPage, { item: item });
  }

  openCheckoutPage() {
    this.nav.push(CheckoutPage);
  }
}
