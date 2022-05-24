import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Feedback } from '../models/feedback.model';
import { HttpRequestsService } from './http-requests.service';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  feedbacks = new Subject<Feedback[]>();

  constructor(private http: HttpRequestsService) { 
    this.http.getAllFeedback().subscribe(response => {
      this.feedbacks.next(response.data);
    });
  }
}
