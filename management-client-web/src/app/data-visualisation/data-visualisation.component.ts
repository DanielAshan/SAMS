import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Chart } from 'chart.js';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-data-visualisation',
  templateUrl: './data-visualisation.component.html',
  styleUrls: ['./data-visualisation.component.css']
})
export class DataVisualisationComponent implements OnInit, AfterViewInit {
  start_date = new FormControl(new Date());
  end_date = new FormControl(new Date());
  constructor(private dataService: DataService, private changeDetectorRef: ChangeDetectorRef) { }

  temperatureChart: Chart = [];
  humidityChart: Chart = [];
  lightLevelChart: Chart = [];
  airQualityChart: Chart = [];

  temperatureData: Array<any> = [];
  humidityData: Array<any> = [];
  airQualityData: Array<any> = [];
  lightLevelData: Array<any> = [];

  dataLabels: Date[] = [];

  temperatureDatasets: Array<any> = [];
  humidityDatasets: Array<any> = [];

  lightLevelDatasets: Array<any> = [];

  airQualityDatasets: Array<any> = [];

  getTemperature(): void {
    this.dataService.getTemperature().subscribe(result => {
      this.temperatureData = result;
      result.forEach(item => {
        this.dataLabels.push(new Date(item.date));
      });
      const tempDataset = {
        label: result[0].sensor_name,
        borderColor: 'rgb(255, 99, 132)',
        data: result.map(item => ({
          y: item.value,
          x: new Date(item.date)
        }))
      };
      this.temperatureChart.data.labels = this.dataLabels;
      this.temperatureChart.data.datasets = [tempDataset];
      console.log(this.temperatureDatasets);
      console.log(this.dataLabels);
      console.log(this.temperatureChart);
      this.temperatureChart.update();
      this.changeDetectorRef.detectChanges();
    }, error => {
      console.log(error);
    });
  }

  getHumidity(): void {
    this.dataService.getHumidity().subscribe(result => {
      this.humidityData = result;
      const humidityDataset = {
        label: result[0].sensor_name,
        borderColor: 'rgb(255, 99, 132)',
        data: result.map(item => ({
          y: item.value,
          x: new Date(item.date)
        }))
      };
      this.humidityChart.data.labels = this.dataLabels;
      this.humidityChart.data.datasets = [humidityDataset];
      this.humidityChart.update();
      this.changeDetectorRef.detectChanges();
    }, error => {
      console.log(error);
    });
  }

  getLightLevel(): void {
    this.dataService.getLightLevel().subscribe(result => {
      this.lightLevelData = result;
      const lightLevelDataset = {
        label: result[0].sensor_name,
        borderColor: 'rgb(255, 99, 132)',
        data: result.map(item => ({
          y: item.value,
          x: new Date(item.date)
        }))
      };
      this.lightLevelChart.data.labels = this.dataLabels;
      this.lightLevelChart.data.datasets = [lightLevelDataset];
      this.lightLevelChart.update();
      this.changeDetectorRef.detectChanges();
    }, error => {
      console.log(error);
    });
  }

  getAirQuality(): void {
    this.dataService.getAirQuality().subscribe(result => {
      this.airQualityData = result;
      const airQualityDataset = {
        label: result[0].sensor_name,
        borderColor: 'rgb(255, 99, 132)',
        data: result.map(item => ({
          y: item.value,
          x: new Date(item.date)
        }))
      };
      this.airQualityChart.data.labels = this.dataLabels;
      this.airQualityChart.data.datasets = [airQualityDataset];
      this.airQualityChart.update();
      this.changeDetectorRef.detectChanges();
    }, error => {
      console.log(error);
    });
  }

  ngOnInit(): void {
    this.getTemperature();
    this.getHumidity();
    this.getAirQuality();
    this.getLightLevel();
  }

  ngAfterViewInit() {
    this.dataLabels.sort(function (a: any, b: any) { return a - b; });
    console.log(this.temperatureDatasets);
    this.temperatureDatasets.forEach((item) => {
      item.data.sort(function (a: any, b: any) { return a.x - b.x; });
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
        animation: {
          duration: 0
        },
        hover: {
          animationDuration: 0
        },
        title: {
          display: true,
          text: 'Temperature Chart'
        },
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              unit: 'day'
            },
            scaleLabel: {
              display: true,
              labelString: 'Date'
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true
            },
            scaleLabel: {
              display: true,
              labelString: 'Celsius Degree'
            }
          }]
        }
      }
    });

    this.humidityDatasets.forEach((item) => {
      item.data.sort(function (a: any, b: any) { return a.x - b.x; });
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
              unit: 'day'
            },
            scaleLabel: {
              display: true,
              labelString: 'Date'
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true
            },
            scaleLabel: {
              display: true,
              labelString: 'Percent %'
            }
          }]
        }
      }
    });

    this.lightLevelDatasets.forEach((item) => {
      item.data.sort(function (a: any, b: any) { return a.x - b.x; });
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
              unit: 'day'
            },
            scaleLabel: {
              display: true,
              labelString: 'Date'
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true
            },
            scaleLabel: {
              display: true,
              labelString: 'Lux'
            }
          }]
        }
      }
    });

    this.airQualityDatasets.forEach((item) => {
      item.data.sort(function (a: any, b: any) { return a.x - b.x; });
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
              unit: 'day'
            },
            scaleLabel: {
              display: true,
              labelString: 'Date'
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true
            },
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
