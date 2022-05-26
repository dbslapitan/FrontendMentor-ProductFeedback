import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Category } from 'src/app/shared/enums/category.enum';
import { Status } from 'src/app/shared/enums/status.enum';
import { Feedback } from 'src/app/shared/models/feedback.model';
import { HttpRequestsService } from 'src/app/shared/services/http-requests.service';
import { PagesService } from 'src/app/shared/services/pages.service';

@Component({
  selector: 'app-edit-feedback',
  templateUrl: './edit-feedback.component.html',
  styleUrls: ['./edit-feedback.component.css']
})
export class EditFeedbackComponent implements OnInit {

  feedback!: Feedback;
  categorySelected!: string;
  statusSelected!: string;

  editFeedbackForm = this.fb.group({
    title: ['', Validators.required],
    category: ['', Validators.required],
    status: ['', Validators.required],
    details: ['', Validators.required]
  });

  constructor(private route: ActivatedRoute, 
    private http: HttpRequestsService,
    private fb: FormBuilder,
    private router: Router,
    private pagesService: PagesService) { }

  ngOnInit(): void {
    this.pagesService.pagesSubject.next('Edit');
    this.route.params.subscribe(params => {
      this.http.getFeedback(params['id']).subscribe(response => {
        this.feedback = response.data;
        this.categorySelected = response.data.category as string;
        this.statusSelected = response.data.status as string;
        this.editFeedbackForm.patchValue({
          category: this.categorySelected,
          status: this.statusSelected,
          title: response.data.title,
          details: response.data.details
        });
      });
    });
  }

  selectAndClose(event: Event){
    this.categorySelected = Category[+(event.target as HTMLInputElement).value];
    this.editFeedbackForm.patchValue({
      category: this.categorySelected
    });
  }

  closed(dropdownList: HTMLUListElement){
    dropdownList.classList.toggle('toggle');
  }

  statusSelectAndClose(event: Event){
    this.statusSelected = Status[+(event.target as HTMLInputElement).value];
    this.editFeedbackForm.patchValue({
      status: this.statusSelected
    });
  }

  statusClosed(dropdownList: HTMLUListElement){
    dropdownList.classList.toggle('toggle');
  }

  saveChanges(){
    const newFeedback = {...this.feedback, ...this.editFeedbackForm.getRawValue()};
    this.http.editFeedback(newFeedback).subscribe(response => {
      if(response.success){
        console.log("Feedback successfully edited...");
        this.router.navigate(['../']);
      }
    });
  }
}
