import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogBoxComponent } from 'src/app/partials/dialog-box/dialog-box.component';
import { Category } from 'src/app/shared/enums/category.enum';
import { HttpRequestsService } from 'src/app/shared/services/http-requests.service';
import { PagesService } from 'src/app/shared/services/pages.service';

@Component({
  selector: 'app-create-feedback',
  templateUrl: './create-feedback.component.html',
  styleUrls: ['./create-feedback.component.css',
  './create-feedback-tablet.component.css',
  './create-feedback-desktop.component.css']
})
export class CreateFeedbackComponent implements OnInit {

  categorySelected = Category[4];
  feedbackForm = this.formBuilder.group({
    userID: [localStorage.getItem('userId'), Validators.required],
    title: ['', Validators.required],
    category: ['Feature', Validators.required],
    details: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder, 
    private httpRequestServices: HttpRequestsService, 
    private router: Router,
    private pagesService: PagesService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.pagesService.pagesSubject.next('Create');
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
      this.router.navigate(['/']);
    });
  }

  onCancel(){
    const dialogRef = this.dialog.open(DialogBoxComponent, {data: {title: 'Cancel Confirmation', message: 'Are you sure you want to cancel?'}});
    dialogRef.afterClosed().subscribe(response => {
      if(response){
        this.router.navigate(['../']);
      }
    })
  }
}
