import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { Feedback } from '../models/feedback.model';
import { HttpRequestsService } from './http-requests.service';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  feedbacksSubject = new BehaviorSubject<Feedback[]>([]);
  sortSubject = new BehaviorSubject<number>(0);
  filterSubject = new BehaviorSubject<string>("All");

  constructor(private http: HttpRequestsService) {
  }

  updateFeedbacks(){

    this.http.getAllFeedback().subscribe( response => {
      this.feedbacksSubject.next(response.data);
      //console.log(response.data);
      let resultFeedbacks = [...this.feedbacksSubject.getValue()];
    let sortId = this.sortSubject.getValue();
    let filter = this.filterSubject.getValue();
    if(filter !== 'All'){
      resultFeedbacks = resultFeedbacks.filter(feedback => {
        return feedback.category === filter;
      });
    }
    if(sortId === 0){
      resultFeedbacks.sort((a, b) => {
        return b.upvotes?.length! - a.upvotes?.length!;
      });
    }
    else if(sortId === 1){
      resultFeedbacks.sort((a, b) => {
        return a.upvotes?.length! - b.upvotes?.length!;
      });
    }
    this.feedbacksSubject.next(resultFeedbacks);
    });
  }
  
}
