import { AfterContentChecked, Component, DoCheck, OnInit } from '@angular/core';
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
  feedbackSubscription!: Subscription;

  constructor(private httpRequestsServices: HttpRequestsService, private feedbackService: FeedbackService) {
   
  }

  ngOnInit(): void {
    this.feedbackSubscription = this.feedbackService.feedbacks.subscribe({
      next: response => {this.feedbacks = response;
      }
    });
  }

  toggleNavigation(){
    const svg = document.querySelector('.hamburger')!;
    const navContainer = document.querySelector('.nav-container')!;

    svg.classList.toggle('toggle');
    navContainer.classList.toggle('toggle');
  }

}
