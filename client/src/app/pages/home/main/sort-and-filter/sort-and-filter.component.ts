import { Component, DoCheck, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Feedback } from 'src/app/shared/models/feedback.model';
import { FeedbackService } from 'src/app/shared/services/feedback.service';

import { Sort } from '../../../../shared/enums/sort.enum';

@Component({
  selector: 'app-sort-and-filter',
  templateUrl: './sort-and-filter.component.html',
  styleUrls: ['./sort-and-filter.component.css']
})
export class SortAndFilterComponent implements OnInit {
  
  sortSelected = Sort[0];
  @Input() feedbacks: Feedback[] = [];

  constructor(private feedbackService: FeedbackService) { }

  ngOnInit(): void {
  }

  selectAndClose(event: Event){
    this.sortSelected = Sort[+(event.target as HTMLInputElement).value];
    this.feedbackService.sortSubject.next(+(event.target as HTMLInputElement).value);
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
