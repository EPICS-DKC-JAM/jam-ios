import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the UrlService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class UrlService {

  host = 'https://calm-meadow-62208.herokuapp.com';

  constructor(public http: Http) {
    console.log('Hello UrlService Provider');
  }

  build(path) {
    return this.host + path;
  }

  changeHost(host) {
    this.host = host;
  }

}
