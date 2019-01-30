import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-data-analysis',
  templateUrl: './data-analysis.component.html',
  styleUrls: ['./data-analysis.component.css']
})
export class DataAnalysisComponent implements OnInit {
  start_date = new FormControl(new Date());
  end_date = new FormControl(new Date());
  categories: string[] = ['Work', 'Relax'];
  constructor() { }

  ngOnInit() {
  }

}
