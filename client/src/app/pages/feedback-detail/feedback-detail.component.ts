import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Feedback } from 'src/app/shared/models/feedback.model';
import { HttpRequestsService } from 'src/app/shared/services/http-requests.service';
import { PagesService } from 'src/app/shared/services/pages.service';

@Component({
  selector: 'app-feedback-detail',
  templateUrl: './feedback-detail.component.html',
  styleUrls: ['./feedback-detail.component.css']
})
export class FeedbackDetailComponent implements OnInit {

  feedback: Feedback = {};
  isLoggedIn = false;
  isUserCreated = false;

  constructor(private route: ActivatedRoute, 
    private http: HttpRequestsService,
    private router: Router,
    private pagesService: PagesService) { }

  ngOnInit(): void {
    this.pagesService.pagesSubject.next('Detail');
    this.route.params.subscribe(params => {
      this.http.getFeedback(params['id']).subscribe(response => {
        if(response.success){
          this.feedback = response.data;
          if(localStorage.getItem('userId') !== null 
          && localStorage.getItem('userId') !== undefined){
            this.isLoggedIn = true;
          }
          if(localStorage.getItem('userId') === this.feedback.userID){
            this.isUserCreated = true;
          }
        }
      });
    });
    
  }
  editFeedback(){
    this.router.navigate(['feedback', 'edit', this.feedback._id]);
  }
}
