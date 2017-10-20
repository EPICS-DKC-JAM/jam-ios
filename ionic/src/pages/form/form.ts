import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { Slides } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { RecommendationsPage } from '../recommendations/recommendations'

@Component({
  selector: 'page-form',
  templateUrl: 'form.html'
})

export class FormPage {

  @ViewChild(Slides) slides: Slides;
  private questions;
  private maxSlideIndex: number;
  private choices: number[];

  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {
    this.maxSlideIndex = 0;
    this.questions = this.getQuestions();
    this.choices = new Array(this.questions.length);
  }

  ionViewDidLoad() {
    this.slides.lockSwipeToNext(true);
  }

  selectChoice(choice) {
    let currentIndex = this.slides.getActiveIndex();
    this.choices[currentIndex] = choice;

    console.log(this.choices);

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
          'option1': 'Hot',
          'option2': 'Cold'
        },
        {
          'prompt': 'Do you like that this is the second question?',
          'option1': 'Yes',
          'option2': 'Hell Yes'
        }
      ]
    };
    return questions.questions;
  }

  getRecommendations() {
    let data = {
      items : [
        {
          'name': 'Cup of Jamaican Joe',
          'description': 'The cup of Jamaican Joe is our rendition of the classic cup ',
          //'jslImage': ''
          //'itemImage': ''
          'caffeine': true,
          'modifiers': '',
          'size:': 'List(String)'
        }
      ]
    };
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
