import { Component, Input, OnInit } from '@angular/core';
import { Feedback } from 'src/app/shared/models/feedback.model';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { FeedbackService } from 'src/app/shared/services/feedback.service';
import { HttpRequestsService } from 'src/app/shared/services/http-requests.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  @Input() feedback: Feedback = {};

  upvoteIsChecked = false;
  isLoggedIn = false;

  constructor(private http: HttpRequestsService, private authService: AuthenticationService, private feedbackService: FeedbackService) { }

  ngOnInit(): void {
    this.authService.isLoggedInSubject.subscribe({
      next: response => this.isLoggedIn = response
    });
    if(this.feedback.upvotes?.includes(localStorage.getItem('userId') as string) && this.isLoggedIn){
      this.upvoteIsChecked = true;
    }
  }

  hoverColor(title: HTMLHeadingElement){
    title.style.color = '#4661E6';
  }

  regularColor(title: HTMLHeadingElement){
    title.style.color = "#3A4374";
  }

  toggleUpvote(){
    if(localStorage.getItem('userId')){
      this.upvoteIsChecked = !this.upvoteIsChecked;
      if(this.upvoteIsChecked){
        this.feedback.upvotes?.push(localStorage.getItem('userId')!);
      }
      else{
        this.feedback.upvotes?.splice(this.feedback.upvotes.indexOf(localStorage.getItem('userId')!), 1);
      }
      this.http.updateUpvotes(this.feedback).subscribe(response => {
        if(response.success){
          console.log('Upvotes updated...');
        }
        else{
          console.log(response.message);
        }
      });
    }
  }

  filter(){
    this.feedbackService.filterSubject.next(this.feedback.category as string);
    this.feedbackService.updateFeedbacks();
  }
}
