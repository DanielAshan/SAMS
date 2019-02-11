import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  private apiUrl: string = 'http://localhost:8080/userFeedback';

  constructor(private http: HttpClient) { }

  getFeedbackList(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  createFeedback(feedback): Observable<any> {
    return this.http.post<any>(this.apiUrl, feedback, {headers: this.httpHeaders});
  }

  deleteFeedback(id): Observable<any> {
    return this.http.delete<any>(this.apiUrl + '/' + id);
  }
}
