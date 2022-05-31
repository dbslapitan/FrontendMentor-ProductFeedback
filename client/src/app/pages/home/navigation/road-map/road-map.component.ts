import { Component, OnInit } from '@angular/core';
import { Feedback } from 'src/app/shared/models/feedback.model';
import { FeedbackService } from 'src/app/shared/services/feedback.service';
import { PagesService } from 'src/app/shared/services/pages.service';

@Component({
  selector: 'app-road-map',
  templateUrl: './road-map.component.html',
  styleUrls: ['./road-map.component.css',
  './road-map-tablet.component.css']
})
export class RoadMapComponent implements OnInit {

  planned: Feedback[] = [];
  inProgress: Feedback[] = [];
  live: Feedback[] = [];

  constructor(private feedbackService: FeedbackService) { }

  ngOnInit(): void {
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

}
