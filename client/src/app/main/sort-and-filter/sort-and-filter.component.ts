import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sort-and-filter',
  templateUrl: './sort-and-filter.component.html',
  styleUrls: ['./sort-and-filter.component.css']
})
export class SortAndFilterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  clickCheck() {
    const dropdownOptions = document.querySelector('.sort-button')!;
    console.log(dropdownOptions)
    dropdownOptions.classList.toggle('toggle');
    console.log(dropdownOptions.classList);
  }

}
