import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { Category } from 'src/app/shared/enums/category.enum';
import { HttpRequestsService } from 'src/app/shared/services/http-requests.service';

@Component({
  selector: 'app-create-feedback',
  templateUrl: './create-feedback.component.html',
  styleUrls: ['./create-feedback.component.css']
})
export class CreateFeedbackComponent implements OnInit {

  categorySelected = Category[4];
  feedbackForm = this.formBuilder.group({
    userId: [localStorage.getItem('userId'), Validators.required],
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
    this.httpRequestServices.createAndPostFeedback(this.feedbackForm.getRawValue())
    .subscribe(response => {
      console.log(response.message);
    });
  }
}
