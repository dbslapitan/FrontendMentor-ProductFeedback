import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { interval, timeInterval } from 'rxjs';
import { Category } from 'src/app/shared/enums/category.enum';
import { Status } from 'src/app/shared/enums/status.enum';
import { HttpRequestsService } from 'src/app/shared/services/http-requests.service';
import { FeedbackComponent } from '../home/main/feedback/feedback.component';

@Component({
  selector: 'app-create-feedback',
  templateUrl: './create-feedback.component.html',
  styleUrls: ['./create-feedback.component.css']
})
export class CreateFeedbackComponent implements OnInit {

  categorySelected = Category[4];
  feedbackForm = this.formBuilder.group({
    title: ['', Validators.required],
    category: ['Feature', Validators.required],
    details: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder, private httpRequestServices: HttpRequestsService) { }

  ngOnInit(): void {
  }

  selectAndClose(event: Event){
    this.categorySelected = Category[+(event.target as HTMLInputElement).value];
    this.feedbackForm.patchValue({
      category: this.categorySelected
    });
  }

  closed(){
    const dropdownList = document.querySelector('.dropdown-list')!;
    dropdownList.classList.toggle('toggle');
  }

  onSubmit(){
    console.log(this.feedbackForm.getRawValue());
    this.httpRequestServices.createAndPostFeedback(this.feedbackForm.getRawValue())
    .subscribe(response => {
      console.log(response.message);
    });
  }

}
