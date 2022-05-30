import { Component, Input, OnInit } from '@angular/core';
import { Feedback } from 'src/app/shared/models/feedback.model';
import { UserHistory } from 'src/app/shared/models/history.model';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { FeedbackService } from 'src/app/shared/services/feedback.service';
import { HttpRequestsService } from 'src/app/shared/services/http-requests.service';

import { Sort } from '../../../../shared/enums/sort.enum';

@Component({
  selector: 'app-sort-and-filter',
  templateUrl: './sort-and-filter.component.html',
  styleUrls: ['./sort-and-filter.component.css']
})
export class SortAndFilterComponent implements OnInit {
  
  sortSelected = Sort[0];
  @Input() feedbacks: Feedback[] = [];
  history: UserHistory  = {};

  constructor(private feedbackService: FeedbackService,
    private http: HttpRequestsService,
    private authService: AuthenticationService) { }

  ngOnInit(): void {
    if(this.authService.isLoggedInSubject.getValue()){
      this.http.getHistory(localStorage.getItem('userId')!).subscribe(response => {
        this.sortSelected = Sort[response.data.sort!];
        this.history = response.data
      });
    }
  }

  selectAndClose(event: Event){
    this.sortSelected = Sort[+(event.target as HTMLInputElement).value];
    if(this.authService.isLoggedInSubject.getValue()){
      this.history.sort = +(event.target as HTMLInputElement).value;
      this.http.updateHistory(this.history).subscribe(response => {
        console.log(response.message);
      });
    }
    else{
      this.feedbackService.sortSubject.next(+(event.target as HTMLInputElement).value);
    }
    this.feedbackService.updateFeedbacks();
    //this.feedbackService.updateFeedbacks();
    /*let sortId = +(event.target as HTMLInputElement).value;
    this.sortSelected = Sort[sortId];
    if(sortId === 0){
      this.feedbacks.sort((a, b) => {
        return b.upvotes?.length! - a.upvotes?.length!;
      });
    }
    else if(sortId === 1){
      this.feedbacks.sort((a, b) => {
        return a.upvotes?.length! - b.upvotes?.length!;
      });
    }*/
  }

  closed(){
    const dropdownList = document.querySelector('.sort-button')!;
    dropdownList.classList.toggle('toggle');
  }

}
