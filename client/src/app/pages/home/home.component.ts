import { Component, OnInit } from '@angular/core';
import { Feedback } from 'src/app/shared/models/feedback.model';
import { HttpRequestsService } from 'src/app/shared/services/http-requests.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  feedbacks: Feedback[] = [];

  constructor(httpRequestsServices: HttpRequestsService) {
    
    httpRequestsServices.getAllFeedback().subscribe(response => {
      this.feedbacks = response.data;
    });
   }

  ngOnInit(): void {

  }

  toggleNavigation(){
    const svg = document.querySelector('.hamburger')!;
    const navContainer = document.querySelector('.nav-container')!;

    svg.classList.toggle('toggle');
    navContainer.classList.toggle('toggle');
  }

}
