import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Feedback } from '../models/feedback.model';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestsService {

  constructor(private http: HttpClient) { }

  createAndPostFeedback(feedback: Feedback){
    return this.http.post<{success: boolean, message: string}>(environment.URI + "feedbacks ", feedback);
  }
}
