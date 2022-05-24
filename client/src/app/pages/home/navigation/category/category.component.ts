import { Component, Input, OnInit } from '@angular/core';
import { Feedback } from 'src/app/shared/models/feedback.model';
import { FeedbackService } from 'src/app/shared/services/feedback.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  @Input() feedbacks: Feedback[] = [];

  filter!: string;

  constructor(private feedbackService: FeedbackService) { }

  ngOnInit(): void {
    this.feedbackService.filterSubject.subscribe({
      next: res => this.filter = res
    });
  }

  filterSelect(input: HTMLInputElement){
    this.feedbackService.filterSubject.next(input.value);
    this.feedbackService.updateFeedbacks();
    const svg = document.querySelector('.hamburger')!;
    const navContainer = document.querySelector('.nav-container')!;

    svg.classList.toggle('toggle');
    navContainer.classList.toggle('toggle');
  }

}
