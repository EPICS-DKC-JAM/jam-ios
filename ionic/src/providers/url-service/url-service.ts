import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { LoadingController } from 'ionic-angular';
import { AlertController } from "ionic-angular/index";
import 'rxjs/add/operator/map';

/*
 Generated class for the UrlService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular DI.
 */
@Injectable()
export class UrlService {

  host = 'http://localhost:3000';
  //host = 'https://calm-meadow-62208.herokuapp.com';
  apiToken = '';
  loggedIn = false;

  constructor(public http:Http, public loadingCtrl:LoadingController, public alertCtrl:AlertController) {
    console.log('Hello UrlService Provider');
  }

  build(path) {
    return this.host + path;
  }

  changeHost(host) {
    if (host.endsWith('/')) {
      host = host.substr(0, host.length - 1);
    }
    this.host = host;
  }

  getToken() {
    if (this.loggedIn) {
      return this.apiToken;
    }
  }

  isLoggedIn() {
    if (this.loggedIn) {
      return true;
    } else {
      let alert = this.alertCtrl.create({
        title: 'App Not Authenticated',
        subTitle: 'Please authenticate this app',
        buttons: ['OK']
      });
      alert.present();
      return false;
    }
  }

  checkConnection() {
    let loader = this.loadingCtrl.create({
      content: 'Checking connection...'
    });
    loader.present();

    return new Promise(resolve => {
      let opt:RequestOptions;
      let headers:Headers = new Headers;
      opt = new RequestOptions({
        headers: headers
      });
      headers.set('x-access-token', this.getToken());

      //noinspection TypeScriptUnresolvedFunction
      this.http.get(this.build('/me'), opt)
        .map(res => res.json())
        .subscribe(data => {
          let alert = this.alertCtrl.create({
            title: 'Connection Successful!',
            buttons: ['OK']
          });
          loader.dismiss();
          alert.present();
          resolve(true);
        }, err => {
          let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: err,
            buttons: ['OK']
          });
          loader.dismiss();
          alert.present();
          resolve(false);
        });
    });
  }

  authenticate(user, pass) {
    let loader = this.loadingCtrl.create({
      content: 'Attempting to authenticate...'
    });
    loader.present();

    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Accept', 'application/json');

    //noinspection TypeScriptUnresolvedFunction
    this.http.post(this.build('/auth'), {username: user, password: pass}, headers)
      .map(res => res.json())
      .subscribe(data => {
        loader.dismiss();
        if (data.success) {
          console.log(data.token);
          let alert = this.alertCtrl.create({
            title: 'Authentication Successful',
            subTitle: data.message,
            buttons: ['OK']
          });
          alert.present();
          this.apiToken = data.token;
          this.loggedIn = true;
        } else {
          let alert = this.alertCtrl.create({
            title: 'Authentication Failed',
            subTitle: data.message,
            buttons: ['OK']
          });
          alert.present();
          this.loggedIn = false;
          this.apiToken = '';
        }
      }, err => {
        loader.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: err,
          buttons: ['OK']
        });
        alert.present();
      });
  }
}
