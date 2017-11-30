import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { Slides } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { RecommendationsPage } from '../recommendations/recommendations'
import { RecommendationService} from '../../providers/recommendation-service/recommendation-service'
import { CheckoutPage } from '../checkout/checkout';
import { ItemService} from '../../providers/item-service/item-service'

@Component({
  selector: 'page-form',
  templateUrl: 'form.html',
})

export class FormPage {

  private MAX_RECOMMENDED_ITEMS = 5;

  @ViewChild(Slides) slides: Slides;
  private questions: any;
  private answers: any;
  private items: any;
  private selectedAnswers: String[];
  private maxSlideIndex: number;

  constructor(public navCtrl: NavController,
              public modalCtrl: ModalController,
              public recommendationService: RecommendationService,
              public itemService: ItemService) {
    this.maxSlideIndex = 0;
    this.itemService.getAllItems().then(items => { this.items = items; });
    this.recommendationService.getAllAnswers().then(answers =>{ this.answers = answers; });
    this.recommendationService.getAllQuestions().then(questions => {
      this.questions = questions;
      this.selectedAnswers = new Array(this.questions.length);
      this.sortQuestions(function(sorted) {
        if (!sorted) console.log("Questions failed to sort");
      });
    });
  }

  /** Lock slide advancement to require question answer when view loads **/
  ionViewDidLoad() {
    this.slides.lockSwipeToNext(true);
  }

  /** Sort questions based on question order **/
  sortQuestions(callback) {
    if (this.questions == null || this.questions.length == 0) {
      callback(false);
    }
    for (var i = 0; i < this.questions.length; i++) {
      for (var j = i + 1; j < this.questions.length; j++) {
        if (this.questions[j].questionOrder < this.questions[i].questionOrder) {
          this.swapElements(this.questions, j, i);
        }
      }
    }
    callback(true);
  }

  /** Helper method for sorting **/
  swapElements(arr, index1, index2) {
    var temp = arr[index1];
    arr[index1] = arr[index2]
    arr[index2] = temp;
  }

  /**
   * Store user answer and move to next question
   * If last question was answered, display recommendations
   * @param option - answer selected by user
   */
  selectAnswer(option) {
    let currentIndex = this.slides.getActiveIndex();
    this.selectedAnswers[currentIndex] = option;
    if (currentIndex == this.selectedAnswers.length - 1) {
      // Finished with choices, display recommendations
      this.getRecommendations();
    } else {
      // Go to next question
      this.next(500);
    }
  }

  /** Retrieve recommended items based on user answers **/
  getRecommendations() {
    var fullMatches = []; // array of items that fully match answers
    var partialMatchesMap = {}; // map number of matches to array of items with that number
    var numQuestions = this.selectedAnswers.length;
    for (var i = 0; i < this.answers.length; i++) {
      var answer = this.answers[i];
      var item = null;
      /** Find item corresponding to answer id **/
      for (var j = 0; j < this.items.length; j++) {
        if (answer.consumableId == this.items[j]._id) {
          item = this.items[j];
          break;
        }
      }
      if (item == null) {
        console.log("Answer does not have a valid consumable id");
        continue;
      }
      /** Count number of matching answers for this item **/
      var numMatching = 0; // number of answers that match the given item (answer)
      for (var j = 0; j < numQuestions; j++) {
        if (this.selectedAnswers[j] == answer.keys[j]) {
          numMatching++;
        }
      }
      if (numMatching == numQuestions) {
        fullMatches.push(item);
        if (fullMatches.length >= this.MAX_RECOMMENDED_ITEMS) {
          /** Do not recommend more items than max allowed **/
          break;
        }
      } else {
        if (partialMatchesMap[numMatching] == null) {
          partialMatchesMap[numMatching] = [item]; // array with the item
        } else {
          partialMatchesMap[numMatching].push(item);
        }
      }
    }
    /** Get best partial matches until number of recommendations has been met **/
    var numRecommendations = fullMatches.length; // counter for number of recommendations made so far
    var partialMatches = [];
    for (var i = numQuestions - 1; i >= 0 && numRecommendations < this.MAX_RECOMMENDED_ITEMS; i--) {
      var currentMatchesArr = partialMatchesMap[i];
      if (currentMatchesArr) {
        for (var j = 0; numRecommendations < this.MAX_RECOMMENDED_ITEMS && j < currentMatchesArr.length; j++) {
          partialMatches.push(currentMatchesArr[j]);
          numRecommendations++;
        }
      }
    }
    var data = {
      "numFullMatches" : fullMatches.length,
      "numPartialMatches" : partialMatches.length,
      "fullMatches" : fullMatches,
      "partialMatches" : partialMatches
    };
    this.modalCtrl.create(RecommendationsPage, data).present();
  }

  /** Determine if slides should be locked for forward advancement when user changes slide **/
  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    if (currentIndex < this.maxSlideIndex) {
      this.slides.lockSwipeToNext(false);
    } else {
      this.slides.lockSwipeToNext(true);
    }
  }

  /** Move questionnaire slide to the next question **/
  next(speed) {
    this.slides.lockSwipeToNext(false);
    this.slides.slideNext(speed);
    this.slides.lockSwipeToNext(true);
    let currentIndex = this.slides.getActiveIndex();
    if (currentIndex > this.maxSlideIndex) {
      this.maxSlideIndex = currentIndex;
    }
  }

  openCheckoutPage() {
    this.navCtrl.push(CheckoutPage);
  }
}
