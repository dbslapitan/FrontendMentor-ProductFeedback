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
    switch(status){
      case 'planned':
        planned.classList.contains('hidden') ? planned.classList.remove('hidden') : null;
        inProgress.classList.contains('hidden') ? null : inProgress.classList.add('hidden');
        live.classList.contains('hidden') ? null : live.classList.add('hidden');
      break;
      case 'in-progress':
        planned.classList.contains('hidden') ? null : planned.classList.add('hidden');
        inProgress.classList.contains('hidden') ? inProgress.classList.remove('hidden') : null;
        live.classList.contains('hidden') ? null : live.classList.add('hidden');
      break;
      case 'live':
        planned.classList.contains('hidden') ? null : planned.classList.add('hidden');
        inProgress.classList.contains('hidden') ? null : inProgress.classList.add('hidden');
        live.classList.contains('hidden') ? live.classList.remove('hidden') : null;
      break;
    }
  }

}
