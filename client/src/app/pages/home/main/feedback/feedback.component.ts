import { Component, Input, OnInit } from '@angular/core';
import { Feedback } from 'src/app/shared/models/feedback.model';
import { HttpRequestsService } from 'src/app/shared/services/http-requests.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  @Input() feedback: Feedback = {};

  upvoteIsChecked = false;

  constructor(private http: HttpRequestsService) { }

  ngOnInit(): void {
    if(this.feedback.upvotes?.includes(localStorage.getItem('userId') as string)){
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
