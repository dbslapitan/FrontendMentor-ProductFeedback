import { AfterContentChecked, Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Feedback } from 'src/app/shared/models/feedback.model';
import { FeedbackService } from 'src/app/shared/services/feedback.service';
import { HttpRequestsService } from 'src/app/shared/services/http-requests.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  feedbacks: Feedback[] = [];
  feedbacksSubscription!: Subscription;

  constructor(private httpRequestsServices: HttpRequestsService, private feedbackService: FeedbackService) {
  }

  ngOnInit(): void {

    this.feedbackService.updateFeedbacks();
    this.feedbackService.feedbacksSubject.subscribe({
      next: response => this.feedbacks = response
    });
    /*this.httpRequestsServices.getAllFeedback().subscribe(response => {
      let allFeedback: Feedback[] = [...response.data];
      this.feedbackService.feedbacksSubject.next(allFeedback);
      this.feedbackService.updateFeedbacks();*/
      /*this.feedbackService.sortSubject.next(0);
      this.feedbackService.filterSubject.next('All');
      this.feedbackService.updateFeedbacks();
      this.feedbacks = this.feedbackService.feedbacksSubject.getValue();*/
      //console.log(this.feedbackService.feedbacksSubject.getValue());
    //});
    /*this.httpRequestsServices.getAllFeedback().subscribe(response => {
      let allFeedback: Feedback[] = [...response.data];
      this.feedbackService.feedbacksSubject.next(allFeedback.sort((a, b) => b.upvotes?.length! - a.upvotes?.length!));
    });
    this.feedbacksSubscription = this.feedbackService.feedbacksSubject.subscribe({
      next: response => this.feedbacks = response
    });*/
  }

  toggleNavigation(){
    const svg = document.querySelector('.hamburger')!;
    const navContainer = document.querySelector('.nav-container')!;

    svg.classList.toggle('toggle');
    navContainer.classList.toggle('toggle');
  }

}
