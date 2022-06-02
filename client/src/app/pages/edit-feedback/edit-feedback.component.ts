import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Category } from 'src/app/shared/enums/category.enum';
import { Status } from 'src/app/shared/enums/status.enum';
import { Feedback } from 'src/app/shared/models/feedback.model';
import { HttpRequestsService } from 'src/app/shared/services/http-requests.service';
import { PagesService } from 'src/app/shared/services/pages.service';
import {MatDialog} from '@angular/material/dialog';
import { DialogBoxComponent } from 'src/app/partials/dialog-box/dialog-box.component';

@Component({
  selector: 'app-edit-feedback',
  templateUrl: './edit-feedback.component.html',
  styleUrls: ['./edit-feedback.component.css',
  './edit-feedback-tablet.component.css']
})
export class EditFeedbackComponent implements OnInit {

  feedback: Feedback = {};
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
    private pagesService: PagesService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.pagesService.pagesSubject.next('Edit');
    this.route.params.subscribe(params => {
      this.http.getFeedback(params['id']).subscribe(response => {
        if(response.success){
          this.feedback = response.data;
          this.categorySelected = response.data.category as string;
          this.statusSelected = response.data.status as string;
          this.editFeedbackForm.patchValue({
            category: this.categorySelected,
            status: this.statusSelected,
            title: response.data.title,
            details: response.data.details
          });
        }
        else{
          this.router.navigate(['/']);
        }
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

  onCancel(){
    const dialogRef = this.dialog.open(DialogBoxComponent, {data: {title: 'Cancel Confirmation', message: 'Are you sure you want to Cancel?'}});
    dialogRef.afterClosed().subscribe(response => {
      if(response){
        this.router.navigate(['/feedback', this.feedback._id]);
      }
    });
  }

  onDelete(){
    const dialogRef = this.dialog.open(DialogBoxComponent, {data: {title: 'Delete Confirmation', message: 'Are you sure you want to delete this feedback?'}});
    dialogRef.afterClosed().subscribe(response => {
      if(response){
        this.http.deleteFeedback(this.feedback._id!).subscribe(response => {
          console.log(response.message);
          this.router.navigate(['/']);
        });
      }
    });
  }
}
