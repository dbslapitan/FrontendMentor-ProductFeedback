import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  toggleNavigation(){
    const svg = document.querySelector('.hamburger')!;
    const navContainer = document.querySelector('.nav-container')!;

    svg.classList.toggle('toggle');
    navContainer.classList.toggle('toggle');
  }

}
