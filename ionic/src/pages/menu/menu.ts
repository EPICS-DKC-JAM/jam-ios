import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {NavParams} from "ionic-angular/index";
import {ItemPage} from "../item/item";
import { CheckoutPage } from '../checkout/checkout';
import { ItemService } from "../../providers/item-service/item-service"

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})

export class MenuPage {

  items = [];

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
