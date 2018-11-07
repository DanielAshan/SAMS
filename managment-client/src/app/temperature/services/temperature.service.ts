import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TemperatureService {
  private apiUrl: string = 'http://localhost:8080/tempList';

  constructor(private http: HttpClient) { }

  getTemperatureList(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
