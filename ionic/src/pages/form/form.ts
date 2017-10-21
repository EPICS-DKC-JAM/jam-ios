import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { Slides } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { RecommendationsPage } from '../recommendations/recommendations'
import { RecommendationServiceProvider } from '../../providers/recommendation-service/recommendation-service'

@Component({
  selector: 'page-form',
  templateUrl: 'form.html',
  providers: [RecommendationServiceProvider]
})

export class FormPage {

  @ViewChild(Slides) slides: Slides;
  private questions;
  private maxSlideIndex: number;
  private choices: String[];

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public recommendationService: RecommendationServiceProvider) {
    this.maxSlideIndex = 0;
    this.questions = this.getQuestions();
    this.choices = new Array(this.questions.length);
  }

  ionViewDidLoad() {
    this.slides.lockSwipeToNext(true);
  }

  selectChoice(choice) {
    let currentIndex = this.slides.getActiveIndex();
    this.choices[currentIndex] = this.questions[currentIndex].options[choice];
    if (currentIndex == this.choices.length - 1) {
      // Finished with choices, display recommendations
      let recommendations = this.getRecommendations();
      let modal = this.modalCtrl.create(RecommendationsPage, recommendations);
      modal.present();
    } else {
      // Go to next question
      this.next(500);
    }
  }

  getQuestions() {
    let questions = {
      questions: [
        {
          'prompt': 'Do you prefer you drink hot or cold?',
          'options': ['Hot', 'Cold', 'Red'],
          'questionOrder': 0
        }
      ]
    };
    return questions.questions;
  }

  getRecommendations() {
    let answerString = "";
    for (var i = 0; i < this.choices.length; i++) {
      answerString += this.choices[i];
    }

    let data = this.recommendationService.getAllItems(answerString);
    return data;
  }

  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    if (currentIndex < this.maxSlideIndex) {
      this.slides.lockSwipeToNext(false);
    } else {
      this.slides.lockSwipeToNext(true);
    }
  }

  next(speed) {
    this.slides.lockSwipeToNext(false);
    this.slides.slideNext(500);
    this.slides.lockSwipeToNext(true);
    let currentIndex = this.slides.getActiveIndex();
    if (currentIndex > this.maxSlideIndex) {
      this.maxSlideIndex = currentIndex;
    }
  }

}
