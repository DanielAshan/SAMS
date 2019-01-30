import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  private apiUrl: string = 'http://localhost:8080/location';

  constructor(private http: HttpClient) { }

  getLocationList(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  createLocation(name, sensor): Observable<any> {
    const data = {
      name: name,
      sensor_name: sensor
    };
    console.log(data);
    return this.http.post<any>(this.apiUrl, data, {headers: this.httpHeaders});
  }

  updateLocation(id, name, sensor): Observable<any> {
    const data = {
      name: name,
      sensor_name: sensor
    };
    console.log(name);
    return this.http.put<any>(this.apiUrl + '/' + id, data, {headers: this.httpHeaders});
  }

  deleteLocation(id): Observable<any> {
    return this.http.delete<any>(this.apiUrl + '/' + id);
  }
}
