import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  private tempUrl: string = 'http://localhost:8080/temperature';
  private rhUrl: string = 'http://localhost:8080/humidity';
  private lightLevelUrl: string = 'http://localhost:8080/lightLevel';
  private airQualityUrl: string = 'http://localhost:8080/airQuality';

  constructor(private http: HttpClient) { }

  getTemperature(): Observable<any> {
    return this.http.get<any>(this.tempUrl);
  }

  getHumidity(): Observable<any> {
    return this.http.get<any>(this.rhUrl);
  }

  getLightLevel(): Observable<any> {
    return this.http.get<any>(this.lightLevelUrl);
  }

  getAirQuality(): Observable<any> {
    return this.http.get<any>(this.airQualityUrl);
  }
}
