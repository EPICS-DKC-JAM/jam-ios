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
  private maxSlideIndex: number;
  private choices: number[];

  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {
    this.maxSlideIndex = 0;
    this.choices = new Array(3); // TODO change to dynamic
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

  getRecommendations() {
    let data = {
        items : [
            {
                title: "Example item",
                description: "Example description for our example item"
            }
        ]
    } 
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
