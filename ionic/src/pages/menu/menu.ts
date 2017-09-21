import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {NavParams} from "ionic-angular/index";
import {ItemPage} from "../item/item";

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
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

  constructor(public nav: NavController) {
    this.items = [
      {
        'name': 'Cup of Jamaican Joe',
        'description': 'The cup of Jamaican Joe is our rendition of the classic cup ',
        //'jslImage': ''
        //'itemImage': ''
        'caffeine': true,
        'modifiers': '',
        'size:': 'List(String)'

      },
    ]
  }

  openItemPage(item) {
    this.nav.push(ItemPage);
    //this.nav.push(ItemPage, { item: item });
  }

}
