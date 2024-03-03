import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }
  
  GetQuizData(){
    return this.http.get('http://192.168.0.114:5000/api/quiz');
  }

  SubmitAnswer(data: any): Observable<any> {
    return this.http.post('http://192.168.0.114:5000/api/submit', data);
  }

}
