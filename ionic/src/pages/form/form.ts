import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Slides } from 'ionic-angular';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'page-form',
  templateUrl: 'form.html'
})

export class FormPage {

  @ViewChild(Slides) slides: Slides;
  private maxSlideIndex: number;
  private choices: number[];

  constructor(public navCtrl: NavController) {
    this.maxSlideIndex = 0;
    this.choices = new Array(3);
  }

  ionViewDidLoad() {
    this.slides.lockSwipeToNext(true);
  }

  selectChoice(choice) { 
    let currentIndex = this.slides.getActiveIndex();
    this.choices[currentIndex] = choice;
    console.log(this.choices);
    this.next(500);
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
