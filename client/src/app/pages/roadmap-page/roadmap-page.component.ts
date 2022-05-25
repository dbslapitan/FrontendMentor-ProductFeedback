import { Component, OnInit } from '@angular/core';
import { Feedback } from 'src/app/shared/models/feedback.model';
import { FeedbackService } from 'src/app/shared/services/feedback.service';
import { PagesService } from 'src/app/shared/services/pages.service';

@Component({
  selector: 'app-roadmap-page',
  templateUrl: './roadmap-page.component.html',
  styleUrls: ['./roadmap-page.component.css']
})
export class RoadmapPageComponent implements OnInit {

  planned: Feedback[] = [];
  inProgress: Feedback[] = [];
  live: Feedback[] = [];

  constructor(private pagesService: PagesService,
    private feedbackService: FeedbackService) { }

  ngOnInit(): void {
    this.pagesService.pagesSubject.next('Roadmap');
    this.feedbackService.roadmapFeedback();
    this.feedbackService.plannedFilter.subscribe({
      next: filter => this.planned = filter
    });
    this.feedbackService.inProgressFilter.subscribe({
      next: filter => this.inProgress = filter
    });
    this.feedbackService.liveFilter.subscribe({
      next: filter => this.live = filter
    });
  }

  selectStatus(status: string, planned: HTMLDivElement, inProgress: HTMLDivElement, live: HTMLDivElement){
    
    console.log(status);
    switch(status){
      case 'planned':
        planned.classList.contains('hidden') ? planned.classList.remove('hidden') : console.log('');
        inProgress.classList.contains('hidden') ? console.log('') : inProgress.classList.add('hidden');
        live.classList.contains('hidden') ? console.log('') : live.classList.add('hidden');
      break;
      case 'in-progress':
        planned.classList.contains('hidden') ? console.log('') : planned.classList.add('hidden');
        inProgress.classList.contains('hidden') ? inProgress.classList.remove('hidden') : console.log('');
        live.classList.contains('hidden') ? console.log('') : live.classList.add('hidden');
      break;
      case 'live':
        planned.classList.contains('hidden') ? console.log('') : planned.classList.add('hidden');
        inProgress.classList.contains('hidden') ? console.log('') : inProgress.classList.add('hidden');
        live.classList.contains('hidden') ? live.classList.remove('hidden') : console.log('');
      break;
    }
  }

}
