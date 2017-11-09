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

  constructor(public http: Http, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
    console.log('Hello UrlService Provider');
  }

  build(path) {
    return this.host + path;
  }

  changeHost(host) {
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
        title: 'App Not Authorized',
        subTitle: 'Please authorize this app',
        buttons: ['OK']
      });
      alert.present();
      return false;
    }
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
    this.http.post(this.build('/auth'), { username: user, password: pass }, headers)
      .map(res => res.json())
      .subscribe(data => {
        loader.dismiss();
        if (data.success) {
          console.log(data.token);
          let alert = this.alertCtrl.create({
            title: 'Authentication Successful',
            subTitle: 'Credentials were successfully!',
            buttons: ['OK']
          });
          alert.present();
          this.apiToken = data.token;
          this.loggedIn = true;
        } else {
          let alert = this.alertCtrl.create({
            title: 'Authentication Failed',
            subTitle: 'Please check username or password',
            buttons: ['OK']
          });
          alert.present();
          this.loggedIn = false;
          this.apiToken = '';
        }
      });
  }
}
