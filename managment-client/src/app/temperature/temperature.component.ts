import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Temperature } from 'src/app/shared/temperature.model';
import { TemperatureService } from './services/temperature.service';
import 'anychart';

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.css']
})
export class TemperatureComponent implements OnInit, AfterViewInit {

  temperatureRecordList: Array<Temperature>;

  dataSet: anychart.data.Set = anychart.data.set(this.temperatureRecordList);
  mapping: { [key: string ]: anychart.data.View } = {
    'data': this.dataSet.mapAs({
      x: ['date'],
      value: ['value']
    })
  };

  chart: anychart.charts.Cartesian = null;

  constructor(private temperatureService: TemperatureService) {
    this.getTemperatureRecords();
   }

  @ViewChild('chartContainer') container;

  ngOnInit() {
    this.prepareAnychartDataSet();
    this.chart = anychart.cartesian();
    this.chart.addSeries(this.getData());
  }

  ngAfterViewInit(): void {
    this.chart.container(this.container.nativeElement);
    this.chart.draw();
  }

  getTemperatureRecords(): void {
    this.temperatureService.getTemperatureList().subscribe(data => {
        this.temperatureRecordList = data;
        this.dataSet = anychart.data.set(data);
        console.log(this.dataSet);
        this.chart.data(this.dataSet);
        console.log(this.temperatureRecordList);
    }, error => {

    });
  }

  prepareAnychartDataSet(): void {
    this.dataSet = anychart.data.set(this.temperatureRecordList);
  }

  getDataList(): Array<string> {
    const res: Array<string> = [];
    for (const key in this.mapping) {
      if (1) {
        res.push(key);
      }
    }
    return res;
  }

  getData(key: string = 'data') {
    return this.mapping[key];
  }
}
