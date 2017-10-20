import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {NavParams} from "ionic-angular/index";
import {ItemPage} from "../item/item";
import { ItemService } from "../../providers/item-service/item-service"

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
  providers: [ItemService]
})

@Component({
  template: `
    <ion-header>
      <ion-navbar>
        <ion-title>Navigation</ion-title>
      </ion-navbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <button ion-item *ngFor="let item of items" (click)="openItemPage(item)" icon-start>
          <ion-icon [name]="'logo-' + item.icon" [ngStyle]="{'color': item.color}" item-start></ion-icon>
          {{ item.name }}
        </button>
      </ion-list>
    </ion-content>
  `
})
export class MenuPage {
  items = [];

  constructor(public nav: NavController, public itemService: ItemService) {

    this.itemService.getAllItems()
      .then(data => {
        this.items = data;
        console.log(this.items);
      });

    //this.items = [
    //  {
    //    'name': 'Cup of Jamaican Joe',
    //    'description': 'The cup of Jamaican Joe is our rendition of the classic cup ',
    //    'jslImage': '',
    //    'itemImage': '',
    //    'caffeine': true,
    //    'modifiers': '',
    //    'size:': 'List(String)'
    //  },
    //  {
    //    'name': 'Cup of Jamaican Joe Decaffeinated',
    //    'description': 'The cup of Jamaican Joe is our rendition of the classic cup with no caffeine',
    //    'jslImage': '',
    //    'itemImage': '',
    //    'caffeine': false,
    //    'modifiers': '',
    //    'size:': 'List(String)'
    //  },
    //]
  }

  openItemPage(item) {
    //noinspection TypeScriptValidateTypes
    this.nav.push(ItemPage, { item: item });
  }

}
