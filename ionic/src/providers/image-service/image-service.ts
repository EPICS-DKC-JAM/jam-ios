import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { File } from '@ionic-native/file';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { ItemService } from '../item-service/item-service'
import { LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';

/*
 Generated class for the ImageService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular DI.
 */
@Injectable()
export class ImageService {

  items = [];

  constructor(public http:Http, public file:File, public itemService:ItemService, public transfer:FileTransfer, public loadingCtrl:LoadingController) {

  }

  getImage(name) {
    var fileName = name.replace(' ', '') + 'Image.jpg';
    //this.file.checkFile(this.file.dataDirectory, fileName).then(data => {
    //
    //});
    return this.file.dataDirectory + fileName;
  }

  downloadImages() {
    this.itemService.getAllItems()
      .then(data => {
        this.items = data;
        const fileTransfer:FileTransferObject = this.transfer.create();
        console.log(this.items.length);
        let loader = this.loadingCtrl.create({
          content: "Downloading 0/" + this.items.length + "images",
        });
        let downloaded = 0;
        let success = 0;
        loader.present();

        console.log(this.items);
        for (var i = 0; i < this.items.length; i++) {
          var name = this.items[i].name;
          var imageUrl = this.items[i].itemImage;
          var downloadName = name.replace(' ', '') + 'Image.jpg';
          console.log('Downloading ' + downloadName);
          fileTransfer.download(encodeURI(imageUrl), this.file.externalDataDirectory + downloadName).then((entry) => {
            downloaded++;
            success++;
          }, (error) => {
            downloaded++;
            alert(error);
          });
        }
      });
  }

}
