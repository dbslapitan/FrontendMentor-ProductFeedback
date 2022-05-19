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
    this.sortSelected = Sort[+(event.target as HTMLInputElement).value];
  }
  closed(){
    const dropdownList = document.querySelector('.sort-button')!;
    dropdownList.classList.toggle('toggle');
  }

}
