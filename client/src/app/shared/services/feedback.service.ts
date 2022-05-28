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
  plannedFilter = new BehaviorSubject<Feedback[]>([]);
  inProgressFilter = new BehaviorSubject<Feedback[]>([]);
  liveFilter = new BehaviorSubject<Feedback[]>([]);

  constructor(private http: HttpRequestsService) {
  }

  updateFeedbacks(){
    this.http.getAllFeedback().subscribe( response => {
      this.feedbacksSubject.next(response.data);
      //console.log(response.data);
      let resultFeedbacks = [...this.feedbacksSubject.getValue()];

      let withComments = resultFeedbacks.map(feedback => {
        let newFeedback = {...feedback};
        this.http.getComments(feedback._id!).subscribe(response => {
          let comments = [...response.data];
          let commentCount = 0;
          comments.forEach(comment => {
            commentCount += 1;
            commentCount += comment.replies?.length!;
          });
          newFeedback.comments = commentCount;
        });
        return newFeedback;
      });
      let sortId = this.sortSubject.getValue();
      let filter = this.filterSubject.getValue();
      this.feedbacksSubject.next(withComments);
      let allfeedbacks = [...this.feedbacksSubject.getValue()];
      if(filter !== 'All'){
        allfeedbacks = allfeedbacks!.filter(feedback => {
          return feedback.category === filter;
        });
      }
      if(sortId === 0){
        allfeedbacks.sort((a, b) => {
          return b.upvotes?.length! - a.upvotes?.length!;
        });
      }
      else if(sortId === 1){
        allfeedbacks.sort((a, b) => {
          return a.upvotes?.length! - b.upvotes?.length!;
        });
      }
      if(sortId === 2){
        allfeedbacks.sort((a, b) => {
          return b.comments! - a.comments!;
        });
      }
      if(sortId === 3){
        allfeedbacks.sort((a, b) => {
          return a.comments! - b.comments!;
        });
      }
      this.feedbacksSubject.next(allfeedbacks);
    });
  }

  roadmapFeedback(){
    let allfeedback = [];
    let planned = [];
    let inProgress = [];
    let live = [];
    this.http.getAllFeedback().subscribe(response => {
      allfeedback = response.data as Feedback[];
      planned = allfeedback.filter(feedback => feedback.status === 'Planned');
      inProgress = allfeedback.filter(feedback => feedback.status === 'In-Progress');
      live = allfeedback.filter(feedback => feedback.status === 'Live');
      this.plannedFilter.next(planned);
      this.inProgressFilter.next(inProgress);
      this.liveFilter.next(live);
    });
  }
}
