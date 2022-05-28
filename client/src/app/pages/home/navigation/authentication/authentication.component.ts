import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { FeedbackService } from 'src/app/shared/services/feedback.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  isLoggedIn: boolean = false;

  constructor(private router: Router, 
    private feedbackService: FeedbackService,
    private authenticationService: AuthenticationService) { 
  }

  ngOnInit(): void {
    
    this.authenticationService.updateLoggedInStatus();
    this.authenticationService.isLoggedInSubject.subscribe({
      next: logInStatus => this.isLoggedIn = logInStatus
    });
  }

  clearStorage(){
    localStorage.clear();
    
    this.authenticationService.updateLoggedInStatus();

    this.feedbackService.updateFeedbacks();

    const svg = document.querySelector('.hamburger')!;
    const navContainer = document.querySelector('.nav-container')!;

    svg.classList.toggle('toggle');
    navContainer.classList.toggle('toggle');
  }

}
