import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  // _id, category, feedback, date
  feedback: Array<any> = [{_id: '5c3223809fb67f15698b813e2', category: 'Relax', feedback: 'Good', date: Date()},
  {_id: '5c3223809fb67f15698b813e2', category: 'Relax', feedback: 'Average', date: Date()},
  {_id: '5c3223809fb67f15698b813e2', category: 'Work', feedback: 'Good', date: Date()}];
  feedbackColumns: string[] = ['_id', 'category', 'feedback', 'date', 'actions'];

  feedbackOptions: Array<any> = [{value: 'good', viewValue: 'Good'},
  {value: 'average', viewValue: 'Average'},
  {value: 'bad', viewValue: 'Bad'}];
  constructor(private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit() {
    this.changeDetectorRefs.detectChanges();
  }

}
