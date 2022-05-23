import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  isLoggedIn: boolean = false;

  constructor(private router: Router) { 
  }

  ngOnInit(): void {
    this.isLoggedIn = localStorage.getItem('userId') === null ? true : false;
  }

  clearStorage(){
    localStorage.clear();
    this.isLoggedIn = true;

    console.log("after logout", this.isLoggedIn);
    const svg = document.querySelector('.hamburger')!;
    const navContainer = document.querySelector('.nav-container')!;

    svg.classList.toggle('toggle');
    navContainer.classList.toggle('toggle');
  }

}
