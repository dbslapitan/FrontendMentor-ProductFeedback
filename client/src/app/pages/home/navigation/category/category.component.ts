import { Component, Input, OnInit } from '@angular/core';
import { Feedback } from 'src/app/shared/models/feedback.model';
import { UserHistory } from 'src/app/shared/models/history.model';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { FeedbackService } from 'src/app/shared/services/feedback.service';
import { HttpRequestsService } from 'src/app/shared/services/http-requests.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  @Input() feedbacks: Feedback[] = [];
  history: UserHistory = {};

  filter: string = 'All';

  constructor(private feedbackService: FeedbackService,
    private http: HttpRequestsService,
    private authService: AuthenticationService) { }

  ngOnInit(): void {
    if(this.authService.isLoggedInSubject.getValue()){
      this.http.getHistory(localStorage.getItem('userId')!).subscribe(response => {
        this.history = response.data;
        this.filter = response.data.filter!;
      });
    }
    
    this.feedbackService.updateFeedbacks();
  }

  filterSelect(input: HTMLInputElement){

    if(this.authService.isLoggedInSubject.getValue()){
      this.history.filter = input.value;
      this.http.updateHistory(this.history).subscribe(response => {
      });
    }
    else{
      this.feedbackService.filterSubject.next(input.value);
    }

    this.feedbackService.updateFeedbacks();
    const svg = document.querySelector('.hamburger')!;
    const navContainer = document.querySelector('.nav-container')!;

    svg.classList.toggle('toggle');
    navContainer.classList.toggle('toggle');
  }

}
