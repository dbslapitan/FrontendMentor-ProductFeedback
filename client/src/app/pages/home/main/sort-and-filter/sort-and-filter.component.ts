import { Component, OnInit } from '@angular/core';

import { Sort } from '../../../../shared/enums/sort.enum';

@Component({
  selector: 'app-sort-and-filter',
  templateUrl: './sort-and-filter.component.html',
  styleUrls: ['./sort-and-filter.component.css']
})
export class SortAndFilterComponent implements OnInit {
  
  sortSelected = Sort[0];

  constructor() { }

  ngOnInit(): void {
  }

  selectAndClose(event: Event){
    const dropdownOptions = document.querySelector('.sort-button')!;
    dropdownOptions.classList.toggle('toggle');
    this.sortSelected = Sort[+(event.target as HTMLInputElement).value];
  }

}
