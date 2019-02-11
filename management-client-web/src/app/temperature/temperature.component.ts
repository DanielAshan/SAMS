import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { TemperatureService } from './services/temperature.service';
import { DatePipe } from '@angular/common';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.css']
})
export class TemperatureComponent implements OnInit, AfterViewInit {

  temperatureChart: Chart = [];
  temperatureData: Array<any> = [];
  temperatureLabels: Array<any> = [];
  constructor(private temperatureService: TemperatureService, private datePipe: DatePipe,
    private changeDetectorRef: ChangeDetectorRef) {

  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.temperatureChart = new Chart('temperatureChart', {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: 'Sensor One',
          borderColor: 'rgb(255, 99, 132)',
          data: [],
        },
        ]
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Temperature Chart'
        },
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              unit: 'second'
            },
            scaleLabel: {
              display: true,
              labelString: 'Date'
            }
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'value'
            }
          }]
        }
      }
    });
    this.getTemperatureRecords();
    this.changeDetectorRef.detectChanges();
    console.log(this.temperatureChart);
  }

  getTemperatureRecords(): void {
    this.temperatureService.getTemperatureList().subscribe(data => {
      data.map(mapData => {
        console.log(mapData);
        this.temperatureLabels.push(mapData.name);
        this.temperatureData.push({
          x: new Date(mapData.date), // 2013-02-08 09:30:26
          y: mapData.value,
        });
        this.addDataToChart(this.temperatureChart, new Date(mapData.date), {
          x: new Date(mapData.date),
          y: mapData.value,
        });
      });
      this.changeDetectorRef.detectChanges();
    }, error => {
      console.log(error);
    });
  }

  addDataToChart(chart, label, data): void {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
      dataset.data.push(data);
    });
    chart.update();
  }

}
