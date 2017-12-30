import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { UrlService } from '../url-service/url-service'
import { Storage } from '@ionic/storage';
import { AlertController } from "ionic-angular/index";
import { LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';

/*
 Generated class for the RecommendationServiceProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular DI.
 */
@Injectable()
export class RecommendationService {

  private questions:any;
  private answers:any;

  constructor(public http:Http, public loadingCtrl: LoadingController, public alertCtrl:AlertController, public urlService:UrlService, public storage:Storage) {
    // Check if in storage, if not, get from API
    storage.get('questions').then((data) => {
      if (data) {
        console.log('Already in storage');
        this.questions = data;
      } else {
        console.log('Not in storage');
        this.questions = this.refreshAllQuestions();
      }
    });
    storage.get('answers').then((data) => {
      if (data) {
        console.log('Already in storage');
        this.answers = data;
      } else {
        console.log('Not in storage');
        this.answers = this.refreshAllAnswers();
      }
    });
  }


  refreshAllQuestions() {
    return new Promise(resolve => {
      var allQuestionsURL = this.urlService.build('/recommendations/questions/get');
      let opt:RequestOptions;
      let headers:Headers = new Headers;
      opt = new RequestOptions({
        headers: headers
      });
      headers.set('x-access-token', this.urlService.getToken());
      //noinspection TypeScriptUnresolvedFunction
      this.http.get(allQuestionsURL, opt)
        .map(res => res.json())
        .subscribe(data => {
          this.questions = data.data;
          this.storage.set("questions", this.questions);
          resolve(this.questions);
        }, err => {
          let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: err,
            buttons: ['OK']
          });
          alert.present();
        });
    });
  }

  refreshAllAnswers() {
    return new Promise(resolve => {
      var allAnswersURL = this.urlService.build('/recommendations/answers/get');
      let opt:RequestOptions;
      let headers:Headers = new Headers;
      opt = new RequestOptions({
        headers: headers
      });
      headers.set('x-access-token', this.urlService.getToken());
      //noinspection TypeScriptUnresolvedFunction
      this.http.get(allAnswersURL, opt)
        .map(res => res.json())
        .subscribe(data => {
          this.answers = data.data;
          this.storage.set("answers", this.answers);
          resolve(this.answers);
        }, err => {
          let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: err,
            buttons: ['OK']
          });
          alert.present();
        });
    });
  }

  getAllQuestions() {
    if (this.questions) {
      console.log('Already have questions');
      console.log("Questions: " + this.questions);
      return Promise.resolve(this.questions);
    } else {
      return this.refreshAllQuestions();
    }
  }

  getAllAnswers() {
    if (this.answers) {
      console.log('Already have answers');
      console.log('Answers: ' + this.answers);
      return Promise.resolve(this.answers);
    } else {
      return this.refreshAllAnswers();
    }
  }

}
