import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserComment } from 'src/app/shared/models/comment.model';
import { Feedback } from 'src/app/shared/models/feedback.model';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { CommentService } from 'src/app/shared/services/comment.service';
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
  comments!: UserComment[];

  commentForm = this.fb.group({
    comment: ['', Validators.required],
    username: ['',Validators.required],
    name: ['', Validators.required],
    feedbackId: ['', Validators.required],
    userId: ['', Validators.required],
    extension: ['', Validators.required]
  });

  characterCount = 250;

  constructor(private route: ActivatedRoute, 
    private http: HttpRequestsService,
    private router: Router,
    private pagesService: PagesService,
    private authService: AuthenticationService,
    private fb: FormBuilder,
    private commentService: CommentService) { }

  ngOnInit(): void {
    this.authService.updateLoggedInStatus();
    this.pagesService.pagesSubject.next('Detail');
    this.route.params.subscribe(params => {
      this.http.getFeedback(params['id']).subscribe(response => {
        if(response.success){
          this.feedback = response.data;
        if(localStorage.getItem('userId') === this.feedback.userID){
          this.isUserCreated = true;
        }
        }
      });
      this.commentService.updateComments(params['id']);
      this.commentService.commentsSubject.subscribe({
        next: comm => {
          this.comments = comm;
        }
      });
    });
    this.authService.isLoggedInSubject.subscribe({
      next: response => {
        this.isLoggedIn = response;
      }
    });
  }

  editFeedback(){
    this.router.navigate(['feedback', 'edit', this.feedback._id]);
  }

  countValue(event: Event){
    this.characterCount = 250 - (event.currentTarget as HTMLInputElement).value.length;
  }

  onSubmit(){
    this.commentForm.patchValue({
      username: localStorage.getItem('username'),
      name: localStorage.getItem('name'),
      userId: localStorage.getItem('userId'),
      feedbackId: this.feedback._id,
      extension: localStorage.getItem('extension')
    });
    this.http.createAndPostComment(this.commentForm.getRawValue()).subscribe(response => {
      if(response.success){
        this.commentService.updateComments(this.feedback._id as string);
        this.commentForm.reset();
      }
    });
  }

  replyTo(username: any){
    console.log(username);
  }
}
