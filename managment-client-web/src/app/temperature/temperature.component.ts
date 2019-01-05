import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Temperature } from 'src/app/shared/temperature.model';
import { TemperatureService } from './services/temperature.service';
import { DatePipe } from '@angular/common';
import 'anychart';

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.css']
})
export class TemperatureComponent implements OnInit, AfterViewInit {

  temperatureRecordList: Array<any> = [];

  dataSet: anychart.data.Set = anychart.data.set(this.temperatureRecordList);
  dataScale = anychart.scales.dateTime();
  mapping: { [key: string ]: anychart.data.View } = {
    'data': this.dataSet.mapAs({
      x: ['date'],
      value: ['value']
    })
  };

  chart: anychart.charts.Cartesian = null;

  constructor(private temperatureService: TemperatureService, private datePipe: DatePipe) {
    this.getTemperatureRecords();
   }

  @ViewChild('chartContainer') container;

  ngOnInit() {
    this.prepareAnychartDataSet();
    this.chart = anychart.line();
    this.chart.addSeries(this.getData('data'));
    this.chart.xAxis();
    this.chart.xScale(this.dataScale);
    this.chart.yAxis();
  }

  ngAfterViewInit(): void {
    this.chart.title('Temperature');
    this.chart.container(this.container.nativeElement);
    this.chart.draw();
  }

  getTemperatureRecords(): void {
    this.temperatureService.getTemperatureList().subscribe(data => {
        data.forEach(element => {
          this.temperatureRecordList.push({
            x: this.datePipe.transform(element.date, 'yyy-MM-dd: h:mm:ss'),
            value: element.value
          });
        });
        this.dataSet = anychart.data.set(this.temperatureRecordList);
        this.chart.data(this.dataSet);
    }, error => {

    });
  }

  prepareAnychartDataSet(): void {
    this.dataSet = anychart.data.set(this.temperatureRecordList);
  }

  getData(key: string = 'data') {
    return this.mapping[key];
  }
}
