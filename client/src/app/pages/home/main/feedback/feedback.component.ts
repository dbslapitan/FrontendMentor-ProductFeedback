import { Component, Input, OnInit } from '@angular/core';
import { Feedback } from 'src/app/shared/models/feedback.model';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  @Input() feedback: Feedback = {};

  constructor() { }

  ngOnInit(): void {
  }

  hoverColor(title: HTMLHeadingElement){
    title.style.color = '#4661E6';
  }

  regularColor(title: HTMLHeadingElement){
    title.style.color = "#3A4374";
  }
}
