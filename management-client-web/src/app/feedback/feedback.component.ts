import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FeedbackService } from './services/feedback.service';
@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  newFeedback = {
    category: null,
    feedback: null
  };
  // _id, category, feedback, date
  feedback: Array<any> = [];
  feedbackColumns: string[] = ['_id', 'category', 'feedback', 'date', 'actions'];

  feedbackOptions: Array<any> = [{value: 'good', viewValue: 'Good'},
  {value: 'average', viewValue: 'Average'},
  {value: 'bad', viewValue: 'Bad'}];
  constructor(private feedbackService: FeedbackService, private changeDetectorRefs: ChangeDetectorRef) { }

  getFeedbackList(): void {
    this.feedbackService.getFeedbackList().subscribe(result => {
      this.feedback = result;
      this.changeDetectorRefs.detectChanges();
    }, error => {
      console.log(error);
    });
  }

  submitFeedback(): void {
    this.feedbackService.createFeedback(this.newFeedback).subscribe(result => {
      this.getFeedbackList();
    }, error => {
      console.log(error);
    });
  }

  deleteFeedback(id): void {
    this.feedbackService.deleteFeedback(id).subscribe(result => {
      this.getFeedbackList();
    }, error => {
      console.log(error);
    });
  }
  ngOnInit() {
    this.getFeedbackList();
  }

}
