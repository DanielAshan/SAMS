import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-data-visualisation',
  templateUrl: './data-visualisation.component.html',
  styleUrls: ['./data-visualisation.component.css']
})
export class DataVisualisationComponent implements OnInit, AfterViewInit {
  start_date = new FormControl(new Date());
  end_date = new FormControl(new Date());
  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  temperatureChart: Chart = [];
  humidityChart: Chart = [];
  lightLevelChart: Chart = [];
  airQualityChart: Chart = [];

  dataLabels: Date[] = [new Date('10/28/2018'),
  new Date('12/26/2017'),
  new Date('10/08/2018'),
  new Date('10/22/2018'),
  new Date('04/26/2018'),
  new Date('05/09/2018'),
  new Date('05/28/2018'),
  new Date('09/20/2018'),
  new Date('01/03/2019'),
  new Date('01/13/2018')];

  temperatureDatasets: Array<any> = [{
    label: 'Salon',
    borderColor: 'rgb(255, 99, 132)',
    data: [{y: 15, x: new Date('10/28/2018')},
    {y: 16, x: new Date('12/26/2017')},
    {y: 17, x: new Date('10/08/2018')},
    {y: 18, x: new Date('10/22/2018')},
    {y: 18, x: new Date('04/26/2018')},
    {y: 18, x: new Date('05/09/2018')},
    {y: 19, x: new Date('05/28/2018')},
    {y: 17, x: new Date('09/20/2018')},
    {y: 16, x: new Date('01/03/2019')},
    {y: 15, x: new Date('01/13/2018')}]
  }, {
    label: 'Bedroom',
    borderColor: 'rgb(3, 255, 132)',
    data: [{y: 5, x:  new Date('10/28/2018')},
    {y: 6, x:  new Date('12/26/2017')},
    {y: 7, x:  new Date('10/08/2018')},
    {y: 8, x:  new Date('10/22/2018')},
    {y: 8, x:  new Date('04/26/2018')},
    {y: 8, x:  new Date('05/09/2018')},
    {y: 9, x:  new Date('05/28/2018')},
    {y: 7, x:  new Date('09/20/2018')},
    {y: 6, x:  new Date('01/03/2019')},
    {y: 5, x:  new Date('01/13/2018')}]
  }];

  humidityDatasets: Array<any> = [{
    label: 'Salon',
    borderColor: 'rgb(255, 99, 132)',
    data: [{y: 15, x: new Date('10/28/2018')},
    {y: 40, x: new Date('12/26/2017')},
    {y: 50, x: new Date('10/08/2018')},
    {y: 52, x: new Date('10/22/2018')},
    {y: 53, x: new Date('04/26/2018')},
    {y: 48, x: new Date('05/09/2018')},
    {y: 59, x: new Date('05/28/2018')},
    {y: 61, x: new Date('09/20/2018')},
    {y: 32, x: new Date('01/03/2019')},
    {y: 30, x: new Date('01/13/2018')}]
  }, {
    label: 'Bedroom',
    borderColor: 'rgb(3, 255, 132)',
    data: [{y: 5, x:  new Date('10/28/2018')},
    {y: 26, x:  new Date('12/26/2017')},
    {y: 37, x:  new Date('10/08/2018')},
    {y: 48, x:  new Date('10/22/2018')},
    {y: 48, x:  new Date('04/26/2018')},
    {y: 58, x:  new Date('05/09/2018')},
    {y: 39, x:  new Date('05/28/2018')},
    {y: 27, x:  new Date('09/20/2018')},
    {y: 36, x:  new Date('01/03/2019')},
    {y: 55, x:  new Date('01/13/2018')}]
  }];

  lightLevelDatasets: Array<any> = [{
    label: 'Salon',
    borderColor: 'rgb(255, 99, 132)',
    data: [{y: 3250, x: new Date('10/28/2018')},
    {y: 2555, x: new Date('12/26/2017')},
    {y: 4562, x: new Date('10/08/2018')},
    {y: 2852, x: new Date('10/22/2018')},
    {y: 5353, x: new Date('04/26/2018')},
    {y: 1548, x: new Date('05/09/2018')},
    {y: 1659, x: new Date('05/28/2018')},
    {y: 5261, x: new Date('09/20/2018')},
    {y: 332, x: new Date('01/03/2019')},
    {y: 1830, x: new Date('01/13/2018')}]
  }, {
    label: 'Bedroom',
    borderColor: 'rgb(3, 255, 132)',
    data: [{y: 5, x:  new Date('10/28/2018')},
    {y: 126, x:  new Date('12/26/2017')},
    {y: 5637, x:  new Date('10/08/2018')},
    {y: 5648, x:  new Date('10/22/2018')},
    {y: 5648, x:  new Date('04/26/2018')},
    {y: 258, x:  new Date('05/09/2018')},
    {y: 2639, x:  new Date('05/28/2018')},
    {y: 2927, x:  new Date('09/20/2018')},
    {y: 3536, x:  new Date('01/03/2019')},
    {y: 4555, x:  new Date('01/13/2018')}]
  }];

  airQualityDatasets: Array<any> = [{
    label: 'Salon',
    borderColor: 'rgb(255, 99, 132)',
    data: [{y: 420, x: new Date('10/28/2018')},
    {y: 435, x: new Date('12/26/2017')},
    {y: 460, x: new Date('10/08/2018')},
    {y: 390, x: new Date('10/22/2018')},
    {y: 356, x: new Date('04/26/2018')},
    {y: 421, x: new Date('05/09/2018')},
    {y: 401, x: new Date('05/28/2018')},
    {y: 393, x: new Date('09/20/2018')},
    {y: 405, x: new Date('01/03/2019')},
    {y: 408, x: new Date('01/13/2018')}]
  }, {
    label: 'Bedroom',
    borderColor: 'rgb(3, 255, 132)',
    data: [{y: 420, x:  new Date('10/28/2018')},
    {y: 420, x:  new Date('12/26/2017')},
    {y: 390, x:  new Date('10/08/2018')},
    {y: 578, x:  new Date('10/22/2018')},
    {y: 451, x:  new Date('04/26/2018')},
    {y: 431, x:  new Date('05/09/2018')},
    {y: 386, x:  new Date('05/28/2018')},
    {y: 357, x:  new Date('09/20/2018')},
    {y: 336, x:  new Date('01/03/2019')},
    {y: 455, x:  new Date('01/13/2018')}]
  }];

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataLabels.sort(function(a: any, b: any) { return a - b; });
    this.temperatureDatasets.forEach((item) => {
      item.data.sort(function(a: any, b: any) { return a.x - b.x; });
    });
    const tempCTX = document.getElementById('temperatureChart');
    const humidityCTX = document.getElementById('humidityChart');
    const lightLevelCTX = document.getElementById('lightLevelChart');
    const airQualityCTX = document.getElementById('airQualityChart');

    this.temperatureChart = new Chart(tempCTX, {
      type: 'line',
      data: {
        labels: this.dataLabels,
        datasets: this.temperatureDatasets.sort()
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
              unit: 'week'
            },
            scaleLabel: {
              display: true,
              labelString: 'Date'
            }
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Celsius Degree'
            }
          }]
        }
      }
    });

    this.humidityDatasets.forEach((item) => {
      item.data.sort(function(a: any, b: any) { return a.x - b.x; });
    });
    this.humidityChart = new Chart(humidityCTX, {
      type: 'line',
      data: {
        labels: this.dataLabels,
        datasets: this.humidityDatasets
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Humidity Chart'
        },
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              unit: 'week'
            },
            scaleLabel: {
              display: true,
              labelString: 'Date'
            }
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Percent %'
            }
          }]
        }
      }
    });

    this.lightLevelDatasets.forEach((item) => {
      item.data.sort(function(a: any, b: any) { return a.x - b.x; });
    });
    this.lightLevelChart = new Chart(lightLevelCTX, {
      type: 'line',
      data: {
        labels: this.dataLabels,
        datasets: this.lightLevelDatasets
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Light Level Chart'
        },
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              unit: 'week'
            },
            scaleLabel: {
              display: true,
              labelString: 'Date'
            }
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Lux'
            }
          }]
        }
      }
    });

    this.airQualityDatasets.forEach((item) => {
      item.data.sort(function(a: any, b: any) { return a.x - b.x; });
    });
    this.airQualityChart = new Chart(airQualityCTX, {
      type: 'line',
      data: {
        labels: this.dataLabels,
        datasets: this.airQualityDatasets
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Air Quality Chart'
        },
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              unit: 'week'
            },
            scaleLabel: {
              display: true,
              labelString: 'Date'
            }
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'PPM'
            }
          }]
        }
      }
    });
    this.changeDetectorRef.detectChanges();
  }

}
