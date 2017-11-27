import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { Slides } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { RecommendationsPage } from '../recommendations/recommendations'
import { RecommendationService} from '../../providers/recommendation-service/recommendation-service'
import { ItemService} from '../../providers/item-service/item-service'

@Component({
  selector: 'page-form',
  templateUrl: 'form.html',
  providers: [RecommendationService, ItemService]
})

export class FormPage {

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
      this.sortQuestions();
    });
  }

  /** Lock slide advancement to require question answer when view loads **/
  ionViewDidLoad() {
    this.slides.lockSwipeToNext(true);
  }

  /** Sort questions based on question order **/
  sortQuestions() {
    console.log(this.questions);
    if (this.questions == null || this.questions.length == 0) {
      return;
    }
    for (var i = 0; i < this.questions.length; i++) {
      for (var j = i; j < this.questions.length; j++) {
        if (this.questions[j].questionOrder = i) {
          this.swapElements(this.questions, j, i);
        }
      }
    }
    console.log(this.questions);
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
    let answerString = this.selectedAnswers.join('');
    var recommendations = [];
    for (var i = 0; i < this.answers.length; i++) {
      var answer = this.answers[i];
      if (answerString == answer.key) {
        for (var j = 0; j < this.items.length; j++) {
          var item = this.items[j];
          if (answer.consumableId == item._id) {
            recommendations.push(item);
          }
        }
      }
    }
    console.log("RECS");
    console.log(recommendations);
    let recommendationsModal = this.modalCtrl.create(RecommendationsPage, recommendations);
    recommendationsModal.present();
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

}
