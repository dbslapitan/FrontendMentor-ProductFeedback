import { ViewportScroller } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserComment } from 'src/app/shared/models/comment.model';
import { CommentService } from 'src/app/shared/services/comment.service';
import { HttpRequestsService } from 'src/app/shared/services/http-requests.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() comment!: UserComment;
  replyTo = '';
  characterCount = 250;

  replyForm = this.fb.group({
    username: ['', Validators.required],
    name: ['', Validators.required],
    userId: ['', Validators.required],
    extension: ['', Validators.required],
    replyTo: ['', Validators.required],
    reply: ['', Validators.required]
  });

  constructor(private fb: FormBuilder,
    private http: HttpRequestsService,
    private commentService: CommentService,
    private router: Router,
    private scroller: ViewportScroller) { }

  ngOnInit(): void {
  }

  addReplyTo(username: string){
    this.replyTo = username;
    this.replyForm.patchValue({
      username: localStorage.getItem('username'),
      name: localStorage.getItem('name'),
      userId: localStorage.getItem('userId'),
      extension: localStorage.getItem('extension'),
      replyTo: this.replyTo
    });
  }

  onSubmit(){
    if(this.replyForm.valid){

      this.comment.replies?.push(this.replyForm.getRawValue());

      this.http.updateComment(this.comment).subscribe(response => {
        if(response.success){
          this.commentService.updateComments(this.comment.feedbackId!);
        }
      });

      this.replyForm.reset();
    }
  }

  countValue(event: Event){
    this.characterCount = 250 - (event.currentTarget as HTMLInputElement).value.length;
  }

}
