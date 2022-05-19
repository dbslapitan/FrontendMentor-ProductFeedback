import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/shared/enums/category.enum';

@Component({
  selector: 'app-create-feedback',
  templateUrl: './create-feedback.component.html',
  styleUrls: ['./create-feedback.component.css']
})
export class CreateFeedbackComponent implements OnInit {

  categorySelected = Category[4];

  constructor() { }

  ngOnInit(): void {
  }

  selectAndClose(event: Event){
    this.categorySelected = Category[+(event.target as HTMLInputElement).value];
  }

  closed(){
    const dropdownList = document.querySelector('.dropdown-list')!;
    dropdownList.classList.toggle('toggle');
  }

}
