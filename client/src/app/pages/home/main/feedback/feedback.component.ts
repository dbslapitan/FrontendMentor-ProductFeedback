import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Feedback } from 'src/app/shared/models/feedback.model';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { FeedbackService } from 'src/app/shared/services/feedback.service';
import { HttpRequestsService } from 'src/app/shared/services/http-requests.service';
import { PagesService } from 'src/app/shared/services/pages.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit, OnChanges{
  @Input() feedback!: Feedback;
  currentPage: string = '';

  upvoteIsChecked = false;
  isLoggedIn = false;

  constructor(private http: HttpRequestsService, 
    private authService: AuthenticationService, 
    private feedbackService: FeedbackService,
    private router: Router,
    private pagesService: PagesService) { }

  ngOnInit(): void {
    this.authService.updateLoggedInStatus();
    this.authService.isLoggedInSubject.subscribe({
      next: response => {
        this.isLoggedIn = response
      }
    });
    console.log(this.feedback);
    if(this.feedback.upvotes?.includes(localStorage.getItem('userId') as string) && this.isLoggedIn){
      this.upvoteIsChecked = true;
    }
    this.pagesService.pagesSubject.subscribe({
      next: page => this.currentPage = page
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
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

  feedbackDetail(event: Event, filterbtn: HTMLButtonElement, upvote: HTMLLabelElement){
    if(event.target !== filterbtn && event.target !== upvote){
      this.router.navigate(['feedback', this.feedback._id]);
    }
  }
}
