import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SensorService {
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  private apiUrl: string = 'http://localhost:8080/sensor';

  constructor(private http: HttpClient) { }

  getSensorList(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  updateSensor(sensor): Observable<any> {
    console.log(sensor);
    return this.http.put<any>(this.apiUrl + '/' + sensor._id, sensor, {headers: this.httpHeaders});
  }

  deleteSensor(id): Observable<any> {
    return this.http.delete<any>(this.apiUrl + '/' + id);
  }
}
